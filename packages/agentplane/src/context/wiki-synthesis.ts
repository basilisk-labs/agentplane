import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  parseWikiFrontmatter,
  renderWikiFrontmatter,
  type WikiModality,
} from "../commands/context/wiki-frontmatter.js";
import { titleFromPath } from "../commands/context/wiki-page.js";
import type {
  ContextExtractionItem,
  ContextExtractionSgrResult,
  SgrSourceRef,
} from "./sgr-extraction.js";
import { fileExists, toPosix } from "./context-utils.js";
import type { ExtractionArtifact } from "./extraction-transaction.js";
import { buildWikiIndexUpdates } from "./wiki-index-builder.js";

const MANAGED = {
  summary: {
    heading: "Summary",
    start: "<!-- agentplane-context-summary:start -->",
    end: "<!-- agentplane-context-summary:end -->",
  },
  atoms: {
    heading: "Atomic knowledge",
    start: "<!-- agentplane-context-atoms:start -->",
    end: "<!-- agentplane-context-atoms:end -->",
  },
  sources: {
    heading: "Sources",
    start: "<!-- agentplane-context-sources:start -->",
    end: "<!-- agentplane-context-sources:end -->",
  },
} as const;

const NON_ATOMIC_KINDS = new Set<ContextExtractionItem["kind"]>([
  "coverage",
  "entity_resolution",
  "page_creation",
  "topology_decision",
]);

export type ContextWikiSynthesisPlan = {
  artifacts: ExtractionArtifact[];
  pages: number;
  atoms: number;
  logEntries: number;
};

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map((entry) => stableJson(entry)).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => `${JSON.stringify(key)}:${stableJson(entry)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

function digestResult(result: ContextExtractionSgrResult): string {
  return `sha256:${createHash("sha256").update(stableJson(result)).digest("hex")}`;
}

function sourceRefToString(ref: SgrSourceRef): string {
  if (ref.lines) return `${ref.path}#lines=${ref.lines}`;
  if (typeof ref.line === "number") return `${ref.path}#L${ref.line}`;
  if (ref.section) return `${ref.path}#${ref.section}`;
  return ref.path;
}

function unique(values: Iterable<string>): string[] {
  return [...new Set([...values].filter(Boolean))].toSorted();
}

function uniqueStable(values: Iterable<string>): string[] {
  return [...new Set([...values].filter(Boolean))];
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "")
    : [];
}

function frontmatterSourceRefs(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (typeof entry === "string" && entry.trim()) return [entry];
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) return [];
    const record = entry as Record<string, unknown>;
    if (typeof record.ref === "string" && record.ref.trim()) return [record.ref];
    if (typeof record.path === "string" && record.path.trim()) return [record.path];
    return [];
  });
}

function stringField(row: Record<string, unknown>, field: string): string {
  const value = row[field];
  return typeof value === "string" ? value.trim() : "";
}

function assertWikiPath(root: string, input: string): string {
  const rel = toPosix(input.trim());
  const abs = path.resolve(root, rel);
  const wikiRoot = path.resolve(root, "context/wiki");
  if (!rel.endsWith(".md") || (!abs.startsWith(`${wikiRoot}${path.sep}`) && abs !== wikiRoot)) {
    throw new Error(
      `Context wiki synthesis path must stay under context/wiki and end in .md: ${input}`,
    );
  }
  return toPosix(path.relative(root, abs));
}

function bodyWithoutFrontmatter(text: string): string {
  const normalized = text.replaceAll("\r\n", "\n");
  if (!normalized.startsWith("---\n")) return normalized;
  const end = normalized.indexOf("\n---", 4);
  if (end === -1) return normalized;
  return normalized.slice(end + 4).replace(/^\n/u, "");
}

