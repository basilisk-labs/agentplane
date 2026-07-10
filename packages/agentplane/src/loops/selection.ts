import type {
  LoopCandidateScore,
  LoopPlan,
  LoopPlanInput,
  LoopRegistry,
  LoopSpec,
} from "./model.js";
import { createLoopRegistry, listLoops } from "./registry.js";

function overlapScore(
  inputValues: readonly string[] | undefined,
  loopValues: readonly string[],
): number {
  if (!inputValues || inputValues.length === 0 || loopValues.length === 0) return 0;
  const input = new Set(inputValues.map((value) => value.toLowerCase()));
  const matches = loopValues.filter((value) => input.has(value.toLowerCase())).length;
  return Math.min(1, matches / Math.max(1, Math.min(input.size, loopValues.length)));
}

function includesScore<T extends string>(
  value: T | undefined,
  values: readonly T[] | undefined,
): number {
  if (!value || !values || values.length === 0) return 0;
  return values.includes(value) ? 1 : 0;
}

export function scoreLoopCandidate(loop: LoopSpec, input: LoopPlanInput): LoopCandidateScore {
  const reasons: string[] = [];
  const rejectedReasons: string[] = [];
  const tagScore = overlapScore(input.tags, loop.appliesTo.taskTags ?? []);
  const kindScore = includesScore(input.taskKind, loop.appliesTo.taskKinds);
  const blueprintScore = includesScore(input.blueprintId, loop.appliesTo.blueprints);
  const workflowScore = includesScore(input.workflowMode, loop.appliesTo.workflowModes);
  const requiredFacts = [
    ["approved plan", loop.requires?.approvedPlan, input.approvedPlan],
    ["clean worktree", loop.requires?.cleanWorktree, input.cleanWorktree],
    ["verify steps", loop.requires?.verifyStepsPresent, input.verifyStepsPresent],
    ["hosted PR", loop.requires?.hostedPr, input.hostedPr],
    ["CI failure", loop.requires?.ciFailure, input.ciFailure],
  ] as const;
  for (const [label, required, present] of requiredFacts) {
    if (required === true && present !== true) rejectedReasons.push(`loop requires ${label}`);
  }
  const eligible = rejectedReasons.length === 0 && loop.status !== "blocked";
  const specificMatchScore = Math.max(tagScore, blueprintScore);
  const applicability =
    specificMatchScore > 0 ? Math.max(specificMatchScore, kindScore) : kindScore * 0.35;
  const verificationFit = loop.requires?.verifyStepsPresent
    ? input.verifyStepsPresent
      ? 1
      : 0
    : 0.75;
  const riskFit = loop.status === "blocked" ? 0 : loop.status === "deprecated" ? 0.25 : 1;
  const contextFit = loop.context?.include && loop.context.include.length > 0 ? 0.9 : 0.75;
  const costFit = loop.budgets.maxIterations <= 5 ? 1 : 0.6;
  const trustFit = loop.status === "trusted" ? 1 : loop.status === "experimental" ? 0.75 : 0;
  const workflowPenalty =
    loop.appliesTo.workflowModes && input.workflowMode && workflowScore === 0 ? 0.4 : 1;
  const rawTotal =
    (applicability * 0.35 +
      verificationFit * 0.2 +
      riskFit * 0.15 +
      contextFit * 0.1 +
      costFit * 0.1 +
      trustFit * 0.1) *
    workflowPenalty;
  const total = eligible ? (specificMatchScore === 0 ? rawTotal * 0.5 : rawTotal) : 0;

  if (tagScore > 0) reasons.push("task tags match loop tags");
  if (kindScore > 0) reasons.push(`task kind matches ${input.taskKind}`);
  if (blueprintScore > 0) reasons.push(`blueprint matches ${input.blueprintId}`);
  if (workflowScore > 0) reasons.push(`workflow mode matches ${input.workflowMode}`);
  if (input.verifyStepsPresent && loop.requires?.verifyStepsPresent) {
    reasons.push("verify steps satisfy loop requirement");
  }
  if (specificMatchScore === 0 && kindScore > 0) {
    rejectedReasons.push("only broad task kind matches");
  }
  if (applicability === 0) rejectedReasons.push("no tag, task kind, or blueprint match");
  if (loop.status === "blocked") rejectedReasons.push("loop status is blocked");
  if (workflowPenalty < 1) rejectedReasons.push("workflow mode does not match loop");

  return {
    loopId: loop.id,
    loopVersion: loop.version,
    eligible,
    applicability,
    verificationFit,
    riskFit,
    contextFit,
    costFit,
    trustFit,
    total: Number(total.toFixed(3)),
    reasons,
    rejectedReasons,
  };
}

export function planLoopForInput(opts: {
  input: LoopPlanInput;
  registry?: LoopRegistry;
  threshold?: number;
}): LoopPlan {
  const threshold = opts.threshold ?? 0.45;
  const candidates = listLoops(opts.registry ?? createLoopRegistry())
    .map((loop) => scoreLoopCandidate(loop, opts.input))
    .toSorted((left, right) => right.total - left.total || left.loopId.localeCompare(right.loopId));
  const selected = candidates.find((candidate) => candidate.total >= threshold) ?? null;
  return {
    selected,
    candidates: candidates.filter((candidate) => candidate.total >= threshold),
    rejected: candidates.filter((candidate) => candidate.total < threshold),
    input: opts.input,
  };
}
