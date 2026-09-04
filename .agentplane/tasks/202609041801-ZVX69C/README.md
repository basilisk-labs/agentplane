---
id: "202609041801-ZVX69C"
title: "Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core"
  - "projection-recovery"
  - "regression"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "quality.regression"
verify:
  - "agentplane doctor"
  - "agentplane task lint"
  - "bun run ci:local:full"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
  - "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-04T20:10:10.006Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:80ceca75676e582f8581bc2bf14bfbf12fbdc8bf380ca4a03270ca8c35c4a1bd"
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
    - "effect_destructive_git"
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
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner/usecases"
      - "packages/core/src/tasks"
  declaration:
    external_effects:
      - "destructive_git"
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Branch publication, hosted checks, integration, and CLI-owned cleanup remain separate AgentPlane-owned lifecycle effects."
      - "Release metadata, dependencies, MPXQBK, and full GitLab provider expansion remain excluded."
      - "The complete local CI failure proves that evaluator fixtures and managed-runner checkout authority require bounded repairs."
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
      - "packages/agentplane/src/commands/evaluator"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/runner/usecases"
      - "packages/core/src/tasks"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_destructive_git"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "destructive_git"
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
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/evaluator"
          - "packages/agentplane/src/commands/pr"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/runner/usecases"
          - "packages/core/src/tasks"
        evidence_requirements:
          - "external_effect:destructive_git"
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "destructive_git"
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:bd47bcab34096b88a1129ec12c6a507d48699f9d7029aed95283296f80607aac"
      escalation_reasons:
        - "central_component:packages/core/src/tasks"
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
      - "external_effect:destructive_git"
      - "external_effect:external_write"
      - "external_effect:network_read"
      - "hosted_integration"
      - "repository_effect:repository_write"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "359ff9b7c478650659df39f40384bba78342f41b"
  message: "🚧 ZVX69C task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 359ff9b7c478. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-04T18:17:29.142Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-04T19:32:44.657Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 359ff9b7c478. CLI accepted one state-bound external-agent semantic result."
    commit: "359ff9b7c478650659df39f40384bba78342f41b"
