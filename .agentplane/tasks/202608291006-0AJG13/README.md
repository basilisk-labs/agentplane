---
id: "202608291006-0AJG13"
title: "Implement the isolated canonical Task kernel"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202608291005-K5TG4D"
tags:
  - "clean-core-rebuild"
  - "kernel"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run arch:check"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-29T19:19:42.926Z"
  updated_by: "USER"
  note: null
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
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "documentation"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "repository_write"
      - "source_code"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
  observed:
    authority_violations:
      - "repository_effect:tests"
    changed_components:
      - "packages/core"
    changed_paths:
      - "packages/core/src/tasks/task-kernel/index.ts"
      - "packages/core/src/tasks/task-kernel/model.test.ts"
      - "packages/core/src/tasks/task-kernel/model.ts"
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
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
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:6161c6e40dd38b72ce8ed22815ea82854794dd24db1614546b56b71984a1223c"
      escalation_reasons:
        - "central_path:packages/core/src/tasks/task-kernel/index.ts"
        - "central_path:packages/core/src/tasks/task-kernel/model.test.ts"
        - "central_path:packages/core/src/tasks/task-kernel/model.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/core"
        changed_files:
          - "packages/core/src/tasks/task-kernel/index.ts"
          - "packages/core/src/tasks/task-kernel/model.test.ts"
          - "packages/core/src/tasks/task-kernel/model.ts"
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
  hash: "223e1f4f1361223dbcec9012a390f094f6ea20df"
  message: "🚧 0AJG13 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 223e1f4f1361. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-29T19:21:49.360Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-29T19:25:38.783Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 223e1f4f1361. CLI accepted one state-bound external-agent semantic result."
    commit: "223e1f4f1361223dbcec9012a390f094f6ea20df"
