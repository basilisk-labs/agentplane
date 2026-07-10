import { readFile } from "node:fs/promises";
import path from "node:path";

import { toPosix } from "./context-utils.js";
import { extractFrontmatter } from "./wiki-lint.js";

export type WikiReportRow = Record<string, unknown>;

export type WikiLinkRow = WikiReportRow & {
  source_path: string;
  target_path: string | null;
};

type WikiPageInfo = {
  rel: string;
  title: string;
};

type WikiTargetCatalog = Map<string, Set<string>>;

function normalizeTarget(value: string): string {
  return (
    toPosix(value)
      .trim()
      .split("|")[0]
      ?.trim()
      .split("#")[0]
      ?.trim()
      .replace(/^context\/wiki\//u, "")
      .replace(/\.md$/u, "") ?? ""
  );
}

function lookupKey(value: string): string {
  return normalizeTarget(value)
    .replace(/^entity\./u, "")
    .replace(/^wiki\./u, "")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-|-$/gu, "");
}

function addWikiTarget(catalog: WikiTargetCatalog, key: string, rel: string): void {
  const normalizedKey = key.trim();
  if (!normalizedKey) return;
  const paths = catalog.get(normalizedKey) ?? new Set<string>();
  paths.add(rel);
  catalog.set(normalizedKey, paths);
}

function resolveWikiTarget(
  catalog: WikiTargetCatalog,
  normalizedTarget: string,
): { targetPath: string | null; candidatePaths: string[] } {
  const candidatePaths = [
    ...(catalog.get(normalizedTarget.toLowerCase()) ?? []),
    ...(catalog.get(lookupKey(normalizedTarget)) ?? []),
  ].filter((candidate, index, candidates) => candidates.indexOf(candidate) === index);
  candidatePaths.sort((left, right) => left.localeCompare(right));
  return {
    targetPath: candidatePaths.length === 1 ? (candidatePaths[0] ?? null) : null,
    candidatePaths,
  };
}

function titleFromMarkdown(rel: string, text: string): string {
  const frontmatter = extractFrontmatter(text);
  const title = frontmatter
    ? /(?:^|\n)\s*title:\s*"?([^"\n]+)"?/u.exec(frontmatter)?.[1]?.trim()
    : "";
  if (title) return title;
  return /^#\s+(.+)$/mu.exec(text)?.[1]?.trim() ?? path.basename(rel, ".md");
}

export function wikiReportScalar(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

export function isOrphanExempt(rel: string): boolean {
  return (
    rel === "context/wiki/index.md" ||
    rel === "context/wiki/glossary.md" ||
    rel === "context/wiki/AGENTS.md" ||
    rel.includes("/reports/") ||
    rel.endsWith("/index.md")
  );
}

function extractWikilinks(text: string): string[] {
  return [...text.matchAll(/!?\[\[([^\]\n]+)\]\]/gu)].map((match) => match[1]?.trim() ?? "");
}

function extractMarkdownLinks(text: string): { label: string; href: string }[] {
  return [...text.matchAll(/(?<!!)\[([^\]\n]+)\]\(([^)\n]+)\)/gu)]
    .map((match) => ({ label: match[1]?.trim() ?? "", href: match[2]?.trim() ?? "" }))
    .filter((link) => link.href.length > 0);
}

function markdownTargetPath(sourcePath: string, href: string): string | null {
  const target = href.split("#")[0]?.trim() ?? "";
  if (
    !target ||
    target.startsWith("#") ||
    /^[a-z][a-z0-9+.-]*:/iu.test(target) ||
    target.startsWith("/")
  ) {
    return null;
  }
  const resolved = toPosix(path.normalize(path.join(path.dirname(sourcePath), target)));
  if (!resolved.startsWith("context/wiki/") || !resolved.endsWith(".md")) return null;
  return resolved;
}

