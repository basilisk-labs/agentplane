---
id: "202608250402-QWP8S8"
title: "Execute safe fail-fast declared-check sequences in the direct verifier"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.8-blocker"
  - "self-hosting-defect"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run --filter=agentplane build"
  - "bun run lint:core"
  - "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-25T09:13:51.579Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-25T09:31:13.445Z"
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
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The runtime defect and its regression coverage are confined to the direct verifier module."
      - "branch_pr preserves hosted qualification before the fix is used to recover the blocked release task."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
  observed:
    authority_violations: []
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
      -
        id: "recorded-check-8"
        result: "pass"
      -
        id: "recorded-check-9"
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
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
      digest: "sha256:cb7a6431cdf76c28b76a00677efa62b683dab54a480bfb6b024873a585111aee"
      escalation_reasons: []
      execution_groups:
        - "core"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
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
  hash: "a057e66401599ed9187032edd839b6e1511eca52"
  message: "🚧 QWP8S8 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: a057e6640159. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-25T09:14:06.054Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-25T09:27:08.435Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: a057e6640159. CLI accepted one state-bound external-agent semantic result."
    commit: "a057e66401599ed9187032edd839b6e1511eca52"
  -
    type: "verify"
    at: "2026-08-25T09:31:13.445Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned checks passed before independent EVALUATOR review."
