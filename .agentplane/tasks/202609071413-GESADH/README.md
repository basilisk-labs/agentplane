---
id: "202609071413-GESADH"
title: "Repair evaluator review identity for interleaved task artifact commits in GitHub issue #5892"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T14:17:14.209Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:3d026da3db1ac74a38f5ad7a304b703a182234a59b9657f5f0764b4b4909c357"
verification:
  state: "ok"
  updated_at: "2026-09-07T14:55:56.024Z"
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
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
      - "packages/agentplane/src/commands/task/finish-quality.ts"
      - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Repair issue #5892 in isolated task worktree with focused direct regression and branch_pr preservation."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
      - "packages/agentplane/src/commands/task/finish-quality.ts"
      - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
      - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
      - "packages/agentplane/src/commands/shared/quality-review-target.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
          - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
          - "packages/agentplane/src/commands/shared/quality-review-target.ts"
          - "packages/agentplane/src/commands/task/finish-quality.ts"
          - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
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
      digest: "sha256:8ae39b6e221321b881c8f7fd565846d6f03d0921c3186227bbd328b3be171e7b"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/quality-review-target.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/quality-review-target.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/quality-review-target.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/quality-review-target.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
          - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
          - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
          - "packages/agentplane/src/commands/shared/quality-review-target.ts"
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
  hash: "1bb30cf8640ca2cf7aea27469b11f0ff9cd159b6"
  message: "🚧 GESADH task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 265e3c4ac88e. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 1bb30cf8640c. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-07T14:17:20.026Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-07T14:25:26.467Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 265e3c4ac88e. CLI accepted one state-bound external-agent semantic result."
    commit: "265e3c4ac88eece4c99b3d203653b93e93849180"
  -
    type: "verify"
    at: "2026-09-07T14:36:40.801Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework required: GitHub verify-contract failed because new direct regressions pushed two existing test files over the oversized-test budget. Move the direct cases to the already approved direct-closeout suite and rerun the unchanged declared checks."
  -
    type: "status"
    at: "2026-09-07T14:38:36.666Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 1bb30cf8640c. CLI accepted one state-bound external-agent semantic result."
    commit: "1bb30cf8640ca2cf7aea27469b11f0ff9cd159b6"
  -
    type: "verify"
    at: "2026-09-07T14:55:56.024Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-09-07T14:55:57.511Z"
