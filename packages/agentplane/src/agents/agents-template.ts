import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  policyGatewayFileName,
  renderPolicyGatewayTemplateText,
  type PolicyGatewayFlavor,
} from "../shared/policy-gateway.js";
import { resolveAgentplaneAssetPath } from "../shared/package-paths.js";
import {
  parsePromptMarkdownFragments,
  normalizePromptFragmentList,
  type PromptJsonTextFragment,
  renderPromptMarkdownFragments,
  type PromptMarkdownFragment,
  type PromptMarkdownSegment,
} from "../runtime/prompt-fragments/index.js";

const AGENTS_TEMPLATE_PATH = resolveAgentplaneAssetPath("AGENTS.md");
const AGENTS_DIR_PATH = resolveAgentplaneAssetPath("agents");
const POLICY_DIR_PATH = resolveAgentplaneAssetPath("policy");

const HEADING_RE = /^(#+)\s+(.*)$/;

type Heading = { index: number; level: number; title: string };

export type WorkflowMode = "direct" | "branch_pr";

export type AgentTemplate = {
  fileName: string;
  contents: string;
  sourceContents: string;
  fragments: PromptJsonTextFragment[];
};
export type MarkdownPromptTemplate = {
  contents: string;
  sourceContents: string;
  fragments: PromptMarkdownFragment[];
  segments: PromptMarkdownSegment[];
};
type PolicyTemplate = {
  relativePath: string;
  contents: string;
  sourceContents: string;
  fragments: PromptMarkdownFragment[];
  segments: PromptMarkdownSegment[];
};

let agentTemplatesCache: Promise<AgentTemplate[]> | null = null;
const policyGatewayTemplateCache = new Map<PolicyGatewayFlavor, Promise<MarkdownPromptTemplate>>();

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}

export function renderMarkdownPromptTemplate(
  sourceContents: string,
  opts: {
    source_ref: string;
    fallback_id?: string;
  },
): MarkdownPromptTemplate {
  const source = ensureTrailingNewline(sourceContents.trimEnd());
  const parsed = parsePromptMarkdownFragments(source, {
    source_ref: opts.source_ref,
    fallback_id: opts.fallback_id,
    fallback_slot: "file",
    fallback_mutability: "replaceable",
  });

  return {
    contents: ensureTrailingNewline(renderPromptMarkdownFragments(parsed).trimEnd()),
    sourceContents: source,
    fragments: parsed.fragments,
    segments: parsed.segments,
  };
}

type AgentProfileRecord = Record<string, unknown>;

const AGENT_PROFILE_FRAGMENT_FIELDS = ["inputs", "outputs", "permissions", "workflow"] as const;
const COMPACT_RENDERED_AGENT_ARRAYS = new Set([
  "ORCHESTRATOR.json:inputs",
  "REVIEWER.json:permissions",
]);

function agentProfileId(fileName: string): string {
  return fileName.replace(/\.json$/i, "");
}

function agentFragmentIdPrefix(
  fileName: string,
  slot: (typeof AGENT_PROFILE_FRAGMENT_FIELDS)[number],
): string {
  return `agent.${agentProfileId(fileName).toLowerCase()}.${slot}`;
}

function defaultAgentFragmentMutability(
  slot: (typeof AGENT_PROFILE_FRAGMENT_FIELDS)[number],
): "append_only" | "replaceable" {
  return slot === "workflow" ? "replaceable" : "append_only";
}

function parseAgentProfileSource(fileName: string, sourceContents: string): AgentProfileRecord {
  const parsed = JSON.parse(sourceContents) as unknown;
  if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
    return parsed as AgentProfileRecord;
  }
  throw new Error(`Invalid bundled agent profile ${fileName}: expected JSON object`);
}

function renderAgentProfileContents(fileName: string, profile: AgentProfileRecord): string {
  let rendered = JSON.stringify(profile, null, 2);
  for (const field of AGENT_PROFILE_FRAGMENT_FIELDS) {
    if (!COMPACT_RENDERED_AGENT_ARRAYS.has(`${fileName}:${field}`)) continue;
    const value = profile[field];
    if (!Array.isArray(value) || value.length !== 1 || typeof value[0] !== "string") continue;
    const pretty = `  "${field}": [\n    ${JSON.stringify(value[0])}\n  ]`;
    const compact = `  "${field}": [${JSON.stringify(value[0])}]`;
    rendered = rendered.replace(pretty, compact);
  }
  return ensureTrailingNewline(rendered);
}

function renderAgentProfileTemplate(fileName: string, sourceContents: string): AgentTemplate {
  const profile = parseAgentProfileSource(fileName, sourceContents);
  const sourceRef = `packages/agentplane/assets/agents/${fileName}`;
  const fragments: PromptJsonTextFragment[] = [];

  for (const field of AGENT_PROFILE_FRAGMENT_FIELDS) {
    if (profile[field] === undefined) continue;
    const normalized = normalizePromptFragmentList(profile[field], {
      id_prefix: agentFragmentIdPrefix(fileName, field),
      slot: field,
      source_ref: sourceRef,
      default_mutability: defaultAgentFragmentMutability(field),
    });
    fragments.push(...normalized);
    profile[field] = normalized.map((fragment) => fragment.text);
  }

  return {
    fileName,
    contents: renderAgentProfileContents(fileName, profile),
    sourceContents: ensureTrailingNewline(sourceContents.trimEnd()),
    fragments,
  };
}

