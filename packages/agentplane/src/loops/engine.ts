import { createHash, randomUUID } from "node:crypto";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";

import { evaluateLoopTransition } from "./conditions.js";
import type {
  LoopBudgetUsage,
  LoopCompletedStep,
  LoopDecisionRecord,
  LoopExecutionState,
  LoopSpec,
  LoopStep,
  LoopStepExecutionResult,
  LoopStepType,
  LoopTokenUsage,
  LoopTransition,
} from "./model.js";

export type LoopStepExecutionContext = {
  projectRoot: string;
  taskId: string;
  runId: string;
  runDir: string;
  iteration: number;
  attempt: number;
  loop: LoopSpec;
  step: LoopStep;
  state: LoopExecutionState;
  latestByStep: ReadonlyMap<string, LoopStepExecutionResult>;
};

export type LoopStepExecutor = (
  context: LoopStepExecutionContext,
) => Promise<LoopStepExecutionResult>;

export type LoopStepExecutorRegistry = Partial<Record<LoopStepType, LoopStepExecutor>>;

export type ExecuteLoopOptions = {
  projectRoot: string;
  workflowDir: string;
  taskId: string;
  loop: LoopSpec;
  executors: LoopStepExecutorRegistry;
  runId?: string;
  now?: () => Date;
};

const ZERO_USAGE: LoopBudgetUsage = {
  inputTokens: 0,
  outputTokens: 0,
  totalTokens: 0,
  agentRuns: 0,
  changedFiles: 0,
  diffLines: 0,
  noProgressIterations: 0,
};

function sha256(value: string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function iterationName(iteration: number): string {
  return String(iteration).padStart(3, "0");
}

function runPaths(opts: ExecuteLoopOptions, runId: string) {
  const relativeRunDir = path.join(opts.workflowDir, opts.taskId, "runs", runId);
  const runDir = path.join(opts.projectRoot, relativeRunDir);
  return {
    relativeRunDir,
    runDir,
    statePath: path.join(runDir, "state.json"),
    eventsPath: path.join(runDir, "events.jsonl"),
    loopRunPath: path.join(runDir, "loop-run.json"),
  };
}

function latestResults(state: LoopExecutionState): Map<string, LoopStepExecutionResult> {
  const latest = new Map<string, LoopStepExecutionResult>();
  for (const completed of state.completedSteps) latest.set(completed.stepId, completed.result);
  return latest;
}

function normalizedUsage(usage: Partial<LoopTokenUsage> | undefined): LoopTokenUsage {
  const inputTokens = Math.max(0, Math.trunc(usage?.inputTokens ?? 0));
  const outputTokens = Math.max(0, Math.trunc(usage?.outputTokens ?? 0));
  return {
    inputTokens,
    outputTokens,
    totalTokens: Math.max(0, Math.trunc(usage?.totalTokens ?? inputTokens + outputTokens)),
  };
}

function applyResultUsage(
  usage: LoopBudgetUsage,
  step: LoopStep,
  result: LoopStepExecutionResult,
): LoopBudgetUsage {
  const tokens = normalizedUsage(result.usage);
  return {
    inputTokens: usage.inputTokens + tokens.inputTokens,
    outputTokens: usage.outputTokens + tokens.outputTokens,
    totalTokens: usage.totalTokens + tokens.totalTokens,
    agentRuns:
      usage.agentRuns + (step.type === "agent.run" || step.type === "agent.review" ? 1 : 0),
    changedFiles: Math.max(usage.changedFiles, Math.max(0, result.changedFiles ?? 0)),
    diffLines: Math.max(usage.diffLines, Math.max(0, result.diffLines ?? 0)),
    noProgressIterations: usage.noProgressIterations,
  };
}

function budgetReasons(loop: LoopSpec, state: LoopExecutionState, now: Date): string[] {
  const reasons: string[] = [];
  const budgets = loop.budgets;
  if (state.cursor.iteration > budgets.maxIterations) reasons.push("max_iterations");
  if (budgets.maxAgentRuns !== undefined && state.usage.agentRuns >= budgets.maxAgentRuns) {
    reasons.push("max_agent_runs");
  }
  if (budgets.maxChangedFiles !== undefined && state.usage.changedFiles > budgets.maxChangedFiles) {
    reasons.push("max_changed_files");
  }
  if (budgets.maxDiffLines !== undefined && state.usage.diffLines > budgets.maxDiffLines) {
    reasons.push("max_diff_lines");
  }
  if (budgets.maxInputTokens !== undefined && state.usage.inputTokens >= budgets.maxInputTokens) {
    reasons.push("max_input_tokens");
  }
  if (
    budgets.maxOutputTokens !== undefined &&
    state.usage.outputTokens >= budgets.maxOutputTokens
  ) {
    reasons.push("max_output_tokens");
  }
  if (budgets.maxTotalTokens !== undefined && state.usage.totalTokens >= budgets.maxTotalTokens) {
    reasons.push("max_total_tokens");
  }
  if (
    budgets.maxNoProgressIterations !== undefined &&
    state.usage.noProgressIterations >= budgets.maxNoProgressIterations
  ) {
    reasons.push("max_no_progress_iterations");
  }
  if (budgets.maxWallTimeMinutes !== undefined) {
    const elapsed = now.getTime() - Date.parse(state.startedAt);
    if (elapsed >= budgets.maxWallTimeMinutes * 60_000) reasons.push("max_wall_time");
  }
  return reasons;
}

function budgetReasonsBeforeStep(
  loop: LoopSpec,
  state: LoopExecutionState,
  step: LoopStep,
  now: Date,
): string[] {
  const reasons = budgetReasons(loop, state, now);
  if (step.type === "agent.run" || step.type === "agent.review") return reasons;
  return reasons.filter(
    (reason) =>
      reason !== "max_agent_runs" &&
      reason !== "max_input_tokens" &&
      reason !== "max_output_tokens" &&
      reason !== "max_total_tokens",
  );
}

function permissionProblem(loop: LoopSpec, step: LoopStep): string | null {
  if (
    (step.type === "agent.run" || step.type === "agent.review") &&
    loop.permissions.canEditFiles === false
  ) {
    return step.type === "agent.run" ? "agent_run_requires_canEditFiles" : null;
  }
  if (
    (step.type === "check.run" || step.type === "command.run") &&
    loop.permissions.canRunCommands === false
  ) {
    return "command_step_requires_canRunCommands";
  }
  return null;
}

async function writeJson(filePath: string, value: unknown): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true });
  await atomicWriteFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function readStepResult(filePath: string): Promise<LoopStepExecutionResult | null> {
  try {
    const parsed = JSON.parse(await readFile(filePath, "utf8")) as Record<string, unknown>;
    const status = parsed.status;
    if (
      status !== "success" &&
      status !== "failed" &&
      status !== "blocked" &&
      status !== "skipped"
    ) {
      return null;
    }
    const { schemaVersion: _schemaVersion, kind: _kind, ...result } = parsed;
    return result as LoopStepExecutionResult;
  } catch {
    return null;
  }
}

