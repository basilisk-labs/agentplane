---
id: "202609111337-ZJ6AFT"
title: "Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 15
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
  updated_at: "2026-09-11T14:54:03.213Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:de99c299d9d681843e9917b76bc8e76244fab2c9ef028d21875754e94f6ce176"
verification:
  state: "needs_rework"
  updated_at: "2026-09-11T14:48:16.515Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Declared check failed: bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1"
  attempts: 1
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
    authority_violations:
      - "verification:recorded-check-1:fail"
      - "verification:verification-record:fail"
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
    verification_results:
      -
        id: "recorded-check-1"
        result: "fail"
      -
        id: "verification-record"
        result: "fail"
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
      - "verification_recovery:recorded-check-1"
      - "verification_recovery:verification-record"
commit:
  hash: "0f58c0913c0991f6a4a23d0bcd8b791d285efa27"
  message: "🚧 ZJ6AFT task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 4f367ae362e1. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 0f58c0913c09. CLI accepted one state-bound external-agent semantic result."
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
  -
    type: "verify"
    at: "2026-09-11T14:48:16.515Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Declared check failed: bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1"
  -
    type: "status"
    at: "2026-09-11T14:55:19.875Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 0f58c0913c09. CLI accepted one state-bound external-agent semantic result."
    commit: "0f58c0913c0991f6a4a23d0bcd8b791d285efa27"
