import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { collectMatchingFiles, fileExists, toPosix } from "./context-utils.js";

type WikiModality =
  | "factual_claim"
  | "observation"
  | "assumption"
  | "hypothesis"
  | "decision"
  | "policy"
  | "preference"
  | "requirement"
  | "risk"
  | "capability"
  | "definition"
  | "deprecation";

type WikiStatus =
  | "mention"
  | "extracted_candidate"
  | "sourced_claim"
  | "corroborated_claim"
  | "reviewed_claim"
  | "accepted_team_knowledge"
  | "canonical_org_knowledge"
  | "assumption"
  | "hypothesis"
  | "disputed"
  | "deprecated"
  | "superseded"
  | "forbidden_for_use";

const MODALITIES = new Set<WikiModality>([
  "factual_claim",
  "observation",
  "assumption",
  "hypothesis",
  "decision",
  "policy",
  "preference",
  "requirement",
  "risk",
  "capability",
  "definition",
  "deprecation",
]);

const STATUSES = new Set<WikiStatus>([
  "mention",
  "extracted_candidate",
  "sourced_claim",
  "corroborated_claim",
  "reviewed_claim",
  "accepted_team_knowledge",
  "canonical_org_knowledge",
  "assumption",
  "hypothesis",
  "disputed",
  "deprecated",
  "superseded",
  "forbidden_for_use",
]);

function slug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-+|-+$/gu, "");
}

function normalizeWikiPath(root: string, input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: "wiki page path must be non-empty",
    });
  }
  const rel = toPosix(trimmed.endsWith(".md") ? trimmed : `${trimmed}.md`);
  const scoped = rel.startsWith("context/wiki/") ? rel : `context/wiki/${rel}`;
  const abs = path.resolve(root, scoped);
  const wikiRoot = path.resolve(root, "context/wiki");
  if (!abs.startsWith(`${wikiRoot}${path.sep}`) && abs !== wikiRoot) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `wiki page path must stay under context/wiki: ${input}`,
    });
  }
  return toPosix(path.relative(root, abs));
}

function titleFromPath(rel: string): string {
  const base = path.basename(rel, path.extname(rel));
  return base
    .split(/[-_]+/u)
    .filter(Boolean)
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

function assertChoice<T extends string>(value: string, choices: Set<T>, label: string): T {
  if (choices.has(value as T)) return value as T;
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: `${label} must be one of: ${[...choices].join(", ")}`,
  });
}

function yamlString(value: string): string {
  return JSON.stringify(value);
}

function renderSourceRefs(sourceRefs: string[]): string {
  if (sourceRefs.length === 0) return "  []";
  return sourceRefs
    .map((source) => {
      const label = source.includes("#") ? source.split("#")[0] : source;
      return [
        "  - path: " + yamlString(source),
        "    ref: " + yamlString(source),
        "    label: " + yamlString(label),
      ].join("\n");
    })
    .join("\n");
}

function renderWikiPage(opts: {
  rel: string;
  title: string;
  modality: WikiModality;
  status: WikiStatus;
  visibility: string;
  sourceRefs: string[];
}): string {
  const canonicalId = `wiki.${slug(opts.rel.replace(/^context\/wiki\//u, "").replace(/\.md$/u, ""))}`;
  return `---
agentplane_context:
  schema_version: 1
  artifact_type: wiki_page
  canonical_id: ${yamlString(canonicalId)}
  title: ${yamlString(opts.title)}
  modality: ${opts.modality}
  epistemic_status: ${opts.status}
  visibility: ${opts.visibility}
  source_refs:
${renderSourceRefs(opts.sourceRefs)}
  claims: []
  graph_refs:
    entities: []
    edges: []
  conflicts: []
  updated_by: CURATOR
---

# ${opts.title}

## Summary

<!-- Write source-backed synthesis here. Keep claims small, scoped, and linked. -->

## Source References

${opts.sourceRefs.length > 0 ? opts.sourceRefs.map((source) => `- [${source}](${source})`).join("\n") : "- no-source: add a source reference before promotion"}

## Claims

<!-- Link atomic claim ids or derived rows here. -->
`;
}

async function collectWikiFiles(root: string, rel: string): Promise<string[]> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return [];
  const st = await stat(abs);
  if (st.isFile()) return [rel];
  const files = await collectMatchingFiles(root, rel);
  return files.filter((item) => item.endsWith(".md"));
}

