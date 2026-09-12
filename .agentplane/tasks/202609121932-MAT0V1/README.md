---
id: "202609121932-MAT0V1"
title: "Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked."
status: "DOING"
priority: "high"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "task-routing"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T19:45:39.259Z"
  updated_by: "HOST:codex-local:USER"
  note: "host_user_decision=sha256:26c3472e4a606d3e754bb87e6b6e5873420bcec416f94433d92f86082c3df152"
verification:
  state: "ok"
  updated_at: "2026-09-12T20:31:20.576Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-09-12T20:33:21.242Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "858f3fc349daab7c990e7fd4fe66b1f02ab19bab"
  blueprint_digest: "75affa1a467c1e6344a2ac0ec8f371c0d40d99007d85697566bf5c44d48a134a"
  evidence_refs:
    - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/538d6ac7ee81b989d31c44b237ec748a9249418d708cc53de439d4ef869b74ab.md"
    - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202609121932-MAT0V1/quality/20260912-203129563-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202609121932-MAT0V1/README.md"
    - ".agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/f8d2fa7909b04a94b066f46cba2deb24f9c0ae13f67fb99a8a4e6d3b39561c05.patch"
    - ".agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/8f8b056961571fb1e4a204e4b56c04e758450bdb7d6d665a068c3e3e2abe0efd.json"
    - ".agentplane/tasks/202609121932-MAT0V1/verification/20260912203120576-695065f4472d17d4.json"
    - ".agentplane/tasks/202609121932-MAT0V1/quality/objects/sha256/5c34861b8e4080445b2222d70ca4383c097b5c61fd208c65c997e2916ab93c4e.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The recovery path aligns the canonical aggregate revision before projecting one compatibility mutation, and the focused regression proves both legacy reconciliation and a successful subsequent task-centric mutation."
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_ci"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "ci"
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
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Focused and full regression coverage are required before branch-PR integration."
      - "The change repairs a canonical task revision invariant in a lifecycle recovery path."
    repository_effects:
      - "ci"
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
      - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
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
    - "effect_ci"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:ci"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "ci"
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:8dfaf839c0fedde70a1764df79fa792c0b029e90da5a8d8fb4b9de0470908bd7"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
        - "effect_ci"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
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
      - "repository_effect:ci"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "858f3fc349daab7c990e7fd4fe66b1f02ab19bab"
  message: "🚧 MAT0V1 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: preserve TaskData and TaskAggregate revision alignment during planning-base recovery and reconcile legacy applied drift; focused regression and typecheck passed."
  -
    author: "CODER"
    body: "Implementation commit identity updated to the exact external-result recovery subject."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 858f3fc349da. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-12T19:35:45.995Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-12T19:49:42.488Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: preserve TaskData and TaskAggregate revision alignment during planning-base recovery and reconcile legacy applied drift; focused regression and typecheck passed."
    commit: "de969a22ce00f0b8a823f1f2be31f1ec913e2069"
  -
    type: "status"
    at: "2026-09-12T19:51:03.148Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation commit identity updated to the exact external-result recovery subject."
    commit: "fdb54b250502ad6f31f44376504f88c6b4896967"
  -
    type: "status"
    at: "2026-09-12T20:11:05.123Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 858f3fc349da. CLI accepted one state-bound external-agent semantic result."
    commit: "858f3fc349daab7c990e7fd4fe66b1f02ab19bab"
  -
    type: "verify"
    at: "2026-09-12T20:31:20.576Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-09-12T20:31:21.590Z"
