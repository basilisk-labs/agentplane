---
id: "202608281925-J595R5"
title: "Resume required WorkItems before branch pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tests"
  - "release-blocker"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-28T20:00:10.160Z"
  updated_by: "USER"
  note: "USER explicitly approved plan_digest sha256:ba48113acb192e2e4520c7d52312f66819a1df3521b92f5b93d74f03fe77019b at state_fingerprint sha256:c2a1d3666de75287d29afe5e2aaf38c1b5067d8963ea7731ce4cd48dc7a0abab in the current conversation. Both values were re-read and match. Record as manual operator approval, without inventing host decision provenance."
verification:
  state: "pending"
  updated_at: "2026-08-28T20:18:32.624Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 0
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
    allowed_external_effects: []
    allowed_repository_effects:
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
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.required-work.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-required-work.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-required-work.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Fix the observed release integration path through one isolated task worktree."
      - "Reuse existing canonical scheduling and immutable implementation recovery. Do not change completion or release authority."
      - "USER-approved blocked-result scope extension: roots=packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts; repository_effects=tests"
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.required-work.test.ts"
      - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-required-work.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-required-work.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.required-work.test.ts"
          - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-required-work.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-required-work.ts"
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
      digest: "sha256:eb880a722684c0af0083875e35e52f82455d0246339acadbd32c7191770237ee"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.required-work.test.ts"
        - "central_component:packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-branch.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-required-work.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-required-work.ts"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The required-work route and exact-output interrupted recovery implementation passed focused tests, but full CI exposed one evaluator calibration fixture outside the approved writable roots. Preserve its semantic assertions and authorize a narrow fixture correction before completion. Recommended action: Extend this task's writable roots by the exact evaluator calibration test file. Preserve the approved objective and all verification requirements. Prepare a completed WorkItem with its required output and assert that state before the existing positive/negative evaluation routing checks. Restore the preserved in-scope patch in a fresh episode and rerun focused tests and unchanged bun run ci:local:full. Requested scope: roots=packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts; repository effects=tests; request digest=sha256:839be54a6093dcbe0486a4e962309ff374e3c0c8f6e495017a40706db3ba099e. Agentplane receipt: external-agent-blocker/tr_5f0f490743fd146d7a4c9ea41e772e34/sha256:e856073ad309db7b3555d00954b7b248b3d990f7b8d7493579963cb8cefc34d0/sha256:839be54a6093dcbe0486a4e962309ff374e3c0c8f6e495017a40706db3ba099e."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts; repository effects: tests."
events:
  -
    type: "status"
    at: "2026-08-28T20:00:19.332Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-28T20:18:07.711Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The required-work route and exact-output interrupted recovery implementation passed focused tests, but full CI exposed one evaluator calibration fixture outside the approved writable roots. Preserve its semantic assertions and authorize a narrow fixture correction before completion. Recommended action: Extend this task's writable roots by the exact evaluator calibration test file. Preserve the approved objective and all verification requirements. Prepare a completed WorkItem with its required output and assert that state before the existing positive/negative evaluation routing checks. Restore the preserved in-scope patch in a fresh episode and rerun focused tests and unchanged bun run ci:local:full. Requested scope: roots=packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts; repository effects=tests; request digest=sha256:839be54a6093dcbe0486a4e962309ff374e3c0c8f6e495017a40706db3ba099e. Agentplane receipt: external-agent-blocker/tr_5f0f490743fd146d7a4c9ea41e772e34/sha256:e856073ad309db7b3555d00954b7b248b3d990f7b8d7493579963cb8cefc34d0/sha256:839be54a6093dcbe0486a4e962309ff374e3c0c8f6e495017a40706db3ba099e."
