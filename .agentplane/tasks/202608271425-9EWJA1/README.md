---
id: "202608271425-9EWJA1"
title: "Align PR fixtures with committed Git identity"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202608271251-GHHA0Q"
tags:
  - "tests"
  - "architecture"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/testkit/src/cli.test.ts --pool=threads --maxWorkers=2"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T14:29:43.046Z"
  updated_by: "USER"
  note: "The user explicitly authorized autonomous continuation until refactoring is complete and granted all required permissions in the current conversation. This approval records that authorization for the reviewed ten-file PR fixture repair, plan sha256:5708ce75eefea6706dde2e1d3794220f871b19cee2b1c00e647a09c89b8e7357. No fabricated host decision is used. Mandatory local and hosted checks remain required."
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
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
      - "packages/testkit/src/cli-core-pr-flow.ts"
      - "packages/testkit/src/cli.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The exact ten-file scope is test maintenance. The existing testkit facade re-export is classified as source_code by the deterministic path classifier. No product source path or external effect is authorized."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
      - "packages/testkit/src/cli-core-pr-flow.ts"
      - "packages/testkit/src/cli.test.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
          - "packages/testkit/src/cli-core-pr-flow.ts"
          - "packages/testkit/src/cli.test.ts"
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
      digest: "sha256:c9f31405452e34483524abe3e2a8378985e2a581c1d22ab7fcb6956f06a4eb12"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
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
    at: "2026-08-27T14:29:57.601Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-27T14:29:57.601Z"
