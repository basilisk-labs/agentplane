import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  policyGatewayFileName,
  renderPolicyGatewayTemplateText,
  type PolicyGatewayFlavor,
} from "../shared/policy-gateway.js";
import { resolveAgentplaneAssetPath } from "../shared/package-paths.js";

const AGENTS_TEMPLATE_PATH = resolveAgentplaneAssetPath("AGENTS.md");
const AGENTS_DIR_PATH = resolveAgentplaneAssetPath("agents");
const POLICY_DIR_PATH = resolveAgentplaneAssetPath("policy");

const HEADING_RE = /^(#+)\s+(.*)$/;

type Heading = { index: number; level: number; title: string };

export type WorkflowMode = "direct" | "branch_pr";

type AgentTemplate = { fileName: string; contents: string };
type PolicyTemplate = { relativePath: string; contents: string };

let agentTemplatesCache: Promise<AgentTemplate[]> | null = null;
const policyGatewayTemplateCache = new Map<PolicyGatewayFlavor, Promise<string>>();

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
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
    templates.push({ fileName, contents: ensureTrailingNewline(contents.trimEnd()) });
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
    templates.push({
      relativePath: relFile.replaceAll("\\", "/"),
      contents: ensureTrailingNewline(contents.trimEnd()),
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

async function readPolicyGatewayTemplate(flavor: PolicyGatewayFlavor): Promise<string> {
  const text = await readFile(AGENTS_TEMPLATE_PATH, "utf8");
  const rendered = renderPolicyGatewayTemplateText(text, policyGatewayFileName(flavor));
  return ensureTrailingNewline(rendered.trimEnd());
}

export async function loadPolicyGatewayTemplate(flavor: PolicyGatewayFlavor): Promise<string> {
  const cached = policyGatewayTemplateCache.get(flavor);
  if (cached) return cached;
  const template = readPolicyGatewayTemplate(flavor);
  policyGatewayTemplateCache.set(flavor, template);
  return template;
}
