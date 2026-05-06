import path from "node:path";

import { resolveProject } from "@agentplaneorg/core/project";

import {
  buildProjectBlueprintCompatibilityReport,
  createBlueprintRegistry,
  createTrustedProjectBlueprintRegistry,
  explainResolvedBlueprint,
  formatBlueprintExplain,
  loadTrustedProjectBlueprintRegistry,
  listBlueprints,
  projectBlueprintsDirectory,
  resolveBlueprint,
  scaffoldProjectBlueprint,
  validateProjectBlueprintDirectory,
  validateProjectBlueprintFile,
  validateBlueprint,
  type Blueprint,
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
import { ValidationError } from "../../shared/errors.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

import {
  checkTaskBlueprintSnapshotDrift,
  refreshTaskBlueprintResolvedSnapshot,
} from "./snapshot-artifact.js";
import { blueprintResolveInputFromTask, workflowModeFromConfig } from "./task-input.js";

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
    "This is a command group. Use `agentplane blueprint list`, `agentplane blueprint explain ...`, `agentplane blueprint scaffold ...`, or `agentplane blueprint validate ...`.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
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

function blueprintRoute(blueprint: Blueprint, source: "builtin" | "project", filePath?: string) {
  return {
    id: blueprint.id,
    version: blueprint.version,
    title: blueprint.title,
    source,
    ...(filePath ? { path: filePath } : {}),
    task_kinds: blueprint.taskKinds,
    workflow_modes: blueprint.workflowModes ?? ["direct", "branch_pr"],
    route: blueprint.nodes.map((node) => node.kind),
  };
}

function validationErrorFromProjectFile(
  filePath: string,
  errors: readonly { code: string; message: string }[],
) {
  return new ValidationError({
    message: `Project blueprint ${JSON.stringify(filePath)} is invalid:\n${errors
      .map((error) => `- ${error.code}: ${error.message}`)
      .join("\n")}`,
    context: { path: filePath },
  });
}

export const runBlueprintList: CommandHandler<BlueprintListParsed> = async (ctx, p) => {
  const registry = createBlueprintRegistry();
  const routes = listBlueprints(registry).map((blueprint) => blueprintRoute(blueprint, "builtin"));
  let trustedIds = new Set<string>();
  let trustConfig: unknown = null;
  if (p.project || p.trusted) {
    const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
    const trusted = await loadTrustedProjectBlueprintRegistry(resolved.gitRoot);
    if (!trusted.ok) {
      throw new ValidationError({
        message: `Invalid project-local blueprint trust registry:\n${trusted.errors
          .map((error) => `- ${error.code}: ${error.message}`)
          .join("\n")}`,
      });
    }
    trustedIds = new Set(trusted.trustedBlueprints.map((blueprint) => blueprint.id));
    trustConfig = {
      enabled: trusted.trustConfig.config.enabled,
      exists: trusted.trustConfig.exists,
      allowed_ids: trusted.trustConfig.config.allowedIds,
      selection: trusted.trustConfig.config.selection,
    };
    const local = trusted;
    const invalid = local.files.find((file) => !file.ok);
    if (invalid) throw validationErrorFromProjectFile(invalid.path, invalid.errors);
    routes.push(
      ...local.files.flatMap((file) =>
        file.blueprint ? [blueprintRoute(file.blueprint, "project", file.path)] : [],
      ),
    );
  }
  const outputRoutes = routes.map((route) => ({
    ...route,
    ...(p.trusted && route.source === "project" ? { trusted: trustedIds.has(route.id) } : {}),
  }));
  if (p.json) {
    process.stdout.write(
      `${JSON.stringify({ blueprints: outputRoutes, ...(p.trusted ? { trust: trustConfig } : {}) }, null, 2)}\n`,
    );
    return 0;
  }
  for (const route of outputRoutes) {
    const trustLabel =
      p.trusted && route.source === "project" ? ` trusted=${route.trusted ? "yes" : "no"}` : "";
    process.stdout.write(
      `${route.source}${trustLabel} ${route.id}@${route.version} ${route.route.join(" -> ")}\n`,
    );
  }
  return 0;
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
    const projectRegistry = await createTrustedProjectBlueprintRegistry(
      commandCtx.resolvedProject.gitRoot,
    );
    const resolved = resolveBlueprint({
      input,
      registry: projectRegistry.registry,
      projectBlueprintIds: projectRegistry.projectBlueprintIds,
    });
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

export function makeRunBlueprintSnapshotHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, p: BlueprintSnapshotParsed): Promise<number> => {
    const commandCtx = await getCtx("blueprint snapshot");
    const task = await loadTaskFromContext({ ctx: commandCtx, taskId: p.taskId });
    const result = await refreshTaskBlueprintResolvedSnapshot({ ctx: commandCtx, task });
    const output = {
      task_id: p.taskId,
      path: result.path,
      old_digest: result.previous.digest,
      new_digest: result.next.digest,
      changed: result.changed,
      route_changed: result.routeChanged,
      old_blueprint_id: result.previous.blueprintId,
      new_blueprint_id: result.next.blueprintId,
      previous_valid: result.previous.valid,
      previous_exists: result.previous.exists,
    };
    if (p.json) {
      process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
      return 0;
    }
    process.stdout.write(`blueprint_snapshot: ${output.path}\n`);
    process.stdout.write(`old_digest: ${output.old_digest ?? "none"}\n`);
    process.stdout.write(`new_digest: ${output.new_digest}\n`);
    process.stdout.write(`changed: ${output.changed ? "yes" : "no"}\n`);
    process.stdout.write(
      `route_changed: ${
        output.route_changed === null ? "unknown" : output.route_changed ? "yes" : "no"
      }\n`,
    );
    process.stdout.write(`blueprint: ${output.new_blueprint_id}\n`);
    return 0;
  };
}

export function makeRunBlueprintDriftHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, p: BlueprintDriftParsed): Promise<number> => {
    const commandCtx = await getCtx("blueprint drift");
    const task = await loadTaskFromContext({ ctx: commandCtx, taskId: p.taskId });
    const result = await checkTaskBlueprintSnapshotDrift({ ctx: commandCtx, task });
    const output = {
      task_id: p.taskId,
      path: result.path,
      state: result.state,
      old_digest: result.previous.digest,
      new_digest: result.current.digest,
      route_changed: result.routeChanged,
      old_blueprint_id: result.previous.blueprintId,
      new_blueprint_id: result.current.blueprintId,
      errors: result.previous.errors,
      safe_command: result.safeCommand,
    };
    if (p.json) {
      process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
      return result.state === "current" ? 0 : 2;
    }
    process.stdout.write(`blueprint_snapshot: ${output.path}\n`);
    process.stdout.write(`state: ${output.state}\n`);
    process.stdout.write(`old_digest: ${output.old_digest ?? "none"}\n`);
    process.stdout.write(`new_digest: ${output.new_digest}\n`);
    process.stdout.write(
      `route_changed: ${
        output.route_changed === null ? "unknown" : output.route_changed ? "yes" : "no"
      }\n`,
    );
    process.stdout.write(`safe_command: ${output.safe_command}\n`);
    return result.state === "current" ? 0 : 2;
  };
}

