---
id: "202608271659-AD3030"
title: "Preserve task identity in closeout and worktree fixtures"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202608271251-GHHA0Q"
tags:
  - "tests"
  - "architecture"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run ci:local:full"
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T20:52:04.105Z"
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
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Four test files only; preserve batch identity and authoritative checkout behavior."
    repository_effects:
      - "repository_write"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
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
      digest: "sha256:9cf5353ee8e547ba01ef6448576442ab4a1cf55033dcc3667941a847de96f191"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
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
    at: "2026-08-27T21:02:50.742Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-27T21:02:50.742Z"
doc_updated_by: "CODER"
description: "Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof."
sections:
  Summary: |-
    Preserve task identity in closeout and worktree fixtures

    Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.
  Scope: |-
    - In scope: Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.
    - Out of scope: unrelated refactors not required for "Preserve task identity in closeout and worktree fixtures".
  Plan: "Repair only the four closeout/worktree fixture suites. Preserve parsed task extensions and one immutable real Git base for shared tasks. Seed the work-start usage fixture before its intended guard. Replace the obsolete start-ready manual-cd error expectation with exact authoritative worktree mutation and unchanged base HEAD/absent base document assertions. Preserve exact reviewed implementation and landed/rebased/stale commit decisions, unresolved refusal and all other scenarios. Run27tests, lint/format, full CI and independent review; no product, global helper, timeout, policy, CI or roadmap changes."
  Verify Steps: |-
    1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1. Expected: all27scenarios pass without skips or increased timeouts.
    2. Run scoped ESLint, Prettier and git diff --check. Expected: no errors and unchanged oversized-test baseline.
    3. Run bun run ci:local:full. Expected: mandatory local CI passes.
    4. Review the four-file diff. Shared task execution bases and unknown extensions survive fixture changes. Landed commit precedence, unresolved-task refusal, reviewed implementation identity, worktree requirement and authoritative worktree-only start are asserted. No production, global helpers, policy or CI changes.
    5. Require independent EVALUATOR and hosted exact-head proof before supported integration.
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
    completion_contract_digest: "sha256:4b76aff3166ab28a7e6f189e5bd667185e4129d4dfb2ac2609242897865a0677"
    digest: "sha256:0e9a17171624b1c97a5b0fc4cdd6c62daedff68dd7587af0d2404eff55e2682c"
    grant_id: "19899c94-792a-4251-89f5-0c83e677ae3e"
    issued_at: "2026-08-27T20:52:04.105Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:d86ed97196ec4a37ad680617df7a2088d00695f9425f6a4efb8955b5c82f0bcd"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:82370fdad3200a8a485bbc809710c71b53b1f734b6864500a8747f163ce4956b"
    status: "active"
    task_id: "202608271659-AD3030"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T20:52:04.105Z"
        approved_by: "USER"
        approved_digest: "sha256:8e455a06d47efb83de5e179c745ff761455eb4e128b5ea06644e1ed8e10dfcdc"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T17:01:20.836Z"
      digest: "sha256:8e455a06d47efb83de5e179c745ff761455eb4e128b5ea06644e1ed8e10dfcdc"
      proposal:
        assumptions:
          - "Task-owned routing is intentional current behavior; validate preservation rather than restoring a manual handoff."
        planning_baseline:
          captured_at: "2026-08-27T17:00:09.085Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:0175fe65bebe362a2625d192579b49afd80871410feb5dd6ef62e01043e6dac9"
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
            - ".agentplane/tasks/202608271659-AD3030/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202608271659-AD3030"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1"
              id: "scoped-tests"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run ci:local:full"
              id: "full-ci"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "scoped-tests"
                - "full-ci"
              description: "All27existing scenarios pass without skips or timeout increases. Parsed extensions and shared immutable bases survive; reviewed implementation and landed-commit decisions remain exact; unresolved tasks fail; start-ready mutates only task-owned worktree with base HEAD/document preserved. Only4approved test files change."
              id: "closeout-contract"
              required: true
          evidence_fingerprint: "sha256:0175fe65bebe362a2625d192579b49afd80871410feb5dd6ef62e01043e6dac9"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "scoped-tests"
                    - "full-ci"
                  description: "All27existing scenarios pass without skips or timeout increases. Parsed extensions and shared immutable bases survive; reviewed implementation and landed-commit decisions remain exact; unresolved tasks fail; start-ready mutates only task-owned worktree with base HEAD/document preserved. Only4approved test files change."
                  id: "closeout-contract"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 140000
                optional_sources:
                  - "packages/agentplane/src/commands/task/start-ready.ts"
                  - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
                symbol_hints:
                  - "task_execution_context"
                  - "branch_pr_batch"
                  - "loadTaskCommandContext"
              depends_on: []
              expected_outputs:
                - "artifact:closeout-fixture-report"
              id: "repair-closeout-fixtures"
              objective: "Repair only the four closeout/worktree fixture suites. Preserve parsed task extensions and one immutable real Git base for shared tasks. Seed the work-start usage fixture before its intended guard. Replace the obsolete start-ready manual-cd error expectation with exact authoritative worktree mutation and unchanged base HEAD/absent base document assertions. Preserve exact reviewed implementation and landed/rebased/stale commit decisions, unresolved refusal and all other scenarios. Run27tests, lint/format, full CI and independent review; no product, global helper, timeout, policy, CI or roadmap changes."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1"
                    id: "scoped-tests"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run ci:local:full"
                    id: "full-ci"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "scoped-tests"
                      - "full-ci"
                    description: "All27existing scenarios pass without skips or timeout increases. Parsed extensions and shared immutable bases survive; reviewed implementation and landed-commit decisions remain exact; unresolved tasks fail; start-ready mutates only task-owned worktree with base HEAD/document preserved. Only4approved test files change."
                    id: "closeout-contract"
                    required: true
                evidence_fingerprint: "sha256:0175fe65bebe362a2625d192579b49afd80871410feb5dd6ef62e01043e6dac9"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608271659-AD3030"
    event_cursor: 0
    final_validation: null
    id: "202608271659-AD3030"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-27T17:00:00.059Z"
      constraints: []
      request: |-
        Preserve task identity in closeout and worktree fixtures

        Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.
      task_id: "202608271659-AD3030"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 3
    schema_version: 1
    updated_at: "2026-08-27T20:52:04.105Z"
    work_items:
      repair-closeout-fixtures:
        attempt: 0
        claim_id: null
        id: "repair-closeout-fixtures"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
    version: 1
