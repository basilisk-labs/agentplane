---
id: "202609111337-ZJ6AFT"
title: "Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887"
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
  - "runner"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-09-11T14:08:43.560Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:9fb9ebe2a4da24b0e1ed513520103d73ab8c876cd16bc2109e5635fbcd2d8406"
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
      - "packages/agentplane/src/commands/task/run-render.test.ts"
      - "packages/agentplane/src/commands/task/run-render.ts"
      - "packages/agentplane/src/runner"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "A branch and pull request provide review and hosted verification for the high-priority behavior change."
      - "The task changes runner status and stale-run safety behavior."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/run-render.test.ts"
      - "packages/agentplane/src/commands/task/run-render.ts"
      - "packages/agentplane/src/runner"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/run-render.test.ts"
      - "packages/agentplane/src/commands/task/run-render.ts"
      - "packages/agentplane/src/runner/usecases/task-run-inspect.ts"
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
          - "packages/agentplane/src/commands/task/run-render.test.ts"
          - "packages/agentplane/src/commands/task/run-render.ts"
          - "packages/agentplane/src/runner"
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
      digest: "sha256:c726e8f34304ace275c9139c07dfb400fb5add5070a9f9168a270c6f4f7a9920"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/run-render.test.ts"
          - "packages/agentplane/src/commands/task/run-render.ts"
          - "packages/agentplane/src/runner/usecases/task-run-inspect.ts"
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
      requires_full_regression: false
      requires_real_e2e: false
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
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
  hash: "4f367ae362e1b415069e95b5edbfee4eb18d6ad5"
  message: "🚧 ZJ6AFT task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4f367ae362e1. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-09-11T14:09:51.181Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-11T14:40:45.882Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 4f367ae362e1. CLI accepted one state-bound external-agent semantic result."
    commit: "4f367ae362e1b415069e95b5edbfee4eb18d6ad5"
