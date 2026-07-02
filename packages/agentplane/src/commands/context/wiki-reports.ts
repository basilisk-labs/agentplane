import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { fileExists, parseJsonlLines, readText, toPosix } from "./context-utils.js";
import { collectWikiFiles, extractFrontmatter, normalizeExistingWikiTarget } from "./wiki-lint.js";

type JsonRow = Record<string, unknown>;

type WikiReportBuildResult = {
  changed: string[];
  linkRows: JsonRow[];
  orphanRows: JsonRow[];
};

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

function titleFromMarkdown(rel: string, text: string): string {
  const frontmatter = extractFrontmatter(text);
  const title = frontmatter
    ? /(?:^|\n)\s*title:\s*"?([^"\n]+)"?/u.exec(frontmatter)?.[1]?.trim()
    : "";
  if (title) return title;
  return /^#\s+(.+)$/mu.exec(text)?.[1]?.trim() ?? path.basename(rel, ".md");
}

function sourceRefsBlock(sourceRefs: string[]): string[] {
  if (sourceRefs.length === 0) return ["  source_refs: []"];
  return [
    "  source_refs:",
    ...sourceRefs.map((ref) => `    - path: "${ref.replaceAll('"', '\\"')}"`),
  ];
}

function scalar(value: unknown, fallback: string): string {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
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

async function loadJsonl(root: string, rel: string): Promise<JsonRow[]> {
  const abs = path.join(root, rel);
  if (!(await fileExists(abs))) return [];
  return parseJsonlLines(await readText(abs)) as JsonRow[];
}

async function writeTextIfChanged(root: string, rel: string, text: string): Promise<boolean> {
  const abs = path.join(root, rel);
  const existing = (await fileExists(abs)) ? await readFile(abs, "utf8") : "";
  if (existing === text) return false;
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, text, "utf8");
  return true;
}

function jsonl(rows: JsonRow[]): string {
  return rows.map((row) => JSON.stringify(row)).join("\n") + (rows.length > 0 ? "\n" : "");
}

function isOrphanExempt(rel: string): boolean {
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

async function buildWikiTargetCatalog(
  root: string,
  wikiFiles: string[],
): Promise<Map<string, string>> {
  const pathByTarget = new Map<string, string>();
  for (const rel of wikiFiles) {
    const target = rel.replace(/^context\/wiki\//u, "").replace(/\.md$/u, "");
    pathByTarget.set(target.toLowerCase(), rel);
    pathByTarget.set(path.basename(target).toLowerCase(), rel);
    const text = await readFile(path.join(root, rel), "utf8");
    const title = titleFromMarkdown(rel, text);
    pathByTarget.set(title.toLowerCase(), rel);
  }
  return pathByTarget;
}

async function buildWikiLinkRows(
  root: string,
  sourceFiles: string[],
  pathByTarget: Map<string, string>,
): Promise<{
  linkRows: JsonRow[];
}> {
  const linkRows: JsonRow[] = [];
  for (const sourcePath of sourceFiles) {
    const text = await readFile(path.join(root, sourcePath), "utf8");
    for (const rawTarget of extractWikilinks(text)) {
      const normalized = normalizeTarget(rawTarget);
      if (!normalized || normalized.startsWith("#")) continue;
      const targetPath = pathByTarget.get(normalized.toLowerCase()) ?? null;
      linkRows.push({
        schema_version: 1,
        source_path: sourcePath,
        raw_target: rawTarget,
        normalized_target: normalized,
        target_path: targetPath,
        status: targetPath ? "resolved" : "unresolved",
      });
    }
  }
  return { linkRows };
}

async function buildInboundCounts(
  root: string,
  sourceFiles: string[],
  pathByTarget: Map<string, string>,
): Promise<Map<string, number>> {
  const inboundByPath = new Map<string, number>();
  for (const sourcePath of sourceFiles) {
    const text = await readFile(path.join(root, sourcePath), "utf8");
    for (const rawTarget of extractWikilinks(text)) {
      const normalized = normalizeTarget(rawTarget);
      if (!normalized || normalized.startsWith("#")) continue;
      const targetPath = pathByTarget.get(normalized.toLowerCase());
      if (targetPath) inboundByPath.set(targetPath, (inboundByPath.get(targetPath) ?? 0) + 1);
    }
  }
  return inboundByPath;
}

function renderConflictReport(rows: JsonRow[]): string {
  if (rows.length === 0) return "No conflict rows are currently recorded.";
  return rows
    .map((row) => {
      const id = scalar(row.id ?? row.conflict_id, "<unknown>");
      const claims = Array.isArray(row.conflicting_claim_ids)
        ? row.conflicting_claim_ids.join(", ")
        : scalar(row.conflicting_claim_ids ?? row.claim_ids, "missing");
      const status = scalar(row.status ?? row.conflict_status, "unresolved");
      const decision = scalar(row.required_human_decision ?? row.decision_required, "review");
      return `- Conflict ${id}: claims ${claims}; status ${status}; required human decision: ${decision}.`;
    })
    .join("\n");
}

function renderOpenQuestionReport(rows: JsonRow[], unresolvedCoverage: JsonRow[]): string {
  const lines: string[] = [];
  for (const row of rows) {
    lines.push(
      `- Question ${scalar(row.id, "<unknown>")}: ${scalar(row.summary ?? row.text ?? row.question, "unresolved")}.`,
    );
  }
  for (const row of unresolvedCoverage) {
    lines.push(
      `- Coverage ${scalar(row.id, "<unknown>")}: unresolved span ${scalar(row.span_id ?? row.source_path, "unknown")}.`,
    );
  }
  return lines.length > 0 ? lines.join("\n") : "No open questions are currently recorded.";
}

function renderEvaluatorReport(rows: JsonRow[]): string {
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
      const verdict = scalar(row.verdict, "missing");
      const scenario = scalar(row.scenario_id ?? row.id, "<unknown>");
      const summary = scalar(row.summary, "scenario review");
      const failures = Array.isArray(row.failures)
        ? row.failures.map((failure) => scalar(failure, "<unknown>")).join(", ")
        : scalar(row.failures, "none");
      const rawDeletionResilience = scalar(
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
  const pathByTarget = await buildWikiTargetCatalog(root, allWikiFiles);
  const { linkRows } = await buildWikiLinkRows(root, targetWikiFiles, pathByTarget);
  const inboundByPath = await buildInboundCounts(root, nonReportWikiFiles, pathByTarget);
  const orphanRows = targetWikiFiles
    .filter((rel) => !isOrphanExempt(rel) && (inboundByPath.get(rel) ?? 0) === 0)
    .map((rel) => ({
      schema_version: 1,
      path: rel,
      title: rel,
      inbound_count: 0,
      status: "orphan",
      reason: "no inbound wikilinks from non-report wiki pages",
    }));

  const changed: string[] = [];
  const outputs: [string, string][] = [
    [".agentplane/context/derived/wiki/link-index.jsonl", jsonl(linkRows)],
    [".agentplane/context/derived/wiki/orphan-report.jsonl", jsonl(orphanRows)],
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