async function normalizeWikiLintTarget(root: string, input: string): Promise<string> {
  const trimmed = input.trim();
  if (!trimmed) return "context/wiki";
  const scoped = toPosix(trimmed.startsWith("context/wiki") ? trimmed : `context/wiki/${trimmed}`);
  const abs = path.resolve(root, scoped);
  const wikiRoot = path.resolve(root, "context/wiki");
  if (!abs.startsWith(`${wikiRoot}${path.sep}`) && abs !== wikiRoot) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `wiki lint path must stay under context/wiki: ${input}`,
    });
  }
  if (await fileExists(abs)) return toPosix(path.relative(root, abs));
  const pageRel = normalizeWikiPath(root, trimmed);
  if (await fileExists(path.join(root, pageRel))) return pageRel;
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: `wiki lint target does not exist: ${input}`,
  });
}

function extractFrontmatter(text: string): string | null {
  const normalized = text.replaceAll("\r\n", "\n");
  if (!normalized.startsWith("---\n")) return null;
  const end = normalized.indexOf("\n---", 4);
  if (end === -1) return null;
  return normalized.slice(4, end).trim();
}

function lintWikiText(rel: string, text: string): string[] {
  const errors: string[] = [];
  const frontmatter = extractFrontmatter(text);
  if (!frontmatter) {
    errors.push(`${rel}: missing YAML frontmatter`);
    return errors;
  }
  for (const required of [
    "agentplane_context:",
    "schema_version:",
    "artifact_type:",
    "canonical_id:",
    "modality:",
    "epistemic_status:",
    "source_refs:",
  ]) {
    if (!frontmatter.includes(required)) errors.push(`${rel}: missing ${required}`);
  }
  if (!/\[[^\]]+\]\([^)]+\)/u.test(text) && !text.includes("no-source:")) {
    errors.push(`${rel}: missing markdown source/cross-link or explicit no-source marker`);
  }
  return errors;
}

export async function cmdContextWikiNew(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: {
    page: string;
    title: string;
    modality: string;
    status: string;
    visibility: string;
    source: string[];
    force: boolean;
  };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const rel = normalizeWikiPath(root, opts.parsed.page);
  const abs = path.join(root, rel);
  if ((await fileExists(abs)) && !opts.parsed.force) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `wiki page already exists: ${rel}`,
    });
  }
  const modality = assertChoice(opts.parsed.modality, MODALITIES, "modality");
  const status = assertChoice(opts.parsed.status, STATUSES, "status");
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(
    abs,
    renderWikiPage({
      rel,
      title: opts.parsed.title.trim() || titleFromPath(rel),
      modality,
      status,
      visibility: opts.parsed.visibility.trim() || "project",
      sourceRefs: opts.parsed.source,
    }),
    "utf8",
  );
  process.stdout.write(`context wiki new: ${rel}\n`);
  return 0;
}

export async function cmdContextWikiLint(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { path: string };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const rel = await normalizeWikiLintTarget(root, opts.parsed.path);
  const files = await collectWikiFiles(root, rel);
  const errors: string[] = [];
  for (const file of files) {
    errors.push(...lintWikiText(file, await readFile(path.join(root, file), "utf8")));
  }
  if (errors.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `context wiki lint failed: ${errors.length} issue(s)\n- ${errors.join("\n- ")}`,
    });
  }
  process.stdout.write(`context wiki lint: ok (${files.length} page(s))\n`);
  return 0;
}

export async function cmdContextWikiExplain(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { page: string };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const rel = normalizeWikiPath(root, opts.parsed.page);
  const text = await readFile(path.join(root, rel), "utf8");
  const frontmatter = extractFrontmatter(text);
  process.stdout.write(`context wiki explain: ${rel}\n`);
  process.stdout.write(frontmatter ? `${frontmatter}\n` : "frontmatter: missing\n");
  return 0;
}

export async function cmdContextWikiLink(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { page: string };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const rel = normalizeWikiPath(root, opts.parsed.page);
  const text = await readFile(path.join(root, rel), "utf8");
  const wikiFiles = await collectWikiFiles(root, "context/wiki");
  const files = wikiFiles.filter((file) => file !== rel);
  const titleWords = new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/u)
      .filter((word) => word.length >= 4),
  );
  const matches = files.filter((file) =>
    file
      .replace(/^context\/wiki\//u, "")
      .replace(/\.md$/u, "")
      .split(/[-_/]+/u)
      .some((word) => titleWords.has(word.toLowerCase())),
  );
  process.stdout.write(`context wiki link: ${rel}\n`);
  if (matches.length === 0) {
    process.stdout.write("- no obvious wiki link candidates found\n");
    return 0;
  }
  for (const match of matches.slice(0, 20)) process.stdout.write(`- ${match}\n`);
  return 0;
}
