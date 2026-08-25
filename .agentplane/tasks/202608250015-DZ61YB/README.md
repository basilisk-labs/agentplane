---
id: "202608250015-DZ61YB"
title: "Make aggregate local CI deterministic and preserve failing-group evidence"
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
      digest: "sha256:f66ed8aff04c3c647d0917105b7247fa98147520880947362b000e016beeccde"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/verification-contract.test.ts"
        - "central_component:scripts/checks/run-local-ci.mjs"
        - "central_component:scripts/lib/verification-scheduler.d.ts"
        - "central_component:scripts/lib/verification-scheduler.mjs"
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
    at: "2026-08-25T00:39:55.300Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-25T00:39:55.300Z"
doc_updated_by: "CODER"
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
    revision: 2
    schema_version: 1
    updated_at: "2026-08-25T00:39:17.418Z"
    work_items:
      stabilize-and-explain-full-local-ci:
        attempt: 0
        claim_id: null
        id: "stabilize-and-explain-full-local-ci"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
