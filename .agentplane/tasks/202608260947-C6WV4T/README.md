---
id: "202608260947-C6WV4T"
title: "Restore packaged mixed-scope lifecycle qualification on the exact release candidate"
status: "BLOCKED"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "release-blocker"
  - "v0.7.8"
  - "qualification"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run scripts/qualification/release-qualification.test.mjs"
  - "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-26T09:53:26.191Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:c2176a35384697c023f1a02c0dd2f9fd9245b84142e84bcf66902291779801f9"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "scripts/qualification"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Hosted PR publication and integration require provider read/write effects but no release publication effect."
      - "The permanent fix is confined to the packaged qualification fixture and its contract tests."
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "scripts/qualification"
  observed:
    authority_violations:
      - "verification:recorded-check-2:fail"
    changed_components:
      - "scripts"
    changed_paths:
      - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
      - "scripts/qualification/release-qualification.test.mjs"
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
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "scripts/qualification"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:6ea53e71586460757dcb3ccd395ffa0885530d4e14f0f78a9d6c7313051134cb"
      escalation_reasons:
        - "effect_ci"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "scripts"
        changed_files:
          - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
          - "scripts/qualification/release-qualification.test.mjs"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:ci"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:recorded-check-2"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7e2c47bc1fd2. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 7e2c47bc1fd2. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The implementation is complete and passes the exact packaged lifecycle and full regression, but the approved TaskPlan still contains a validation command that cannot select this node:test file. Recommended action: Use the normal AgentPlane operator/replan transition to apply the already-recorded command-only amendment, preserve implementation commit 7e2c47bc1fd246e059c55b1bbc8700cc1e99a7cf, and then resume supervisor validation with PATH including /Users/densmirnov/.bun/bin. Agentplane receipt: external-agent-blocker/tr_a7ac8e89254c1bd0e7ac733360bc346d/sha256:358aa9e0a586c133a8aab4d1bb6f8758ba721707e404e1262a4f4e8efe58a3b1."
events:
  -
    type: "status"
    at: "2026-08-26T09:54:09.594Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-26T10:12:02.477Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7e2c47bc1fd2. CLI accepted one state-bound external-agent semantic result."
    commit: "7e2c47bc1fd246e059c55b1bbc8700cc1e99a7cf"
  -
    type: "verify"
    at: "2026-08-26T10:12:02.781Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-26T10:13:45.233Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 7e2c47bc1fd2. CLI accepted one state-bound external-agent semantic result."
    commit: "7e2c47bc1fd246e059c55b1bbc8700cc1e99a7cf"
  -
    type: "verify"
    at: "2026-08-26T10:20:51.415Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bunx vitest run scripts/qualification/release-qualification.test.mjs"
  -
    type: "status"
    at: "2026-08-26T10:22:05.641Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The implementation is complete and passes the exact packaged lifecycle and full regression, but the approved TaskPlan still contains a validation command that cannot select this node:test file. Recommended action: Use the normal AgentPlane operator/replan transition to apply the already-recorded command-only amendment, preserve implementation commit 7e2c47bc1fd246e059c55b1bbc8700cc1e99a7cf, and then resume supervisor validation with PATH including /Users/densmirnov/.bun/bin. Agentplane receipt: external-agent-blocker/tr_a7ac8e89254c1bd0e7ac733360bc346d/sha256:358aa9e0a586c133a8aab4d1bb6f8758ba721707e404e1262a4f4e8efe58a3b1."
