import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  policyGatewayFileName,
  renderPolicyGatewayTemplateText,
  type PolicyGatewayFlavor,
} from "../shared/policy-gateway.js";

const AGENTS_TEMPLATE_URL = new URL("../../assets/AGENTS.md", import.meta.url);
const AGENTS_DIR_URL = new URL("../../assets/agents/", import.meta.url);
const POLICY_DIR_URL = new URL("../../assets/policy/", import.meta.url);

const HEADING_RE = /^(#+)\s+(.*)$/;

type Heading = { index: number; level: number; title: string };

export type WorkflowMode = "direct" | "branch_pr";

type AgentTemplate = { fileName: string; contents: string };
export type PolicyTemplate = { relativePath: string; contents: string };

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

export async function loadAgentTemplates(): Promise<AgentTemplate[]> {
  const dirPath = fileURLToPath(AGENTS_DIR_URL);
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
  const dirPath = fileURLToPath(POLICY_DIR_URL);
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

export async function loadPolicyGatewayTemplate(flavor: PolicyGatewayFlavor): Promise<string> {
  const text = await readFile(AGENTS_TEMPLATE_URL, "utf8");
  const rendered = renderPolicyGatewayTemplateText(text, policyGatewayFileName(flavor));
  return ensureTrailingNewline(rendered.trimEnd());
}
