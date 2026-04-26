import type {
  TaskData,
  TaskRunnerHistoryEntry,
  TaskRunnerTarget,
} from "../backends/task-backend.js";

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

function runArtifactsDirForTask(taskId: string, runId: string): string {
  return `.agentplane/tasks/${taskId}/runs/${runId}`;
}

function formatRunnerAdapterLabel(adapterId: string): string {
  const normalized = adapterId.trim();
  if (!normalized) return "Runner";
  return normalized.slice(0, 1).toUpperCase() + normalized.slice(1);
}

function renderTaskRunnerSummary(opts: {
  adapter_id: string;
  status: TaskRunnerHistoryEntry["status"];
}): string {
  const adapter = formatRunnerAdapterLabel(opts.adapter_id);
  if (opts.status === "prepared") return `${adapter} runner is prepared.`;
  if (opts.status === "running") return `${adapter} runner is running.`;
  if (opts.status === "success") return `${adapter} runner completed successfully.`;
  if (opts.status === "cancelled") return `${adapter} runner was cancelled.`;
  return `${adapter} runner failed; inspect run artifacts for details.`;
}

export function stripRunnerHistory(
  outcome: NonNullable<TaskData["runner"]> | TaskRunnerHistoryEntry,
): TaskRunnerHistoryEntry {
  return {
    run_id: outcome.run_id,
    status: outcome.status,
    adapter_id: outcome.adapter_id,
    mode: outcome.mode,
    updated_at: outcome.updated_at,
    ...(outcome.started_at ? { started_at: outcome.started_at } : {}),
    ...(outcome.ended_at ? { ended_at: outcome.ended_at } : {}),
    exit_code: outcome.exit_code,
    target: { ...outcome.target },
    ...(outcome.summary ? { summary: outcome.summary } : {}),
    ...(outcome.output_paths?.length ? { output_paths: [...outcome.output_paths] } : {}),
    ...(outcome.metrics ? { metrics: { ...outcome.metrics } } : {}),
    ...(outcome.evidence ? { evidence: { ...outcome.evidence } } : {}),
  };
}

function runnerHistoryFromTask(
  outcome: NonNullable<TaskData["runner"]> | null | undefined,
): TaskRunnerHistoryEntry[] {
  if (!outcome) return [];
  if (outcome.history?.length) return outcome.history.map((entry) => stripRunnerHistory(entry));
  return [stripRunnerHistory(outcome)];
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

function renderVerificationHint(status: RunnerRunState["status"]): string {
  if (status === "success") {
    return "runner completed successfully; human verification and closure remain explicit lifecycle steps.";
  }
  if (status === "failed") {
    return "runner failed; inspect artifacts before retrying or recording verification evidence.";
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
  if (evidence.evidence_paths?.length) {
    lines.push(`EvidencePaths: ${evidence.evidence_paths.join(", ")}`);
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
    `UpdatedAt: ${opts.entry.updated_at}`,
    "",
    `RunArtifacts: ${runArtifactsDirForTask(opts.task_id, opts.entry.run_id)}`,
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
    lines.push("", `Summary: ${summary}`);
  }
  if (opts.projection?.result?.artifacts?.length) {
    lines.push(
      "",
      `Artifacts: ${opts.projection.result.artifacts
        .map((artifact) => (artifact.label ? `${artifact.label}=${artifact.path}` : artifact.path))
        .join(", ")}`,
    );
  }
  if (!opts.projection?.result?.artifacts?.length && entryOutputPaths?.length) {
    lines.push("", `Outputs: ${entryOutputPaths.join(", ")}`);
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
  lines.push("", `VerificationHint: ${renderVerificationHint(opts.entry.status)}`);
  return `${lines.join("\n").trimEnd()}\n`;
}

function buildTaskRunnerHistoryEntry(projection: RunnerOutcomeProjection): TaskRunnerHistoryEntry {
  const { state, result } = projection;
  const outcome: TaskRunnerHistoryEntry = {
    run_id: state.run_id,
    status: state.status,
    adapter_id: state.adapter_id,
    mode: state.mode,
    updated_at: state.updated_at,
    exit_code: state.result?.exit_code ?? null,
    target: { ...state.target },
  };
  if (result?.started_at) outcome.started_at = result.started_at;
  if (result?.ended_at) outcome.ended_at = result.ended_at;
  outcome.summary = renderTaskRunnerSummary({
    adapter_id: state.adapter_id,
    status: state.status,
  });
  if (result?.output_paths?.length) outcome.output_paths = [...result.output_paths];
  if (result?.metrics) outcome.metrics = { ...result.metrics };
  if (result?.evidence) outcome.evidence = { ...result.evidence };
  return outcome;
}

function mergeTaskRunnerHistory(opts: {
  latest: TaskRunnerHistoryEntry;
  previous?: NonNullable<TaskData["runner"]> | null;
}): TaskRunnerHistoryEntry[] {
  const merged: TaskRunnerHistoryEntry[] = [];
  const seen = new Set<string>();
  for (const entry of [opts.latest, ...runnerHistoryFromTask(opts.previous)]) {
    if (seen.has(entry.run_id)) continue;
    seen.add(entry.run_id);
    merged.push(stripRunnerHistory(entry));
    if (merged.length >= MAX_TASK_RUNNER_HISTORY) break;
  }
  return merged;
}

export function buildTaskRunnerOutcome(opts: {
  projection: RunnerOutcomeProjection;
  previous?: NonNullable<TaskData["runner"]> | null;
}): NonNullable<TaskData["runner"]> {
  const latest = buildTaskRunnerHistoryEntry(opts.projection);
  const history = mergeTaskRunnerHistory({ latest, previous: opts.previous });
  return history.length > 1 ? { ...latest, history } : latest;
}

export function renderRunnerOutcomeHistory(opts: {
  task_id: string;
  outcome: NonNullable<TaskData["runner"]>;
  projection: RunnerOutcomeProjection;
}): string {
  const history = opts.outcome.history?.length
    ? opts.outcome.history
    : [stripRunnerHistory(opts.outcome)];
  const [latest, ...previous] = history;
  return [
    renderRunnerOutcomeEntry({
      task_id: opts.task_id,
      entry: latest,
      projection: opts.projection,
    }),
    ...previous.map((entry) => renderRunnerOutcomeEntry({ task_id: opts.task_id, entry })),
  ]
    .join("\n")
    .trimEnd();
}