id_source: "generated"
---
## Summary

Preserve task identity in closeout and worktree fixtures

Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.

## Scope

- In scope: Repair six freshly reproduced failures among27scenarios in four closeout and worktree-routing fixture files. Scope only packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts, packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Merge batch extensions into parsed task metadata rather than duplicate the YAML extensions key; preserve the immutable task_execution_context and make shared tasks use one real committed base. Seed Git for the work-start usage-error case so it reaches the intended worktree requirement. Align the start-ready test with the existing authoritative loadTaskCommandContext redirect: prove it updates only the task-owned worktree without recreating base README or changing base HEAD; do not demand an obsolete manual-cd error. Preserve multi-task exact reviewed implementation SHA, landed versus stale or rebased PR commit choice, unresolved-task failure and all remaining negative scenarios. Use current canonical planning only if needed for fixture validity. No production, global helper, policy, CI gate, timeout, release version or task graph changes. Require all27scenarios, scoped lint/format, full CI, EVALUATOR and hosted exact-head proof.
- Out of scope: unrelated refactors not required for "Preserve task identity in closeout and worktree fixtures".

## Plan

Repair only the four closeout/worktree fixture suites. Preserve parsed task extensions and one immutable real Git base for shared tasks. Seed the work-start usage fixture before its intended guard. Replace the obsolete start-ready manual-cd error expectation with exact authoritative worktree mutation and unchanged base HEAD/absent base document assertions. Preserve exact reviewed implementation and landed/rebased/stale commit decisions, unresolved refusal and all other scenarios. Run27tests, lint/format, full CI and independent review; no product, global helper, timeout, policy, CI or roadmap changes.

## Verify Steps

1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.start-ready.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --pool=forks --maxWorkers=1. Expected: all27scenarios pass without skips or increased timeouts.
2. Run scoped ESLint, Prettier and git diff --check. Expected: no errors and unchanged oversized-test baseline.
3. Run bun run ci:local:full. Expected: mandatory local CI passes.
4. Review the four-file diff. Shared task execution bases and unknown extensions survive fixture changes. Landed commit precedence, unresolved-task refusal, reviewed implementation identity, worktree requirement and authoritative worktree-only start are asserted. No production, global helpers, policy or CI changes.
5. Require independent EVALUATOR and hosted exact-head proof before supported integration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
