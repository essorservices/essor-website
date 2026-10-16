export type Point = { x: number; y: number };

type Cubic = [Point, Point, Point, Point];

export type FlightPath = {
  /** SVG path data, in the same pixel space as the points */
  d: string;
  /** For each input point, how far along the path it sits (0 → 1) */
  stops: number[];
};

function cubicLength([p0, p1, p2, p3]: Cubic, samples = 32) {
  let length = 0;
  let prev = p0;
  for (let i = 1; i <= samples; i++) {
    const t = i / samples;
    const u = 1 - t;
    const a = u * u * u;
    const b = 3 * u * u * t;
    const c = 3 * u * t * t;
    const e = t * t * t;
    const p = { x: a * p0.x + b * p1.x + c * p2.x + e * p3.x, y: a * p0.y + b * p1.y + c * p2.y + e * p3.y };
    length += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return length;
}

function toStops(lengths: number[]) {
  const total = lengths.reduce((sum, l) => sum + l, 0) || 1;
  let run = 0;
  return [0, ...lengths.map((l) => (run += l) / total)];
}

const f = (n: number) => n.toFixed(1);

/**
 * A take-off curve through points sorted left to right: it leaves the first point flat
 * (the runway), then climbs more and more steeply. Monotone cubic interpolation
 * (Fritsch–Carlson), so it never dips between two steps.
 */
export function takeOffPath(points: Point[]): FlightPath {
  const n = points.length;
  if (n < 2) return { d: "", stops: points.map(() => 0) };

  const slopes = points.slice(0, -1).map((p, i) => (points[i + 1].y - p.y) / (points[i + 1].x - p.x || 1));
  const tangents = points.map((_, i) => {
    if (i === 0) return 0; // flat runway
    if (i === n - 1) return slopes[n - 2];
    const [a, b] = [slopes[i - 1], slopes[i]];
    return a * b <= 0 ? 0 : (a + b) / 2;
  });
  for (let i = 0; i < n - 1; i++) {
    const s = slopes[i];
    if (s === 0) {
      tangents[i] = tangents[i + 1] = 0;
      continue;
    }
    const a = tangents[i] / s;
    const b = tangents[i + 1] / s;
    const h = a * a + b * b;
    if (h > 9) {
      const t = 3 / Math.sqrt(h);
      tangents[i] = t * a * s;
      tangents[i + 1] = t * b * s;
    }
  }

  const segments: Cubic[] = points.slice(0, -1).map((p, i) => {
    const q = points[i + 1];
    const dx = (q.x - p.x) / 3;
    return [p, { x: p.x + dx, y: p.y + tangents[i] * dx }, { x: q.x - dx, y: q.y - tangents[i + 1] * dx }, q];
  });

  const d =
    `M${f(points[0].x)} ${f(points[0].y)}` +
    segments.map(([, c1, c2, q]) => `C${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(q.x)} ${f(q.y)}`).join("");

  return { d, stops: toStops(segments.map((s) => cubicLength(s))) };
}

/** Straight segments through the points (the vertical timeline on small screens). */
export function polyline(points: Point[]): FlightPath {
  if (points.length < 2) return { d: "", stops: points.map(() => 0) };
  const d = points.map((p, i) => `${i ? "L" : "M"}${f(p.x)} ${f(p.y)}`).join("");
  const lengths = points.slice(1).map((p, i) => Math.hypot(p.x - points[i].x, p.y - points[i].y));
  return { d, stops: toStops(lengths) };
}
