---
id: "202608201524-TRM5DT"
title: "Implement provider-neutral GitHub and GitLab change-request lifecycle"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "backend"
  - "github"
  - "gitlab"
  - "provider"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "credentials"
  - "security"
  - "external_system"
blueprint_request: "code.branch_pr"
verify:
  - "agentplane doctor"
  - "bun run lint:core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-20T15:38:27.925Z"
  updated_by: "USER"
  note: "User explicitly approved plan in Codex task on 2026-08-20."
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
    - "effect_public_api"
    - "effect_schema"
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
      - "schema"
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
      - "dependencies"
      - "ci"
      - "release_metadata"
    writable_roots:
      - "docs/user"
      - "docs/workflow-guides"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/commands/task/hosted-merge-sync"
      - "packages/core/schemas"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/workflow"
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "Implementation and fixture verification are local-only; glab authentication remains user-owned and no provider or credential mutation is authorized."
      - "The feature crosses public metadata, provider routing, CLI transport, hosted checks, merge, recovery, tests, and documentation, so the listed roots are the minimal coherent lifecycle scope."
      - "The user explicitly approved an isolated branch implementation and the repository requires branch_pr worktree isolation."
    repository_effects:
      - "documentation"
      - "public_api"
      - "repository_write"
      - "schema"
      - "security_boundary"
      - "source_code"
      - "tests"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots:
      - "docs/user"
      - "docs/workflow-guides"
      - "packages/agentplane/src/cli"
      - "packages/agentplane/src/commands/pr"
      - "packages/agentplane/src/commands/shared"
      - "packages/agentplane/src/commands/task"
      - "packages/agentplane/src/commands/task/hosted-merge-sync"
      - "packages/core/schemas"
      - "packages/core/src/tasks"
      - "packages/spec/schemas"
      - "schemas"
      - "scripts/workflow"
  observed:
    authority_violations: []
    changed_components: []
    changed_paths: []
    external_effects: []
    repository_effects: []
    verification_results: []
  reason_codes:
    - "agent_preferred_branch_pr"
    - "effect_public_api"
    - "effect_schema"
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
          - "docs/user"
          - "docs/workflow-guides"
          - "packages/agentplane/src/cli"
          - "packages/agentplane/src/commands/pr"
          - "packages/agentplane/src/commands/shared"
          - "packages/agentplane/src/commands/task"
          - "packages/agentplane/src/commands/task/hosted-merge-sync"
          - "packages/core/schemas"
          - "packages/core/src/tasks"
          - "packages/spec/schemas"
          - "schemas"
          - "scripts/workflow"
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:public_api"
          - "repository_effect:repository_write"
          - "repository_effect:schema"
          - "repository_effect:security_boundary"
          - "repository_effect:source_code"
          - "repository_effect:tests"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "public_api"
          - "repository_write"
          - "schema"
          - "security_boundary"
          - "source_code"
          - "tests"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:bfced7e5ef215fcee9322b440703736808db126cc2db01c2e93fa5b50496f8a1"
      escalation_reasons:
        - "central_component:packages/core/schemas"
        - "central_component:packages/core/src/tasks"
        - "effect_public_api"
        - "effect_schema"
        - "effect_security_boundary"
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
      - "repository_effect:schema"
      - "repository_effect:security_boundary"
      - "repository_effect:source_code"
      - "repository_effect:tests"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Recovery: retire the stale blocked external-agent exchange after completed implementation and verification evidence were produced."
events:
  -
    type: "status"
    at: "2026-08-20T16:09:36.533Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "comment"
    at: "2026-08-20T17:30:50.337Z"
    author: "CODER"
    body: "Recovery: retire the stale blocked external-agent exchange after completed implementation and verification evidence were produced."
doc_version: 3
doc_updated_at: "2026-08-20T17:30:50.337Z"
doc_updated_by: "CODER"
description: "Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests."
sections:
  Summary: |-
    Implement provider-neutral GitHub and GitLab change-request lifecycle

    Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests.
  Scope: |-
    - In scope: Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests.
    - Out of scope: unrelated refactors not required for "Implement provider-neutral GitHub and GitLab change-request lifecycle".
  Plan: "Implement GitHub/GitLab support as one provider-neutral change-request lifecycle in branch_pr isolation. First extract the shared repository identity, authenticated CLI transport, normalized change-request observation, and provider registry while keeping the existing GitHub adapter behavior-compatible. Then add a GitLab adapter backed by external glab authentication and explicit glab api calls, resolving host and project from the actual publication remote and never reading, storing, or initiating credentials. Migrate PR metadata and artifacts compatibly, route open/update/check/head/merge/conflict/reconciliation through the provider contract, preserve exact-head and effect-journal safety, add focused fixtures for GitLab.com/self-managed/fork/error/recovery cases, update user documentation, and run targeted plus full regression gates. No live provider writes or credential changes are part of implementation verification; real hosted qualification remains a separately authorized release gate."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "292b232b3160b22c47c6cc206fade625e9377fed"
    version: 1
id_source: "generated"
---
## Summary

Implement provider-neutral GitHub and GitLab change-request lifecycle

Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests.

## Scope

- In scope: Implement universal GitHub/GitLab hosted change-request support in an isolated branch_pr worktree. Preserve current GitHub behavior behind a provider adapter. Resolve provider host/project from the publication Git remote; use existing gh session for GitHub and external glab authentication plus glab api for GitLab without reading or storing tokens. Cover idempotent PR/MR lookup/create/update, normalized metadata, exact-head hosted checks, mergeability and SHA-guarded merge, external-merge reconciliation, typed failures, compatibility migration, docs, and regression/E2E-style CLI fixtures. Do not perform interactive auth, modify credentials, or touch external providers during implementation tests.
- Out of scope: unrelated refactors not required for "Implement provider-neutral GitHub and GitLab change-request lifecycle".

## Plan

Implement GitHub/GitLab support as one provider-neutral change-request lifecycle in branch_pr isolation. First extract the shared repository identity, authenticated CLI transport, normalized change-request observation, and provider registry while keeping the existing GitHub adapter behavior-compatible. Then add a GitLab adapter backed by external glab authentication and explicit glab api calls, resolving host and project from the actual publication remote and never reading, storing, or initiating credentials. Migrate PR metadata and artifacts compatibly, route open/update/check/head/merge/conflict/reconciliation through the provider contract, preserve exact-head and effect-journal safety, add focused fixtures for GitLab.com/self-managed/fork/error/recovery cases, update user documentation, and run targeted plus full regression gates. No live provider writes or credential changes are part of implementation verification; real hosted qualification remains a separately authorized release gate.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/pr packages/agentplane/src/commands/shared/pr-meta.test.ts packages/core/src/tasks/task-artifact-schema.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