doc_version: 3
doc_updated_at: "2026-08-28T20:18:07.711Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the reproduced release-integration blocker in DVS5NN/PR #5862 on main 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its approved required remove-obsolete-handoff-reader WorkItem is READY with no outputs, while the concrete b577984d implementation and successful verification exist. After supported reopening and fresh evaluator acceptance the route offers task.pre_merge_close; finish rejects required_work_item_incomplete. flow repair has no deterministic repair. Route unfinished required WorkItems through the existing implementation/recovery episode before quality/publication/closure, with no fabricated source delta and no direct task-state edits. Cover the complete scenario: persisted implementation effect, interruption before WorkItem completion, normal restart, exact recovery of the original typed output, repeat restart, required verification/evaluation, and the following closure transition. Preserve completed WorkItem outputs, plan/checkout/authority freshness, dirty-worktree and active-runner guards, and already merged hosted-close/cleanup behavior. Use the existing canonical WorkItem scheduler and recorded implementation recovery; do not introduce another scheduler or state store. Do not weaken checks, completion guards or approvals; do not change release/Core order. Scope the smallest route/supervisor adapters and regression tests through a structured plan; request a supported scope extension only if reproduction proves more is required. USER authorized all necessary in-scope operations through release 0.7.8; this is an integration-path blocker, not a new architecture program."
sections:
  Summary: |-
    Resume required WorkItems before branch pre-merge closure

    Fix the reproduced release-integration blocker in DVS5NN/PR #5862 on main 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its approved required remove-obsolete-handoff-reader WorkItem is READY with no outputs, while the concrete b577984d implementation and successful verification exist. After supported reopening and fresh evaluator acceptance the route offers task.pre_merge_close; finish rejects required_work_item_incomplete. flow repair has no deterministic repair. Route unfinished required WorkItems through the existing implementation/recovery episode before quality/publication/closure, with no fabricated source delta and no direct task-state edits. Cover the complete scenario: persisted implementation effect, interruption before WorkItem completion, normal restart, exact recovery of the original typed output, repeat restart, required verification/evaluation, and the following closure transition. Preserve completed WorkItem outputs, plan/checkout/authority freshness, dirty-worktree and active-runner guards, and already merged hosted-close/cleanup behavior. Use the existing canonical WorkItem scheduler and recorded implementation recovery; do not introduce another scheduler or state store. Do not weaken checks, completion guards or approvals; do not change release/Core order. Scope the smallest route/supervisor adapters and regression tests through a structured plan; request a supported scope extension only if reproduction proves more is required. USER authorized all necessary in-scope operations through release 0.7.8; this is an integration-path blocker, not a new architecture program.
  Scope: |-
    - In scope: Fix the reproduced release-integration blocker in DVS5NN/PR #5862 on main 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its approved required remove-obsolete-handoff-reader WorkItem is READY with no outputs, while the concrete b577984d implementation and successful verification exist. After supported reopening and fresh evaluator acceptance the route offers task.pre_merge_close; finish rejects required_work_item_incomplete. flow repair has no deterministic repair. Route unfinished required WorkItems through the existing implementation/recovery episode before quality/publication/closure, with no fabricated source delta and no direct task-state edits. Cover the complete scenario: persisted implementation effect, interruption before WorkItem completion, normal restart, exact recovery of the original typed output, repeat restart, required verification/evaluation, and the following closure transition. Preserve completed WorkItem outputs, plan/checkout/authority freshness, dirty-worktree and active-runner guards, and already merged hosted-close/cleanup behavior. Use the existing canonical WorkItem scheduler and recorded implementation recovery; do not introduce another scheduler or state store. Do not weaken checks, completion guards or approvals; do not change release/Core order. Scope the smallest route/supervisor adapters and regression tests through a structured plan; request a supported scope extension only if reproduction proves more is required. USER authorized all necessary in-scope operations through release 0.7.8; this is an integration-path blocker, not a new architecture program.
    - Out of scope: unrelated refactors not required for "Resume required WorkItems before branch pre-merge closure".
  Plan: "One bounded WorkItem restores the required-work route before closure and proves interrupted implementation recovery end to end using existing scheduler and result recovery."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:98b58bfcf3f65cd3e207cc6cd933d7dfd1ba45916d65249eda44c16fdb84b4df"
    grant_id: "3a08d18b-8fe1-4bd7-8099-11b3cbd5e8fd"
    issued_at: "2026-08-28T20:00:10.160Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:7fce362fbd7711c876731ed76b0ab8bc316c58a0d71bb07826340419697bfd10"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608281925-J595R5"
  agentplane.scope_extension_request:
    applied_at: "2026-08-28T20:18:32.624Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:e856073ad309db7b3555d00954b7b248b3d990f7b8d7493579963cb8cefc34d0"
    kind: "task_scope_extension_request"
    request:
      rationale: "The required-work route intentionally prevents verification/evaluation from skipping unfinished canonical work. Full CI proved that one evaluator calibration fixture claims completed implementation but only materializes a READY required WorkItem. Correct that fixture, retain both semantic route assertions, and keep mandatory full CI unchanged."
      repository_effects:
        - "tests"
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
    request_digest: "sha256:839be54a6093dcbe0486a4e962309ff374e3c0c8f6e495017a40706db3ba099e"
    schema_version: 1
    status: "applied"
    transition_id: "tr_5f0f490743fd146d7a4c9ea41e772e34"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-28T20:18:32.624Z"
        approved_by: "USER"
        approved_digest: "sha256:b399fe110ca7c842a320c876fce80c3350c72c393de9daf2ec53e315b7db1e34"
        policy_facts:
          - "state_bound_scope_extension:sha256:839be54a6093dcbe0486a4e962309ff374e3c0c8f6e495017a40706db3ba099e"
        state: "approved"
      created_at: "2026-08-28T20:18:32.624Z"
      digest: "sha256:b399fe110ca7c842a320c876fce80c3350c72c393de9daf2ec53e315b7db1e34"
      proposal:
        assumptions:
          - "Existing canonical WorkItem scheduling and recorded implementation recovery are sufficient once the route selects the correct semantic episode. If a proof requires changing those adapters, report a bounded extension before editing."
          - "DONE branch recovery applies only to an unmerged task branch with fresh hosted state. Merged closure and cleanup stay separate."
          - "The DVS5NN source patch and typed output must be preserved rather than manufactured again."
        planning_baseline:
          captured_at: "2026-08-28T19:25:51.276Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:390b399f062763bcf50a9e95c908e876e976a9f38710439d06ce8a748bf971a8"
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
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608270848-0RAFH9/README.md"
            - ".agentplane/tasks/202608270848-37XB2K/README.md"
            - ".agentplane/tasks/202608270848-N28TBB/README.md"
            - ".agentplane/tasks/202608270848-V32542/README.md"
            - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
            - ".agentplane/tasks/202608281925-J595R5/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608281925-J595R5"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              id: "mandatory-checks"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "mandatory-checks"
              description: "A branch task with a required unfinished canonical WorkItem must not route directly to verification, quality, publication or pre-merge closure because an old implementation commit or pass record exists. Use the existing scheduler and implementation episode. Preserve pending dependencies, missing inputs and active work as non-mutable boundaries."
              id: "route-required-work"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "A real-Git interrupted implementation with a persisted source commit and an immutable original semantic result resumes through task advance, restores the original typed WorkItem output exactly, reruns required checks and reaches fresh evaluation and the next closure transition. Repeated continuation must not reimplement code or overwrite completed output."
              id: "recover-interrupted-output"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Preserve task/plan/checkout/authority freshness, required completion guards, active-runner and dirty-worktree priority, legacy tasks without a canonical plan, optional-only remaining work and already merged hosted-close/cleanup behavior. Do not invent an additional scheduler, state store or approval bypass."
              id: "preserve-guards"
              required: true
            -
              check_ids:
                - "mandatory-checks"
              description: "Run focused route and real-Git recovery suites, unchanged bun run ci:local:full, and git diff --check. Record the reproduced cause and distinguish local proof, exact-head hosted checks, integration and release qualification."
              id: "verification"
              required: true
          evidence_fingerprint: "sha256:390b399f062763bcf50a9e95c908e876e976a9f38710439d06ce8a748bf971a8"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "A branch task with a required unfinished canonical WorkItem must not route directly to verification, quality, publication or pre-merge closure because an old implementation commit or pass record exists. Use the existing scheduler and implementation episode. Preserve pending dependencies, missing inputs and active work as non-mutable boundaries."
                  id: "route-required-work"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "A real-Git interrupted implementation with a persisted source commit and an immutable original semantic result resumes through task advance, restores the original typed WorkItem output exactly, reruns required checks and reaches fresh evaluation and the next closure transition. Repeated continuation must not reimplement code or overwrite completed output."
                  id: "recover-interrupted-output"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Preserve task/plan/checkout/authority freshness, required completion guards, active-runner and dirty-worktree priority, legacy tasks without a canonical plan, optional-only remaining work and already merged hosted-close/cleanup behavior. Do not invent an additional scheduler, state store or approval bypass."
                  id: "preserve-guards"
                  required: true
                -
                  check_ids:
                    - "mandatory-checks"
                  description: "Run focused route and real-Git recovery suites, unchanged bun run ci:local:full, and git diff --check. Record the reproduced cause and distinguish local proof, exact-head hosted checks, integration and release qualification."
                  id: "verification"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/commands/shared/workflow-step.testkit.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
                  - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                  - "packages/agentplane/src/commands/task/finish-shared.ts"
                  - "packages/core/src/tasks/task-centric/graph.ts"
                symbol_hints:
                  - "branchStep"
                  - "doneBranchStep"
                  - "WorkItemScheduler"
                  - "resolveRecordedImplementationRecovery"
              depends_on: []
              expected_outputs:
                - "required-work-recovery-proof"
              id: "resume-required-work"
              objective: "Route unfinished required branch WorkItems through existing implementation recovery before closure, and prove the entire interrupted-effect, exact-output, repeat-run and following-transition scenario."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "workspace"
                  mode: "write"
                  resource: "."
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.task-advance.required-work.test.ts"
                - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-required-work.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-required-work.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    id: "mandatory-checks"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "A branch task with a required unfinished canonical WorkItem must not route directly to verification, quality, publication or pre-merge closure because an old implementation commit or pass record exists. Use the existing scheduler and implementation episode. Preserve pending dependencies, missing inputs and active work as non-mutable boundaries."
                    id: "route-required-work"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "A real-Git interrupted implementation with a persisted source commit and an immutable original semantic result resumes through task advance, restores the original typed WorkItem output exactly, reruns required checks and reaches fresh evaluation and the next closure transition. Repeated continuation must not reimplement code or overwrite completed output."
                    id: "recover-interrupted-output"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Preserve task/plan/checkout/authority freshness, required completion guards, active-runner and dirty-worktree priority, legacy tasks without a canonical plan, optional-only remaining work and already merged hosted-close/cleanup behavior. Do not invent an additional scheduler, state store or approval bypass."
                    id: "preserve-guards"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Run focused route and real-Git recovery suites, unchanged bun run ci:local:full, and git diff --check. Record the reproduced cause and distinguish local proof, exact-head hosted checks, integration and release qualification."
                    id: "verification"
                    required: true
                evidence_fingerprint: "sha256:390b399f062763bcf50a9e95c908e876e976a9f38710439d06ce8a748bf971a8"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202608281925-J595R5"
    event_cursor: 1
    final_validation: null
    id: "202608281925-J595R5"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "git diff --check"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-28T19:25:29.843Z"
      constraints: []
      request: |-
        Resume required WorkItems before branch pre-merge closure

        Fix the reproduced release-integration blocker in DVS5NN/PR #5862 on main 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its approved required remove-obsolete-handoff-reader WorkItem is READY with no outputs, while the concrete b577984d implementation and successful verification exist. After supported reopening and fresh evaluator acceptance the route offers task.pre_merge_close; finish rejects required_work_item_incomplete. flow repair has no deterministic repair. Route unfinished required WorkItems through the existing implementation/recovery episode before quality/publication/closure, with no fabricated source delta and no direct task-state edits. Cover the complete scenario: persisted implementation effect, interruption before WorkItem completion, normal restart, exact recovery of the original typed output, repeat restart, required verification/evaluation, and the following closure transition. Preserve completed WorkItem outputs, plan/checkout/authority freshness, dirty-worktree and active-runner guards, and already merged hosted-close/cleanup behavior. Use the existing canonical WorkItem scheduler and recorded implementation recovery; do not introduce another scheduler or state store. Do not weaken checks, completion guards or approvals; do not change release/Core order. Scope the smallest route/supervisor adapters and regression tests through a structured plan; request a supported scope extension only if reproduction proves more is required. USER authorized all necessary in-scope operations through release 0.7.8; this is an integration-path blocker, not a new architecture program.
      task_id: "202608281925-J595R5"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-28T20:00:10.160Z"
          approved_by: "USER"
          approved_digest: "sha256:ba48113acb192e2e4520c7d52312f66819a1df3521b92f5b93d74f03fe77019b"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-28T19:28:10.215Z"
        digest: "sha256:ba48113acb192e2e4520c7d52312f66819a1df3521b92f5b93d74f03fe77019b"
        proposal:
          assumptions:
            - "Existing canonical WorkItem scheduling and recorded implementation recovery are sufficient once the route selects the correct semantic episode. If a proof requires changing those adapters, report a bounded extension before editing."
            - "DONE branch recovery applies only to an unmerged task branch with fresh hosted state. Merged closure and cleanup stay separate."
            - "The DVS5NN source patch and typed output must be preserved rather than manufactured again."
          planning_baseline:
            captured_at: "2026-08-28T19:25:51.276Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:390b399f062763bcf50a9e95c908e876e976a9f38710439d06ce8a748bf971a8"
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
              - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
              - ".agentplane/tasks/202608270848-0RAFH9/README.md"
              - ".agentplane/tasks/202608270848-37XB2K/README.md"
              - ".agentplane/tasks/202608270848-N28TBB/README.md"
              - ".agentplane/tasks/202608270848-V32542/README.md"
              - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
              - ".agentplane/tasks/202608281925-J595R5/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202608281925-J595R5"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                id: "mandatory-checks"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "mandatory-checks"
                description: "A branch task with a required unfinished canonical WorkItem must not route directly to verification, quality, publication or pre-merge closure because an old implementation commit or pass record exists. Use the existing scheduler and implementation episode. Preserve pending dependencies, missing inputs and active work as non-mutable boundaries."
                id: "route-required-work"
                required: true
              -
                check_ids:
                  - "mandatory-checks"
                description: "A real-Git interrupted implementation with a persisted source commit and an immutable original semantic result resumes through task advance, restores the original typed WorkItem output exactly, reruns required checks and reaches fresh evaluation and the next closure transition. Repeated continuation must not reimplement code or overwrite completed output."
                id: "recover-interrupted-output"
                required: true
              -
                check_ids:
                  - "mandatory-checks"
                description: "Preserve task/plan/checkout/authority freshness, required completion guards, active-runner and dirty-worktree priority, legacy tasks without a canonical plan, optional-only remaining work and already merged hosted-close/cleanup behavior. Do not invent an additional scheduler, state store or approval bypass."
                id: "preserve-guards"
                required: true
              -
                check_ids:
                  - "mandatory-checks"
                description: "Run focused route and real-Git recovery suites, unchanged bun run ci:local:full, and git diff --check. Record the reproduced cause and distinguish local proof, exact-head hosted checks, integration and release qualification."
                id: "verification"
                required: true
            evidence_fingerprint: "sha256:390b399f062763bcf50a9e95c908e876e976a9f38710439d06ce8a748bf971a8"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "A branch task with a required unfinished canonical WorkItem must not route directly to verification, quality, publication or pre-merge closure because an old implementation commit or pass record exists. Use the existing scheduler and implementation episode. Preserve pending dependencies, missing inputs and active work as non-mutable boundaries."
                    id: "route-required-work"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "A real-Git interrupted implementation with a persisted source commit and an immutable original semantic result resumes through task advance, restores the original typed WorkItem output exactly, reruns required checks and reaches fresh evaluation and the next closure transition. Repeated continuation must not reimplement code or overwrite completed output."
                    id: "recover-interrupted-output"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Preserve task/plan/checkout/authority freshness, required completion guards, active-runner and dirty-worktree priority, legacy tasks without a canonical plan, optional-only remaining work and already merged hosted-close/cleanup behavior. Do not invent an additional scheduler, state store or approval bypass."
                    id: "preserve-guards"
                    required: true
                  -
                    check_ids:
                      - "mandatory-checks"
                    description: "Run focused route and real-Git recovery suites, unchanged bun run ci:local:full, and git diff --check. Record the reproduced cause and distinguish local proof, exact-head hosted checks, integration and release qualification."
                    id: "verification"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 180000
                  optional_sources:
                    - "packages/agentplane/src/commands/shared/workflow-step.testkit.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                    - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                    - "packages/agentplane/src/runner/usecases/agent-work-order-build.ts"
                    - "packages/agentplane/src/commands/task/external-agent-implementation-recovery.ts"
                    - "packages/agentplane/src/commands/task/finish-shared.ts"
                    - "packages/core/src/tasks/task-centric/graph.ts"
                  symbol_hints:
                    - "branchStep"
                    - "doneBranchStep"
                    - "WorkItemScheduler"
                    - "resolveRecordedImplementationRecovery"
                depends_on: []
                expected_outputs:
                  - "required-work-recovery-proof"
                id: "resume-required-work"
                objective: "Route unfinished required branch WorkItems through existing implementation recovery before closure, and prove the entire interrupted-effect, exact-output, repeat-run and following-transition scenario."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "workspace"
                    mode: "write"
                    resource: "."
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-required-work.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-required-work.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.required-work.test.ts"
                  - "packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      id: "mandatory-checks"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "mandatory-checks"
                      description: "A branch task with a required unfinished canonical WorkItem must not route directly to verification, quality, publication or pre-merge closure because an old implementation commit or pass record exists. Use the existing scheduler and implementation episode. Preserve pending dependencies, missing inputs and active work as non-mutable boundaries."
                      id: "route-required-work"
                      required: true
                    -
                      check_ids:
                        - "mandatory-checks"
                      description: "A real-Git interrupted implementation with a persisted source commit and an immutable original semantic result resumes through task advance, restores the original typed WorkItem output exactly, reruns required checks and reaches fresh evaluation and the next closure transition. Repeated continuation must not reimplement code or overwrite completed output."
                      id: "recover-interrupted-output"
                      required: true
                    -
                      check_ids:
                        - "mandatory-checks"
                      description: "Preserve task/plan/checkout/authority freshness, required completion guards, active-runner and dirty-worktree priority, legacy tasks without a canonical plan, optional-only remaining work and already merged hosted-close/cleanup behavior. Do not invent an additional scheduler, state store or approval bypass."
                      id: "preserve-guards"
                      required: true
                    -
                      check_ids:
                        - "mandatory-checks"
                      description: "Run focused route and real-Git recovery suites, unchanged bun run ci:local:full, and git diff --check. Record the reproduced cause and distinguish local proof, exact-head hosted checks, integration and release qualification."
                      id: "verification"
                      required: true
                  evidence_fingerprint: "sha256:390b399f062763bcf50a9e95c908e876e976a9f38710439d06ce8a748bf971a8"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608281925-J595R5"
    revision: 3
    schema_version: 1
    updated_at: "2026-08-28T20:18:32.624Z"
    work_items:
      resume-required-work:
        attempt: 0
        claim_id: null
        id: "resume-required-work"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    version: 1
