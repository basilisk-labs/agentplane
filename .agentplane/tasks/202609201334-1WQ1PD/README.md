---
id: "202609201334-1WQ1PD"
title: "Accept canonical release task metadata in release readiness"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "v0.7.10"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-20T13:43:12.709Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-20T13:51:42.896Z"
  updated_by: "SUPERVISOR"
  note: "Canonical validation sha256:f252bae48ccab660788aeffa848a43f9104f2cb67bca7644aa6909771c2b5baa"
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-20T13:43:12.709Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "5daa4eb108dd6a49147d046eba2d80a4e4fb7512"
  review_identity_digest: "sha256:cc551231daa9ad58646aa71f7303afbfc17535fab0fd1c5a5491023c4db4401a"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609201334-1WQ1PD/2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd/quality-report.json"
  findings:
    - "Pass: the new path requires status DOING, explicit allow-active-release-task, release tag, task_kind release, and the exact current version tag; unrelated and wrong-version tasks remain blocked."
    - "Pass: legacy title compatibility and observation, merged-pending-close, dependency, and closure checks remain unchanged."
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
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
      - "scripts/checks/check-task-state.mjs"
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
      digest: "sha256:5261cedb64cce625d7fff2d3c30048a19d0515c19165478fc5621c12d63b9aad"
      escalation_reasons:
        - "central_path:scripts/checks/check-task-state.mjs"
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
          - "scripts"
        changed_files:
          - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
          - "scripts/checks/check-task-state.mjs"
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
  hash: "5daa4eb108dd6a49147d046eba2d80a4e4fb7512"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-20T13:51:42.896Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-20T13:51:44.220Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the 0.7.10 release gate so an active Task Kernel release task is recognized by task_kind=release plus exact version tag instead of one legacy title string. Preserve fail-closed checks and add focused regression coverage."