doc_version: 3
doc_updated_at: "2026-08-26T10:22:05.641Z"
doc_updated_by: "SUPERVISOR"
description: "Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: required hosted verify-real-e2e fails reproducibly on clean exact heads c59dad6936fea2b664973d12cfe6ec96d2bc89f5 and 69a4f33f94fbcd46d83d4eb5f40b6654e041dd68 with missing_evaluator_episode: expected EVALUATOR, received EXECUTOR. Violated invariant: packaged-mixed-scope-lifecycle must supply every deterministic verification capability required by its selected code.direct blueprint before expecting evaluator handoff. Root cause: the fixture verification record reports needs_rework because full_regression is required while fixture package.json does not define ci:local:full; all declared commands themselves pass, so AgentPlane correctly returns implementation rework. Temporary recovery: preserve one isolated fixture and read its public verification record; no state edits. Permanent fix: minimally update the qualification fixture to provide a bounded full-regression command consistent with its declared Node test, retain the public lifecycle assertion, and add/adjust regression coverage so a verification rework cannot be misclassified as missing evaluator. Do not weaken hosted gates or production lifecycle invariants. Verify the direct packaged scenario, qualification contract tests, and full local CI. Integrate normally, then refresh 202608252330-9RCWZQ from current main and rerun exact-head hosted qualification."
sections:
  Summary: |-
    Restore packaged mixed-scope lifecycle qualification on the exact release candidate

    Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: required hosted verify-real-e2e fails reproducibly on clean exact heads c59dad6936fea2b664973d12cfe6ec96d2bc89f5 and 69a4f33f94fbcd46d83d4eb5f40b6654e041dd68 with missing_evaluator_episode: expected EVALUATOR, received EXECUTOR. Violated invariant: packaged-mixed-scope-lifecycle must supply every deterministic verification capability required by its selected code.direct blueprint before expecting evaluator handoff. Root cause: the fixture verification record reports needs_rework because full_regression is required while fixture package.json does not define ci:local:full; all declared commands themselves pass, so AgentPlane correctly returns implementation rework. Temporary recovery: preserve one isolated fixture and read its public verification record; no state edits. Permanent fix: minimally update the qualification fixture to provide a bounded full-regression command consistent with its declared Node test, retain the public lifecycle assertion, and add/adjust regression coverage so a verification rework cannot be misclassified as missing evaluator. Do not weaken hosted gates or production lifecycle invariants. Verify the direct packaged scenario, qualification contract tests, and full local CI. Integrate normally, then refresh 202608252330-9RCWZQ from current main and rerun exact-head hosted qualification.
  Scope: |-
    - In scope: Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: required hosted verify-real-e2e fails reproducibly on clean exact heads c59dad6936fea2b664973d12cfe6ec96d2bc89f5 and 69a4f33f94fbcd46d83d4eb5f40b6654e041dd68 with missing_evaluator_episode: expected EVALUATOR, received EXECUTOR. Violated invariant: packaged-mixed-scope-lifecycle must supply every deterministic verification capability required by its selected code.direct blueprint before expecting evaluator handoff. Root cause: the fixture verification record reports needs_rework because full_regression is required while fixture package.json does not define ci:local:full; all declared commands themselves pass, so AgentPlane correctly returns implementation rework. Temporary recovery: preserve one isolated fixture and read its public verification record; no state edits. Permanent fix: minimally update the qualification fixture to provide a bounded full-regression command consistent with its declared Node test, retain the public lifecycle assertion, and add/adjust regression coverage so a verification rework cannot be misclassified as missing evaluator. Do not weaken hosted gates or production lifecycle invariants. Verify the direct packaged scenario, qualification contract tests, and full local CI. Integrate normally, then refresh 202608252330-9RCWZQ from current main and rerun exact-head hosted qualification.
    - Out of scope: unrelated refactors not required for "Restore packaged mixed-scope lifecycle qualification on the exact release candidate".
  Plan: "Add the smallest fixture-only full-regression capability required by the selected code.direct blueprint, retain fail-closed evaluator handoff assertions, and prove the installed packaged lifecycle plus qualification contract and full repository regression on the exact implementation."
  Verify Steps: |-
    PLANNER fallback scaffold for "Restore packaged mixed-scope lifecycle qualification on the exact release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Restore packaged mixed-scope lifecycle qualification on the exact release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-26T10:12:02.781Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f1c7611e3fc6744f91ca189752b78afddc6326d9f282a05be030b60d07fd7936, input_digest=sha256:5603c1168da0c650d7f6ef4ff936240ef291f9f4276b5f94d138e620433e647d

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608260947-C6WV4T declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608260947-C6WV4T-restore-packaged-mixed-scope-lifecycle-qualifica/.agentplane/tasks/202608260947-C6WV4T/blueprint/resolved-snapshot.json
    - old_digest: eeca0f8e62cbecd222eec0659bf8f7b087806f1348178c9fe0d673e4a47b8695
    - current_digest: eeca0f8e62cbecd222eec0659bf8f7b087806f1348178c9fe0d673e4a47b8695
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608260947-C6WV4T

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

    ### 2026-08-26T10:20:51.415Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bunx vitest run scripts/qualification/release-qualification.test.mjs
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f1c7611e3fc6744f91ca189752b78afddc6326d9f282a05be030b60d07fd7936, input_digest=sha256:9f508624adef190354e5b29eb71ce9d6b4d61bea02d288265f0cec60f68a5304

    Details:

    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608260947-C6WV4T declared verification

    Command: bunx vitest run scripts/qualification/release-qualification.test.mjs
    Result: fail
    Evidence: .agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608260947-C6WV4T declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608260947-C6WV4T-restore-packaged-mixed-scope-lifecycle-qualifica/.agentplane/tasks/202608260947-C6WV4T/blueprint/resolved-snapshot.json
    - old_digest: eeca0f8e62cbecd222eec0659bf8f7b087806f1348178c9fe0d673e4a47b8695
    - current_digest: eeca0f8e62cbecd222eec0659bf8f7b087806f1348178c9fe0d673e4a47b8695
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608260947-C6WV4T

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
  agentplane.execution_grant:
    actor: "HOST:codex:USER"
    approval_evidence_digest: "sha256:c2176a35384697c023f1a02c0dd2f9fd9245b84142e84bcf66902291779801f9"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:38d7a02f1426e5e11d97cd5b8fcd217f8ec340c1c7c899de401805cd41d25f49"
    digest: "sha256:a8c990154bf22cb971916fd4b4f3770bb1974b5c62414267889d9b37ac854948"
    grant_id: "fc21e715-495a-47d4-bc33-e62a1c617c7c"
    issued_at: "2026-08-26T09:53:26.191Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:41f8bb24cb98879439854fc0d426f8284bdb83662bf1b72ce6f3ae20edcb3fcd"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:922aafbc3665387b677cf22e849c43804c0367f9b710439f234f9bb1e4993c4f"
    status: "active"
    task_id: "202608260947-C6WV4T"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-26T09:53:26.191Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:232817c2eb17d233463bb069aaed73259dc1196935c988e8f3427d66fc5a8165"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-26T09:49:37.238Z"
      digest: "sha256:232817c2eb17d233463bb069aaed73259dc1196935c988e8f3427d66fc5a8165"
      proposal:
        assumptions:
          - "A fixture-local ci:local:full alias to its deterministic Node test is sufficient to satisfy the blueprint without weakening production verification."
        planning_baseline:
          captured_at: "2026-08-26T09:47:18.962Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:ef7ecbe836b71a18bdc4adb252324972c0628cdc204ee75fce5676801c407e31"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608241434-129F8R/README.md"
            - ".agentplane/tasks/202608241434-EH8E74/README.md"
            - ".agentplane/tasks/202608241434-KCC9K4/README.md"
            - ".agentplane/tasks/202608241434-QQNDGT/README.md"
            - ".agentplane/tasks/202608241434-SFPD91/README.md"
            - ".agentplane/tasks/202608241434-TA84WK/README.md"
            - ".agentplane/tasks/202608241434-WVYA5T/README.md"
            - ".agentplane/tasks/202608241435-40YZCE/README.md"
            - ".agentplane/tasks/202608241435-73DA89/README.md"
            - ".agentplane/tasks/202608241435-D001ET/README.md"
            - ".agentplane/tasks/202608241435-HTV4K2/README.md"
            - ".agentplane/tasks/202608241435-NDR0BX/README.md"
            - ".agentplane/tasks/202608241435-RJXGHQ/README.md"
            - ".agentplane/tasks/202608241435-W3DG6V/README.md"
            - ".agentplane/tasks/202608241435-YSW0E0/README.md"
            - ".agentplane/tasks/202608241436-2G9DA8/README.md"
            - ".agentplane/tasks/202608241436-63W678/README.md"
            - ".agentplane/tasks/202608241436-8PJKJP/README.md"
            - ".agentplane/tasks/202608241436-99B067/README.md"
            - ".agentplane/tasks/202608241436-A87Y59/README.md"
            - ".agentplane/tasks/202608241436-DHPR5E/README.md"
            - ".agentplane/tasks/202608241436-H60MCY/README.md"
            - ".agentplane/tasks/202608241436-TX6TRF/README.md"
            - ".agentplane/tasks/202608241436-W6A113/README.md"
            - ".agentplane/tasks/202608241437-5YZ0N8/README.md"
            - ".agentplane/tasks/202608241437-H5418M/README.md"
            - ".agentplane/tasks/202608241437-SH3CDX/README.md"
            - ".agentplane/tasks/202608241437-V8BA7Q/README.md"
            - ".agentplane/tasks/202608241437-XY3950/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/README.md"
            - ".agentplane/tasks/202608250007-P5BWP0/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608251038-42AC0D/README.md"
            - ".agentplane/tasks/202608251053-QAZ236/README.md"
            - ".agentplane/tasks/202608251706-V287W1/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608260947-C6WV4T/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608260947-C6WV4T"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              id: "check-packaged"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bunx vitest run scripts/qualification/release-qualification.test.mjs"
              id: "check-contract"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-packaged"
              description: "The installed mixed-scope fixture supplies the required full-regression capability and reaches an EVALUATOR episode without weakening lifecycle checks."
              id: "criterion-fixture"
              required: true
            -
              check_ids:
                - "check-contract"
              description: "Qualification contract tests preserve the blocking mixed-scope lifecycle and classify verification rework explicitly."
              id: "criterion-contract"
              required: true
            -
              check_ids:
                - "check-full"
              description: "The exact implementation passes the repository full regression suite."
              id: "criterion-regression"
              required: true
          evidence_fingerprint: "sha256:2f2daa5975870018452c7822cc0cea2419797d047c176a437086f445cf0e16af"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-packaged"
                  description: "The installed mixed-scope fixture supplies the required full-regression capability and reaches an EVALUATOR episode without weakening lifecycle checks."
                  id: "criterion-fixture"
                  required: true
                -
                  check_ids:
                    - "check-contract"
                  description: "Qualification contract tests preserve the blocking mixed-scope lifecycle and classify verification rework explicitly."
                  id: "criterion-contract"
                  required: true
                -
                  check_ids:
                    - "check-full"
                  description: "The exact implementation passes the repository full regression suite."
                  id: "criterion-regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 32768
                optional_sources: []
                required_sources:
                  - "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                  - "scripts/qualification/release-qualification.test.mjs"
                  - "scripts/qualification/v0.7.1-release-qualification.json"
                symbol_hints:
                  - "buildFixture"
                  - "runFixture"
                  - "packaged-mixed-scope-lifecycle"
              depends_on: []
              expected_outputs:
                - "packaged-mixed-scope-qualification-fix"
              id: "restore-packaged-mixed-scope-qualification"
              objective: "Provide the fixture full-regression capability required by its blueprint and retain exact public lifecycle qualification."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification/release-qualification.test.mjs"
              risk: "low"
              scope_roots:
                - "scripts/qualification"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
                    id: "check-packaged"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bunx vitest run scripts/qualification/release-qualification.test.mjs"
                    id: "check-contract"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-packaged"
                    description: "The installed mixed-scope fixture supplies the required full-regression capability and reaches an EVALUATOR episode without weakening lifecycle checks."
                    id: "criterion-fixture"
                    required: true
                  -
                    check_ids:
                      - "check-contract"
                    description: "Qualification contract tests preserve the blocking mixed-scope lifecycle and classify verification rework explicitly."
                    id: "criterion-contract"
                    required: true
                  -
                    check_ids:
                      - "check-full"
                    description: "The exact implementation passes the repository full regression suite."
                    id: "criterion-regression"
                    required: true
                evidence_fingerprint: "sha256:2f2daa5975870018452c7822cc0cea2419797d047c176a437086f445cf0e16af"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608260947-C6WV4T"
    event_cursor: 1
    final_validation: null
    id: "202608260947-C6WV4T"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest run scripts/qualification/release-qualification.test.mjs"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-26T09:47:09.704Z"
      constraints: []
      request: |-
        Restore packaged mixed-scope lifecycle qualification on the exact release candidate

        Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: required hosted verify-real-e2e fails reproducibly on clean exact heads c59dad6936fea2b664973d12cfe6ec96d2bc89f5 and 69a4f33f94fbcd46d83d4eb5f40b6654e041dd68 with missing_evaluator_episode: expected EVALUATOR, received EXECUTOR. Violated invariant: packaged-mixed-scope-lifecycle must supply every deterministic verification capability required by its selected code.direct blueprint before expecting evaluator handoff. Root cause: the fixture verification record reports needs_rework because full_regression is required while fixture package.json does not define ci:local:full; all declared commands themselves pass, so AgentPlane correctly returns implementation rework. Temporary recovery: preserve one isolated fixture and read its public verification record; no state edits. Permanent fix: minimally update the qualification fixture to provide a bounded full-regression command consistent with its declared Node test, retain the public lifecycle assertion, and add/adjust regression coverage so a verification rework cannot be misclassified as missing evaluator. Do not weaken hosted gates or production lifecycle invariants. Verify the direct packaged scenario, qualification contract tests, and full local CI. Integrate normally, then refresh 202608252330-9RCWZQ from current main and rerun exact-head hosted qualification.
      task_id: "202608260947-C6WV4T"
    lifecycle: "ACTIVE"
    plan_amendments:
      -
        actor_id: "external:EXECUTOR"
        created_at: "2026-08-26T10:20:54.612Z"
        digest: "sha256:18ee5c3177f1449e26f42c0ae407a8794325838a5331317029636644e6de7a1d"
        id: "amendment_18ee5c3177f1449e26f42c0a"
        plan_digest: "sha256:232817c2eb17d233463bb069aaed73259dc1196935c988e8f3427d66fc5a8165"
        plan_revision: 1
        refinement:
          acceptance_changed: false
          architecture_constraints_changed: false
          dependencies_changed: false
          description: "Replace the contract validation command 'bunx vitest run scripts/qualification/release-qualification.test.mjs' with the repository-canonical 'node --test scripts/qualification/release-qualification.test.mjs'. This changes only the local test runner invocation; scope, outputs, acceptance criteria, risk, effects, dependencies, and architecture remain unchanged."
          external_effects_added: []
          operations:
            - "clarify"
          outputs_added: []
          risk_changed: false
          scope_roots_added: []
        schema_version: 1
    plan_history: []
    revision: 13
    schema_version: 1
    updated_at: "2026-08-26T10:20:54.666Z"
    work_items:
      restore-packaged-mixed-scope-qualification:
        attempt: 2
        claim_id: null
        id: "restore-packaged-mixed-scope-qualification"
        last_failure:
          cause_refs:
            - "criterion-fixture"
            - "criterion-contract"
          code: "validation_failed"
          kind: "validation"
          message: "Preserved implementation commit 7e2c47bc1fd246e059c55b1bbc8700cc1e99a7cf, proved the packaged mixed-scope lifecycle on that exact implementation, and identified one validation-command refinement required by the approved plan."
          retryable: true
        output_manifests:
          -
            digest: "sha256:4b535b9e400d065263b1ba33f12a9b5b130fe03767f0c5798ce97a4fcb6c9d3d"
            id: "packaged-mixed-scope-qualification-fix"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 1
              task_id: "202608260947-C6WV4T"
              work_item_id: "restore-packaged-mixed-scope-qualification"
            provenance:
              - "sha256:0dfeeaa06264c13493afaaf65eeecaf9c12da4b5da77d48f572283cc884e3441"
              - ".agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:04820a1c221af8029efdba65fd953c1f001d24c1f6a44323306943bff000c123"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 3
        state: "REWORK_READY"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json"
              check_id: "check-packaged"
              command_identity: "node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs"
              detail: "Declared validation command node scripts/qualification/check-packaged-mixed-scope-lifecycle.mjs was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-08-26T10:20:54.662Z"
              repository_snapshot_digest: "sha256:04820a1c221af8029efdba65fd953c1f001d24c1f6a44323306943bff000c123"
              status: "unsupported"
            -
              artifact_refs:
                - ".agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json"
              check_id: "check-contract"
              command_identity: "bunx vitest run scripts/qualification/release-qualification.test.mjs"
              detail: "Declared check failed: bunx vitest run scripts/qualification/release-qualification.test.mjs"
              exit_code: 1
              observed_at: "2026-08-26T10:20:54.662Z"
              repository_snapshot_digest: "sha256:04820a1c221af8029efdba65fd953c1f001d24c1f6a44323306943bff000c123"
              status: "failed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json"
              check_id: "check-full"
              command_identity: "bun run ci:local:full"
              detail: "Declared check failed: bunx vitest run scripts/qualification/release-qualification.test.mjs"
              exit_code: 0
              observed_at: "2026-08-26T10:20:54.662Z"
              repository_snapshot_digest: "sha256:04820a1c221af8029efdba65fd953c1f001d24c1f6a44323306943bff000c123"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "blocked"
          unsatisfied_criteria:
            - "criterion-fixture"
            - "criterion-contract"
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608260947-C6WV4T-executor-134c0eebf6d70143baa6961f:
        aggregate_digest: "sha256:616ad4c05b3bfbeffb8e37fd03013ac1cdc13b442eb65b8216f30e77aa81d9e6"
        event:
          actor_id: "agentplane"
          at: "2026-08-26T10:20:54.666Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_390840253837f3930ea419d3"
          mutation_id: "external-result:work-order-202608260947-C6WV4T-executor-134c0eebf6d70143baa6961f"
          plan_digest: "sha256:232817c2eb17d233463bb069aaed73259dc1196935c988e8f3427d66fc5a8165"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608260947-C6WV4T"
          task_revision: 12
          to: "REWORK_READY"
          work_item_id: "restore-packaged-mixed-scope-qualification"
        mutation_id: "external-result:work-order-202608260947-C6WV4T-executor-134c0eebf6d70143baa6961f"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202608260947-C6WV4T"
      external-result:work-order-202608260947-C6WV4T-executor-92fdbe241dc89e7598bb0ae1:
        aggregate_digest: "sha256:814ebf36441cb7bca387f9c88679ffde3035e9756342dcfd0f18032f4a3d6c4e"
        event:
          actor_id: "agentplane"
          at: "2026-08-26T10:12:06.139Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_dbd5d9a79d9a2d582ced42de"
          mutation_id: "external-result:work-order-202608260947-C6WV4T-executor-92fdbe241dc89e7598bb0ae1"
          plan_digest: "sha256:232817c2eb17d233463bb069aaed73259dc1196935c988e8f3427d66fc5a8165"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608260947-C6WV4T"
          task_revision: 7
          to: "REWORK_READY"
          work_item_id: "restore-packaged-mixed-scope-qualification"
        mutation_id: "external-result:work-order-202608260947-C6WV4T-executor-92fdbe241dc89e7598bb0ae1"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608260947-C6WV4T"
      plan-refinement:work-order-202608260947-C6WV4T-executor-134c0eebf6d70143baa6961f:
        aggregate_digest: "sha256:470aea798ae4bd7d54b308e3bfacf5482fca0b91aebf1be264563cf29553e4b0"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-26T10:20:54.612Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:232817c2eb17d233463bb069aaed73259dc1196935c988e8f3427d66fc5a8165"
          id: "event_23ed67ef6335854fc677df71"
          mutation_id: "plan-refinement:work-order-202608260947-C6WV4T-executor-134c0eebf6d70143baa6961f"
          plan_digest: "sha256:232817c2eb17d233463bb069aaed73259dc1196935c988e8f3427d66fc5a8165"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608260947-C6WV4T"
          task_revision: 11
          to: "sha256:18ee5c3177f1449e26f42c0ae407a8794325838a5331317029636644e6de7a1d"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608260947-C6WV4T-executor-134c0eebf6d70143baa6961f"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202608260947-C6WV4T"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    version: 1
