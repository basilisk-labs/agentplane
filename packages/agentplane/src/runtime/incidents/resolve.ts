import type {
  IncidentAdviceMatch,
  IncidentAdviceQuery,
  IncidentCollectionPlan,
  IncidentFindingCandidate,
  IncidentSkippedFinding,
  IncidentPromotionDraft,
  IncidentPromotionIssue,
  IncidentPromotionTaskContext,
  IncidentRegistry,
  IncidentRegistryEntry,
  IncidentRegistryEntryState,
} from "./types.js";

const INCIDENTS_HEADER = [
  "# Policy Incidents Log",
  "",
  "This is the single file for incident-derived and situational policy rules.",
].join("\n");

function normalizeLines(text: string): string[] {
  return text.replaceAll("\r\n", "\n").split("\n");
}

function normalizeKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .replaceAll(/[\s_-]+/g, "");
}

function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gi, " ")
    .trim();
}

function tokenize(text: string): string[] {
  const normalized = normalizeSearchText(text);
  if (!normalized) return [];
  return normalized
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3);
}

function dedupeCaseInsensitive(values: readonly string[]): string[] {
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

function parseCsvList(value: string | null | undefined): string[] {
  if (!value) return [];
  return dedupeCaseInsensitive(
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

function parseBoolean(value: string | null | undefined): boolean {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();
  return normalized === "true" || normalized === "yes" || normalized === "y" || normalized === "1";
}

function parseFixability(value: string | null | undefined): "external" | null {
  return String(value ?? "")
    .trim()
    .toLowerCase() === "external"
    ? "external"
    : null;
}

function parseEntryState(value: string | null | undefined): IncidentRegistryEntryState {
  return value === "open" || value === "promoted" ? value : "stabilized";
}

function appendFieldValue(
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

function buildIncidentSignature(
  entry: Pick<IncidentRegistryEntry, "scope" | "failure" | "rule">,
): string {
  return [
    normalizeSearchText(entry.scope),
    normalizeSearchText(entry.failure),
    normalizeSearchText(entry.rule),
  ].join("|");
}

function buildIncidentFingerprint(
  entry: Pick<IncidentRegistryEntry, "sourceTask" | "scope" | "failure" | "rule">,
): string {
  return [entry.sourceTask ?? "", buildIncidentSignature(entry)].join("|");
}

function buildMatchTerms(opts: {
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

function compareIncidentAdviceMatch(left: IncidentAdviceMatch, right: IncidentAdviceMatch): number {
  if (right.score !== left.score) return right.score - left.score;
  const rightState = entryStateRank(right.entry.state);
  const leftState = entryStateRank(left.entry.state);
  if (rightState !== leftState) return rightState - leftState;
  return right.entry.date.localeCompare(left.entry.date);
}

function summarizeTaskScope(scope: string | null | undefined, title: string): string {
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

function buildDerivedIncidentRule(scope: string): string {
  return `Analogous ${scope} work MUST review and apply the recorded external incident advice before retrying.`;
}

function resolveIncidentState(opts: {
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

export function createIncidentRegistrySkeleton(): string {
  return [
    INCIDENTS_HEADER,
    "",
    "## Entry contract",
    "",
    "- Add entries append-only.",
    "- Every entry MUST include: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state`.",
    "- New machine-matched entries SHOULD also include: `tags`, `match`, `advice`, `source_task`, `fixability`.",
    "- `rule` MUST be concrete and testable (`MUST` / `MUST NOT`).",
    "- `fixability: external` means the issue cannot be removed by changing only repository code and should stay as reusable operational advice.",
    "- First auto-promoted external incidents normally enter as `open` and still participate in targeted advice lookup; recurring equivalent incidents can append later `stabilized` entries.",
    "- `state` values: `open`, `stabilized`, `promoted`.",
    "",
    "## Entry template",
    "",
    "- id: `INC-YYYYMMDD-NN`",
    "- date: `YYYY-MM-DD`",
    "- scope: `<affected scope>`",
    "- tags: `<comma-separated matching tags>`",
    "- match: `<comma-separated lookup keywords>`",
    "- failure: `<observed failure mode>`",
    "- advice: `<reusable recovery or prevention guidance>`",
    "- rule: `<new or refined MUST/MUST NOT>`",
    "- evidence: `<task ids / logs / links>`",
    "- enforcement: `<CI|test|lint|script|manual>`",
    "- source_task: `<task id>`",
    "- fixability: `<external>`",
    "- state: `<open|stabilized|promoted>`",
    "",
    "## Entries",
    "",
  ].join("\n");
}

export function parseIncidentRegistry(text: string): IncidentRegistry {
  const lines = normalizeLines(text);
  const entries: IncidentRegistryEntry[] = [];
  let inEntries = false;
  let currentFields: Record<string, string> | null = null;
  let currentLine = 0;
  let currentKey: string | null = null;

  const flush = () => {
    if (!currentFields) return;
    const id = currentFields.id?.trim();
    if (!id) {
      currentFields = null;
      currentKey = null;
      currentLine = 0;
      return;
    }
    const scope = currentFields.scope?.trim() ?? "";
    const failure = currentFields.failure?.trim() ?? "";
    const rule = currentFields.rule?.trim() ?? "";
    const evidence = currentFields.evidence?.trim() ?? "";
    const enforcement = currentFields.enforcement?.trim() ?? "manual";
    entries.push({
      id,
      date: currentFields.date?.trim() ?? "",
      scope,
      failure,
      rule,
      evidence,
      enforcement,
      state: parseEntryState(currentFields.state),
      tags: parseCsvList(currentFields.tags),
      match: parseCsvList(currentFields.match),
      advice: currentFields.advice?.trim() || null,
      sourceTask: currentFields.source_task?.trim() || null,
      fixability: currentFields.fixability?.trim().toLowerCase() === "external" ? "external" : null,
      rawFields: { ...currentFields },
      line: currentLine,
    });
    currentFields = null;
    currentKey = null;
    currentLine = 0;
  };

  for (const [index, line] of lines.entries()) {
    const trimmed = line.trim();
    if (!inEntries) {
      if (trimmed === "## Entries") inEntries = true;
      continue;
    }
    if (/^##\s+/.test(trimmed)) break;

    const idMatch = /^- id:\s*(.+?)\s*$/.exec(trimmed);
    if (idMatch) {
      flush();
      currentFields = { id: idMatch[1] ?? "" };
      currentKey = "id";
      currentLine = index + 1;
      continue;
    }

    if (!currentFields) continue;

    const fieldMatch = /^\s{2}([a-z_]+):\s*(.*?)\s*$/.exec(line);
    if (fieldMatch) {
      currentKey = String(fieldMatch[1] ?? "").trim();
      currentFields[currentKey] = fieldMatch[2] ?? "";
      continue;
    }

    if (currentKey && /^\s{4,}\S/.test(line)) {
      appendFieldValue(currentFields, currentKey, line.trim(), "\n");
      continue;
    }

    if (!trimmed) {
      flush();
    }
  }

  flush();
  return { entries };
}

export function formatIncidentRegistryEntry(entry: IncidentRegistryEntry): string {
  return [
    `- id: ${entry.id}`,
    `  date: ${entry.date}`,
    `  scope: ${entry.scope}`,
    ...(entry.tags.length > 0 ? [`  tags: ${entry.tags.join(", ")}`] : []),
    ...(entry.match.length > 0 ? [`  match: ${entry.match.join(", ")}`] : []),
    `  failure: ${entry.failure}`,
    ...(entry.advice ? [`  advice: ${entry.advice}`] : []),
    `  rule: ${entry.rule}`,
    `  evidence: ${entry.evidence}`,
    `  enforcement: ${entry.enforcement}`,
    ...(entry.sourceTask ? [`  source_task: ${entry.sourceTask}`] : []),
    ...(entry.fixability ? [`  fixability: ${entry.fixability}`] : []),
    `  state: ${entry.state}`,
  ].join("\n");
}

export function appendIncidentRegistryEntries(
  currentText: string,
  entries: readonly IncidentRegistryEntry[],
): string {
  if (entries.length === 0) return currentText;
  const base =
    currentText.trim().length > 0
      ? currentText.trimEnd()
      : createIncidentRegistrySkeleton().trimEnd();
  const suffix = entries.map((entry) => formatIncidentRegistryEntry(entry)).join("\n\n");
  return `${base}\n\n${suffix}\n`;
}

export function extractIncidentCandidatesFromFindings(
  findings: string,
): IncidentFindingCandidate[] {
  return parseIncidentFindingBlocks(findings)
    .filter((candidate) => candidate.shouldPromote)
    .map(({ shouldPromote: _shouldPromote, ...candidate }) => candidate);
}

function parseIncidentFindingBlocks(
  findings: string,
): (IncidentFindingCandidate & { shouldPromote: boolean })[] {
  const lines = normalizeLines(findings);
  const candidates: (IncidentFindingCandidate & { shouldPromote: boolean })[] = [];
  let currentFields: Record<string, string> | null = null;
  let currentLine = 0;
  let currentKey: string | null = null;

  const flush = () => {
    if (!currentFields) return;
    const promotion = currentFields.promotion?.trim() || null;
    const fixability = parseFixability(currentFields.fixability);
    const incidentExternal =
      parseBoolean(currentFields.incidentexternal) || fixability === "external";
    const shouldPromote = promotion?.toLowerCase() === "incident-candidate" || incidentExternal;
    const observation = currentFields.observation?.trim() ?? "";
    if (!observation) {
      currentFields = null;
      currentKey = null;
      currentLine = 0;
      return;
    }
    candidates.push({
      observation,
      impact: currentFields.impact?.trim() || null,
      resolution: currentFields.resolution?.trim() || null,
      promotion,
      incidentScope: currentFields.incidentscope?.trim() || null,
      incidentRule: currentFields.incidentrule?.trim() || null,
      incidentAdvice: currentFields.incidentadvice?.trim() || null,
      incidentTags: parseCsvList(currentFields.incidenttags),
      incidentMatch: parseCsvList(currentFields.incidentmatch),
      incidentExternal,
      fixability,
      shouldPromote,
      line: currentLine,
      rawFields: { ...currentFields },
    });
    currentFields = null;
    currentKey = null;
    currentLine = 0;
  };

  for (const [index, line] of lines.entries()) {
    const observationMatch = /^\s*-\s+Observation:\s*(.*?)\s*$/.exec(line);
    if (observationMatch) {
      flush();
      currentFields = { observation: observationMatch[1] ?? "" };
      currentKey = "observation";
      currentLine = index + 1;
      continue;
    }

    if (!currentFields) continue;

    if (/^\s*-\s+/.test(line)) {
      flush();
      const nestedObservationMatch = /^\s*-\s+Observation:\s*(.*?)\s*$/.exec(line);
      if (nestedObservationMatch) {
        currentFields = { observation: nestedObservationMatch[1] ?? "" };
        currentKey = "observation";
        currentLine = index + 1;
      }
      continue;
    }

    const fieldMatch = /^\s{2,}([A-Za-z][A-Za-z0-9 _-]*):\s*(.*?)\s*$/.exec(line);
    if (fieldMatch) {
      currentKey = normalizeKey(fieldMatch[1] ?? "");
      currentFields[currentKey] = fieldMatch[2] ?? "";
      continue;
    }

    if (currentKey && /^\s{2,}\S/.test(line)) {
      appendFieldValue(currentFields, currentKey, line.trim(), "\n");
      continue;
    }

    if (!line.trim()) {
      continue;
    }

    if (currentKey) {
      appendFieldValue(currentFields, currentKey, line.trim());
    }
  }

  flush();
  return candidates;
}

function nextIncidentId(entries: readonly IncidentRegistryEntry[], now: Date): string {
  const dateStamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(
    now.getUTCDate(),
  ).padStart(2, "0")}`;
  const prefix = `INC-${dateStamp}-`;
  let max = 0;
  for (const entry of entries) {
    if (!entry.id.startsWith(prefix)) continue;
    const num = Number.parseInt(entry.id.slice(prefix.length), 10);
    if (Number.isInteger(num) && num > max) max = num;
  }
  return `${prefix}${String(max + 1).padStart(2, "0")}`;
}

function buildPromotionIssues(candidate: IncidentFindingCandidate): IncidentPromotionIssue | null {
  const missingFields: string[] = [];
  if (!candidate.incidentExternal && candidate.fixability !== "external") {
    missingFields.push("Fixability: external or IncidentExternal: true");
  }
  if (!candidate.incidentAdvice && !candidate.resolution) {
    missingFields.push("Resolution or IncidentAdvice");
  }
  return missingFields.length > 0 ? { candidate, missingFields } : null;
}

function buildIncidentRegistryEntry(opts: {
  task: IncidentPromotionTaskContext;
  candidate: IncidentFindingCandidate;
  now: Date;
  registry: IncidentRegistry;
}): IncidentRegistryEntry {
  const date = opts.now.toISOString().slice(0, 10);
  const scope =
    opts.candidate.incidentScope ?? summarizeTaskScope(opts.task.scope, opts.task.title);
  const tags = dedupeCaseInsensitive([
    ...opts.candidate.incidentTags,
    ...opts.task.tags.map((tag) => tag.trim()),
  ]);
  const advice =
    opts.candidate.incidentAdvice ?? opts.candidate.resolution ?? opts.candidate.observation;
  const rule = opts.candidate.incidentRule ?? buildDerivedIncidentRule(scope);
  const state = resolveIncidentState({
    registry: opts.registry,
    entry: {
      scope,
      failure: opts.candidate.observation,
      rule,
    },
    now: opts.now,
  });
  const match = buildMatchTerms({
    scope,
    tags,
    explicitMatch: opts.candidate.incidentMatch,
    extraText: [opts.task.title, opts.task.description, advice],
  });
  return {
    id: nextIncidentId(opts.registry.entries, opts.now),
    date,
    scope,
    failure: opts.candidate.observation,
    rule,
    evidence: `task ${opts.task.id}${opts.task.commitHash ? `; commit ${opts.task.commitHash.slice(0, 12)}` : ""}`,
    enforcement: "manual",
    state,
    tags,
    match,
    advice,
    sourceTask: opts.task.id,
    fixability: "external",
    rawFields: {},
    line: 0,
  };
}

export function planIncidentCollection(opts: {
  task: IncidentPromotionTaskContext;
  findings: string;
  registry: IncidentRegistry;
  now?: Date;
}): IncidentCollectionPlan {
  const parsed = parseIncidentFindingBlocks(opts.findings);
  const candidates = parsed
    .filter((candidate) => candidate.shouldPromote)
    .map(({ shouldPromote: _shouldPromote, ...candidate }) => candidate);
  const skipped: IncidentSkippedFinding[] = parsed
    .filter((candidate) => !candidate.shouldPromote)
    .map(({ observation, line, rawFields }) => ({
      observation,
      line,
      reason: "not_marked_external_or_promotable",
      rawFields,
    }));
  const issues: IncidentPromotionIssue[] = [];
  const promotable: IncidentPromotionDraft[] = [];
  const duplicates: IncidentPromotionDraft[] = [];
  const now = opts.now ?? new Date();
  const seenFingerprints = new Set(
    opts.registry.entries.map((entry) => buildIncidentFingerprint(entry)),
  );

  for (const candidate of candidates) {
    const issue = buildPromotionIssues(candidate);
    if (issue) {
      issues.push(issue);
      continue;
    }
    const entry = buildIncidentRegistryEntry({
      task: opts.task,
      candidate,
      now,
      registry: parseIncidentRegistry(
        appendIncidentRegistryEntries(createIncidentRegistrySkeleton(), [
          ...opts.registry.entries,
          ...promotable.map((item) => item.entry),
        ]),
      ),
    });
    const fingerprint = buildIncidentFingerprint(entry);
    const draft: IncidentPromotionDraft = { candidate, entry, fingerprint };
    if (seenFingerprints.has(fingerprint)) {
      duplicates.push(draft);
      continue;
    }
    seenFingerprints.add(fingerprint);
    promotable.push(draft);
  }

  return { candidates, skipped, promotable, duplicates, issues };
}

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
  matches.sort((left, right) => {
    return compareIncidentAdviceMatch(left, right);
  });
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
