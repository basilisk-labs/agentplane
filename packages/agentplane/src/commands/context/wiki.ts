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

type WikiLinkCatalogEntry = {
  canonical: string;
  aliases: string[];
};

type WikiLinkCatalog = Map<string, WikiLinkCatalogEntry>;

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

function titleFromMarkdown(rel: string, text: string): string {
  const frontmatter = extractFrontmatter(text);
  const titleMatch = frontmatter ? /(?:^|\n)\s*title:\s*"?([^"\n]+)"?/u.exec(frontmatter) : null;
  if (titleMatch?.[1]) return titleMatch[1].trim();
  const headingMatch = /^#\s+(.+)$/mu.exec(text);
  if (headingMatch?.[1]) return headingMatch[1].trim();
  return titleFromPath(rel);
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

function renderYamlList(values: string[]): string {
  if (values.length === 0) return "[]";
  return `\n${values.map((value) => `  - ${yamlString(value)}`).join("\n")}`;
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

function renderSourceNotes(sourceRefs: string[]): string {
  if (sourceRefs.length === 0) {
    return "- no-source: add a source reference before promotion";
  }
  return sourceRefs.map((source, index) => `${index + 1}. [${source}](${source})`).join("\n");
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
aliases:${renderYamlList([opts.title])}
tags:
  - agentplane/context
cssclasses:
  - agentplane-context
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

Use numeric source notes such as [1] in prose, then keep raw-data links in the Sources section.

## Sources

${renderSourceNotes(opts.sourceRefs)}

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

function extractYamlScalar(frontmatter: string, key: string): string | null {
  const escaped = key.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`);
  const match = new RegExp(String.raw`(?:^|\n)\s*${escaped}:\s*"?([^"\n]+)"?`, "u").exec(
    frontmatter,
  );
  return match?.[1]?.trim() ?? null;
}

function extractYamlList(frontmatter: string, key: string): string[] {
  const escaped = key.replaceAll(/[.*+?^${}()|[\]\\]/gu, String.raw`\$&`);
  const flow = new RegExp(String.raw`(?:^|\n)\s*${escaped}:\s*\[([^\]\n]*)\]`, "u").exec(
    frontmatter,
  )?.[1];
  if (flow !== undefined) {
    return flow
      .split(",")
      .map((value) =>
        value
          .trim()
          .replaceAll(/^["']|["']$/gu, "")
          .trim(),
      )
      .filter(Boolean);
  }
  const block = new RegExp(String.raw`(?:^|\n)\s*${escaped}:\s*\n((?:\s+-\s*.+\n?)+)`, "u").exec(
    frontmatter,
  )?.[1];
  if (!block) return [];
  return block.split("\n").flatMap((line) => {
    const value = /^\s*-\s*"?([^"\n]+)"?\s*$/u.exec(line)?.[1]?.trim();
    return value ? [value] : [];
  });
}

