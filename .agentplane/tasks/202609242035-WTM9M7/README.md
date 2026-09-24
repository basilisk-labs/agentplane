---
id: "202609242035-WTM9M7"
title: "Bind canonical final verification to the observed verification contract"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 31
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "task-kernel"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:fast"
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-24T21:21:03.773Z"
  updated_by: "USER"
  note: "Projected from the approved canonical Task Kernel plan."
verification:
  state: "ok"
  updated_at: "2026-09-24T21:29:08.206Z"
  updated_by: "SUPERVISOR"
  note: "Verified: canonical Task Kernel final checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-24T21:21:03.773Z"
  updated_by: "EVALUATOR"
  note: "Canonical EVALUATOR review passed."
  evaluated_sha: "80c960f65f641e56b6ca8550a39ac5af3f443d62"
  review_identity_digest: "sha256:001d3b17d9f93e597733502345cad1467a57d1b89843446f0000c01958015e3f"
  evidence_refs:
    - "../../../.git/agentplane/kernel/exchanges/202609242035-WTM9M7/2814aa318d7008f90c52b336b5f4e2f88141b49e9824ffe0cb2fa433a4b74ce2/quality-report.json"
  findings:
    - "Canonical Plan commands execute once against the operational task with legacy task.verify commands removed."
    - "After successful native checks and the stale-input guard, one observed verification snapshot enriches those same check results and is reused for projection."
    - "The immutable final-validation artifact becomes the cited evidence path, so dynamically selected check IDs and their executed commands remain aligned."
    - "AgentPlane independently observed focused tests, typecheck, and ci:local:fast passing; the broad suite reported 680 test files and 5839 passed tests."
token_usage:
  agent_runs: 0
  cached_input_observed_agent_runs: 0
  cached_input_tokens: null
  input_tokens: null
  journal_digest: "sha256:f8da4263c97535e973ec64b4b65da79177795670801bc3cc4a6207c3705a7b61"
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "no_supervised_agent_runs"
  updated_at: "2026-09-24T21:31:13.516Z"
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_capabilities:
      - "repository_write"
      - "task.verify"
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    allowed_resources: []
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/commands/task"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "explicit structured task intake"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
      - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
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
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/commands/task"
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
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:2cdfd58757109d716c54b4bac1f1300197bcc8164f5a755d7412a785cff669b8"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
          - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
  hash: "0ec750726efecbec996b8a530cf3c5de6927ad8e"
  message: "✅ WTM9M7 task: persist canonical completion"
comments:
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "verify"
    at: "2026-09-24T21:29:08.206Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: canonical Task Kernel final checks passed."
  -
    type: "status"
    at: "2026-09-24T21:31:13.516Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
    commit: "0ec750726efecbec996b8a530cf3c5de6927ad8e"
