import path from "node:path";

import type {
  TaskData,
  TaskRunnerHistoryEntry,
  TaskRunnerTarget,
} from "../backends/task-backend.js";

import { createSupervisorExecutionReceiptLocator } from "./task-run-paths.js";
import {
  encodeTaskRunnerManagedText,
  renderAgentSemanticResult,
} from "./task-state-render-semantic.js";
import type { RunnerRunState, RunnerTarget } from "./types.js";

const RUNNER_OUTCOME_BEGIN = "<!-- BEGIN RUNNER OUTCOME -->";
const RUNNER_OUTCOME_END = "<!-- END RUNNER OUTCOME -->";
const MAX_TASK_RUNNER_HISTORY = 5;

export type RunnerOutcomeProjection = {
  state: RunnerRunState;
  result: RunnerRunState["result"] | null;
};

function formatRunnerTarget(target: RunnerTarget | TaskRunnerTarget): string {
  if (target.kind === "task") return `task ${target.task_id}`;
  const base = `recipe ${target.recipe_id}:${target.scenario_id}`;
  return target.task_id ? `${base} -> task ${target.task_id}` : base;
}

export function normalizeRunnerOutcomeSection(sectionText: string | null): string {
  const normalized = (sectionText ?? "").replaceAll("\r\n", "\n").trimEnd();
  if (!normalized) return [RUNNER_OUTCOME_BEGIN, RUNNER_OUTCOME_END].join("\n");

  const hasBegin = normalized.includes(RUNNER_OUTCOME_BEGIN);
  const hasEnd = normalized.includes(RUNNER_OUTCOME_END);
  if (hasBegin && hasEnd) return normalized;

  return [normalized, "", RUNNER_OUTCOME_BEGIN, RUNNER_OUTCOME_END].join("\n");
}

export function replaceRunnerOutcomeSection(sectionText: string | null, entryText: string): string {
  const normalized = normalizeRunnerOutcomeSection(sectionText);
  const beginIdx = normalized.indexOf(RUNNER_OUTCOME_BEGIN);
  const endIdx = normalized.indexOf(RUNNER_OUTCOME_END);
  if (beginIdx === -1 || endIdx === -1 || endIdx <= beginIdx) {
    throw new Error("Runner outcome markers are malformed");
  }

  const beforeBegin = normalized.slice(0, beginIdx).trimEnd();
  const afterEnd = normalized.slice(endIdx + RUNNER_OUTCOME_END.length).trimStart();
  const parts: string[] = [];
  if (beforeBegin) parts.push(beforeBegin, "");
  parts.push(RUNNER_OUTCOME_BEGIN);
  if (entryText.trim()) parts.push("", entryText.trimEnd());
  parts.push("", RUNNER_OUTCOME_END);
  if (afterEnd) parts.push("", afterEnd);
  return parts.join("\n").trimEnd();
}

function runArtifactsLocatorForTask(taskId: string, runId: string): string {
  return `ap task run inspect ${taskId} --run-id ${runId}`;
}

function isMachineDependentAbsolutePath(value: string): boolean {
  return path.isAbsolute(value) || path.win32.isAbsolute(value);
}

function isLegacyRunnerArtifactPath(value: string): boolean {
  const normalized = value.replaceAll("\\", "/");
  return (
    /(?:^|\/)\.agentplane\/tasks\/[^/]+\/runs\/[^/]+\//u.test(normalized) ||
    /(?:^|\/)(?:\.git\/)?agentplane\/runner\/tasks\/[^/]+\/runs\/[^/]+\//u.test(normalized)
  );
}

function isDurableRunnerReference(value: string): boolean {
  return (
    value.trim().length > 0 &&
    !isMachineDependentAbsolutePath(value) &&
    !isLegacyRunnerArtifactPath(value)
  );
}

function durableRunnerReferences(values: readonly string[] | null | undefined): string[] {
  if (!values?.length) return [];
  return [
    ...new Set(
      values.map((value) => value.trim()).filter((value) => isDurableRunnerReference(value)),
    ),
  ];
}

function durableExecutionReceipt(
  receipt: TaskRunnerHistoryEntry["execution_receipt"] | null | undefined,
  taskId: string,
  runId: string,
): TaskRunnerHistoryEntry["execution_receipt"] | undefined {
  if (!receipt) return undefined;
  return {
    ...receipt,
    path: createSupervisorExecutionReceiptLocator({
      task_id: taskId,
      run_id: runId,
    }),
  };
}

