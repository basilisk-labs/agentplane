---
id: "202608291006-2A6BJC"
title: "Add compatibility adapters and replay migration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 33
origin:
  system: "manual"
depends_on:
  - "202608292032-1K47B8"
tags:
  - "clean-core-rebuild"
  - "migration"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run arch:check"
  - "bun run lifecycle:invariants"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-30T07:52:14.256Z"
  updated_by: "USER"
  note: "Standing user authorization for subsequent refactoring plans. Approve exact sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954. Bound scope correction for compatibility qualification; all original acceptance and safety gates remain."
verification:
  state: "needs_rework"
  updated_at: "2026-08-30T07:51:16.632Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bun run ci:local:full"
  attempts: 3
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
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
      - "schema"
      - "security_boundary"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "docs/developer"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli/run-cli"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-kernel"
      - "packages/testkit/src"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/bench"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "M0 defines migration and replay acceptance. M1 is integrated at cbc5d79d1510293de3b4c30b61679cdef85d0fdb. Changes are limited to adapter, storage, CLI boundary, replay fixtures and supporting documentation. No production data migration, release publication or legacy removal occurs during implementation episodes."
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/developer"
      - "docs/reference/clean-task-core-rebuild-spec.mdx"
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/backends/task-backend"
      - "packages/agentplane/src/cli/run-cli"
      - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/ports"
      - "packages/agentplane/src/runner"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/task-kernel"
      - "packages/testkit/src"
      - "scripts/baselines/v0.7-compatibility-candidate.json"
      - "scripts/bench"
      - "scripts/checks/check-compatibility-contract-baseline.mjs"
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
    - "effect_schema"
    - "effect_security_boundary"
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
          - "docs/developer"
          - "docs/reference/clean-task-core-rebuild-spec.mdx"
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/backends/task-backend"
          - "packages/agentplane/src/cli/run-cli"
          - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/ports"
          - "packages/agentplane/src/runner"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/task-kernel"
          - "packages/testkit/src"
          - "scripts/baselines/v0.7-compatibility-candidate.json"
          - "scripts/bench"
          - "scripts/checks/check-compatibility-contract-baseline.mjs"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:9365f4d5e475fee91f6aa974f07ef3861fb582497b3204c9be6d24fe134e729e"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli"
        - "central_component:packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
        - "central_component:packages/core/src/tasks/index.ts"
        - "central_component:packages/core/src/tasks/task-kernel"
        - "central_component:scripts/checks/check-compatibility-contract-baseline.mjs"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
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
    body: "Implementation committed: 2ee9027b5628. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 5ea8af080c33. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 447e42b16e05. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The approved material plan replacement requests fresh qualification of m2-boundaries. Full Task verification is blocked by the reviewed compatibility candidate freshness check. The current WorkItem does not authorize that candidate path. Preserve implementation and existing evidence; expand only the qualification artifact scope for predecessor WorkItems. Recommended action: Apply the supplied bounded plan refinement and request a fresh executor packet. Agentplane receipt: external-agent-blocker/tr_64b4801343ba63e742710c16fb9a339e/sha256:e4ee43de25f0af27bffe4954d774b7b6d79b5950b2488a0d2db6f946dc3b59e3."
  -
    author: "ORCHESTRATOR"
    body: "Resume: the operator resolved the missing qualification scope by requesting an exact plan correction. Continue the fresh PLANNER route under standing user authorization; preserve implementation and prior evidence."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2b964f7cbfc4. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-30T04:09:19.341Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T04:40:53.007Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2ee9027b5628. CLI accepted one state-bound external-agent semantic result."
    commit: "2ee9027b5628e0f6702afcaaa8d73d1667d07e5e"
  -
    type: "verify"
    at: "2026-08-30T04:58:08.850Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
  -
    type: "status"
    at: "2026-08-30T05:42:05.137Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 5ea8af080c33. CLI accepted one state-bound external-agent semantic result."
    commit: "5ea8af080c331eed2528c34e67c15188a70a6291"
  -
    type: "verify"
    at: "2026-08-30T05:56:44.233Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T07:10:35.949Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 447e42b16e05. CLI accepted one state-bound external-agent semantic result."
    commit: "447e42b16e053477a6e8ec77ac590269ee2e43e2"
  -
    type: "verify"
    at: "2026-08-30T07:21:50.527Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T07:30:17.385Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-30T07:32:49.353Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The approved material plan replacement requests fresh qualification of m2-boundaries. Full Task verification is blocked by the reviewed compatibility candidate freshness check. The current WorkItem does not authorize that candidate path. Preserve implementation and existing evidence; expand only the qualification artifact scope for predecessor WorkItems. Recommended action: Apply the supplied bounded plan refinement and request a fresh executor packet. Agentplane receipt: external-agent-blocker/tr_64b4801343ba63e742710c16fb9a339e/sha256:e4ee43de25f0af27bffe4954d774b7b6d79b5950b2488a0d2db6f946dc3b59e3."
  -
    type: "status"
    at: "2026-08-30T07:34:04.105Z"
    author: "ORCHESTRATOR"
    from: "BLOCKED"
    to: "DOING"
    note: "Resume: the operator resolved the missing qualification scope by requesting an exact plan correction. Continue the fresh PLANNER route under standing user authorization; preserve implementation and prior evidence."
  -
    type: "verify"
    at: "2026-08-30T07:36:28.040Z"
    author: "ORCHESTRATOR"
    state: "needs_rework"
    note: "Recover the failed no-change refinement return. Request a fresh bounded implementation episode to qualify adapter capability refusal and return the missing compatibility artifact scope refinement. Preserve prior implementation."
  -
    type: "status"
    at: "2026-08-30T07:39:42.768Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2b964f7cbfc4. CLI accepted one state-bound external-agent semantic result."
    commit: "2b964f7cbfc47b64d8ba8345211d806c59b6337c"
  -
    type: "verify"
    at: "2026-08-30T07:51:16.632Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-08-30T07:52:15.866Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-30T07:52:15.866Z"
