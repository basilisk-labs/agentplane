import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../../cli/fs-utils.js";
import type { RunnerPromptBlock } from "../types.js";
import { normalizeText } from "./prompt-block-shared.js";

const PROJECT_SKILLS_PRIORITY = 350;
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

type ProjectSkillMetadata = {
  name: string;
  description: string;
  source: string;
};

function parseFrontmatterStringField(frontmatter: string, key: string): string | null {
  const line = frontmatter.split(/\r?\n/).find((entry) => entry.trimStart().startsWith(`${key}:`));
  if (!line) return null;
  const raw = line.slice(line.indexOf(":") + 1).trim();
  if (!raw) return null;
  return raw.replaceAll(/^['"]|['"]$/g, "").trim() || null;
}

function parseSkillMetadata(source: string, text: string): ProjectSkillMetadata | null {
  const match = FRONTMATTER_RE.exec(text);
  if (!match) return null;
  const frontmatter = match[1] ?? "";
  const name = parseFrontmatterStringField(frontmatter, "name");
  const description = parseFrontmatterStringField(frontmatter, "description");
  if (!name || !description) return null;
  return { name, description, source };
}

export async function collectProjectSkillPromptBlocks(opts: {
  git_root: string;
}): Promise<RunnerPromptBlock[]> {
  const skillsRoot = path.join(opts.git_root, "skills");
  if (!(await fileExists(skillsRoot))) return [];

  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const metadata: ProjectSkillMetadata[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const skillPath = path.join(skillsRoot, entry.name, "SKILL.md");
    if (!(await fileExists(skillPath))) continue;
    const source = path.relative(opts.git_root, skillPath).replaceAll("\\", "/");
    const parsed = parseSkillMetadata(source, await readFile(skillPath, "utf8"));
    if (parsed) metadata.push(parsed);
  }

  if (metadata.length === 0) return [];
  metadata.sort((left, right) => left.name.localeCompare(right.name));

  return [
    {
      id: "project.skills_index",
      role: "context",
      title: "Repository Skill Discovery",
      source: "skills/*/SKILL.md",
      priority: PROJECT_SKILLS_PRIORITY,
      content: normalizeText(JSON.stringify({ skills: metadata }, null, 2)),
    },
  ];
}
