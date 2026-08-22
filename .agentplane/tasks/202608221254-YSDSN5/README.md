---
id: "202608221254-YSDSN5"
title: "Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem."
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "compatibility"
  - "e2e"
  - "context"
  - "task-centric"
  - "release-blocker"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T12:58:55.352Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:27d6d37beebedd56d595b635d91d4126c9dcba5466e70eaa2afbb12448a41ba5"
verification:
  state: "needs_rework"
  updated_at: "2026-08-22T13:04:21.724Z"
  updated_by: "SUPERVISOR"
  note: "Rework: No executable declared verification checks are configured for this task."
  attempts: 1
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
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
      - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
      - "packages/agentplane/src/commands/context/ingest.command.ts"
      - "packages/agentplane/src/context/ingest-task.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Known bridge files are included only for a minimal regression repair if the E2E proves one."
      - "One release-blocking compatibility E2E is required before v0.7.8 publication."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
      - "packages/agentplane/src/commands/context/ingest.command.ts"
      - "packages/agentplane/src/context/ingest-task.ts"
      - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
  observed:
    authority_violations:
      - "verification:verification-record:fail"
    changed_components:
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
      - "tests"
    verification_results:
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
          - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
          - "packages/agentplane/src/commands/context/ingest.command.ts"
          - "packages/agentplane/src/context/ingest-task.ts"
          - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
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
      digest: "sha256:345423c32f7396fc7db34af4286ffd67506cdd99fd1fe541746b77ab7a258fb4"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
        - "central_path:packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - "packages/agentplane"
        changed_files:
          - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
        external_effects: []
        repository_effects:
          - "repository_write"
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
      - "verification_recovery:verification-record"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 6291d20e8cf2. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-22T12:59:08.786Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T13:04:21.401Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 6291d20e8cf2. CLI accepted one state-bound external-agent semantic result."
    commit: "6291d20e8cf264ecd545ed7833b60a296c614928"
  -
    type: "verify"
    at: "2026-08-22T13:04:21.724Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: No executable declared verification checks are configured for this task."
