---
id: "202608301851-5W3XW6"
title: "Recover unstarted task worktrees pinned before the approved planning baseline"
status: "BLOCKED"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core-bootstrap"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
verify:
  - "bun run ci:local:full"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T18:53:20.013Z"
  updated_by: "USER"
  note: "User authorized necessary bootstrap fixes and all in-scope plans for completion of the clean core refactor. This bounded recovery unblocks M3 without changing dependencies or bypassing gates."
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
    - "effect_public_api"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "docs/developer"
      - "docs/reference"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/runtime/task-execution-context"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Recovery changes Git and Task state only through an explicit operator command with exact identities and fail-closed checks. It requires isolated review and full regression checks."
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "docs/developer"
      - "docs/reference"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/branch"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/runtime/task-execution-context"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
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
          - "docs/developer"
          - "docs/reference"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/branch"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/runtime/task-execution-context"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:1d6e75ed1f7a91ac1736fe3956a199c1f6624e41afa036468135cd73cef1b808"
      escalation_reasons:
        - "effect_public_api"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components: []
        changed_files: []
        external_effects: []
        repository_effects: []
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
      - "hosted_integration"
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The native recovery needs its generated CLI reference in the writable scope. Source work is preserved outside the checkout in tool state; the emitted baseline is restored before requesting the extension. Recommended action: Extend scope to docs/user/cli-reference.generated.mdx, then restore the preserved candidate and regenerate documentation. Requested scope: roots=docs/user/cli-reference.generated.mdx; repository effects=documentation; request digest=sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360. Agentplane receipt: external-agent-blocker/tr_359012ee79b8ac83b73d24a7f02d9132/sha256:8efcdc33bc75000d5291750a49bda8a7d3f596bdffb17e3116492c890657fcaa/sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360."
events:
  -
    type: "status"
    at: "2026-08-30T18:53:26.069Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T19:08:49.791Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The native recovery needs its generated CLI reference in the writable scope. Source work is preserved outside the checkout in tool state; the emitted baseline is restored before requesting the extension. Recommended action: Extend scope to docs/user/cli-reference.generated.mdx, then restore the preserved candidate and regenerate documentation. Requested scope: roots=docs/user/cli-reference.generated.mdx; repository effects=documentation; request digest=sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360. Agentplane receipt: external-agent-blocker/tr_359012ee79b8ac83b73d24a7f02d9132/sha256:8efcdc33bc75000d5291750a49bda8a7d3f596bdffb17e3116492c890657fcaa/sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360."