doc_version: 3
doc_updated_at: "2026-09-24T21:31:13.516Z"
doc_updated_by: "CODER"
description: "Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record."
sections:
  Summary: |-
    Bind canonical final verification to the observed verification contract

    Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.
  Scope: |-
    - In scope: Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.
    - Out of scope: unrelated refactors not required for "Bind canonical final verification to the observed verification contract".
  Plan: "PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-24T21:29:08.206Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: canonical Task Kernel final checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:237f864619f68fc204a6f1a3a1415dc5eb528250c14acd21ad3a9fa4e1f6b4eb, input_digest=sha256:1bd70f60fd447df459335dc3bdb8c2dfd8bd5deaa5a01e1e4d4414b942636024

    Details:

    Check: affected_unit_integration
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts
    Result: pass
    Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-1
    Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-2
    Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:fast
    Result: pass
    Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-3
    Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts
    Result: pass
    Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-1
    Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-2
    Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:fast
    Result: pass
    Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-3
    Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check critical_paths (3/3)

    Check: task_outcome
    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts
    Result: pass
    Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-1
    Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-2
    Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:fast
    Result: pass
    Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-3
    Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check task_outcome (3/3)

    NativeTaskIdentityRef:
    - plan_digest: sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082
    - policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
    - capability_digest: sha256:f2f93935a83dceb80a450ec264e504489c4c1c9b33e401664f08190ae0c1aa23
    - checks_digest: sha256:5c219b4f3373e9bee1d5ed2c43412e3cb6b40c765642746f92a7b396eea1b7ef
    - identity_digest: sha256:f2fd14d0683a5181ad805228cec1e3c2b71cddf75ae61f614e16e502b91b90ba

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609242035-WTM9M7
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
    digest: "sha256:5dd7fd417574f0dea4db4542218c0899e6e6f704f61174c1075732c742681b0e"
    evidence_refs:
      - "../../../.git/agentplane/kernel/exchanges/202609242035-WTM9M7/2814aa318d7008f90c52b336b5f4e2f88141b49e9824ffe0cb2fa433a4b74ce2/quality-report.json"
    findings:
      - "Canonical Plan commands execute once against the operational task with legacy task.verify commands removed."
      - "After successful native checks and the stale-input guard, one observed verification snapshot enriches those same check results and is reused for projection."
      - "The immutable final-validation artifact becomes the cited evidence path, so dynamically selected check IDs and their executed commands remain aligned."
      - "AgentPlane independently observed focused tests, typecheck, and ci:local:fast passing; the broad suite reported 680 test files and 5839 passed tests."
    implementation_commit: "80c960f65f641e56b6ca8550a39ac5af3f443d62"
    implementation_tree: "27b25129fb78aaf42f2be1b91fd5803f3b4fe526"
    projected_at: "2026-09-24T21:21:03.773Z"
    review_identity_digest: "sha256:001d3b17d9f93e597733502345cad1467a57d1b89843446f0000c01958015e3f"
    schema_version: 1
    source: "task_kernel"
    verification_evidence_digest: "sha256:065619b6307bac0135473498937455e4357c58bdd8f9225ca7d04c490f4e80c1"
    work_order_id: "sha256:7c5ea1e14b9aa8d0d39780ebec1ab75f9b80213aa24ac38d4f22f4193b8b780b"
  implementation_commit:
    hash: "80c960f65f641e56b6ca8550a39ac5af3f443d62"
    message: "🚧 WTM9M7 task: apply canonical agent result"
  task_execution_context:
    base_ref: "main"
    base_sha: "b3af40b4834cbb0b270af1bd5772888d7a8cd97f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  task_kernel:
    aggregate:
      authority_lineage:
        -
          approval_mode: "repository_policy"
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:06efd5b3a8cd51ac6888d33ee3aaaa1c2bfee6120ecb7ec22513c0a75b4f23e6"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:00bcdb34bdccf56a362754c135cf8b949bbf2d7800fa8779186d1921c75934bd"
              kind: "SYSTEM"
              parent_authority_digest: null
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609242035-WTM9M7"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
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
            digest: "sha256:4e3f2b54e8e8fb81a3064fe1074560235fbb2dd62ef1f2f74e90b8f71f5e9ef8"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:00bcdb34bdccf56a362754c135cf8b949bbf2d7800fa8779186d1921c75934bd"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:06efd5b3a8cd51ac6888d33ee3aaaa1c2bfee6120ecb7ec22513c0a75b4f23e6"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609242035-WTM9M7"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
            evidence_digest: "sha256:46f9a8629d144011f84a0991eb5b3003ca58ff7a6c2bac4ed0bcaf19761cde9c"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:441c3509341e5d7a64574ad455f002d8b670ac3fee02bf2cfeb0c055716a0e65"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:00bcdb34bdccf56a362754c135cf8b949bbf2d7800fa8779186d1921c75934bd"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:4e3f2b54e8e8fb81a3064fe1074560235fbb2dd62ef1f2f74e90b8f71f5e9ef8"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609242035-WTM9M7"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/direct-task-verification.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.ts"
            evidence_digest: "sha256:08822e8f88f1a2e5907689706de457416486ee171cb1f9c0e51235bd5f2b11a5"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        -
          approval_mode: null
          authority:
            capabilities:
              - "repository_write"
              - "task.verify"
            completion_requirements:
              - "work_item_validation"
              - "final_validation"
            digest: "sha256:e9eaa43c5bfbfaddbc9439f2be72e9b3fb887ca23cd8dc6a7b0b688213332790"
            expires_at: null
            external_effects: []
            plan_digest: "sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082"
            plan_revision: 1
            policy_digests:
              - "sha256:4d715b617cb49d4304a46cbd010ff04038119a5412bfcf5889d6d1ce83807648"
            provenance:
              actor_id: "agentplane:kernel-controller"
              evidence_digest: "sha256:00bcdb34bdccf56a362754c135cf8b949bbf2d7800fa8779186d1921c75934bd"
              kind: "SYSTEM"
              parent_authority_digest: "sha256:441c3509341e5d7a64574ad455f002d8b670ac3fee02bf2cfeb0c055716a0e65"
            repository_effects:
              - "repository_write"
              - "source_code"
              - "tests"
            repository_fingerprint: "sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9"
            repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
            resources: []
            risk:
              implementation: "bounded"
              requirements: "bounded"
              reversibility: "reversible"
            scope_roots:
              - "packages/agentplane/src/commands/task"
            task_id: "202609242035-WTM9M7"
            validation_requirements:
              - "affected_unit_integration"
              - "critical_paths"
              - "hosted_integration"
              - "task_outcome"
            work_item_id: null
          observation:
            changed_paths:
              - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              - "packages/agentplane/src/commands/task/kernel-final-validation.test.ts"
            evidence_digest: "sha256:36a8fa33f0e4d85f1857cdf0d8074416f574697ea6e8cf08dba33854cf3b20f3"
            kind: "repository_implementation"
            previous_fingerprint: "sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183"
      controller_transfer: null
      current_plan:
        approval_actor_id: "agentplane:kernel-controller"
        approval_evidence_digest: "sha256:00bcdb34bdccf56a362754c135cf8b949bbf2d7800fa8779186d1921c75934bd"
        digest: "sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082"
        revision: 1
        state: "APPROVED"
        work_items:
          -
            contract_digest: "sha256:8ebff7c7a9ef14498b5faec794fd0ebf255936c38eebc93e5b59db7ae77eacb8"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "observed-contract-ordering"
              - "dynamic-check-regression"
            id: "observed-final-verification"
            optional: false
            required_inputs: []
      effects: []
      final_validation:
        evidence_digests:
          - "sha256:065619b6307bac0135473498937455e4357c58bdd8f9225ca7d04c490f4e80c1"
        identity:
          check_id: "canonical-final-contracts"
          command_digest: "sha256:a1abc965101ff7095b2c2577d54ec663646c1fcc8216333eb09e612a3f9c3ee5"
          environment_digest: "sha256:5dae9e5afc2adeb22dff85b9e2cdf01ef71aed37fdf541faa7247e4fb0a6169c"
          implementation_identity: "sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9"
          toolchain_digest: "sha256:ffb35acb41428422799e4cefc57db8bf03e44c4327bc9976a403943738f026e6"
        observed_at: "2026-09-24T21:21:14.084Z"
        status: "PASSED"
      id: "202609242035-WTM9M7"
      intent_digest: "sha256:7a2ac4209bb189b310e70c1c48159de632ba24b8861a7f3fee0d6925febdeb29"
      migration_receipts: []
      mutation_receipts:
        capture:202609242035-WTM9M7:
          after_revision: 1
          aggregate_digest: "sha256:d087299f97c7cb3a793b69e18744def4f0ec228728d9cd3e97a1ab32d3406d75"
          before_revision: 0
          command_digest: "sha256:355f80998e8fade91cfc4aaa42408e9ce3985988b5f571582d8d9f5a89bb1bf9"
          effect_ids: []
          event_digests:
            - "sha256:3be372c321354dc63dbfeb426bdf1775fa448fdfce8c3fd11580975da377ad4c"
          mutation_id: "capture:202609242035-WTM9M7"
        final-validation:sha256:065619b6307bac0135473498937455e4357c58bdd8f9225ca7d04c490f4e80c1:25:
          after_revision: 26
          aggregate_digest: "sha256:b8416633725e7cd29ef4d45d1abdcc07127852a03891f49aa63b622893d996a2"
          before_revision: 25
          command_digest: "sha256:9b571daa64dba7f78bcaef849d3a27a0e55d72b9c5487cedbd179dbf771dc6dc"
          effect_ids: []
          event_digests:
            - "sha256:314563c4dc8d41b889450c792bac07fae51051aca4f3445d5043957d0f6e650e"
          mutation_id: "final-validation:sha256:065619b6307bac0135473498937455e4357c58bdd8f9225ca7d04c490f4e80c1:25"
        kernel_task_completion_required:sha256:9a73fe39739712374bdcbceb5d6b04fea560735a074f3afa21d39a813fc400ae:sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9:
          after_revision: 27
          aggregate_digest: "sha256:822896c2c663b0b460f21c29ab089b32c43c5d6017b6c781c614b22f6cf22171"
          before_revision: 26
          command_digest: "sha256:6252a11d78cdea9d657266ea3ad8cb7f50f709fe7b5674f33a868db5cc98bf99"
          effect_ids: []
          event_digests:
            - "sha256:e3c9ac74db7810d0f4081bbef365e101ed08fecccc77ba4122110795a0b5cc7e"
          mutation_id: "kernel_task_completion_required:sha256:9a73fe39739712374bdcbceb5d6b04fea560735a074f3afa21d39a813fc400ae:sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9"
        kernel_work_item_claim_required:sha256:967ca92ed86eff13c3b740ea4c49a4c4547d3d34e9e53397caa36ed6627f4830:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:
          after_revision: 5
          aggregate_digest: "sha256:6e9a4cd954462763207abe53a631a53220c6380af7192e5bb50a83634627167a"
          before_revision: 4
          command_digest: "sha256:404871be7346551dfd753db631f36981f1fda16d170a496c2725beb8096b5de4"
          effect_ids: []
          event_digests:
            - "sha256:822a31fdaee83332d70a4ff15b0e9c43c8076d2832ac8716d8f72945abd3f071"
          mutation_id: "kernel_work_item_claim_required:sha256:967ca92ed86eff13c3b740ea4c49a4c4547d3d34e9e53397caa36ed6627f4830:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        kernel_work_item_execution_required:sha256:2bc7abc409edd3ca447b4699a29d705fcd4e13d1cd7f714971ba95452282d0dc:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:
          after_revision: 6
          aggregate_digest: "sha256:833097294101178f46ca107082dd3dddca30014045e0df4c76b2caedfedabe2e"
          before_revision: 5
          command_digest: "sha256:97da9e4bed674b92a089efb5e5fbb7e74a97ce9bfaa6abde98128a9efa93bd7f"
          effect_ids: []
          event_digests:
            - "sha256:45eacc17a573b182fe22ae34ad4d2247ff0262781925afc0904d7b9074ff80d6"
          mutation_id: "kernel_work_item_execution_required:sha256:2bc7abc409edd3ca447b4699a29d705fcd4e13d1cd7f714971ba95452282d0dc:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        kernel_work_item_execution_required:sha256:7557b5f9a4553fedcaebe8b41007f5f09d389a896e5d9ed9634afe3aff2dcbb7:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183:
          after_revision: 20
          aggregate_digest: "sha256:093d15ab3bcc43b5808f64bb60c16c32ab7df0912bb07c24e66d7006ebc4e3a8"
          before_revision: 19
          command_digest: "sha256:be7d3062a5aada94d68b71cff5413615e3467f3c55e3299525e893c265cf36ca"
          effect_ids: []
          event_digests:
            - "sha256:c0ead58d6d77101857e7bc6fe3803873272bba63935e7b0ab55502538cbea8ba"
          mutation_id: "kernel_work_item_execution_required:sha256:7557b5f9a4553fedcaebe8b41007f5f09d389a896e5d9ed9634afe3aff2dcbb7:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183"
        kernel_work_item_execution_required:sha256:bf3ebc0ac5d4a2b63523f437e3511ca11475033731f716665eae3577a0c52267:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:
          after_revision: 13
          aggregate_digest: "sha256:feab8a6ff883ca048a0e4f7d0a51443dc66474350f5a5d3e84096f08cfd8eaea"
          before_revision: 12
          command_digest: "sha256:b72c5d1a902b68ede43d7bda36f83409b88bfade301cce49513202658292ccdd"
          effect_ids: []
          event_digests:
            - "sha256:9bb722221df48a7425f6f8e066eabb2b03c61756f18ea92b66ac3da273a57fce"
          mutation_id: "kernel_work_item_execution_required:sha256:bf3ebc0ac5d4a2b63523f437e3511ca11475033731f716665eae3577a0c52267:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        kernel_work_item_inspection_required:sha256:01ed770cc4022e2f91956631d99a2464f5f690c9755d51bc8777f26fad21b5a8:sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9:
          after_revision: 23
          aggregate_digest: "sha256:96e3bfc404d7992192fc9ec7b85a81261d4dd56871523b04a4655636149d4925"
          before_revision: 22
          command_digest: "sha256:a3f092f753a50b6e4379b14a3153f3acac169dfa213687783885af03aa62bc04"
          effect_ids: []
          event_digests:
            - "sha256:8465379c9f5a7ca54e99d1b05aa85b7906f2c1324e9ab6b0087e42623240fcd7"
          mutation_id: "kernel_work_item_inspection_required:sha256:01ed770cc4022e2f91956631d99a2464f5f690c9755d51bc8777f26fad21b5a8:sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9"
        kernel_work_item_inspection_required:sha256:3b31e9a036a3f5de3bfb179d5aa8ad7fe227f7a91759b70285e19bc09bb25e01:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:
          after_revision: 9
          aggregate_digest: "sha256:ea726f5c6d3214f352e0790276247c2023ddd35f23cd4611f8c8e11714d28ac6"
          before_revision: 8
          command_digest: "sha256:c4c78bf43fccf2bf8c66f91eae46b45ad1cf802f348714cbe912ced71e8ca86a"
          effect_ids: []
          event_digests:
            - "sha256:e16ef976af3c75a8c424908edc93c328c8050ecff04d8c18acb06f8fa4a81171"
          mutation_id: "kernel_work_item_inspection_required:sha256:3b31e9a036a3f5de3bfb179d5aa8ad7fe227f7a91759b70285e19bc09bb25e01:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        kernel_work_item_inspection_required:sha256:5d365f65e856abb598c817f313bb02113200361d229188a5146c3d9444793b5e:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183:
          after_revision: 16
          aggregate_digest: "sha256:21a64b0728f870d8f346e5428646dbefaafd9304991fdbc89f5d5d3cb06a8ea0"
          before_revision: 15
          command_digest: "sha256:d91f5fc7e7191c418644f6be01be2bec917e89c6f1f2bbf81b4b69c9c56233ec"
          effect_ids: []
          event_digests:
            - "sha256:58ae84003d64bbe1edb21039337525832f2395bae6530a857b35e33022a4d87d"
          mutation_id: "kernel_work_item_inspection_required:sha256:5d365f65e856abb598c817f313bb02113200361d229188a5146c3d9444793b5e:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183"
        kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:
          after_revision: 4
          aggregate_digest: "sha256:318a42477f675444a00d2205494ac739cc1a723d9901da1045fe73ba475a1762"
          before_revision: 3
          command_digest: "sha256:750ecb51e720cf84711c1a9eea60801a3e4ae4e5c03f11e82b026d982ccb8a8b"
          effect_ids: []
          event_digests:
            - "sha256:a1b575a790c73cf9086c24a6a1a3d3328dbddb9be08448e4b711cf0f9378322e"
          mutation_id: "kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        kernel_work_item_rework_claim_required:sha256:3b2d1b0eaa79d882fa4267c547d1a9c7176829063d37a742f775fa78e6b3fda8:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:
          after_revision: 12
          aggregate_digest: "sha256:58c7d9fa9358cb679f27ac28f877a4b802f27a114068d8ae69e5ab4406958718"
          before_revision: 11
          command_digest: "sha256:0f87cfedfeab7ee6705f3277511da77f7aa4b6d91199d27e458396d8e05c7aa4"
          effect_ids: []
          event_digests:
            - "sha256:85b31aa4030313c6b954d21ea4638f440e789c50873cf5efa0ca1a0c4b036771"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:3b2d1b0eaa79d882fa4267c547d1a9c7176829063d37a742f775fa78e6b3fda8:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        kernel_work_item_rework_claim_required:sha256:ac490a5056cb220c6dd1bc8a69d6d195cb4f1e3ccd9de02c99a00e2d4b1e2c35:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183:
          after_revision: 19
          aggregate_digest: "sha256:927d9c925da807bcbdc37621906f01120050e60ba2de0ea8c3dbaf4890e8f4f4"
          before_revision: 18
          command_digest: "sha256:b43e6f5a5943f58cc5f5866cecc83ae5b885a172e34cf7feaf7c732139d3022f"
          effect_ids: []
          event_digests:
            - "sha256:8995957c98e5bcd970f7c1ae41901f04fbfe8e482b84476f16978b74eb9cac44"
          mutation_id: "kernel_work_item_rework_claim_required:sha256:ac490a5056cb220c6dd1bc8a69d6d195cb4f1e3ccd9de02c99a00e2d4b1e2c35:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183"
        result:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c:
          after_revision: 8
          aggregate_digest: "sha256:9f1074ce36e32d328b5bf771732092bff94d934590388802fffd19cc2d73dc4a"
          before_revision: 7
          command_digest: "sha256:f9a4f664e0dd0d4f16b4965f6095ce83c0cc1efff5fd267393bf3cd1d699eea9"
          effect_ids: []
          event_digests:
            - "sha256:6f6e873310afe35d673495dd6d1918c033951f35c27511e1bcd7c11e163285d5"
          mutation_id: "result:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c"
        result:sha256:7c5ea1e14b9aa8d0d39780ebec1ab75f9b80213aa24ac38d4f22f4193b8b780b:
          after_revision: 22
          aggregate_digest: "sha256:cadb69550342d23290aded52fcb3c694008c93b46b5ab151cdbf339ec6a0a9d0"
          before_revision: 21
          command_digest: "sha256:062713b66aace1c461520c2db131181bbc14ac68ba2f47776e28a679434444ad"
          effect_ids: []
          event_digests:
            - "sha256:3d286f3bf0d8920aa9e0252c3aaf19de29b0ccef990db1393f9e859c5244c1e3"
          mutation_id: "result:sha256:7c5ea1e14b9aa8d0d39780ebec1ab75f9b80213aa24ac38d4f22f4193b8b780b"
        result:sha256:8647f3ee0d28559c18c3b866ae2df8f65ece40e6117d85e6170b663ba85cdee4:
          after_revision: 2
          aggregate_digest: "sha256:4e8a8e2c5a6730ce4df36ca15bc46d2bcfaa6593ee673ca315639c33e9c7244e"
          before_revision: 1
          command_digest: "sha256:a71d0559c411225193056282fb3bdf84efdbbcf2f26b14634f3dfa490219c26c"
          effect_ids: []
          event_digests:
            - "sha256:51af1ca37b8eab56b45333ffc6e2eb009464d4f2f0988b70663ee45cd9b65878"
          mutation_id: "result:sha256:8647f3ee0d28559c18c3b866ae2df8f65ece40e6117d85e6170b663ba85cdee4"
        result:sha256:a688b5dc90410bc2898570bcd848bff7a13ef57a672b105cf8de2bf4c933c41d:
          after_revision: 15
          aggregate_digest: "sha256:e73572ab74263993b27ac18df69d619351f71fb35eb93a715f1f00ababe227b9"
          before_revision: 14
          command_digest: "sha256:11512253405a5c04a002e0eb40e44f216c88025aab580c86018d77631b502d82"
          effect_ids: []
          event_digests:
            - "sha256:258261d178c0bf5b69fc4a746e5225ceb08bd6dd8633ee0819949d1d62119a2e"
          mutation_id: "result:sha256:a688b5dc90410bc2898570bcd848bff7a13ef57a672b105cf8de2bf4c933c41d"
        sha256:0ea921a15357185be5dba34c6d17b37e61beb24543aaad6a39f68d7ff2818f97:
          after_revision: 3
          aggregate_digest: "sha256:7911c66a65a0a6611d2ca20df7d455d15c697085f216f6bc604dcf0cff6889ec"
          before_revision: 2
          command_digest: "sha256:80f050281a3776d983b710abdb79da93ef496a97c3d30dd4369a03ef1bc6e579"
          effect_ids: []
          event_digests:
            - "sha256:6d88dee3e1f444350e90134908470781fc19e055ea4be431d6f8bc02d18b0200"
          mutation_id: "sha256:0ea921a15357185be5dba34c6d17b37e61beb24543aaad6a39f68d7ff2818f97"
        sha256:6fd69ace10792d53331f34dba3ca98a83bdacf32935a49a39ade4510430452d0:
          after_revision: 21
          aggregate_digest: "sha256:4fcf764d30060e07d6ee061240d398ac80ad3dfba273fa641c32e4979f4199a9"
          before_revision: 20
          command_digest: "sha256:ae796c968d1c33f256538a1884b80a57a79bfef3a77946bc248a40de312d836e"
          effect_ids: []
          event_digests:
            - "sha256:45ef99272cbc61824641928456f788549f6f6092de8ac9b1cdbd02acf7b7da4f"
          mutation_id: "sha256:6fd69ace10792d53331f34dba3ca98a83bdacf32935a49a39ade4510430452d0"
        sha256:e80f6a6dc354bd6ebc193d600158fcec794afe9587f96c8312d54bb014159102:
          after_revision: 7
          aggregate_digest: "sha256:46ab6bbf8b91f25ed1df293e72770596cc1ffa1f3a11a627672f72f4425fe0b7"
          before_revision: 6
          command_digest: "sha256:02b52dc58009ac8c642a9b1ad36f8fa0e94d5e6a8b71bdabaf8f1b19a5369fea"
          effect_ids: []
          event_digests:
            - "sha256:8f2dc6d4765f6ab7d2819c1c7d95e39c9b708a1b6e027e9c4736051b5f675447"
          mutation_id: "sha256:e80f6a6dc354bd6ebc193d600158fcec794afe9587f96c8312d54bb014159102"
        sha256:faf8ed6fcb23d7538c1f46a4340badf83f5aa4eb811be9a3c9abdd4a94848cf9:
          after_revision: 14
          aggregate_digest: "sha256:4b98f4696dee2dec6b8dd61df671f8e4f202399925850ed53494a6b3da361de9"
          before_revision: 13
          command_digest: "sha256:83569122f3cc54bad36d45f12f5c757111f5bf7515173ca98b8a3acac5a4fbf9"
          effect_ids: []
          event_digests:
            - "sha256:ec705ccd0ac087793f9476d5acd731dfc23e77b372c06e0691957d120604522e"
          mutation_id: "sha256:faf8ed6fcb23d7538c1f46a4340badf83f5aa4eb811be9a3c9abdd4a94848cf9"
        validation-resolution:sha256:0e75d467f67741df1297086d281921b811d8517180108a1cd68c683c5bf8de71:
          after_revision: 11
          aggregate_digest: "sha256:1ad6d4f85698b73624ed6d43046833a715e4f25dd9acfc0b96b85552bd01242c"
          before_revision: 10
          command_digest: "sha256:96d6b4ee2946ebea6df4185481e8bef4011f4b62f86244caf12f9e4f94b744a4"
          effect_ids: []
          event_digests:
            - "sha256:05bca566d4e460d6734d3c2e8cf993e8907d9c8229b3b46f08bf362834157b0b"
          mutation_id: "validation-resolution:sha256:0e75d467f67741df1297086d281921b811d8517180108a1cd68c683c5bf8de71"
        validation-resolution:sha256:62941a4883b4f8d8ee18d8e0d3c8d6632ccf842defc3d03ad64a014f002156eb:
          after_revision: 25
          aggregate_digest: "sha256:5f598d475f5d96d36b2e68f16aa6da33852c79ecbae336a71c370b44fec6c943"
          before_revision: 24
          command_digest: "sha256:0a6d0ab43ec0fe611e0a8d283f10ba28efb115cac5836e8c4db398a4aa43f1ad"
          effect_ids: []
          event_digests:
            - "sha256:7980e19ab2aed846098212796471a969e88241632ef4d6010c45249f66152570"
          mutation_id: "validation-resolution:sha256:62941a4883b4f8d8ee18d8e0d3c8d6632ccf842defc3d03ad64a014f002156eb"
        validation-resolution:sha256:f33eadf003b667dbb018d2e9b0b98acfc723059dfefaaa3ea47ea359e99831b7:
          after_revision: 18
          aggregate_digest: "sha256:f27c4c0e3d05b5ccd725ceaea95948f764f1d5d10889512b2f4b61e56ab00b14"
          before_revision: 17
          command_digest: "sha256:3ef6fd5420e8e52e9b6d1b23b676641ad6979464e0c5b1eac00d36fc459ed498"
          effect_ids: []
          event_digests:
            - "sha256:f6b3a5c107ef0017af9a13739d8f4d60d27b1bebd7bcf54e1f8635004abbeaf3"
          mutation_id: "validation-resolution:sha256:f33eadf003b667dbb018d2e9b0b98acfc723059dfefaaa3ea47ea359e99831b7"
        validation:sha256:2814aa318d7008f90c52b336b5f4e2f88141b49e9824ffe0cb2fa433a4b74ce2:
          after_revision: 24
          aggregate_digest: "sha256:f245fb333f2d4ab0e114100aece1c63a638c48e071e521054c557297f3132281"
          before_revision: 23
          command_digest: "sha256:b42f7354739eaeb186ca00af4f156ad29e174890736c87eeb116c3836abaf97a"
          effect_ids: []
          event_digests:
            - "sha256:0f394714653a43bbaa97337d3f80a96a47833b236f566e5e04e666c72da95026"
          mutation_id: "validation:sha256:2814aa318d7008f90c52b336b5f4e2f88141b49e9824ffe0cb2fa433a4b74ce2"
        validation:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c:
          after_revision: 10
          aggregate_digest: "sha256:52f2fe76a20584a3f0374a3a5d2585f864c8eff276a9ab95047ec50612522d74"
          before_revision: 9
          command_digest: "sha256:2a509c362578776d040da3f4b4243883dce389f71f77902e0109da0469369f29"
          effect_ids: []
          event_digests:
            - "sha256:b8cd96dfb2c98d6bc748b91020d4517124cac74aa098dd4e401c08ac3c3d5c5a"
          mutation_id: "validation:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c"
        validation:sha256:a688b5dc90410bc2898570bcd848bff7a13ef57a672b105cf8de2bf4c933c41d:
          after_revision: 17
          aggregate_digest: "sha256:2e208ae8e541b854d52cb9c50534f6f28c0de0b039b0d3967fc58f2ba53f63e2"
          before_revision: 16
          command_digest: "sha256:8bef69ab559b4213a067f252b12005ef798686b0cf206b9140f46f9ba6fb6d55"
          effect_ids: []
          event_digests:
            - "sha256:42031afeb2873c3782592e0aa979ae7ff034e11fdc163af2b55a6d1d34251fd2"
          mutation_id: "validation:sha256:a688b5dc90410bc2898570bcd848bff7a13ef57a672b105cf8de2bf4c933c41d"
      plan_history: []
      revision: 27
      schema_version: 1
      state: "COMPLETED"
      work_items:
        observed-final-verification:
          attempt: 3
          claim_id: "sha256:3a2f9b55c52ff803e2d0b3276894ea9d46b93556746b7177a5f55b19d5b5cd37"
          definition:
            contract_digest: "sha256:8ebff7c7a9ef14498b5faec794fd0ebf255936c38eebc93e5b59db7ae77eacb8"
            depends_on: []
            execution_requirements:
              capabilities:
                - "repository_write"
                - "task.verify"
              external_effects: []
              repository_effects:
                - "repository_write"
                - "source_code"
                - "tests"
              resources: []
              scope_roots:
                - "packages/agentplane/src/commands/task"
            expected_outputs:
              - "observed-contract-ordering"
              - "dynamic-check-regression"
            id: "observed-final-verification"
            optional: false
            required_inputs: []
          output_manifests:
            -
              attempt: 3
              digest: "sha256:0089ba60036f940749e021a7f2926b80634143155c3fdbc1b913c866a405c243"
              id: "observed-contract-ordering"
              kind: "source"
              plan_revision: 1
              repository_fingerprint: "sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9"
              task_id: "202609242035-WTM9M7"
              work_item_id: "observed-final-verification"
            -
              attempt: 3
              digest: "sha256:ec8462482af1279868ed951717b0766fedbaa78ce7eef06dafce73d9f79dadf3"
              id: "dynamic-check-regression"
              kind: "test"
              plan_revision: 1
              repository_fingerprint: "sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9"
              task_id: "202609242035-WTM9M7"
              work_item_id: "observed-final-verification"
          result_digest: "sha256:586bd5ca44ca3d3c0eca174ec30ba17a55cac2316918284ff2202b82340c7a98"
          revision: 19
          state: "COMPLETED"
          validation:
            evidence_digests:
              - "sha256:74c5c109097b024c276c4e187b5cfc079e60f97fd6158fd2da098fe2c3ff6b8f"
              - "sha256:001d3b17d9f93e597733502345cad1467a57d1b89843446f0000c01958015e3f"
            identity:
              check_id: "canonical-contract-and-inspection"
              command_digest: "sha256:a1abc965101ff7095b2c2577d54ec663646c1fcc8216333eb09e612a3f9c3ee5"
              environment_digest: "sha256:4f62e3ea92f19a9d71d84fb5d8f5f5a94d2b55db288a82e01c01e060d0c35797"
              implementation_identity: "sha256:586bd5ca44ca3d3c0eca174ec30ba17a55cac2316918284ff2202b82340c7a98"
              toolchain_digest: "sha256:a0ee42b1cba7905d88b1510be74b48ec1d0ac21b6f282a81bfde91979f9179ad"
            observed_at: "2026-09-24T21:21:03.773Z"
            status: "PASSED"
    digest: "sha256:de9f18787d8aa113145328a3a945b1db1525167d633d577966e2c49c40194e48"
    documents:
      contracts:
        sha256:8ebff7c7a9ef14498b5faec794fd0ebf255936c38eebc93e5b59db7ae77eacb8:
          acceptance_criteria:
            - "Dynamically required check IDs are present in final validation evidence."
            - "The verification snapshot used for checks is reused for projection."
            - "Canonical Plan commands remain the only executed final commands."
            - "Regression coverage proves docs_contract enrichment cannot outrun evidence construction."
          objective: "Resolve observed verification requirements before canonical final checks and reuse the same verification snapshot for projection."
          role: "EXECUTOR"
          verification_commands:
            - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts"
            - "bun run typecheck"
            - "bun run ci:local:fast"
      intent:
        context: "Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record."
        objective: "Bind canonical final verification to the observed verification contract"
    events:
      -
        command_digest: "sha256:355f80998e8fade91cfc4aaa42408e9ce3985988b5f571582d8d9f5a89bb1bf9"
        id: "capture:202609242035-WTM9M7:intent_captured"
        kind: "intent_captured"
        mutation_id: "capture:202609242035-WTM9M7"
        occurred_at: "2026-09-24T20:35:26.701Z"
        payload_digest: "sha256:dd4b9a1b01bc6ba26cb38ee8708732b4697168f9f1efd11ab69e8c59d1d7e5e5"
        task_id: "202609242035-WTM9M7"
        task_revision: 1
      -
        command_digest: "sha256:a71d0559c411225193056282fb3bdf84efdbbcf2f26b14634f3dfa490219c26c"
        id: "result:sha256:8647f3ee0d28559c18c3b866ae2df8f65ece40e6117d85e6170b663ba85cdee4:plan_proposed"
        kind: "plan_proposed"
        mutation_id: "result:sha256:8647f3ee0d28559c18c3b866ae2df8f65ece40e6117d85e6170b663ba85cdee4"
        occurred_at: "2026-09-24T20:36:13.230Z"
        payload_digest: "sha256:eb072bc87a56778129f2249262798ac4529cbb4dc23135c33a7bf51f80d80ac9"
        task_id: "202609242035-WTM9M7"
        task_revision: 2
      -
        command_digest: "sha256:80f050281a3776d983b710abdb79da93ef496a97c3d30dd4369a03ef1bc6e579"
        id: "sha256:0ea921a15357185be5dba34c6d17b37e61beb24543aaad6a39f68d7ff2818f97:plan_approved"
        kind: "plan_approved"
        mutation_id: "sha256:0ea921a15357185be5dba34c6d17b37e61beb24543aaad6a39f68d7ff2818f97"
        occurred_at: "2026-09-24T20:36:20.603Z"
        payload_digest: "sha256:8b894fd1d9eede9fa4fff43cf8cf98a83ed8217946a44dad0bb15931ffd5d322"
        task_id: "202609242035-WTM9M7"
        task_revision: 3
      -
        command_digest: "sha256:750ecb51e720cf84711c1a9eea60801a3e4ae4e5c03f11e82b026d982ccb8a8b"
        id: "kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:work_items_materialized"
        kind: "work_items_materialized"
        mutation_id: "kernel_work_item_materialization_required:sha256:bd4ea106d703fd320cc824600b63e9d713ef5c742d0be4a9a7a93751b3524739:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        occurred_at: "2026-09-24T20:36:28.244Z"
        payload_digest: "sha256:65712c2a1da8380d008f22d3ef7a3bcd55819e440c88d04b41b962e540b4341f"
        task_id: "202609242035-WTM9M7"
        task_revision: 4
      -
        command_digest: "sha256:404871be7346551dfd753db631f36981f1fda16d170a496c2725beb8096b5de4"
        id: "kernel_work_item_claim_required:sha256:967ca92ed86eff13c3b740ea4c49a4c4547d3d34e9e53397caa36ed6627f4830:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_claim_required:sha256:967ca92ed86eff13c3b740ea4c49a4c4547d3d34e9e53397caa36ed6627f4830:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        occurred_at: "2026-09-24T20:36:38.404Z"
        payload_digest: "sha256:bc18f549bd285e143a017087b2bb0a7ed067d6adc7d081a7e0aaa4082dfc205d"
        task_id: "202609242035-WTM9M7"
        task_revision: 5
      -
        command_digest: "sha256:97da9e4bed674b92a089efb5e5fbb7e74a97ce9bfaa6abde98128a9efa93bd7f"
        id: "kernel_work_item_execution_required:sha256:2bc7abc409edd3ca447b4699a29d705fcd4e13d1cd7f714971ba95452282d0dc:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:2bc7abc409edd3ca447b4699a29d705fcd4e13d1cd7f714971ba95452282d0dc:sha256:961d22ae5b65d406916f4b015654c3722947e4febb228ecccb946378a3d042c5"
        occurred_at: "2026-09-24T20:37:07.461Z"
        payload_digest: "sha256:132bb5e03b9f4837e802aa9da83aa6998677794bad2eb82007248a052e674692"
        task_id: "202609242035-WTM9M7"
        task_revision: 6
      -
        command_digest: "sha256:02b52dc58009ac8c642a9b1ad36f8fa0e94d5e6a8b71bdabaf8f1b19a5369fea"
        id: "sha256:e80f6a6dc354bd6ebc193d600158fcec794afe9587f96c8312d54bb014159102:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:e80f6a6dc354bd6ebc193d600158fcec794afe9587f96c8312d54bb014159102"
        occurred_at: "2026-09-24T20:39:45.098Z"
        payload_digest: "sha256:c97e0b7c28b597183c806dd3531d44e9e175cf1adbd5b10e93bc8f226ad56d16"
        task_id: "202609242035-WTM9M7"
        task_revision: 7
      -
        command_digest: "sha256:f9a4f664e0dd0d4f16b4965f6095ce83c0cc1efff5fd267393bf3cd1d699eea9"
        id: "result:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c"
        occurred_at: "2026-09-24T20:39:52.754Z"
        payload_digest: "sha256:4c26a445bef46f8f221664c4f97ee6127afd08fc580d40a050e7abd9ccc1d245"
        task_id: "202609242035-WTM9M7"
        task_revision: 8
      -
        command_digest: "sha256:c4c78bf43fccf2bf8c66f91eae46b45ad1cf802f348714cbe912ced71e8ca86a"
        id: "kernel_work_item_inspection_required:sha256:3b31e9a036a3f5de3bfb179d5aa8ad7fe227f7a91759b70285e19bc09bb25e01:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:3b31e9a036a3f5de3bfb179d5aa8ad7fe227f7a91759b70285e19bc09bb25e01:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        occurred_at: "2026-09-24T20:39:58.749Z"
        payload_digest: "sha256:59d31e7a530016d47e26d59ed832348e670cdbe3df0d93543d52eecd6bbec917"
        task_id: "202609242035-WTM9M7"
        task_revision: 9
      -
        command_digest: "sha256:2a509c362578776d040da3f4b4243883dce389f71f77902e0109da0469369f29"
        id: "validation:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:75553864ec3d6bb56a960448141622fb2bd01d5399c08b0fbf965d5c40d3f19c"
        occurred_at: "2026-09-24T20:52:42.396Z"
        payload_digest: "sha256:e6db219cb18f877993172d24a5574a76f60763c83bcec2ed327be5afbd1d1262"
        task_id: "202609242035-WTM9M7"
        task_revision: 10
      -
        command_digest: "sha256:96d6b4ee2946ebea6df4185481e8bef4011f4b62f86244caf12f9e4f94b744a4"
        id: "validation-resolution:sha256:0e75d467f67741df1297086d281921b811d8517180108a1cd68c683c5bf8de71:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:0e75d467f67741df1297086d281921b811d8517180108a1cd68c683c5bf8de71"
        occurred_at: "2026-09-24T20:52:45.932Z"
        payload_digest: "sha256:93f873b9d59c2f84a775335c1e6ddaded56a75244f1d33960e8b54cd1eefa169"
        task_id: "202609242035-WTM9M7"
        task_revision: 11
      -
        command_digest: "sha256:0f87cfedfeab7ee6705f3277511da77f7aa4b6d91199d27e458396d8e05c7aa4"
        id: "kernel_work_item_rework_claim_required:sha256:3b2d1b0eaa79d882fa4267c547d1a9c7176829063d37a742f775fa78e6b3fda8:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:3b2d1b0eaa79d882fa4267c547d1a9c7176829063d37a742f775fa78e6b3fda8:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        occurred_at: "2026-09-24T20:52:53.323Z"
        payload_digest: "sha256:b83c4c946cac7783bed014ea352f67089dcfd09b95fed414ae40f161efb9c63d"
        task_id: "202609242035-WTM9M7"
        task_revision: 12
      -
        command_digest: "sha256:b72c5d1a902b68ede43d7bda36f83409b88bfade301cce49513202658292ccdd"
        id: "kernel_work_item_execution_required:sha256:bf3ebc0ac5d4a2b63523f437e3511ca11475033731f716665eae3577a0c52267:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:bf3ebc0ac5d4a2b63523f437e3511ca11475033731f716665eae3577a0c52267:sha256:8d7f593c4a2d624963962f1aa69a739742b3f061a88f77a35e5a57c9986990cc"
        occurred_at: "2026-09-24T20:52:57.976Z"
        payload_digest: "sha256:c99093fdb97ef2eb5de5b2df7e2a077423371426056b882cd2eac763ce27eb04"
        task_id: "202609242035-WTM9M7"
        task_revision: 13
      -
        command_digest: "sha256:83569122f3cc54bad36d45f12f5c757111f5bf7515173ca98b8a3acac5a4fbf9"
        id: "sha256:faf8ed6fcb23d7538c1f46a4340badf83f5aa4eb811be9a3c9abdd4a94848cf9:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:faf8ed6fcb23d7538c1f46a4340badf83f5aa4eb811be9a3c9abdd4a94848cf9"
        occurred_at: "2026-09-24T20:57:43.814Z"
        payload_digest: "sha256:91d31435977dccde4e061711edafb9c99bc82cc29cc18915cc534a1da75c016b"
        task_id: "202609242035-WTM9M7"
        task_revision: 14
      -
        command_digest: "sha256:11512253405a5c04a002e0eb40e44f216c88025aab580c86018d77631b502d82"
        id: "result:sha256:a688b5dc90410bc2898570bcd848bff7a13ef57a672b105cf8de2bf4c933c41d:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:a688b5dc90410bc2898570bcd848bff7a13ef57a672b105cf8de2bf4c933c41d"
        occurred_at: "2026-09-24T20:57:49.775Z"
        payload_digest: "sha256:bb6f7c7d0e0821d49870e4a187a0e75c80a7cc51929fc279720ee5b1ed8b6cb8"
        task_id: "202609242035-WTM9M7"
        task_revision: 15
      -
        command_digest: "sha256:d91f5fc7e7191c418644f6be01be2bec917e89c6f1f2bbf81b4b69c9c56233ec"
        id: "kernel_work_item_inspection_required:sha256:5d365f65e856abb598c817f313bb02113200361d229188a5146c3d9444793b5e:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:5d365f65e856abb598c817f313bb02113200361d229188a5146c3d9444793b5e:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183"
        occurred_at: "2026-09-24T20:57:53.687Z"
        payload_digest: "sha256:c09c4ccf9770a2dae8a04f41f869d24cab69bce332f64ee9cebd37860cf4ca38"
        task_id: "202609242035-WTM9M7"
        task_revision: 16
      -
        command_digest: "sha256:8bef69ab559b4213a067f252b12005ef798686b0cf206b9140f46f9ba6fb6d55"
        id: "validation:sha256:a688b5dc90410bc2898570bcd848bff7a13ef57a672b105cf8de2bf4c933c41d:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:a688b5dc90410bc2898570bcd848bff7a13ef57a672b105cf8de2bf4c933c41d"
        occurred_at: "2026-09-24T21:09:31.839Z"
        payload_digest: "sha256:24fff27514128fda604bbcb0137c580d28fc08de41fa136d369641f1080c9a8b"
        task_id: "202609242035-WTM9M7"
        task_revision: 17
      -
        command_digest: "sha256:3ef6fd5420e8e52e9b6d1b23b676641ad6979464e0c5b1eac00d36fc459ed498"
        id: "validation-resolution:sha256:f33eadf003b667dbb018d2e9b0b98acfc723059dfefaaa3ea47ea359e99831b7:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:f33eadf003b667dbb018d2e9b0b98acfc723059dfefaaa3ea47ea359e99831b7"
        occurred_at: "2026-09-24T21:09:34.740Z"
        payload_digest: "sha256:d3fdc2edbf64a9ef31cb0104aa624afc3b05ded85017b93eaa4a5dbc0d22049a"
        task_id: "202609242035-WTM9M7"
        task_revision: 18
      -
        command_digest: "sha256:b43e6f5a5943f58cc5f5866cecc83ae5b885a172e34cf7feaf7c732139d3022f"
        id: "kernel_work_item_rework_claim_required:sha256:ac490a5056cb220c6dd1bc8a69d6d195cb4f1e3ccd9de02c99a00e2d4b1e2c35:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_rework_claim_required:sha256:ac490a5056cb220c6dd1bc8a69d6d195cb4f1e3ccd9de02c99a00e2d4b1e2c35:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183"
        occurred_at: "2026-09-24T21:09:39.857Z"
        payload_digest: "sha256:2744e3ace0764949033fe57df4d310c43e416a288951c6d482a1900ea2202109"
        task_id: "202609242035-WTM9M7"
        task_revision: 19
      -
        command_digest: "sha256:be7d3062a5aada94d68b71cff5413615e3467f3c55e3299525e893c265cf36ca"
        id: "kernel_work_item_execution_required:sha256:7557b5f9a4553fedcaebe8b41007f5f09d389a896e5d9ed9634afe3aff2dcbb7:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_execution_required:sha256:7557b5f9a4553fedcaebe8b41007f5f09d389a896e5d9ed9634afe3aff2dcbb7:sha256:7cddefba7f31f5185e99b2c897a9ce2cf5ca99a3ff6e74af2059588664a99183"
        occurred_at: "2026-09-24T21:09:43.426Z"
        payload_digest: "sha256:6be4eb1581bb948f5369ee31ba2b1c82cad0a47f7ed303ae87f9c56df308dba5"
        task_id: "202609242035-WTM9M7"
        task_revision: 20
      -
        command_digest: "sha256:ae796c968d1c33f256538a1884b80a57a79bfef3a77946bc248a40de312d836e"
        id: "sha256:6fd69ace10792d53331f34dba3ca98a83bdacf32935a49a39ade4510430452d0:authority_continued"
        kind: "authority_continued"
        mutation_id: "sha256:6fd69ace10792d53331f34dba3ca98a83bdacf32935a49a39ade4510430452d0"
        occurred_at: "2026-09-24T21:12:38.812Z"
        payload_digest: "sha256:69dc0f4c08a537c2ac464283b4eadc2dbf095e184bb3517220c6ad77169ab37f"
        task_id: "202609242035-WTM9M7"
        task_revision: 21
      -
        command_digest: "sha256:062713b66aace1c461520c2db131181bbc14ac68ba2f47776e28a679434444ad"
        id: "result:sha256:7c5ea1e14b9aa8d0d39780ebec1ab75f9b80213aa24ac38d4f22f4193b8b780b:work_item_result_accepted"
        kind: "work_item_result_accepted"
        mutation_id: "result:sha256:7c5ea1e14b9aa8d0d39780ebec1ab75f9b80213aa24ac38d4f22f4193b8b780b"
        occurred_at: "2026-09-24T21:12:43.148Z"
        payload_digest: "sha256:0909349b0439b554db4b4450982b8c538fcc513bb5154268100b33efa83f8996"
        task_id: "202609242035-WTM9M7"
        task_revision: 22
      -
        command_digest: "sha256:a3f092f753a50b6e4379b14a3153f3acac169dfa213687783885af03aa62bc04"
        id: "kernel_work_item_inspection_required:sha256:01ed770cc4022e2f91956631d99a2464f5f690c9755d51bc8777f26fad21b5a8:sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "kernel_work_item_inspection_required:sha256:01ed770cc4022e2f91956631d99a2464f5f690c9755d51bc8777f26fad21b5a8:sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9"
        occurred_at: "2026-09-24T21:12:46.446Z"
        payload_digest: "sha256:cef1e95dbfd67cac8cd925768badce5ee5e942662a72361f0aa8ef2d416e79f6"
        task_id: "202609242035-WTM9M7"
        task_revision: 23
      -
        command_digest: "sha256:b42f7354739eaeb186ca00af4f156ad29e174890736c87eeb116c3836abaf97a"
        id: "validation:sha256:2814aa318d7008f90c52b336b5f4e2f88141b49e9824ffe0cb2fa433a4b74ce2:work_item_validation_recorded"
        kind: "work_item_validation_recorded"
        mutation_id: "validation:sha256:2814aa318d7008f90c52b336b5f4e2f88141b49e9824ffe0cb2fa433a4b74ce2"
        occurred_at: "2026-09-24T21:21:07.568Z"
        payload_digest: "sha256:4878ab2391d59246cd05275fa5f1dec131ae6cd0229e806e9863b1686acfa772"
        task_id: "202609242035-WTM9M7"
        task_revision: 24
      -
        command_digest: "sha256:0a6d0ab43ec0fe611e0a8d283f10ba28efb115cac5836e8c4db398a4aa43f1ad"
        id: "validation-resolution:sha256:62941a4883b4f8d8ee18d8e0d3c8d6632ccf842defc3d03ad64a014f002156eb:work_item_transitioned"
        kind: "work_item_transitioned"
        mutation_id: "validation-resolution:sha256:62941a4883b4f8d8ee18d8e0d3c8d6632ccf842defc3d03ad64a014f002156eb"
        occurred_at: "2026-09-24T21:21:10.042Z"
        payload_digest: "sha256:6f7fa4a9665ce45767c85b4efd855646bf5c972b9e91436a9268ab0e1e87d948"
        task_id: "202609242035-WTM9M7"
        task_revision: 25
      -
        command_digest: "sha256:9b571daa64dba7f78bcaef849d3a27a0e55d72b9c5487cedbd179dbf771dc6dc"
        id: "final-validation:sha256:065619b6307bac0135473498937455e4357c58bdd8f9225ca7d04c490f4e80c1:25:final_validation_recorded"
        kind: "final_validation_recorded"
        mutation_id: "final-validation:sha256:065619b6307bac0135473498937455e4357c58bdd8f9225ca7d04c490f4e80c1:25"
        occurred_at: "2026-09-24T21:29:02.543Z"
        payload_digest: "sha256:167c2d467e6693d8efdcbc5039a158d30fd13910fb6c02524c600bbe96131e9e"
        task_id: "202609242035-WTM9M7"
        task_revision: 26
      -
        command_digest: "sha256:6252a11d78cdea9d657266ea3ad8cb7f50f709fe7b5674f33a868db5cc98bf99"
        id: "kernel_task_completion_required:sha256:9a73fe39739712374bdcbceb5d6b04fea560735a074f3afa21d39a813fc400ae:sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9:task_completed"
        kind: "task_completed"
        mutation_id: "kernel_task_completion_required:sha256:9a73fe39739712374bdcbceb5d6b04fea560735a074f3afa21d39a813fc400ae:sha256:70072f609f30c9683b9e0794b2cbce8cddfd0c7502ca3ac25eeb59f6cb06bae9"
        occurred_at: "2026-09-24T21:29:20.643Z"
        payload_digest: "sha256:d08012178a7192b443a635e5fae8cdb3dbd6ec3c73f202ec4ef33edaa7d6189a"
        task_id: "202609242035-WTM9M7"
        task_revision: 27
    kind: "canonical_task"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