doc_updated_by: "CODER"
description: "Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts."
sections:
  Summary: |-
    Add compatibility adapters and replay migration

    Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
  Scope: |-
    - In scope: Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
    - Out of scope: unrelated refactors not required for "Add compatibility adapters and replay migration".
  Plan: "Correct qualification scope for all WorkItems. Include only the reviewed compatibility candidate, exact CLI descriptor/source allowlist and existing critical CLI composition test. Retain immutable baseline, strict freshness checks and every original M0 acceptance gate."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add compatibility adapters and replay migration". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add compatibility adapters and replay migration". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-30T04:58:08.850Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:5ac6fe8bf7c86d938b098c8a84ee6834c83953f983eeec5f2f783128fa6cecaa

    Details:

    Check: affected_unit_integration
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

    Check: affected_unit_integration
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

    Check: affected_unit_integration
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

    Check: affected_unit_integration
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

    Check: affected_unit_integration
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

    Check: affected_unit_integration
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

    Check: critical_paths
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

    Check: critical_paths
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

    Check: critical_paths
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

    Check: critical_paths
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

    Check: critical_paths
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

    Check: critical_paths
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

    Check: docs_contract
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

    Check: docs_contract
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

    Check: docs_contract
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

    Check: docs_contract
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

    Check: docs_contract
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

    Check: docs_contract
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

    Check: docs_contract
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

    Check: docs_contract
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

    Check: task_outcome
    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

    Check: task_outcome
    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

    Check: task_outcome
    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

    Check: task_outcome
    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

    Check: task_outcome
    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

    Check: task_outcome
    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T05:56:44.233Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:04388fb46decff956f378aa208ddef3888d308e0492bd7fa9894d53655604e80

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T07:21:50.527Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:285418f098288ea7113e3dde4549eea781849af7eeeb192b0a79c58fe44c0dac

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T07:36:28.040Z — VERIFY — needs_rework

    By: ORCHESTRATOR

    Note: Recover the failed no-change refinement return. Request a fresh bounded implementation episode to qualify adapter capability refusal and return the missing compatibility artifact scope refinement. Preserve prior implementation.
    Attempts: 2

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:f1e3781e9b8bf6b06b304e0471060469b0d473abf872f129994dff5c3a11c882

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

    ### 2026-08-30T07:51:16.632Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 3

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:ea3185aa07b20baac8750bb224fe4746f6e741eabf6fbf2cc63cba345f16539f

    Details:

    Command: bun run arch:check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run lifecycle:invariants
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run test:fast
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: git diff --check
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: agentplane doctor
    Result: pass
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
    Scope: branch_pr task 202608291006-2A6BJC declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
    - old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:3aa962fe6733f58b5d54f6fbe8f4fd4d6872f975810025922344952639197cb0"
    digest: "sha256:5bfb2863c5fd8f2c24810511875ff1677f2cce6107d82b9e32378fc3722e2a62"
    grant_id: "bc4fc123-87d8-4755-a2f8-38ab21323b81"
    issued_at: "2026-08-30T07:52:14.256Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:03d67e93c17b945dc7ef413e89559769ce0c8d723c262ec5f465e0f4aa8ae76d"
    plan_revision: 31
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:e258ddeedc305dcd7b5973bb80268af1359486e241b54d90daf4722c0b34d586"
    status: "active"
    task_id: "202608291006-2A6BJC"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-30T07:52:14.256Z"
        approved_by: "USER"
        approved_digest: "sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-30T07:52:00.070Z"
      digest: "sha256:b44896158ad36a135b4f26fab0d6ad30abf78efcf952d61fc6aaf5a12c44e954"
      proposal:
        assumptions:
          - "Use M0 specification and M1 kernel as contracts. Preserve kernel purity and typed rejection semantics."
          - "Reuse existing task README transaction and cloud CAS owners. Do not add an independently mutable duplicate canonical store."
          - "All destructive migration qualification uses isolated fixtures. User repository migration and production cutover remain explicit M3 gates. Preserve unrelated task records, worktrees, user data and separate 0.7.8 release lane."
          - "Preserve completed m2-boundaries and m2-migration results and output manifests. The replay checkpoint is not final M2 acceptance. Full CI currently fails compatibility candidate freshness and must pass before completion."
          - "Predecessor qualification may update the reviewed compatibility candidate, its exact CLI descriptor and source-provenance allowlist, and the existing critical composition test. Add only the migration command delta. Preserve the immutable 0.6.24 baseline and strict rejection of unlisted changes."
        planning_baseline:
          captured_at: "2026-08-30T07:51:22.917Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:5d5f25330ad5053a6dd459bc52616cc50680d1dcccaae247efd6ca657ab0f2a2"
          dirty_paths:
            - ".agentplane/tasks/202608291006-2A6BJC/README.md"
            - ".agentplane/tasks/202608291006-2A6BJC/pr/github-body.md"
            - ".agentplane/tasks/202608291006-2A6BJC/pr/meta.json"
            - ".agentplane/tasks/202608291006-2A6BJC/pr/review.md"
            - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
            - ".agentplane/tasks/202608291006-2A6BJC/supervision/implementation-evidence.json"
            - ".agentplane/tasks/202608291006-2A6BJC/verification/20260830075116632-19aedf754eb84cd1.json"
          git:
            kind: "commit"
            ref: null
            sha: "2b964f7cbfc47b64d8ba8345211d806c59b6337c"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:30"
        schema_version: 1
        task_id: "202608291006-2A6BJC"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run arch:check"
              id: "m2-architecture"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run lifecycle:invariants"
              id: "m2-invariants"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run test:fast"
              id: "m2-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "m2-types"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "m2-diff"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
              id: "m2-boundaries"
              required: true
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
              id: "m2-migration"
              required: true
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
              id: "m2-replay"
              required: true
            -
              check_ids:
                - "m2-architecture"
                - "m2-invariants"
                - "m2-tests"
                - "m2-types"
                - "m2-diff"
              description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
              id: "m2-replay-qualification"
              required: true
          evidence_fingerprint: "sha256:65a5519f36313e84db86d915c9be805f090d7c0c4fbe1a243e66a05ab9a3ca68"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                  id: "m2-boundaries"
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
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on: []
              expected_outputs:
                - "m2-boundaries-implementation"
              id: "m2-boundaries"
              objective: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
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
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
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
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                    id: "m2-boundaries"
                    required: true
                evidence_fingerprint: "sha256:1634af8127ebf4a1ba7154f01fe0157f9261858c5f79b06bdb71de73b2fe3512"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                  id: "m2-migration"
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
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on:
                - "m2-boundaries"
              expected_outputs:
                - "m2-migration-implementation"
              id: "m2-migration"
              objective: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
              optional: false
              priority: 1
              required_inputs:
                - "m2-boundaries-implementation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
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
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                    id: "m2-migration"
                    required: true
                evidence_fingerprint: "sha256:ec442424abe95444c0aafb75e5b4f8a7daa7b24feb12268b0294e967bb9a4af1"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                  id: "m2-replay"
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
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on:
                - "m2-migration"
              expected_outputs:
                - "m2-replay-implementation"
              id: "m2-replay"
              objective: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
              optional: false
              priority: 2
              required_inputs:
                - "m2-migration-implementation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
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
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                    id: "m2-replay"
                    required: true
                evidence_fingerprint: "sha256:1d1658d2ac8757b0867c97b12229d8145a6915b4103a2b239d67dc6f8a7b5d80"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "m2-architecture"
                    - "m2-invariants"
                    - "m2-tests"
                    - "m2-types"
                    - "m2-diff"
                  description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                  id: "m2-replay-qualification"
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
                  - "reduceTaskCommand"
                  - "TaskCentricBackendAdapter"
                  - "withTaskReadmeTransaction"
              depends_on:
                - "m2-replay"
              expected_outputs:
                - "m2-replay-qualification-report"
              id: "m2-replay-qualification"
              objective: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
              optional: false
              priority: 3
              required_inputs:
                - "m2-replay-implementation"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/backends/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/ports"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src"
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
                  resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/check-compatibility-contract-baseline.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/backends/task-backend"
                - "packages/agentplane/src/ports"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/cli/run-cli"
                - "packages/agentplane/src/runner"
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/index.ts"
                - "packages/testkit/src"
                - "scripts/bench"
                - "docs/developer"
                - "docs/reference/clean-task-core-rebuild-spec.mdx"
                - "scripts/baselines/v0.7-compatibility-candidate.json"
                - "scripts/checks/check-compatibility-contract-baseline.mjs"
                - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "m2-architecture"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lifecycle:invariants"
                    id: "m2-invariants"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "m2-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "m2-types"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "m2-diff"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                    id: "m2-replay-qualification"
                    required: true
                evidence_fingerprint: "sha256:d7b566c238c13b69663d76489aa64bb4fff4d40ac33c147524b56696d743f273"
                schema_version: 1
      revision: 3
      schema_version: 1
      task_id: "202608291006-2A6BJC"
    event_cursor: 0
    final_validation: null
    id: "202608291006-2A6BJC"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run arch:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run lifecycle:invariants"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run test:fast"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-4"
          required: true
      captured_at: "2026-08-29T10:06:15.754Z"
      constraints: []
      request: |-
        Add compatibility adapters and replay migration

        Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
      task_id: "202608291006-2A6BJC"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-08-30T04:03:02.075Z"
          approved_by: "USER"
          approved_digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-30T04:02:39.666Z"
        digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
        proposal:
          assumptions:
            - "Use M0 specification and M1 kernel as contracts. Preserve kernel purity and typed rejection semantics."
            - "Reuse existing task README transaction and cloud CAS owners. Do not add an independently mutable duplicate canonical store."
            - "All destructive migration qualification uses isolated fixtures. User repository migration and production cutover remain explicit M3 gates. Preserve unrelated task records, worktrees, user data and separate 0.7.8 release lane."
          planning_baseline:
            captured_at: "2026-08-30T03:46:07.431Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:80ce56f4d8c3464cc1c68b48bab1221743c35996e574eefdcde94604b1200d12"
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
              - ".agentplane/tasks/202608291006-2A6BJC/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "cbc5d79d1510293de3b4c30b61679cdef85d0fdb"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:3"
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run arch:check"
                id: "m2-architecture"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m2-invariants"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run test:fast"
                id: "m2-tests"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "m2-types"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "m2-diff"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                id: "m2-boundaries"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                id: "m2-migration"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                id: "m2-replay"
                required: true
            evidence_fingerprint: "sha256:1a8107c0bd0bd527e216d9591d1a109811c9e2251dc643b789e6985bb965de79"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                    id: "m2-boundaries"
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
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on: []
                expected_outputs:
                  - "m2-boundaries-implementation"
                id: "m2-boundaries"
                objective: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
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
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
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
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                      id: "m2-boundaries"
                      required: true
                  evidence_fingerprint: "sha256:1634af8127ebf4a1ba7154f01fe0157f9261858c5f79b06bdb71de73b2fe3512"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                    id: "m2-migration"
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
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-boundaries"
                expected_outputs:
                  - "m2-migration-implementation"
                id: "m2-migration"
                objective: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                optional: false
                priority: 1
                required_inputs:
                  - "m2-boundaries-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
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
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                      id: "m2-migration"
                      required: true
                  evidence_fingerprint: "sha256:ec442424abe95444c0aafb75e5b4f8a7daa7b24feb12268b0294e967bb9a4af1"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                    id: "m2-replay"
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
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-migration"
                expected_outputs:
                  - "m2-replay-implementation"
                id: "m2-replay"
                objective: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                optional: false
                priority: 2
                required_inputs:
                  - "m2-migration-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
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
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2."
                      id: "m2-replay"
                      required: true
                  evidence_fingerprint: "sha256:7d4f3aaaf4541496cee38a9111c105ed610f3c228f3fe8f8ca0bff29a232ce07"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      -
        approval:
          approved_at: "2026-08-30T07:30:14.840Z"
          approved_by: "USER"
          approved_digest: "sha256:450ced12ab0522ad11fbabab73b03974a1bc1cfcf6b29f5559e930904eaefa67"
          policy_facts:
            - "manual_operator"
          state: "approved"
        created_at: "2026-08-30T07:29:50.004Z"
        digest: "sha256:450ced12ab0522ad11fbabab73b03974a1bc1cfcf6b29f5559e930904eaefa67"
        proposal:
          assumptions:
            - "Use M0 specification and M1 kernel as contracts. Preserve kernel purity and typed rejection semantics."
            - "Reuse existing task README transaction and cloud CAS owners. Do not add an independently mutable duplicate canonical store."
            - "All destructive migration qualification uses isolated fixtures. User repository migration and production cutover remain explicit M3 gates. Preserve unrelated task records, worktrees, user data and separate 0.7.8 release lane."
            - "Preserve completed m2-boundaries and m2-migration results and output manifests. The replay checkpoint is not final M2 acceptance. Full CI currently fails compatibility candidate freshness and must pass before completion."
          planning_baseline:
            captured_at: "2026-08-30T07:21:57.495Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:52c46734bf23cb1b37258b50f17305df290065f412e3297a2aa23a6620f86ad1"
            dirty_paths:
              - ".agentplane/tasks/202608291006-2A6BJC/README.md"
              - ".agentplane/tasks/202608291006-2A6BJC/pr/github-body.md"
              - ".agentplane/tasks/202608291006-2A6BJC/pr/meta.json"
              - ".agentplane/tasks/202608291006-2A6BJC/pr/review.md"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json"
              - ".agentplane/tasks/202608291006-2A6BJC/supervision/implementation-evidence.json"
              - ".agentplane/tasks/202608291006-2A6BJC/verification/20260830072150527-ced68b498928174b.json"
            git:
              kind: "commit"
              ref: null
              sha: "447e42b16e053477a6e8ec77ac590269ee2e43e2"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:18"
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run arch:check"
                id: "m2-architecture"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run lifecycle:invariants"
                id: "m2-invariants"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run test:fast"
                id: "m2-tests"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "m2-types"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "m2-diff"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                id: "m2-boundaries"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                id: "m2-migration"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                id: "m2-replay"
                required: true
              -
                check_ids:
                  - "m2-architecture"
                  - "m2-invariants"
                  - "m2-tests"
                  - "m2-types"
                  - "m2-diff"
                description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                id: "m2-replay-qualification"
                required: true
            evidence_fingerprint: "sha256:65a5519f36313e84db86d915c9be805f090d7c0c4fbe1a243e66a05ab9a3ca68"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                    id: "m2-boundaries"
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
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on: []
                expected_outputs:
                  - "m2-boundaries-implementation"
                id: "m2-boundaries"
                objective: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
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
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
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
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Connect M1 taskKernel to explicit persistence and application adapters. Canonical reads never synthesize aggregates from legacy data. Typed canonical, legacy_unmigrated, malformed and archived results fail closed. Persist aggregate, events, plans and mutation receipts atomically with CAS or proven serialization, validate capabilities, reject changed-command idempotency reuse, and compare independent readback before exposing receipts. CLI/document/status, validation/evaluator, Git/workspace and provider adapters observe or project only; canonical kernel owns transitions. New canonical creation is explicit; existing legacy production remains authoritative only in declared M2 comparison mode until M3 cutover."
                      id: "m2-boundaries"
                      required: true
                  evidence_fingerprint: "sha256:1634af8127ebf4a1ba7154f01fe0157f9261858c5f79b06bdb71de73b2fe3512"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                    id: "m2-migration"
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
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-boundaries"
                expected_outputs:
                  - "m2-migration-implementation"
                id: "m2-migration"
                objective: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                optional: false
                priority: 1
                required_inputs:
                  - "m2-boundaries-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
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
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Implement dry-run, canary-first apply, idempotent repeat and receipt-scoped rollback through supported adapter/CLI surfaces. Preserve exact source bytes before writes. Record source/backend/repository/schema identity and all required digests/CAS/readback. TODO, DOING and BLOCKED migrate to PLANNING without invented plan, WorkItems, authority or evidence; DONE becomes read-only archive. Split required_inputs only with unambiguous typed evidence, quarantine unknown, ambiguous and malformed data. Atomically persist migration receipt and output. Rollback restores exact bytes only when output revision/digest and backup digest still match; otherwise return stable state_changed_after_migration or backup_mismatch without writes."
                      id: "m2-migration"
                      required: true
                  evidence_fingerprint: "sha256:ec442424abe95444c0aafb75e5b4f8a7daa7b24feb12268b0294e967bb9a4af1"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                    id: "m2-replay"
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
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-migration"
                expected_outputs:
                  - "m2-replay-implementation"
                id: "m2-replay"
                objective: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                optional: false
                priority: 2
                required_inputs:
                  - "m2-migration-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
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
                    resource: "scripts/baselines/v0.7-compatibility-candidate.json"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "scripts/baselines/v0.7-compatibility-candidate.json"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Qualify the committed replay engine checkpoint at 447e42b16e053477a6e8ec77ac590269ee2e43e2. Preserve frozen kernel, migration and evidence vectors. Prove resource-claim rejection, local and cloud CAS persistence, interrupted write readback, exact-byte migration and rollback. Repair exact-anchor dependency isolation and expose suite-level failures. Update only the reviewed compatibility candidate for the added migration CLI; keep the immutable baseline unchanged. The final twelve-family qualification remains mandatory in m2-replay-qualification."
                      id: "m2-replay"
                      required: true
                  evidence_fingerprint: "sha256:1d1658d2ac8757b0867c97b12229d8145a6915b4103a2b239d67dc6f8a7b5d80"
                  schema_version: 1
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "m2-architecture"
                      - "m2-invariants"
                      - "m2-tests"
                      - "m2-types"
                      - "m2-diff"
                    description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                    id: "m2-replay-qualification"
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
                    - "reduceTaskCommand"
                    - "TaskCentricBackendAdapter"
                    - "withTaskReadmeTransaction"
                depends_on:
                  - "m2-replay"
                expected_outputs:
                  - "m2-replay-qualification-report"
                id: "m2-replay-qualification"
                objective: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                optional: false
                priority: 3
                required_inputs:
                  - "m2-replay-implementation"
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/backends/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/ports"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/runner"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/task-kernel"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks/index.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src"
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
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/agentplane/src/backends/task-backend"
                  - "packages/agentplane/src/ports"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/cli/run-cli"
                  - "packages/agentplane/src/runner"
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/index.ts"
                  - "packages/testkit/src"
                  - "scripts/bench"
                  - "docs/developer"
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run arch:check"
                      id: "m2-architecture"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run lifecycle:invariants"
                      id: "m2-invariants"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run test:fast"
                      id: "m2-tests"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "m2-types"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "m2-diff"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "m2-architecture"
                        - "m2-invariants"
                        - "m2-tests"
                        - "m2-types"
                        - "m2-diff"
                      description: "Freeze complete twelve-family corpus from the integrated M0 specification with source bytes/digests, exact implementation anchor, commands, expected events, aggregate/projection digests, effect state and next-route codes. Exercise real local storage, serialized capability mode and cloud fake, interruption, all task classes and listed crash boundaries. Compare legacy and canonical normalized read paths without effects or canonical writes. Report first mismatch and reproducible command. Require zero unexplained mismatch, canary migration, repeated migration without byte changes, exact-byte rollback and full gate checks on one implementation identity. Do not claim M3 production deletion, twenty self-hosting tasks or release drills during M2. Produce an explicit coverage and qualification report. Reject zero-test runs, suite import failures, live workspace source leakage and unanchored transitive harness code. Preserve all M0 gates and report actual normalized legacy/canonical read comparison and actual next-action reason codes."
                      id: "m2-replay-qualification"
                      required: true
                  evidence_fingerprint: "sha256:d7b566c238c13b69663d76489aa64bb4fff4d40ac33c147524b56696d743f273"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202608291006-2A6BJC"
    revision: 31
    schema_version: 1
    updated_at: "2026-08-30T07:52:14.256Z"
    work_items:
      m2-boundaries:
        attempt: 0
        claim_id: null
        id: "m2-boundaries"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      m2-migration:
        attempt: 0
        claim_id: null
        id: "m2-migration"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      m2-replay:
        attempt: 0
        claim_id: null
        id: "m2-replay"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      m2-replay-qualification:
        attempt: 0
        claim_id: null
        id: "m2-replay-qualification"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608291006-2A6BJC-executor-8996e1c67f753572801d9d3f:
        aggregate_digest: "sha256:de7ad335cffc816f3153665ebec1641e1d588cb0bd1e5723b946e0ea6481a4b8"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T05:56:47.732Z"
          cause_refs: []
          entity: "work_item"
          from: "PLANNED"
          id: "event_d9bfda8968a849f2a57993be"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-8996e1c67f753572801d9d3f"
          plan_digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 13
          to: "COMPLETED"
          work_item_id: "m2-migration"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-8996e1c67f753572801d9d3f"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      external-result:work-order-202608291006-2A6BJC-executor-e3f42e6e5024316097195f50:
        aggregate_digest: "sha256:ca31485b8336cff4a1cad738cc1a31c927ef130e686b3775834af1d5c1c87804"
        event:
          actor_id: "agentplane"
          at: "2026-08-30T04:58:13.594Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_4b52d039dc7cdb96061930d6"
          mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-e3f42e6e5024316097195f50"
          plan_digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 9
          to: "COMPLETED"
          work_item_id: "m2-boundaries"
        mutation_id: "external-result:work-order-202608291006-2A6BJC-executor-e3f42e6e5024316097195f50"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      plan-refinement:work-order-202608291006-2A6BJC-executor-6bf30d85c336a125b18a0fd0:
        aggregate_digest: "sha256:4bc463339a8f02e34c3a520886a02ea7976e2ea1fafcb276f90e76d8bc3dfc5f"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-30T07:21:54.867Z"
          cause_refs:
            - "outputs_changed"
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_3faea0bc7849c8a053ae3464"
          mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-6bf30d85c336a125b18a0fd0"
          plan_digest: "sha256:cd5589c341f5305f8682578a76303b1f830d55f1c2fd93a5b4a0614d304fc2a0"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 17
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-6bf30d85c336a125b18a0fd0"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202608291006-2A6BJC"
      plan-refinement:work-order-202608291006-2A6BJC-executor-dd7a823f6f10f16bf971c2a7:
        aggregate_digest: "sha256:28433fcf1bed43d76f5d2e7c90dde2296291fe4594d8607e0fdf7fd06b43a7e9"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-08-30T07:51:21.019Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_5874f5b8b4ff1a089d25f305"
          mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-dd7a823f6f10f16bf971c2a7"
          plan_digest: "sha256:450ced12ab0522ad11fbabab73b03974a1bc1cfcf6b29f5559e930904eaefa67"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608291006-2A6BJC"
          task_revision: 29
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202608291006-2A6BJC-executor-dd7a823f6f10f16bf971c2a7"
        next_revision: 30
        previous_revision: 29
        schema_version: 1
        task_id: "202608291006-2A6BJC"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "cbc5d79d1510293de3b4c30b61679cdef85d0fdb"
    version: 1