id_source: "generated"
---
## Summary

Restore packaged mixed-scope lifecycle qualification on the exact release candidate

Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: required hosted verify-real-e2e fails reproducibly on clean exact heads c59dad6936fea2b664973d12cfe6ec96d2bc89f5 and 69a4f33f94fbcd46d83d4eb5f40b6654e041dd68 with missing_evaluator_episode: expected EVALUATOR, received EXECUTOR. Violated invariant: packaged-mixed-scope-lifecycle must supply every deterministic verification capability required by its selected code.direct blueprint before expecting evaluator handoff. Root cause: the fixture verification record reports needs_rework because full_regression is required while fixture package.json does not define ci:local:full; all declared commands themselves pass, so AgentPlane correctly returns implementation rework. Temporary recovery: preserve one isolated fixture and read its public verification record; no state edits. Permanent fix: minimally update the qualification fixture to provide a bounded full-regression command consistent with its declared Node test, retain the public lifecycle assertion, and add/adjust regression coverage so a verification rework cannot be misclassified as missing evaluator. Do not weaken hosted gates or production lifecycle invariants. Verify the direct packaged scenario, qualification contract tests, and full local CI. Integrate normally, then refresh 202608252330-9RCWZQ from current main and rerun exact-head hosted qualification.

## Scope

