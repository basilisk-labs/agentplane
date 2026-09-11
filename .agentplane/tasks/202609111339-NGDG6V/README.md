---
id: "202609111339-NGDG6V"
title: "Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github-issue"
  - "routing"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-09-11T15:41:18.400Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:f1720d797d2c03f2b29a4ffd1ed1f8dfc321006744f813868c0dd2bc131b7d26"
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
    - "repository_branch_pr_floor"
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
      - "node_modules/.cache/agentplane-mise"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
  declaration:
    external_effects:
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A task-local ignored tool cache avoids changing the user global Bun installation."
      - "The committed implementation is already focused and passed its regression suite."
      - "The repository requires Bun 1.4.2 for the unchanged full local CI gate."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "node_modules/.cache/agentplane-mise"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "tests"
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
          - "node_modules/.cache/agentplane-mise"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        evidence_requirements:
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:21d4b39ab94e7fe65e4eb306181b3e9340dd88ef7183a316d63125286f81169a"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-factory.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
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
      - "external_effect:network_read"
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
    body: "Implementation committed: c14b1c85cb35. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 0bafc17cba6d. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-11T15:28:12.090Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-11T15:35:16.981Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: c14b1c85cb35. CLI accepted one state-bound external-agent semantic result."
    commit: "c14b1c85cb35f0ee51131670fa16bb50a191284b"
  -
    type: "verify"
    at: "2026-09-11T15:36:23.030Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bun run ci:local:full"
  -
    type: "status"
    at: "2026-09-11T16:14:29.716Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 0bafc17cba6d. CLI accepted one state-bound external-agent semantic result."
    commit: "0bafc17cba6d0e84c0d3507d078ee74ad8bc7652"
