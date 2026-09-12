---
id: "202609121443-YAQJB7"
title: "Fix task-centric scope extension targeting when multiple WorkItems are schedulable"
status: "BLOCKED"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "release-0.7.9"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-09-12T14:45:43.064Z"
  updated_by: "HOST:codex-local:USER"
  note: "host_user_decision=sha256:55f5cba3c72ca16b64309d068780679361851b80e3bef16f957fe1d4ae31e7eb"
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
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Repository policy requires branch_pr integration evidence."
      - "The change is a narrow fail-closed correction to existing scope-extension state and regression coverage."
    repository_effects:
      - "repository_write"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
      - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
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
          - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
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
      digest: "sha256:489a83860cd1be9d497ca3d448d07c76c844653e36b6dfdaba3fad617f50c343"
      escalation_reasons:
        - "central_component:packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
        - "central_component:packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
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
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The exact fix requires the blocker-recording caller to persist the issued WorkItem identity. Recommended action: Approve the narrow source root and reissue the same WorkItem. Requested scope: roots=packages/agentplane/src/commands/task/external-agent-blocked-result.ts; repository effects=unchanged; request digest=sha256:e7e5140dd9db179d8711b0a8b9fb1abad02596a5a967370bd43e914120036a79. Agentplane receipt: external-agent-blocker/tr_c69efe2e1f71998c0b447317040a479e/sha256:ffb4a2c90627671de05689115a1f8bcfcc90f14b756db6b552fcd39a933687d1/sha256:e7e5140dd9db179d8711b0a8b9fb1abad02596a5a967370bd43e914120036a79."
events:
  -
    type: "status"
    at: "2026-09-12T14:45:48.517Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-09-12T14:46:40.701Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The exact fix requires the blocker-recording caller to persist the issued WorkItem identity. Recommended action: Approve the narrow source root and reissue the same WorkItem. Requested scope: roots=packages/agentplane/src/commands/task/external-agent-blocked-result.ts; repository effects=unchanged; request digest=sha256:e7e5140dd9db179d8711b0a8b9fb1abad02596a5a967370bd43e914120036a79. Agentplane receipt: external-agent-blocker/tr_c69efe2e1f71998c0b447317040a479e/sha256:ffb4a2c90627671de05689115a1f8bcfcc90f14b756db6b552fcd39a933687d1/sha256:e7e5140dd9db179d8711b0a8b9fb1abad02596a5a967370bd43e914120036a79."