doc_updated_by: "SUPERVISOR"
description: "Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked."
sections:
  Summary: |-
    Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.

    Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.
  Scope: |-
    - In scope: Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.
    - Out of scope: unrelated refactors not required for "Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.".
  Plan: "Prepared the executable recovery-revision repair plan with a nonzero-discovery focused check."
  Verify Steps: |-
    1. Run `node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000`; require nonzero discovery, revision-aligned planning-base recovery, and a successful first lifecycle mutation after recovery.
    2. In the same focused suite, require incomplete dependencies, truly missing dependencies, dirty worktrees, started WorkItems, and stale recovery tokens to remain fail-closed.
    3. Run `bun run typecheck`; require success.
    4. Run `bun run test:critical`; require existing workflow routing, stale-state, authority, and recovery cases to remain green.
    5. Run `bun run ci:local:full`; require the full local CI route to pass before integration.
    6. Review `git diff` and `git status --short --untracked-files=all`; require only the narrow planning-base recovery implementation, its test, and CLI-owned task artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-12T20:31:20.576Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3ecaf5ae3cd6e1f6c4a7a658241bb33346d06331712c7514fa732854365a08cc, input_digest=sha256:221189a618a9d78da0415dd41e0e6677a04344708ba64b207cfc1272a2194065

    Details:

    Check: affected_unit_integration
    Command: node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check affected_unit_integration (1/4)

    Check: affected_unit_integration
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check affected_unit_integration (2/4)

    Check: affected_unit_integration
    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check affected_unit_integration (3/4)

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check affected_unit_integration (4/4)

    Check: critical_paths
    Command: node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check critical_paths (1/4)

    Check: critical_paths
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check critical_paths (2/4)

    Check: critical_paths
    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check critical_paths (3/4)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check critical_paths (4/4)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check full_regression

    Check: task_outcome
    Command: node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check task_outcome (1/4)

    Check: task_outcome
    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check task_outcome (2/4)

    Check: task_outcome
    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check task_outcome (3/4)

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-4
    Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check task_outcome (4/4)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121932-MAT0V1-fix-branch-pr-dependency-readiness-after-a-depen/.agentplane/tasks/202609121932-MAT0V1/blueprint/resolved-snapshot.json
    - old_digest: 75affa1a467c1e6344a2ac0ec8f371c0d40d99007d85697566bf5c44d48a134a
    - current_digest: 75affa1a467c1e6344a2ac0ec8f371c0d40d99007d85697566bf5c44d48a134a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609121932-MAT0V1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609121932-MAT0V1
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
    actor: "HOST:codex-local:USER"
    approval_evidence_digest: "sha256:26c3472e4a606d3e754bb87e6b6e5873420bcec416f94433d92f86082c3df152"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:529710c08d24e61c12f0e1588e695c6c6cd542b5c2f35c536ba7dfc9e66bbcdf"
    digest: "sha256:ea1ce9dd1e9a02f4d6b14e59afeca0bb152c2466d0668578298603cef3e13705"
    grant_id: "f9695569-3430-4897-893d-81200f4ae7d3"
    issued_at: "2026-09-12T19:45:39.259Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c3edd52151c35463fcdea6d879266215956d150c0f68ccff8d01113f6f190145"
    plan_revision: 11
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:c6c9e697a522b2f54be36910d921e8bdba1d9082f7afd4982cdb0c6dfce545ac"
    status: "active"
    task_id: "202609121932-MAT0V1"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T19:45:39.259Z"
        approved_by: "HOST:codex-local:USER"
        approved_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-12T19:45:00.373Z"
      digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
      proposal:
        assumptions:
          - "Recovery remains limited to an approved untouched task worktree and retains every existing CAS and pristine-state guard."
        planning_baseline:
          captured_at: "2026-09-12T19:44:08.615Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:46d56f65aba1b87d02175c4e128141d3b00c5632c0ce47ad8dee4c8b87e8c34b"
          dirty_paths:
            - ".agentplane/tasks/202609121932-MAT0V1/README.md"
            - ".agentplane/tasks/202609121932-MAT0V1/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202609121932-MAT0V1/pr/diffstat.txt"
            - ".agentplane/tasks/202609121932-MAT0V1/pr/github-body.md"
            - ".agentplane/tasks/202609121932-MAT0V1/pr/github-title.txt"
            - ".agentplane/tasks/202609121932-MAT0V1/pr/meta.json"
            - ".agentplane/tasks/202609121932-MAT0V1/pr/review.md"
          git:
            kind: "commit"
            ref: null
            sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:9"
        schema_version: 1
        task_id: "202609121932-MAT0V1"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000"
              id: "focused-regression"
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
              command: "bun run test:critical"
              id: "critical"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "focused-regression"
                - "typecheck"
                - "critical"
                - "full-ci"
              description: "Planning-base recovery advances the stale worktree and keeps TaskData.revision equal to the canonical TaskAggregate.revision."
              id: "recovery-revision-invariant"
              required: true
            -
              check_ids:
                - "focused-regression"
                - "critical"
              description: "The first task-centric lifecycle mutation after recovery succeeds, while incomplete and truly missing dependency states remain fail-closed."
              id: "post-recovery-lifecycle"
              required: true
          evidence_fingerprint: "sha256:46d56f65aba1b87d02175c4e128141d3b00c5632c0ce47ad8dee4c8b87e8c34b"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-regression"
                    - "typecheck"
                    - "critical"
                    - "full-ci"
                  description: "Planning-base recovery advances the stale worktree and keeps TaskData.revision equal to the canonical TaskAggregate.revision."
                  id: "recovery-revision-invariant"
                  required: true
                -
                  check_ids:
                    - "focused-regression"
                    - "critical"
                  description: "The first task-centric lifecycle mutation after recovery succeeds, while incomplete and truly missing dependency states remain fail-closed."
                  id: "post-recovery-lifecycle"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources:
                  - "source-artifact-1"
                  - "source-artifact-7"
                required_sources:
                  - "task-document"
                  - "policy-module-1"
                  - "policy-module-2"
                  - "policy-module-3"
                  - "policy-module-4"
                symbol_hints:
                  - "recoverWorkPlanningBase"
                  - "projectTaskCentricCompatibilityMutation"
                  - "taskCentricAggregateFromExtensions"
                  - "task start-ready"
              depends_on: []
              expected_outputs:
                - "Revision-aligned planning-base recovery publication."
                - "Focused regression coverage for the first lifecycle mutation after recovery and fail-closed dependency states."
              id: "WI-01"
              objective: "Preserve the canonical task-centric revision invariant during CAS-protected planning-base recovery and prove the next lifecycle mutation remains executable."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000"
                    id: "focused-regression"
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
                    command: "bun run test:critical"
                    id: "critical"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "focused-regression"
                      - "typecheck"
                      - "critical"
                      - "full-ci"
                    description: "Planning-base recovery advances the stale worktree and keeps TaskData.revision equal to the canonical TaskAggregate.revision."
                    id: "recovery-revision-invariant"
                    required: true
                  -
                    check_ids:
                      - "focused-regression"
                      - "critical"
                    description: "The first task-centric lifecycle mutation after recovery succeeds, while incomplete and truly missing dependency states remain fail-closed."
                    id: "post-recovery-lifecycle"
                    required: true
                evidence_fingerprint: "sha256:46d56f65aba1b87d02175c4e128141d3b00c5632c0ce47ad8dee4c8b87e8c34b"
                schema_version: 1
      revision: 3
      schema_version: 1
      task_id: "202609121932-MAT0V1"
    event_cursor: 13
    final_validation: null
    id: "202609121932-MAT0V1"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-12T19:32:01.052Z"
      constraints: []
      request: |-
        Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.

        Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.
      task_id: "202609121932-MAT0V1"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-12T19:35:41.055Z"
          approved_by: "HOST:codex-local:USER"
          approved_digest: "sha256:3be06d446d863d363a9332e40d635d880d0651dd7426d04f27203e692048b693"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-12T19:34:17.814Z"
        digest: "sha256:3be06d446d863d363a9332e40d635d880d0651dd7426d04f27203e692048b693"
        proposal:
          assumptions:
            - "The canonical base checkout remains the source of truth for dependency task completion after the branch worktree is created."
          planning_baseline:
            captured_at: "2026-09-12T19:32:05.243Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:4a4b9c49aadd70dd8d80a13f098ebcbf3e232d3de7597ed24fd805ec69e366cb"
            dirty_paths:
              - ".agentplane/tasks/202609072121-9VEHKH/README.md"
              - ".agentplane/tasks/202609080727-BAWTEE/README.md"
              - ".agentplane/tasks/202609121424-3YAX44/README.md"
              - ".agentplane/tasks/202609121424-49XXT3/README.md"
              - ".agentplane/tasks/202609121424-4BC7B3/README.md"
              - ".agentplane/tasks/202609121424-ZEJ656/README.md"
              - ".agentplane/tasks/202609121932-MAT0V1/README.md"
              - "agentplane-roadmap-r2/AGENT-START.md"
              - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
              - "agentplane-roadmap-r2/README.md"
              - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
              - "agentplane-roadmap-r2/checksums.json"
              - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
              - "agentplane-roadmap-r2/coverage-map.json"
              - "agentplane-roadmap-r2/dependency-graph.json"
              - "agentplane-roadmap-r2/experiment-requirements.json"
              - "agentplane-roadmap-r2/releases/0.7.10.md"
              - "agentplane-roadmap-r2/releases/0.7.11.md"
              - "agentplane-roadmap-r2/releases/0.7.12.md"
              - "agentplane-roadmap-r2/releases/0.7.13.md"
              - "agentplane-roadmap-r2/releases/0.7.14.md"
              - "agentplane-roadmap-r2/releases/0.7.9.md"
              - "agentplane-roadmap-r2/source-evidence.json"
              - "agentplane-roadmap-r2/tasks.json"
              - "agentplane-roadmap-r2/tasks/BP-01.md"
              - "agentplane-roadmap-r2/tasks/BP-02.md"
              - "agentplane-roadmap-r2/tasks/BP-03.md"
              - "agentplane-roadmap-r2/tasks/BP-04.md"
              - "agentplane-roadmap-r2/tasks/BP-05.md"
              - "agentplane-roadmap-r2/tasks/BP-06.md"
              - "agentplane-roadmap-r2/tasks/BP-07.md"
              - "agentplane-roadmap-r2/tasks/BP-08.md"
              - "agentplane-roadmap-r2/tasks/BP-09.md"
              - "agentplane-roadmap-r2/tasks/BP-10.md"
              - "agentplane-roadmap-r2/tasks/BP-11.md"
              - "agentplane-roadmap-r2/tasks/BP-12.md"
              - "agentplane-roadmap-r2/tasks/BP-13.md"
              - "agentplane-roadmap-r2/tasks/BP-14.md"
              - "agentplane-roadmap-r2/tasks/BP-15.md"
              - "agentplane-roadmap-r2/tasks/BP-16.md"
              - "agentplane-roadmap-r2/tasks/BP-17.md"
              - "agentplane-roadmap-r2/tasks/BP-18.md"
              - "agentplane-roadmap-r2/tasks/BP-19.md"
              - "agentplane-roadmap-r2/tasks/BP-20.md"
              - "agentplane-roadmap-r2/tasks/BP-21.md"
              - "agentplane-roadmap-r2/tasks/BP-22.md"
              - "agentplane-roadmap-r2/tasks/BP-23.md"
              - "agentplane-roadmap-r2/tasks/BP-24.md"
              - "agentplane-roadmap-r2/tasks/BP-25.md"
              - "agentplane-roadmap-r2/tasks/BP-26.md"
              - "agentplane-roadmap-r2/tasks/BP-27.md"
              - "agentplane-roadmap-r2/tasks/BP-28.md"
              - "agentplane-roadmap-r2/tasks/BP-29.md"
              - "agentplane-roadmap-r2/tasks/BP-30.md"
              - "agentplane-roadmap-r2/tasks/BP-31.md"
              - "agentplane-roadmap-r2/tasks/EV-01.md"
              - "agentplane-roadmap-r2/tasks/EV-02.md"
              - "agentplane-roadmap-r2/tasks/EV-03.md"
              - "agentplane-roadmap-r2/tasks/EV-04.md"
              - "agentplane-roadmap-r2/tasks/EV-05.md"
              - "agentplane-roadmap-r2/tasks/EV-06.md"
              - "agentplane-roadmap-r2/tasks/EV-07.md"
              - "agentplane-roadmap-r2/tasks/EV-08.md"
              - "agentplane-roadmap-r2/tasks/EV-09.md"
              - "agentplane-roadmap-r2/tasks/EV-10.md"
              - "agentplane-roadmap-r2/tasks/EV-11.md"
              - "agentplane-roadmap-r2/tasks/EV-12.md"
              - "agentplane-roadmap-r2/tasks/EV-13.md"
              - "agentplane-roadmap-r2/tasks/LC-01.md"
              - "agentplane-roadmap-r2/tasks/LC-02.md"
              - "agentplane-roadmap-r2/tasks/LC-03.md"
              - "agentplane-roadmap-r2/tasks/LC-04.md"
              - "agentplane-roadmap-r2/tasks/LC-05.md"
              - "agentplane-roadmap-r2/tasks/LC-06.md"
              - "agentplane-roadmap-r2/tasks/LC-07.md"
              - "agentplane-roadmap-r2/tasks/LC-08.md"
              - "agentplane-roadmap-r2/tasks/LC-09.md"
              - "agentplane-roadmap-r2/tasks/LC-10.md"
              - "agentplane-roadmap-r2/tasks/LC-11.md"
              - "agentplane-roadmap-r2/tasks/LC-12.md"
              - "agentplane-roadmap-r2/tasks/LC-13.md"
              - "agentplane-roadmap-r2/tasks/LC-14.md"
              - "agentplane-roadmap-r2/tasks/LC-15.md"
              - "agentplane-roadmap-r2/tasks/LC-16.md"
              - "agentplane-roadmap-r2/tasks/LC-17.md"
              - "agentplane-roadmap-r2/tasks/LC-18.md"
              - "agentplane-roadmap-r2/tasks/LC-19.md"
              - "agentplane-roadmap-r2/tasks/LC-20.md"
              - "agentplane-roadmap-r2/tasks/LC-21.md"
              - "agentplane-roadmap-r2/tasks/LC-22.md"
              - "agentplane-roadmap-r2/tasks/LC-23.md"
              - "agentplane-roadmap-r2/tasks/PL-01.md"
              - "agentplane-roadmap-r2/tasks/PL-02.md"
              - "agentplane-roadmap-r2/tasks/PL-03.md"
              - "agentplane-roadmap-r2/tasks/PL-04.md"
              - "agentplane-roadmap-r2/tasks/PL-05.md"
              - "agentplane-roadmap-r2/tasks/PL-06.md"
              - "agentplane-roadmap-r2/tasks/PL-07.md"
              - "agentplane-roadmap-r2/tasks/PL-08.md"
              - "agentplane-roadmap-r2/tasks/PL-09.md"
              - "agentplane-roadmap-r2/tasks/PL-10.md"
              - "agentplane-roadmap-r2/tasks/PL-11.md"
              - "agentplane-roadmap-r2/tasks/PL-12.md"
              - "agentplane-roadmap-r2/tasks/RC-01.md"
              - "agentplane-roadmap-r2/tasks/RC-02.md"
              - "agentplane-roadmap-r2/tasks/RC-03.md"
              - "agentplane-roadmap-r2/tasks/RC-04.md"
              - "agentplane-roadmap-r2/tasks/RC-05.md"
              - "agentplane-roadmap-r2/tasks/RC-06.md"
              - "agentplane-roadmap-r2/tasks/RC-07.md"
              - "agentplane-roadmap-r2/tasks/RC-08.md"
              - "agentplane-roadmap-r2/tasks/RC-09.md"
              - "agentplane-roadmap-r2/tasks/RC-10.md"
              - "agentplane-roadmap-r2/tasks/RC-11.md"
              - "agentplane-roadmap-r2/tasks/RC-12.md"
              - "agentplane-roadmap-r2/tasks/RC-13.md"
              - "agentplane-roadmap-r2/tasks/RC-14.md"
              - "agentplane-roadmap-r2/tasks/RC-15.md"
              - "agentplane-roadmap-r2/tasks/RC-16.md"
              - "agentplane-roadmap-r2/tasks/RC-17.md"
              - "agentplane-roadmap-r2/tasks/RC-18.md"
              - "agentplane-roadmap-r2/tasks/ST-01.md"
              - "agentplane-roadmap-r2/tasks/ST-02.md"
              - "agentplane-roadmap-r2/tasks/ST-03.md"
              - "agentplane-roadmap-r2/tasks/ST-04.md"
              - "agentplane-roadmap-r2/tasks/ST-05.md"
              - "agentplane-roadmap-r2/tasks/ST-06.md"
              - "agentplane-roadmap-r2/tasks/ST-07.md"
              - "agentplane-roadmap-r2/tasks/ST-08.md"
              - "agentplane-roadmap-r2/tasks/ST-09.md"
              - "agentplane-roadmap-r2/tasks/ST-10.md"
              - "agentplane-roadmap-r2/tasks/ST-11.md"
              - "agentplane-roadmap-r2/tasks/ST-12.md"
              - "agentplane-roadmap-r2/tasks/ST-13.md"
              - "agentplane-roadmap-r2/tasks/ST-14.md"
              - "agentplane-roadmap-r2/tasks/ST-15.md"
              - "agentplane-roadmap-r2/tasks/ST-16.md"
              - "agentplane-roadmap-r2/tasks/ST-17.md"
              - "agentplane-roadmap-r2/tasks/ST-18.md"
              - "agentplane-roadmap-r2/tasks/ST-19.md"
              - "agentplane-roadmap-r2/tasks/ST-20.md"
              - "agentplane-roadmap-r2/tasks/ST-21.md"
              - "agentplane-roadmap-r2/validate_roadmap.py"
              - "agentplane-roadmap-r2/validation-report.json"
            git:
              kind: "commit"
              ref: null
              sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                id: "focused-regression"
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
                command: "bun run test:critical"
                id: "critical"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-regression"
                  - "typecheck"
                  - "critical"
                description: "A branch-PR route uses the canonical base task projection when its stale task worktree cannot resolve a declared dependency."
                id: "canonical-dependency-readiness"
                required: true
              -
                check_ids:
                  - "focused-regression"
                  - "critical"
                description: "Incomplete and truly missing dependencies remain blocked and no unrelated lifecycle authority changes."
                id: "fail-closed-dependencies"
                required: true
            evidence_fingerprint: "sha256:4a4b9c49aadd70dd8d80a13f098ebcbf3e232d3de7597ed24fd805ec69e366cb"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-regression"
                      - "typecheck"
                      - "critical"
                    description: "A branch-PR route uses the canonical base task projection when its stale task worktree cannot resolve a declared dependency."
                    id: "canonical-dependency-readiness"
                    required: true
                  -
                    check_ids:
                      - "focused-regression"
                      - "critical"
                    description: "Incomplete and truly missing dependencies remain blocked and no unrelated lifecycle authority changes."
                    id: "fail-closed-dependencies"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 131072
                  optional_sources:
                    - "source-artifact-1"
                    - "source-artifact-7"
                  required_sources:
                    - "task-document"
                    - "policy-module-1"
                    - "policy-module-2"
                    - "policy-module-3"
                    - "policy-module-4"
                  symbol_hints:
                    - "deriveBlockers"
                    - "taskDependencyReadinessBlocker"
                    - "resolveTaskDependencyState"
                    - "baseCheckoutPath"
                depends_on: []
                expected_outputs:
                  - "A narrow dependency lookup repair in the route decision path."
                  - "Regression tests for DONE, incomplete, and missing dependency states across stale worktree and current base projections."
                id: "WI-01"
                objective: "Resolve branch-PR dependency readiness from the canonical base task backend when the task worktree projection predates the dependency artifact."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task/shared"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                      id: "focused-regression"
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
                      command: "bun run test:critical"
                      id: "critical"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-regression"
                        - "typecheck"
                        - "critical"
                      description: "A branch-PR route uses the canonical base task projection when its stale task worktree cannot resolve a declared dependency."
                      id: "canonical-dependency-readiness"
                      required: true
                    -
                      check_ids:
                        - "focused-regression"
                        - "critical"
                      description: "Incomplete and truly missing dependencies remain blocked and no unrelated lifecycle authority changes."
                      id: "fail-closed-dependencies"
                      required: true
                  evidence_fingerprint: "sha256:4a4b9c49aadd70dd8d80a13f098ebcbf3e232d3de7597ed24fd805ec69e366cb"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      -
        approval:
          approved_at: "2026-09-12T19:40:30.496Z"
          approved_by: "HOST:codex-local:USER"
          approved_digest: "sha256:6b59a250733a32241b8a3c6207e7b80cab2b94c68f2702698fe4b1c242cf27ec"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-12T19:40:08.504Z"
        digest: "sha256:6b59a250733a32241b8a3c6207e7b80cab2b94c68f2702698fe4b1c242cf27ec"
        proposal:
          assumptions:
            - "The recovery operation remains limited to an approved, untouched task worktree and retains all existing CAS and pristine-state guards."
          planning_baseline:
            captured_at: "2026-09-12T19:39:06.889Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:e275d78a25c7f150fef7776fbfcfb972ea2e239ddb43857dcdff1d98534e36ba"
            dirty_paths:
              - ".agentplane/tasks/202609121932-MAT0V1/README.md"
              - ".agentplane/tasks/202609121932-MAT0V1/blueprint/resolved-snapshot.json"
              - ".agentplane/tasks/202609121932-MAT0V1/pr/diffstat.txt"
              - ".agentplane/tasks/202609121932-MAT0V1/pr/github-body.md"
              - ".agentplane/tasks/202609121932-MAT0V1/pr/github-title.txt"
              - ".agentplane/tasks/202609121932-MAT0V1/pr/meta.json"
              - ".agentplane/tasks/202609121932-MAT0V1/pr/review.md"
            git:
              kind: "commit"
              ref: null
              sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:6"
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                id: "focused-regression"
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
                command: "bun run test:critical"
                id: "critical"
                kind: "deterministic"
                required: true
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-ci"
                kind: "deterministic"
                required: true
            criteria:
              -
                check_ids:
                  - "focused-regression"
                  - "typecheck"
                  - "critical"
                  - "full-ci"
                description: "Planning-base recovery advances the stale worktree and keeps TaskData.revision equal to the canonical TaskAggregate.revision."
                id: "recovery-revision-invariant"
                required: true
              -
                check_ids:
                  - "focused-regression"
                  - "critical"
                description: "The first task-centric lifecycle mutation after recovery succeeds, while incomplete and truly missing dependency states remain fail-closed."
                id: "post-recovery-lifecycle"
                required: true
            evidence_fingerprint: "sha256:e275d78a25c7f150fef7776fbfcfb972ea2e239ddb43857dcdff1d98534e36ba"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-regression"
                      - "typecheck"
                      - "critical"
                      - "full-ci"
                    description: "Planning-base recovery advances the stale worktree and keeps TaskData.revision equal to the canonical TaskAggregate.revision."
                    id: "recovery-revision-invariant"
                    required: true
                  -
                    check_ids:
                      - "focused-regression"
                      - "critical"
                    description: "The first task-centric lifecycle mutation after recovery succeeds, while incomplete and truly missing dependency states remain fail-closed."
                    id: "post-recovery-lifecycle"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 131072
                  optional_sources:
                    - "source-artifact-1"
                    - "source-artifact-7"
                  required_sources:
                    - "task-document"
                    - "policy-module-1"
                    - "policy-module-2"
                    - "policy-module-3"
                    - "policy-module-4"
                  symbol_hints:
                    - "recoverWorkPlanningBase"
                    - "projectTaskCentricCompatibilityMutation"
                    - "taskCentricAggregateFromExtensions"
                    - "task start-ready"
                depends_on: []
                expected_outputs:
                  - "Revision-aligned planning-base recovery publication."
                  - "Focused regression coverage for the first lifecycle mutation after recovery and fail-closed dependency states."
                id: "WI-01"
                objective: "Preserve the canonical task-centric revision invariant during CAS-protected planning-base recovery and prove the next lifecycle mutation remains executable."
                optional: false
                priority: 100
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/branch/work-resume-planning-base.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun run test:project agentplane --maxWorkers=1 packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts"
                      id: "focused-regression"
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
                      command: "bun run test:critical"
                      id: "critical"
                      kind: "deterministic"
                      required: true
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-ci"
                      kind: "deterministic"
                      required: true
                  criteria:
                    -
                      check_ids:
                        - "focused-regression"
                        - "typecheck"
                        - "critical"
                        - "full-ci"
                      description: "Planning-base recovery advances the stale worktree and keeps TaskData.revision equal to the canonical TaskAggregate.revision."
                      id: "recovery-revision-invariant"
                      required: true
                    -
                      check_ids:
                        - "focused-regression"
                        - "critical"
                      description: "The first task-centric lifecycle mutation after recovery succeeds, while incomplete and truly missing dependency states remain fail-closed."
                      id: "post-recovery-lifecycle"
                      required: true
                  evidence_fingerprint: "sha256:e275d78a25c7f150fef7776fbfcfb972ea2e239ddb43857dcdff1d98534e36ba"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609121932-MAT0V1"
    revision: 21
    schema_version: 1
    updated_at: "2026-09-12T20:31:21.590Z"
    work_items:
      WI-01:
        attempt: 2
        claim_id: null
        id: "WI-01"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:9ab80cd1635d3029cc5c46013f6896c5eda1cbc5dce9bab54139cc783dce2315"
            id: "Revision-aligned planning-base recovery publication."
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 3
              task_id: "202609121932-MAT0V1"
              work_item_id: "WI-01"
            provenance:
              - "sha256:345eb903a7682add6c36bc3734b0f230ac3ba636269a21736542565d3fa3082b"
              - ".agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:4332496c8b797cb3edab1ae731ce6c71dbf16f3fd6a42217388c05e1eb636201"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:ab79082f50e3f230262ea2dd33d02ee9bcb999e4f3002741e9f7fa444d69f07a"
            id: "Focused regression coverage for the first lifecycle mutation after recovery and fail-closed dependency states."
            kind: "semantic_output"
            producer:
              attempt: 2
              plan_revision: 3
              task_id: "202609121932-MAT0V1"
              work_item_id: "WI-01"
            provenance:
              - "sha256:345eb903a7682add6c36bc3734b0f230ac3ba636269a21736542565d3fa3082b"
              - ".agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:4332496c8b797cb3edab1ae731ce6c71dbf16f3fd6a42217388c05e1eb636201"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 3
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json"
              check_id: "focused-regression"
              command_identity: "node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000"
              detail: "Observed by node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000."
              exit_code: 0
              observed_at: "2026-09-12T20:21:02.771Z"
              repository_snapshot_digest: "sha256:4332496c8b797cb3edab1ae731ce6c71dbf16f3fd6a42217388c05e1eb636201"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-09-12T20:21:02.771Z"
              repository_snapshot_digest: "sha256:4332496c8b797cb3edab1ae731ce6c71dbf16f3fd6a42217388c05e1eb636201"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json"
              check_id: "critical"
              command_identity: "bun run test:critical"
              detail: "Observed by bun run test:critical."
              exit_code: 0
              observed_at: "2026-09-12T20:21:02.771Z"
              repository_snapshot_digest: "sha256:4332496c8b797cb3edab1ae731ce6c71dbf16f3fd6a42217388c05e1eb636201"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json"
              check_id: "full-ci"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-09-12T20:21:02.771Z"
              repository_snapshot_digest: "sha256:4332496c8b797cb3edab1ae731ce6c71dbf16f3fd6a42217388c05e1eb636201"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-12T19:39:05.423Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
          - "acceptance_changed"
        entity: "task"
        id: "event_dc74708ae8a4674f813af974"
        mutation_id: "plan-refinement:work-order-202609121932-MAT0V1-executor-2886d62fb018cba555d15c46"
        plan_digest: "sha256:3be06d446d863d363a9332e40d635d880d0651dd7426d04f27203e692048b693"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121932-MAT0V1"
        task_revision: 5
        work_item_id: null
      -
        at: "2026-09-12T19:44:07.118Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_6d4aa2d1771b8b90082ad62f"
        mutation_id: "plan-refinement:work-order-202609121932-MAT0V1-executor-89d1e6515091c23d1e3a9610"
        plan_digest: "sha256:6b59a250733a32241b8a3c6207e7b80cab2b94c68f2702698fe4b1c242cf27ec"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121932-MAT0V1"
        task_revision: 8
        work_item_id: null
      -
        at: "2026-09-12T20:05:51.620Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:cf37133a2b806bf9e6c55e9898b03b4b5eaeaf43019cf5dd86dd22d63f90e46c"
        entity: "work_item"
        id: "event_aadc19a5db6eb96e3496b366"
        mutation_id: "external-result:work-order-202609121932-MAT0V1-executor-542106585c046f44923824d8"
        plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
        plan_revision: 3
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121932-MAT0V1"
        task_revision: 15
        work_item_id: "WI-01"
      -
        at: "2026-09-12T20:21:02.785Z"
        from: "REWORK_READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:ef3dd7689f5edd466515e5febc9b713e21f92a3bf16e885f52245878ff44fe0d"
        entity: "work_item"
        id: "event_d4c6b92f597895cf7e310f18"
        mutation_id: "external-result:work-order-202609121932-MAT0V1-executor-15e0100962c4b4547d755aa9"
        plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
        plan_revision: 3
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609121932-MAT0V1"
        task_revision: 18
        work_item_id: "WI-01"
    leases: []
    mutation_receipts:
      compatibility:sha256:030777714651d5dede420cc39548207af0fe52b14a7ee41d9b72459ff11f574a:
        aggregate_digest: "sha256:9511932d8cc8a8ba7628370a8a9906883267329b4d0b7643ffe2f7f668c1e4da"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:35:21.487Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8353128283fed65e141b4cf8"
          mutation_id: "compatibility:sha256:030777714651d5dede420cc39548207af0fe52b14a7ee41d9b72459ff11f574a"
          plan_digest: "sha256:3be06d446d863d363a9332e40d635d880d0651dd7426d04f27203e692048b693"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:030777714651d5dede420cc39548207af0fe52b14a7ee41d9b72459ff11f574a"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:2c6097e1b5afc1656c1848136e07ce91d6edd6e81f4719e793e864249932cb3e:
        aggregate_digest: "sha256:297744506a700abb1d9f523a6ba3c4a2332aa3135d43af4ef9347bc976568fc1"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:45:15.964Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_961d1bcdfa33c88bc56abd52"
          mutation_id: "compatibility:sha256:2c6097e1b5afc1656c1848136e07ce91d6edd6e81f4719e793e864249932cb3e"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 10
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:2c6097e1b5afc1656c1848136e07ce91d6edd6e81f4719e793e864249932cb3e"
        next_revision: 11
        previous_revision: 10
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:4a6d92d02d6ee0e6d9d1d0d134d7bf3eb0efee6a6ee30b85d919214d93a1454b:
        aggregate_digest: "sha256:24c322096aee786298a074d894678d2d2f38aa8f9ae792e5fb73e01fdc9769d7"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:51:03.148Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_7131f68954cde53fc1d81787"
          mutation_id: "compatibility:sha256:4a6d92d02d6ee0e6d9d1d0d134d7bf3eb0efee6a6ee30b85d919214d93a1454b"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4a6d92d02d6ee0e6d9d1d0d134d7bf3eb0efee6a6ee30b85d919214d93a1454b"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:532d878c498dbafd19957d8798f56d76650b8c4f3ae81ead84cd5c0c47d565f4:
        aggregate_digest: "sha256:7cd1a74c348d211a54158996be41404d9f2fc3e9ff4833c26b50058914a1a83a"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:51:03.148Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_e121657f9ba5229c1fbd64ae"
          mutation_id: "compatibility:sha256:532d878c498dbafd19957d8798f56d76650b8c4f3ae81ead84cd5c0c47d565f4"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:532d878c498dbafd19957d8798f56d76650b8c4f3ae81ead84cd5c0c47d565f4"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:6649c879bc61f38b9c2c85f837d7929cc955daa087abe02f299d00d18f90f5e7:
        aggregate_digest: "sha256:2ec34eb773146b769a10fff7d82e1c69ec56bf2fde449372f8df72e3daa59919"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T20:31:21.589Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_17a510d23f9bb93904a305e5"
          mutation_id: "compatibility:sha256:6649c879bc61f38b9c2c85f837d7929cc955daa087abe02f299d00d18f90f5e7"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 19
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6649c879bc61f38b9c2c85f837d7929cc955daa087abe02f299d00d18f90f5e7"
        next_revision: 20
        previous_revision: 19
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:66ac2f6dfe0699edb29af17057a29bf4f6f7e7ea005554522753f9caafe7ad8c:
        aggregate_digest: "sha256:8420d0ad6236737b134e5a4a45f64d5f77daf295ad37c88f7b208459f10cbb78"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:49:42.488Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_21628ccb2f36d4b211002216"
          mutation_id: "compatibility:sha256:66ac2f6dfe0699edb29af17057a29bf4f6f7e7ea005554522753f9caafe7ad8c"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:66ac2f6dfe0699edb29af17057a29bf4f6f7e7ea005554522753f9caafe7ad8c"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:78dc0345e3530a4b57b41ea080867c769e73c8bb06afa229e9a8dc00240658ad:
        aggregate_digest: "sha256:1a6720578fbb51f99607bc2bae31a3f92d0c382bc50bebed992eb25c298e83c8"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:40:08.510Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_5184520f63ffddc2edd13ba0"
          mutation_id: "compatibility:sha256:78dc0345e3530a4b57b41ea080867c769e73c8bb06afa229e9a8dc00240658ad"
          plan_digest: "sha256:6b59a250733a32241b8a3c6207e7b80cab2b94c68f2702698fe4b1c242cf27ec"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:78dc0345e3530a4b57b41ea080867c769e73c8bb06afa229e9a8dc00240658ad"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:7a759433e77d14c630e3395ba2959a0d8be91256f188f016de1e012e3d8ea520:
        aggregate_digest: "sha256:d3a5aabc57b7acb67f5afc550c0eababef83d23f872d83069ec5725268d3fd1e"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:45:15.966Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_89deedd069b0740fc2b59090"
          mutation_id: "compatibility:sha256:7a759433e77d14c630e3395ba2959a0d8be91256f188f016de1e012e3d8ea520"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 11
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:7a759433e77d14c630e3395ba2959a0d8be91256f188f016de1e012e3d8ea520"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:992e04614f7351818393be1d099713554d581a8539436fb4d9bbe3c557dbbd1b:
        aggregate_digest: "sha256:80aefd06c6e7bca2e4f0cc88cedbbbfbedddff7bb39770f699f230d2c45c4d3e"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T20:11:05.123Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_692b7e6e3777845c349e899d"
          mutation_id: "compatibility:sha256:992e04614f7351818393be1d099713554d581a8539436fb4d9bbe3c557dbbd1b"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 17
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:992e04614f7351818393be1d099713554d581a8539436fb4d9bbe3c557dbbd1b"
        next_revision: 18
        previous_revision: 17
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:a4e07cdef65664d72250317b0d927e62ed7c37973a1d820a791c822f1a409c09:
        aggregate_digest: "sha256:a3cfc84546702d105652fd925b5cd96ad17d251d43475b568e0d2e11cf714d8d"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T20:11:05.123Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5155ef914b3a8b517456eba7"
          mutation_id: "compatibility:sha256:a4e07cdef65664d72250317b0d927e62ed7c37973a1d820a791c822f1a409c09"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 16
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a4e07cdef65664d72250317b0d927e62ed7c37973a1d820a791c822f1a409c09"
        next_revision: 17
        previous_revision: 16
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:bea8f18feaa170f5ab1721fcd3e33d0754acefa2267df8069dbe266bbb7b838b:
        aggregate_digest: "sha256:72693d6821b897c53cfd73ac6bd795abb54247681cf5c17712ec6f5844c35f00"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:35:45.995Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f17f4e683bedee254f1fbf64"
          mutation_id: "compatibility:sha256:bea8f18feaa170f5ab1721fcd3e33d0754acefa2267df8069dbe266bbb7b838b"
          plan_digest: "sha256:3be06d446d863d363a9332e40d635d880d0651dd7426d04f27203e692048b693"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:bea8f18feaa170f5ab1721fcd3e33d0754acefa2267df8069dbe266bbb7b838b"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:f8827162dbbb476df2b1c9907ad242c139a1b972cc59f140de3dc2e5c52371a3:
        aggregate_digest: "sha256:e0102eadfb2e0186fe6da4303898b5bb10768130dbd720744f12465a00cbf0b2"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T19:35:21.486Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_9ad44251a2a87e7be103597a"
          mutation_id: "compatibility:sha256:f8827162dbbb476df2b1c9907ad242c139a1b972cc59f140de3dc2e5c52371a3"
          plan_digest: "sha256:3be06d446d863d363a9332e40d635d880d0651dd7426d04f27203e692048b693"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:f8827162dbbb476df2b1c9907ad242c139a1b972cc59f140de3dc2e5c52371a3"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      compatibility:sha256:f8a9007103b75dd6511575ba89763a1193cc7f74b27c723945ea6b7aa6affc46:
        aggregate_digest: "sha256:dbbb1cc1751769e88be1885c7b8ac035d9ef354abdb219065bfebddc3d69b34f"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T20:31:21.590Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8d17aaebfed3d42eaa185295"
          mutation_id: "compatibility:sha256:f8a9007103b75dd6511575ba89763a1193cc7f74b27c723945ea6b7aa6affc46"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 20
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:f8a9007103b75dd6511575ba89763a1193cc7f74b27c723945ea6b7aa6affc46"
        next_revision: 21
        previous_revision: 20
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      external-result:work-order-202609121932-MAT0V1-executor-15e0100962c4b4547d755aa9:
        aggregate_digest: "sha256:afec0164c559a3d4b77f595fc2f45aef6e84261765ad8ae6a4de264780b36494"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T20:21:02.785Z"
          cause_refs:
            - "semantic-result:sha256:ef3dd7689f5edd466515e5febc9b713e21f92a3bf16e885f52245878ff44fe0d"
          entity: "work_item"
          from: "REWORK_READY"
          id: "event_d4c6b92f597895cf7e310f18"
          mutation_id: "external-result:work-order-202609121932-MAT0V1-executor-15e0100962c4b4547d755aa9"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 18
          to: "COMPLETED"
          work_item_id: "WI-01"
        mutation_id: "external-result:work-order-202609121932-MAT0V1-executor-15e0100962c4b4547d755aa9"
        next_revision: 19
        previous_revision: 18
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      external-result:work-order-202609121932-MAT0V1-executor-542106585c046f44923824d8:
        aggregate_digest: "sha256:f20ef399a8a6509c23a0a06f611c921608bf3d8c53a08458c79407386e332448"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T20:05:51.620Z"
          cause_refs:
            - "semantic-result:sha256:cf37133a2b806bf9e6c55e9898b03b4b5eaeaf43019cf5dd86dd22d63f90e46c"
          entity: "work_item"
          from: "READY"
          id: "event_aadc19a5db6eb96e3496b366"
          mutation_id: "external-result:work-order-202609121932-MAT0V1-executor-542106585c046f44923824d8"
          plan_digest: "sha256:f6eee473a1d7c1663ce94f01e6a2efa4c7ba9d84e518d9ac78cac73de8eaddbc"
          plan_revision: 3
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 15
          to: "REWORK_READY"
          work_item_id: "WI-01"
        mutation_id: "external-result:work-order-202609121932-MAT0V1-executor-542106585c046f44923824d8"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      plan-refinement:work-order-202609121932-MAT0V1-executor-2886d62fb018cba555d15c46:
        aggregate_digest: "sha256:bb1405b9b21594409e4d924d68d545ef5a320401c2b348458993f45a6cceeeef"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-12T19:39:05.423Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_dc74708ae8a4674f813af974"
          mutation_id: "plan-refinement:work-order-202609121932-MAT0V1-executor-2886d62fb018cba555d15c46"
          plan_digest: "sha256:3be06d446d863d363a9332e40d635d880d0651dd7426d04f27203e692048b693"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 5
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121932-MAT0V1-executor-2886d62fb018cba555d15c46"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121932-MAT0V1"
      plan-refinement:work-order-202609121932-MAT0V1-executor-89d1e6515091c23d1e3a9610:
        aggregate_digest: "sha256:f2cc10006af0c68c0a1ecd140b4b1755df3c3de90d62358b85b6e83c6dc89910"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-12T19:44:07.118Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_6d4aa2d1771b8b90082ad62f"
          mutation_id: "plan-refinement:work-order-202609121932-MAT0V1-executor-89d1e6515091c23d1e3a9610"
          plan_digest: "sha256:6b59a250733a32241b8a3c6207e7b80cab2b94c68f2702698fe4b1c242cf27ec"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121932-MAT0V1"
          task_revision: 8
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609121932-MAT0V1-executor-89d1e6515091c23d1e3a9610"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609121932-MAT0V1"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "858f3fc349daab7c990e7fd4fe66b1f02ab19bab"
  task_execution_context:
    base_ref: "main"
    base_sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "1f8b58d52ade59dd6185af72b00f70bb6194bdb0"
    version: 1