function formatRunnerAdapterLabel(adapterId: string): string {
  const normalized = adapterId.trim();
  if (!normalized) return "Runner";
  return normalized.slice(0, 1).toUpperCase() + normalized.slice(1);
}

function renderTaskRunnerSummary(opts: {
  adapter_id: string;
  status: TaskRunnerHistoryEntry["status"];
  evidence?: TaskRunnerHistoryEntry["evidence"] | null;
  runner_summary?: string | null;
}): string {
  const adapter = formatRunnerAdapterLabel(opts.adapter_id);
  if (opts.status === "prepared") return `${adapter} runner is prepared.`;
  if (opts.status === "running") return `${adapter} runner is running.`;
  if (opts.status === "success") return `${adapter} runner completed successfully.`;
  if (
    (opts.evidence?.conflict_paths?.length ?? 0) > 0 &&
    opts.evidence?.blocked_reason &&
    opts.evidence?.recommended_parent_action
  ) {
    return opts.runner_summary?.trim() ?? `${adapter} runner reported a blocked result.`;
  }
  if (opts.status === "blocked") return `${adapter} runner is blocked by an external condition.`;
  if (opts.status === "cancelled") return `${adapter} runner was cancelled.`;
  return `${adapter} runner failed; inspect run artifacts for details.`;
}

export function stripRunnerHistory(
  outcome: NonNullable<TaskData["runner"]> | TaskRunnerHistoryEntry,
  taskId = outcome.target.task_id,
): TaskRunnerHistoryEntry {
  const outputPaths = durableRunnerReferences(outcome.output_paths);
  const evidencePaths = durableRunnerReferences(outcome.evidence?.evidence_paths);
  const { evidence_paths: _legacyEvidencePaths, ...evidenceWithoutPaths } = outcome.evidence ?? {};
  const evidence = outcome.evidence
    ? {
        ...evidenceWithoutPaths,
        ...(evidencePaths.length > 0 ? { evidence_paths: evidencePaths } : {}),
      }
    : undefined;
  const executionReceipt = taskId
    ? durableExecutionReceipt(outcome.execution_receipt, taskId, outcome.run_id)
    : outcome.execution_receipt?.path.startsWith("agentplane-run://")
      ? { ...outcome.execution_receipt }
      : undefined;
  return {
    run_id: outcome.run_id,
    status: outcome.status,
    adapter_id: outcome.adapter_id,
    mode: outcome.mode,
    ...(outcome.created_at ? { created_at: outcome.created_at } : {}),
    updated_at: outcome.updated_at,
    ...(outcome.started_at ? { started_at: outcome.started_at } : {}),
    ...(outcome.ended_at ? { ended_at: outcome.ended_at } : {}),
    exit_code: outcome.exit_code,
    target: { ...outcome.target },
    ...(outcome.summary ? { summary: outcome.summary } : {}),
    ...(outputPaths.length > 0 ? { output_paths: outputPaths } : {}),
    ...(outcome.metrics ? { metrics: { ...outcome.metrics } } : {}),
    ...(evidence ? { evidence } : {}),
    ...(executionReceipt ? { execution_receipt: executionReceipt } : {}),
  };
}

function runnerHistoryFromTask(
  outcome: NonNullable<TaskData["runner"]> | null | undefined,
  taskId?: string,
): TaskRunnerHistoryEntry[] {
  if (!outcome) return [];
  if (outcome.history?.length) {
    return outcome.history.map((entry) => stripRunnerHistory(entry, taskId));
  }
  return [stripRunnerHistory(outcome, taskId)];
}

function renderRunnerMetrics(
  metrics:
    | {
        duration_ms?: number;
        stdout_bytes?: number;
        stderr_bytes?: number;
        output_last_message_bytes?: number | null;
      }
    | null
    | undefined,
): string | null {
  if (!metrics) return null;
  const pairs: string[] = [];
  if (typeof metrics.duration_ms === "number") pairs.push(`duration_ms=${metrics.duration_ms}`);
  if (typeof metrics.stdout_bytes === "number") pairs.push(`stdout_bytes=${metrics.stdout_bytes}`);
  if (typeof metrics.stderr_bytes === "number") pairs.push(`stderr_bytes=${metrics.stderr_bytes}`);
  if (
    metrics.output_last_message_bytes === null ||
    typeof metrics.output_last_message_bytes === "number"
  ) {
    pairs.push(`output_last_message_bytes=${metrics.output_last_message_bytes ?? "null"}`);
  }
  return pairs.length > 0 ? pairs.join(", ") : null;
}

