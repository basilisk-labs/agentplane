import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import {
  captureGitSnapshotObservation,
  materializeGitSnapshot,
  type GitSnapshot,
} from "../../runner/observation/git-snapshot.js";
import { observeBackendProjection } from "../../runner/state-fingerprint-backend-projection.js";
import { observeKnowledgeProjection } from "../../runner/state-fingerprint-knowledge.js";
import { measurePreparationNode } from "../../shared/preparation-trace.js";
import type { CommandContext } from "./task-backend.js";
import { observeWorkflowBlueprint } from "./workflow-step-fingerprint-blueprint.js";
import { traceWorkflowFingerprintComponents } from "./workflow-step-fingerprint-trace.js";
import {
  observeWorkflowPolicyScope,
  type WorkflowPolicyScopeObservation,
} from "./workflow-step-policy-scope.js";
import type { WorkflowRouteStateInput } from "./workflow-step-fingerprint.js";
import type { WorkflowStep } from "./workflow-step.js";

type BlueprintObservation = Awaited<ReturnType<typeof observeWorkflowBlueprint>>;

export async function prepareWorkflowStepFingerprint(opts: {
  ctx: CommandContext;
  state: WorkflowRouteStateInput;
  step: WorkflowStep;
  repositoryRoot: string;
  traceScope: string;
  blueprintPath: string;
  semanticTask: () => StateFingerprintComponentInput;
  workflowAuthority: () => Record<string, unknown>;
  selectPolicyPaths: (
    blueprintPolicyModules: readonly string[],
    changedPaths: readonly string[],
  ) => string[];
  semanticGitExclusions: (policyPaths: readonly string[]) => string[];
  observePolicy: (
    policyScope: WorkflowPolicyScopeObservation,
    selectedPolicyPaths: readonly string[],
  ) => Promise<StateFingerprintComponentInput>;
}): Promise<{
  blueprintObservation: BlueprintObservation;
  policyScope: WorkflowPolicyScopeObservation;
  selectedPolicyPaths: string[];
  knowledge: StateFingerprintComponentInput;
  policy: StateFingerprintComponentInput;
  backendProjection: StateFingerprintComponentInput;
  git: GitSnapshot;
}> {
  const blueprintPromise = measurePreparationNode({
    recorder: opts.ctx.preparationTrace,
    node: "blueprint_resolution",
    scope: opts.traceScope,
    dependencies: ["task_backend_read"],
    cacheability: "exact",
    cachePolicyReason:
      "Blueprint source, task state, workflow mode, and resolved projection are fingerprinted.",
    operation: async () =>
      await observeWorkflowBlueprint({
        ctx: opts.ctx,
        repositoryRoot: opts.repositoryRoot,
        task: opts.state.task,
        step: opts.step,
        workflowMode: opts.state.workflowMode,
        relativePath: opts.blueprintPath,
      }),
    fingerprintInputs: (observation) => ({
      task: opts.semanticTask(),
      workflow_mode: opts.state.workflowMode,
      step: opts.workflowAuthority(),
      blueprint_observation: observation,
    }),
    output: (observation) => observation,
  });
  const policyScopePromise = measurePreparationNode({
    recorder: opts.ctx.preparationTrace,
    node: "policy_scope",
    scope: opts.traceScope,
    dependencies: ["task_backend_read"],
    cacheability: "exact",
    cachePolicyReason: "Policy selection is bound to the observed task and changed-path scope.",
    operation: async () =>
      await observeWorkflowPolicyScope({
        repositoryRoot: opts.repositoryRoot,
        state: opts.state,
      }),
    fingerprintInputs: (scope) => ({
      task_id: opts.state.task.id,
      workflow_mode: opts.state.workflowMode,
      policy_scope: scope,
    }),
    output: (scope) => scope,
  });
  const policyInputsPromise = Promise.all([blueprintPromise, policyScopePromise]).then(
    ([blueprintObservation, policyScope]) => ({
      blueprintObservation,
      policyScope,
      selectedPolicyPaths: opts.selectPolicyPaths(
        blueprintObservation.policyModules,
        policyScope.state === "present" ? policyScope.changedPaths : [],
      ),
    }),
  );
  const gitObservationPromise = captureGitSnapshotObservation(opts.repositoryRoot);
  const gitPromise = measurePreparationNode({
    recorder: opts.ctx.preparationTrace,
    node: "git_snapshot",
    scope: opts.traceScope,
    dependencies: ["blueprint_resolution", "policy_scope"],
    cacheability: "exact",
    cachePolicyReason: "HEAD, index, dirty paths, path digests, and exclusions are fingerprinted.",
    operation: async () => {
      const [observation, policyInputs] = await Promise.all([
        gitObservationPromise,
        policyInputsPromise,
      ]);
      return await materializeGitSnapshot(
        observation,
        opts.semanticGitExclusions(policyInputs.selectedPolicyPaths),
      );
    },
    fingerprintInputs: (snapshot) => ({
      repository_root: opts.repositoryRoot,
      git_snapshot: snapshot,
    }),
    output: (snapshot) => snapshot,
  });
  const componentsPromise = policyInputsPromise.then(
    async ({ policyScope, selectedPolicyPaths }) =>
      await traceWorkflowFingerprintComponents({
        recorder: opts.ctx.preparationTrace,
        scope: opts.traceScope,
        backendId: opts.ctx.backendId,
        policyScope,
        selectedPolicyPaths,
        observeKnowledge: async () => await observeKnowledgeProjection(opts.repositoryRoot),
        observePolicy: async () => await opts.observePolicy(policyScope, selectedPolicyPaths),
        observeBackend: async () =>
          await observeBackendProjection(opts.ctx, { repository_root: opts.repositoryRoot }),
      }),
  );
  const [policyInputs, components, git] = await Promise.all([
    policyInputsPromise,
    componentsPromise,
    gitPromise,
  ]);
  return {
    ...policyInputs,
    knowledge: components[0],
    policy: components[1],
    backendProjection: components[2],
    git,
  };
}
