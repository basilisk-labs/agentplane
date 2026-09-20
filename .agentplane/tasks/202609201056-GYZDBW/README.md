---
id: "202609201056-GYZDBW"
title: "Isolate canonical hosted-close regression"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "hosted-close"
  - "meta"
  - "release"
  - "task-kernel"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
  - "network"
  - "publish"
verify:
  - "bun run lint"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-20T11:10:50.368Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-20T11:21:14.631Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:54c9004ff04ae66e6a0bf7bec63e996e1aa8aa2b3e892614565182eaf09493b7"
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-20T11:10:50.368Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "9bbc4ad63d66a49bae93543efbb9b39b5a77a5e9"
  review_identity_digest: "sha256:e40ef5fd73ef88b562a24a11057caa2dab525022d48a4dcf14aceea9da530ea3"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609201056-GYZDBW/8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943/quality-report.json"
  findings:
    - "Pass: classifyKernelCutover identifies canonical records by the existing task_kernel extension and the command returns before task, PR metadata, evidence, incident or Git mutation."
    - "Pass: the integration scenario proves success, unchanged merge HEAD, unchanged canonical task bytes and a clean repository."
    - "Pass: legacy hosted-close coverage remains unchanged, focused tests pass, and docs-schema reports the same 10 oversized-test baseline entries."
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
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "release_metadata"
      - "repository_write"
      - "source_code"
    forbidden_external_effects:
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
    external_effects:
      - "network_read"
      - "publish"
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
      - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
      - "packages/agentplane/src/commands/task/hosted-close.command.ts"
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
    - "effect_publish"
    - "effect_release_metadata"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
          - "publish"
        repository_effects:
          - "release_metadata"
          - "repository_write"
          - "source_code"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:fa8750efcb22952a1dad7c69255f8f3bcbaae14c4aeaa8c1bb0d72c1ac49a09c"
      escalation_reasons:
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
          - "packages/agentplane/src/commands/task/hosted-close.command.ts"
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
      - "external_effect:network_read"
      - "external_effect:publish"
      - "hosted_integration"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "9bbc4ad63d66a49bae93543efbb9b39b5a77a5e9"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-20T11:21:14.631Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-20T11:21:15.661Z"