id_source: "generated"
---
## Summary

Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.

Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.

## Scope

- In scope: Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.
- Out of scope: unrelated refactors not required for "Fix branch_pr dependency readiness after a dependency merges into the canonical base checkout. When an existing task worktree predates the dependency task artifact, resolve declared dependencies from the authoritative base backend without weakening incomplete or missing dependency checks. Add focused regression coverage proving a DONE dependency on current main unblocks the stale task worktree while incomplete and truly missing dependencies remain blocked.".

## Plan

Prepared the executable recovery-revision repair plan with a nonzero-discovery focused check.

## Verify Steps

1. Run `node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000`; require nonzero discovery, revision-aligned planning-base recovery, and a successful first lifecycle mutation after recovery.
2. In the same focused suite, require incomplete dependencies, truly missing dependencies, dirty worktrees, started WorkItems, and stale recovery tokens to remain fail-closed.
3. Run `bun run typecheck`; require success.
4. Run `bun run test:critical`; require existing workflow routing, stale-state, authority, and recovery cases to remain green.
5. Run `bun run ci:local:full`; require the full local CI route to pass before integration.
6. Review `git diff` and `git status --short --untracked-files=all`; require only the narrow planning-base recovery implementation, its test, and CLI-owned task artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-12T20:31:20.576Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:3ecaf5ae3cd6e1f6c4a7a658241bb33346d06331712c7514fa732854365a08cc, input_digest=sha256:221189a618a9d78da0415dd41e0e6677a04344708ba64b207cfc1272a2194065

