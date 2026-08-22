---
id: "202608220538-SVC324"
title: "Resolve task autonomy and evaluator rework incidents"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "task-centric"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lint:core"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-22T05:45:07.056Z"
  updated_by: "USER"
  note: "Approved under the user's confirmed implementation-and-patch-release goal; host_user_decision packet omitted required host identifiers."
verification:
  state: "pending"
  updated_at: "2026-08-22T05:50:58.789Z"
  updated_by: "USER"
  note: "Invalidated by USER-approved execution scope extension."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_security_boundary"
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
execution_contract:
  authority:
    allowed_external_effects: []
    allowed_repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "security_boundary"
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
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - ".agentplane/policy/incidents.md"
      - "docs/developer/incident-archive.mdx"
      - "packages/agentplane/assets/policy/incidents.md"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "USER-approved blocked-result scope extension: roots=.agentplane/policy/incidents.md,docs/developer/incident-archive.mdx,packages/agentplane/assets/policy/incidents.md,packages/agentplane/src/commands/shared,packages/agentplane/src/commands/task,packages/core/src/tasks; repository_effects=documentation,public_api,security_boundary,tests"
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - ".agentplane/policy/incidents.md"
      - "docs/developer/incident-archive.mdx"
      - "packages/agentplane/assets/policy/incidents.md"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/core/src/tasks"
  observed:
    authority_violations: []
    changed_components:
      - ".agentplane"
      - "docs"
      - "packages/agentplane"
      - "packages/core"
    changed_paths:
      - ".agentplane/policy/incidents.md"
      - "docs/developer/incident-archive.mdx"
      - "packages/agentplane/assets/policy/incidents.md"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
      - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
      - "packages/agentplane/src/commands/shared/route-decision-verification.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
      - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.test.ts"
      - "packages/agentplane/src/commands/task/scope-extend.ts"
      - "packages/agentplane/src/commands/task/supervision-outcome-disposition.test.ts"
      - "packages/agentplane/src/commands/task/supervision-outcome-disposition.ts"
      - "packages/core/src/tasks/index.ts"
      - "packages/core/src/tasks/plan-execution-grant.test.ts"
      - "packages/core/src/tasks/plan-execution-grant.ts"
    external_effects: []
    repository_effects:
      - "documentation"
      - "repository_write"
      - "source_code"
      - "tests"
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_security_boundary"
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
          - ".agentplane/policy/incidents.md"
          - "docs/developer/incident-archive.mdx"
          - "packages/agentplane/assets/policy/incidents.md"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/core/src/tasks"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:c9282fc95d4168a413ddde11186a8c7c9520641dd5d28d18bd2ff20830aee850"
      escalation_reasons:
        - "central_component:packages/core/src/tasks"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-blockers.ts"
        - "central_path:packages/agentplane/src/commands/shared/route-decision-verification.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-factory.ts"
        - "central_path:packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
        - "central_path:packages/core/src/tasks/index.ts"
        - "central_path:packages/core/src/tasks/plan-execution-grant.test.ts"
        - "central_path:packages/core/src/tasks/plan-execution-grant.ts"
        - "effect_public_api"
        - "effect_security_boundary"
      execution_groups:
        - "docs-schema"
        - "core"
        - "runtime"
        - "cli"
      observed:
        changed_components:
          - ".agentplane"
          - "docs"
          - "packages/agentplane"
          - "packages/core"
        changed_files:
          - ".agentplane/policy/incidents.md"
          - "docs/developer/incident-archive.mdx"
          - "packages/agentplane/assets/policy/incidents.md"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.quality-review.test.ts"
          - "packages/agentplane/src/commands/shared/route-decision-blockers.ts"
          - "packages/agentplane/src/commands/shared/route-decision-verification.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-factory.ts"
          - "packages/agentplane/src/commands/shared/workflow-step-quality.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.test.ts"
          - "packages/agentplane/src/commands/task/scope-extend.ts"
          - "packages/agentplane/src/commands/task/supervision-outcome-disposition.test.ts"
          - "packages/agentplane/src/commands/task/supervision-outcome-disposition.ts"
          - "packages/core/src/tasks/index.ts"
          - "packages/core/src/tasks/plan-execution-grant.test.ts"
          - "packages/core/src/tasks/plan-execution-grant.ts"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
          - "source_code"
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
        - "docs_contract"
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
      - "repository_effect:documentation"
      - "repository_effect:public_api"
      - "repository_effect:repository_write"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit:
  hash: "2c0c9c4fabdf7dd0e68b8bf5c5c4d12373b52cd1"
  message: "🚧 SVC324 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Blocked: external EXECUTOR could not complete the scoped implementation. The issued execution contract is narrower than the approved plan and must be extended before implementation can satisfy its required tests, public API, documentation, and incident-policy outputs. Recommended action: Approve the exact structured scope extension, derive a scope-rebased execution grant, and issue a fresh EXECUTOR packet. Requested scope: roots=.agentplane/policy/incidents.md,docs/developer/incident-archive.mdx,packages/agentplane/assets/policy/incidents.md,packages/agentplane/src/commands/shared,packages/agentplane/src/commands/task,packages/core/src/tasks; repository effects=documentation,public_api,security_boundary,tests; request digest=sha256:1baafcb9e58c2e99e9d50028bddcdd8d74a3b4d5b791ceed89b19c9208da33bd. Agentplane receipt: external-agent-blocker/tr_5fa7a6ec27b081d4a596594955e7531b/sha256:eb7e3e6cefa452d7220b4e819973a94a99f1542ac4024d8c9883bacdc688d4a9/sha256:1baafcb9e58c2e99e9d50028bddcdd8d74a3b4d5b791ceed89b19c9208da33bd."
  -
    author: "USER"
    body: "Approved state-bound execution scope extension: .agentplane/policy/incidents.md, docs/developer/incident-archive.mdx, packages/agentplane/assets/policy/incidents.md, packages/agentplane/src/commands/shared, packages/agentplane/src/commands/task, packages/core/src/tasks; repository effects: documentation, public_api, security_boundary, tests."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 2c0c9c4fabdf. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-22T05:45:28.533Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-22T05:50:15.823Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "BLOCKED"
    note: "Blocked: external EXECUTOR could not complete the scoped implementation. The issued execution contract is narrower than the approved plan and must be extended before implementation can satisfy its required tests, public API, documentation, and incident-policy outputs. Recommended action: Approve the exact structured scope extension, derive a scope-rebased execution grant, and issue a fresh EXECUTOR packet. Requested scope: roots=.agentplane/policy/incidents.md,docs/developer/incident-archive.mdx,packages/agentplane/assets/policy/incidents.md,packages/agentplane/src/commands/shared,packages/agentplane/src/commands/task,packages/core/src/tasks; repository effects=documentation,public_api,security_boundary,tests; request digest=sha256:1baafcb9e58c2e99e9d50028bddcdd8d74a3b4d5b791ceed89b19c9208da33bd. Agentplane receipt: external-agent-blocker/tr_5fa7a6ec27b081d4a596594955e7531b/sha256:eb7e3e6cefa452d7220b4e819973a94a99f1542ac4024d8c9883bacdc688d4a9/sha256:1baafcb9e58c2e99e9d50028bddcdd8d74a3b4d5b791ceed89b19c9208da33bd."
  -
    type: "status"
    at: "2026-08-22T06:17:00.832Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 2c0c9c4fabdf. CLI accepted one state-bound external-agent semantic result."
    commit: "2c0c9c4fabdf7dd0e68b8bf5c5c4d12373b52cd1"
