---
id: "202609071655-XKV80D"
title: "Accept report-only WorkItem results without requiring source-code changes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "intake"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
verify:
  - "bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-report-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-07T16:59:49.752Z"
  updated_by: "HOST:local:USER"
  note: "host_user_decision=sha256:d81df8f0038c7ad7c2f0a30018c03c69eb6eba37d0f931920fa0799d6efa74e8"
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
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "repository_write"
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
      - "documentation"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-report-result.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-report-result.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Repair report-only WorkItem acceptance and preserve rejection for code WorkItems. Do not merge, publish, or change GitHub alert states."
    repository_effects:
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-report-result.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-report-result.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
      - "packages/agentplane/src/commands/task/external-agent-report-result.test.ts"
      - "packages/agentplane/src/commands/task/external-agent-report-result.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-report-result.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-report-result.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:47b819868005aeb804ef027256aa8bb4835b8e17c7b4f67f478065a69ecfbc7d"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
        - "effect_security_boundary"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
          - "packages/agentplane/src/commands/task/external-agent-report-result.test.ts"
          - "packages/agentplane/src/commands/task/external-agent-report-result.ts"
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
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "693879a426881d13a1f40f2eb4ab15fd233e25ce"
  message: "🚧 XKV80D task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 693879a42688. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-07T17:00:24.141Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-07T17:25:29.642Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 693879a42688. CLI accepted one state-bound external-agent semantic result."
    commit: "693879a426881d13a1f40f2eb4ab15fd233e25ce"
