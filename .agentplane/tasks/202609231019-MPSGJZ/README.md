---
id: "202609231019-MPSGJZ"
title: "Fix canonical completed-task branch lifecycle recovery without internal provider work items"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "lifecycle"
  - "supervisor"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-23T11:08:08.624Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-23T11:15:46.137Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-23T11:08:08.624Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "9ce569668659b81073d3a95a3f5522ca121bc94e"
  review_identity_digest: "sha256:e9999f10a6bf6231faab4ed945197d7c3e492d2dd1d7b602c604cccb9d750d5b"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609231019-MPSGJZ/2c1b20755cb1de1ea54021d939676d04dac3d4eb5f18feb70c0ea5202d5e02da/quality-report.json"
  findings:
    - "PASS: WorkItem validation targets AgentPlane-owned PR, hosted CI, integration, hosted-close, and cleanup identifiers without blocking ordinary approved deploy or external-write semantics."
    - "PASS: supervisor recovery binds retries to exact operation identity, persists replacement state with compare-and-swap, and leaves ambiguous effects in doubt."
    - "PASS: completed-task rework, verification, quality review, base-checkout integration, strict Codex schemas, host decision diagnostics, shell-sensitive text routing, and repeat cleanup have focused regression coverage."
    - "PASS: repository evidence is bound to implementation commit 9ce569668659b81073d3a95a3f5522ca121bc94e and contains no artifacts from earlier task IDs."
    - "PASS: AgentPlane-native validation recorded all three required commands with exit code 0, including the full local CI suite."
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
      - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
      - "packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
      - "packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
      - "packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-worktree-recovery.test.ts"
      - "packages/agentplane/src/commands/shared/supervisor-execution-worktree-recovery.ts"
      - "packages/agentplane/src/commands/shared/text-payload.ts"
      - "packages/agentplane/src/commands/task/advance-task-step.ts"
      - "packages/agentplane/src/commands/task/advance.command.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
      - "packages/agentplane/src/commands/task/agent-action-packet.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor-journal-recovery.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor.test.ts"
      - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
      - "packages/agentplane/src/commands/task/branch-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/doc-set.command.ts"
      - "packages/agentplane/src/commands/task/doc.unit.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
      - "packages/agentplane/src/commands/task/finish-execute.ts"
      - "packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
      - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
      - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
      - "packages/agentplane/src/commands/task/plan-set.command.ts"
      - "packages/agentplane/src/commands/task/plan.unit.test.ts"
      - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
      - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
      - "packages/agentplane/src/runner/adapters/codex-output-schema-compat.ts"
      - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
      - "packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
      - "packages/agentplane/src/runner/usecases/task-run-authority.ts"
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
      digest: "sha256:c90f280da79445d8b8c685e11932be8bfd1c950777cc02a54864e72934b1ff30"
      escalation_reasons:
        - "central_path:packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
        - "central_path:packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-worktree-recovery.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/supervisor-execution-worktree-recovery.ts"
        - "central_path:packages/agentplane/src/commands/shared/text-payload.ts"
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
          - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
          - "packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
          - "packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
          - "packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-worktree-recovery.test.ts"
          - "packages/agentplane/src/commands/shared/supervisor-execution-worktree-recovery.ts"
          - "packages/agentplane/src/commands/shared/text-payload.ts"
          - "packages/agentplane/src/commands/task/advance-task-step.ts"
          - "packages/agentplane/src/commands/task/advance.command.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
          - "packages/agentplane/src/commands/task/agent-action-packet.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor-journal-recovery.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor.test.ts"
          - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
          - "packages/agentplane/src/commands/task/branch-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/doc-set.command.ts"
          - "packages/agentplane/src/commands/task/doc.unit.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
          - "packages/agentplane/src/commands/task/finish-execute.ts"
          - "packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
          - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
          - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
          - "packages/agentplane/src/commands/task/plan-set.command.ts"
          - "packages/agentplane/src/commands/task/plan.unit.test.ts"
          - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
          - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
          - "packages/agentplane/src/runner/adapters/codex-output-schema-compat.ts"
          - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
          - "packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
          - "packages/agentplane/src/runner/usecases/task-run-authority.ts"
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
  hash: "9ce569668659b81073d3a95a3f5522ca121bc94e"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-23T11:15:46.137Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-23T11:15:47.177Z"