id_source: "generated"
---
## Summary

Resume required WorkItems before branch pre-merge closure

Fix the reproduced release-integration blocker in DVS5NN/PR #5862 on main 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its approved required remove-obsolete-handoff-reader WorkItem is READY with no outputs, while the concrete b577984d implementation and successful verification exist. After supported reopening and fresh evaluator acceptance the route offers task.pre_merge_close; finish rejects required_work_item_incomplete. flow repair has no deterministic repair. Route unfinished required WorkItems through the existing implementation/recovery episode before quality/publication/closure, with no fabricated source delta and no direct task-state edits. Cover the complete scenario: persisted implementation effect, interruption before WorkItem completion, normal restart, exact recovery of the original typed output, repeat restart, required verification/evaluation, and the following closure transition. Preserve completed WorkItem outputs, plan/checkout/authority freshness, dirty-worktree and active-runner guards, and already merged hosted-close/cleanup behavior. Use the existing canonical WorkItem scheduler and recorded implementation recovery; do not introduce another scheduler or state store. Do not weaken checks, completion guards or approvals; do not change release/Core order. Scope the smallest route/supervisor adapters and regression tests through a structured plan; request a supported scope extension only if reproduction proves more is required. USER authorized all necessary in-scope operations through release 0.7.8; this is an integration-path blocker, not a new architecture program.

