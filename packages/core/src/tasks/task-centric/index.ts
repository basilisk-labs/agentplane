export {
  createRepositorySnapshot,
  isGitObjectId,
  isSha256Digest,
  taskCentricDigest,
} from "./digest.js";
export {
  belongsInLiveTaskIndex,
  compatibilityRoleToSemanticWorkKind,
  createLegacyTaskAggregate,
  legacyStatusToTaskLifecycle,
  projectTaskLifecycleToLegacyStatus,
  taskCentricAggregateFromExtensions,
  taskCentricReplanRequiredFromExtensions,
  TASK_CENTRIC_EXTENSION_KEY,
  TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY,
  withTaskCentricAggregate,
  type ArchivedTaskManifest,
  type LiveTaskIndexEntry,
} from "./compatibility.js";
export {
  approveTaskPlan,
  computeReadyWorkItems,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  reconcileReplacementPlanWorkItems,
  requiredOutputManifestsPresent,
  requiredOutputsSatisfied,
  resourceClaimsConflict,
  validateTaskPlanProposal,
  validateWorkItemGraph,
  WorkItemScheduler,
  type GraphValidationIssue,
  type ReplacementPlanWorkItemRecoveryEvidence,
  type WorkItemReadiness,
} from "./graph.js";
export {
  aggregateValidation,
  assertTaskTransition,
  assertWorkItemTransition,
  evaluateTaskCompletion,
  LifecycleEngine,
  type CompletionEvaluation,
} from "./lifecycle.js";
export {
  applyPlanRefinement,
  classifyPlanChange,
  consumeRetryBudget,
  createHumanDecisionTicket,
  decideConfirmation,
  dispositionForOutcome,
  recoveryDecisionForFailure,
  validateHumanDecisionAnswer,
  type ConfirmationFacts,
  type PlanChangeClassification,
  type PlanRefinementApplication,
  type SupervisionOutcome,
} from "./policy.js";
export {
  TaskCentricOrchestrator,
  type TaskCentricOrchestratorPorts,
  type TaskLoopOutcome,
} from "./orchestrator.js";
export {
  assertAutonomousRepositoryCapabilities,
  type ArtifactPort,
  type ContentActorPort,
  type ContextPort,
  type GitEffectResult,
  type GitObservation,
  type GitPort,
  type ProviderEffectResult,
  type ProviderObservation,
  type ProviderPort,
  type TaskRepositoryCapabilities,
  type TaskRepositoryPort,
  type ValidationPort,
  type WorkspaceObservation,
  type WorkspacePort,
} from "./ports.js";
export {
  parseTaskPlanProposal,
  REPOSITORY_SNAPSHOT_ZOD_SCHEMA,
  TASK_PLAN_PROPOSAL_ZOD_SCHEMA,
  type ParsedTaskPlanProposal,
} from "./schema.js";
export type * from "./model.js";
