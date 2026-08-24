---
id: "202608242233-KTFFN7"
title: "Allow evidence-only rework after an already committed implementation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release-0.7.8-blocker"
  - "self-hosting-recovery"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-24T22:58:48.317Z"
  updated_by: "USER"
  note: "Explicit user approval: plan_digest=sha256:0054c3f93c6a2766a32c513344d00506983feb15cca6d698f099fb5a0d4eea3d state_fingerprint=sha256:47c2bc7816b499e67e1867c1b7ed0cd356c268fe54375a92808ea6f968a034f1"
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Branch PR preserves exact-head hosted integration evidence for a release-blocking state-machine change."
      - "The defect is confined to Supervisor command selection and no-delta implementation-rework authority."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
      - "packages/agentplane/src/commands/task/direct-task-verification.ts"
      - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
          - "packages/agentplane/src/commands/task/direct-task-verification.ts"
          - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
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
      digest: "sha256:b021f1eea37054abaa17f529ca0c75267b7559912052385c8282a8d09f47b574"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-24T22:59:25.891Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-24T22:59:25.891Z"
doc_updated_by: "CODER"
description: "Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop."
sections:
  Summary: |-
    Allow evidence-only rework after an already committed implementation

    Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.
  Scope: |-
    - In scope: Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.
    - Out of scope: unrelated refactors not required for "Allow evidence-only rework after an already committed implementation".
  Plan: "Add one fail-closed evidence-only implementation-rework path. Supervisor verification must execute the selected canonical WorkItem's deterministic validation commands in addition to legacy task checks, and a no-delta implementation_rework may reuse the exact recorded implementation commit only for the matching REWORK_READY WorkItem. Initial no-op implementation and semantic repair with actual workspace changes retain their existing behavior."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow evidence-only rework after an already committed implementation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow evidence-only rework after an already committed implementation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
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
    digest: "sha256:ddde2f409854d81f3ad75304908e61ea932111c9a6f9f25fb697ade2463114c1"
    grant_id: "ec3b3b05-1320-4880-99d7-a0a02f9085d3"
    issued_at: "2026-08-24T22:58:48.317Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:dfa22536402373fca0255e8494dedc93b2f137cc30698cecf09497ca047a521e"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608242233-KTFFN7"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-24T22:58:48.317Z"
        approved_by: "USER"
        approved_digest: "sha256:0054c3f93c6a2766a32c513344d00506983feb15cca6d698f099fb5a0d4eea3d"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-24T22:35:57.481Z"
      digest: "sha256:0054c3f93c6a2766a32c513344d00506983feb15cca6d698f099fb5a0d4eea3d"
      proposal:
        assumptions:
          - "The selected WorkItem is identified by work_order.task.work_item_id and its canonical runtime remains REWORK_READY at result application."
          - "Supervisor-executed deterministic commands are the trusted evidence source; agent claims alone do not satisfy validation."
        planning_baseline:
          captured_at: "2026-08-24T22:33:08.626Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:6c6cbc2bd1351858c2cdd8e824c331b387e9344901dfd5271515401f655d5413"
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
            - ".agentplane/tasks/202608242233-KTFFN7/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608242233-KTFFN7"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --pool=forks --maxWorkers 1"
              id: "check-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "check-lint"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "check-diff"
              kind: "deterministic"
              required: true
              timeout_ms: 60000
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-lint"
                - "check-diff"
              description: "A committed implementation with one previously unsupported canonical validation command converges through evidence-only rework, while initial no-op and changed repair boundaries remain fail-closed."
              id: "criterion-release-blocker-removed"
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
                    - "check-focused"
                  description: "Supervisor verification executes and records every deterministic task.verify command required by the selected canonical WorkItem, deduplicated with legacy task.verify commands and preserving exact command identity."
                  id: "criterion-canonical-check-execution"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                  description: "For implementation_rework of the matching REWORK_READY WorkItem, no scoped workspace delta reuses only the exact recorded implementation commit and can apply fresh validation evidence once; it does not create a new implementation commit."
                  id: "criterion-evidence-only-rework"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                  description: "Initial completed implementation with no workspace change remains rejected, and implementation_rework with actual scoped changes still creates and records a new implementation commit."
                  id: "criterion-fail-closed-boundaries"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                    - "check-lint"
                    - "check-diff"
                  description: "Focused regressions, core lint, and diff hygiene pass."
                  id: "criterion-quality"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 262144
                optional_sources:
                  - "packages/agentplane/src/commands/task/task-centric-external-result.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                  - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                  - "packages/agentplane/src/commands/task/task-centric-external-result.ts"
                symbol_hints:
                  - "applyExternalImplementationResult"
                  - "assertExternalImplementationReturnState"
                  - "runDirectTaskVerification"
                  - "recordExternalImplementationVerification"
                  - "recordTaskCentricExternalResult"
              depends_on: []
              expected_outputs:
                - "canonical-workitem-validation-execution"
                - "evidence-only-rework-transition"
                - "no-progress-regression-evidence"
              id: "recover-evidence-only-implementation-rework"
              objective: "Execute selected canonical WorkItem validation commands under Supervisor authority and allow a no-workspace-delta implementation_rework to reuse the exact recorded implementation identity only from REWORK_READY, so fresh passing evidence completes the WorkItem without semantic source drift."
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
                  resource: "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/direct-task-verification.ts"
                - "packages/agentplane/src/commands/task/external-agent-implementation-authority.ts"
                - "packages/agentplane/src/commands/task/direct-task-verification.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts --pool=forks --maxWorkers 1"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "check-lint"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "check-diff"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 60000
                criteria:
                  -
                    check_ids:
                      - "check-focused"
                    description: "Supervisor verification executes and records every deterministic task.verify command required by the selected canonical WorkItem, deduplicated with legacy task.verify commands and preserving exact command identity."
                    id: "criterion-canonical-check-execution"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "For implementation_rework of the matching REWORK_READY WorkItem, no scoped workspace delta reuses only the exact recorded implementation commit and can apply fresh validation evidence once; it does not create a new implementation commit."
                    id: "criterion-evidence-only-rework"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                    description: "Initial completed implementation with no workspace change remains rejected, and implementation_rework with actual scoped changes still creates and records a new implementation commit."
                    id: "criterion-fail-closed-boundaries"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                      - "check-lint"
                      - "check-diff"
                    description: "Focused regressions, core lint, and diff hygiene pass."
                    id: "criterion-quality"
                    required: true
                evidence_fingerprint: "sha256:5555555555555555555555555555555555555555555555555555555555555555"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608242233-KTFFN7"
    event_cursor: 0
    final_validation: null
    id: "202608242233-KTFFN7"
    intent:
      acceptance_criteria: []
      captured_at: "2026-08-24T22:33:02.485Z"
      constraints: []
      request: |-
        Allow evidence-only rework after an already committed implementation

        Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.
      task_id: "202608242233-KTFFN7"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-24T22:58:48.317Z"
    work_items:
      recover-evidence-only-implementation-rework:
        attempt: 0
        claim_id: null
        id: "recover-evidence-only-implementation-rework"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "a788399c9ccc27ae290ddbfd6244fcb3196cf643"
    version: 1
