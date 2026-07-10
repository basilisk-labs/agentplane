import type { BlueprintId, TaskKind, WorkflowMode } from "../blueprints/model.js";

export type LoopId = BuiltinLoopId | (string & {});

export type BuiltinLoopId =
  | "tdd.fix"
  | "ci.repair"
  | "docs.sync"
  | "security.review"
  | "context.harvest"
  | "workflow.recover"
  | "evaluator.quality-gate"
  | "loop.improve";

export type LoopKind =
  | "intake"
  | "planning"
  | "implementation"
  | "review"
  | "recovery"
  | "context"
  | "release"
  | "meta";

export type LoopStatus = "experimental" | "trusted" | "deprecated" | "blocked";

export type LoopStepType =
  | "context.load"
  | "prompt.render"
  | "agent.run"
  | "agent.review"
  | "check.run"
  | "evaluator.run"
  | "policy.check"
  | "git.diff"
  | "pr.check"
  | "pr.update"
  | "pr.wait_checks"
  | "task.route_status"
  | "task.next_action"
  | "command.run"
  | "context.propose"
  | "metrics.aggregate"
  | "metrics.compare"
  | "artifact.write"
  | "decision.route"
  | "human.approval";

export type LoopStopDecision =
  | "continue"
  | "retry_with_feedback"
  | "run_focused_check"
  | "expand_context"
  | "shrink_scope"
  | "request_human_review"
  | "block"
  | "finish"
  | "finish_noop"
  | "rollback"
  | "reject";

export type LoopPermission = boolean | "approval_required" | "disallowed" | "propose_only";

export type LoopBudgets = {
  maxIterations: number;
  maxWallTimeMinutes?: number;
  maxChangedFiles?: number;
  maxDiffLines?: number;
  maxAgentRuns?: number;
  maxInputTokens?: number;
  maxOutputTokens?: number;
  maxTotalTokens?: number;
  maxNoProgressIterations?: number;
};

export type LoopSpec = {
  schemaVersion: 1;
  id: LoopId;
  version: string;
  title: string;
  description: string;
  kind: LoopKind;
  status: LoopStatus;
  appliesTo: {
    blueprints?: readonly BlueprintId[];
    taskKinds?: readonly TaskKind[];
    taskTags?: readonly string[];
    workflowModes?: readonly WorkflowMode[];
  };
  requires?: {
    approvedPlan?: boolean;
    cleanWorktree?: boolean;
    verifyStepsPresent?: boolean;
    hostedPr?: boolean;
    ciFailure?: boolean;
  };
  permissions: Record<string, LoopPermission>;
  budgets: LoopBudgets;
  context?: {
    include?: readonly string[];
    exclude?: readonly string[];
  };
  metrics?: readonly LoopMetricDefinition[];
  steps: readonly LoopStep[];
  transitions: readonly LoopTransition[];
  outputs: {
    required: readonly string[];
  };
  stopConditions: readonly LoopStopCondition[];
};

export type LoopStep = {
  id: string;
  type: LoopStepType;
  title?: string;
  command?: string;
  promptModule?: string;
  evaluator?: string;
  contract?: LoopStepContract;
  when?: string;
  optional?: boolean;
};

export type LoopContractValueType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "json"
  | "path"
  | "ref";

export type LoopContractField = {
  id: string;
  type?: LoopContractValueType;
  required?: boolean;
  description?: string;
  source?: string;
};

export type LoopArtifactContract = {
  id: string;
  path?: string;
  required?: boolean;
  description?: string;
};

export type LoopStepContract = {
  schemaRef?: string;
  inputs?: readonly LoopContractField[];
  outputs?: readonly LoopContractField[];
  artifacts?: readonly LoopArtifactContract[];
};

export type LoopMetricSource = "rule" | "check" | "evaluator" | "aggregate";

export type LoopMetricDefinition = {
  id: string;
  source: LoopMetricSource;
  weight?: number;
  threshold?: number;
  required?: boolean;
  description?: string;
  refs?: readonly string[];
};

export type LoopMetricScore = {
  id: string;
  source: LoopMetricSource;
  score: number | null;
  weight: number;
  threshold?: number;
  passed: boolean | null;
  missing: boolean;
  reason?: string;
};

export type LoopMetricAggregate = {
  total: number;
  max: number;
  normalized: number;
  failedThresholds: readonly string[];
  missingRequired: readonly string[];
  scores: readonly LoopMetricScore[];
};

export type LoopTransition = {
  from?: string;
  if: string;
  to: string;
  decision: LoopStopDecision;
  feedback?: {
    include: readonly string[];
  };
};

export type LoopStopCondition = {
  id: string;
  reason: string;
  decision: Exclude<LoopStopDecision, "continue" | "retry_with_feedback">;
};

