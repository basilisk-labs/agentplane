import type { IncidentRegistry, IncidentRegistryEntry } from "./types.js";
import {
  appendFieldValue,
  buildIncidentFingerprint,
  COMPACT_INCIDENTS_HEADER,
  deriveSourceTask,
  incidentField,
  normalizeKey,
  normalizeLines,
  parseCsvList,
  parseEntryState,
  parseFixability,
  STRUCTURED_INCIDENTS_HEADER,
} from "./shared.js";

export function createIncidentRegistrySkeleton(): string {
  return [
    STRUCTURED_INCIDENTS_HEADER,
    "",
    "## Entry contract",
    "",
    "- Add entries append-only.",
    "- Every entry MUST include: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state`.",
    "- New machine-matched entries SHOULD also include: `tags`, `match`, `advice`, `source_task`, `fixability`.",
    "- `rule` MUST be concrete and testable (`MUST` / `MUST NOT`).",
    "- `fixability: external` means the issue cannot be removed by changing only repository code and should stay as reusable operational advice.",
    "- `fixability: repo-fixable` means the issue can be removed by repository code changes and should still be captured as reusable incident advice when explicitly marked.",
    "- First auto-promoted reusable incidents normally enter as `open` and still participate in targeted advice lookup; recurring equivalent incidents can append later `stabilized` entries.",
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
    "- fixability: `<external|repo-fixable>`",
    "- state: `<open|stabilized|promoted>`",
    "",
    "## Entries",
    "",
  ].join("\n");
}

