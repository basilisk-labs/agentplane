import path from "node:path";

import { resolveProject } from "@agentplaneorg/core/project";

import {
  createDryRunLoopRun,
  createLoopRegistry,
  getLoop,
  listLoops,
  parseProjectLoopJsonInternal,
  planLoopForInput,
  projectLoopsDirectory,
  validateLoopSpec,
  validateProjectLoopDirectory,
  validateProjectLoopFile,
  type LoopPlanInput,
  type LoopSpec,
} from "../../loops/index.js";
import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { CliError, ValidationError } from "../../shared/errors.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { blueprintResolveInputFromTask, workflowModeFromConfig } from "../blueprint/task-input.js";
import { prepareTaskRunnerExecution } from "../../runner/usecases/task-run.js";

export {
  loopExplainSpec,
  loopListSpec,
  loopPlanSpec,
  loopRunSpec,
  loopShowSpec,
  loopSpec,
  loopStepSpec,
  loopValidateSpec,
} from "./loop.specs.js";
import {
  loopSpec,
  type LoopExplainParsed,
  type LoopListParsed,
  type LoopPlanParsed,
  type LoopRunParsed,
  type LoopShowParsed,
  type LoopValidateParsed,
} from "./loop.specs.js";

type LoopCatalogEntry = {
  loop: LoopSpec;
  source: "builtin" | "project";
  path?: string;
};

async function runLoopRoot(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: loopSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["loop"]),
    command: "loop",
    contextCommand: "loop",
  });
}

export function makeRunLoopHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return runLoopRoot;
}

function loopSummary(loop: LoopSpec, source: "builtin" | "project", filePath?: string) {
  return {
    id: loop.id,
    version: loop.version,
    title: loop.title,
    kind: loop.kind,
    status: loop.status,
    source,
    ...(filePath ? { path: filePath } : {}),
    applies_to: loop.appliesTo,
    budgets: loop.budgets,
    steps: loop.steps.map((step) => ({ id: step.id, type: step.type })),
    stop_conditions: loop.stopConditions,
  };
}

async function loadLoopCatalog(projectRoot: string, includeProject: boolean) {
  const loops: LoopCatalogEntry[] = listLoops(createLoopRegistry()).map((loop) => ({
    loop,
    source: "builtin" as const,
    path: undefined as string | undefined,
  }));
  if (includeProject) {
    const result = await validateProjectLoopDirectory(projectLoopsDirectory(projectRoot));
    const invalid = result.files.find((file) => !file.ok);
    if (invalid) {
      throw new ValidationError({
        message: `Project loop ${JSON.stringify(invalid.path)} is invalid:\n${invalid.errors
          .map((error) => `- ${error.code}: ${error.message}`)
          .join("\n")}`,
      });
    }
    loops.push(
      ...result.files.flatMap((file) =>
        file.loop ? [{ loop: file.loop, source: "project" as const, path: file.path }] : [],
      ),
    );
  }
  return loops;
}

export function makeRunLoopListHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: LoopListParsed): Promise<number> => {
    const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
    const loops = await loadLoopCatalog(resolved.gitRoot, p.project);
    const output = loops.map((entry) => loopSummary(entry.loop, entry.source, entry.path));
    if (p.json) {
      process.stdout.write(`${JSON.stringify({ loops: output }, null, 2)}\n`);
      return 0;
    }
    for (const loop of output) {
      process.stdout.write(
        `${loop.source} ${loop.id}@${loop.version} ${loop.kind} ${loop.status} steps=${loop.steps.length}\n`,
      );
    }
    return 0;
  };
}

