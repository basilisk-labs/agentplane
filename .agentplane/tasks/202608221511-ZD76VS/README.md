---
id: "202608221511-ZD76VS"
title: "Finalize the v0.7.8 maximum-assimilation compatibility gate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  updated_at: "2026-08-22T15:15:49.944Z"
  updated_by: "HOST:codex-desktop:USER"
  note: "host_user_decision=sha256:3eaf15dfec56c566f0394230b5d8c655e3c2f4cef855968cc20a7aaa42cb1c40"
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
      - "source_code"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots:
      - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The approved gate adds one isolated E2E file."
      - "The declared repository effect must be tests so the task-centric result receipt can be accepted."
    repository_effects:
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
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
          - "packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "repository_write"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:c583f42e301c151c33406c3b7ef37df2d6df3fa8240bf85ebb79a9f4401fbfb5"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
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
    at: "2026-08-22T15:16:03.860Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-22T15:16:03.860Z"
doc_updated_by: "CODER"
description: "Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement Knowledge Assimilation. This replaces unpublished Task 202608221453-EKC1X8 after its legacy execution contract omitted repository_effect:tests and failed to record the WorkItem completion receipt."
sections:
  Summary: |-
    Finalize the v0.7.8 maximum-assimilation compatibility gate

    Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement Knowledge Assimilation. This replaces unpublished Task 202608221453-EKC1X8 after its legacy execution contract omitted repository_effect:tests and failed to record the WorkItem completion receipt.
  Scope: |-
    - In scope: Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement Knowledge Assimilation. This replaces unpublished Task 202608221453-EKC1X8 after its legacy execution contract omitted repository_effect:tests and failed to record the WorkItem completion receipt.
    - Out of scope: unrelated refactors not required for "Finalize the v0.7.8 maximum-assimilation compatibility gate".
  Plan: "Add one maximum-assimilation compatibility E2E with a test-only execution contract and no production changes unless the E2E proves a regression."
  Verify Steps: |-
    PLANNER fallback scaffold for "Finalize the v0.7.8 maximum-assimilation compatibility gate". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Finalize the v0.7.8 maximum-assimilation compatibility gate". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    approval_evidence_digest: "sha256:3eaf15dfec56c566f0394230b5d8c655e3c2f4cef855968cc20a7aaa42cb1c40"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:4b76aff3166ab28a7e6f189e5bd667185e4129d4dfb2ac2609242897865a0677"
    digest: "sha256:674ae634f313e1418dfdea6f1e1436c84a70b9413dfac2d98c85b454fada215c"
    grant_id: "99a125dc-0ea2-4c13-bb84-56fb759b712f"
    issued_at: "2026-08-22T15:15:49.944Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:050fddf0d2c843356fa95f64ede0435c652fdd806e1a2b917d255ff075cb93a8"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:82370fdad3200a8a485bbc809710c71b53b1f734b6864500a8747f163ce4956b"
    status: "active"
    task_id: "202608221511-ZD76VS"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T15:15:49.944Z"
        approved_by: "HOST:codex-desktop:USER"
        approved_digest: "sha256:1d6f1bb8558d75271f137264a83a1ff69330180ea77585cd2a5f0be818a92f9a"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-08-22T15:14:53.561Z"
      digest: "sha256:1d6f1bb8558d75271f137264a83a1ff69330180ea77585cd2a5f0be818a92f9a"
      proposal:
        assumptions:
          - "The existing public maximum-assimilation behavior is expected to pass unchanged."
          - "A production repair requires a failing gate and explicit plan refinement."
        planning_baseline:
          captured_at: "2026-08-22T15:11:34.636Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:22b08d391682b4dae3783866e19572945aecd832472665b1b287d9e915f2e5c7"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608221511-ZD76VS/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "1d68d8f8aa4d3edc9c350a65cdc056fd38a0990a"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608221511-ZD76VS"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun test packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
              id: "check-v078-release-gate"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-v078-release-gate"
              description: "The single compatibility E2E passes and no legacy context contract or artifact is removed."
              id: "criterion-v078-release-gate"
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
                    - "check-compatibility-gate"
                  description: "The one E2E proves maximum-assimilation contracts and artifacts survive through task-centric plan approval."
                  id: "criterion-compatibility-gate"
                  required: true
                -
                  check_ids:
                    - "check-compatibility-gate"
                  description: "No production context or Core path changes unless a concrete E2E regression is first proven."
                  id: "criterion-no-production-change"
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
              objective: "Add exactly one compatibility E2E that initializes maximum assimilation, ingests one real source, proves existing contracts and task artifacts, and observes task-centric plan approval for the same ingestion Task."
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
                    id: "check-compatibility-gate"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-compatibility-gate"
                    description: "The one E2E proves maximum-assimilation contracts and artifacts survive through task-centric plan approval."
                    id: "criterion-compatibility-gate"
                    required: true
                  -
                    check_ids:
                      - "check-compatibility-gate"
                    description: "No production context or Core path changes unless a concrete E2E regression is first proven."
                    id: "criterion-no-production-change"
                    required: true
                evidence_fingerprint: "sha256:2e99508b0cc1b1a965e65ff4d1fdb7e830e94d22d9dc03ecee25bb7ee88998cc"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608221511-ZD76VS"
    event_cursor: 0
    final_validation: null
    id: "202608221511-ZD76VS"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun test packages/agentplane/src/cli/run-cli.critical.context-maximum-assimilation.test.ts"
          id: "legacy-1"
          required: true
      captured_at: "2026-08-22T15:11:28.549Z"
      constraints: []
      request: |-
        Finalize the v0.7.8 maximum-assimilation compatibility gate

        Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement Knowledge Assimilation. This replaces unpublished Task 202608221453-EKC1X8 after its legacy execution contract omitted repository_effect:tests and failed to record the WorkItem completion receipt.
      task_id: "202608221511-ZD76VS"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-22T15:15:49.944Z"
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

Finalize the v0.7.8 maximum-assimilation compatibility gate

Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement Knowledge Assimilation. This replaces unpublished Task 202608221453-EKC1X8 after its legacy execution contract omitted repository_effect:tests and failed to record the WorkItem completion receipt.

## Scope

- In scope: Add exactly one compatibility E2E proving the existing context.maximum_assimilation workflow enters and preserves its contract through the new task-centric Core. Reuse existing context contracts, prompts, extraction schemas, artifacts, provenance, and approval gate. Fix only a regression proven by this E2E. Do not implement Knowledge Assimilation. This replaces unpublished Task 202608221453-EKC1X8 after its legacy execution contract omitted repository_effect:tests and failed to record the WorkItem completion receipt.
- Out of scope: unrelated refactors not required for "Finalize the v0.7.8 maximum-assimilation compatibility gate".

## Plan

Add one maximum-assimilation compatibility E2E with a test-only execution contract and no production changes unless the E2E proves a regression.

## Verify Steps

PLANNER fallback scaffold for "Finalize the v0.7.8 maximum-assimilation compatibility gate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Finalize the v0.7.8 maximum-assimilation compatibility gate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
