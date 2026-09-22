---
id: "202609222222-GGCDPS"
title: "Run canonical post-completion integration operations from the authoritative base checkout"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on: []
tags:
  - "lifecycle"
  - "supervisor"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-22T22:33:38.972Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-22T22:42:20.049Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-22T22:33:38.972Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "fa88b5008ed01aea995708beae093edc9b6f49a8"
  review_identity_digest: "sha256:8ed08f912ace57ee74789329c7e7265a7ecb63bd65ad733134666263f05c9fc8"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609222222-GGCDPS/528bf2b5d3c17f7f70d222b855d96466881c20c38b45d4654537e264c9c3f3aa/quality-report.json"
  findings:
    - "PASS: integration.enqueue and integration.run_next now satisfy the existing canonicalCompletionPrecedesWorkflow handoff predicate."
    - "PASS: pr.open remains task-worktree-owned and no authority or admitted-supervisor code changed."
    - "PASS: focused handoff, terminal replay, and coordinator tests passed with typecheck and lint."
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
      - "release_metadata"
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
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "repository_effect:tests"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
      - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
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
        id: "recorded-check-10"
        result: "pass"
      -
        id: "recorded-check-11"
        result: "pass"
      -
        id: "recorded-check-12"
        result: "pass"
      -
        id: "recorded-check-13"
        result: "pass"
      -
        id: "recorded-check-14"
        result: "pass"
      -
        id: "recorded-check-15"
        result: "pass"
      -
        id: "recorded-check-16"
        result: "pass"
      -
        id: "recorded-check-17"
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
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:b2f0329034b90bfdb73bf4b55e44e558f54d89cec7529e76a4e01f2a52dfb837"
      escalation_reasons:
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
          - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
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
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
        - "real_e2e"
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
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "fa88b5008ed01aea995708beae093edc9b6f49a8"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-22T22:42:20.049Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-22T22:42:21.027Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations."
sections:
  Summary: |-
    Run canonical post-completion integration operations from the authoritative base checkout

    Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.
  Scope: |-
    - In scope: Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.
    - Out of scope: unrelated refactors not required for "Run canonical post-completion integration operations from the authoritative base checkout".
  Plan: "1. Execute approved WorkItem route-canonical-integration-to-base."
  Verify Steps: |-
    PLANNER fallback scaffold for "Run canonical post-completion integration operations from the authoritative base checkout". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Run canonical post-completion integration operations from the authoritative base checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-22T22:42:20.049Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:ba7307254e55c7a98b5ec80621015e3d2514c52390237a0fd5eb0c3602f93250, input_digest=sha256:84ea8844834ae3023c52115633efa36c7b70110f04494b16b038aa60e26340b7

    Details:

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check full_regression

    Check: real_e2e
    Command: bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check real_e2e (1/4)

    Check: real_e2e
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check real_e2e (2/4)

    Check: real_e2e
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check real_e2e (3/4)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check real_e2e (4/4)

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609222222-GGCDPS Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:69a2770e235719523014bdaf4d56d439f7dd354230c8bf7ddc08ce6ce1b19035
    - policy_digest: sha256:9b668d089af056af9741759543ed685caaa27c913a3aa16d382cfde5faf1adc7
    - capability_digest: sha256:4fad168dcc6ce614e806e5ee61bfa5b2309a2f4596fd91f7b675e8f86b7f6ad8
    - checks_digest: sha256:1fa60887df046d3264c65f7aeed438d45c76cc44ff95aba45e1b2beac0ac4e03
    - identity_digest: sha256:dee7a749c983c575412e4d314aab13a4c4b5179cc9a5890462a679d4d9ef1f1b

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
    digest: "sha256:6a095bf24ed8f287f45c93c219aa897e27b26364be4ba443595227f29593664d"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609222222-GGCDPS/528bf2b5d3c17f7f70d222b855d96466881c20c38b45d4654537e264c9c3f3aa/quality-report.json"
    findings:
      - "PASS: integration.enqueue and integration.run_next now satisfy the existing canonicalCompletionPrecedesWorkflow handoff predicate."
      - "PASS: pr.open remains task-worktree-owned and no authority or admitted-supervisor code changed."
      - "PASS: focused handoff, terminal replay, and coordinator tests passed with typecheck and lint."
    implementation_commit: "fa88b5008ed01aea995708beae093edc9b6f49a8"
    implementation_tree: "7b9b8558d456269ed71c8247013a4b425f1e1bd2"
    projected_at: "2026-09-22T22:33:38.972Z"
    review_identity_digest: "sha256:8ed08f912ace57ee74789329c7e7265a7ecb63bd65ad733134666263f05c9fc8"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:19063159ea168b60c0126240f00a7d7e63244bff75a7494a128f58a7d1485a3e"
    work_order_id: "sha256:83b3fee5c650ed912b891212292a92637623e371ac0c20a562a7a6a19d41e0d5"
  task_execution_context:
    base_ref: "task/202609221053-GMZJ6N/canonical-provider-lifecycle"
    base_sha: "23d16a9d2a0471268f921502d5ba233d4a53451e"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities: []
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:9652c98d0f62b2eb669ff1823ea8345488544a4b614f5f248a278e8b6a14732c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:69a2770e235719523014bdaf4d56d439f7dd354230c8bf7ddc08ce6ce1b19035"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:d775d63721df69fb80e86849b1699a8b686c5fb762150293efd5950dcfc27ea8"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609222222-GGCDPS"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities: []
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:987d4e6ea69a3b25a0112e986f4ac54a956b314b650740deb40b6e9cf3b6c5c2"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:69a2770e235719523014bdaf4d56d439f7dd354230c8bf7ddc08ce6ce1b19035"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:d775d63721df69fb80e86849b1699a8b686c5fb762150293efd5950dcfc27ea8"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:9652c98d0f62b2eb669ff1823ea8345488544a4b614f5f248a278e8b6a14732c"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609222222-GGCDPS"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/advance-task-step.ts"
              - "packages/agentplane/src/commands/task/advance.command.ts"
              - "packages/agentplane/src/commands/task/branch-task-supervisor.test.ts"
              - "packages/agentplane/src/commands/task/finish-execute.ts"
              - "packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.test.ts"
              - "packages/agentplane/src/commands/task/kernel-provider-effect-coordinator.ts"
              - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
              - "packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts"
            evidence_digest: "sha256:56a9838bb7e87bce7c35f529f45b5068f31d05242de8c0625f0e29d5b993f0a9"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        -
          approval_mode: null
          authority:
            capabilities: []
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:c268d671201ec1185c3434a633fffca327fe67083b08679ba3ff6f8958f0b837"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:69a2770e235719523014bdaf4d56d439f7dd354230c8bf7ddc08ce6ce1b19035"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:d775d63721df69fb80e86849b1699a8b686c5fb762150293efd5950dcfc27ea8"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:987d4e6ea69a3b25a0112e986f4ac54a956b314b650740deb40b6e9cf3b6c5c2"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609222222-GGCDPS"
            validation_requirements:
              - "bun run lint"
              - "bun run typecheck"
              - "bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/ordinary-advance-step.ts"
              - "packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts"
            evidence_digest: "sha256:e95864f2024229b616b53da8ffb393e6915769f595d9102eae06aa7981bc36bf"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:d775d63721df69fb80e86849b1699a8b686c5fb762150293efd5950dcfc27ea8"
        digest: "sha256:69a2770e235719523014bdaf4d56d439f7dd354230c8bf7ddc08ce6ce1b19035"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:acff2d436080f408f93d82cfc361210099f5e4bfc3e46acf81bd4bcc9bfb68fc"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-integration-base-source"
              - "canonical-integration-base-tests"
            id: "route-canonical-integration-to-base"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:19063159ea168b60c0126240f00a7d7e63244bff75a7494a128f58a7d1485a3e"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:13fe1366669a9c334a90e0d6ec389dc385803cf76fd9d103f5133e09ac49d63c"
          environment_digest: "sha256:e95286c5a6f8c69c2c45836dcc01c4b8216343f93b495db14fd712b36c135f89"
          implementation_identity: "sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa"
          toolchain_digest: "sha256:1fdb7b1f98d6d6944bda5a42483dccbb625fa53d9958f81cd98762ddfdf8bfe0"
        observed_at: "2026-09-22T22:33:50.305Z"
        status: "PASSED"
      id: "202609222222-GGCDPS"
      intent_digest: "sha256:916a15918a167521ac7c0a0acd41427f8e9bd644e7340edc38d6967c756fa829"
      migration_receipts: []
      mutation_receipts:
        capture:202609222222-GGCDPS:
          after_revision: 1
          aggregate_digest: "sha256:5775b35697e150bb336b037495bbf5289a7ad46dfbb998c6f6dbffff9b306207"
          before_revision: 0
          command_digest: "sha256:4c33aaaeca686e4296665134234dc249c96352b1e1f48a8fd042ab33b2ed9929"
          effect_ids: []
          event_digests:
            - "sha256:59421cc889156c730992e2079263b8f01acb0331bf12022e46370cd8cd2cd2f4"
          mutation_id: "capture:202609222222-GGCDPS"
        final-validation:sha256:19063159ea168b60c0126240f00a7d7e63244bff75a7494a128f58a7d1485a3e:12:
          after_revision: 13
          aggregate_digest: "sha256:cadeb72ae32e9340018cb1874930c46f41be5257dabde7dd30a6d664d7ca8e3d"
          before_revision: 12
          command_digest: "sha256:721f7d8b520b9862bbd3d8afa408472f2e6288a6a5d20657eafe57b9aca7818e"
          effect_ids: []
          event_digests:
            - "sha256:278f3a4f3d9d09018867d183de967a06e95a6dd4e491c3eec29c37edd13d92eb"
          mutation_id: "final-validation:sha256:19063159ea168b60c0126240f00a7d7e63244bff75a7494a128f58a7d1485a3e:12"
        kernel_task_completion_required:sha256:3ee03629d49c81a4ca559dfc49421b62a6e14528bed3d2b1b36764cd1bc35263:sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa:
          after_revision: 14
          aggregate_digest: "sha256:9b9a650b4da157a63a9d66b05dcbcd1893d1e48916cab9ec4b2203089bf0bf4b"
          before_revision: 13
          command_digest: "sha256:4ee20dee1b070d799b248b6ba4e43c21ec870a4f7aefbefa9eeffacb1a0333d2"
          effect_ids: []
          event_digests:
            - "sha256:ed4383d4cf5200129fbafafe61314f170a42b4dd5dfce0c64d3a0ddfd84e1e0e"
          mutation_id: "kernel_task_completion_required:sha256:3ee03629d49c81a4ca559dfc49421b62a6e14528bed3d2b1b36764cd1bc35263:sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa"
        kernel_work_item_claim_required:sha256:baad514d329f9bda13e6cafd9dccfe108e60557d2430c710a796c82181db5abf:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 5
          aggregate_digest: "sha256:ab60fc390304acbf56956c84ed02da7ed9891552fd0979d95d0e294f520a5459"
          before_revision: 4
          command_digest: "sha256:72f8425903e248ab0bd764bb5c863e16de8ccc4cce33114cc22116d97d1bcc84"
          effect_ids: []
          event_digests:
            - "sha256:2415cf17203416d48fab11dac567799a16a0ab2aebc1bad2ac5bc1829e812fea"
          mutation_id: "kernel_work_item_claim_required:sha256:baad514d329f9bda13e6cafd9dccfe108e60557d2430c710a796c82181db5abf:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        kernel_work_item_execution_required:sha256:dc57361430a44b9cb6c860c36bfdf987be4ba2c6bb317001a3fe526847409331:sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474:
          after_revision: 7
          aggregate_digest: "sha256:67080c974b62257b8b9ed948a74644cdb7cfe037a9a138d6dc4e0c59bce4d56b"
          before_revision: 6
          command_digest: "sha256:e609f7a77200e8672369dcfba9a98ac83891fb049f3776b4fdf3e9b6f1e2f00a"
          effect_ids: []
          event_digests:
            - "sha256:b43ff0cb1daa78c9322968b8d81b26173d992c911fdb306e79a456f155ec355f"
          mutation_id: "kernel_work_item_execution_required:sha256:dc57361430a44b9cb6c860c36bfdf987be4ba2c6bb317001a3fe526847409331:sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474"
        kernel_work_item_inspection_required:sha256:f4126c03bb344087a54d95a1620921537ab491110691fc3e5d6dd0dcf7a24a74:sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa:
          after_revision: 10
          aggregate_digest: "sha256:3e95753fd7e1d7fdf0a01c4f5757c00c8c78f94ce667f0a3886d18e79a3b0128"
          before_revision: 9
          command_digest: "sha256:52bdba86993d342b79d24b520e23d6a254d5b06a4a9cecf290f343d9c8a45256"
          effect_ids: []
          event_digests:
            - "sha256:6096dae8cc0779f0fa16e8b353f1001e4665eafc1532997748d3b2bac7684c64"
          mutation_id: "kernel_work_item_inspection_required:sha256:f4126c03bb344087a54d95a1620921537ab491110691fc3e5d6dd0dcf7a24a74:sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa"
        kernel_work_item_materialization_required:sha256:e358ec63eed06d33f42ae43430f7cdc3f249ab9064122e4a764822456ed9cfc3:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:
          after_revision: 4
          aggregate_digest: "sha256:f5c5229c58668ba3e2278d6d7bcabead4afe7af214a3b63305dfbe37f0465d89"
          before_revision: 3
          command_digest: "sha256:c5a32c658366b7144f11df962d825244c55c4624246ef4d666a621f7bb5b739b"
          effect_ids: []
          event_digests:
            - "sha256:ac9f87bf83341b02dd5fea23f6e9e7ae5983aeb32555a5151886092c7409590a"
          mutation_id: "kernel_work_item_materialization_required:sha256:e358ec63eed06d33f42ae43430f7cdc3f249ab9064122e4a764822456ed9cfc3:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        result:sha256:496694589429aa085b0bcc09d4f915e6f706fdfb81a9759ad059e32af14074eb:
          after_revision: 2
          aggregate_digest: "sha256:9ecd6f47a7825ab774df84f69e22886fee559841b847ed8f1782ea395c31323e"
          before_revision: 1
          command_digest: "sha256:ae49117ce3f6840a39283c7126cc0e81170a24b0520f2ca9953c49c3caff92e2"
          effect_ids: []
          event_digests:
            - "sha256:91f2549e8c004acee20e4ce50b87074dcc1f9cef8e11c0f43f51f63dc03f8bb5"
          mutation_id: "result:sha256:496694589429aa085b0bcc09d4f915e6f706fdfb81a9759ad059e32af14074eb"
        result:sha256:83b3fee5c650ed912b891212292a92637623e371ac0c20a562a7a6a19d41e0d5:
          after_revision: 9
          aggregate_digest: "sha256:b0f10713a40089dcd8d28d781ec5a57d7264a384cd25a87f3ea582f8cd36c6f8"
          before_revision: 8
          command_digest: "sha256:f76b64a111aab8684fa1fd937b8e472799364cc03c59b37614c06d972a7a3e53"
          effect_ids: []
          event_digests:
            - "sha256:d91aeac36c3587b0ac45432a78f7fb85203ea09e4097cf8f7933a71df7340068"
          mutation_id: "result:sha256:83b3fee5c650ed912b891212292a92637623e371ac0c20a562a7a6a19d41e0d5"
        sha256:00a2c6fb5455e7dd8065c370c7da8a833b4524446bd54e9f6c22e5701c0d6f24:
          after_revision: 6
          aggregate_digest: "sha256:eead457b241496a1c22fa56f6b1785c6be79cca62d8fa02171da0ee75147b111"
          before_revision: 5
          command_digest: "sha256:3950c24e2b63cd901e482621e2f7a5383eca8c285fcac8a547f94751996928d2"
          effect_ids: []
          event_digests:
            - "sha256:2bb642858731baaa58f5b4dce1ef762e89f04fee6b83b6c29cba3684e500f090"
          mutation_id: "sha256:00a2c6fb5455e7dd8065c370c7da8a833b4524446bd54e9f6c22e5701c0d6f24"
        sha256:12ee7310b2cd8d8a25d3e2a4988f73383c70cda753f89233a969369f15326bbe:
          after_revision: 8
          aggregate_digest: "sha256:2b93f7f46c69351a1411d9b2e201a1c085085e5269f1dd5f8d4a9ced7995ba96"
          before_revision: 7
          command_digest: "sha256:f7fedfa01843428ecb41c0547d527243bc8b3859a4c745b42dd4e1854fadf392"
          effect_ids: []
          event_digests:
            - "sha256:b1cb61c883729bb19930321ee66bd0d6c4edfa9b14b2d23c10097f706ef061f8"
          mutation_id: "sha256:12ee7310b2cd8d8a25d3e2a4988f73383c70cda753f89233a969369f15326bbe"
        sha256:5fe3b175759c363a6a9053c1760a89486ad21adad767fe29a28b330c5a2f9b36:
          after_revision: 3
          aggregate_digest: "sha256:9bb76c97529ccc5bfb049367edb5db727982e04264d2a4ebc6da856ae03dc827"
          before_revision: 2
          command_digest: "sha256:80fbe9c1e57d93c3a92950dc9e4dfc0c5d1945d3c2ce4307ee44bdf34155c86d"
          effect_ids: []
          event_digests:
            - "sha256:3f383dadd518e6e5c6190c0d88b0524ad2f5d35cf9468ba1f520c7d445710774"
          mutation_id: "sha256:5fe3b175759c363a6a9053c1760a89486ad21adad767fe29a28b330c5a2f9b36"
        validation-resolution:sha256:bafb914b2dd270694bc9f2cc39819f5427b8e9f37de41135de9f3fb7431de8ea:
          after_revision: 12
          aggregate_digest: "sha256:e8f5cadcc2247432c95b8697b0c905e18d05e1cb2c19f7dc273965b46437ebfd"
          before_revision: 11
          command_digest: "sha256:2cdcb9a833d22a92372ef4ff8b7cd1ffe4f727b71eabf411b6626e5b53d86909"
          effect_ids: []
          event_digests:
            - "sha256:1c98a13872adfc2391a5bc8e8980d5f18e20084cd56406309be77dd13504b9b6"
          mutation_id: "validation-resolution:sha256:bafb914b2dd270694bc9f2cc39819f5427b8e9f37de41135de9f3fb7431de8ea"
        validation:sha256:528bf2b5d3c17f7f70d222b855d96466881c20c38b45d4654537e264c9c3f3aa:
          after_revision: 11
          aggregate_digest: "sha256:da490ccbf0c8da7c3a3fc9d492c1cb026c6a87a402e399e90d6e7061fcd56f49"
          before_revision: 10
          command_digest: "sha256:21b6fa3d83232a313ceb82d351f5b63bddee0cf8966eae5ffde15fe0cdfc508b"
          effect_ids: []
          event_digests:
            - "sha256:7ce2ee73d959671d353917d1f9d666016d50919fcbb2bdacc7f2e67e433f2712"
          mutation_id: "validation:sha256:528bf2b5d3c17f7f70d222b855d96466881c20c38b45d4654537e264c9c3f3aa"
      plan_history: []
      revision: 14
      schema_version: 1
      state: "COMPLETED"
      work_items:
        route-canonical-integration-to-base:
          attempt: 1
          claim_id: "sha256:308c16e3ca161f2208ade9ae53daacee46f9dd841fabf12c1bb44dbcc0077bf6"
          definition:
            contract_digest: "sha256:acff2d436080f408f93d82cfc361210099f5e4bfc3e46acf81bd4bcc9bfb68fc"
            depends_on: []
            execution_requirements:
              capabilities: []
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "canonical-integration-base-source"
              - "canonical-integration-base-tests"
            id: "route-canonical-integration-to-base"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:ee77375df70de122af13bcd72d5b2ddb67c1adf37246444d25b6e7a765cfa836"
              id: "canonical-integration-base-source"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa"
              task_id: "202609222222-GGCDPS"
              work_item_id: "route-canonical-integration-to-base"
            -
              attempt: 1
              digest: "sha256:61e55494df9b7f21530aaea122b3bf8f73d1550bce524f2a5af0b400f6127b63"
              id: "canonical-integration-base-tests"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa"
              task_id: "202609222222-GGCDPS"
              work_item_id: "route-canonical-integration-to-base"
          result_digest: "sha256:be15e4e80fb1c4adf44a6d9406a1443c46ecd15226d2ce2068711c7b40773a6a"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:97deab320cdede7bdf785edc98363e7adb2b250f605124335de61c8bc24d5010"
              - "sha256:8ed08f912ace57ee74789329c7e7265a7ecb63bd65ad733134666263f05c9fc8"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:13fe1366669a9c334a90e0d6ec389dc385803cf76fd9d103f5133e09ac49d63c"
              environment_digest: "sha256:a15e2972f1b0d6e1326fd8646046c0c92a4c11b56a7d22ac9c220ff5bbc9bd41"
              implementation_identity: "sha256:be15e4e80fb1c4adf44a6d9406a1443c46ecd15226d2ce2068711c7b40773a6a"
              toolchain_digest: "sha256:a0ee42b1cba7905d88b1510be74b48ec1d0ac21b6f282a81bfde91979f9179ad"
            observed_at: "2026-09-22T22:33:38.972Z"
            status: "PASSED"
    digest: "sha256:63e17cb4818dbe21d6882ab2f0a292709a8191426355a963dec19dd82796429e"
    documents:
      contracts:
        sha256:acff2d436080f408f93d82cfc361210099f5e4bfc3e46acf81bd4bcc9bfb68fc:
          acceptance_criteria:
            - "integration.enqueue is classified as requiring canonical completion before base-checkout workflow execution."
            - "integration.run_next uses the same base-checkout handoff and retains controller suspension recovery."
            - "PR publication and task-worktree-only operations keep their existing checkout behavior."
            - "Existing exact side-effect authority and durable supervisor admission remain unchanged."
          objective: "Transfer completed canonical branch_pr control to the authoritative base checkout before integration.enqueue and integration.run_next, without changing authority or non-integration routing."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts"
            - "bun run typecheck"
            - "bun run lint"
      intent:
        context: "Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations."
        objective: "Run canonical post-completion integration operations from the authoritative base checkout"
    events:
      -
        command_digest: "sha256:4c33aaaeca686e4296665134234dc249c96352b1e1f48a8fd042ab33b2ed9929"
        id: "capture:202609222222-GGCDPS:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609222222-GGCDPS"
        occurred_at: "2026-09-22T22:22:51.982Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609222222-GGCDPS"
        task_revision: 1
      -
        command_digest: "sha256:ae49117ce3f6840a39283c7126cc0e81170a24b0520f2ca9953c49c3caff92e2"
        id: "result:sha256:496694589429aa085b0bcc09d4f915e6f706fdfb81a9759ad059e32af14074eb:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:496694589429aa085b0bcc09d4f915e6f706fdfb81a9759ad059e32af14074eb"
        occurred_at: "2026-09-22T22:24:43.945Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609222222-GGCDPS"
        task_revision: 2
      -
        command_digest: "sha256:80fbe9c1e57d93c3a92950dc9e4dfc0c5d1945d3c2ce4307ee44bdf34155c86d"
        id: "sha256:5fe3b175759c363a6a9053c1760a89486ad21adad767fe29a28b330c5a2f9b36:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:5fe3b175759c363a6a9053c1760a89486ad21adad767fe29a28b330c5a2f9b36"
        occurred_at: "2026-09-22T22:24:54.765Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609222222-GGCDPS"
        task_revision: 3
      -
        command_digest: "sha256:c5a32c658366b7144f11df962d825244c55c4624246ef4d666a621f7bb5b739b"
        id: "kernel_work_item_materialization_required:sha256:e358ec63eed06d33f42ae43430f7cdc3f249ab9064122e4a764822456ed9cfc3:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:e358ec63eed06d33f42ae43430f7cdc3f249ab9064122e4a764822456ed9cfc3:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T22:25:04.556Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609222222-GGCDPS"
        task_revision: 4
      -
        command_digest: "sha256:72f8425903e248ab0bd764bb5c863e16de8ccc4cce33114cc22116d97d1bcc84"
        id: "kernel_work_item_claim_required:sha256:baad514d329f9bda13e6cafd9dccfe108e60557d2430c710a796c82181db5abf:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:baad514d329f9bda13e6cafd9dccfe108e60557d2430c710a796c82181db5abf:sha256:08247094cef311214d4b924b51e0e98802c558a8468ec3f57f672332d26c9a09"
        occurred_at: "2026-09-22T22:25:09.639Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609222222-GGCDPS"
        task_revision: 5
      -
        command_digest: "sha256:3950c24e2b63cd901e482621e2f7a5383eca8c285fcac8a547f94751996928d2"
        id: "sha256:00a2c6fb5455e7dd8065c370c7da8a833b4524446bd54e9f6c22e5701c0d6f24:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:00a2c6fb5455e7dd8065c370c7da8a833b4524446bd54e9f6c22e5701c0d6f24"
        occurred_at: "2026-09-22T22:27:55.643Z"
        payload_digest: "sha256:15c20c5616341fdd9f0c1f31b64ad0c10af5fd1ae2ba252e389bb229cef40559"
        task_id: "202609222222-GGCDPS"
        task_revision: 6
      -
        command_digest: "sha256:e609f7a77200e8672369dcfba9a98ac83891fb049f3776b4fdf3e9b6f1e2f00a"
        id: "kernel_work_item_execution_required:sha256:dc57361430a44b9cb6c860c36bfdf987be4ba2c6bb317001a3fe526847409331:sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:dc57361430a44b9cb6c860c36bfdf987be4ba2c6bb317001a3fe526847409331:sha256:a64e67b458317db5efb89500e1130b6d0a8a94239ac6f85d30bc1b068fc96474"
        occurred_at: "2026-09-22T22:28:00.141Z"
        payload_digest: "sha256:502ec79b9f0a5f8b14bad0e83503bc7b7b0faddbf1f98d3d75514393dfbb282f"
        task_id: "202609222222-GGCDPS"
        task_revision: 7
      -
        command_digest: "sha256:f7fedfa01843428ecb41c0547d527243bc8b3859a4c745b42dd4e1854fadf392"
        id: "sha256:12ee7310b2cd8d8a25d3e2a4988f73383c70cda753f89233a969369f15326bbe:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:12ee7310b2cd8d8a25d3e2a4988f73383c70cda753f89233a969369f15326bbe"
        occurred_at: "2026-09-22T22:31:06.910Z"
        payload_digest: "sha256:b913af17252e3d12f155266d382f5a9b49656f3c6d0a5a7055cbfcc0a793c338"
        task_id: "202609222222-GGCDPS"
        task_revision: 8
      -
        command_digest: "sha256:f76b64a111aab8684fa1fd937b8e472799364cc03c59b37614c06d972a7a3e53"
        id: "result:sha256:83b3fee5c650ed912b891212292a92637623e371ac0c20a562a7a6a19d41e0d5:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:83b3fee5c650ed912b891212292a92637623e371ac0c20a562a7a6a19d41e0d5"
        occurred_at: "2026-09-22T22:31:13.303Z"
        payload_digest: "sha256:87b996b4f8326a5ffdd1598d6645a29c80b6850e6910a986a9a335c692bd7e3c"
        task_id: "202609222222-GGCDPS"
        task_revision: 9
      -
        command_digest: "sha256:52bdba86993d342b79d24b520e23d6a254d5b06a4a9cecf290f343d9c8a45256"
        id: "kernel_work_item_inspection_required:sha256:f4126c03bb344087a54d95a1620921537ab491110691fc3e5d6dd0dcf7a24a74:sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f4126c03bb344087a54d95a1620921537ab491110691fc3e5d6dd0dcf7a24a74:sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa"
        occurred_at: "2026-09-22T22:31:17.803Z"
        payload_digest: "sha256:4e1627b55bdbb06c268cf6e26e5076e3c9bac310da6b8aa12cddf471809bff7a"
        task_id: "202609222222-GGCDPS"
        task_revision: 10
      -
        command_digest: "sha256:21b6fa3d83232a313ceb82d351f5b63bddee0cf8966eae5ffde15fe0cdfc508b"
        id: "validation:sha256:528bf2b5d3c17f7f70d222b855d96466881c20c38b45d4654537e264c9c3f3aa:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:528bf2b5d3c17f7f70d222b855d96466881c20c38b45d4654537e264c9c3f3aa"
        occurred_at: "2026-09-22T22:33:43.027Z"
        payload_digest: "sha256:8e1c45cbb32ba688f8170b4435fd5f8500388104ac6888b6f69b845f56c08ed9"
        task_id: "202609222222-GGCDPS"
        task_revision: 11
      -
        command_digest: "sha256:2cdcb9a833d22a92372ef4ff8b7cd1ffe4f727b71eabf411b6626e5b53d86909"
        id: "validation-resolution:sha256:bafb914b2dd270694bc9f2cc39819f5427b8e9f37de41135de9f3fb7431de8ea:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:bafb914b2dd270694bc9f2cc39819f5427b8e9f37de41135de9f3fb7431de8ea"
        occurred_at: "2026-09-22T22:33:46.040Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609222222-GGCDPS"
        task_revision: 12
      -
        command_digest: "sha256:721f7d8b520b9862bbd3d8afa408472f2e6288a6a5d20657eafe57b9aca7818e"
        id: "final-validation:sha256:19063159ea168b60c0126240f00a7d7e63244bff75a7494a128f58a7d1485a3e:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:19063159ea168b60c0126240f00a7d7e63244bff75a7494a128f58a7d1485a3e:12"
        occurred_at: "2026-09-22T22:42:15.290Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202609222222-GGCDPS"
        task_revision: 13
      -
        command_digest: "sha256:4ee20dee1b070d799b248b6ba4e43c21ec870a4f7aefbefa9eeffacb1a0333d2"
        id: "kernel_task_completion_required:sha256:3ee03629d49c81a4ca559dfc49421b62a6e14528bed3d2b1b36764cd1bc35263:sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:3ee03629d49c81a4ca559dfc49421b62a6e14528bed3d2b1b36764cd1bc35263:sha256:caf98ec8fb49622d6ce08c153834b309c7de2a05554af9df89dcb9b10f8c69aa"
        occurred_at: "2026-09-22T22:42:40.695Z"
        payload_digest: "sha256:a8a8d0bc0cff32f4b2ca75daea16cc595d9d90fca860399842cb49b39ecc57d1"
        task_id: "202609222222-GGCDPS"
        task_revision: 14
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Run canonical post-completion integration operations from the authoritative base checkout

Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.

