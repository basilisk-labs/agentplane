import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  executeTaskRunnerExecution,
  prepareTaskRunnerExecution,
} from "../../runner/usecases/task-run.js";

export type TaskRunParsed = {
  taskId: string;
  dryRun: boolean;
  json: boolean;
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
