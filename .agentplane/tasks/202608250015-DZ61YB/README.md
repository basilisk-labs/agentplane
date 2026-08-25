---
id: "202608250015-DZ61YB"
title: "Make aggregate local CI deterministic and preserve failing-group evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.8-blocker"
  - "self-hosting-recovery"
  - "local-ci"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1"
plan_approval:
  state: "approved"
  updated_at: "2026-08-25T00:39:17.418Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "User approved exact plan digest and state fingerprint.; host_user_decision=sha256:2d33ff3b9e097e3eeb3b52b6822974879bf73455de06fb8232829e1adecddb20"
verification:
  state: "ok"
  updated_at: "2026-08-25T01:03:40.957Z"
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
      - "packages/agentplane/src/cli/verification-contract.test.ts"
      - "scripts/checks/run-local-ci.mjs"
      - "scripts/lib/verification-scheduler.d.ts"
      - "scripts/lib/verification-scheduler.mjs"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Branch PR preserves exact-head hosted qualification for a release-blocking verification change."
      - "The defect is confined to existing local-CI scheduling, rendering, and their focused regression tests."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/verification-contract.test.ts"
      - "scripts/checks/run-local-ci.mjs"
      - "scripts/lib/verification-scheduler.d.ts"
      - "scripts/lib/verification-scheduler.mjs"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
      - "scripts"
    changed_paths:
      - "packages/agentplane/src/cli/verification-contract.test.ts"
      - "scripts/checks/run-local-ci.mjs"
      - "scripts/lib/verification-scheduler.d.ts"
      - "scripts/lib/verification-scheduler.mjs"
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
          - "packages/agentplane/src/cli/verification-contract.test.ts"
          - "scripts/checks/run-local-ci.mjs"
          - "scripts/lib/verification-scheduler.d.ts"
          - "scripts/lib/verification-scheduler.mjs"
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
      digest: "sha256:80a906803c2164219c87739d16a1f5cd4fb3d6160eeeaecfe47a713cb769cd08"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/verification-contract.test.ts"
        - "central_component:scripts/checks/run-local-ci.mjs"
        - "central_component:scripts/lib/verification-scheduler.d.ts"
        - "central_component:scripts/lib/verification-scheduler.mjs"
        - "central_path:packages/agentplane/src/cli/verification-contract.test.ts"
        - "central_path:scripts/checks/run-local-ci.mjs"
        - "central_path:scripts/lib/verification-scheduler.d.ts"
        - "central_path:scripts/lib/verification-scheduler.mjs"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
          - "scripts"
        changed_files:
          - "packages/agentplane/src/cli/verification-contract.test.ts"
          - "scripts/checks/run-local-ci.mjs"
          - "scripts/lib/verification-scheduler.d.ts"
          - "scripts/lib/verification-scheduler.mjs"
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
  hash: "07ead92308c1a1551e0145265422599d38f98eba"
  message: "🚧 DZ61YB task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 07ead92308c1. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-25T00:39:55.300Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-25T00:54:48.419Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 07ead92308c1. CLI accepted one state-bound external-agent semantic result."
    commit: "07ead92308c1a1551e0145265422599d38f98eba"
  -
    type: "verify"
    at: "2026-08-25T01:03:40.957Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-25T01:03:43.049Z"