doc_version: 3
doc_updated_at: "2026-09-04T19:49:00.798Z"
doc_updated_by: "SUPERVISOR"
description: "On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full."
sections:
  Summary: |-
    Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification

    On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.
  Scope: |-
    - In scope: On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.
    - Out of scope: unrelated refactors not required for "Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification".
  Plan: "Preserve the approved bounded regression-repair WorkItem and extend its execution authority only to the evaluator fixtures and managed-runner use cases proven necessary by the complete local CI failure."
  Verify Steps: |-
    1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1`. Expected: lifecycle plan approval, typed transport, evaluator rework, projection atomicity, branch-worktree replay, quality routing, PR artifact hydration, and protected integration handoff regressions pass.
    2. Run `bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1`. Expected: canonical task projections, kernel invariants, replacement-plan recovery, stale-result handling, and task-store atomicity pass.
    3. Run `bun run format:check`. Expected: repository formatting is clean.
    4. Run `bun run lint:core`. Expected: core lint passes.
    5. Run `bun run typecheck`. Expected: TypeScript validation passes.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
    7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: task records and Verify Steps pass lint using the repository-local runtime.
    8. Run `agentplane doctor`. Expected: repository and task diagnostics report no errors.
    9. Run `git diff --check`. Expected: the final patch has no whitespace errors.
    10. Run `bun run ci:local:full`. Expected: the complete local CI gate passes after the focused repairs.
    11. Review QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 against current main. Expected: each edge is classified as already present, minimally required, independently useful outside scope, or obsolete; no stale branch is merged as-is.
    12. Review the final diff and task outcome. Expected: task projections advance atomically or fail without partial state, and no package version, release note, tag, publication, dependency, MPXQBK, or full GitLab/provider-neutral expansion change is present.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:80ceca75676e582f8581bc2bf14bfbf12fbdc8bf380ca4a03270ca8c35c4a1bd"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:3376853a2fc002883d0db22293115b286ec91c96e67cca3fb36c32718e5589f2"
    digest: "sha256:e68b13dab3a18c7fdd14e796759c250a93b9bac7155bc567078ff6766a29d4a5"
    grant_id: "e0733798-96f8-40db-af68-50c7907b1332"
    issued_at: "2026-09-04T20:10:10.006Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:5e43264c5c829ed3558e7a73277156f45ca6bdc50a1440045480a280fae08045"
    plan_revision: 11
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:c4e5cfac799cb5fee315891fb760ad2d7e3c268570cdb91d8eb37a8213076047"
    status: "active"
    task_id: "202609041801-ZVX69C"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-04T20:10:10.006Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:dde6a345624ab82e49b0ecef4a3d468590d69c9417d862a82361f8abab2784ed"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-04T19:49:00.768Z"
      digest: "sha256:dde6a345624ab82e49b0ecef4a3d468590d69c9417d862a82361f8abab2784ed"
      proposal:
        assumptions:
          - "The implementation checkpoint 359ff9b7c478650659df39f40384bba78342f41b remains the authoritative partial repair."
          - "Only current main and the current task worktree are authoritative; stale branches remain read-only evidence."
          - "The complete local CI failure identifies exactly two additional write roots."
          - "MPXQBK, release, version, publication, dependency, and full GitLab provider expansion remain outside this task."
        planning_baseline:
          captured_at: "2026-09-04T19:44:22.828Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:b7e3c16b2559cbd96bf9bc4f2665317c6df38c2b6a4b96c65aea93b7bd59c796"
          dirty_paths:
            - ".agentplane/tasks/202609041801-ZVX69C/README.md"
            - ".agentplane/tasks/202609041801-ZVX69C/supervision/declared-checks.json"
            - ".agentplane/tasks/202609041801-ZVX69C/supervision/implementation-evidence.json"
          git:
            kind: "commit"
            ref: null
            sha: "359ff9b7c478650659df39f40384bba78342f41b"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:10"
        schema_version: 1
        task_id: "202609041801-ZVX69C"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
              id: "focused-cli-cycle"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
              id: "focused-core-cycle"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts --maxWorkers=1"
              id: "focused-added-regressions"
              kind: "deterministic"
              required: true
              timeout_ms: 1200000
            -
              capability: "task.verify"
              command: "bun run format:check"
              id: "format-check"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "lint-core"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "routing-policy"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "node packages/agentplane/bin/agentplane.js task lint"
              id: "task-lint"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "agentplane doctor"
              id: "doctor"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "diff-check"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-local-ci"
              kind: "deterministic"
              required: true
              timeout_ms: 3600000
          criteria:
            -
              check_ids:
                - "focused-cli-cycle"
                - "focused-core-cycle"
                - "focused-added-regressions"
                - "format-check"
                - "lint-core"
                - "typecheck"
                - "routing-policy"
                - "task-lint"
                - "doctor"
                - "diff-check"
                - "full-local-ci"
              description: "Focused task-cycle, evaluator, and runner coverage plus repository quality gates and complete local CI pass while excluded release and provider-expansion scope remains untouched."
              id: "clean-core-current-main-qualified"
              required: true
          evidence_fingerprint: "sha256:b7e3c16b2559cbd96bf9bc4f2665317c6df38c2b6a4b96c65aea93b7bd59c796"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "focused-cli-cycle"
                    - "focused-core-cycle"
                    - "focused-added-regressions"
                  description: "The exact focused CLI and core suites pass, including plan rejection and approval, typed transport, evaluator rework, projection atomicity, branch-worktree resume and replay, quality routing, PR artifact hydration, protected integration handoff, evaluator fixtures, and managed-runner checkout authority."
                  id: "focused-cycle-regressions-pass"
                  required: true
                -
                  check_ids:
                    - "focused-cli-cycle"
                    - "focused-core-cycle"
                    - "focused-added-regressions"
                    - "full-local-ci"
                  description: "Task record, canonical aggregate, README projection, compatibility metadata, and runner authority advance atomically or fail without partial state; replay and stale-result handling remain deterministic."
                  id: "atomic-fail-closed-projections"
                  required: true
                -
                  check_ids:
                    - "focused-cli-cycle"
                    - "full-local-ci"
                  description: "QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 remain classified; no stale branch is merged and excluded work remains deferred."
                  id: "salvage-audit-bounded"
                  required: true
                -
                  check_ids:
                    - "format-check"
                    - "lint-core"
                    - "typecheck"
                    - "routing-policy"
                    - "task-lint"
                    - "doctor"
                    - "diff-check"
                    - "full-local-ci"
                  description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass with no version, release-note, tag, publication, dependency, MPXQBK, or full GitLab expansion change."
                  id: "release-ready-without-release-mutation"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 192000
                optional_sources:
                  - "read-only-stale-branch-diffs-and-task-routes"
                required_sources:
                  - "repository"
                  - "task-document"
                  - "current-main-focused-failure-evidence"
                symbol_hints:
                  - "fillEvaluatorTaskVerifySteps"
                  - "loadTaskCommandContext"
                  - "prepareTaskRunnerExecution"
                  - "assertRunnerCheckoutAuthority"
              depends_on: []
              expected_outputs:
                - "nine-focused-failures-classified-and-resolved"
                - "atomic-fail-closed-task-projection-and-deterministic-route-behavior"
                - "stale-branch-salvage-classification"
                - "focused-and-full-local-verification-evidence"
              id: "repair-and-qualify-clean-core-task-cycle"
              objective: "Complete the existing focused task-cycle repair, update evaluator fixtures with task-specific Verify Steps, align managed-runner checkout authority with the validated task workspace, retain the stale-branch classification, and qualify the current-main result without entering excluded scope."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/evaluator"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner/usecases"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/cli"
                - "packages/agentplane/src/commands/evaluator"
                - "packages/agentplane/src/commands/pr"
                - "packages/agentplane/src/commands/shared"
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/runner/usecases"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/core/src/tasks"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                    id: "focused-cli-cycle"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                    id: "focused-core-cycle"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evaluator/evaluator-qualification-packet.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/runner/usecases/task-run-recipe-write-scope.integration.test.ts --maxWorkers=1"
                    id: "focused-added-regressions"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1200000
                  -
                    capability: "task.verify"
                    command: "bun run format:check"
                    id: "format-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "lint-core"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "routing-policy"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "node packages/agentplane/bin/agentplane.js task lint"
                    id: "task-lint"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "agentplane doctor"
                    id: "doctor"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "diff-check"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-local-ci"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 3600000
                criteria:
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "focused-added-regressions"
                    description: "The focused task-cycle and newly authorized evaluator and runner regressions pass."
                    id: "focused-cycle-regressions-pass"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "focused-added-regressions"
                      - "full-local-ci"
                    description: "Task projections and checkout authority remain fail closed and deterministic."
                    id: "atomic-fail-closed-projections"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "full-local-ci"
                    description: "The existing stale-branch classification remains bounded and no excluded branch is imported."
                    id: "salvage-audit-bounded"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "task-lint"
                      - "doctor"
                      - "diff-check"
                      - "full-local-ci"
                    description: "All repository quality gates and complete local CI pass without release mutation."
                    id: "release-ready-without-release-mutation"
                    required: true
                evidence_fingerprint: "sha256:b7e3c16b2559cbd96bf9bc4f2665317c6df38c2b6a4b96c65aea93b7bd59c796"
                schema_version: 1
      revision: 3
      schema_version: 1
      task_id: "202609041801-ZVX69C"
    event_cursor: 5
    final_validation: null
    id: "202609041801-ZVX69C"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "agentplane doctor"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "agentplane task lint"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-3"
          required: true
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-4"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-5"
          required: true
        -
          check_ids: []
          description: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
          id: "legacy-6"
          required: true
        -
          check_ids: []
          description: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
          id: "legacy-7"
          required: true
        -
          check_ids: []
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-8"
          required: true
      captured_at: "2026-09-04T18:01:27.941Z"
      constraints: []
      request: |-
        Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification

        On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.
      task_id: "202609041801-ZVX69C"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "rejected"
        created_at: "2026-09-04T18:07:07.074Z"
        digest: "sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
        proposal:
          assumptions:
            - "Task 202609030849-925NNG is terminal and its integrated changes are present on current main."
            - "Task 202609021331-5FPZAB is terminal and does not need recovery or duplication."
            - "Only current main is authoritative; stale task branches and PRs are read-only evidence and must not be merged as-is."
            - "MPXQBK, release/version/publication work, dependency upgrades, and full T4RR70 GitLab/provider-neutral expansion remain outside this task."
          planning_baseline:
            captured_at: "2026-09-04T18:01:32.480Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:f3ed5b355b49fa69c2a2b0f8de01096ce00a925915f69dd1eeacc96a93f607b5"
            dirty_paths:
              - ".agentplane/tasks/202609041801-ZVX69C/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                id: "focused-cli-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                id: "focused-core-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run format:check"
                id: "format-check"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "lint-core"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "agentplane task lint"
                id: "task-lint"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "agentplane doctor"
                id: "doctor"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "focused-cli-cycle"
                  - "focused-core-cycle"
                  - "format-check"
                  - "lint-core"
                  - "typecheck"
                  - "routing-policy"
                  - "task-lint"
                  - "doctor"
                  - "full-local-ci"
                description: "Focused task-cycle coverage, repository quality gates, complete local CI, and hosted integration pass for the repaired current-main implementation while all excluded release and provider-expansion scope remains untouched."
                id: "clean-core-current-main-qualified"
                required: true
            evidence_fingerprint: "sha256:f3ed5b355b49fa69c2a2b0f8de01096ce00a925915f69dd1eeacc96a93f607b5"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                    description: "The exact focused CLI and core suites pass, including plan rejection and approval, typed transport, evaluator rework, projection atomicity, branch-worktree resume and replay, quality routing, PR artifact hydration, and protected integration handoff."
                    id: "focused-cycle-regressions-pass"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "full-local-ci"
                    description: "Task record, canonical aggregate, README projection, and compatibility metadata advance atomically or fail without partial state; replay and stale-result handling remain deterministic."
                    id: "atomic-fail-closed-projections"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "full-local-ci"
                    description: "QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 are each classified as already present, required and minimally ported, independently useful outside scope, or obsolete; no stale branch is merged as-is and excluded work remains deferred."
                    id: "salvage-audit-bounded"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "task-lint"
                      - "doctor"
                      - "full-local-ci"
                    description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass with no version, release-note, tag, publication, dependency, or full GitLab expansion change."
                    id: "release-ready-without-release-mutation"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 192000
                  optional_sources:
                    - "read-only-stale-branch-diffs-and-task-routes"
                  required_sources:
                    - "repository"
                    - "task-document"
                    - "current-main-focused-failure-evidence"
                  symbol_hints:
                    - "projectTaskCentricCompatibilityMutation"
                    - "taskPlanApprove"
                    - "routeDecision"
                    - "resolveAuthoritativeTaskWorktree"
                    - "protectedIntegrationHandoff"
                    - "prArtifacts"
                depends_on: []
                expected_outputs:
                  - "nine-focused-failures-classified-and-resolved"
                  - "atomic-fail-closed-task-projection-and-deterministic-route-behavior"
                  - "stale-branch-salvage-classification"
                  - "focused-and-full-local-verification-evidence"
                id: "repair-and-qualify-clean-core-task-cycle"
                objective: "Reproduce and classify every current focused task-cycle failure, repair only the stale fixtures or production behavior necessary to restore fail-closed canonical task projections and deterministic branch-worktree/PR lifecycle behavior, record the stale-branch salvage classification, and qualify the final current-main result without entering release scope."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/pr"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/core/src/tasks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                      id: "focused-cli-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                      id: "focused-core-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run format:check"
                      id: "format-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run lint:core"
                      id: "lint-core"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "agentplane task lint"
                      id: "task-lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "agentplane doctor"
                      id: "doctor"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                      description: "The exact focused CLI and core task-cycle suites pass after the smallest coherent repair."
                      id: "focused-cycle-regressions-pass"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                        - "full-local-ci"
                      description: "Task projections remain atomic and fail closed, with deterministic replay and stale-result handling."
                      id: "atomic-fail-closed-projections"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "full-local-ci"
                      description: "The stale-branch salvage audit is recorded without merging stale branches or expanding excluded scope."
                      id: "salvage-audit-bounded"
                      required: true
                    -
                      check_ids:
                        - "format-check"
                        - "lint-core"
                        - "typecheck"
                        - "routing-policy"
                        - "task-lint"
                        - "doctor"
                        - "full-local-ci"
                      description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass without release mutation."
                      id: "release-ready-without-release-mutation"
                      required: true
                  evidence_fingerprint: "sha256:f3ed5b355b49fa69c2a2b0f8de01096ce00a925915f69dd1eeacc96a93f607b5"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      -
        approval:
          approved_at: "2026-09-04T18:17:19.009Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-04T18:11:29.237Z"
        digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
        proposal:
          assumptions:
            - "Task 202609030849-925NNG is terminal and its integrated changes are present on current main."
            - "Task 202609021331-5FPZAB is terminal and does not need recovery or duplication."
            - "Only current main is authoritative; stale task branches and PRs are read-only evidence and must not be merged as-is."
            - "MPXQBK, release/version/publication work, dependency upgrades, and full T4RR70 GitLab/provider-neutral expansion remain outside this task."
          planning_baseline:
            captured_at: "2026-09-04T18:09:01.934Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:1abcd17dd6d769d4eab13aed1000217ce540d0439324876f46c79b1b226b8132"
            dirty_paths:
              - ".agentplane/tasks/202609041801-ZVX69C/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:3"
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                id: "focused-cli-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                id: "focused-core-cycle"
                kind: "deterministic"
                required: true
                timeout_ms: 1200000
              -
                capability: "task.verify"
                command: "bun run format:check"
                id: "format-check"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run lint:core"
                id: "lint-core"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "bun run typecheck"
                id: "typecheck"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "node .agentplane/policy/check-routing.mjs"
                id: "routing-policy"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "node packages/agentplane/bin/agentplane.js task lint"
                id: "task-lint"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "agentplane doctor"
                id: "doctor"
                kind: "deterministic"
                required: true
                timeout_ms: 900000
              -
                capability: "task.verify"
                command: "git diff --check"
                id: "diff-check"
                kind: "deterministic"
                required: true
                timeout_ms: 300000
              -
                capability: "task.verify"
                command: "bun run ci:local:full"
                id: "full-local-ci"
                kind: "deterministic"
                required: true
                timeout_ms: 3600000
            criteria:
              -
                check_ids:
                  - "focused-cli-cycle"
                  - "focused-core-cycle"
                  - "format-check"
                  - "lint-core"
                  - "typecheck"
                  - "routing-policy"
                  - "task-lint"
                  - "doctor"
                  - "diff-check"
                  - "full-local-ci"
                description: "Focused task-cycle coverage, repository quality gates, complete local CI, and hosted integration pass for the repaired current-main implementation while all excluded release and provider-expansion scope remains untouched."
                id: "clean-core-current-main-qualified"
                required: true
            evidence_fingerprint: "sha256:1abcd17dd6d769d4eab13aed1000217ce540d0439324876f46c79b1b226b8132"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                    description: "The exact focused CLI and core suites pass, including plan rejection and approval, typed transport, evaluator rework, projection atomicity, branch-worktree resume and replay, quality routing, PR artifact hydration, and protected integration handoff."
                    id: "focused-cycle-regressions-pass"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "focused-core-cycle"
                      - "full-local-ci"
                    description: "Task record, canonical aggregate, README projection, and compatibility metadata advance atomically or fail without partial state; replay and stale-result handling remain deterministic."
                    id: "atomic-fail-closed-projections"
                    required: true
                  -
                    check_ids:
                      - "focused-cli-cycle"
                      - "full-local-ci"
                    description: "QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 are each classified as already present, required and minimally ported, independently useful outside scope, or obsolete; no stale branch is merged as-is and excluded work remains deferred."
                    id: "salvage-audit-bounded"
                    required: true
                  -
                    check_ids:
                      - "format-check"
                      - "lint-core"
                      - "typecheck"
                      - "routing-policy"
                      - "task-lint"
                      - "doctor"
                      - "diff-check"
                      - "full-local-ci"
                    description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass with no version, release-note, tag, publication, dependency, or full GitLab expansion change."
                    id: "release-ready-without-release-mutation"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 192000
                  optional_sources:
                    - "read-only-stale-branch-diffs-and-task-routes"
                  required_sources:
                    - "repository"
                    - "task-document"
                    - "current-main-focused-failure-evidence"
                  symbol_hints:
                    - "projectTaskCentricCompatibilityMutation"
                    - "taskPlanApprove"
                    - "routeDecision"
                    - "resolveAuthoritativeTaskWorktree"
                    - "protectedIntegrationHandoff"
                    - "prArtifacts"
                depends_on: []
                expected_outputs:
                  - "nine-focused-failures-classified-and-resolved"
                  - "atomic-fail-closed-task-projection-and-deterministic-route-behavior"
                  - "stale-branch-salvage-classification"
                  - "focused-and-full-local-verification-evidence"
                id: "repair-and-qualify-clean-core-task-cycle"
                objective: "Reproduce and classify every current focused task-cycle failure, repair only the stale fixtures or production behavior necessary to restore fail-closed canonical task projections and deterministic branch-worktree/PR lifecycle behavior, record the stale-branch salvage classification, and qualify the final current-main result without entering release scope."
                optional: false
                priority: 0
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/pr"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/task"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/adapters/task-backend"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/core/src/tasks"
                risk: "high"
                scope_roots:
                  - "packages/agentplane/src/cli"
                  - "packages/agentplane/src/commands/pr"
                  - "packages/agentplane/src/commands/shared"
                  - "packages/agentplane/src/commands/task"
                  - "packages/agentplane/src/adapters/task-backend"
                  - "packages/core/src/tasks"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1"
                      id: "focused-cli-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1"
                      id: "focused-core-cycle"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 1200000
                    -
                      capability: "task.verify"
                      command: "bun run format:check"
                      id: "format-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run lint:core"
                      id: "lint-core"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "bun run typecheck"
                      id: "typecheck"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "node .agentplane/policy/check-routing.mjs"
                      id: "routing-policy"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "node packages/agentplane/bin/agentplane.js task lint"
                      id: "task-lint"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "agentplane doctor"
                      id: "doctor"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 900000
                    -
                      capability: "task.verify"
                      command: "git diff --check"
                      id: "diff-check"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 300000
                    -
                      capability: "task.verify"
                      command: "bun run ci:local:full"
                      id: "full-local-ci"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 3600000
                  criteria:
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                      description: "The exact focused CLI and core task-cycle suites pass after the smallest coherent repair."
                      id: "focused-cycle-regressions-pass"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "focused-core-cycle"
                        - "full-local-ci"
                      description: "Task projections remain atomic and fail closed, with deterministic replay and stale-result handling."
                      id: "atomic-fail-closed-projections"
                      required: true
                    -
                      check_ids:
                        - "focused-cli-cycle"
                        - "full-local-ci"
                      description: "The stale-branch salvage audit is recorded without merging stale branches or expanding excluded scope."
                      id: "salvage-audit-bounded"
                      required: true
                    -
                      check_ids:
                        - "format-check"
                        - "lint-core"
                        - "typecheck"
                        - "routing-policy"
                        - "task-lint"
                        - "doctor"
                        - "diff-check"
                        - "full-local-ci"
                      description: "Formatting, lint, type checking, routing policy, task lint, doctor, and complete local CI pass without release mutation."
                      id: "release-ready-without-release-mutation"
                      required: true
                  evidence_fingerprint: "sha256:1abcd17dd6d769d4eab13aed1000217ce540d0439324876f46c79b1b226b8132"
                  schema_version: 1
        revision: 2
        schema_version: 1
        task_id: "202609041801-ZVX69C"
    revision: 12
    schema_version: 1
    updated_at: "2026-09-04T20:10:10.006Z"
    work_items:
      repair-and-qualify-clean-core-task-cycle:
        attempt: 0
        claim_id: null
        id: "repair-and-qualify-clean-core-task-cycle"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-04T18:08:56.286Z"
        from: "AWAITING_PLAN_APPROVAL"
        to: "PLANNING"
        actor_id: "USER"
        cause_refs:
          - "plan:sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
          - "note:sha256:3daa38e24406cec20eae796619ef60fdeffceda260bbb2505ff15200a55aa694"
        entity: "task"
        id: "event_2ce2389384a4a352a610ebb0"
        mutation_id: "plan-reject-cccc54072907ad3149340210ac05fc90"
        plan_digest: "sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609041801-ZVX69C"
        task_revision: 2
        work_item_id: null
      -
        at: "2026-09-04T19:44:21.142Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
        entity: "task"
        id: "event_6e7d058d9737647afcd46cba"
        mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-6353128c8c9cfec2918eec25"
        plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609041801-ZVX69C"
        task_revision: 9
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:423f09e4eed6274379b83de83c48ded0c60b06c29a7cec6e1ee8026e135e1983:
        aggregate_digest: "sha256:3bba2c7d2cf7ad2450267e550381f981d598754164caeb9d90d69735ce4f0372"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T19:32:44.657Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_8188687a901fab71cc4ef122"
          mutation_id: "compatibility:sha256:423f09e4eed6274379b83de83c48ded0c60b06c29a7cec6e1ee8026e135e1983"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:423f09e4eed6274379b83de83c48ded0c60b06c29a7cec6e1ee8026e135e1983"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:744d5692416a14c70bb52504b68e6b1bcc6e9292dd300e3bae47d9ff96b4c616:
        aggregate_digest: "sha256:8e872935d46db4701307fc9ee58f13f64047e67c312490c93e009f326bc50a48"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T18:11:53.209Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_311ce146e0df3ff419db6bc0"
          mutation_id: "compatibility:sha256:744d5692416a14c70bb52504b68e6b1bcc6e9292dd300e3bae47d9ff96b4c616"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 4
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:744d5692416a14c70bb52504b68e6b1bcc6e9292dd300e3bae47d9ff96b4c616"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:ce22f0a32513e40764a72459a91cabd897fd1e46b2c709d41c67506c5b521af0:
        aggregate_digest: "sha256:8fbdfa69ff15df3aba4e9c18aa966e3338475131094f489017b933b374948827"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T19:32:44.657Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_fc60a5918309d6507816d4f3"
          mutation_id: "compatibility:sha256:ce22f0a32513e40764a72459a91cabd897fd1e46b2c709d41c67506c5b521af0"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 7
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:ce22f0a32513e40764a72459a91cabd897fd1e46b2c709d41c67506c5b521af0"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      compatibility:sha256:db8889d6da40a4b0c0828078efdff5e8579990447462e82cf2c863af93843fec:
        aggregate_digest: "sha256:b313714b321a1dda589ae9d27414c25a321bdec6242398117d108871cf6f6dc0"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T18:17:29.142Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_64d53847bf560ee6dd35a027"
          mutation_id: "compatibility:sha256:db8889d6da40a4b0c0828078efdff5e8579990447462e82cf2c863af93843fec"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:db8889d6da40a4b0c0828078efdff5e8579990447462e82cf2c863af93843fec"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      plan-refinement:work-order-202609041801-ZVX69C-executor-6353128c8c9cfec2918eec25:
        aggregate_digest: "sha256:74349dead0f9041f88ababa8939b649221c56c51690f68ee6eb8fc252f6babf6"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-04T19:44:21.142Z"
          cause_refs:
            - "scope_expanded"
          entity: "task"
          from: "ACTIVE"
          id: "event_6e7d058d9737647afcd46cba"
          mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-6353128c8c9cfec2918eec25"
          plan_digest: "sha256:e6b21e82022e128f96ee423622b0b596e9995901b69404199c3bc6bb998b3f72"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 9
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609041801-ZVX69C-executor-6353128c8c9cfec2918eec25"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609041801-ZVX69C"
      plan-reject-cccc54072907ad3149340210ac05fc90:
        aggregate_digest: "sha256:72bafab5c74d61343c0d2680a56e0f95e486c71552a26f548f66f899db983e18"
        event:
          actor_id: "USER"
          at: "2026-09-04T18:08:56.286Z"
          cause_refs:
            - "plan:sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
            - "note:sha256:3daa38e24406cec20eae796619ef60fdeffceda260bbb2505ff15200a55aa694"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_2ce2389384a4a352a610ebb0"
          mutation_id: "plan-reject-cccc54072907ad3149340210ac05fc90"
          plan_digest: "sha256:ee893d6423a2cc378c59ee1219e08ad72ff4ea1e4bc8d1e56c258603e4706a23"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609041801-ZVX69C"
          task_revision: 2
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-reject-cccc54072907ad3149340210ac05fc90"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609041801-ZVX69C"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "359ff9b7c478650659df39f40384bba78342f41b"
  task_execution_context:
    base_ref: "main"
    base_sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "explicit"
  workflow_route_baseline:
    start_head_sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
    version: 1
id_source: "generated"
---
## Summary

Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification

On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.

## Scope

- In scope: On current main after 925NNG, YHERVV, and F31YXS integration, reproduce and repair the deterministic CLI-cycle failures in lifecycle plan approval, task-centric projection atomicity, branch-worktree resume/replay, quality routing, PR artifact hydration, and protected integration handoff. Distinguish stale fixtures from production defects, preserve fail-closed canonical projection rules, add or adjust only necessary regressions, and complete the Clean Core salvage audit without importing stale QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, or T4RR70 branches as-is. Exclude package versions, release notes, tags, publication, dependency upgrades, and full provider-neutral GitLab expansion. Require focused task-cycle tests, formatting, lint, typecheck, policy routing, task lint, doctor, and bun run ci:local:full.
- Out of scope: unrelated refactors not required for "Repair post-integration Clean Core task-cycle regression and restore final release-readiness verification".

## Plan

Preserve the approved bounded regression-repair WorkItem and extend its execution authority only to the evaluator fixtures and managed-runner use cases proven necessary by the complete local CI failure.

## Verify Steps

1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --maxWorkers=1`. Expected: lifecycle plan approval, typed transport, evaluator rework, projection atomicity, branch-worktree replay, quality routing, PR artifact hydration, and protected integration handoff regressions pass.
2. Run `bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts packages/core/src/tasks/task-centric/replacement-plan-recovery.test.ts packages/core/src/tasks/task-store.test.ts --maxWorkers=1`. Expected: canonical task projections, kernel invariants, replacement-plan recovery, stale-result handling, and task-store atomicity pass.
3. Run `bun run format:check`. Expected: repository formatting is clean.
4. Run `bun run lint:core`. Expected: core lint passes.
5. Run `bun run typecheck`. Expected: TypeScript validation passes.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: task records and Verify Steps pass lint using the repository-local runtime.
8. Run `agentplane doctor`. Expected: repository and task diagnostics report no errors.
9. Run `git diff --check`. Expected: the final patch has no whitespace errors.
10. Run `bun run ci:local:full`. Expected: the complete local CI gate passes after the focused repairs.
11. Review QWP8S8, 9T9528, 9RCWZQ, HBSZ4F, DVS5NN, MPXQBK, and T4RR70 against current main. Expected: each edge is classified as already present, minimally required, independently useful outside scope, or obsolete; no stale branch is merged as-is.
12. Review the final diff and task outcome. Expected: task projections advance atomically or fail without partial state, and no package version, release note, tag, publication, dependency, MPXQBK, or full GitLab/provider-neutral expansion change is present.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
