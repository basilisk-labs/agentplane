import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { fileExists, toPosix } from "./context-utils.js";
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

function titleFromMarkdown(rel: string, text: string): string {
  const frontmatter = extractFrontmatter(text);
  const titleMatch = frontmatter ? /(?:^|\n)\s*title:\s*"?([^"\n]+)"?/u.exec(frontmatter) : null;
  if (titleMatch?.[1]) return titleMatch[1].trim();
  const headingMatch = /^#\s+(.+)$/mu.exec(text);
  if (headingMatch?.[1]) return headingMatch[1].trim();
  return titleFromPath(rel);
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