doc_updated_by: "SUPERVISOR"
description: "Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate."
sections:
  Summary: |-
    Isolate canonical hosted-close regression

    Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.
  Scope: |-
    - In scope: Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.
    - Out of scope: unrelated refactors not required for "Isolate canonical hosted-close regression".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Isolate canonical hosted-close regression". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Isolate canonical hosted-close regression". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-20T11:21:14.631Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0a64673447c440215ab6c51c37b1e9db9e4578e893093e602a5d24e1ce7f539c, input_digest=sha256:689875a801b1969916091b5b575ca2ab4c2d0785efa15c3bfa6f7f4b7bd8fc62

    Details:

    Check: affected_unit_integration
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: node scripts/checks/run-local-ci-group.mjs docs-schema
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: node scripts/checks/run-local-ci-group.mjs docs-schema
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check full_regression

    Check: real_e2e
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check real_e2e (1/4)

    Check: real_e2e
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check real_e2e (2/4)

    Check: real_e2e
    Command: node scripts/checks/run-local-ci-group.mjs docs-schema
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check real_e2e (3/4)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check real_e2e (4/4)

    Check: task_outcome
    Command: bun run lint
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: node scripts/checks/run-local-ci-group.mjs docs-schema
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201056-GYZDBW Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:2bda765eccea606a65743ea70fdb3097bd045d5de0143992a760f6db33f58665
    - policy_digest: sha256:ef062519baf46c86afe08917acaa5fee95a58d60c19dd2296cc7baa608814158
    - capability_digest: sha256:c7773401c9187b30d35df078ee87d7ccbc0bacb24096a0983e571daa25cb3928
    - checks_digest: sha256:0e99a99f13e3ceafa1a632c00bc362ee886ded70bcffbdbcf1448a68fb8dd08d
    - identity_digest: sha256:cf53774f0bdcaa16030bd14606ff16d99309d66effd410c99c25e50c2f07ef0c

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task plan set 202609201056-GYZDBW --text "<task-specific-plan>" --updated-by PLANNER
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
    digest: "sha256:71a354d40f0367800b075dce5960f07102201a89ff84930a865ade9017248ff8"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609201056-GYZDBW/8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943/quality-report.json"
    findings:
      - "Pass: classifyKernelCutover identifies canonical records by the existing task_kernel extension and the command returns before task, PR metadata, evidence, incident or Git mutation."
      - "Pass: the integration scenario proves success, unchanged merge HEAD, unchanged canonical task bytes and a clean repository."
      - "Pass: legacy hosted-close coverage remains unchanged, focused tests pass, and docs-schema reports the same 10 oversized-test baseline entries."
    implementation_commit: "9bbc4ad63d66a49bae93543efbb9b39b5a77a5e9"
    implementation_tree: "5b72347f30bf37674023a383c895dc542a174920"
    projected_at: "2026-09-20T11:10:50.368Z"
    review_identity_digest: "sha256:e40ef5fd73ef88b562a24a11057caa2dab525022d48a4dcf14aceea9da530ea3"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:54c9004ff04ae66e6a0bf7bec63e996e1aa8aa2b3e892614565182eaf09493b7"
    work_order_id: "sha256:c9aeca341091885bb26c79cd89309f2808d1ec378c8fd16364dde088a5723ce7"
  task_execution_context:
    base_ref: "main"
    base_sha: "c9265ac7041aba0df47b89c7bc81c111d4a5c70d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "manual_operator"
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e6bd2c9648237ac82978f6fb8b6755aac16d4d05be832e7261681bc5fd503e22"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2bda765eccea606a65743ea70fdb3097bd045d5de0143992a760f6db33f58665"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:485757f73df94f90edbd11d8d6dff44ddef61f874ade26348b64160a4b80757a"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
              - "packages/agentplane/src/commands/task/hosted-close.command.ts"
            task_id: "202609201056-GYZDBW"
            validation_requirements:
              - "bun run lint"
              - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts"
              - "node scripts/checks/run-local-ci-group.mjs docs-schema"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:005e2e07a0be24eb89e0fb097b4eca1a286a5f6ef2cdd0017ae17d1f7a8b9c5d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:2bda765eccea606a65743ea70fdb3097bd045d5de0143992a760f6db33f58665"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:485757f73df94f90edbd11d8d6dff44ddef61f874ade26348b64160a4b80757a"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:e6bd2c9648237ac82978f6fb8b6755aac16d4d05be832e7261681bc5fd503e22"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:a4b45efd21b0dee3c8efd59f4f12ac71048c93bc87d7499ee38fa1aa33fa1c86"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
              - "packages/agentplane/src/commands/task/hosted-close.command.ts"
            task_id: "202609201056-GYZDBW"
            validation_requirements:
              - "bun run lint"
              - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts"
              - "node scripts/checks/run-local-ci-group.mjs docs-schema"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
              - "packages/agentplane/src/commands/task/hosted-close.command.ts"
            evidence_digest: "sha256:017de23f05e77bd975d6be6dbd64e45e7f72ec640bc82e5db08196eb3dc8713e"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:485757f73df94f90edbd11d8d6dff44ddef61f874ade26348b64160a4b80757a"
        digest: "sha256:2bda765eccea606a65743ea70fdb3097bd045d5de0143992a760f6db33f58665"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:5c25b6df25d7cff61310bef11d3fc4ecf3eddfec44a9b173c3cf6ff245c8f30f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/hosted-close.command.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
            expected_outputs:
              - "hosted-close-guard"
              - "isolated-regression-test"
            id: "isolate-canonical-hosted-close"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:54c9004ff04ae66e6a0bf7bec63e996e1aa8aa2b3e892614565182eaf09493b7"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:4c531cfdecee0a80c02504c9111506ebf0733c8774f846cc2b1b078768b9b7f4"
          environment_digest: "sha256:7ab7064d5277bdb936f901995460994d5be22c5d6e575297a1117c09a44ffcb9"
          implementation_identity: "sha256:a4b45efd21b0dee3c8efd59f4f12ac71048c93bc87d7499ee38fa1aa33fa1c86"
          toolchain_digest: "sha256:e1b193c524d61fa7f60ec2db504ea03fb081990830ffc8394a8f2708c97af1e6"
        observed_at: "2026-09-20T11:12:23.671Z"
        status: "PASSED"
      id: "202609201056-GYZDBW"
      intent_digest: "sha256:a6fac88336c0dae5d9d773042db740caaf8ea2d06ecd4ea15cdea554481a4881"
      migration_receipts: []
      mutation_receipts:
        capture:202609201056-GYZDBW:
          after_revision: 1
          aggregate_digest: "sha256:e24bcf16bb2ed661a92daabc0f2365614ba868c7bb30b5f0b062b62fc799dc2b"
          before_revision: 0
          command_digest: "sha256:3a6f936a7c77515637299aaf5ec745f0fbc77d90ce985c7ae804ea0388971c64"
          effect_ids: []
          event_digests:
            - "sha256:e39f743488746e4aa5d492e09937ed14b7e60cabc5d8caf598768de97032ed9c"
          mutation_id: "capture:202609201056-GYZDBW"
        final-validation:sha256:54c9004ff04ae66e6a0bf7bec63e996e1aa8aa2b3e892614565182eaf09493b7:11:
          after_revision: 12
          aggregate_digest: "sha256:24f4574e4d907d491f97f51cd4d3a4708226ac3cb083b1737374337d773a4f63"
          before_revision: 11
          command_digest: "sha256:d9cae7a6441884c3abf8d870981bd31fff9ac189c7fcba3f9a5c73cca1ca9701"
          effect_ids: []
          event_digests:
            - "sha256:820a48a24d5def4daeca3148ffce478af7bca47791089fdd4c3c59ee2984aba9"
          mutation_id: "final-validation:sha256:54c9004ff04ae66e6a0bf7bec63e996e1aa8aa2b3e892614565182eaf09493b7:11"
        kernel_work_item_claim_required:sha256:d0e9d72d80fc98490271c1cba81d294a29ee7d569d5d0b78c7da9bff9826ca54:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:
          after_revision: 5
          aggregate_digest: "sha256:6e8d48dd31b58b8df1c98425b47cf724d0eb7dcedd67a1c7313ece74db8afc88"
          before_revision: 4
          command_digest: "sha256:c70bf3dc2b0eb84bc3b84519654ac7cfb1b389cd474275f2658fd3882d36238b"
          effect_ids: []
          event_digests:
            - "sha256:569a8abb83b5b9f0f2aba9ad2fa2bfd34847e150b1fcf2a445c188c3c58a324a"
          mutation_id: "kernel_work_item_claim_required:sha256:d0e9d72d80fc98490271c1cba81d294a29ee7d569d5d0b78c7da9bff9826ca54:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        kernel_work_item_execution_required:sha256:c76cf125f5463ba020f2683fbcf6b1354947a0561f41b13983f8e74ffb6f07be:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:
          after_revision: 6
          aggregate_digest: "sha256:f9274f4b095b37f4d8624cadeba6e5a000b53d23ee46fd814000e2e0c6265f22"
          before_revision: 5
          command_digest: "sha256:51be571f634e9cb3f1ca1e9dfbd213271fd3faa6c72c3ef136b4a02a53e2b9f1"
          effect_ids: []
          event_digests:
            - "sha256:006a9ee8496c560a286052954bc809ef3f3e72d7a42dc2d7487422de0b80b406"
          mutation_id: "kernel_work_item_execution_required:sha256:c76cf125f5463ba020f2683fbcf6b1354947a0561f41b13983f8e74ffb6f07be:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        kernel_work_item_inspection_required:sha256:fa370cac276614212dae3f8196ea9d13c8c86797fbe9b6c6ca219e3183a9e059:sha256:a4b45efd21b0dee3c8efd59f4f12ac71048c93bc87d7499ee38fa1aa33fa1c86:
          after_revision: 9
          aggregate_digest: "sha256:a0c926631d5a77962cd9ec2bcf1c600cdc89b2a0344e87e3ad065336a704ada2"
          before_revision: 8
          command_digest: "sha256:3ebbef43d2033999761300526cfb74ca5afcec83acc788ee1f89300d0d119d3f"
          effect_ids: []
          event_digests:
            - "sha256:f6d39bf96d2d7e55ebfb1d0ac897fefc2cd8b12c433702b5be1ca7a1b65717ec"
          mutation_id: "kernel_work_item_inspection_required:sha256:fa370cac276614212dae3f8196ea9d13c8c86797fbe9b6c6ca219e3183a9e059:sha256:a4b45efd21b0dee3c8efd59f4f12ac71048c93bc87d7499ee38fa1aa33fa1c86"
        kernel_work_item_materialization_required:sha256:f38169ac1178e078d7f3bbd0101ca5db22141275e22aa02abf411ea354ba3cbd:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:
          after_revision: 4
          aggregate_digest: "sha256:ff96f28c6579aadeef1132d60b925147727e84ac851d4e61b08e91413c0102ad"
          before_revision: 3
          command_digest: "sha256:0c61b2b389bec76418c96977929936caf815a0f1f91f2fc9d8087d16b7251dd8"
          effect_ids: []
          event_digests:
            - "sha256:e81a135f6d5a431a999a7950fcc7e50315c9824a6eb47e436b501b0186e85da8"
          mutation_id: "kernel_work_item_materialization_required:sha256:f38169ac1178e078d7f3bbd0101ca5db22141275e22aa02abf411ea354ba3cbd:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        result:sha256:c9aeca341091885bb26c79cd89309f2808d1ec378c8fd16364dde088a5723ce7:
          after_revision: 8
          aggregate_digest: "sha256:b34c09483930b619b10b1bec5828ca0afaef735d38106c32abd5680c69083df6"
          before_revision: 7
          command_digest: "sha256:2f889d1ff3fb5e0301dd2e97c4bcbf4988993d02182411d4ac00bb8342a95f5e"
          effect_ids: []
          event_digests:
            - "sha256:c71ed2598ce77227df4777aa2dc8fad51f4f9c287e02afd5b856cb4ac2bad99e"
          mutation_id: "result:sha256:c9aeca341091885bb26c79cd89309f2808d1ec378c8fd16364dde088a5723ce7"
        result:sha256:d7c25b4cffe48315cd14ff52264c86b76082212aa9487713ae64b2fbb78942ed:
          after_revision: 2
          aggregate_digest: "sha256:9f2bba074b6c4d50ee75df0ded98f0a477044211c80c211612cc24d172596dcc"
          before_revision: 1
          command_digest: "sha256:36710da4f78fe7e26502825dcf0b2b8ba12f030d422494e965754748231ff4fb"
          effect_ids: []
          event_digests:
            - "sha256:61befde4c655fadfefad313cd3f2f1ceb07f09daf5ad1d01d5fac008c6a34404"
          mutation_id: "result:sha256:d7c25b4cffe48315cd14ff52264c86b76082212aa9487713ae64b2fbb78942ed"
        sha256:cefd38085f707317a50ce8afb1e0b5e5cb9bed0225a77c022899f3e5407f81d3:
          after_revision: 7
          aggregate_digest: "sha256:af57e6936b25f84d56df76d85d948130fe1c36001c40b7d53d50d8bbb06d181d"
          before_revision: 6
          command_digest: "sha256:fae1877af02dd481b52c6e1e0a95de861d975aed279abf5708b33269874033b3"
          effect_ids: []
          event_digests:
            - "sha256:a974838280c03d4819f79bd64fb7651de294406b7587a849fc1d640de38d67eb"
          mutation_id: "sha256:cefd38085f707317a50ce8afb1e0b5e5cb9bed0225a77c022899f3e5407f81d3"
        sha256:ff670b893e809915bd6272201a1d5ec90d5f4ba4d33099e0bb11bcde1373b216:
          after_revision: 3
          aggregate_digest: "sha256:6dc803c396ced8cb08dd77f869994196754de5b08bdd6334d4ab0d0b8d054c32"
          before_revision: 2
          command_digest: "sha256:fcda5f6aa54eda988aee55433a4d87907a319045ab0424797ede270ba84d1307"
          effect_ids: []
          event_digests:
            - "sha256:83941ac8db30d220b32bad3bdf5eebb50f8647ca7ed04013cbaa892f0b80a89e"
          mutation_id: "sha256:ff670b893e809915bd6272201a1d5ec90d5f4ba4d33099e0bb11bcde1373b216"
        validation-resolution:sha256:8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943:
          after_revision: 11
          aggregate_digest: "sha256:2b1cfc963175b7d8bd1e1ba2cf92c7611ff6e1a7e4ca66632a05d05d8ac3f342"
          before_revision: 10
          command_digest: "sha256:cbda5f6123b571cc59317f8915f3d6a6e98818bc7a99f79ea31cb98bbc3ca859"
          effect_ids: []
          event_digests:
            - "sha256:d117e1bbac60d69b1170812ea4ba15a1c2893d05cce814d1d6bc86e7a5564fa7"
          mutation_id: "validation-resolution:sha256:8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943"
        validation:sha256:8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943:
          after_revision: 10
          aggregate_digest: "sha256:76ec30f744d05eb1e349d1e28a0d8c0da2274bf763c7b5e055f1f6ce947be02f"
          before_revision: 9
          command_digest: "sha256:a30c748534c563c19de08f8e9bd12a84b9c624861f10e5e41b0c86a32fcf73dd"
          effect_ids: []
          event_digests:
            - "sha256:7e92e129d29595abfff039c4b217ea8069d1b1f8266d87986b33e8ce80d923b8"
          mutation_id: "validation:sha256:8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943"
      plan_history: []
      revision: 12
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        isolate-canonical-hosted-close:
          attempt: 1
          claim_id: "sha256:069e040a715b82a21b29ec25b71439dc03cd3a2d19a5c348e608017698836656"
          definition:
            contract_digest: "sha256:5c25b6df25d7cff61310bef11d3fc4ecf3eddfec44a9b173c3cf6ff245c8f30f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task/hosted-close.command.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts"
            expected_outputs:
              - "hosted-close-guard"
              - "isolated-regression-test"
            id: "isolate-canonical-hosted-close"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:f7ef94e652ca326e23866ea86282942d159ea35f7d62af5d5cda45606e2015f2"
              id: "hosted-close-guard"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:a4b45efd21b0dee3c8efd59f4f12ac71048c93bc87d7499ee38fa1aa33fa1c86"
              task_id: "202609201056-GYZDBW"
              work_item_id: "isolate-canonical-hosted-close"
            -
              attempt: 1
              digest: "sha256:d9730fe3688ee73e92d6363afc594309a618b979089112d29ba1370896c2e4a0"
              id: "isolated-regression-test"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:a4b45efd21b0dee3c8efd59f4f12ac71048c93bc87d7499ee38fa1aa33fa1c86"
              task_id: "202609201056-GYZDBW"
              work_item_id: "isolate-canonical-hosted-close"
          result_digest: "sha256:149f36f346b51c6b7172e223f462cc8c9aae2bd508a1a83d02218ad667d18c79"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:a84082b17bca03af0e6a92acbe694337d2dacc55d806ed4a133f5ba143c5d933"
              - "sha256:e40ef5fd73ef88b562a24a11057caa2dab525022d48a4dcf14aceea9da530ea3"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:4c531cfdecee0a80c02504c9111506ebf0733c8774f846cc2b1b078768b9b7f4"
              environment_digest: "sha256:27d45449168089df4f33d64e2e2aca5d71b22d37ce43447d1192d91158253511"
              implementation_identity: "sha256:149f36f346b51c6b7172e223f462cc8c9aae2bd508a1a83d02218ad667d18c79"
              toolchain_digest: "sha256:50bece8652761317332280ac10979c9acd239a5df3ecf4ed6a3378cc23c2d7b1"
            observed_at: "2026-09-20T11:10:50.368Z"
            status: "PASSED"
    digest: "sha256:c365d6ede5c5e470727fd254339368f5ede3a96dbc5fe976ed82dd39805ed2fd"
    documents:
      contracts:
        sha256:5c25b6df25d7cff61310bef11d3fc4ecf3eddfec44a9b173c3cf6ff245c8f30f:
          acceptance_criteria:
            - "Canonical hosted-close exits successfully without changing HEAD or canonical task bytes."
            - "Legacy hosted-close tests remain green."
            - "The dedicated regression test respects architecture layering and the oversized-test baseline."
          objective: "Return a successful no-op for canonical tasks before every legacy hosted-close mutation and prove it in an isolated CLI integration test while preserving legacy behavior and test-size policy."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts"
            - "bun run lint"
            - "node scripts/checks/run-local-ci-group.mjs docs-schema"
      intent:
        context: "Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate."
        objective: "Isolate canonical hosted-close regression"
    events:
      -
        command_digest: "sha256:3a6f936a7c77515637299aaf5ec745f0fbc77d90ce985c7ae804ea0388971c64"
        id: "capture:202609201056-GYZDBW:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609201056-GYZDBW"
        occurred_at: "2026-09-20T10:56:33.498Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609201056-GYZDBW"
        task_revision: 1
      -
        command_digest: "sha256:36710da4f78fe7e26502825dcf0b2b8ba12f030d422494e965754748231ff4fb"
        id: "result:sha256:d7c25b4cffe48315cd14ff52264c86b76082212aa9487713ae64b2fbb78942ed:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:d7c25b4cffe48315cd14ff52264c86b76082212aa9487713ae64b2fbb78942ed"
        occurred_at: "2026-09-20T10:59:03.184Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609201056-GYZDBW"
        task_revision: 2
      -
        command_digest: "sha256:fcda5f6aa54eda988aee55433a4d87907a319045ab0424797ede270ba84d1307"
        id: "sha256:ff670b893e809915bd6272201a1d5ec90d5f4ba4d33099e0bb11bcde1373b216:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:ff670b893e809915bd6272201a1d5ec90d5f4ba4d33099e0bb11bcde1373b216"
        occurred_at: "2026-09-20T10:59:13.245Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609201056-GYZDBW"
        task_revision: 3
      -
        command_digest: "sha256:0c61b2b389bec76418c96977929936caf815a0f1f91f2fc9d8087d16b7251dd8"
        id: "kernel_work_item_materialization_required:sha256:f38169ac1178e078d7f3bbd0101ca5db22141275e22aa02abf411ea354ba3cbd:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:f38169ac1178e078d7f3bbd0101ca5db22141275e22aa02abf411ea354ba3cbd:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        occurred_at: "2026-09-20T10:59:21.122Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609201056-GYZDBW"
        task_revision: 4
      -
        command_digest: "sha256:c70bf3dc2b0eb84bc3b84519654ac7cfb1b389cd474275f2658fd3882d36238b"
        id: "kernel_work_item_claim_required:sha256:d0e9d72d80fc98490271c1cba81d294a29ee7d569d5d0b78c7da9bff9826ca54:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:d0e9d72d80fc98490271c1cba81d294a29ee7d569d5d0b78c7da9bff9826ca54:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        occurred_at: "2026-09-20T10:59:24.957Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609201056-GYZDBW"
        task_revision: 5
      -
        command_digest: "sha256:51be571f634e9cb3f1ca1e9dfbd213271fd3faa6c72c3ef136b4a02a53e2b9f1"
        id: "kernel_work_item_execution_required:sha256:c76cf125f5463ba020f2683fbcf6b1354947a0561f41b13983f8e74ffb6f07be:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:c76cf125f5463ba020f2683fbcf6b1354947a0561f41b13983f8e74ffb6f07be:sha256:04a0e0ab53e7d96cc941e88774a7e3375deba62ae66749ce54bc920767ebf088"
        occurred_at: "2026-09-20T11:02:23.544Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609201056-GYZDBW"
        task_revision: 6
      -
        command_digest: "sha256:fae1877af02dd481b52c6e1e0a95de861d975aed279abf5708b33269874033b3"
        id: "sha256:cefd38085f707317a50ce8afb1e0b5e5cb9bed0225a77c022899f3e5407f81d3:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:cefd38085f707317a50ce8afb1e0b5e5cb9bed0225a77c022899f3e5407f81d3"
        occurred_at: "2026-09-20T11:09:24.885Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609201056-GYZDBW"
        task_revision: 7
      -
        command_digest: "sha256:2f889d1ff3fb5e0301dd2e97c4bcbf4988993d02182411d4ac00bb8342a95f5e"
        id: "result:sha256:c9aeca341091885bb26c79cd89309f2808d1ec378c8fd16364dde088a5723ce7:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:c9aeca341091885bb26c79cd89309f2808d1ec378c8fd16364dde088a5723ce7"
        occurred_at: "2026-09-20T11:09:28.989Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609201056-GYZDBW"
        task_revision: 8
      -
        command_digest: "sha256:3ebbef43d2033999761300526cfb74ca5afcec83acc788ee1f89300d0d119d3f"
        id: "kernel_work_item_inspection_required:sha256:fa370cac276614212dae3f8196ea9d13c8c86797fbe9b6c6ca219e3183a9e059:sha256:a4b45efd21b0dee3c8efd59f4f12ac71048c93bc87d7499ee38fa1aa33fa1c86:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:fa370cac276614212dae3f8196ea9d13c8c86797fbe9b6c6ca219e3183a9e059:sha256:a4b45efd21b0dee3c8efd59f4f12ac71048c93bc87d7499ee38fa1aa33fa1c86"
        occurred_at: "2026-09-20T11:09:32.300Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609201056-GYZDBW"
        task_revision: 9
      -
        command_digest: "sha256:a30c748534c563c19de08f8e9bd12a84b9c624861f10e5e41b0c86a32fcf73dd"
        id: "validation:sha256:8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943"
        occurred_at: "2026-09-20T11:12:18.389Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609201056-GYZDBW"
        task_revision: 10
      -
        command_digest: "sha256:cbda5f6123b571cc59317f8915f3d6a6e98818bc7a99f79ea31cb98bbc3ca859"
        id: "validation-resolution:sha256:8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:8d641fdc711e83e0e8dadc5565cbb1bbd50937b5b0217ecf270a74d2a5f07943"
        occurred_at: "2026-09-20T11:12:20.442Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609201056-GYZDBW"
        task_revision: 11
      -
        command_digest: "sha256:d9cae7a6441884c3abf8d870981bd31fff9ac189c7fcba3f9a5c73cca1ca9701"
        id: "final-validation:sha256:54c9004ff04ae66e6a0bf7bec63e996e1aa8aa2b3e892614565182eaf09493b7:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:54c9004ff04ae66e6a0bf7bec63e996e1aa8aa2b3e892614565182eaf09493b7:11"
        occurred_at: "2026-09-20T11:21:09.528Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202609201056-GYZDBW"
        task_revision: 12
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Isolate canonical hosted-close regression

Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.

