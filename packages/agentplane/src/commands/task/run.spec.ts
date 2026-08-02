import type { CommandSpec } from "../../cli/spec/spec.js";
import { RUNNER_SANDBOX_MODES } from "../../runner/types.js";
import { type TaskRunLogsParsed, parsePositiveInteger } from "./run-parse.js";

export type TaskRunParsed = {
  taskId: string;
  dryRun: boolean;
  remote: boolean;
  sandbox?: string;
  allowDangerFullAccess: boolean;
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

export type TaskRunReconcileParsed = {
  taskId: string;
  json: boolean;
};

export const taskRunSpec: CommandSpec<TaskRunParsed> = {
  id: ["task", "run"],
  group: "Task",
  summary: "Supervise a direct or branch_pr task through its typed lifecycle.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Prepare runner artifacts and invocation without executing the adapter.",
    },
    {
      kind: "boolean",
      name: "remote",
      default: false,
      description: "Include hosted PR/check/review state in the prepared work order.",
    },
    {
      kind: "string",
      name: "sandbox",
      choices: [...RUNNER_SANDBOX_MODES],
      valueHint: `<${RUNNER_SANDBOX_MODES.join("|")}>`,
      description: "Override the role-derived sandbox for this run.",
    },
    {
      kind: "boolean",
      name: "allow-danger-full-access",
      default: false,
      description:
        "Explicitly authorize a requested danger-full-access sandbox and record CLI provenance.",
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
    "A task with only the generated planning placeholder stops at the typed PLANNER boundary without starting an implementation provider; use task advance --agent-json to hand that semantic episode to an external agent.",
    "In direct workflow mode, this command starts an approved task, runs the EXECUTOR, records the observed receipt, and invokes the independent EVALUATOR. It stops with a typed result for approval, missing context, rework, or human review.",
    "In branch_pr workflow mode, this command owns safe worktree/start operations, one role-scoped semantic episode, deterministic verification, EVALUATOR review, PR synchronization, integration enqueue, hosted-close, and cleanup. Provider waits and authority requests remain explicit stops.",
    "With the default Codex adapter, the runner prompt starts with `/goal ...` and then includes the AgentPlane bundle contract.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    dryRun: raw.opts["dry-run"] === true,
    remote: raw.opts.remote === true,
    sandbox: typeof raw.opts.sandbox === "string" ? raw.opts.sandbox : undefined,
    allowDangerFullAccess: raw.opts["allow-danger-full-access"] === true,
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

export const taskRunReconcileSpec: CommandSpec<TaskRunReconcileParsed> = {
  id: ["task", "run", "reconcile"],
  group: "Task",
  summary: "Safely reconcile stale task runner authority without starting a provider.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [
    {
      cmd: "agentplane task run reconcile 202602030608-F1Q8AB --json",
      why: "Project or retire a provably stale claim without starting another agent run.",
    },
  ],
  notes: [
    "The command never starts a runner adapter and never sends a process termination signal.",
    "Active, unverified, running, spawn-authorized, and cleanup-unverified claims fail closed.",
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
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
