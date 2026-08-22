---
id: "202608221453-EKC1X8"
title: "Add the v0.7.8 maximum-assimilation compatibility gate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "compatibility"
  - "context"
  - "release-gate"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun test packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T14:56:22.812Z"
  updated_by: "USER"
  note: "Approved under the explicit autonomous v0.7.8 maximum-assimilation compatibility gate; production repair requires a proven regression."
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
      - "packages/agentplane"
    changed_paths:
      - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
    external_effects: []
    repository_effects:
      - "repository_write"
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
      digest: "sha256:3689d5f0559b6855e5ea221dc9764d1720b5ef0f42cfed7c81bd80b7838fa6fd"
      escalation_reasons:
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
commit:
  hash: "5afb4310e5e8b25c287e8f78fb1d35054c16d968"
  message: "🚧 EKC1X8 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 5afb4310e5e8. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-22T14:56:34.173Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T14:58:07.991Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 5afb4310e5e8. CLI accepted one state-bound external-agent semantic result."
    commit: "5afb4310e5e8b25c287e8f78fb1d35054c16d968"
doc_version: 3
doc_updated_at: "2026-08-22T14:58:07.991Z"
doc_updated_by: "SUPERVISOR"
description: "Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse the existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement the follow-up Knowledge Assimilation subsystem. This replaces unpublished Task 202608221254-YSDSN5 whose WorkItemGraph incorrectly treated repository source paths as upstream required_inputs."
sections:
  Summary: |-
    Add the v0.7.8 maximum-assimilation compatibility gate

    Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse the existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement the follow-up Knowledge Assimilation subsystem. This replaces unpublished Task 202608221254-YSDSN5 whose WorkItemGraph incorrectly treated repository source paths as upstream required_inputs.
  Scope: |-
    - In scope: Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse the existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement the follow-up Knowledge Assimilation subsystem. This replaces unpublished Task 202608221254-YSDSN5 whose WorkItemGraph incorrectly treated repository source paths as upstream required_inputs.
    - Out of scope: unrelated refactors not required for "Add the v0.7.8 maximum-assimilation compatibility gate".
  Plan: "Add exactly one compatibility E2E proving the existing maximum-assimilation context workflow preserves its contracts and enters the task-centric planning route. Do not change production code unless this E2E proves a regression."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add the v0.7.8 maximum-assimilation compatibility gate". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add the v0.7.8 maximum-assimilation compatibility gate". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    digest: "sha256:aa282db9cd3945003efea6e70b8027a3872773ef943657abb335257a164b6c62"
    grant_id: "2e3eb327-9ad5-4f24-ae70-6f99229ffd54"
    issued_at: "2026-08-22T14:56:22.812Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c98b52fa938fe6dc6070af3f812dac8b6baa254986da179e2e0676b3cb960008"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:f2597e379e84d7b1cabc5d1fe65f4cdc98cc2387e3b61c1b60d7ce1c79cf0131"
    status: "active"
    task_id: "202608221453-EKC1X8"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T14:56:22.812Z"
        approved_by: "USER"
        approved_digest: "sha256:eeb4743517b0ab83cdd8fadef2709a1db3dee863a72c09a17addbff5a88e4a71"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-22T14:56:07.167Z"
      digest: "sha256:eeb4743517b0ab83cdd8fadef2709a1db3dee863a72c09a17addbff5a88e4a71"
      proposal:
        assumptions:
          - "The existing maximum-assimilation public CLI contract is expected to remain compatible after task-centric Core integration."
          - "A failing E2E is required before any production repair scope is added."
        planning_baseline:
          captured_at: "2026-08-22T14:53:55.821Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:a7951627223544a18d5c7de0546c6c53c0a5cba0aaad18c4462e0f5a4686601b"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608221453-EKC1X8/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "1d68d8f8aa4d3edc9c350a65cdc056fd38a0990a"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608221453-EKC1X8"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
              id: "check-v078-context-compatibility-gate"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-v078-context-compatibility-gate"
              description: "The one maximum-assimilation E2E passes without deleting or weakening legacy context contracts, prompts, schemas, artifacts, provenance, or gates."
              id: "criterion-v078-context-compatibility-gate"
              required: true
          evidence_fingerprint: "sha256:8af228c1b55c0b25f0516114af13d132f8d81ec7160c225fd3d0f14d993993e2"
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
                  description: "Exactly one new E2E runs context init and ingest, proves context.maximum_assimilation plus existing prompts and artifacts, then proves task advance returns the task-centric plan approval gate for the same Task."
                  id: "criterion-maximum-assimilation-e2e"
                  required: true
                -
                  check_ids:
                    - "check-maximum-assimilation-e2e"
                  description: "No production context or Core code changes unless the E2E first demonstrates a concrete regression and the plan is explicitly refined to that repair."
                  id: "criterion-no-unproven-production-change"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 98304
                optional_sources:
                  - "packages/agentplane/src/commands/context/release-readiness.test.ts"
                required_sources:
                  - "packages/agentplane/src/context/ingest-task.ts"
                  - "packages/agentplane/src/commands/context/ingest.command.ts"
                  - "packages/agentplane/src/cli/run-cli.critical.task-centric.test.ts"
                symbol_hints:
                  - "runCli"
                  - "context.maximum_assimilation"
                  - "TaskAggregate"
                  - "TaskExecutionContext"
              depends_on: []
              expected_outputs:
                - "one-maximum-assimilation-task-centric-compatibility-e2e"
              id: "maximum-assimilation-task-centric-compatibility-e2e"
              objective: "Add exactly one compatibility E2E that initializes maximum assimilation, ingests a real source through the public CLI, proves the existing blueprint, prompts, contracts, and task-bound artifacts are retained, and observes the created Task entering the task-centric plan approval route."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
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
                    description: "Exactly one new E2E runs context init and ingest, proves context.maximum_assimilation plus existing prompts and artifacts, then proves task advance returns the task-centric plan approval gate for the same Task."
                    id: "criterion-maximum-assimilation-e2e"
                    required: true
                  -
                    check_ids:
                      - "check-maximum-assimilation-e2e"
                    description: "No production context or Core code changes unless the E2E first demonstrates a concrete regression and the plan is explicitly refined to that repair."
                    id: "criterion-no-unproven-production-change"
                    required: true
                evidence_fingerprint: "sha256:2e99508b0cc1b1a965e65ff4d1fdb7e830e94d22d9dc03ecee25bb7ee88998cc"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608221453-EKC1X8"
    event_cursor: 0
    final_validation: null
    id: "202608221453-EKC1X8"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun test packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-22T14:53:50.501Z"
      constraints: []
      request: |-
        Add the v0.7.8 maximum-assimilation compatibility gate

        Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse the existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement the follow-up Knowledge Assimilation subsystem. This replaces unpublished Task 202608221254-YSDSN5 whose WorkItemGraph incorrectly treated repository source paths as upstream required_inputs.
      task_id: "202608221453-EKC1X8"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-22T14:56:22.812Z"
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
  implementation_commit:
    hash: "5afb4310e5e8b25c287e8f78fb1d35054c16d968"
  task_execution_context:
    base_ref: "main"
    base_sha: "1d68d8f8aa4d3edc9c350a65cdc056fd38a0990a"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "1d68d8f8aa4d3edc9c350a65cdc056fd38a0990a"
    version: 1
id_source: "generated"
---
## Summary

Add the v0.7.8 maximum-assimilation compatibility gate

Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse the existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement the follow-up Knowledge Assimilation subsystem. This replaces unpublished Task 202608221254-YSDSN5 whose WorkItemGraph incorrectly treated repository source paths as upstream required_inputs.

## Scope

- In scope: Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse the existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement the follow-up Knowledge Assimilation subsystem. This replaces unpublished Task 202608221254-YSDSN5 whose WorkItemGraph incorrectly treated repository source paths as upstream required_inputs.
- Out of scope: unrelated refactors not required for "Add the v0.7.8 maximum-assimilation compatibility gate".

## Plan

Add exactly one compatibility E2E proving the existing maximum-assimilation context workflow preserves its contracts and enters the task-centric planning route. Do not change production code unless this E2E proves a regression.

## Verify Steps

PLANNER fallback scaffold for "Add the v0.7.8 maximum-assimilation compatibility gate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add the v0.7.8 maximum-assimilation compatibility gate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