## Scope

- In scope: Apply the canonical hosted-close guard and place its regression scenario in a dedicated CLI test file so the existing hosted-close suite stays within the oversized-test baseline. Supersedes blocked tasks 202609201011-DNQ0JJ and 202609201040-33NC6D without weakening any gate.
- Out of scope: unrelated refactors not required for "Isolate canonical hosted-close regression".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Isolate canonical hosted-close regression". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Isolate canonical hosted-close regression". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-20T11:21:14.631Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:0a64673447c440215ab6c51c37b1e9db9e4578e893093e602a5d24e1ce7f539c, input_digest=sha256:689875a801b1969916091b5b575ca2ab4c2d0785efa15c3bfa6f7f4b7bd8fc62

Details:

Check: affected_unit_integration
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: node scripts/checks/run-local-ci-group.mjs docs-schema
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: node scripts/checks/run-local-ci-group.mjs docs-schema
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check full_regression

Check: real_e2e
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check real_e2e (1/4)

Check: real_e2e
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check real_e2e (2/4)

Check: real_e2e
Command: node scripts/checks/run-local-ci-group.mjs docs-schema
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check real_e2e (3/4)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check real_e2e (4/4)

Check: task_outcome
Command: bun run lint
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close-canonical.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/architecture/layering.imports.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: node scripts/checks/run-local-ci-group.mjs docs-schema
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201056-GYZDBW/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201056-GYZDBW Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:2bda765eccea606a65743ea70fdb3097bd045d5de0143992a760f6db33f58665
- policy_digest: sha256:ef062519baf46c86afe08917acaa5fee95a58d60c19dd2296cc7baa608814158
- capability_digest: sha256:c7773401c9187b30d35df078ee87d7ccbc0bacb24096a0983e571daa25cb3928
- checks_digest: sha256:0e99a99f13e3ceafa1a632c00bc362ee886ded70bcffbdbcf1448a68fb8dd08d
- identity_digest: sha256:cf53774f0bdcaa16030bd14606ff16d99309d66effd410c99c25e50c2f07ef0c

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task plan set 202609201056-GYZDBW --text "<task-specific-plan>" --updated-by PLANNER
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
