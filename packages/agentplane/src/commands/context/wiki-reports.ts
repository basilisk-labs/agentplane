import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { computeWikiReportSourceDigest, WIKI_REPORT_STATE_PATH } from "../../context/integrity.js";
import { fileExists, parseJsonlLines, readText } from "./context-utils.js";
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

function sourceRefsBlock(sourceRefs: string[]): string[] {
  if (sourceRefs.length === 0) return ["  source_refs: []"];
  return [
    "  source_refs:",
    ...sourceRefs.map((ref) => `    - path: "${ref.replaceAll('"', '\\"')}"`),
  ];
}

function reportPage(opts: {
  canonicalId: string;
  title: string;
  body: string[];
  sourceRefs: string[];
}): string {
  return [
    "---",
    "aliases:",
    `  - "${opts.title}"`,
    "tags:",
    "  - agentplane/context",
    "  - agentplane/context-report",
    "cssclasses:",
    "  - agentplane-context",
    "agentplane_context:",
    "  schema_version: 1",
    "  artifact_type: wiki_page",
    `  canonical_id: "${opts.canonicalId}"`,
    `  title: "${opts.title}"`,
    "  modality: observation",
    "  epistemic_status: generated_report",
    ...sourceRefsBlock(opts.sourceRefs),
    "---",
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
  const conflicts = await loadJsonl(root, conflictsRel);
  const openQuestions = await loadJsonl(root, openQuestionsRel);
  const coverage = await loadJsonl(root, coverageRel);
  const evaluatorRows = await loadJsonl(root, evaluatorRel);
  const unresolvedCoverage = coverage.filter((row) => row.coverage_status === "unresolved");

  outputs.push(
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