function renderVerificationHint(
  status: RunnerRunState["status"],
  evidence?: TaskRunnerHistoryEntry["evidence"] | null,
): string {
  if (status === "success") {
    return "runner completed successfully; human verification and closure remain explicit lifecycle steps.";
  }
  if (
    (evidence?.conflict_paths?.length ?? 0) > 0 &&
    evidence?.blocked_reason &&
    evidence?.recommended_parent_action
  ) {
    return "runner is blocked on a reported conflict; follow ParentAction before retrying.";
  }
  if (status === "failed") {
    return "runner failed; inspect artifacts before retrying or recording verification evidence.";
  }
  if (status === "blocked") {
    return "runner is blocked by an external condition; inspect artifacts before retrying or escalating.";
  }
  if (status === "cancelled") {
    return "runner was cancelled; verification evidence is incomplete until a later run succeeds.";
  }
  if (status === "running") {
    return "runner is still executing; verification evidence is not complete yet.";
  }
  return "runner is prepared but has not produced verification-relevant output yet.";
}

function renderRunnerEvidence(
  evidence: TaskRunnerHistoryEntry["evidence"] | null | undefined,
): string[] {
  if (!evidence) return [];
  const lines: string[] = [];
  const evidencePaths = durableRunnerReferences(evidence.evidence_paths);
  if (evidencePaths.length > 0) {
    lines.push(`EvidencePaths: ${evidencePaths.join(", ")}`);
  }
  if (evidence.changed_paths?.length) {
    lines.push(`ChangedPaths: ${evidence.changed_paths.join(", ")}`);
  }
  if (typeof evidence.files_changed_count === "number") {
    lines.push(`FilesChangedCount: ${evidence.files_changed_count}`);
  }
  if (evidence.tests_run?.length) {
    lines.push(`TestsRun: ${evidence.tests_run.join(" | ")}`);
  }
  if (evidence.verification_candidates?.length) {
    lines.push(`VerificationCandidates: ${evidence.verification_candidates.join(" | ")}`);
  }
  if (evidence.conflict_paths?.length) {
    lines.push(`ConflictPaths: ${evidence.conflict_paths.join(", ")}`);
  }
  if (evidence.blocked_reason) {
    lines.push(`BlockedReason: ${evidence.blocked_reason}`);
  }
  if (evidence.recommended_parent_action) {
    lines.push(`ParentAction: ${evidence.recommended_parent_action}`);
  }
  return lines;
}

