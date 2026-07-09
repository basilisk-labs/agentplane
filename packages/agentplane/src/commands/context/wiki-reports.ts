import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { fileExists, parseJsonlLines, readText, toPosix } from "./context-utils.js";
import { collectWikiFiles, extractFrontmatter, normalizeExistingWikiTarget } from "./wiki-lint.js";
import { computeWikiReportSourceDigest, WIKI_REPORT_STATE_PATH } from "../../context/integrity.js";

type JsonRow = Record<string, unknown>;

type WikiReportBuildResult = {
  changed: string[];
  linkRows: JsonRow[];
  orphanRows: JsonRow[];
};

type WikiLinkRow = JsonRow & {
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
  const exists = await fileExists(abs);
  const existing = exists ? await readFile(abs, "utf8") : "";
  if (exists && existing === text) return false;
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

async function buildWikiTargetCatalog(
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

async function buildWikiLinkRows(
  root: string,
  sourceFiles: string[],
  pathByTarget: WikiTargetCatalog,
): Promise<{
  linkRows: WikiLinkRow[];
}> {
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

function buildInboundCounts(linkRows: WikiLinkRow[], sourceFiles: string[]): Map<string, number> {
  const inboundByPath = new Map<string, number>();
  const allowedSources = new Set(sourceFiles);
  for (const row of linkRows) {
    if (!allowedSources.has(row.source_path) || !row.target_path) continue;
    inboundByPath.set(row.target_path, (inboundByPath.get(row.target_path) ?? 0) + 1);
  }
  return inboundByPath;
}

function entityPageMap(
  entities: JsonRow[],
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
    const id = scalar(entity.id, "");
    if (!id) continue;
    const explicitTarget = scalar(entity.target_path ?? entity.targetPath, "");
    const normalizedTarget = explicitTarget ? toPosix(path.normalize(explicitTarget)) : "";
    if (normalizedTarget && pageInfoByPath.has(normalizedTarget)) {
      mapped.set(id, normalizedTarget);
      continue;
    }
    const keys = [
      scalar(entity.label, ""),
      id,
      ...((Array.isArray(entity.aliases) ? entity.aliases : []) as unknown[]).map((alias) =>
        scalar(alias, ""),
      ),
    ];
    const page = keys.map((key) => pathByKey.get(lookupKey(key))).find(Boolean);
    if (page) mapped.set(id, page);
  }
  return mapped;
}

function orphanSuggestion(opts: {
  orphanPath: string;
  pageInfoByPath: Map<string, WikiPageInfo>;
  entities: JsonRow[];
  edges: JsonRow[];
}): JsonRow {
  const entityToPage = entityPageMap(opts.entities, opts.pageInfoByPath);
  const targetEntityIds = [...entityToPage.entries()]
    .filter(([, page]) => page === opts.orphanPath)
    .map(([entityId]) => entityId);
  for (const targetEntityId of targetEntityIds) {
    for (const edge of opts.edges) {
      const from = scalar(edge.from, "");
      const to = scalar(edge.to, "");
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
        suggested_edge_id: scalar(edge.id, ""),
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