doc_version: 3
doc_updated_at: "2026-09-12T14:46:40.701Z"
doc_updated_by: "SUPERVISOR"
description: "When a blocked external semantic result requests a repository scope extension, persist and use the blocked WorkItem identity so the exact USER-approved extension updates that WorkItem even when other independent WorkItems are schedulable. Preserve fail-closed state binding and add regression coverage. This is required to unblock task 202609121423-9WPTCW."
sections:
  Summary: |-
    Fix task-centric scope extension targeting when multiple WorkItems are schedulable

    When a blocked external semantic result requests a repository scope extension, persist and use the blocked WorkItem identity so the exact USER-approved extension updates that WorkItem even when other independent WorkItems are schedulable. Preserve fail-closed state binding and add regression coverage. This is required to unblock task 202609121423-9WPTCW.
  Scope: |-
    - In scope: When a blocked external semantic result requests a repository scope extension, persist and use the blocked WorkItem identity so the exact USER-approved extension updates that WorkItem even when other independent WorkItems are schedulable. Preserve fail-closed state binding and add regression coverage. This is required to unblock task 202609121423-9WPTCW.
    - Out of scope: unrelated refactors not required for "Fix task-centric scope extension targeting when multiple WorkItems are schedulable".
  Plan: "Prepared one bounded regression-fix WorkItem."
  Verify Steps: |-
    1. Run `bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts`; require a nonzero passing count and coverage for multiple ready WorkItems targeting the exact blocked WorkItem.
    2. Run `bun run typecheck`; require success.
    3. Review the final diff and `git status --short --untracked-files=all`; require only approved implementation, test, and task artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  agentplane.execution_grant:
    actor: "HOST:codex-local:USER"
    approval_evidence_digest: "sha256:55f5cba3c72ca16b64309d068780679361851b80e3bef16f957fe1d4ae31e7eb"
    approval_kind: "host_user_decision"
    capabilities:
      - "provider.merge"
      - "provider.pr"
      - "repository.integrate"
      - "repository.write"
      - "task.lifecycle"
      - "task.scope.extend"
    completion_contract_digest: "sha256:a18e1366f802e14001cd307a12aee83912fec47feade8d43d32d55353fdc8510"
    digest: "sha256:2046212c16eda916a1ebdbc72a1942a7f6d0ebf9d625e55bcce58d05aecb4e83"
    grant_id: "ccf44f79-6091-4a37-bb31-766054561a1f"
    issued_at: "2026-09-12T14:45:43.064Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:2b77d797ac8fd067a420e0a305a7d3aa61a1d97e649f3a61741f4566a5ac66e6"
    plan_revision: 3
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:65f818387fe18e2395974d2c9ba0010295d3db8f70b3a9a513cccae132b1d575"
    status: "active"
    task_id: "202609121443-YAQJB7"
  agentplane.scope_extension_request:
    blocker_state_fingerprint: "sha256:ffb4a2c90627671de05689115a1f8bcfcc90f14b756db6b552fcd39a933687d1"
    kind: "task_scope_extension_request"
    request:
      rationale: "The blocker-recording caller must pass the issued WorkItem identity into the persisted scope-extension request."
      repository_effects: []
      schema_version: 1
      scope_roots:
        - "packages/agentplane/src/commands/task/external-agent-blocked-result.ts"
    request_digest: "sha256:e7e5140dd9db179d8711b0a8b9fb1abad02596a5a967370bd43e914120036a79"
    schema_version: 1
    status: "pending"
    transition_id: "tr_c69efe2e1f71998c0b447317040a479e"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-09-12T14:45:43.064Z"
        approved_by: "HOST:codex-local:USER"
        approved_digest: "sha256:902469a2081b619f7f5bd68820784cc0e5763da2e73ceb216ed9560fa7d81ac3"
        policy_facts:
          - "host_user_decision"
        state: "approved"
      created_at: "2026-09-12T14:44:48.685Z"
      digest: "sha256:902469a2081b619f7f5bd68820784cc0e5763da2e73ceb216ed9560fa7d81ac3"
      proposal:
        assumptions: []
        planning_baseline:
          captured_at: "2026-09-12T14:44:01.387Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:b7f5ab7637d35903349a44d115b0218299b4eecf707e150564235857e5ad5e6f"
          dirty_paths:
            - ".agentplane/tasks/202609072121-9VEHKH/README.md"
            - ".agentplane/tasks/202609080727-BAWTEE/README.md"
            - ".agentplane/tasks/202609121424-3YAX44/README.md"
            - ".agentplane/tasks/202609121424-49XXT3/README.md"
            - ".agentplane/tasks/202609121424-4BC7B3/README.md"
            - ".agentplane/tasks/202609121424-T83XJA/README.md"
            - ".agentplane/tasks/202609121424-ZEJ656/README.md"
            - ".agentplane/tasks/202609121443-YAQJB7/README.md"
            - "agentplane-roadmap-r2/AGENT-START.md"
            - "agentplane-roadmap-r2/EXECUTION-CHARTER.md"
            - "agentplane-roadmap-r2/README.md"
            - "agentplane-roadmap-r2/agentplane-0.7.9-0.7.14-roadmap-r2.md"
            - "agentplane-roadmap-r2/checksums.json"
            - "agentplane-roadmap-r2/coverage-and-gap-audit.md"
            - "agentplane-roadmap-r2/coverage-map.json"
            - "agentplane-roadmap-r2/dependency-graph.json"
            - "agentplane-roadmap-r2/experiment-requirements.json"
            - "agentplane-roadmap-r2/releases/0.7.10.md"
            - "agentplane-roadmap-r2/releases/0.7.11.md"
            - "agentplane-roadmap-r2/releases/0.7.12.md"
            - "agentplane-roadmap-r2/releases/0.7.13.md"
            - "agentplane-roadmap-r2/releases/0.7.14.md"
            - "agentplane-roadmap-r2/releases/0.7.9.md"
            - "agentplane-roadmap-r2/source-evidence.json"
            - "agentplane-roadmap-r2/tasks.json"
            - "agentplane-roadmap-r2/tasks/BP-01.md"
            - "agentplane-roadmap-r2/tasks/BP-02.md"
            - "agentplane-roadmap-r2/tasks/BP-03.md"
            - "agentplane-roadmap-r2/tasks/BP-04.md"
            - "agentplane-roadmap-r2/tasks/BP-05.md"
            - "agentplane-roadmap-r2/tasks/BP-06.md"
            - "agentplane-roadmap-r2/tasks/BP-07.md"
            - "agentplane-roadmap-r2/tasks/BP-08.md"
            - "agentplane-roadmap-r2/tasks/BP-09.md"
            - "agentplane-roadmap-r2/tasks/BP-10.md"
            - "agentplane-roadmap-r2/tasks/BP-11.md"
            - "agentplane-roadmap-r2/tasks/BP-12.md"
            - "agentplane-roadmap-r2/tasks/BP-13.md"
            - "agentplane-roadmap-r2/tasks/BP-14.md"
            - "agentplane-roadmap-r2/tasks/BP-15.md"
            - "agentplane-roadmap-r2/tasks/BP-16.md"
            - "agentplane-roadmap-r2/tasks/BP-17.md"
            - "agentplane-roadmap-r2/tasks/BP-18.md"
            - "agentplane-roadmap-r2/tasks/BP-19.md"
            - "agentplane-roadmap-r2/tasks/BP-20.md"
            - "agentplane-roadmap-r2/tasks/BP-21.md"
            - "agentplane-roadmap-r2/tasks/BP-22.md"
            - "agentplane-roadmap-r2/tasks/BP-23.md"
            - "agentplane-roadmap-r2/tasks/BP-24.md"
            - "agentplane-roadmap-r2/tasks/BP-25.md"
            - "agentplane-roadmap-r2/tasks/BP-26.md"
            - "agentplane-roadmap-r2/tasks/BP-27.md"
            - "agentplane-roadmap-r2/tasks/BP-28.md"
            - "agentplane-roadmap-r2/tasks/BP-29.md"
            - "agentplane-roadmap-r2/tasks/BP-30.md"
            - "agentplane-roadmap-r2/tasks/BP-31.md"
            - "agentplane-roadmap-r2/tasks/EV-01.md"
            - "agentplane-roadmap-r2/tasks/EV-02.md"
            - "agentplane-roadmap-r2/tasks/EV-03.md"
            - "agentplane-roadmap-r2/tasks/EV-04.md"
            - "agentplane-roadmap-r2/tasks/EV-05.md"
            - "agentplane-roadmap-r2/tasks/EV-06.md"
            - "agentplane-roadmap-r2/tasks/EV-07.md"
            - "agentplane-roadmap-r2/tasks/EV-08.md"
            - "agentplane-roadmap-r2/tasks/EV-09.md"
            - "agentplane-roadmap-r2/tasks/EV-10.md"
            - "agentplane-roadmap-r2/tasks/EV-11.md"
            - "agentplane-roadmap-r2/tasks/EV-12.md"
            - "agentplane-roadmap-r2/tasks/EV-13.md"
            - "agentplane-roadmap-r2/tasks/LC-01.md"
            - "agentplane-roadmap-r2/tasks/LC-02.md"
            - "agentplane-roadmap-r2/tasks/LC-03.md"
            - "agentplane-roadmap-r2/tasks/LC-04.md"
            - "agentplane-roadmap-r2/tasks/LC-05.md"
            - "agentplane-roadmap-r2/tasks/LC-06.md"
            - "agentplane-roadmap-r2/tasks/LC-07.md"
            - "agentplane-roadmap-r2/tasks/LC-08.md"
            - "agentplane-roadmap-r2/tasks/LC-09.md"
            - "agentplane-roadmap-r2/tasks/LC-10.md"
            - "agentplane-roadmap-r2/tasks/LC-11.md"
            - "agentplane-roadmap-r2/tasks/LC-12.md"
            - "agentplane-roadmap-r2/tasks/LC-13.md"
            - "agentplane-roadmap-r2/tasks/LC-14.md"
            - "agentplane-roadmap-r2/tasks/LC-15.md"
            - "agentplane-roadmap-r2/tasks/LC-16.md"
            - "agentplane-roadmap-r2/tasks/LC-17.md"
            - "agentplane-roadmap-r2/tasks/LC-18.md"
            - "agentplane-roadmap-r2/tasks/LC-19.md"
            - "agentplane-roadmap-r2/tasks/LC-20.md"
            - "agentplane-roadmap-r2/tasks/LC-21.md"
            - "agentplane-roadmap-r2/tasks/LC-22.md"
            - "agentplane-roadmap-r2/tasks/LC-23.md"
            - "agentplane-roadmap-r2/tasks/PL-01.md"
            - "agentplane-roadmap-r2/tasks/PL-02.md"
            - "agentplane-roadmap-r2/tasks/PL-03.md"
            - "agentplane-roadmap-r2/tasks/PL-04.md"
            - "agentplane-roadmap-r2/tasks/PL-05.md"
            - "agentplane-roadmap-r2/tasks/PL-06.md"
            - "agentplane-roadmap-r2/tasks/PL-07.md"
            - "agentplane-roadmap-r2/tasks/PL-08.md"
            - "agentplane-roadmap-r2/tasks/PL-09.md"
            - "agentplane-roadmap-r2/tasks/PL-10.md"
            - "agentplane-roadmap-r2/tasks/PL-11.md"
            - "agentplane-roadmap-r2/tasks/PL-12.md"
            - "agentplane-roadmap-r2/tasks/RC-01.md"
            - "agentplane-roadmap-r2/tasks/RC-02.md"
            - "agentplane-roadmap-r2/tasks/RC-03.md"
            - "agentplane-roadmap-r2/tasks/RC-04.md"
            - "agentplane-roadmap-r2/tasks/RC-05.md"
            - "agentplane-roadmap-r2/tasks/RC-06.md"
            - "agentplane-roadmap-r2/tasks/RC-07.md"
            - "agentplane-roadmap-r2/tasks/RC-08.md"
            - "agentplane-roadmap-r2/tasks/RC-09.md"
            - "agentplane-roadmap-r2/tasks/RC-10.md"
            - "agentplane-roadmap-r2/tasks/RC-11.md"
            - "agentplane-roadmap-r2/tasks/RC-12.md"
            - "agentplane-roadmap-r2/tasks/RC-13.md"
            - "agentplane-roadmap-r2/tasks/RC-14.md"
            - "agentplane-roadmap-r2/tasks/RC-15.md"
            - "agentplane-roadmap-r2/tasks/RC-16.md"
            - "agentplane-roadmap-r2/tasks/RC-17.md"
            - "agentplane-roadmap-r2/tasks/RC-18.md"
            - "agentplane-roadmap-r2/tasks/ST-01.md"
            - "agentplane-roadmap-r2/tasks/ST-02.md"
            - "agentplane-roadmap-r2/tasks/ST-03.md"
            - "agentplane-roadmap-r2/tasks/ST-04.md"
            - "agentplane-roadmap-r2/tasks/ST-05.md"
            - "agentplane-roadmap-r2/tasks/ST-06.md"
            - "agentplane-roadmap-r2/tasks/ST-07.md"
            - "agentplane-roadmap-r2/tasks/ST-08.md"
            - "agentplane-roadmap-r2/tasks/ST-09.md"
            - "agentplane-roadmap-r2/tasks/ST-10.md"
            - "agentplane-roadmap-r2/tasks/ST-11.md"
            - "agentplane-roadmap-r2/tasks/ST-12.md"
            - "agentplane-roadmap-r2/tasks/ST-13.md"
            - "agentplane-roadmap-r2/tasks/ST-14.md"
            - "agentplane-roadmap-r2/tasks/ST-15.md"
            - "agentplane-roadmap-r2/tasks/ST-16.md"
            - "agentplane-roadmap-r2/tasks/ST-17.md"
            - "agentplane-roadmap-r2/tasks/ST-18.md"
            - "agentplane-roadmap-r2/tasks/ST-19.md"
            - "agentplane-roadmap-r2/tasks/ST-20.md"
            - "agentplane-roadmap-r2/tasks/ST-21.md"
            - "agentplane-roadmap-r2/validate_roadmap.py"
            - "agentplane-roadmap-r2/validation-report.json"
          git:
            kind: "commit"
            ref: null
            sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202609121443-YAQJB7"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              id: "check-focused"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "check-typecheck"
              kind: "deterministic"
              required: true
              timeout_ms: 300000
          criteria:
            -
              check_ids:
                - "check-focused"
              description: "A blocked WorkItem scope extension updates that exact WorkItem when independent WorkItems are also schedulable, while stale or mismatched authority still fails closed."
              id: "c-target"
              required: true
            -
              check_ids:
                - "check-focused"
                - "check-typecheck"
              description: "The focused scope-extension suites and repository typecheck pass without weakening existing negative cases."
              id: "c-regression"
              required: true
          evidence_fingerprint: "sha256:b7f5ab7637d35903349a44d115b0218299b4eecf707e150564235857e5ad5e6f"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "check-focused"
                  description: "A blocked WorkItem scope extension updates that exact WorkItem when independent WorkItems are also schedulable, while stale or mismatched authority still fails closed."
                  id: "c-target"
                  required: true
                -
                  check_ids:
                    - "check-focused"
                    - "check-typecheck"
                  description: "The focused scope-extension suites and repository typecheck pass without weakening existing negative cases."
                  id: "c-regression"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 220000
                optional_sources:
                  - "packages/core/src/tasks/task-centric"
                required_sources:
                  - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                  - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                symbol_hints:
                  - "TaskScopeExtensionRequestState"
                  - "extendTaskCentricWorkItemScope"
                  - "applyApprovedTaskScopeExtension"
              depends_on: []
              expected_outputs:
                - "targeted-scope-extension"
              id: "WI-01"
              objective: "Bind an approved task-centric scope extension to the blocked WorkItem and cover parallel-ready scheduling."
              optional: false
              priority: 100
              required_inputs: []
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.test.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              risk: "medium"
              scope_roots:
                - "packages/agentplane/src/commands/shared/task-scope-extension-request.ts"
                - "packages/agentplane/src/commands/task/scope-extend.test.ts"
                - "packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
                    id: "check-focused"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "check-typecheck"
                    kind: "deterministic"
                    required: true
                    timeout_ms: 300000
                criteria:
                  -
                    check_ids:
                      - "check-focused"
                    description: "A blocked WorkItem scope extension updates that exact WorkItem when independent WorkItems are also schedulable, while stale or mismatched authority still fails closed."
                    id: "c-target"
                    required: true
                  -
                    check_ids:
                      - "check-focused"
                      - "check-typecheck"
                    description: "The focused scope-extension suites and repository typecheck pass without weakening existing negative cases."
                    id: "c-regression"
                    required: true
                evidence_fingerprint: "sha256:b7f5ab7637d35903349a44d115b0218299b4eecf707e150564235857e5ad5e6f"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202609121443-YAQJB7"
    event_cursor: 5
    final_validation: null
    id: "202609121443-YAQJB7"
    intent:
      acceptance_criteria:
        -
          check_ids: []
          description: "bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts"
          id: "legacy-1"
          required: true
        -
          check_ids: []
          description: "bun run typecheck"
          id: "legacy-2"
          required: true
      captured_at: "2026-09-12T14:43:56.773Z"
      constraints: []
      request: |-
        Fix task-centric scope extension targeting when multiple WorkItems are schedulable

        When a blocked external semantic result requests a repository scope extension, persist and use the blocked WorkItem identity so the exact USER-approved extension updates that WorkItem even when other independent WorkItems are schedulable. Preserve fail-closed state binding and add regression coverage. This is required to unblock task 202609121423-9WPTCW.
      task_id: "202609121443-YAQJB7"
    lifecycle: "BLOCKED"
    plan_amendments: []
    plan_history: []
    revision: 7
    schema_version: 1
    updated_at: "2026-09-12T14:46:40.701Z"
    work_items:
      WI-01:
        attempt: 0
        claim_id: null
        id: "WI-01"
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
      compatibility:sha256:0c9b4c5b829d4959eb635355bfa2d87c79614219c68fa511e6cd5305df0455a8:
        aggregate_digest: "sha256:e508b49a273440ba92d61bc9a885f3262a0155d90bd50859e0b841de8d769f19"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:45:19.837Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_df557ec0a823563a61551ccc"
          mutation_id: "compatibility:sha256:0c9b4c5b829d4959eb635355bfa2d87c79614219c68fa511e6cd5305df0455a8"
          plan_digest: "sha256:902469a2081b619f7f5bd68820784cc0e5763da2e73ceb216ed9560fa7d81ac3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121443-YAQJB7"
          task_revision: 2
          to: "AWAITING_PLAN_APPROVAL"
          work_item_id: null
        mutation_id: "compatibility:sha256:0c9b4c5b829d4959eb635355bfa2d87c79614219c68fa511e6cd5305df0455a8"
        next_revision: 3
        previous_revision: 2
        schema_version: 1
        task_id: "202609121443-YAQJB7"
      compatibility:sha256:189aed61a611d0481f06e1a1c728d17f1520cbfd815a8c08836bb6ed7ba2df15:
        aggregate_digest: "sha256:c4a7b04233fd7a1929199eaf2c3e4b8789a3592f434f9fff3f1072ec7bf75f31"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:45:48.517Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_c2bf9edd7a2b81f1280d2256"
          mutation_id: "compatibility:sha256:189aed61a611d0481f06e1a1c728d17f1520cbfd815a8c08836bb6ed7ba2df15"
          plan_digest: "sha256:902469a2081b619f7f5bd68820784cc0e5763da2e73ceb216ed9560fa7d81ac3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121443-YAQJB7"
          task_revision: 4
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:189aed61a611d0481f06e1a1c728d17f1520cbfd815a8c08836bb6ed7ba2df15"
        next_revision: 5
        previous_revision: 4
        schema_version: 1
        task_id: "202609121443-YAQJB7"
      compatibility:sha256:4482eafdcc2521432742af05de984346ba75152e6bd3e1b56f55e8c301c14586:
        aggregate_digest: "sha256:85ab4fbe0b62342ff1076adfb3cf0273f52fe24de241865425b5503f18b07695"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:45:19.838Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "AWAITING_PLAN_APPROVAL"
          id: "event_a5258c4b199ea8e90ad8fda3"
          mutation_id: "compatibility:sha256:4482eafdcc2521432742af05de984346ba75152e6bd3e1b56f55e8c301c14586"
          plan_digest: "sha256:902469a2081b619f7f5bd68820784cc0e5763da2e73ceb216ed9560fa7d81ac3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121443-YAQJB7"
          task_revision: 3
          to: "ACTIVE"
          work_item_id: null
        mutation_id: "compatibility:sha256:4482eafdcc2521432742af05de984346ba75152e6bd3e1b56f55e8c301c14586"
        next_revision: 4
        previous_revision: 3
        schema_version: 1
        task_id: "202609121443-YAQJB7"
      compatibility:sha256:52a806b138798fefaee3b66abd447685c6d51e274cadc77ecd13bfa3c9836c5a:
        aggregate_digest: "sha256:96f2748316625ce0c261c364f22ec32969f2aa228133fb84a0534775780d688b"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:46:40.701Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "ACTIVE"
          id: "event_d147ec9987c1133dcad91d58"
          mutation_id: "compatibility:sha256:52a806b138798fefaee3b66abd447685c6d51e274cadc77ecd13bfa3c9836c5a"
          plan_digest: "sha256:902469a2081b619f7f5bd68820784cc0e5763da2e73ceb216ed9560fa7d81ac3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121443-YAQJB7"
          task_revision: 5
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:52a806b138798fefaee3b66abd447685c6d51e274cadc77ecd13bfa3c9836c5a"
        next_revision: 6
        previous_revision: 5
        schema_version: 1
        task_id: "202609121443-YAQJB7"
      compatibility:sha256:92998288de34cfa474650885c14381e609ecf17ec1225266b836ca23245a9b65:
        aggregate_digest: "sha256:c1aeaf1785754d8b79d51f0edbb968dedb6b87090c6414e5d271f9bbf9b5c9d5"
        event:
          actor_id: "agentplane"
          at: "2026-09-12T14:46:40.701Z"
          cause_refs:
            - "compatibility_projection_mutation"
          entity: "task"
          from: "BLOCKED"
          id: "event_bdfcee94f4d8b02b5a504aa4"
          mutation_id: "compatibility:sha256:92998288de34cfa474650885c14381e609ecf17ec1225266b836ca23245a9b65"
          plan_digest: "sha256:902469a2081b619f7f5bd68820784cc0e5763da2e73ceb216ed9560fa7d81ac3"
          plan_revision: 1
          repository_fingerprint: null
          schema_version: 1
          task_id: "202609121443-YAQJB7"
          task_revision: 6
          to: "BLOCKED"
          work_item_id: null
        mutation_id: "compatibility:sha256:92998288de34cfa474650885c14381e609ecf17ec1225266b836ca23245a9b65"
        next_revision: 7
        previous_revision: 6
        schema_version: 1
        task_id: "202609121443-YAQJB7"
    pending_effects: []
    retry_budgets: []
    schema_version: 1
  task_execution_context:
    base_ref: "main"
    base_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "f3c1991ddd92943775b6b4b4688009afc3d523bc"
    version: 1