function renderRunnerOutcomeEntry(opts: {
  task_id: string;
  entry: TaskRunnerHistoryEntry;
  projection?: RunnerOutcomeProjection;
}): string {
  const summary =
    opts.entry.summary ??
    renderTaskRunnerSummary({
      adapter_id: opts.entry.adapter_id,
      status: opts.entry.status,
    });
  const capabilitiesUsed = opts.projection?.result?.capabilities_used;
  const entryOutputPaths = opts.entry.output_paths;
  const entryMetrics = opts.entry.metrics;
  const entryEvidence = opts.entry.evidence;
  const executionReceipt = durableExecutionReceipt(
    opts.entry.execution_receipt,
    opts.task_id,
    opts.entry.run_id,
  );
  const lines = [
    `#### ${opts.entry.updated_at} — RUNNER — ${opts.entry.status}`,
    "",
    `RunId: ${opts.entry.run_id}`,
    "",
    `Adapter: ${opts.entry.adapter_id}`,
    "",
    `Mode: ${opts.entry.mode}`,
    "",
    `Target: ${formatRunnerTarget(opts.entry.target)}`,
    "",
    ...(opts.entry.created_at ? [`CreatedAt: ${opts.entry.created_at}`, ""] : []),
    `UpdatedAt: ${opts.entry.updated_at}`,
    "",
    `RunArtifacts: ${runArtifactsLocatorForTask(opts.task_id, opts.entry.run_id)}`,
    "",
    `ExitCode: ${opts.entry.exit_code ?? "null"}`,
  ];
  if (opts.entry.started_at) {
    lines.push("", `StartedAt: ${opts.entry.started_at}`);
  }
  if (opts.entry.ended_at) {
    lines.push("", `EndedAt: ${opts.entry.ended_at}`);
  }
  if (summary) {
    lines.push("", `Summary: ${encodeTaskRunnerManagedText(summary)}`);
  }
  const projectedArtifacts =
    opts.projection?.result?.artifacts?.filter((artifact) =>
      isDurableRunnerReference(artifact.path),
    ) ?? [];
  if (projectedArtifacts.length > 0) {
    lines.push(
      "",
      `Artifacts: ${projectedArtifacts
        .map((artifact) => (artifact.label ? `${artifact.label}=${artifact.path}` : artifact.path))
        .join(", ")}`,
    );
  }
  const durableOutputPaths = durableRunnerReferences(entryOutputPaths);
  if (projectedArtifacts.length === 0 && durableOutputPaths.length > 0) {
    lines.push("", `Outputs: ${durableOutputPaths.join(", ")}`);
  }
  if (capabilitiesUsed?.length) {
    lines.push("", `Capabilities: ${capabilitiesUsed.join(", ")}`);
  }
  const metrics = renderRunnerMetrics(entryMetrics);
  if (metrics) {
    lines.push("", `Metrics: ${metrics}`);
  }
  const evidenceLines = renderRunnerEvidence(entryEvidence);
  if (evidenceLines.length > 0) {
    lines.push("", ...evidenceLines);
  }
  if (executionReceipt) {
    lines.push(
      "",
      `ExecutionReceipt: ${executionReceipt.path}`,
      `ExecutionReceiptSha256: ${executionReceipt.sha256}`,
      `ExecutionReceiptVerification: ${executionReceipt.verification_state}`,
    );
  }
  lines.push("", `VerificationHint: ${renderVerificationHint(opts.entry.status, entryEvidence)}`);
  return `${lines.join("\n").trimEnd()}\n`;
}

function projectTaskRunnerEvidence(
  result: RunnerRunState["result"] | null | undefined,
): TaskRunnerHistoryEntry["evidence"] | undefined {
  const source = result?.evidence;
  if (!source && !result?.execution_receipt) return undefined;
  const evidencePaths = durableRunnerReferences(source?.evidence_paths);
  return {
    ...(result?.execution_receipt ? { provenance: "supervisor_observed" as const } : {}),
    ...(evidencePaths.length > 0 ? { evidence_paths: evidencePaths } : {}),
    ...(source?.changed_paths?.length ? { changed_paths: [...source.changed_paths] } : {}),
    ...(source?.conflict_paths?.length ? { conflict_paths: [...source.conflict_paths] } : {}),
    ...(typeof source?.files_changed_count === "number"
      ? { files_changed_count: source.files_changed_count }
      : {}),
    ...(source?.tests_run?.length ? { tests_run: [...source.tests_run] } : {}),
    ...(source?.verification_candidates?.length
      ? { verification_candidates: [...source.verification_candidates] }
      : {}),
    ...(source?.blocked_reason ? { blocked_reason: source.blocked_reason } : {}),
    ...(source?.recommended_parent_action
      ? { recommended_parent_action: source.recommended_parent_action }
      : {}),
  };
}

function buildTaskRunnerHistoryEntry(
  projection: RunnerOutcomeProjection,
  taskId: string,
): TaskRunnerHistoryEntry {
  const { state, result } = projection;
  const evidence = projectTaskRunnerEvidence(result);
  const outcome: TaskRunnerHistoryEntry = {
    run_id: state.run_id,
    status: state.status,
    adapter_id: state.adapter_id,
    mode: state.mode,
    created_at: state.created_at,
    updated_at: state.updated_at,
    exit_code: state.result?.exit_code ?? null,
    target: { ...state.target },
  };
  if (result?.started_at) outcome.started_at = result.started_at;
  if (result?.ended_at) outcome.ended_at = result.ended_at;
  const machineSummary = renderTaskRunnerSummary({
    adapter_id: state.adapter_id,
    status: state.status,
    evidence,
    runner_summary: result?.summary,
  });
  const semanticLines = renderAgentSemanticResult(result);
  outcome.summary =
    semanticLines.length > 0 ? [machineSummary, ...semanticLines].join(" | ") : machineSummary;
  const outputPaths = durableRunnerReferences(result?.output_paths);
  if (outputPaths.length > 0) outcome.output_paths = outputPaths;
  if (result?.metrics) outcome.metrics = { ...result.metrics };
  if (evidence) outcome.evidence = evidence;
  if (result?.execution_receipt) {
    outcome.execution_receipt = durableExecutionReceipt(
      result.execution_receipt,
      taskId,
      state.run_id,
    );
  }
  return outcome;
}