function normalizeObsidianTarget(value: string): string {
  return toPosix(value)
    .trim()
    .replace(/^context\/wiki\//u, "")
    .replace(/\.md$/u, "");
}

function registerWikiTarget(catalog: WikiLinkCatalog, target: string, canonical: string): void {
  const normalized = normalizeObsidianTarget(target);
  if (!normalized) return;
  const key = normalized.toLowerCase();
  const entry = catalog.get(key);
  if (entry) {
    if (!entry.aliases.includes(normalized)) entry.aliases.push(normalized);
    return;
  }
  catalog.set(key, { canonical, aliases: [normalized] });
}

async function buildWikiLinkCatalog(root: string): Promise<WikiLinkCatalog> {
  const catalog: WikiLinkCatalog = new Map();
  const files = await collectWikiFiles(root, "context/wiki");
  for (const rel of files.filter(
    (file) => file.endsWith(".md") && path.basename(file) !== "AGENTS.md",
  )) {
    const wikiTarget = rel.replace(/^context\/wiki\//u, "").replace(/\.md$/u, "");
    const text = await readFile(path.join(root, rel), "utf8");
    const frontmatter = extractFrontmatter(text);
    const title = frontmatter ? extractYamlScalar(frontmatter, "title") : null;
    const aliases = frontmatter ? extractYamlList(frontmatter, "aliases") : [];
    registerWikiTarget(catalog, wikiTarget, wikiTarget);
    if (path.basename(wikiTarget) !== "index") {
      registerWikiTarget(catalog, path.basename(wikiTarget), wikiTarget);
    }
    if (title) registerWikiTarget(catalog, title, title);
    for (const alias of aliases) registerWikiTarget(catalog, alias, alias);
  }
  return catalog;
}

function lintObsidianLinks(rel: string, text: string, catalog?: WikiLinkCatalog): string[] {
  if (!catalog) return [];
  const errors: string[] = [];
  const linkPattern = /!?\[\[([^\]\n]+)\]\]/gu;
  for (const match of text.matchAll(linkPattern)) {
    const raw = match[1]?.trim() ?? "";
    const targetWithHeading = raw.split("|")[0]?.trim() ?? "";
    if (!targetWithHeading || targetWithHeading.startsWith("#")) continue;
    if (/^[a-z][a-z0-9+.-]*:\/\//iu.test(targetWithHeading)) continue;
    const [targetPage] = targetWithHeading.split("#");
    const normalized = normalizeObsidianTarget(targetPage ?? "");
    if (!normalized) continue;
    const entry = catalog.get(normalized.toLowerCase());
    if (!entry) {
      errors.push(`${rel}: unknown Obsidian wikilink target [[${targetWithHeading}]]`);
      continue;
    }
    if (!entry.aliases.includes(normalized)) {
      const heading = targetWithHeading.includes("#")
        ? `#${targetWithHeading.split("#").slice(1).join("#")}`
        : "";
      const suggestion = `${entry.canonical}${heading}`;
      errors.push(
        `${rel}: Obsidian wikilink target case must match canonical page or alias: [[${targetWithHeading}]] -> [[${suggestion}]]`,
      );
    }
  }
  return errors;
}

function lintWikiText(rel: string, text: string, catalog?: WikiLinkCatalog): string[] {
  const errors: string[] = [];
  const base = path.basename(rel);
  if ((base === "index.md" || base === "AGENTS.md") && !extractFrontmatter(text)) {
    return errors;
  }
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
  errors.push(...lintObsidianLinks(rel, text, catalog));
  return errors;
}

function isIndexableWikiPage(rel: string): boolean {
  const base = path.basename(rel);
  return rel.endsWith(".md") && base !== "index.md" && base !== "AGENTS.md";
}

function relativeMarkdownLink(fromDir: string, targetRel: string): string {
  return toPosix(path.relative(fromDir, targetRel)) || path.basename(targetRel);
}

function replaceGeneratedIndexSection(text: string, generated: string): string {
  const start = "<!-- agentplane-context-wiki-index:start -->";
  const end = "<!-- agentplane-context-wiki-index:end -->";
  const section = `${start}\n${generated.trimEnd()}\n${end}`;
  const pattern = new RegExp(String.raw`${start}[\s\S]*?${end}`, "u");
  if (pattern.test(text)) return text.replace(pattern, section);
  const trimmed = text.trimEnd();
  return `${trimmed}${trimmed ? "\n\n" : ""}${section}\n`;
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
  const catalog = await buildWikiLinkCatalog(root);
  const errors: string[] = [];
  for (const file of files) {
    errors.push(...lintWikiText(file, await readFile(path.join(root, file), "utf8"), catalog));
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

export async function cmdContextWikiIndex(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { path: string };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const target = await normalizeWikiLintTarget(root, opts.parsed.path);
  const targetAbs = path.join(root, target);
  const targetStats = await stat(targetAbs);
  const targetDir = targetStats.isFile() ? path.posix.dirname(target) : target;
  const wikiRoot = "context/wiki";
  const collectedWikiFiles = await collectWikiFiles(root, target);
  const wikiFiles = collectedWikiFiles.filter((file) => isIndexableWikiPage(file));
  const dirs = new Set<string>();
  for (const file of wikiFiles) {
    let current = path.posix.dirname(file);
    while (current.startsWith(targetDir) && current !== ".") {
      dirs.add(current);
      if (current === targetDir || current === wikiRoot) break;
      current = path.posix.dirname(current);
    }
  }

  const updated: string[] = [];
  for (const dir of [...dirs].toSorted()) {
    const directPages = wikiFiles.filter((file) => path.posix.dirname(file) === dir);
    const childDirs = [...dirs].filter(
      (candidate) => path.posix.dirname(candidate) === dir && candidate !== dir,
    );
    if (directPages.length === 0 && childDirs.length === 0) continue;

    const entries: string[] = [];
    for (const child of childDirs.toSorted()) {
      entries.push(
        `- [${titleFromPath(child)}](${relativeMarkdownLink(dir, `${child}/index.md`)})`,
      );
    }
    for (const page of directPages.toSorted()) {
      const text = await readFile(path.join(root, page), "utf8");
      entries.push(`- [${titleFromMarkdown(page, text)}](${relativeMarkdownLink(dir, page)})`);
    }

    const indexRel = `${dir}/index.md`;
    const indexAbs = path.join(root, indexRel);
    const existing = (await fileExists(indexAbs))
      ? await readFile(indexAbs, "utf8")
      : `# ${titleFromPath(dir)}\n`;
    const next = replaceGeneratedIndexSection(existing, entries.join("\n"));
    if (next !== existing) {
      await mkdir(path.dirname(indexAbs), { recursive: true });
      await writeFile(indexAbs, next, "utf8");
      updated.push(indexRel);
    }
  }

  process.stdout.write(`context wiki index: updated ${updated.length} index page(s)\n`);
  for (const rel of updated) process.stdout.write(`- ${rel}\n`);
  return 0;
}
