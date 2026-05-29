import path from "node:path";

import { resolveProject } from "@agentplaneorg/core/project";

import {
  buildProjectBlueprintCompatibilityReport,
  createTrustedProjectBlueprintRegistry,
  explainResolvedBlueprint,
  formatBlueprintExplain,
  loadTrustedProjectBlueprintRegistry,
  projectBlueprintsDirectory,
  resolveBlueprint,
  scaffoldProjectBlueprint,
  validateProjectBlueprintDirectory,
  validateProjectBlueprintFile,
  validateBlueprint,
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
export { runBlueprintExamples, runBlueprintList } from "./blueprint-listing.js";
import type {
  BlueprintDriftParsed,
  BlueprintExplainParsed,
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
