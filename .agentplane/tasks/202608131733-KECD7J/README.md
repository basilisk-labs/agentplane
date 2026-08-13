---
id: "202608131733-KECD7J"
title: "Archive resolved release incidents before 0.7.6"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202608122156-EZZZYH"
tags:
  - "meta"
  - "policy"
  - "release-blocker"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "bun test packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/release/shared-worktree-dependency-manifest.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-13T17:34:09.620Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the mandatory incident closeout discovered by the already-approved 0.7.6 release preflight."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
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
      - "repository_write"
    forbidden_external_effects:
      - "network_read"
      - "external_write"
      - "credentials"
      - "publish"
      - "deploy"
      - "destructive_git"
    forbidden_repository_effects:
      - "source_code"
      - "tests"
      - "public_api"
      - "schema"
      - "dependencies"
      - "ci"
      - "release_metadata"
      - "security_boundary"
    writable_roots: []
  declaration:
    external_effects: []
    implementation_uncertainty: "bounded"
    preferred_mode: "branch_pr"
    rationale:
      - "legacy structured task fields mapped to the execution contract"
    repository_effects:
      - "documentation"
      - "repository_write"
    requirements_uncertainty: "bounded"
    reversibility: "reversible"
    schema_version: 2
    scope_roots: []
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
  source: "legacy_compatibility"
  verification:
    contract:
      declared:
        components: []
        evidence_requirements:
          - "hosted_integration"
          - "repository_effect:documentation"
          - "repository_effect:repository_write"
          - "task_outcome"
        external_effects: []
        repository_effects:
          - "documentation"
          - "repository_write"
        risk:
          implementation_uncertainty: "bounded"
          requirements_uncertainty: "bounded"
          reversibility: "reversible"
      digest: "sha256:46e8e6a03a4ea4d7c638abdde8e8d6f8967115a665d9e8d5fbfc16cb70848bf3"
      escalation_reasons: []
      execution_groups:
        - "docs-schema"
        - "core"
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
        - "docs_contract"
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
      - "repository_effect:repository_write"
      - "task_outcome"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: archive two resolved release incidents with current enforcement evidence."
events:
  -
    type: "status"
    at: "2026-08-13T17:34:20.507Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: archive two resolved release incidents with current enforcement evidence."
doc_version: 3
doc_updated_at: "2026-08-13T17:34:20.507Z"
doc_updated_by: "CODER"
description: "Review INC-20260810-01 and INC-20260811-01 against their merged fixes and current enforcement tests. If both failure classes are fixed and no active operator work remains, remove them from the active incidents registry and its installed asset mirror, append complete archived records with exact task, commit, test, and enforcement evidence to docs/developer/incident-archive.mdx, run policy routing and focused incident/regression checks, integrate the policy-only change, then unblock release task 202608131730-BHEAQT without changing its sequence or release scope."
sections:
  Summary: |-
    Archive resolved release incidents before 0.7.6

    Review INC-20260810-01 and INC-20260811-01 against their merged fixes and current enforcement tests. If both failure classes are fixed and no active operator work remains, remove them from the active incidents registry and its installed asset mirror, append complete archived records with exact task, commit, test, and enforcement evidence to docs/developer/incident-archive.mdx, run policy routing and focused incident/regression checks, integrate the policy-only change, then unblock release task 202608131730-BHEAQT without changing its sequence or release scope.
  Scope: |-
    - In scope: Review INC-20260810-01 and INC-20260811-01 against their merged fixes and current enforcement tests. If both failure classes are fixed and no active operator work remains, remove them from the active incidents registry and its installed asset mirror, append complete archived records with exact task, commit, test, and enforcement evidence to docs/developer/incident-archive.mdx, run policy routing and focused incident/regression checks, integrate the policy-only change, then unblock release task 202608131730-BHEAQT without changing its sequence or release scope.
    - Out of scope: unrelated refactors not required for "Archive resolved release incidents before 0.7.6".
  Plan: "1. Bind each active incident to its completed fix: W4ZM7J for declared-check validation/execution parity and 7XGP97/T3ZDDM for shared-worktree RF-04 harness reliability. 2. Run the exact focused regressions on current main and inspect hosted/qualification evidence; stop if either failure reproduces. 3. Append full archived records to docs/developer/incident-archive.mdx with state=archived, archived_by, archive_reason, exact tasks/commits/checks, and enforcement. 4. Remove only INC-20260810-01 and INC-20260811-01 from .agentplane/policy/incidents.md and packages/agentplane/assets/policy/incidents.md, preserving active-registry headers and mirror parity. 5. Run focused tests, docs formatting, policy routing, and release:incidents:check; verify the active registry is empty and historical evidence remains complete. 6. Commit, publish, obtain hosted PR verification, integrate through the queue, hosted-close, and AgentPlane cleanup; then resume release task 202608131730-BHEAQT on the new main."
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/release/shared-worktree-dependency-manifest.test.ts. Expected: all tests pass, accepted checks use the execution parser, and RF-04 shared-worktree dependency discovery remains valid.
    2. Inspect W4ZM7J, 7XGP97, T3ZDDM and their merged evidence. Expected: both incident fixes are on main, quality/hosted evidence passed, and no unresolved engineering or operator action remains for either failure class.
    3. Inspect docs/developer/incident-archive.mdx. Expected: both IDs appear exactly once as complete archived records with final evidence, enforcement, archived_by, and archive_reason.
    4. Inspect .agentplane/policy/incidents.md and packages/agentplane/assets/policy/incidents.md. Expected: both active entries are absent, the two mirrors agree, and no unrelated incident text changes.
    5. Run bun run format:check, node .agentplane/policy/check-routing.mjs, and bun run release:incidents:check. Expected: formatting and policy graph pass, active incident count is zero, and 0.7.6 release planning is unblocked.
    6. Inspect the PR, hosted checks, merged main, Hosted Close, cleanup, and git status. Expected: exact policy-only diff is merged through the protected lane, task is DONE, its worktree/branch are cleaned, and no unintended tracked files remain.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the archive commit through a new policy task, restoring both active registry entries and removing their archive records together; rerun focused tests, routing, mirror parity, and the release incident gate."
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "bc0afaea7a7be909fc93374a195c73da3f697d85"
    version: 1
