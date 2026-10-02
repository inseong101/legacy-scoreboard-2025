export const fmt = v => Number.isFinite(Number(v)) ? Number(v).toFixed(0) : '-'
export const pct = (score, max) => max > 0 ? +((Number(score || 0) / max) * 100).toFixed(1) : 0
export const chunk = (items, sizes = []) => {
  const out = []; let i = 0
  for (const size of sizes) { out.push(items.slice(i, i + size)); i += size }
  if (i < items.length) out.push(items.slice(i))
  return out
}
