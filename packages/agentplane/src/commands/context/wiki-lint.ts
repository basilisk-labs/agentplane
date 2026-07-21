import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import { collectMatchingFiles, fileExists, toPosix } from "./context-utils.js";
import { parseWikiFrontmatter } from "./wiki-frontmatter.js";
import { MODALITIES, normalizeWikiPath, STATUSES } from "./wiki-page.js";

export { extractWikiFrontmatter as extractFrontmatter } from "./wiki-frontmatter.js";

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

export async function normalizeExistingWikiTarget(
  root: string,
  input: string,
  label: string,
): Promise<string> {
  const trimmed = input.trim();
  if (!trimmed) return "context/wiki";
  const scoped = toPosix(trimmed.startsWith("context/wiki") ? trimmed : `context/wiki/${trimmed}`);
  const abs = path.resolve(root, scoped);
  const wikiRoot = path.resolve(root, "context/wiki");
  if (!abs.startsWith(`${wikiRoot}${path.sep}`) && abs !== wikiRoot) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `${label} path must stay under context/wiki: ${input}`,
    });
  }
  if (await fileExists(abs)) return toPosix(path.relative(root, abs));
  const pageRel = normalizeWikiPath(root, trimmed);
  if (await fileExists(path.join(root, pageRel))) return pageRel;
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: `${label} target does not exist: ${input}`,
  });
}

export async function normalizeWikiLintTarget(root: string, input: string): Promise<string> {
  return normalizeExistingWikiTarget(root, input, "wiki lint");
}

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim() !== "")
    : [];
}

function isChoice<T extends string>(value: unknown, choices: ReadonlySet<T>): value is T {
  return typeof value === "string" && choices.has(value as T);
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
    const frontmatter = parseWikiFrontmatter(rel, text);
    const title =
      typeof frontmatter.context?.title === "string" ? frontmatter.context.title.trim() : null;
    const aliases = stringList(frontmatter.root?.aliases);
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
  const parsed = parseWikiFrontmatter(rel, text);
  if (!parsed.raw) {
    errors.push(`${rel}: missing YAML frontmatter`);
    return errors;
  }
  if (parsed.errors.length > 0) return parsed.errors;
  if (!parsed.root || !parsed.context) {
    errors.push(`${rel}: missing agentplane_context mapping`);
    return errors;
  }

  const ctx = parsed.context;
  for (const required of [
    "schema_version",
    "artifact_type",
    "canonical_id",
    "title",
    "modality",
    "epistemic_status",
    "visibility",
    "source_refs",
    "claims",
    "graph_refs",
    "conflicts",
    "updated_by",
  ]) {
    if (!(required in ctx)) errors.push(`${rel}: missing agentplane_context.${required}`);
  }
  for (const field of ["artifact_type", "canonical_id", "title", "visibility", "updated_by"]) {
    if (typeof ctx[field] !== "string" || !ctx[field].trim()) {
      errors.push(`${rel}: agentplane_context.${field} must be a non-empty string`);
    }
  }
  if (ctx.schema_version !== 1) {
    errors.push(`${rel}: agentplane_context.schema_version must be 1`);
  }
  if (!isChoice(ctx.modality, MODALITIES)) {
    errors.push(
      `${rel}: agentplane_context.modality must be one of: ${[...MODALITIES].join(", ")}`,
    );
  }
  if (!isChoice(ctx.epistemic_status, STATUSES)) {
    errors.push(
      `${rel}: agentplane_context.epistemic_status must be one of: ${[...STATUSES].join(", ")}`,
    );
  }
  for (const field of ["aliases", "tags"]) {
    const value = parsed.root[field];
    if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
      errors.push(`${rel}: ${field} must be an array of strings`);
    }
  }
  for (const field of ["source_refs", "claims", "conflicts"]) {
    if (!Array.isArray(ctx[field])) {
      errors.push(`${rel}: agentplane_context.${field} must be an array`);
    }
  }
  if (Array.isArray(ctx.source_refs)) {
    for (const [index, sourceRef] of ctx.source_refs.entries()) {
      if (
        typeof sourceRef !== "string" &&
        (!isRecord(sourceRef) || typeof sourceRef.path !== "string" || !sourceRef.path.trim())
      ) {
        errors.push(
          `${rel}: agentplane_context.source_refs[${index}] must be a string or mapping with path`,
        );
      }
    }
  }
  if (isRecord(ctx.graph_refs)) {
    for (const field of ["entities", "edges"]) {
      const value = ctx.graph_refs[field];
      if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
        errors.push(`${rel}: agentplane_context.graph_refs.${field} must be an array of strings`);
      }
    }
  } else {
    errors.push(`${rel}: agentplane_context.graph_refs must be a mapping`);
  }
  if (!/\[[^\]]+\]\([^)]+\)/u.test(text) && !text.includes("no-source:")) {
    errors.push(`${rel}: missing markdown source/cross-link or explicit no-source marker`);
  }
  errors.push(...lintObsidianLinks(rel, text, catalog));
  return errors;
}
