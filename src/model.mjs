export function analyze(input){
  const {demand,facilities,candidates,radiusKm}=input;
  if(!Number.isFinite(radiusKm)||radiusKm<=0)throw Error('radiusKm must be positive');
  for(const list of [demand,facilities,candidates]){
    if(!Array.isArray(list))throw Error('Expected point arrays');
    const ids=new Set();
    for(const p of list){if(!p||typeof p.id!=='string'||!p.id||ids.has(p.id)||!Number.isFinite(p.x)||!Number.isFinite(p.y))throw Error('Points require unique ids and finite projected coordinates');ids.add(p.id);}
  }
  if(!demand.length||!candidates.length||demand.some(p=>!Number.isFinite(p.population)||p.population<0))throw Error('Demand and candidates required; populations nonnegative');
  const total=demand.reduce((s,p)=>s+p.population,0);if(total<=0)throw Error('Total population must be positive');
  const covered=(p,sites)=>sites.some(f=>Math.hypot(p.x-f.x,p.y-f.y)<=radiusKm);
  const baseline=demand.reduce((s,p)=>s+(covered(p,facilities)?p.population:0),0);
  const ranking=candidates.map(c=>({candidate:c.id,coveredPopulation:demand.reduce((s,p)=>s+(covered(p,[...facilities,c])?p.population:0),0)})).map(c=>({...c,additionalPopulation:c.coveredPopulation-baseline})).sort((a,b)=>b.additionalPopulation-a.additionalPopulation);
  return {totalPopulation:total,baselineCoveredPopulation:baseline,baselineCoverage:baseline/total,bestCandidate:ranking[0].candidate,coverageAfter:ranking[0].coveredPopulation/total,ranking};
}