id_source: "generated"
---
## Summary

Fix task-centric scope extension targeting when multiple WorkItems are schedulable

When a blocked external semantic result requests a repository scope extension, persist and use the blocked WorkItem identity so the exact USER-approved extension updates that WorkItem even when other independent WorkItems are schedulable. Preserve fail-closed state binding and add regression coverage. This is required to unblock task 202609121423-9WPTCW.

## Scope

- In scope: When a blocked external semantic result requests a repository scope extension, persist and use the blocked WorkItem identity so the exact USER-approved extension updates that WorkItem even when other independent WorkItems are schedulable. Preserve fail-closed state binding and add regression coverage. This is required to unblock task 202609121423-9WPTCW.
- Out of scope: unrelated refactors not required for "Fix task-centric scope extension targeting when multiple WorkItems are schedulable".

## Plan

Prepared one bounded regression-fix WorkItem.

## Verify Steps

1. Run `bun run test:project cli-core --maxWorkers=1 packages/agentplane/src/commands/task/scope-extend.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.blocked-result.test.ts`; require a nonzero passing count and coverage for multiple ready WorkItems targeting the exact blocked WorkItem.
2. Run `bun run typecheck`; require success.
3. Review the final diff and `git status --short --untracked-files=all`; require only approved implementation, test, and task artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
