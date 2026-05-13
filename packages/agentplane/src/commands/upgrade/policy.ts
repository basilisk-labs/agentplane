import type { FrameworkManifestEntry } from "./types.js";

export const INCIDENTS_POLICY_PATH = ".agentplane/policy/incidents.md";
export const INCIDENTS_APPEND_MARKER = "<!-- AGENTPLANE:UPGRADE-APPEND incidents.md -->";
export const CONFIG_REL_PATH = ".agentplane/config.json";
export const WORKFLOW_REL_PATH = ".agentplane/WORKFLOW.md";

export function isDeniedUpgradePath(relPath: string): boolean {
  if (relPath === CONFIG_REL_PATH) return true;
  if (relPath === WORKFLOW_REL_PATH) return true;
  if (relPath === ".agentplane/tasks.json") return true;
  if (relPath.startsWith(".agentplane/backends/")) return true;
  if (relPath.startsWith(".agentplane/worktrees/")) return true;
  if (relPath.startsWith(".agentplane/recipes/")) return true;
  if (relPath.startsWith(".agentplane/tasks/")) return true;
  if (relPath.startsWith(".agentplane/.upgrade/")) return true;
  if (relPath === ".git" || relPath.startsWith(".git/")) return true;
  return false;
}

export function isAllowedUpgradePath(relPath: string): boolean {
  if (relPath === "AGENTS.md") return true;
  if (relPath === "CLAUDE.md") return true;
  if (relPath.startsWith(".agentplane/agents/") && relPath.endsWith(".json")) return true;
  if (relPath.startsWith(".agentplane/evaluators/") && relPath.endsWith(".md")) return true;
  if (
    relPath.startsWith(".agentplane/policy/") &&
    (relPath.endsWith(".md") ||
      relPath.endsWith(".ts") ||
      relPath.endsWith(".js") ||
      relPath.endsWith(".mjs"))
  ) {
    return true;
  }
  return false;
}

function isJsonRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function canonicalizeJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((item) => canonicalizeJson(item));
  if (isJsonRecord(value)) {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value).toSorted()) {
      out[key] = canonicalizeJson(value[key]);
    }
    return out;
  }
  return value;
}

function jsonEqual(a: unknown, b: unknown): boolean {
  const canonicalA = JSON.stringify(canonicalizeJson(a)) ?? "__undefined__";
  const canonicalB = JSON.stringify(canonicalizeJson(b)) ?? "__undefined__";
  return canonicalA === canonicalB;
}

export function textChangedForType(opts: {
  type: FrameworkManifestEntry["type"];
  aText: string | null;
  bText: string | null;
}): boolean {
  if (opts.aText === null && opts.bText === null) return false;
  if (opts.aText === null || opts.bText === null) return true;
  if (opts.type === "json") {
    try {
      const a: unknown = JSON.parse(opts.aText);
      const b: unknown = JSON.parse(opts.bText);
      return !jsonEqual(a, b);
    } catch {
      return opts.aText.trim() !== opts.bText.trim();
    }
  }
  return opts.aText.trimEnd() !== opts.bText.trimEnd();
}

function parseIncidentEntryBlocks(entriesBody: string): string[] {
  const lines = entriesBody.replaceAll("\r\n", "\n").split("\n");
  const starts: number[] = [];
  for (const [index, line] of lines.entries()) {
    if (/^\s*-\s*id:\s+/i.test(line ?? "")) starts.push(index);
  }
  const blocks: string[] = [];
  for (const [idx, start] of starts.entries()) {
    const end = starts.at(idx + 1) ?? lines.length;
    const slice = lines.slice(start, end);
    while (slice.length > 0 && !(slice[0] ?? "").trim()) slice.shift();
    while (slice.length > 0 && !(slice.at(-1) ?? "").trim()) slice.pop();
    const block = slice.join("\n").trim();
    if (block) blocks.push(block);
  }
  return blocks;
}