sections:
  Summary: |-
    Accept canonical release task metadata in release readiness

    Fix the 0.7.10 release gate so an active Task Kernel release task is recognized by task_kind=release plus exact version tag instead of one legacy title string. Preserve fail-closed checks and add focused regression coverage.
  Scope: |-
    - In scope: Fix the 0.7.10 release gate so an active Task Kernel release task is recognized by task_kind=release plus exact version tag instead of one legacy title string. Preserve fail-closed checks and add focused regression coverage.
    - Out of scope: unrelated refactors not required for "Accept canonical release task metadata in release readiness".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold for "Accept canonical release task metadata in release readiness". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Accept canonical release task metadata in release readiness". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-20T13:51:42.896Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:017df554dc7c29b8a7bf233decdfebb08e1e3210a02c8065527b71d32d3d2728, input_digest=sha256:a3f3fdd1675497c960f90fc3e04e4f9f9478a40369f31d43b2e755ec61fb6596

    Details:

    Check: affected_unit_integration
    Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check full_regression

    Check: real_e2e
    Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check real_e2e (1/4)

    Check: real_e2e
    Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check real_e2e (2/4)

    Check: real_e2e
    Command: bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check real_e2e (3/4)

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check real_e2e (4/4)

    Check: task_outcome
    Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:d7fce4aab1fe1bd5359a2439d62edb104616cf2fdf6be073020e20a31c05a789
    - policy_digest: sha256:9b668d089af056af9741759543ed685caaa27c913a3aa16d382cfde5faf1adc7
    - capability_digest: sha256:4fad168dcc6ce614e806e5ee61bfa5b2309a2f4596fd91f7b675e8f86b7f6ad8
    - checks_digest: sha256:1fa60887df046d3264c65f7aeed438d45c76cc44ff95aba45e1b2beac0ac4e03
    - identity_digest: sha256:e872b8d7d322e03bff091d913f2463ffd170d4004f60daae35bf7808fbbeee4d

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task plan set 202609201334-1WQ1PD --text "<task-specific-plan>" --updated-by PLANNER
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
    digest: "sha256:114c7136419e0566f7ad5ef5c79c2a6b5afe12e42774ebf3d425ca804479dd65"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609201334-1WQ1PD/2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd/quality-report.json"
    findings:
      - "Pass: the new path requires status DOING, explicit allow-active-release-task, release tag, task_kind release, and the exact current version tag; unrelated and wrong-version tasks remain blocked."
      - "Pass: legacy title compatibility and observation, merged-pending-close, dependency, and closure checks remain unchanged."
    implementation_commit: "5daa4eb108dd6a49147d046eba2d80a4e4fb7512"
    implementation_tree: "4bfa982c3852cdc6b4b75d105ddcfd86993aea01"
    projected_at: "2026-09-20T13:43:12.709Z"
    review_identity_digest: "sha256:cc551231daa9ad58646aa71f7303afbfc17535fab0fd1c5a5491023c4db4401a"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:f252bae48ccab660788aeffa848a43f9104f2cb67bca7644aa6909771c2b5baa"
    work_order_id: "sha256:4d915abd128dd651335e083a00bba57047510fb976b9f9fed7312bcf92c9ab81"
  task_execution_context:
    base_ref: "main"
    base_sha: "05cb714a04d62255a8d539de293dd94f8ade8f0a"
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
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "test_execution"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:268830d51ace2ac909f1542fd30c863945e4ae3b5f0afbab7c0f9267de0be618"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d7fce4aab1fe1bd5359a2439d62edb104616cf2fdf6be073020e20a31c05a789"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:9cdb7d06df7965c7a816a6444590cc1152738931b89c4510a1667a179d89b167"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
              - "scripts/checks/check-task-state.mjs"
            task_id: "202609201334-1WQ1PD"
            validation_requirements:
              - "bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts"
              - "bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "report_result"
              - "repository_read"
              - "repository_write"
              - "test_execution"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:737a49af8f77cd6050e601f6a52dc91052683001a608543a74897a51a2c3b005"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:d7fce4aab1fe1bd5359a2439d62edb104616cf2fdf6be073020e20a31c05a789"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:9cdb7d06df7965c7a816a6444590cc1152738931b89c4510a1667a179d89b167"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:268830d51ace2ac909f1542fd30c863945e4ae3b5f0afbab7c0f9267de0be618"
            repository_effects:
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
              - "scripts/checks/check-task-state.mjs"
            task_id: "202609201334-1WQ1PD"
            validation_requirements:
              - "bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts"
              - "bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
              - "scripts/checks/check-task-state.mjs"
            evidence_digest: "sha256:ba305fe1babba8f341820c30a8397d5ac90be728e4babb0a8fb4bb24a058b165"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:9cdb7d06df7965c7a816a6444590cc1152738931b89c4510a1667a179d89b167"
        digest: "sha256:d7fce4aab1fe1bd5359a2439d62edb104616cf2fdf6be073020e20a31c05a789"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:dc0eae506a73adef0fe6c44893ac794ddcf321f769107b0627d81f959701e42a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "test_execution"
                - "report_result"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts/checks/check-task-state.mjs"
                - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
            expected_outputs:
              - "version-bound canonical release-task predicate"
              - "focused regression test for non-legacy release title"
              - "focused verification evidence"
            id: "accept-canonical-release-task"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:f252bae48ccab660788aeffa848a43f9104f2cb67bca7644aa6909771c2b5baa"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:58719127a15ce3a5721b98466c069eac8c077223c6a702b286d6acb52b089945"
          environment_digest: "sha256:829efccbae01f1fa48c8caf96a1fc538f78718383f3576192bdec2e635fb085d"
          implementation_identity: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
          toolchain_digest: "sha256:b9095f68790545a72c081c126f06b5039b98ff6ba21bd3e7e3a2f1a485fa5dbe"
        observed_at: "2026-09-20T14:43:52.843Z"
        status: "PASSED"
      id: "202609201334-1WQ1PD"
      intent_digest: "sha256:319402fed34f2065b4729158dc29cc6777616a92182b491d2325c8a8440f7024"
      migration_receipts: []
      mutation_receipts:
        capture:202609201334-1WQ1PD:
          after_revision: 1
          aggregate_digest: "sha256:5a6f0d2fceeb86f09c40f5e69a09c8a6265fe368589de8957951810f24e6c653"
          before_revision: 0
          command_digest: "sha256:40d783a0dc92d9479f52e9298954fbefe687632b51e1b0c3b0494410f905869d"
          effect_ids: []
          event_digests:
            - "sha256:f52c6eb973b3e24286307e73f09d8326cc83e895a1dfdde08af8fed28cf83db4"
          mutation_id: "capture:202609201334-1WQ1PD"
        final-validation:sha256:a60f53f72673400576ff33c8424a741287744c232e951ecf1342427da6b3a2a7:11:
          after_revision: 12
          aggregate_digest: "sha256:59b80e62d68154a5ee9583d2c524d6677438704d301625d948d67936f0a547df"
          before_revision: 11
          command_digest: "sha256:11e385cc5cd839dbdeb6af2a0ec51cdb11ef1d5bb7be26731fa1d75f0abea337"
          effect_ids: []
          event_digests:
            - "sha256:ae248a722e6e70169c446546f9fa2963dffa19ebcecaafddbf06bb3db1322261"
          mutation_id: "final-validation:sha256:a60f53f72673400576ff33c8424a741287744c232e951ecf1342427da6b3a2a7:11"
        final-validation:sha256:f252bae48ccab660788aeffa848a43f9104f2cb67bca7644aa6909771c2b5baa:12:
          after_revision: 13
          aggregate_digest: "sha256:6bcf10da8b71cee34218cdf3081abb078f8362a315cd037af69cdd2c2cdfdce7"
          before_revision: 12
          command_digest: "sha256:5a3698d412d69a46c6cd029044bc6c28455069e53b68c94fc5cf723ba24828ed"
          effect_ids: []
          event_digests:
            - "sha256:736990be2d1cc82cf9907e8f8c175bad51ea7f6889155055a4fbf57739a387a0"
          mutation_id: "final-validation:sha256:f252bae48ccab660788aeffa848a43f9104f2cb67bca7644aa6909771c2b5baa:12"
        kernel_work_item_claim_required:sha256:cd860fcdd9b137f0c59450d857e635875a1326ad1af9c31357f1e566e76e4420:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67:
          after_revision: 5
          aggregate_digest: "sha256:e59bdf2071b6d10c05a4d9cb60bc7557556a7fe0b3c377a44716ea33ea505f31"
          before_revision: 4
          command_digest: "sha256:fb90a07efcd0dde89082240708c1eb23a42e0d0268c2f93e307eb44db8634531"
          effect_ids: []
          event_digests:
            - "sha256:82eeb9f6678196020607102355ebc588d36acca76091ba67f32ac97199298c6a"
          mutation_id: "kernel_work_item_claim_required:sha256:cd860fcdd9b137f0c59450d857e635875a1326ad1af9c31357f1e566e76e4420:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67"
        kernel_work_item_execution_required:sha256:b012a877c2800fb9bbf9275f4d76a49eb04270256f0b4dd6ec3a8b80f04b6e05:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67:
          after_revision: 6
          aggregate_digest: "sha256:d40ab3aab31d32ce16615acb9824278817e8d244f3101dc242f74a465287ebae"
          before_revision: 5
          command_digest: "sha256:5e5c6a7fb05c37c613b4eafeb81d14910020643ba342dc54e925a218bd817c84"
          effect_ids: []
          event_digests:
            - "sha256:c02355e15665a0e80755c5d31e842a998c28330e21a7504a81c76df50ad5be75"
          mutation_id: "kernel_work_item_execution_required:sha256:b012a877c2800fb9bbf9275f4d76a49eb04270256f0b4dd6ec3a8b80f04b6e05:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67"
        kernel_work_item_inspection_required:sha256:9800238d3dff4c8ab67785377e0c906bedfc4c66db6a2e2b061917c0559b004b:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:
          after_revision: 9
          aggregate_digest: "sha256:fd9c0085f5d4b1cf346de1e0d415a2f1f2d2a057ff0bed23cd7c52cfaed75c61"
          before_revision: 8
          command_digest: "sha256:6bfa8e4be0acdcb862dfb7a94717a8a06ce574891e2e000219a80d4127b6d626"
          effect_ids: []
          event_digests:
            - "sha256:c8970d4b8087b0c4c86ef7da0a45b2f8016806a7a510696179683cb99cf2565f"
          mutation_id: "kernel_work_item_inspection_required:sha256:9800238d3dff4c8ab67785377e0c906bedfc4c66db6a2e2b061917c0559b004b:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        kernel_work_item_materialization_required:sha256:8c924a676da0de72a948545b3680d33d68399cab485af29a1ce616e5c00e4ad2:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67:
          after_revision: 4
          aggregate_digest: "sha256:e8e654341d2255078f72ab880afc81612394a8e8fac584afe74d7fa95b346fae"
          before_revision: 3
          command_digest: "sha256:2d71dc8d2d384e9478b4b3e9c004c0284c7530997a4eb942b5cd2af40a9663d1"
          effect_ids: []
          event_digests:
            - "sha256:6c28c08ed4a02951da686109ab96e317fee58551cd853a76d2dc6746bfe6470f"
          mutation_id: "kernel_work_item_materialization_required:sha256:8c924a676da0de72a948545b3680d33d68399cab485af29a1ce616e5c00e4ad2:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67"
        result:sha256:4d915abd128dd651335e083a00bba57047510fb976b9f9fed7312bcf92c9ab81:
          after_revision: 8
          aggregate_digest: "sha256:a13f29b140d9bb292373da1777dde5eb3687d4d041480bb066fb639d55077cc4"
          before_revision: 7
          command_digest: "sha256:a9d36b5f2c1e3f4760296b27d9b43e31750274dc99bee432f197a68fec8b1214"
          effect_ids: []
          event_digests:
            - "sha256:263f803adf04bd16487d9d24c11146a99eb8abfc6754d453d42cc5ff25e907cb"
          mutation_id: "result:sha256:4d915abd128dd651335e083a00bba57047510fb976b9f9fed7312bcf92c9ab81"
        result:sha256:78e880381de58720483c53efc33bc405732dbc15ccbf50db89696523184b9867:
          after_revision: 2
          aggregate_digest: "sha256:23d72a1c3df5890a7a5df3d16b09529f95b544ede1ac3dbcc9516352e615156d"
          before_revision: 1
          command_digest: "sha256:969ce320bbff5de10f3620c1c471f5b41c2b58dede2d64b4c8cb9c88c87ab204"
          effect_ids: []
          event_digests:
            - "sha256:38d66d2b52ac9c4baeb5fa63d78feb46252817bccd1dd50cd0ea1adbfefbb6c7"
          mutation_id: "result:sha256:78e880381de58720483c53efc33bc405732dbc15ccbf50db89696523184b9867"
        sha256:7e4b92c914fa6e5fd9a60d2e3df97edeb0ffdfe8977890f8a386013c87ba9fb1:
          after_revision: 7
          aggregate_digest: "sha256:37ffca07d7bc0ca92fabdfcd4937f943431a59a65159975ce651b1477e87d17b"
          before_revision: 6
          command_digest: "sha256:b0cbb22b762ac3294e8fec6ae674666263632c9bb29d291a192c4e51da52454e"
          effect_ids: []
          event_digests:
            - "sha256:3603519bd34ac9f9a41e63a08dbe4e73c508aee1e0697a4a0fb8422945932817"
          mutation_id: "sha256:7e4b92c914fa6e5fd9a60d2e3df97edeb0ffdfe8977890f8a386013c87ba9fb1"
        sha256:b0f22882b00944ac69a9c168d52ae706ed5b76418400eef584ba76744f084d1a:
          after_revision: 3
          aggregate_digest: "sha256:3f13f696cf26ab07106d35172320103308b754cde9af174ba9159062296ee0df"
          before_revision: 2
          command_digest: "sha256:901305ab7e0f7a97564bae7704d6ede761d80d12e72069af467b32e96d4d07b3"
          effect_ids: []
          event_digests:
            - "sha256:f90ff0bdf9211c6ea54554fd4a633989012bf9179891edde2629114eb18624f6"
          mutation_id: "sha256:b0f22882b00944ac69a9c168d52ae706ed5b76418400eef584ba76744f084d1a"
        validation-resolution:sha256:2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd:
          after_revision: 11
          aggregate_digest: "sha256:1301052936459229ef5c95381eab346ebb441ae423b4314a95612df942296067"
          before_revision: 10
          command_digest: "sha256:cacbeb7765409c82ca984924e7a0621e92ad2fb31db11c2b0350352a5709a35f"
          effect_ids: []
          event_digests:
            - "sha256:28fd69b628008f1b92b3397f77cb897f3a48fa8e1a520d3df3b5fbc461fe8359"
          mutation_id: "validation-resolution:sha256:2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd"
        validation:sha256:2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd:
          after_revision: 10
          aggregate_digest: "sha256:d9c7cab34204076ad02e38da0d7055a5d2845f139cf53fd3599436f99220ba2b"
          before_revision: 9
          command_digest: "sha256:ad8d78c42ad2b8efe2cb6e43d31d60622a836c2e576dfe28ea4de3034428b645"
          effect_ids: []
          event_digests:
            - "sha256:57e4444cc7fa47179a96c7d3d817aeffffc522cb1fdc6406b39aa0e6136454a4"
          mutation_id: "validation:sha256:2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd"
      plan_history: []
      revision: 13
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        accept-canonical-release-task:
          attempt: 1
          claim_id: "sha256:74345f3248e32e4b1995fcabb505121413a41e3e6018dfc22e16af8da459c589"
          definition:
            contract_digest: "sha256:dc0eae506a73adef0fe6c44893ac794ddcf321f769107b0627d81f959701e42a"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "test_execution"
                - "report_result"
              external_effects: []
              repository_effects:
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "scripts/checks/check-task-state.mjs"
                - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
            expected_outputs:
              - "version-bound canonical release-task predicate"
              - "focused regression test for non-legacy release title"
              - "focused verification evidence"
            id: "accept-canonical-release-task"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 1
              digest: "sha256:e82f13ad70d3dd28a918528beb7207cfc72d6df5ca3c1abf4883f77f127edc14"
              id: "version-bound canonical release-task predicate"
              kind: "source_code"
              plan_revision: 1
              repository_fingerprint: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
              task_id: "202609201334-1WQ1PD"
              work_item_id: "accept-canonical-release-task"
            -
              attempt: 1
              digest: "sha256:d9a175c403434471c77a04086537b77cae6f37cdd4d368e4f0719e77de0cc6bb"
              id: "focused regression test for non-legacy release title"
              kind: "tests"
              plan_revision: 1
              repository_fingerprint: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
              task_id: "202609201334-1WQ1PD"
              work_item_id: "accept-canonical-release-task"
            -
              attempt: 1
              digest: "sha256:2b671cfea0a72beb01c02daf9f615a6f4021b6cdca5058d8df2ffeb28f8f7252"
              id: "focused verification evidence"
              kind: "verification"
              plan_revision: 1
              repository_fingerprint: "sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
              task_id: "202609201334-1WQ1PD"
              work_item_id: "accept-canonical-release-task"
          result_digest: "sha256:702aa3ccd9dea29df88853d3d42a383f9ceadc36619c4a4192b02d90b20cf7cd"
          revision: 7
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:3293d7942ef9b0563361dbe0029b64227fe1ba806e32d9f13e618af4cb037b6b"
              - "sha256:cc551231daa9ad58646aa71f7303afbfc17535fab0fd1c5a5491023c4db4401a"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:58719127a15ce3a5721b98466c069eac8c077223c6a702b286d6acb52b089945"
              environment_digest: "sha256:80921affb00903f4997e16adecb93000ae8418b5497baf3a76a463ca17e47bb5"
              implementation_identity: "sha256:702aa3ccd9dea29df88853d3d42a383f9ceadc36619c4a4192b02d90b20cf7cd"
              toolchain_digest: "sha256:cf316c517aaab7eaebeef394c4292584754c0246efec889362d098f74a76e6f8"
            observed_at: "2026-09-20T13:43:12.709Z"
            status: "PASSED"
    digest: "sha256:163024b57e46ec0c1de008c0af9580ea4fb2a62a80f4d8cc153c7494840cdcd9"
    documents:
      contracts:
        sha256:dc0eae506a73adef0fe6c44893ac794ddcf321f769107b0627d81f959701e42a:
          acceptance_criteria:
            - "A DOING task with task_kind release, release tag, and exact v<packageVersion> tag is allowed during release readiness even when its title is not the legacy title."
            - "An unrelated or wrong-version DOING task remains release-blocking."
            - "No release, registry, authority, or general task-state checks are weakened."
          objective: "Recognize an active canonical release task by explicit release metadata bound to the current package version, without allowing unrelated DOING tasks."
          role: "EXECUTOR"
          verification_commands:
            - "bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
            - "bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts"
      intent:
        context: "Fix the 0.7.10 release gate so an active Task Kernel release task is recognized by task_kind=release plus exact version tag instead of one legacy title string. Preserve fail-closed checks and add focused regression coverage."
        objective: "Accept canonical release task metadata in release readiness"
    events:
      -
        command_digest: "sha256:40d783a0dc92d9479f52e9298954fbefe687632b51e1b0c3b0494410f905869d"
        id: "capture:202609201334-1WQ1PD:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609201334-1WQ1PD"
        occurred_at: "2026-09-20T13:34:57.002Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609201334-1WQ1PD"
        task_revision: 1
      -
        command_digest: "sha256:969ce320bbff5de10f3620c1c471f5b41c2b58dede2d64b4c8cb9c88c87ab204"
        id: "result:sha256:78e880381de58720483c53efc33bc405732dbc15ccbf50db89696523184b9867:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:78e880381de58720483c53efc33bc405732dbc15ccbf50db89696523184b9867"
        occurred_at: "2026-09-20T13:35:40.671Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609201334-1WQ1PD"
        task_revision: 2
      -
        command_digest: "sha256:901305ab7e0f7a97564bae7704d6ede761d80d12e72069af467b32e96d4d07b3"
        id: "sha256:b0f22882b00944ac69a9c168d52ae706ed5b76418400eef584ba76744f084d1a:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:b0f22882b00944ac69a9c168d52ae706ed5b76418400eef584ba76744f084d1a"
        occurred_at: "2026-09-20T13:35:48.842Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609201334-1WQ1PD"
        task_revision: 3
      -
        command_digest: "sha256:2d71dc8d2d384e9478b4b3e9c004c0284c7530997a4eb942b5cd2af40a9663d1"
        id: "kernel_work_item_materialization_required:sha256:8c924a676da0de72a948545b3680d33d68399cab485af29a1ce616e5c00e4ad2:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:8c924a676da0de72a948545b3680d33d68399cab485af29a1ce616e5c00e4ad2:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67"
        occurred_at: "2026-09-20T13:35:55.998Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609201334-1WQ1PD"
        task_revision: 4
      -
        command_digest: "sha256:fb90a07efcd0dde89082240708c1eb23a42e0d0268c2f93e307eb44db8634531"
        id: "kernel_work_item_claim_required:sha256:cd860fcdd9b137f0c59450d857e635875a1326ad1af9c31357f1e566e76e4420:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:cd860fcdd9b137f0c59450d857e635875a1326ad1af9c31357f1e566e76e4420:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67"
        occurred_at: "2026-09-20T13:35:59.779Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609201334-1WQ1PD"
        task_revision: 5
      -
        command_digest: "sha256:5e5c6a7fb05c37c613b4eafeb81d14910020643ba342dc54e925a218bd817c84"
        id: "kernel_work_item_execution_required:sha256:b012a877c2800fb9bbf9275f4d76a49eb04270256f0b4dd6ec3a8b80f04b6e05:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:b012a877c2800fb9bbf9275f4d76a49eb04270256f0b4dd6ec3a8b80f04b6e05:sha256:714a1b00a16956088023f22aca6981e483ce4c9bacb4150924d38646f897af67"
        occurred_at: "2026-09-20T13:38:12.293Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609201334-1WQ1PD"
        task_revision: 6
      -
        command_digest: "sha256:b0cbb22b762ac3294e8fec6ae674666263632c9bb29d291a192c4e51da52454e"
        id: "sha256:7e4b92c914fa6e5fd9a60d2e3df97edeb0ffdfe8977890f8a386013c87ba9fb1:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:7e4b92c914fa6e5fd9a60d2e3df97edeb0ffdfe8977890f8a386013c87ba9fb1"
        occurred_at: "2026-09-20T13:42:06.805Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609201334-1WQ1PD"
        task_revision: 7
      -
        command_digest: "sha256:a9d36b5f2c1e3f4760296b27d9b43e31750274dc99bee432f197a68fec8b1214"
        id: "result:sha256:4d915abd128dd651335e083a00bba57047510fb976b9f9fed7312bcf92c9ab81:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:4d915abd128dd651335e083a00bba57047510fb976b9f9fed7312bcf92c9ab81"
        occurred_at: "2026-09-20T13:42:10.875Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609201334-1WQ1PD"
        task_revision: 8
      -
        command_digest: "sha256:6bfa8e4be0acdcb862dfb7a94717a8a06ce574891e2e000219a80d4127b6d626"
        id: "kernel_work_item_inspection_required:sha256:9800238d3dff4c8ab67785377e0c906bedfc4c66db6a2e2b061917c0559b004b:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:9800238d3dff4c8ab67785377e0c906bedfc4c66db6a2e2b061917c0559b004b:sha256:d3a17d4eb22414cc7fb54cecd7726161079c4cc1a511ee4e9721d13f57d24643"
        occurred_at: "2026-09-20T13:42:14.077Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609201334-1WQ1PD"
        task_revision: 9
      -
        command_digest: "sha256:ad8d78c42ad2b8efe2cb6e43d31d60622a836c2e576dfe28ea4de3034428b645"
        id: "validation:sha256:2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd"
        occurred_at: "2026-09-20T13:43:16.596Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609201334-1WQ1PD"
        task_revision: 10
      -
        command_digest: "sha256:cacbeb7765409c82ca984924e7a0621e92ad2fb31db11c2b0350352a5709a35f"
        id: "validation-resolution:sha256:2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:2da8a88bb4c78132c5657f2d0a8a4af2d8694610bef1a0f7c555bccd0bc2e0fd"
        occurred_at: "2026-09-20T13:43:18.519Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609201334-1WQ1PD"
        task_revision: 11
      -
        command_digest: "sha256:11e385cc5cd839dbdeb6af2a0ec51cdb11ef1d5bb7be26731fa1d75f0abea337"
        id: "final-validation:sha256:a60f53f72673400576ff33c8424a741287744c232e951ecf1342427da6b3a2a7:11:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:a60f53f72673400576ff33c8424a741287744c232e951ecf1342427da6b3a2a7:11"
        occurred_at: "2026-09-20T13:51:37.356Z"
        payload_digest: "sha256:9e549d5b36bd56fef56919030b686bf2c89c370449146299ed7a802bfe2aff52"
        task_id: "202609201334-1WQ1PD"
        task_revision: 12
      -
        command_digest: "sha256:5a3698d412d69a46c6cd029044bc6c28455069e53b68c94fc5cf723ba24828ed"
        id: "final-validation:sha256:f252bae48ccab660788aeffa848a43f9104f2cb67bca7644aa6909771c2b5baa:12:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:f252bae48ccab660788aeffa848a43f9104f2cb67bca7644aa6909771c2b5baa:12"
        occurred_at: "2026-09-20T14:51:16.058Z"
        payload_digest: "sha256:c4638fb792606faa5c5415baa5a7d87aa3eb27ff86f5452698e903e04dcd9c4f"
        task_id: "202609201334-1WQ1PD"
        task_revision: 13
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Accept canonical release task metadata in release readiness

