import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { computeWikiReportSourceDigest, WIKI_REPORT_STATE_PATH } from "../../context/integrity.js";
import { isRecord } from "../../shared/guards.js";
import { fileExists, parseJsonlLines, readText } from "./context-utils.js";
import { renderWikiFrontmatter } from "./wiki-frontmatter.js";
import {
  buildInboundCounts,
  buildWikiLinkRows,
  buildWikiTargetCatalog,
  isOrphanExempt,
  orphanSuggestion,
  wikiReportScalar,
  type WikiReportRow,
} from "./wiki-report-links.js";
import { collectWikiFiles, normalizeExistingWikiTarget } from "./wiki-lint.js";

type WikiReportBuildResult = {
  changed: string[];
  linkRows: WikiReportRow[];
  orphanRows: WikiReportRow[];
};

function reportPage(opts: {
  canonicalId: string;
  title: string;
  body: string[];
  sourceRefs: string[];
}): string {
  const frontmatter = renderWikiFrontmatter({
    canonicalId: opts.canonicalId,
    title: opts.title,
    modality: "observation",
    status: "generated_report",
    visibility: "project",
    sourceRefs: opts.sourceRefs,
    tags: ["agentplane/context", "agentplane/context-report"],
    updatedBy: "context_wiki_report",
  });
  return [
    frontmatter,
    "",
    `# ${opts.title}`,
    "",
    ...opts.body,
    "",
    "## Sources",
    "",
    ...(opts.sourceRefs.length > 0
      ? opts.sourceRefs.map((ref, index) => `${index + 1}. [${ref}](${ref})`)
      : ["- no-source: generated report has no backing derived rows yet"]),
    "",
  ].join("\n");
}

async function loadJsonl(root: string, rel: string): Promise<WikiReportRow[]> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return [];
  return parseJsonlLines(await readText(abs)) as WikiReportRow[];
}

async function loadJsonRecord(root: string, rel: string): Promise<Record<string, unknown> | null> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return null;
  try {
    const parsed = JSON.parse(await readText(abs)) as unknown;
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function writeTextIfChanged(root: string, rel: string, text: string): Promise<boolean> {
  const abs = path.join(root, rel);
  const exists = await fileExists(abs);
  const existing = exists ? await readFile(abs, "utf8") : "";
  if (exists && existing === text) return false;
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, text, "utf8");
  return true;
}

function jsonl(rows: WikiReportRow[]): string {
  return rows.map((row) => JSON.stringify(row)).join("\n") + (rows.length > 0 ? "\n" : "");
}

function renderConflictReport(rows: WikiReportRow[]): string {
  if (rows.length === 0) return "No conflict rows are currently recorded.";
  return rows
    .map((row) => {
      const id = wikiReportScalar(row.id ?? row.conflict_id, "<unknown>");
      const claims = Array.isArray(row.conflicting_claim_ids)
        ? row.conflicting_claim_ids.join(", ")
        : wikiReportScalar(row.conflicting_claim_ids ?? row.claim_ids, "missing");
      const status = wikiReportScalar(row.status ?? row.conflict_status, "unresolved");
      const decision = wikiReportScalar(
        row.required_human_decision ?? row.decision_required,
        "review",
      );
      return `- Conflict ${id}: claims ${claims}; status ${status}; required human decision: ${decision}.`;
    })
    .join("\n");
}

function renderOpenQuestionReport(
  rows: WikiReportRow[],
  unresolvedCoverage: WikiReportRow[],
): string {
  const lines: string[] = [];
  for (const row of rows) {
    lines.push(
      `- Question ${wikiReportScalar(row.id, "<unknown>")}: ${wikiReportScalar(row.summary ?? row.text ?? row.question, "unresolved")}.`,
    );
  }
  for (const row of unresolvedCoverage) {
    lines.push(
      `- Coverage ${wikiReportScalar(row.id, "<unknown>")}: unresolved span ${wikiReportScalar(row.span_id ?? row.source_path, "unknown")}.`,
    );
  }
  return lines.length > 0 ? lines.join("\n") : "No open questions are currently recorded.";
}

