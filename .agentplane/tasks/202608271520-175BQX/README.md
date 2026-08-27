---
id: "202608271520-175BQX"
title: "Modernize route-decision fixture prerequisites"
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
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts --pool=threads --maxWorkers=2"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T15:23:29.648Z"
  updated_by: "USER"
  note: "The user explicitly authorized autonomous refactoring until completion and granted all permissions. Apply that authorization to this bounded routing-fixture repair without weakening approval, provider or verification gates."
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
      - "packages/agentplane/src/cli/route-decision.testkit.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Local fixture repair in seven tests and one narrowly scoped test helper; no production changes."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/route-decision.testkit.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
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
          - "packages/agentplane/src/cli/route-decision.testkit.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
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
      digest: "sha256:07a1392731dde5aff7d3fa976e4e7b754aa2e7f93ba454133c17935ef8992bb5"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/route-decision.testkit.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
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
    at: "2026-08-27T15:25:09.436Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-27T15:25:09.436Z"
doc_updated_by: "CODER"
description: "Repair 29 freshly reproduced failures in seven route-decision CLI suites on main 2c9a2f59146c302c517524136e66abb902f92ba6. Provide real Git execution bases before task creation and structured semantic planning prerequisites for downstream routing scenarios. Add one narrowly scoped route-decision.testkit.ts helper if needed to submit real PLANNER results through the existing exchange. Preserve exact approval and provider boundaries, local-only versus remote evidence, quality freshness, semantic changes versus lifecycle-only commits, batch ownership, direct terminal routing, and no-provider-call assertions. Preserve planning-first negative scenarios. Do not relabel downstream safety expectations as planning failures. No production behavior, global fixture helper semantics, CI gates, timeouts, policy, release state or roadmap dependency changes. Require all scoped tests, lint, formatting, unchanged oversized-test baseline and full CI. This scope is disjoint from current fixture repairs."
sections:
  Summary: |-
    Modernize route-decision fixture prerequisites

    Repair 29 freshly reproduced failures in seven route-decision CLI suites on main 2c9a2f59146c302c517524136e66abb902f92ba6. Provide real Git execution bases before task creation and structured semantic planning prerequisites for downstream routing scenarios. Add one narrowly scoped route-decision.testkit.ts helper if needed to submit real PLANNER results through the existing exchange. Preserve exact approval and provider boundaries, local-only versus remote evidence, quality freshness, semantic changes versus lifecycle-only commits, batch ownership, direct terminal routing, and no-provider-call assertions. Preserve planning-first negative scenarios. Do not relabel downstream safety expectations as planning failures. No production behavior, global fixture helper semantics, CI gates, timeouts, policy, release state or roadmap dependency changes. Require all scoped tests, lint, formatting, unchanged oversized-test baseline and full CI. This scope is disjoint from current fixture repairs.
  Scope: |-
    - In scope: Repair 29 freshly reproduced failures in seven route-decision CLI suites on main 2c9a2f59146c302c517524136e66abb902f92ba6. Provide real Git execution bases before task creation and structured semantic planning prerequisites for downstream routing scenarios. Add one narrowly scoped route-decision.testkit.ts helper if needed to submit real PLANNER results through the existing exchange. Preserve exact approval and provider boundaries, local-only versus remote evidence, quality freshness, semantic changes versus lifecycle-only commits, batch ownership, direct terminal routing, and no-provider-call assertions. Preserve planning-first negative scenarios. Do not relabel downstream safety expectations as planning failures. No production behavior, global fixture helper semantics, CI gates, timeouts, policy, release state or roadmap dependency changes. Require all scoped tests, lint, formatting, unchanged oversized-test baseline and full CI. This scope is disjoint from current fixture repairs.
    - Out of scope: unrelated refactors not required for "Modernize route-decision fixture prerequisites".
  Plan: "Repair the seven route-decision suites with real Git execution bases and actual structured planning prerequisites. Use one local test-only helper for the planning exchange. Preserve downstream routing assertions, negative planning precedence, exact authority, provider confidence and evidence freshness. Run all scoped tests, lint, formatting and full CI. Do not change product behavior, global helpers, gates, policy or the release roadmap."
  Verify Steps: |-
    1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts --pool=threads --maxWorkers=2. Expected: all seven suites pass without skipped tests; exact routing, authority, provider confidence, freshness and batch ownership contracts remain covered.
    2. Run ESLint, Prettier, git diff --check and node scripts/checks/check-oversized-test-baseline.mjs --threshold-lines 1000. Expected: no errors or baseline growth.
    3. Run bun run ci:local:full. Expected: all mandatory groups pass.
    4. Review the diff. Expected: the seven approved tests and one route-decision.testkit.ts helper only; real planning fixtures, no weakened gates, no production or global helper changes.
    5. Require hosted exact-head checks and supported integration before closure.
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
    digest: "sha256:da4ed2e64c49edec8495c4a985826fd6c00f9597325003c792e93a1eb9a2536a"
    grant_id: "355f3ecd-7901-42c4-ad0c-d56c5bb502f9"
    issued_at: "2026-08-27T15:23:29.648Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:18464d545e39bd9122a5821e4faf25eb5ccecd9f2282f3914a4d003fea5cf68e"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608271520-175BQX"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T15:23:29.648Z"
        approved_by: "USER"
        approved_digest: "sha256:72ebe2b4b31b033a67b730cd6960b9da2efced9235a2ad8b23d72e44b0595f53"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T15:22:44.549Z"
      digest: "sha256:72ebe2b4b31b033a67b730cd6960b9da2efced9235a2ad8b23d72e44b0595f53"
      proposal:
        assumptions:
          - "Downstream route tests must satisfy real execution and structured planning prerequisites without bypassing the gates they exercise."
        planning_baseline:
          captured_at: "2026-08-27T15:20:58.670Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:232889e3eef2f4f93af9df82cb9ae917690a37cf47dbb3a73bd4d2aa6066eb43"
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
            - ".agentplane/tasks/202608271520-175BQX/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202608271520-175BQX"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts --pool=threads --maxWorkers=2"
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
              description: "All seven routing suites pass without skips. Exact authority, provider confidence, downstream quality and closeout, batch ownership, lifecycle-only versus semantic freshness, planning-first negatives and no-provider-call assertions remain. No gate or product behavior changes."
              id: "routing-fixture-contract"
              required: true
          evidence_fingerprint: "sha256:232889e3eef2f4f93af9df82cb9ae917690a37cf47dbb3a73bd4d2aa6066eb43"
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
                  description: "All seven routing suites pass without skips. Exact authority, provider confidence, downstream quality and closeout, batch ownership, lifecycle-only versus semantic freshness, planning-first negatives and no-provider-call assertions remain. No gate or product behavior changes."
                  id: "routing-fixture-contract"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 160000
                optional_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.branch-worktree.test.ts"
                  - "packages/agentplane/src/commands/shared/route-decision.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                symbol_hints:
                  - "task_plan_proposal"
                  - "mkGitRepoRootWithCommit"
                  - "next_action"
              depends_on: []
              expected_outputs:
                - "artifact:routing-fixture-report"
              id: "repair-routing-fixtures"
              objective: "Exercise downstream routing contracts with valid Git identity and canonical planning prerequisites."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/route-decision.testkit.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts"
                - "packages/agentplane/src/cli/route-decision.testkit.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts --pool=threads --maxWorkers=2"
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
                    description: "All seven routing suites pass without skips. Exact authority, provider confidence, downstream quality and closeout, batch ownership, lifecycle-only versus semantic freshness, planning-first negatives and no-provider-call assertions remain. No gate or product behavior changes."
                    id: "routing-fixture-contract"
                    required: true
                evidence_fingerprint: "sha256:232889e3eef2f4f93af9df82cb9ae917690a37cf47dbb3a73bd4d2aa6066eb43"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608271520-175BQX"
    event_cursor: 0
    final_validation: null
    id: "202608271520-175BQX"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts --pool=threads --maxWorkers=2"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-27T15:20:39.245Z"
      constraints: []
      request: |-
        Modernize route-decision fixture prerequisites

        Repair 29 freshly reproduced failures in seven route-decision CLI suites on main 2c9a2f59146c302c517524136e66abb902f92ba6. Provide real Git execution bases before task creation and structured semantic planning prerequisites for downstream routing scenarios. Add one narrowly scoped route-decision.testkit.ts helper if needed to submit real PLANNER results through the existing exchange. Preserve exact approval and provider boundaries, local-only versus remote evidence, quality freshness, semantic changes versus lifecycle-only commits, batch ownership, direct terminal routing, and no-provider-call assertions. Preserve planning-first negative scenarios. Do not relabel downstream safety expectations as planning failures. No production behavior, global fixture helper semantics, CI gates, timeouts, policy, release state or roadmap dependency changes. Require all scoped tests, lint, formatting, unchanged oversized-test baseline and full CI. This scope is disjoint from current fixture repairs.
      task_id: "202608271520-175BQX"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 3
    schema_version: 1
    updated_at: "2026-08-27T15:23:29.648Z"
    work_items:
      repair-routing-fixtures:
        attempt: 0
        claim_id: null
        id: "repair-routing-fixtures"
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