doc_version: 3
doc_updated_at: "2026-08-25T09:31:20.438Z"
doc_updated_by: "SUPERVISOR"
description: "Blocker for 202608242156-A8Q1W1. Symptom: the approved required check 'bun run docs:readme-header:generate && bun run docs:readme-header:check' is classified unsupported after all other checks pass, so evidence-only recovery loops forever. Violated invariant: every planner-approved deterministic verification command must either be safely executable by the CLI or rejected before approval, not become an unrecoverable runtime criterion. Root cause: parseDirectTaskCheck accepts one argv command and runDirectTaskVerification rejects the whole command at the first && token. Temporary recovery: keep A8Q1W1 and implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 unchanged until this blocker lands. Permanent fix: support only a fail-fast sequence of individually safe declared commands separated by literal &&, parse every segment through the existing structured grammar, execute without a shell, stop after the first failure, preserve the declared check timeout as the sequence budget, and reject empty segments or every other shell operator. Add regression tests for successful sequencing, fail-fast behavior, timeout propagation, and unsafe syntax rejection. After hosted integration, resume A8Q1W1 through a fresh supervisor packet."
sections:
  Summary: |-
    Execute safe fail-fast declared-check sequences in the direct verifier

    Blocker for 202608242156-A8Q1W1. Symptom: the approved required check 'bun run docs:readme-header:generate && bun run docs:readme-header:check' is classified unsupported after all other checks pass, so evidence-only recovery loops forever. Violated invariant: every planner-approved deterministic verification command must either be safely executable by the CLI or rejected before approval, not become an unrecoverable runtime criterion. Root cause: parseDirectTaskCheck accepts one argv command and runDirectTaskVerification rejects the whole command at the first && token. Temporary recovery: keep A8Q1W1 and implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 unchanged until this blocker lands. Permanent fix: support only a fail-fast sequence of individually safe declared commands separated by literal &&, parse every segment through the existing structured grammar, execute without a shell, stop after the first failure, preserve the declared check timeout as the sequence budget, and reject empty segments or every other shell operator. Add regression tests for successful sequencing, fail-fast behavior, timeout propagation, and unsafe syntax rejection. After hosted integration, resume A8Q1W1 through a fresh supervisor packet.
  Scope: |-
    - In scope: Blocker for 202608242156-A8Q1W1. Symptom: the approved required check 'bun run docs:readme-header:generate && bun run docs:readme-header:check' is classified unsupported after all other checks pass, so evidence-only recovery loops forever. Violated invariant: every planner-approved deterministic verification command must either be safely executable by the CLI or rejected before approval, not become an unrecoverable runtime criterion. Root cause: parseDirectTaskCheck accepts one argv command and runDirectTaskVerification rejects the whole command at the first && token. Temporary recovery: keep A8Q1W1 and implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 unchanged until this blocker lands. Permanent fix: support only a fail-fast sequence of individually safe declared commands separated by literal &&, parse every segment through the existing structured grammar, execute without a shell, stop after the first failure, preserve the declared check timeout as the sequence budget, and reject empty segments or every other shell operator. Add regression tests for successful sequencing, fail-fast behavior, timeout propagation, and unsafe syntax rejection. After hosted integration, resume A8Q1W1 through a fresh supervisor packet.
    - Out of scope: unrelated refactors not required for "Execute safe fail-fast declared-check sequences in the direct verifier".
  Plan: "Extend the direct verifier with a narrow structured sequence grammar for literal &&, execute each already-safe argv segment in order without a shell, share the declared timeout across the sequence, and cover success, fail-fast, timeout, and rejection behavior in the focused test."
  Verify Steps: |-
    PLANNER fallback scaffold for "Execute safe fail-fast declared-check sequences in the direct verifier". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Execute safe fail-fast declared-check sequences in the direct verifier". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-25T09:31:13.445Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
    Attempts: 0

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:ddce20bbcc24f04d06e19fff32380c0e2a677cbe70e49afb7cbbb09de47b7b03, input_digest=sha256:ad292deb61667a0ba929555958d2d975c0b4844b83de25bbe627d30f90f7b953

    Details:

    Check: affected_unit_integration
    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check affected_unit_integration (1/3)

    Check: affected_unit_integration
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check affected_unit_integration (2/3)

    Check: affected_unit_integration
    Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check affected_unit_integration (3/3)

    Check: critical_paths
    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check critical_paths (1/3)

    Check: critical_paths
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check critical_paths (2/3)

    Check: critical_paths
    Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check critical_paths (3/3)

    Check: task_outcome
    Command: bun run test:critical
    Result: pass
    Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check task_outcome (1/3)

    Check: task_outcome
    Command: bun run lint:core
    Result: pass
    Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check task_outcome (2/3)

    Check: task_outcome
    Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-3
    Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check task_outcome (3/3)

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608250402-QWP8S8-execute-safe-fail-fast-declared-check-sequences/.agentplane/tasks/202608250402-QWP8S8/blueprint/resolved-snapshot.json
    - old_digest: d95071e9049d08e3cf857c1e7f10034eee2c5ad99680b75f8826fb2052c45015
    - current_digest: d95071e9049d08e3cf857c1e7f10034eee2c5ad99680b75f8826fb2052c45015
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608250402-QWP8S8

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
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:71fa838298c5de768f8521c830bf97db7a87e1b76ab5ebbcbac5ed3d0f87baa5"
    grant_id: "15e3ae35-b23e-43c4-b2d0-d8ae57951220"
    issued_at: "2026-08-25T09:13:51.579Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:e79a4b2b662ab4c569065ed2dcb146f76e1323d929478ba88c26381658b6f138"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608250402-QWP8S8"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-25T09:13:51.579Z"
        approved_by: "USER"
        approved_digest: "sha256:828ac8cd823771bdee918796e3672ee30a15e7ae8175e496b99ba33adc949b47"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-25T04:04:39.382Z"
      digest: "sha256:828ac8cd823771bdee918796e3672ee30a15e7ae8175e496b99ba33adc949b47"
      proposal:
        assumptions:
          - "Literal && is the only sequence separator needed by the blocked approved check."
          - "The existing declared-check parser remains the authority for each individual command segment."
        planning_baseline:
          captured_at: "2026-08-25T04:03:00.602Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:49e0e96f314006544b660ff6f2ff75d9a1dca6880686f560d287ceaed4ef7c1b"
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
            - ".agentplane/tasks/202608250402-QWP8S8/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608250402-QWP8S8"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              id: "check-focused-tests"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run --filter=agentplane build"
              id: "check-build"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "check-lint"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
          criteria:
            -
              check_ids:
                - "check-focused-tests"
                - "check-build"
                - "check-lint"
              description: "Safe declared-check sequences are executable with fail-fast and timeout semantics while unsafe syntax remains rejected."
              id: "criterion-blocker-removed"
              required: true
          evidence_fingerprint: "sha256:6666666666666666666666666666666666666666666666666666666666666666"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused-tests"
                  description: "A declared command containing two or more individually valid checks separated by literal && executes each segment in order without a shell and records the declared command as one verification check."
                  id: "criterion-safe-sequence"
                  required: true
                -
                  check_ids:
                    - "check-focused-tests"
                  description: "Execution stops after the first non-zero segment and every segment receives only the remaining portion of the declared check timeout budget."
                  id: "criterion-fail-fast-timeout"
                  required: true
                -
                  check_ids:
                    - "check-focused-tests"
                  description: "Empty segments and shell syntax other than the standalone literal && separator remain unsupported and no segment executes when validation fails."
                  id: "criterion-reject-unsafe"
                  required: true
                -
                  check_ids:
                    - "check-build"
                    - "check-lint"
                  description: "AgentPlane builds and core lint passes after the focused change."
                  id: "criterion-build-lint"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                  - "packages/agentplane/src/commands/shared/declared-check.ts"
                symbol_hints:
                  - "runDirectTaskVerification"
                  - "parseDirectTaskCheck"
                  - "runProcess"
              depends_on: []
              expected_outputs:
                - "safe-sequence-execution"
                - "fail-fast-and-timeout-evidence"
                - "unsafe-sequence-rejection-evidence"
              id: "support-safe-declared-check-sequences"
              objective: "Execute literal && sequences as ordered structured process calls while preserving direct-verifier safety, fail-fast behavior, and the declared timeout budget."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                    id: "check-focused-tests"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run --filter=agentplane build"
                    id: "check-build"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "check-lint"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "check-focused-tests"
                    description: "Safe literal && sequences execute in order without a shell."
                    id: "criterion-safe-sequence"
                    required: true
                  -
                    check_ids:
                      - "check-focused-tests"
                    description: "Sequences fail fast and share the declared timeout budget."
                    id: "criterion-fail-fast-timeout"
                    required: true
                  -
                    check_ids:
                      - "check-focused-tests"
                    description: "Malformed or unsafe shell syntax remains rejected before execution."
                    id: "criterion-reject-unsafe"
                    required: true
                  -
                    check_ids:
                      - "check-build"
                      - "check-lint"
                    description: "Build and lint remain green."
                    id: "criterion-build-lint"
                    required: true
                evidence_fingerprint: "sha256:5555555555555555555555555555555555555555555555555555555555555555"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608250402-QWP8S8"
    event_cursor: 0
    final_validation: null
    id: "202608250402-QWP8S8"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run --filter=agentplane build"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-25T04:02:54.390Z"
      constraints: []
      request: |-
        Execute safe fail-fast declared-check sequences in the direct verifier

        Blocker for 202608242156-A8Q1W1. Symptom: the approved required check 'bun run docs:readme-header:generate && bun run docs:readme-header:check' is classified unsupported after all other checks pass, so evidence-only recovery loops forever. Violated invariant: every planner-approved deterministic verification command must either be safely executable by the CLI or rejected before approval, not become an unrecoverable runtime criterion. Root cause: parseDirectTaskCheck accepts one argv command and runDirectTaskVerification rejects the whole command at the first && token. Temporary recovery: keep A8Q1W1 and implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 unchanged until this blocker lands. Permanent fix: support only a fail-fast sequence of individually safe declared commands separated by literal &&, parse every segment through the existing structured grammar, execute without a shell, stop after the first failure, preserve the declared check timeout as the sequence budget, and reject empty segments or every other shell operator. Add regression tests for successful sequencing, fail-fast behavior, timeout propagation, and unsafe syntax rejection. After hosted integration, resume A8Q1W1 through a fresh supervisor packet.
      task_id: "202608250402-QWP8S8"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 8
    schema_version: 1
    updated_at: "2026-08-25T09:31:23.361Z"
    work_items:
      support-safe-declared-check-sequences:
        attempt: 1
        claim_id: null
        id: "support-safe-declared-check-sequences"
        last_failure: null
        output_manifests:
          -
            digest: "sha256:298a0b8dd4ae521cf1ef135cfc62c4978c53e3a50cab26e7fb6088428955e2b2"
            id: "safe-sequence-execution"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608250402-QWP8S8"
              work_item_id: "support-safe-declared-check-sequences"
            provenance:
              - "sha256:76e1a9e463fc1bc4bb9e2cce7766d8a98dc906774c81ab40f543c2ccce2b603c"
              - ".agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:05504fca48be50cc709a4f111873ef8a486d215bc91dc15c23759eff4ca6ed9c"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:714ed160038e2d94a0af22f7dedb1bc4576168aa669b77cbefadbb2dcfeba728"
            id: "fail-fast-and-timeout-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608250402-QWP8S8"
              work_item_id: "support-safe-declared-check-sequences"
            provenance:
              - "sha256:76e1a9e463fc1bc4bb9e2cce7766d8a98dc906774c81ab40f543c2ccce2b603c"
              - ".agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:05504fca48be50cc709a4f111873ef8a486d215bc91dc15c23759eff4ca6ed9c"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
          -
            digest: "sha256:9e109fa9f6c92d2a3cc86e5219a2c5a4309206a9c6ea3b603c212e3ccdace584"
            id: "unsafe-sequence-rejection-evidence"
            kind: "semantic_output"
            producer:
              attempt: 1
              plan_revision: 1
              task_id: "202608250402-QWP8S8"
              work_item_id: "support-safe-declared-check-sequences"
            provenance:
              - "sha256:76e1a9e463fc1bc4bb9e2cce7766d8a98dc906774c81ab40f543c2ccce2b603c"
              - ".agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json"
            repository_snapshot_digest: "sha256:05504fca48be50cc709a4f111873ef8a486d215bc91dc15c23759eff4ca6ed9c"
            schema: "agentplane.semantic-output.v1"
            schema_version: 1
        revision: 2
        state: "COMPLETED"
        validation_result:
          evidence:
            -
              artifact_refs:
                - ".agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json"
              check_id: "check-focused-tests"
              command_identity: "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts"
              detail: "Observed by bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts."
              exit_code: 0
              observed_at: "2026-08-25T09:31:23.358Z"
              repository_snapshot_digest: "sha256:05504fca48be50cc709a4f111873ef8a486d215bc91dc15c23759eff4ca6ed9c"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json"
              check_id: "check-build"
              command_identity: "bun run test:critical"
              detail: "Observed by bun run test:critical."
              exit_code: 0
              observed_at: "2026-08-25T09:31:23.358Z"
              repository_snapshot_digest: "sha256:05504fca48be50cc709a4f111873ef8a486d215bc91dc15c23759eff4ca6ed9c"
              status: "passed"
            -
              artifact_refs:
                - ".agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json"
              check_id: "check-lint"
              command_identity: "bun run lint:core"
              detail: "Observed by bun run lint:core."
              exit_code: 0
              observed_at: "2026-08-25T09:31:23.358Z"
              repository_snapshot_digest: "sha256:05504fca48be50cc709a4f111873ef8a486d215bc91dc15c23759eff4ca6ed9c"
              status: "passed"
          schema_version: 1
          stale_evidence: []
          status: "passed"
          unsatisfied_criteria: []
  agentplane.task_centric_runtime:
    checkpoints: []
    leases: []
    mutation_receipts:
      external-result:work-order-202608250402-QWP8S8-executor-b3f2ce3b3ea2a613afadac34:
        aggregate_digest: "sha256:9ad29e52f8f90ddedaa683e599fabe389079eb32bd0defa318123e930643d1ae"
        event:
          actor_id: "agentplane"
          at: "2026-08-25T09:31:23.361Z"
          cause_refs: []
          entity: "work_item"
          from: "READY"
          id: "event_7a1fd1e2214df0228476f2a6"
          mutation_id: "external-result:work-order-202608250402-QWP8S8-executor-b3f2ce3b3ea2a613afadac34"
          plan_digest: "sha256:828ac8cd823771bdee918796e3672ee30a15e7ae8175e496b99ba33adc949b47"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202608250402-QWP8S8"
          task_revision: 7
          to: "COMPLETED"
          work_item_id: "support-safe-declared-check-sequences"
        mutation_id: "external-result:work-order-202608250402-QWP8S8-executor-b3f2ce3b3ea2a613afadac34"
        next_revision: 8
        previous_revision: 7
        schema_version: 1
        task_id: "202608250402-QWP8S8"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  implementation_commit:
    hash: "a057e66401599ed9187032edd839b6e1511eca52"
  task_execution_context:
    base_ref: "main"
    base_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    version: 1
