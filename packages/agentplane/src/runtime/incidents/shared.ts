import type {
  IncidentAdviceMatch,
  IncidentRegistry,
  IncidentRegistryEntry,
  IncidentRegistryEntryState,
} from "./types.js";

export const STRUCTURED_INCIDENTS_HEADER = [
  "# Policy Incidents Log",
  "",
  "This is the single file for incident-derived and situational policy rules.",
].join("\n");

export const COMPACT_INCIDENTS_HEADER = [
  "# Policy Incidents Log",
  "- Append-only. Required fields: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state`; optional: `tags`, `match`, `advice`, `source_task`, `fixability`.",
].join("\n");

export function normalizeLines(text: string): string[] {
  return text.replaceAll("\r\n", "\n").split("\n");
}

export function normalizeKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .replaceAll(/[\s_-]+/g, "");
}

export function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gi, " ")
    .trim();
}

export function tokenize(text: string): string[] {
  const normalized = normalizeSearchText(text);
  if (!normalized) return [];
  return normalized
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3);
}

export function dedupeCaseInsensitive(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) continue;
    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(trimmed);
  }
  return out;
}

export function parseCsvList(value: string | null | undefined): string[] {
  if (!value) return [];
  return dedupeCaseInsensitive(
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

export function incidentField(key: string, value: string): [string, string] {
  return [key, value];
}

export function parseBoolean(value: string | null | undefined): boolean {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();
  return normalized === "true" || normalized === "yes" || normalized === "y" || normalized === "1";
}

export function parseFixability(
  value: string | null | undefined,
): "external" | "repo-fixable" | null {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replaceAll(/[\s_-]+/g, "");
  if (normalized === "external") return "external";
  if (normalized === "repofixable" || normalized === "internal") return "repo-fixable";
  return null;
}

export function parseEntryState(value: string | null | undefined): IncidentRegistryEntryState {
  return value === "open" || value === "promoted" ? value : "stabilized";
}

export function appendFieldValue(
  record: Record<string, string>,
  key: string,
  value: string,
  joiner = " ",
): void {
  if (!record[key]) {
    record[key] = value.trim();
    return;
  }
  record[key] = `${record[key]}${joiner}${value.trim()}`.trim();
}

export function deriveSourceTask(
  explicitSourceTask: string | null | undefined,
  evidence: string | null | undefined,
): string | null {
  const direct = String(explicitSourceTask ?? "").trim();
  if (direct) return direct;
  const match = /\btasks?\s+([A-Za-z0-9-]+)/iu.exec(String(evidence ?? ""));
  return match?.[1]?.trim() ?? null;
}

export function buildIncidentSignature(
  entry: Pick<IncidentRegistryEntry, "scope" | "failure" | "rule">,
): string {
  return [
    normalizeSearchText(entry.scope),
    normalizeSearchText(entry.failure),
    normalizeSearchText(entry.rule),
  ].join("|");
}

export function buildIncidentFingerprint(
  entry: Pick<IncidentRegistryEntry, "sourceTask" | "scope" | "failure" | "rule">,
): string {
  return [entry.sourceTask ?? "", buildIncidentSignature(entry)].join("|");
}

export function buildMatchTerms(opts: {
  scope: string;
  tags: readonly string[];
  explicitMatch: readonly string[];
  extraText?: readonly string[];
}): string[] {
  const scopeTokens = tokenize(opts.scope);
  const extraTokens = (opts.extraText ?? []).flatMap((value) => tokenize(value));
  return dedupeCaseInsensitive([
    ...opts.explicitMatch,
    ...opts.tags,
    ...scopeTokens,
    ...extraTokens,
  ]).slice(0, 16);
}

function parseDateOnly(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = Date.parse(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed) ? parsed : null;
}

function occursWithinDays(date: string, now: Date, days: number): boolean {
  const timestamp = parseDateOnly(date);
  if (timestamp === null) return false;
  const delta = now.getTime() - timestamp;
  if (delta < 0) return false;
  return delta <= days * 24 * 60 * 60 * 1000;
}

function entryStateRank(state: IncidentRegistryEntryState): number {
  if (state === "promoted") return 2;
  if (state === "stabilized") return 1;
  return 0;
}

export function compareIncidentAdviceMatch(
  left: IncidentAdviceMatch,
  right: IncidentAdviceMatch,
): number {
  if (right.score !== left.score) return right.score - left.score;
  const rightState = entryStateRank(right.entry.state);
  const leftState = entryStateRank(left.entry.state);
  if (rightState !== leftState) return rightState - leftState;
  return right.entry.date.localeCompare(left.entry.date);
}

export function summarizeTaskScope(scope: string | null | undefined, title: string): string {
  const lines = normalizeLines(scope ?? "");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    let candidate = trimmed.replace(/^-+\s*/, "");
    candidate = candidate.replace(/^in scope:\s*/i, "").trim();
    if (!candidate || /^out of scope:/i.test(candidate)) continue;
    return candidate;
  }
  return title.trim();
}

export function buildDerivedIncidentRule(scope: string): string {
  return `Analogous ${scope} work MUST review and apply the recorded external incident advice before retrying.`;
}

export function resolveIncidentState(opts: {
  registry: IncidentRegistry;
  entry: Pick<IncidentRegistryEntry, "scope" | "failure" | "rule">;
  now: Date;
}): IncidentRegistryEntryState {
  const signature = buildIncidentSignature(opts.entry);
  const similarEntries = opts.registry.entries.filter(
    (candidate) => buildIncidentSignature(candidate) === signature,
  );
  if (
    similarEntries.some(
      (candidate) =>
        candidate.state === "promoted" ||
        candidate.state === "stabilized" ||
        occursWithinDays(candidate.date, opts.now, 30),
    )
  ) {
    return "stabilized";
  }
  return "open";
}
