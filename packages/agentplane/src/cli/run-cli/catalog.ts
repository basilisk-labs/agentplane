import { COMMANDS } from "./command-catalog.js";

export type CatalogMatch = { entry: (typeof COMMANDS)[number]; consumed: number };

export function matchCommandCatalog(tokens: readonly string[]): CatalogMatch | null {
  let best: CatalogMatch | null = null;
  for (const entry of COMMANDS) {
    const id = entry.spec.id;
    if (tokens.length < id.length) continue;
    let ok = true;
    for (const [i, seg] of id.entries()) {
      if (tokens[i] !== seg) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (!best || id.length > best.consumed) {
      best = { entry, consumed: id.length };
    }
  }
  return best;
}
