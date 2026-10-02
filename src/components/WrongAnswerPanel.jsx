import React, { useMemo, useState } from 'react'
import './WrongPanel.css'

const SESSION_LENGTH = { '1교시':80, '2교시':100, '3교시':80, '4교시':80 }

export default function WrongAnswerPanel({ roundLabel, data }) {
  const [openSession, setOpenSession] = useState('1교시')
  const wrongBySession = useMemo(() => {
    const out = { '1교시':new Set(), '2교시':new Set(), '3교시':new Set(), '4교시':new Set() }
    for (const [sess, arr] of Object.entries(data?.wrongBySession || {})) {
      if (Array.isArray(arr)) arr.forEach(n => out[sess]?.add(Number(n)))
    }
    return out
  }, [data])

  return (
    <div>
      <h2 style={{ marginTop:0 }}>{roundLabel} 오답 보기</h2>
      <div className="small" style={{ opacity:.85, marginBottom:6 }}>
        색상: <b style={{ color:'#ffd8d8' }}>빨강</b>=내 오답, 회색=정답(또는 데이터 없음)
      </div>
      <div className="accordion">
        {Object.keys(SESSION_LENGTH).map(session => {
          const isOpen = openSession === session
          return (
            <div className="session" key={session}>
              <button type="button" className={`session-head ${isOpen ? 'open' : ''}`} onClick={() => setOpenSession(session)}>
                <span>{session}</span><span className="arrow">❯</span>
              </button>
              {isOpen && (
                <div className="panel">
                  <div className="grid">
                    {Array.from({ length:SESSION_LENGTH[session] }, (_,i) => {
                      const q = i + 1
                      return <button key={q} type="button" className={`qbtn${wrongBySession[session].has(q) ? ' red' : ''}`}>{q}</button>
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