id_source: "generated"
---
## Summary

Archive resolved release incidents before 0.7.6

Review INC-20260810-01 and INC-20260811-01 against their merged fixes and current enforcement tests. If both failure classes are fixed and no active operator work remains, remove them from the active incidents registry and its installed asset mirror, append complete archived records with exact task, commit, test, and enforcement evidence to docs/developer/incident-archive.mdx, run policy routing and focused incident/regression checks, integrate the policy-only change, then unblock release task 202608131730-BHEAQT without changing its sequence or release scope.

## Scope

- In scope: Review INC-20260810-01 and INC-20260811-01 against their merged fixes and current enforcement tests. If both failure classes are fixed and no active operator work remains, remove them from the active incidents registry and its installed asset mirror, append complete archived records with exact task, commit, test, and enforcement evidence to docs/developer/incident-archive.mdx, run policy routing and focused incident/regression checks, integrate the policy-only change, then unblock release task 202608131730-BHEAQT without changing its sequence or release scope.
- Out of scope: unrelated refactors not required for "Archive resolved release incidents before 0.7.6".

## Plan

1. Bind each active incident to its completed fix: W4ZM7J for declared-check validation/execution parity and 7XGP97/T3ZDDM for shared-worktree RF-04 harness reliability. 2. Run the exact focused regressions on current main and inspect hosted/qualification evidence; stop if either failure reproduces. 3. Append full archived records to docs/developer/incident-archive.mdx with state=archived, archived_by, archive_reason, exact tasks/commits/checks, and enforcement. 4. Remove only INC-20260810-01 and INC-20260811-01 from .agentplane/policy/incidents.md and packages/agentplane/assets/policy/incidents.md, preserving active-registry headers and mirror parity. 5. Run focused tests, docs formatting, policy routing, and release:incidents:check; verify the active registry is empty and historical evidence remains complete. 6. Commit, publish, obtain hosted PR verification, integrate through the queue, hosted-close, and AgentPlane cleanup; then resume release task 202608131730-BHEAQT on the new main.

## Verify Steps

1. Run bun test packages/agentplane/src/commands/shared/declared-check.test.ts packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/commands/release/shared-worktree-dependency-manifest.test.ts. Expected: all tests pass, accepted checks use the execution parser, and RF-04 shared-worktree dependency discovery remains valid.
2. Inspect W4ZM7J, 7XGP97, T3ZDDM and their merged evidence. Expected: both incident fixes are on main, quality/hosted evidence passed, and no unresolved engineering or operator action remains for either failure class.
3. Inspect docs/developer/incident-archive.mdx. Expected: both IDs appear exactly once as complete archived records with final evidence, enforcement, archived_by, and archive_reason.
4. Inspect .agentplane/policy/incidents.md and packages/agentplane/assets/policy/incidents.md. Expected: both active entries are absent, the two mirrors agree, and no unrelated incident text changes.
5. Run bun run format:check, node .agentplane/policy/check-routing.mjs, and bun run release:incidents:check. Expected: formatting and policy graph pass, active incident count is zero, and 0.7.6 release planning is unblocked.
6. Inspect the PR, hosted checks, merged main, Hosted Close, cleanup, and git status. Expected: exact policy-only diff is merged through the protected lane, task is DONE, its worktree/branch are cleaned, and no unintended tracked files remain.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the archive commit through a new policy task, restoring both active registry entries and removing their archive records together; rerun focused tests, routing, mirror parity, and the release incident gate.

## Findings
