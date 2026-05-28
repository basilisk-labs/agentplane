import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { toPosix } from "./context-utils.js";

export type WikiModality =
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

export type WikiStatus =
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

export const MODALITIES = new Set<WikiModality>([
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

export const STATUSES = new Set<WikiStatus>([
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

export function renderWikiPage(opts: {
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
