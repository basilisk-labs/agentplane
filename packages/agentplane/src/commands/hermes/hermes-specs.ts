import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

export type HermesEnqueueParsed = {
  taskId: string;
  board: string;
  assignee: string;
  role: string;
  workspace: string | null;
  json: boolean;
};

export type HermesSuperviseParsed = {
  taskId: string;
  json: boolean;
  executeStep: boolean;
  dryRun: boolean;
};

export type HermesReconcileParsed = {
  taskId?: string;
  hermesState?: string;
  json: boolean;
};

export type HermesLifecycleParsed = {
  action: string;
  body: string | null;
  json: boolean;
  dryRun: boolean;
};

export type HermesDoctorParsed = {
  json: boolean;
};

export const hermesSpec: CommandSpec<GroupCommandParsed> = {
  id: ["hermes"],
  group: "Integrations",
  summary: "Inspect the Agentplane-owned Hermes adapter contract.",
  description:
    "This command group exposes the repo-local Agentplane side of the Hermes Kanban adapter. " +
    "It does not talk directly to the Hermes SQLite database; Hermes-side plugins should call " +
    "these commands through the CLI or a typed wrapper.",
  synopsis: ["agentplane hermes <enqueue|supervise|reconcile|doctor> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane hermes enqueue 202605311941-K4FCKS --json",
      why: "Render the provider-safe Hermes projection for one Agentplane task.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const hermesEnqueueSpec: CommandSpec<HermesEnqueueParsed> = {
  id: ["hermes", "enqueue"],
  group: "Integrations",
  summary: "Render a provider-safe Hermes Kanban card projection for a task.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "board",
      default: "agentplane",
      valueHint: "<slug>",
      description: "Hermes board slug for the projected card.",
    },
    {
      kind: "string",
      name: "assignee",
      default: "agentplane-supervisor",
      valueHint: "<lane>",
      description: "Hermes assignee or lane that should own the projected root card.",
    },
    {
      kind: "string",
      name: "role",
      default: "CODER",
      valueHint: "<ROLE>",
      description: "Agentplane role represented by the projected Hermes card.",
    },
    {
      kind: "string",
      name: "workspace",
      valueHint: "dir:/abs/repo",
      description: "Hermes workspace spec. Defaults to the Agentplane repository root.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane hermes enqueue 202605311941-K4FCKS --board my-repo --json",
      why: "Build the card body/metadata a Hermes plugin should create idempotently.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    board: typeof raw.opts.board === "string" ? raw.opts.board : "agentplane",
    assignee: typeof raw.opts.assignee === "string" ? raw.opts.assignee : "agentplane-supervisor",
    role: typeof raw.opts.role === "string" ? raw.opts.role : "CODER",
    workspace: typeof raw.opts.workspace === "string" ? raw.opts.workspace : null,
    json: raw.opts.json === true,
  }),
};

export const hermesSuperviseSpec: CommandSpec<HermesSuperviseParsed> = {
  id: ["hermes", "supervise"],
  group: "Integrations",
  summary: "Compute the next safe Agentplane route step for a Hermes supervisor run.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
    {
      kind: "boolean",
      name: "execute-step",
      default: false,
      description: "Execute one allowlisted Agentplane route step for this Hermes claim.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "With --execute-step, return the planned command without executing it.",
    },
  ],
  examples: [
    {
      cmd: "agentplane hermes supervise 202605311941-K4FCKS --json",
      why: "Return a route-gated supervisor packet without executing arbitrary shell text.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
    executeStep: raw.opts["execute-step"] === true,
    dryRun: raw.opts["dry-run"] === true,
  }),
};

export const hermesReconcileSpec: CommandSpec<HermesReconcileParsed> = {
  id: ["hermes", "reconcile"],
  group: "Integrations",
  summary: "Inspect Hermes projection drift without mutating Agentplane task truth.",
  options: [
    {
      kind: "string",
      name: "task-id",
      valueHint: "<task-id>",
      description: "Limit reconcile diagnostics to one Agentplane task id.",
    },
    {
      kind: "string",
      name: "hermes-state",
      valueHint: "<path>",
      description: "Read a Hermes card/task JSON snapshot and compare it with Agentplane truth.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane hermes reconcile --task-id 202605311941-K4FCKS --json",
      why: "Inspect the local Agentplane side of a Hermes projection.",
    },
  ],
  parse: (raw) => ({
    taskId: typeof raw.opts["task-id"] === "string" ? raw.opts["task-id"] : undefined,
    hermesState:
      typeof raw.opts["hermes-state"] === "string" ? raw.opts["hermes-state"] : undefined,
    json: raw.opts.json === true,
  }),
};

export const hermesLifecycleSpec: CommandSpec<HermesLifecycleParsed> = {
  id: ["hermes", "lifecycle"],
  group: "Integrations",
  summary: "Emit one Hermes Kanban lifecycle callback through the configured Hermes CLI.",
  description:
    "This is the Agentplane-side lifecycle client for Hermes worker lanes. It sends comment, block, " +
    "complete, or heartbeat callbacks through the Hermes CLI and reads task, board, and run identity " +
    "from the Hermes worker environment.",
  args: [{ name: "action", required: true, valueHint: "comment|block|complete|heartbeat" }],
  options: [
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      description: "Callback body, reason, or summary. Heartbeat uses a default body when omitted.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Return the Hermes CLI command without executing it.",
    },
  ],
  examples: [
    {
      cmd: 'agentplane hermes lifecycle comment --body \'{"agentplane_task_id":"202605311941-K4FCKS"}\' --json',
      why: "Write a structured projection comment for the current Hermes card.",
    },
    {
      cmd: "agentplane hermes lifecycle complete --body 'Agentplane terminal evidence validated' --json",
      why: "Complete the current Hermes card after Agentplane terminal gates have passed.",
    },
  ],
  parse: (raw) => ({
    action: String(raw.args.action),
    body: typeof raw.opts.body === "string" ? raw.opts.body : null,
    json: raw.opts.json === true,
    dryRun: raw.opts["dry-run"] === true,
  }),
};

export const hermesDoctorSpec: CommandSpec<HermesDoctorParsed> = {
  id: ["hermes", "doctor"],
  group: "Integrations",
  summary: "Check the local Agentplane side of the Hermes adapter contract.",
  options: [
    { kind: "boolean", name: "json", default: false, description: "Emit machine-readable result." },
  ],
  examples: [
    {
      cmd: "agentplane hermes doctor --json",
      why: "Check workflow mode, repo root, and Hermes Kanban environment variables.",
    },
  ],
  parse: (raw) => ({ json: raw.opts.json === true }),
};