- In scope: Release blocker for 0.7.8 and task 202608252330-9RCWZQ. Symptom: required hosted verify-real-e2e fails reproducibly on clean exact heads c59dad6936fea2b664973d12cfe6ec96d2bc89f5 and 69a4f33f94fbcd46d83d4eb5f40b6654e041dd68 with missing_evaluator_episode: expected EVALUATOR, received EXECUTOR. Violated invariant: packaged-mixed-scope-lifecycle must supply every deterministic verification capability required by its selected code.direct blueprint before expecting evaluator handoff. Root cause: the fixture verification record reports needs_rework because full_regression is required while fixture package.json does not define ci:local:full; all declared commands themselves pass, so AgentPlane correctly returns implementation rework. Temporary recovery: preserve one isolated fixture and read its public verification record; no state edits. Permanent fix: minimally update the qualification fixture to provide a bounded full-regression command consistent with its declared Node test, retain the public lifecycle assertion, and add/adjust regression coverage so a verification rework cannot be misclassified as missing evaluator. Do not weaken hosted gates or production lifecycle invariants. Verify the direct packaged scenario, qualification contract tests, and full local CI. Integrate normally, then refresh 202608252330-9RCWZQ from current main and rerun exact-head hosted qualification.
- Out of scope: unrelated refactors not required for "Restore packaged mixed-scope lifecycle qualification on the exact release candidate".

