import React from 'react'
import StudentCard from './components/StudentCard'
import { sampleStudent } from './data/sampleData'

export default function App() {
  return (
    <main className="container">
      <div className="archive-note">
        <strong>2025 성적표 아카이브 복원판</strong>
        <span>기준: 2025-09-07 StudentCard 최종 수정 시점. 운영 Firebase와 연결하지 않은 정적 복원본입니다.</span>
      </div>
      <StudentCard {...sampleStudent} />
      <div className="provenance">
        <div>원본 저장소: inseong101/map</div>
        <div>복원 기준 커밋: 71a3b94b385c8d7f13cf809cad67ae802025dbb5</div>
      </div>
    </main>
  )
}