id_source: "generated"
---
## Summary

Add compatibility adapters and replay migration

Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.

## Scope

- In scope: Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
- Out of scope: unrelated refactors not required for "Add compatibility adapters and replay migration".

## Plan

Correct qualification scope for all WorkItems. Include only the reviewed compatibility candidate, exact CLI descriptor/source allowlist and existing critical CLI composition test. Retain immutable baseline, strict freshness checks and every original M0 acceptance gate.

## Verify Steps

PLANNER fallback scaffold for "Add compatibility adapters and replay migration". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add compatibility adapters and replay migration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-30T04:58:08.850Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:5ac6fe8bf7c86d938b098c8a84ee6834c83953f983eeec5f2f783128fa6cecaa

Details:

Check: affected_unit_integration
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (1/8)

Check: affected_unit_integration
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (2/8)

Check: affected_unit_integration
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (3/8)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (4/8)

Check: affected_unit_integration
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (5/8)

Check: affected_unit_integration
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (6/8)

Check: affected_unit_integration
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (7/8)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check affected_unit_integration (8/8)

Check: critical_paths
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (1/8)

Check: critical_paths
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (2/8)

Check: critical_paths
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (3/8)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (4/8)

Check: critical_paths
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (5/8)

Check: critical_paths
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (6/8)

Check: critical_paths
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (7/8)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check critical_paths (8/8)