doc_updated_by: "SUPERVISOR"
description: "User approved testing and sequential fixes for the seven audited open GitHub issues, with issue comments and closure after verified resolution. Handle issue #5892 first. Reproduce a verified direct task A evaluated while HEAD contains only task B artifacts. Define a coherent reviewed SHA contract, prevent a recorded passing review with missing identity, preserve implementation versus review snapshot semantics, and cover evaluator to normal finish behavior without force or fabricated commits. Preserve unrelated work. Other issues remain follow-up work; do not expand this implementation to them."
sections:
  Summary: |-
    Repair evaluator review identity for interleaved task artifact commits in GitHub issue #5892

    User approved testing and sequential fixes for the seven audited open GitHub issues, with issue comments and closure after verified resolution. Handle issue #5892 first. Reproduce a verified direct task A evaluated while HEAD contains only task B artifacts. Define a coherent reviewed SHA contract, prevent a recorded passing review with missing identity, preserve implementation versus review snapshot semantics, and cover evaluator to normal finish behavior without force or fabricated commits. Preserve unrelated work. Other issues remain follow-up work; do not expand this implementation to them.
  Scope: |-
    - In scope: User approved testing and sequential fixes for the seven audited open GitHub issues, with issue comments and closure after verified resolution. Handle issue #5892 first. Reproduce a verified direct task A evaluated while HEAD contains only task B artifacts. Define a coherent reviewed SHA contract, prevent a recorded passing review with missing identity, preserve implementation versus review snapshot semantics, and cover evaluator to normal finish behavior without force or fabricated commits. Preserve unrelated work. Other issues remain follow-up work; do not expand this implementation to them.
    - Out of scope: unrelated refactors not required for "Repair evaluator review identity for interleaved task artifact commits in GitHub issue #5892".
  Plan: "Plan one bounded implementation WorkItem for direct review SHA identity in issue #5892. Existing target, evaluator, and finish suites pass 66 tests. Add the missing exact direct reproduction before implementation."
  Verify Steps: |-
    1. Run `bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1`. Expected: all tests pass, including direct first review and repeated review across A/B artifacts, rejection of pass without SHA, and normal finish with a clean tracked tree.
    2. Run `bun run typecheck`. Expected: TypeScript build passes.
    3. Review the scoped diff. Expected: branch_pr target selection remains unchanged and no unrelated implementation changes are present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-07T14:36:40.801Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework required: GitHub verify-contract failed because new direct regressions pushed two existing test files over the oversized-test budget. Move the direct cases to the already approved direct-closeout suite and rerun the unchanged declared checks.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67c3bdd6046ae8c73d982ef9fef0b85e48aa3241791be3adb79ac959d570c323, input_digest=sha256:b3bab0b7958fe848d9663d6f00f341249c296a41866f2506853c329b9b9b4449

    Details:

    Command: GitHub Actions verify-contract, run 34132922617, job 101777228343
    Result: fail
    Evidence: oversized test baseline rejects evaluator-run.command.test.ts at 1001 lines and quality-review-target.test.ts at 1035 lines; budget count 12 exceeds 10.
    Scope: issue #5892 test placement; no acceptance or implementation behavior change.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071413-GESADH-repair-evaluator-review-identity-for-interleaved/.agentplane/tasks/202609071413-GESADH/blueprint/resolved-snapshot.json
    - old_digest: 9944f672d9708d6b4936c7da58449fc763ffad14a26e683fb913ec0c355befdc
    - current_digest: 9944f672d9708d6b4936c7da58449fc763ffad14a26e683fb913ec0c355befdc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609071413-GESADH

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609071413-GESADH
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-07T14:55:56.024Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67c3bdd6046ae8c73d982ef9fef0b85e48aa3241791be3adb79ac959d570c323, input_digest=sha256:7b5d2e10f3c2efa58d64a7d425f8a1425100b956f7046811de5f9854088d3096

    Details:

    Check: affected_unit_integration
    Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071413-GESADH Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071413-GESADH Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071413-GESADH Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071413-GESADH Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071413-GESADH Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071413-GESADH Verification Contract check critical_paths (3/3)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071413-GESADH Verification Contract check full_regression

    Check: task_outcome
    Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609071413-GESADH Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609071413-GESADH Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609071413-GESADH Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071413-GESADH-repair-evaluator-review-identity-for-interleaved/.agentplane/tasks/202609071413-GESADH/blueprint/resolved-snapshot.json
    - old_digest: 9944f672d9708d6b4936c7da58449fc763ffad14a26e683fb913ec0c355befdc
    - current_digest: 9944f672d9708d6b4936c7da58449fc763ffad14a26e683fb913ec0c355befdc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609071413-GESADH

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609071413-GESADH
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
    actor: "HOST:local:USER"
    approval_evidence_digest: "sha256:3d026da3db1ac74a38f5ad7a304b703a182234a59b9657f5f0764b4b4909c357"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:ecce932345b79fc90a8d8b175d289a8020bdfc46d0781bae139a56ab8140e0d9"
    grant_id: "6bffe882-01f0-49eb-bd1e-45d0ec7dc41a"
    issued_at: "2026-09-07T14:17:14.209Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:446fcd6794d1fad6d18dbd7939d30100da5eba9d2c52e5ccc32751cd380d4c0b"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609071413-GESADH"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-07T14:17:14.209Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-07T14:15:48.361Z"
      digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
      proposal:
        assumptions:
          - "Handle one issue at a time. Keep the other six audited issues as follow-up work."
          - "Do not change branch_pr unrelated-history semantics merely to fix direct workflow."
          - "Issue comments and closure are authorized by the user but occur only outside semantic episodes after verified resolution. No release or publication work is included."
        planning_baseline:
          captured_at: "2026-09-07T14:13:36.332Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:3a5c8b031c4de2683adda54aa5f161aa02e69755f70182ef733dae5369fc24da"
          dirty_paths:
            - ".agentplane/tasks/202609071412-9Q9KQN/README.md"
            - ".agentplane/tasks/202609071413-GESADH/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "2639130b3181867f53fa37121783c67c9ef1d064"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609071413-GESADH"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1"
              id: "review-regression"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
          criteria:
            -
              check_ids:
                - "review-regression"
              description: "A verified direct task A remains reviewable when HEAD contains only task B artifacts. Cover first review, prior reviewed SHA, and interleaved A/B metadata. Never bind the review to an unrelated task commit."
              id: "interleaved-direct"
              required: true
            -
              check_ids:
                - "review-regression"
                - "typecheck"
              description: "Evaluator returns an explicit non-null reviewed identity for committed direct work and normal closeout accepts matching evidence after generated evaluator artifacts are committed. Missing or unrelated implementation identity fails with an actionable diagnostic instead of a successful unusable review. Preserve branch_pr freshness and commit versus implementation-commit contracts."
              id: "review-closeout"
              required: true
          evidence_fingerprint: "sha256:8f8b89f6c1919cabb903ec024509d51b1eb1e760b59f7f3d4958f1f83ec737f6"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "review-regression"
                  description: "A verified direct task A remains reviewable when HEAD contains only task B artifacts. Cover first review, prior reviewed SHA, and interleaved A/B metadata. Never bind the review to an unrelated task commit."
                  id: "interleaved-direct"
                  required: true
                -
                  check_ids:
                    - "review-regression"
                    - "typecheck"
                  description: "Evaluator returns an explicit non-null reviewed identity for committed direct work and normal closeout accepts matching evidence after generated evaluator artifacts are committed. Missing or unrelated implementation identity fails with an actionable diagnostic instead of a successful unusable review. Preserve branch_pr freshness and commit versus implementation-commit contracts."
                  id: "review-closeout"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources:
                  - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
                  - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
                  - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                  - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
                  - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
                  - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
                symbol_hints:
                  - "resolveQualityReviewTargetSha"
                  - "resolveEvaluatorReviewTarget"
              depends_on: []
              expected_outputs:
                - "verified-direct-review-identity-fix"
              id: "repair-direct-review-identity"
              objective: "Reproduce issue #5892 with a direct-mode regression. Repair the narrowest shared target or evaluator boundary required for consistent review and normal finish. Run the declared checks and return exact evidence."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/quality-review-target.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/finish-quality.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/quality-review-target.ts"
                - "packages/agentplane/src/commands/shared/quality-review-target.test.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-qualification-review.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-review-apply.ts"
                - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
                - "packages/agentplane/src/commands/task/finish-quality.ts"
                - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1"
                    id: "review-regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "review-regression"
                    description: "A verified direct task A remains reviewable when HEAD contains only task B artifacts. Cover first review, prior reviewed SHA, and interleaved A/B metadata. Never bind the review to an unrelated task commit."
                    id: "interleaved-direct"
                    required: true
                  -
                    check_ids:
                      - "review-regression"
                      - "typecheck"
                    description: "Evaluator returns an explicit non-null reviewed identity for committed direct work and normal closeout accepts matching evidence after generated evaluator artifacts are committed. Missing or unrelated implementation identity fails with an actionable diagnostic instead of a successful unusable review. Preserve branch_pr freshness and commit versus implementation-commit contracts."
                    id: "review-closeout"
                    required: true
                evidence_fingerprint: "sha256:8f8b89f6c1919cabb903ec024509d51b1eb1e760b59f7f3d4958f1f83ec737f6"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609071413-GESADH"
    event_cursor: 9
    final_validation: null
    id: "202609071413-GESADH"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-07T14:13:30.650Z"
      constraints: []
      request: |-
        Repair evaluator review identity for interleaved task artifact commits in GitHub issue #5892

        User approved testing and sequential fixes for the seven audited open GitHub issues, with issue comments and closure after verified resolution. Handle issue #5892 first. Reproduce a verified direct task A evaluated while HEAD contains only task B artifacts. Define a coherent reviewed SHA contract, prevent a recorded passing review with missing identity, preserve implementation versus review snapshot semantics, and cover evaluator to normal finish behavior without force or fabricated commits. Preserve unrelated work. Other issues remain follow-up work; do not expand this implementation to them.
      task_id: "202609071413-GESADH"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 12
    schema_version: 1
    updated_at: "2026-09-07T14:55:57.508Z"
    work_items:
      repair-direct-review-identity:
        attempt: 1
        claim_id: null
        id: "repair-direct-review-identity"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:6aee8011815eb9fb9cfa10294ce57340e99dbe69fb5fa5d839625c9b7e9a620c"
            id: "verified-direct-review-identity-fix"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609071413-GESADH"
              work_item_id: "repair-direct-review-identity"
            provenance:
              - "sha256:688c7b24b7a5fe1d3eb07f65cb5ce6fb02334096d0dbbda45d0b3f233f58dbc1"
              - ".agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:7736ee86da490260aa2ece2a5b942b45fa932612b159b805b257d34c7f333a0d"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json"
              check_id: "review-regression"
              command_identity: "bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1"
              detail: "Observed by bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-07T14:25:51.950Z"
              repository_snapshot_digest: "sha256:7736ee86da490260aa2ece2a5b942b45fa932612b159b805b257d34c7f333a0d"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-09-07T14:25:51.950Z"
              repository_snapshot_digest: "sha256:7736ee86da490260aa2ece2a5b942b45fa932612b159b805b257d34c7f333a0d"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-07T14:25:51.955Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:31df8b2478a61f7ae2829bd4794100130aedcfb728514036552ebeefc79c6881"
        entity: "work_item"
        id: "event_a03949a87cd1aeec712382d4"
        mutation_id: "external-result:work-order-202609071413-GESADH-executor-0028400ba307f872c411d738"
        plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609071413-GESADH"
        task_revision: 6
        work_item_id: "repair-direct-review-identity"
    leases: []
    mutation_receipts:
      compatibility:sha256:1d1c3661dfc5ed14d2e1352ef9febe1f0cffd8314b4bdfce13c76c8b86bbe6c7:
        aggregate_digest: "sha256:4165e3bb6d79e7cff5d4d75257f1d5809b017c375a911618417da5c5f6151a1f"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:38:36.666Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_57522ed92876c9a81c7ec781"
          mutation_id: "compatibility:sha256:1d1c3661dfc5ed14d2e1352ef9febe1f0cffd8314b4bdfce13c76c8b86bbe6c7"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:1d1c3661dfc5ed14d2e1352ef9febe1f0cffd8314b4bdfce13c76c8b86bbe6c7"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609071413-GESADH"
      compatibility:sha256:23007fda337d0309e15e23691824720df181fb118d8ca881412c955fe092b975:
        aggregate_digest: "sha256:5261792de9cda48391282182412d3c07f08ead10b63c9c915df388bed3cfea43"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:55:57.508Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c0e0f0cb6c1bcb32988b6748"
          mutation_id: "compatibility:sha256:23007fda337d0309e15e23691824720df181fb118d8ca881412c955fe092b975"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:23007fda337d0309e15e23691824720df181fb118d8ca881412c955fe092b975"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609071413-GESADH"
      compatibility:sha256:31d932c3a09c6ac34438cf8ae6127a84d6030ed7c39184f33a5f824be1993584:
        aggregate_digest: "sha256:a7d573eb77f7be424f3593ae47e781c82f9d2c8c5c2eff52559e4cff34c29c6d"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:36:41.952Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_6e571afee1710bc067a3d0ed"
          mutation_id: "compatibility:sha256:31d932c3a09c6ac34438cf8ae6127a84d6030ed7c39184f33a5f824be1993584"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:31d932c3a09c6ac34438cf8ae6127a84d6030ed7c39184f33a5f824be1993584"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609071413-GESADH"
      compatibility:sha256:35c821056c2a50b20cc91072640b9979284a38771b7db07e57ae13d7a3d02254:
        aggregate_digest: "sha256:f9b3333886fe965363a6701f7f11f73e63c0f62cbe552159abdefd58bf702b5e"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:25:26.467Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_15747149105db6162430785a"
          mutation_id: "compatibility:sha256:35c821056c2a50b20cc91072640b9979284a38771b7db07e57ae13d7a3d02254"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:35c821056c2a50b20cc91072640b9979284a38771b7db07e57ae13d7a3d02254"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609071413-GESADH"
      compatibility:sha256:8c57be334e5e2b8174edf07efdf187ce4ffa9131245fdc9e31a66f1e5ee37e4b:
        aggregate_digest: "sha256:35eeac2a637488f083f198eaaa0d4380bcd80660bab1e70e19476e30561a32af"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:38:36.666Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_966ad40c54e0a7c2c6825ba9"
          mutation_id: "compatibility:sha256:8c57be334e5e2b8174edf07efdf187ce4ffa9131245fdc9e31a66f1e5ee37e4b"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8c57be334e5e2b8174edf07efdf187ce4ffa9131245fdc9e31a66f1e5ee37e4b"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609071413-GESADH"
      compatibility:sha256:b20b73aaf0dae49b9167ffa95de0e430b338502df14702a513bde3bfb66c68cb:
        aggregate_digest: "sha256:66f506b04f1bda10eb9befdc6ff73b2b0b2d8bfd01ea8368f2a8931e7d77b9be"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:25:26.467Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_fa1665711434d4c970e700a0"
          mutation_id: "compatibility:sha256:b20b73aaf0dae49b9167ffa95de0e430b338502df14702a513bde3bfb66c68cb"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b20b73aaf0dae49b9167ffa95de0e430b338502df14702a513bde3bfb66c68cb"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609071413-GESADH"
      compatibility:sha256:b5b7e3f4dcec91a7368cec2e26255d8ab7a7a5fb07c02ed97edca70019dfa18e:
        aggregate_digest: "sha256:5885aa4a41770bf810b46b9619e8f90a67af859c36e1d688b23822b064bedba8"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:17:20.026Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ba9017734b821e6fd033f3cf"
          mutation_id: "compatibility:sha256:b5b7e3f4dcec91a7368cec2e26255d8ab7a7a5fb07c02ed97edca70019dfa18e"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b5b7e3f4dcec91a7368cec2e26255d8ab7a7a5fb07c02ed97edca70019dfa18e"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609071413-GESADH"
      compatibility:sha256:e2e17b96c6e41d9e819f4b2d7e8672b6c7ab93de022a8d1b60595de8f9d62822:
        aggregate_digest: "sha256:4fe6d8c90c342b95276eaea2e55b896f5ef97f81cd8c2619873bbb0e6f92b7cc"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:15:48.364Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_fe683ad64e022c92ed6f9e8f"
          mutation_id: "compatibility:sha256:e2e17b96c6e41d9e819f4b2d7e8672b6c7ab93de022a8d1b60595de8f9d62822"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 2
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e2e17b96c6e41d9e819f4b2d7e8672b6c7ab93de022a8d1b60595de8f9d62822"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609071413-GESADH"
      compatibility:sha256:e45d62746e0120baa1d843f7856b83697d050e7a6e2603004b48e619c803f9b4:
        aggregate_digest: "sha256:26d4d5b4380a2db2b0d85a2ae4266143d28b57779708a0a2ed1ff0cdba9506c9"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:35:44.429Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_97c2c2f25c7b308ebfda3d05"
          mutation_id: "compatibility:sha256:e45d62746e0120baa1d843f7856b83697d050e7a6e2603004b48e619c803f9b4"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e45d62746e0120baa1d843f7856b83697d050e7a6e2603004b48e619c803f9b4"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609071413-GESADH"
      external-result:work-order-202609071413-GESADH-executor-0028400ba307f872c411d738:
        aggregate_digest: "sha256:586f1148074346179a6deed59a0829ef877de1cffb7f47f8e732c41e34aefeae"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T14:25:51.955Z"
          cause_refs:
            - "semantic-result:sha256:31df8b2478a61f7ae2829bd4794100130aedcfb728514036552ebeefc79c6881"
          entity: "work_item"
          from: "READY"
          id: "event_a03949a87cd1aeec712382d4"
          mutation_id: "external-result:work-order-202609071413-GESADH-executor-0028400ba307f872c411d738"
          plan_digest: "sha256:d46cc4b9a3333b97d69187c212e29f935e7aa1eab746ff593ea2055814085716"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071413-GESADH"
          task_revision: 6
          to: "COMPLETED"
          work_item_id: "repair-direct-review-identity"
        mutation_id: "external-result:work-order-202609071413-GESADH-executor-0028400ba307f872c411d738"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609071413-GESADH"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "1bb30cf8640ca2cf7aea27469b11f0ff9cd159b6"
  task_execution_context:
    base_ref: "main"
    base_sha: "2639130b3181867f53fa37121783c67c9ef1d064"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "2639130b3181867f53fa37121783c67c9ef1d064"
    version: 1
