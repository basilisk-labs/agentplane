/* eslint-disable unicorn/prefer-export-from */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { expect, it, vi } from "vitest";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { defaultConfig } from "@agentplaneorg/core/config";
import { extractTaskSuffix } from "@agentplaneorg/core/commit";
import {
  readTask,
  renderTaskDocFromSections,
  taskDocToSectionMap,
} from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import { infoMessage } from "./output.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import type * as taskBackend from "../backends/task-backend.js";
import { loadCommandContext, loadTaskFromContext } from "../commands/shared/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  expectAgentJsonEnvelope,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  parseAgentJsonEnvelope,
  pathExists,
  splitOutputLines,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { evolveRunnerRunState, writeRunnerRunState } from "../runner/artifacts.js";
import {
  formatRunnerCapabilitySummaryLines,
  formatRunnerPolicyFieldSummaryLines,
} from "../runner/policy-display.js";
import type { RunnerAdapterCapabilities, RunnerPolicyDecision } from "../runner/types.js";
import { prepareTaskRunnerExecution } from "../runner/usecases/task-run.js";
import * as processSupervision from "../runner/process-supervision/signals.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";
import { VERIFY_STEPS_PLACEHOLDER } from "../commands/task/shared/docs.js";

installRunCliIntegrationHarness();
const TASKS_QUERY_CLI_TIMEOUT_MS = 180_000;

const CYRILLIC_RE = /[\u0400-\u04FF]/u;
const RUSSIAN_TRACE_LINE = "Привет из raw trace";
const RUSSIAN_LAST_MESSAGE = "Привет из сообщения Codex";

type RunShowPayload = {
  task_id: string;
  run_id: string;
  selection: string;
  paths: {
    bundle_path: string;
    result_path: string;
    state_path: string;
    events_path: string;
    trace_path: string;
    stderr_path: string;
  };
  bundle: {
    execution: {
      adapter_capabilities?: RunnerAdapterCapabilities | null;
    };
  };
  state: {
    status: string;
    adapter_id: string;
    mode: string;
    target: {
      kind: string;
      task_id?: string;
      recipe_id?: string;
      scenario_id?: string;
    };
    created_at: string;
    updated_at: string;
    prepared_metadata?: {
      adapter_capabilities?: RunnerAdapterCapabilities | null;
    };
    policy_decision?: RunnerPolicyDecision;
    result?: {
      summary?: string;
      stdout_summary?: string;
      stderr_summary?: string;
      timeout_reason?: string;
      metrics?: {
        duration_ms?: number;
        stdout_bytes?: number;
        stderr_bytes?: number;
        output_last_message_bytes?: number | null;
      };
      artifacts?: {
        path: string;
        label?: string;
      }[];
    };
  };
  events_count: number;
  last_event?: { type?: string } | null;
};

function formatRunShowTarget(target: RunShowPayload["state"]["target"]): string {
  if (target.kind === "task") return `task ${target.task_id ?? "<unknown>"}`;
  return (
    `recipe ${target.recipe_id ?? "<unknown>"}:${target.scenario_id ?? "<unknown>"}` +
    (target.task_id ? ` -> task ${target.task_id}` : "")
  );
}

function formatRunShowArtifacts(
  artifacts: NonNullable<RunShowPayload["state"]["result"]>["artifacts"] | undefined,
): string | null {
  if (!artifacts?.length) return null;
  return artifacts
    .map((artifact) => (artifact.label ? `${artifact.label}=${artifact.path}` : artifact.path))
    .join(", ");
}