function normalizeEntryBlock(block: string): string {
  return block
    .replaceAll("\r\n", "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function splitEntriesSection(text: string): {
  before: string;
  entriesBody: string;
  after: string;
} | null {
  const lines = text.replaceAll("\r\n", "\n").split("\n");
  const headingIndex = lines.findIndex((line) => /^\s*##\s+Entries\s*$/i.test(line));
  if (headingIndex === -1) return null;

  let nextHeadingIndex = lines.length;
  for (let index = headingIndex + 1; index < lines.length; index++) {
    if (/^\s*##\s+/.test(lines[index] ?? "")) {
      nextHeadingIndex = index;
      break;
    }
  }

  return {
    before: lines.slice(0, headingIndex + 1).join("\n"),
    entriesBody: lines.slice(headingIndex + 1, nextHeadingIndex).join("\n"),
    after: lines.slice(nextHeadingIndex).join("\n"),
  };
}

export function mergeIncidentsPolicy(opts: {
  incomingText: string;
  currentText: string;
  baselineText: string | null;
}): {
  nextText: string;
  appended: boolean;
  appendedCount: number;
} {
  const incomingTrimmed = opts.incomingText.trim();
  if (!incomingTrimmed) return { nextText: opts.currentText, appended: false, appendedCount: 0 };

  const incomingSection = splitEntriesSection(opts.incomingText);
  const currentSection = splitEntriesSection(opts.currentText);
  if (!incomingSection || !currentSection) {
    return { nextText: opts.incomingText, appended: false, appendedCount: 0 };
  }

  const incomingBlocks = parseIncidentEntryBlocks(incomingSection.entriesBody).map((block) =>
    normalizeEntryBlock(block),
  );
  const currentBlocks = parseIncidentEntryBlocks(currentSection.entriesBody).map((block) =>
    normalizeEntryBlock(block),
  );
  if (currentBlocks.length === 0) {
    return { nextText: opts.incomingText, appended: false, appendedCount: 0 };
  }

  const baselineSection = opts.baselineText ? splitEntriesSection(opts.baselineText) : null;
  const baselineBlocks = baselineSection
    ? parseIncidentEntryBlocks(baselineSection.entriesBody).map((block) =>
        normalizeEntryBlock(block),
      )
    : [];
  const baselineSet = new Set(baselineBlocks);
  const incomingSet = new Set(incomingBlocks);

  const userAdded = currentBlocks.filter((block) => {
    if (baselineSet.size > 0 && baselineSet.has(block)) return false;
    return true;
  });
  const toAppend = userAdded.filter((block) => !incomingSet.has(block));
  if (toAppend.length === 0) {
    return { nextText: opts.incomingText, appended: false, appendedCount: 0 };
  }

  const mergedBlocks = [...incomingBlocks, ...toAppend];
  const renderedEntries =
    mergedBlocks.length > 0 ? `\n\n${mergedBlocks.join("\n\n")}\n` : "\n\n- None yet.\n";
  const afterSuffix = incomingSection.after ? `\n${incomingSection.after.trimStart()}` : "";
  const nextText =
    `${incomingSection.before.trimEnd()}` +
    `${renderedEntries}` +
    `${INCIDENTS_APPEND_MARKER}\n` +
    `${afterSuffix}` +
    "\n";
  return { nextText, appended: true, appendedCount: toAppend.length };
}

export function normalizeUpgradeVersionLabel(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "unknown";
  if (/^v\d/i.test(trimmed)) return trimmed;
  return `v${trimmed}`;
}

export function normalizeVersionForConfig(input: string): string | null {
  const trimmed = input.trim().replace(/^v/i, "");
  return trimmed.length > 0 ? trimmed : null;
}

export function toUpgradeBaselineKey(rel: string): string | null {
  if (rel === "AGENTS.md") return "AGENTS.md";
  if (rel === "CLAUDE.md") return "CLAUDE.md";
  if (rel.startsWith(".agentplane/")) return rel.slice(".agentplane/".length);
  return null;
}