id_source: "generated"
---
## Summary

Repair evaluator review identity for interleaved task artifact commits in GitHub issue #5892

User approved testing and sequential fixes for the seven audited open GitHub issues, with issue comments and closure after verified resolution. Handle issue #5892 first. Reproduce a verified direct task A evaluated while HEAD contains only task B artifacts. Define a coherent reviewed SHA contract, prevent a recorded passing review with missing identity, preserve implementation versus review snapshot semantics, and cover evaluator to normal finish behavior without force or fabricated commits. Preserve unrelated work. Other issues remain follow-up work; do not expand this implementation to them.

## Scope

- In scope: User approved testing and sequential fixes for the seven audited open GitHub issues, with issue comments and closure after verified resolution. Handle issue #5892 first. Reproduce a verified direct task A evaluated while HEAD contains only task B artifacts. Define a coherent reviewed SHA contract, prevent a recorded passing review with missing identity, preserve implementation versus review snapshot semantics, and cover evaluator to normal finish behavior without force or fabricated commits. Preserve unrelated work. Other issues remain follow-up work; do not expand this implementation to them.
- Out of scope: unrelated refactors not required for "Repair evaluator review identity for interleaved task artifact commits in GitHub issue #5892".

## Plan

Plan one bounded implementation WorkItem for direct review SHA identity in issue #5892. Existing target, evaluator, and finish suites pass 66 tests. Add the missing exact direct reproduction before implementation.

