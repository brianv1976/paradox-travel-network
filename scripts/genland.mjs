const URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson';
const res = await fetch(URL);
if (!res.ok) { console.error('HTTP', res.status); process.exit(1); }
const gj = await res.json();

const rings = [];
for (const f of gj.features) {
  const g = f.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  for (const poly of polys) {
    const ring = poly[0];
    if (!ring || ring.length < 6) continue;
    const step = ring.length > 140 ? 2 : 1;
    const out = [];
    for (let i = 0; i < ring.length; i += step) {
      out.push(+ring[i][0].toFixed(1), +ring[i][1].toFixed(1));
    }
    if (out.length >= 12) rings.push(out);
  }
}
const encoded = rings.map(r => r.join(',')).join(';');
const file = `/**
 * Real world coastlines — Natural Earth 1:110m "land" dataset, decimated to
 * globe resolution (~0.1 degree) and baked in at build time so the globe has
 * no runtime network dependency.
 *
 * Encoding: rings separated by ";", each ring a flat "lng,lat,lng,lat,..."
 * list. Kept as one string because ${rings.length} nested arrays of numbers
 * costs far more to parse and to diff.
 *
 * Source: github.com/nvkelso/natural-earth-vector (public domain)
 * Regenerate with scripts/genland.mjs
 */
export const LAND_RINGS = "${encoded}";

export function decodeLandRings(): number[][] {
  return LAND_RINGS.split(";").map((r) => r.split(",").map(Number));
}
`;
await (await import('node:fs/promises')).writeFile('src/data/worldLand.ts', file, 'utf8');
console.log('rings', rings.length, 'points', encoded.split(';').reduce((a,s)=>a+s.split(',').length/2,0), 'kb', Math.round(file.length/1024));
