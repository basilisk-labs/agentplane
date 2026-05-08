import { parseGroupCommand, type GroupCommandParsed } from "../cli/group-command.js";
import { usageError } from "../cli/spec/errors.js";
import type { CommandSpec } from "../cli/spec/spec.js";

export type IntegrateQueueGroupParsed = GroupCommandParsed;

export const integrateQueueSpec: CommandSpec<IntegrateQueueGroupParsed> = {
  id: ["integrate", "queue"],
  group: "PR",
  summary: "Serialize branch_pr integration into one merge lane.",
  synopsis: ["agentplane integrate queue <enqueue|list|claim|release|run-next> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane integrate queue enqueue 202602030608-F1Q8AB --branch task/202602030608-F1Q8AB/fix",
      why: "Add a verified task branch to the integration queue.",
    },
    { cmd: "agentplane integrate queue run-next --run-verify", why: "Run one queued integration." },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export type IntegrateQueueEnqueueParsed = {
  taskId: string;
  branch: string | null;
  base: string | null;
  priority: number;
};

export const integrateQueueEnqueueSpec: CommandSpec<IntegrateQueueEnqueueParsed> = {
  id: ["integrate", "queue", "enqueue"],
  group: "PR",
  summary: "Add or refresh a verified task branch in the integration queue.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "branch", valueHint: "<name>", description: "Branch name override." },
    { kind: "string", name: "base", valueHint: "<name>", description: "Base branch override." },
    {
      kind: "string",
      name: "priority",
      valueHint: "<number>",
      default: "0",
      description: "Higher values are claimed first.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    branch: typeof raw.opts.branch === "string" ? raw.opts.branch : null,
    base: typeof raw.opts.base === "string" ? raw.opts.base : null,
    priority:
      typeof raw.opts.priority === "string" && raw.opts.priority.trim()
        ? Number.parseInt(raw.opts.priority, 10)
        : 0,
  }),
  validateRaw: (raw) => {
    const branch = typeof raw.opts.branch === "string" ? raw.opts.branch.trim() : "";
    if (raw.opts.branch !== undefined && !branch) {
      throw usageError({
        spec: integrateQueueEnqueueSpec,
        message: "Invalid value for --branch: empty.",
      });
    }
    const priority = typeof raw.opts.priority === "string" ? raw.opts.priority.trim() : "0";
    if (!Number.isInteger(Number.parseInt(priority, 10))) {
      throw usageError({
        spec: integrateQueueEnqueueSpec,
        message: "Invalid value for --priority: expected integer.",
      });
    }
  },
};

export type IntegrateQueueListParsed = { json: boolean };

export const integrateQueueListSpec: CommandSpec<IntegrateQueueListParsed> = {
  id: ["integrate", "queue", "list"],
  group: "PR",
  summary: "List branch_pr integration queue entries.",
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

export type IntegrateQueueClaimParsed = {
  worker: string | null;
  leaseMs: number | null;
  json: boolean;
};

export const integrateQueueClaimSpec: CommandSpec<IntegrateQueueClaimParsed> = {
  id: ["integrate", "queue", "claim"],
  group: "PR",
  summary: "Claim the next queued integration candidate without running integrate.",
  options: [
    { kind: "string", name: "worker", valueHint: "<id>", description: "Queue worker id." },
    { kind: "string", name: "lease-ms", valueHint: "<ms>", description: "Lease duration." },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  parse: (raw) => ({
    worker: typeof raw.opts.worker === "string" ? raw.opts.worker : null,
    leaseMs:
      typeof raw.opts["lease-ms"] === "string" && raw.opts["lease-ms"].trim()
        ? Number.parseInt(raw.opts["lease-ms"], 10)
        : null,
    json: raw.opts.json === true,
  }),
};

export type IntegrateQueueReleaseParsed = {
  taskId: string;
  status: "queued" | "done" | "rework";
  reason: string | null;
};

export const integrateQueueReleaseSpec: CommandSpec<IntegrateQueueReleaseParsed> = {
  id: ["integrate", "queue", "release"],
  group: "PR",
  summary: "Release or complete a queue entry.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "status",
      valueHint: "<queued|done|rework>",
      choices: ["queued", "done", "rework"],
      default: "queued",
      description: "Next queue status.",
    },
    { kind: "string", name: "reason", valueHint: "<text>", description: "Release reason." },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    status: (raw.opts.status ?? "queued") as IntegrateQueueReleaseParsed["status"],
    reason: typeof raw.opts.reason === "string" ? raw.opts.reason : null,
  }),
};

export type IntegrateQueueRunNextParsed = {
  worker: string | null;
  leaseMs: number | null;
  runVerify: boolean;
  dryRun: boolean;
  quiet: boolean;
};

export const integrateQueueRunNextSpec: CommandSpec<IntegrateQueueRunNextParsed> = {
  id: ["integrate", "queue", "run-next"],
  group: "PR",
  summary: "Claim and run one queued integration candidate.",
  options: [
    { kind: "string", name: "worker", valueHint: "<id>", description: "Queue worker id." },
    { kind: "string", name: "lease-ms", valueHint: "<ms>", description: "Lease duration." },
    { kind: "boolean", name: "run-verify", default: false, description: "Run verify commands." },
    { kind: "boolean", name: "dry-run", default: false, description: "Do not modify git state." },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  parse: (raw) => ({
    worker: typeof raw.opts.worker === "string" ? raw.opts.worker : null,
    leaseMs:
      typeof raw.opts["lease-ms"] === "string" && raw.opts["lease-ms"].trim()
        ? Number.parseInt(raw.opts["lease-ms"], 10)
        : null,
    runVerify: raw.opts["run-verify"] === true,
    dryRun: raw.opts["dry-run"] === true,
    quiet: raw.opts.quiet === true,
  }),
};