function getHeadings(lines: string[]): Heading[] {
  const headings: Heading[] = [];
  for (const [index, line] of lines.entries()) {
    const match = HEADING_RE.exec(line);
    if (!match) continue;
    headings.push({ index, level: match[1].length, title: match[2].trim() });
  }
  return headings;
}

function getSectionRange(lines: string[], title: string): [number, number] | null {
  const headings = getHeadings(lines);
  const heading = headings.find((entry) => entry.title === title);
  if (!heading) return null;
  const next = headings
    .filter((entry) => entry.index > heading.index)
    .find((entry) => entry.level <= heading.level);
  return [heading.index, next ? next.index : lines.length];
}

function removeSections(lines: string[], titles: string[]): string[] {
  const removeRanges = titles
    .map((title) => getSectionRange(lines, title))
    .filter((range): range is [number, number] => range !== null);

  if (removeRanges.length === 0) return lines;

  const shouldRemove = new Set<number>();
  for (const [start, end] of removeRanges) {
    for (let i = start; i < end; i += 1) shouldRemove.add(i);
  }
  return lines.filter((_line, index) => !shouldRemove.has(index));
}

export async function loadAgentsTemplate(): Promise<string> {
  return loadPolicyGatewayTemplate("codex");
}

async function readAgentTemplates(): Promise<AgentTemplate[]> {
  const dirPath = AGENTS_DIR_PATH;
  const entries = await readdir(dirPath);
  const jsonFiles = entries.filter((entry) => entry.endsWith(".json"));
  const templates: AgentTemplate[] = [];

  for (const fileName of jsonFiles) {
    const filePath = path.join(dirPath, fileName);
    const contents = await readFile(filePath, "utf8");
    templates.push(renderAgentProfileTemplate(fileName, ensureTrailingNewline(contents.trimEnd())));
  }

  return templates;
}

export async function loadAgentTemplates(): Promise<AgentTemplate[]> {
  agentTemplatesCache ??= readAgentTemplates();
  return agentTemplatesCache;
}

async function listFilesRecursive(dirPath: string, relPrefix = ""): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const sorted = entries.toSorted((a, b) => a.name.localeCompare(b.name));
  const files: string[] = [];

  for (const entry of sorted) {
    // Ignore editor/OS hidden metadata files.
    if (entry.name.startsWith(".")) continue;
    const absPath = path.join(dirPath, entry.name);
    const relPath = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(absPath, relPath)));
      continue;
    }
    if (entry.isFile()) files.push(relPath);
  }

  return files;
}

export async function loadPolicyTemplates(): Promise<PolicyTemplate[]> {
  const dirPath = POLICY_DIR_PATH;
  const relFiles = await listFilesRecursive(dirPath);
  const templates: PolicyTemplate[] = [];

  for (const relFile of relFiles) {
    const filePath = path.join(dirPath, relFile);
    const contents = await readFile(filePath, "utf8");
    const relativePath = relFile.replaceAll("\\", "/");
    const sourceRef = `packages/agentplane/assets/policy/${relativePath}`;
    const rendered = relFile.endsWith(".md")
      ? renderMarkdownPromptTemplate(contents, { source_ref: sourceRef })
      : {
          contents: ensureTrailingNewline(contents.trimEnd()),
          sourceContents: ensureTrailingNewline(contents.trimEnd()),
          fragments: [],
          segments: [],
        };
    templates.push({
      relativePath,
      contents: rendered.contents,
      sourceContents: rendered.sourceContents,
      fragments: rendered.fragments,
      segments: rendered.segments,
    });
  }

  return templates;
}

export function filterAgentsByWorkflow(template: string, workflow: WorkflowMode): string {
  const lines = template.replaceAll("\r\n", "\n").split("\n");
  const removeTitles =
    workflow === "direct"
      ? ["B) branch_pr mode (parallel work)", "INTEGRATION & CLOSURE (branch_pr)"]
      : ["A) direct mode (single checkout)"];

  const filtered = removeSections(lines, removeTitles);
  return ensureTrailingNewline(filtered.join("\n").trimEnd());
}

async function readPolicyGatewayTemplate(
  flavor: PolicyGatewayFlavor,
): Promise<MarkdownPromptTemplate> {
  const text = await readFile(AGENTS_TEMPLATE_PATH, "utf8");
  const rendered = renderPolicyGatewayTemplateText(text, policyGatewayFileName(flavor));
  return renderMarkdownPromptTemplate(rendered, {
    source_ref: "packages/agentplane/assets/AGENTS.md",
    fallback_id: `gateway.${flavor}.file.template`,
  });
}

export async function loadPolicyGatewayMarkdownTemplate(
  flavor: PolicyGatewayFlavor,
): Promise<MarkdownPromptTemplate> {
  const cached = policyGatewayTemplateCache.get(flavor);
  if (cached) return cached;
  const template = readPolicyGatewayTemplate(flavor);
  policyGatewayTemplateCache.set(flavor, template);
  return template;
}

export async function loadPolicyGatewayTemplate(flavor: PolicyGatewayFlavor): Promise<string> {
  const template = await loadPolicyGatewayMarkdownTemplate(flavor);
  return template.contents;
}