doc_version: 3
doc_updated_at: "2026-09-11T14:55:19.875Z"
doc_updated_by: "SUPERVISOR"
description: "GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887"
sections:
  Summary: |-
    Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887

    GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887
  Scope: |-
    - In scope: GitHub issue #5887 remains present on current main: task run status exposes heartbeat_at and pid_alive but no trace/stderr activity timestamp, sequence, seconds_since_activity, or health classification. Add a single activity model derived from runner-owned trace and stderr evidence; report last_trace_at, last_trace_seq, seconds_since_activity, and a typed health value; ensure reclaim/cancel guidance does not treat a stale process heartbeat as inactivity while trace or stderr is advancing. Add focused status and safety regressions for active, idle, exited, and unavailable signals. Issue: https://github.com/basilisk-labs/agentplane/issues/5887.
    - Out of scope: unrelated refactors not required for "Report trace-backed runner activity and safe liveness in task run status for GitHub issue #5887".
  Plan: "Keep the runner activity implementation and bind verification to its changed status surface."
  Verify Steps: |-
    1. Run `bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts --maxWorkers=1`. Expected: active, idle, exited, unknown, recent trace, recent stderr, JSON status, and human status output regressions pass.
    2. Run `bun run typecheck`. Expected: the runner activity model and status output type-check.
    3. Review the final diff against GitHub issue #5887. Expected: status exposes last_trace_at, last_trace_seq, seconds_since_activity, and typed health, and recent activity prevents reclaim guidance for an unverified child.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-11T14:48:16.515Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Declared check failed: bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9de6147a41da3cf89602eba88b164eef726b1d34a4464403aebf03be335f210, input_digest=sha256:2f3fa69f67a86a7db93ad3d3ee450755b80dc6f352ab55eece275d4e6134f54a

    Details:

    Command: bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1
    Result: fail
    Evidence: .agentplane/tasks/202609111337-ZJ6AFT/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202609111337-ZJ6AFT declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609111337-ZJ6AFT-report-trace-backed-runner-activity-and-safe-liv/.agentplane/tasks/202609111337-ZJ6AFT/blueprint/resolved-snapshot.json
    - old_digest: 22874c04244bbe39abe6fd2da68f332130f0f71b6394de93e2ca1bcdae63dd2e
    - current_digest: 22874c04244bbe39abe6fd2da68f332130f0f71b6394de93e2ca1bcdae63dd2e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609111337-ZJ6AFT

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202609111337-ZJ6AFT
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
    approval_evidence_digest: "sha256:de99c299d9d681843e9917b76bc8e76244fab2c9ef028d21875754e94f6ce176"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:5e92819bd74eddaea1263831a1e1730c6e414d44222c2f1b8ff0ca4e42bf7cef"
    digest: "sha256:f904697322073b29825f5b5e476dd02936966b4d7b18e984ff79b5b551613d76"
    grant_id: "d2f1573c-df71-4736-9168-f13246d9ce46"
    issued_at: "2026-09-11T14:54:03.213Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:0088b8a75234e07d95e051ef911b82087c9ad66d0066343ad96d47f496fa8db8"
    plan_revision: 12
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609111337-ZJ6AFT"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-11T14:54:03.213Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:a7bee6ff5f4c3b9d72867ddace9c8af899e18aa879ee24589ab05a5c08636bee"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-11T14:53:12.457Z"
      digest: "sha256:a7bee6ff5f4c3b9d72867ddace9c8af899e18aa879ee24589ab05a5c08636bee"
      proposal:
        assumptions:
          - "The committed implementation remains the source baseline for this replacement plan."
        planning_baseline:
          captured_at: "2026-09-11T14:51:57.324Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:49d42d8f1ebc2224d58f9833f58571e37a6a0e067ef5db0d5188a8061ee8a67c"
          dirty_paths:
            - ".agentplane/tasks/202609111337-ZJ6AFT/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "384ac7659f34815ab51745eb9f2b9435ff3ae9ac"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:10"
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts --maxWorkers=1"
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
                - "typecheck"
              description: "JSON and human task run status report last_trace_at, last_trace_seq, seconds_since_activity, and typed health using runner-owned signals and configured idle_ms."
              id: "trace-backed-status"
              required: true
            -
              check_ids:
                - "runner-activity-regressions"
              description: "Focused regressions cover active, idle, exited, unknown, recent trace, and recent stderr signals."
              id: "health-cases"
              required: true
            -
              check_ids:
                - "runner-activity-regressions"
              description: "Recent trace or stderr activity prevents reclaim guidance for an unverified child, while confirmed process exit remains reclaimable."
              id: "safe-guidance"
              required: true
          evidence_fingerprint: "sha256:49d42d8f1ebc2224d58f9833f58571e37a6a0e067ef5db0d5188a8061ee8a67c"
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
                    - "typecheck"
                  description: "JSON and human task run status report last_trace_at, last_trace_seq, seconds_since_activity, and typed health using runner-owned signals and configured idle_ms."
                  id: "trace-backed-status"
                  required: true
                -
                  check_ids:
                    - "runner-activity-regressions"
                  description: "Focused regressions cover active, idle, exited, unknown, recent trace, and recent stderr signals."
                  id: "health-cases"
                  required: true
                -
                  check_ids:
                    - "runner-activity-regressions"
                  description: "Recent trace or stderr activity prevents reclaim guidance for an unverified child, while confirmed process exit remains reclaimable."
                  id: "safe-guidance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "packages/agentplane/src/runner/trace-artifacts.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/run-render.ts"
                  - "packages/agentplane/src/commands/task/run-render.test.ts"
                  - "packages/agentplane/src/runner/usecases/task-run-inspect.ts"
                symbol_hints:
                  - "inspectTaskRunnerActivity"
                  - "renderRunnerStatusPayload"
                  - "reportRunnerStatus"
              depends_on: []
              expected_outputs:
                - "verified-runner-activity-status-and-safety"
              id: "runner-activity-status-and-safety"
              objective: "Preserve the committed runner-owned activity model and safe guidance behavior. Add human status-output coverage for the new fields. Run the declared checks."
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
                  resource: "packages/agentplane/src/runner/usecases/task-run-inspect.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/run-render.ts"
                - "packages/agentplane/src/commands/task/run-render.test.ts"
                - "packages/agentplane/src/runner/usecases/task-run-inspect.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts --maxWorkers=1"
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
                      - "typecheck"
                    description: "JSON and human task run status report last_trace_at, last_trace_seq, seconds_since_activity, and typed health using runner-owned signals and configured idle_ms."
                    id: "trace-backed-status"
                    required: true
                  -
                    check_ids:
                      - "runner-activity-regressions"
                    description: "Focused regressions cover active, idle, exited, unknown, recent trace, and recent stderr signals."
                    id: "health-cases"
                    required: true
                  -
                    check_ids:
                      - "runner-activity-regressions"
                    description: "Recent trace or stderr activity prevents reclaim guidance for an unverified child, while confirmed process exit remains reclaimable."
                    id: "safe-guidance"
                    required: true
                evidence_fingerprint: "sha256:49d42d8f1ebc2224d58f9833f58571e37a6a0e067ef5db0d5188a8061ee8a67c"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202609111337-ZJ6AFT"
    event_cursor: 10
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
    plan_history:
      -
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
    revision: 15
    schema_version: 1
    updated_at: "2026-09-11T14:55:19.875Z"
    work_items:
      runner-activity-status-and-safety:
        attempt: 0
        claim_id: null
        id: "runner-activity-status-and-safety"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
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
      -
        at: "2026-09-11T14:51:33.656Z"
        from: "ACTIVE"
        to: "PLANNING"
        actor_id: "external:EXECUTOR"
        cause_refs:
          - "acceptance_changed"
        entity: "task"
        id: "event_1d7ebdaf6b36db108a26a40c"
        mutation_id: "plan-refinement:work-order-202609111337-ZJ6AFT-executor-8aa5bf0278c8f57c3049bca5"
        plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
        plan_revision: 1
        repository_fingerprint: null
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
        task_revision: 9
        work_item_id: null
    leases: []
    mutation_receipts:
      compatibility:sha256:06b73ca9addcdc5da6b917838f36c0fe7c122d58b9e083373da7679f33d9207d:
        aggregate_digest: "sha256:da31361d8667750cd99ad44858b5d50aa88122419c5ac3270bca6a1975df3a6d"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:55:19.875Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_be4510b1e0c1c53871d58953"
          mutation_id: "compatibility:sha256:06b73ca9addcdc5da6b917838f36c0fe7c122d58b9e083373da7679f33d9207d"
          plan_digest: "sha256:a7bee6ff5f4c3b9d72867ddace9c8af899e18aa879ee24589ab05a5c08636bee"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 14
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:06b73ca9addcdc5da6b917838f36c0fe7c122d58b9e083373da7679f33d9207d"
        next_revision: 15
        previous_revision: 14
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
      compatibility:sha256:1110095af15c27b2d8ad09e27b8d4205fbedb812adfd19e58f7548ea057f6d4e:
        aggregate_digest: "sha256:fe16caa5f4e9e8b822aaa51b71e88e7cdbe083b75902f4b84cd4ab6052fc64f0"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:53:30.120Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_5f42fa4c31cc4e4b1698ca13"
          mutation_id: "compatibility:sha256:1110095af15c27b2d8ad09e27b8d4205fbedb812adfd19e58f7548ea057f6d4e"
          plan_digest: "sha256:a7bee6ff5f4c3b9d72867ddace9c8af899e18aa879ee24589ab05a5c08636bee"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 12
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:1110095af15c27b2d8ad09e27b8d4205fbedb812adfd19e58f7548ea057f6d4e"
        next_revision: 13
        previous_revision: 12
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
      compatibility:sha256:1e7c5ca311e1733edcad1b91bea2a6a89d141acc05707906883fa06ee33133fd:
        aggregate_digest: "sha256:3c4d804d0b494dd6cfd1920e4157a0000ae78d2ba2d25a9de56e569aa2174955"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:55:19.875Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_80652e21355a031f366cf05b"
          mutation_id: "compatibility:sha256:1e7c5ca311e1733edcad1b91bea2a6a89d141acc05707906883fa06ee33133fd"
          plan_digest: "sha256:a7bee6ff5f4c3b9d72867ddace9c8af899e18aa879ee24589ab05a5c08636bee"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 13
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:1e7c5ca311e1733edcad1b91bea2a6a89d141acc05707906883fa06ee33133fd"
        next_revision: 14
        previous_revision: 13
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
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
      compatibility:sha256:93ad5d91b8222a37a4fd4a3ee71410c20f7dd9867e77fd45b1c75d817920eac3:
        aggregate_digest: "sha256:ec9ba3ee69423d4cec7c8c3697c65369c9625f7f88b2009144ab52704b19253d"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:48:43.501Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_4593fb26daf3b049bdffd75e"
          mutation_id: "compatibility:sha256:93ad5d91b8222a37a4fd4a3ee71410c20f7dd9867e77fd45b1c75d817920eac3"
          plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 8
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:93ad5d91b8222a37a4fd4a3ee71410c20f7dd9867e77fd45b1c75d817920eac3"
        next_revision: 9
        previous_revision: 8
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
      compatibility:sha256:e64bee2f6f0cb0b8e70f68e37096193260d73a60049259e0f44d9acd1c680353:
        aggregate_digest: "sha256:b0527df3726eb37285cbf142e00e97686a4c07908fea07d76a38a15ecf900767"
        event:
          actor_id: "agentplane"
          at: "2026-09-11T14:53:30.114Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_70589d032aff7e70cf184077"
          mutation_id: "compatibility:sha256:e64bee2f6f0cb0b8e70f68e37096193260d73a60049259e0f44d9acd1c680353"
          plan_digest: "sha256:a7bee6ff5f4c3b9d72867ddace9c8af899e18aa879ee24589ab05a5c08636bee"
          plan_revision: 2
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 11
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:e64bee2f6f0cb0b8e70f68e37096193260d73a60049259e0f44d9acd1c680353"
        next_revision: 12
        previous_revision: 11
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
      plan-refinement:work-order-202609111337-ZJ6AFT-executor-8aa5bf0278c8f57c3049bca5:
        aggregate_digest: "sha256:93fb112e1c678f665e36c59144ef7f4de2c25cef5478dc7912365c2d1cd66bc2"
        event:
          actor_id: "external:EXECUTOR"
          at: "2026-09-11T14:51:33.656Z"
          cause_refs:
            - "acceptance_changed"
          entity: "task"
          from: "ACTIVE"
          id: "event_1d7ebdaf6b36db108a26a40c"
          mutation_id: "plan-refinement:work-order-202609111337-ZJ6AFT-executor-8aa5bf0278c8f57c3049bca5"
          plan_digest: "sha256:255b12d6150265950b5284fa6d4a361a617664b2a9b4418c4c4d03cdafbbce19"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609111337-ZJ6AFT"
          task_revision: 9
          to: "PLANNING"
          work_item_id: null
        mutation_id: "plan-refinement:work-order-202609111337-ZJ6AFT-executor-8aa5bf0278c8f57c3049bca5"
        next_revision: 10
        previous_revision: 9
        schema_version: 1
        task_id: "202609111337-ZJ6AFT"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "0f58c0913c0991f6a4a23d0bcd8b791d285efa27"
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

