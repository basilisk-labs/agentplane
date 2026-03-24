import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";

import type { TaskRunShowParsed } from "./run-show.spec.js";

export { taskRunShowSpec } from "./run-show.spec.js";
export type { TaskRunShowParsed } from "./run-show.spec.js";

function formatTarget(target: {
  kind: string;
  task_id?: string;
  recipe_id?: string;
  scenario_id?: string;
}): string {
  if (target.kind === "task") return `task ${target.task_id ?? "<unknown>"}`;
  return (
    `recipe ${target.recipe_id ?? "<unknown>"}:${target.scenario_id ?? "<unknown>"}` +
    (target.task_id ? ` -> task ${target.task_id}` : "")
  );
}

function formatArtifacts(
  artifacts:
    | {
        path: string;
        label?: string;
      }[]
    | undefined,
): string | null {
  if (!artifacts?.length) return null;
  return artifacts
    .map((artifact) => (artifact.label ? `${artifact.label}=${artifact.path}` : artifact.path))
    .join(", ");
}

function formatMetrics(
  metrics:
    | {
        duration_ms?: number;
        stdout_bytes?: number;
        stderr_bytes?: number;
        output_last_message_bytes?: number | null;
      }
    | undefined,
): string | null {
  if (!metrics) return null;
  const parts: string[] = [];
  if (typeof metrics.duration_ms === "number") parts.push(`duration_ms=${metrics.duration_ms}`);
  if (typeof metrics.stdout_bytes === "number") parts.push(`stdout_bytes=${metrics.stdout_bytes}`);
  if (typeof metrics.stderr_bytes === "number") parts.push(`stderr_bytes=${metrics.stderr_bytes}`);
  if (
    metrics.output_last_message_bytes === null ||
    typeof metrics.output_last_message_bytes === "number"
  ) {
    parts.push(`output_last_message_bytes=${metrics.output_last_message_bytes ?? "null"}`);
  }
  return parts.length > 0 ? parts.join(", ") : null;
}

function buildRunShowJson(inspection: Awaited<ReturnType<typeof loadTaskRunnerInspection>>) {
  return {
    task_id: inspection.task_id,
    run_id: inspection.run_id,
    selection: inspection.selection,
    paths: inspection.paths,
    bundle: inspection.bundle,
    state: inspection.state,
    events: inspection.events,
    events_count: inspection.events.length,
    last_event: inspection.events.at(-1) ?? null,
  };
}

export const runTaskRunShow: CommandHandler<TaskRunShowParsed> = async (
  ctx: CommandCtx,
  parsed: TaskRunShowParsed,
) => {
  try {
    const inspection = await loadTaskRunnerInspection({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    if (parsed.json) {
      process.stdout.write(`${JSON.stringify(buildRunShowJson(inspection), null, 2)}\n`);
      return 0;
    }
    process.stdout.write(`${infoMessage(`task run show: ${parsed.taskId}`)}\n`);
    process.stdout.write(`selection: ${inspection.selection}\n`);
    process.stdout.write(`run_id: ${inspection.run_id}\n`);
    process.stdout.write(`status: ${inspection.state.status}\n`);
    process.stdout.write(`adapter: ${inspection.state.adapter_id}\n`);
    process.stdout.write(`mode: ${inspection.state.mode}\n`);
    process.stdout.write(`target: ${formatTarget(inspection.state.target)}\n`);
    process.stdout.write(`created_at: ${inspection.state.created_at}\n`);
    process.stdout.write(`updated_at: ${inspection.state.updated_at}\n`);
    process.stdout.write(`bundle: ${inspection.paths.bundle_path}\n`);
    process.stdout.write(`result: ${inspection.paths.result_path}\n`);
    process.stdout.write(`state: ${inspection.paths.state_path}\n`);
    process.stdout.write(`events: ${inspection.paths.events_path}\n`);
    process.stdout.write(`trace: ${inspection.paths.trace_path}\n`);
    process.stdout.write(`stderr: ${inspection.paths.stderr_path}\n`);
    process.stdout.write(`events_count: ${inspection.events.length}\n`);
    if (inspection.events.length > 0) {
      const lastEvent = inspection.events.at(-1);
      process.stdout.write(`last_event: ${lastEvent?.type ?? "unknown"}\n`);
    }
    process.stdout.write(
      `policy_requested: ${JSON.stringify(inspection.state.policy_decision?.requested ?? {})}\n`,
    );
    process.stdout.write(
      `policy_effective: ${JSON.stringify(inspection.state.policy_decision?.effective ?? {})}\n`,
    );
    process.stdout.write(
      `policy_fields: ${JSON.stringify(inspection.state.policy_decision?.fields ?? {})}\n`,
    );
    process.stdout.write(
      `policy_refusal: ${JSON.stringify(inspection.state.policy_decision?.refusal_reason ?? null)}\n`,
    );
    if (inspection.state.result?.summary) {
      process.stdout.write(`summary: ${inspection.state.result.summary}\n`);
    }
    if (inspection.state.result?.stdout_summary) {
      process.stdout.write(`stdout_summary: ${inspection.state.result.stdout_summary}\n`);
    }
    if (inspection.state.result?.stderr_summary) {
      process.stdout.write(`stderr_summary: ${inspection.state.result.stderr_summary}\n`);
    }
    if (inspection.state.result?.timeout_reason) {
      process.stdout.write(`timeout_reason: ${inspection.state.result.timeout_reason}\n`);
    }
    const metrics = formatMetrics(inspection.state.result?.metrics);
    if (metrics) {
      process.stdout.write(`metrics: ${metrics}\n`);
    }
    const artifacts = formatArtifacts(inspection.state.result?.artifacts);
    if (artifacts) {
      process.stdout.write(`artifacts: ${artifacts}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task run show",
      task_id: parsed.taskId,
      run_id: parsed.runId ?? null,
    });
  }
};
