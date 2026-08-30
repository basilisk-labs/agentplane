---
id: "202608291006-255K66"
title: "Cut over to the canonical Task kernel and retire legacy core paths"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202608291006-2A6BJC"
  - "202608251706-V287W1"
tags:
  - "clean-core-rebuild"
  - "cutover"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run ci:local:full"
  - "bun run lifecycle:invariants"
  - "bun run qualification:mixed-scope-lifecycle"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T18:48:25.201Z"
  updated_by: "USER"
  note: "User explicitly authorized completion of the entire clean core refactor and approved all subsequent in-scope plans. M3 plan 0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089 preserves every specification gate and excludes stable release publication."
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
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
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
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "dependencies"
      - "ci"
    writable_roots:
      - "depcruise.config.cjs"
      - "docs/developer"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "package.json"
      - "packages/agentplane/src/adapters"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/src/tasks"
      - "packages/testkit/src"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/qualification"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
      - "publish"
    implementation_uncertainty: "material"
    preferred_mode: "branch_pr"
    rationale:
      - "Cutover changes persistent Task authority and every lifecycle consumer. Isolated branch review and exact-head qualification are required."
      - "External effects are limited to native integration, corpus migration and owned qualification resources. Individual semantic episodes must keep their emitted authority and cannot execute formal transitions."
    repository_effects:
      - "documentation"
      - "public_api"
      - "release_metadata"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "depcruise.config.cjs"
      - "docs/developer"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "package.json"
      - "packages/agentplane/src/adapters"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/src/tasks"
      - "packages/testkit/src"
      - "scripts/bench"
      - "scripts/checks"
      - "scripts/qualification"
  observed:
    authority_violations:
      - "verification:recorded-check-1:fail"
    changed_components:
      - "docs"
      - "packages/agentplane"
    changed_paths:
      - "docs/developer/clean-task-core-cutover.mdx"
      - "docs/developer/harness-dev.mdx"
      - "packages/agentplane/src/adapters/task-backend/kernel-next-action.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
      - "packages/agentplane/src/commands/task/active.command.ts"
      - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
      - "packages/agentplane/src/commands/task/brief.command.ts"
      - "packages/agentplane/src/commands/task/execution-authority-context.test.ts"
      - "packages/agentplane/src/commands/task/execution-authority-context.ts"
      - "packages/agentplane/src/commands/task/kernel-read.ts"
      - "packages/agentplane/src/commands/task/next-action.command.ts"
      - "packages/agentplane/src/commands/task/ready.ts"
      - "packages/agentplane/src/commands/task/show-kernel.test.ts"
      - "packages/agentplane/src/commands/task/show.ts"
      - "packages/agentplane/src/commands/task/status.command.ts"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results:
      -
        id: "recorded-check-1"
        result: "fail"
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "effect_public_api"
    - "effect_publish"
    - "effect_release_metadata"
    - "effect_schema"
    - "effect_security_boundary"
    - "material_implementation_uncertainty"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
      - "publish"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "depcruise.config.cjs"
          - "docs/developer"
          - "docs/reference/clean-task-core-rebuild-spec.mdx"
          - "package.json"
          - "packages/agentplane/src/adapters"
          - "packages/agentplane/src/backends/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands"
          - "packages/agentplane/src/ports"
          - "packages/agentplane/src/runner"
          - "packages/core/src/tasks"
          - "packages/testkit/src"
          - "scripts/bench"
          - "scripts/checks"
          - "scripts/qualification"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "external_effect:publish"
          - "hosted_integration"
          - "implementation_risk_validation"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:release_metadata"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
          - "publish"
        repository_effects:
          - "documentation"
          - "public_api"
          - "release_metadata"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "material"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:eaebf72750af2f3f59691a928e1eea6f16a592ff8a973aa7c8e004a4cc9767ea"
      escalation_reasons:
        - "central_component:package.json"
        - "central_component:packages/core/src/tasks"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
        - "effect_public_api"
        - "effect_release_metadata"
        - "effect_schema"
        - "effect_security_boundary"
        - "external_effect_requires_real_e2e"
        - "material_implementation_uncertainty"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "docs"
          - "packages/agentplane"
        changed_files:
          - "docs/developer/clean-task-core-cutover.mdx"
          - "docs/developer/harness-dev.mdx"
          - "packages/agentplane/src/adapters/task-backend/kernel-next-action.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-status-token-usage.test.ts"
          - "packages/agentplane/src/commands/task/active.command.ts"
          - "packages/agentplane/src/commands/task/active.command.unit.test.ts"
          - "packages/agentplane/src/commands/task/brief.command.ts"
          - "packages/agentplane/src/commands/task/execution-authority-context.test.ts"
          - "packages/agentplane/src/commands/task/execution-authority-context.ts"
          - "packages/agentplane/src/commands/task/kernel-read.ts"
          - "packages/agentplane/src/commands/task/next-action.command.ts"
          - "packages/agentplane/src/commands/task/ready.ts"
          - "packages/agentplane/src/commands/task/show-kernel.test.ts"
          - "packages/agentplane/src/commands/task/show.ts"
          - "packages/agentplane/src/commands/task/status.command.ts"
        external_effects: []
        repository_effects:
          - "documentation"
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
        - "docs_contract"
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
      - "external_effect:publish"
      - "hosted_integration"
      - "implementation_risk_validation"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:release_metadata"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
      - "verification_recovery:recorded-check-1"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 36e1575c028d. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d154a7268f6a. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-30T21:48:11.738Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T22:06:13.020Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 36e1575c028d. CLI accepted one state-bound external-agent semantic result."
    commit: "36e1575c028d8fe54efb664ac92f745fdcdbcff9"
  -
    type: "verify"
    at: "2026-08-30T22:13:21.915Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T22:19:09.690Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d154a7268f6a. CLI accepted one state-bound external-agent semantic result."
    commit: "d154a7268f6aa9f23e6fbf04ffd857f1a552cb86"
  -
    type: "verify"
    at: "2026-08-30T22:26:29.048Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
