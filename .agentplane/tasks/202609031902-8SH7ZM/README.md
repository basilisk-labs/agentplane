---
id: "202609031902-8SH7ZM"
title: "Repair plan-amendment Verify Steps projection routing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 25
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lifecycle"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "bun run lifecycle:invariants"
  - "bun run lint:core"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-03T19:33:02.545Z"
  updated_by: "HOST:codex:USER"
  note: "host_user_decision=sha256:cedcb4b2170ae36f6151c5513c204e75f95eae7fdb479c8346e8bec5c5cb1f28"
verification:
  state: "ok"
  updated_at: "2026-09-03T20:40:36.948Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-03T20:41:27.138Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 4 typed finding(s)."
  evaluated_sha: "7395512128320b38054c39ddb8446da03cc35993"
  blueprint_digest: "987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86"
  evidence_refs:
    - ".agentplane/tasks/202609031902-8SH7ZM/quality/20260903-204044384-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202609031902-8SH7ZM/quality/20260903-204044384-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609031902-8SH7ZM/quality/objects/sha256/ed7c186b4b3a83120632c50719d5f4a9a3c0c1988220466d7bec2a4bed60f788.md"
    - ".agentplane/tasks/202609031902-8SH7ZM/quality/20260903-204044384-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609031902-8SH7ZM/quality/20260903-204044384-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202609031902-8SH7ZM/quality/20260903-204044384-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202609031902-8SH7ZM/README.md"
    - ".agentplane/tasks/202609031902-8SH7ZM/quality/objects/sha256/a3eca24d85f9e9f4a1caf893ad7e5ef844644c9c098d99e399c9c17e216146a3.patch"
    - ".agentplane/tasks/202609031902-8SH7ZM/quality/objects/sha256/f621f3ad1ba858d9e5755c7e8fd1fcff462858fc88f1c1833c7ca50bf2ff4949.json"
    - ".agentplane/tasks/202609031902-8SH7ZM/verification/20260903204036948-97f04bc02c7b04f6.json"
    - ".agentplane/tasks/202609031902-8SH7ZM/quality/objects/sha256/34d93b299b7f6aeb06593326a7d00f9e329c15c8fe759c0d4bca0cbb97b53d11.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The authoritative Verify Steps section contains only the five approved task-specific gates and no fallback scaffold."
    - "The clarification is durably recorded as a plan amendment, and this evaluator packet has a fresh state fingerprint after that transition."
    - "Atomic projection, idempotent replay, provider-bound packet replacement, owner routing, and full local verification are covered by passing evidence."
    - "The implementation does not broaden ordinary EXECUTOR authority and does not touch release, dependency, workflow, policy, security-boundary, or MPXQBK scope."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
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
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-centric"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch_pr worktree isolates the recovery and permits hosted integration after local verification."
      - "No release metadata, dependency, publication, credential, or destructive Git effect is required."
      - "The correction changes central lifecycle persistence and routing behavior and requires regression tests in the existing task-centric and route suites."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks/task-centric"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
      - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
      - "packages/agentplane/src/adapters/task-backend/task-centric-verification-projection.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
      - "packages/agentplane/src/commands/shared/route-decision-verification.ts"
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
        id: "recorded-check-18"
        result: "pass"
      -
        id: "recorded-check-19"
        result: "pass"
      -
        id: "recorded-check-2"
        result: "pass"
      -
        id: "recorded-check-20"
        result: "pass"
      -
        id: "recorded-check-21"
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
  reason_codes:
    - "agent_preferred_branch_pr"
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
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks/task-centric"
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
          reversibility: "recovery_required"
      digest: "sha256:186bfc63f2ac3171b4a6e730a7639a3034ff4d14ceac432952d8a53e8a917c2d"
      escalation_reasons:
        - "central_component:packages/core/src/tasks/task-centric"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-verification.ts"
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
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
          - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
          - "packages/agentplane/src/adapters/task-backend/task-centric-verification-projection.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
          - "packages/agentplane/src/commands/shared/route-decision-verification.ts"
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
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "7395512128320b38054c39ddb8446da03cc35993"
  message: "🚧 8SH7ZM task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 57487e09cfbd. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: b3e8d65e05a1. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 5888c0e9e952. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 739551212832. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-03T19:09:23.398Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-03T19:17:55.058Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 57487e09cfbd. CLI accepted one state-bound external-agent semantic result."
    commit: "57487e09cfbd905e2dda2e16dd240905367ddb1d"
  -
    type: "status"
    at: "2026-09-03T19:33:10.894Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-09-03T19:33:39.803Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-03T19:35:11.639Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: b3e8d65e05a1. CLI accepted one state-bound external-agent semantic result."
    commit: "b3e8d65e05a17f47b45b1bdbc364c8cd97fedd60"
  -
    type: "status"
    at: "2026-09-03T19:51:02.855Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 5888c0e9e952. CLI accepted one state-bound external-agent semantic result."
    commit: "5888c0e9e9529164181c1429197e76bab8aeded2"
  -
    type: "status"
    at: "2026-09-03T20:11:21.876Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 739551212832. CLI accepted one state-bound external-agent semantic result."
    commit: "7395512128320b38054c39ddb8446da03cc35993"
  -
    type: "verify"
    at: "2026-09-03T20:29:46.053Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "verify"
    at: "2026-09-03T20:40:36.948Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-09-03T20:40:38.314Z"