async function appendEvent(
  eventsPath: string,
  state: LoopExecutionState,
  type: string,
  details: Record<string, unknown>,
): Promise<void> {
  await mkdir(path.dirname(eventsPath), { recursive: true });
  await appendFile(
    eventsPath,
    `${JSON.stringify({
      schemaVersion: 1,
      type,
      taskId: state.taskId,
      runId: state.runId,
      loopId: state.loopId,
      loopVersion: state.loopVersion,
      timestamp: state.updatedAt,
      details,
    })}\n`,
    "utf8",
  );
}

async function persistState(paths: ReturnType<typeof runPaths>, state: LoopExecutionState) {
  await writeJson(paths.statePath, state);
  await writeJson(paths.loopRunPath, {
    schemaVersion: 1,
    taskId: state.taskId,
    runId: state.runId,
    loopId: state.loopId,
    loopVersion: state.loopVersion,
    loopSha: state.loopSha,
    dryRun: false,
    status: state.status,
    startedAt: state.startedAt,
    stoppedAt: state.status === "running" ? undefined : state.updatedAt,
    stopReason: state.stopReason,
    usage: state.usage,
    cursor: state.cursor,
    artifacts: {
      runDir: paths.relativeRunDir,
      eventsPath: path.join(paths.relativeRunDir, "events.jsonl"),
      statePath: path.join(paths.relativeRunDir, "state.json"),
      loopRunPath: path.join(paths.relativeRunDir, "loop-run.json"),
      iterationsDir: path.join(paths.relativeRunDir, "iterations"),
    },
  });
}

async function loadOrCreateState(
  opts: ExecuteLoopOptions,
  runId: string,
  paths: ReturnType<typeof runPaths>,
): Promise<{ state: LoopExecutionState; resumed: boolean }> {
  const loopSha = sha256(JSON.stringify(opts.loop));
  if (opts.runId) {
    const parsed = JSON.parse(await readFile(paths.statePath, "utf8")) as LoopExecutionState;
    if (parsed.taskId !== opts.taskId || parsed.loopSha !== loopSha) {
      throw new Error("Loop resume state does not match the requested task or LoopSpec digest.");
    }
    if (parsed.status !== "running") {
      throw new Error(`LoopRun ${parsed.runId} is already terminal (${parsed.status}).`);
    }
    return { state: { ...parsed, status: "running" }, resumed: true };
  }
  const now = (opts.now ?? (() => new Date()))().toISOString();
  return {
    resumed: false,
    state: {
      schemaVersion: 1,
      taskId: opts.taskId,
      runId,
      loopId: opts.loop.id,
      loopVersion: opts.loop.version,
      loopSha,
      status: "running",
      startedAt: now,
      updatedAt: now,
      cursor: { iteration: 1, stepId: opts.loop.steps[0]?.id ?? null, stepIndex: 0, attempt: 1 },
      usage: { ...ZERO_USAGE },
      completedSteps: [],
      previousProgressScore: null,
    },
  };
}