export type LoopValidationProblem = {
  code:
    | "duplicate_loop_id"
    | "duplicate_step_id"
    | "duplicate_stop_condition_id"
    | "empty_field"
    | "missing_step"
    | "missing_transition"
    | "missing_output"
    | "invalid_budget"
    | "invalid_step_contract"
    | "duplicate_contract_id"
    | "invalid_metric"
    | "duplicate_metric_id"
    | "unknown_transition_step"
    | "unknown_transition_condition";
  message: string;
  path?: string;
};

export type LoopValidationResult = {
  ok: boolean;
  errors: LoopValidationProblem[];
};

export type LoopRegistry = {
  loops: readonly LoopSpec[];
};

export type LoopPlanInput = {
  taskId?: string;
  title?: string;
  description?: string;
  tags: readonly string[];
  taskKind?: TaskKind;
  workflowMode?: WorkflowMode;
  blueprintId?: BlueprintId;
  verifyStepsPresent?: boolean;
  approvedPlan?: boolean;
  cleanWorktree?: boolean;
  hostedPr?: boolean;
  ciFailure?: boolean;
};

export type LoopCandidateScore = {
  loopId: LoopId;
  loopVersion: string;
  eligible: boolean;
  applicability: number;
  verificationFit: number;
  riskFit: number;
  contextFit: number;
  costFit: number;
  trustFit: number;
  total: number;
  reasons: readonly string[];
  rejectedReasons: readonly string[];
};

export type LoopPlan = {
  selected: LoopCandidateScore | null;
  candidates: readonly LoopCandidateScore[];
  rejected: readonly LoopCandidateScore[];
  input: LoopPlanInput;
};

export type LoopRunStatus = "prepared" | "running" | "passed" | "blocked" | "human_review";

export type LoopStepExecutionStatus = "success" | "failed" | "blocked" | "skipped";

export type LoopTokenUsage = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
};

export type LoopStepExecutionResult = {
  status: LoopStepExecutionStatus;
  summary?: string;
  data?: Record<string, unknown>;
  feedback?: readonly string[];
  usage?: Partial<LoopTokenUsage>;
  changedFiles?: number;
  diffLines?: number;
  progressScore?: number;
};

export type LoopBudgetUsage = LoopTokenUsage & {
  agentRuns: number;
  changedFiles: number;
  diffLines: number;
  noProgressIterations: number;
};

export type LoopCompletedStep = {
  iteration: number;
  stepId: string;
  attempt: number;
  outputPath: string;
  result: LoopStepExecutionResult;
};

export type LoopExecutionState = {
  schemaVersion: 1;
  taskId: string;
  runId: string;
  loopId: LoopId;
  loopVersion: string;
  loopSha: string;
  status: LoopRunStatus;
  startedAt: string;
  updatedAt: string;
  cursor: {
    iteration: number;
    stepId: string | null;
    stepIndex: number;
    attempt: number;
  };
  usage: LoopBudgetUsage;
  completedSteps: readonly LoopCompletedStep[];
  lastDecision?: LoopDecisionRecord;
  previousProgressScore?: number | null;
  stopReason?: string;
};

export type LoopPromptModuleIdentity = {
  id: string;
  moduleSha: string;
  renderedPromptSha?: string | null;
};

export type LoopStepArtifactRecord = {
  stepId: string;
  stepType: LoopStepType;
  inputPath: string;
  outputPath: string;
  promptModule?: LoopPromptModuleIdentity;
};

export type LoopRunRecord = {
  schemaVersion: 1;
  taskId: string;
  runId: string;
  loopId: LoopId;
  loopVersion: string;
  loopSha: string;
  dryRun: boolean;
  status: LoopRunStatus;
  startedAt: string;
  stoppedAt?: string;
  stopReason?: string;
  artifacts: {
    runDir: string;
    eventsPath: string;
    statePath: string;
    loopRunPath: string;
    iterationsDir: string;
    stepArtifacts?: readonly LoopStepArtifactRecord[];
  };
};

export type LoopEvent = {
  schemaVersion: 1;
  type: string;
  taskId: string;
  runId: string;
  loopId: LoopId;
  loopVersion: string;
  timestamp: string;
  details?: Record<string, unknown>;
};

export type LoopDecisionRecord = {
  schemaVersion: 1;
  kind: "loop.decision";
  decision: LoopStopDecision;
  reason: string;
  confidence: "low" | "medium" | "high";
  scores?: LoopMetricAggregate;
  scoreDelta?: number | null;
  failedContracts?: readonly string[];
  progressEvidence?: readonly string[];
  nextStep?: string;
  nextStepReason?: string;
  feedbackRefs: readonly string[];
  humanReviewRequired: boolean;
};
