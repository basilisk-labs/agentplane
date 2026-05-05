import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CliReportEntry } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  formatRunnerCapabilitySummaryLines,
  formatRunnerPolicyFieldSummaryLines,
} from "../../runner/policy-display.js";
import { loadTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";

import type { TaskRunShowParsed } from "./run-show.spec.js";

export { taskRunShowSpec } from "./run-show.spec.js";
export type { TaskRunShowParsed } from "./run-show.spec.js";

const emitter = createCliEmitter();

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
      emitter.json(buildRunShowJson(inspection));
      return 0;
    }
    const entries: CliReportEntry[] = [
      { label: "selection", value: inspection.selection },
      { label: "run_id", value: inspection.run_id },
      { label: "status", value: inspection.state.status },
      { label: "adapter", value: inspection.state.adapter_id },
      { label: "mode", value: inspection.state.mode },
      { label: "target", value: formatTarget(inspection.state.target) },
      { label: "created_at", value: inspection.state.created_at },
      { label: "updated_at", value: inspection.state.updated_at },
      { label: "bundle", value: inspection.paths.bundle_path },
      { label: "result", value: inspection.paths.result_path },
      { label: "state", value: inspection.paths.state_path },
      { label: "events", value: inspection.paths.events_path },
      { label: "trace", value: inspection.paths.trace_path },
      { label: "stderr", value: inspection.paths.stderr_path },
      { label: "events_count", value: inspection.events.length },
    ];
    if (inspection.events.length > 0) {
      const lastEvent = inspection.events.at(-1);
      entries.push({ label: "last_event", value: lastEvent?.type ?? "unknown" });
    }
    const capabilities =
      inspection.bundle.execution.adapter_capabilities ??
      inspection.state.prepared_metadata?.adapter_capabilities ??
      null;
    entries.push(
      { label: "capabilities", value: JSON.stringify(capabilities) },
      ...formatRunnerCapabilitySummaryLines(capabilities ?? undefined),
      {
        label: "policy_requested",
        value: JSON.stringify(inspection.state.policy_decision?.requested ?? {}),
      },
      {
        label: "policy_effective",
        value: JSON.stringify(inspection.state.policy_decision?.effective ?? {}),
      },
      {
        label: "policy_fields",
        value: JSON.stringify(inspection.state.policy_decision?.fields ?? {}),
      },
      {
        label: "policy_refusal",
        value: JSON.stringify(inspection.state.policy_decision?.refusal_reason ?? null),
      },
      ...formatRunnerPolicyFieldSummaryLines(inspection.state.policy_decision),
      { label: "blueprint", value: inspection.bundle.blueprint?.blueprintId ?? "none" },
      { label: "recipe", value: inspection.bundle.recipe?.recipe_id ?? "none" },
      {
        label: "context_budget",
        value: JSON.stringify(inspection.bundle.blueprint?.contextBudget ?? null),
      },
      {
        label: "policy_modules",
        value: JSON.stringify(inspection.bundle.blueprint?.policyModules ?? []),
      },
      {
        label: "context_manifest",
        value: JSON.stringify(inspection.bundle.blueprint?.contextManifest ?? []),
      },
      {
        label: "evidence_checklist",
        value: JSON.stringify(
          inspection.bundle.blueprint?.requiredEvidence.map((item) => item.id) ?? [],
        ),
      },
    );
    if (inspection.state.result?.summary) {
      entries.push({ label: "summary", value: inspection.state.result.summary });
    }
    if (inspection.state.result?.stdout_summary) {
      entries.push({ label: "stdout_summary", value: inspection.state.result.stdout_summary });
    }
    if (inspection.state.result?.stderr_summary) {
      entries.push({ label: "stderr_summary", value: inspection.state.result.stderr_summary });
    }
    if (inspection.state.result?.timeout_reason) {
      entries.push({ label: "timeout_reason", value: inspection.state.result.timeout_reason });
    }
    const metrics = formatMetrics(inspection.state.result?.metrics);
    if (metrics) {
      entries.push({ label: "metrics", value: metrics });
    }
    const artifacts = formatArtifacts(inspection.state.result?.artifacts);
    if (artifacts) {
      entries.push({ label: "artifacts", value: artifacts });
    }
    emitter.report(entries, {
      header: infoMessage(`task run show: ${parsed.taskId}`),
    });
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
