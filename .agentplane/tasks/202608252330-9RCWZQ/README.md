---
id: "202608252330-9RCWZQ"
title: "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release-blocker"
  - "branch-pr"
  - "provider-base"
  - "regression"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "merge"
  - "external_system"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-26T01:59:47.289Z"
  updated_by: "USER"
  note: "User approved plan_digest sha256:97480e98175921cd396d8c977c65df4147565eb66a61a8473993fe61605bcc0f at state_fingerprint sha256:64e3cb82c3cabb6f93db912c4046b8d41545dea67e9d07c28bed53e01c5eca1a"
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
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects:
      - "network_read"
    allowed_repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    forbidden_external_effects:
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
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
      - "packages/agentplane/src/commands/pr"
  declaration:
    external_effects:
      - "external_write"
      - "network_read"
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "The existing 0.7.8 candidate remains unchanged and is resumed only after this blocker is integrated."
      - "The fix changes provider-facing PR construction and therefore needs focused regression evidence before integration."
      - "The repository requires branch_pr for source changes and hosted integration."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "recovery_required"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
      - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
      - "packages/agentplane/src/commands/pr"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_external_write"
    - "repository_branch_pr_floor"
    - "reversibility_recovery_required"
  repository_mode: "branch_pr"
  safety:
    approval_effects:
      - "external_write"
    requires_user_approval: true
    requires_worktree: true
  schema_version: 1
  selected_mode: "branch_pr"
  source: "agent_declared"
  verification:
    contract:
      declared:
        components:
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
          - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
          - "packages/agentplane/src/commands/pr"
        evidence_requirements:
          - "external_effect:external_write"
          - "external_effect:network_read"
          - "hosted_integration"
          - "repository_effect:repository_write"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects:
          - "external_write"
          - "network_read"
        repository_effects:
          - "repository_write"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "recovery_required"
      digest: "sha256:80553ca115bc43c2a6fa4a36019e67d36326ba3f795d641d937ec492d6774cf0"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
        - "central_component:packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
        - "external_effect_requires_real_e2e"
        - "reversibility_recovery_required"
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
      requires_real_e2e: true
      schema_version: 2
      selected_checks:
        - "affected_unit_integration"
        - "critical_paths"
        - "full_regression"
        - "hosted_integration"
        - "real_e2e"
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
      - "external_effect:external_write"
      - "external_effect:network_read"
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
    at: "2026-08-26T02:00:01.156Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-26T02:00:01.156Z"