## Plan

Add the smallest fixture-only full-regression capability required by the selected code.direct blueprint, retain fail-closed evaluator handoff assertions, and prove the installed packaged lifecycle plus qualification contract and full repository regression on the exact implementation.

## Verify Steps

PLANNER fallback scaffold for "Restore packaged mixed-scope lifecycle qualification on the exact release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Restore packaged mixed-scope lifecycle qualification on the exact release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-26T10:12:02.781Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f1c7611e3fc6744f91ca189752b78afddc6326d9f282a05be030b60d07fd7936, input_digest=sha256:5603c1168da0c650d7f6ef4ff936240ef291f9f4276b5f94d138e620433e647d

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608260947-C6WV4T declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608260947-C6WV4T-restore-packaged-mixed-scope-lifecycle-qualifica/.agentplane/tasks/202608260947-C6WV4T/blueprint/resolved-snapshot.json
- old_digest: eeca0f8e62cbecd222eec0659bf8f7b087806f1348178c9fe0d673e4a47b8695
- current_digest: eeca0f8e62cbecd222eec0659bf8f7b087806f1348178c9fe0d673e4a47b8695
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608260947-C6WV4T

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

### 2026-08-26T10:20:51.415Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bunx vitest run scripts/qualification/release-qualification.test.mjs
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:f1c7611e3fc6744f91ca189752b78afddc6326d9f282a05be030b60d07fd7936, input_digest=sha256:9f508624adef190354e5b29eb71ce9d6b4d61bea02d288265f0cec60f68a5304

Details:

Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608260947-C6WV4T declared verification

Command: bunx vitest run scripts/qualification/release-qualification.test.mjs
Result: fail
Evidence: .agentplane/tasks/202608260947-C6WV4T/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608260947-C6WV4T declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608260947-C6WV4T-restore-packaged-mixed-scope-lifecycle-qualifica/.agentplane/tasks/202608260947-C6WV4T/blueprint/resolved-snapshot.json
- old_digest: eeca0f8e62cbecd222eec0659bf8f7b087806f1348178c9fe0d673e4a47b8695
- current_digest: eeca0f8e62cbecd222eec0659bf8f7b087806f1348178c9fe0d673e4a47b8695
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608260947-C6WV4T

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