doc_version: 3
doc_updated_at: "2026-08-30T19:08:49.791Z"
doc_updated_by: "SUPERVISOR"
description: "M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor."
sections:
  Summary: |-
    Recover unstarted task worktrees pinned before the approved planning baseline

    M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.
  Scope: |-
    - In scope: M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.
    - Out of scope: unrelated refactors not required for "Recover unstarted task worktrees pinned before the approved planning baseline".
  Plan: "Plan a bounded native recovery for an unstarted workspace pinned before approved planning."
  Verify Steps: |-
    PLANNER fallback scaffold for "Recover unstarted task worktrees pinned before the approved planning baseline". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recover unstarted task worktrees pinned before the approved planning baseline". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
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
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:6aa8d5650f6f74e7a3fef6ce4da5cecc664b9091f566013419b5a54d5295e1b1"
    digest: "sha256:356ad55671f4e75e475598297adbeeca7c0a72e3c513fd39e97a7798ca345b29"
    grant_id: "97f53a37-54d5-4fdf-87fc-e331508de144"
    issued_at: "2026-08-30T18:53:20.013Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:2e94959411b17505b66323b70d4c92c56c72a5a884d0c6295c301e4a6909e22e"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:d986203848ce4d5c48e2437787a704c3d8b0c78215e335ad55d7ec6117e65fed"
    status: "active"
    task_id: "202608301851-5W3XW6"
  agentplane.scope_extension_request:
    blocker_state_fingerprint: "sha256:8efcdc33bc75000d5291750a49bda8a7d3f596bdffb17e3116492c890657fcaa"
    kind: "task_scope_extension_request"
    request:
      rationale: "Keep mandatory CLI reference freshness for the newly implemented work resume recovery options."
      repository_effects:
        - "documentation"
      schema_version: 1
      scope_roots:
        - "docs/user/cli-reference.generated.mdx"
    request_digest: "sha256:a535e9018c1817707007f02cb7ec0edcb62bb11cbbf324bd535d216fb308f360"
    schema_version: 1
    status: "pending"
    transition_id: "tr_359012ee79b8ac83b73d24a7f02d9132"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T18:53:20.013Z"
        approved_by: "USER"
        approved_digest: "sha256:d27e2ac02253c387453dd45cc058373b3da2f2569b4bc8b2916a2d60eee64505"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-30T18:52:59.720Z"
      digest: "sha256:d27e2ac02253c387453dd45cc058373b3da2f2569b4bc8b2916a2d60eee64505"
      proposal:
        assumptions:
          - "This operator recovery is limited to unstarted creation-checkout Tasks. It does not change default frozen-base semantics or explicit user pins."
          - "M3 is retained unchanged until native recovery is verified and authorized. No task dependency is removed to bypass readiness."
        planning_baseline:
          captured_at: "2026-08-30T18:52:06.171Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
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
            - ".agentplane/tasks/202608301851-5W3XW6/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "36741ce5160d452ca9660a388241cb4da32f842a"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608301851-5W3XW6"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:fast"
              id: "bootstrap-tests"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "bootstrap-types"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "bootstrap-full"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "bootstrap-tests"
                - "bootstrap-types"
                - "bootstrap-full"
              description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
              id: "bootstrap-recovery"
              required: true
          evidence_fingerprint: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "bootstrap-tests"
                    - "bootstrap-types"
                    - "bootstrap-full"
                  description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                  id: "bootstrap-recovery"
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
                  - "makeRunWorkResumeHandler"
                  - "resolveFrozenBaseIdentity"
                  - "taskCentricAggregateFromExtensions"
              depends_on: []
              expected_outputs:
                - "planning-base-recovery-implementation"
              id: "recover-planning-base"
              objective: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runtime/task-execution-context"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/reference"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/branch"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/runtime/task-execution-context"
                - "packages/agentplane/src/cli"
                - "docs/reference"
                - "docs/developer"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "bootstrap-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "bootstrap-types"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "bootstrap-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "bootstrap-tests"
                      - "bootstrap-types"
                      - "bootstrap-full"
                    description: "Add explicit native work resume recovery for a pristine, unstarted task worktree whose creation base predates its approved planning baseline. Inspect without mutation by default. Bind apply to exact Task, plan digest, original HEAD and target SHA. Require approved plan, creation_checkout provenance, matching canonical repository/worktree ownership, TODO state, no work results or active claim/runner, no PR/provider/effects, no source changes and ancestor-only advancement. Use native locks and existing task persistence. Preserve the owned untracked README and all plan/dependency data. Reject explicit base pins, started work, divergence, dirty source, unknown ownership and stale apply packets. Record recovery identity so interruption after Git advancement is readback-recoverable. Extend existing real-Git worktree tests; do not manually edit the blocked M3 Task or its Git branch."
                    id: "bootstrap-recovery"
                    required: true
                evidence_fingerprint: "sha256:77e40ee68adf2bdb65189f756e9e79cdc1a453d7d3cdac354e8069329c56bc93"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608301851-5W3XW6"
    event_cursor: 0
    final_validation: null
    id: "202608301851-5W3XW6"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:fast"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-30T18:51:50.673Z"
      constraints: []
      request: |-
        Recover unstarted task worktrees pinned before the approved planning baseline

        M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.
      task_id: "202608301851-5W3XW6"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-30T18:53:20.013Z"
    work_items:
      recover-planning-base:
        attempt: 0
        claim_id: null
        id: "recover-planning-base"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "36741ce5160d452ca9660a388241cb4da32f842a"
    version: 1
id_source: "generated"
---
## Summary

Recover unstarted task worktrees pinned before the approved planning baseline

M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.

## Scope

- In scope: M3 Task 202608291006-255K66 has an approved plan captured at 36741ce5160d452ca9660a388241cb4da32f842a but native worktree preparation used creation base 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its dependency Tasks are absent from that old tree, so advance waits forever. Add a bounded native operator recovery for an unstarted task workspace that verifies approved plan identity, exact old/new Git ancestry, clean source state, Task ownership and absence of active runners or provider effects before fast-forwarding to the approved plan baseline. Preserve the Task, plan, dependencies, history and unrelated artifacts. Never auto-reanchor explicitly pinned bases, started work or divergent histories. Test negative guards and the real dependency-after-planning scenario. This is a prerequisite bootstrap recovery within the authorized clean core refactor.
- Out of scope: unrelated refactors not required for "Recover unstarted task worktrees pinned before the approved planning baseline".

## Plan

Plan a bounded native recovery for an unstarted workspace pinned before approved planning.

## Verify Steps

PLANNER fallback scaffold for "Recover unstarted task worktrees pinned before the approved planning baseline". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recover unstarted task worktrees pinned before the approved planning baseline". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