function requireCatalogLoop(loops: readonly LoopCatalogEntry[], id: string): LoopCatalogEntry {
  const entry = loops.find((candidate) => candidate.loop.id === id);
  if (!entry) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown loop: ${id}`,
    });
  }
  return entry;
}

export function makeRunLoopShowHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: LoopShowParsed): Promise<number> => {
    const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
    const entry = requireCatalogLoop(await loadLoopCatalog(resolved.gitRoot, p.project), p.id);
    if (p.json) {
      process.stdout.write(`${JSON.stringify(entry.loop, null, 2)}\n`);
      return 0;
    }
    const summary = loopSummary(entry.loop, entry.source, entry.path);
    process.stdout.write(`${summary.id}@${summary.version} ${summary.title}\n`);
    process.stdout.write(`kind: ${summary.kind}\n`);
    process.stdout.write(`status: ${summary.status}\n`);
    process.stdout.write(`source: ${summary.source}\n`);
    process.stdout.write(
      `steps: ${summary.steps.map((step) => `${step.id}:${step.type}`).join(" -> ")}\n`,
    );
    process.stdout.write(`max_iterations: ${summary.budgets.maxIterations}\n`);
    return 0;
  };
}

export function makeRunLoopExplainHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: LoopExplainParsed): Promise<number> => {
    const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
    const entry = requireCatalogLoop(await loadLoopCatalog(resolved.gitRoot, p.project), p.id);
    if (p.json) {
      process.stdout.write(
        `${JSON.stringify(loopSummary(entry.loop, entry.source, entry.path), null, 2)}\n`,
      );
      return 0;
    }
    process.stdout.write(`Loop: ${entry.loop.id}@${entry.loop.version}\n`);
    process.stdout.write(`Purpose: ${entry.loop.description}\n`);
    process.stdout.write(`Permissions: ${JSON.stringify(entry.loop.permissions)}\n`);
    process.stdout.write("Steps:\n");
    for (const step of entry.loop.steps) {
      process.stdout.write(`- ${step.id}: ${step.type}${step.optional ? " optional" : ""}\n`);
    }
    process.stdout.write("Transitions:\n");
    for (const transition of entry.loop.transitions) {
      process.stdout.write(`- ${transition.from ?? "*"} -> ${transition.to}: ${transition.if}\n`);
    }
    process.stdout.write("Stop conditions:\n");
    for (const condition of entry.loop.stopConditions) {
      process.stdout.write(`- ${condition.id}: ${condition.decision} (${condition.reason})\n`);
    }
    return 0;
  };
}

function syntheticLoopPlanInput(ctx: CommandContext, p: LoopPlanParsed): LoopPlanInput {
  return {
    title: p.title,
    description: p.description,
    tags: p.tags,
    taskKind: p.kind,
    workflowMode: p.workflowMode ?? workflowModeFromConfig(ctx.config),
    blueprintId: p.blueprintId,
    verifyStepsPresent: p.verifyStepsPresent,
  };
}

export function makeRunLoopPlanHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (_ctx: CommandCtx, p: LoopPlanParsed): Promise<number> => {
    const commandCtx = await getCtx("loop plan");
    const task = p.taskId ? await loadTaskFromContext({ ctx: commandCtx, taskId: p.taskId }) : null;
    const input = task
      ? (() => {
          const blueprintInput = blueprintResolveInputFromTask({
            task,
            config: commandCtx.config,
            workflowMode: p.workflowMode,
          });
          return {
            taskId: task.id,
            title: task.title,
            description: task.description,
            tags: task.tags ?? [],
            taskKind: blueprintInput.taskKind,
            workflowMode: blueprintInput.workflowMode,
            blueprintId: p.blueprintId ?? blueprintInput.blueprintRequest,
            verifyStepsPresent: (task.verify ?? []).length > 0,
          } satisfies LoopPlanInput;
        })()
      : syntheticLoopPlanInput(commandCtx, p);
    const resolved = commandCtx.resolvedProject;
    const catalog = await loadLoopCatalog(resolved.gitRoot, p.project);
    const plan = planLoopForInput({
      input,
      registry: { loops: catalog.map((entry) => entry.loop) },
    });
    if (p.json) {
      process.stdout.write(`${JSON.stringify(plan, null, 2)}\n`);
      return plan.selected ? 0 : 2;
    }
    if (!plan.selected) {
      process.stdout.write("selected_loop: none\n");
      process.stdout.write("reason: no candidate reached selection threshold\n");
      return 2;
    }
    process.stdout.write(`selected_loop: ${plan.selected.loopId}@${plan.selected.loopVersion}\n`);
    process.stdout.write(`score: ${plan.selected.total}\n`);
    process.stdout.write("reasons:\n");
    for (const reason of plan.selected.reasons) process.stdout.write(`- ${reason}\n`);
    process.stdout.write("rejected:\n");
    for (const candidate of plan.rejected.slice(0, 5)) {
      process.stdout.write(
        `- ${candidate.loopId}@${candidate.loopVersion} score=${candidate.total} ${candidate.rejectedReasons.join("; ")}\n`,
      );
    }
    return 0;
  };
}

async function resolveLoopForRun(opts: {
  commandCtx: CommandContext;
  taskId: string;
  loopId?: string;
}): Promise<LoopSpec> {
  if (opts.loopId) {
    const loop = getLoop(opts.loopId);
    if (!loop) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown loop: ${opts.loopId}` });
    }
    return loop;
  }
  const task = await loadTaskFromContext({ ctx: opts.commandCtx, taskId: opts.taskId });
  const blueprintInput = blueprintResolveInputFromTask({
    task,
    config: opts.commandCtx.config,
  });
  const plan = planLoopForInput({
    input: {
      taskId: task.id,
      title: task.title,
      description: task.description,
      tags: task.tags ?? [],
      taskKind: blueprintInput.taskKind,
      workflowMode: blueprintInput.workflowMode,
      blueprintId: blueprintInput.blueprintRequest,
      verifyStepsPresent: (task.verify ?? []).length > 0,
    },
  });
  if (!plan.selected) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "No loop candidate reached selection threshold; pass --loop explicitly.",
    });
  }
  return (
    getLoop(plan.selected.loopId) ??
    (() => {
      throw new Error(`Selected loop missing from registry: ${plan.selected?.loopId}`);
    })()
  );
}