export function parseIncidentRegistry(text: string): IncidentRegistry {
  const lines = normalizeLines(text);
  const entries: IncidentRegistryEntry[] = [];
  let currentFields: Record<string, string> | null = null;
  let currentLine = 0;
  let currentKey: string | null = null;

  const flush = () => {
    if (!currentFields) return;
    const id = currentFields.id?.trim();
    if (!id || !/^INC-\d{8}-\d+$/u.test(id)) {
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
    if (!scope || !failure || !rule || !evidence) {
      currentFields = null;
      currentKey = null;
      currentLine = 0;
      return;
    }
    const sourceTask = deriveSourceTask(
      currentFields.source_task ?? currentFields.sourcetask,
      evidence,
    );
    entries.push({
      id,
      date: currentFields.date?.trim() ?? "",
      scope,
      tags: parseCsvList(currentFields.tags),
      match: parseCsvList(currentFields.match),
      failure,
      advice: currentFields.advice?.trim() || null,
      rule,
      evidence,
      enforcement,
      sourceTask,
      fixability: parseFixability(currentFields.fixability),
      state: parseEntryState(currentFields.state),
      rawFields: { ...currentFields },
      line: currentLine,
    });
    currentFields = null;
    currentKey = null;
    currentLine = 0;
  };

  for (const [index, line] of lines.entries()) {
    const trimmed = line.trim();
    const inlineFields = parseInlineIncidentEntry(trimmed);
    if (inlineFields) {
      flush();
      currentFields = { ...inlineFields };
      const keys = Object.keys(inlineFields);
      currentKey = keys.at(-1) ?? "id";
      currentLine = index + 1;
      continue;
    }

    const idMatch = /^\s*-\s+id:\s*(.*?)\s*$/u.exec(line);
    if (idMatch) {
      flush();
      currentFields = { id: idMatch[1] ?? "" };
      currentKey = "id";
      currentLine = index + 1;
      continue;
    }

    if (!currentFields) continue;

    if (/^##\s+/.test(trimmed)) {
      flush();
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      flush();
      const nestedIdMatch = /^\s*-\s+id:\s*(.*?)\s*$/u.exec(line);
      if (nestedIdMatch) {
        currentFields = { id: nestedIdMatch[1] ?? "" };
        currentKey = "id";
        currentLine = index + 1;
      }
      continue;
    }

    const fieldMatch = /^\s{2,}([A-Za-z][A-Za-z0-9 _-]*):\s*(.*?)\s*$/u.exec(line);
    if (fieldMatch) {
      currentKey = normalizeKey(fieldMatch[1] ?? "");
      currentFields[currentKey] = fieldMatch[2] ?? "";
      continue;
    }

    if (currentKey && /^\s{2,}\S/.test(line)) {
      appendFieldValue(currentFields, currentKey, line.trim(), "\n");
      continue;
    }

    if (!trimmed) {
      flush();
      continue;
    }

    if (currentKey) appendFieldValue(currentFields, currentKey, line.trim());
  }

  flush();
  return { entries };
}

function formatIncidentRegistryEntry(entry: IncidentRegistryEntry): string {
  return formatIncidentRegistryEntryForStyle(entry, "structured");
}

function parseInlineIncidentEntry(trimmedLine: string): Record<string, string> | null {
  if (!trimmedLine.startsWith("- ")) return null;
  const body = trimmedLine.slice(2).trim();
  if (!body) return null;
  const segments = body.split(/\s+\|\s+(?=[a-z_]+:\s*)/u);
  const fields: Record<string, string> = {};
  for (const segment of segments) {
    const match = /^([a-z_]+):\s*(.*?)\s*$/u.exec(segment.trim());
    if (!match) return null;
    const key = normalizeKey(match[1] ?? "");
    if (!key) return null;
    fields[key] = match[2] ?? "";
  }
  return fields.id ? fields : null;
}

function formatIncidentRegistryEntryForStyle(
  entry: IncidentRegistryEntry,
  style: "structured" | "compact",
): string {
  const compactFields: [string, string][] = [
    incidentField("id", entry.id),
    incidentField("date", entry.date),
    incidentField("scope", entry.scope),
    ...(entry.tags.length > 0 ? [incidentField("tags", entry.tags.join(", "))] : []),
    ...(entry.match.length > 0 ? [incidentField("match", entry.match.join(", "))] : []),
    incidentField("failure", entry.failure),
    ...(entry.advice ? [incidentField("advice", entry.advice)] : []),
    incidentField("rule", entry.rule),
    incidentField("evidence", entry.evidence),
    incidentField("enforcement", entry.enforcement),
    ...(entry.fixability ? [incidentField("fixability", entry.fixability)] : []),
    incidentField("state", entry.state),
  ];
  if (style === "compact") {
    return `- ${compactFields.map(([key, value]) => `${key}: ${value}`).join(" | ")}`;
  }
  const structuredFields: [string, string][] = [
    incidentField("id", entry.id),
    incidentField("date", entry.date),
    incidentField("scope", entry.scope),
    ...(entry.tags.length > 0 ? [incidentField("tags", entry.tags.join(", "))] : []),
    ...(entry.match.length > 0 ? [incidentField("match", entry.match.join(", "))] : []),
    incidentField("failure", entry.failure),
    ...(entry.advice ? [incidentField("advice", entry.advice)] : []),
    incidentField("rule", entry.rule),
    incidentField("evidence", entry.evidence),
    incidentField("enforcement", entry.enforcement),
    ...(entry.sourceTask ? [incidentField("source_task", entry.sourceTask)] : []),
    ...(entry.fixability ? [incidentField("fixability", entry.fixability)] : []),
    incidentField("state", entry.state),
  ];
  return [
    `- ${structuredFields[0]?.[0]}: ${structuredFields[0]?.[1] ?? ""}`,
    ...structuredFields.slice(1).map(([key, value]) => `  ${key}: ${value}`),
  ].join("\n");
}

function detectRegistryStyle(text: string): "structured" | "compact" {
  return /(^|\n)## Entries\s*$/mu.test(text) || /(^|\n)## Entry contract\s*$/mu.test(text)
    ? "structured"
    : "compact";
}

function entryRichness(entry: IncidentRegistryEntry): number {
  return [
    entry.sourceTask ? 4 : 0,
    entry.advice ? 3 : 0,
    entry.tags.length,
    entry.match.length,
    entry.fixability ? 1 : 0,
    entry.evidence.length > 0 ? 1 : 0,
  ].reduce((sum, item) => sum + item, 0);
}

function nextIncidentIdForDate(
  dateStamp: string,
  usedIds: Set<string>,
  nextByDate: Map<string, number>,
): string {
  let next = nextByDate.get(dateStamp) ?? 0;
  do {
    next += 1;
  } while (usedIds.has(`INC-${dateStamp}-${String(next).padStart(2, "0")}`));
  nextByDate.set(dateStamp, next);
  return `INC-${dateStamp}-${String(next).padStart(2, "0")}`;
}

function normalizeIncidentRegistryEntries(
  entries: readonly IncidentRegistryEntry[],
): IncidentRegistryEntry[] {
  const byFingerprint = new Map<string, IncidentRegistryEntry>();
  const orderedFingerprints: string[] = [];

  for (const entry of entries) {
    const fingerprint = buildIncidentFingerprint(entry);
    const existing = byFingerprint.get(fingerprint);
    if (!existing) {
      byFingerprint.set(fingerprint, { ...entry });
      orderedFingerprints.push(fingerprint);
      continue;
    }
    if (entryRichness(entry) >= entryRichness(existing)) {
      byFingerprint.set(fingerprint, { ...entry });
    }
  }

  const normalized = orderedFingerprints.map((fingerprint) => byFingerprint.get(fingerprint)!);
  const usedIds = new Set<string>();
  const nextByDate = new Map<string, number>();
  for (const entry of normalized) {
    const match = /^INC-(\d{8})-(\d+)$/u.exec(entry.id);
    if (!match) continue;
    const [, dateStamp, seqRaw] = match;
    const seq = Number.parseInt(seqRaw ?? "", 10);
    if (!Number.isInteger(seq)) continue;
    const existing = nextByDate.get(dateStamp) ?? 0;
    if (seq > existing) nextByDate.set(dateStamp, seq);
  }

  return normalized.map((entry) => {
    const dateStamp = /^\d{4}-\d{2}-\d{2}$/u.test(entry.date)
      ? entry.date.replaceAll("-", "")
      : "00000000";
    const nextId = usedIds.has(entry.id)
      ? nextIncidentIdForDate(dateStamp, usedIds, nextByDate)
      : entry.id;
    usedIds.add(nextId);
    return nextId === entry.id ? entry : { ...entry, id: nextId };
  });
}

function renderIncidentRegistryDocument(
  entries: readonly IncidentRegistryEntry[],
  style: "structured" | "compact",
): string {
  const header =
    style === "structured" ? createIncidentRegistrySkeleton().trimEnd() : COMPACT_INCIDENTS_HEADER;
  if (entries.length === 0) return `${header}\n`;
  const separator = style === "structured" ? "\n\n" : "\n";
  return `${header}\n${entries.map((entry) => formatIncidentRegistryEntryForStyle(entry, style)).join(separator)}\n`;
}

export function appendIncidentRegistryEntries(
  currentText: string,
  entries: readonly IncidentRegistryEntry[],
): string {
  if (entries.length === 0) return currentText;
  const baseText = currentText.trim().length > 0 ? currentText : createIncidentRegistrySkeleton();
  const style = detectRegistryStyle(baseText);
  const existing = parseIncidentRegistry(baseText);
  const merged = normalizeIncidentRegistryEntries([...existing.entries, ...entries]);
  return renderIncidentRegistryDocument(merged, style);
}
