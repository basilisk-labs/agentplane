import path from "node:path";
import { readdir } from "node:fs/promises";

import { fileExists, parseJsonlLines, readText, toPosix } from "./context-utils.js";
import {
  validateEntityResolution,
  validatePageCreation,
  validateTopologyPlan,
} from "./maximum-assimilation-artifacts-validation-ontology.js";

function rowSourceRefs(row: Record<string, unknown>): string[] {
  const out: string[] = [];
  if (typeof row.source_ref === "string" && row.source_ref.trim()) out.push(row.source_ref);
  if (typeof row.source === "string" && row.source.trim()) out.push(row.source);
  if (Array.isArray(row.source_refs)) {
    out.push(...row.source_refs.filter((value): value is string => typeof value === "string"));
  }
  return out;
}

async function loadJsonlRows(filePath: string): Promise<Record<string, unknown>[]> {
  if (!(await fileExists(filePath))) return [];
  return parseJsonlLines(await readText(filePath)) as Record<string, unknown>[];
}

async function listFiles(root: string, rel: string): Promise<string[]> {
  const dir = path.join(root, rel);
  if (!(await fileExists(dir))) return [];
  const out: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const childRel = toPosix(path.join(rel, entry.name));
    if (entry.isDirectory()) out.push(...(await listFiles(root, childRel)));
    else if (entry.isFile()) out.push(childRel);
  }
  return out;
}