doc_version: 3
doc_updated_at: "2026-09-07T17:25:29.642Z"
doc_updated_by: "SUPERVISOR"
description: "User approved this recovery on 2026-09-07 to unblock CodeQL task 202609071444-7MNJXE. Materialize report-only semantic output through the supervisor as a task-owned evidence artifact. Preserve no-change rejection for code WorkItems, scope validation, exact result identity, and replay safety. Modify external-agent-implementation-authority.ts and add bounded report-result support with focused unit and existing CLI regression tests. Do not approve or dismiss GitHub alerts. No external writes. Continue the existing CodeQL task after this recovery and repair its pending test lint within its emitted authority."
sections:
  Summary: |-
    Accept report-only WorkItem results without requiring source-code changes

    User approved this recovery on 2026-09-07 to unblock CodeQL task 202609071444-7MNJXE. Materialize report-only semantic output through the supervisor as a task-owned evidence artifact. Preserve no-change rejection for code WorkItems, scope validation, exact result identity, and replay safety. Modify external-agent-implementation-authority.ts and add bounded report-result support with focused unit and existing CLI regression tests. Do not approve or dismiss GitHub alerts. No external writes. Continue the existing CodeQL task after this recovery and repair its pending test lint within its emitted authority.
  Scope: |-
    - In scope: User approved this recovery on 2026-09-07 to unblock CodeQL task 202609071444-7MNJXE. Materialize report-only semantic output through the supervisor as a task-owned evidence artifact. Preserve no-change rejection for code WorkItems, scope validation, exact result identity, and replay safety. Modify external-agent-implementation-authority.ts and add bounded report-result support with focused unit and existing CLI regression tests. Do not approve or dismiss GitHub alerts. No external writes. Continue the existing CodeQL task after this recovery and repair its pending test lint within its emitted authority.
    - Out of scope: unrelated refactors not required for "Accept report-only WorkItem results without requiring source-code changes".
  Plan: "Prepare the user-approved report-only result recovery with supervisor-owned evidence persistence and unchanged code-work authority checks."
  Verify Steps: "Run bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-report-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts. Expect report-only completion and exact replay to pass. Expect no-change code results, escaped paths, stale identity, and changed result replay to fail. Run git diff --check and focused ESLint. Preserve the required full CI verification floor."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:local:USER"
    approval_evidence_digest: "sha256:d81df8f0038c7ad7c2f0a30018c03c69eb6eba37d0f931920fa0799d6efa74e8"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:b49c73542b465edfd3cb72709d563fafe83e03f8b95d9a8c238c29d3d5b93b8b"
    digest: "sha256:7804f6441f00e577c9b321eedd70bcabc3e1556526b87b306a4104eab06ed473"
    grant_id: "5c0917be-5d7b-4acb-b0c5-2b2253332e0c"
    issued_at: "2026-09-07T16:59:49.752Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ca6790287dae6c9a82c7debc3aa533f19052dfd5e7dc07efd639306a2571cd1f"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:53cd419f76eeae5209638c0cd0a685b24aea25d380c4d56eca7d81b2e1d82415"
    status: "active"
    task_id: "202609071655-XKV80D"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-07T16:59:49.752Z"
        approved_by: "HOST:local:USER"
        approved_digest: "sha256:8df45f2d90bd5e18f1d1374ce71fc4358748027152024a9ff72bf3530739e181"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-07T16:58:31.288Z"
      digest: "sha256:8df45f2d90bd5e18f1d1374ce71fc4358748027152024a9ff72bf3530739e181"
      proposal:
        assumptions:
          - "The user approved this bounded recovery. Existing CodeQL lint is repaired only through that task after recovery."
        planning_baseline:
          captured_at: "2026-09-07T16:58:09.486Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:9863670022fef8d4fb72fbb4593a100bc148dfaab0b7366dbe382f8d5f33f2a9"
          dirty_paths:
            - ".agentplane/tasks/202609071412-9Q9KQN/README.md"
            - ".agentplane/tasks/202609071432-QCBB76/README.md"
            - ".agentplane/tasks/202609071501-VN1FN4/README.md"
            - ".agentplane/tasks/202609071501-VN1FN4/supervision/declared-checks.json"
            - ".agentplane/tasks/202609071541-47TFVD/README.md"
            - ".agentplane/tasks/202609071655-XKV80D/README.md"
            - "packages/agentplane/src/cli/run-cli.core.kernel-transport.test.ts"
            - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
            - "packages/agentplane/src/cli/run-cli.critical.agent-efficiency-baseline.test.ts"
            - "packages/agentplane/src/commands/task/agent-action-packet.test.ts"
            - "packages/agentplane/src/commands/task/agent-action-packet.ts"
            - "packages/agentplane/src/commands/task/external-agent-exchange.ts"
            - "packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts"
            - "packages/agentplane/src/commands/task/kernel-advance.ts"
            - "packages/agentplane/src/commands/task/kernel-exchange.ts"
            - "packages/agentplane/src/commands/task/kernel-inspection.ts"
            - "packages/agentplane/src/commands/task/kernel-run.ts"
            - "packages/agentplane/src/commands/task/task-token-usage.test.ts"
            - "packages/agentplane/src/commands/task/task-token-usage.ts"
            - "packages/agentplane/src/harness/token-accounting.test.ts"
            - "packages/agentplane/src/harness/token-accounting.ts"
            - "packages/agentplane/src/runner/adapters/codex-result-transport.test.ts"
            - "packages/agentplane/src/runner/adapters/codex-result-transport.ts"
            - "packages/agentplane/src/runner/adapters/codex.test.ts"
            - "packages/agentplane/src/runner/adapters/codex.ts"
            - "packages/agentplane/src/runner/adapters/prepared-input.ts"
            - "packages/agentplane/src/runner/artifacts.ts"
            - "packages/agentplane/src/runner/context/task-context.test.ts"
            - "packages/agentplane/src/runner/context/work-order-context.ts"
            - "packages/agentplane/src/runner/observation/git-snapshot.test.ts"
            - "packages/agentplane/src/runner/observation/kernel-repository.ts"
            - "packages/agentplane/src/runner/types/context.ts"
            - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
            - "packages/agentplane/src/runner/usecases/task-run-bootstrap.ts"
            - "packages/core/src/runner/agent-semantic-result.test.ts"
            - "packages/core/src/runner/agent-semantic-result.ts"
            - "packages/core/src/runner/agent-work-order.ts"
            - "packages/core/src/runner/supervisor-execution-episode.test.ts"
            - "packages/core/src/runner/supervisor-execution-episode.ts"
            - "packages/core/src/tasks/kernel-semantic.ts"
            - "packages/core/src/tasks/task-artifact-schema.task.ts"
            - "packages/core/src/tasks/task-store.ts"
            - "scripts/baselines/agent-efficiency-VN1FN4-before.json"
            - "scripts/bench/measure-agent-efficiency.mjs"
            - "scripts/lib/agent-efficiency-repository-snapshot.mjs"
          git:
            kind: "commit"
            ref: null
            sha: "92efd467a7b045e7e784597168ac21bd41a975a1"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609071655-XKV80D"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-report-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
              id: "regression"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "regression"
              description: "A current report-only WorkItem scoped to its own task artifacts can complete without agent source edits. Supervisor persists the exact semantic report. Code WorkItems with no change, unapproved paths, stale state, and changed-result replay remain rejected."
              id: "report-only-contract"
              required: true
          evidence_fingerprint: "sha256:7ab107269dfc075b0545c79737122a7530e06bbfcacd20d902e40ab5067bb2e6"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "regression"
                  description: "A current report-only WorkItem scoped to its own task artifacts can complete without agent source edits. Supervisor persists the exact semantic report. Code WorkItems with no change, unapproved paths, stale state, and changed-result replay remain rejected."
                  id: "report-only-contract"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 100000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                symbol_hints:
                  - "applyExternalImplementationResult"
                  - "assertExternalImplementationReturnState"
              depends_on: []
              expected_outputs:
                - "report-result-regression-evidence"
              id: "report-result"
              objective: "Materialize the semantic result for an approved report-only WorkItem through the supervisor. Preserve authority and replay checks. Keep ordinary no-change implementation rejection. Add regression coverage in the new focused helper suite and existing CLI evidence-rework suite."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-report-result.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/external-agent-report-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/external-agent-report-result.ts"
                - "packages/agentplane/src/commands/task/external-agent-report-result.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-report-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
                    id: "regression"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "regression"
                    description: "A current report-only WorkItem scoped to its own task artifacts can complete without agent source edits. Supervisor persists the exact semantic report. Code WorkItems with no change, unapproved paths, stale state, and changed-result replay remain rejected."
                    id: "report-only-contract"
                    required: true
                evidence_fingerprint: "sha256:7ab107269dfc075b0545c79737122a7530e06bbfcacd20d902e40ab5067bb2e6"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609071655-XKV80D"
    event_cursor: 5
    final_validation: null
    id: "202609071655-XKV80D"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-report-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-07T16:55:53.804Z"
      constraints: []
      request: |-
        Accept report-only WorkItem results without requiring source-code changes

        User approved this recovery on 2026-09-07 to unblock CodeQL task 202609071444-7MNJXE. Materialize report-only semantic output through the supervisor as a task-owned evidence artifact. Preserve no-change rejection for code WorkItems, scope validation, exact result identity, and replay safety. Modify external-agent-implementation-authority.ts and add bounded report-result support with focused unit and existing CLI regression tests. Do not approve or dismiss GitHub alerts. No external writes. Continue the existing CodeQL task after this recovery and repair its pending test lint within its emitted authority.
      task_id: "202609071655-XKV80D"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-09-07T17:30:04.421Z"
    work_items:
      report-result:
        attempt: 1
        claim_id: null
        id: "report-result"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:2870ea1ee46aa3b39b5a5129d18fec39e77d7752b4c295622aebf8832294a611"
            id: "report-result-regression-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609071655-XKV80D"
              work_item_id: "report-result"
            provenance:
              - "sha256:1e9b29849f2af627ec9f5b15e1bfb1fe7b4da69c2821fe36814843ddfdf4aca8"
              - ".agentplane/tasks/202609071655-XKV80D/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:5ba72b7e2c73fe4b31dbab9a31eeac8d7e6e8a8a8b65bda4588d147387daaebb"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609071655-XKV80D/supervision/declared-checks.json"
              check_id: "regression"
              command_identity: "bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-report-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts"
              detail: "Observed by bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-report-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts."
              exit_code: 0
              observed_at: "2026-09-07T17:30:04.414Z"
              repository_snapshot_digest: "sha256:5ba72b7e2c73fe4b31dbab9a31eeac8d7e6e8a8a8b65bda4588d147387daaebb"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-07T17:30:04.421Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:fa6807815b19dad84ec4f7e064983be2f01846885e6b5520c99b2eb4c12704f6"
        entity: "work_item"
        id: "event_f37e1b6684279c90dcad02e7"
        mutation_id: "external-result:work-order-202609071655-XKV80D-executor-190d85835fbfb77f12cd28ff"
        plan_digest: "sha256:8df45f2d90bd5e18f1d1374ce71fc4358748027152024a9ff72bf3530739e181"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609071655-XKV80D"
        task_revision: 7
        work_item_id: "report-result"
    leases: []
    mutation_receipts:
      compatibility:sha256:17ae65dff4dd077a6ef445e14a6d8971c350f5881768cbdf0fc49c741f422fc9:
        aggregate_digest: "sha256:e83fcd209132e3f4488e4c3342fe366192dfa89e69ea8d42d35ebe29a3ac6fd4"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T17:25:29.642Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d64a5b21221893bddba816b4"
          mutation_id: "compatibility:sha256:17ae65dff4dd077a6ef445e14a6d8971c350f5881768cbdf0fc49c741f422fc9"
          plan_digest: "sha256:8df45f2d90bd5e18f1d1374ce71fc4358748027152024a9ff72bf3530739e181"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071655-XKV80D"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:17ae65dff4dd077a6ef445e14a6d8971c350f5881768cbdf0fc49c741f422fc9"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609071655-XKV80D"
      compatibility:sha256:6294a072685886bb1575b25d7acd35430de18eeee00b9370a34c38ff29d68513:
        aggregate_digest: "sha256:14fcc74bcb8df714131bb0e92dcf855ebba9b3ebec82155e34388e4c2acd89d4"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T17:00:24.141Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c87a3130e0e55e7a67bf25e8"
          mutation_id: "compatibility:sha256:6294a072685886bb1575b25d7acd35430de18eeee00b9370a34c38ff29d68513"
          plan_digest: "sha256:8df45f2d90bd5e18f1d1374ce71fc4358748027152024a9ff72bf3530739e181"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071655-XKV80D"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6294a072685886bb1575b25d7acd35430de18eeee00b9370a34c38ff29d68513"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609071655-XKV80D"
      compatibility:sha256:6a7a52993539e5cbe185a241933f6b0eb3af7c8f81f644bce2e7108a578bf983:
        aggregate_digest: "sha256:7dd1224e06058e2d7f86be7353c85607601073f748ca151cf90d895b2edddade"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T17:25:29.642Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4fc4a303fc9288c04f016308"
          mutation_id: "compatibility:sha256:6a7a52993539e5cbe185a241933f6b0eb3af7c8f81f644bce2e7108a578bf983"
          plan_digest: "sha256:8df45f2d90bd5e18f1d1374ce71fc4358748027152024a9ff72bf3530739e181"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071655-XKV80D"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:6a7a52993539e5cbe185a241933f6b0eb3af7c8f81f644bce2e7108a578bf983"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609071655-XKV80D"
      compatibility:sha256:9df369b91f02a523926ab8e0f5bb3eb808850616f55c8af96af6bd867bf86b89:
        aggregate_digest: "sha256:22ead6e1b2fd7884fcf2327c196ab59339459e821c446a0116309bb0fb69e9d3"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T16:59:30.450Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_4eace1cf58c2527bcb08b57b"
          mutation_id: "compatibility:sha256:9df369b91f02a523926ab8e0f5bb3eb808850616f55c8af96af6bd867bf86b89"
          plan_digest: "sha256:8df45f2d90bd5e18f1d1374ce71fc4358748027152024a9ff72bf3530739e181"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071655-XKV80D"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:9df369b91f02a523926ab8e0f5bb3eb808850616f55c8af96af6bd867bf86b89"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609071655-XKV80D"
      compatibility:sha256:a5b4fafa8f7bda0388f42d0c925ae0bb74dd8227aff0c462e7ae8c7c32fade29:
        aggregate_digest: "sha256:9325d477f65e89556ea8fa780c6a3c73c34585df866236d14bf009d66b064c36"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T16:59:30.451Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_1b87818234771056dd7967b0"
          mutation_id: "compatibility:sha256:a5b4fafa8f7bda0388f42d0c925ae0bb74dd8227aff0c462e7ae8c7c32fade29"
          plan_digest: "sha256:8df45f2d90bd5e18f1d1374ce71fc4358748027152024a9ff72bf3530739e181"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071655-XKV80D"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:a5b4fafa8f7bda0388f42d0c925ae0bb74dd8227aff0c462e7ae8c7c32fade29"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609071655-XKV80D"
      external-result:work-order-202609071655-XKV80D-executor-190d85835fbfb77f12cd28ff:
        aggregate_digest: "sha256:2415990bcabe9f2bca90bd3afb3930b212704b0ce2736221e7273db1102c65e0"
        event:
          actor_id: "agentplane"
          at: "2026-09-07T17:30:04.421Z"
          cause_refs:
            - "semantic-result:sha256:fa6807815b19dad84ec4f7e064983be2f01846885e6b5520c99b2eb4c12704f6"
          entity: "work_item"
          from: "READY"
          id: "event_f37e1b6684279c90dcad02e7"
          mutation_id: "external-result:work-order-202609071655-XKV80D-executor-190d85835fbfb77f12cd28ff"
          plan_digest: "sha256:8df45f2d90bd5e18f1d1374ce71fc4358748027152024a9ff72bf3530739e181"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609071655-XKV80D"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "report-result"
        mutation_id: "external-result:work-order-202609071655-XKV80D-executor-190d85835fbfb77f12cd28ff"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609071655-XKV80D"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "693879a426881d13a1f40f2eb4ab15fd233e25ce"
  task_execution_context:
    base_ref: "main"
    base_sha: "92efd467a7b045e7e784597168ac21bd41a975a1"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "92efd467a7b045e7e784597168ac21bd41a975a1"
    version: 1