function renderEvaluatorReport(rows: WikiReportRow[]): string {
  if (rows.length === 0) {
    return [
      "Verdict: missing.",
      "",
      "Scenario coverage: no evaluator scenarios recorded.",
      "",
      "Failures: evaluator_quality_review is incomplete.",
      "",
      "Raw-deletion resilience assessment: missing.",
    ].join("\n");
  }
  return rows
    .map((row) => {
      const verdict = wikiReportScalar(row.verdict, "missing");
      const scenario = wikiReportScalar(row.scenario_id ?? row.id, "<unknown>");
      const summary = wikiReportScalar(row.summary, "scenario review");
      const failures = Array.isArray(row.failures)
        ? row.failures.map((failure) => wikiReportScalar(failure, "<unknown>")).join(", ")
        : wikiReportScalar(row.failures, "none");
      const rawDeletionResilience = wikiReportScalar(
        row.raw_deletion_resilience ?? row.raw_deletion_resilience_assessment,
        "not recorded",
      );
      return [
        `Verdict: ${verdict}.`,
        "",
        `Scenario coverage: ${scenario} - ${summary}.`,
        "",
        `Failures: ${failures}.`,
        "",
        `Raw-deletion resilience assessment: ${rawDeletionResilience}.`,
      ].join("\n");
    })
    .join("\n\n");
}

const COVERAGE_STATUSES = [
  "covered",
  "omitted",
  "redacted",
  "duplicate",
  "unresolved",
  "conflict",
  "out_of_scope",
] as const;

function rowSourceRefs(row: WikiReportRow): string[] {
  const refs: string[] = [];
  if (typeof row.source_ref === "string") refs.push(row.source_ref);
  if (typeof row.source === "string") refs.push(row.source);
  if (Array.isArray(row.source_refs)) {
    refs.push(...row.source_refs.filter((value): value is string => typeof value === "string"));
  }
  return refs;
}

function renderCoverageReport(rows: WikiReportRow[]): string {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const status = wikiReportScalar(row.coverage_status, "unresolved");
    counts.set(status, (counts.get(status) ?? 0) + 1);
  }
  const lines = [
    "Coverage status summary:",
    ...COVERAGE_STATUSES.map((status) => `- ${status}: ${counts.get(status) ?? 0}`),
  ];
  for (const row of rows) {
    const id = wikiReportScalar(row.id ?? row.span_id, "<unknown>");
    const status = wikiReportScalar(row.coverage_status, "unresolved");
    const summary = wikiReportScalar(row.summary ?? row.reason, "No summary recorded");
    const refs = rowSourceRefs(row);
    lines.push(
      `- coverage ${id}: ${status}; ${summary}; source_refs: ${refs.join(", ") || "no-source"}.`,
    );
  }
  return lines.join("\n");
}

function renderTopologyReport(plan: Record<string, unknown> | null): string {
  const sourceShape = isRecord(plan?.source_shape)
    ? wikiReportScalar(plan.source_shape.primary, "unresolved")
    : "unresolved";
  const families = Array.isArray(plan?.canonical_page_families)
    ? plan.canonical_page_families.filter(isRecord)
    : [];
  const familyIds = families.map((family) => wikiReportScalar(family.family_id, "<unknown>"));
  const granularity = families.map((family) =>
    wikiReportScalar(family.page_vs_heading_rule, "not recorded"),
  );
  return [
    `- source_shape: ${sourceShape}`,
    `- canonical_families: ${familyIds.join(", ") || "none"}`,
    `- page_vs_heading granularity: ${granularity.join("; ") || "not recorded"}`,
    "- source_refs: .agentplane/context/derived/wiki/topology.plan.json",
  ].join("\n");
}

