---
id: "202609211544-JKVHYA"
title: "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 22
origin:
  system: "manual"
depends_on: []
tags:
  - "0.7.11"
  - "release-readiness"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run ci:local:full"
  - "bun run test:release:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-09-21T16:34:02.719Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-21T16:41:40.926Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-21T16:34:02.719Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "11b09eb6a182cd05b4baa6a9261d6276c4cac665"
  review_identity_digest: "sha256:778dcf13fbc58610b3a0f9a559c0d73cc433b45247883a55fffebbc48cc213d4"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609211544-JKVHYA/850f0e06a7b081b3b671e9c5a5500d6f3d9ef7a7610f8352d98c663ba523e554/quality-report.json"
  findings:
    - "PASS: manifest entries are strict by evidence kind, require exact task identity, non-empty reason, full lowercase commit SHA, resolvable ancestry, and evidence-specific tag or DONE replacement proof."
    - "PASS: standalone and release-ready manifest paths load the same validated exclusion set and expose accepted evidence; six recorded refs are actual release or PR merge commits on the current ancestry."
    - "PASS: the self-verification allowance is limited to the exact task branch, release-readiness code task, controller implementation evidence matching HEAD, required passing Git checks, a non-task source change, and a clean non-task worktree."
    - "PASS: native validation bound to implementation commit 11b09eb6a182cd05b4baa6a9261d6276c4cac665 passed all four required checks, including the exact standalone readiness command and full local CI."
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
      - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
      - "scripts/checks/check-task-state.mjs"
      - "scripts/lib/release-scope-exclusions.mjs"
      - "scripts/release/check-task-registry-ready.mjs"
      - "scripts/release/manifest.mjs"
      - "scripts/release/release-scope-exclusions.json"
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
      digest: "sha256:2fc977720d398cd2fef57af0051e56f36763c550c1492d629247af5a2f00f903"
      escalation_reasons:
        - "central_path:scripts/checks/check-task-state.mjs"
        - "central_path:scripts/lib/release-scope-exclusions.mjs"
        - "central_path:scripts/release/check-task-registry-ready.mjs"
        - "central_path:scripts/release/manifest.mjs"
        - "central_path:scripts/release/release-scope-exclusions.json"
        - "effect_release_metadata"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
        - "unknown_path:scripts/release/release-scope-exclusions.json"
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
          - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
          - "scripts/checks/check-task-state.mjs"
          - "scripts/lib/release-scope-exclusions.mjs"
          - "scripts/release/check-task-registry-ready.mjs"
          - "scripts/release/manifest.mjs"
          - "scripts/release/release-scope-exclusions.json"
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
  hash: "11b09eb6a182cd05b4baa6a9261d6276c4cac665"
  message: "AgentPlane-owned canonical implementation commit"
comments: []
events:
  -
    type: "verify"
    at: "2026-09-21T16:41:40.926Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