doc_version: 3
doc_updated_at: "2026-09-11T14:40:45.882Z"
doc_updated_by: "SUPERVISOR"
description: "GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887"
sections:
  Summary: |-
    Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887

    GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887
  Scope: |-
    - In scope: GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887.
    - Out of scope: unrelated refactors not required for "Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887".
  Plan: "Plan one bounded runner-activity status and reclaim-safety change with focused regressions."
  Verify Steps: |-
    1. Run `bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1`. Expected: active, idle, exited, unavailable, and recent trace or stderr safety regressions pass.
    2. Run `bun run typecheck`. Expected: the runner activity model and status output type-check.
    3. Review the final diff against GitHub issue #5887. Expected: status exposes last_trace_at, last_trace_seq, seconds_since_activity, and typed health, and reclaim guidance uses the same activity evidence.
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
    approval_evidence_digest: "sha256:9fb9ebe2a4da24b0e1ed513520103d73ab8c876cd16bc2109e5635fbcd2d8406"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:2ac48bda442961e13344c2fea5eb68890198bd31ef8700d4df9b1e4c35e98255"
    grant_id: "6ee9470a-527c-4a03-9b04-3e9aa1d51fcc"
    issued_at: "2026-09-11T14:08:43.560Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:be6753f4e2165eb16da9ae1e6fad568e8a77066917c3efc526d08e5129c7078b"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609111337-ZJ6AFT"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-11T14:08:43.560Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-11T14:05:26.410Z"
      digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
      proposal:
        assumptions:
          - "The existing persisted runner artifacts contain enough timestamps and trace sequence information to derive activity without a schema migration."
        planning_baseline:
          captured_at: "2026-09-11T14:04:31.892Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:78112f1f4600b6fc400fe7b119acf6eb13ef163f330119346fa0301ccc4ae592"
          dirty_paths:
            - ".agentplane/tasks/202609111337-ZJ6AFT/README.md"
            - ".agentplane/tasks/202609111339-NGDG6V/README.md"
            - ".agentplane/tasks/202609111340-MGB383/README.md"
            - ".agentplane/tasks/202609111341-FK9C2T/README.md"
            - ".agentplane/tasks/202609111341-SED9K5/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "f774282d4a6ef8ce7da5bc08c8e2fd9abb99303d"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1"
              id: "runner-activity-regressions"
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
                - "runner-activity-regressions"
              description: "Task run status reports last_trace_at, last_trace_seq, seconds_since_activity, and typed health using the newest runner-owned trace, stderr, heartbeat, and process-exit evidence."
              id: "trace-backed-status"
              required: true
            -
              check_ids:
                - "runner-activity-regressions"
              description: "Focused status regressions cover active, idle, exited, and unavailable activity signals."
              id: "health-cases"
              required: true
            -
              check_ids:
                - "runner-activity-regressions"
                - "typecheck"
              description: "Reclaim or cancel guidance does not classify a run as inactive while recent trace or stderr evidence is advancing even when the process heartbeat is stale."
              id: "safe-reclaim-guidance"
              required: true
          evidence_fingerprint: "sha256:78112f1f4600b6fc400fe7b119acf6eb13ef163f330119346fa0301ccc4ae592"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "runner-activity-regressions"
                  description: "Task run status reports last_trace_at, last_trace_seq, seconds_since_activity, and typed health using the newest runner-owned trace, stderr, heartbeat, and process-exit evidence."
                  id: "trace-backed-status"
                  required: true
                -
                  check_ids:
                    - "runner-activity-regressions"
                  description: "Focused status regressions cover active, idle, exited, and unavailable activity signals."
                  id: "health-cases"
                  required: true
                -
                  check_ids:
                    - "runner-activity-regressions"
                    - "typecheck"
                  description: "Reclaim or cancel guidance does not classify a run as inactive while recent trace or stderr evidence is advancing even when the process heartbeat is stale."
                  id: "safe-reclaim-guidance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/runner/run-state.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/run-render.ts"
                  - "packages/agentplane/src/commands/task/run-render.test.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-inspect.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts"
                  - "packages/agentplane/src/runner/trace-artifacts.ts"
                symbol_hints:
                  - "renderTaskRunInspectHuman"
                  - "inspectTaskRun"
                  - "cancelTaskRun"
              depends_on: []
              expected_outputs:
                - "verified-runner-activity-status-and-safety"
              id: "runner-activity-status-and-safety"
              objective: "Implement one runner-owned activity model. Derive activity from trace, stderr, heartbeat, and process exit evidence. Expose the required status fields and typed health. Reuse the model for stale-run reclaim or cancel guidance. Add focused regressions. Run the declared checks."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/run-render.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/run-render.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runner"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/run-render.ts"
                - "packages/agentplane/src/commands/task/run-render.test.ts"
                - "packages/agentplane/src/runner/usecases/task-run-inspect.ts"
                - "packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.ts"
                - "packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts"
                - "packages/agentplane/src/runner/trace-artifacts.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1"
                    id: "runner-activity-regressions"
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
                      - "runner-activity-regressions"
                    description: "Task run status reports last_trace_at, last_trace_seq, seconds_since_activity, and typed health using the newest runner-owned trace, stderr, heartbeat, and process-exit evidence."
                    id: "trace-backed-status"
                    required: true
                  -
                    check_ids:
                      - "runner-activity-regressions"
                    description: "Focused status regressions cover active, idle, exited, and unavailable activity signals."
                    id: "health-cases"
                    required: true
                  -
                    check_ids:
                      - "runner-activity-regressions"
                      - "typecheck"
                    description: "Reclaim or cancel guidance does not classify a run as inactive while recent trace or stderr evidence is advancing even when the process heartbeat is stale."
                    id: "safe-reclaim-guidance"
                    required: true
                evidence_fingerprint: "sha256:78112f1f4600b6fc400fe7b119acf6eb13ef163f330119346fa0301ccc4ae592"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609111337-ZJ6AFT"
    event_cursor: 5
    final_validation: null
    id: "202609111337-ZJ6AFT"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1"
          id: "legacy-1"
          required: true
      captured_at: "2026-09-11T13:37:59.893Z"
      constraints: []
      request: |-
        Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887

        GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887
      task_id: "202609111337-ZJ6AFT"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-09-11T14:42:20.767Z"
    work_items:
      runner-activity-status-and-safety:
        attempt: 1
        claim_id: null
        id: "runner-activity-status-and-safety"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:675d3b2ea635e92921f84c0f55129e6e3cd424c90d9da1b8b4b6dc4528d8f870"
            id: "verified-runner-activity-status-and-safety"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202609111337-ZJ6AFT"
              work_item_id: "runner-activity-status-and-safety"
            provenance:
              - "sha256:62ab1352f7dd6ae02b318c545ca79c2dc5b123e07c202fff5a18835f1c7f466d"
              - ".agentplane/tasks/202609111337-ZJ6AFT/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:4c5ce682ca97256f4ebc7a9afae34f98064d5d84b66d669024fe391bcd360146"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202609111337-ZJ6AFT/supervision/declared-checks.json"
              check_id: "runner-activity-regressions"
              command_identity: "bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1"
              detail: "Observed by bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1."
              exit_code: 0
              observed_at: "2026-09-11T14:42:20.754Z"
              repository_snapshot_digest: "sha256:4c5ce682ca97256f4ebc7a9afae34f98064d5d84b66d669024fe391bcd360146"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202609111337-ZJ6AFT/supervision/declared-checks.json"
              check_id: "typecheck"
              command_identity: "bun run typecheck"
              detail: "Observed by bun run typecheck."
              exit_code: 0
              observed_at: "2026-09-11T14:42:20.755Z"
              repository_snapshot_digest: "sha256:4c5ce682ca97256f4ebc7a9afae34f98064d5d84b66d669024fe391bcd360146"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    events:
      -
        at: "2026-09-11T14:42:20.767Z"
        from: "READY"
        to: "COMPLETED"
        actor_id: "agentplane"
        cause_refs:
          - "semantic-result:sha256:6e9e0312f5598d20d8608a26cd7cdc2c1d188116c6eb6b273faef3b37c3d1361"
        entity: "work_item"
        id: "event_12aa3783145c892e75fed3fa"
        mutation_id: "external-result:work-order-202609111337-ZJ6AFT-executor-9ca2945c8c2b10e903b0886d"
        plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
        task_revision: 7
        work_item_id: "runner-activity-status-and-safety"
    leases: []
    mutation_receipts:
      compatibility:sha256:3057f60e39f0dc6e5dd3e7059c577de28caca50dc82d98ec3974117f71c55103:
        aggregate_digest: "sha256:257f63e67bae438b6560973f7b076193418977a4e06f0acb99ac4b0b0fd6335f"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:08:08.009Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_24b42f7e764eaf6116a94062"
          mutation_id: "compatibility:sha256:3057f60e39f0dc6e5dd3e7059c577de28caca50dc82d98ec3974117f71c55103"
          plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:3057f60e39f0dc6e5dd3e7059c577de28caca50dc82d98ec3974117f71c55103"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
      compatibility:sha256:3b990909f45b492fe79dde66af5f2509b6b39b2f2d43dce8b3578ceac0eda648:
        aggregate_digest: "sha256:2447413a14fbf2fd17efae542144bced8d7f42922929fb316824c13fb05e78d7"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:09:51.181Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_3bccc6e06e700d193144a07d"
          mutation_id: "compatibility:sha256:3b990909f45b492fe79dde66af5f2509b6b39b2f2d43dce8b3578ceac0eda648"
          plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:3b990909f45b492fe79dde66af5f2509b6b39b2f2d43dce8b3578ceac0eda648"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
      compatibility:sha256:89b21d3efff39b99a02446c3f80b4b3e5cb3b05b9c5d9b574b7279640fc34da5:
        aggregate_digest: "sha256:a227902057cce05baa8e19efb657b01f6f48acccc9529373787413a2c1d0b506"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:40:45.882Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_b9d845b16f2c9ac9317fef66"
          mutation_id: "compatibility:sha256:89b21d3efff39b99a02446c3f80b4b3e5cb3b05b9c5d9b574b7279640fc34da5"
          plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 5
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:89b21d3efff39b99a02446c3f80b4b3e5cb3b05b9c5d9b574b7279640fc34da5"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
      compatibility:sha256:91a49517da51ee69729eb1edf8b892e2916d5c307f68f72dc9cb61e3aa36b3c1:
        aggregate_digest: "sha256:a96992522ce4d6c910c79dbecbac904433b11c69be409952c61579d5a9ebf8a2"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:40:45.882Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_11d6e972a0c0ff6a2eabd2c0"
          mutation_id: "compatibility:sha256:91a49517da51ee69729eb1edf8b892e2916d5c307f68f72dc9cb61e3aa36b3c1"
          plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 6
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:91a49517da51ee69729eb1edf8b892e2916d5c307f68f72dc9cb61e3aa36b3c1"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
      compatibility:sha256:b16b3dfe0e34f8dd8e2cf8637e7ce63044a6fcc44ac8dc404450b640898b5390:
        aggregate_digest: "sha256:a71d85f7d82ff5a8b4acae280e985f1f5ad15aaa9eb0ed2234ae271f9c9452d1"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:08:08.012Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_c5760c400b7fa5debcbf1b1e"
          mutation_id: "compatibility:sha256:b16b3dfe0e34f8dd8e2cf8637e7ce63044a6fcc44ac8dc404450b640898b5390"
          plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:b16b3dfe0e34f8dd8e2cf8637e7ce63044a6fcc44ac8dc404450b640898b5390"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
      external-result:work-order-202609111337-ZJ6AFT-executor-9ca2945c8c2b10e903b0886d:
        aggregate_digest: "sha256:d4a4d94bc0913bac2f26a8662650ff1c46de9ea33db97a42b9223f04b9bfbb5d"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:42:20.767Z"
          cause_refs:
            - "semantic-result:sha256:6e9e0312f5598d20d8608a26cd7cdc2c1d188116c6eb6b273faef3b37c3d1361"
          entity: "work_item"
          from: "READY"
          id: "event_12aa3783145c892e75fed3fa"
          mutation_id: "external-result:work-order-202609111337-ZJ6AFT-executor-9ca2945c8c2b10e903b0886d"
          plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "runner-activity-status-and-safety"
        mutation_id: "external-result:work-order-202609111337-ZJ6AFT-executor-9ca2945c8c2b10e903b0886d"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "4f367ae362e1b415069e95b5edbfee4eb18d6ad5"
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

Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887

GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887

## Scope

- In scope: GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887.
- Out of scope: unrelated refactors not required for "Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887".

## Plan

Plan one bounded runner-activity status and reclaim-safety change with focused regressions.

## Verify Steps

1. Run `bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1`. Expected: active, idle, exited, unavailable, and recent trace or stderr safety regressions pass.
2. Run `bun run typecheck`. Expected: the runner activity model and status output type-check.
3. Review the final diff against GitHub issue #5887. Expected: status exposes last_trace_at, last_trace_seq, seconds_since_activity, and typed health, and reclaim guidance uses the same activity evidence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
