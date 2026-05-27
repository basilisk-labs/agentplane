import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  executeTaskRunnerExecution,
  prepareTaskRunnerExecution,
} from "../../runner/usecases/task-run.js";
import { loadTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import { RunnerRunRepository } from "../../runner/run-repository.js";
import { readTraceArtifactText } from "../../runner/trace-artifacts.js";
import { isProcessAlive } from "../../runner/process-supervision/signals.js";
import { CliError } from "../../shared/errors.js";
import type { LoadedTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import type { RunnerLifecycleStatus } from "../../runner/types.js";

export type TaskRunParsed = {
  taskId: string;
  dryRun: boolean;
  json: boolean;
};

export type TaskRunStatusParsed = {
  taskId: string;
  runId?: string;
  json: boolean;
};

export type TaskRunInspectParsed = {
  taskId: string;
  runId?: string;
  json: boolean;
  events: number;
};

export type TaskRunLogsParsed = {
  taskId: string;
  runId?: string;
  stream: "events" | "trace" | "stderr";
  follow: boolean;
  tail: number;
};

export const taskRunSpec: CommandSpec<TaskRunParsed> = {
  id: ["task", "run"],
  group: "Task",
  summary: "Run an AgentPlane task through the configured runner adapter.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Prepare runner artifacts and invocation without executing the adapter.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane task run 202602030608-F1Q8AB",
      why: "Execute the task with the configured runner adapter.",
    },
    {
      cmd: "agentplane task run 202602030608-F1Q8AB --dry-run --json",
      why: "Inspect the prepared runner invocation and artifact paths without starting the agent.",
    },
  ],
  notes: [
    "The task must already be DOING; use `agentplane task start-ready ...` first.",
    "With the default Codex adapter, the runner prompt starts with `/goal ...` and then includes the AgentPlane bundle contract.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    dryRun: raw.opts["dry-run"] === true,
    json: raw.opts.json === true,
  }),
};

export const taskRunStatusSpec: CommandSpec<TaskRunStatusParsed> = {
  id: ["task", "run", "status"],
  group: "Task",
  summary: "Show the latest or selected task runner run status.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "run-id",
      valueHint: "<run-id>",
      description: "Inspect a specific runner run id.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane task run status 202602030608-F1Q8AB --json",
      why: "Inspect the latest runner state for a task.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: typeof raw.opts["run-id"] === "string" ? String(raw.opts["run-id"]) : undefined,
    json: raw.opts.json === true,
  }),
};

export const taskRunInspectSpec: CommandSpec<TaskRunInspectParsed> = {
  id: ["task", "run", "inspect"],
  group: "Task",
  summary: "Inspect task runner artifacts, state, and recent events.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "run-id",
      valueHint: "<run-id>",
      description: "Inspect a specific runner run id.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
    {
      kind: "string",
      name: "events",
      valueHint: "<count>",
      default: "10",
      description: "Number of recent runner events to show.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task run inspect 202602030608-F1Q8AB",
      why: "Inspect artifact paths and recent runner events.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: typeof raw.opts["run-id"] === "string" ? String(raw.opts["run-id"]) : undefined,
    json: raw.opts.json === true,
    events: parsePositiveInteger(raw.opts.events, 10, "--events"),
  }),
};

export const taskRunLogsSpec: CommandSpec<TaskRunLogsParsed> = {
  id: ["task", "run", "logs"],
  group: "Task",
  summary: "Print task runner events, trace, or stderr logs.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "run-id",
      valueHint: "<run-id>",
      description: "Inspect a specific runner run id.",
    },
    {
      kind: "string",
      name: "stream",
      valueHint: "<events|trace|stderr>",
      choices: ["events", "trace", "stderr"],
      default: "trace",
      description: "Runner log stream to print.",
    },
    {
      kind: "boolean",
      name: "follow",
      short: "f",
      default: false,
      description: "Follow log output until the run exits.",
    },
    {
      kind: "string",
      name: "tail",
      valueHint: "<lines>",
      default: "80",
      description: "Number of trailing lines to print before following.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task run logs 202602030608-F1Q8AB --stream events --follow",
      why: "Watch runner lifecycle events while a task run is active.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: typeof raw.opts["run-id"] === "string" ? String(raw.opts["run-id"]) : undefined,
    stream:
      raw.opts.stream === "events" || raw.opts.stream === "stderr" || raw.opts.stream === "trace"
        ? raw.opts.stream
        : "trace",
    follow: raw.opts.follow === true,
    tail: parsePositiveInteger(raw.opts.tail, 80, "--tail"),
  }),
};