doc_updated_by: "SUPERVISOR"
description: "Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope."
sections:
  Summary: |-
    Repair plan-amendment Verify Steps projection routing

    Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.
  Scope: |-
    - In scope: Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.
    - Out of scope: unrelated refactors not required for "Repair plan-amendment Verify Steps projection routing".
  Plan: "Refined the three-stage recovery plan so every WorkItem validation command is an exact declared Task check, while preserving commit 57487e09cfbd905e2dda2e16dd240905367ddb1d and assigning the stale CLI fixture correction only to the WorkItem that already owns packages/agentplane/src/cli."
  Verify Steps: |-
    1. Run `bun run lint:core`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.
    2. Run `bun run typecheck`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.
    4. Run `bun run lifecycle:invariants`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.
    5. Run `bun run ci:local:full`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-03T19:33:39.803Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e5760cbcb744625659d15e314a6b7fcbe83138c978c561d51d27e780214877f8, input_digest=sha256:9ced16bc821c58b1aaa61bde540ff01d8d44498398c77acf8c2688938b6e117c

    Details:

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609031902-8SH7ZM-repair-plan-amendment-verify-steps-projection-ro/.agentplane/tasks/202609031902-8SH7ZM/blueprint/resolved-snapshot.json
    - old_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
    - current_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609031902-8SH7ZM

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609031902-8SH7ZM
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-03T20:29:46.053Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e5760cbcb744625659d15e314a6b7fcbe83138c978c561d51d27e780214877f8, input_digest=sha256:3b74568f3e5e4b762d4274637636aefd2bbd97e14c7dfb457b468b2e4942a4c1

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609031902-8SH7ZM-repair-plan-amendment-verify-steps-projection-ro/.agentplane/tasks/202609031902-8SH7ZM/blueprint/resolved-snapshot.json
    - old_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
    - current_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609031902-8SH7ZM

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609031902-8SH7ZM
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-09-03T20:40:36.948Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a6ca9f7772ca7d5c568f5bd0c236aa1cd6e3ff846ae3c0d7f2051f66fd0c464d, input_digest=sha256:caae3f04debfe5f954c6ca0833bb5a6f21634897f1d7a82a14b17831bdef7504

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (1/5)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (2/5)

    Check: affected_unit_integration
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (3/5)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (4/5)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (5/5)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (1/5)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (2/5)

    Check: critical_paths
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (3/5)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (4/5)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (5/5)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check full_regression

    Check: real_e2e
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (1/5)

    Check: real_e2e
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (2/5)

    Check: real_e2e
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (3/5)

    Check: real_e2e
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (4/5)

    Check: real_e2e
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (5/5)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (1/5)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (2/5)

    Check: task_outcome
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (3/5)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (4/5)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (5/5)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609031902-8SH7ZM-repair-plan-amendment-verify-steps-projection-ro/.agentplane/tasks/202609031902-8SH7ZM/blueprint/resolved-snapshot.json
    - old_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
    - current_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609031902-8SH7ZM

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609031902-8SH7ZM
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
    approval_evidence_digest: "sha256:cedcb4b2170ae36f6151c5513c204e75f95eae7fdb479c8346e8bec5c5cb1f28"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:4805140edda15a9847fd70af854cc7bc0b39b8d9baa6bdd18e912159a55b189a"
    grant_id: "7e8c0dd9-8a5e-4695-8ce2-76b56f9ca63a"
    issued_at: "2026-09-03T19:33:02.545Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:855af62bfc83062e8784b8ebc088a3c0930a925ebc7e9d46b979f38d6fab9b13"
    plan_revision: 8
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:db3e90d13fc84277fa70e6738f1e0d1cd502b35ac0cd39bffc1eb2a32226ef30"
    status: "active"
    task_id: "202609031902-8SH7ZM"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-03T19:33:02.545Z"
        approved_by: "HOST:codex:USER"
        approved_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-03T19:20:35.226Z"
      digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
      proposal:
        assumptions:
          - "The native task backend remains the sole owner of task README projection writes."
          - "Commit 57487e09cfbd905e2dda2e16dd240905367ddb1d is preserved as recovery implementation evidence."
          - "The provider-digest authority comparison added on main remains fail-closed; only stale fixtures are corrected."
          - "Full local CI executes the focused test files named in the recovery task context."
        planning_baseline:
          captured_at: "2026-09-03T19:18:43.340Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
          dirty_paths:
            - ".agentplane/tasks/202609031902-8SH7ZM/README.md"
            - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
            - ".agentplane/tasks/202609031902-8SH7ZM/supervision/implementation-evidence.json"
          git:
            kind: "commit"
            ref: null
            sha: "57487e09cfbd905e2dda2e16dd240905367ddb1d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:7"
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "lint-core"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "routing-policy"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "lifecycle-invariants"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-local-ci"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "lint-core"
                - "typecheck"
                - "routing-policy"
                - "lifecycle-invariants"
                - "full-local-ci"
              description: "The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact."
              id: "recovery-outcome"
              required: true
          evidence_fingerprint: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "typecheck"
                  description: "A clarification amendment replaces only a fallback Verify Steps section from the approved top-level validation and persists the aggregate, document projection, attribution, event, and receipt in one revision-guarded write."
                  id: "amendment-projection-atomic"
                  required: true
                -
                  check_ids:
                    - "typecheck"
                  description: "Replaying the same amendment receipt performs no second write and returns the durable result before expected-revision rejection."
                  id: "amendment-replay-idempotent"
                  required: true
                -
                  check_ids:
                    - "typecheck"
                  description: "Ordinary EXECUTOR authority still excludes .agentplane/tasks; only AgentPlane-owned persistence updates the protected projection."
                  id: "executor-authority-closed"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources:
                  - "packages/core/src/tasks/task-centric/policy.ts"
                required_sources:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                symbol_hints:
                  - "recordPlanRefinement"
                  - "verificationAmendmentProjection"
                  - "taskSpecificVerifySteps"
              depends_on: []
              expected_outputs:
                - "artifact:verification-amendment-projection"
              id: "materialize-verification-amendment"
              objective: "Complete focused in-scope regression coverage for the committed atomic amendment and Verify Steps projection implementation, preserving receipt-first replay and protected task-document ownership."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/task"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "typecheck"
                    description: "Typecheck the atomic projection implementation and its focused regression."
                    id: "amendment-projection-atomic"
                    required: true
                  -
                    check_ids:
                      - "typecheck"
                    description: "Typecheck receipt-first idempotent replay."
                    id: "amendment-replay-idempotent"
                    required: true
                  -
                    check_ids:
                      - "typecheck"
                    description: "Typecheck the AgentPlane-owned projection boundary without widening EXECUTOR roots."
                    id: "executor-authority-closed"
                    required: true
                evidence_fingerprint: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "lint-core"
                  description: "Evidence-rework fixtures that change pr/meta.json request a fresh packet instead of reusing stale provider-bound authority."
                  id: "fresh-packet-after-provider-change"
                  required: true
                -
                  check_ids:
                    - "lint-core"
                  description: "A verification-document defect does not emit code-only implementation_rework; the projection owner repairs it before fresh evaluation."
                  id: "correct-owner-routing"
                  required: true
                -
                  check_ids:
                    - "lint-core"
                  description: "Evaluator and prepared-context artifacts issued before the projection transition cannot be accepted as current afterward."
                  id: "stale-review-invalidated"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 163840
                optional_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                  - "packages/agentplane/src/commands/task/external-agent-plan-refinement.ts"
                symbol_hints:
                  - "implementationReworkStep"
                  - "assertExternalImplementationReturnState"
                  - "isExternalPlanRefinementApplied"
              depends_on:
                - "materialize-verification-amendment"
              expected_outputs:
                - "artifact:document-rework-routing"
              id: "route-document-rework"
              objective: "Correct the stale evidence-rework fixtures without weakening provider fingerprint checks, invalidate obsolete evaluator/context projections after document repair, and route verification-document rework to its owner before a fresh EVALUATOR packet."
              optional: false
              priority: 2
              required_inputs:
                - "artifact:verification-amendment-projection"
              resource_claims:
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
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "lint-core"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "lint-core"
                    description: "Lint the corrected fresh-packet fixture path."
                    id: "fresh-packet-after-provider-change"
                    required: true
                  -
                    check_ids:
                      - "lint-core"
                    description: "Lint the role-routing correction."
                    id: "correct-owner-routing"
                    required: true
                  -
                    check_ids:
                      - "lint-core"
                    description: "Lint stale evaluator/context invalidation logic."
                    id: "stale-review-invalidated"
                    required: true
                evidence_fingerprint: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "full-local-ci"
                  description: "Focused suites cover amendment projection, replay, authority closure, stale-packet invalidation, owner routing, and repeated-loop convergence."
                  id: "focused-recovery-regressions"
                  required: true
                -
                  check_ids:
                    - "lint-core"
                    - "typecheck"
                    - "routing-policy"
                    - "lifecycle-invariants"
                    - "full-local-ci"
                  description: "Every declared local repository gate succeeds with no release, dependency, publication, workflow, policy, or security-boundary drift."
                  id: "all-repository-gates"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 196608
                optional_sources:
                  - "package.json"
                  - ".agentplane/policy/check-routing.mjs"
                required_sources:
                  - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.test.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
                symbol_hints:
                  - "plan refinement"
                  - "Verify Steps"
                  - "implementation_rework_required"
              depends_on:
                - "route-document-rework"
              expected_outputs:
                - "artifact:verified-recovery-invariants"
              id: "prove-recovery-invariants"
              objective: "Run focused recovery regressions and the complete declared lint, typecheck, routing, lifecycle, and local-CI contract, then leave hosted integration to AgentPlane."
              optional: false
              priority: 3
              required_inputs:
                - "artifact:document-rework-routing"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
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
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-centric"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/cli"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "lint-core"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "routing-policy"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "lifecycle-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-local-ci"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "full-local-ci"
                    description: "Full CI includes and passes the focused recovery regressions."
                    id: "focused-recovery-regressions"
                    required: true
                  -
                    check_ids:
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "lifecycle-invariants"
                      - "full-local-ci"
                    description: "All declared task verification commands pass."
                    id: "all-repository-gates"
                    required: true
                evidence_fingerprint: "sha256:f3fbfd103afdaab1efad97b6119e39b37611be435e54665d551447a66ab53ccd"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609031902-8SH7ZM"
    event_cursor: 12
    final_validation: null
    id: "202609031902-8SH7ZM"
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
          description: "bun run lint:core"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-5"
          required: true
      captured_at: "2026-09-03T19:02:26.269Z"
      constraints: []
      request: |-
        Repair plan-amendment Verify Steps projection routing

        Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.
      task_id: "202609031902-8SH7ZM"
    lifecycle: "ACTIVE"
    plan_amendments:
      -
        actor_id: "external:EXECUTOR"
        created_at: "2026-09-03T20:31:45.466Z"
        digest: "sha256:89e409b82a1fbb4a0feb0b65a42c1a4b16d93a4bc358d128ce11509632a0a50b"
        id: "amendment_89e409b82a1fbb4a0feb0b65"
        plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
        plan_revision: 2
        refinement:
          acceptance_changed: false
          architecture_constraints_changed: false
          dependencies_changed: false
          description: "Project the approved task-specific validation contract into the authoritative Verify Steps section and remove the fallback scaffold."
          external_effects_added: []
          operations:
            - "clarify"
          outputs_added: []
          risk_changed: false
          scope_roots_added: []
        schema_version: 1
    plan_history:
      -
        approval:
          approved_at: "2026-09-03T19:09:13.806Z"
          approved_by: "HOST:codex:USER"
          approved_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-03T19:07:03.762Z"
        digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
        proposal:
          assumptions:
            - "The existing native backend remains the authoritative owner for task README projection writes."
            - "The accepted non-material amendment carries enough task-specific verification text to replace the fallback scaffold without synthesizing new acceptance requirements."
            - "Existing task-centric receipt and revision checks remain the idempotency and concurrency boundary."
          planning_baseline:
            captured_at: "2026-09-03T19:03:17.243Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
            dirty_paths:
              - ".agentplane/tasks/202609031902-8SH7ZM/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "65625c1a19230dd1ca73e87f31a1b975c5363b54"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
                id: "focused-recovery-suite"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "lint-core"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "lifecycle-invariants"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-recovery-suite"
                  - "lint-core"
                  - "typecheck"
                  - "routing-policy"
                  - "lifecycle-invariants"
                  - "full-local-ci"
                description: "The recovery eliminates the impossible plan-amendment/evaluator loop while preserving authority closure and quality gates."
                id: "task-outcome"
                required: true
            evidence_fingerprint: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-amendment-projection"
                    description: "A non-material task-specific verification amendment persists once and replaces the fallback Verify Steps projection in the same guarded transition; replay returns the same authoritative state."
                    id: "amendment-projection-atomic"
                    required: true
                  -
                    check_ids:
                      - "focused-amendment-projection"
                    description: "The implementation keeps .agentplane/tasks outside ordinary EXECUTOR writable roots and uses the AgentPlane-owned persistence boundary for the document projection."
                    id: "executor-authority-unchanged"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 131072
                  optional_sources:
                    - "packages/agentplane/src/commands/task/shared/workflow-transition-service.ts"
                  required_sources:
                    - "packages/core/src/tasks/task-centric/policy.ts"
                    - "packages/agentplane/src/adapters/task-backend/task-centric-backend-adapter.ts"
                    - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                    - "packages/agentplane/src/commands/task/external-agent-plan-refinement.ts"
                  symbol_hints:
                    - "applyPlanRefinement"
                    - "recordPlanRefinement"
                    - "applyExternalPlanRefinement"
                depends_on: []
                expected_outputs:
                  - "artifact:verification-amendment-projection"
                id: "materialize-verification-amendment"
                objective: "Make accepted task-specific verification refinements atomically update both the task-centric amendment aggregate and the authoritative task-document Verify Steps projection while preserving replay safety."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-centric"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/task"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                      id: "focused-amendment-projection"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-amendment-projection"
                      description: "Verify atomic amendment and Verify Steps projection persistence, authority closure, and replay idempotency."
                      id: "amendment-projection-atomic"
                      required: true
                    -
                      check_ids:
                        - "focused-amendment-projection"
                      description: "Verify protected task documents remain outside ordinary EXECUTOR writable authority."
                      id: "executor-authority-unchanged"
                      required: true
                  evidence_fingerprint: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-routing-convergence"
                    description: "A verification-document defect no longer emits code-only agent.implementation_rework; the authoritative projection is repaired by its owner and the next review uses a fresh packet and context fingerprint."
                    id: "correct-owner-routing"
                    required: true
                  -
                    check_ids:
                      - "focused-routing-convergence"
                    description: "The previously persisted evaluator/context projection cannot be replayed as current after the amendment transition."
                    id: "stale-review-invalidated"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 131072
                  optional_sources:
                    - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
                    - "packages/agentplane/src/commands/task/kernel-exchange.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/workflow-step-branch.ts"
                    - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                    - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
                    - "packages/agentplane/src/commands/task/external-agent-plan-refinement.ts"
                  symbol_hints:
                    - "implementationReworkStep"
                    - "executeProductionBranchEpisode"
                    - "isExternalPlanRefinementApplied"
                depends_on:
                  - "materialize-verification-amendment"
                expected_outputs:
                  - "artifact:document-rework-routing"
                id: "route-document-rework"
                objective: "Invalidate stale evaluator and prepared-context projections after a verification amendment and route remaining document-level rework to PLANNER or the AgentPlane-owned projection owner before issuing a fresh EVALUATOR packet."
                optional: false
                priority: 2
                required_inputs:
                  - "artifact:verification-amendment-projection"
                resource_claims:
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
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                      id: "focused-routing-convergence"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-routing-convergence"
                      description: "Verify document-level rework is routed to its owning role instead of code-only implementation rework."
                      id: "correct-owner-routing"
                      required: true
                    -
                      check_ids:
                        - "focused-routing-convergence"
                      description: "Verify stale evaluator and prepared-context projections are invalidated before a fresh review packet."
                      id: "stale-review-invalidated"
                      required: true
                  evidence_fingerprint: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-recovery-suite"
                    description: "Focused tests prove amendment persistence, Verify Steps projection, stale-packet invalidation, authority closure, role routing, replay idempotency, and repeated-loop convergence."
                    id: "focused-regressions-pass"
                    required: true
                  -
                    check_ids:
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "lifecycle-invariants"
                      - "full-local-ci"
                    description: "All declared repository checks pass without weakening gates or changing release, dependency, publication, workflow, or policy scope."
                    id: "repository-gates-pass"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 196608
                  optional_sources:
                    - "package.json"
                    - ".agentplane/policy/check-routing.mjs"
                  required_sources:
                    - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                    - "packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
                  symbol_hints:
                    - "pure external plan refinement"
                    - "implementation_rework_required"
                    - "Verify Steps"
                depends_on:
                  - "route-document-rework"
                expected_outputs:
                  - "artifact:verified-recovery-invariants"
                id: "prove-recovery-invariants"
                objective: "Complete focused regression coverage and run the declared lint, typecheck, routing, lifecycle, and full-CI gates for the bounded recovery."
                optional: false
                priority: 3
                required_inputs:
                  - "artifact:document-rework-routing"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-centric"
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
                risk: "high"
                scope_roots:
                  - "packages/core/src/tasks/task-centric"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/cli"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx vitest run packages/agentplane/src/commands/task/task-centric-external-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/commands/shared/workflow-step-projections.conflict-rework.test.ts"
                      id: "focused-recovery-suite"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lint:core"
                      id: "lint-core"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "lifecycle-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-recovery-suite"
                      description: "Focused regressions prove every stated recovery invariant and repeated-loop convergence."
                      id: "focused-regressions-pass"
                      required: true
                    -
                      check_ids:
                        - "lint-core"
                        - "typecheck"
                        - "routing-policy"
                        - "lifecycle-invariants"
                        - "full-local-ci"
                      description: "All declared repository-wide quality gates pass."
                      id: "repository-gates-pass"
                      required: true
                  evidence_fingerprint: "sha256:3df4c1962be3ee3c38e00711d371d525b675767e835147c9898cebcae62e9dca"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
    revision: 25
    schema_version: 1
    updated_at: "2026-09-03T20:40:38.314Z"
    work_items:
      materialize-verification-amendment:
        attempt: 1
        claim_id: null
        id: "materialize-verification-amendment"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:2f148e31c4044631d125d3b1acaf58ec415b1d355ebbd50a0ba86dfb580f458e"
            id: "artifact:verification-amendment-projection"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609031902-8SH7ZM"
              work_item_id: "materialize-verification-amendment"
            provenance:
              - "sha256:bf0b9ee171b9560ef76a4aa987475495be7699440370ac0f7fc42c5ca3f8f2b3"
              - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:98ba17535d98c928eb87def4cf7cb4e1706382d06b253b77ee034ba733cb205f"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-09-03T19:35:12.150Z"
              repository_snapshot_digest: "sha256:98ba17535d98c928eb87def4cf7cb4e1706382d06b253b77ee034ba733cb205f"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      prove-recovery-invariants:
        attempt: 1
        claim_id: null
        id: "prove-recovery-invariants"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:05c792eafd5f651e9495844e88e4d6e8ca2bfb8f9348d18e24d649fcc35ac8ca"
            id: "artifact:verified-recovery-invariants"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609031902-8SH7ZM"
              work_item_id: "prove-recovery-invariants"
            provenance:
              - "sha256:c79ae055bcef399f4679a033376d64ccdacf42196f6517a436cb5062cebf42db"
              - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:a0e7539ea819946aa1c796ab1e8a3eb9d58aea74f8b30b9b3dd541d09a61239e"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
              check_id: "lint-core"
              command_identity: "bun run lint:core"
              detail: "Observed by bun run lint:core."
              exit_code: 0
              observed_at: "2026-09-03T20:20:43.747Z"
              repository_snapshot_digest: "sha256:a0e7539ea819946aa1c796ab1e8a3eb9d58aea74f8b30b9b3dd541d09a61239e"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-09-03T20:20:43.747Z"
              repository_snapshot_digest: "sha256:a0e7539ea819946aa1c796ab1e8a3eb9d58aea74f8b30b9b3dd541d09a61239e"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
              check_id: "routing-policy"
              command_identity: "node .agentplane/policy/check-routing.mjs"
              detail: "Observed by node .agentplane/policy/check-routing.mjs."
              exit_code: 0
              observed_at: "2026-09-03T20:20:43.747Z"
              repository_snapshot_digest: "sha256:a0e7539ea819946aa1c796ab1e8a3eb9d58aea74f8b30b9b3dd541d09a61239e"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
              check_id: "lifecycle-invariants"
              command_identity: "bun run lifecycle:invariants"
              detail: "Observed by bun run lifecycle:invariants."
              exit_code: 0
              observed_at: "2026-09-03T20:20:43.747Z"
              repository_snapshot_digest: "sha256:a0e7539ea819946aa1c796ab1e8a3eb9d58aea74f8b30b9b3dd541d09a61239e"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
              check_id: "full-local-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-03T20:20:43.747Z"
              repository_snapshot_digest: "sha256:a0e7539ea819946aa1c796ab1e8a3eb9d58aea74f8b30b9b3dd541d09a61239e"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
      route-document-rework:
        attempt: 1
        claim_id: null
        id: "route-document-rework"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:e3c0f446c5d0d2c9cd55636a1d9468d5c9a0f6ff885fd63adba7068b5cc4bf82"
            id: "artifact:document-rework-routing"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609031902-8SH7ZM"
              work_item_id: "route-document-rework"
            provenance:
              - "sha256:3976657291316aed6a7c42cbd237825b2f236db19d226a0ce0c268136ef6df35"
              - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:1ec54a1bc9ec0f36b92de46fa7379b499d027d9b1154a014cef8f677c72bb005"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json"
              check_id: "lint-core"
              command_identity: "bun run lint:core"
              detail: "Observed by bun run lint:core."
              exit_code: 0
              observed_at: "2026-09-03T19:51:57.944Z"
              repository_snapshot_digest: "sha256:1ec54a1bc9ec0f36b92de46fa7379b499d027d9b1154a014cef8f677c72bb005"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-03T19:18:41.736Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_943edd86bcded561faa816f2"
        mutation_id: "plan-refinement:work-order-202609031902-8SH7ZM-executor-6b7854f90b7b872be4a891e9"
        plan_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
        task_revision: 6
        work_item_id: null
      -
        at: "2026-09-03T19:35:12.156Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_8fc297ecdcd79b05dbbb8e65"
        mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-5200afdc59bf3d0cc0f3df7f"
        plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
        task_revision: 13
        work_item_id: "materialize-verification-amendment"
      -
        at: "2026-09-03T19:51:57.954Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_8e5cbeb4290566553f0e5538"
        mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-0bb39ec7807e102971f0cf9a"
        plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
        task_revision: 16
        work_item_id: "route-document-rework"
      -
        at: "2026-09-03T20:20:43.761Z"
        from: "PLANNED"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs: []
        entity: "work_item"
        id: "event_1ca32bd9783b78b33dafee9e"
        mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-70e52f44bd1373cce3b41c7f"
        plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
        task_revision: 19
        work_item_id: "prove-recovery-invariants"
      -
        at: "2026-09-03T20:31:45.466Z"
        from: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
        to: "sha256:89e409b82a1fbb4a0feb0b65a42c1a4b16d93a4bc358d128ce11509632a0a50b"
        actor_id: "external:EXECUTOR"
        cause_refs: []
        entity: "plan"
        id: "event_51d2d3502d3366ad3172b11a"
        mutation_id: "plan-refinement:work-order-202609031902-8SH7ZM-executor-db2090264a1b324867d11823"
        plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
        task_revision: 22
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:395fa9df3adbfdedeccb812bab4d1f70e109beb0bc6cb01d23a0a481e7301af5:
        aggregate_digest: "sha256:d3dc08f7b7f3fc646f683fe512b466fde087bd282cae98352563c06e45056e2b"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T20:40:38.295Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5d8ca7440f29c6859821534b"
          mutation_id: "compatibility:sha256:395fa9df3adbfdedeccb812bab4d1f70e109beb0bc6cb01d23a0a481e7301af5"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 23
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:395fa9df3adbfdedeccb812bab4d1f70e109beb0bc6cb01d23a0a481e7301af5"
        next_revision: 24
        previous_revision: 23
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:4becd29b96930b16f62552d0f1eb66b637f04da5cfa2000661fb04d037acde16:
        aggregate_digest: "sha256:2c6d6eaf56415180308230ccde720791bee6092310f5813f4222413238bfd5f7"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T20:40:38.314Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e44394ea8b89a08b905832f7"
          mutation_id: "compatibility:sha256:4becd29b96930b16f62552d0f1eb66b637f04da5cfa2000661fb04d037acde16"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 24
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4becd29b96930b16f62552d0f1eb66b637f04da5cfa2000661fb04d037acde16"
        next_revision: 25
        previous_revision: 24
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:508bd66d49cc8280276a33f876d6676d4923e590bc424a9464c27ddea5e7bced:
        aggregate_digest: "sha256:009ce50e14f0c10da679faf57d3d7a51dfd2def01b78db442a8bc2962a775365"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T20:29:47.191Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_bbf64df3618c26242333e48f"
          mutation_id: "compatibility:sha256:508bd66d49cc8280276a33f876d6676d4923e590bc424a9464c27ddea5e7bced"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 20
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:508bd66d49cc8280276a33f876d6676d4923e590bc424a9464c27ddea5e7bced"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:796e6868060507622375e6971f636614516b72742eb7746593464e5aa818d254:
        aggregate_digest: "sha256:368656e25024b21a0ffa98588254ee0614b2b34de1748310ae3f18c33bdbb0f6"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T20:29:47.211Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_456ab36e4be0b8813e542721"
          mutation_id: "compatibility:sha256:796e6868060507622375e6971f636614516b72742eb7746593464e5aa818d254"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 21
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:796e6868060507622375e6971f636614516b72742eb7746593464e5aa818d254"
        next_revision: 22
        previous_revision: 21
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:899eb14641cb7bbef1fdc413b6989b5398c1f4d3a271ec1c1a3050aa9d6c4ff8:
        aggregate_digest: "sha256:d2ded195e5d275a9751a8af892135c5268d9ee4c6353a248317017e63fca59da"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:33:10.894Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_407e56675facecec3cade4ad"
          mutation_id: "compatibility:sha256:899eb14641cb7bbef1fdc413b6989b5398c1f4d3a271ec1c1a3050aa9d6c4ff8"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 9
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:899eb14641cb7bbef1fdc413b6989b5398c1f4d3a271ec1c1a3050aa9d6c4ff8"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:bafe362c4d5d7febb43191d92be88e4b262ce04db599a5a300eafd0f6ba9b402:
        aggregate_digest: "sha256:65e5ae0d0d8006ea3f89b4296198a7a7e9c98fcde088a711ee4ac44c2d6788f7"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:35:11.639Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_aad2043b0a65d3e6905d7202"
          mutation_id: "compatibility:sha256:bafe362c4d5d7febb43191d92be88e4b262ce04db599a5a300eafd0f6ba9b402"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:bafe362c4d5d7febb43191d92be88e4b262ce04db599a5a300eafd0f6ba9b402"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:cc48b6510a5207463b9731a8eb4ecf0b348a66a1b26bf45af667b783d93e1248:
        aggregate_digest: "sha256:f2c336f81c34dac6cf2d9f21ff2fc642a1e337da490508a0493b444e7f63f0fb"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:17:55.058Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3360c91f8ff3dcab6134482b"
          mutation_id: "compatibility:sha256:cc48b6510a5207463b9731a8eb4ecf0b348a66a1b26bf45af667b783d93e1248"
          plan_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:cc48b6510a5207463b9731a8eb4ecf0b348a66a1b26bf45af667b783d93e1248"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:d45c75d9e5d1405e563383cb2361495de2e7f3d1b7d54e17ae42e2fa1ff02fdb:
        aggregate_digest: "sha256:563baa3d27251936cc84c83adca9743b2489d5f26d800597fc09c4139671644f"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:33:40.688Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_ed5c76f97b32fc25bfa2b27c"
          mutation_id: "compatibility:sha256:d45c75d9e5d1405e563383cb2361495de2e7f3d1b7d54e17ae42e2fa1ff02fdb"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 10
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d45c75d9e5d1405e563383cb2361495de2e7f3d1b7d54e17ae42e2fa1ff02fdb"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:e11d6b75a765de3d5961dd5e371f76a5c70998a7b71fd28961ca4cc4b035c9a2:
        aggregate_digest: "sha256:73e1f2a9d636f3fab8cff7a73cd9a5e1f7582079f206645fda35beb272260faf"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:51:02.855Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_bc596924d106ff6eab444605"
          mutation_id: "compatibility:sha256:e11d6b75a765de3d5961dd5e371f76a5c70998a7b71fd28961ca4cc4b035c9a2"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e11d6b75a765de3d5961dd5e371f76a5c70998a7b71fd28961ca4cc4b035c9a2"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:e416986905e747547cc0bf8f7f1f838bde25db0da5ff26ca996d6c9e82c79760:
        aggregate_digest: "sha256:b8562359b88a2d1764ccba013a36a858dbaa2dfbf1809fffbc011f4f7742e451"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T20:11:21.876Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3de556bea37affca172c7dcb"
          mutation_id: "compatibility:sha256:e416986905e747547cc0bf8f7f1f838bde25db0da5ff26ca996d6c9e82c79760"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e416986905e747547cc0bf8f7f1f838bde25db0da5ff26ca996d6c9e82c79760"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      compatibility:sha256:f37bdfaee058ac8b29a42117cef8a5c76eb84c76920c559993b6b59712865ecd:
        aggregate_digest: "sha256:82c587eb9e9a4e9cada0b1136d7477fbe19fa4846c6ddc8afcd83fba98ead1b0"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:09:23.398Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_77e2fc00c8c8af8d5b9cc640"
          mutation_id: "compatibility:sha256:f37bdfaee058ac8b29a42117cef8a5c76eb84c76920c559993b6b59712865ecd"
          plan_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f37bdfaee058ac8b29a42117cef8a5c76eb84c76920c559993b6b59712865ecd"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      external-result:work-order-202609031902-8SH7ZM-executor-0bb39ec7807e102971f0cf9a:
        aggregate_digest: "sha256:5b3badaa69ee6eca0f21dc6d8baaf0e115b9e43c7bc793bb278f56c213415c36"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:51:57.954Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_8e5cbeb4290566553f0e5538"
          mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-0bb39ec7807e102971f0cf9a"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 16
          to: "COMPLETED"
          work_item_id: "route-document-rework"
        mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-0bb39ec7807e102971f0cf9a"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      external-result:work-order-202609031902-8SH7ZM-executor-5200afdc59bf3d0cc0f3df7f:
        aggregate_digest: "sha256:dbcd48c37142b1aea2857f4c80f17e836e8884d0213f70bbe0c8bc445cbf1213"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T19:35:12.156Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_8fc297ecdcd79b05dbbb8e65"
          mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-5200afdc59bf3d0cc0f3df7f"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 13
          to: "COMPLETED"
          work_item_id: "materialize-verification-amendment"
        mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-5200afdc59bf3d0cc0f3df7f"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      external-result:work-order-202609031902-8SH7ZM-executor-70e52f44bd1373cce3b41c7f:
        aggregate_digest: "sha256:9206ab8695c80878aba70bc507528879e1df7ecbdcd2d1cfe6fc2781e75fb837"
        event:
          actor_id: "agentplane"
          at: "2026-09-03T20:20:43.761Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_1ca32bd9783b78b33dafee9e"
          mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-70e52f44bd1373cce3b41c7f"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 19
          to: "COMPLETED"
          work_item_id: "prove-recovery-invariants"
        mutation_id: "external-result:work-order-202609031902-8SH7ZM-executor-70e52f44bd1373cce3b41c7f"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      plan-refinement:work-order-202609031902-8SH7ZM-executor-6b7854f90b7b872be4a891e9:
        aggregate_digest: "sha256:d7adc5aff85f50ea9f7cb206b812ec0393a6c46362386cf0fa032d207bcc283a"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T19:18:41.736Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_943edd86bcded561faa816f2"
          mutation_id: "plan-refinement:work-order-202609031902-8SH7ZM-executor-6b7854f90b7b872be4a891e9"
          plan_digest: "sha256:1caa7a94a9728c64bc3f06d12d39f8c1dbecfeea263e58d0d36467fd9e05b20a"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 6
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609031902-8SH7ZM-executor-6b7854f90b7b872be4a891e9"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
      plan-refinement:work-order-202609031902-8SH7ZM-executor-db2090264a1b324867d11823:
        aggregate_digest: "sha256:7860ca2c4375ce6977dedabcfb4da6e9725a79f6a7599c6acca202a529b7a633"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-03T20:31:45.466Z"
          cause_refs: []
          entity: "plan"
          from: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          id: "event_51d2d3502d3366ad3172b11a"
          mutation_id: "plan-refinement:work-order-202609031902-8SH7ZM-executor-db2090264a1b324867d11823"
          plan_digest: "sha256:929a588da25f068e7dda287a31a540859c12481d851b2d6fcfb7e4a9cedbae61"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609031902-8SH7ZM"
          task_revision: 22
          to: "sha256:89e409b82a1fbb4a0feb0b65a42c1a4b16d93a4bc358d128ce11509632a0a50b"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609031902-8SH7ZM-executor-db2090264a1b324867d11823"
        next_revision: 23
        previous_revision: 22
        schema_version: 1
        task_id: "202609031902-8SH7ZM"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "7395512128320b38054c39ddb8446da03cc35993"
  task_execution_context:
    base_ref: "main"
    base_sha: "65625c1a19230dd1ca73e87f31a1b975c5363b54"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "65625c1a19230dd1ca73e87f31a1b975c5363b54"
    version: 1
