import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

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
  const updates = await buildWikiIndexUpdates({ root, target });
  for (const [rel, text] of updates) {
    const abs = path.join(root, rel);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, text, "utf8");
  }

  process.stdout.write(`context wiki index: updated ${updates.size} index page(s)\n`);
  for (const rel of updates.keys()) process.stdout.write(`- ${rel}\n`);
  return 0;
}