doc_version: 3
doc_updated_at: "2026-09-11T16:14:29.716Z"
doc_updated_by: "SUPERVISOR"
description: "GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893"
sections:
  Summary: |-
    Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893

    GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893
  Scope: |-
    - In scope: GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893.
    - Out of scope: unrelated refactors not required for "Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893".
  Plan: "Preserve the committed repair and rerun all gates with task-local Bun 1.4.2."
  Verify Steps: |-
    1. With approved network access, run `MISE_DATA_DIR="$PWD/node_modules/.cache/agentplane-mise/data" MISE_CACHE_DIR="$PWD/node_modules/.cache/agentplane-mise/cache" mise install bun@1.4.2`. Expected: Bun 1.4.2 is available only in the ignored task-local cache.
    2. With the task-local Bun directory prepended to `PATH`, run `bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1`. Expected: all focused direct rework and workflow-step routing regressions pass.
    3. Inspect `task next-action --json` and `task status --json` in the regression after `verify --rework`. Expected: both expose a CODER `implementation_rework` episode, `safeToMutate=true`, and no repeated TESTER verification.
    4. With the same task-local Bun directory prepended to `PATH`, run `bun run ci:local:full`. Expected: the repository full local CI gate passes under the pinned Bun 1.4.2 runtime.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-11T15:36:23.030Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bun run ci:local:full
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b434ac5d180a14ad7cb650945d4df1b94248c088dc1a0b0826e42f5675c67a03, input_digest=sha256:4c16ece2228341cf4a376c4427243a034ef3e8d81e414cc7209098068c6a88fb

    Details:

    Command: bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1
    Result: pass
    Evidence: .agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609111339-NGDG6V declared verification

    Command: bun run ci:local:full
    Result: fail
    Evidence: .agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202609111339-NGDG6V declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609111339-NGDG6V-route-direct-verification-rework-to-bounded-repa/.agentplane/tasks/202609111339-NGDG6V/blueprint/resolved-snapshot.json
    - old_digest: 823764a6196d2004c1109797c319a2c7f17a056e1fb1518d528da77053f5df60
    - current_digest: 823764a6196d2004c1109797c319a2c7f17a056e1fb1518d528da77053f5df60
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609111339-NGDG6V

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609111339-NGDG6V
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
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:f1720d797d2c03f2b29a4ffd1ed1f8dfc321006744f813868c0dd2bc131b7d26"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:59e45a5765142a99068af6bb7d14d571e116bddf1edf2e8f3ef7194d769a20f3"
    digest: "sha256:60f83d2b9b693444fbe01d77f45bfa777abd27e40e8b7b1ced27b335034ee71e"
    grant_id: "18f1f564-2ded-4fc6-9d3f-57d04954a481"
    issued_at: "2026-09-11T15:41:18.400Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:92193134a89dd349bc5ad28830f0a263fa679bcd5ff3f0cb1f5b928f4c864879"
    plan_revision: 12
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:32d5a87e989310f1f4381d95c2dfca88f89cd22cdde7a996701a9121f3d43093"
    status: "active"
    task_id: "202609111339-NGDG6V"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-11T15:41:18.400Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:8625b1e9554592c0078f99851e375813d0f709b93d928a0612c5c6bc2c06fae1"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-11T15:40:29.237Z"
      digest: "sha256:8625b1e9554592c0078f99851e375813d0f709b93d928a0612c5c6bc2c06fae1"
      proposal:
        assumptions:
          - "mise can install Bun 1.4.2 into task-local data and cache directories when network_read is approved."
        planning_baseline:
          captured_at: "2026-09-11T15:39:13.014Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:24dcd360bd9840f95f671039da788f8653ad6e9e4a56e3cc160293cd55d8a90b"
          dirty_paths:
            - ".agentplane/tasks/202609111339-NGDG6V/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "54347966d2848af7bb9c5644d01936f091a3d75a"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:10"
        schema_version: 1
        task_id: "202609111339-NGDG6V"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1"
              id: "focused-regression"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-regression"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "focused-regression"
                - "full-regression"
              description: "The committed direct route sends unresolved verification rework to a mutable CODER episode and preserves the transition to fresh TESTER verification."
              id: "direct-rework-route"
              required: true
            -
              check_ids:
                - "full-regression"
              description: "All local CI checks execute with the repository-pinned Bun 1.4.2 runtime without changing the global Bun installation."
              id: "pinned-runtime"
              required: true
          evidence_fingerprint: "sha256:24dcd360bd9840f95f671039da788f8653ad6e9e4a56e3cc160293cd55d8a90b"
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
                    - "full-regression"
                  description: "The committed direct route sends unresolved verification rework to a mutable CODER episode and preserves the transition to fresh TESTER verification."
                  id: "direct-rework-route"
                  required: true
                -
                  check_ids:
                    - "full-regression"
                  description: "All local CI checks execute with the repository-pinned Bun 1.4.2 runtime without changing the global Bun installation."
                  id: "pinned-runtime"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "scripts/lib/bun-runtime.mjs"
                required_sources:
                  - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  - ".agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json"
                symbol_hints:
                  - "directStep"
                  - "assertPinnedBunRuntime"
              depends_on: []
              expected_outputs:
                - "Verified direct rework routing at the committed implementation SHA."
                - "Full local CI evidence produced by Bun 1.4.2."
              id: "pinned-runtime-verification-recovery"
              objective: "Preserve the committed direct rework routing, obtain Bun 1.4.2 into node_modules/.cache/agentplane-mise, prepend that task-local runtime to PATH, and run the focused and full regression checks."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "node_modules/.cache/agentplane-mise"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                - "node_modules/.cache/agentplane-mise"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1"
                    id: "focused-regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-regression"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "focused-regression"
                      - "full-regression"
                    description: "The committed direct route sends unresolved verification rework to a mutable CODER episode and preserves the transition to fresh TESTER verification."
                    id: "direct-rework-route"
                    required: true
                  -
                    check_ids:
                      - "full-regression"
                    description: "All local CI checks execute with the repository-pinned Bun 1.4.2 runtime without changing the global Bun installation."
                    id: "pinned-runtime"
                    required: true
                evidence_fingerprint: "sha256:24dcd360bd9840f95f671039da788f8653ad6e9e4a56e3cc160293cd55d8a90b"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609111339-NGDG6V"
    event_cursor: 10
    final_validation: null
    id: "202609111339-NGDG6V"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-11T13:39:09.326Z"
      constraints: []
      request: |-
        Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893

        GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893
      task_id: "202609111339-NGDG6V"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: "2026-09-11T15:27:33.413Z"
          approved_by: "HOST:codex-desktop:USER"
          approved_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
          policy_facts:
            - "host_user_decision"
          state: "approved"
        created_at: "2026-09-11T15:25:32.322Z"
        digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
        proposal:
          assumptions:
            - "The existing implementation_rework episode remains the canonical bounded repair route for direct workflow findings."
          planning_baseline:
            captured_at: "2026-09-11T15:21:33.574Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:d9321ff0db84e3081154ebec4343c604145f9c2d3a3775b75ccb4453cb97ea67"
            dirty_paths:
              - ".agentplane/tasks/202609111339-NGDG6V/README.md"
              - ".agentplane/tasks/202609111340-MGB383/README.md"
              - ".agentplane/tasks/202609111341-FK9C2T/README.md"
              - ".agentplane/tasks/202609111341-SED9K5/README.md"
              - ".agentplane/tasks/202609111502-4XSWZQ/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "16c768054e0e6a53a7eb4487d79da71c1aa0dea2"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1"
                id: "focused-regression"
                kind: "deterministic"
                required: true
                timeout_ms: 180000
            criteria:
              -
                check_ids:
                  - "focused-regression"
                description: "After direct verification records needs_rework for a completed runner, next-action and status expose a CODER implementation_rework episode with safe semantic mutation instead of another TESTER verification episode."
                id: "route-rework"
                required: true
              -
                check_ids:
                  - "focused-regression"
                description: "The route preserves verification evidence and task-centric provenance, and returns to TESTER only after a newer implementation or an approved contract-preserving correction."
                id: "preserve-gates"
                required: true
              -
                check_ids:
                  - "focused-regression"
                description: "The change reuses the existing implementation_rework episode and does not alter unrelated branch_pr, approval, or closeout behavior."
                id: "bounded-scope"
                required: true
            evidence_fingerprint: "sha256:d9321ff0db84e3081154ebec4343c604145f9c2d3a3775b75ccb4453cb97ea67"
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
                    description: "After direct verification records needs_rework for a completed runner, next-action and status expose a CODER implementation_rework episode with safe semantic mutation instead of another TESTER verification episode."
                    id: "route-rework"
                    required: true
                  -
                    check_ids:
                      - "focused-regression"
                    description: "The route preserves verification evidence and task-centric provenance, and returns to TESTER only after a newer implementation or an approved contract-preserving correction."
                    id: "preserve-gates"
                    required: true
                  -
                    check_ids:
                      - "focused-regression"
                    description: "The change reuses the existing implementation_rework episode and does not alter unrelated branch_pr, approval, or closeout behavior."
                    id: "bounded-scope"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 80000
                  optional_sources:
                    - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
                  required_sources:
                    - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                    - "packages/agentplane/src/commands/shared/route-decision-verification.ts"
                    - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                    - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                  symbol_hints:
                    - "directStep"
                    - "verificationReworkHasNewImplementation"
                    - "runCli route decision direct closeout"
                depends_on: []
                expected_outputs:
                  - "A minimal direct route predicate and step selection for unresolved verification rework."
                  - "Regression coverage that fails on repeated verification and passes on bounded CODER repair routing."
                id: "direct-rework-routing-and-regression"
                objective: "Route direct needs_rework state to the existing CODER implementation_rework episode before completed-runner verification selection, preserve the existing provenance and freshness gates, and add focused regression coverage for next-action and status."
                optional: false
                priority: 2
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                risk: "medium"
                scope_roots:
                  - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1"
                      id: "focused-regression"
                      kind: "deterministic"
                      required: true
                      timeout_ms: 180000
                  criteria:
                    -
                      check_ids:
                        - "focused-regression"
                      description: "After direct verification records needs_rework for a completed runner, next-action and status expose a CODER implementation_rework episode with safe semantic mutation instead of another TESTER verification episode."
                      id: "route-rework"
                      required: true
                    -
                      check_ids:
                        - "focused-regression"
                      description: "The route preserves verification evidence and task-centric provenance, and returns to TESTER only after a newer implementation or an approved contract-preserving correction."
                      id: "preserve-gates"
                      required: true
                    -
                      check_ids:
                        - "focused-regression"
                      description: "The change reuses the existing implementation_rework episode and does not alter unrelated branch_pr, approval, or closeout behavior."
                      id: "bounded-scope"
                      required: true
                  evidence_fingerprint: "sha256:d9321ff0db84e3081154ebec4343c604145f9c2d3a3775b75ccb4453cb97ea67"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202609111339-NGDG6V"
    revision: 16
    schema_version: 1
    updated_at: "2026-09-11T16:29:12.582Z"
    work_items:
      pinned-runtime-verification-recovery:
        attempt: 1
        claim_id: null
        id: "pinned-runtime-verification-recovery"
        last_failure:
          cause_refs:
            - "direct-rework-route"
            - "pinned-runtime"
          code: "validation_failed"
          kind: "validation"
          message: "The direct rework route and its fresh TESTER transition regression pass under the task-local Bun 1.4.2 runtime."
          retryable: true
        output_manifests:
          -
            digest: "sha256:e6a04caeb2e13c5e2df4922ee513147a99e7dad1b0f40cbc5a2facc4ce198474"
            id: "Verified direct rework routing at the committed implementation SHA."
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609111339-NGDG6V"
              work_item_id: "pinned-runtime-verification-recovery"
            provenance:
              - "sha256:b8e10c866d5eaf9950525d976a27db68f51be5f6c02bffef1e10d68c4f469fda"
              - ".agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:bf99939e3f82ae01f3b49585a2f2ab10979940b0e3ac13d90699cf968fa6c75e"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:ba072495f6444247c908230a5937501001093d01a15f868d4791c24bc945a8bd"
            id: "Full local CI evidence produced by Bun 1.4.2."
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 2
              task_id: "202609111339-NGDG6V"
              work_item_id: "pinned-runtime-verification-recovery"
            provenance:
              - "sha256:b8e10c866d5eaf9950525d976a27db68f51be5f6c02bffef1e10d68c4f469fda"
              - ".agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:bf99939e3f82ae01f3b49585a2f2ab10979940b0e3ac13d90699cf968fa6c75e"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "REWORK_READY"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json"
              check_id: "focused-regression"
              command_identity: "bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 0
              observed_at: "2026-09-11T16:29:12.563Z"
              repository_snapshot_digest: "sha256:bf99939e3f82ae01f3b49585a2f2ab10979940b0e3ac13d90699cf968fa6c75e"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json"
              check_id: "full-regression"
              command_identity: "bun run ci:local:full"
              detail: "Declared check failed: bun run ci:local:full"
              exit_code: 1
              observed_at: "2026-09-11T16:29:12.563Z"
              repository_snapshot_digest: "sha256:bf99939e3f82ae01f3b49585a2f2ab10979940b0e3ac13d90699cf968fa6c75e"
              status: "failed"
          schema_version: 1
          stale_evidence: []
          status: "failed"
          unsatisfied_criteria:
            - "direct-rework-route"
            - "pinned-runtime"
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-11T15:35:40.189Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:ceacecab76b0382ba2b456d2e2b8ac1c4da4a883d40b3cccc710c662b52605b3"
        entity: "work_item"
        id: "event_776c4edec846488cd03f1d6f"
        mutation_id: "external-result:work-order-202609111339-NGDG6V-executor-1cb49946b99364814f64d390"
        plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609111339-NGDG6V"
        task_revision: 7
        work_item_id: "direct-rework-routing-and-regression"
      -
        at: "2026-09-11T15:39:11.075Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "scope_expanded"
          - "outputs_changed"
          - "risk_changed"
          - "external_effects_changed"
        entity: "task"
        id: "event_8cf5c92336285167037396e6"
        mutation_id: "plan-refinement:work-order-202609111339-NGDG6V-executor-348812f9062f49530d4549ec"
        plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609111339-NGDG6V"
        task_revision: 9
        work_item_id: null
      -
        at: "2026-09-11T16:29:12.582Z"
        from: "READY"
        to: "REWORK_READY"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:b2c882d94bcf85d8be062ecc32cf32e96f8f96b283c043fd609df3a86eda091d"
        entity: "work_item"
        id: "event_fffe8eb78f38212f0fbbf7f9"
        mutation_id: "external-result:work-order-202609111339-NGDG6V-executor-e8284937d9be495ebbedd5d7"
        plan_digest: "sha256:8625b1e9554592c0078f99851e375813d0f709b93d928a0612c5c6bc2c06fae1"
        plan_revision: 2
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609111339-NGDG6V"
        task_revision: 15
        work_item_id: "pinned-runtime-verification-recovery"
    leases: []
    mutation_receipts:
      compatibility:sha256:172c8d39d5a895818ca3aef9de0f2ea9323a30dc65b76d63b63f8dc1cc2ae50f:
        aggregate_digest: "sha256:b0153c03bb5b8e2c6dfce8c6faa5b9451511896bd1f0be28f5ee8bca20754ce9"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T16:14:29.716Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_60f350c8be6cadf96231405d"
          mutation_id: "compatibility:sha256:172c8d39d5a895818ca3aef9de0f2ea9323a30dc65b76d63b63f8dc1cc2ae50f"
          plan_digest: "sha256:8625b1e9554592c0078f99851e375813d0f709b93d928a0612c5c6bc2c06fae1"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:172c8d39d5a895818ca3aef9de0f2ea9323a30dc65b76d63b63f8dc1cc2ae50f"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      compatibility:sha256:214ce2eaad1eacf9bc356c9215572dec1a929f80c2509f87a1a624139b3a2c31:
        aggregate_digest: "sha256:2ff9eb8892ef5ef3a57af91098c7738e24c0d579d965bc281785d5efbf153cfd"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T15:35:16.981Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c84b9c1b1157c911d9fd0a2e"
          mutation_id: "compatibility:sha256:214ce2eaad1eacf9bc356c9215572dec1a929f80c2509f87a1a624139b3a2c31"
          plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:214ce2eaad1eacf9bc356c9215572dec1a929f80c2509f87a1a624139b3a2c31"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      compatibility:sha256:3f058c0e6a4e001f55d7159a72890203c9eea5abf9c02d16b51ff4599823ae2f:
        aggregate_digest: "sha256:332eb32d852204b4e11728331655930af163750640f243e9986d2ba813462b91"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T16:14:29.716Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_f6bb94446f6263cbdea69df4"
          mutation_id: "compatibility:sha256:3f058c0e6a4e001f55d7159a72890203c9eea5abf9c02d16b51ff4599823ae2f"
          plan_digest: "sha256:8625b1e9554592c0078f99851e375813d0f709b93d928a0612c5c6bc2c06fae1"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3f058c0e6a4e001f55d7159a72890203c9eea5abf9c02d16b51ff4599823ae2f"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      compatibility:sha256:66a7f23ed93db09286a86ca49c22fcb50f7a489f5727ee157c0c12c635f32cdc:
        aggregate_digest: "sha256:6c3c736c202cc569d14253b5a55c54813a6d33a9bcac416c4855607a67c0791d"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T15:40:52.928Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_8065498eafddb24f3cd15811"
          mutation_id: "compatibility:sha256:66a7f23ed93db09286a86ca49c22fcb50f7a489f5727ee157c0c12c635f32cdc"
          plan_digest: "sha256:8625b1e9554592c0078f99851e375813d0f709b93d928a0612c5c6bc2c06fae1"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:66a7f23ed93db09286a86ca49c22fcb50f7a489f5727ee157c0c12c635f32cdc"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      compatibility:sha256:6af7323755a7d00a6a93d2518bcab1c4183a0ed40e5da3d25663bdd5e2fe925d:
        aggregate_digest: "sha256:dfab08487f3897736dd9ebb867741943c3ade02ab27290fd15e12fb4a8bfdabf"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T15:28:12.090Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_30516fac6dd827fd83e441e8"
          mutation_id: "compatibility:sha256:6af7323755a7d00a6a93d2518bcab1c4183a0ed40e5da3d25663bdd5e2fe925d"
          plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6af7323755a7d00a6a93d2518bcab1c4183a0ed40e5da3d25663bdd5e2fe925d"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      compatibility:sha256:6fe6f3f90c2767ea3b6b6738bf949b77d8fec1b991f115a09cb4cb9962dfee68:
        aggregate_digest: "sha256:28acd7c1c319a12a1f6842cae1fc65292f045e9a05b1a5f7a7c80d67d5d991cf"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T15:40:52.926Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_5b89c382569b6c48ea44c8c2"
          mutation_id: "compatibility:sha256:6fe6f3f90c2767ea3b6b6738bf949b77d8fec1b991f115a09cb4cb9962dfee68"
          plan_digest: "sha256:8625b1e9554592c0078f99851e375813d0f709b93d928a0612c5c6bc2c06fae1"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 11
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:6fe6f3f90c2767ea3b6b6738bf949b77d8fec1b991f115a09cb4cb9962dfee68"
        next_revision: 12
        previous_revision: 11
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      compatibility:sha256:8243be5900f7c78b33c3493a78da66590ac705e7640edb4bccd1e6d11cc9c2fa:
        aggregate_digest: "sha256:f811eb974344681c8b23a50c188870f5a354a78207385dd2a2f19e1e61d4e6d9"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T15:35:16.981Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_1fe6e030d1ceece333c07660"
          mutation_id: "compatibility:sha256:8243be5900f7c78b33c3493a78da66590ac705e7640edb4bccd1e6d11cc9c2fa"
          plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:8243be5900f7c78b33c3493a78da66590ac705e7640edb4bccd1e6d11cc9c2fa"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      compatibility:sha256:88eb18520edee28d830888159ec861fc283fae5931e4e3e46c8f8da476b30144:
        aggregate_digest: "sha256:44cf74cc6e05e3768c40c04c5ef83ebf43190a271bbe24d253ce5cff81417471"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T15:26:17.810Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_14d5de2f4b375900915bfd4c"
          mutation_id: "compatibility:sha256:88eb18520edee28d830888159ec861fc283fae5931e4e3e46c8f8da476b30144"
          plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:88eb18520edee28d830888159ec861fc283fae5931e4e3e46c8f8da476b30144"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      compatibility:sha256:d52ac5aaff9d43ed603efbff53595c943b055baf8595232bb202c47c7634492d:
        aggregate_digest: "sha256:bd04242556c5b6df74d71f68eac36bfe0d65586e5d4d5e45c9dbe9166937259d"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T15:36:24.681Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_5f7d42bf2e940fe934832888"
          mutation_id: "compatibility:sha256:d52ac5aaff9d43ed603efbff53595c943b055baf8595232bb202c47c7634492d"
          plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:d52ac5aaff9d43ed603efbff53595c943b055baf8595232bb202c47c7634492d"
        next_revision: 9
        previous_revision: 8
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      compatibility:sha256:e4cb1ed19a3cb4d3fc47c2cfe1e2132f8098c9b9214d8bca8a7032337c95001e:
        aggregate_digest: "sha256:cea3000b70c51419d8d777b22944ef6ec78e847a99d9c7ff6bcd063288210e37"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T15:26:17.815Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_e5296b41e4ae3546f32d1f9e"
          mutation_id: "compatibility:sha256:e4cb1ed19a3cb4d3fc47c2cfe1e2132f8098c9b9214d8bca8a7032337c95001e"
          plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:e4cb1ed19a3cb4d3fc47c2cfe1e2132f8098c9b9214d8bca8a7032337c95001e"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      external-result:work-order-202609111339-NGDG6V-executor-1cb49946b99364814f64d390:
        aggregate_digest: "sha256:c05e7593b34e1f061f536ffc961e087c157ae5bea0fa87950fc5b4df5a2b922c"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T15:35:40.189Z"
          cause_refs:
            - "semantic-result:sha256:ceacecab76b0382ba2b456d2e2b8ac1c4da4a883d40b3cccc710c662b52605b3"
          entity: "work_item"
          from: "READY"
          id: "event_776c4edec846488cd03f1d6f"
          mutation_id: "external-result:work-order-202609111339-NGDG6V-executor-1cb49946b99364814f64d390"
          plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "direct-rework-routing-and-regression"
        mutation_id: "external-result:work-order-202609111339-NGDG6V-executor-1cb49946b99364814f64d390"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      external-result:work-order-202609111339-NGDG6V-executor-e8284937d9be495ebbedd5d7:
        aggregate_digest: "sha256:e2e93d6dc9701fcec1e4664cc6b45c8746ba480cce257b332c73f9255cd1bd10"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T16:29:12.582Z"
          cause_refs:
            - "semantic-result:sha256:b2c882d94bcf85d8be062ecc32cf32e96f8f96b283c043fd609df3a86eda091d"
          entity: "work_item"
          from: "READY"
          id: "event_fffe8eb78f38212f0fbbf7f9"
          mutation_id: "external-result:work-order-202609111339-NGDG6V-executor-e8284937d9be495ebbedd5d7"
          plan_digest: "sha256:8625b1e9554592c0078f99851e375813d0f709b93d928a0612c5c6bc2c06fae1"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 15
          to: "REWORK_READY"
          work_item_id: "pinned-runtime-verification-recovery"
        mutation_id: "external-result:work-order-202609111339-NGDG6V-executor-e8284937d9be495ebbedd5d7"
        next_revision: 16
        previous_revision: 15
        schema_version: 1
        task_id: "202609111339-NGDG6V"
      plan-refinement:work-order-202609111339-NGDG6V-executor-348812f9062f49530d4549ec:
        aggregate_digest: "sha256:e283ee574ad9addedd0a02d2daf0748ef82495e946f7f0993cd4805b41fa178f"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-11T15:39:11.075Z"
          cause_refs:
            - "scope_expanded"
            - "outputs_changed"
            - "risk_changed"
            - "external_effects_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_8cf5c92336285167037396e6"
          mutation_id: "plan-refinement:work-order-202609111339-NGDG6V-executor-348812f9062f49530d4549ec"
          plan_digest: "sha256:0a76fdd4105767bb073ae02940e73a715d3fd550ae0b792ed800c9c63f433b7f"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111339-NGDG6V"
          task_revision: 9
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609111339-NGDG6V-executor-348812f9062f49530d4549ec"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609111339-NGDG6V"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "0bafc17cba6d0e84c0d3507d078ee74ad8bc7652"
  task_execution_context:
    base_ref: "main"
    base_sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
    version: 1