id_source: "generated"
---
## Summary

Accept report-only WorkItem results without requiring source-code changes

User approved this recovery on 2026-09-07 to unblock CodeQL task 202609071444-7MNJXE. Materialize report-only semantic output through the supervisor as a task-owned evidence artifact. Preserve no-change rejection for code WorkItems, scope validation, exact result identity, and replay safety. Modify external-agent-implementation-authority.ts and add bounded report-result support with focused unit and existing CLI regression tests. Do not approve or dismiss GitHub alerts. No external writes. Continue the existing CodeQL task after this recovery and repair its pending test lint within its emitted authority.

## Scope

- In scope: User approved this recovery on 2026-09-07 to unblock CodeQL task 202609071444-7MNJXE. Materialize report-only semantic output through the supervisor as a task-owned evidence artifact. Preserve no-change rejection for code WorkItems, scope validation, exact result identity, and replay safety. Modify external-agent-implementation-authority.ts and add bounded report-result support with focused unit and existing CLI regression tests. Do not approve or dismiss GitHub alerts. No external writes. Continue the existing CodeQL task after this recovery and repair its pending test lint within its emitted authority.
- Out of scope: unrelated refactors not required for "Accept report-only WorkItem results without requiring source-code changes".

## Plan

Prepare the user-approved report-only result recovery with supervisor-owned evidence persistence and unchanged code-work authority checks.

## Verify Steps

Run bunx --no-install vitest run packages/agentplane/src/commands/task/external-agent-report-result.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.evidence-rework.test.ts. Expect report-only completion and exact replay to pass. Expect no-change code results, escaped paths, stale identity, and changed result replay to fail. Run git diff --check and focused ESLint. Preserve the required full CI verification floor.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