## Scope

- In scope: Fix the reproduced release-integration blocker in DVS5NN/PR #5862 on main 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its approved required remove-obsolete-handoff-reader WorkItem is READY with no outputs, while the concrete b577984d implementation and successful verification exist. After supported reopening and fresh evaluator acceptance the route offers task.pre_merge_close; finish rejects required_work_item_incomplete. flow repair has no deterministic repair. Route unfinished required WorkItems through the existing implementation/recovery episode before quality/publication/closure, with no fabricated source delta and no direct task-state edits. Cover the complete scenario: persisted implementation effect, interruption before WorkItem completion, normal restart, exact recovery of the original typed output, repeat restart, required verification/evaluation, and the following closure transition. Preserve completed WorkItem outputs, plan/checkout/authority freshness, dirty-worktree and active-runner guards, and already merged hosted-close/cleanup behavior. Use the existing canonical WorkItem scheduler and recorded implementation recovery; do not introduce another scheduler or state store. Do not weaken checks, completion guards or approvals; do not change release/Core order. Scope the smallest route/supervisor adapters and regression tests through a structured plan; request a supported scope extension only if reproduction proves more is required. USER authorized all necessary in-scope operations through release 0.7.8; this is an integration-path blocker, not a new architecture program.
- Out of scope: unrelated refactors not required for "Resume required WorkItems before branch pre-merge closure".

## Plan

One bounded WorkItem restores the required-work route before closure and proves interrupted implementation recovery end to end using existing scheduler and result recovery.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run ci:local:full`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