doc_updated_by: "CODER"
description: "Repair the 26 freshly reproduced failures across eight PR fixture suites on main 5fce04a8. Reuse and export the existing mkGitRepoRootWithCommit helper only where PR operations require a real base identity. Preserve empty-repository helpers and argument-validation scenarios. Update provider-neutral output assertions only where behavior and metadata assertions remain equivalent. Add testkit coverage for empty versus committed repository identity. Remove unused imports or redundant fixture setup rather than increasing oversized-file baselines. No production, policy, gate, release-state or roadmap change. This task is independent of concurrent G0N9P4: its ten writable files do not overlap, and it requires only already merged GHHA0Q. Both targeted tests and full CI remain mandatory."
sections:
  Summary: |-
    Align PR fixtures with committed Git identity

    Repair the 26 freshly reproduced failures across eight PR fixture suites on main 5fce04a8. Reuse and export the existing mkGitRepoRootWithCommit helper only where PR operations require a real base identity. Preserve empty-repository helpers and argument-validation scenarios. Update provider-neutral output assertions only where behavior and metadata assertions remain equivalent. Add testkit coverage for empty versus committed repository identity. Remove unused imports or redundant fixture setup rather than increasing oversized-file baselines. No production, policy, gate, release-state or roadmap change. This task is independent of concurrent G0N9P4: its ten writable files do not overlap, and it requires only already merged GHHA0Q. Both targeted tests and full CI remain mandatory.
  Scope: |-
    - In scope: Repair the 26 freshly reproduced failures across eight PR fixture suites on main 5fce04a8. Reuse and export the existing mkGitRepoRootWithCommit helper only where PR operations require a real base identity. Preserve empty-repository helpers and argument-validation scenarios. Update provider-neutral output assertions only where behavior and metadata assertions remain equivalent. Add testkit coverage for empty versus committed repository identity. Remove unused imports or redundant fixture setup rather than increasing oversized-file baselines. No production, policy, gate, release-state or roadmap change. This task is independent of concurrent G0N9P4: its ten writable files do not overlap, and it requires only already merged GHHA0Q. Both targeted tests and full CI remain mandatory.
    - Out of scope: unrelated refactors not required for "Align PR fixtures with committed Git identity".
  Plan: "Export the existing committed-repository helper through the PR testkit facade. Add explicit empty-versus-committed Git identity coverage. Migrate only PR fixtures whose operations require a frozen base before task creation. Update obsolete PR-specific status wording to the equivalent provider-neutral wording while retaining metadata and behavior assertions. Remove unused imports and redundant configuration where needed to honor the existing test-size budget. Run all nine declared test files, formatting, lint, hotspot baseline, full CI and hosted exact-head checks. Do not change production code or enforcement."
  Verify Steps: |-
    1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/testkit/src/cli.test.ts --pool=threads --maxWorkers=2`. Expected: every test passes with no skipped cases; PR metadata, exact-head publication and error-path assertions remain intact.
    2. Run ESLint and Prettier --check on all ten scoped files, plus git diff --check and node scripts/checks/check-oversized-test-baseline.mjs --threshold-lines 1000. Expected: all pass without baseline changes.
    3. Run `bun run ci:local:full`. Expected: every mandatory group passes for the committed implementation. A focused pass is not a substitute.
    4. Before integration, require hosted mandatory checks for the exact published head. Preserve all unrelated worktrees and the parallel G0N9P4 changes.
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
    digest: "sha256:0d7f582145735b5393dd0d7fbcb9aca522a61e4eac8ede98d7e6397ab99cd115"
    grant_id: "9266c5aa-5f04-4c40-a494-ab6f6dbbca5f"
    issued_at: "2026-08-27T14:29:43.046Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:9ab4cf1b9eaaee5115843e69ab81e99c21b3e9fd91aa634a498753453406661a"
    plan_revision: 6
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608271425-9EWJA1"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T14:29:43.046Z"
        approved_by: "USER"
        approved_digest: "sha256:5708ce75eefea6706dde2e1d3794220f871b19cee2b1c00e647a09c89b8e7357"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T14:29:24.846Z"
      digest: "sha256:5708ce75eefea6706dde2e1d3794220f871b19cee2b1c00e647a09c89b8e7357"
      proposal:
        assumptions:
          - "Seed a fixture before task creation only when its declared behavior needs an implementation base. Preserve all existing empty-history helper contracts."
          - "The existing merged GHHA0Q baseline is sufficient; G0N9P4 is a disjoint parallel workstream and is not required for these tests."
        planning_baseline:
          captured_at: "2026-08-27T14:28:54.707Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:7f9ed1a2cdbbe768b925ecf6b21b5bd1ba559dcff561c18ddd3088568ed36787"
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
            - ".agentplane/tasks/202608271425-9EWJA1/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "5fce04a8be14816be4cae236d2941dff7045e214"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:5"
        schema_version: 1
        task_id: "202608271425-9EWJA1"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/testkit/src/cli.test.ts --pool=threads --maxWorkers=2"
              id: "pr-fixtures"
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
                - "pr-fixtures"
                - "full-ci"
              description: "The eight PR suites pass without skipped or weakened tests. Fixtures use a real base before task creation where required. Empty-repository helpers and authority, exact-head, failure-metadata and no-op publication assertions remain intact."
              id: "pr-fixture-contract"
              required: true
          evidence_fingerprint: "sha256:7f9ed1a2cdbbe768b925ecf6b21b5bd1ba559dcff561c18ddd3088568ed36787"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "pr-fixtures"
                    - "full-ci"
                  description: "The eight PR suites pass without skipped or weakened tests. Fixtures use a real base before task creation where required. Empty-repository helpers and authority, exact-head, failure-metadata and no-op publication assertions remain intact."
                  id: "pr-fixture-contract"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 150000
                optional_sources:
                  - "packages/testkit/src/cli-harness.ts"
                  - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                  - "packages/testkit/src/cli-core-pr-flow.ts"
                  - "packages/testkit/src/cli.test.ts"
                symbol_hints:
                  - "mkGitRepoRootWithCommit"
              depends_on: []
              expected_outputs:
                - "artifact:pr-fixture-report"
              id: "repair-pr-fixtures"
              objective: "Align PR test setup with real frozen Git identity and preserve publication and authority contracts."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src/cli-core-pr-flow.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/testkit/src/cli.test.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                - "packages/testkit/src/cli-core-pr-flow.ts"
                - "packages/testkit/src/cli.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/testkit/src/cli.test.ts --pool=threads --maxWorkers=2"
                    id: "pr-fixtures"
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
                      - "pr-fixtures"
                      - "full-ci"
                    description: "The eight PR suites pass without skipped or weakened tests. Fixtures use a real base before task creation where required. Empty-repository helpers and authority, exact-head, failure-metadata and no-op publication assertions remain intact."
                    id: "pr-fixture-contract"
                    required: true
                evidence_fingerprint: "sha256:7f9ed1a2cdbbe768b925ecf6b21b5bd1ba559dcff561c18ddd3088568ed36787"
                schema_version: 1
      revision: 2
      schema_version: 1
      task_id: "202608271425-9EWJA1"
    event_cursor: 0
    final_validation: null
    id: "202608271425-9EWJA1"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/testkit/src/cli.test.ts --pool=threads --maxWorkers=2"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-27T14:25:27.805Z"
      constraints: []
      request: |-
        Align PR fixtures with committed Git identity

        Repair the 26 freshly reproduced failures across eight PR fixture suites on main 5fce04a8. Reuse and export the existing mkGitRepoRootWithCommit helper only where PR operations require a real base identity. Preserve empty-repository helpers and argument-validation scenarios. Update provider-neutral output assertions only where behavior and metadata assertions remain equivalent. Add testkit coverage for empty versus committed repository identity. Remove unused imports or redundant fixture setup rather than increasing oversized-file baselines. No production, policy, gate, release-state or roadmap change. This task is independent of concurrent G0N9P4: its ten writable files do not overlap, and it requires only already merged GHHA0Q. Both targeted tests and full CI remain mandatory.
      task_id: "202608271425-9EWJA1"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history:
      -
        approval:
          approved_at: null
          approved_by: null
          approved_digest: null
          policy_facts: []
          state: "pending"
        created_at: "2026-08-27T14:27:07.591Z"
        digest: "sha256:b1629d5a2d7cb8f940c7b658c4f32e9cda343c786237c97df03240d7d0bbba5d"
        proposal:
          assumptions:
            - "Seed a fixture before task creation only when its declared behavior needs an implementation base. Preserve all existing empty-history helper contracts."
            - "The existing merged GHHA0Q baseline is sufficient; G0N9P4 is a disjoint parallel workstream and is not required for these tests."
          planning_baseline:
            captured_at: "2026-08-27T14:25:41.616Z"
            config_digest: null
            context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
            digest: "sha256:e51b7c5ee2e6d99fed1cac069ddb745d60303cdef3630a3e7de9adc9166bd0db"
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
              - ".agentplane/tasks/202608271425-9EWJA1/README.md"
            git:
              kind: "commit"
              ref: null
              sha: "5fce04a8be14816be4cae236d2941dff7045e214"
            policy_digest: null
            schema_version: 1
            task_history_cursor: "task-revision:1"
          schema_version: 1
          task_id: "202608271425-9EWJA1"
          top_level_validation:
            checks:
              -
                capability: "task.verify"
                command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/testkit/src/cli.test.ts --pool=threads --maxWorkers=2"
                id: "pr-fixtures"
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
                  - "pr-fixtures"
                  - "full-ci"
                description: "The eight PR suites pass without skipped or weakened tests. Fixtures use a real base before task creation where required. Empty-repository helpers and authority, exact-head, failure-metadata and no-op publication assertions remain intact."
                id: "pr-fixture-contract"
                required: true
            evidence_fingerprint: "sha256:e51b7c5ee2e6d99fed1cac069ddb745d60303cdef3630a3e7de9adc9166bd0db"
            schema_version: 1
          unresolved_questions: []
          work_items:
            schema_version: 1
            work_items:
              -
                acceptance_criteria:
                  -
                    check_ids:
                      - "pr-fixtures"
                      - "full-ci"
                    description: "The eight PR suites pass without skipped or weakened tests. Fixtures use a real base before task creation where required. Empty-repository helpers and authority, exact-head, failure-metadata and no-op publication assertions remain intact."
                    id: "pr-fixture-contract"
                    required: true
                capabilities:
                  - "task.verify"
                context:
                  max_bytes: 150000
                  optional_sources:
                    - "packages/testkit/src/cli-harness.ts"
                    - "packages/agentplane/src/runtime/task-execution-context/resolve.ts"
                  required_sources:
                    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
                    - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                    - "packages/testkit/src/cli-core-pr-flow.ts"
                    - "packages/testkit/src/cli.test.ts"
                  symbol_hints:
                    - "mkGitRepoRootWithCommit"
                depends_on: []
                expected_outputs:
                  - "artifact:pr-fixture-report"
                id: "repair-pr-fixtures"
                objective: "Align PR test setup with real frozen Git identity and preserve publication and authority contracts."
                optional: false
                priority: 1
                required_inputs: []
                resource_claims:
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/cli-core-pr-flow.ts"
                  -
                    kind: "path"
                    mode: "write"
                    resource: "packages/testkit/src/cli.test.ts"
                risk: "low"
                scope_roots:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
                  - "packages/testkit/src/cli-core-pr-flow.ts"
                  - "packages/testkit/src/cli.test.ts"
                validation:
                  checks:
                    -
                      capability: "task.verify"
                      command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/testkit/src/cli.test.ts --pool=threads --maxWorkers=2"
                      id: "pr-fixtures"
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
                        - "pr-fixtures"
                        - "full-ci"
                      description: "The eight PR suites pass without skipped or weakened tests. Fixtures use a real base before task creation where required. Empty-repository helpers and authority, exact-head, failure-metadata and no-op publication assertions remain intact."
                      id: "pr-fixture-contract"
                      required: true
                  evidence_fingerprint: "sha256:e51b7c5ee2e6d99fed1cac069ddb745d60303cdef3630a3e7de9adc9166bd0db"
                  schema_version: 1
        revision: 1
        schema_version: 1
        task_id: "202608271425-9EWJA1"
    revision: 2
    schema_version: 1
    updated_at: "2026-08-27T14:29:43.046Z"
    work_items:
      repair-pr-fixtures:
        attempt: 0
        claim_id: null
        id: "repair-pr-fixtures"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "5fce04a8be14816be4cae236d2941dff7045e214"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "5fce04a8be14816be4cae236d2941dff7045e214"
    version: 1
id_source: "generated"
---
## Summary

Align PR fixtures with committed Git identity

Repair the 26 freshly reproduced failures across eight PR fixture suites on main 5fce04a8. Reuse and export the existing mkGitRepoRootWithCommit helper only where PR operations require a real base identity. Preserve empty-repository helpers and argument-validation scenarios. Update provider-neutral output assertions only where behavior and metadata assertions remain equivalent. Add testkit coverage for empty versus committed repository identity. Remove unused imports or redundant fixture setup rather than increasing oversized-file baselines. No production, policy, gate, release-state or roadmap change. This task is independent of concurrent G0N9P4: its ten writable files do not overlap, and it requires only already merged GHHA0Q. Both targeted tests and full CI remain mandatory.

## Scope

- In scope: Repair the 26 freshly reproduced failures across eight PR fixture suites on main 5fce04a8. Reuse and export the existing mkGitRepoRootWithCommit helper only where PR operations require a real base identity. Preserve empty-repository helpers and argument-validation scenarios. Update provider-neutral output assertions only where behavior and metadata assertions remain equivalent. Add testkit coverage for empty versus committed repository identity. Remove unused imports or redundant fixture setup rather than increasing oversized-file baselines. No production, policy, gate, release-state or roadmap change. This task is independent of concurrent G0N9P4: its ten writable files do not overlap, and it requires only already merged GHHA0Q. Both targeted tests and full CI remain mandatory.
- Out of scope: unrelated refactors not required for "Align PR fixtures with committed Git identity".

## Plan

Export the existing committed-repository helper through the PR testkit facade. Add explicit empty-versus-committed Git identity coverage. Migrate only PR fixtures whose operations require a frozen base before task creation. Update obsolete PR-specific status wording to the equivalent provider-neutral wording while retaining metadata and behavior assertions. Remove unused imports and redundant configuration where needed to honor the existing test-size budget. Run all nine declared test files, formatting, lint, hotspot baseline, full CI and hosted exact-head checks. Do not change production code or enforcement.

## Verify Steps

1. Run `node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.open-hydration.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.update.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/testkit/src/cli.test.ts --pool=threads --maxWorkers=2`. Expected: every test passes with no skipped cases; PR metadata, exact-head publication and error-path assertions remain intact.
2. Run ESLint and Prettier --check on all ten scoped files, plus git diff --check and node scripts/checks/check-oversized-test-baseline.mjs --threshold-lines 1000. Expected: all pass without baseline changes.
3. Run `bun run ci:local:full`. Expected: every mandatory group passes for the committed implementation. A focused pass is not a substitute.
4. Before integration, require hosted mandatory checks for the exact published head. Preserve all unrelated worktrees and the parallel G0N9P4 changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
