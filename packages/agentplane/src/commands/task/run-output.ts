import { infoMessage } from "../../cli/output.js";
import {
  formatRunnerCapabilitySummaryLines,
  formatRunnerPolicyFieldSummaryLines,
} from "../../runner/policy-display.js";
import type {
  ExecutedTaskRunnerExecution,
  PreparedTaskRunnerExecution,
} from "../../runner/usecases/task-run.js";

export type TaskRunOutput = {
  stdout: string;
  stderr: string;
};

function linesToOutput(lines: string[]): string {
  return `${lines.join("\n")}\n`;
}

export function renderTaskRunExecutedOutput(opts: {
  taskId: string;
  executed: ExecutedTaskRunnerExecution;
}): TaskRunOutput {
  const stdout = [
    infoMessage(`task run executed: ${opts.taskId}`),
    `adapter: ${opts.executed.invocation.adapter_id}`,
    `run_id: ${opts.executed.invocation.run_id}`,
    `result: ${opts.executed.invocation.result_path}`,
    `state: ${opts.executed.bundle.execution.artifact_paths.state_path}`,
    `events: ${opts.executed.bundle.execution.artifact_paths.events_path}`,
    `status: ${opts.executed.result.status}`,
    `runner_exit_code: ${opts.executed.result.exit_code ?? "null"}`,
  ];
  if (opts.executed.result.stdout_summary) {
    stdout.push(`stdout: ${opts.executed.result.stdout_summary}`);
  }
  return {
    stdout: linesToOutput(stdout),
    stderr: opts.executed.result.stderr_summary
      ? linesToOutput([`stderr: ${opts.executed.result.stderr_summary}`])
      : "",
  };
}

export function renderTaskRunDryRunOutput(opts: {
  taskId: string;
  prepared: PreparedTaskRunnerExecution;
}): TaskRunOutput {
  const stdout = [
    infoMessage(`task run dry-run prepared: ${opts.taskId}`),
    `adapter: ${opts.prepared.invocation.adapter_id}`,
    `run_id: ${opts.prepared.invocation.run_id}`,
    `bundle: ${opts.prepared.bundle.execution.artifact_paths.bundle_path}`,
    `blueprint_plan: ${opts.prepared.bundle.execution.artifact_paths.blueprint_plan_path}`,
    `result: ${opts.prepared.bundle.execution.artifact_paths.result_path}`,
    `bootstrap: ${opts.prepared.bundle.execution.artifact_paths.bootstrap_path}`,
    `state: ${opts.prepared.bundle.execution.artifact_paths.state_path}`,
    `events: ${opts.prepared.bundle.execution.artifact_paths.events_path}`,
    `capabilities: ${JSON.stringify(opts.prepared.bundle.execution.adapter_capabilities ?? null)}`,
    ...formatRunnerCapabilitySummaryLines(opts.prepared.bundle.execution.adapter_capabilities),
    `policy_requested: ${JSON.stringify(opts.prepared.bundle.execution.policy_decision?.requested ?? {})}`,
    `policy_effective: ${JSON.stringify(opts.prepared.bundle.execution.policy_decision?.effective ?? {})}`,
    `policy_fields: ${JSON.stringify(opts.prepared.bundle.execution.policy_decision?.fields ?? {})}`,
    `policy_refusal: ${JSON.stringify(
      opts.prepared.bundle.execution.policy_decision?.refusal_reason ?? null,
    )}`,
    ...formatRunnerPolicyFieldSummaryLines(opts.prepared.bundle.execution.policy_decision),
    `blueprint: ${opts.prepared.bundle.blueprint?.blueprintId ?? "none"}`,
    `recipe: ${opts.prepared.bundle.recipe?.recipe_id ?? "none"}`,
    `context_budget: ${JSON.stringify(opts.prepared.bundle.blueprint?.contextBudget ?? null)}`,
    `policy_modules: ${JSON.stringify(opts.prepared.bundle.blueprint?.policyModules ?? [])}`,
    `context_manifest: ${JSON.stringify(
      opts.prepared.bundle.blueprint?.contextManifest.map((item) => ({
        id: item.id,
        kind: item.kind,
        reason: item.reason,
        source: item.source,
      })) ?? [],
    )}`,
    `evidence_checklist: ${JSON.stringify(
      opts.prepared.bundle.blueprint?.requiredEvidence.map((item) => item.id) ?? [],
    )}`,
    `argv: ${opts.prepared.invocation.argv.join(" ")}`,
  ];
  return { stdout: linesToOutput(stdout), stderr: "" };
}
