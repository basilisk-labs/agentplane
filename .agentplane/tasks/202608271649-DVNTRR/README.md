---
id: "202608271649-DVNTRR"
title: "Modernize task continuity and approval fixtures"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  - "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts --pool=forks --maxWorkers=1"
plan_approval:
  state: "approved"
  updated_at: "2026-08-27T16:52:24.105Z"
  updated_by: "USER"
  note: "Approved under the user instruction to continue refactoring autonomously with all permissions. Bounded five-file fixture repair; preserve all9scenarios and mandatory checks. Do not modify production or the old0.6task."
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
      - "packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
      - "packages/agentplane/src/cli/task-continuity.testkit.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Four bounded suites and one local helper only; preserve downstream safety and exact identity assertions."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
      - "packages/agentplane/src/cli/task-continuity.testkit.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
          - "packages/agentplane/src/cli/task-continuity.testkit.ts"
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
      digest: "sha256:8898c52874887d510b98c9153566ecf6fe8fa43c111f7f808645037615fed922"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
        - "central_component:packages/agentplane/src/cli/task-continuity.testkit.ts"
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
    at: "2026-08-27T16:53:09.776Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-27T16:53:09.776Z"
doc_updated_by: "CODER"
description: "Repair eight freshly reproduced fixture failures across task handoff, direct supervisor approval, next-action JSON and route escalation. Scope only run-cli.core.task-handoff.test.ts, run-cli.core.direct-task-supervision.test.ts, run-cli.core.task-next-action-json.test.ts, run-cli.core.task-routing.test.ts and a new local task-continuity.testkit.ts under packages/agentplane/src/cli. Use real committed Git baselines and typed TaskPlanProposal from the actual PLANNER work order. Preserve task kind, mutation, risk and requested route in fixture proposals. Keep explicit approval ungranted in the supervisor stop test. Retain stale claimed-run cancellation, unclaimed-run refusal, branch snapshot precedence, exact authority/head preservation, JSON aliases and state fingerprints, user-question precedence, and publish-risk branch escalation. No production, global testkit, CI, policy, timeout or roadmap changes. Do not modify the old0.6 P5BWP0 task or its artifacts. This is a new0.7.8 qualification repair on current main, disjoint from all active source edits. Require all9 existing scenarios, focused lint/format, full CI, EVALUATOR and hosted exact-head proof."
sections:
  Summary: |-
    Modernize task continuity and approval fixtures

    Repair eight freshly reproduced fixture failures across task handoff, direct supervisor approval, next-action JSON and route escalation. Scope only run-cli.core.task-handoff.test.ts, run-cli.core.direct-task-supervision.test.ts, run-cli.core.task-next-action-json.test.ts, run-cli.core.task-routing.test.ts and a new local task-continuity.testkit.ts under packages/agentplane/src/cli. Use real committed Git baselines and typed TaskPlanProposal from the actual PLANNER work order. Preserve task kind, mutation, risk and requested route in fixture proposals. Keep explicit approval ungranted in the supervisor stop test. Retain stale claimed-run cancellation, unclaimed-run refusal, branch snapshot precedence, exact authority/head preservation, JSON aliases and state fingerprints, user-question precedence, and publish-risk branch escalation. No production, global testkit, CI, policy, timeout or roadmap changes. Do not modify the old0.6 P5BWP0 task or its artifacts. This is a new0.7.8 qualification repair on current main, disjoint from all active source edits. Require all9 existing scenarios, focused lint/format, full CI, EVALUATOR and hosted exact-head proof.
  Scope: |-
    - In scope: Repair eight freshly reproduced fixture failures across task handoff, direct supervisor approval, next-action JSON and route escalation. Scope only run-cli.core.task-handoff.test.ts, run-cli.core.direct-task-supervision.test.ts, run-cli.core.task-next-action-json.test.ts, run-cli.core.task-routing.test.ts and a new local task-continuity.testkit.ts under packages/agentplane/src/cli. Use real committed Git baselines and typed TaskPlanProposal from the actual PLANNER work order. Preserve task kind, mutation, risk and requested route in fixture proposals. Keep explicit approval ungranted in the supervisor stop test. Retain stale claimed-run cancellation, unclaimed-run refusal, branch snapshot precedence, exact authority/head preservation, JSON aliases and state fingerprints, user-question precedence, and publish-risk branch escalation. No production, global testkit, CI, policy, timeout or roadmap changes. Do not modify the old0.6 P5BWP0 task or its artifacts. This is a new0.7.8 qualification repair on current main, disjoint from all active source edits. Require all9 existing scenarios, focused lint/format, full CI, EVALUATOR and hosted exact-head proof.
    - Out of scope: unrelated refactors not required for "Modernize task continuity and approval fixtures".
  Plan: "Repair the four continuity and approval suites with real Git baselines and actual structured PLANNER proposals. Keep approval ungranted in the direct-supervision stop case. Preserve exact authority and head identity, stale-run claim ownership, user-question precedence, JSON aliases, fingerprints and publish-risk escalation. Use only a local helper and the four approved suites. Do not change product, global fixtures, CI, timeouts, policy or other task state."
  Verify Steps: |-
    1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts --pool=forks --maxWorkers=1. Expected: all9existing scenarios pass without skips or timeout changes.
    2. Run scoped ESLint, Prettier and git diff --check. Expected: no errors and unchanged oversized-test baseline.
    3. Run bun run ci:local:full. Expected: mandatory local checks pass.
    4. Review only the five approved paths. Preserve approval stop, stale claim ownership, unclaimed refusal, exact authority/head state, JSON aliases/fingerprints, user-question precedence and release-risk route. No product, global helper, CI, policy, timeout or task graph change.
    5. Require independent EVALUATOR review and fresh hosted exact-head checks before supported integration.
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
    digest: "sha256:0b153aa77abb6dd926f5500325a0b8ddfb5175f5b41d86f46018f35c7e78b803"
    grant_id: "34c732da-fa0a-42de-a177-279434291b4e"
    issued_at: "2026-08-27T16:52:24.105Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:0c4fe335b567c82d186ad360bac1f97291b817d3bbce36ff126c45ebcbeafdb0"
    plan_revision: 4
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202608271649-DVNTRR"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-27T16:52:24.105Z"
        approved_by: "USER"
        approved_digest: "sha256:12f1eedce20f8ce708bcae897dafd74423968710a04a8052568476364148ccdf"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-27T16:51:30.605Z"
      digest: "sha256:12f1eedce20f8ce708bcae897dafd74423968710a04a8052568476364148ccdf"
      proposal:
        assumptions:
          - "A complete but unapproved structured plan is required to exercise the approval boundary."
        planning_baseline:
          captured_at: "2026-08-27T16:50:47.786Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:15077effa4c203c270f4946e5e69c268c6b97219af00acb717d822be2314168a"
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
            - ".agentplane/tasks/202608271649-DVNTRR/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "2c9a2f59146c302c517524136e66abb902f92ba6"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:2"
        schema_version: 1
        task_id: "202608271649-DVNTRR"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts --pool=forks --maxWorkers=1"
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
              description: "All9existing scenarios pass without skips or timeout increases. Approval remains required before executor; claimed stale cancellation and unclaimed refusal, branch snapshot precedence, authority/head immutability, aliases/fingerprints, question precedence and risk_publish escalation remain asserted. Only5approved fixture files change."
              id: "continuity-contract"
              required: true
          evidence_fingerprint: "sha256:15077effa4c203c270f4946e5e69c268c6b97219af00acb717d822be2314168a"
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
                  description: "All9existing scenarios pass without skips or timeout increases. Approval remains required before executor; claimed stale cancellation and unclaimed refusal, branch snapshot precedence, authority/head immutability, aliases/fingerprints, question precedence and risk_publish escalation remain asserted. Only5approved fixture files change."
                  id: "continuity-contract"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 120000
                optional_sources: []
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
                symbol_hints:
                  - "TaskPlanProposal"
                  - "task reclaim"
                  - "state_fingerprint"
              depends_on: []
              expected_outputs:
                - "artifact:continuity-fixture-report"
              id: "repair-continuity-fixtures"
              objective: "Repair the four continuity and approval suites with real Git baselines and actual structured PLANNER proposals. Keep approval ungranted in the direct-supervision stop case. Preserve exact authority and head identity, stale-run claim ownership, user-question precedence, JSON aliases, fingerprints and publish-risk escalation. Use only a local helper and the four approved suites. Do not change product, global fixtures, CI, timeouts, policy or other task state."
              optional: false
              priority: 1
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/task-continuity.testkit.ts"
              risk: "low"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-routing.test.ts"
                - "packages/agentplane/src/cli/task-continuity.testkit.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts --pool=forks --maxWorkers=1"
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
                    description: "All9existing scenarios pass without skips or timeout increases. Approval remains required before executor; claimed stale cancellation and unclaimed refusal, branch snapshot precedence, authority/head immutability, aliases/fingerprints, question precedence and risk_publish escalation remain asserted. Only5approved fixture files change."
                    id: "continuity-contract"
                    required: true
                evidence_fingerprint: "sha256:15077effa4c203c270f4946e5e69c268c6b97219af00acb717d822be2314168a"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608271649-DVNTRR"
    event_cursor: 0
    final_validation: null
    id: "202608271649-DVNTRR"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run ci:local:full"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts --pool=forks --maxWorkers=1"
          id: "legacy-2"
          required: true
      captured_at: "2026-08-27T16:50:00.373Z"
      constraints: []
      request: |-
        Modernize task continuity and approval fixtures

        Repair eight freshly reproduced fixture failures across task handoff, direct supervisor approval, next-action JSON and route escalation. Scope only run-cli.core.task-handoff.test.ts, run-cli.core.direct-task-supervision.test.ts, run-cli.core.task-next-action-json.test.ts, run-cli.core.task-routing.test.ts and a new local task-continuity.testkit.ts under packages/agentplane/src/cli. Use real committed Git baselines and typed TaskPlanProposal from the actual PLANNER work order. Preserve task kind, mutation, risk and requested route in fixture proposals. Keep explicit approval ungranted in the supervisor stop test. Retain stale claimed-run cancellation, unclaimed-run refusal, branch snapshot precedence, exact authority/head preservation, JSON aliases and state fingerprints, user-question precedence, and publish-risk branch escalation. No production, global testkit, CI, policy, timeout or roadmap changes. Do not modify the old0.6 P5BWP0 task or its artifacts. This is a new0.7.8 qualification repair on current main, disjoint from all active source edits. Require all9 existing scenarios, focused lint/format, full CI, EVALUATOR and hosted exact-head proof.
      task_id: "202608271649-DVNTRR"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 3
    schema_version: 1
    updated_at: "2026-08-27T16:52:24.105Z"
    work_items:
      repair-continuity-fixtures:
        attempt: 0
        claim_id: null
        id: "repair-continuity-fixtures"
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