id_source: "generated"
---
## Summary

Repair plan-amendment Verify Steps projection routing

Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.

## Scope

- In scope: Fix the AgentPlane invariant where a task-specific plan amendment is persisted but sections.Verify Steps remains a PLANNER fallback scaffold, causing EVALUATOR rework to loop into code-only EXECUTOR authority that excludes protected task projections. Materialize accepted task-specific verification amendments atomically into the authoritative task document, invalidate stale evaluator/context packets, and route document-level rework to PLANNER or the AgentPlane-owned projection owner before emitting a fresh EVALUATOR packet. Add focused replay, idempotency, authority-closure, projection, stale-packet, and impossible-loop regressions. Do not grant ordinary EXECUTOR episodes access to .agentplane/tasks, weaken quality gates, hand-edit PX8PZT state, or touch release/version/publication/dependency scope.
- Out of scope: unrelated refactors not required for "Repair plan-amendment Verify Steps projection routing".

## Plan

Refined the three-stage recovery plan so every WorkItem validation command is an exact declared Task check, while preserving commit 57487e09cfbd905e2dda2e16dd240905367ddb1d and assigning the stale CLI fixture correction only to the WorkItem that already owns packages/agentplane/src/cli.

## Verify Steps

1. Run `bun run lint:core`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.
2. Run `bun run typecheck`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.
4. Run `bun run lifecycle:invariants`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.
5. Run `bun run ci:local:full`. Expected: The lifecycle exits the amendment/evaluator loop with atomic projection, fresh authority, correct role routing, and all quality gates intact.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-03T19:33:39.803Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e5760cbcb744625659d15e314a6b7fcbe83138c978c561d51d27e780214877f8, input_digest=sha256:9ced16bc821c58b1aaa61bde540ff01d8d44498398c77acf8c2688938b6e117c

