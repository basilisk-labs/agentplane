import { readFile } from "node:fs/promises";
import path from "node:path";

import { parseWikiFrontmatter } from "../commands/context/wiki-frontmatter.js";
import { collectWikiFiles } from "../commands/context/wiki-lint.js";
import { renderWikiPage, titleFromPath } from "../commands/context/wiki-page.js";
import { fileExists, toPosix } from "./context-utils.js";

const INDEX_START = "<!-- agentplane-context-wiki-index:start -->";
const INDEX_END = "<!-- agentplane-context-wiki-index:end -->";

function titleFromMarkdown(rel: string, text: string): string {
  const frontmatter = parseWikiFrontmatter(rel, text);
  const title = frontmatter.context?.title;
  if (typeof title === "string" && title.trim()) return title.trim();
  const heading = /^#\s+(.+)$/mu.exec(text)?.[1]?.trim();
  return heading && heading.length > 0 ? heading : titleFromPath(rel);
}

function summaryFromMarkdown(text: string): string {
  const heading = /^##\s+Summary\s*$/imu.exec(text);
  if (!heading) return "No summary available.";
  const remainder = text.slice(heading.index + heading[0].length);
  const nextHeading = /^##\s+/mu.exec(remainder);
  const section = nextHeading ? remainder.slice(0, nextHeading.index) : remainder;
  const paragraph = section
    .replaceAll(/<!--[\s\S]*?-->/gu, " ")
    .split(/\n\s*\n/u)
    .map((value) => value.trim())
    .find(
      (value) =>
        Boolean(value) &&
        !value.startsWith("Use numeric source notes") &&
        !value.startsWith("Write source-backed synthesis"),
    );
  if (!paragraph) return "No summary available.";
  return paragraph
    .replaceAll(/\[([^\]]+)\]\([^)]+\)/gu, "$1")
    .replaceAll(/\s+/gu, " ")
    .trim();
}

function sourceCount(rel: string, text: string): number {
  const refs = parseWikiFrontmatter(rel, text).context?.source_refs;
  return Array.isArray(refs) ? refs.length : 0;
}

function isIndexableWikiPage(rel: string): boolean {
  const base = path.basename(rel);
  return rel.endsWith(".md") && base !== "index.md" && base !== "AGENTS.md";
}

function relativeMarkdownLink(fromDir: string, targetRel: string): string {
  return toPosix(path.relative(fromDir, targetRel)) || path.basename(targetRel);
}

function replaceGeneratedIndexSection(text: string, generated: string): string {
  const section = `${INDEX_START}\n${generated.trimEnd()}\n${INDEX_END}`;
  const pattern = new RegExp(String.raw`${INDEX_START}[\s\S]*?${INDEX_END}`, "u");
  if (pattern.test(text)) return text.replace(pattern, section);
  const trimmed = text.trimEnd();
  return `${trimmed}${trimmed ? "\n\n" : ""}${section}\n`;
}

function renderGeneratedIndexPage(rel: string): string {
  return renderWikiPage({
    rel,
    title: titleFromPath(path.posix.dirname(rel)),
    modality: "observation",
    status: "generated_report",
    visibility: "project",
    sourceRefs: [],
  });
}

function isLegacyGeneratedIndexPage(text: string): boolean {
  return !text.startsWith("---\n") && text.includes(INDEX_START) && /^#\s+.+$/mu.test(text);
}

async function readOverlayOrFile(
  root: string,
  rel: string,
  overlays: ReadonlyMap<string, string>,
): Promise<string | null> {
  const overlay = overlays.get(rel);
  if (overlay !== undefined) return overlay;
  const abs = path.join(root, rel);
  return (await fileExists(abs)) ? await readFile(abs, "utf8") : null;
}

export async function buildWikiIndexUpdates(opts: {
  root: string;
  target?: string;
  overlays?: ReadonlyMap<string, string>;
}): Promise<Map<string, string>> {
  const target = opts.target ?? "context/wiki";
  const targetDir = target.endsWith(".md") ? path.posix.dirname(target) : target;
  const overlays = opts.overlays ?? new Map<string, string>();
  const existing = await collectWikiFiles(opts.root, target);
  const wikiFiles = [...new Set([...existing, ...overlays.keys()])]
    .filter((file) => file.startsWith(`${targetDir.replace(/\/+$/u, "")}/`))
    .filter((file) => isIndexableWikiPage(file))
    .toSorted();
  const dirs = new Set<string>();
  for (const file of wikiFiles) {
    let current = path.posix.dirname(file);
    while (current.startsWith(targetDir) && current !== ".") {
      dirs.add(current);
      if (current === targetDir) break;
      current = path.posix.dirname(current);
    }
  }

  const updates = new Map<string, string>();
  for (const dir of [...dirs].toSorted()) {
    const directPages = wikiFiles.filter((file) => path.posix.dirname(file) === dir);
    const childDirs = [...dirs].filter(
      (candidate) => path.posix.dirname(candidate) === dir && candidate !== dir,
    );
    if (directPages.length === 0 && childDirs.length === 0) continue;

    const entries: string[] = childDirs
      .toSorted()
      .map(
        (child) => `- [${titleFromPath(child)}](${relativeMarkdownLink(dir, `${child}/index.md`)})`,
      );
    for (const page of directPages) {
      const text = await readOverlayOrFile(opts.root, page, overlays);
      if (text === null) continue;
      entries.push(
        `- [${titleFromMarkdown(page, text)}](${relativeMarkdownLink(dir, page)}) — ${summaryFromMarkdown(text)} (sources: ${sourceCount(page, text)})`,
      );
    }

    const indexRel = `${dir}/index.md`;
    const existingIndex =
      (await readOverlayOrFile(opts.root, indexRel, overlays)) ??
      renderGeneratedIndexPage(indexRel);
    const base = isLegacyGeneratedIndexPage(existingIndex)
      ? renderGeneratedIndexPage(indexRel)
      : existingIndex;
    const next = replaceGeneratedIndexSection(base, entries.join("\n"));
    if (next !== existingIndex) updates.set(indexRel, next);
  }
  return updates;
}
