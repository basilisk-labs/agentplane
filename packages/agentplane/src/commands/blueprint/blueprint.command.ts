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
  type BlueprintResolveInput,
  type TaskKind,
} from "../../blueprints/index.js";
import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { ValidationError } from "../../shared/errors.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

export {
  blueprintDriftSpec,
  blueprintExamplesSpec,
  blueprintExplainSpec,
  blueprintListSpec,
  blueprintReportSpec,
  blueprintScaffoldSpec,
  blueprintSnapshotSpec,
  blueprintSpec,
  blueprintValidateSpec,
} from "./blueprint.specs.js";
import type {
  BlueprintDriftParsed,
  BlueprintExamplesParsed,
  BlueprintExplainParsed,
  BlueprintListParsed,
  BlueprintReportParsed,
  BlueprintScaffoldParsed,
  BlueprintSnapshotParsed,
  BlueprintValidateParsed,
} from "./blueprint.specs.js";
import { blueprintSpec } from "./blueprint.specs.js";
import {
  checkTaskBlueprintSnapshotDrift,
  refreshTaskBlueprintResolvedSnapshot,
} from "./snapshot-artifact.js";
import { blueprintResolveInputFromTask, workflowModeFromConfig } from "./task-input.js";

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

const BLUEPRINT_ROUTE_EXAMPLES = [
  {
    id: "analysis.readonly",
    title: "Read-only analysis",
    command: "agentplane blueprint explain --kind analysis --mutation none",
    expected: "analysis.light",
    note: "No CI, PR, worktree, or merge gates.",
  },
  {
    id: "content.readonly",
    title: "Content generation",
    command: "agentplane blueprint explain --kind content --mutation none",
    expected: "content.light",
    note: "Evidence and final output, not code lifecycle.",
  },
  {
    id: "docs.change",
    title: "Documentation change",
    command: "agentplane blueprint explain --kind docs --mutation docs",
    expected: "docs.change",
    note: "Docs verification without code checks by default.",
  },
  {
    id: "code.branch_pr",
    title: "Code change in branch_pr",
    command: "agentplane blueprint explain --kind code --mutation code --workflow-mode branch_pr",
    expected: "code.branch_pr",
    note: "Task branch, local checks, PR artifact, integration gate.",
  },
  {
    id: "release.strict",
    title: "Release or publish",
    command:
      "agentplane blueprint explain --kind release --mutation release --risk external_publish",
    expected: "release.strict",
    note: "Version, manifest, parity, and publish safety gates.",
  },
  {
    id: "existing.task",
    title: "Existing task",
    command: "agentplane blueprint explain <task-id>",
    expected: "task-specific route",
    note: "Uses task fields, tags, workflow mode, mutation scope, and risk hints.",
  },
] as const;

export const runBlueprintExamples: CommandHandler<BlueprintExamplesParsed> = (_ctx, p) => {
  if (p.json) {
    process.stdout.write(`${JSON.stringify({ examples: BLUEPRINT_ROUTE_EXAMPLES }, null, 2)}\n`);
    return Promise.resolve(0);
  }
  process.stdout.write("Blueprint route inspection examples\n");
  for (const example of BLUEPRINT_ROUTE_EXAMPLES) {
    process.stdout.write(`\n- ${example.title}\n`);
    process.stdout.write(`  command: ${example.command}\n`);
    process.stdout.write(`  expected: ${example.expected}\n`);
    process.stdout.write(`  note: ${example.note}\n`);
  }
  process.stdout.write("\nNext commands:\n");
  process.stdout.write("- agentplane blueprint list\n");
  process.stdout.write("- agentplane blueprint report\n");
  process.stdout.write("- agentplane help blueprint explain --compact\n");
  return Promise.resolve(0);
};

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
