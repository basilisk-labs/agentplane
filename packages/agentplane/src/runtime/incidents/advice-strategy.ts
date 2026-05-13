import type { IncidentAdviceMatch, IncidentAdviceQuery, IncidentRegistry } from "./types.js";
import {
  buildIncidentSignature,
  compareIncidentAdviceMatch,
  dedupeCaseInsensitive,
  normalizeSearchText,
  tokenize,
} from "./shared.js";

export function buildIncidentAdviceQueryFromTask(opts: {
  taskId: string;
  title: string;
  description: string;
  scope?: string | null;
  tags: readonly string[];
}): IncidentAdviceQuery {
  return {
    taskId: opts.taskId,
    title: opts.title,
    description: opts.description,
    scope: opts.scope ?? null,
    tags: dedupeCaseInsensitive(opts.tags),
  };
}

export function resolveIncidentAdviceMatches(opts: {
  query: IncidentAdviceQuery;
  registry: IncidentRegistry;
  limit?: number;
}): IncidentAdviceMatch[] {
  // Deterministic candidate scaffold: CURATOR owns semantic fit and promotion judgment.
  const limit = Math.max(1, opts.limit ?? 5);
  const tagSet = new Set(opts.query.tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean));
  const haystack = [opts.query.title, opts.query.description, opts.query.scope ?? ""].join(" ");
  const normalizedHaystack = normalizeSearchText(haystack);
  const queryTokens = new Set([...tokenize(haystack), ...tagSet]);
  const matchesBySignature = new Map<string, IncidentAdviceMatch>();

  for (const entry of opts.registry.entries) {
    const matchedTags = entry.tags.filter((tag) => tagSet.has(tag.trim().toLowerCase()));
    const matchedTerms = entry.match.filter(
      (term) =>
        queryTokens.has(term.trim().toLowerCase()) ||
        normalizedHaystack.includes(normalizeSearchText(term)),
    );
    const normalizedScope = normalizeSearchText(entry.scope);
    const scopeMatched = normalizedScope.length > 0 && normalizedHaystack.includes(normalizedScope);
    const score = matchedTags.length * 5 + matchedTerms.length * 2 + (scopeMatched ? 3 : 0);
    if (score <= 0) continue;
    const match: IncidentAdviceMatch = { entry, score, matchedTags, matchedTerms, scopeMatched };
    const signature = buildIncidentSignature(entry);
    const existing = matchesBySignature.get(signature);
    if (!existing || compareIncidentAdviceMatch(match, existing) < 0) {
      matchesBySignature.set(signature, match);
    }
  }

  const matches = [...matchesBySignature.values()];
  matches.sort((left, right) => compareIncidentAdviceMatch(left, right));
  return matches.slice(0, limit);
}

export function renderIncidentAdvice(matches: readonly IncidentAdviceMatch[]): string {
  if (matches.length === 0) return "No matching incident advice.";
  return matches
    .map((match) => {
      const lines = [
        `- ${match.entry.id} | scope: ${match.entry.scope}`,
        `  failure: ${match.entry.failure}`,
        `  advice: ${match.entry.advice ?? match.entry.rule}`,
        `  rule: ${match.entry.rule}`,
      ];
      if (match.entry.evidence) lines.push(`  evidence: ${match.entry.evidence}`);
      return lines.join("\n");
    })
    .join("\n");
}