Details:

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609031902-8SH7ZM-repair-plan-amendment-verify-steps-projection-ro/.agentplane/tasks/202609031902-8SH7ZM/blueprint/resolved-snapshot.json
- old_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
- current_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609031902-8SH7ZM

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609031902-8SH7ZM
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-03T20:29:46.053Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:e5760cbcb744625659d15e314a6b7fcbe83138c978c561d51d27e780214877f8, input_digest=sha256:3b74568f3e5e4b762d4274637636aefd2bbd97e14c7dfb457b468b2e4942a4c1

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609031902-8SH7ZM-repair-plan-amendment-verify-steps-projection-ro/.agentplane/tasks/202609031902-8SH7ZM/blueprint/resolved-snapshot.json
- old_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
- current_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609031902-8SH7ZM

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609031902-8SH7ZM
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-09-03T20:40:36.948Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:a6ca9f7772ca7d5c568f5bd0c236aa1cd6e3ff846ae3c0d7f2051f66fd0c464d, input_digest=sha256:caae3f04debfe5f954c6ca0833bb5a6f21634897f1d7a82a14b17831bdef7504

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (1/5)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (2/5)

Check: affected_unit_integration
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (3/5)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (4/5)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check affected_unit_integration (5/5)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (1/5)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (2/5)

Check: critical_paths
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (3/5)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (4/5)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check critical_paths (5/5)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check full_regression

Check: real_e2e
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (1/5)

Check: real_e2e
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (2/5)

Check: real_e2e
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (3/5)

Check: real_e2e
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (4/5)

Check: real_e2e
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check real_e2e (5/5)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (1/5)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (2/5)

Check: task_outcome
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (3/5)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (4/5)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202609031902-8SH7ZM/supervision/declared-checks.json#check-5
Scope: branch_pr task 202609031902-8SH7ZM Verification Contract check task_outcome (5/5)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609031902-8SH7ZM-repair-plan-amendment-verify-steps-projection-ro/.agentplane/tasks/202609031902-8SH7ZM/blueprint/resolved-snapshot.json
- old_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
- current_digest: 987811c4f3427d4b5170038f00505c25a6dd1d2f653225367cdfc6f209a7ec86
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609031902-8SH7ZM

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609031902-8SH7ZM
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