id_source: "generated"
---
## Summary

Bind canonical final verification to the observed verification contract

Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.

## Scope

- In scope: Resolve the implementation verification task and observed contract before canonical final checks so dynamically required checks such as docs_contract are present in recorded evidence. Reuse the same snapshot for projection after the canonical validation record.
- Out of scope: unrelated refactors not required for "Bind canonical final verification to the observed verification contract".

## Plan

PLANNER semantic plan required. Replace this placeholder with a task-specific implementation plan before approval.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run ci:local:fast`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-24T21:29:08.206Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: canonical Task Kernel final checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:237f864619f68fc204a6f1a3a1415dc5eb528250c14acd21ad3a9fa4e1f6b4eb, input_digest=sha256:1bd70f60fd447df459335dc3bdb8c2dfd8bd5deaa5a01e1e4d4414b942636024

Details:

Check: affected_unit_integration
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts
Result: pass
Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-1
Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-2
Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:fast
Result: pass
Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-3
Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts
Result: pass
Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-1
Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-2
Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:fast
Result: pass
Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-3
Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check critical_paths (3/3)

Check: task_outcome
Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/kernel-final-validation.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts
Result: pass
Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-1
Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-2
Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:fast
Result: pass
Evidence: /Users/densmirnov/.codex/worktrees/pre-0712-clean/agentplane/.git/agentplane/kernel/exchanges/202609242035-WTM9M7/60f7aa4a1c530a1156f45f7c9fd2d0c057c5d797da3aa499e90b633b26bd3d47/final-validation.json#check-3
Scope: branch_pr task 202609242035-WTM9M7 Verification Contract check task_outcome (3/3)

NativeTaskIdentityRef:
- plan_digest: sha256:e5a3c98928ef440267afcc022ebbb5a9f37762c1b513b2935baddc513c6b6082
- policy_digest: sha256:1150ba6caefe9e829c30b3520b9246ed1ec7ebbeedbe788c63cf7989015dbb46
- capability_digest: sha256:f2f93935a83dceb80a450ec264e504489c4c1c9b33e401664f08190ae0c1aa23
- checks_digest: sha256:5c219b4f3373e9bee1d5ed2c43412e3cb6b40c765642746f92a7b396eea1b7ef
- identity_digest: sha256:f2fd14d0683a5181ad805228cec1e3c2b71cddf75ae61f614e16e502b91b90ba

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609242035-WTM9M7
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

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:f8da4263c97535e973ec64b4b65da79177795670801bc3cc4a6207c3705a7b61`
- Unavailable reason: `no_supervised_agent_runs`
- Updated at: `2026-09-24T21:31:13.516Z`
