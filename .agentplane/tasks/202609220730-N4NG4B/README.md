---
id: "202609220730-N4NG4B"
title: "Harden AgentPlane 0.7.11 lifecycle boundaries and recovery"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 24
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lifecycle"
  - "v0.7.11-followup"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run lint"
  - "bun run typecheck"
  - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-22T08:02:15.222Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-22T08:03:36.590Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-22T08:02:15.222Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "fc4ca6cf888dfa503551453e8e488ca8a5350379"
  review_identity_digest: "sha256:b1e13e00789bd226e0764bced24f35846c39a78fe597aff315b29814b95afc6e"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609220730-N4NG4B/86c735b5e2c097f6c4a55625942b586b9d051ae50775c49fc1d6668a50c835d9/quality-report.json"
  findings:
    - "The implementation satisfies the approved lifecycle-boundary contract, including equivalent effect aliases and explicit task revision drift coverage."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "repository_effect:tests"
    changed_components:
      - "packages/agentplane"
      - "packages/core"
    changed_paths:
      - "packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
      - "packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.ts"
      - "packages/agentplane/src/commands/task/doc-set.command.ts"
      - "packages/agentplane/src/commands/task/doc.unit.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
      - "packages/agentplane/src/commands/task/plan-set.command.ts"
      - "packages/agentplane/src/commands/task/plan.unit.test.ts"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/plan-execution-grant.test.ts"
      - "packages/core/src/tasks/plan-execution-grant.ts"
      - "packages/core/src/tasks/task-kernel/invariants.test.ts"
      - "packages/core/src/tasks/task-kernel/invariants.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-3"
        result: "pass"
      -
        id: "recorded-check-4"
        result: "pass"
      -
        id: "recorded-check-5"
        result: "pass"
      -
        id: "recorded-check-6"
        result: "pass"
      -
        id: "recorded-check-7"
        result: "pass"
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
        result: "pass"
      -
        id: "verification-record"
        result: "pass"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  safety:
    approval_effects: []
    requires_user_approval: false
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:f50d55879dac382263eae68744ef8d9479ec0fb338d1f0efadf94a49c348c004"
      escalation_reasons:
        - "central_path:packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
        - "central_path:packages/core/src/tasks/index.ts"
        - "central_path:packages/core/src/tasks/plan-execution-grant.test.ts"
        - "central_path:packages/core/src/tasks/plan-execution-grant.ts"
        - "central_path:packages/core/src/tasks/task-kernel/invariants.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/invariants.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "packages/core"
        changed_files:
          - "packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
          - "packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.ts"
          - "packages/agentplane/src/commands/task/doc-set.command.ts"
          - "packages/agentplane/src/commands/task/doc.unit.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
          - "packages/agentplane/src/commands/task/plan-set.command.ts"
          - "packages/agentplane/src/commands/task/plan.unit.test.ts"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/plan-execution-grant.test.ts"
          - "packages/core/src/tasks/plan-execution-grant.ts"
          - "packages/core/src/tasks/task-kernel/invariants.test.ts"
          - "packages/core/src/tasks/task-kernel/invariants.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
      phase: "task"
      policy_floor:
        monotonic_strengthening: true
        pr_full_regression: true
        unknown_or_central_full_regression: true
      requires_full_regression: true
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
        - "task_outcome"
      selector:
        bucket: null
        buckets: []
        execution_mode: "semantic"
        kind: "semantic"
        lint_targets: []
        reason: "execution_declaration"
        run_cli_docs_check: false
        selected_test_files: []
        vitest_pool: "forks"
      source: "execution_contract"
    required_evidence:
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "fc4ca6cf888dfa503551453e8e488ca8a5350379"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-22T08:03:36.590Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-22T08:03:38.184Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages."
sections:
  Summary: |-
    Harden AgentPlane 0.7.11 lifecycle boundaries and recovery

    Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages.
  Scope: |-
    - In scope: Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages.
    - Out of scope: unrelated refactors not required for "Harden AgentPlane 0.7.11 lifecycle boundaries and recovery".
  Plan: "1. Execute approved WorkItem harden-lifecycle-boundaries."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-22T08:03:36.590Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2b2745b7f074d2c993c601dd9ecf3c8c245094e11caa95b601dd0f23954d8ca7, input_digest=sha256:0205f25ab202165028178bc3cf69a6f879ab9bcffbda113128465cb76e8abf04

    Details:

    Check: affected_unit_integration
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609220730-N4NG4B Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609220730-N4NG4B Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609220730-N4NG4B Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609220730-N4NG4B Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609220730-N4NG4B Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609220730-N4NG4B Verification Contract check critical_paths (3/3)

    Check: task_outcome
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609220730-N4NG4B Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609220730-N4NG4B Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609220730-N4NG4B Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:0071fe2330f9be6024011d09a50c6220fdd093bfa03c73aad74ad4dfc2089fa6
    - policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
    - capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
    - checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
    - identity_digest: sha256:4dc763362c5864e84107bfb6f204f400c058e723a017ae9df0127d1a4793bb33

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.kernel_operational_projection:
    digest: "sha256:8bd566e6967e61f9d0e70f9caf29e143cefa2ef6182a59af83ce148b2ec827c8"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609220730-N4NG4B/86c735b5e2c097f6c4a55625942b586b9d051ae50775c49fc1d6668a50c835d9/quality-report.json"
    findings:
      - "The implementation satisfies the approved lifecycle-boundary contract, including equivalent effect aliases and explicit task revision drift coverage."
    implementation_commit: "fc4ca6cf888dfa503551453e8e488ca8a5350379"
    implementation_tree: "8b2ecb6bafe300a945ea8ab003da7fe8efbf0f48"
    projected_at: "2026-09-22T08:02:15.222Z"
    review_identity_digest: "sha256:b1e13e00789bd226e0764bced24f35846c39a78fe597aff315b29814b95afc6e"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:c8ca42aeb045014de7e28078ae39129024a62df78f00fc15e9d296e832d3354c"
    work_order_id: "sha256:ecd1036039e5aed2391cea716563cc5c108ef5faab38847ef8a29f51e2df38c4"
  task_execution_context:
    base_ref: "main"
    base_sha: "a2104636fe2522ebdcd79ce32e5ba59f23241a6f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:a5bdd7e9a042b5a23f505d1807b6dd224c479cf4f55a30269a728f0472e6a3f4"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:0071fe2330f9be6024011d09a50c6220fdd093bfa03c73aad74ad4dfc2089fa6"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:2d2120da9d29062b1c54b7ad59bd4573fcee2b72d34d89336ce9b1dded0abd17"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "approval-transport"
              - "lifecycle-plan-admission"
              - "merged-worktree-cleanup"
              - "supervisor-pre-effect-recovery"
              - "text-payload-validation"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202609220730-N4NG4B"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:381140347fe85beb56b8eaf1bbed09d7a06e7a22bbbd420a737df9ab89b236f9"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:0071fe2330f9be6024011d09a50c6220fdd093bfa03c73aad74ad4dfc2089fa6"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2d2120da9d29062b1c54b7ad59bd4573fcee2b72d34d89336ce9b1dded0abd17"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:a5bdd7e9a042b5a23f505d1807b6dd224c479cf4f55a30269a728f0472e6a3f4"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "approval-transport"
              - "lifecycle-plan-admission"
              - "merged-worktree-cleanup"
              - "supervisor-pre-effect-recovery"
              - "text-payload-validation"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202609220730-N4NG4B"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
              - "packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
              - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
              - "packages/agentplane/src/commands/task/agent-action-packet.ts"
              - "packages/agentplane/src/commands/task/doc-set.command.ts"
              - "packages/agentplane/src/commands/task/doc.unit.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/agentplane/src/commands/task/plan.unit.test.ts"
              - "packages/core/src/tasks/index.ts"
              - "packages/core/src/tasks/plan-execution-grant.test.ts"
              - "packages/core/src/tasks/plan-execution-grant.ts"
              - "packages/core/src/tasks/task-kernel/invariants.test.ts"
              - "packages/core/src/tasks/task-kernel/invariants.ts"
            evidence_digest: "sha256:d44ceba34d9dd8cd0e2c17c12d6f6511ad4015e37ab213c4f8c914dd6ff63f2a"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:f5f3eb7f118074d130d52ca4f0fc5bd78a77f385c30d1f19eebb8be7b739129b"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:0071fe2330f9be6024011d09a50c6220fdd093bfa03c73aad74ad4dfc2089fa6"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:2d2120da9d29062b1c54b7ad59bd4573fcee2b72d34d89336ce9b1dded0abd17"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:381140347fe85beb56b8eaf1bbed09d7a06e7a22bbbd420a737df9ab89b236f9"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "approval-transport"
              - "lifecycle-plan-admission"
              - "merged-worktree-cleanup"
              - "supervisor-pre-effect-recovery"
              - "text-payload-validation"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/core/src/tasks"
            task_id: "202609220730-N4NG4B"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
              - "packages/core/src/tasks/task-kernel/invariants.test.ts"
              - "packages/core/src/tasks/task-kernel/invariants.ts"
            evidence_digest: "sha256:c5c212d72b97b13fa2fbcfe6f97ed44c9509ff47f217180091c15fc68acb1edd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:2d2120da9d29062b1c54b7ad59bd4573fcee2b72d34d89336ce9b1dded0abd17"
        digest: "sha256:0071fe2330f9be6024011d09a50c6220fdd093bfa03c73aad74ad4dfc2089fa6"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:6c6b13dec8d69d94a37b3e0443021fedec5a310d8db3650a8cefebb849cff3ac"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "lifecycle-plan-admission"
                - "approval-transport"
                - "text-payload-validation"
                - "supervisor-pre-effect-recovery"
                - "merged-worktree-cleanup"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
            expected_outputs:
              - "lifecycle-hardening-source"
              - "lifecycle-hardening-tests"
            id: "harden-lifecycle-boundaries"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:c8ca42aeb045014de7e28078ae39129024a62df78f00fc15e9d296e832d3354c"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:ad3da1a2f49bd4636d091c1937fa7fedbe448c9345884baa9ed40c5b302333a6"
          environment_digest: "sha256:b5dfb3dab8b8a284d7a9f01c6970b55769aa6d1297b86310ef64b097203e2777"
          implementation_identity: "sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450"
          toolchain_digest: "sha256:ac2cb47bdea52215b85160651904ddaabe82182e541155dab4e4ca45f411bb51"
        observed_at: "2026-09-22T08:02:23.278Z"
        status: "PASSED"
      id: "202609220730-N4NG4B"
      intent_digest: "sha256:56f7b9055adb9655ef26decf20bd4d7eebb6931375dfa7b6e0d874006ba7fd84"
      migration_receipts: []
      mutation_receipts:
        capture:202609220730-N4NG4B:
          after_revision: 1
          aggregate_digest: "sha256:0feb3c0905e5d58d23c3efd5e4df0bf8311a2df8c7dd7c5cca86495cb6356e06"
          before_revision: 0
          command_digest: "sha256:f9941b595fd9ce6e7db680b8f7c78e7eece8fde27bcb6825c61e034020e6779b"
          effect_ids: []
          event_digests:
            - "sha256:308417462416c800fcd3aef70855a35b060504dfb017dfab4bda2478dda7383c"
          mutation_id: "capture:202609220730-N4NG4B"
        final-validation:sha256:c8ca42aeb045014de7e28078ae39129024a62df78f00fc15e9d296e832d3354c:18:
          after_revision: 19
          aggregate_digest: "sha256:6fa7cfef2bc8ce96c4ebe92f1c08dc75cd903efaf6341f1bb2cacce5f979cbbb"
          before_revision: 18
          command_digest: "sha256:f570064aed4b0a85e6d149ca041a203927fb34ad5f3c04a1a50c8dbbc29c3b53"
          effect_ids: []
          event_digests:
            - "sha256:e85cf870219513801a8014e58473c7abcfa84cf373bb26c36833f5588f0fcf73"
          mutation_id: "final-validation:sha256:c8ca42aeb045014de7e28078ae39129024a62df78f00fc15e9d296e832d3354c:18"
        kernel_task_completion_required:sha256:30499fc51cfd89b77571a11d6343023e5e6d4df4324dc1958288d7af6699f395:sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450:
          after_revision: 20
          aggregate_digest: "sha256:259b8ec3bff8fbc116335952ab542ca08ec8c10e048a3b9befd6e9df285b8ea0"
          before_revision: 19
          command_digest: "sha256:8dbb59ebc0fbe7e2fa0cbad6b421d60919d3b8bdca42ee80c7106fa7c3b67d80"
          effect_ids: []
          event_digests:
            - "sha256:b40408791209935dca2f7c2286d24022528426761a20b423229a8ae0e4e392b3"
          mutation_id: "kernel_task_completion_required:sha256:30499fc51cfd89b77571a11d6343023e5e6d4df4324dc1958288d7af6699f395:sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450"
        kernel_work_item_claim_required:sha256:f02cc1c3ee99192d63d5cb7e585f5d59a78208e5f3558e65cfc35443074a0877:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 5
          aggregate_digest: "sha256:cd7fb2eea5f4c520deff27762416936d5acdde01476391b6ebd7497f05d1ce6a"
          before_revision: 4
          command_digest: "sha256:5413acb00ac20c7e701e532779c7927a4df0f38f045e610a91e0632179a6d38b"
          effect_ids: []
          event_digests:
            - "sha256:31abc32b8b3514cc6679314349ccd63ff22340811d79e8a5af2b0e77b769efa5"
          mutation_id: "kernel_work_item_claim_required:sha256:f02cc1c3ee99192d63d5cb7e585f5d59a78208e5f3558e65cfc35443074a0877:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:051914b9b92c935b57f357cb79f9475bcb8f0db8ef432b46aeb3a1f6af9a5505:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 6
          aggregate_digest: "sha256:a1d8202b37905fb1838168664b75cdfda5cc1e6c1407a42ea461acb80f322571"
          before_revision: 5
          command_digest: "sha256:ebcd179989672de3c2bc27ee3869210802197604e55803a65c58bfdb58e482fd"
          effect_ids: []
          event_digests:
            - "sha256:f2cca7fcd61d1892ed244650a569ffab4ab13bfc6d2379f65170b0ef5aaf111b"
          mutation_id: "kernel_work_item_execution_required:sha256:051914b9b92c935b57f357cb79f9475bcb8f0db8ef432b46aeb3a1f6af9a5505:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:065166065429b8084c59fa59071b06770d6d115329a454622e5d1495a5965753:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17:
          after_revision: 13
          aggregate_digest: "sha256:68aa77c564b4c5badaba989aa977b9e0d1d919e8b97c7e15d8d53d01f0592591"
          before_revision: 12
          command_digest: "sha256:9f8bd9dc42e988418d6851f42e4573a673a195db7b8ec9b910865ad5cbee3210"
          effect_ids: []
          event_digests:
            - "sha256:a1ef5c0c847002044d52a758de6b6f50f1fc034027d69999a906abe97cda00ae"
          mutation_id: "kernel_work_item_execution_required:sha256:065166065429b8084c59fa59071b06770d6d115329a454622e5d1495a5965753:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17"
        kernel_work_item_inspection_required:sha256:18b79dd458820f8737533a61dbaef05bb6f24ff6e7d20a50ac736178e1b5552a:sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450:
          after_revision: 16
          aggregate_digest: "sha256:a06e2a1d37db043688f888a5ab3c82e75c9f007891a5e04084530f404754f41e"
          before_revision: 15
          command_digest: "sha256:96b795c32066e57dec7d81a97c1f4bd9ba3d351d49e0b3a540401e03f2d78feb"
          effect_ids: []
          event_digests:
            - "sha256:f4bf0db2425c375ef21102ab92b0772644394568c39cb0ae93c0f2e8fe3c14f0"
          mutation_id: "kernel_work_item_inspection_required:sha256:18b79dd458820f8737533a61dbaef05bb6f24ff6e7d20a50ac736178e1b5552a:sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450"
        kernel_work_item_inspection_required:sha256:bc907b42c40e68c7eb54e17c20930b42a42e90530bd62729e7aa86bedcc07829:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17:
          after_revision: 9
          aggregate_digest: "sha256:d6a1232ce8cee3b06d1594476f50f5cbbc801e50895d2c9537c6f0c6ba7cb51e"
          before_revision: 8
          command_digest: "sha256:281e32858d24b1c705a9baab5f3a2b622739c08ef9efe83039efecd1f53d1419"
          effect_ids: []
          event_digests:
            - "sha256:faed616621600e0caf27f764dec1a79ec9ae0170a19a817d732a1b4de4e01874"
          mutation_id: "kernel_work_item_inspection_required:sha256:bc907b42c40e68c7eb54e17c20930b42a42e90530bd62729e7aa86bedcc07829:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17"
        kernel_work_item_materialization_required:sha256:2b0ab84df50e7dff1db33d7e4ad818dd8293b8153a693642a028f1d7832812b9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 4
          aggregate_digest: "sha256:2ee1eacf85d746ba2b9a9f64f3bf02ca738c564d32800393a29306d371c931a3"
          before_revision: 3
          command_digest: "sha256:537aace923d4e9b745be53d9f58ff8fdc581b99739eb01d60ea2612c70152d04"
          effect_ids: []
          event_digests:
            - "sha256:20ec7892f584676ff314dcda7123e5c57879932937b0d2173a53581e896640d1"
          mutation_id: "kernel_work_item_materialization_required:sha256:2b0ab84df50e7dff1db33d7e4ad818dd8293b8153a693642a028f1d7832812b9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_rework_claim_required:sha256:dd02325a5b73b969fbcc74d734229676ee8f564e86927560992e1ab2707afa41:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17:
          after_revision: 12
          aggregate_digest: "sha256:7a7bc6ab51b97ff68dd2c476a790ebf6c215a1419ac4938ac3a6dde6fdbdbf77"
          before_revision: 11
          command_digest: "sha256:edc60c4ca7133e1984dfa3bcb167ac9ea08aa3a5bf152ecb8d847201fc753a32"
          effect_ids: []
          event_digests:
            - "sha256:623441aca706fff9b8bf6ace4a1a9b81c3bb99a2b820e891aefd018a1ac49afe"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:dd02325a5b73b969fbcc74d734229676ee8f564e86927560992e1ab2707afa41:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17"
        result:sha256:568d4d7f8267479104c6fe449c8a247831c29a696af3fc9bcb210122dba495e9:
          after_revision: 8
          aggregate_digest: "sha256:3b6d29532e111b6e0b81afb2b4d059d3b9bc8f9c338d0da545dbab0a4186a906"
          before_revision: 7
          command_digest: "sha256:7d2ffc574a9bf9fe33c9db6a7d09600eb7fdbdde1afc65cf830d8a42cf10c2b7"
          effect_ids: []
          event_digests:
            - "sha256:45ce080b32037f8bf8e053b4c4d8d1143a1d5641fcf2c699b5a24a8201fc2b17"
          mutation_id: "result:sha256:568d4d7f8267479104c6fe449c8a247831c29a696af3fc9bcb210122dba495e9"
        result:sha256:ecd1036039e5aed2391cea716563cc5c108ef5faab38847ef8a29f51e2df38c4:
          after_revision: 15
          aggregate_digest: "sha256:f9c4c28eb1cfb31567afaff8fc8cdd882bc43b6de207c7cfd9fe6c566213e1cc"
          before_revision: 14
          command_digest: "sha256:8a4099b4834a5bfe4c41d54a1a1067d99e75882dd6312c7c113c779ef233e253"
          effect_ids: []
          event_digests:
            - "sha256:47c04ae4a54a6794aac5c5f41a778aa9398b249280c4099ad9f82b54d777742e"
          mutation_id: "result:sha256:ecd1036039e5aed2391cea716563cc5c108ef5faab38847ef8a29f51e2df38c4"
        result:sha256:f34e567a3d38188be6696fa1daf0600efed8710c4cd52ab899cb42c4ba22ab40:
          after_revision: 2
          aggregate_digest: "sha256:8f8d0e229b15fd093e576329e12c3cf85a210944a875342dd5f5be957b0a17a2"
          before_revision: 1
          command_digest: "sha256:b9c3d59ea0244c0722cc90625c5d6118f585e0b0db5ea6db8a9e56b84139edf0"
          effect_ids: []
          event_digests:
            - "sha256:ec686e794d2da3e9610403cb39333f58773030358180a1be8438c14e3c11be01"
          mutation_id: "result:sha256:f34e567a3d38188be6696fa1daf0600efed8710c4cd52ab899cb42c4ba22ab40"
        sha256:6d123997c073c13dc8f1ed77724cef13983996fac0b825f211ed3e9581120c15:
          after_revision: 3
          aggregate_digest: "sha256:dec2b5bea416b3ccc70cf977ac05ae0ab4d58969b5913b2a0d4327a53b975b45"
          before_revision: 2
          command_digest: "sha256:beb4296ab6a5b0b9878fd16656a04bd53453432a055715428a88a4f6d39f0a0d"
          effect_ids: []
          event_digests:
            - "sha256:1fb466e2444a735771c3377a09ff367d34fe5b285ec9010ecaa65ae34100cb9b"
          mutation_id: "sha256:6d123997c073c13dc8f1ed77724cef13983996fac0b825f211ed3e9581120c15"
        sha256:7bc8a288fe1d798358314dd8520cdfd352b5a6203426c3b71cd387fa7a87b171:
          after_revision: 7
          aggregate_digest: "sha256:1cba48945bed77b9ace59e15d93a43c00b6862faaabcc0ba2627939c3d272889"
          before_revision: 6
          command_digest: "sha256:f4fe4b240bea7fa2de30f75a468e28926676a7eff26969bb5f1c7e76fcada581"
          effect_ids: []
          event_digests:
            - "sha256:22717a556a1173bfd4c397d8d60881b09b350431c7641eb83ce8d28c0cdf0560"
          mutation_id: "sha256:7bc8a288fe1d798358314dd8520cdfd352b5a6203426c3b71cd387fa7a87b171"
        sha256:c0dad3a945b07253b11542bad20d09c9253a7416bcee2cd493837bee79f616ec:
          after_revision: 14
          aggregate_digest: "sha256:15cd5571e2e68920ced0352c821010dab391fc0e978542a8eb816159bc32fa06"
          before_revision: 13
          command_digest: "sha256:e1268e9a9f08f3115d5cccb2e62ad7de0c95fc1533bf509526d76044ddae35b1"
          effect_ids: []
          event_digests:
            - "sha256:35a11dd65eb0f3b73767a6bfeac2be95a0a71bb2ad4b0af4da7e0de0296aad52"
          mutation_id: "sha256:c0dad3a945b07253b11542bad20d09c9253a7416bcee2cd493837bee79f616ec"
        validation-resolution:sha256:2e46768005fabab433b427b7c14eefa7dbce4b3a05714e0cf695608f92194f81:
          after_revision: 11
          aggregate_digest: "sha256:cae986b39c872dbe7a07c0fd4ba8b4b3bedf2c6208d73dc4e1293e4ae7b8a6ba"
          before_revision: 10
          command_digest: "sha256:691d222d8fd606e8324ceb5cd50f13da392f7b31f3337a217d178a231e2daf25"
          effect_ids: []
          event_digests:
            - "sha256:8641e6684d54eef221b0603112e6497f5da92648e468e3082a05a2713e8461e2"
          mutation_id: "validation-resolution:sha256:2e46768005fabab433b427b7c14eefa7dbce4b3a05714e0cf695608f92194f81"
        validation-resolution:sha256:ae49d601882aee12dd62181426d1e6e05b947602f6eb9ccca41c598a19c73418:
          after_revision: 18
          aggregate_digest: "sha256:d938c2a4f07fc64249c88e08fd9526123f8ad79d97c6bca6ac09c9bf2f7a8673"
          before_revision: 17
          command_digest: "sha256:c110b0c5767d94714a164302cf94132ee23cd1144ec772d43bcc0ef1dd35f507"
          effect_ids: []
          event_digests:
            - "sha256:08daf85b272175435e71338399fbb1d1ec7e093731095f4f3515776471fd3079"
          mutation_id: "validation-resolution:sha256:ae49d601882aee12dd62181426d1e6e05b947602f6eb9ccca41c598a19c73418"
        validation:sha256:85feba4874b1a9251ed6c8b248f26152b24a5066cd37b82d11e1e2f7166e3dad:
          after_revision: 10
          aggregate_digest: "sha256:c7fff8246bd038de04815ec6bf0a212904692ef4b0c3cbdcc44eb83e254f025b"
          before_revision: 9
          command_digest: "sha256:651122bebc2fac2d9186f5837fe1060deec60f1572f03182fbad535dffc14440"
          effect_ids: []
          event_digests:
            - "sha256:6816d442ebd501e087229440451b9a88c3b16c92b8998d3327572f8e80e88021"
          mutation_id: "validation:sha256:85feba4874b1a9251ed6c8b248f26152b24a5066cd37b82d11e1e2f7166e3dad"
        validation:sha256:86c735b5e2c097f6c4a55625942b586b9d051ae50775c49fc1d6668a50c835d9:
          after_revision: 17
          aggregate_digest: "sha256:b02ec42ebed9871a9969055f4a224e38da4bc3bbe6e36e22152ae95d53fede2b"
          before_revision: 16
          command_digest: "sha256:c2332d781d8ca40557d5070b6200f58718aee666d8db46f5a7e2580df58d5640"
          effect_ids: []
          event_digests:
            - "sha256:78b1b9c5fd617a590922e525a296469235eb1c4368494889b32549f95abc7d75"
          mutation_id: "validation:sha256:86c735b5e2c097f6c4a55625942b586b9d051ae50775c49fc1d6668a50c835d9"
      plan_history: []
      revision: 20
      schema_version: 1
      state: "COMPLETED"
      work_items:
        harden-lifecycle-boundaries:
          attempt: 2
          claim_id: "sha256:2417e188758d3931edd8d64583663705816f211b98df76594059e003df611902"
          definition:
            contract_digest: "sha256:6c6b13dec8d69d94a37b3e0443021fedec5a310d8db3650a8cefebb849cff3ac"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "lifecycle-plan-admission"
                - "approval-transport"
                - "text-payload-validation"
                - "supervisor-pre-effect-recovery"
                - "merged-worktree-cleanup"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
            expected_outputs:
              - "lifecycle-hardening-source"
              - "lifecycle-hardening-tests"
            id: "harden-lifecycle-boundaries"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:9e50884394d54d8da0cde8b3b8219aff23251062f8b7440b6de1639f35bb8d81"
              id: "lifecycle-hardening-source"
              kind: "source"
              plan_revision: 1
              repository_fingerprint: "sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450"
              task_id: "202609220730-N4NG4B"
              work_item_id: "harden-lifecycle-boundaries"
            -
              attempt: 2
              digest: "sha256:73205c21356aac32264db498eac5fedc5651fed25df2945f48d71e8fb3a87c95"
              id: "lifecycle-hardening-tests"
              kind: "tests"
              plan_revision: 1
              repository_fingerprint: "sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450"
              task_id: "202609220730-N4NG4B"
              work_item_id: "harden-lifecycle-boundaries"
          result_digest: "sha256:1d79a7234f6285d23eb7d4f6c65a5ae633f7ea503f92933ff9f51e53ce260706"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:3f9c7d4f6dc141a078e8186761c102219b0041f68303ca17abf87ca2cea6318a"
              - "sha256:b1e13e00789bd226e0764bced24f35846c39a78fe597aff315b29814b95afc6e"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:ad3da1a2f49bd4636d091c1937fa7fedbe448c9345884baa9ed40c5b302333a6"
              environment_digest: "sha256:c93215b7a5421480056afc207bf0d44d2fb3cd29f1cbae0d7fb05edb2c7b43e4"
              implementation_identity: "sha256:1d79a7234f6285d23eb7d4f6c65a5ae633f7ea503f92933ff9f51e53ce260706"
              toolchain_digest: "sha256:a0ee42b1cba7905d88b1510be74b48ec1d0ac21b6f282a81bfde91979f9179ad"
            observed_at: "2026-09-22T08:02:15.222Z"
            status: "PASSED"
    digest: "sha256:aef04bf7b9d29e85cd4ee8f2782d0aa3439d06b3eb006d456ed2d78fed14749c"
    documents:
      contracts:
        sha256:6c6b13dec8d69d94a37b3e0443021fedec5a310d8db3650a8cefebb849cff3ac:
          acceptance_criteria:
            - "Canonical plan admission rejects semantic WorkItems that claim supervisor-owned PR publication, merge, hosted-close, cleanup, or equivalent provider lifecycle effects while preserving legitimate multiple semantic WorkItems."
            - "Host user decision packets and approval parsing expose one consistent required-field contract with field-specific malformed input diagnostics while preserving provenance and state binding."
            - "Task plan and document inline text reject shell-sensitive backticks and command substitution and direct callers to file input."
            - "Repeated accepted external results and task revision bindings have focused regression coverage for the post-apply recovery window."
            - "A persisted pre-effect supervisor intent can be explicitly proven not applied and replaced without replaying an uncertain effect."
            - "Repeated merged-branch cleanup removes a safe unregistered leftover worktree directory before deleting the branch and remains fail-closed for unsafe or still-locked paths."
            - "No semantic WorkItem performs PR publication, hosted checks, merge, hosted close, or cleanup lifecycle actions."
          objective: "Implement the confirmed AgentPlane 0.7.11 lifecycle-boundary and recovery fixes without moving provider lifecycle into semantic execution."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
            - "bun run typecheck"
            - "bun run lint"
      intent:
        context: "Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages."
        objective: "Harden AgentPlane 0.7.11 lifecycle boundaries and recovery"
    events:
      -
        command_digest: "sha256:f9941b595fd9ce6e7db680b8f7c78e7eece8fde27bcb6825c61e034020e6779b"
        id: "capture:202609220730-N4NG4B:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609220730-N4NG4B"
        occurred_at: "2026-09-22T07:30:21.690Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609220730-N4NG4B"
        task_revision: 1
      -
        command_digest: "sha256:b9c3d59ea0244c0722cc90625c5d6118f585e0b0db5ea6db8a9e56b84139edf0"
        id: "result:sha256:f34e567a3d38188be6696fa1daf0600efed8710c4cd52ab899cb42c4ba22ab40:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:f34e567a3d38188be6696fa1daf0600efed8710c4cd52ab899cb42c4ba22ab40"
        occurred_at: "2026-09-22T07:31:24.668Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609220730-N4NG4B"
        task_revision: 2
      -
        command_digest: "sha256:beb4296ab6a5b0b9878fd16656a04bd53453432a055715428a88a4f6d39f0a0d"
        id: "sha256:6d123997c073c13dc8f1ed77724cef13983996fac0b825f211ed3e9581120c15:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:6d123997c073c13dc8f1ed77724cef13983996fac0b825f211ed3e9581120c15"
        occurred_at: "2026-09-22T07:31:35.182Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609220730-N4NG4B"
        task_revision: 3
      -
        command_digest: "sha256:537aace923d4e9b745be53d9f58ff8fdc581b99739eb01d60ea2612c70152d04"
        id: "kernel_work_item_materialization_required:sha256:2b0ab84df50e7dff1db33d7e4ad818dd8293b8153a693642a028f1d7832812b9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:2b0ab84df50e7dff1db33d7e4ad818dd8293b8153a693642a028f1d7832812b9:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T07:32:07.642Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609220730-N4NG4B"
        task_revision: 4
      -
        command_digest: "sha256:5413acb00ac20c7e701e532779c7927a4df0f38f045e610a91e0632179a6d38b"
        id: "kernel_work_item_claim_required:sha256:f02cc1c3ee99192d63d5cb7e585f5d59a78208e5f3558e65cfc35443074a0877:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:f02cc1c3ee99192d63d5cb7e585f5d59a78208e5f3558e65cfc35443074a0877:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T07:32:11.477Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609220730-N4NG4B"
        task_revision: 5
      -
        command_digest: "sha256:ebcd179989672de3c2bc27ee3869210802197604e55803a65c58bfdb58e482fd"
        id: "kernel_work_item_execution_required:sha256:051914b9b92c935b57f357cb79f9475bcb8f0db8ef432b46aeb3a1f6af9a5505:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:051914b9b92c935b57f357cb79f9475bcb8f0db8ef432b46aeb3a1f6af9a5505:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T07:32:14.392Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609220730-N4NG4B"
        task_revision: 6
      -
        command_digest: "sha256:f4fe4b240bea7fa2de30f75a468e28926676a7eff26969bb5f1c7e76fcada581"
        id: "sha256:7bc8a288fe1d798358314dd8520cdfd352b5a6203426c3b71cd387fa7a87b171:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7bc8a288fe1d798358314dd8520cdfd352b5a6203426c3b71cd387fa7a87b171"
        occurred_at: "2026-09-22T07:52:53.095Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609220730-N4NG4B"
        task_revision: 7
      -
        command_digest: "sha256:7d2ffc574a9bf9fe33c9db6a7d09600eb7fdbdde1afc65cf830d8a42cf10c2b7"
        id: "result:sha256:568d4d7f8267479104c6fe449c8a247831c29a696af3fc9bcb210122dba495e9:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:568d4d7f8267479104c6fe449c8a247831c29a696af3fc9bcb210122dba495e9"
        occurred_at: "2026-09-22T07:52:57.039Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609220730-N4NG4B"
        task_revision: 8
      -
        command_digest: "sha256:281e32858d24b1c705a9baab5f3a2b622739c08ef9efe83039efecd1f53d1419"
        id: "kernel_work_item_inspection_required:sha256:bc907b42c40e68c7eb54e17c20930b42a42e90530bd62729e7aa86bedcc07829:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:bc907b42c40e68c7eb54e17c20930b42a42e90530bd62729e7aa86bedcc07829:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17"
        occurred_at: "2026-09-22T07:53:00.211Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609220730-N4NG4B"
        task_revision: 9
      -
        command_digest: "sha256:651122bebc2fac2d9186f5837fe1060deec60f1572f03182fbad535dffc14440"
        id: "validation:sha256:85feba4874b1a9251ed6c8b248f26152b24a5066cd37b82d11e1e2f7166e3dad:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:85feba4874b1a9251ed6c8b248f26152b24a5066cd37b82d11e1e2f7166e3dad"
        occurred_at: "2026-09-22T07:56:19.624Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609220730-N4NG4B"
        task_revision: 10
      -
        command_digest: "sha256:691d222d8fd606e8324ceb5cd50f13da392f7b31f3337a217d178a231e2daf25"
        id: "validation-resolution:sha256:2e46768005fabab433b427b7c14eefa7dbce4b3a05714e0cf695608f92194f81:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:2e46768005fabab433b427b7c14eefa7dbce4b3a05714e0cf695608f92194f81"
        occurred_at: "2026-09-22T07:56:21.540Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609220730-N4NG4B"
        task_revision: 11
      -
        command_digest: "sha256:edc60c4ca7133e1984dfa3bcb167ac9ea08aa3a5bf152ecb8d847201fc753a32"
        id: "kernel_work_item_rework_claim_required:sha256:dd02325a5b73b969fbcc74d734229676ee8f564e86927560992e1ab2707afa41:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:dd02325a5b73b969fbcc74d734229676ee8f564e86927560992e1ab2707afa41:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17"
        occurred_at: "2026-09-22T07:56:25.710Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609220730-N4NG4B"
        task_revision: 12
      -
        command_digest: "sha256:9f8bd9dc42e988418d6851f42e4573a673a195db7b8ec9b910865ad5cbee3210"
        id: "kernel_work_item_execution_required:sha256:065166065429b8084c59fa59071b06770d6d115329a454622e5d1495a5965753:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:065166065429b8084c59fa59071b06770d6d115329a454622e5d1495a5965753:sha256:011045ad45291a1cbbc33dfd5908c7761adb718e79a3ce6d7e584cef6aa09d17"
        occurred_at: "2026-09-22T07:56:29.793Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609220730-N4NG4B"
        task_revision: 13
      -
        command_digest: "sha256:e1268e9a9f08f3115d5cccb2e62ad7de0c95fc1533bf509526d76044ddae35b1"
        id: "sha256:c0dad3a945b07253b11542bad20d09c9253a7416bcee2cd493837bee79f616ec:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:c0dad3a945b07253b11542bad20d09c9253a7416bcee2cd493837bee79f616ec"
        occurred_at: "2026-09-22T07:59:58.584Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202609220730-N4NG4B"
        task_revision: 14
      -
        command_digest: "sha256:8a4099b4834a5bfe4c41d54a1a1067d99e75882dd6312c7c113c779ef233e253"
        id: "result:sha256:ecd1036039e5aed2391cea716563cc5c108ef5faab38847ef8a29f51e2df38c4:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:ecd1036039e5aed2391cea716563cc5c108ef5faab38847ef8a29f51e2df38c4"
        occurred_at: "2026-09-22T08:00:02.629Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202609220730-N4NG4B"
        task_revision: 15
      -
        command_digest: "sha256:96b795c32066e57dec7d81a97c1f4bd9ba3d351d49e0b3a540401e03f2d78feb"
        id: "kernel_work_item_inspection_required:sha256:18b79dd458820f8737533a61dbaef05bb6f24ff6e7d20a50ac736178e1b5552a:sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:18b79dd458820f8737533a61dbaef05bb6f24ff6e7d20a50ac736178e1b5552a:sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450"
        occurred_at: "2026-09-22T08:00:05.816Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609220730-N4NG4B"
        task_revision: 16
      -
        command_digest: "sha256:c2332d781d8ca40557d5070b6200f58718aee666d8db46f5a7e2580df58d5640"
        id: "validation:sha256:86c735b5e2c097f6c4a55625942b586b9d051ae50775c49fc1d6668a50c835d9:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:86c735b5e2c097f6c4a55625942b586b9d051ae50775c49fc1d6668a50c835d9"
        occurred_at: "2026-09-22T08:02:18.229Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202609220730-N4NG4B"
        task_revision: 17
      -
        command_digest: "sha256:c110b0c5767d94714a164302cf94132ee23cd1144ec772d43bcc0ef1dd35f507"
        id: "validation-resolution:sha256:ae49d601882aee12dd62181426d1e6e05b947602f6eb9ccca41c598a19c73418:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:ae49d601882aee12dd62181426d1e6e05b947602f6eb9ccca41c598a19c73418"
        occurred_at: "2026-09-22T08:02:20.181Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609220730-N4NG4B"
        task_revision: 18
      -
        command_digest: "sha256:f570064aed4b0a85e6d149ca041a203927fb34ad5f3c04a1a50c8dbbc29c3b53"
        id: "final-validation:sha256:c8ca42aeb045014de7e28078ae39129024a62df78f00fc15e9d296e832d3354c:18:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:c8ca42aeb045014de7e28078ae39129024a62df78f00fc15e9d296e832d3354c:18"
        occurred_at: "2026-09-22T08:03:31.291Z"
        payload_digest: "sha256:061b64c43e766deec68402b745cdbeebf06d7f074e836a20923db1df75ee5a64"
        task_id: "202609220730-N4NG4B"
        task_revision: 19
      -
        command_digest: "sha256:8dbb59ebc0fbe7e2fa0cbad6b421d60919d3b8bdca42ee80c7106fa7c3b67d80"
        id: "kernel_task_completion_required:sha256:30499fc51cfd89b77571a11d6343023e5e6d4df4324dc1958288d7af6699f395:sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:30499fc51cfd89b77571a11d6343023e5e6d4df4324dc1958288d7af6699f395:sha256:0b07f2193bb2704d15a96d4762555a0b3534cc029eb4a79fcd9fcaff272fc450"
        occurred_at: "2026-09-22T21:54:54.891Z"
        payload_digest: "sha256:ec42a2bbe60c2ff7acf39a31bba461482945ff99db021c2bab72ffc67a06d4d1"
        task_id: "202609220730-N4NG4B"
        task_revision: 20
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Harden AgentPlane 0.7.11 lifecycle boundaries and recovery

Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages.