doc_updated_by: "SUPERVISOR"
description: "Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks."
sections:
  Summary: |-
    Fix canonical completed-task branch lifecycle recovery without internal provider work items

    Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.
  Scope: |-
    - In scope: Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.
    - Out of scope: unrelated refactors not required for "Fix canonical completed-task branch lifecycle recovery without internal provider work items".
  Plan: "1. Execute approved WorkItem implement-lifecycle-recovery."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix canonical completed-task branch lifecycle recovery without internal provider work items". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix canonical completed-task branch lifecycle recovery without internal provider work items". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-23T11:15:46.137Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:5f3d95b05b031f07880a41a3eca628614d6b7cf0567af923f9cf8881f7c6b8ca, input_digest=sha256:429d531075fa44b735c1cfeb455c1ca12e0fc8b046e7dd628cd013303cd56843

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check critical_paths (3/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:b8810dd303286d6fdd7c8b7e964e33cdb45ef13091247e90d5d458d559e9f9a0
    - policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
    - capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
    - checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
    - identity_digest: sha256:f300c2c9634733bc5fa6f3d8f15f7d030b380f54f05e5884ee4bc2f9394bce17

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
    digest: "sha256:24ce5825d37d8963c1a59c67317090970b42086f415addbede93cd6cae9b2afc"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609231019-MPSGJZ/2c1b20755cb1de1ea54021d939676d04dac3d4eb5f18feb70c0ea5202d5e02da/quality-report.json"
    findings:
      - "PASS: WorkItem validation targets AgentPlane-owned PR, hosted CI, integration, hosted-close, and cleanup identifiers without blocking ordinary approved deploy or external-write semantics."
      - "PASS: supervisor recovery binds retries to exact operation identity, persists replacement state with compare-and-swap, and leaves ambiguous effects in doubt."
      - "PASS: completed-task rework, verification, quality review, base-checkout integration, strict Codex schemas, host decision diagnostics, shell-sensitive text routing, and repeat cleanup have focused regression coverage."
      - "PASS: repository evidence is bound to implementation commit 9ce569668659b81073d3a95a3f5522ca121bc94e and contains no artifacts from earlier task IDs."
      - "PASS: AgentPlane-native validation recorded all three required commands with exit code 0, including the full local CI suite."
    implementation_commit: "9ce569668659b81073d3a95a3f5522ca121bc94e"
    implementation_tree: "b1102d03718970d0b6129ab8b594e638a468068b"
    projected_at: "2026-09-23T11:08:08.624Z"
    review_identity_digest: "sha256:e9999f10a6bf6231faab4ed945197d7c3e492d2dd1d7b602c604cccb9d750d5b"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:13eeecb164bff3772b1d4ed26a7c9209027597f086555e0e889e01608472c464"
    work_order_id: "sha256:0ddc0cee4143f9a1c97f48a79a4ec518abf800d7a215c80a1f7b345580c44d21"
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
            digest: "sha256:d0c468fcf9f1e0dfa5275059e3bd34867c1cdd13374fcac76e12b07afcb2f4ca"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b8810dd303286d6fdd7c8b7e964e33cdb45ef13091247e90d5d458d559e9f9a0"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:b35abeeb010e2c596c7e631a6874801d8139e099435386fa2c1321716a7edde4"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "canonical-completed-branch-supervisor"
              - "codex-output-schema"
              - "runner-rework-authority"
              - "supervisor-journal-recovery"
              - "task-lifecycle-hardening"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/adapters"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
            task_id: "202609231019-MPSGJZ"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
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
            digest: "sha256:fd40c229e32a05f0ed21ce5fd295e90c4a6269a07d9dc13a96ec87124cda3151"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:b8810dd303286d6fdd7c8b7e964e33cdb45ef13091247e90d5d458d559e9f9a0"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:b35abeeb010e2c596c7e631a6874801d8139e099435386fa2c1321716a7edde4"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:d0c468fcf9f1e0dfa5275059e3bd34867c1cdd13374fcac76e12b07afcb2f4ca"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "canonical-completed-branch-supervisor"
              - "codex-output-schema"
              - "runner-rework-authority"
              - "supervisor-journal-recovery"
              - "task-lifecycle-hardening"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/pr"
              - "packages/agentplane/src/commands/shared"
              - "packages/agentplane/src/commands/task"
              - "packages/agentplane/src/runner/adapters"
              - "packages/agentplane/src/runner/usecases"
              - "packages/core/src/runner"
              - "packages/core/src/tasks"
            task_id: "202609231019-MPSGJZ"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/pr/conflict-rework.test.ts"
              - "packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts"
              - "packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
              - "packages/agentplane/src/commands/shared/roadmap-rework-conservation.test.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-episode.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-worktree-recovery.test.ts"
              - "packages/agentplane/src/commands/shared/supervisor-execution-worktree-recovery.ts"
              - "packages/agentplane/src/commands/shared/text-payload.ts"
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
              - "packages/agentplane/src/commands/task/agent-action-packet.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor-journal-recovery.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor.test.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor.ts"
              - "packages/agentplane/src/commands/task/branch-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/doc-set.command.ts"
              - "packages/agentplane/src/commands/task/doc.unit.test.ts"
              - "packages/agentplane/src/commands/task/external-agent-supervisor.test.ts"
              - "packages/agentplane/src/commands/task/finish-execute.ts"
              - "packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/plan-set.command.ts"
              - "packages/agentplane/src/commands/task/plan.unit.test.ts"
              - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
              - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
              - "packages/agentplane/src/runner/adapters/codex-output-schema-compat.ts"
              - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
              - "packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
              - "packages/agentplane/src/runner/usecases/task-run-authority.ts"
              - "packages/core/src/tasks/index.ts"
              - "packages/core/src/tasks/plan-execution-grant.test.ts"
              - "packages/core/src/tasks/plan-execution-grant.ts"
              - "packages/core/src/tasks/task-kernel/invariants.test.ts"
              - "packages/core/src/tasks/task-kernel/invariants.ts"
            evidence_digest: "sha256:ed5aa1cea00d2b310fbeff4dd7ac9e4d9233685ff209242790cca8a7b848f931"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:b35abeeb010e2c596c7e631a6874801d8139e099435386fa2c1321716a7edde4"
        digest: "sha256:b8810dd303286d6fdd7c8b7e964e33cdb45ef13091247e90d5d458d559e9f9a0"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:85adf459dab98874dd575e76b54c29fc26871f0436219e7ae2d7fef54236ab5c"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "canonical-completed-branch-supervisor"
                - "supervisor-journal-recovery"
                - "runner-rework-authority"
                - "codex-output-schema"
                - "task-lifecycle-hardening"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/runner/adapters"
                - "packages/agentplane/src/runner/usecases"
            expected_outputs:
              - "lifecycle-recovery-source"
              - "lifecycle-recovery-regression-tests"
            id: "implement-lifecycle-recovery"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:13eeecb164bff3772b1d4ed26a7c9209027597f086555e0e889e01608472c464"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:ad8dc5625f853ec214b1b520121ffba15d91797255341f972beb1d772ac41318"
          environment_digest: "sha256:a5cf68b0f34f2e763d491a6c0d4bee508750e87c9c624d5ccdbadefd3808b9d7"
          implementation_identity: "sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a"
          toolchain_digest: "sha256:8855514f054238bb566920db004e47cfe9c5076a7babac0f5cd3cdcadfa29ba1"
        observed_at: "2026-09-23T11:08:16.782Z"
        status: "PASSED"
      id: "202609231019-MPSGJZ"
      intent_digest: "sha256:d5a94ede9c60c35d031e28d2b00066e55244c127a9956963194d97666de2022b"
      migration_receipts: []
      mutation_receipts:
        capture:202609231019-MPSGJZ:
          after_revision: 1
          aggregate_digest: "sha256:6d7a8daac801f74dcde4e6026b4cd503df796c1d2c3888dcf7a6547068064254"
          before_revision: 0
          command_digest: "sha256:66a0984986af953894e8fac677a08f3e9595aa8d5c4ac7fa90bef219d4454c3e"
          effect_ids: []
          event_digests:
            - "sha256:076b179f363a241590367095067760f3f6c646047c329430b270aa823daccf1a"
          mutation_id: "capture:202609231019-MPSGJZ"
        final-validation:sha256:13eeecb164bff3772b1d4ed26a7c9209027597f086555e0e889e01608472c464:11:
          after_revision: 12
          aggregate_digest: "sha256:fcfc8d32aab99d5560e67d94fdea1f9c20b03a567c4eae0d790ba22ec0375df4"
          before_revision: 11
          command_digest: "sha256:f24777cc627d913b5011404e51b6700dae1161c7d838dc3f032cf256c455bb08"
          effect_ids: []
          event_digests:
            - "sha256:1c69ebfd2824a6004f3b4666aa5b6bcf08491deb072185d430e6fb9821b91cff"
          mutation_id: "final-validation:sha256:13eeecb164bff3772b1d4ed26a7c9209027597f086555e0e889e01608472c464:11"
        kernel_task_completion_required:sha256:61ead1c6a7d6384d3fd46e4a1d5a0c828922d9f52928960ae93d781b7d6fbd7c:sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a:
          after_revision: 13
          aggregate_digest: "sha256:f791c2485b963a2af77d105fa8829fab2577a20b755bdd7bf3494de747daf9df"
          before_revision: 12
          command_digest: "sha256:0c72ebec83a948ead033770004dce69346e5114ccefdc684b04c59992daed686"
          effect_ids: []
          event_digests:
            - "sha256:474569d4cd907bb09d034f3f5ecd6da68dcfa6779d7c1d9f0edd15777e160d12"
          mutation_id: "kernel_task_completion_required:sha256:61ead1c6a7d6384d3fd46e4a1d5a0c828922d9f52928960ae93d781b7d6fbd7c:sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a"
        kernel_work_item_claim_required:sha256:863e03b07292f7790c14f4a0f4c92dce7a2739b18bcb9d46946044855948e433:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 5
          aggregate_digest: "sha256:e02390cd1b133d95049985daae4b0d001594af94d629e07e23c2729033774731"
          before_revision: 4
          command_digest: "sha256:35595c91d5dd1253c419658209f28949a935158515201e668b9590e12d7f893d"
          effect_ids: []
          event_digests:
            - "sha256:394f8edc8f8ea8766989990e9de1fd4c0c00d0a9ba3f04641ae180d130cba1ed"
          mutation_id: "kernel_work_item_claim_required:sha256:863e03b07292f7790c14f4a0f4c92dce7a2739b18bcb9d46946044855948e433:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:611f727a88f1f6432e3a172f32cc8e291714ac2ecc349ff2eec0d7c060c93a4a:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 6
          aggregate_digest: "sha256:72fd6766e910d8f2a2a41d5919aa5ffc602ed1659b737bbc2e4fad9047cccc4a"
          before_revision: 5
          command_digest: "sha256:22fe1774914db32ef10228d9a74518eaac8f5e7b2970db5df4a768a44dd30def"
          effect_ids: []
          event_digests:
            - "sha256:ce5649738c5309700eafe1c855242a290b993e8db00796c7e87291ec3b102614"
          mutation_id: "kernel_work_item_execution_required:sha256:611f727a88f1f6432e3a172f32cc8e291714ac2ecc349ff2eec0d7c060c93a4a:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_inspection_required:sha256:63031697e2fce17b5283491403717d652ed8fa47621949dedc38c4467fe3e223:sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a:
          after_revision: 9
          aggregate_digest: "sha256:43231d930f35e7029c6cedc8972c5f12aeb04441cd9fa212e76b544d978a471f"
          before_revision: 8
          command_digest: "sha256:92e5733bbd0657281ae3c5a118684f1208a759b920951e40d9be10b71bd7ea65"
          effect_ids: []
          event_digests:
            - "sha256:ed95e8f4b87701a49b56e2413eadb84f47ea255a2a92d1e109d94abb64a8da66"
          mutation_id: "kernel_work_item_inspection_required:sha256:63031697e2fce17b5283491403717d652ed8fa47621949dedc38c4467fe3e223:sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a"
        kernel_work_item_materialization_required:sha256:fc8b59869fb3dbd3dfe9e7516f4d32229ba8bc83e26035c91381e709907e2a94:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 4
          aggregate_digest: "sha256:02617458207d1168220950685df6b7d735bb58c2ffadf8bea29ff6141fa4bc63"
          before_revision: 3
          command_digest: "sha256:78eba9212ab26106e5fadfbced8fe91af3d04162c073b446d6f57f137af1a327"
          effect_ids: []
          event_digests:
            - "sha256:8456e457742745d336a63fbec696c6eb067c1397032ce4ea8a7cea6a03f9beda"
          mutation_id: "kernel_work_item_materialization_required:sha256:fc8b59869fb3dbd3dfe9e7516f4d32229ba8bc83e26035c91381e709907e2a94:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        result:sha256:0ddc0cee4143f9a1c97f48a79a4ec518abf800d7a215c80a1f7b345580c44d21:
          after_revision: 8
          aggregate_digest: "sha256:4614bd2d41b818f53329163d3504136fd98a09016e7635d4f8b4a0c367721c5b"
          before_revision: 7
          command_digest: "sha256:daad812d0910a062e162db40e4a705d424a8680b27ac3ffa92a035575d9a1e5b"
          effect_ids: []
          event_digests:
            - "sha256:996708f64da7a324d1c188357499786cc2f25f43df76de1346fb24b58e07d0ea"
          mutation_id: "result:sha256:0ddc0cee4143f9a1c97f48a79a4ec518abf800d7a215c80a1f7b345580c44d21"
        result:sha256:295d5ff633369d21369c2107b77bdca5ffce4fe7736d797b1274a4b71f1799ff:
          after_revision: 2
          aggregate_digest: "sha256:85310d6e0e3cdba44785270c2e551b1dbd5aeebae51162cd3b3ebdd12578fffd"
          before_revision: 1
          command_digest: "sha256:b26b496b1691c3346b7cf5257bd137f007e36b53622fc9a49c7ab0c5496be846"
          effect_ids: []
          event_digests:
            - "sha256:c02edb1d3dde4b872821dd818096a92455a8b7970adf01d556b8d9caae5911ab"
          mutation_id: "result:sha256:295d5ff633369d21369c2107b77bdca5ffce4fe7736d797b1274a4b71f1799ff"
        sha256:229782e83ea5f7831ef21166225129e64588fb34e54a38cef317726079318e5c:
          after_revision: 7
          aggregate_digest: "sha256:f751c36bbd2709e4b2040d9203c3303017368cbae3cfa391d83c9f3383ef1736"
          before_revision: 6
          command_digest: "sha256:cfa99706db076d297c6bd619f2455646aed69fa23dec484e709b02e65ccdb139"
          effect_ids: []
          event_digests:
            - "sha256:28a91f54468c791f46561045e565cb5140440d029d6584e89ce3666f26c7bf77"
          mutation_id: "sha256:229782e83ea5f7831ef21166225129e64588fb34e54a38cef317726079318e5c"
        sha256:5ae3b40218cd92808f87d630541bd07c0e076d57fe840d224c741c818b27c1f2:
          after_revision: 3
          aggregate_digest: "sha256:aa417efb109b227517746929acfb150e2bddd5e656d3747c7f8462e5c7175df3"
          before_revision: 2
          command_digest: "sha256:14c972b47a12f2c709e2a907b183093ea5a14d4cb96ad8583d923757aaba9693"
          effect_ids: []
          event_digests:
            - "sha256:f65a30c683b1296e09a412d69734ad74f7427a08667c5f0defa29276a0bf4e5b"
          mutation_id: "sha256:5ae3b40218cd92808f87d630541bd07c0e076d57fe840d224c741c818b27c1f2"
        validation-resolution:sha256:17443d07d6020b3d0493c23f40ec33c7325f26440d3c4e2ff3f3ba6885485702:
          after_revision: 11
          aggregate_digest: "sha256:66f104d5072d4895642a1e0ccf94710ef12113b44cec8d4b00b61d94f0d9446e"
          before_revision: 10
          command_digest: "sha256:16c39badbb1b5bbf94fed5d1577f3973020ae997a335c5255d4f41f6667d4bed"
          effect_ids: []
          event_digests:
            - "sha256:96fdfe7efc848204bbecc45789b248f9629b7bf139cf72931af3b2e87f484881"
          mutation_id: "validation-resolution:sha256:17443d07d6020b3d0493c23f40ec33c7325f26440d3c4e2ff3f3ba6885485702"
        validation:sha256:2c1b20755cb1de1ea54021d939676d04dac3d4eb5f18feb70c0ea5202d5e02da:
          after_revision: 10
          aggregate_digest: "sha256:7d7143d3418466e3e8da31fd323aefbf9016e0d3fb7340d8f4fecfcc93b5e28e"
          before_revision: 9
          command_digest: "sha256:9fdb89950ae44ea21135617013aa4d00cd6d197be4aec616a33cb65076f407ef"
          effect_ids: []
          event_digests:
            - "sha256:2d7ad86213a5d0ea46bf10153c6843333b3f4db3cb82e030d57a63f545ef610e"
          mutation_id: "validation:sha256:2c1b20755cb1de1ea54021d939676d04dac3d4eb5f18feb70c0ea5202d5e02da"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "COMPLETED"
      work_items:
        implement-lifecycle-recovery:
          attempt: 1
          claim_id: "sha256:2cb3992c12c640d347953ba5bb5cfa2ff1950c5e2c868ff614bfecf6e159d192"
          definition:
            contract_digest: "sha256:85adf459dab98874dd575e76b54c29fc26871f0436219e7ae2d7fef54236ab5c"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources:
                - "canonical-completed-branch-supervisor"
                - "supervisor-journal-recovery"
                - "runner-rework-authority"
                - "codex-output-schema"
                - "task-lifecycle-hardening"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/core/src/runner"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/runner/adapters"
                - "packages/agentplane/src/runner/usecases"
            expected_outputs:
              - "lifecycle-recovery-source"
              - "lifecycle-recovery-regression-tests"
            id: "implement-lifecycle-recovery"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:8a24b3e070b90b5fc1630e60ae7b4323b43e1696a181bc4ce80f5e1e6e028184"
              id: "lifecycle-recovery-source"
              kind: "source_code"
              plan_revision: 1
              repository_fingerprint: "sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a"
              task_id: "202609231019-MPSGJZ"
              work_item_id: "implement-lifecycle-recovery"
            -
              attempt: 1
              digest: "sha256:97ac2c99a789bad138464015b27516ad42a35919b3e700938ff91cce21aff567"
              id: "lifecycle-recovery-regression-tests"
              kind: "test_evidence"
              plan_revision: 1
              repository_fingerprint: "sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a"
              task_id: "202609231019-MPSGJZ"
              work_item_id: "implement-lifecycle-recovery"
          result_digest: "sha256:f16cce1354cc1c86e5e06c590abd9a6a1bf2eb187942d3680e92009a287e70e7"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:bcf6eacd7902c78761f47dc57d3be44fb81ef69aaa493555ca3c56a6a45d1841"
              - "sha256:e9999f10a6bf6231faab4ed945197d7c3e492d2dd1d7b602c604cccb9d750d5b"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:ad8dc5625f853ec214b1b520121ffba15d91797255341f972beb1d772ac41318"
              environment_digest: "sha256:62da294665f505fb8581a17baca46711f192f4e5599b716d93fcb021821d42f3"
              implementation_identity: "sha256:f16cce1354cc1c86e5e06c590abd9a6a1bf2eb187942d3680e92009a287e70e7"
              toolchain_digest: "sha256:a0ee42b1cba7905d88b1510be74b48ec1d0ac21b6f282a81bfde91979f9179ad"
            observed_at: "2026-09-23T11:08:08.624Z"
            status: "PASSED"
    digest: "sha256:e2adf7e22946398d3a167fbd3f98e2266bf1a52b009b8f309b785ea447c0f739"
    documents:
      contracts:
        sha256:85adf459dab98874dd575e76b54c29fc26871f0436219e7ae2d7fef54236ab5c:
          acceptance_criteria:
            - "Semantic WorkItems cannot claim PR publication, hosted checks, merge, hosted close, cleanup, or equivalent provider lifecycle effects."
            - "Host decision parsing, shell-safe text input, accepted-result replay, task revision binding, pre-effect recovery, and repeat cleanup preserve fail-closed behavior with focused tests."
            - "Completed canonical branch tasks route implementation rework, verification, and quality review through the authoritative task checkout."
            - "Branch supervisor replacement and stale-state recovery preserve exact failed-operation identity and never replay an uncertain effect."
            - "An exact implementation_rework WorkOrder may execute against a DONE task without reopening the completed Task Kernel aggregate."
            - "integration.enqueue and integration.run_next execute from the frozen base checkout without controller transfer after canonical completion."
            - "Codex role-specific output schemas contain no unsupported composition keywords and satisfy strict required-property rules."
            - "The branch contains no task artifacts owned by earlier tasks."
          objective: "Implement the verified 0.7.11 lifecycle hardening and completed-task branch supervisor fixes on one clean branch without internal provider lifecycle work items."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:full"
      intent:
        context: "Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks."
        objective: "Fix canonical completed-task branch lifecycle recovery without internal provider work items"
    events:
      -
        command_digest: "sha256:66a0984986af953894e8fac677a08f3e9595aa8d5c4ac7fa90bef219d4454c3e"
        id: "capture:202609231019-MPSGJZ:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609231019-MPSGJZ"
        occurred_at: "2026-09-23T10:19:46.741Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609231019-MPSGJZ"
        task_revision: 1
      -
        command_digest: "sha256:b26b496b1691c3346b7cf5257bd137f007e36b53622fc9a49c7ab0c5496be846"
        id: "result:sha256:295d5ff633369d21369c2107b77bdca5ffce4fe7736d797b1274a4b71f1799ff:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:295d5ff633369d21369c2107b77bdca5ffce4fe7736d797b1274a4b71f1799ff"
        occurred_at: "2026-09-23T10:21:54.545Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609231019-MPSGJZ"
        task_revision: 2
      -
        command_digest: "sha256:14c972b47a12f2c709e2a907b183093ea5a14d4cb96ad8583d923757aaba9693"
        id: "sha256:5ae3b40218cd92808f87d630541bd07c0e076d57fe840d224c741c818b27c1f2:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:5ae3b40218cd92808f87d630541bd07c0e076d57fe840d224c741c818b27c1f2"
        occurred_at: "2026-09-23T10:22:03.013Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609231019-MPSGJZ"
        task_revision: 3
      -
        command_digest: "sha256:78eba9212ab26106e5fadfbced8fe91af3d04162c073b446d6f57f137af1a327"
        id: "kernel_work_item_materialization_required:sha256:fc8b59869fb3dbd3dfe9e7516f4d32229ba8bc83e26035c91381e709907e2a94:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:fc8b59869fb3dbd3dfe9e7516f4d32229ba8bc83e26035c91381e709907e2a94:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-23T10:22:14.045Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609231019-MPSGJZ"
        task_revision: 4
      -
        command_digest: "sha256:35595c91d5dd1253c419658209f28949a935158515201e668b9590e12d7f893d"
        id: "kernel_work_item_claim_required:sha256:863e03b07292f7790c14f4a0f4c92dce7a2739b18bcb9d46946044855948e433:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:863e03b07292f7790c14f4a0f4c92dce7a2739b18bcb9d46946044855948e433:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-23T10:22:17.742Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609231019-MPSGJZ"
        task_revision: 5
      -
        command_digest: "sha256:22fe1774914db32ef10228d9a74518eaac8f5e7b2970db5df4a768a44dd30def"
        id: "kernel_work_item_execution_required:sha256:611f727a88f1f6432e3a172f32cc8e291714ac2ecc349ff2eec0d7c060c93a4a:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:611f727a88f1f6432e3a172f32cc8e291714ac2ecc349ff2eec0d7c060c93a4a:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-23T10:22:32.554Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609231019-MPSGJZ"
        task_revision: 6
      -
        command_digest: "sha256:cfa99706db076d297c6bd619f2455646aed69fa23dec484e709b02e65ccdb139"
        id: "sha256:229782e83ea5f7831ef21166225129e64588fb34e54a38cef317726079318e5c:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:229782e83ea5f7831ef21166225129e64588fb34e54a38cef317726079318e5c"
        occurred_at: "2026-09-23T10:57:11.682Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609231019-MPSGJZ"
        task_revision: 7
      -
        command_digest: "sha256:daad812d0910a062e162db40e4a705d424a8680b27ac3ffa92a035575d9a1e5b"
        id: "result:sha256:0ddc0cee4143f9a1c97f48a79a4ec518abf800d7a215c80a1f7b345580c44d21:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:0ddc0cee4143f9a1c97f48a79a4ec518abf800d7a215c80a1f7b345580c44d21"
        occurred_at: "2026-09-23T10:57:15.751Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609231019-MPSGJZ"
        task_revision: 8
      -
        command_digest: "sha256:92e5733bbd0657281ae3c5a118684f1208a759b920951e40d9be10b71bd7ea65"
        id: "kernel_work_item_inspection_required:sha256:63031697e2fce17b5283491403717d652ed8fa47621949dedc38c4467fe3e223:sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:63031697e2fce17b5283491403717d652ed8fa47621949dedc38c4467fe3e223:sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a"
        occurred_at: "2026-09-23T10:57:18.958Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609231019-MPSGJZ"
        task_revision: 9
      -
        command_digest: "sha256:9fdb89950ae44ea21135617013aa4d00cd6d197be4aec616a33cb65076f407ef"
        id: "validation:sha256:2c1b20755cb1de1ea54021d939676d04dac3d4eb5f18feb70c0ea5202d5e02da:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2c1b20755cb1de1ea54021d939676d04dac3d4eb5f18feb70c0ea5202d5e02da"
        occurred_at: "2026-09-23T11:08:11.726Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609231019-MPSGJZ"
        task_revision: 10
      -
        command_digest: "sha256:16c39badbb1b5bbf94fed5d1577f3973020ae997a335c5255d4f41f6667d4bed"
        id: "validation-resolution:sha256:17443d07d6020b3d0493c23f40ec33c7325f26440d3c4e2ff3f3ba6885485702:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:17443d07d6020b3d0493c23f40ec33c7325f26440d3c4e2ff3f3ba6885485702"
        occurred_at: "2026-09-23T11:08:13.656Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609231019-MPSGJZ"
        task_revision: 11
      -
        command_digest: "sha256:f24777cc627d913b5011404e51b6700dae1161c7d838dc3f032cf256c455bb08"
        id: "final-validation:sha256:13eeecb164bff3772b1d4ed26a7c9209027597f086555e0e889e01608472c464:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:13eeecb164bff3772b1d4ed26a7c9209027597f086555e0e889e01608472c464:11"
        occurred_at: "2026-09-23T11:15:41.069Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202609231019-MPSGJZ"
        task_revision: 12
      -
        command_digest: "sha256:0c72ebec83a948ead033770004dce69346e5114ccefdc684b04c59992daed686"
        id: "kernel_task_completion_required:sha256:61ead1c6a7d6384d3fd46e4a1d5a0c828922d9f52928960ae93d781b7d6fbd7c:sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:61ead1c6a7d6384d3fd46e4a1d5a0c828922d9f52928960ae93d781b7d6fbd7c:sha256:e9a4e9ca818bc7a701a7c46fa300d75c427572aa705f5b389061b96b83fc609a"
        occurred_at: "2026-09-23T11:16:03.638Z"
        payload_digest: "sha256:ae743eab051bd6a1e4873e5dd9f9c4f11e55aba5a3ec2b0a285930130dc72fbd"
        task_id: "202609231019-MPSGJZ"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Fix canonical completed-task branch lifecycle recovery without internal provider work items

Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.

## Scope

- In scope: Implement the verified AgentPlane lifecycle fixes as one clean semantic code task. Keep implementation, tests, and local verification in the work item. Leave PR publication, hosted checks, merge, and cleanup to branch_pr lifecycle. Include completed canonical implementation-rework routing, safe supervisor journal replacement and stale-state recovery, exact DONE rework runner authority, completed verification and quality-review routing, base-checkout provider operations, and Codex-compatible strict output schemas. Do not include task artifacts from other tasks.
- Out of scope: unrelated refactors not required for "Fix canonical completed-task branch lifecycle recovery without internal provider work items".

## Plan

1. Execute approved WorkItem implement-lifecycle-recovery.

## Verify Steps

PLANNER fallback scaffold for "Fix canonical completed-task branch lifecycle recovery without internal provider work items". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix canonical completed-task branch lifecycle recovery without internal provider work items". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-23T11:15:46.137Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:5f3d95b05b031f07880a41a3eca628614d6b7cf0567af923f9cf8881f7c6b8ca, input_digest=sha256:429d531075fa44b735c1cfeb455c1ca12e0fc8b046e7dd628cd013303cd56843

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check critical_paths (3/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts packages/agentplane/src/commands/task/branch-task-supervisor.test.ts packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/runner/adapters/codex-result-transport.test.ts packages/agentplane/src/runner/adapters/roadmap-output-parity.test.ts
Result: pass
Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609231019-MPSGJZ/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609231019-MPSGJZ Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:b8810dd303286d6fdd7c8b7e964e33cdb45ef13091247e90d5d458d559e9f9a0
- policy_digest: sha256:1508520334b86880f4c7ebdff3696edff99bcc2f3bd0e31747a3b7da58bf1dd6
- capability_digest: sha256:44668150af015035b4f9295eeb1e83a605e3c89b183ce28b4421a381c9bdb75f
- checks_digest: sha256:46be63a181b477f7e54d121bc1d553426d324512c08aeefb0501b8cbfeb9d704
- identity_digest: sha256:f300c2c9634733bc5fa6f3d8f15f7d030b380f54f05e5884ee4bc2f9394bce17

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