doc_updated_by: "SUPERVISOR"
description: "Release self-hosting blocker discovered while verifying 202608242233-KTFFN7. Symptom: bun run ci:local:full failed four times on implementation c566a26f34699e0d0f779ad19fa4978f712aed66, while docs-schema, core, runtime, and cli each passed independently; the persisted declared-check evidence retained only an aggregate exit 1 and truncated output without the failing group identity. Violated invariant: the aggregate gate must deterministically reflect its constituent groups and must persist the exact failed or timed-out group, exit status, and useful tail so a task cannot exhaust verification retries on an opaque orchestration failure. Root-cause scope: verification scheduler and full local-CI group orchestration, including concurrency/resource isolation and result rendering. Temporary recovery: run constituent groups independently and do not alter the blocked implementation. Permanent fix: make aggregate scheduling deterministic under the repository workload and preserve structured per-group failure evidence in the aggregate output. Regression: reproduce concurrent group failure/timeout, prove exact group attribution and bounded output, then prove the default aggregate gate passes when every group passes. After integration, resume KTFFN7 at c566a26f without source reimplementation."
sections:
  Summary: |-
    Make aggregate local CI deterministic and preserve failing-group evidence

    Release self-hosting blocker discovered while verifying 202608242233-KTFFN7. Symptom: bun run ci:local:full failed four times on implementation c566a26f34699e0d0f779ad19fa4978f712aed66, while docs-schema, core, runtime, and cli each passed independently; the persisted declared-check evidence retained only an aggregate exit 1 and truncated output without the failing group identity. Violated invariant: the aggregate gate must deterministically reflect its constituent groups and must persist the exact failed or timed-out group, exit status, and useful tail so a task cannot exhaust verification retries on an opaque orchestration failure. Root-cause scope: verification scheduler and full local-CI group orchestration, including concurrency/resource isolation and result rendering. Temporary recovery: run constituent groups independently and do not alter the blocked implementation. Permanent fix: make aggregate scheduling deterministic under the repository workload and preserve structured per-group failure evidence in the aggregate output. Regression: reproduce concurrent group failure/timeout, prove exact group attribution and bounded output, then prove the default aggregate gate passes when every group passes. After integration, resume KTFFN7 at c566a26f without source reimplementation.
  Scope: |-
    - In scope: Release self-hosting blocker discovered while verifying 202608242233-KTFFN7. Symptom: bun run ci:local:full failed four times on implementation c566a26f34699e0d0f779ad19fa4978f712aed66, while docs-schema, core, runtime, and cli each passed independently; the persisted declared-check evidence retained only an aggregate exit 1 and truncated output without the failing group identity. Violated invariant: the aggregate gate must deterministically reflect its constituent groups and must persist the exact failed or timed-out group, exit status, and useful tail so a task cannot exhaust verification retries on an opaque orchestration failure. Root-cause scope: verification scheduler and full local-CI group orchestration, including concurrency/resource isolation and result rendering. Temporary recovery: run constituent groups independently and do not alter the blocked implementation. Permanent fix: make aggregate scheduling deterministic under the repository workload and preserve structured per-group failure evidence in the aggregate output. Regression: reproduce concurrent group failure/timeout, prove exact group attribution and bounded output, then prove the default aggregate gate passes when every group passes. After integration, resume KTFFN7 at c566a26f without source reimplementation.
    - Out of scope: unrelated refactors not required for "Make aggregate local CI deterministic and preserve failing-group evidence".
  Plan: "Make the existing full local-CI scheduler fail transparently and deterministically without adding a new runtime abstraction. Preserve a concise structured result for every group before aggregate failure, handle output backpressure so the final failure identity reaches Supervisor evidence, and isolate resource-heavy full-mode groups when concurrency is the demonstrated source of nondeterminism. Keep targeted verification routes unchanged."
  Verify Steps: |-
    PLANNER fallback scaffold for "Make aggregate local CI deterministic and preserve failing-group evidence". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make aggregate local CI deterministic and preserve failing-group evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-25T01:03:40.957Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6f6994a7b57957b059ce117db70547504c7b06e8b0d8c896b6e9a28dd2b8d1d1, input_digest=sha256:97ee6daf551e6dfc00ccbf3df10fd71caf27224a6b5fd08becfbb9e4f0ef2b43

    Details:

    Check: affected_unit_integration
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608250015-DZ61YB Verification Contract check affected_unit_integration (1/2)

    Check: affected_unit_integration
    Command: bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1
    Result: pass
    Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608250015-DZ61YB Verification Contract check affected_unit_integration (2/2)

    Check: critical_paths
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608250015-DZ61YB Verification Contract check critical_paths (1/2)

    Check: critical_paths
    Command: bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1
    Result: pass
    Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608250015-DZ61YB Verification Contract check critical_paths (2/2)

    Check: full_regression
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608250015-DZ61YB Verification Contract check full_regression

    Check: task_outcome
    Command: bun run ci:local:full
    Result: pass
    Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608250015-DZ61YB Verification Contract check task_outcome (1/2)

    Check: task_outcome
    Command: bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1
    Result: pass
    Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608250015-DZ61YB Verification Contract check task_outcome (2/2)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608250015-DZ61YB-make-aggregate-local-ci-deterministic-and-preser/.agentplane/tasks/202608250015-DZ61YB/blueprint/resolved-snapshot.json
    - old_digest: 7f0e8b99c667b9519e5d37c299cfa10d26aa36d634a166de572332378cd731bc
    - current_digest: 7f0e8b99c667b9519e5d37c299cfa10d26aa36d634a166de572332378cd731bc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608250015-DZ61YB

    DecisionContextRef:
    - operator_action: provider_action
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
    actor: "HOST:codex-desktop:USER"
    approval_evidence_digest: "sha256:2d33ff3b9e097e3eeb3b52b6822974879bf73455de06fb8232829e1adecddb20"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:6c98367e61bae1682e93ec839dd9a9ce35c0eb3b6e7d83abc394c53ee77d9eee"
    grant_id: "fb50cf14-cc28-4b6e-9719-5528c81f7824"
    issued_at: "2026-08-25T00:39:17.418Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:7e325bf6f125a47368c796e2321c62c418066df040ec1dad6c091a2a36cc8ef8"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608250015-DZ61YB"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-25T00:39:17.418Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:6acc1cf2d766e0607c6ca597bd4b88118b227f2aff7cd4f79873fc2c865b4d96"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-25T00:18:30.645Z"
      digest: "sha256:6acc1cf2d766e0607c6ca597bd4b88118b227f2aff7cd4f79873fc2c865b4d96"
      proposal:
        assumptions:
          - "The independently passing docs-schema, core, runtime, and cli runs are valid evidence that the repeated aggregate failure is orchestration or resource sensitive rather than four simultaneous deterministic product failures."
          - "Serializing only resource-heavy full-mode waves is an acceptable reliability tradeoff; targeted routes and their concurrency remain unchanged."
        planning_baseline:
          captured_at: "2026-08-25T00:16:15.501Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:bf3679f8cc4ecfc946b012d78ce6e9dec47705f8910d8d6a1c825cc8e33120c1"
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
            - ".agentplane/tasks/202608250015-DZ61YB/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608250015-DZ61YB"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1"
              id: "check-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-full"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-full"
              description: "Aggregate local CI either passes when every constituent group passes or reports the exact failed or timed-out group with durable structured evidence; KTFFN7 can then be resumed without implementation drift."
              id: "criterion-release-blocker-removed"
              required: true
          evidence_fingerprint: "sha256:8888888888888888888888888888888888888888888888888888888888888888"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused"
                  description: "An aggregate run with concurrent pass, failure, and timeout fixtures emits an ordered concise summary containing each group id, exit code, timeout flag, and duration, and the summary remains the final useful evidence before the aggregate error."
                  id: "criterion-failure-attribution"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                  description: "Large captured group output cannot displace or lose the final structured failure identity when stdout or stderr applies backpressure."
                  id: "criterion-output-durability"
                  required: true
                -
                  check_ids:
                    - "check-full"
                  description: "The repository default bun run ci:local:full passes when docs-schema, core, runtime, and cli pass, using bounded resource isolation without changing targeted verification routes."
                  id: "criterion-deterministic-aggregate"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 262144
                optional_sources:
                  - "scripts/checks/run-local-ci-group.mjs"
                  - "scripts/lib/verification-scheduler.d.ts"
                required_sources:
                  - "scripts/lib/verification-scheduler.mjs"
                  - "scripts/checks/run-local-ci.mjs"
                  - "packages/agentplane/src/cli/verification-contract.test.ts"
                symbol_hints:
                  - "runVerificationGroups"
                  - "runFullFastPath"
                  - "renderVerificationGroupResults"
              depends_on: []
              expected_outputs:
                - "structured-group-failure-evidence"
                - "deterministic-full-ci-scheduling"
                - "aggregate-regression-qualification"
              id: "stabilize-and-explain-full-local-ci"
              objective: "Preserve a concise ordered per-group aggregate summary through stream backpressure, attribute every failed or timed-out group exactly, and remove demonstrated full-mode resource contention so all-green constituent groups produce an all-green aggregate result."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib/verification-scheduler.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/lib/verification-scheduler.d.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "scripts/checks/run-local-ci.mjs"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/verification-contract.test.ts"
              risk: "high"
              scope_roots:
                - "scripts/lib/verification-scheduler.mjs"
                - "scripts/lib/verification-scheduler.d.ts"
                - "scripts/checks/run-local-ci.mjs"
                - "packages/agentplane/src/cli/verification-contract.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-full"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "check-focused"
                    description: "An aggregate run with concurrent pass, failure, and timeout fixtures emits an ordered concise summary containing each group id, exit code, timeout flag, and duration, and the summary remains the final useful evidence before the aggregate error."
                    id: "criterion-failure-attribution"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "Large captured group output cannot displace or lose the final structured failure identity when stdout or stderr applies backpressure."
                    id: "criterion-output-durability"
                    required: true
                  -
                    check_ids:
                      - "check-full"
                    description: "The repository default bun run ci:local:full passes when docs-schema, core, runtime, and cli pass, using bounded resource isolation without changing targeted verification routes."
                    id: "criterion-deterministic-aggregate"
                    required: true
                evidence_fingerprint: "sha256:7777777777777777777777777777777777777777777777777777777777777777"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608250015-DZ61YB"
    event_cursor: 0
    final_validation: null
    id: "202608250015-DZ61YB"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-25T00:15:44.071Z"
      constraints: []
      request: |-
        Make aggregate local CI deterministic and preserve failing-group evidence

        Release self-hosting blocker discovered while verifying 202608242233-KTFFN7. Symptom: bun run ci:local:full failed four times on implementation c566a26f34699e0d0f779ad19fa4978f712aed66, while docs-schema, core, runtime, and cli each passed independently; the persisted declared-check evidence retained only an aggregate exit 1 and truncated output without the failing group identity. Violated invariant: the aggregate gate must deterministically reflect its constituent groups and must persist the exact failed or timed-out group, exit status, and useful tail so a task cannot exhaust verification retries on an opaque orchestration failure. Root-cause scope: verification scheduler and full local-CI group orchestration, including concurrency/resource isolation and result rendering. Temporary recovery: run constituent groups independently and do not alter the blocked implementation. Permanent fix: make aggregate scheduling deterministic under the repository workload and preserve structured per-group failure evidence in the aggregate output. Regression: reproduce concurrent group failure/timeout, prove exact group attribution and bounded output, then prove the default aggregate gate passes when every group passes. After integration, resume KTFFN7 at c566a26f without source reimplementation.
      task_id: "202608250015-DZ61YB"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-08-25T01:03:44.410Z"
    work_items:
      stabilize-and-explain-full-local-ci:
        attempt: 1
        claim_id: null
        id: "stabilize-and-explain-full-local-ci"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:3463104548399c9264bb450895a3c93a4c17111414af496ab3018f9ae8a62639"
            id: "structured-group-failure-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608250015-DZ61YB"
              work_item_id: "stabilize-and-explain-full-local-ci"
            provenance:
              - "sha256:50dc1bcfde74f8e358e31dd523134a7f42c418cf56c159d3835617cf0d7500e0"
              - ".agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:8e7d8bce5329ea08022e4610058f6c10bdccb9b25502b654b3ad5e2721f1cb54"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:3dc76db1e7927218cb3c69eb4410c8c89c9631ce1dac43e7f5b0f08bebe2f6f1"
            id: "deterministic-full-ci-scheduling"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608250015-DZ61YB"
              work_item_id: "stabilize-and-explain-full-local-ci"
            provenance:
              - "sha256:50dc1bcfde74f8e358e31dd523134a7f42c418cf56c159d3835617cf0d7500e0"
              - ".agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:8e7d8bce5329ea08022e4610058f6c10bdccb9b25502b654b3ad5e2721f1cb54"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:b85497ee4a9edf7717cb0de8856534cd6571266a5693b74e5335a30bfaedf79f"
            id: "aggregate-regression-qualification"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608250015-DZ61YB"
              work_item_id: "stabilize-and-explain-full-local-ci"
            provenance:
              - "sha256:50dc1bcfde74f8e358e31dd523134a7f42c418cf56c159d3835617cf0d7500e0"
              - ".agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:8e7d8bce5329ea08022e4610058f6c10bdccb9b25502b654b3ad5e2721f1cb54"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json"
              check_id: "check-focused"
              command_identity: "bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1"
              detail: "Observed by bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1."
              exit_code: 0
              observed_at: "2026-08-25T01:03:44.402Z"
              repository_snapshot_digest: "sha256:8e7d8bce5329ea08022e4610058f6c10bdccb9b25502b654b3ad5e2721f1cb54"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json"
              check_id: "check-full"
              command_identity: "bun run ci:local:full"
              detail: "Observed by bun run ci:local:full."
              exit_code: 0
              observed_at: "2026-08-25T01:03:44.402Z"
              repository_snapshot_digest: "sha256:8e7d8bce5329ea08022e4610058f6c10bdccb9b25502b654b3ad5e2721f1cb54"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608250015-DZ61YB-executor-d4e9b0b482f0cc560ad5d5f0:
        aggregate_digest: "sha256:212c686fcc4464a773addfd3319f234c78e389880e15a235d331ca83a4bf88f4"
        event:
          actor_id: "agentplane"
          at: "2026-08-25T01:03:44.410Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_2a4b1b0d2534e207de6f194d"
          mutation_id: "external-result:work-order-202608250015-DZ61YB-executor-d4e9b0b482f0cc560ad5d5f0"
          plan_digest: "sha256:6acc1cf2d766e0607c6ca597bd4b88118b227f2aff7cd4f79873fc2c865b4d96"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608250015-DZ61YB"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "stabilize-and-explain-full-local-ci"
        mutation_id: "external-result:work-order-202608250015-DZ61YB-executor-d4e9b0b482f0cc560ad5d5f0"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608250015-DZ61YB"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "07ead92308c1a1551e0145265422599d38f98eba"
  task_execution_context:
    base_ref: "main"
    base_sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
    version: 1
