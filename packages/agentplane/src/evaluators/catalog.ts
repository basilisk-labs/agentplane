import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";

import { resolveAgentplaneAssetPath } from "../shared/package-paths.js";

export type EvaluatorSource = "project" | "builtin";

export type EvaluatorModule = {
  id: string;
  title: string;
  version: number | string | null;
  status: string;
  profile: string;
  tags: string[];
  source: EvaluatorSource;
  path: string;
  content: string;
};

type RawFrontmatter = Record<string, unknown>;

function isRecord(value: unknown): value is RawFrontmatter {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeId(value: unknown, fallback: string): string {
  const raw = typeof value === "string" && value.trim() ? value.trim() : fallback;
  if (!/^[a-z0-9][a-z0-9._-]*$/u.test(raw)) {
    throw new Error(`invalid evaluator id: ${JSON.stringify(raw)}`);
  }
  return raw;
}

function normalizeString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean)
    .toSorted();
}

function parseMarkdownFrontmatter(filePath: string, text: string): RawFrontmatter {
  if (!text.startsWith("---\n")) return {};
  const closeIndex = text.indexOf("\n---", 4);
  if (closeIndex === -1) {
    throw new Error(`unterminated evaluator frontmatter: ${filePath}`);
  }
  const frontmatterText = text.slice(4, closeIndex);
  const parsed = parseYaml(frontmatterText) as unknown;
  if (parsed === null || parsed === undefined) return {};
  if (!isRecord(parsed)) {
    throw new Error(`evaluator frontmatter must be an object: ${filePath}`);
  }
  return parsed;
}

async function listMarkdownFiles(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => path.join(dir, entry.name))
      .toSorted();
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "ENOENT") return [];
    throw err;
  }
}

async function loadEvaluatorFile(opts: {
  filePath: string;
  source: EvaluatorSource;
}): Promise<EvaluatorModule> {
  const content = await readFile(opts.filePath, "utf8");
  const frontmatter = parseMarkdownFrontmatter(opts.filePath, content);
  const fallbackId = path.basename(opts.filePath, ".md");
  const id = normalizeId(frontmatter.id, fallbackId);
  return {
    id,
    title: normalizeString(frontmatter.title, id),
    version:
      typeof frontmatter.version === "string" || typeof frontmatter.version === "number"
        ? frontmatter.version
        : null,
    status: normalizeString(frontmatter.status, "preview"),
    profile: normalizeString(frontmatter.profile, "EVALUATOR"),
    tags: normalizeTags(frontmatter.tags),
    source: opts.source,
    path: opts.filePath,
    content,
  };
}

export async function loadEvaluatorCatalog(opts: {
  projectRoot?: string | null;
  includeBuiltin?: boolean;
}): Promise<EvaluatorModule[]> {
  const rows: EvaluatorModule[] = [];
  const projectDir = opts.projectRoot
    ? path.join(opts.projectRoot, ".agentplane", "evaluators")
    : null;
  if (projectDir) {
    for (const filePath of await listMarkdownFiles(projectDir)) {
      rows.push(await loadEvaluatorFile({ filePath, source: "project" }));
    }
  }
  if (opts.includeBuiltin !== false) {
    const builtinDir = resolveAgentplaneAssetPath("evaluators");
    for (const filePath of await listMarkdownFiles(builtinDir)) {
      rows.push(await loadEvaluatorFile({ filePath, source: "builtin" }));
    }
  }

  const seen = new Set<string>();
  const merged: EvaluatorModule[] = [];
  for (const row of rows) {
    if (seen.has(row.id)) continue;
    seen.add(row.id);
    merged.push(row);
  }
  return merged.toSorted((left, right) => left.id.localeCompare(right.id));
}
