import type { LoopExecutionState, LoopStepExecutionResult, LoopTransition } from "./model.js";

export type LoopConditionContext = {
  state: LoopExecutionState;
  latestByStep: ReadonlyMap<string, LoopStepExecutionResult>;
  current: LoopStepExecutionResult;
  budgetsExceeded: boolean;
};

type LoopConditionPredicate = (ctx: LoopConditionContext) => boolean;

function latest(ctx: LoopConditionContext, stepId: string): LoopStepExecutionResult | undefined {
  return ctx.latestByStep.get(stepId);
}

function value(result: LoopStepExecutionResult | undefined, key: string): unknown {
  return result?.data?.[key];
}

const CONDITIONS: Readonly<Record<string, LoopConditionPredicate>> = {
  "checks.ok && evaluator.verdict == 'pass'": (ctx) =>
    latest(ctx, "focused_check")?.status === "success" && value(ctx.current, "verdict") === "pass",
  "checks.failed && iteration < budgets.maxIterations": (ctx) =>
    latest(ctx, "focused_check")?.status === "failed" && !ctx.budgetsExceeded,
  "budgets.exceeded": (ctx) => ctx.budgetsExceeded,
  "remote_check.green": (ctx) => value(ctx.current, "green") === true,
  "local_check.failed && iteration < budgets.maxIterations": (ctx) =>
    ctx.current.status === "failed" && !ctx.budgetsExceeded,
  "classify_failure.kind == 'infra'": (ctx) => value(ctx.current, "kind") === "infra",
  "docs_build.ok && evaluator.verdict == 'pass'": (ctx) =>
    latest(ctx, "docs_build")?.status === "success" && value(ctx.current, "verdict") === "pass",
  "docs_build.failed && iteration < budgets.maxIterations": (ctx) =>
    ctx.current.status === "failed" && !ctx.budgetsExceeded,
  "evaluator.verdict == 'pass'": (ctx) => value(ctx.current, "verdict") === "pass",
  "evaluator.verdict == 'findings'": (ctx) => value(ctx.current, "verdict") === "findings",
  "verify_context.ok && evaluator.verdict == 'pass'": (ctx) =>
    latest(ctx, "verify_context")?.status === "success" && value(ctx.current, "verdict") === "pass",
  no_reusable_knowledge: (ctx) => value(ctx.current, "noReusableKnowledge") === true,
  "recheck.clean": (ctx) => value(ctx.current, "clean") === true,
  "classify_safety.requires_human": (ctx) => value(ctx.current, "requiresHuman") === true,
  "evaluator.verdict == 'rework'": (ctx) => value(ctx.current, "verdict") === "rework",
  "compare.candidate_better && no_policy_regression": (ctx) =>
    value(ctx.current, "candidateBetter") === true &&
    value(ctx.current, "policyRegression") !== true,
  "compare.regression_detected": (ctx) => value(ctx.current, "regressionDetected") === true,
};

export function isSupportedLoopCondition(condition: string): boolean {
  return Object.hasOwn(CONDITIONS, condition);
}

export function evaluateLoopTransition(
  transition: LoopTransition,
  context: LoopConditionContext,
): boolean {
  const predicate = CONDITIONS[transition.if];
  return predicate ? predicate(context) : false;
}