## Scope

- In scope: Implement the confirmed code and test fixes from the 0.7.11 feedback. Reject supervisor-owned PR, merge, hosted-close, and cleanup choreography in semantic WorkItems. Align host user decision approval transport with canonical plan handling and field diagnostics. Protect plan and document inline text from shell expansion hazards. Add focused task revision, accepted-result replay, and pre-effect supervisor recovery regressions. Make repeated cleanup remove a safe unregistered Windows-locked worktree directory while preserving fail-closed branch recovery. Keep provider publication, hosted checks, merge, hosted close, and cleanup outside the semantic WorkItem and let AgentPlane own those later lifecycle stages.
- Out of scope: unrelated refactors not required for "Harden AgentPlane 0.7.11 lifecycle boundaries and recovery".

## Plan

1. Execute approved WorkItem harden-lifecycle-boundaries.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-22T08:03:36.590Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:2b2745b7f074d2c993c601dd9ecf3c8c245094e11caa95b601dd0f23954d8ca7, input_digest=sha256:0205f25ab202165028178bc3cf69a6f879ab9bcffbda113128465cb76e8abf04

Details:

Check: affected_unit_integration
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609220730-N4NG4B Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609220730-N4NG4B Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts
Result: pass
Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609220730-N4NG4B Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609220730-N4NG4B Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609220730-N4NG4B Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts
Result: pass
Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609220730-N4NG4B Verification Contract check critical_paths (3/3)

Check: task_outcome
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609220730-N4NG4B Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609220730-N4NG4B Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/plan-execution-grant.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts packages/agentplane/src/commands/task/external-agent-supervisor.test.ts packages/agentplane/src/commands/shared/supervisor-execution-episode.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts
Result: pass
Evidence: .agentplane/tasks/202609220730-N4NG4B/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609220730-N4NG4B Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:0071fe2330f9be6024011d09a50c6220fdd093bfa03c73aad74ad4dfc2089fa6
- policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
- capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
- checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
- identity_digest: sha256:4dc763362c5864e84107bfb6f204f400c058e723a017ae9df0127d1a4793bb33

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
