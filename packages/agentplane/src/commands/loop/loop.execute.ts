import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { lstat, readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  type LoopSpec,
  type LoopStepExecutionResult,
  type LoopStepExecutorRegistry,
} from "../../loops/index.js";
import { applyTokenUsageEvent, createTokenAccumulator } from "../../harness/token-accounting.js";
import { executeTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import { CliError } from "../../shared/errors.js";
import { workflowModeFromConfig } from "../blueprint/task-input.js";
import type { loadTaskFromContext, CommandContext } from "../shared/task-backend.js";

const execFileAsync = promisify(execFile);
type LoadedLoopTask = Awaited<ReturnType<typeof loadTaskFromContext>>;

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

export async function assertExecutableLoopRequirements(opts: {
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

export function buildExecutableTddLoopExecutors(opts: {
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
