import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core";

import type { TaskData } from "../backends/task-backend.js";
import { backendNotSupportedMessage } from "../cli/output.js";
import { loadTaskFromContext, type CommandContext } from "../commands/shared/task-backend.js";
import {
  backendIsLocalFileBackend,
  getTaskStore,
  setTaskFieldsIntent,
  setTaskSectionIntent,
  touchTaskDocMetaIntent,
} from "../commands/shared/task-store.js";
import {
  extractDocSection,
  normalizeTaskDocVersion,
  taskObservationSectionName,
} from "../commands/task/shared.js";
import { CliError } from "../shared/errors.js";

import type { RunnerContextBundle, RunnerRunState, RunnerTarget } from "./types.js";

const RUNNER_OUTCOME_BEGIN = "<!-- BEGIN RUNNER OUTCOME -->";
const RUNNER_OUTCOME_END = "<!-- END RUNNER OUTCOME -->";

function formatRunnerTarget(target: RunnerTarget): string {
  if (target.kind === "task") return `task ${target.task_id}`;
  const base = `recipe ${target.recipe_id}:${target.scenario_id}`;
  return target.task_id ? `${base} -> task ${target.task_id}` : base;
}

function normalizeRunnerOutcomeSection(sectionText: string | null): string {
  const normalized = (sectionText ?? "").replaceAll("\r\n", "\n").trimEnd();
  if (!normalized) return [RUNNER_OUTCOME_BEGIN, RUNNER_OUTCOME_END].join("\n");

  const hasBegin = normalized.includes(RUNNER_OUTCOME_BEGIN);
  const hasEnd = normalized.includes(RUNNER_OUTCOME_END);
  if (hasBegin && hasEnd) return normalized;

  return [normalized, "", RUNNER_OUTCOME_BEGIN, RUNNER_OUTCOME_END].join("\n");
}

function replaceRunnerOutcomeSection(sectionText: string | null, entryText: string): string {
  const normalized = normalizeRunnerOutcomeSection(sectionText);
  const beginIdx = normalized.indexOf(RUNNER_OUTCOME_BEGIN);
  const endIdx = normalized.indexOf(RUNNER_OUTCOME_END);
  if (beginIdx === -1 || endIdx === -1 || endIdx <= beginIdx) {
    throw new Error("Runner outcome markers are malformed");
  }

  const beforeEnd = normalized.slice(0, endIdx).trimEnd();
  const afterEnd = normalized.slice(endIdx).trimStart();
  return [beforeEnd, "", entryText.trimEnd(), "", afterEnd].join("\n").trimEnd();
}

