import type { BlueprintId, MutationKind, RiskFlag, WorkflowMode } from "../../blueprints/index.js";
import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

export type BlueprintListParsed = {
  json: boolean;
  project: boolean;
  trusted: boolean;
};

export type BlueprintExplainParsed = {
  taskId?: string;
  kind?: string;
  mutation: MutationKind;
  workflowMode?: WorkflowMode;
  tags: string[];
  title?: string;
  description?: string;
  riskFlags: RiskFlag[];
  explicitBlueprintId?: BlueprintId;
  json: boolean;
};

export type BlueprintValidateParsed = {
  path?: string;
  project: boolean;
  json: boolean;
};

export type BlueprintReportParsed = {
  json: boolean;
};

export type BlueprintExamplesParsed = {
  json: boolean;
};

export type BlueprintScaffoldParsed = {
  id: BlueprintId;
  from?: BlueprintId;
  out?: string;
  force: boolean;
  json: boolean;
};

export type BlueprintSnapshotParsed = {
  taskId: string;
  json: boolean;
};

export type BlueprintDriftParsed = {
  taskId: string;
  json: boolean;
};

function stringList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

export const blueprintSpec: CommandSpec<GroupCommandParsed> = {
  id: ["blueprint"],
  group: "Blueprints",
  summary: "List and explain blueprint routing without executing a task.",
  description:
    "This is a command group. Use `agentplane blueprint examples`, `agentplane blueprint list`, `agentplane blueprint explain ...`, `agentplane blueprint scaffold ...`, or `agentplane blueprint validate ...`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    { cmd: "agentplane blueprint examples", why: "Show practical route inspection commands." },
    { cmd: "agentplane blueprint list", why: "Show built-in blueprint routes." },
    {
      cmd: "agentplane blueprint scaffold analysis.custom",
      why: "Create a project-local blueprint scaffold.",
    },
    {
      cmd: "agentplane blueprint explain 202605051957-5WRJZK",
      why: "Explain the resolved route for a task.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const blueprintListSpec: CommandSpec<BlueprintListParsed> = {
  id: ["blueprint", "list"],
  group: "Blueprints",
  summary: "List built-in and optional project-local blueprint routes.",
  options: [
    {
      kind: "boolean",
      name: "project",
      default: false,
      description: "Include validated project-local blueprints from .agentplane/blueprints.",
    },
    {
      kind: "boolean",
      name: "trusted",
      default: false,
      description: "Show trust status from .agentplane/blueprints/config.json.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    { cmd: "agentplane blueprint list --json", why: "Emit machine-readable built-in routes." },
    {
      cmd: "agentplane blueprint list --project",
      why: "Include project-local blueprint definitions.",
    },
  ],
  parse: (raw) => ({
    json: raw.opts.json === true,
    project: raw.opts.project === true,
    trusted: raw.opts.trusted === true,
  }),
};

export const blueprintExplainSpec: CommandSpec<BlueprintExplainParsed> = {
  id: ["blueprint", "explain"],
  group: "Blueprints",
  summary: "Explain blueprint route selection for a task or synthetic input.",
  args: [{ name: "task-id", required: false, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "kind",
      valueHint: "<analysis|content|docs|code|release|ops>",
      description: "Synthetic task kind hint.",
    },
    {
      kind: "string",
      name: "mutation",
      valueHint: "<none|docs|code|release|ops|unknown>",
      choices: ["none", "docs", "code", "release", "ops", "unknown"],
      default: "unknown",
      description: "Synthetic mutation scope.",
    },
    {
      kind: "string",
      name: "workflow-mode",
      valueHint: "<direct|branch_pr>",
      choices: ["direct", "branch_pr"],
      description: "Workflow mode override.",
    },
    { kind: "string", name: "tag", valueHint: "<tag>", description: "Synthetic tag." },
    { kind: "string", name: "title", valueHint: "<text>", description: "Synthetic title." },
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      description: "Synthetic description.",
    },
    {
      kind: "string",
      name: "risk",
      valueHint: "<risk>",
      description: "Risk flag; repeatable.",
    },
    {
      kind: "string",
      name: "blueprint",
      valueHint: "<id>",
      description: "Explicit blueprint request.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    { cmd: "agentplane blueprint explain 202605051957-5WRJZK", why: "Resolve a task." },
    {
      cmd: "agentplane blueprint explain --kind analysis --mutation none",
      why: "Resolve a synthetic analysis route.",
    },
  ],
  validateRaw: (raw) => {
    if (!raw.args["task-id"] && !raw.opts.kind && !raw.opts.title && !raw.opts.tag) {
      throw usageError({
        spec: blueprintExplainSpec,
        command: "blueprint explain",
        message: "Provide a task id or synthetic input such as --kind, --title, or --tag.",
      });
    }
  },
  parse: (raw) => ({
    taskId: typeof raw.args["task-id"] === "string" ? raw.args["task-id"] : undefined,
    kind: typeof raw.opts.kind === "string" ? raw.opts.kind : undefined,
    mutation: (raw.opts.mutation ?? "unknown") as MutationKind,
    workflowMode: raw.opts["workflow-mode"] as WorkflowMode | undefined,
    tags: stringList(raw.opts.tag),
    title: typeof raw.opts.title === "string" ? raw.opts.title : undefined,
    description: typeof raw.opts.description === "string" ? raw.opts.description : undefined,
    riskFlags: stringList(raw.opts.risk) as RiskFlag[],
    explicitBlueprintId:
      typeof raw.opts.blueprint === "string" ? (raw.opts.blueprint as BlueprintId) : undefined,
    json: raw.opts.json === true,
  }),
};

export const blueprintValidateSpec: CommandSpec<BlueprintValidateParsed> = {
  id: ["blueprint", "validate"],
  group: "Blueprints",
  summary: "Validate project-local blueprint JSON without registering or executing it.",
  args: [{ name: "path", required: false, valueHint: "<path>" }],
  options: [
    {
      kind: "boolean",
      name: "project",
      default: false,
      description:
        "Validate all JSON blueprints in .agentplane/blueprints or the supplied directory.",
    },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane blueprint validate .agentplane/blueprints/analysis.json",
      why: "Validate a local blueprint definition.",
    },
    {
      cmd: "agentplane blueprint validate --project",
      why: "Validate the project-local blueprint registry directory.",
    },
  ],
  validateRaw: (raw) => {
    if (!raw.args.path && raw.opts.project !== true) {
      throw usageError({
        spec: blueprintValidateSpec,
        command: "blueprint validate",
        message: "Provide a blueprint file path, or use --project.",
      });
    }
  },
  parse: (raw) => ({
    path: typeof raw.args.path === "string" ? raw.args.path : undefined,
    project: raw.opts.project === true,
    json: raw.opts.json === true,
  }),
};

export const blueprintReportSpec: CommandSpec<BlueprintReportParsed> = {
  id: ["blueprint", "report"],
  group: "Blueprints",
  summary: "Report project-local blueprint trust compatibility.",
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [
    {
      cmd: "agentplane blueprint report --json",
      why: "Inspect project-local blueprint trust compatibility before runner materialization.",
    },
  ],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

export const blueprintExamplesSpec: CommandSpec<BlueprintExamplesParsed> = {
  id: ["blueprint", "examples"],
  group: "Blueprints",
  summary: "Show practical blueprint route inspection examples.",
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [
    {
      cmd: "agentplane blueprint examples",
      why: "Inspect which route different task classes resolve to.",
    },
    {
      cmd: "agentplane blueprint examples --json",
      why: "Emit route examples for agents or documentation tooling.",
    },
  ],
  parse: (raw) => ({ json: raw.opts.json === true }),
};

export const blueprintScaffoldSpec: CommandSpec<BlueprintScaffoldParsed> = {
  id: ["blueprint", "scaffold"],
  group: "Blueprints",
  summary: "Create a project-local blueprint JSON scaffold without enabling it.",
  args: [{ name: "id", required: true, valueHint: "<blueprint-id>" }],
  options: [
    {
      kind: "string",
      name: "from",
      valueHint: "<builtin-blueprint-id>",
      description: "Built-in blueprint to clone as a starting point.",
    },
    {
      kind: "string",
      name: "out",
      valueHint: "<path>",
      description: "Output path; defaults to .agentplane/blueprints/<id>.json.",
    },
    { kind: "boolean", name: "force", default: false, description: "Overwrite an existing file." },
    { kind: "boolean", name: "json", default: false, description: "Emit JSON." },
  ],
  examples: [
    {
      cmd: "agentplane blueprint scaffold analysis.custom",
      why: "Create .agentplane/blueprints/analysis.custom.json from analysis.light.",
    },
    {
      cmd: "agentplane blueprint scaffold code.custom --from code.branch_pr",
      why: "Start from an existing code workflow route.",
    },
  ],
  parse: (raw) => ({
    id: String(raw.args.id) as BlueprintId,
    from: typeof raw.opts.from === "string" ? (raw.opts.from as BlueprintId) : undefined,
    out: typeof raw.opts.out === "string" ? raw.opts.out : undefined,
    force: raw.opts.force === true,
    json: raw.opts.json === true,
  }),
};

export const blueprintSnapshotSpec: CommandSpec<BlueprintSnapshotParsed> = {
  id: ["blueprint", "snapshot"],
  group: "Blueprints",
  summary: "Refresh the resolved blueprint snapshot artifact for a task.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [
    {
      cmd: "agentplane blueprint snapshot 202605060915-3NBTGG",
      why: "Refresh the task-local resolved blueprint snapshot artifact.",
    },
    {
      cmd: "agentplane blueprint snapshot 202605060915-3NBTGG --json",
      why: "Emit old/new digest details as JSON.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
  }),
};

export const blueprintDriftSpec: CommandSpec<BlueprintDriftParsed> = {
  id: ["blueprint", "drift"],
  group: "Blueprints",
  summary: "Check whether a task resolved blueprint snapshot is current.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [
    {
      cmd: "agentplane blueprint drift 202605060915-3NBTGG",
      why: "Check a task-local resolved snapshot before runner materialization.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
  }),
};