Details:

Check: affected_unit_integration
Command: node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check affected_unit_integration (1/4)

Check: affected_unit_integration
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check affected_unit_integration (2/4)

Check: affected_unit_integration
Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check affected_unit_integration (3/4)

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check affected_unit_integration (4/4)

Check: critical_paths
Command: node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check critical_paths (1/4)

Check: critical_paths
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check critical_paths (2/4)

Check: critical_paths
Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check critical_paths (3/4)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check critical_paths (4/4)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check full_regression

Check: task_outcome
Command: node node_modules/vitest/vitest.mjs --config vitest.config.ts run packages/agentplane/src/cli/run-cli.core.task-advance.worktree-resolution.test.ts --pool=forks --maxWorkers=1 --testTimeout=60000 --hookTimeout=60000
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check task_outcome (1/4)

Check: task_outcome
Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check task_outcome (2/4)

Check: task_outcome
Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-3
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check task_outcome (3/4)

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202609121932-MAT0V1/supervision/declared-checks.json#check-4
Scope: branch_pr task 202609121932-MAT0V1 Verification Contract check task_outcome (4/4)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/202609121932-MAT0V1-fix-branch-pr-dependency-readiness-after-a-depen/.agentplane/tasks/202609121932-MAT0V1/blueprint/resolved-snapshot.json
- old_digest: 75affa1a467c1e6344a2ac0ec8f371c0d40d99007d85697566bf5c44d48a134a
- current_digest: 75affa1a467c1e6344a2ac0ec8f371c0d40d99007d85697566bf5c44d48a134a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609121932-MAT0V1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609121932-MAT0V1
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