doc_version: 3
doc_updated_at: "2026-08-30T22:26:31.091Z"
doc_updated_by: "SUPERVISOR"
description: "After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence."
sections:
  Summary: |-
    Cut over to the canonical Task kernel and retire legacy core paths

    After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
  Scope: |-
    - In scope: After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
    - Out of scope: unrelated refactors not required for "Cut over to the canonical Task kernel and retire legacy core paths".
  Plan: "Prepared eight sequential M3 WorkItems with canonical read, mutation, effect, task-class, crash/migration, self-hosting, retirement and final qualification gates."
  Verify Steps: |-
    PLANNER fallback scaffold for "Cut over to the canonical Task kernel and retire legacy core paths". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Cut over to the canonical Task kernel and retire legacy core paths". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-30T22:13:21.915Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:1d3f9ef9693d7e0ddb5a5bb53efbf7ef423d277c12454a560fea222153023b32

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-30T22:26:29.048Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:18f9370d036593551fe4c629bdb8e27d65371788641b60a7c3c89a10c4d22972

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-255K66 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
    - old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-255K66

    DecisionContextRef:
    - operator_action: stop
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
    actor: "USER"
    approval_evidence_digest: null
    approval_kind: "manual_operator"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "publish"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:dab3bd4435772ce3e20ded54713ca730f67341d929c1f350446f1cf2fe653c80"
    digest: "sha256:0b4e93474385af69667daeb4ee11fcc6cb09a8d2d4697b2334f5a9be4f1495d4"
    grant_id: "63fa0983-42f4-459b-b765-f933ac3cbb27"
    issued_at: "2026-08-30T18:48:25.201Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:b9d9598a5b21bf83febf16cfc86d5fb6071c0992d52486e265428c0cfd5aea27"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:bf7e0b78c96fdf79b23edb6eaae30cdf7cf405e2f6fabf8c72b3b30074e7dc29"
    status: "active"
    task_id: "202608291006-255K66"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T18:48:25.201Z"
        approved_by: "USER"
        approved_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-30T18:48:04.947Z"
      digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
      proposal:
        assumptions:
          - "M2 merge 36741ce5160d452ca9660a388241cb4da32f842a and runtime predecessor satisfy their hosted prerequisite gates; new M3 evidence must be collected independently."
          - "Existing policy and Task traceability remain authoritative. Native AgentPlane owns migration, controller transfer and formal lifecycle effects. User standing authorization does not allow forged approval receipts or disabled guards."
          - "Qualification resources must be explicitly owned and isolated. Stable 0.7.8 publication and unrelated active Task or user-data mutation are outside M3. Stop at any missing provider namespace or unprovable ownership instead of inventing targets."
        planning_baseline:
          captured_at: "2026-08-30T18:45:09.785Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
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
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608270848-0RAFH9/README.md"
            - ".agentplane/tasks/202608270848-37XB2K/README.md"
            - ".agentplane/tasks/202608270848-N28TBB/README.md"
            - ".agentplane/tasks/202608270848-V32542/README.md"
            - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
            - ".agentplane/tasks/202608291005-33PHG4/README.md"
            - ".agentplane/tasks/202608291006-255K66/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "36741ce5160d452ca9660a388241cb4da32f842a"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202608291006-255K66"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "m3-full"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "m3-invariants"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run qualification:mixed-scope-lifecycle"
              id: "m3-packaged"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "m3-full"
                - "m3-invariants"
                - "m3-packaged"
              description: "All M3 acceptance gates in docs/reference/clean-task-core-rebuild-spec.mdx pass with exact-identity evidence. Twenty real sequential self-hosting Tasks and three clean release drills are mandatory. No production legacy lifecycle authority remains. Required hosted merge and close evidence remain supervisor-owned."
              id: "m3-complete"
              required: true
          evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                  id: "m3-projections-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on: []
              expected_outputs:
                - "m3-projections-evidence"
              id: "m3-projections"
              objective: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
                - "docs/developer"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route canonical read surfaces through one kernel projection boundary. Inventory production legacy owners and freeze the cutover order and rollback gates in an M3 code map. Preserve legacy inspection until explicit migration. Canonical status, readiness, brief and next-action must not call aggregateFrom or synthesize legacy state; missing, malformed, archived and unmigrated cases have explicit typed handling."
                    id: "m3-projections-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt to KernelBackendAdapter and reduceTaskCommand. Reuse M1 authority comparison and M2 atomic adapters. CLI and managed runner share one application service. No implicit migration or second writable lifecycle source. Preserve current WorkItem results under non-material refinements. Test local and cloud fake paths and exact mutation identity."
                  id: "m3-lifecycle-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-projections"
              expected_outputs:
                - "m3-lifecycle-evidence"
              id: "m3-lifecycle"
              objective: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt to KernelBackendAdapter and reduceTaskCommand. Reuse M1 authority comparison and M2 atomic adapters. CLI and managed runner share one application service. No implicit migration or second writable lifecycle source. Preserve current WorkItem results under non-material refinements. Test local and cloud fake paths and exact mutation identity."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "packages/testkit/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Connect canonical Task creation, planning, approval, WorkItem readiness, claims and result receipt to KernelBackendAdapter and reduceTaskCommand. Reuse M1 authority comparison and M2 atomic adapters. CLI and managed runner share one application service. No implicit migration or second writable lifecycle source. Preserve current WorkItem results under non-material refinements. Test local and cloud fake paths and exact mutation identity."
                    id: "m3-lifecycle-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                  id: "m3-effects-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-lifecycle"
              expected_outputs:
                - "m3-effects-evidence"
              id: "m3-effects"
              objective: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
              optional: false
              priority: 2
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Move validation, evaluator, commit, PR, merge, hosted close and cleanup flow decisions to canonical commands and effect receipts. Providers only observe and dispatch admitted effects. Cover lost responses, CAS retries, effect reconciliation, clean base synchronization and the M2 DONE-evaluator artifact-freshness loop. A retry must neither duplicate an effect nor replay completed implementation."
                    id: "m3-effects-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                  id: "m3-task-classes-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-effects"
              expected_outputs:
                - "m3-task-classes-evidence"
              id: "m3-task-classes"
              objective: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
              optional: false
              priority: 3
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "packages/testkit/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Route direct, branch PR, context, release and batch consumers through the same canonical application service. Preserve context ownership and release firewall. Use declared adapters for differing side effects. Extend existing packaged mixed-scope qualification without changing acceptance or weakening legacy regression checks."
                    id: "m3-task-classes-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                  id: "m3-crash-migration-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-task-classes"
              expected_outputs:
                - "m3-crash-migration-evidence"
              id: "m3-crash-migration"
              objective: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
              optional: false
              priority: 4
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "docs/developer"
                - "packages/testkit/src"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Extend crash injection across creation, plan, approval, claim, result, validation, commit, review, completion, PR, merge, hosted close, publish and cleanup for every required task class and local/cloud fake path. Inventory the real repository corpus read-only, classify every record, then use native migration at approved operator boundaries with exact source digests, backups and receipts. Validate a canary and exact-byte rollback before remaining eligible records. Quarantine unknown records without inventing history or deleting state."
                    id: "m3-crash-migration-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                  id: "m3-self-hosting-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-crash-migration"
              expected_outputs:
                - "m3-self-hosting-evidence"
              id: "m3-self-hosting"
              objective: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
              optional: false
              priority: 5
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/adapters"
                - "scripts/qualification"
                - "docs/developer"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Qualify and transfer the controller using existing M2 controller-transfer receipts. Complete twenty sequential real self-hosting Tasks through public AgentPlane commands in explicitly owned qualification resources. Require exact implementation identity, real execution/effect readback, zero manual Task or journal edits, zero bypasses, no lost WorkItems and no duplicate effects. Mock replays and ordinary unit tests do not count as these twenty Tasks. Do not edit the live control Task from a semantic episode."
                    id: "m3-self-hosting-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                  id: "m3-retirement-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-self-hosting"
              expected_outputs:
                - "m3-retirement-evidence"
              id: "m3-retirement"
              objective: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
              optional: false
              priority: 6
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "scripts/checks"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "package.json"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "After preceding gates pass, remove production imports and implementations of synthetic aggregate construction, legacy status conversion, text-plan authority, legacy verification completion, DONE-first finish and duplicate approval/scope state. Keep only explicitly documented read/format compatibility adapters with no lifecycle authority. Add an import guard and report production LOC separately from tests, generated captures and documentation."
                    id: "m3-retirement-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m3-invariants"
                  description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                  id: "m3-final-qualification-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 96000
                optional_sources: []
                required_sources:
                  - "repository"
                  - "task-document"
                symbol_hints:
                  - "KernelBackendAdapter"
                  - "reduceTaskCommand"
                  - "readKernelNextAction"
              depends_on:
                - "m3-retirement"
              expected_outputs:
                - "m3-final-qualification-evidence"
              id: "m3-final-qualification"
              objective: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
              optional: false
              priority: 7
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/qualification"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/bench"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference/clean-task-core-rebuild-spec.mdx"
                -
                  kind: "path"
                  mode: "write"
                  resource: "package.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks"
                - "packages/agentplane/src/adapters"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/commands"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/runner"
                - "packages/agentplane/src/cli"
                - "packages/testkit/src"
                - "scripts/qualification"
                - "scripts/checks"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "package.json"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m3-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "m3-invariants"
                    description: "Run three clean release drills on the same candidate with agreement between source SHA, package digests, tag, hosted release, registry and installed CLI behavior. Use only explicitly owned qualification namespaces and native effect authorization; do not publish stable 0.7.8 or alter its dist-tag as a side effect. Run full local CI and required hosted exact-head checks. Produce an M3 milestone receipt bound to Task, plan digest, implementation SHA, evidence digests, migration corpus, rollback proof and hosted checks. Missing external proof or any skipped required gate prevents completion."
                    id: "m3-final-qualification-acceptance"
                    required: true
                evidence_fingerprint: "sha256:4bdddfe9f4ac0516f19aecff20062b5550a3c54c2e7fc03981cc196c9a003b24"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608291006-255K66"
    event_cursor: 0
    final_validation: null
    id: "202608291006-255K66"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run lifecycle:invariants"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run qualification:mixed-scope-lifecycle"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-29T10:06:25.960Z"
      constraints: []
      request: |-
        Cut over to the canonical Task kernel and retire legacy core paths

        After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
      task_id: "202608291006-255K66"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 14
    schema_version: 1
    updated_at: "2026-08-30T22:26:42.503Z"
    work_items:
      m3-crash-migration:
        attempt: 0
        claim_id: null
        id: "m3-crash-migration"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      m3-effects:
        attempt: 0
        claim_id: null
        id: "m3-effects"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      m3-final-qualification:
        attempt: 0
        claim_id: null
        id: "m3-final-qualification"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      m3-lifecycle:
        attempt: 0
        claim_id: null
        id: "m3-lifecycle"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      m3-projections:
        attempt: 2
        claim_id: null
        id: "m3-projections"
        last_failure:
          cause_refs:
            - "m3-projections-acceptance"
          code: "validation_failed"
          kind: "validation"
          message: "Corrected both full-CI regressions in m3-projections without weakening checks or legacy behavior."
          retryable: true
        output_manifests:
          -
            digest: "sha256:c92107a66bb0e6544a337ae8e490818ec7bab1e48cebbda9c04d507c21c47d33"
            id: "m3-projections-evidence"
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 1
              task_id: "202608291006-255K66"
              work_item_id: "m3-projections"
            provenance:
              - "sha256:c9d926549f52a7c2ac0c98a0bc601caac484c70520c1de4e614b4d422cec2d4c"
              - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:7317bad63f81f967f38b17df896f7fe360c4533c3ec912068c4cff1654a9cd2f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 3
        state: "REWORK_READY"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608291006-255K66/supervision/declared-checks.json"
              check_id: "m3-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Declared validation command bun run lifecycle:invariants was not observed by AgentPlane."
              exit_code: null
              observed_at: "2026-08-30T22:26:42.491Z"
              repository_snapshot_digest: "sha256:7317bad63f81f967f38b17df896f7fe360c4533c3ec912068c4cff1654a9cd2f"
              status: "unsupported"
          schema_version: 1
          stale_evidence: []
          status: "blocked"
          unsatisfied_criteria:
            - "m3-projections-acceptance"
      m3-retirement:
        attempt: 0
        claim_id: null
        id: "m3-retirement"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      m3-self-hosting:
        attempt: 0
        claim_id: null
        id: "m3-self-hosting"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      m3-task-classes:
        attempt: 0
        claim_id: null
        id: "m3-task-classes"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608291006-255K66-executor-6e62b32bc555e1f94c3145f2:
        aggregate_digest: "sha256:21e1fde12f6691e70acc9c2fbc9e2c683b7352cc72878051209a1c59f24591e3"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T22:13:25.123Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_c1a17c5cacb34f497f6343f9"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-6e62b32bc555e1f94c3145f2"
          plan_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 9
          to: "REWORK_READY"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-6e62b32bc555e1f94c3145f2"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202608291006-255K66"
      external-result:work-order-202608291006-255K66-executor-bf2785583fed4c8df073f5e8:
        aggregate_digest: "sha256:a4f459c343eb04e1c237e1264cafee80dcdca52d5835eb160a4bb80233d4a5c8"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T22:26:42.503Z"
          cause_refs: []
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_b57f13f8000e6f943b07d5b1"
          mutation_id: "external-result:work-order-202608291006-255K66-executor-bf2785583fed4c8df073f5e8"
          plan_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-255K66"
          task_revision: 13
          to: "REWORK_READY"
          work_item_id: "m3-projections"
        mutation_id: "external-result:work-order-202608291006-255K66-executor-bf2785583fed4c8df073f5e8"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202608291006-255K66"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  task_planning_base_recovery:
    branch: "task/202608291006-255K66/cut-over-to-the-canonical-task-kernel-and-retire"
    from_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    observed_head: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    plan_digest: "sha256:0f06371f343e53a6892d3784f31db1e0c3e91ee8bfbf1dd9d7a646a9f1e3c089"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    revision: 4
    schema_version: 1
    state: "applied"
    target_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    task_id: "202608291006-255K66"
    token: "sha256:6919b5884d7ced0ee28006b79cb7dc7c1ba2b1ef8b8b99117fa42683d68f16bc"
    worktree: "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire"
  workflow_route_baseline:
    start_head_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    version: 1
