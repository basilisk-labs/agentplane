import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { collectMatchingFiles, fileExists, toPosix } from "./context-utils.js";
import { normalizeWikiPath } from "./wiki-page.js";

type WikiLinkCatalogEntry = {
  canonical: string;
  aliases: string[];
};

type WikiLinkCatalog = Map<string, WikiLinkCatalogEntry>;

export async function collectWikiFiles(root: string, rel: string): Promise<string[]> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return [];
  const st = await stat(abs);
  if (st.isFile()) return [rel];
  const files = await collectMatchingFiles(root, rel);
  return files.filter((item) => item.endsWith(".md"));
}

export async function normalizeWikiLintTarget(root: string, input: string): Promise<string> {
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

export function extractFrontmatter(text: string): string | null {
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

export async function buildWikiLinkCatalog(root: string): Promise<WikiLinkCatalog> {
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
    if (title) registerWikiTarget(catalog, title, wikiTarget);
    for (const alias of aliases) registerWikiTarget(catalog, alias, wikiTarget);
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

export function lintWikiText(rel: string, text: string, catalog?: WikiLinkCatalog): string[] {
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
  errors.push(...lintObsidianLinks(rel, text, catalog));
  return errors;
}