Modernize route-decision fixture prerequisites

Repair 29 freshly reproduced failures in seven route-decision CLI suites on main 2c9a2f59146c302c517524136e66abb902f92ba6. Provide real Git execution bases before task creation and structured semantic planning prerequisites for downstream routing scenarios. Add one narrowly scoped route-decision.testkit.ts helper if needed to submit real PLANNER results through the existing exchange. Preserve exact approval and provider boundaries, local-only versus remote evidence, quality freshness, semantic changes versus lifecycle-only commits, batch ownership, direct terminal routing, and no-provider-call assertions. Preserve planning-first negative scenarios. Do not relabel downstream safety expectations as planning failures. No production behavior, global fixture helper semantics, CI gates, timeouts, policy, release state or roadmap dependency changes. Require all scoped tests, lint, formatting, unchanged oversized-test baseline and full CI. This scope is disjoint from current fixture repairs.

## Scope

- In scope: Repair 29 freshly reproduced failures in seven route-decision CLI suites on main 2c9a2f59146c302c517524136e66abb902f92ba6. Provide real Git execution bases before task creation and structured semantic planning prerequisites for downstream routing scenarios. Add one narrowly scoped route-decision.testkit.ts helper if needed to submit real PLANNER results through the existing exchange. Preserve exact approval and provider boundaries, local-only versus remote evidence, quality freshness, semantic changes versus lifecycle-only commits, batch ownership, direct terminal routing, and no-provider-call assertions. Preserve planning-first negative scenarios. Do not relabel downstream safety expectations as planning failures. No production behavior, global fixture helper semantics, CI gates, timeouts, policy, release state or roadmap dependency changes. Require all scoped tests, lint, formatting, unchanged oversized-test baseline and full CI. This scope is disjoint from current fixture repairs.
- Out of scope: unrelated refactors not required for "Modernize route-decision fixture prerequisites".

## Plan

Repair the seven route-decision suites with real Git execution bases and actual structured planning prerequisites. Use one local test-only helper for the planning exchange. Preserve downstream routing assertions, negative planning precedence, exact authority, provider confidence and evidence freshness. Run all scoped tests, lint, formatting and full CI. Do not change product behavior, global helpers, gates, policy or the release roadmap.

## Verify Steps

1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.pr-open-metadata.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.remote-confidence.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.verification.test.ts --pool=threads --maxWorkers=2. Expected: all seven suites pass without skipped tests; exact routing, authority, provider confidence, freshness and batch ownership contracts remain covered.
2. Run ESLint, Prettier, git diff --check and node scripts/checks/check-oversized-test-baseline.mjs --threshold-lines 1000. Expected: no errors or baseline growth.
3. Run bun run ci:local:full. Expected: all mandatory groups pass.
4. Review the diff. Expected: the seven approved tests and one route-decision.testkit.ts helper only; real planning fixtures, no weakened gates, no production or global helper changes.
5. Require hosted exact-head checks and supported integration before closure.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
