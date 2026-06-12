import type { BlueprintId, TaskKind, WorkflowMode } from "../../blueprints/index.js";
import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec } from "../../cli/spec/spec.js";
import type { LoopId } from "../../loops/index.js";

export type LoopListParsed = {
  json: boolean;
  project: boolean;
};

export type LoopShowParsed = {
  id: LoopId;
  json: boolean;
  project: boolean;
};

export type LoopExplainParsed = {
  id: LoopId;
  json: boolean;
  project: boolean;
};

export type LoopPlanParsed = {
  taskId?: string;
  title?: string;
  description?: string;
  kind?: TaskKind;
  workflowMode?: WorkflowMode;
  blueprintId?: BlueprintId;
  tags: string[];
  verifyStepsPresent: boolean;
  json: boolean;
  project: boolean;
};

export type LoopRunParsed = {
  taskId: string;
  loopId?: LoopId;
  dryRun: boolean;
  executeAgentStep: boolean;
  json: boolean;
};

export type LoopStepParsed = LoopRunParsed;

export type LoopValidateParsed = {
  path?: string;
  project: boolean;
  json: boolean;
};

function stringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

export const loopSpec: CommandSpec<GroupCommandParsed> = {
  id: ["loop"],
  group: "Loops",
  summary: "Inspect and prepare controlled feedback loops for tasks.",
  description:
    "This is a command group. Use `agentplane loop list`, `agentplane loop show`, `agentplane loop plan`, or dry-run execution commands.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    { cmd: "agentplane loop list", why: "Show built-in loop templates." },
    { cmd: "agentplane loop show tdd.fix", why: "Inspect a loop specification." },
    { cmd: "agentplane loop plan <task-id>", why: "Explain loop selection for a task." },
    {
      cmd: "agentplane loop run <task-id> --loop tdd.fix --dry-run",
      why: "Prepare LoopRun evidence without invoking an external agent.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const loopListSpec: CommandSpec<LoopListParsed> = {
  id: ["loop", "list"],
  group: "Loops",
  summary: "List built-in and optional project-local loop templates.",
  options: [
    {
      kind: "boolean",
      name: "project",
      default: false,
      description: "Include .agentplane/loops JSON files.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  parse: (raw) => ({ project: raw.opts.project === true, json: raw.opts.json === true }),
};

export const loopShowSpec: CommandSpec<LoopShowParsed> = {
  id: ["loop", "show"],
  group: "Loops",
  summary: "Show a loop specification.",
  args: [{ name: "id", required: true, valueHint: "<loop-id>" }],
  options: [
    {
      kind: "boolean",
      name: "project",
      default: false,
      description: "Include .agentplane/loops JSON files.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  parse: (raw) => ({
    id: String(raw.args.id) as LoopId,
    project: raw.opts.project === true,
    json: raw.opts.json === true,
  }),
};

export const loopExplainSpec: CommandSpec<LoopExplainParsed> = {
  ...loopShowSpec,
  id: ["loop", "explain"],
  summary: "Explain loop steps, transitions, permissions, and stop conditions.",
};

export const loopPlanSpec: CommandSpec<LoopPlanParsed> = {
  id: ["loop", "plan"],
  group: "Loops",
  summary: "Select and explain the best loop for a task or synthetic input.",
  args: [{ name: "task-id", required: false, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "title", valueHint: "<text>", description: "Synthetic title." },
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      description: "Synthetic description.",
    },
    {
      kind: "string",
      name: "kind",
      valueHint: "<analysis|content|docs|code|release|ops|context>",
      choices: ["analysis", "content", "docs", "code", "release", "ops", "context"],
      description: "Synthetic task kind.",
    },
    {
      kind: "string",
      name: "workflow-mode",
      valueHint: "<direct|branch_pr>",
      choices: ["direct", "branch_pr"],
      description: "Workflow mode override.",
    },
    { kind: "string", name: "blueprint", valueHint: "<id>", description: "Resolved blueprint id." },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      description: "Synthetic tag; repeatable.",
    },
    {
      kind: "boolean",
      name: "verify-steps-present",
      default: false,
      description: "Synthetic input has runnable Verify Steps.",
    },
    {
      kind: "boolean",
      name: "project",
      default: false,
      description: "Include .agentplane/loops JSON files.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  validateRaw: (raw) => {
    if (!raw.args["task-id"] && !raw.opts.kind && !raw.opts.title && !raw.opts.tag) {
      throw usageError({
        spec: loopPlanSpec,
        command: "loop plan",
        message: "Provide a task id or synthetic input such as --kind, --title, or --tag.",
      });
    }
  },
  parse: (raw) => ({
    taskId: typeof raw.args["task-id"] === "string" ? raw.args["task-id"] : undefined,
    title: typeof raw.opts.title === "string" ? raw.opts.title : undefined,
    description: typeof raw.opts.description === "string" ? raw.opts.description : undefined,
    kind: raw.opts.kind as TaskKind | undefined,
    workflowMode: raw.opts["workflow-mode"] as WorkflowMode | undefined,
    blueprintId: raw.opts.blueprint as BlueprintId | undefined,
    tags: stringList(raw.opts.tag),
    verifyStepsPresent: raw.opts["verify-steps-present"] === true,
    project: raw.opts.project === true,
    json: raw.opts.json === true,
  }),
};

export const loopRunSpec: CommandSpec<LoopRunParsed> = {
  id: ["loop", "run"],
  group: "Loops",
  summary: "Run a loop in dry-run mode or execute only the agent step.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "loop", valueHint: "<loop-id>", description: "Loop id override." },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Prepare LoopRun artifacts without invoking an agent.",
    },
    {
      kind: "boolean",
      name: "execute-agent-step",
      default: false,
      description: "Execute the first agent.run step through the task runner, then stop.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    loopId: typeof raw.opts.loop === "string" ? (raw.opts.loop as LoopId) : undefined,
    dryRun: raw.opts["dry-run"] === true,
    executeAgentStep: raw.opts["execute-agent-step"] === true,
    json: raw.opts.json === true,
  }),
};

export const loopStepSpec: CommandSpec<LoopStepParsed> = {
  ...loopRunSpec,
  id: ["loop", "step"],
  summary: "Prepare or execute the agent step for one loop transition.",
};

export const loopValidateSpec: CommandSpec<LoopValidateParsed> = {
  id: ["loop", "validate"],
  group: "Loops",
  summary: "Validate a loop JSON file or project loop directory.",
  args: [{ name: "path", required: false, valueHint: "<path>" }],
  options: [
    {
      kind: "boolean",
      name: "project",
      default: false,
      description: "Validate all JSON loops in .agentplane/loops.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  validateRaw: (raw) => {
    if (!raw.args.path && raw.opts.project !== true) {
      throw usageError({
        spec: loopValidateSpec,
        command: "loop validate",
        message: "Provide a loop file path, or use --project.",
      });
    }
  },
  parse: (raw) => ({
    path: typeof raw.args.path === "string" ? raw.args.path : undefined,
    project: raw.opts.project === true,
    json: raw.opts.json === true,
  }),
};
