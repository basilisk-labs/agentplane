import {
  createBlueprintRegistry,
  explainResolvedBlueprint,
  formatBlueprintExplain,
  listBlueprints,
  resolveBlueprint,
  type BlueprintId,
  type BlueprintResolveInput,
  type MutationKind,
  type RiskFlag,
  type TaskKind,
  type WorkflowMode,
} from "../../blueprints/index.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import { blueprintResolveInputFromTask, workflowModeFromConfig } from "./task-input.js";

export type BlueprintListParsed = {
  json: boolean;
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
    "This is a command group. Use `agentplane blueprint list` or `agentplane blueprint explain ...`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    { cmd: "agentplane blueprint list", why: "Show built-in blueprint routes." },
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
  summary: "List built-in blueprint routes.",
  options: [{ kind: "boolean", name: "json", default: false, description: "Emit JSON." }],
  examples: [{ cmd: "agentplane blueprint list --json", why: "Emit machine-readable routes." }],
  parse: (raw) => ({ json: raw.opts.json === true }),
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

async function runBlueprintRoot(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: blueprintSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["blueprint"]),
    command: "blueprint",
    contextCommand: "blueprint",
  });
}

function syntheticInput(ctx: CommandContext, p: BlueprintExplainParsed): BlueprintResolveInput {
  return {
    tags: p.tags,
    taskKind: p.kind as TaskKind | undefined,
    title: p.title,
    description: p.description,
    workflowMode: p.workflowMode ?? workflowModeFromConfig(ctx.config),
    mutation: p.mutation,
    riskFlags: p.riskFlags,
    explicitBlueprintId: p.explicitBlueprintId,
  };
}

export function makeRunBlueprintHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return runBlueprintRoot;
}

export const runBlueprintList: CommandHandler<BlueprintListParsed> = (_ctx, p) => {
  const registry = createBlueprintRegistry();
  const routes = listBlueprints(registry).map((blueprint) => ({
    id: blueprint.id,
    version: blueprint.version,
    title: blueprint.title,
    task_kinds: blueprint.taskKinds,
    workflow_modes: blueprint.workflowModes ?? ["direct", "branch_pr"],
    route: blueprint.nodes.map((node) => node.kind),
  }));
  if (p.json) {
    process.stdout.write(`${JSON.stringify({ blueprints: routes }, null, 2)}\n`);
    return Promise.resolve(0);
  }
  for (const route of routes) {
    process.stdout.write(`${route.id}@${route.version} ${route.route.join(" -> ")}\n`);
  }
  return Promise.resolve(0);
};

export function makeRunBlueprintExplainHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, p: BlueprintExplainParsed): Promise<number> => {
    const commandCtx = await getCtx("blueprint explain");
    const input = p.taskId
      ? blueprintResolveInputFromTask({
          task: await loadTaskFromContext({ ctx: commandCtx, taskId: p.taskId }),
          config: commandCtx.config,
          mutation: p.mutation === "unknown" ? undefined : p.mutation,
          workflowMode: p.workflowMode,
          riskFlags: p.riskFlags,
        })
      : syntheticInput(commandCtx, p);
    const resolved = resolveBlueprint({ input });
    const output = explainResolvedBlueprint({
      resolved,
      input,
      workflowMode: input.workflowMode,
    });
    if (p.json) {
      process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
      return 0;
    }
    process.stdout.write(formatBlueprintExplain(output));
    return 0;
  };
}
