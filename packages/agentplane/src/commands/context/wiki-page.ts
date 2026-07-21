import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { toPosix } from "./context-utils.js";
import { renderWikiFrontmatter, WIKI_MODALITIES, type WikiModality } from "./wiki-frontmatter.js";

export type { WikiModality } from "./wiki-frontmatter.js";

export type WikiStatus =
  | "mention"
  | "extracted_candidate"
  | "sourced_claim"
  | "corroborated_claim"
  | "reviewed_claim"
  | "accepted_team_knowledge"
  | "canonical_org_knowledge"
  | "generated_report"
  | "assumption"
  | "hypothesis"
  | "disputed"
  | "deprecated"
  | "superseded"
  | "forbidden_for_use";

export const MODALITIES = new Set<WikiModality>(WIKI_MODALITIES);

export const STATUSES = new Set<WikiStatus>([
  "mention",
  "extracted_candidate",
  "sourced_claim",
  "corroborated_claim",
  "reviewed_claim",
  "accepted_team_knowledge",
  "canonical_org_knowledge",
  "generated_report",
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

export function normalizeWikiPath(root: string, input: string): string {
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

export function titleFromPath(rel: string): string {
  const base = path.basename(rel, path.extname(rel));
  return base
    .split(/[-_]+/u)
    .filter(Boolean)
    .map((word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

export function assertChoice<T extends string>(value: string, choices: Set<T>, label: string): T {
  if (choices.has(value as T)) return value as T;
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: `${label} must be one of: ${[...choices].join(", ")}`,
  });
}

function renderSourceNotes(sourceRefs: string[]): string {
  if (sourceRefs.length === 0) {
    return "- no-source: add a source reference before promotion";
  }
  return sourceRefs.map((source, index) => `${index + 1}. [${source}](${source})`).join("\n");
}

export function renderWikiPage(opts: {
  rel: string;
  title: string;
  modality: WikiModality;
  status: WikiStatus;
  visibility: string;
  sourceRefs: string[];
}): string {
  const canonicalId = `wiki.${slug(opts.rel.replace(/^context\/wiki\//u, "").replace(/\.md$/u, ""))}`;
  const frontmatter = renderWikiFrontmatter({
    canonicalId,
    title: opts.title,
    modality: opts.modality,
    status: opts.status,
    visibility: opts.visibility,
    sourceRefs: opts.sourceRefs,
    updatedBy: "CURATOR",
    noGraphRefReason: "No graph reference has been assigned yet; update during synthesis.",
  });
  return `${frontmatter}

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
