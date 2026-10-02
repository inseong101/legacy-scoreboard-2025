import React, { useEffect, useMemo, useRef, useState } from 'react'

const X_MIN = 0
const X_MAX = 340
const BIN_SIZE = 5
const CUTOFF_SCORE = 204

function percentile(scores, score) {
  if (!Number.isFinite(score) || !scores?.length) return null
  const sorted = [...scores].sort((a,b) => b-a)
  if (sorted.length === 1) return 0
  let idx = sorted.findIndex(v => v <= score)
  if (idx < 0) idx = sorted.length - 1
  return +(idx / (sorted.length - 1) * 100).toFixed(1)
}

export default function TrendChart({ rounds = [], school = '' }) {
  const canvasRef = useRef(null)
  const [selectedRoundIdx, setSelectedRoundIdx] = useState(0)
  const [schoolMode, setSchoolMode] = useState(false)

  const cur = rounds[selectedRoundIdx]
  const data = cur?.data || {}
  const scores = schoolMode ? data.schoolScores : data.nationalScores
  const avg = schoolMode ? data.schoolAvg : data.nationalAvg
  const pct = percentile(scores || [], Number(data.totalScore))

  const bins = useMemo(() => {
    const list = []
    for (let x = X_MIN; x < X_MAX; x += BIN_SIZE) {
      const count = (scores || []).filter(s => s >= x && s < x + BIN_SIZE).length
      list.push({ min: x, count, mine: Number.isFinite(data.totalScore) && data.totalScore >= x && data.totalScore < x + BIN_SIZE })
    }
    return list
  }, [scores, data.totalScore])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !cur) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const W = rect.width, H = rect.height
    const p = { left: 52, right: 18, top: 52, bottom: 46 }
    const cw = W - p.left - p.right
    const ch = H - p.top - p.bottom
    ctx.clearRect(0, 0, W, H)

    ctx.fillStyle = '#e8eeff'
    ctx.font = '700 14px system-ui'
    ctx.textAlign = 'center'
    ctx.fillText(`${schoolMode ? '학교' : '전국'} 분포 (총 ${(scores || []).length}명)`, W/2, 20)
    ctx.fillStyle = '#9db0d6'
    ctx.font = '12px system-ui'
    ctx.fillText(`평균: ${avg ?? '-'}점`, W/2, 38)

    ctx.strokeStyle = '#213056'
    ctx.beginPath()
    ctx.moveTo(p.left, p.top)
    ctx.lineTo(p.left, p.top + ch)
    ctx.lineTo(p.left + cw, p.top + ch)
    ctx.stroke()

    const maxCount = Math.max(1, ...bins.map(b => b.count))
    const bw = cw / bins.length

    bins.forEach((b, i) => {
      const h = b.count / maxCount * ch
      const x = p.left + i * bw
      const y = p.top + ch - h
      ctx.fillStyle = b.mine ? '#ef4444' : (schoolMode ? '#22c55ecc' : '#7ea2ffcc')
      if (b.count > 0) ctx.fillRect(x + 1, y, Math.max(1,bw-2), Math.max(1,h))
    })

    const cutX = p.left + (CUTOFF_SCORE / X_MAX) * cw
    ctx.strokeStyle = '#f59e0b'
    ctx.setLineDash([4,4])
    ctx.beginPath()
    ctx.moveTo(cutX, p.top)
    ctx.lineTo(cutX, p.top + ch)
    ctx.stroke()
    ctx.setLineDash([])

    ctx.fillStyle = '#9db0d6'
    ctx.font = '10px system-ui'
    ctx.textAlign = 'center'
    for (let x = 0; x <= 320; x += 40) {
      const px = p.left + (x / X_MAX) * cw
      ctx.fillText(String(x), px, p.top + ch + 16)
    }
  }, [bins, schoolMode, cur, avg, scores])

  if (!cur) return null

  return (
    <div>
      <div className="chart-controls">
        <div className="round-buttons">
          {rounds.map((r, i) => (
            <button
              className={selectedRoundIdx === i ? 'round-btn active' : 'round-btn'}
              key={r.label}
              onClick={() => setSelectedRoundIdx(i)}
            >{r.label}</button>
          ))}
        </div>

        <label className="mode-toggle">
          <span>전국</span>
          <input type="checkbox" checked={schoolMode} onChange={e => setSchoolMode(e.target.checked)} />
          <span>학교</span>
        </label>
      </div>

      <canvas ref={canvasRef} className="chart" />

      <div className="chart-meta">
        <span>60% 커트라인: 204점</span>
        {Number.isFinite(data.totalScore) && <span>내 점수: {data.totalScore}점</span>}
        {pct != null && <span>{schoolMode ? school : '전국'} 백분위: {pct}%</span>}
      </div>
    </div>
  )
}