Check: docs_contract
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (1/8)

Check: docs_contract
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (2/8)

Check: docs_contract
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (3/8)

Check: docs_contract
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (4/8)

Check: docs_contract
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (5/8)

Check: docs_contract
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (6/8)

Check: docs_contract
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (7/8)

Check: docs_contract
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check docs_contract (8/8)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check full_regression

Check: task_outcome
Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (1/8)

Check: task_outcome
Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (2/8)

Check: task_outcome
Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (3/8)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (4/8)

Check: task_outcome
Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (5/8)

Check: task_outcome
Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (6/8)

Check: task_outcome
Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (7/8)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC Verification Contract check task_outcome (8/8)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T05:56:44.233Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:04388fb46decff956f378aa208ddef3888d308e0492bd7fa9894d53655604e80

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T07:21:50.527Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:285418f098288ea7113e3dde4549eea781849af7eeeb192b0a79c58fe44c0dac

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T07:36:28.040Z — VERIFY — needs_rework

By: ORCHESTRATOR

Note: Recover the failed no-change refinement return. Request a fresh bounded implementation episode to qualify adapter capability refusal and return the missing compatibility artifact scope refinement. Preserve prior implementation.
Attempts: 2

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:f1e3781e9b8bf6b06b304e0471060469b0d473abf872f129994dff5c3a11c882

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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

### 2026-08-30T07:51:16.632Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 3

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:14f2d1aa148850434712b287721a7e1a35d4528d09687a0f0ef6b8915e5a7bb6, input_digest=sha256:ea3185aa07b20baac8750bb224fe4746f6e741eabf6fbf2cc63cba345f16539f

Details:

Command: bun run arch:check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run lifecycle:invariants
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run test:fast
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-4
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: git diff --check
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-5
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-6
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: agentplane doctor
Result: pass
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-7
Scope: branch_pr task 202608291006-2A6BJC declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202608291006-2A6BJC/supervision/declared-checks.json#check-8
Scope: branch_pr task 202608291006-2A6BJC declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608291006-2A6BJC-add-compatibility-adapters-and-replay-migration/.agentplane/tasks/202608291006-2A6BJC/blueprint/resolved-snapshot.json
- old_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- current_digest: de01a169a7c1ba12da99c26a1e9c03024b28e8ea88f99c10758e30b1a931abc9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608291006-2A6BJC

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