function formatRunShowMetrics(
  metrics: NonNullable<RunShowPayload["state"]["result"]>["metrics"] | undefined,
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

function renderExpectedRunShowText(taskId: string, payload: RunShowPayload): string {
  const capabilities =
    payload.bundle.execution.adapter_capabilities ??
    payload.state.prepared_metadata?.adapter_capabilities ??
    null;
  const lines = [
    infoMessage(`task run show: ${taskId}`),
    `selection: ${payload.selection}`,
    `run_id: ${payload.run_id}`,
    `status: ${payload.state.status}`,
    `adapter: ${payload.state.adapter_id}`,
    `mode: ${payload.state.mode}`,
    `target: ${formatRunShowTarget(payload.state.target)}`,
    `created_at: ${payload.state.created_at}`,
    `updated_at: ${payload.state.updated_at}`,
    `bundle: ${payload.paths.bundle_path}`,
    `result: ${payload.paths.result_path}`,
    `state: ${payload.paths.state_path}`,
    `events: ${payload.paths.events_path}`,
    `trace: ${payload.paths.trace_path}`,
    `stderr: ${payload.paths.stderr_path}`,
    `events_count: ${payload.events_count}`,
  ];
  if (payload.last_event) {
    lines.push(`last_event: ${payload.last_event.type ?? "unknown"}`);
  }
  lines.push(
    `capabilities: ${JSON.stringify(capabilities)}`,
    ...formatRunnerCapabilitySummaryLines(capabilities ?? undefined),
    `policy_requested: ${JSON.stringify(payload.state.policy_decision?.requested ?? {})}`,
    `policy_effective: ${JSON.stringify(payload.state.policy_decision?.effective ?? {})}`,
    `policy_fields: ${JSON.stringify(payload.state.policy_decision?.fields ?? {})}`,
    `policy_refusal: ${JSON.stringify(payload.state.policy_decision?.refusal_reason ?? null)}`,
    ...formatRunnerPolicyFieldSummaryLines(payload.state.policy_decision),
  );
  if (payload.state.result?.summary) {
    lines.push(`summary: ${payload.state.result.summary}`);
  }
  if (payload.state.result?.stdout_summary) {
    lines.push(`stdout_summary: ${payload.state.result.stdout_summary}`);
  }
  if (payload.state.result?.stderr_summary) {
    lines.push(`stderr_summary: ${payload.state.result.stderr_summary}`);
  }
  if (payload.state.result?.timeout_reason) {
    lines.push(`timeout_reason: ${payload.state.result.timeout_reason}`);
  }
  const metrics = formatRunShowMetrics(payload.state.result?.metrics);
  if (metrics) lines.push(`metrics: ${metrics}`);
  const artifacts = formatRunShowArtifacts(payload.state.result?.artifacts);
  if (artifacts) lines.push(`artifacts: ${artifacts}`);
  return `${lines.join("\n")}\n`;
}

function renderExpectedRunCancelText(opts: {
  taskId: string;
  runId: string;
  previousStatus: string;
  statePath: string;
  eventsPath: string;
  status: string;
  note?: string;
}): string {
  const lines = [
    infoMessage(`task run cancelled: ${opts.taskId}`),
    `run_id: ${opts.runId}`,
    `previous_status: ${opts.previousStatus}`,
    `state: ${opts.statePath}`,
    `events: ${opts.eventsPath}`,
    `status: ${opts.status}`,
  ];
  if (opts.note) lines.push(`note: ${opts.note}`);
  return `${lines.join("\n")}\n`;
}

function renderExpectedRunResumeText(opts: {
  taskId: string;
  runId: string;
  previousStatus: string;
  adapter: string;
  statePath: string;
  eventsPath: string;
  status: string;
  runnerExitCode: number | "null";
  stdoutSummary?: string;
}): string {
  const lines = [
    infoMessage(`task run resumed: ${opts.taskId}`),
    `run_id: ${opts.runId}`,
    `previous_status: ${opts.previousStatus}`,
    `adapter: ${opts.adapter}`,
    `state: ${opts.statePath}`,
    `events: ${opts.eventsPath}`,
    `status: ${opts.status}`,
    `runner_exit_code: ${opts.runnerExitCode}`,
  ];
  if (opts.stdoutSummary) lines.push(`stdout: ${opts.stdoutSummary}`);
  return `${lines.join("\n")}\n`;
}

function renderExpectedRunRetryText(opts: {
  taskId: string;
  sourceRunId: string;
  previousStatus: string;
  runId: string;
  adapter: string;
  statePath: string;
  eventsPath: string;
  status: string;
  runnerExitCode: number | "null";
  stdoutSummary?: string;
}): string {
  const lines = [
    infoMessage(`task run retried: ${opts.taskId}`),
    `source_run_id: ${opts.sourceRunId}`,
    `previous_status: ${opts.previousStatus}`,
    `run_id: ${opts.runId}`,
    `adapter: ${opts.adapter}`,
    `state: ${opts.statePath}`,
    `events: ${opts.eventsPath}`,
    `status: ${opts.status}`,
    `runner_exit_code: ${opts.runnerExitCode}`,
  ];
  if (opts.stdoutSummary) lines.push(`stdout: ${opts.stdoutSummary}`);
  return `${lines.join("\n")}\n`;
}

async function waitForRunnerState(opts: {
  root: string;
  taskId: string;
  predicate: (state: Record<string, unknown>) => boolean;
  timeoutMs?: number;
}): Promise<{ runId: string; statePath: string; state: Record<string, unknown> }> {
  const timeoutMs = opts.timeoutMs ?? 5000;
  const started = Date.now();
  const runsRoot = path.join(opts.root, ".agentplane", "tasks", opts.taskId, "runs");
  while (Date.now() - started < timeoutMs) {
    if (await pathExists(runsRoot)) {
      const runEntries = await readdir(runsRoot);
      const sortedRunEntries = runEntries.toSorted();
      for (const runId of sortedRunEntries) {
        const statePath = path.join(runsRoot, runId, "run-state.json");
        if (!(await pathExists(statePath))) continue;
        const state = JSON.parse(await readFile(statePath, "utf8")) as Record<string, unknown>;
        if (opts.predicate(state)) return { runId, statePath, state };
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for runner state in ${runsRoot}`);
}

async function seedTaskQueryFixture(root: string, tasks: taskBackend.TaskData[]): Promise<void> {
  await writeDefaultConfig(root);
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  for (const task of tasks) {
    await ctx.taskBackend.writeTask(task);
  }
}

export {
  CYRILLIC_RE,
  RUSSIAN_LAST_MESSAGE,
  RUSSIAN_TRACE_LINE,
  TASKS_QUERY_CLI_TIMEOUT_MS,
  captureStdIO,
  chmod,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  defaultConfig,
  evolveRunnerRunState,
  execFile,
  expect,
  expectAgentJsonEnvelope,
  extractTaskSuffix,
  filterAgentsByWorkflow,
  formatRunShowArtifacts,
  formatRunShowMetrics,
  formatRunShowTarget,
  formatRunnerCapabilitySummaryLines,
  formatRunnerPolicyFieldSummaryLines,
  getAgentplaneHome,
  gitBranchExists,
  infoMessage,
  it,
  loadAgentTemplates,
  loadAgentsTemplate,
  loadCommandContext,
  loadTaskFromContext,
  mkdir,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  mkdtemp,
  os,
  parseAgentJsonEnvelope,
  path,
  pathExists,
  prepareTaskRunnerExecution,
  processSupervision,
  promisify,
  prompts,
  readFile,
  readFileSync,
  readTask,
  realpath,
  readdir,
  renderExpectedRunShowText,
  renderExpectedRunCancelText,
  renderExpectedRunResumeText,
  renderExpectedRunRetryText,
  renderTaskDocFromSections,
  resolveUpdateCheckCachePath,
  rm,
  runCli,
  runCliSilent,
  seedTaskQueryFixture,
  splitOutputLines,
  stageGitignoreIfPresent,
  stubTaskBackend,
  taskDocToSectionMap,
  vi,
  waitForRunnerState,
  writeConfig,
  writeDefaultConfig,
  writeFile,
  writeRunnerRunState,
  VERIFY_STEPS_PLACEHOLDER,
};
export type { ResolvedProject, RunShowPayload, taskBackend };