Fix the 0.7.10 release gate so an active Task Kernel release task is recognized by task_kind=release plus exact version tag instead of one legacy title string. Preserve fail-closed checks and add focused regression coverage.

## Scope

- In scope: Fix the 0.7.10 release gate so an active Task Kernel release task is recognized by task_kind=release plus exact version tag instead of one legacy title string. Preserve fail-closed checks and add focused regression coverage.
- Out of scope: unrelated refactors not required for "Accept canonical release task metadata in release readiness".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold for "Accept canonical release task metadata in release readiness". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Accept canonical release task metadata in release readiness". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-20T13:51:42.896Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:017df554dc7c29b8a7bf233decdfebb08e1e3210a02c8065527b71d32d3d2728, input_digest=sha256:a3f3fdd1675497c960f90fc3e04e4f9f9478a40369f31d43b2e755ec61fb6596

Details:

Check: affected_unit_integration
Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check full_regression

Check: real_e2e
Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check real_e2e (1/4)

Check: real_e2e
Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check real_e2e (2/4)

Check: real_e2e
Command: bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check real_e2e (3/4)

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check real_e2e (4/4)

Check: task_outcome
Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun test packages/agentplane/src/commands/release/task-registry-ready-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun test packages/agentplane/src/commands/release/release-ready-manifest-script.test.ts
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609201334-1WQ1PD/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609201334-1WQ1PD Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:d7fce4aab1fe1bd5359a2439d62edb104616cf2fdf6be073020e20a31c05a789
- policy_digest: sha256:9b668d089af056af9741759543ed685caaa27c913a3aa16d382cfde5faf1adc7
- capability_digest: sha256:4fad168dcc6ce614e806e5ee61bfa5b2309a2f4596fd91f7b675e8f86b7f6ad8
- checks_digest: sha256:1fa60887df046d3264c65f7aeed438d45c76cc44ff95aba45e1b2beac0ac4e03
- identity_digest: sha256:e872b8d7d322e03bff091d913f2463ffd170d4004f60daae35bf7808fbbeee4d

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task plan set 202609201334-1WQ1PD --text "<task-specific-plan>" --updated-by PLANNER
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