function upsertManagedSection(
  body: string,
  section: (typeof MANAGED)[keyof typeof MANAGED],
  content: string,
): string {
  const block = `${section.start}\n${content.trimEnd()}\n${section.end}`;
  const managedPattern = new RegExp(
    `${section.start.replaceAll(/[.*+?^${}()|[\]\\]/gu, "\\$&")}[\\s\\S]*?${section.end.replaceAll(/[.*+?^${}()|[\]\\]/gu, "\\$&")}`,
    "u",
  );
  if (managedPattern.test(body)) return body.replace(managedPattern, block);

  const headingPattern = new RegExp(`^##\\s+${section.heading}\\s*$`, "mu");
  const heading = headingPattern.exec(body);
  if (heading) {
    const insertAt = heading.index + heading[0].length;
    return `${body.slice(0, insertAt)}\n\n${block}${body.slice(insertAt)}`;
  }
  const trimmed = body.trimEnd();
  return `${trimmed}${trimmed ? "\n\n" : ""}## ${section.heading}\n\n${block}\n`;
}

function managedSectionContent(
  body: string,
  section: (typeof MANAGED)[keyof typeof MANAGED],
): string | null {
  const start = body.indexOf(section.start);
  if (start === -1) return null;
  const contentStart = start + section.start.length;
  const end = body.indexOf(section.end, contentStart);
  if (end === -1) return null;
  return body.slice(contentStart, end).trim();
}

