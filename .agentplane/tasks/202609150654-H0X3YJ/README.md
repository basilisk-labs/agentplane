---
id: "202609150654-H0X3YJ"
title: "Fix active-runtime install reuse on v0.6"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:full"
  - "bunx vitest run --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-15T06:54:26.249Z"
  updated_by: "USER"
  note: "Approved in the current conversation for the bounded guard repair and v0.6.30 release continuation."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-09-15T06:55:00.939Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-09-15T06:55:00.939Z"
doc_updated_by: "CODER"
description: "Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish."
sections:
  Summary: |-
    Fix active-runtime install reuse on v0.6

    Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.
  Scope: |-
    - In scope: Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.
    - Out of scope: unrelated refactors not required for "Fix active-runtime install reuse on v0.6".
  Plan: |-
    1. Update `isReusableWorkspaceInstallLayout` to validate `node_modules` and declared dependency roots against the repository that owns `sourceRoot`, not the unrelated target repository.
    2. Preserve fail-closed rejection for missing manifests, dangling targets, task-worktree-owned targets, and targets outside the source repository.
    3. Add focused coverage for valid cross-repository reuse and retain the existing runtime bootstrap integration cases.
    4. Run focused tests and `bun run ci:local:full`; then open a PR only to `codex/release-v0.6.27-reclaim-fix` and require hosted CI.
  Verify Steps: |-
    1. Run `bunx vitest run --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts`. Expected: cross-repository active-runtime reuse passes while dangling, task-worktree-owned, and external layouts remain rejected.
    2. Run `bun run ci:local:full`. Expected: the complete local regression suite passes.
    3. Inspect the final diff. Expected: only the three approved implementation and test paths plus task evidence change; no release metadata or unrelated refactor is included.
    4. Verify hosted CI on the exact PR head. Expected: all required checks pass before merge to `codex/release-v0.6.27-reclaim-fix`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "cc2da20eb21f3bde90d1d8f35fe2ba7acaa763c9"
    version: 1
id_source: "generated"
---
## Summary

Fix active-runtime install reuse on v0.6

Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.

## Scope

- In scope: Fix the reusable workspace install-layout guard so work start can reuse a valid active repo-local runtime from a separate repository root while still rejecting dangling, task-worktree-owned, and external dependency layouts. Add regression coverage for the cross-repository bootstrap path required by release:prepublish.
- Out of scope: unrelated refactors not required for "Fix active-runtime install reuse on v0.6".

## Plan

1. Update `isReusableWorkspaceInstallLayout` to validate `node_modules` and declared dependency roots against the repository that owns `sourceRoot`, not the unrelated target repository.
2. Preserve fail-closed rejection for missing manifests, dangling targets, task-worktree-owned targets, and targets outside the source repository.
3. Add focused coverage for valid cross-repository reuse and retain the existing runtime bootstrap integration cases.
4. Run focused tests and `bun run ci:local:full`; then open a PR only to `codex/release-v0.6.27-reclaim-fix` and require hosted CI.

## Verify Steps

1. Run `bunx vitest run --project cli-core packages/agentplane/src/commands/branch/work-start.materialize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.worktree-runtime.test.ts`. Expected: cross-repository active-runtime reuse passes while dangling, task-worktree-owned, and external layouts remain rejected.
2. Run `bun run ci:local:full`. Expected: the complete local regression suite passes.
3. Inspect the final diff. Expected: only the three approved implementation and test paths plus task evidence change; no release metadata or unrelated refactor is included.
4. Verify hosted CI on the exact PR head. Expected: all required checks pass before merge to `codex/release-v0.6.27-reclaim-fix`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