doc_version: 3
doc_updated_at: "2026-09-21T16:41:41.908Z"
doc_updated_by: "SUPERVISOR"
description: "Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded."
sections:
  Summary: |-
    Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks

    Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.
  Scope: |-
    - In scope: Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.
    - Out of scope: unrelated refactors not required for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks".
  Plan: "1. Execute approved WorkItem validated-release-scope-exclusions."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-21T16:41:40.926Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a866648b4c0ac730c5116f5dcda4f427f1fa902b97d2fe7da01853cb6049b88a, input_digest=sha256:813d3b5ad050c2ab7aa9c92e80160cba4ddb42f886abfd57ff8fa315a7c235a4

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun run test:release:critical
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: node scripts/release/check-task-registry-ready.mjs --allow-active-release-task
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun run test:release:critical
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: node scripts/release/check-task-registry-ready.mjs --allow-active-release-task
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check real_e2e (1/4)

    Check: real_e2e
    Command: bun run test:release:critical
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check real_e2e (2/4)

    Check: real_e2e
    Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check real_e2e (3/4)

    Check: real_e2e
    Command: node scripts/release/check-task-registry-ready.mjs --allow-active-release-task
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check real_e2e (4/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run test:release:critical
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: node scripts/release/check-task-registry-ready.mjs --allow-active-release-task
    Result: pass
    Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609211544-JKVHYA Verification Contract check task_outcome (4/4)

    NativeTaskIdentityRef:
    - plan_digest: sha256:f0a58f00a56520e20a7a85eabb5b48098a8b1967f004d378212735dab7c6ba6f
    - policy_digest: sha256:9b668d089af056af9741759543ed685caaa27c913a3aa16d382cfde5faf1adc7
    - capability_digest: sha256:4fad168dcc6ce614e806e5ee61bfa5b2309a2f4596fd91f7b675e8f86b7f6ad8
    - checks_digest: sha256:1fa60887df046d3264c65f7aeed438d45c76cc44ff95aba45e1b2beac0ac4e03
    - identity_digest: sha256:b10d49808e46386f7be92df0e4b9547d097f254d1a8acb3055ef55d4cb74a9d8

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
    digest: "sha256:ada2f9dae84cae90591e36df4fb62ff93d99a0e6790eb39344e6f62ef7a9bd81"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609211544-JKVHYA/850f0e06a7b081b3b671e9c5a5500d6f3d9ef7a7610f8352d98c663ba523e554/quality-report.json"
    findings:
      - "PASS: manifest entries are strict by evidence kind, require exact task identity, non-empty reason, full lowercase commit SHA, resolvable ancestry, and evidence-specific tag or DONE replacement proof."
      - "PASS: standalone and release-ready manifest paths load the same validated exclusion set and expose accepted evidence; six recorded refs are actual release or PR merge commits on the current ancestry."
      - "PASS: the self-verification allowance is limited to the exact task branch, release-readiness code task, controller implementation evidence matching HEAD, required passing Git checks, a non-task source change, and a clean non-task worktree."
      - "PASS: native validation bound to implementation commit 11b09eb6a182cd05b4baa6a9261d6276c4cac665 passed all four required checks, including the exact standalone readiness command and full local CI."
    implementation_commit: "11b09eb6a182cd05b4baa6a9261d6276c4cac665"
    implementation_tree: "0c11bf2efd160e224960b7ce82dbc43c77ec8c2c"
    projected_at: "2026-09-21T16:34:02.719Z"
    review_identity_digest: "sha256:778dcf13fbc58610b3a0f9a559c0d73cc433b45247883a55fffebbc48cc213d4"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:5fb85baf83d5190b6682f156cccaea46efa9f3ea923a13bf563f0e6849ac8fd0"
    work_order_id: "sha256:00891572eff8abe1f592d29e297c8281d587bb3a4dba08e6ae34982eb1f8fad6"
  task_execution_context:
    base_ref: "main"
    base_sha: "4b3b71d554f609ff9d9167c03f6db56a2c5a6584"
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
              - "git_read"
              - "repository_read"
              - "repository_write"
              - "run_checks"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:36f330add565a315e34042c79d04c09b2e0bf131302e9c500d4fa262bd0fe077"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f0a58f00a56520e20a7a85eabb5b48098a8b1967f004d378212735dab7c6ba6f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "USER"
              evidence_digest: "sha256:0b4641e0e8b82eee13ff01660a07a2d5b4881f8f49a5a89aa12ae6a9d49e8f93"
              kind: "USER"
              parent_authority_digest: null
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "git-history"
              - "release-readiness-contract"
              - "task-registry"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
              - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
              - "scripts/checks/check-task-state.mjs"
              - "scripts/lib/release-scope-exclusions.mjs"
              - "scripts/release/check-task-registry-ready.mjs"
              - "scripts/release/manifest.mjs"
              - "scripts/release/release-scope-exclusions.json"
            task_id: "202609211544-JKVHYA"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run test:release:critical"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1"
              - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
            work_item_id: null
          observation: null
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "repository_read"
              - "repository_write"
              - "run_checks"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:afed6794f2b5235279cfd05e1b92a236d631d9d878f112b67efefdb0b90e105c"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f0a58f00a56520e20a7a85eabb5b48098a8b1967f004d378212735dab7c6ba6f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0b4641e0e8b82eee13ff01660a07a2d5b4881f8f49a5a89aa12ae6a9d49e8f93"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:36f330add565a315e34042c79d04c09b2e0bf131302e9c500d4fa262bd0fe077"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "git-history"
              - "release-readiness-contract"
              - "task-registry"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
              - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
              - "scripts/checks/check-task-state.mjs"
              - "scripts/lib/release-scope-exclusions.mjs"
              - "scripts/release/check-task-registry-ready.mjs"
              - "scripts/release/manifest.mjs"
              - "scripts/release/release-scope-exclusions.json"
            task_id: "202609211544-JKVHYA"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run test:release:critical"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1"
              - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
              - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
              - "scripts/checks/check-task-state.mjs"
              - "scripts/lib/release-scope-exclusions.mjs"
              - "scripts/release/check-task-registry-ready.mjs"
              - "scripts/release/manifest.mjs"
              - "scripts/release/release-scope-exclusions.json"
            evidence_digest: "sha256:0ed7c42e68adc73d9a5b2092972029c4ac843083e34fd93b7ef7e669029427dd"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        -
          approval_mode: null
          authority:
            capabilities:
              - "git_read"
              - "repository_read"
              - "repository_write"
              - "run_checks"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:6cf706b0e31461129a5bb1b47bb1346cda218546bd08c3b2c60fffaf5c82ff1d"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:f0a58f00a56520e20a7a85eabb5b48098a8b1967f004d378212735dab7c6ba6f"
            plan_revision: 1
            policy_digests:
              - "sha256:23efb6f9b035236bb2705fb639979d0ed084618d76039e5bd191654bfb479f8b"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:0b4641e0e8b82eee13ff01660a07a2d5b4881f8f49a5a89aa12ae6a9d49e8f93"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:afed6794f2b5235279cfd05e1b92a236d631d9d878f112b67efefdb0b90e105c"
            repository_effects:
              - "release_metadata"
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:3f2a8ac3fa1c1a90dcf9fd63339243d140cd7d0bf6087b047ea11885d3f287d6"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources:
              - "git-history"
              - "release-readiness-contract"
              - "task-registry"
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
              - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
              - "scripts/checks/check-task-state.mjs"
              - "scripts/lib/release-scope-exclusions.mjs"
              - "scripts/release/check-task-registry-ready.mjs"
              - "scripts/release/manifest.mjs"
              - "scripts/release/release-scope-exclusions.json"
            task_id: "202609211544-JKVHYA"
            validation_requirements:
              - "bun run ci:local:full"
              - "bun run test:release:critical"
              - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1"
              - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
              - "scripts/checks/check-task-state.mjs"
            evidence_digest: "sha256:3c598f7f2270d40da60a4046b2d26a944a2929f3c1d291233088f942697a7c3f"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c"
      controller_transfer: null
      current_plan:
        approval_actor_id: "USER"
        approval_evidence_digest: "sha256:0b4641e0e8b82eee13ff01660a07a2d5b4881f8f49a5a89aa12ae6a9d49e8f93"
        digest: "sha256:f0a58f00a56520e20a7a85eabb5b48098a8b1967f004d378212735dab7c6ba6f"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:b880230ada6736d4274ec2c329603045022343fd42ba4763aabc26b5f6edf16f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_checks"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "release_metadata"
              resources:
                - "release-readiness-contract"
                - "task-registry"
                - "git-history"
              scope_roots:
                - "scripts/lib/release-scope-exclusions.mjs"
                - "scripts/release/release-scope-exclusions.json"
                - "scripts/checks/check-task-state.mjs"
                - "scripts/release/check-task-registry-ready.mjs"
                - "scripts/release/manifest.mjs"
                - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
                - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
            expected_outputs:
              - "release-scope-exclusion-contract"
            id: "validated-release-scope-exclusions"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:fe7c7fee9f89f860e284b103bb9818c3152a874e933cdabd0e418517f9e58fc6"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:53fddfb0b318e81f57872231639f9dbe6ecaddea542c68d2e34efe620aee62b8"
          environment_digest: "sha256:b7e84859b8993d277fa15d45d9c781f01032f1acc6c169b7eb0484de1e33d0e7"
          implementation_identity: "sha256:3f2a8ac3fa1c1a90dcf9fd63339243d140cd7d0bf6087b047ea11885d3f287d6"
          toolchain_digest: "sha256:b48f12dd30aeb0339d6b55ca623578761914ec3572d8e489d7bc1936ff52fb08"
        observed_at: "2026-09-21T16:34:11.142Z"
        status: "PASSED"
      id: "202609211544-JKVHYA"
      intent_digest: "sha256:808017af27ddd9581820010ce5a5dd8d682a0cf46d0216d3b06f2a77d1a99347"
      migration_receipts: []
      mutation_receipts:
        capture:202609211544-JKVHYA:
          after_revision: 1
          aggregate_digest: "sha256:6afeb27c1acd140002b9812adcd9769969835406b4e4b37d92f80ad3be40db99"
          before_revision: 0
          command_digest: "sha256:b5bf100b25b851017b7ff7d4dea8e8da5d661e4a7ae80c0cf2ef1da50effffa0"
          effect_ids: []
          event_digests:
            - "sha256:53e7d2ced9659a0194ed1e905c1143feebfe2ea4646f2f5fb1f01796600b5929"
          mutation_id: "capture:202609211544-JKVHYA"
        final-validation:sha256:fe7c7fee9f89f860e284b103bb9818c3152a874e933cdabd0e418517f9e58fc6:18:
          after_revision: 19
          aggregate_digest: "sha256:510a11031092649fdb9beace879ff6ffa577be809f981ab2e3d7d458aaf75a82"
          before_revision: 18
          command_digest: "sha256:a778947d49ce9f93390822a8145f4c6297aa021e09ff8e80464bd566ac15d085"
          effect_ids: []
          event_digests:
            - "sha256:20cef3d339c3f8bfd3ab0fab062357aaef35656967144fb3444319f397685026"
          mutation_id: "final-validation:sha256:fe7c7fee9f89f860e284b103bb9818c3152a874e933cdabd0e418517f9e58fc6:18"
        kernel_work_item_claim_required:sha256:ad19195ca85f94b3c6474d8be04d6a4138d79235394147ff173ea79d308d2bad:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:
          after_revision: 5
          aggregate_digest: "sha256:2dd134f0ba27952ba398f58bcdf59e824d71288e9947aa50cd370a592852177e"
          before_revision: 4
          command_digest: "sha256:9add576cdd205834d0fb890feb2281bcb6f0edc9d94fc65dd5fedb1ef1cc9d23"
          effect_ids: []
          event_digests:
            - "sha256:a5ce44af5d424b576a9d899bf5886087c4bfbd6db6f28b7c688148864dec4d84"
          mutation_id: "kernel_work_item_claim_required:sha256:ad19195ca85f94b3c6474d8be04d6a4138d79235394147ff173ea79d308d2bad:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        kernel_work_item_execution_required:sha256:837bf018dfbd02f01017665aa989e6d71d680ec904dc3b76b2f36251b47eddc9:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c:
          after_revision: 13
          aggregate_digest: "sha256:0a464a30ce3b546f3d02009f6fb0459b43e7dbddad5202f86c2c531d63e7b840"
          before_revision: 12
          command_digest: "sha256:b8b455e768b74a904ea4a7fb4b4379cb3355dd10171e60d1950d8e33bbd3e0cc"
          effect_ids: []
          event_digests:
            - "sha256:608c50c31c976d1098373c4c4845ff8c064ba5da786b381bb4855757546ea284"
          mutation_id: "kernel_work_item_execution_required:sha256:837bf018dfbd02f01017665aa989e6d71d680ec904dc3b76b2f36251b47eddc9:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c"
        kernel_work_item_execution_required:sha256:83af28772e694be35eeabecfa9169940adbddc4cb8870671c7d57310b1ad1661:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:
          after_revision: 6
          aggregate_digest: "sha256:ad2173d2013e4a7ce1e4003205a34f60c09e3e6eb59a14df43edc635f3077fd3"
          before_revision: 5
          command_digest: "sha256:adfa189a03c544d030b5f9cc8a5bdd508575ce2bdb64c0b3b10f3102fe4aea69"
          effect_ids: []
          event_digests:
            - "sha256:563ea4d103e482f929a9b22075d2ab0560fd31a998c9656a26d23606fc0b17e8"
          mutation_id: "kernel_work_item_execution_required:sha256:83af28772e694be35eeabecfa9169940adbddc4cb8870671c7d57310b1ad1661:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        kernel_work_item_inspection_required:sha256:f62c42fa86c73a3b7f43102ff22c4870dff5fed2f0080581918b0f517e84a3ad:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c:
          after_revision: 9
          aggregate_digest: "sha256:b33bd44c90f9278b75cc17bf67341bd544e9e5616c246c144530b9a4c53df2e0"
          before_revision: 8
          command_digest: "sha256:729f50edc04a1eb412d63a273f6bd8f41b9d2185acbabe9f7a17a7b636421d7f"
          effect_ids: []
          event_digests:
            - "sha256:39fbca08fb23c4de3315e0a8a2905f92b09af45937179e419f533dadf1fcb76d"
          mutation_id: "kernel_work_item_inspection_required:sha256:f62c42fa86c73a3b7f43102ff22c4870dff5fed2f0080581918b0f517e84a3ad:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c"
        kernel_work_item_inspection_required:sha256:fc2afe7fd8a723dee69792d7ee356ac4526f278cca6410ff1ef9ba54fc17a775:sha256:3f2a8ac3fa1c1a90dcf9fd63339243d140cd7d0bf6087b047ea11885d3f287d6:
          after_revision: 16
          aggregate_digest: "sha256:1eb5622068e9b4fc3b9f43175e3716fd9ef641be88ef4d57a7b3120a61e2383a"
          before_revision: 15
          command_digest: "sha256:b20e5135af7fd954571cfc8a3537338c845d976813e9213aa92e113aa9af1f9c"
          effect_ids: []
          event_digests:
            - "sha256:b93ef7c4a0a71f46572a105778badc05ad4436578ae9e6fc248bf712a5ede524"
          mutation_id: "kernel_work_item_inspection_required:sha256:fc2afe7fd8a723dee69792d7ee356ac4526f278cca6410ff1ef9ba54fc17a775:sha256:3f2a8ac3fa1c1a90dcf9fd63339243d140cd7d0bf6087b047ea11885d3f287d6"
        kernel_work_item_materialization_required:sha256:a6535bdf98ab69ea1720a6ae942f2e1ff1f80a749b699f1ece89486823d42ea1:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:
          after_revision: 4
          aggregate_digest: "sha256:5f0feedbb2d80d724eba8cb6a3eef8db55b59eeb16678271bc08c974fbe22d47"
          before_revision: 3
          command_digest: "sha256:e3ce0d98a664daf95806a56d6b3aecd5995d429c2af0db20d99b860043450dc2"
          effect_ids: []
          event_digests:
            - "sha256:79aa137cf9141cce6544551da7cfe4ba123eac11ee3ac58faf4696d79d35dbd7"
          mutation_id: "kernel_work_item_materialization_required:sha256:a6535bdf98ab69ea1720a6ae942f2e1ff1f80a749b699f1ece89486823d42ea1:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        kernel_work_item_rework_claim_required:sha256:2301d2040c183a14149dfd69ad92031d9dd244ca7351fbc2ff795c220103f234:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c:
          after_revision: 12
          aggregate_digest: "sha256:8c665b05d26f87b7feb7398ae90997bcf4c48b08ba28c80bb29826ed09b6a579"
          before_revision: 11
          command_digest: "sha256:7d1bc5f9e49b574c49d8dcb1786ea9e4b6d0f69d537ff385e52390ffdfb708d3"
          effect_ids: []
          event_digests:
            - "sha256:8a9791f756f86bd2f996ea51c6592e422f4949d7ee8a9a4146fd22e338c3a5df"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:2301d2040c183a14149dfd69ad92031d9dd244ca7351fbc2ff795c220103f234:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c"
        result:sha256:00891572eff8abe1f592d29e297c8281d587bb3a4dba08e6ae34982eb1f8fad6:
          after_revision: 15
          aggregate_digest: "sha256:fc32c44e3f254fbcb141556140adb015ee2889b3bff63513b0da5f156aa15318"
          before_revision: 14
          command_digest: "sha256:8aedcb7c114c6aa7dce1c405c290656d7c6c4458614ceedd0651f9550483f572"
          effect_ids: []
          event_digests:
            - "sha256:9fc04ff6a4933b7cc1b71178f5de075201391c48bc6680c74a65088884a39303"
          mutation_id: "result:sha256:00891572eff8abe1f592d29e297c8281d587bb3a4dba08e6ae34982eb1f8fad6"
        result:sha256:26376888b1c265f258d54da7bb91841da503e804d4e7b5052ddef94219fa1e8a:
          after_revision: 8
          aggregate_digest: "sha256:871396e1b0f8f8799996a43b1824fd12aaf7131098a87e2b5034cb766d577470"
          before_revision: 7
          command_digest: "sha256:6348f639ec9f702d5d4e6392e82ae53b35e038e26a8379e8ad01d4f620504742"
          effect_ids: []
          event_digests:
            - "sha256:178f364fb0a16c58201601a414da6fead485b90abf3a14f6551104bc35ada6fa"
          mutation_id: "result:sha256:26376888b1c265f258d54da7bb91841da503e804d4e7b5052ddef94219fa1e8a"
        result:sha256:caa62c715930300b716abf65ba30f7333e294eebe7af8526309045ff6ecd40ab:
          after_revision: 2
          aggregate_digest: "sha256:9e9358f0817674698f2dfb33f1a2f159481d88976d402578fc8e9afc05013667"
          before_revision: 1
          command_digest: "sha256:fd65f7f128664accf6764239f3bb31a66728ab67f2e8157ae4d6ccd341e5f305"
          effect_ids: []
          event_digests:
            - "sha256:459fe4a31b6ecc0fed14498575ef54344591cbeb302ce66f66e212f2c7a799da"
          mutation_id: "result:sha256:caa62c715930300b716abf65ba30f7333e294eebe7af8526309045ff6ecd40ab"
        sha256:001a8307d941dd1658e27ee051c21de930f06ce72d41a4773632c64660da0adb:
          after_revision: 14
          aggregate_digest: "sha256:d1bbe9458cf9222c1cb6467da500e829391a912b4a043a0515a2b6e84662e05b"
          before_revision: 13
          command_digest: "sha256:e24c203a4f6e4fe34cc12393751e890a4db4aa5541e6c42ff5e120378d588e1a"
          effect_ids: []
          event_digests:
            - "sha256:6616f225f2d5e3f0f5e045473b2713d2beb7929a3dc70f8d7e8e7f5bc2d0e862"
          mutation_id: "sha256:001a8307d941dd1658e27ee051c21de930f06ce72d41a4773632c64660da0adb"
        sha256:0e2b123bd3fb9029399beb8c6e25f35d2e8a4273dc461c31e79c782c990f7044:
          after_revision: 7
          aggregate_digest: "sha256:4b418f14d541d382ae164a34de3c63c6fc0382589093b72d29befa824660b436"
          before_revision: 6
          command_digest: "sha256:68dff7f54f28f579f8f02f0f63be61451a845912b29f27ac234590bf473baad2"
          effect_ids: []
          event_digests:
            - "sha256:4eb811844c508f4296067b6fbb1771f730798117d2c3a308723ccfe52c7e8755"
          mutation_id: "sha256:0e2b123bd3fb9029399beb8c6e25f35d2e8a4273dc461c31e79c782c990f7044"
        sha256:72ce4cd7c6329230221f15425164c88083c649ffbdbe8e48ae7a688f0b1eddab:
          after_revision: 3
          aggregate_digest: "sha256:6044a7e102342ae573a2c68c7bd88a99494da857760f4c976db02108b3094d28"
          before_revision: 2
          command_digest: "sha256:d3b7bef0e9dc2e43576a0f943d14ed79127ab00b16d89fd8d49ae298498a1d6e"
          effect_ids: []
          event_digests:
            - "sha256:1ff12fe7e6a7700ce04c1310a591fb88238c12cc2f53acdff11b5b40f077cb3b"
          mutation_id: "sha256:72ce4cd7c6329230221f15425164c88083c649ffbdbe8e48ae7a688f0b1eddab"
        validation-resolution:sha256:398f835fe20ecbf514fcdb061cb41f2892332bfa60e0b3c3be5805e9a78be54f:
          after_revision: 11
          aggregate_digest: "sha256:c008cba58608757faff04b57fdde0b45aa8e7005f1ad776b777c4565fc6d35d5"
          before_revision: 10
          command_digest: "sha256:0c61c1d3d04b97d29fd45fe5685d2427eaf1dc8bd4c3e98cf73720ec0565e542"
          effect_ids: []
          event_digests:
            - "sha256:92b58ae63e5a31b8c48cfbe7816b9653180b3950458afe9fb94f82913206858a"
          mutation_id: "validation-resolution:sha256:398f835fe20ecbf514fcdb061cb41f2892332bfa60e0b3c3be5805e9a78be54f"
        validation-resolution:sha256:7868ca04612c6df02d13202c69bacb8d590f3315b49f18b30c3a8636e68fcfb5:
          after_revision: 18
          aggregate_digest: "sha256:452ad0ffa2bee4cf1327d9184472e5e5b2db77e1cf580e696b49871fce2af53a"
          before_revision: 17
          command_digest: "sha256:81e0a13fcd0aa4109661706515b1b39041a75e9ea9bc1014e98100c0a350d864"
          effect_ids: []
          event_digests:
            - "sha256:7fa6af814a5ee440cec48e665a7de9468dc931140967624d0734f4a0098fac0b"
          mutation_id: "validation-resolution:sha256:7868ca04612c6df02d13202c69bacb8d590f3315b49f18b30c3a8636e68fcfb5"
        validation:sha256:26376888b1c265f258d54da7bb91841da503e804d4e7b5052ddef94219fa1e8a:
          after_revision: 10
          aggregate_digest: "sha256:397abdc816cd8979af00fed6ebe4e89c75e1b59164d746f1d4e7897dfd7b3805"
          before_revision: 9
          command_digest: "sha256:feb991b6a43a51a5377c3fbdbcd5ecf79204b57011d0df9252bba367b634d533"
          effect_ids: []
          event_digests:
            - "sha256:07805a6e69abc9d638fcbde77886defb7f5a35237c3d7fa4a1cc9f592bd0f991"
          mutation_id: "validation:sha256:26376888b1c265f258d54da7bb91841da503e804d4e7b5052ddef94219fa1e8a"
        validation:sha256:850f0e06a7b081b3b671e9c5a5500d6f3d9ef7a7610f8352d98c663ba523e554:
          after_revision: 17
          aggregate_digest: "sha256:68cffb2bd120d86e4bdeef32a410d55b4e23b87ca7ec16e0448de825347a0c71"
          before_revision: 16
          command_digest: "sha256:c665bd49fe05d0200d128a9b526c0865095dd449195eef2743c75c1a967f3aff"
          effect_ids: []
          event_digests:
            - "sha256:cfc96452f9e10709f690c7d48dcbdac7919fbbb4269339f22efd2295656946c7"
          mutation_id: "validation:sha256:850f0e06a7b081b3b671e9c5a5500d6f3d9ef7a7610f8352d98c663ba523e554"
      plan_history: []
      revision: 19
      schema_version: 1
      state: "FINAL_VALIDATION"
      work_items:
        validated-release-scope-exclusions:
          attempt: 2
          claim_id: "sha256:98f54c63a6a9072d173aaf8975399d6a0e75e1d9653d199dec26262f112e03c4"
          definition:
            contract_digest: "sha256:b880230ada6736d4274ec2c329603045022343fd42ba4763aabc26b5f6edf16f"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_read"
                - "repository_write"
                - "git_read"
                - "run_checks"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
                - "release_metadata"
              resources:
                - "release-readiness-contract"
                - "task-registry"
                - "git-history"
              scope_roots:
                - "scripts/lib/release-scope-exclusions.mjs"
                - "scripts/release/release-scope-exclusions.json"
                - "scripts/checks/check-task-state.mjs"
                - "scripts/release/check-task-registry-ready.mjs"
                - "scripts/release/manifest.mjs"
                - "packages/agentplane/src/commands/release/task-registry-ready-script.test.ts"
                - "packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts"
            expected_outputs:
              - "release-scope-exclusion-contract"
            id: "validated-release-scope-exclusions"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 2
              digest: "sha256:73c98417dc25bc100bd5ab1a77d6f24e7d528cd0e179f34893c9d143e09fb417"
              id: "release-scope-exclusion-contract"
              kind: "report"
              plan_revision: 1
              repository_fingerprint: "sha256:3f2a8ac3fa1c1a90dcf9fd63339243d140cd7d0bf6087b047ea11885d3f287d6"
              task_id: "202609211544-JKVHYA"
              work_item_id: "validated-release-scope-exclusions"
          result_digest: "sha256:b5761c816f4344aa9802a1d34eda32c65101cd723ec74b50a174ed39bf0567f2"
          revision: 13
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:6e3b8ecc07a6363758db031a5ca99e883468737126df1c84b85297483fba957c"
              - "sha256:778dcf13fbc58610b3a0f9a559c0d73cc433b45247883a55fffebbc48cc213d4"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:53fddfb0b318e81f57872231639f9dbe6ecaddea542c68d2e34efe620aee62b8"
              environment_digest: "sha256:0dfc60acaf2e554325c775a340d2d80d16b1dd558d975af0c10932321683fcb9"
              implementation_identity: "sha256:b5761c816f4344aa9802a1d34eda32c65101cd723ec74b50a174ed39bf0567f2"
              toolchain_digest: "sha256:2ed0aa02d9a22d48eeb418f30f139ab31dd44db476e35a34e1aee6839e3530c2"
            observed_at: "2026-09-21T16:34:02.719Z"
            status: "PASSED"
    digest: "sha256:3ea6574480f09ea1bf87e87a0efba9a0db7a01219dfbd650cabb6ced84cfe758"
    documents:
      contracts:
        sha256:b880230ada6736d4274ec2c329603045022343fd42ba4763aabc26b5f6edf16f:
          acceptance_criteria:
            - "Every exclusion names an exact task id, evidence kind, reason, and immutable Git reference; malformed, missing, non-ancestor, non-DONE replacement, and unknown-task evidence fail closed."
            - "Standalone release task checks and release-ready manifest generation consume the same validated exclusion set and report the accepted exclusions."
            - "The manifest records only the known historical 0.7.10 and 0.7.11 projections whose work is already published, merged, or superseded by a DONE merged repair task."
            - "No status, canonical task state, immutable compatibility baseline, or unrelated release gate is modified or bypassed."
          objective: "Add one audited release-scope exclusion manifest and a shared validator that permits only exact, Git-proven integrated, superseded, or published historical task projections while leaving every unverifiable active task release-blocking."
          role: "EXECUTOR"
          verification_commands:
            - "bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1"
            - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
            - "bun run test:release:critical"
            - "bun run ci:local:full"
      intent:
        context: "Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded."
        objective: "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks"
    events:
      -
        command_digest: "sha256:b5bf100b25b851017b7ff7d4dea8e8da5d661e4a7ae80c0cf2ef1da50effffa0"
        id: "capture:202609211544-JKVHYA:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609211544-JKVHYA"
        occurred_at: "2026-09-21T15:44:11.534Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609211544-JKVHYA"
        task_revision: 1
      -
        command_digest: "sha256:fd65f7f128664accf6764239f3bb31a66728ab67f2e8157ae4d6ccd341e5f305"
        id: "result:sha256:caa62c715930300b716abf65ba30f7333e294eebe7af8526309045ff6ecd40ab:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:caa62c715930300b716abf65ba30f7333e294eebe7af8526309045ff6ecd40ab"
        occurred_at: "2026-09-21T15:45:00.801Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609211544-JKVHYA"
        task_revision: 2
      -
        command_digest: "sha256:d3b7bef0e9dc2e43576a0f943d14ed79127ab00b16d89fd8d49ae298498a1d6e"
        id: "sha256:72ce4cd7c6329230221f15425164c88083c649ffbdbe8e48ae7a688f0b1eddab:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:72ce4cd7c6329230221f15425164c88083c649ffbdbe8e48ae7a688f0b1eddab"
        occurred_at: "2026-09-21T15:45:09.557Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609211544-JKVHYA"
        task_revision: 3
      -
        command_digest: "sha256:e3ce0d98a664daf95806a56d6b3aecd5995d429c2af0db20d99b860043450dc2"
        id: "kernel_work_item_materialization_required:sha256:a6535bdf98ab69ea1720a6ae942f2e1ff1f80a749b699f1ece89486823d42ea1:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:a6535bdf98ab69ea1720a6ae942f2e1ff1f80a749b699f1ece89486823d42ea1:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        occurred_at: "2026-09-21T15:45:12.887Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609211544-JKVHYA"
        task_revision: 4
      -
        command_digest: "sha256:9add576cdd205834d0fb890feb2281bcb6f0edc9d94fc65dd5fedb1ef1cc9d23"
        id: "kernel_work_item_claim_required:sha256:ad19195ca85f94b3c6474d8be04d6a4138d79235394147ff173ea79d308d2bad:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:ad19195ca85f94b3c6474d8be04d6a4138d79235394147ff173ea79d308d2bad:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        occurred_at: "2026-09-21T15:45:16.777Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609211544-JKVHYA"
        task_revision: 5
      -
        command_digest: "sha256:adfa189a03c544d030b5f9cc8a5bdd508575ce2bdb64c0b3b10f3102fe4aea69"
        id: "kernel_work_item_execution_required:sha256:83af28772e694be35eeabecfa9169940adbddc4cb8870671c7d57310b1ad1661:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:83af28772e694be35eeabecfa9169940adbddc4cb8870671c7d57310b1ad1661:sha256:2b983a585f7add3b08d3604bcbb04aa73b9a29dfdd5d2d7b5d2bd7d58c03d3aa"
        occurred_at: "2026-09-21T15:45:34.675Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609211544-JKVHYA"
        task_revision: 6
      -
        command_digest: "sha256:68dff7f54f28f579f8f02f0f63be61451a845912b29f27ac234590bf473baad2"
        id: "sha256:0e2b123bd3fb9029399beb8c6e25f35d2e8a4273dc461c31e79c782c990f7044:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:0e2b123bd3fb9029399beb8c6e25f35d2e8a4273dc461c31e79c782c990f7044"
        occurred_at: "2026-09-21T16:13:18.603Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609211544-JKVHYA"
        task_revision: 7
      -
        command_digest: "sha256:6348f639ec9f702d5d4e6392e82ae53b35e038e26a8379e8ad01d4f620504742"
        id: "result:sha256:26376888b1c265f258d54da7bb91841da503e804d4e7b5052ddef94219fa1e8a:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:26376888b1c265f258d54da7bb91841da503e804d4e7b5052ddef94219fa1e8a"
        occurred_at: "2026-09-21T16:13:22.771Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609211544-JKVHYA"
        task_revision: 8
      -
        command_digest: "sha256:729f50edc04a1eb412d63a273f6bd8f41b9d2185acbabe9f7a17a7b636421d7f"
        id: "kernel_work_item_inspection_required:sha256:f62c42fa86c73a3b7f43102ff22c4870dff5fed2f0080581918b0f517e84a3ad:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:f62c42fa86c73a3b7f43102ff22c4870dff5fed2f0080581918b0f517e84a3ad:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c"
        occurred_at: "2026-09-21T16:13:26.086Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609211544-JKVHYA"
        task_revision: 9
      -
        command_digest: "sha256:feb991b6a43a51a5377c3fbdbcd5ecf79204b57011d0df9252bba367b634d533"
        id: "validation:sha256:26376888b1c265f258d54da7bb91841da503e804d4e7b5052ddef94219fa1e8a:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:26376888b1c265f258d54da7bb91841da503e804d4e7b5052ddef94219fa1e8a"
        occurred_at: "2026-09-21T16:13:35.866Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609211544-JKVHYA"
        task_revision: 10
      -
        command_digest: "sha256:0c61c1d3d04b97d29fd45fe5685d2427eaf1dc8bd4c3e98cf73720ec0565e542"
        id: "validation-resolution:sha256:398f835fe20ecbf514fcdb061cb41f2892332bfa60e0b3c3be5805e9a78be54f:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:398f835fe20ecbf514fcdb061cb41f2892332bfa60e0b3c3be5805e9a78be54f"
        occurred_at: "2026-09-21T16:13:37.962Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609211544-JKVHYA"
        task_revision: 11
      -
        command_digest: "sha256:7d1bc5f9e49b574c49d8dcb1786ea9e4b6d0f69d537ff385e52390ffdfb708d3"
        id: "kernel_work_item_rework_claim_required:sha256:2301d2040c183a14149dfd69ad92031d9dd244ca7351fbc2ff795c220103f234:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:2301d2040c183a14149dfd69ad92031d9dd244ca7351fbc2ff795c220103f234:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c"
        occurred_at: "2026-09-21T16:13:42.452Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609211544-JKVHYA"
        task_revision: 12
      -
        command_digest: "sha256:b8b455e768b74a904ea4a7fb4b4379cb3355dd10171e60d1950d8e33bbd3e0cc"
        id: "kernel_work_item_execution_required:sha256:837bf018dfbd02f01017665aa989e6d71d680ec904dc3b76b2f36251b47eddc9:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:837bf018dfbd02f01017665aa989e6d71d680ec904dc3b76b2f36251b47eddc9:sha256:cd91f12ee8394b788cd81ca79f909db8ed9b2ccfff1107de15840e2fc4acc17c"
        occurred_at: "2026-09-21T16:13:45.783Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609211544-JKVHYA"
        task_revision: 13
      -
        command_digest: "sha256:e24c203a4f6e4fe34cc12393751e890a4db4aa5541e6c42ff5e120378d588e1a"
        id: "sha256:001a8307d941dd1658e27ee051c21de930f06ce72d41a4773632c64660da0adb:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:001a8307d941dd1658e27ee051c21de930f06ce72d41a4773632c64660da0adb"
        occurred_at: "2026-09-21T16:24:40.143Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202609211544-JKVHYA"
        task_revision: 14
      -
        command_digest: "sha256:8aedcb7c114c6aa7dce1c405c290656d7c6c4458614ceedd0651f9550483f572"
        id: "result:sha256:00891572eff8abe1f592d29e297c8281d587bb3a4dba08e6ae34982eb1f8fad6:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:00891572eff8abe1f592d29e297c8281d587bb3a4dba08e6ae34982eb1f8fad6"
        occurred_at: "2026-09-21T16:24:44.339Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202609211544-JKVHYA"
        task_revision: 15
      -
        command_digest: "sha256:b20e5135af7fd954571cfc8a3537338c845d976813e9213aa92e113aa9af1f9c"
        id: "kernel_work_item_inspection_required:sha256:fc2afe7fd8a723dee69792d7ee356ac4526f278cca6410ff1ef9ba54fc17a775:sha256:3f2a8ac3fa1c1a90dcf9fd63339243d140cd7d0bf6087b047ea11885d3f287d6:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:fc2afe7fd8a723dee69792d7ee356ac4526f278cca6410ff1ef9ba54fc17a775:sha256:3f2a8ac3fa1c1a90dcf9fd63339243d140cd7d0bf6087b047ea11885d3f287d6"
        occurred_at: "2026-09-21T16:24:47.717Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609211544-JKVHYA"
        task_revision: 16
      -
        command_digest: "sha256:c665bd49fe05d0200d128a9b526c0865095dd449195eef2743c75c1a967f3aff"
        id: "validation:sha256:850f0e06a7b081b3b671e9c5a5500d6f3d9ef7a7610f8352d98c663ba523e554:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:850f0e06a7b081b3b671e9c5a5500d6f3d9ef7a7610f8352d98c663ba523e554"
        occurred_at: "2026-09-21T16:34:05.932Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202609211544-JKVHYA"
        task_revision: 17
      -
        command_digest: "sha256:81e0a13fcd0aa4109661706515b1b39041a75e9ea9bc1014e98100c0a350d864"
        id: "validation-resolution:sha256:7868ca04612c6df02d13202c69bacb8d590f3315b49f18b30c3a8636e68fcfb5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:7868ca04612c6df02d13202c69bacb8d590f3315b49f18b30c3a8636e68fcfb5"
        occurred_at: "2026-09-21T16:34:07.920Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609211544-JKVHYA"
        task_revision: 18
      -
        command_digest: "sha256:a778947d49ce9f93390822a8145f4c6297aa021e09ff8e80464bd566ac15d085"
        id: "final-validation:sha256:fe7c7fee9f89f860e284b103bb9818c3152a874e933cdabd0e418517f9e58fc6:18:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:fe7c7fee9f89f860e284b103bb9818c3152a874e933cdabd0e418517f9e58fc6:18"
        occurred_at: "2026-09-21T16:41:35.654Z"
        payload_digest: "sha256:061b64c43e766deec68402b745cdbeebf06d7f074e836a20923db1df75ee5a64"
        task_id: "202609211544-JKVHYA"
        task_revision: 19
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks

Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.

## Scope

- In scope: Introduce an audited release-scope exclusion manifest and validator. An excluded active task is accepted only when exact Git evidence proves its implementation merge, its replacement task is DONE and merged, or its historical release tag is published in the repository. Wire the validated exclusions into local and hosted release-readiness manifests without weakening any other task, compatibility, CI, or publication gate. Record the exact 0.7.11 historical projections that are already integrated or superseded.
- Out of scope: unrelated refactors not required for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks".

## Plan

1. Execute approved WorkItem validated-release-scope-exclusions.

## Verify Steps

PLANNER fallback scaffold for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add fail-closed release-scope exclusions for demonstrably integrated or superseded canonical tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-21T16:41:40.926Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a866648b4c0ac730c5116f5dcda4f427f1fa902b97d2fe7da01853cb6049b88a, input_digest=sha256:813d3b5ad050c2ab7aa9c92e80160cba4ddb42f886abfd57ff8fa315a7c235a4

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun run test:release:critical
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: node scripts/release/check-task-registry-ready.mjs --allow-active-release-task
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun run test:release:critical
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: node scripts/release/check-task-registry-ready.mjs --allow-active-release-task
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check real_e2e (1/4)

Check: real_e2e
Command: bun run test:release:critical
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check real_e2e (2/4)

Check: real_e2e
Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check real_e2e (3/4)

Check: real_e2e
Command: node scripts/release/check-task-registry-ready.mjs --allow-active-release-task
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check real_e2e (4/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run test:release:critical
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun x vitest --config vitest.config.ts run packages/agentplane/src/commands/release/task-registry-ready-script.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts --pool=forks --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: node scripts/release/check-task-registry-ready.mjs --allow-active-release-task
Result: pass
Evidence: .agentplane/tasks/202609211544-JKVHYA/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609211544-JKVHYA Verification Contract check task_outcome (4/4)

NativeTaskIdentityRef:
- plan_digest: sha256:f0a58f00a56520e20a7a85eabb5b48098a8b1967f004d378212735dab7c6ba6f
- policy_digest: sha256:9b668d089af056af9741759543ed685caaa27c913a3aa16d382cfde5faf1adc7
- capability_digest: sha256:4fad168dcc6ce614e806e5ee61bfa5b2309a2f4596fd91f7b675e8f86b7f6ad8
- checks_digest: sha256:1fa60887df046d3264c65f7aeed438d45c76cc44ff95aba45e1b2beac0ac4e03
- identity_digest: sha256:b10d49808e46386f7be92df0e4b9547d097f254d1a8acb3055ef55d4cb74a9d8

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
