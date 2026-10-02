# legacy-scoreboard-2025

2025년 전졸협 성적표 UI의 독립 아카이브 복원본입니다.

## 복원 기준

- 원본 저장소: `inseong101/map`
- 기준 시점: 2025-09-07
- 기준 `StudentCard.jsx` 커밋: `71a3b94b385c8d7f13cf809cad67ae802025dbb5`

## 보존 요소

- 학수번호/학교 표시
- 회차별 합격 / 불합격 / 무효 배지
- 60% 합격 기준
- 미응시 / 중도포기 무효 처리 개념
- 회차 선택
- 전국 / 학교 분포 전환
- 점수 분포 히스토그램
- 204점(340점의 60%) 커트라인
- 당시 다크 테마

## 의도적으로 제거한 요소

GitHub Pages에서 독립 실행되는 정적 아카이브를 목표로 하므로 다음은 포함하지 않습니다.

- Firebase 인증
- Firestore 실데이터 읽기
- 기존 전졸협 운영사이트 라우팅
- 개인정보/실제 학생 성적
- 관리자 기능

현재는 `src/data/sampleData.js`의 샘플 데이터만 사용합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## GitHub Pages

`Settings > Pages`에서 Source를 **GitHub Actions**로 선택한 뒤 `main` 브랜치에 push하면 자동 배포됩니다.

예상 주소: `https://inseong101.github.io/legacy-scoreboard-2025/`