id_source: "generated"
---
## Summary

Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893

GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893

## Scope

- In scope: GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893.
- Out of scope: unrelated refactors not required for "Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893".

## Plan

Preserve the committed repair and rerun all gates with task-local Bun 1.4.2.

## Verify Steps

1. With approved network access, run `MISE_DATA_DIR="$PWD/node_modules/.cache/agentplane-mise/data" MISE_CACHE_DIR="$PWD/node_modules/.cache/agentplane-mise/cache" mise install bun@1.4.2`. Expected: Bun 1.4.2 is available only in the ignored task-local cache.
2. With the task-local Bun directory prepended to `PATH`, run `bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1`. Expected: all focused direct rework and workflow-step routing regressions pass.
3. Inspect `task next-action --json` and `task status --json` in the regression after `verify --rework`. Expected: both expose a CODER `implementation_rework` episode, `safeToMutate=true`, and no repeated TESTER verification.
4. With the same task-local Bun directory prepended to `PATH`, run `bun run ci:local:full`. Expected: the repository full local CI gate passes under the pinned Bun 1.4.2 runtime.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-11T15:36:23.030Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bun run ci:local:full
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:b434ac5d180a14ad7cb650945d4df1b94248c088dc1a0b0826e42f5675c67a03, input_digest=sha256:4c16ece2228341cf4a376c4427243a034ef3e8d81e414cc7209098068c6a88fb

Details:

Command: bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1
Result: pass
Evidence: .agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609111339-NGDG6V declared verification

Command: bun run ci:local:full
Result: fail
Evidence: .agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json#check-2
Scope: branch_pr task 202609111339-NGDG6V declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609111339-NGDG6V-route-direct-verification-rework-to-bounded-repa/.agentplane/tasks/202609111339-NGDG6V/blueprint/resolved-snapshot.json
- old_digest: 823764a6196d2004c1109797c319a2c7f17a056e1fb1518d528da77053f5df60
- current_digest: 823764a6196d2004c1109797c319a2c7f17a056e1fb1518d528da77053f5df60
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609111339-NGDG6V

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609111339-NGDG6V
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
