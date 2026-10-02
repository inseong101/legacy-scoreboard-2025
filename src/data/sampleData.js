export const sampleStudent = {
  sid: '021234',
  school: '경희대',
  rounds: [
    {
      label: '1회',
      data: {
        totalScore: 228,
        totalMax: 340,
        status: 'completed',
        nationalAvg: 214.2,
        schoolAvg: 221.8,
        nationalScores: [165,178,182,190,194,201,205,208,211,214,216,219,222,225,228,231,236,240,245,252,260,271],
        schoolScores: [194,205,211,218,222,228,231,236,245,252]
      }
    },
    {
      label: '2회',
      data: {
        totalScore: 196,
        totalMax: 340,
        status: 'completed',
        nationalAvg: 207.5,
        schoolAvg: 213.4,
        nationalScores: [152,170,176,182,188,191,196,201,205,207,209,214,219,223,229,234,241,248,256],
        schoolScores: [176,188,196,205,209,214,223,234,248]
      }
    },
    {
      label: '3회',
      data: {
        totalScore: null,
        totalMax: 340,
        status: 'dropout',
        nationalAvg: 218.1,
        schoolAvg: 224.7,
        nationalScores: [171,184,190,198,204,210,214,218,221,225,228,232,237,242,248,255,262,274],
        schoolScores: [198,210,218,225,228,237,242,255]
      }
    }
  ]
}