export const runBlueprintValidate: CommandHandler<BlueprintValidateParsed> = async (ctx, p) => {
  if (p.project) {
    const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
    const directory = p.path
      ? path.resolve(resolved.gitRoot, p.path)
      : projectBlueprintsDirectory(resolved.gitRoot);
    const result = await validateProjectBlueprintDirectory(directory);
    const trusted =
      !p.path ||
      path.resolve(resolved.gitRoot, p.path) === projectBlueprintsDirectory(resolved.gitRoot)
        ? await loadTrustedProjectBlueprintRegistry(resolved.gitRoot)
        : null;
    const output = {
      ok: result.ok && (trusted ? trusted.ok : true),
      directory: result.directory,
      blueprints: result.files.map((file) => ({
        ok: file.ok,
        path: file.path,
        blueprint_id: file.blueprintId ?? null,
        errors: file.errors,
      })),
      trust: trusted
        ? {
            enabled: trusted.trustConfig.config.enabled,
            exists: trusted.trustConfig.exists,
            allowed_ids: trusted.trustConfig.config.allowedIds,
            trusted_blueprint_ids: trusted.trustedBlueprints.map((blueprint) => blueprint.id),
            errors: trusted.errors,
          }
        : null,
      errors: [...result.errors, ...(trusted ? trusted.errors : [])],
    };
    if (p.json) {
      process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
    } else if (output.ok) {
      process.stdout.write(
        `project blueprints valid: ${result.files.length} file${result.files.length === 1 ? "" : "s"}\n`,
      );
    } else {
      for (const file of result.files) {
        for (const error of file.errors) {
          process.stderr.write(`${file.path}: ${error.code}: ${error.message}\n`);
        }
      }
      for (const error of trusted?.errors ?? []) {
        process.stderr.write(`trust: ${error.code}: ${error.message}\n`);
      }
    }
    return output.ok ? 0 : 3;
  }

  if (!p.path) {
    throw new ValidationError({
      message: "Blueprint validate requires a file path unless --project is set.",
    });
  }
  const file = await validateProjectBlueprintFile(p.path);
  if (!file.blueprint) {
    throw validationErrorFromProjectFile(file.path, file.errors);
  }
  const blueprint = file.blueprint;
  const result = validateBlueprint(blueprint);
  const output = {
    ok: result.ok,
    path: p.path,
    blueprint_id: typeof blueprint.id === "string" ? blueprint.id : null,
    errors: result.errors,
  };
  if (p.json) {
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  } else if (result.ok) {
    process.stdout.write(`blueprint valid: ${blueprint.id}@${blueprint.version}\n`);
  } else {
    for (const error of result.errors) {
      process.stderr.write(`${error.code}: ${error.message}\n`);
    }
  }
  return result.ok ? 0 : 3;
};

export const runBlueprintReport: CommandHandler<BlueprintReportParsed> = async (ctx, p) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const report = await buildProjectBlueprintCompatibilityReport(resolved.gitRoot);
  if (p.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return report.compatible ? 0 : 3;
  }
  process.stdout.write(`project_blueprints_compatible: ${report.compatible ? "yes" : "no"}\n`);
  process.stdout.write(`directory: ${report.directory}\n`);
  process.stdout.write(
    `trust_config: exists=${report.trustConfig.exists ? "yes" : "no"} enabled=${
      report.trustConfig.config.enabled ? "yes" : "no"
    } model=${report.trustConfig.config.trustModel} selection=${report.trustConfig.config.selection}\n`,
  );
  process.stdout.write(
    `trusted_blueprints: ${
      report.trustedBlueprintIds.length > 0 ? report.trustedBlueprintIds.join(", ") : "none"
    }\n`,
  );
  for (const blueprint of report.blueprints) {
    process.stdout.write(
      `blueprint: ${blueprint.blueprintId ?? "<unknown>"} trusted=${
        blueprint.trusted ? "yes" : "no"
      } ok=${blueprint.ok ? "yes" : "no"} path=${blueprint.path}\n`,
    );
  }
  for (const error of report.errors) {
    process.stderr.write(`blueprint_report: ${error.code}: ${error.message}\n`);
  }
  return report.compatible ? 0 : 3;
};

export const runBlueprintScaffold: CommandHandler<BlueprintScaffoldParsed> = async (ctx, p) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const result = await scaffoldProjectBlueprint({
    projectRoot: resolved.gitRoot,
    id: p.id,
    from: p.from,
    out: p.out,
    force: p.force,
  });
  const output = {
    path: result.path,
    blueprint_id: result.blueprint.id,
    from: p.from ?? "analysis.light",
    validation: result.validation,
  };
  if (p.json) {
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
    return result.validation.ok ? 0 : 3;
  }
  process.stdout.write(`blueprint scaffolded: ${result.path}\n`);
  if (!result.validation.ok) {
    for (const error of result.validation.errors) {
      process.stderr.write(`${error.code}: ${error.message}\n`);
    }
  }
  return result.validation.ok ? 0 : 3;
};
