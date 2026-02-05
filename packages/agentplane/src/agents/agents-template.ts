import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const AGENTS_TEMPLATE_URL = new URL("../../assets/AGENTS.md", import.meta.url);
const AGENTS_DIR_URL = new URL("../../assets/agents/", import.meta.url);

const HEADING_RE = /^(#+)\s+(.*)$/;

type Heading = { index: number; level: number; title: string };

export type WorkflowMode = "direct" | "branch_pr";

type AgentTemplate = { fileName: string; contents: string };

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
  const text = await readFile(AGENTS_TEMPLATE_URL, "utf8");
  return ensureTrailingNewline(text.trimEnd());
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

export function filterAgentsByWorkflow(template: string, workflow: WorkflowMode): string {
  const lines = template.replaceAll("\r\n", "\n").split("\n");
  const removeTitles =
    workflow === "direct"
      ? ["B) branch_pr mode (parallel work)", "INTEGRATION & CLOSURE (branch_pr)"]
      : ["A) direct mode (single checkout)"];

  const filtered = removeSections(lines, removeTitles);
  return ensureTrailingNewline(filtered.join("\n").trimEnd());
}
