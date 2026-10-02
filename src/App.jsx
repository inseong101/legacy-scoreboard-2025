import React from 'react'
import StudentCard from './components/StudentCard'
import RoundCard from './components/RoundCard'
import { sampleStudent } from './data/sampleData'

export default function App() {
  const { sid, school, rounds } = sampleStudent

  return (
    <main className="container">
      <div className="archive-note">
        <strong>2025 성적표 아카이브 복원판</strong>
        <span>기준: 2025-09-07의 성적 조회 UX. Firebase 대신 샘플 데이터만 사용합니다.</span>
      </div>

      <div className="cards-grid">
        <StudentCard sid={sid} school={school} rounds={rounds} />
        {rounds.map(({ label, data }) => (
          <RoundCard key={label} label={label} data={data} sid={sid} />
        ))}
      </div>

      <div className="provenance">
        <div>원본 저장소: inseong101/map</div>
        <div>복원 기준: 2025-09-07 성적표 컴포넌트 구조</div>
      </div>
    </main>
  )
}
