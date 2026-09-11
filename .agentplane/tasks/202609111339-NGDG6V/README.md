---
id: "202609111339-NGDG6V"
title: "Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  updated_at: "2026-09-11T15:27:33.413Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:3ec41610f8b8089a8f633cd7d2bfb0816ab470a6a7c95c0d9f132342e07fbaf9"
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
      - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The repository enforces branch_pr for code changes."
      - "The requested behavior is localized to direct route selection and its nearest regressions."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
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
          - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
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
      digest: "sha256:564c0d23b7fffb79578ae95e617f9b09ba8983227a98463d84a109ecd6d7ba5e"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-factory.ts"
        - "central_component:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-factory.ts"
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
          - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
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
  hash: "c14b1c85cb35f0ee51131670fa16bb50a191284b"
  message: "🚧 NGDG6V task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: c14b1c85cb35. CLI accepted one state-bound external-agent semantic result."
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
doc_version: 3
doc_updated_at: "2026-09-11T15:35:16.981Z"
doc_updated_by: "SUPERVISOR"
description: "GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893"
sections:
  Summary: |-
    Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893

    GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893
  Scope: |-
    - In scope: GitHub issue #4893 remains relevant on current main. After agentplane verify <task-id> --rework, directStep can select direct verification again from the completed runner instead of granting a CODER repair episode, and task-document correction has no executable route. Add a direct-mode regression for verify --rework followed by task next-action/status, route repository-fixable findings to a semantic implementation or task-contract repair episode with safe_to_mutate=true, preserve evidence, and return to TESTER only after a new implementation or approved contract correction. Keep approval and task-centric provenance fail closed. Issue: https://github.com/basilisk-labs/agentplane/issues/4893.
    - Out of scope: unrelated refactors not required for "Route direct verification rework to bounded repair instead of repeated verification for GitHub issue #4893".
  Plan: "Plan direct verification rework as one bounded routing change with focused regression coverage."
  Verify Steps: |-
    1. Run `bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1`. Expected: all focused direct rework and workflow-step routing regressions pass.
    2. Inspect `task next-action --json` and `task status --json` in the regression after `verify --rework`. Expected: both expose a CODER `implementation_rework` episode, `safeToMutate=true`, and no repeated TESTER verification.
    3. Confirm the regression records newer repair evidence before TESTER is selected again. Expected: unchanged implementation or unapproved task-contract drift remains on the repair path.
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
    approval_evidence_digest: "sha256:3ec41610f8b8089a8f633cd7d2bfb0816ab470a6a7c95c0d9f132342e07fbaf9"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:c8c343aae16f709ed85a50debf6597cad9c17a7ef422f8c6a8d28e651d622f4e"
    grant_id: "57c848c6-90ec-4876-9dc3-97a5a135e3a9"
    issued_at: "2026-09-11T15:27:33.413Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c00854b517c8622b6641a7d9215e9ec2007c2c247b0f49f6ac6d182b590525d3"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609111339-NGDG6V"
  agentplane.task_centric:
    current_plan:
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
    event_cursor: 5
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
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-09-11T15:35:40.189Z"
    work_items:
      direct-rework-routing-and-regression:
        attempt: 1
        claim_id: null
        id: "direct-rework-routing-and-regression"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:150bf0389a92c193cbd46de8c949ee1f44e03847f02cdfc9e71a34beeee62504"
            id: "A minimal direct route predicate and step selection for unresolved verification rework."
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609111339-NGDG6V"
              work_item_id: "direct-rework-routing-and-regression"
            provenance:
              - "sha256:e434fef343e96160377872d8dc0ef74ef2476bd2d0fa5767d8199ebb1286bcf4"
              - ".agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:48aa446a959afcf8acc8fe6afb83506acbd703f0b8be32fd84fcb1520e4e1f8b"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:bb60d78cd6788934414396d11e6f73385bc518addd6d08c00ccb17295eaba6fd"
            id: "Regression coverage that fails on repeated verification and passes on bounded CODER repair routing."
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609111339-NGDG6V"
              work_item_id: "direct-rework-routing-and-regression"
            provenance:
              - "sha256:e434fef343e96160377872d8dc0ef74ef2476bd2d0fa5767d8199ebb1286bcf4"
              - ".agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:48aa446a959afcf8acc8fe6afb83506acbd703f0b8be32fd84fcb1520e4e1f8b"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609111339-NGDG6V/supervision/declared-checks.json"
              check_id: "focused-regression"
              command_identity: "bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1"
              detail: "Observed by bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-11T15:35:40.184Z"
              repository_snapshot_digest: "sha256:48aa446a959afcf8acc8fe6afb83506acbd703f0b8be32fd84fcb1520e4e1f8b"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
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
    leases: []
    mutation_receipts:
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
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "c14b1c85cb35f0ee51131670fa16bb50a191284b"
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

Plan direct verification rework as one bounded routing change with focused regression coverage.

## Verify Steps

1. Run `bunx --no-install vitest run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/workflow-step-quality.test.ts --maxWorkers=1`. Expected: all focused direct rework and workflow-step routing regressions pass.
2. Inspect `task next-action --json` and `task status --json` in the regression after `verify --rework`. Expected: both expose a CODER `implementation_rework` episode, `safeToMutate=true`, and no repeated TESTER verification.
3. Confirm the regression records newer repair evidence before TESTER is selected again. Expected: unchanged implementation or unapproved task-contract drift remains on the repair path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
