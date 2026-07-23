import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { isRecord } from "../shared/guards.js";
import { fileExists, parseJsonlLines, readText } from "./context-utils.js";
import {
  isMaximumAssimilationTask,
  readContextExtensions,
  type VerificationInput,
} from "./verify-task-policy.js";

const EVALUATOR_REPORT_REL = ".agentplane/context/derived/reports/evaluator.jsonl";

type QualityReportInput = {
  task_id: string;
  evaluator_id: string;
  generated_at: string;
  provenance: "human_supplied" | "evaluator_supplied";
  verdict: string;
  summary: string;
  findings: string[];
  evidence_refs: string[];
};

function scenarioId(taskId: string): string {
  return `scenario.evaluator.${taskId.toLowerCase().replaceAll(/[^a-z0-9._-]+/gu, "-")}`;
}

function isCuratedEntrypoint(value: string): boolean {
  return value.startsWith("context/wiki/") || value.startsWith(".agentplane/context/derived/");
}

async function defaultEntrypoints(root: string): Promise<string[]> {
  const candidates = [
    "context/wiki/index.md",
    "context/wiki/glossary.md",
    ".agentplane/context/derived/graph/entities.jsonl",
  ];
  const existing: string[] = [];
  for (const candidate of candidates) {
    if (await fileExists(path.join(root, candidate))) existing.push(candidate);
  }
  return existing.length > 0 ? existing : [".agentplane/context/derived/graph/entities.jsonl"];
}

export async function projectEvaluatorQualityReportToContext(opts: {
  root: string;
  task: VerificationInput;
  report: QualityReportInput;
  reportPath: string;
}): Promise<string | null> {
  const context = readContextExtensions(opts.task);
  if (opts.task.task_kind !== "context" || !isMaximumAssimilationTask(opts.task, context)) {
    return null;
  }

  const rel = EVALUATOR_REPORT_REL;
  const abs = path.join(opts.root, rel);
  const existingRows = (await fileExists(abs))
    ? (parseJsonlLines(await readText(abs)) as Record<string, unknown>[])
    : [];
  const id = scenarioId(opts.report.task_id);
  const evidenceRefs = [...new Set([opts.reportPath, ...opts.report.evidence_refs])];
  const explicitEntrypoints = evidenceRefs.filter((value) => isCuratedEntrypoint(value));
  const hasRawDeletionEvidence = evidenceRefs.some((ref) =>
    /raw[-_ ]?deletion|no[-_ ]?raw/iu.test(ref),
  );
  const entrypoints =
    explicitEntrypoints.length > 0 ? explicitEntrypoints : await defaultEntrypoints(opts.root);
  const row = {
    schema_version: 1,
    scenario_id: id,
    task_id: opts.report.task_id,
    evaluator_id: opts.report.evaluator_id,
    generated_at: opts.report.generated_at,
    provenance: opts.report.provenance,
    summary: opts.report.summary,
    entrypoints,
    expected_findings: opts.report.findings,
    verdict: opts.report.verdict,
    failures: ["pass", "no_change"].includes(opts.report.verdict) ? [] : opts.report.findings,
    evidence_refs: evidenceRefs,
    raw_deletion_resilience: hasRawDeletionEvidence
      ? opts.report.verdict === "pass"
        ? "pass"
        : "fail"
      : "not_recorded",
  };
  const rows = [
    ...existingRows.filter(
      (existing) =>
        (!isRecord(existing) || existing.scenario_id !== id) &&
        existing.task_id !== opts.report.task_id,
    ),
    row,
  ];
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, rows.map((value) => JSON.stringify(value)).join("\n") + "\n", "utf8");
  return rel;
}