id_source: "generated"
---
## Summary

Execute safe fail-fast declared-check sequences in the direct verifier

Blocker for 202608242156-A8Q1W1. Symptom: the approved required check 'bun run docs:readme-header:generate && bun run docs:readme-header:check' is classified unsupported after all other checks pass, so evidence-only recovery loops forever. Violated invariant: every planner-approved deterministic verification command must either be safely executable by the CLI or rejected before approval, not become an unrecoverable runtime criterion. Root cause: parseDirectTaskCheck accepts one argv command and runDirectTaskVerification rejects the whole command at the first && token. Temporary recovery: keep A8Q1W1 and implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 unchanged until this blocker lands. Permanent fix: support only a fail-fast sequence of individually safe declared commands separated by literal &&, parse every segment through the existing structured grammar, execute without a shell, stop after the first failure, preserve the declared check timeout as the sequence budget, and reject empty segments or every other shell operator. Add regression tests for successful sequencing, fail-fast behavior, timeout propagation, and unsafe syntax rejection. After hosted integration, resume A8Q1W1 through a fresh supervisor packet.

## Scope

- In scope: Blocker for 202608242156-A8Q1W1. Symptom: the approved required check 'bun run docs:readme-header:generate && bun run docs:readme-header:check' is classified unsupported after all other checks pass, so evidence-only recovery loops forever. Violated invariant: every planner-approved deterministic verification command must either be safely executable by the CLI or rejected before approval, not become an unrecoverable runtime criterion. Root cause: parseDirectTaskCheck accepts one argv command and runDirectTaskVerification rejects the whole command at the first && token. Temporary recovery: keep A8Q1W1 and implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 unchanged until this blocker lands. Permanent fix: support only a fail-fast sequence of individually safe declared commands separated by literal &&, parse every segment through the existing structured grammar, execute without a shell, stop after the first failure, preserve the declared check timeout as the sequence budget, and reject empty segments or every other shell operator. Add regression tests for successful sequencing, fail-fast behavior, timeout propagation, and unsafe syntax rejection. After hosted integration, resume A8Q1W1 through a fresh supervisor packet.
- Out of scope: unrelated refactors not required for "Execute safe fail-fast declared-check sequences in the direct verifier".