function makeRunLoopDryRunHandler(
  commandName: string,
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, p: LoopRunParsed): Promise<number> => {
    const commandCtx = await getCtx(commandName);
    if (!p.dryRun) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `${commandName} currently requires --dry-run; external agent execution is not enabled in loop v0.1.`,
      });
    }
    const loop = await resolveLoopForRun({
      commandCtx,
      taskId: p.taskId,
      loopId: p.loopId,
    });
    const record = await createDryRunLoopRun({
      projectRoot: commandCtx.resolvedProject.gitRoot,
      workflowDir: commandCtx.config.paths.workflow_dir,
      taskId: p.taskId,
      loop,
      prepareRunnerHandoff: async (step) => {
        if (step.type !== "agent.run") return null;
        const prepared = await prepareTaskRunnerExecution({
          ctx: commandCtx,
          cwd: commandCtx.resolvedProject.gitRoot,
          task_id: p.taskId,
          mode: "dry_run",
        });
        const paths = prepared.bundle.execution.artifact_paths;
        return {
          adapterId: prepared.bundle.execution.adapter_id,
          mode: prepared.bundle.execution.mode,
          runId: prepared.bundle.execution.run_id,
          runDir: paths.run_dir,
          bundlePath: paths.bundle_path,
          bootstrapPath: paths.bootstrap_path,
          resultPath: paths.result_path,
        };
      },
    });
    if (p.json) {
      process.stdout.write(`${JSON.stringify(record, null, 2)}\n`);
      return 0;
    }
    process.stdout.write(`loop_run: ${record.runId}\n`);
    process.stdout.write(`loop: ${record.loopId}@${record.loopVersion}\n`);
    process.stdout.write(`status: ${record.status}\n`);
    process.stdout.write(`artifacts: ${record.artifacts.runDir}\n`);
    return 0;
  };
}

export function makeRunLoopRunHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return makeRunLoopDryRunHandler("loop run", getCtx);
}

export function makeRunLoopStepHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return makeRunLoopDryRunHandler("loop step", getCtx);
}

export const runLoopValidate: CommandHandler<LoopValidateParsed> = async (ctx, p) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  if (p.project) {
    const result = await validateProjectLoopDirectory(
      p.path ? path.resolve(resolved.gitRoot, p.path) : projectLoopsDirectory(resolved.gitRoot),
    );
    if (p.json) {
      process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    } else if (result.ok) {
      process.stdout.write(
        `project loops valid: ${result.files.length} file${result.files.length === 1 ? "" : "s"}\n`,
      );
    } else {
      for (const error of result.errors) process.stderr.write(`${error.code}: ${error.message}\n`);
    }
    return result.ok ? 0 : 3;
  }
  if (!p.path) {
    throw new ValidationError({
      message: "Loop validate requires a file path unless --project is set.",
    });
  }
  const file = await validateProjectLoopFile(p.path);
  const validation = file.loop ? validateLoopSpec(file.loop) : file;
  const output = {
    ok: validation.ok,
    path: p.path,
    loop_id: file.loopId ?? null,
    errors: validation.errors,
  };
  if (p.json) {
    process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
  } else if (output.ok) {
    process.stdout.write(`loop valid: ${file.loopId}\n`);
  } else {
    for (const error of output.errors) process.stderr.write(`${error.code}: ${error.message}\n`);
  }
  return output.ok ? 0 : 3;
};