id_source: "generated"
---
## Summary

Make aggregate local CI deterministic and preserve failing-group evidence

Release self-hosting blocker discovered while verifying 202608242233-KTFFN7. Symptom: bun run ci:local:full failed four times on implementation c566a26f34699e0d0f779ad19fa4978f712aed66, while docs-schema, core, runtime, and cli each passed independently; the persisted declared-check evidence retained only an aggregate exit 1 and truncated output without the failing group identity. Violated invariant: the aggregate gate must deterministically reflect its constituent groups and must persist the exact failed or timed-out group, exit status, and useful tail so a task cannot exhaust verification retries on an opaque orchestration failure. Root-cause scope: verification scheduler and full local-CI group orchestration, including concurrency/resource isolation and result rendering. Temporary recovery: run constituent groups independently and do not alter the blocked implementation. Permanent fix: make aggregate scheduling deterministic under the repository workload and preserve structured per-group failure evidence in the aggregate output. Regression: reproduce concurrent group failure/timeout, prove exact group attribution and bounded output, then prove the default aggregate gate passes when every group passes. After integration, resume KTFFN7 at c566a26f without source reimplementation.

## Scope

- In scope: Release self-hosting blocker discovered while verifying 202608242233-KTFFN7. Symptom: bun run ci:local:full failed four times on implementation c566a26f34699e0d0f779ad19fa4978f712aed66, while docs-schema, core, runtime, and cli each passed independently; the persisted declared-check evidence retained only an aggregate exit 1 and truncated output without the failing group identity. Violated invariant: the aggregate gate must deterministically reflect its constituent groups and must persist the exact failed or timed-out group, exit status, and useful tail so a task cannot exhaust verification retries on an opaque orchestration failure. Root-cause scope: verification scheduler and full local-CI group orchestration, including concurrency/resource isolation and result rendering. Temporary recovery: run constituent groups independently and do not alter the blocked implementation. Permanent fix: make aggregate scheduling deterministic under the repository workload and preserve structured per-group failure evidence in the aggregate output. Regression: reproduce concurrent group failure/timeout, prove exact group attribution and bounded output, then prove the default aggregate gate passes when every group passes. After integration, resume KTFFN7 at c566a26f without source reimplementation.
- Out of scope: unrelated refactors not required for "Make aggregate local CI deterministic and preserve failing-group evidence".