id_source: "generated"
---
## Summary

Cut over to the canonical Task kernel and retire legacy core paths

After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.

## Scope

- In scope: After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
- Out of scope: unrelated refactors not required for "Cut over to the canonical Task kernel and retire legacy core paths".

## Plan

Prepared eight sequential M3 WorkItems with canonical read, mutation, effect, task-class, crash/migration, self-hosting, retirement and final qualification gates.

## Verify Steps

PLANNER fallback scaffold for "Cut over to the canonical Task kernel and retire legacy core paths". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Cut over to the canonical Task kernel and retire legacy core paths". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-30T22:13:21.915Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:1d3f9ef9693d7e0ddb5a5bb53efbf7ef423d277c12454a560fea222153023b32

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-30T22:26:29.048Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:7b35e2746b84ccbdd7cd60fd8a880414e5cbe30ab9106aff16739408b4d882ab, input_digest=sha256:18f9370d036593551fe4c629bdb8e27d65371788641b60a7c3c89a10c4d22972

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-255K66/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-255K66 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-255K66-cut-over-to-the-canonical-task-kernel-and-retire/.agentplane/tasks/202608291006-255K66/blueprint/resolved-snapshot.json
- old_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- current_digest: 7ad78cf9ada076212662bdace4e55b7fd34a3c410c0909dc85f3377c3151d211
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-255K66

DecisionContextRef:
- operator_action: stop
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