function mergeTaskRunnerHistory(opts: {
  task_id: string;
  latest: TaskRunnerHistoryEntry;
  additional?: readonly TaskRunnerHistoryEntry[];
  previous?: NonNullable<TaskData["runner"]> | null;
}): TaskRunnerHistoryEntry[] {
  const merged: TaskRunnerHistoryEntry[] = [];
  const seen = new Set<string>();
  for (const entry of [
    opts.latest,
    ...(opts.additional ?? []),
    ...runnerHistoryFromTask(opts.previous, opts.task_id),
  ]) {
    if (seen.has(entry.run_id)) continue;
    seen.add(entry.run_id);
    merged.push(stripRunnerHistory(entry));
    if (merged.length >= MAX_TASK_RUNNER_HISTORY) break;
  }
  return merged;
}

function shouldKeepPreviousRunnerLatest(
  projected: TaskRunnerHistoryEntry,
  previous: TaskRunnerHistoryEntry | null,
  hasCurrentActiveClaimAuthority: boolean,
): boolean {
  if (!previous) return false;
  if (projected.run_id === previous.run_id) {
    const lifecycleRank = (status: TaskRunnerHistoryEntry["status"]): number => {
      if (status === "prepared") return 0;
      if (status === "running") return 1;
      return 2;
    };
    const projectedRank = lifecycleRank(projected.status);
    const previousRank = lifecycleRank(previous.status);
    if (projectedRank !== previousRank) return projectedRank < previousRank;
    if (projected.status !== previous.status) return true;
    const projectedUpdated = Date.parse(projected.updated_at);
    const previousUpdated = Date.parse(previous.updated_at);
    if (!Number.isFinite(projectedUpdated)) return true;
    if (!Number.isFinite(previousUpdated)) return false;
    return projectedUpdated < previousUpdated;
  }
  if (hasCurrentActiveClaimAuthority) return false;
  // Cross-run projections without the current active claim are historical
  // reconciliation only. Wall-clock timestamps cannot prove causal order.
  return true;
}

export function buildTaskRunnerOutcome(opts: {
  task_id: string;
  projection: RunnerOutcomeProjection;
  previous?: NonNullable<TaskData["runner"]> | null;
  ordering_authority?: "current_active_claim";
}): NonNullable<TaskData["runner"]> {
  const projected = buildTaskRunnerHistoryEntry(opts.projection, opts.task_id);
  const previous = opts.previous ? stripRunnerHistory(opts.previous, opts.task_id) : null;
  const keepPreviousLatest = shouldKeepPreviousRunnerLatest(
    projected,
    previous,
    opts.ordering_authority === "current_active_claim",
  );
  const latest = keepPreviousLatest && previous ? previous : projected;
  const history = mergeTaskRunnerHistory({
    task_id: opts.task_id,
    latest,
    ...(keepPreviousLatest ? { additional: [projected] } : {}),
    previous: opts.previous,
  });
  return history.length > 1 ? { ...latest, history } : latest;
}

export function renderRunnerOutcomeHistory(opts: {
  task_id: string;
  outcome: NonNullable<TaskData["runner"]>;
  projection: RunnerOutcomeProjection;
}): string {
  const history = opts.outcome.history?.length
    ? opts.outcome.history
    : [stripRunnerHistory(opts.outcome, opts.task_id)];
  const [latest, ...previous] = history;
  return [
    renderRunnerOutcomeEntry({
      task_id: opts.task_id,
      entry: latest,
      ...(latest?.run_id === opts.projection.state.run_id ? { projection: opts.projection } : {}),
    }),
    ...previous.map((entry) => renderRunnerOutcomeEntry({ task_id: opts.task_id, entry })),
  ]
    .join("\n")
    .trimEnd();
}