Keep the runner activity implementation and bind verification to its changed status surface.

## Verify Steps

1. Run `bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts --maxWorkers=1`. Expected: active, idle, exited, unknown, recent trace, recent stderr, JSON status, and human status output regressions pass.
2. Run `bun run typecheck`. Expected: the runner activity model and status output type-check.
3. Review the final diff against GitHub issue #5887. Expected: status exposes last_trace_at, last_trace_seq, seconds_since_activity, and typed health, and recent activity prevents reclaim guidance for an unverified child.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-11T14:48:16.515Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Declared check failed: bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:d9de6147a41da3cf89602eba88b164eef726b1d34a4464403aebf03be335f210, input_digest=sha256:2f3fa69f67a86a7db93ad3d3ee450755b80dc6f352ab55eece275d4e6134f54a

Details:

Command: bunx --no-install vitest run packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle-cancel.test.ts --maxWorkers=1
Result: fail
Evidence: .agentplane/tasks/202609111337-ZJ6AFT/supervision/declared-checks.json#check-1
Scope: branch_pr task 202609111337-ZJ6AFT declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202609111337-ZJ6AFT-report-trace-backed-runner-activity-and-safe-liv/.agentplane/tasks/202609111337-ZJ6AFT/blueprint/resolved-snapshot.json
- old_digest: 22874c04244bbe39abe6fd2da68f332130f0f71b6394de93e2ca1bcdae63dd2e
- current_digest: 22874c04244bbe39abe6fd2da68f332130f0f71b6394de93e2ca1bcdae63dd2e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609111337-ZJ6AFT

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202609111337-ZJ6AFT
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