function renderRunnerMetrics(state: RunnerRunState): string | null {
  const metrics = state.result?.metrics;
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

function renderVerificationHint(state: RunnerRunState): string {
  if (state.result?.verification_hints && state.result.verification_hints.length > 0) {
    return state.result.verification_hints.join(" | ");
  }
  if (state.status === "success") {
    return "runner completed successfully; human verification and closure remain explicit lifecycle steps.";
  }
  if (state.status === "failed") {
    return "runner failed; inspect artifacts before retrying or recording verification evidence.";
  }
  if (state.status === "cancelled") {
    return "runner was cancelled; verification evidence is incomplete until a later run succeeds.";
  }
  if (state.status === "running") {
    return "runner is still executing; verification evidence is not complete yet.";
  }
  return "runner is prepared but has not produced verification-relevant output yet.";
}

function renderRunnerOutcomeEntry(state: RunnerRunState): string {
  const lines = [
    `#### ${state.updated_at} — RUNNER — ${state.status}`,
    "",
    `RunId: ${state.run_id}`,
    "",
    `Adapter: ${state.adapter_id}`,
    "",
    `Mode: ${state.mode}`,
    "",
    `Target: ${formatRunnerTarget(state.target)}`,
    "",
    `UpdatedAt: ${state.updated_at}`,
    "",
    `ExitCode: ${state.result?.exit_code ?? "null"}`,
  ];
  if (state.result?.started_at) {
    lines.push("", `StartedAt: ${state.result.started_at}`);
  }
  if (state.result?.ended_at) {
    lines.push("", `EndedAt: ${state.result.ended_at}`);
  }
  if (state.result?.stdout_summary) {
    lines.push("", `Stdout: ${state.result.stdout_summary}`);
  }
  if (state.result?.stderr_summary) {
    lines.push("", `Stderr: ${state.result.stderr_summary}`);
  }
  if (state.result?.summary) {
    lines.push("", `Summary: ${state.result.summary}`);
  }
  if (state.result?.artifacts?.length) {
    lines.push(
      "",
      `Artifacts: ${state.result.artifacts
        .map((artifact) => (artifact.label ? `${artifact.label}=${artifact.path}` : artifact.path))
        .join(", ")}`,
    );
  }
  if (state.result?.findings?.length) {
    lines.push("", `Findings: ${state.result.findings.join(" | ")}`);
  }
  if (state.result?.capabilities_used?.length) {
    lines.push("", `Capabilities: ${state.result.capabilities_used.join(", ")}`);
  }
  if (state.result?.output_paths?.length) {
    lines.push("", `Outputs: ${state.result.output_paths.join(", ")}`);
  }
  const metrics = renderRunnerMetrics(state);
  if (metrics) {
    lines.push("", `Metrics: ${metrics}`);
  }
  lines.push("", `VerificationHint: ${renderVerificationHint(state)}`);
  return `${lines.join("\n").trimEnd()}\n`;
}

function buildTaskRunnerOutcome(state: RunnerRunState): NonNullable<TaskData["runner"]> {
  const outcome: NonNullable<TaskData["runner"]> = {
    run_id: state.run_id,
    status: state.status,
    adapter_id: state.adapter_id,
    mode: state.mode,
    updated_at: state.updated_at,
    exit_code: state.result?.exit_code ?? null,
    target: { ...state.target },
  };
  if (state.result?.started_at) outcome.started_at = state.result.started_at;
  if (state.result?.ended_at) outcome.ended_at = state.result.ended_at;
  if (state.result?.output_paths?.length) outcome.output_paths = [...state.result.output_paths];
  if (state.result?.stdout_summary) outcome.stdout_summary = state.result.stdout_summary;
  if (state.result?.stderr_summary) outcome.stderr_summary = state.result.stderr_summary;
  if (state.result?.metrics) outcome.metrics = { ...state.result.metrics };
  return outcome;
}

function resolveRunnerUpdatedBy(task: Pick<TaskData, "owner" | "doc_updated_by">): string {
  const owner = typeof task.owner === "string" ? task.owner.trim() : "";
  if (owner) return owner;
  const docUpdatedBy = typeof task.doc_updated_by === "string" ? task.doc_updated_by.trim() : "";
  if (docUpdatedBy) return docUpdatedBy;
  return "agentplane";
}

export async function persistRunnerOutcomeToTask(opts: {
  ctx: CommandContext;
  task_id: string;
  state: RunnerRunState;
  bundle?: RunnerContextBundle;
}): Promise<void> {
  if (opts.bundle?.execution.mode === "dry_run" || opts.state.mode === "dry_run") return;

  const backend = opts.ctx.taskBackend;
  if (!backend.writeTask) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: backendNotSupportedMessage("task writes"),
    });
  }

  const useStore = backendIsLocalFileBackend(opts.ctx);
  const outcome = buildTaskRunnerOutcome(opts.state);
  if (useStore) {
    const store = getTaskStore(opts.ctx);
    await store.mutate(opts.task_id, (current) => {
      const baseDoc = ensureDocSections(
        String(current.doc ?? ""),
        opts.ctx.config.tasks.doc.required_sections,
      );
      const docVersion = normalizeTaskDocVersion(current.doc_version);
      const observationSection = taskObservationSectionName(docVersion);
      const currentObservation = extractDocSection(baseDoc, observationSection);
      const nextObservation = replaceRunnerOutcomeSection(
        currentObservation,
        renderRunnerOutcomeEntry(opts.state),
      );
      return [
        setTaskFieldsIntent({ runner: outcome }),
        setTaskSectionIntent({
          section: observationSection,
          text: nextObservation,
          requiredSections: opts.ctx.config.tasks.doc.required_sections,
        }),
        touchTaskDocMetaIntent({
          updatedBy: resolveRunnerUpdatedBy(current),
          version: docVersion,
        }),
      ];
    });
    return;
  }

  const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.task_id });
  const baseDoc = ensureDocSections(
    String(task.doc ?? ""),
    opts.ctx.config.tasks.doc.required_sections,
  );
  const docVersion = normalizeTaskDocVersion(task.doc_version);
  const observationSection = taskObservationSectionName(docVersion);
  const currentObservation = extractDocSection(baseDoc, observationSection);
  const nextObservation = replaceRunnerOutcomeSection(
    currentObservation,
    renderRunnerOutcomeEntry(opts.state),
  );
  const nextDoc = ensureDocSections(
    setMarkdownSection(baseDoc, observationSection, nextObservation),
    opts.ctx.config.tasks.doc.required_sections,
  );
  await backend.writeTask({
    ...task,
    runner: outcome,
    doc: nextDoc,
    doc_updated_at: opts.state.updated_at,
    doc_updated_by: resolveRunnerUpdatedBy(task),
  });
}
