import type {
  IncidentCollectionPlan,
  IncidentFindingCandidate,
  IncidentPromotionDraft,
  IncidentPromotionIssue,
  IncidentPromotionTaskContext,
  IncidentRegistry,
  IncidentRegistryEntry,
  IncidentSkippedFinding,
} from "./types.js";
import {
  buildDerivedIncidentRule,
  buildIncidentFingerprint,
  buildMatchTerms,
  dedupeCaseInsensitive,
  normalizeLines,
  parseBoolean,
  parseCsvList,
  parseFixability,
  resolveIncidentState,
  summarizeTaskScope,
  appendFieldValue,
  normalizeKey,
} from "./shared.js";
import {
  appendIncidentRegistryEntries,
  createIncidentRegistrySkeleton,
  parseIncidentRegistry,
} from "./registry-strategy.js";

function parseIncidentFindingBlocks(findings: string): (IncidentFindingCandidate & {
  shouldPromote: boolean;
  skipReason: IncidentSkippedFinding["reason"] | null;
})[] {
  // Deterministic parser for CURATOR-style incident findings; semantic promotion remains bounded by the authored fields.
  const lines = normalizeLines(findings);
  const candidates: (IncidentFindingCandidate & {
    shouldPromote: boolean;
    skipReason: IncidentSkippedFinding["reason"] | null;
  })[] = [];
  let currentFields: Record<string, string> | null = null;
  let currentLine = 0;
  let currentKey: string | null = null;

  const flush = () => {
    if (!currentFields) return;
    const promotion = currentFields.promotion?.trim() || null;
    const fixability = parseFixability(currentFields.fixability);
    const incidentExternal =
      parseBoolean(currentFields.incidentexternal) || fixability === "external";
    const incidentInternal =
      parseBoolean(currentFields.incidentinternal) || fixability === "repo-fixable";
    const hasPromotionSignal =
      promotion?.toLowerCase() === "incident-candidate" || incidentExternal || incidentInternal;
    const signalValues = [
      currentFields.observation,
      currentFields.impact,
      currentFields.resolution,
      currentFields.incidentrule,
      currentFields.incidentadvice,
    ];
    const failureLike = hasFailureSignal(signalValues);
    const successSummary = hasSuccessSummarySignal(signalValues);
    const shouldPromote = hasPromotionSignal && failureLike && !successSummary;
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
      incidentInternal,
      fixability,
      shouldPromote,
      line: currentLine,
      rawFields: { ...currentFields },
      skipReason: hasPromotionSignal ? "not_failure_like" : "not_marked_external_or_promotable",
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

    if (!line.trim()) continue;
    if (currentKey) appendFieldValue(currentFields, currentKey, line.trim());
  }

  flush();
  return candidates;
}

function hasFailureSignal(values: readonly (string | null | undefined)[]): boolean {
  const text = values
    .map((value) =>
      String(value ?? "")
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean)
    .join(" ");
  if (!text) return false;
  return /\b(blocked|broke|broken|cannot|conflict|could not|deadlock|deadlocked|drift(?:ed|ing)?|error|fail(?:ed|ing|ure)?|flaky|forced|hang(?:ing)?|incorrect|lost|manual recover(?:y|ies)|manual retries|mistak(?:e|es)|missing|mutat(?:e|ed|ion)|pending|pollution|rejected|retry|stalled|timeout|unexpected|violat(?:e|ed|ion)|wrong)\b/u.test(
    text,
  );
}

function hasSuccessSummarySignal(values: readonly (string | null | undefined)[]): boolean {
  const text = values
    .map((value) =>
      String(value ?? "")
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean)
    .join(" ");
  if (!text) return false;
  return /\b(checks?|commands?|tests?|typecheck|doctor|ci|build|lint)\s+(?:now\s+)?pass(?:ed|es)?\b|\b(?:added|implemented|updated|ported|verified|normalized|surface(?:d)?|validated|documented)\b/u.test(
    text,
  );
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
  if (!candidate.incidentExternal && !candidate.incidentInternal && candidate.fixability === null) {
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
    fixability:
      opts.candidate.fixability ?? (opts.candidate.incidentInternal ? "repo-fixable" : "external"),
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
    .map(({ shouldPromote: _shouldPromote, skipReason: _skipReason, ...candidate }) => candidate);
  const skipped: IncidentSkippedFinding[] = parsed
    .filter((candidate) => !candidate.shouldPromote)
    .map(({ observation, line, rawFields, skipReason }) => ({
      observation,
      line,
      reason: skipReason ?? "not_marked_external_or_promotable",
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

  return {
    candidates,
    skipped,
    promotable,
    duplicates,
    issues,
    findingsTextPresent: opts.findings.trim().length > 0,
    structuredFindingCount: parsed.length,
  };
}