## Plan

Make the existing full local-CI scheduler fail transparently and deterministically without adding a new runtime abstraction. Preserve a concise structured result for every group before aggregate failure, handle output backpressure so the final failure identity reaches Supervisor evidence, and isolate resource-heavy full-mode groups when concurrency is the demonstrated source of nondeterminism. Keep targeted verification routes unchanged.

## Verify Steps

PLANNER fallback scaffold for "Make aggregate local CI deterministic and preserve failing-group evidence". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make aggregate local CI deterministic and preserve failing-group evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-25T01:03:40.957Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:6f6994a7b57957b059ce117db70547504c7b06e8b0d8c896b6e9a28dd2b8d1d1, input_digest=sha256:97ee6daf551e6dfc00ccbf3df10fd71caf27224a6b5fd08becfbb9e4f0ef2b43

Details:

Check: affected_unit_integration
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608250015-DZ61YB Verification Contract check affected_unit_integration (1/2)

Check: affected_unit_integration
Command: bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1
Result: pass
Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608250015-DZ61YB Verification Contract check affected_unit_integration (2/2)

Check: critical_paths
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608250015-DZ61YB Verification Contract check critical_paths (1/2)

Check: critical_paths
Command: bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1
Result: pass
Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608250015-DZ61YB Verification Contract check critical_paths (2/2)

Check: full_regression
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608250015-DZ61YB Verification Contract check full_regression

Check: task_outcome
Command: bun run ci:local:full
Result: pass
Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608250015-DZ61YB Verification Contract check task_outcome (1/2)

Check: task_outcome
Command: bunx vitest run packages/agentplane/src/cli/verification-contract.test.ts --pool=forks --maxWorkers 1
Result: pass
Evidence: .agentplane/tasks/202608250015-DZ61YB/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608250015-DZ61YB Verification Contract check task_outcome (2/2)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608250015-DZ61YB-make-aggregate-local-ci-deterministic-and-preser/.agentplane/tasks/202608250015-DZ61YB/blueprint/resolved-snapshot.json
- old_digest: 7f0e8b99c667b9519e5d37c299cfa10d26aa36d634a166de572332378cd731bc
- current_digest: 7f0e8b99c667b9519e5d37c299cfa10d26aa36d634a166de572332378cd731bc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608250015-DZ61YB

DecisionContextRef:
- operator_action: provider_action
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