doc_version: 3
doc_updated_at: "2026-08-22T13:04:23.659Z"
doc_updated_by: "SUPERVISOR"
description: "Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem."
sections:
  Summary: |-
    Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.

    Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.
  Scope: |-
    - In scope: Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.
    - Out of scope: unrelated refactors not required for "Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.".
  Plan: "Add one compatibility E2E that enters maximum assimilation through the public context CLI, preserves the existing context contract surfaces, and observes the resulting Task through the task-centric planning route. Do not redesign context; repair only a regression proven by this E2E."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-22T13:04:21.724Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: No executable declared verification checks are configured for this task.
    Attempts: 1

    VerifyStepsRef: doc_version=3, excerpt_hash=sha256:62b80a44da7229cc3432b97e589db887f54e50abd9e2e6e305781deb3e7c453e, input_digest=sha256:1824508483607700fb9bfdc14722e7c79f9d19852883a072ee88fdac028f0b00

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221254-YSDSN5-add-one-compatibility-e2e-proving-the-existing-c/.agentplane/tasks/202608221254-YSDSN5/blueprint/resolved-snapshot.json
    - old_digest: 5be5fc58b425343e6cc7c0c8bdbccea2ca157599b8ae12649ac48d1e6c64f8f8
    - current_digest: 5be5fc58b425343e6cc7c0c8bdbccea2ca157599b8ae12649ac48d1e6c64f8f8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608221254-YSDSN5

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
    approval_evidence_digest: "sha256:27d6d37beebedd56d595b635d91d4126c9dcba5466e70eaa2afbb12448a41ba5"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:72f32392e94d9d9a73136a0b2f9b9b927910b65729201161beccb4a2fd3a8eff"
    grant_id: "31be05d6-f32e-4c46-9f06-7d002ee58bde"
    issued_at: "2026-08-22T12:58:55.352Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:29090c0f6c78ef6bfc56efa05b7a7ac6965f1791264d850fa5d15be1ef947ecc"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608221254-YSDSN5"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T12:58:55.352Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:75bda8e9317bf4cf58d53b86e432fd7868e8eb6a6d3457b62cf1222b8a5bf069"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-22T12:58:43.733Z"
      digest: "sha256:75bda8e9317bf4cf58d53b86e432fd7868e8eb6a6d3457b62cf1222b8a5bf069"
      proposal:
        assumptions:
          - "The existing public compatibility behavior is defined by context init, context ingest, the context.maximum_assimilation blueprint, task-bound prompt/contracts/artifacts, and the task-centric task advance route."
          - "A production code change is unnecessary unless the new E2E fails against the current main baseline."
        planning_baseline:
          captured_at: "2026-08-22T12:55:05.510Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c406bcaa21327e310ec80072bdc48788e6543aae380f2b49e422571bbb3400fe"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608221254-YSDSN5/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608221254-YSDSN5"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
              id: "check-maximum-assimilation-release-gate"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-maximum-assimilation-release-gate"
              description: "The compatibility E2E passes from a fresh repository and no out-of-scope context subsystem redesign is present."
              id: "criterion-maximum-assimilation-release-gate"
              required: true
          evidence_fingerprint: "sha256:669d2fa5d0629346c63e569cc010d0c7f6b617751fbb349c16f3fc038cf862a7"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-maximum-assimilation-e2e"
                  description: "Exactly one new compatibility E2E runs context init and context ingest on a real temporary repository, proves context.maximum_assimilation plus the existing prompt and task-bound artifacts, then proves task advance returns the task-centric PLANNER episode and work order for that same Task."
                  id: "criterion-maximum-assimilation-e2e"
                  required: true
                -
                  check_ids:
                    - "check-maximum-assimilation-e2e"
                  description: "No existing context contract, prompt, or artifact is deleted or weakened; production code remains unchanged unless the E2E demonstrates a concrete regression."
                  id: "criterion-context-contract-preservation"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 98304
                optional_sources:
                  - "packages/agentplane/src/commands/context/release-readiness.test.ts"
                required_sources:
                  - "packages/agentplane/src/context/ingest-task.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                symbol_hints:
                  - "runCli"
                  - "createTaskNewParsed"
                  - "context.maximum_assimilation"
                  - "TaskAggregate"
                  - "TaskExecutionContext"
              depends_on: []
              expected_outputs:
                - "one-maximum-assimilation-task-centric-compatibility-e2e"
              id: "maximum-assimilation-task-centric-compatibility-e2e"
              objective: "Add exactly one compatibility E2E that initializes maximum assimilation, ingests a real source through the public CLI, proves the existing blueprint, prompts, contracts, and artifacts are retained, and observes the created Task entering the new task-centric PLANNER route. If and only if the E2E fails because of a regression, repair only that regression within the approved bridge files."
              optional: false
              priority: 1
              required_inputs:
                - "existing-context-maximum-assimilation-contract"
                - "task-centric-cli-harness"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/context/ingest-task.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/context/ingest.command.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
                - "packages/agentplane/src/context/ingest-task.ts"
                - "packages/agentplane/src/commands/context/ingest.command.ts"
                - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun test packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
                    id: "check-maximum-assimilation-e2e"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-maximum-assimilation-e2e"
                    description: "Exactly one new compatibility E2E runs context init and context ingest on a real temporary repository, proves context.maximum_assimilation plus the existing prompt and task-bound artifacts, then proves task advance returns the task-centric PLANNER episode and work order for that same Task."
                    id: "criterion-maximum-assimilation-e2e"
                    required: true
                  -
                    check_ids:
                      - "check-maximum-assimilation-e2e"
                    description: "No existing context contract, prompt, or artifact is deleted or weakened; production code remains unchanged unless the E2E demonstrates a concrete regression."
                    id: "criterion-context-contract-preservation"
                    required: true
                evidence_fingerprint: "sha256:2e99508b0cc1b1a965e65ff4d1fdb7e830e94d22d9dc03ecee25bb7ee88998cc"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608221254-YSDSN5"
    event_cursor: 0
    final_validation: null
    id: "202608221254-YSDSN5"
    intent:
      acceptance_criteria: []
      captured_at: "2026-08-22T12:54:59.738Z"
      constraints: []
      request: |-
        Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.

        Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.
      task_id: "202608221254-YSDSN5"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-22T12:58:55.352Z"
    work_items:
      maximum-assimilation-task-centric-compatibility-e2e:
        attempt: 0
        claim_id: null
        id: "maximum-assimilation-task-centric-compatibility-e2e"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
  workflow_route_baseline:
    start_head_sha: "ee460292f9d253a5ba6fe2ca95a6d0fd5e7a7088"
    version: 1
id_source: "generated"
---
## Summary

Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.

Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.

## Scope

- In scope: Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.
- Out of scope: unrelated refactors not required for "Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.".

## Plan

Add one compatibility E2E that enters maximum assimilation through the public context CLI, preserves the existing context contract surfaces, and observes the resulting Task through the task-centric planning route. Do not redesign context; repair only a regression proven by this E2E.

## Verify Steps

PLANNER fallback scaffold for "Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add one compatibility E2E proving the existing context.maximum_assimilation flow operates through the new task-centric core before v0.7.8 publication. Preserve existing context contracts, prompts, and artifacts. If the E2E exposes a regression, fix only that regression and do not redesign the context subsystem.". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-22T13:04:21.724Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: No executable declared verification checks are configured for this task.
Attempts: 1

VerifyStepsRef: doc_version=3, excerpt_hash=sha256:62b80a44da7229cc3432b97e589db887f54e50abd9e2e6e305781deb3e7c453e, input_digest=sha256:1824508483607700fb9bfdc14722e7c79f9d19852883a072ee88fdac028f0b00

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608221254-YSDSN5-add-one-compatibility-e2e-proving-the-existing-c/.agentplane/tasks/202608221254-YSDSN5/blueprint/resolved-snapshot.json
- old_digest: 5be5fc58b425343e6cc7c0c8bdbccea2ca157599b8ae12649ac48d1e6c64f8f8
- current_digest: 5be5fc58b425343e6cc7c0c8bdbccea2ca157599b8ae12649ac48d1e6c64f8f8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608221254-YSDSN5

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