function hasLineAddressedSourceRef(value: string): boolean {
  return /(?:#lines?=\d+(?:-\d+)?\b|#L\d+(?:-L?\d+)?\b)/u.test(value);
}

function containsObsidianWikiLink(text: string): boolean {
  return /\[\[[^\]\n|#]+(?:#[^\]\n|]+)?(?:\|[^\]\n]+)?\]\]/u.test(text);
}

async function readExistingText(root: string, rel: string): Promise<string> {
  const abs = path.join(root, rel);
  return (await fileExists(abs)) ? await readText(abs) : "";
}

function stringField(row: Record<string, unknown>, field: string): string {
  const value = row[field];
  return typeof value === "string" ? value.trim() : "";
}

async function validateRequiredReports(root: string, errors: string[]): Promise<void> {
  const requiredReports = [
    "context/wiki/reports/coverage.md",
    "context/wiki/reports/conflicts.md",
    "context/wiki/reports/open-questions.md",
    "context/wiki/reports/evaluator-review.md",
  ];
  for (const rel of requiredReports) {
    if (!(await fileExists(path.join(root, rel)))) {
      errors.push(`${rel}: maximum-assimilation requires this wiki report`);
    }
  }

  const evaluatorText = await readExistingText(root, "context/wiki/reports/evaluator-review.md");
  if (
    evaluatorText &&
    (!/verdict/iu.test(evaluatorText) ||
      !/scenario/iu.test(evaluatorText) ||
      !/failure/iu.test(evaluatorText) ||
      !/raw[-_\s]+deletion/iu.test(evaluatorText))
  ) {
    errors.push(
      "context/wiki/reports/evaluator-review.md: evaluator review must include verdict, scenario coverage, failures, and raw-deletion resilience",
    );
  }
}

async function validateWikiDerivedReports(root: string, errors: string[]): Promise<void> {
  const required = [
    ".agentplane/context/derived/wiki/link-index.jsonl",
    ".agentplane/context/derived/wiki/orphan-report.jsonl",
  ];
  for (const rel of required) {
    if (!(await fileExists(path.join(root, rel)))) {
      errors.push(`${rel}: maximum-assimilation requires this derived wiki report`);
    }
  }
}

function arrayField(row: Record<string, unknown>, field: string): string[] {
  const value = row[field];
  return Array.isArray(value)
    ? value.filter((entry): entry is string => typeof entry === "string" && entry.trim() !== "")
    : [];
}

function hasWikiOrDerivedEntrypoint(values: string[]): boolean {
  return values.some(
    (value) =>
      value.startsWith("context/wiki/") || value.startsWith(".agentplane/context/derived/"),
  );
}

async function validateEvaluatorScenarios(root: string, errors: string[]): Promise<void> {
  const rel = ".agentplane/context/derived/reports/evaluator.jsonl";
  const rows = await loadJsonlRows(path.join(root, rel));
  if (rows.length === 0) {
    errors.push(`${rel}: evaluator_quality_review requires at least one scenario row`);
    return;
  }
  for (const row of rows) {
    const id = stringField(row, "scenario_id") || stringField(row, "id") || "<unknown>";
    const verdict = stringField(row, "verdict");
    const entrypoints = arrayField(row, "entrypoints");
    const evidenceRefs = arrayField(row, "evidence_refs");
    if (entrypoints.length === 0) errors.push(`${rel}#${id}: scenario requires entrypoints`);
    if (!hasWikiOrDerivedEntrypoint(entrypoints)) {
      errors.push(`${rel}#${id}: scenario must use wiki or derived entrypoints, not raw-only`);
    }
    if (evidenceRefs.length === 0) errors.push(`${rel}#${id}: scenario requires evidence_refs`);
    if (["fail", "failed", "rework"].includes(verdict)) {
      errors.push(`${rel}#${id}: failed evaluator scenario requires rework verdict`);
    }
    if (!verdict) errors.push(`${rel}#${id}: scenario requires verdict`);
  }
}

export async function validateMaximumAssimilationArtifacts(opts: {
  root: string;
  changedPaths: string[];
}): Promise<string[]> {
  const errors: string[] = [];
  const glossaryPath = "context/wiki/glossary.md";
  if (!(await fileExists(path.join(opts.root, glossaryPath)))) {
    errors.push(`${glossaryPath}: maximum-assimilation requires a root glossary file`);
  }

  const entityRows = await loadJsonlRows(
    path.join(opts.root, ".agentplane/context/derived/graph/entities.jsonl"),
  );
  const edgeRows = await loadJsonlRows(
    path.join(opts.root, ".agentplane/context/derived/graph/edges.jsonl"),
  );
  if (entityRows.length === 0) {
    errors.push(
      ".agentplane/context/derived/graph/entities.jsonl: maximum-assimilation requires extracted entity rows before wiki synthesis",
    );
  }
  if (edgeRows.length === 0) {
    errors.push(
      ".agentplane/context/derived/graph/edges.jsonl: maximum-assimilation requires relation rows before wiki synthesis",
    );
  }
  const missingLineRefs = [...entityRows, ...edgeRows].filter(
    (row) => !rowSourceRefs(row).some((sourceRef) => hasLineAddressedSourceRef(sourceRef)),
  );
  if (missingLineRefs.length > 0) {
    errors.push(
      `.agentplane/context/derived/graph: maximum-assimilation graph rows require line-addressed source refs (${missingLineRefs.length} row(s) missing)`,
    );
  }

  const topologyTexts = await Promise.all(
    [
      "context/wiki/index.md",
      "context/wiki/topology.md",
      "context/wiki/reports/topology.md",
      ".agentplane/context/derived/reports/assimilation-events.jsonl",
    ].map(async (rel) => await readExistingText(opts.root, rel)),
  );
  const topologyText = topologyTexts.join("\n");
  if (
    !/source[-_\s]+shape/iu.test(topologyText) ||
    !/canonical[-_\s]+famil/iu.test(topologyText) ||
    !/(page[-_\s]+vs[-_\s]+heading|page_vs_heading|granularity)/iu.test(topologyText) ||
    !/(source_refs|source_ref|no-source|no_source)/u.test(topologyText)
  ) {
    errors.push(
      "maximum-assimilation requires a source-shaped topology artifact with source_shape, canonical_families, page-vs-heading granularity, and source refs",
    );
  }
  await validateTopologyPlan(opts.root, opts.changedPaths, errors);
  await validateEntityResolution(opts.root, errors);
  await validatePageCreation(opts.root, opts.changedPaths, errors);
  await validateRequiredReports(opts.root, errors);
  await validateWikiDerivedReports(opts.root, errors);
  await validateEvaluatorScenarios(opts.root, errors);

  const coverageTexts = await Promise.all(
    [
      "context/wiki/reports/coverage.md",
      "context/wiki/coverage.md",
      ".agentplane/context/derived/reports/assimilation-events.jsonl",
    ].map(async (rel) => await readExistingText(opts.root, rel)),
  );
  const coverageText = coverageTexts.join("\n");
  if (
    !/coverage/iu.test(coverageText) ||
    !/(covered|assimilated)/iu.test(coverageText) ||
    !/(omitted|redacted|duplicate|unresolved|conflict|out_of_scope)/iu.test(coverageText) ||
    !/(source_refs|source_ref|no-source|no_source)/u.test(coverageText)
  ) {
    errors.push(
      "maximum-assimilation requires a coverage artifact covering assimilated, omitted/redacted/duplicate/conflict/unresolved/out_of_scope spans with source refs",
    );
  }

  const wikiFiles = await listFiles(opts.root, "context/wiki");
  const allWikiPages = wikiFiles.filter(
    (rel) => (rel.endsWith(".md") || rel.endsWith(".mdx")) && !rel.endsWith("/AGENTS.md"),
  );
  const changedWikiPages = opts.changedPaths.filter(
    (rel) =>
      rel.startsWith("context/wiki/") &&
      (rel.endsWith(".md") || rel.endsWith(".mdx")) &&
      !rel.endsWith("/index.md") &&
      !rel.endsWith("/AGENTS.md") &&
      rel !== glossaryPath,
  );
  if (allWikiPages.length > 2) {
    for (const rel of changedWikiPages) {
      const text = await readExistingText(opts.root, rel);
      if (!containsObsidianWikiLink(text)) {
        errors.push(`${rel}: maximum-assimilation wiki pages require semantic Obsidian wikilinks`);
      }
    }
  }

  return errors;
}