function managedAtomBlocks(body: string): Map<string, string> {
  const managed = managedSectionContent(body, MANAGED.atoms);
  if (!managed) return new Map();
  const headings = [...managed.matchAll(/^###\s+`([^`]+)`\s*$/gmu)];
  const blocks = new Map<string, string>();
  for (const [index, heading] of headings.entries()) {
    const id = heading[1]?.trim();
    if (!id || heading.index === undefined) continue;
    const next = headings[index + 1];
    const end = next?.index ?? managed.length;
    blocks.set(id, managed.slice(heading.index, end).trim());
  }
  return blocks;
}

function wikiTarget(rel: string): string {
  return rel.replace(/^context\/wiki\//u, "").replace(/\.md$/u, "");
}

function pageModality(pageType: string, items: ContextExtractionItem[]): WikiModality {
  const kinds = new Set(items.map((item) => item.kind));
  const normalized = pageType.toLowerCase();
  if (kinds.has("decision") || normalized.includes("decision")) return "decision";
  if (kinds.has("requirement") || kinds.has("constraint")) return "requirement";
  if (kinds.has("risk") || normalized.includes("risk")) return "risk";
  if (kinds.has("workflow") || kinds.has("procedure") || normalized.includes("workflow")) {
    return "workflow";
  }
  if (kinds.has("deprecation")) return "deprecation";
  if (kinds.has("definition") || normalized.includes("entity") || normalized.includes("concept")) {
    return "definition";
  }
  return "factual_claim";
}

function pageStatus(items: ContextExtractionItem[]): string {
  if (items.some((item) => item.status === "conflict" || item.kind === "contradiction")) {
    return "disputed";
  }
  if (items.some((item) => item.status === "stale" || item.validity === "deprecated")) {
    return "deprecated";
  }
  if (items.some((item) => item.status === "accepted")) return "sourced_claim";
  if (items.some((item) => item.status === "unresolved")) return "hypothesis";
  return "extracted_candidate";
}

function atomBelongsToPage(
  item: ContextExtractionItem,
  pageRel: string,
  entityIds: ReadonlySet<string>,
): boolean {
  if (NON_ATOMIC_KINDS.has(item.kind)) return false;
  if (item.target_path && toPosix(item.target_path) === pageRel) return true;
  if (item.canonical_refs?.some((ref) => entityIds.has(ref))) return true;
  if (item.entity && entityIds.has(item.entity.id)) return true;
  return Boolean(item.edge && (entityIds.has(item.edge.from) || entityIds.has(item.edge.to)));
}

function renderAtom(opts: {
  item: ContextExtractionItem;
  pageRel: string;
  sourceNumbers: ReadonlyMap<string, number>;
  entityPages: ReadonlyMap<string, string>;
  entityLabels: ReadonlyMap<string, string>;
}): string {
  const item = opts.item;
  const relatedIds = unique([
    ...(item.canonical_refs ?? []),
    ...(item.edge ? [item.edge.from, item.edge.to] : []),
  ]);
  const links = relatedIds
    .map((entityId) => {
      const target = opts.entityPages.get(entityId);
      if (!target || target === opts.pageRel) return null;
      return `[[${wikiTarget(target)}|${opts.entityLabels.get(entityId) ?? entityId}]]`;
    })
    .filter((value): value is string => value !== null);
  const noteNumbers = unique(item.source_refs.map((ref) => sourceRefToString(ref)))
    .map((ref) => opts.sourceNumbers.get(ref))
    .filter((value): value is number => value !== undefined)
    .map((value) => `[${value}]`);
  const relations = [
    ...(item.supersedes?.map((id) => `supersedes \`${id}\``) ?? []),
    ...(item.superseded_by?.map((id) => `superseded by \`${id}\``) ?? []),
    ...(item.contradicts?.map((id) => `contradicts \`${id}\``) ?? []),
    ...(item.depends_on?.map((id) => `depends on \`${id}\``) ?? []),
  ];
  const metadata = [
    `kind: \`${item.kind}\``,
    `status: \`${item.status}\``,
    ...(item.validity ? [`validity: \`${item.validity}\``] : []),
    ...(item.scope ? [`scope: ${item.scope}`] : []),
  ].join("; ");
  return [
    `### \`${item.id}\``,
    "",
    `${item.summary.replaceAll(/\s+/gu, " ").trim()}${noteNumbers.length > 0 ? ` ${noteNumbers.join(" ")}` : ""}`,
    "",
    `- ${metadata}`,
    ...(links.length > 0 ? [`- Related: ${unique(links).join(", ")}`] : []),
    ...(relations.length > 0 ? [`- Relations: ${relations.join("; ")}`] : []),
  ].join("\n");
}

function renderSources(sourceRefs: string[]): string {
  if (sourceRefs.length === 0) return "- no-source: synthesis received no source reference";
  return sourceRefs.map((ref, index) => `${index + 1}. [${ref}](${ref})`).join("\n");
}

function canonicalWikiId(rel: string): string {
  const slug = wikiTarget(rel)
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/gu, "-")
    .replaceAll(/^-+|-+$/gu, "");
  return `wiki.${slug}`;
}

async function existingText(root: string, rel: string): Promise<string | null> {
  const abs = path.join(root, rel);
  return (await fileExists(abs)) ? await readFile(abs, "utf8") : null;
}

function renderLog(opts: {
  existing: string | null;
  taskId: string;
  digest: string;
  date: string;
  pageRows: { rel: string; title: string }[];
  atomCount: number;
  sourceRefs: string[];
}): { content: string; added: boolean } {
  const rel = "context/wiki/log.md";
  const parsed = opts.existing ? parseWikiFrontmatter(rel, opts.existing) : null;
  const allSourceRefs = uniqueStable([
    ...frontmatterSourceRefs(parsed?.context?.source_refs),
    ...opts.sourceRefs,
  ]);
  const frontmatter = renderWikiFrontmatter({
    canonicalId: "wiki.context-assimilation-log",
    title: "Context Assimilation Log",
    modality: "observation",
    status: "generated_report",
    visibility: "project",
    sourceRefs: allSourceRefs,
    updatedBy: "context extraction apply",
    noGraphRefReason: "The operation log records ingestion events rather than domain entities.",
    existingRoot: parsed?.root,
  });
  let body = opts.existing
    ? bodyWithoutFrontmatter(opts.existing)
    : "# Context Assimilation Log\n\n## Summary\n\nAppend-only record of deterministic context assimilation operations.\n";
  const entryKey = `digest: ${opts.digest}`;
  const taskKey = `task_id: ${opts.taskId}`;
  const alreadyPresent = body.includes(entryKey) && body.includes(taskKey);
  if (!alreadyPresent) {
    const pages =
      opts.pageRows.length > 0
        ? opts.pageRows.map((page) => `[[${wikiTarget(page.rel)}|${page.title}]]`).join(", ")
        : "none";
    const entry = [
      `## [${opts.date}] ingest | ${opts.taskId} | ${opts.digest.slice(7, 19)}`,
      "",
      `- task_id: ${opts.taskId}`,
      `- digest: ${opts.digest}`,
      `- pages: ${pages}`,
      `- atoms: ${opts.atomCount}`,
      `- sources: ${opts.sourceRefs.length}`,
    ].join("\n");
    body = `${body.trimEnd()}\n\n${entry}\n`;
  }
  body = upsertManagedSection(body, MANAGED.sources, renderSources(allSourceRefs));
  return { content: `${frontmatter}\n\n${body.trimStart()}`, added: !alreadyPresent };
}

export async function buildContextWikiSynthesis(opts: {
  root: string;
  result: ContextExtractionSgrResult;
  taskId?: string;
  generatedAt?: string;
}): Promise<ContextWikiSynthesisPlan> {
  const taskId = opts.taskId ?? opts.result.task_id ?? "unscoped";
  const generatedAt = opts.generatedAt ?? new Date().toISOString();
  const pageItems = opts.result.extracted_items
    .filter((item) => item.kind === "page_creation" && item.page_creation)
    .toSorted((left, right) =>
      (left.page_creation?.path ?? "").localeCompare(right.page_creation?.path ?? ""),
    );
  if (pageItems.length === 0) {
    throw new Error("Context wiki synthesis requires at least one page_creation item");
  }

  const entityLabels = new Map<string, string>();
  for (const item of opts.result.extracted_items) {
    if (item.entity) entityLabels.set(item.entity.id, item.entity.label);
  }

  const pageRows = pageItems.map((item) => {
    const page = item.page_creation;
    if (!page) throw new Error(`Missing page_creation payload for ${item.id}`);
    return { item, page, rel: assertWikiPath(opts.root, page.path) };
  });
  const entityPages = new Map<string, string>();
  for (const row of pageRows) {
    for (const entityId of row.page.canonical_entity_ids ?? []) {
      if (!entityPages.has(entityId)) entityPages.set(entityId, row.rel);
    }
  }

  const overlays = new Map<string, string>();
  const assignedAtoms = new Set<string>();
  const renderedPages: { rel: string; title: string }[] = [];
  for (const row of pageRows) {
    const entityIds = new Set(row.page.canonical_entity_ids);
    const atoms = opts.result.extracted_items
      .filter((item) => atomBelongsToPage(item, row.rel, entityIds))
      .toSorted((left, right) => left.id.localeCompare(right.id));
    for (const atom of atoms) assignedAtoms.add(atom.id);

    const current = await existingText(opts.root, row.rel);
    const parsed = current ? parseWikiFrontmatter(row.rel, current) : null;
    const entityTitle = [...entityIds]
      .map((id) => entityLabels.get(id))
      .find((value): value is string => Boolean(value));
    const existingTitle =
      typeof parsed?.context?.title === "string" ? parsed.context.title.trim() : "";
    const declaredTitle = stringField(row.page, "title");
    const title =
      existingTitle.length > 0
        ? existingTitle
        : declaredTitle.length > 0
          ? declaredTitle
          : (entityTitle ?? titleFromPath(row.rel));
    const bodyBefore = current ? bodyWithoutFrontmatter(current) : `# ${title}\n`;
    const sourceRefs = uniqueStable([
      ...frontmatterSourceRefs(parsed?.context?.source_refs),
      ...row.item.source_refs.map((ref) => sourceRefToString(ref)),
      ...atoms.flatMap((item) => item.source_refs.map((ref) => sourceRefToString(ref))),
    ]);
    const sourceNumbers = new Map(sourceRefs.map((ref, index) => [ref, index + 1]));
    const atomBlocks = managedAtomBlocks(bodyBefore);
    for (const item of atoms) {
      atomBlocks.set(
        item.id,
        renderAtom({
          item,
          pageRel: row.rel,
          sourceNumbers,
          entityPages,
          entityLabels,
        }),
      );
    }
    const atomIds = [...atomBlocks.keys()].toSorted();
    const existingGraphRefs =
      parsed?.context?.graph_refs &&
      typeof parsed.context.graph_refs === "object" &&
      !Array.isArray(parsed.context.graph_refs)
        ? (parsed.context.graph_refs as Record<string, unknown>)
        : {};
    const graphEntities = unique([
      ...stringArray(existingGraphRefs.entities),
      ...entityIds,
      ...atoms.flatMap((item) => item.canonical_refs ?? []),
      ...atoms.flatMap((item) => (item.entity ? [item.entity.id] : [])),
    ]);
    const graphEdges = unique([
      ...stringArray(existingGraphRefs.edges),
      ...atoms.flatMap((item) => (item.edge ? [item.edge.id ?? item.id] : [])),
    ]);
    const conflicts = unique([
      ...stringArray(parsed?.context?.conflicts),
      ...atoms
        .filter(
          (item) =>
            item.kind === "contradiction" ||
            item.status === "conflict" ||
            (item.conflict_markers?.length ?? 0) > 0,
        )
        .map((item) => item.id),
    ]);
    const aliases = unique(
      atoms.flatMap((item) => (item.entity ? (item.entity.aliases ?? []) : [])),
    );
    const canonicalId =
      (typeof parsed?.context?.canonical_id === "string"
        ? parsed.context.canonical_id.trim()
        : "") || canonicalWikiId(row.rel);
    const frontmatter = renderWikiFrontmatter({
      canonicalId,
      title,
      modality: pageModality(row.page.page_type, atoms),
      status: conflicts.length > 0 ? "disputed" : pageStatus(atoms),
      visibility: stringField(row.page, "visibility") || "project",
      sourceRefs,
      claims: unique([...stringArray(parsed?.context?.claims), ...atomIds]),
      graphEntities,
      graphEdges,
      conflicts,
      aliases,
      updatedBy: `context extraction apply:${taskId}`,
      noGraphRefReason: "No canonical graph entity was assigned by the extraction result.",
      existingRoot: parsed?.root,
    });
    const synthesizedSummary =
      atoms.find(
        (item) =>
          item.status === "accepted" &&
          !["graph_entity", "graph_edge", "wiki_update", "contradiction"].includes(item.kind),
      )?.summary ??
      atoms.find((item) => !["graph_entity", "graph_edge", "wiki_update"].includes(item.kind))
        ?.summary ??
      managedSectionContent(bodyBefore, MANAGED.summary) ??
      row.item.summary;
    let body = bodyBefore;
    body = upsertManagedSection(body, MANAGED.summary, synthesizedSummary);
    body = upsertManagedSection(
      body,
      MANAGED.atoms,
      atomIds.length > 0
        ? atomIds
            .map((id) => atomBlocks.get(id))
            .filter(Boolean)
            .join("\n\n")
        : "No atomic knowledge was assigned by this extraction result.",
    );
    body = upsertManagedSection(body, MANAGED.sources, renderSources(sourceRefs));
    overlays.set(row.rel, `${frontmatter}\n\n${body.trimStart()}`);
    renderedPages.push({ rel: row.rel, title });
  }

  const inputSourceRefs = unique(opts.result.source_refs.map((ref) => sourceRefToString(ref)));
  const log = renderLog({
    existing: await existingText(opts.root, "context/wiki/log.md"),
    taskId,
    digest: digestResult(opts.result),
    date: generatedAt.slice(0, 10),
    pageRows: renderedPages,
    atomCount: assignedAtoms.size,
    sourceRefs: inputSourceRefs,
  });
  overlays.set("context/wiki/log.md", log.content);

  for (const [rel, content] of await buildWikiIndexUpdates({
    root: opts.root,
    target: "context/wiki",
    overlays,
  })) {
    overlays.set(rel, content);
  }

  return {
    artifacts: [...overlays.entries()]
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([rel, content]) => ({
        path: path.join(opts.root, rel),
        content,
        format: "text" as const,
      })),
    pages: pageRows.length,
    atoms: assignedAtoms.size,
    logEntries: log.added ? 1 : 0,
  };
}
