---
id: "202608281925-J595R5"
title: "Resume required WorkItems before branch pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
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
  state: "ok"
  updated_at: "2026-08-28T20:38:06.851Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
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
commit:
  hash: "b76b10afde865eadfb3a0a1926f1b91d3411fcb3"
  message: "🚧 J595R5 task: apply external agent result"
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
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b76b10afde86. CLI accepted one state-bound external-agent semantic result."
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
  -
    type: "status"
    at: "2026-08-28T20:30:47.313Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b76b10afde86. CLI accepted one state-bound external-agent semantic result."
    commit: "b76b10afde865eadfb3a0a1926f1b91d3411fcb3"
  -
    type: "verify"
    at: "2026-08-28T20:38:06.851Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-28T20:41:05.253Z"
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
    1. Run `bun run ci:local:full` without changing checks, thresholds, exclusions, or the declared verification contract. Expected: build, runtime, docs/schema, core, critical CLI, docs site, workflow lint, platform-critical tests, and significant coverage pass on the final candidate. Record the exact checkout and input; an earlier candidate pass is not current proof.
    2. Run `git diff --check`. Expected: no whitespace errors in the approved changes.
    3. Review the focused required-work route tests. Expected: unfinished required WorkItems precede verification, evaluation, publication, and closure; missing inputs, dependencies, active effects, dirty worktrees, runner ownership, plan approval, and DONE provider freshness remain guarded. Legacy, optional-only, completed, and merged cases retain their route.
    4. Review the real-Git interrupted-effect test. Expected: source and verification persist before the injected interruption; normal continuation recovers the exact original output digest, source SHA, and bytes; repeated continuation preserves them; fresh evaluation precedes pre-merge closure.
    5. Review the evaluator calibration test. Expected: the fixture uses the existing adapter to complete its WorkItem with its required output before evaluation; the positive evidence-gap and negative ordinary-blocked assertions remain intact and preserve that output.
    6. Confirm that the implementation commit actually contains the five scoped source/test files and that the task worktree has no unintended changes. Distinguish local verification, exact-head hosted checks, merge, and confirmed hosted closure. This task check is not release:prepublish.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-28T20:38:06.851Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:134795c74a27965abb7b952f8fa80265b2bca277d1a6c042b7f29a46cbcb39ae, input_digest=sha256:d881aaf8d60b05d219a0d14944e5107f5fa08e4a0a4d74b3518f2a800702f6df

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608281925-J595R5 Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608281925-J595R5 Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608281925-J595R5 Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608281925-J595R5 Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608281925-J595R5 Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608281925-J595R5 Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608281925-J595R5 Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608281925-J595R5-resume-required-workitems-before-branch-pre-merg/.agentplane/tasks/202608281925-J595R5/blueprint/resolved-snapshot.json
    - old_digest: 3762f52078ff9d39702029c5a887c01cde3864a46ca9d510ba50c502b83c10dd
    - current_digest: 3762f52078ff9d39702029c5a887c01cde3864a46ca9d510ba50c502b83c10dd
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608281925-J595R5

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
  Findings: |-
    Implemented the required-work route with the existing WorkItemScheduler and recorded implementation recovery. The real-Git regression preserves the original output digest and source through interruption, repeat continuation, evaluation, and pre-merge closure. DONE recovery now refreshes metadata-only provider state before verification. Existing batch prerequisite logic was extracted unchanged to keep the branch module under the unchanged 600-line limit.

    The supported scope extension added only the evaluator calibration test. Its completed-implementation fixture now records an output-bearing completed WorkItem through TaskCentricBackendAdapter. Neither the positive deterministic-evidence-gap assertion nor the negative ordinary-blocked assertion was removed or weakened.

    Verification: 59 focused tests in five files passed on the final source, together with TypeScript, ESLint, and git diff --check. CLI-owned declared checks at 2026-08-28T20:38 also passed unchanged ci:local:full (436340 ms) and git diff --check. These were executed with the final source still dirty; they are local working-tree proof, not exact committed-source or hosted proof.

    Recovery finding: the earlier blocked-return attempt left task artifacts staged. The implementation commit b76b10afde865eadfb3a0a1926f1b91d3411fcb3 therefore contains only task artifacts, and 6b3c0445c records implementation/verification evidence. The five actual source/test files remained uncommitted. The route correctly blocks on task_worktree_dirty. Preserve those files and the original WorkItem output sha256:ee1164ebc616c11ab1cc11e14833b10fd26ce5f30411b2f5b909fcbd926937fa. Prepare only the intended scoped files in the index at the operator recovery boundary, then let a fresh task_worktree_resolution episode commit and verify them. Do not treat either artifact-only commit as delivered source.

    No J595R5 hosted checks, merge, hosted closure, or release qualification are claimed. DVS5NN/PR #5862 recovery remains downstream of confirmed integration of this fix and a rebuilt main runtime. Keep release 0.7.8 qualification separate from all-Core completion and from this task's full CI.
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
    revision: 11
    schema_version: 1
    updated_at: "2026-08-28T20:38:10.337Z"
    work_items:
      resume-required-work:
        attempt: 1
        claim_id: null
        id: "resume-required-work"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:ee1164ebc616c11ab1cc11e14833b10fd26ce5f30411b2f5b909fcbd926937fa"
            id: "required-work-recovery-proof"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202608281925-J595R5"
              work_item_id: "resume-required-work"
            provenance:
              - "sha256:7636bbef92b0d8ec09cd8b6ce669473f9a89bc86195f4f07b5300939d114d4e8"
              - ".agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:50fd62563f80f0d1e242b04404051b98fad508a71190ad171c0109660f37eb46"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json"
              check_id: "mandatory-checks"
              command_identity: "task.verify"
              detail: "Observed by task.verify."
              exit_code: 0
              observed_at: "2026-08-28T20:38:10.332Z"
              repository_snapshot_digest: "sha256:50fd62563f80f0d1e242b04404051b98fad508a71190ad171c0109660f37eb46"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608281925-J595R5-executor-d2aeac24b3cdc96eb8687d79:
        aggregate_digest: "sha256:1d695ebbc0712228ad67640c2547791b29af1af3c2ae55c5c73720b264c1a382"
        event:
          actor_id: "agentplane"
          at: "2026-08-28T20:38:10.337Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_78ecb8874591bde5a38a2531"
          mutation_id: "external-result:work-order-202608281925-J595R5-executor-d2aeac24b3cdc96eb8687d79"
          plan_digest: "sha256:b399fe110ca7c842a320c876fce80c3350c72c393de9daf2ec53e315b7db1e34"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608281925-J595R5"
          task_revision: 10
          to: "COMPLETED"
          work_item_id: "resume-required-work"
        mutation_id: "external-result:work-order-202608281925-J595R5-executor-d2aeac24b3cdc96eb8687d79"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202608281925-J595R5"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "b76b10afde865eadfb3a0a1926f1b91d3411fcb3"
  task_execution_context:
    base_ref: "main"
    base_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
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

