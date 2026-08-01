import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { buildWikiIndexUpdates } from "../../context/wiki-index-builder.js";
import { fileExists } from "./context-utils.js";
import {
  buildWikiLinkCatalog,
  collectWikiFiles,
  extractFrontmatter,
  lintWikiText,
  normalizeWikiLintTarget,
} from "./wiki-lint.js";
import {
  assertChoice,
  MODALITIES,
  normalizeWikiPath,
  renderWikiPage,
  STATUSES,
  titleFromPath,
} from "./wiki-page.js";

const output = createCliEmitter();

export async function createContextWikiPage(opts: {
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
}): Promise<{ path: string }> {
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
  return { path: rel };
}

export async function lintContextWiki(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { path: string };
}): Promise<{ pages: number }> {
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
  return { pages: files.length };
}

export async function explainContextWikiPage(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { page: string };
}): Promise<{ path: string; frontmatter: string | null }> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const rel = normalizeWikiPath(root, opts.parsed.page);
  const text = await readFile(path.join(root, rel), "utf8");
  const frontmatter = extractFrontmatter(text);
  return { path: rel, frontmatter };
}

export async function findContextWikiLinks(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { page: string };
}): Promise<{ path: string; matches: string[] }> {
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
  return { path: rel, matches: matches.slice(0, 20) };
}

export async function indexContextWiki(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { path: string };
}): Promise<{ updated: string[] }> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const target = await normalizeWikiLintTarget(root, opts.parsed.path);
  const updates = await buildWikiIndexUpdates({ root, target });
  for (const [rel, text] of updates) {
    const abs = path.join(root, rel);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, text, "utf8");
  }

  return { updated: [...updates.keys()] };
}

export async function cmdContextWikiNew(
  opts: Parameters<typeof createContextWikiPage>[0],
): Promise<number> {
  const result = await createContextWikiPage(opts);
  output.line(`context wiki new: ${result.path}`);
  return 0;
}

export async function cmdContextWikiLint(
  opts: Parameters<typeof lintContextWiki>[0],
): Promise<number> {
  const result = await lintContextWiki(opts);
  output.line(`context wiki lint: ok (${result.pages} page(s))`);
  return 0;
}

export async function cmdContextWikiExplain(
  opts: Parameters<typeof explainContextWikiPage>[0],
): Promise<number> {
  const result = await explainContextWikiPage(opts);
  output.lines([
    `context wiki explain: ${result.path}`,
    result.frontmatter ?? "frontmatter: missing",
  ]);
  return 0;
}

export async function cmdContextWikiLink(
  opts: Parameters<typeof findContextWikiLinks>[0],
): Promise<number> {
  const result = await findContextWikiLinks(opts);
  output.lines([
    `context wiki link: ${result.path}`,
    ...(result.matches.length === 0
      ? ["- no obvious wiki link candidates found"]
      : result.matches.map((match) => `- ${match}`)),
  ]);
  return 0;
}

export async function cmdContextWikiIndex(
  opts: Parameters<typeof indexContextWiki>[0],
): Promise<number> {
  const result = await indexContextWiki(opts);
  output.lines([
    `context wiki index: updated ${result.updated.length} index page(s)`,
    ...result.updated.map((path) => `- ${path}`),
  ]);
  return 0;
}
