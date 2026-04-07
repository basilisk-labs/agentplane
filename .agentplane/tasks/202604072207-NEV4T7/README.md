---
id: "202604072207-NEV4T7"
title: "Hydrate existing GitHub PR state during pr open and pr update"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T22:13:41.707Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T22:43:03.167Z"
  updated_by: "CODER"
  note: "Command: targeted vitest + eslint + live gh pr create/pr open/pr update; Result: pass; Evidence: 51 targeted tests passed, eslint clean, PR #139 hydrated into pr/meta.json with status=OPEN; Scope: existing GitHub PR discovery and pr artifact hydration."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-07T22:41:04.830Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/core/src/tasks/task-artifact-schema.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 51 tests passed, including new pr open/pr update hydration coverage; Scope: pr open/update hydration, pr-meta builders, and pr-meta schema contracts.
      Command: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts-bCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packs=OPEN without local-only messaging; Scope: live branch_pr hydration after manual PR creation.
  -
    type: "verify"
    at: "2026-04-07T22:43:03.167Z"
    author: "CODER"
    state: "ok"
    note: "Command: targeted vitest + eslint + live gh pr create/pr open/pr update; Result: pass; Evidence: 51 targeted tests passed, eslint clean, PR #139 hydrated into pr/meta.json with status=OPEN; Scope: existing GitHub PR discovery and pr artifact hydration."
doc_version: 3
doc_updated_at: "2026-04-07T22:43:03.172Z"
doc_updated_by: "CODER"
description: "When a branch already has a GitHub PR, agentplane pr open/update should discover that PR by branch, record its number/url/state in pr/meta.json, and stop reporting local-only sync."
sections:
  Summary: |-
    Hydrate existing GitHub PR state during pr open and pr update
    
    When a branch already has a GitHub PR, agentplane pr open/update should discover that PR by branch, record its number/url/state in pr/meta.json, and stop reporting local-only sync.
  Scope: |-
    - In scope: When a branch already has a GitHub PR, agentplane pr open/update should discover that PR by branch, record its number/url/state in pr/meta.json, and stop reporting local-only sync.
    - Out of scope: unrelated refactors not required for "Hydrate existing GitHub PR state during pr open and pr update".
  Plan: |-
    1. Trace the current pr open/pr update flow, including how branch metadata and pr/meta.json are produced.
    2. Implement existing-PR discovery by branch and hydrate pr/meta.json with number, url, state, and merged/open flags when the PR already exists remotely.
    3. Add regression tests covering both pr open and pr update against an already-existing GitHub PR and keep existing local-only behavior when no remote PR exists.
    4. Run targeted verification for touched commands and finalize task artifacts for normal branch_pr integration.
  Verify Steps: |-
    1. Run targeted CLI regression tests for pr open/update hydration. Expected: existing remote PR state is written into pr/meta.json and output stops reporting local-only sync for that case.
    2. Run static validation on touched source and test files. Expected: no new diagnostics in touched scope.
    3. Exercise the branch_pr artifact flow for the task branch. Expected: pr artifacts remain consistent and any residual limitation is recorded in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T22:41:04.830Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/core/src/tasks/task-artifact-schema.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 51 tests passed, including new pr open/pr update hydration coverage; Scope: pr open/update hydration, pr-meta builders, and pr-meta schema contracts.
    Command: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts-bCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packs=OPEN without local-only messaging; Scope: live branch_pr hydration after manual PR creation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T22:41:03.458Z, excerpt_hash=sha256:9ac5a9d00c96e9dc4716321e948cf2d1d738b3934189eee76ec8a558b9bda52f
    
    ### 2026-04-07T22:43:03.167Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: targeted vitest + eslint + live gh pr create/pr open/pr update; Result: pass; Evidence: 51 targeted tests passed, eslint clean, PR #139 hydrated into pr/meta.json with status=OPEN; Scope: existing GitHub PR discovery and pr artifact hydration.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T22:41:04.833Z, excerpt_hash=sha256:9ac5a9d00c96e9dc4716321e948cf2d1d738b3934189eee76ec8a558b9bda52f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "1. Live verification exposed a separate framework bootstrap gap: after reusing common-root node_modules, this worktree still resolved @agentplaneorg/core from the common repo root, so schema changes were invisible until a local bun install recreated worktree-local package links. This is out of scope for NEV4T7 and should be fixed in a follow-up task."
id_source: "generated"
---
## Summary

Hydrate existing GitHub PR state during pr open and pr update

When a branch already has a GitHub PR, agentplane pr open/update should discover that PR by branch, record its number/url/state in pr/meta.json, and stop reporting local-only sync.

## Scope

- In scope: When a branch already has a GitHub PR, agentplane pr open/update should discover that PR by branch, record its number/url/state in pr/meta.json, and stop reporting local-only sync.
- Out of scope: unrelated refactors not required for "Hydrate existing GitHub PR state during pr open and pr update".

## Plan

1. Trace the current pr open/pr update flow, including how branch metadata and pr/meta.json are produced.
2. Implement existing-PR discovery by branch and hydrate pr/meta.json with number, url, state, and merged/open flags when the PR already exists remotely.
3. Add regression tests covering both pr open and pr update against an already-existing GitHub PR and keep existing local-only behavior when no remote PR exists.
4. Run targeted verification for touched commands and finalize task artifacts for normal branch_pr integration.

## Verify Steps

1. Run targeted CLI regression tests for pr open/update hydration. Expected: existing remote PR state is written into pr/meta.json and output stops reporting local-only sync for that case.
2. Run static validation on touched source and test files. Expected: no new diagnostics in touched scope.
3. Exercise the branch_pr artifact flow for the task branch. Expected: pr artifacts remain consistent and any residual limitation is recorded in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T22:41:04.830Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/core/src/tasks/task-artifact-schema.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 3 files passed, 51 tests passed, including new pr open/pr update hydration coverage; Scope: pr open/update hydration, pr-meta builders, and pr-meta schema contracts.
Command: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts-bCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplaCommand: bun x eslint packs=OPEN without local-only messaging; Scope: live branch_pr hydration after manual PR creation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T22:41:03.458Z, excerpt_hash=sha256:9ac5a9d00c96e9dc4716321e948cf2d1d738b3934189eee76ec8a558b9bda52f

### 2026-04-07T22:43:03.167Z — VERIFY — ok

By: CODER

Note: Command: targeted vitest + eslint + live gh pr create/pr open/pr update; Result: pass; Evidence: 51 targeted tests passed, eslint clean, PR #139 hydrated into pr/meta.json with status=OPEN; Scope: existing GitHub PR discovery and pr artifact hydration.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T22:41:04.833Z, excerpt_hash=sha256:9ac5a9d00c96e9dc4716321e948cf2d1d738b3934189eee76ec8a558b9bda52f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Live verification exposed a separate framework bootstrap gap: after reusing common-root node_modules, this worktree still resolved @agentplaneorg/core from the common repo root, so schema changes were invisible until a local bun install recreated worktree-local package links. This is out of scope for NEV4T7 and should be fixed in a follow-up task.
