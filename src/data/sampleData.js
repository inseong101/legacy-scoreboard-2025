const groupsFor = (subjectScores) => {
  const defs = [
    ['그룹 1',['간','심','비','폐','신','상한','사상']],[ '그룹 2',['보건'] ],['그룹 3',['침구']],
    ['그룹 4',['외과','신경','안이비']],['그룹 5',['부인과','소아']],['그룹 6',['예방','생리','본초']]
  ]
  const maxMap={간:16,심:16,비:16,폐:16,신:16,상한:16,사상:16,침구:48,보건:20,외과:16,신경:16,안이비:16,부인과:32,소아:24,예방:24,생리:16,본초:16}
  return defs.map(([label,subjects])=>{
    const score=subjects.reduce((a,s)=>a+(subjectScores[s]||0),0)
    const max=subjects.reduce((a,s)=>a+(maxMap[s]||0),0)
    const rate=+((score/max)*100).toFixed(1)
    return {label,subjects,score,max,rate,pass:rate>=40}
  })
}

const round = (label,totalScore,subjectScores,wrongBySession,nationalAvg,schoolAvg,nationalScores,schoolScores) => {
  const groupResults=groupsFor(subjectScores)
  const meets60=totalScore>=204
  const anyGroupFail=groupResults.some(g=>!g.pass)
  return {
    label,
    data:{
      totalScore,totalMax:340,status:'completed',meets60,anyGroupFail,overallPass:meets60&&!anyGroupFail,
      groupResults,subjectScores,wrongBySession,nationalAvg,schoolAvg,nationalScores,schoolScores
    }
  }
}

export const sampleStudent={
  sid:'021234',
  school:'경희대',
  rounds:[
    round('1차',228,
      {간:12,심:13,비:11,폐:13,신:12,상한:12,사상:11,침구:37,보건:15,외과:12,신경:12,안이비:13,부인과:23,소아:18,예방:18,생리:14,본초:14},
      {'1교시':[2,7,18,31,46,58,77],'2교시':[3,14,21,39,55,70,88],'3교시':[6,22,35,58,69],'4교시':[4,13,29,44,57,72]},
      214.2,221.8,[165,178,182,190,194,201,205,208,211,214,216,219,222,225,228,231,236,240,245,252,260,271],[194,205,211,218,222,228,231,236,245,252]),
    round('2차',196,
      {간:10,심:11,비:9,폐:11,신:10,상한:9,사상:10,침구:31,보건:11,외과:10,신경:11,안이비:10,부인과:20,소아:15,예방:16,생리:12,본초:10},
      {'1교시':[1,5,8,14,21,27,34,39,52,60,69,75],'2교시':[2,6,12,19,24,31,42,49,58,66,77,84,92],'3교시':[3,11,20,28,36,45,54,62,71,78],'4교시':[5,9,17,26,33,41,50,59,68,76]},
      207.5,213.4,[152,170,176,182,188,191,196,201,205,207,209,214,219,223,229,234,241,248,256],[176,188,196,205,209,214,223,234,248])
  ]
}