export async function buildWikiTargetCatalog(
  root: string,
  wikiFiles: string[],
): Promise<{ pathByTarget: WikiTargetCatalog; pageInfoByPath: Map<string, WikiPageInfo> }> {
  const pathByTarget: WikiTargetCatalog = new Map();
  const pageInfoByPath = new Map<string, WikiPageInfo>();
  for (const rel of wikiFiles) {
    const target = rel.replace(/^context\/wiki\//u, "").replace(/\.md$/u, "");
    addWikiTarget(pathByTarget, target.toLowerCase(), rel);
    addWikiTarget(pathByTarget, lookupKey(target), rel);
    addWikiTarget(pathByTarget, path.basename(target).toLowerCase(), rel);
    addWikiTarget(pathByTarget, lookupKey(path.basename(target)), rel);
    const text = await readFile(path.join(root, rel), "utf8");
    const title = titleFromMarkdown(rel, text);
    pageInfoByPath.set(rel, { rel, title });
    addWikiTarget(pathByTarget, title.toLowerCase(), rel);
    addWikiTarget(pathByTarget, lookupKey(title), rel);
  }
  return { pathByTarget, pageInfoByPath };
}

export async function buildWikiLinkRows(
  root: string,
  sourceFiles: string[],
  pathByTarget: WikiTargetCatalog,
): Promise<{ linkRows: WikiLinkRow[] }> {
  const linkRows: WikiLinkRow[] = [];
  const wikiPathSet = new Set([...pathByTarget.values()].flatMap((paths) => [...paths]));
  for (const sourcePath of sourceFiles) {
    const text = await readFile(path.join(root, sourcePath), "utf8");
    for (const rawTarget of extractWikilinks(text)) {
      const normalized = normalizeTarget(rawTarget);
      if (!normalized || normalized.startsWith("#")) continue;
      const { targetPath, candidatePaths } = resolveWikiTarget(pathByTarget, normalized);
      linkRows.push({
        schema_version: 1,
        link_type: "wikilink",
        source_path: sourcePath,
        raw_target: rawTarget,
        normalized_target: normalized,
        target_path: targetPath,
        status: targetPath ? "resolved" : candidatePaths.length > 1 ? "ambiguous" : "unresolved",
        ...(candidatePaths.length > 1 ? { candidate_paths: candidatePaths } : {}),
      });
    }
    for (const { label, href } of extractMarkdownLinks(text)) {
      const normalized = markdownTargetPath(sourcePath, href);
      if (!normalized) continue;
      const targetPath = wikiPathSet.has(normalized) ? normalized : null;
      linkRows.push({
        schema_version: 1,
        link_type: "markdown",
        source_path: sourcePath,
        raw_target: href,
        label,
        normalized_target: normalized,
        target_path: targetPath,
        status: targetPath ? "resolved" : "unresolved",
      });
    }
  }
  return { linkRows };
}

export function buildInboundCounts(
  linkRows: WikiLinkRow[],
  sourceFiles: string[],
): Map<string, number> {
  const inboundByPath = new Map<string, number>();
  const allowedSources = new Set(sourceFiles);
  for (const row of linkRows) {
    if (!allowedSources.has(row.source_path) || !row.target_path) continue;
    inboundByPath.set(row.target_path, (inboundByPath.get(row.target_path) ?? 0) + 1);
  }
  return inboundByPath;
}

function entityPageMap(
  entities: WikiReportRow[],
  pageInfoByPath: Map<string, WikiPageInfo>,
): Map<string, string> {
  const pathByKey = new Map<string, string>();
  for (const page of pageInfoByPath.values()) {
    pathByKey.set(lookupKey(page.rel), page.rel);
    pathByKey.set(lookupKey(path.basename(page.rel, ".md")), page.rel);
    pathByKey.set(lookupKey(page.title), page.rel);
  }
  const mapped = new Map<string, string>();
  for (const entity of entities) {
    const id = wikiReportScalar(entity.id, "");
    if (!id) continue;
    const explicitTarget = wikiReportScalar(entity.target_path ?? entity.targetPath, "");
    const normalizedTarget = explicitTarget ? toPosix(path.normalize(explicitTarget)) : "";
    if (normalizedTarget && pageInfoByPath.has(normalizedTarget)) {
      mapped.set(id, normalizedTarget);
      continue;
    }
    const keys = [
      wikiReportScalar(entity.label, ""),
      id,
      ...((Array.isArray(entity.aliases) ? entity.aliases : []) as unknown[]).map((alias) =>
        wikiReportScalar(alias, ""),
      ),
    ];
    const page = keys.map((key) => pathByKey.get(lookupKey(key))).find(Boolean);
    if (page) mapped.set(id, page);
  }
  return mapped;
}

export function orphanSuggestion(opts: {
  orphanPath: string;
  pageInfoByPath: Map<string, WikiPageInfo>;
  entities: WikiReportRow[];
  edges: WikiReportRow[];
}): WikiReportRow {
  const entityToPage = entityPageMap(opts.entities, opts.pageInfoByPath);
  const targetEntityIds = [...entityToPage.entries()]
    .filter(([, page]) => page === opts.orphanPath)
    .map(([entityId]) => entityId);
  for (const targetEntityId of targetEntityIds) {
    for (const edge of opts.edges) {
      const from = wikiReportScalar(edge.from, "");
      const to = wikiReportScalar(edge.to, "");
      const sourceEntityId = to === targetEntityId ? from : from === targetEntityId ? to : "";
      const sourcePath = entityToPage.get(sourceEntityId);
      if (!sourcePath || sourcePath === opts.orphanPath) continue;
      const targetTitle = opts.pageInfoByPath.get(opts.orphanPath)?.title ?? opts.orphanPath;
      return {
        suggested_source_path: sourcePath,
        suggested_anchor: targetTitle,
        suggestion_reason:
          to === targetEntityId
            ? "graph edge points to this orphan page; add an inbound semantic link from the source entity page"
            : "graph edge starts from this orphan page; add a reciprocal semantic link from the related entity page",
        suggestion_evidence_type: "graph_edge",
        suggested_edge_id: wikiReportScalar(edge.id, ""),
        confidence: 0.78,
      };
    }
  }
  return {
    suggested_source_path: null,
    suggested_anchor: opts.pageInfoByPath.get(opts.orphanPath)?.title ?? opts.orphanPath,
    suggestion_reason:
      "no mapped graph edge could identify a safe inbound link source; review topology manually",
    suggestion_evidence_type: "none",
    confidence: 0.25,
  };
}