doc_updated_by: "CODER"
description: "Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA."
sections:
  Summary: |-
    Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch

    Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.
  Scope: |-
    - In scope: Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.
    - Out of scope: unrelated refactors not required for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch".
  Plan: "Prepared a bounded branch_pr plan to preserve the frozen execution base while resolving an exact matching provider base branch for hosted PR creation, with fail-closed mismatch behavior and focused regressions."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    completion_contract_digest: "sha256:eb99fc494c3b962e340ff87de629edc93bafdb74f8bcd7882f7b2048ca5b217c"
    digest: "sha256:4e7df4df11538e01efe8c761b143e3f1169dbc652be76280c13b66f8456e446c"
    grant_id: "f4db21f8-dc04-47f1-9d56-884e862c80bb"
    issued_at: "2026-08-26T01:59:47.289Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:c4ca7a0fd65f4ec25a485f23a6b84211fe5569e18d88ea1cc5bc78068ec73eb1"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:1a8e009a74a6a60da0c9acf5ab642363ce87f6e0c2cfb72131207c1038c3823b"
    status: "active"
    task_id: "202608252330-9RCWZQ"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-26T01:59:47.289Z"
        approved_by: "USER"
        approved_digest: "sha256:97480e98175921cd396d8c977c65df4147565eb66a61a8473993fe61605bcc0f"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-25T23:35:03.814Z"
      digest: "sha256:97480e98175921cd396d8c977c65df4147565eb66a61a8473993fe61605bcc0f"
      proposal:
        assumptions:
          - "The frozen execution base SHA is already present locally and is the exact required merge base for the release candidate."
          - "The normal configured/current provider base is main and must resolve to the same exact SHA before PR creation is allowed."
          - "No release candidate file changes are required to repair this control-plane defect."
        planning_baseline:
          captured_at: "2026-08-25T23:30:39.356Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:c28d4dfbea6245e64acc2093c2b7f9113d721ce20dff853c67d41fb2081dd328"
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
            - ".agentplane/tasks/202608252330-9RCWZQ/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608252330-9RCWZQ"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts --pool=forks --maxWorkers 1"
              id: "check-pr-open-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 180000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "structural"
              required: true
              timeout_ms: 180000
          criteria:
            -
              check_ids:
                - "check-pr-open-focused"
                - "check-typecheck"
              description: "Exact-SHA release tasks can open a hosted PR only against a uniquely matching provider branch, with the frozen task execution evidence unchanged."
              id: "TOP-AC-1"
              required: true
            -
              check_ids:
                - "check-pr-open-focused"
              description: "The implementation remains within PR routing and focused regression-test scope and introduces no release candidate changes."
              id: "TOP-AC-2"
              required: true
          evidence_fingerprint: "sha256:21401199c28421eb1593ac9659bdcc9775d509b4fd8a303c3535fe3c22d79ebd"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-pr-open-focused"
                  description: "A 40-hex execution base whose SHA equals the resolved protected branch head produces the branch name as provider base while preserving task execution.base_ref/base_sha."
                  id: "WI-1-AC-1"
                  required: true
                -
                  check_ids:
                    - "check-pr-open-focused"
                  description: "Mismatch, multiple matches, or missing branch evidence fails before hosted PR creation and does not rewrite task or PR identity state."
                  id: "WI-1-AC-2"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 180000
                optional_sources:
                  - "packages/agentplane/src/commands/pr/internal/git-host-identity.ts"
                  - "packages/agentplane/src/commands/pr/branch-publication.ts"
                required_sources:
                  - "packages/agentplane/src/commands/pr/open.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-github.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-gitlab.ts"
                  - "packages/core/src/tasks/task-execution-base.ts"
                symbol_hints:
                  - "tryCreateGithubPr"
                  - "syncPrArtifacts"
                  - "execution.base_ref"
                  - "execution.base_sha"
              depends_on: []
              expected_outputs:
                - "A provider-neutral base resolver used by PR open/update"
                - "Exact matching branch name for provider requests when the frozen base is an OID"
                - "Fail-closed errors for mismatch, ambiguity, or unavailable evidence"
              id: "WI-1"
              objective: "Resolve a provider-compatible base branch for an exact-OID execution base without changing the frozen task execution evidence."
              optional: false
              priority: 100
              required_inputs:
                - "Task execution.base_ref and execution.base_sha"
                - "Configured or current repository base branch"
                - "Live local and provider-visible branch heads"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/pr"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/pr"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts --pool=forks --maxWorkers 1"
                    id: "check-pr-open-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                criteria:
                  -
                    check_ids:
                      - "check-pr-open-focused"
                    description: "Focused PR-open tests prove exact-SHA resolution preserves frozen task execution evidence."
                    id: "WI-1-AC-1"
                    required: true
                  -
                    check_ids:
                      - "check-pr-open-focused"
                    description: "Focused PR-open tests prove mismatch, ambiguity, and missing evidence fail before provider creation."
                    id: "WI-1-AC-2"
                    required: true
                evidence_fingerprint: "sha256:34ac73a306a3f3feef45a1506f659ebb61a5d6210638a7edde66f16a9adbb0f8"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-pr-open-focused"
                    - "check-typecheck"
                  description: "Regression tests prove exact-SHA success and fail-closed mismatch/ambiguity without regressing ordinary branch-base PR creation."
                  id: "WI-2-AC-1"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "packages/agentplane/src/commands/pr/internal/sync-github.test.ts"
                  - "packages/agentplane/src/commands/pr/internal/sync-gitlab.test.ts"
                required_sources:
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                symbol_hints:
                  - "pr open"
                  - "base"
                  - "remote_failed"
                  - "provider base"
              depends_on:
                - "WI-1"
              expected_outputs:
                - "Regression tests for exact-SHA success, mismatch, ambiguity, and ordinary branch bases"
                - "Passing focused PR-open test evidence"
                - "Passing AgentPlane typecheck evidence"
              id: "WI-2"
              objective: "Lock the exact-SHA PR base invariant with regression tests and verify the complete bounded change."
              optional: false
              priority: 90
              required_inputs:
                - "WI-1 provider base resolver"
                - "Existing GitHub and GitLab PR-open test fixtures"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts"
                - "packages/agentplane/src/commands/pr"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts --pool=forks --maxWorkers 1"
                    id: "check-pr-open-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 180000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "structural"
                    required: true
                    timeout_ms: 180000
                criteria:
                  -
                    check_ids:
                      - "check-pr-open-focused"
                      - "check-typecheck"
                    description: "All focused PR-open tests and repository typecheck pass."
                    id: "WI-2-AC-1"
                    required: true
                evidence_fingerprint: "sha256:e1467fd6b9924d45f1c07b2a2823834b280f0dd8dc43df494c8a113d25be6ba5"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608252330-9RCWZQ"
    event_cursor: 0
    final_validation: null
    id: "202608252330-9RCWZQ"
    intent:
      acceptance_criteria: []
      captured_at: "2026-08-25T23:30:32.161Z"
      constraints: []
      request: |-
        Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch

        Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.
      task_id: "202608252330-9RCWZQ"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-26T01:59:47.289Z"
    work_items:
      WI-1:
        attempt: 0
        claim_id: null
        id: "WI-1"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      WI-2:
        attempt: 0
        claim_id: null
        id: "WI-2"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
  task_execution_context:
    base_ref: "main"
    base_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "8ea1cefbbc96a8da5595fce36325ec0c1194a360"
    version: 1
id_source: "generated"
---
## Summary

Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch

Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.

## Scope

- In scope: Release blocker for 202608252234-4CKSWA. Symptom: AgentPlane pr open publishes the exact candidate branch, then GitHub PR creation fails because task execution.base_ref is the frozen 40-hex SHA and is passed as the provider base field; retries then diverge on AgentPlane-owned remote_failed metadata. Violated invariant: an exact-SHA-frozen branch_pr release Task must preserve base_sha evidence while resolving a real provider base branch for hosted PR creation. Root cause: packages/agentplane/src/commands/pr/open.ts passes execution.base_ref directly into PR sync, and sync-github.ts sends it as GitHub base without resolving an equivalent protected branch. Implement the smallest provider-neutral safe fix: when base_ref is a commit OID, resolve a unique configured/current protected base branch whose exact head equals the frozen base_sha; fail closed on mismatch or ambiguity. Preserve execution.base_ref/base_sha and candidate contents. Add regression tests for exact-SHA success and mismatch/ambiguity failure. Verify PR-open unit/network tests and required focused checks. Integrate normally, then resume 202608252234-4CKSWA.
- Out of scope: unrelated refactors not required for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch".

## Plan

Prepared a bounded branch_pr plan to preserve the frozen execution base while resolving an exact matching provider base branch for hosted PR creation, with fail-closed mismatch behavior and focused regressions.

## Verify Steps

PLANNER fallback scaffold for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow exact-SHA release tasks to open hosted PRs against the matching protected base branch". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