doc_version: 3
doc_updated_at: "2026-08-22T06:17:00.832Z"
doc_updated_by: "SUPERVISOR"
description: "Implement and test repository fixes for INC-20260821-01 and INC-20260822-01, archive both incidents with exact evidence, and unblock the approved patch release."
sections:
  Summary: |-
    Resolve task autonomy and evaluator rework incidents

    Implement and test repository fixes for INC-20260821-01 and INC-20260822-01, archive both incidents with exact evidence, and unblock the approved patch release.
  Scope: |-
    - In scope: Implement and test repository fixes for INC-20260821-01 and INC-20260822-01, archive both incidents with exact evidence, and unblock the approved patch release.
    - Out of scope: unrelated refactors not required for "Resolve task autonomy and evaluator rework incidents".
  Plan: "Implement scope-rebased execution grants, route repo-fixable evaluator blockers to implementation rework, add focused regression coverage, then archive INC-20260821-01 and INC-20260822-01 with exact evidence."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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
    digest: "sha256:00f4aa9dd0c7d5f1954f9b21793152d8e60cc83c23b6e0a62bf4c87eb9908a51"
    grant_id: "68abc1ea-485b-44be-8f5d-eeac6c2ebeda"
    issued_at: "2026-08-22T05:45:07.056Z"
    kind: "agentplane.execution_grant"
    plan_digest: "sha256:ba1c641bfc1c7757e4081b05fdbd879552c7e08ddc2b60cca8a028b1780ca356"
    plan_revision: 2
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    scope_digest: "sha256:f2597e379e84d7b1cabc5d1fe65f4cdc98cc2387e3b61c1b60d7ce1c79cf0131"
    status: "active"
    task_id: "202608220538-SVC324"
  agentplane.scope_extension_request:
    applied_at: "2026-08-22T05:50:58.789Z"
    applied_by: "USER"
    blocker_state_fingerprint: "sha256:eb7e3e6cefa452d7220b4e819973a94a99f1542ac4024d8c9883bacdc688d4a9"
    kind: "task_scope_extension_request"
    request:
      rationale: "The approved incident fixes require focused regression tests, one core task-authority export, route-decision changes, and synchronized incident documentation that the legacy execution contract omitted."
      repository_effects:
        - "documentation"
        - "public_api"
        - "security_boundary"
        - "tests"
      schema_version: 1
      scope_roots:
        - ".agentplane/policy/incidents.md"
        - "docs/developer/incident-archive.mdx"
        - "packages/agentplane/assets/policy/incidents.md"
        - "packages/agentplane/src/commands/shared"
        - "packages/agentplane/src/commands/task"
        - "packages/core/src/tasks"
    request_digest: "sha256:1baafcb9e58c2e99e9d50028bddcdd8d74a3b4d5b791ceed89b19c9208da33bd"
    schema_version: 1
    status: "applied"
    transition_id: "tr_5fa7a6ec27b081d4a596594955e7531b"
  agentplane.task_centric:
    current_plan:
      approval:
        approved_at: "2026-08-22T05:45:07.056Z"
        approved_by: "USER"
        approved_digest: "sha256:0991c31470ed77c42b09d34f19cda5c42a94b64264836f6cd874d924c7912ddc"
        policy_facts:
          - "manual_operator"
        state: "approved"
      created_at: "2026-08-22T05:43:34.880Z"
      digest: "sha256:0991c31470ed77c42b09d34f19cda5c42a94b64264836f6cd874d924c7912ddc"
      proposal:
        assumptions:
          - "The two incident fixes can share one dedicated branch_pr task because both are required by the same release gate and touch the task supervision authority boundary."
          - "Unrelated untracked task artifacts listed in the planning baseline remain outside this task and must be preserved."
        planning_baseline:
          captured_at: "2026-08-22T05:38:58.729Z"
          config_digest: null
          context_digest: "sha256:890b5e5c75bdf159d4314db2bb015c07f8837e3eddfa3dd65a6b41186d162086"
          digest: "sha256:18137d642aad5856f63b7533129bd7f31ad5f9d0725cd5c0ad2e24fa9df7fab4"
          dirty_paths:
            - ".agentplane/tasks/202608210955-9SX2C6/README.md"
            - ".agentplane/tasks/202608212244-Q3QMJR/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/README.md"
            - ".agentplane/tasks/202608220034-FPEFRK/blueprint/resolved-snapshot.json"
            - ".agentplane/tasks/202608220538-SVC324/README.md"
          git:
            kind: "commit"
            ref: null
            sha: "258015fbf8be6e888dae88d12ad78f2dbcaaf89f"
          policy_digest: null
          schema_version: 1
          task_history_cursor: "task-revision:1"
        schema_version: 1
        task_id: "202608220538-SVC324"
        top_level_validation:
          checks:
            -
              capability: "task.verify"
              command: "bun run typecheck"
              id: "top-level-typecheck"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "bun run lint:core"
              id: "top-level-lint"
              kind: "deterministic"
              required: true
            -
              capability: "task.verify"
              command: "node .agentplane/policy/check-routing.mjs"
              id: "top-level-routing"
              kind: "deterministic"
              required: true
          criteria:
            -
              check_ids:
                - "top-level-typecheck"
                - "top-level-lint"
                - "top-level-routing"
              description: "Both repo fixes, focused regression coverage, policy synchronization, hosted integration, and incident archive evidence are complete."
              id: "incident-fixes-complete"
              required: true
          evidence_fingerprint: "sha256:b4a5f32de256190b6c0eb147938f87eb07c3cedd7a524f65692be8b1aa819137"
          schema_version: 1
        unresolved_questions: []
        work_items:
          schema_version: 1
          work_items:
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "scope-rebased-grant-typecheck"
                    - "scope-rebased-grant-lint"
                  description: "An approved in-grant scope extension produces an active grant for the new scope digest, preserves approval provenance, and rejects completion-contract drift."
                  id: "scope-rebased-grant-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources:
                  - "packages/agentplane/src/commands/task/configured-authority.ts"
                required_sources:
                  - "repository"
                  - ".agentplane/policy/incidents.md"
                  - "packages/core/src/tasks/plan-execution-grant.ts"
                  - "packages/agentplane/src/commands/task/scope-extend.ts"
                symbol_hints:
                  - "createExecutionGrant"
                  - "isExecutionGrantActive"
                  - "extendBlockedTaskExecutionContract"
                  - "activeExecutionGrantForTask"
              depends_on: []
              expected_outputs:
                - "scope-rebased-grant-implementation"
                - "scope-rebased-grant-regression-tests"
              id: "scope-rebased-grant"
              objective: "Derive and persist a scope-rebased execution grant after an approved non-material scope extension while retaining approval provenance and completion-contract binding."
              optional: false
              priority: 3
              required_inputs:
                - "INC-20260821-01"
                - "approved execution grant"
                - "pending scope extension"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/core/src/tasks/plan-execution-grant.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/scope-extend.ts"
              risk: "high"
              scope_roots:
                - "packages/core/src/tasks/plan-execution-grant.ts"
                - "packages/core/src/tasks/plan-execution-grant.test.ts"
                - "packages/agentplane/src/commands/task/scope-extend.ts"
                - "packages/agentplane/src/commands/task/configured-authority.ts"
                - "packages/agentplane/src/commands/task/configured-authority.test.ts"
                - "packages/agentplane/src/commands/task/scope-extend.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "scope-rebased-grant-typecheck"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "scope-rebased-grant-lint"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "scope-rebased-grant-typecheck"
                      - "scope-rebased-grant-lint"
                    description: "An approved in-grant scope extension produces an active grant for the new scope digest, preserves approval provenance, and rejects completion-contract drift."
                    id: "scope-rebased-grant-acceptance"
                    required: true
                evidence_fingerprint: "sha256:79325875bda8853899f20c761a6b0ad666ddf97ac35532669448cce8f1595a43"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "evaluator-rework-typecheck"
                    - "evaluator-rework-lint"
                  description: "A repo-fixable evaluator outcome invalidates stale verification and requests implementation rework; unchanged evaluator evidence cannot create a no-progress loop."
                  id: "evaluator-rework-routing-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 131072
                optional_sources:
                  - "packages/agentplane/src/commands/task/branch-task-supervisor.test.ts"
                  - "packages/agentplane/src/commands/task/direct-task-supervisor.test.ts"
                required_sources:
                  - "repository"
                  - ".agentplane/policy/incidents.md"
                  - "packages/agentplane/src/commands/task/supervision-outcome-disposition.ts"
                  - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
                symbol_hints:
                  - "branchStopOutcome"
                  - "directStopOutcome"
                  - "executeBranchEvaluatorEpisode"
              depends_on: []
              expected_outputs:
                - "evaluator-rework-routing-implementation"
                - "no-progress-loop-regression-tests"
              id: "evaluator-rework-routing"
              objective: "Route repo-fixable evaluator blocked or rework outcomes to a fresh implementation-rework episode without repeating unchanged evaluator episodes."
              optional: false
              priority: 3
              required_inputs:
                - "INC-20260822-01"
                - "supervision outcome disposition"
                - "branch evaluator episode"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/supervision-outcome-disposition.ts"
                -
                  kind: "path"
                  mode: "write"
                  resource: "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
              risk: "high"
              scope_roots:
                - "packages/agentplane/src/commands/task/supervision-outcome-disposition.ts"
                - "packages/agentplane/src/commands/task/supervision-outcome-disposition.test.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor-episodes.ts"
                - "packages/agentplane/src/commands/task/branch-task-supervisor.test.ts"
                - "packages/agentplane/src/commands/task/direct-task-supervisor.ts"
                - "packages/agentplane/src/commands/task/direct-task-supervisor.test.ts"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "bun run typecheck"
                    id: "evaluator-rework-typecheck"
                    kind: "deterministic"
                    required: true
                  -
                    capability: "task.verify"
                    command: "bun run lint:core"
                    id: "evaluator-rework-lint"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "evaluator-rework-typecheck"
                      - "evaluator-rework-lint"
                    description: "A repo-fixable evaluator outcome invalidates stale verification and requests implementation rework; unchanged evaluator evidence cannot create a no-progress loop."
                    id: "evaluator-rework-routing-acceptance"
                    required: true
                evidence_fingerprint: "sha256:e9e0e6807fb1c441cb67cb8a5c78a1bab52410748d05df01b09539941c340515"
                schema_version: 1
            -
              acceptance_criteria:
                -
                  check_ids:
                    - "incident-routing-check"
                  description: "Both incident IDs are absent from the active registry, present in the historical archive with exact fix/test evidence, and policy routing remains valid."
                  id: "incident-closure-acceptance"
                  required: true
              capabilities:
                - "task.verify"
              context:
                max_bytes: 65536
                optional_sources:
                  - "packages/agentplane/assets/policy/incidents.md"
                required_sources:
                  - "repository"
                  - ".agentplane/policy/governance.md"
                  - ".agentplane/policy/incidents.md"
                  - "docs/developer/incident-archive.mdx"
                symbol_hints:
                  - "INC-20260821-01"
                  - "INC-20260822-01"
              depends_on:
                - "scope-rebased-grant"
                - "evaluator-rework-routing"
              expected_outputs:
                - "archived-INC-20260821-01"
                - "archived-INC-20260822-01"
                - "release-gate-unblocked"
              id: "incident-closure"
              objective: "Archive both resolved incidents with implementation and verification evidence and remove them from the active incident registry."
              optional: false
              priority: 2
              required_inputs:
                - "scope-rebased-grant-implementation"
                - "scope-rebased-grant-regression-tests"
                - "evaluator-rework-routing-implementation"
                - "no-progress-loop-regression-tests"
              resource_claims:
                -
                  kind: "path"
                  mode: "write"
                  resource: ".agentplane/policy/incidents.md"
                -
                  kind: "path"
                  mode: "write"
                  resource: "docs/developer/incident-archive.mdx"
              risk: "medium"
              scope_roots:
                - ".agentplane/policy/incidents.md"
                - "packages/agentplane/assets/policy/incidents.md"
                - "docs/developer/incident-archive.mdx"
              validation:
                checks:
                  -
                    capability: "task.verify"
                    command: "node .agentplane/policy/check-routing.mjs"
                    id: "incident-routing-check"
                    kind: "deterministic"
                    required: true
                criteria:
                  -
                    check_ids:
                      - "incident-routing-check"
                    description: "Both incident IDs are absent from the active registry, present in the historical archive with exact fix/test evidence, and policy routing remains valid."
                    id: "incident-closure-acceptance"
                    required: true
                evidence_fingerprint: "sha256:490fdf7d7c0b29c281dfbcecb996488b4e660f6993351e128299112f1e3b11d1"
                schema_version: 1
      revision: 1
      schema_version: 1
      task_id: "202608220538-SVC324"
    event_cursor: 0
    final_validation: null
    id: "202608220538-SVC324"
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
          description: "node .agentplane/policy/check-routing.mjs"
          id: "legacy-3"
          required: true
      captured_at: "2026-08-22T05:38:52.910Z"
      constraints: []
      request: |-
        Resolve task autonomy and evaluator rework incidents

        Implement and test repository fixes for INC-20260821-01 and INC-20260822-01, archive both incidents with exact evidence, and unblock the approved patch release.
      task_id: "202608220538-SVC324"
    lifecycle: "ACTIVE"
    plan_amendments: []
    plan_history: []
    revision: 2
    schema_version: 1
    updated_at: "2026-08-22T05:45:07.056Z"
    work_items:
      evaluator-rework-routing:
        attempt: 0
        claim_id: null
        id: "evaluator-rework-routing"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
      incident-closure:
        attempt: 0
        claim_id: null
        id: "incident-closure"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "PLANNED"
        validation_result: null
      scope-rebased-grant:
        attempt: 0
        claim_id: null
        id: "scope-rebased-grant"
        last_failure: null
        output_manifests: []
        revision: 1
        state: "READY"
        validation_result: null
  implementation_commit:
    hash: "2c0c9c4fabdf7dd0e68b8bf5c5c4d12373b52cd1"
  task_execution_context:
    base_ref: "main"
    base_sha: "258015fbf8be6e888dae88d12ad78f2dbcaaf89f"
    repository_identity: "sha256:da6b1bd36fbd8902ecef3732738a9db0fd8478b8fcbe61ce4ba5a648cdccfd3b"
    schema_version: 1
    source: "creation_checkout"
  workflow_route_baseline:
    start_head_sha: "258015fbf8be6e888dae88d12ad78f2dbcaaf89f"
    version: 1
id_source: "generated"
---
## Summary

Resolve task autonomy and evaluator rework incidents

Implement and test repository fixes for INC-20260821-01 and INC-20260822-01, archive both incidents with exact evidence, and unblock the approved patch release.

## Scope

- In scope: Implement and test repository fixes for INC-20260821-01 and INC-20260822-01, archive both incidents with exact evidence, and unblock the approved patch release.
- Out of scope: unrelated refactors not required for "Resolve task autonomy and evaluator rework incidents".

## Plan

Implement scope-rebased execution grants, route repo-fixable evaluator blockers to implementation rework, add focused regression coverage, then archive INC-20260821-01 and INC-20260822-01 with exact evidence.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