function selectTransition(
  loop: LoopSpec,
  step: LoopStep,
  state: LoopExecutionState,
  result: LoopStepExecutionResult,
  budgetsExceeded: boolean,
): LoopTransition | null {
  const latestByStep = latestResults(state);
  return (
    loop.transitions.find(
      (transition) =>
        transition.from === step.id &&
        evaluateLoopTransition(transition, {
          state,
          latestByStep,
          current: result,
          budgetsExceeded,
        }),
    ) ?? null
  );
}

function decisionFor(
  transition: LoopTransition,
  reason: string,
  humanReviewRequired = false,
): LoopDecisionRecord {
  return {
    schemaVersion: 1,
    kind: "loop.decision",
    decision: transition.decision,
    reason,
    confidence: "high",
    feedbackRefs: transition.feedback?.include ?? [],
    humanReviewRequired,
    nextStep: transition.to,
    nextStepReason: reason,
  };
}

export async function executeLoop(opts: ExecuteLoopOptions): Promise<LoopExecutionState> {
  if (opts.loop.id !== "tdd.fix") {
    throw new Error(
      `Executable loop runtime currently supports only tdd.fix (received ${opts.loop.id}).`,
    );
  }
  const now = opts.now ?? (() => new Date());
  const generatedRunId = `loop-${now().toISOString().replaceAll(/[:.]/g, "-")}-${randomUUID().slice(0, 8)}`;
  const runId = opts.runId ?? generatedRunId;
  const paths = runPaths(opts, runId);
  await mkdir(paths.runDir, { recursive: true });
  let { state, resumed } = await loadOrCreateState(opts, runId, paths);
  state = { ...state, updatedAt: now().toISOString() };
  await persistState(paths, state);
  await appendEvent(paths.eventsPath, state, resumed ? "loop.resumed" : "loop.started", {
    cursor: state.cursor,
  });

  while (state.status === "running") {
    const currentStep = opts.loop.steps[state.cursor.stepIndex];
    if (!currentStep) {
      state = {
        ...state,
        status: "human_review",
        stopReason: "no_transition_from_last_step",
        updatedAt: now().toISOString(),
      };
      break;
    }

    const beforeBudgetReasons = budgetReasonsBeforeStep(opts.loop, state, currentStep, now());
    const permission = permissionProblem(opts.loop, currentStep);
    if (beforeBudgetReasons.length > 0 || permission) {
      state = {
        ...state,
        status: "blocked",
        stopReason: permission ?? beforeBudgetReasons.join(","),
        updatedAt: now().toISOString(),
      };
      await appendEvent(paths.eventsPath, state, "loop.blocked", {
        reason: state.stopReason ?? "budget_or_permission",
      });
      break;
    }

    const executor = opts.executors[currentStep.type];
    if (!executor) {
      state = {
        ...state,
        status: "human_review",
        stopReason: `unsupported_step_type:${currentStep.type}`,
        updatedAt: now().toISOString(),
      };
      break;
    }

    const iterationDir = path.join(
      paths.runDir,
      "iterations",
      iterationName(state.cursor.iteration),
    );
    const stepDir = path.join(iterationDir, "steps", currentStep.id);
    const inputPath = path.join(stepDir, "input.json");
    const outputPath = path.join(stepDir, "output.json");
    const recorded = state.completedSteps.find(
      (completed) =>
        completed.iteration === state.cursor.iteration &&
        completed.stepId === currentStep.id &&
        completed.attempt === state.cursor.attempt,
    );
    const recoveredResult = recorded?.result ?? (await readStepResult(outputPath));
    let result: LoopStepExecutionResult;
    if (recoveredResult) {
      result = recoveredResult;
      await appendEvent(paths.eventsPath, state, "step.recovered", {
        step_id: currentStep.id,
        iteration: state.cursor.iteration,
        attempt: state.cursor.attempt,
        source: recorded ? "state" : "output_artifact",
      });
    } else {
      await writeJson(inputPath, {
        schemaVersion: 1,
        kind: "loop.step.input",
        iteration: state.cursor.iteration,
        attempt: state.cursor.attempt,
        step: currentStep,
        usage: state.usage,
      });
      await appendEvent(paths.eventsPath, state, "step.started", {
        step_id: currentStep.id,
        iteration: state.cursor.iteration,
        attempt: state.cursor.attempt,
      });
      result = await executor({
        projectRoot: opts.projectRoot,
        taskId: opts.taskId,
        runId,
        runDir: paths.runDir,
        iteration: state.cursor.iteration,
        attempt: state.cursor.attempt,
        loop: opts.loop,
        step: currentStep,
        state,
        latestByStep: latestResults(state),
      });
      await writeJson(outputPath, { schemaVersion: 1, kind: "loop.step.output", ...result });
    }

    let usage = recorded ? state.usage : applyResultUsage(state.usage, currentStep, result);
    let previousProgressScore = state.previousProgressScore ?? null;
    if (result.progressScore !== undefined) {
      const improved =
        previousProgressScore === null || result.progressScore > previousProgressScore;
      usage = {
        ...usage,
        noProgressIterations: improved ? 0 : usage.noProgressIterations + 1,
      };
      previousProgressScore = result.progressScore;
    }
    const completed: LoopCompletedStep = recorded ?? {
      iteration: state.cursor.iteration,
      stepId: currentStep.id,
      attempt: state.cursor.attempt,
      outputPath: path.relative(opts.projectRoot, outputPath),
      result,
    };
    state = {
      ...state,
      usage,
      previousProgressScore,
      completedSteps: recorded ? state.completedSteps : [...state.completedSteps, completed],
      updatedAt: now().toISOString(),
    };
    if (result.status === "blocked") {
      state = {
        ...state,
        status: "blocked",
        stopReason: result.summary ?? `step_blocked:${currentStep.id}`,
      };
      await persistState(paths, state);
      await appendEvent(paths.eventsPath, state, "loop.blocked", {
        step_id: currentStep.id,
        reason: state.stopReason,
      });
      continue;
    }
    await appendEvent(paths.eventsPath, state, "step.completed", {
      step_id: currentStep.id,
      iteration: state.cursor.iteration,
      status: result.status,
      usage: result.usage ?? null,
    });

    const afterBudgetReasons = budgetReasons(opts.loop, state, now());
    const transition = selectTransition(
      opts.loop,
      currentStep,
      state,
      result,
      afterBudgetReasons.length > 0,
    );

    if (transition) {
      const reason =
        transition.if === "budgets.exceeded" && afterBudgetReasons.length > 0
          ? `budget:${afterBudgetReasons.join(",")}`
          : `condition:${transition.if}`;
      const humanReviewRequired = transition.decision === "request_human_review";
      const decision = decisionFor(transition, reason, humanReviewRequired);
      await writeJson(path.join(iterationDir, "decision.json"), decision);
      await appendEvent(paths.eventsPath, state, "decision.made", { ...decision });
      switch (transition.decision) {
        case "finish":
        case "finish_noop": {
          state = { ...state, status: "passed", lastDecision: decision, stopReason: reason };
          break;
        }
        case "block":
        case "rollback": {
          state = { ...state, status: "blocked", lastDecision: decision, stopReason: reason };
          break;
        }
        case "request_human_review":
        case "reject": {
          state = { ...state, status: "human_review", lastDecision: decision, stopReason: reason };
          break;
        }
        case "retry_with_feedback": {
          const nextIndex = opts.loop.steps.findIndex(
            (candidate) => candidate.id === transition.to,
          );
          state = {
            ...state,
            lastDecision: decision,
            cursor: {
              iteration: state.cursor.iteration + 1,
              stepId: transition.to,
              stepIndex: nextIndex,
              attempt: state.cursor.attempt + 1,
            },
          };
          break;
        }
        default: {
          const nextIndex = opts.loop.steps.findIndex(
            (candidate) => candidate.id === transition.to,
          );
          state = {
            ...state,
            lastDecision: decision,
            cursor: { ...state.cursor, stepId: transition.to, stepIndex: nextIndex },
          };
        }
      }
    } else {
      const nextIndex = state.cursor.stepIndex + 1;
      state = {
        ...state,
        cursor: {
          ...state.cursor,
          stepIndex: nextIndex,
          stepId: opts.loop.steps[nextIndex]?.id ?? null,
        },
      };
    }
    state = { ...state, updatedAt: now().toISOString() };
    await persistState(paths, state);
  }

  state = { ...state, updatedAt: now().toISOString() };
  await persistState(paths, state);
  await appendEvent(paths.eventsPath, state, "loop.stopped", {
    status: state.status,
    reason: state.stopReason ?? "unknown",
    usage: state.usage,
  });
  return state;
}