doc_version: 3
doc_updated_at: "2026-08-29T19:25:38.783Z"
doc_updated_by: "SUPERVISOR"
description: "Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged."
sections:
  Summary: |-
    Implement the isolated canonical Task kernel

    Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.
  Scope: |-
    - In scope: Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.
    - Out of scope: unrelated refactors not required for "Implement the isolated canonical Task kernel".
  Plan: "Planned M1 as four ordered WorkItems: define the isolated kernel contract, implement its deterministic reducer, enforce authority and safety invariants, then qualify the boundary with vectors, generated cases, architecture checks, fast tests, and typecheck."
  Verify Steps: |-
    PLANNER fallback scaffold for "Implement the isolated canonical Task kernel". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Implement the isolated canonical Task kernel". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    completion_contract_digest: "sha256:fba971ef6a121384c40c5fc93d8592325723d6d58911d7f1df7633db663de72c"
    digest: "sha256:b3953780b73a19028cd5e29ca4976d7c93a79d1475359a61a195c970841b5e86"
    grant_id: "e542793b-c6b0-4200-84d1-9fbed97c06b8"
    issued_at: "2026-08-29T19:19:42.926Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:85f3a39a10811dcc0b9b3090148a88a09702cfa17b91a66522ab0420b184a981"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:f2597e379e84d7b1cabc5d1fe65f4cdc98cc2387e3b61c1b60d7ce1c79cf0131"
    status: "active"
    task_id: "202608291006-0AJG13"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-29T19:19:42.926Z"
        approved_by: "USER"
        approved_digest: "sha256:b449ec476875795c4eb7365da9490c7b3c09df5675e3a7febb9339f53ef61bfe"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-29T19:19:03.688Z"
      digest: "sha256:b449ec476875795c4eb7365da9490c7b3c09df5675e3a7febb9339f53ef61bfe"
      proposal:
        assumptions:
          - "M1 introduces only an internal kernel boundary; adapter integration, persistence migration, dual-run, and production cutover remain M2/M3 work."
          - "Existing public CLI behavior and serialized task compatibility remain unchanged throughout M1."
        planning_baseline:
          captured_at: "2026-08-29T19:15:59.108Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:a50d4b3de103cde489556581869e46f18007244c40b23cb02fc45030641b56c4"
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
            - ".agentplane/tasks/202608251038-42AC0D/README.md"
            - ".agentplane/tasks/202608251053-QAZ236/README.md"
            - ".agentplane/tasks/202608251706-V287W1/README.md"
            - ".agentplane/tasks/202608251735-ZJ7YZE/README.md"
            - ".agentplane/tasks/202608252233-JR4T47/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/README.md"
            - ".agentplane/tasks/202608252234-4CKSWA/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608262032-MAJQ5E/README.md"
            - ".agentplane/tasks/202608270848-0RAFH9/README.md"
            - ".agentplane/tasks/202608270848-37XB2K/README.md"
            - ".agentplane/tasks/202608270848-N28TBB/README.md"
            - ".agentplane/tasks/202608270848-V32542/README.md"
            - ".agentplane/tasks/202608271350-HVGQPQ/README.md"
            - ".agentplane/tasks/202608291005-33PHG4/README.md"
            - ".agentplane/tasks/202608291006-0AJG13/README.md"
            - ".agentplane/tasks/202608291006-255K66/README.md"
            - ".agentplane/tasks/202608291006-2A6BJC/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608291006-0AJG13"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/core/src/tasks/task-kernel/model.test.ts"
              id: "check-kernel-model"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun test packages/core/src/tasks/task-kernel/kernel.test.ts"
              id: "check-kernel-reducer"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun test packages/core/src/tasks/task-kernel/invariants.test.ts"
              id: "check-kernel-invariants"
              kind: "deterministic"
              required: true
              timeout_ms: 600000
            -
              capability: "task.verify"
              command: "bun run arch:check"
              id: "check-architecture"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
            -
              capability: "task.verify"
              command: "bun run test:fast"
              id: "check-fast-suite"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 900000
          criteria:
            -
              check_ids:
                - "check-kernel-model"
                - "check-kernel-reducer"
                - "check-kernel-invariants"
                - "check-architecture"
              description: "The isolated canonical Task kernel implements the M1 contract and all fourteen mandatory invariants without adapter or legacy authority."
              id: "criterion-m1-pure-kernel"
              required: true
            -
              check_ids:
                - "check-architecture"
                - "check-fast-suite"
                - "check-typecheck"
              description: "bun run arch:check, bun run test:fast, and bun run typecheck pass on the exact implementation identity."
              id: "criterion-m1-regression"
              required: true
          evidence_fingerprint: "sha256:1afc95aed168c1cf3daea19f41769872a6b1dd15e5502cf4428b671d6be2b087"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-kernel-model"
                    - "check-architecture"
                  description: "The internal module defines a closed typed command/result/event contract without filesystem, process, Git, provider, backend, CLI, clock, randomness, environment, document, or legacy compatibility dependencies."
                  id: "criterion-closed-contract"
                  required: true
                -
                  check_ids:
                    - "check-kernel-model"
                  description: "Kernel evaluation inputs carry actor, authority, repository fingerprint, occurredAt, and mutationId explicitly; no free-text status authorizes a transition."
                  id: "criterion-explicit-inputs"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 393216
                optional_sources:
                  - "packages/core/src/tasks/plan-execution-grant.ts"
                  - "packages/core/src/tasks/task-centric/schema.ts"
                required_sources:
                  - "docs/reference/clean-task-core-rebuild-spec.mdx"
                  - "packages/core/src/tasks/task-centric/model.ts"
                  - "packages/core/src/tasks/task-centric/lifecycle.ts"
                  - "packages/core/src/tasks/task-centric/graph.ts"
                  - "packages/core/src/tasks/task-centric/policy.ts"
                symbol_hints:
                  - "TaskAggregate"
                  - "TaskCommand"
                  - "KernelInput"
                  - "KernelResult"
                  - "KernelRejectionCode"
                  - "MutationReceipt"
              depends_on: []
              expected_outputs:
                - "canonical-task-kernel-contract"
              id: "define-kernel-domain-contract"
              objective: "Create the internal canonical Task kernel domain model with immutable aggregate, closed command and event unions, stable rejection codes, receipts, actor and authority values, and adapter-supplied time and mutation identity."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/index.ts"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/core/src/tasks/task-kernel/model.test.ts"
                    id: "check-kernel-model"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "check-architecture"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-kernel-model"
                      - "check-architecture"
                    description: "The internal module defines a closed typed command/result/event contract without filesystem, process, Git, provider, backend, CLI, clock, randomness, environment, document, or legacy compatibility dependencies."
                    id: "criterion-closed-contract"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-model"
                    description: "Kernel evaluation inputs carry actor, authority, repository fingerprint, occurredAt, and mutationId explicitly; no free-text status authorizes a transition."
                    id: "criterion-explicit-inputs"
                    required: true
                evidence_fingerprint: "sha256:005557cb530872a6c013727ce20a995e6b1ecf09415d93bb9dd5f5170a9d907c"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-kernel-reducer"
                  description: "Every accepted Task and WorkItem transition belongs to an explicit closed transition table and every expected conflict returns a stable rejection value without mutating the aggregate."
                  id: "criterion-transition-table"
                  required: true
                -
                  check_ids:
                    - "check-kernel-reducer"
                  description: "Plans, WorkItems, results, approvals, reviews, validation, effects, and completion enforce current revision, digest, fingerprint, and implementation identity bindings."
                  id: "criterion-state-binding"
                  required: true
                -
                  check_ids:
                    - "check-kernel-reducer"
                  description: "Repeating a mutationId returns the existing receipt with byte-identical aggregate, events, reason codes, and receipts and creates no second effect."
                  id: "criterion-idempotency"
                  required: true
                -
                  check_ids:
                    - "check-kernel-reducer"
                  description: "Completion requires the approved current plan, all required WorkItems and manifests, current final validation, and no pending or uncertain effects."
                  id: "criterion-completion"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 524288
                optional_sources:
                  - "packages/core/src/tasks/task-centric/orchestrator.ts"
                  - "packages/core/src/tasks/task-centric/digest.ts"
                required_sources:
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/task-centric/lifecycle.ts"
                  - "packages/core/src/tasks/task-centric/graph.ts"
                  - "packages/core/src/tasks/task-centric/policy.ts"
                symbol_hints:
                  - "reduceTaskCommand"
                  - "transitionWorkItem"
                  - "isTaskCompletionEligible"
                  - "mutationId"
                  - "stateFingerprint"
              depends_on:
                - "define-kernel-domain-contract"
              expected_outputs:
                - "deterministic-task-kernel-reducer"
              id: "implement-deterministic-kernel-reducer"
              objective: "Implement the pure deterministic reducer and legal transition policies for Task, plan, WorkItem graph, results, validation, effects, authority, idempotency, and completion."
              optional: false
              priority: 2
              required_inputs:
                - "canonical-task-kernel-contract"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/index.ts"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/core/src/tasks/task-kernel/kernel.test.ts"
                    id: "check-kernel-reducer"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "check-kernel-reducer"
                    description: "Every accepted Task and WorkItem transition belongs to an explicit closed transition table and every expected conflict returns a stable rejection value without mutating the aggregate."
                    id: "criterion-transition-table"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-reducer"
                    description: "Plans, WorkItems, results, approvals, reviews, validation, effects, and completion enforce current revision, digest, fingerprint, and implementation identity bindings."
                    id: "criterion-state-binding"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-reducer"
                    description: "Repeating a mutationId returns the existing receipt with byte-identical aggregate, events, reason codes, and receipts and creates no second effect."
                    id: "criterion-idempotency"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-reducer"
                    description: "Completion requires the approved current plan, all required WorkItems and manifests, current final validation, and no pending or uncertain effects."
                    id: "criterion-completion"
                    required: true
                evidence_fingerprint: "sha256:d3b4a5906f91fc152680edab1a926bd560e15f2a4a720c6c9ac7686597c4b117"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "Child and replacement authority cannot exceed the active parent across repository, scope, effects, capabilities, resources, risk, reversibility, validation, policy, or completion dimensions; derived authority never gains USER provenance."
                  id: "criterion-authority-subset"
                  required: true
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "A result targets exactly one Task and one WorkItem; required outputs and validation are required before WorkItem completion; readiness follows the canonical dependency graph."
                  id: "criterion-workitem-output"
                  required: true
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "Unknown non-idempotent effects block replay until explicit readback or reconciliation resolves them."
                  id: "criterion-effect-safety"
                  required: true
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "Documents, legacy status, verification text, PR metadata, and provider summaries cannot authorize kernel transitions."
                  id: "criterion-projection-impotence"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 524288
                optional_sources:
                  - "packages/core/src/tasks/task-centric/ports.ts"
                  - "packages/core/src/tasks/verification-contract.ts"
                required_sources:
                  - "packages/core/src/tasks/task-kernel"
                  - "packages/core/src/tasks/task-centric/graph.ts"
                  - "packages/core/src/tasks/task-centric/policy.ts"
                  - "packages/core/src/tasks/plan-execution-grant.ts"
                symbol_hints:
                  - "ExecutionAuthority"
                  - "authoritySubset"
                  - "requiredOutputs"
                  - "effectState"
                  - "projection"
              depends_on:
                - "implement-deterministic-kernel-reducer"
              expected_outputs:
                - "kernel-invariant-policy-suite"
              id: "enforce-authority-effects-and-projection-invariants"
              objective: "Implement authority subset and user provenance rules, graph readiness, one-result targeting, validation identity, output integrity, uncertain-effect blocking, and projection impotence as kernel policies."
              optional: false
              priority: 3
              required_inputs:
                - "deterministic-task-kernel-reducer"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/index.ts"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/core/src/tasks/task-kernel/invariants.test.ts"
                    id: "check-kernel-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                criteria:
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "Child and replacement authority cannot exceed the active parent across repository, scope, effects, capabilities, resources, risk, reversibility, validation, policy, or completion dimensions; derived authority never gains USER provenance."
                    id: "criterion-authority-subset"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "A result targets exactly one Task and one WorkItem; required outputs and validation are required before WorkItem completion; readiness follows the canonical dependency graph."
                    id: "criterion-workitem-output"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "Unknown non-idempotent effects block replay until explicit readback or reconciliation resolves them."
                    id: "criterion-effect-safety"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "Documents, legacy status, verification text, PR metadata, and provider summaries cannot authorize kernel transitions."
                    id: "criterion-projection-impotence"
                    required: true
                evidence_fingerprint: "sha256:bb9aa97aa4eb56b67afd1c8542406c57866bd87708126acdce5c3e0a011e4080"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-kernel-model"
                    - "check-kernel-reducer"
                    - "check-kernel-invariants"
                  description: "Table vectors cover every legal transition and representative illegal edges with exact aggregate, event, receipt, rejection-code, event-order, and post-state digest assertions."
                  id: "criterion-vector-coverage"
                  required: true
                -
                  check_ids:
                    - "check-kernel-invariants"
                  description: "Generated cases reject illegal transitions, widened authority, duplicate mutations with changed payloads, stale fingerprints, missing manifests, and uncertain effects; deterministic replay is byte-identical."
                  id: "criterion-property-coverage"
                  required: true
                -
                  check_ids:
                    - "check-architecture"
                  description: "Architecture enforcement proves the kernel imports no filesystem, process, Git, provider, CLI, backend, task-document, clock, randomness, environment, or legacy conversion code."
                  id: "criterion-import-boundary"
                  required: true
                -
                  check_ids:
                    - "check-fast-suite"
                    - "check-typecheck"
                    - "check-architecture"
                  description: "Fast tests, typecheck, architecture checks, and existing task-centric behavior pass without changing the public CLI contract."
                  id: "criterion-regression-suite"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 786432
                optional_sources:
                  - "vitest.config.ts"
                  - "package.json"
                required_sources:
                  - "packages/core/src/tasks/task-kernel"
                  - "depcruise.config.cjs"
                  - "packages/core/src/tasks/task-centric/task-centric.test.ts"
                  - "packages/core/src/tasks/task-centric/orchestrator.test.ts"
                symbol_hints:
                  - "forbidden"
                  - "dependency-cruiser"
                  - "KernelResult"
                  - "KernelRejectionCode"
              depends_on:
                - "enforce-authority-effects-and-projection-invariants"
              expected_outputs:
                - "m1-kernel-qualification-receipt"
              id: "qualify-isolated-kernel"
              objective: "Add table vectors and generated invariant tests, enforce the kernel import boundary, and run the milestone acceptance suite while preserving existing public CLI behavior."
              optional: false
              priority: 4
              required_inputs:
                - "kernel-invariant-policy-suite"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-kernel"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/task-centric"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/index.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "depcruise.config.cjs"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/task-kernel"
                - "packages/core/src/tasks/task-centric"
                - "packages/core/src/tasks/index.ts"
                - "depcruise.config.cjs"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/core/src/tasks/task-kernel/model.test.ts"
                    id: "check-kernel-model"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun test packages/core/src/tasks/task-kernel/kernel.test.ts"
                    id: "check-kernel-reducer"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun test packages/core/src/tasks/task-kernel/invariants.test.ts"
                    id: "check-kernel-invariants"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 600000
                  -
                    capability: "task.verify"
                    command: "bun run arch:check"
                    id: "check-architecture"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                  -
                    capability: "task.verify"
                    command: "bun run test:fast"
                    id: "check-fast-suite"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 900000
                criteria:
                  -
                    check_ids:
                      - "check-kernel-model"
                      - "check-kernel-reducer"
                      - "check-kernel-invariants"
                    description: "Table vectors cover every legal transition and representative illegal edges with exact aggregate, event, receipt, rejection-code, event-order, and post-state digest assertions."
                    id: "criterion-vector-coverage"
                    required: true
                  -
                    check_ids:
                      - "check-kernel-invariants"
                    description: "Generated cases reject illegal transitions, widened authority, duplicate mutations with changed payloads, stale fingerprints, missing manifests, and uncertain effects; deterministic replay is byte-identical."
                    id: "criterion-property-coverage"
                    required: true
                  -
                    check_ids:
                      - "check-architecture"
                    description: "Architecture enforcement proves the kernel imports no filesystem, process, Git, provider, CLI, backend, task-document, clock, randomness, environment, or legacy conversion code."
                    id: "criterion-import-boundary"
                    required: true
                  -
                    check_ids:
                      - "check-fast-suite"
                      - "check-typecheck"
                      - "check-architecture"
                    description: "Fast tests, typecheck, architecture checks, and existing task-centric behavior pass without changing the public CLI contract."
                    id: "criterion-regression-suite"
                    required: true
                evidence_fingerprint: "sha256:8bd8db621a0d6dd852c2375ed4fddb3836e4217681c9123aa9d6b76f3bdea4bf"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608291006-0AJG13"
    event_cursor: 0
    final_validation: null
    id: "202608291006-0AJG13"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run arch:check"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run test:fast"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-29T10:06:02.032Z"
      constraints: []
      request: |-
        Implement the isolated canonical Task kernel

        Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.
      task_id: "202608291006-0AJG13"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-29T19:19:42.926Z"
    work_items:
      define-kernel-domain-contract:
        attempt: 0
        claim_id: null
        id: "define-kernel-domain-contract"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      enforce-authority-effects-and-projection-invariants:
        attempt: 0
        claim_id: null
        id: "enforce-authority-effects-and-projection-invariants"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      implement-deterministic-kernel-reducer:
        attempt: 0
        claim_id: null
        id: "implement-deterministic-kernel-reducer"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      qualify-isolated-kernel:
        attempt: 0
        claim_id: null
        id: "qualify-isolated-kernel"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  implementation_commit:
    hash: "223e1f4f1361223dbcec9012a390f094f6ea20df"
  task_execution_context:
    base_ref: "main"
    base_sha: "3bcce289091f5e6cbcb1dea87c2964c4f559259d"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "dbaf4bc2878eab7b50f8ea6d14179d8d91030159"
    version: 1
id_source: "generated"
---
## Summary

Implement the isolated canonical Task kernel

Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.

## Scope

- In scope: Implement a pure deterministic Task and WorkItem kernel behind a new internal module. The kernel owns canonical state, transitions, authority checks, idempotency, and typed results. It must not call Git, providers, the filesystem, process state, or compatibility projections. Existing public CLI behavior remains unchanged.
- Out of scope: unrelated refactors not required for "Implement the isolated canonical Task kernel".

## Plan

Planned M1 as four ordered WorkItems: define the isolated kernel contract, implement its deterministic reducer, enforce authority and safety invariants, then qualify the boundary with vectors, generated cases, architecture checks, fast tests, and typecheck.

## Verify Steps

PLANNER fallback scaffold for "Implement the isolated canonical Task kernel". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Implement the isolated canonical Task kernel". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