## Verify Steps

1. Run `bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1`. Expected: all tests pass, including direct first review and repeated review across A/B artifacts, rejection of pass without SHA, and normal finish with a clean tracked tree.
2. Run `bun run typecheck`. Expected: TypeScript build passes.
3. Review the scoped diff. Expected: branch_pr target selection remains unchanged and no unrelated implementation changes are present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-07T14:36:40.801Z — VERIFY — needs_rework

By: TESTER

Note: Rework required: GitHub verify-contract failed because new direct regressions pushed two existing test files over the oversized-test budget. Move the direct cases to the already approved direct-closeout suite and rerun the unchanged declared checks.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67c3bdd6046ae8c73d982ef9fef0b85e48aa3241791be3adb79ac959d570c323, input_digest=sha256:b3bab0b7958fe848d9663d6f00f341249c296a41866f2506853c329b9b9b4449

Details:

Command: GitHub Actions verify-contract, run 34132922617, job 101777228343
Result: fail
Evidence: oversized test baseline rejects evaluator-run.command.test.ts at 1001 lines and quality-review-target.test.ts at 1035 lines; budget count 12 exceeds 10.
Scope: issue #5892 test placement; no acceptance or implementation behavior change.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071413-GESADH-repair-evaluator-review-identity-for-interleaved/.agentplane/tasks/202609071413-GESADH/blueprint/resolved-snapshot.json
- old_digest: 9944f672d9708d6b4936c7da58449fc763ffad14a26e683fb913ec0c355befdc
- current_digest: 9944f672d9708d6b4936c7da58449fc763ffad14a26e683fb913ec0c355befdc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609071413-GESADH

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609071413-GESADH
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-07T14:55:56.024Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:67c3bdd6046ae8c73d982ef9fef0b85e48aa3241791be3adb79ac959d570c323, input_digest=sha256:7b5d2e10f3c2efa58d64a7d425f8a1425100b956f7046811de5f9854088d3096

Details:

Check: affected_unit_integration
Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071413-GESADH Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071413-GESADH Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071413-GESADH Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071413-GESADH Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071413-GESADH Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071413-GESADH Verification Contract check critical_paths (3/3)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071413-GESADH Verification Contract check full_regression

Check: task_outcome
Command: bunx --no-install vitest run packages/agentplane/src/commands/shared/quality-review-target.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609071413-GESADH Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609071413-GESADH Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609071413-GESADH/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609071413-GESADH Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609071413-GESADH-repair-evaluator-review-identity-for-interleaved/.agentplane/tasks/202609071413-GESADH/blueprint/resolved-snapshot.json
- old_digest: 9944f672d9708d6b4936c7da58449fc763ffad14a26e683fb913ec0c355befdc
- current_digest: 9944f672d9708d6b4936c7da58449fc763ffad14a26e683fb913ec0c355befdc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609071413-GESADH

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609071413-GESADH
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
