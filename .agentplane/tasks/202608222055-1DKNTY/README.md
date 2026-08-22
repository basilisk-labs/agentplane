---
id: "202608222055-1DKNTY"
title: "Fix task scope extend state-binding option parsing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "regression"
  - "release"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "quality.regression"
verify:
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T21:05:25.053Z"
  updated_by: "USER"
  note: "Approved under the user's autonomous release authorization; exact plan digest sha256:83f2ec2944acc0a2b74903e1a6aa7f2dc43f2c937ec1e3edc483997efb525013."
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
      - "packages/agentplane/src/commands/task/scope-extend.command.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "An isolated branch PR keeps the release-blocking control-plane correction auditable."
      - "The defect and repair boundary are proven by direct reproduction."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/commands/task/scope-extend.command.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
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
          - "packages/agentplane/src/commands/task/scope-extend.command.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
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
      digest: "sha256:4865d06624944fa94faa0b40b41b1d6e487919575b11d1166585a35ecca8bc1a"
      escalation_reasons: []
      execution_groups:
        - "core"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-22T21:05:40.913Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-22T21:05:40.913Z"
doc_updated_by: "CODER"
description: "Repair the release-blocking control-plane regression where task scope extend receives scalar --state-scope-digest or --state-fingerprint options but optionalStringOption reads only arrays, so the command always rejects the required binding as missing. Change only the parser helper and focused tests. Do not alter scope-extension authority, digest validation, release semantics, context behavior, or Knowledge Assimilation scope."
sections:
  Summary: |-
    Fix task scope extend state-binding option parsing

    Repair the release-blocking control-plane regression where task scope extend receives scalar --state-scope-digest or --state-fingerprint options but optionalStringOption reads only arrays, so the command always rejects the required binding as missing. Change only the parser helper and focused tests. Do not alter scope-extension authority, digest validation, release semantics, context behavior, or Knowledge Assimilation scope.
  Scope: |-
    - In scope: Repair the release-blocking control-plane regression where task scope extend receives scalar --state-scope-digest or --state-fingerprint options but optionalStringOption reads only arrays, so the command always rejects the required binding as missing. Change only the parser helper and focused tests. Do not alter scope-extension authority, digest validation, release semantics, context behavior, or Knowledge Assimilation scope.
    - Out of scope: unrelated refactors not required for "Fix task scope extend state-binding option parsing".
  Plan: "Preserve scalar state-binding options in task scope extend and prove both supported bindings through focused parser tests."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix task scope extend state-binding option parsing". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix task scope extend state-binding option parsing". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    digest: "sha256:eb36d752737e8f6f7e601fb8dd8a0b96bff9aabc63fe1f602992d3b2c112894d"
    grant_id: "7b9c0fe0-fa01-4d9c-9113-4c50834eaefe"
    issued_at: "2026-08-22T21:05:25.053Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:a4fb84c4473c7524e414800c1538f93cbc74b97af218743a38b83a1fb69f3170"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608222055-1DKNTY"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T21:05:25.053Z"
        approved_by: "USER"
        approved_digest: "sha256:83f2ec2944acc0a2b74903e1a6aa7f2dc43f2c937ec1e3edc483997efb525013"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-22T21:04:43.870Z"
      digest: "sha256:83f2ec2944acc0a2b74903e1a6aa7f2dc43f2c937ec1e3edc483997efb525013"
      proposal:
        assumptions:
          - "The command parser continues to represent non-repeatable string options as scalar strings."
        planning_baseline:
          captured_at: "2026-08-22T21:01:18.217Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:3a88c73f4272950c4837f31db0dffa844b7caf3cc66accf0050734ce91e450cb"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608222055-1DKNTY/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608222055-1DKNTY"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              id: "check-focused"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "check-lint"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "check-focused"
                - "check-lint"
                - "check-typecheck"
              description: "The focused regression suite, core lint, and typecheck pass with scalar state bindings accepted."
              id: "criterion-release-blocker-cleared"
              required: true
          evidence_fingerprint: "sha256:503781d6759651f30509c17de5a17cc7d7b2f0e5253180328bd4b5170207ed4e"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-scope-extend-parser"
                  description: "Both supported non-repeatable state-binding options are accepted as scalar strings and preserved in parsed output."
                  id: "criterion-scalar-bindings"
                  required: true
                -
                  check_ids:
                    - "check-scope-extend-parser"
                  description: "Missing bindings and malformed digests remain rejected without changing scope-extension authority semantics."
                  id: "criterion-validation-preserved"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 65536
                optional_sources:
                  - "packages/agentplane/src/cli/spec/parse-utils.ts"
                required_sources:
                  - "packages/agentplane/src/commands/task/scope-extend.command.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                symbol_hints:
                  - "optionalStringOption"
                  - "taskScopeExtendSpec"
              depends_on: []
              expected_outputs:
                - "scope-extend-state-binding-parser-regression-fix"
              id: "fix-scope-extend-state-binding-parser"
              objective: "Make task scope extend accept and preserve scalar --state-scope-digest and --state-fingerprint values while retaining exact digest and missing-binding rejection."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.command.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/commands/task/scope-extend.command.ts"
                - "packages/agentplane/src/commands/task/scope-extend.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                    id: "check-scope-extend-parser"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "check-scope-extend-parser"
                    description: "Both supported non-repeatable state-binding options are accepted as scalar strings and preserved in parsed output."
                    id: "criterion-scalar-bindings"
                    required: true
                  -
                    check_ids:
                      - "check-scope-extend-parser"
                    description: "Missing bindings and malformed digests remain rejected without changing scope-extension authority semantics."
                    id: "criterion-validation-preserved"
                    required: true
                evidence_fingerprint: "sha256:788a57ff69e51d061def247401304fbc26165b37c37414e01e29c13ae7190367"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608222055-1DKNTY"
    event_cursor: 0
    final_validation: null
    id: "202608222055-1DKNTY"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run lint:core"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-2"
          required: true
        -
          check_ids: []
          description: "bunx vitest run packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-22T20:55:11.733Z"
      constraints: []
      request: |-
        Fix task scope extend state-binding option parsing

        Repair the release-blocking control-plane regression where task scope extend receives scalar --state-scope-digest or --state-fingerprint options but optionalStringOption reads only arrays, so the command always rejects the required binding as missing. Change only the parser helper and focused tests. Do not alter scope-extension authority, digest validation, release semantics, context behavior, or Knowledge Assimilation scope.
      task_id: "202608222055-1DKNTY"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-22T21:05:25.053Z"
    work_items:
      fix-scope-extend-state-binding-parser:
        attempt: 0
        claim_id: null
        id: "fix-scope-extend-state-binding-parser"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "d93e42ccaedd59e77fc17c495a01dc7cde049d0f"
    version: 1
id_source: "generated"
---
## Summary

Fix task scope extend state-binding option parsing

Repair the release-blocking control-plane regression where task scope extend receives scalar --state-scope-digest or --state-fingerprint options but optionalStringOption reads only arrays, so the command always rejects the required binding as missing. Change only the parser helper and focused tests. Do not alter scope-extension authority, digest validation, release semantics, context behavior, or Knowledge Assimilation scope.

## Scope

- In scope: Repair the release-blocking control-plane regression where task scope extend receives scalar --state-scope-digest or --state-fingerprint options but optionalStringOption reads only arrays, so the command always rejects the required binding as missing. Change only the parser helper and focused tests. Do not alter scope-extension authority, digest validation, release semantics, context behavior, or Knowledge Assimilation scope.
- Out of scope: unrelated refactors not required for "Fix task scope extend state-binding option parsing".

## Plan

Preserve scalar state-binding options in task scope extend and prove both supported bindings through focused parser tests.

## Verify Steps

PLANNER fallback scaffold for "Fix task scope extend state-binding option parsing". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix task scope extend state-binding option parsing". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