## Plan

Extend the direct verifier with a narrow structured sequence grammar for literal &&, execute each already-safe argv segment in order without a shell, share the declared timeout across the sequence, and cover success, fail-fast, timeout, and rejection behavior in the focused test.

## Verify Steps

PLANNER fallback scaffold for "Execute safe fail-fast declared-check sequences in the direct verifier". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Execute safe fail-fast declared-check sequences in the direct verifier". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-25T09:31:13.445Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
Attempts: 0

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:ddce20bbcc24f04d06e19fff32380c0e2a677cbe70e49afb7cbbb09de47b7b03, input_digest=sha256:ad292deb61667a0ba929555958d2d975c0b4844b83de25bbe627d30f90f7b953

Details:

Check: affected_unit_integration
Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check affected_unit_integration (1/3)

Check: affected_unit_integration
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check affected_unit_integration (2/3)

Check: affected_unit_integration
Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts
Result: pass
Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check affected_unit_integration (3/3)

Check: critical_paths
Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check critical_paths (1/3)

Check: critical_paths
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check critical_paths (2/3)

Check: critical_paths
Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts
Result: pass
Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check critical_paths (3/3)

Check: task_outcome
Command: bun run test:critical
Result: pass
Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check task_outcome (1/3)

Check: task_outcome
Command: bun run lint:core
Result: pass
Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check task_outcome (2/3)

Check: task_outcome
Command: bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts
Result: pass
Evidence: .agentplane/tasks/202608250402-QWP8S8/supervision/declared-checks.json#check-3
Scope: branch_pr task 202608250402-QWP8S8 Verification Contract check task_outcome (3/3)

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608250402-QWP8S8-execute-safe-fail-fast-declared-check-sequences/.agentplane/tasks/202608250402-QWP8S8/blueprint/resolved-snapshot.json
- old_digest: d95071e9049d08e3cf857c1e7f10034eee2c5ad99680b75f8826fb2052c45015
- current_digest: d95071e9049d08e3cf857c1e7f10034eee2c5ad99680b75f8826fb2052c45015
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608250402-QWP8S8

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
