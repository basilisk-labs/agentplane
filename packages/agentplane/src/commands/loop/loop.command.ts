import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { lstat, readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { resolveProject } from "@agentplaneorg/core/project";

import {
  createDryRunLoopRun,
  executeLoop,
  createLoopRegistry,
  getLoop,
  listLoops,
  planLoopForInput,
  projectLoopsDirectory,
  validateLoopSpec,
  validateProjectLoopDirectory,
  validateProjectLoopFile,
  type LoopPlanInput,
  type LoopSpec,
  type LoopStepExecutionResult,
  type LoopStepExecutorRegistry,
} from "../../loops/index.js";
import { applyTokenUsageEvent, createTokenAccumulator } from "../../harness/token-accounting.js";
import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { CliError, ValidationError } from "../../shared/errors.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { blueprintResolveInputFromTask, workflowModeFromConfig } from "../blueprint/task-input.js";
import {
  executeTaskRunnerExecution,
  prepareTaskRunnerExecution,
} from "../../runner/usecases/task-run.js";

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

const execFileAsync = promisify(execFile);

function sha256(value: string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

async function readRunnerTokenUsage(tracePath: string) {
  let raw = "";
  try {
    raw = await readFile(tracePath, "utf8");
  } catch {
    return { inputTokens: 0, outputTokens: 0, totalTokens: 0 };
  }
  let accumulator = createTokenAccumulator();
  for (const line of raw.split("\n")) {
    if (!line.trim()) continue;
    try {
      const parsed = JSON.parse(line) as unknown;
      if (!isRecord(parsed)) continue;
      const payload = isRecord(parsed.payload) ? parsed.payload : parsed;
      const threadId =
        typeof parsed.threadId === "string"
          ? parsed.threadId
          : typeof parsed.thread_id === "string"
            ? parsed.thread_id
            : "runner";
      const next = applyTokenUsageEvent(accumulator, { threadId, payload });
      if (next.accepted) accumulator = next.state;
    } catch {
      // Runner traces may contain provider-specific non-JSON lines. Ignore them deterministically.
    }
  }
  return accumulator.global;
}

function boundedText(value: unknown, max = 4000): string {
  const text = typeof value === "string" ? value : "";
  return text.length <= max ? text : `${text.slice(0, max)}\n[TRUNCATED]`;
}

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

async function runLoopList(ctx: CommandCtx, p: LoopListParsed): Promise<number> {
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
}

export function makeRunLoopListHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return runLoopList;
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

async function runLoopShow(ctx: CommandCtx, p: LoopShowParsed): Promise<number> {
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
}

export function makeRunLoopShowHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return runLoopShow;
}

async function runLoopExplain(ctx: CommandCtx, p: LoopExplainParsed): Promise<number> {
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
}

export function makeRunLoopExplainHandler(_getCtx: (cmd: string) => Promise<CommandContext>) {
  return runLoopExplain;
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
    approvedPlan: p.approvedPlan,
    cleanWorktree: p.cleanWorktree,
    hostedPr: p.hostedPr,
    ciFailure: p.ciFailure,
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
            approvedPlan: task.plan_approval?.state === "approved",
            hostedPr: false,
            ciFailure: false,
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
      approvedPlan: task.plan_approval?.state === "approved",
      hostedPr: false,
      ciFailure: false,
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

type LoadedLoopTask = Awaited<ReturnType<typeof loadTaskFromContext>>;

async function assertExecutableLoopRequirements(opts: {
  loop: LoopSpec;
  task: LoadedLoopTask;
  commandCtx: CommandContext;
}): Promise<void> {
  const missing: string[] = [];
  if (opts.loop.requires?.approvedPlan && opts.task.plan_approval?.state !== "approved") {
    missing.push("approved_plan");
  }
  if (opts.loop.requires?.verifyStepsPresent && (opts.task.verify ?? []).length === 0) {
    missing.push("verify_steps");
  }
  const workflowMode = workflowModeFromConfig(opts.commandCtx.config);
  if (
    opts.loop.appliesTo.workflowModes &&
    (!workflowMode || !opts.loop.appliesTo.workflowModes.includes(workflowMode))
  ) {
    missing.push("workflow_mode");
  }
  if (opts.loop.requires?.hostedPr) missing.push("hosted_pr_runtime_fact");
  if (opts.loop.requires?.ciFailure) missing.push("ci_failure_runtime_fact");
  if (opts.loop.requires?.cleanWorktree) {
    const { stdout } = await execFileAsync("git", ["status", "--porcelain=v1"], {
      cwd: opts.commandCtx.resolvedProject.gitRoot,
    });
    if (stdout.trim()) missing.push("clean_worktree");
  }
  if (missing.length > 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Loop ${opts.loop.id} is not eligible for execution: ${missing.join(", ")}.`,
    });
  }
}

function renderTddLoopPrompt(opts: {
  task: LoadedLoopTask;
  loop: LoopSpec;
  iteration: number;
  previousCheck?: LoopStepExecutionResult;
  previousEvaluator?: LoopStepExecutionResult;
}): string {
  const sections = opts.task.sections ?? {};
  const feedback = [
    boundedText(opts.previousCheck?.summary),
    boundedText(opts.previousCheck?.data?.stderr),
    boundedText(opts.previousCheck?.data?.stdout),
    boundedText(opts.previousEvaluator?.summary),
  ].filter(Boolean);
  return [
    `Loop: ${opts.loop.id}@${opts.loop.version}`,
    `Iteration: ${String(opts.iteration)} of ${String(opts.loop.budgets.maxIterations)}`,
    `Task: ${opts.task.id} ${opts.task.title}`,
    "",
    "Goal:",
    boundedText(opts.task.description, 6000),
    "",
    "Approved plan:",
    boundedText(sections.Plan, 8000),
    "",
    "Verification contract:",
    (opts.task.verify ?? []).map((command) => `- ${command}`).join("\n"),
    ...(feedback.length > 0 ? ["", "Previous iteration feedback:", ...feedback] : []),
    "",
    "Implement the smallest coherent change that satisfies the approved plan and verification contract.",
    "Do not run AgentPlane lifecycle, PR, integration, or finish commands. Return control after writing the runner result manifest.",
  ].join("\n");
}

function countUntrackedBudgetLines(contents: Buffer): number {
  if (contents.byteLength === 0) return 0;
  if (contents.includes(0)) return Math.max(1, Math.ceil(contents.byteLength / 80));
  const text = contents.toString("utf8");
  const lines = text.split(/\r?\n/).length;
  return text.endsWith("\n") ? lines - 1 : lines;
}

export async function collectGitDiffObservation(projectRoot: string) {
  const [{ stdout: numstat }, { stdout: trackedNames }, { stdout: untrackedNames }] =
    await Promise.all([
      execFileAsync("git", ["diff", "--numstat", "HEAD"], { cwd: projectRoot }),
      execFileAsync("git", ["diff", "--name-only", "-z", "HEAD"], { cwd: projectRoot }),
      execFileAsync("git", ["ls-files", "--others", "--exclude-standard", "-z"], {
        cwd: projectRoot,
      }),
    ]);
  let diffLines = 0;
  const changed = new Set<string>();
  const summaryLines = numstat.trim() ? [numstat.trim()] : [];
  for (const line of numstat.split("\n")) {
    if (!line.trim()) continue;
    const [added, deleted, file] = line.split("\t");
    if (file) changed.add(file);
    if (/^\d+$/.test(added ?? "")) diffLines += Number.parseInt(added!, 10);
    if (/^\d+$/.test(deleted ?? "")) diffLines += Number.parseInt(deleted!, 10);
  }
  for (const file of trackedNames.split("\0").filter(Boolean)) changed.add(file);
  for (const file of untrackedNames.split("\0").filter(Boolean)) {
    changed.add(file);
    const absolutePath = path.join(projectRoot, file);
    const stat = await lstat(absolutePath).catch(() => null);
    if (!stat) continue;
    const lineCount = stat.isSymbolicLink()
      ? 1
      : countUntrackedBudgetLines(await readFile(absolutePath));
    diffLines += lineCount;
    summaryLines.push(`${String(lineCount)}\t0\t${file} (untracked)`);
  }
  return {
    changedFiles: changed.size,
    diffLines,
    files: [...changed].toSorted(),
    summary: boundedText(summaryLines.join("\n"), 6000),
  };
}

function executableTddLoopExecutors(opts: {
  commandCtx: CommandContext;
  task: LoadedLoopTask;
  loop: LoopSpec;
}): LoopStepExecutorRegistry {
  const projectRoot = opts.commandCtx.resolvedProject.gitRoot;
  return {
    "context.load": () =>
      Promise.resolve({
        status: "success",
        summary: "Loaded compact task intent and verification references.",
        data: {
          contextRefs: opts.loop.context?.include ?? [],
          taskId: opts.task.id,
          title: opts.task.title,
          verifySteps: opts.task.verify ?? [],
        },
      }),
    "prompt.render": ({ iteration, step, latestByStep }) => {
      const prompt = renderTddLoopPrompt({
        task: opts.task,
        loop: opts.loop,
        iteration,
        previousCheck: latestByStep.get("focused_check"),
        previousEvaluator: latestByStep.get("evaluator"),
      });
      return Promise.resolve({
        status: "success",
        summary: `Rendered ${step.promptModule ?? "loop"} prompt.`,
        data: {
          renderedPrompt: prompt,
          renderedPromptSha: sha256(prompt),
          promptModule: step.promptModule ?? null,
          contextRefs: opts.loop.context?.include ?? [],
        },
      });
    },
    "agent.run": async ({ step, latestByStep }) => {
      const prompt = latestByStep.get("render_prompt")?.data;
      const renderedPrompt =
        typeof prompt?.renderedPrompt === "string" ? prompt.renderedPrompt : null;
      const renderedPromptSha =
        typeof prompt?.renderedPromptSha === "string" ? prompt.renderedPromptSha : null;
      const promptModule = typeof prompt?.promptModule === "string" ? prompt.promptModule : null;
      if (!renderedPrompt || !renderedPromptSha) {
        return { status: "blocked", summary: "agent.run requires a rendered prompt artifact" };
      }
      const executed = await executeTaskRunnerExecution({
        ctx: opts.commandCtx,
        cwd: projectRoot,
        task_id: opts.task.id,
        target: {
          kind: "loop_step",
          task_id: opts.task.id,
          loop_id: opts.loop.id,
          loop_version: opts.loop.version,
          step_id: step.id,
          step_type: step.type,
          prompt_module: promptModule,
          rendered_prompt: renderedPrompt,
          rendered_prompt_sha: renderedPromptSha,
          context_refs: [...(opts.loop.context?.include ?? [])],
          permissions: { ...opts.loop.permissions },
          budgets: { ...opts.loop.budgets },
          contract: step.contract ? { ...step.contract } : null,
        },
      });
      const usage = await readRunnerTokenUsage(executed.bundle.execution.artifact_paths.trace_path);
      return {
        status:
          executed.result.status === "success"
            ? "success"
            : executed.result.status === "blocked"
              ? "blocked"
              : "failed",
        summary: executed.result.summary,
        usage,
        changedFiles: executed.result.evidence?.files_changed_count,
        data: {
          runnerRunId: executed.bundle.execution.run_id,
          runnerStatus: executed.result.status,
          resultPath: executed.bundle.execution.artifact_paths.result_path,
          findings: executed.result.findings ?? [],
        },
      };
    },
    "git.diff": async () => {
      const diff = await collectGitDiffObservation(projectRoot);
      return {
        status: "success",
        summary: diff.summary,
        changedFiles: diff.changedFiles,
        diffLines: diff.diffLines,
        data: { files: diff.files, summary: diff.summary },
      };
    },
    "check.run": async () => {
      const commands = opts.task.verify ?? [];
      if (commands.length === 0) {
        return { status: "blocked", summary: "No runnable Verify Steps are attached to the task." };
      }
      for (const command of commands) {
        try {
          const result = await execFileAsync("/bin/sh", ["-lc", command], {
            cwd: projectRoot,
            timeout: Math.min((opts.loop.budgets.maxWallTimeMinutes ?? 10) * 60_000, 15 * 60_000),
            maxBuffer: 4 * 1024 * 1024,
          });
          if (result.stderr.trim()) {
            // Preserve stderr as evidence even when the command exits successfully.
          }
        } catch (error) {
          const failure = error as Error & { stdout?: string; stderr?: string; code?: number };
          return {
            status: "failed",
            summary: `Verification failed: ${command}`,
            feedback: [boundedText(failure.stderr), boundedText(failure.stdout)].filter(Boolean),
            data: {
              ok: false,
              command,
              exitCode: typeof failure.code === "number" ? failure.code : null,
              stdout: boundedText(failure.stdout),
              stderr: boundedText(failure.stderr),
            },
          };
        }
      }
      return {
        status: "success",
        summary: `${String(commands.length)} verification command(s) passed.`,
        data: { ok: true, commands },
      };
    },
    "evaluator.run": ({ latestByStep }) => Promise.resolve(evaluateTddIteration(latestByStep)),
  };
}

export function evaluateTddIteration(
  latestByStep: ReadonlyMap<string, LoopStepExecutionResult>,
): LoopStepExecutionResult {
  const agent = latestByStep.get("agent_patch");
  const check = latestByStep.get("focused_check");
  const diff = latestByStep.get("capture_diff");
  const pass = agent?.status === "success" && check?.status === "success";
  return {
    status: "success",
    summary: pass ? "Deterministic verification passed." : "Verification requires rework.",
    progressScore: pass ? 1 : 0,
    data: {
      verdict: pass ? "pass" : "rework",
      agentStatus: agent?.status ?? "missing",
      checkStatus: check?.status ?? "missing",
      diffLines: diff?.diffLines ?? 0,
      changedFiles: diff?.changedFiles ?? 0,
    },
  };
}

function makeRunLoopDryRunHandler(
  commandName: string,
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (_ctx: CommandCtx, p: LoopRunParsed): Promise<number> => {
    const commandCtx = await getCtx(commandName);
    const executableMode = p.execute || Boolean(p.resumeRunId);
    if (commandName === "loop step" && executableMode) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "loop step supports --dry-run or --execute-agent-step; use loop run for --execute/--resume.",
      });
    }
    if (p.dryRun && p.executeAgentStep) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `${commandName} accepts either --dry-run or --execute-agent-step, not both.`,
      });
    }
    if (!p.dryRun && !p.executeAgentStep && !executableMode) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `${commandName} requires --dry-run, --execute-agent-step, --execute, or --resume.`,
      });
    }
    const loop = await resolveLoopForRun({
      commandCtx,
      taskId: p.taskId,
      loopId: p.loopId,
    });
    if (executableMode) {
      const task = await loadTaskFromContext({ ctx: commandCtx, taskId: p.taskId });
      await assertExecutableLoopRequirements({ loop, task, commandCtx });
      const state = await executeLoop({
        projectRoot: commandCtx.resolvedProject.gitRoot,
        workflowDir: commandCtx.config.paths.workflow_dir,
        taskId: p.taskId,
        loop,
        executors: executableTddLoopExecutors({ commandCtx, task, loop }),
        runId: p.resumeRunId,
      });
      if (p.json) {
        process.stdout.write(`${JSON.stringify(state, null, 2)}\n`);
      } else {
        process.stdout.write(`loop_run: ${state.runId}\n`);
        process.stdout.write(`loop: ${state.loopId}@${state.loopVersion}\n`);
        process.stdout.write(`status: ${state.status}\n`);
        process.stdout.write(`iteration: ${String(state.cursor.iteration)}\n`);
        process.stdout.write(`tokens: ${String(state.usage.totalTokens)}\n`);
        if (state.stopReason) process.stdout.write(`stop_reason: ${state.stopReason}\n`);
      }
      return state.status === "passed" ? 0 : 3;
    }
    let executedAgentStep = false;
    const record = await createDryRunLoopRun({
      projectRoot: commandCtx.resolvedProject.gitRoot,
      workflowDir: commandCtx.config.paths.workflow_dir,
      taskId: p.taskId,
      loop,
      executionMode: p.executeAgentStep ? "execute_agent_step" : "dry_run",
      prepareRunnerHandoff: async (step) => {
        if (step.type !== "agent.run") return null;
        if (p.executeAgentStep && !executedAgentStep) {
          executedAgentStep = true;
          const executed = await executeTaskRunnerExecution({
            ctx: commandCtx,
            cwd: commandCtx.resolvedProject.gitRoot,
            task_id: p.taskId,
            target: {
              kind: "loop_step",
              task_id: p.taskId,
              loop_id: loop.id,
              loop_version: loop.version,
              step_id: step.id,
              step_type: step.type,
              prompt_module: step.promptModule ?? null,
              contract: step.contract ? { ...step.contract } : null,
            },
          });
          const paths = executed.bundle.execution.artifact_paths;
          return {
            adapterId: executed.bundle.execution.adapter_id,
            mode: executed.bundle.execution.mode,
            runId: executed.bundle.execution.run_id,
            runDir: paths.run_dir,
            bundlePath: paths.bundle_path,
            bootstrapPath: paths.bootstrap_path,
            resultPath: paths.result_path,
            resultStatus: executed.result.status,
            exitCode: executed.result.exit_code,
            resultSummary: executed.result.summary,
            stderrSummary: executed.result.stderr_summary,
          };
        }
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