Modernize task continuity and approval fixtures

Repair eight freshly reproduced fixture failures across task handoff, direct supervisor approval, next-action JSON and route escalation. Scope only run-cli.core.task-handoff.test.ts, run-cli.core.direct-task-supervision.test.ts, run-cli.core.task-next-action-json.test.ts, run-cli.core.task-routing.test.ts and a new local task-continuity.testkit.ts under packages/agentplane/src/cli. Use real committed Git baselines and typed TaskPlanProposal from the actual PLANNER work order. Preserve task kind, mutation, risk and requested route in fixture proposals. Keep explicit approval ungranted in the supervisor stop test. Retain stale claimed-run cancellation, unclaimed-run refusal, branch snapshot precedence, exact authority/head preservation, JSON aliases and state fingerprints, user-question precedence, and publish-risk branch escalation. No production, global testkit, CI, policy, timeout or roadmap changes. Do not modify the old0.6 P5BWP0 task or its artifacts. This is a new0.7.8 qualification repair on current main, disjoint from all active source edits. Require all9 existing scenarios, focused lint/format, full CI, EVALUATOR and hosted exact-head proof.

## Scope

- In scope: Repair eight freshly reproduced fixture failures across task handoff, direct supervisor approval, next-action JSON and route escalation. Scope only run-cli.core.task-handoff.test.ts, run-cli.core.direct-task-supervision.test.ts, run-cli.core.task-next-action-json.test.ts, run-cli.core.task-routing.test.ts and a new local task-continuity.testkit.ts under packages/agentplane/src/cli. Use real committed Git baselines and typed TaskPlanProposal from the actual PLANNER work order. Preserve task kind, mutation, risk and requested route in fixture proposals. Keep explicit approval ungranted in the supervisor stop test. Retain stale claimed-run cancellation, unclaimed-run refusal, branch snapshot precedence, exact authority/head preservation, JSON aliases and state fingerprints, user-question precedence, and publish-risk branch escalation. No production, global testkit, CI, policy, timeout or roadmap changes. Do not modify the old0.6 P5BWP0 task or its artifacts. This is a new0.7.8 qualification repair on current main, disjoint from all active source edits. Require all9 existing scenarios, focused lint/format, full CI, EVALUATOR and hosted exact-head proof.
- Out of scope: unrelated refactors not required for "Modernize task continuity and approval fixtures".

## Plan

Repair the four continuity and approval suites with real Git baselines and actual structured PLANNER proposals. Keep approval ungranted in the direct-supervision stop case. Preserve exact authority and head identity, stale-run claim ownership, user-question precedence, JSON aliases, fingerprints and publish-risk escalation. Use only a local helper and the four approved suites. Do not change product, global fixtures, CI, timeouts, policy or other task state.

## Verify Steps

1. Run node node_modules/vitest/vitest.mjs --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/cli/run-cli.core.direct-task-supervision.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts packages/agentplane/src/cli/run-cli.core.task-routing.test.ts --pool=forks --maxWorkers=1. Expected: all9existing scenarios pass without skips or timeout changes.
2. Run scoped ESLint, Prettier and git diff --check. Expected: no errors and unchanged oversized-test baseline.
3. Run bun run ci:local:full. Expected: mandatory local checks pass.
4. Review only the five approved paths. Preserve approval stop, stale claim ownership, unclaimed refusal, exact authority/head state, JSON aliases/fingerprints, user-question precedence and release-risk route. No product, global helper, CI, policy, timeout or task graph change.
5. Require independent EVALUATOR review and fresh hosted exact-head checks before supported integration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