## Scope

- In scope: Fix the supervisor handoff exposed after PR publication: integration.enqueue and integration.run_next must transfer the canonical controller to the registered base checkout before execution. Preserve exact side-effect authority and existing task-worktree behavior for non-integration operations.
- Out of scope: unrelated refactors not required for "Run canonical post-completion integration operations from the authoritative base checkout".

## Plan

1. Execute approved WorkItem route-canonical-integration-to-base.

## Verify Steps

PLANNER fallback scaffold for "Run canonical post-completion integration operations from the authoritative base checkout". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Run canonical post-completion integration operations from the authoritative base checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-22T22:42:20.049Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:ba7307254e55c7a98b5ec80621015e3d2514c52390237a0fd5eb0c3602f93250, input_digest=sha256:84ea8844834ae3023c52115633efa36c7b70110f04494b16b038aa60e26340b7

Details:

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check full_regression

Check: real_e2e
Command: bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check real_e2e (1/4)

Check: real_e2e
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check real_e2e (2/4)

Check: real_e2e
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check real_e2e (3/4)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check real_e2e (4/4)

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/commands/task/roadmap-advance-one-step.test.ts packages/agentplane/src/commands/task/roadmap-terminal-noop.test.ts packages/agentplane/src/commands/task/kernel-controller-handoff.test.ts
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609222222-GGCDPS/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609222222-GGCDPS Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:69a2770e235719523014bdaf4d56d439f7dd354230c8bf7ddc08ce6ce1b19035
- policy_digest: sha256:9b668d089af056af9741759543ed685caaa27c913a3aa16d382cfde5faf1adc7
- capability_digest: sha256:4fad168dcc6ce614e806e5ee61bfa5b2309a2f4596fd91f7b675e8f86b7f6ad8
- checks_digest: sha256:1fa60887df046d3264c65f7aeed438d45c76cc44ff95aba45e1b2beac0ac4e03
- identity_digest: sha256:dee7a749c983c575412e4d314aab13a4c4b5179cc9a5890462a679d4d9ef1f1b

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