function renderPayload(opts: {
  taskId: string;
  mode: "dry_run" | "execute";
  adapterId: string;
  runId: string;
  runDir: string;
  bundlePath: string;
  bootstrapPath: string;
  resultPath: string;
  status?: string;
  exitCode?: number | null;
  summary?: string;
}) {
  return {
    task_id: opts.taskId,
    mode: opts.mode,
    adapter_id: opts.adapterId,
    run_id: opts.runId,
    run_dir: opts.runDir,
    bundle_path: opts.bundlePath,
    bootstrap_path: opts.bootstrapPath,
    result_path: opts.resultPath,
    ...(opts.status ? { status: opts.status } : {}),
    ...(opts.exitCode === undefined ? {} : { exit_code: opts.exitCode }),
    ...(opts.summary ? { summary: opts.summary } : {}),
  };
}

function parsePositiveInteger(value: unknown, fallback: number, flag: string): number {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Invalid ${flag}: ${String(value)} (expected a non-negative integer)`,
    });
  }
  return parsed;
}

function isTerminalRunnerStatus(status: RunnerLifecycleStatus): boolean {
  return status === "success" || status === "failed" || status === "cancelled";
}

function tailText(text: string, lineCount: number): string {
  if (lineCount === 0) return "";
  const normalized = text.replaceAll("\r\n", "\n");
  const lines = normalized.split("\n");
  const trailingEmpty = lines.at(-1) === "" ? lines.slice(0, -1) : lines;
  return trailingEmpty.slice(-lineCount).join("\n");
}

function runnerProcessAlive(inspection: LoadedTaskRunnerInspection): boolean | null {
  const pid = inspection.state.supervision?.pid;
  if (typeof pid !== "number") return null;
  return isProcessAlive(pid);
}

function renderRunnerStatusPayload(inspection: LoadedTaskRunnerInspection) {
  const state = inspection.state;
  const supervision = state.supervision ?? null;
  return {
    task_id: inspection.task_id,
    run_id: inspection.run_id,
    selection: inspection.selection,
    status: state.status,
    mode: state.mode,
    adapter_id: state.adapter_id,
    target: state.target,
    created_at: state.created_at,
    updated_at: state.updated_at,
    started_at: supervision?.started_at ?? null,
    heartbeat_at: supervision?.heartbeat_at ?? null,
    ended_at: state.result?.ended_at ?? null,
    pid: supervision?.pid ?? null,
    pid_alive: runnerProcessAlive(inspection),
    exit_code: state.result?.exit_code ?? null,
    summary: state.result?.summary ?? null,
    paths: {
      run_dir: inspection.paths.run_dir,
      state: inspection.paths.state_path,
      events: inspection.paths.events_path,
      trace: inspection.paths.trace_path,
      stderr: inspection.paths.stderr_path,
      result: inspection.paths.result_path,
      bundle: inspection.paths.bundle_path,
      bootstrap: inspection.paths.bootstrap_path,
    },
  };
}

function renderRunnerInspectPayload(inspection: LoadedTaskRunnerInspection, eventCount: number) {
  return {
    ...renderRunnerStatusPayload(inspection),
    recent_events: inspection.events.slice(-eventCount),
    result: inspection.state.result ?? null,
    prepared_metadata: inspection.state.prepared_metadata ?? null,
    policy_decision: inspection.state.policy_decision ?? null,
  };
}

async function loadRunnerLogText(
  inspection: LoadedTaskRunnerInspection,
  stream: TaskRunLogsParsed["stream"],
): Promise<string> {
  if (stream === "events") return inspection.events_text;
  if (stream === "trace") {
    const repository = new RunnerRunRepository(inspection.paths);
    return await repository.readTraceTextRequired({
      task_id: inspection.task_id,
      run_id: inspection.run_id,
    });
  }
  try {
    return await readTraceArtifactText(inspection.paths.stderr_path);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message:
          `Runner artifact not found for ${inspection.task_id}:${inspection.run_id} ` +
          `(stderr at ${inspection.paths.stderr_path} or ${inspection.paths.stderr_path}.gz)`,
      });
    }
    throw err;
  }
}

async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function makeRunTaskRunHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunParsed): Promise<number> => {
    const commandCtx = await getCtx("task run");
    const output = createCliEmitter();
    if (parsed.dryRun) {
      const prepared = await prepareTaskRunnerExecution({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? null,
        task_id: parsed.taskId,
        mode: "dry_run",
      });
      const payload = renderPayload({
        taskId: parsed.taskId,
        mode: "dry_run",
        adapterId: prepared.invocation.adapter_id,
        runId: prepared.invocation.run_id,
        runDir: prepared.invocation.run_dir,
        bundlePath: prepared.invocation.bundle_path,
        bootstrapPath: prepared.invocation.bootstrap_path ?? "",
        resultPath: prepared.invocation.result_path,
      });
      if (parsed.json) {
        output.json(payload);
      } else {
        output.report(
          [
            { label: "task", value: payload.task_id },
            { label: "mode", value: payload.mode },
            { label: "adapter", value: payload.adapter_id },
            { label: "run", value: payload.run_id },
            { label: "bundle", value: payload.bundle_path },
            { label: "bootstrap", value: payload.bootstrap_path },
            { label: "result", value: payload.result_path },
          ],
          { header: infoMessage(`task run prepared: ${parsed.taskId}`) },
        );
      }
      return 0;
    }

    const executed = await executeTaskRunnerExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
    });
    const payload = renderPayload({
      taskId: parsed.taskId,
      mode: "execute",
      adapterId: executed.invocation.adapter_id,
      runId: executed.invocation.run_id,
      runDir: executed.invocation.run_dir,
      bundlePath: executed.invocation.bundle_path,
      bootstrapPath: executed.invocation.bootstrap_path ?? "",
      resultPath: executed.invocation.result_path,
      status: executed.result.status,
      exitCode: executed.result.exit_code,
      summary: executed.result.summary,
    });
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report(
        [
          { label: "task", value: payload.task_id },
          { label: "mode", value: payload.mode },
          { label: "adapter", value: payload.adapter_id },
          { label: "run", value: payload.run_id },
          { label: "status", value: payload.status ?? "unknown" },
          { label: "exit_code", value: payload.exit_code ?? null },
          { label: "summary", value: payload.summary ?? null },
          { label: "result", value: payload.result_path },
        ],
        { header: infoMessage(`task run completed: ${parsed.taskId}`) },
      );
    }
    return executed.result.status === "success" ? 0 : 1;
  };
}

export function makeRunTaskRunStatusHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunStatusParsed): Promise<number> => {
    const commandCtx = await getCtx("task run status");
    const inspection = await loadTaskRunnerInspection({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const payload = renderRunnerStatusPayload(inspection);
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report(
        [
          { label: "task", value: payload.task_id },
          { label: "run", value: payload.run_id },
          { label: "status", value: payload.status },
          { label: "mode", value: payload.mode },
          { label: "adapter", value: payload.adapter_id },
          { label: "updated_at", value: payload.updated_at },
          { label: "heartbeat_at", value: payload.heartbeat_at },
          { label: "pid", value: payload.pid },
          { label: "pid_alive", value: payload.pid_alive },
          { label: "summary", value: payload.summary },
          { label: "state", value: payload.paths.state },
          { label: "trace", value: payload.paths.trace },
        ],
        { header: infoMessage(`task runner status: ${parsed.taskId}`) },
      );
    }
    return 0;
  };
}

export function makeRunTaskRunInspectHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunInspectParsed): Promise<number> => {
    const commandCtx = await getCtx("task run inspect");
    const inspection = await loadTaskRunnerInspection({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const payload = renderRunnerInspectPayload(inspection, parsed.events);
    const output = createCliEmitter();
    if (parsed.json) {
      output.json(payload);
    } else {
      output.report(
        [
          { label: "task", value: payload.task_id },
          { label: "run", value: payload.run_id },
          { label: "status", value: payload.status },
          { label: "adapter", value: payload.adapter_id },
          { label: "run_dir", value: payload.paths.run_dir },
          { label: "bundle", value: payload.paths.bundle },
          { label: "bootstrap", value: payload.paths.bootstrap },
          { label: "result", value: payload.paths.result },
          { label: "events", value: payload.paths.events },
          { label: "trace", value: payload.paths.trace },
          { label: "stderr", value: payload.paths.stderr },
        ],
        { header: infoMessage(`task runner inspect: ${parsed.taskId}`) },
      );
      if (payload.recent_events.length > 0) {
        output.line("recent_events:");
        output.lines(payload.recent_events.map((event) => JSON.stringify(event)));
      }
    }
    return 0;
  };
}

export function makeRunTaskRunLogsHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskRunLogsParsed): Promise<number> => {
    const commandCtx = await getCtx("task run logs");
    let inspection = await loadTaskRunnerInspection({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const output = createCliEmitter();
    let text = await loadRunnerLogText(inspection, parsed.stream);
    let emittedChars = text.length;
    const initial = tailText(text, parsed.tail);
    if (initial) output.lines(initial.split("\n"));
    if (!parsed.follow) return 0;

    if (inspection.state.status !== "running") {
      if (!isTerminalRunnerStatus(inspection.state.status)) {
        output.warn(
          `task runner run ${inspection.run_id} is ${inspection.state.status}; nothing to follow until it is running.`,
          "stderr",
        );
        return 0;
      }
      return inspection.state.status === "success" ? 0 : 1;
    }

    while (inspection.state.status === "running") {
      await sleep(1000);
      inspection = await loadTaskRunnerInspection({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? null,
        task_id: parsed.taskId,
        run_id: inspection.run_id,
      });
      text = await loadRunnerLogText(inspection, parsed.stream);
      const nextChars = text.length;
      if (nextChars > emittedChars) {
        const chunk = text.slice(emittedChars);
        output.lines(
          chunk
            .replaceAll("\r\n", "\n")
            .split("\n")
            .filter((line) => line.length > 0),
        );
        emittedChars = nextChars;
      }
    }
    return inspection.state.status === "success" ? 0 : 1;
  };
}