id_source: "generated"
---
## Summary

Allow evidence-only rework after an already committed implementation

Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.

## Scope

- In scope: Release self-hosting blocker. Symptom: task 202608242156-A8Q1W1 has implementation commit 655f72d307962addfe932c4f8b6f2c7ff83ade82 and successful Supervisor checks, but one approved plan check is unsupported because the declared-check runner did not execute its exact command. The WorkItem becomes REWORK_READY. A fresh EXECUTOR result cannot complete it because external result application requires a new workspace change, producing E_VALIDATION after the implementation is already committed. Violated invariant: retryable validation rework must permit new trusted evidence against the unchanged implementation identity without requiring semantic source drift. Root cause: the validation/rework route issues another implementation episode while result application rejects evidence-only completion when no workspace delta exists. Temporary recovery: integrate a minimal framework fix and resume A8Q1W1 without altering its SVG commit. Permanent fix: accept and persist exact-command validation evidence for the current implementation identity, or provide an explicit evidence-only rework transition, while keeping ordinary no-change implementation results fail-closed. Regression: reproduce READY -> committed implementation -> unsupported required check -> REWORK_READY -> evidence-only successful retry, prove single application, preserved implementation commit, satisfied WorkItem, and no no-progress loop.
- Out of scope: unrelated refactors not required for "Allow evidence-only rework after an already committed implementation".

## Plan

Add one fail-closed evidence-only implementation-rework path. Supervisor verification must execute the selected canonical WorkItem's deterministic validation commands in addition to legacy task checks, and a no-delta implementation_rework may reuse the exact recorded implementation commit only for the matching REWORK_READY WorkItem. Initial no-op implementation and semantic repair with actual workspace changes retain their existing behavior.

## Verify Steps

PLANNER fallback scaffold for "Allow evidence-only rework after an already committed implementation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow evidence-only rework after an already committed implementation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
