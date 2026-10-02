import React from 'react'
import TrendChart from './TrendChart'

export default function StudentCard({ sid, school, rounds }) {
  const renderBadges = () => rounds.map(({ label, data }) => {
    const status = data?.status ?? 'absent'
    const invalid = ['absent', 'dropout', 'dropped', 'invalid'].includes(status)
    const score = Number(data?.totalScore)
    const max = Number(data?.totalMax) || 340
    const pass = !invalid && Number.isFinite(score) && score >= max * 0.6

    const badgeClass = invalid ? 'badge invalid' : pass ? 'badge pass' : 'badge fail'
    const badgeText = invalid ? '무효' : pass ? '합격' : '불합격'
    const title = invalid
      ? status === 'absent'
        ? '미응시 (분포/백분위 제외)'
        : status === 'invalid'
          ? '학수번호 형식 위반'
          : '중도포기 (분포/백분위 제외)'
      : `총점 ${score}점`

    return <span key={label} className={badgeClass} title={title}>{label} {badgeText}</span>
  })

  return (
    <div className="card">
      <div className="flex student-head">
        <div>
          <div className="small">학수번호</div>
          <div className="kpi"><div className="num">{sid}</div></div>
          <div className="small">{school}</div>
        </div>
        <div className="flex badge-wrap">{renderBadges()}</div>
      </div>

      <hr className="sep" />

      <TrendChart rounds={rounds} school={school} />
    </div>
  )
}
