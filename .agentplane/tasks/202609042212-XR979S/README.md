---
id: "202609042212-XR979S"
title: "Repair pre-merge DONE task rework blocker persistence and resume ZVX69C"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "clean-core"
  - "lifecycle-recovery"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-09-04T22:19:39.721Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:df8773e0d6fd96943f41b0f2c6441031eb3a2a0e51d819d07ece1f19dd4972eb"
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
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Hosted publication and integration remain separate authority-controlled framework transitions."
      - "Reproduce the hosted rework lifecycle locally using the existing CLI fixtures; preserve canonical transition ownership and rejection of integrated terminal tasks."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/adapters/task-backend"
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
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
          - "packages/agentplane/src/adapters/task-backend"
          - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks"
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
      digest: "sha256:966a175c6be9337adad52c111605115575577e8dd596be727a466306ba2cdd0a"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
        - "central_component:packages/core/src/tasks"
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
    at: "2026-09-04T22:19:44.547Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-04T22:19:44.547Z"
doc_updated_by: "CODER"
description: "Blocking dependency of 202609041801-ZVX69C / PR 5897. A fresh hosted implementation_rework_required packet accepts a typed blocked result with scope_extension_request but recordExternalBlockedResult fails Refusing status transition DONE -> BLOCKED because pre-merge closure left legacy status DONE. Reproduce the whole accepted-result and resume sequence in existing CLI tests. Fix at the lifecycle contract owner so hosted rework can persist its blocker and reach the normal scope revision route, preserving exact result identity, replay, atomic projections, stale rejection, and protection for truly integrated terminal tasks. Do not manually edit task projections or receipts. Use one bounded WorkItem. Return to ZVX69C afterward; do not repair its packaged fixtures here. Exclude release/version/publication, dependencies, MPXQBK and provider expansion."
sections:
  Summary: |-
    Repair pre-merge DONE task rework blocker persistence and resume ZVX69C

    Blocking dependency of 202609041801-ZVX69C / PR 5897. A fresh hosted implementation_rework_required packet accepts a typed blocked result with scope_extension_request but recordExternalBlockedResult fails Refusing status transition DONE -> BLOCKED because pre-merge closure left legacy status DONE. Reproduce the whole accepted-result and resume sequence in existing CLI tests. Fix at the lifecycle contract owner so hosted rework can persist its blocker and reach the normal scope revision route, preserving exact result identity, replay, atomic projections, stale rejection, and protection for truly integrated terminal tasks. Do not manually edit task projections or receipts. Use one bounded WorkItem. Return to ZVX69C afterward; do not repair its packaged fixtures here. Exclude release/version/publication, dependencies, MPXQBK and provider expansion.
  Scope: |-
    - In scope: Blocking dependency of 202609041801-ZVX69C / PR 5897. A fresh hosted implementation_rework_required packet accepts a typed blocked result with scope_extension_request but recordExternalBlockedResult fails Refusing status transition DONE -> BLOCKED because pre-merge closure left legacy status DONE. Reproduce the whole accepted-result and resume sequence in existing CLI tests. Fix at the lifecycle contract owner so hosted rework can persist its blocker and reach the normal scope revision route, preserving exact result identity, replay, atomic projections, stale rejection, and protection for truly integrated terminal tasks. Do not manually edit task projections or receipts. Use one bounded WorkItem. Return to ZVX69C afterward; do not repair its packaged fixtures here. Exclude release/version/publication, dependencies, MPXQBK and provider expansion.
    - Out of scope: unrelated refactors not required for "Repair pre-merge DONE task rework blocker persistence and resume ZVX69C".
  Plan: |-
    Repair only the pre-merge DONE hosted-rework blocker persistence contract, then return to 202609041801-ZVX69C. Reproduce before editing; implement at the existing lifecycle owner; test replay, interruption, stale input, and integrated-task rejection. AgentPlane owns integration and cleanup.

    Verify Steps:
    1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1`. Expected: the scoped recovery checks pass; doctor reports zero errors.
    2. Run `bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts --maxWorkers=1`. Expected: the scoped recovery checks pass; doctor reports zero errors.
    3. Run `bun run format:check`. Expected: the scoped recovery checks pass; doctor reports zero errors.
    4. Run `bun run lint:core`. Expected: the scoped recovery checks pass; doctor reports zero errors.
    5. Run `bun run typecheck`. Expected: the scoped recovery checks pass; doctor reports zero errors.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: the scoped recovery checks pass; doctor reports zero errors.
    7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: the scoped recovery checks pass; doctor reports zero errors.
    8. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: the scoped recovery checks pass; doctor reports zero errors.
    9. Run `git diff --check`. Expected: the scoped recovery checks pass; doctor reports zero errors.
    10. Run `bun run ci:local:full`. Expected: the scoped recovery checks pass; doctor reports zero errors.
  Verify Steps: |-
    1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
    2. Run `bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts --maxWorkers=1`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
    3. Run `bun run format:check`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
    4. Run `bun run lint:core`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
    5. Run `bun run typecheck`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
    7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
    8. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
    9. Run `git diff --check`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
    10. Run `bun run ci:local:full`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
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
    approval_evidence_digest: "sha256:df8773e0d6fd96943f41b0f2c6441031eb3a2a0e51d819d07ece1f19dd4972eb"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:fbcbda33d5ccf71f02da46b8606ab239efda70030220ed6dde5151fb07053180"
    grant_id: "7936ab36-21f1-4bab-927a-27bf07cbabfb"
    issued_at: "2026-09-04T22:19:39.721Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:089e3fcf1f6516da71092abb1f8a2d9d04dfd55e1b80cfd0382621ad323cef3e"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609042212-XR979S"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-04T22:19:39.721Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:13b1722328d4768cc6e998ef4a5694e939b300cd18a024f9886f9f9e68d158a3"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-04T22:13:42.262Z"
      digest: "sha256:13b1722328d4768cc6e998ef4a5694e939b300cd18a024f9886f9f9e68d158a3"
      proposal:
        assumptions:
          - "ZVX69C remains suspended at its accepted blocker result until this recovery is integrated."
          - "No release, version, publication, dependency, MPXQBK, provider expansion, or packaged fixture work belongs in this task."
        planning_baseline:
          captured_at: "2026-09-04T22:12:09.867Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:27967ae220d3a157e69b7b7726153456b31106f0c6d3a393f0c9fd922d89a8ac"
          dirty_paths:
            - ".agentplane/tasks/202609042212-XR979S/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609042212-XR979S"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1"
              id: "check-1"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts --maxWorkers=1"
              id: "check-2"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run format:check"
              id: "check-3"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "check-4"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-5"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "check-6"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "node packages/agentplane/bin/agentplane.js task lint"
              id: "check-7"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "node packages/agentplane/bin/agentplane.js doctor"
              id: "check-8"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "git diff --check"
              id: "check-9"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "check-10"
              kind: "deterministic"
              required: true
              timeout_ms: 1800000
          criteria:
            -
              check_ids:
                - "check-1"
                - "check-2"
                - "check-3"
                - "check-4"
                - "check-5"
                - "check-6"
                - "check-7"
                - "check-8"
                - "check-9"
                - "check-10"
              description: "A fresh hosted rework episode on a pre-merge DONE task can persist a scope blocker and resume to the existing scope revision route. Exact accepted-result replay and interrupted persistence are idempotent. Stale results and reopening truly integrated tasks are rejected. Task projections remain atomic. Return to ZVX69C after integration."
              id: "recovery"
              required: true
          evidence_fingerprint: "sha256:27967ae220d3a157e69b7b7726153456b31106f0c6d3a393f0c9fd922d89a8ac"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-1"
                    - "check-2"
                    - "check-3"
                    - "check-4"
                    - "check-5"
                    - "check-6"
                    - "check-7"
                    - "check-8"
                    - "check-9"
                    - "check-10"
                  description: "A fresh hosted rework episode on a pre-merge DONE task can persist a scope blocker and resume to the existing scope revision route. Exact accepted-result replay and interrupted persistence are idempotent. Stale results and reopening truly integrated tasks are rejected. Task projections remain atomic. Return to ZVX69C after integration."
                  id: "recovery"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 128000
                optional_sources: []
                required_sources:
                  - "task-document"
                  - "repository"
                symbol_hints:
                  - "recordExternalBlockedResult"
                  - "applyTaskStatusTransitionCommand"
              depends_on: []
              expected_outputs:
                - "pre-merge-blocker-recovery"
                - "replay-and-terminal-protection-evidence"
              id: "repair-pre-merge-blocker-replay"
              objective: "A fresh hosted rework episode on a pre-merge DONE task can persist a scope blocker and resume to the existing scope revision route. Exact accepted-result replay and interrupted persistence are idempotent. Stale results and reopening truly integrated tasks are rejected. Task projections remain atomic. Return to ZVX69C after integration."
              optional: false
              priority: 0
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/adapters/task-backend"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/task"
                - "packages/agentplane/src/adapters/task-backend"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                - "packages/core/src/tasks"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1"
                    id: "check-1"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts --maxWorkers=1"
                    id: "check-2"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run format:check"
                    id: "check-3"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "check-4"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-5"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "check-6"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "node packages/agentplane/bin/agentplane.js task lint"
                    id: "check-7"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "node packages/agentplane/bin/agentplane.js doctor"
                    id: "check-8"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "git diff --check"
                    id: "check-9"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "check-10"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 1800000
                criteria:
                  -
                    check_ids:
                      - "check-1"
                      - "check-2"
                      - "check-3"
                      - "check-4"
                      - "check-5"
                      - "check-6"
                      - "check-7"
                      - "check-8"
                      - "check-9"
                      - "check-10"
                    description: "A fresh hosted rework episode on a pre-merge DONE task can persist a scope blocker and resume to the existing scope revision route. Exact accepted-result replay and interrupted persistence are idempotent. Stale results and reopening truly integrated tasks are rejected. Task projections remain atomic. Return to ZVX69C after integration."
                    id: "recovery"
                    required: true
                evidence_fingerprint: "sha256:27967ae220d3a157e69b7b7726153456b31106f0c6d3a393f0c9fd922d89a8ac"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609042212-XR979S"
    event_cursor: 2
    final_validation: null
    id: "202609042212-XR979S"
    intent:
      acceptance_criteria: []
      captured_at: "2026-09-04T22:12:02.693Z"
      constraints: []
      request: |-
        Repair pre-merge DONE task rework blocker persistence and resume ZVX69C

        Blocking dependency of 202609041801-ZVX69C / PR 5897. A fresh hosted implementation_rework_required packet accepts a typed blocked result with scope_extension_request but recordExternalBlockedResult fails Refusing status transition DONE -> BLOCKED because pre-merge closure left legacy status DONE. Reproduce the whole accepted-result and resume sequence in existing CLI tests. Fix at the lifecycle contract owner so hosted rework can persist its blocker and reach the normal scope revision route, preserving exact result identity, replay, atomic projections, stale rejection, and protection for truly integrated terminal tasks. Do not manually edit task projections or receipts. Use one bounded WorkItem. Return to ZVX69C afterward; do not repair its packaged fixtures here. Exclude release/version/publication, dependencies, MPXQBK and provider expansion.
      task_id: "202609042212-XR979S"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 5
    schema_version: 1
    updated_at: "2026-09-04T22:19:44.547Z"
    work_items:
      repair-pre-merge-blocker-replay:
        attempt: 0
        claim_id: null
        id: "repair-pre-merge-blocker-replay"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  agentplane.task_centric_runtime:
    checkpoints: []
    events: []
    leases: []
    mutation_receipts:
      compatibility:sha256:4f5b7dbcc19dea78335b5e23bde00ca8da59cfecb99cde8d6f254bd845b765e2:
        aggregate_digest: "sha256:87849c4fa44eb4e4e6443d38c5c35b6d3f52681708c1c615a1711c925c03f435"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T22:19:44.547Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_fce6ecedd589ef3613ac7482"
          mutation_id: "compatibility:sha256:4f5b7dbcc19dea78335b5e23bde00ca8da59cfecb99cde8d6f254bd845b765e2"
          plan_digest: "sha256:13b1722328d4768cc6e998ef4a5694e939b300cd18a024f9886f9f9e68d158a3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042212-XR979S"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4f5b7dbcc19dea78335b5e23bde00ca8da59cfecb99cde8d6f254bd845b765e2"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609042212-XR979S"
      compatibility:sha256:ec1ee6ef54e9fc2156b09f57c8d3de89ad7d5c8af5d6d0996527156f1e02b113:
        aggregate_digest: "sha256:30c716f1409e6257e2100db8c42584fa070b7ce29d0a2fae1f77ba05cf5a47ef"
        event:
          actor_id: "agentplane"
          at: "2026-09-04T22:14:05.104Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_f00c1d1c9c7a6aee2f9772e0"
          mutation_id: "compatibility:sha256:ec1ee6ef54e9fc2156b09f57c8d3de89ad7d5c8af5d6d0996527156f1e02b113"
          plan_digest: "sha256:13b1722328d4768cc6e998ef4a5694e939b300cd18a024f9886f9f9e68d158a3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609042212-XR979S"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:ec1ee6ef54e9fc2156b09f57c8d3de89ad7d5c8af5d6d0996527156f1e02b113"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609042212-XR979S"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "8e8440da19e95e3264835bcdc8ccf665d18fe26c"
    version: 1
id_source: "generated"
---
## Summary

Repair pre-merge DONE task rework blocker persistence and resume ZVX69C

Blocking dependency of 202609041801-ZVX69C / PR 5897. A fresh hosted implementation_rework_required packet accepts a typed blocked result with scope_extension_request but recordExternalBlockedResult fails Refusing status transition DONE -> BLOCKED because pre-merge closure left legacy status DONE. Reproduce the whole accepted-result and resume sequence in existing CLI tests. Fix at the lifecycle contract owner so hosted rework can persist its blocker and reach the normal scope revision route, preserving exact result identity, replay, atomic projections, stale rejection, and protection for truly integrated terminal tasks. Do not manually edit task projections or receipts. Use one bounded WorkItem. Return to ZVX69C afterward; do not repair its packaged fixtures here. Exclude release/version/publication, dependencies, MPXQBK and provider expansion.

## Scope

- In scope: Blocking dependency of 202609041801-ZVX69C / PR 5897. A fresh hosted implementation_rework_required packet accepts a typed blocked result with scope_extension_request but recordExternalBlockedResult fails Refusing status transition DONE -> BLOCKED because pre-merge closure left legacy status DONE. Reproduce the whole accepted-result and resume sequence in existing CLI tests. Fix at the lifecycle contract owner so hosted rework can persist its blocker and reach the normal scope revision route, preserving exact result identity, replay, atomic projections, stale rejection, and protection for truly integrated terminal tasks. Do not manually edit task projections or receipts. Use one bounded WorkItem. Return to ZVX69C afterward; do not repair its packaged fixtures here. Exclude release/version/publication, dependencies, MPXQBK and provider expansion.
- Out of scope: unrelated refactors not required for "Repair pre-merge DONE task rework blocker persistence and resume ZVX69C".

## Plan

Repair only the pre-merge DONE hosted-rework blocker persistence contract, then return to 202609041801-ZVX69C. Reproduce before editing; implement at the existing lifecycle owner; test replay, interruption, stale input, and integrated-task rejection. AgentPlane owns integration and cleanup.

Verify Steps:
1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1`. Expected: the scoped recovery checks pass; doctor reports zero errors.
2. Run `bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts --maxWorkers=1`. Expected: the scoped recovery checks pass; doctor reports zero errors.
3. Run `bun run format:check`. Expected: the scoped recovery checks pass; doctor reports zero errors.
4. Run `bun run lint:core`. Expected: the scoped recovery checks pass; doctor reports zero errors.
5. Run `bun run typecheck`. Expected: the scoped recovery checks pass; doctor reports zero errors.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: the scoped recovery checks pass; doctor reports zero errors.
7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: the scoped recovery checks pass; doctor reports zero errors.
8. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: the scoped recovery checks pass; doctor reports zero errors.
9. Run `git diff --check`. Expected: the scoped recovery checks pass; doctor reports zero errors.
10. Run `bun run ci:local:full`. Expected: the scoped recovery checks pass; doctor reports zero errors.

## Verify Steps

1. Run `bun x vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts --maxWorkers=1`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
2. Run `bun x vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-centric/task-centric.test.ts packages/core/src/tasks/task-kernel/kernel.test.ts packages/core/src/tasks/task-kernel/invariants.test.ts --maxWorkers=1`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
3. Run `bun run format:check`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
4. Run `bun run lint:core`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
5. Run `bun run typecheck`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
7. Run `node packages/agentplane/bin/agentplane.js task lint`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
8. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
9. Run `git diff --check`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.
10. Run `bun run ci:local:full`. Expected: the scoped recovery and repository checks pass; doctor reports zero errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
