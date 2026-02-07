function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a) return b.length;
  if (!b) return a.length;

  // O(min(a,b)) memory.
  const s = a;
  const t = b;
  const m = s.length;
  const n = t.length;

  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  let curr = Array.from({ length: n + 1 }, () => 0);

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    const sc = s.codePointAt(i - 1) ?? 0;
    for (let j = 1; j <= n; j++) {
      const tc = t.codePointAt(j - 1) ?? 0;
      const cost = sc === tc ? 0 : 1;
      const del = prev[j] + 1;
      const ins = curr[j - 1] + 1;
      const sub = prev[j - 1] + cost;
      curr[j] = Math.min(del, ins, sub);
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}

export function suggestOne(input: string, candidates: readonly string[]): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let best: { cand: string; dist: number } | null = null;
  for (const cand of candidates) {
    const dist = levenshtein(trimmed, cand);
    if (!best || dist < best.dist) best = { cand, dist };
  }
  if (!best) return null;

  // Conservative threshold: avoid noisy suggestions.
  const maxAllowed = Math.max(2, Math.floor(best.cand.length / 3));
  return best.dist <= maxAllowed ? best.cand : null;
}