async function buildMaximumAssimilationWikiReports(
  root: string,
  target: string,
): Promise<WikiReportBuildResult> {
  const collectedAllWikiFiles = await collectWikiFiles(root, "context/wiki");
  const allWikiFiles = collectedAllWikiFiles.filter(
    (file) => file.endsWith(".md") && path.basename(file) !== "AGENTS.md",
  );
  const collectedTargetWikiFiles = await collectWikiFiles(root, target);
  const targetWikiFiles = collectedTargetWikiFiles.filter(
    (file) => file.endsWith(".md") && path.basename(file) !== "AGENTS.md",
  );
  const nonReportWikiFiles = allWikiFiles.filter((file) => !file.includes("/reports/"));
  const { pathByTarget, pageInfoByPath } = await buildWikiTargetCatalog(root, allWikiFiles);
  const { linkRows } = await buildWikiLinkRows(root, targetWikiFiles, pathByTarget);
  const allLinks = await buildWikiLinkRows(root, nonReportWikiFiles, pathByTarget);
  const inboundByPath = buildInboundCounts(allLinks.linkRows, nonReportWikiFiles);
  const entitiesRel = ".agentplane/context/derived/graph/entities.jsonl";
  const edgesRel = ".agentplane/context/derived/graph/edges.jsonl";
  const entities = await loadJsonl(root, entitiesRel);
  const edges = await loadJsonl(root, edgesRel);
  const orphanRows = targetWikiFiles
    .filter((rel) => !isOrphanExempt(rel) && (inboundByPath.get(rel) ?? 0) === 0)
    .map((rel) => ({
      schema_version: 1,
      path: rel,
      title: pageInfoByPath.get(rel)?.title ?? rel,
      inbound_count: 0,
      status: "orphan",
      reason: "no inbound wiki or markdown links from non-report wiki pages",
      ...orphanSuggestion({ orphanPath: rel, pageInfoByPath, entities, edges }),
    }));

  const changed: string[] = [];
  const sourceDigest = await computeWikiReportSourceDigest(root);
  const outputs: [string, string][] = [
    [".agentplane/context/derived/wiki/link-index.jsonl", jsonl(linkRows)],
    [".agentplane/context/derived/wiki/orphan-report.jsonl", jsonl(orphanRows)],
    [
      WIKI_REPORT_STATE_PATH,
      `${JSON.stringify(
        {
          schema_version: 1,
          target,
          source_digest: sourceDigest,
          link_rows: linkRows.length,
          orphan_rows: orphanRows.length,
        },
        null,
        2,
      )}\n`,
    ],
  ];

  const conflictsRel = ".agentplane/context/derived/claims/contradictions.jsonl";
  const openQuestionsRel = ".agentplane/context/derived/claims/open_questions.jsonl";
  const coverageRel = ".agentplane/context/derived/reports/coverage.jsonl";
  const evaluatorRel = ".agentplane/context/derived/reports/evaluator.jsonl";
  const topologyRel = ".agentplane/context/derived/wiki/topology.plan.json";
  const conflicts = await loadJsonl(root, conflictsRel);
  const openQuestions = await loadJsonl(root, openQuestionsRel);
  const coverage = await loadJsonl(root, coverageRel);
  const evaluatorRows = await loadJsonl(root, evaluatorRel);
  const topologyPlan = await loadJsonRecord(root, topologyRel);
  const unresolvedCoverage = coverage.filter((row) => row.coverage_status === "unresolved");

  outputs.push(
    [
      "context/wiki/reports/topology.md",
      reportPage({
        canonicalId: "report.topology",
        title: "Topology",
        body: [renderTopologyReport(topologyPlan)],
        sourceRefs: topologyPlan ? [topologyRel] : [],
      }),
    ],
    [
      "context/wiki/reports/coverage.md",
      reportPage({
        canonicalId: "report.coverage",
        title: "Coverage",
        body: [renderCoverageReport(coverage)],
        sourceRefs: coverage.length > 0 ? [coverageRel] : [],
      }),
    ],
    [
      "context/wiki/reports/conflicts.md",
      reportPage({
        canonicalId: "report.conflicts",
        title: "Conflicts",
        body: [renderConflictReport(conflicts)],
        sourceRefs: conflicts.length > 0 ? [conflictsRel] : [],
      }),
    ],
    [
      "context/wiki/reports/open-questions.md",
      reportPage({
        canonicalId: "report.open_questions",
        title: "Open Questions",
        body: [renderOpenQuestionReport(openQuestions, unresolvedCoverage)],
        sourceRefs: [
          ...(openQuestions.length > 0 ? [openQuestionsRel] : []),
          ...(unresolvedCoverage.length > 0 ? [coverageRel] : []),
        ],
      }),
    ],
    [
      "context/wiki/reports/evaluator-review.md",
      reportPage({
        canonicalId: "report.evaluator_review",
        title: "Evaluator Review",
        body: [renderEvaluatorReport(evaluatorRows)],
        sourceRefs: evaluatorRows.length > 0 ? [evaluatorRel] : [],
      }),
    ],
  );

  for (const [rel, text] of outputs) {
    if (await writeTextIfChanged(root, rel, text)) changed.push(rel);
  }
  return { changed, linkRows, orphanRows };
}

export async function cmdContextWikiReport(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { path: string };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const target = await normalizeExistingWikiTarget(root, opts.parsed.path, "wiki report");
  const result = await buildMaximumAssimilationWikiReports(root, target);
  process.stdout.write(`context wiki report: updated ${result.changed.length} artifact(s)\n`);
  for (const rel of result.changed) process.stdout.write(`- ${rel}\n`);
  return 0;
}