1. Run `bun run ci:local:full` without changing checks, thresholds, exclusions, or the declared verification contract. Expected: build, runtime, docs/schema, core, critical CLI, docs site, workflow lint, platform-critical tests, and significant coverage pass on the final candidate. Record the exact checkout and input; an earlier candidate pass is not current proof.
2. Run `git diff --check`. Expected: no whitespace errors in the approved changes.
3. Review the focused required-work route tests. Expected: unfinished required WorkItems precede verification, evaluation, publication, and closure; missing inputs, dependencies, active effects, dirty worktrees, runner ownership, plan approval, and DONE provider freshness remain guarded. Legacy, optional-only, completed, and merged cases retain their route.
4. Review the real-Git interrupted-effect test. Expected: source and verification persist before the injected interruption; normal continuation recovers the exact original output digest, source SHA, and bytes; repeated continuation preserves them; fresh evaluation precedes pre-merge closure.
5. Review the evaluator calibration test. Expected: the fixture uses the existing adapter to complete its WorkItem with its required output before evaluation; the positive evidence-gap and negative ordinary-blocked assertions remain intact and preserve that output.
6. Confirm that the implementation commit actually contains the five scoped source/test files and that the task worktree has no unintended changes. Distinguish local verification, exact-head hosted checks, merge, and confirmed hosted closure. This task check is not release:prepublish.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-28T20:38:06.851Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:134795c74a27965abb7b952f8fa80265b2bca277d1a6c042b7f29a46cbcb39ae, input_digest=sha256:d881aaf8d60b05d219a0d14944e5107f5fa08e4a0a4d74b3518f2a800702f6df

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608281925-J595R5 Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608281925-J595R5 Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608281925-J595R5 Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608281925-J595R5 Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608281925-J595R5 Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608281925-J595R5 Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608281925-J595R5/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608281925-J595R5 Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608281925-J595R5-resume-required-workitems-before-branch-pre-merg/.agentplane/tasks/202608281925-J595R5/blueprint/resolved-snapshot.json
- old_digest: 3762f52078ff9d39702029c5a887c01cde3864a46ca9d510ba50c502b83c10dd
- current_digest: 3762f52078ff9d39702029c5a887c01cde3864a46ca9d510ba50c502b83c10dd
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608281925-J595R5

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

Implemented the required-work route with the existing WorkItemScheduler and recorded implementation recovery. The real-Git regression preserves the original output digest and source through interruption, repeat continuation, evaluation, and pre-merge closure. DONE recovery now refreshes metadata-only provider state before verification. Existing batch prerequisite logic was extracted unchanged to keep the branch module under the unchanged 600-line limit.

The supported scope extension added only the evaluator calibration test. Its completed-implementation fixture now records an output-bearing completed WorkItem through TaskCentricBackendAdapter. Neither the positive deterministic-evidence-gap assertion nor the negative ordinary-blocked assertion was removed or weakened.

Verification: 59 focused tests in five files passed on the final source, together with TypeScript, ESLint, and git diff --check. CLI-owned declared checks at 2026-08-28T20:38 also passed unchanged ci:local:full (436340 ms) and git diff --check. These were executed with the final source still dirty; they are local working-tree proof, not exact committed-source or hosted proof.

Recovery finding: the earlier blocked-return attempt left task artifacts staged. The implementation commit b76b10afde865eadfb3a0a1926f1b91d3411fcb3 therefore contains only task artifacts, and 6b3c0445c records implementation/verification evidence. The five actual source/test files remained uncommitted. The route correctly blocks on task_worktree_dirty. Preserve those files and the original WorkItem output sha256:ee1164ebc616c11ab1cc11e14833b10fd26ce5f30411b2f5b909fcbd926937fa. Prepare only the intended scoped files in the index at the operator recovery boundary, then let a fresh task_worktree_resolution episode commit and verify them. Do not treat either artifact-only commit as delivered source.

No J595R5 hosted checks, merge, hosted closure, or release qualification are claimed. DVS5NN/PR #5862 recovery remains downstream of confirmed integration of this fix and a rebuilt main runtime. Keep release 0.7.8 qualification separate from all-Core completion and from this task's full CI.
