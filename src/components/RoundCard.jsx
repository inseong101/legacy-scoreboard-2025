import React, { useRef, useState } from 'react'
import { SUBJECT_MAX } from '../data/constants'
import { chunk, fmt, pct } from '../utils/legacyHelpers'
import WrongAnswerPanel from './WrongAnswerPanel'

const INVALID_CARD_HEIGHT = 600

function StatusPill({ children, tone = 'ok' }) {
  return <span className={`pill ${tone}`}>{children}</span>
}

export default function RoundCard({ label, data }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const flipCardRef = useRef(null)

  const {
    totalScore = 0,
    totalMax = 340,
    overallPass = false,
    meets60 = false,
    anyGroupFail = false,
    groupResults = [],
    subjectScores = {},
    status
  } = data || {}

  const overallRate = totalMax > 0 ? pct(totalScore, totalMax) : 0
  const isInvalid = ['absent','dropout','dropped'].includes(status)
  const statusClass = isInvalid ? 'rc-invalid' : (overallPass ? 'rc-pass' : 'rc-fail')
  const fixedHeightStyle = isInvalid ? { height: INVALID_CARD_HEIGHT } : undefined

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return
    setIsFlipped(prev => !prev)
  }

  const reasonText = () => {
    if (!meets60 && anyGroupFail) return '과락 및 평락으로 인한 불합격'
    if (!meets60) return '평락으로 인한 불합격'
    if (anyGroupFail) return '과락으로 인한 불합격'
    return '합격 기준 충족'
  }

  const renderGroupBoxes = () => groupResults.map(group => {
    const rows = group.layoutChunks?.length ? chunk(group.subjects, group.layoutChunks) : [group.subjects]
    return (
      <div key={group.label} className={`group-box ${group.pass ? 'ok' : 'fail'} span-12`}>
        <div className="group-head">
          <div className="name" style={{ fontWeight:800 }}>{group.label}</div>
          <div className="small">
            소계 {fmt(group.score)}/{fmt(group.max)} · 정답률 {group.rate}%{' '}
            {group.pass ? <StatusPill>통과</StatusPill> : <StatusPill tone="red">과락</StatusPill>}
          </div>
        </div>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="subj-row">
            {row.map(subject => (
              <span key={subject} className="subj-chip">
                {subject} <span className="muted">{fmt(subjectScores[subject] || 0)}/{fmt(SUBJECT_MAX[subject] || 0)}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    )
  })

  return (
    <div ref={flipCardRef} className="flip-card" onClick={handleCardClick} style={fixedHeightStyle}>
      <div className={`flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className={`flip-face flip-front card ${statusClass}`} style={fixedHeightStyle}>
          <div className="flex" style={{ justifyContent:'space-between' }}>
            <h2 style={{ margin:0 }}>{label} 총점</h2>
            {!isInvalid && (
              <div className="kpi">
                <div className="num">{fmt(totalScore)}</div>
                <div className="sub">/ {fmt(totalMax)}</div>
              </div>
            )}
          </div>

          {isInvalid ? (
            <div style={{height:`calc(${INVALID_CARD_HEIGHT}px - 56px)`,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',padding:12}}>
              <div style={{fontSize:18,fontWeight:800,lineHeight:1.6}}>
                본 회차는 분석에서 제외됩니다.
                <div style={{fontSize:14,fontWeight:700,opacity:.9,marginTop:6}}>
                  ({status === 'absent' ? '미응시' : status === 'dropout' ? '중도포기' : '기타 무효'})
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="progress" style={{ margin:'8px 0 2px 0' }}>
                <div className="bar" style={{ width:`${overallRate}%` }} />
                <div className="cutline" />
              </div>
              <div className="small" style={{ marginTop:10 }}>
                정답률 {overallRate}% (컷 60%: 204/340){' '}
                {overallPass ? <StatusPill>통과</StatusPill> : <StatusPill tone="red">불합격</StatusPill>}
                <div className="small" style={{ marginTop:6, opacity:.9 }}>{reasonText()}</div>
              </div>
              <div className="group-grid" style={{ marginTop:12 }}>{renderGroupBoxes()}</div>
            </>
          )}
          <div className="flip-hint">카드를 클릭하면 오답 보기가 열립니다.</div>
        </div>

        <div className={`flip-face flip-back card ${statusClass}`} style={fixedHeightStyle}>
          <WrongAnswerPanel roundLabel={label} data={data} />
          <div className="flip-hint">카드 바깥 영역을 클릭하면 앞면으로 돌아갑니다.</div>
        </div>
      </div>
    </div>
  )
}
