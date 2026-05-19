---
id: "202605191428-C5AXQ6"
title: "Improve context recall boundaries"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T14:29:31.423Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T15:38:54.894Z"
  updated_by: "CODER"
  note: "Post-rebase verification refreshed on top of origin/main c4b8430f3. Checks rerun after rebase: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests; bun run agents:check => pass; node .agentplane/policy/check-routing.mjs => pass."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing approved context recall boundary fixes in the task worktree, limited to context search behavior, context policy wording, blueprint policy metadata, docs/help tests, and focused verification."
events:
  -
    type: "status"
    at: "2026-05-19T14:30:15.052Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing approved context recall boundary fixes in the task worktree, limited to context search behavior, context policy wording, blueprint policy metadata, docs/help tests, and focused verification."
  -
    type: "verify"
    at: "2026-05-19T14:41:29.496Z"
    author: "CODER"
    state: "ok"
    note: "Verified context recall boundary fix. Commands: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests and 8 snapshots; bunx eslint touched context/search/blueprint files => pass; bunx prettier --check touched docs/source files => pass; bun run --filter=agentplane build => pass; bun run docs:cli:check => pass; node .agentplane/policy/check-routing.mjs => pass; ap context reindex --include-raw => pass rows=16 files=21; ap context check => pass; ap context doctor => pass after serialized re-run; ap doctor => OK; git diff --check => pass. Manual smoke: default context search excludes task history, --scope tasks returns task records."
  -
    type: "verify"
    at: "2026-05-19T14:43:27.728Z"
    author: "CODER"
    state: "ok"
    note: "Post-commit verification refreshed for implementation commit c74d8af24. Previously recorded checks remain valid for this diff: focused context/search tests, help snapshots, lint, formatting, package build, docs CLI freshness, policy routing, context reindex/check/doctor, ap doctor, git diff --check, and manual search smoke passed."
  -
    type: "verify"
    at: "2026-05-19T15:38:54.894Z"
    author: "CODER"
    state: "ok"
    note: "Post-rebase verification refreshed on top of origin/main c4b8430f3. Checks rerun after rebase: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests; bun run agents:check => pass; node .agentplane/policy/check-routing.mjs => pass."
doc_version: 3
doc_updated_at: "2026-05-19T15:38:55.013Z"
doc_updated_by: "CODER"
description: "Make local context search prefer curated context by default, align context policy module references with actual derived paths and blueprint loading, and verify the context command behavior."
sections:
  Summary: |-
    Improve context recall boundaries

    Make local context search prefer curated context by default, align context policy module references with actual derived paths and blueprint loading, and verify the context command behavior.
  Scope: |-
    - In scope: Make local context search prefer curated context by default, align context policy module references with actual derived paths and blueprint loading, and verify the context command behavior.
    - Out of scope: unrelated refactors not required for "Improve context recall boundaries".
  Plan: "Scope: improve context recall boundaries without broad context ingestion. Steps: (1) adjust context search defaults/scopes so curated context surfaces are searched by default and task history is opt-in, preserving explicit scope support; (2) align context.must local-context path wording and command contract with current derived layout and ingest/reindex routes; (3) include context.must in context assimilation blueprints so blueprint policy metadata matches gateway routing; (4) update CLI help/docs/tests for the new search behavior; (5) verify with focused context tests, policy routing, ap context doctor/check, and task verification."
  Verify Steps: |-
    1. Run focused context release-readiness tests. Expected: search scope regression and context guards pass.
    2. Run CLI help snapshot tests without updating snapshots. Expected: help output matches committed snapshots.
    3. Run package build and docs CLI freshness check. Expected: generated command reference is current.
    4. Run policy routing and context health checks. Expected: routing, ap context doctor, and ap context check pass.
    5. Run task verification contract. Expected: ap task verify-show succeeds and verification is recorded.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T14:41:29.496Z — VERIFY — ok

    By: CODER

    Note: Verified context recall boundary fix. Commands: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests and 8 snapshots; bunx eslint touched context/search/blueprint files => pass; bunx prettier --check touched docs/source files => pass; bun run --filter=agentplane build => pass; bun run docs:cli:check => pass; node .agentplane/policy/check-routing.mjs => pass; ap context reindex --include-raw => pass rows=16 files=21; ap context check => pass; ap context doctor => pass after serialized re-run; ap doctor => OK; git diff --check => pass. Manual smoke: default context search excludes task history, --scope tasks returns task records.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:35:19.647Z, excerpt_hash=sha256:3d0702eb3f1603903ee3a55584030772bf0ce80cc7678484062b17ba871886e1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191428-C5AXQ6-context-recall-boundaries/.agentplane/tasks/202605191428-C5AXQ6/blueprint/resolved-snapshot.json
    - old_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
    - current_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191428-C5AXQ6

    ### 2026-05-19T14:43:27.728Z — VERIFY — ok

    By: CODER

    Note: Post-commit verification refreshed for implementation commit c74d8af24. Previously recorded checks remain valid for this diff: focused context/search tests, help snapshots, lint, formatting, package build, docs CLI freshness, policy routing, context reindex/check/doctor, ap doctor, git diff --check, and manual search smoke passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:41:29.551Z, excerpt_hash=sha256:3d0702eb3f1603903ee3a55584030772bf0ce80cc7678484062b17ba871886e1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191428-C5AXQ6-context-recall-boundaries/.agentplane/tasks/202605191428-C5AXQ6/blueprint/resolved-snapshot.json
    - old_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
    - current_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191428-C5AXQ6

    ### 2026-05-19T15:38:54.894Z — VERIFY — ok

    By: CODER

    Note: Post-rebase verification refreshed on top of origin/main c4b8430f3. Checks rerun after rebase: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests; bun run agents:check => pass; node .agentplane/policy/check-routing.mjs => pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:43:27.853Z, excerpt_hash=sha256:3d0702eb3f1603903ee3a55584030772bf0ce80cc7678484062b17ba871886e1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191428-C5AXQ6-context-recall-boundaries/.agentplane/tasks/202605191428-C5AXQ6/blueprint/resolved-snapshot.json
    - old_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
    - current_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191428-C5AXQ6

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Improve context recall boundaries

Make local context search prefer curated context by default, align context policy module references with actual derived paths and blueprint loading, and verify the context command behavior.

## Scope

- In scope: Make local context search prefer curated context by default, align context policy module references with actual derived paths and blueprint loading, and verify the context command behavior.
- Out of scope: unrelated refactors not required for "Improve context recall boundaries".

## Plan

Scope: improve context recall boundaries without broad context ingestion. Steps: (1) adjust context search defaults/scopes so curated context surfaces are searched by default and task history is opt-in, preserving explicit scope support; (2) align context.must local-context path wording and command contract with current derived layout and ingest/reindex routes; (3) include context.must in context assimilation blueprints so blueprint policy metadata matches gateway routing; (4) update CLI help/docs/tests for the new search behavior; (5) verify with focused context tests, policy routing, ap context doctor/check, and task verification.

## Verify Steps

1. Run focused context release-readiness tests. Expected: search scope regression and context guards pass.
2. Run CLI help snapshot tests without updating snapshots. Expected: help output matches committed snapshots.
3. Run package build and docs CLI freshness check. Expected: generated command reference is current.
4. Run policy routing and context health checks. Expected: routing, ap context doctor, and ap context check pass.
5. Run task verification contract. Expected: ap task verify-show succeeds and verification is recorded.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T14:41:29.496Z — VERIFY — ok

By: CODER

Note: Verified context recall boundary fix. Commands: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests and 8 snapshots; bunx eslint touched context/search/blueprint files => pass; bunx prettier --check touched docs/source files => pass; bun run --filter=agentplane build => pass; bun run docs:cli:check => pass; node .agentplane/policy/check-routing.mjs => pass; ap context reindex --include-raw => pass rows=16 files=21; ap context check => pass; ap context doctor => pass after serialized re-run; ap doctor => OK; git diff --check => pass. Manual smoke: default context search excludes task history, --scope tasks returns task records.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:35:19.647Z, excerpt_hash=sha256:3d0702eb3f1603903ee3a55584030772bf0ce80cc7678484062b17ba871886e1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191428-C5AXQ6-context-recall-boundaries/.agentplane/tasks/202605191428-C5AXQ6/blueprint/resolved-snapshot.json
- old_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
- current_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191428-C5AXQ6

### 2026-05-19T14:43:27.728Z — VERIFY — ok

By: CODER

Note: Post-commit verification refreshed for implementation commit c74d8af24. Previously recorded checks remain valid for this diff: focused context/search tests, help snapshots, lint, formatting, package build, docs CLI freshness, policy routing, context reindex/check/doctor, ap doctor, git diff --check, and manual search smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:41:29.551Z, excerpt_hash=sha256:3d0702eb3f1603903ee3a55584030772bf0ce80cc7678484062b17ba871886e1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191428-C5AXQ6-context-recall-boundaries/.agentplane/tasks/202605191428-C5AXQ6/blueprint/resolved-snapshot.json
- old_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
- current_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191428-C5AXQ6

### 2026-05-19T15:38:54.894Z — VERIFY — ok

By: CODER

Note: Post-rebase verification refreshed on top of origin/main c4b8430f3. Checks rerun after rebase: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests; bun run agents:check => pass; node .agentplane/policy/check-routing.mjs => pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T14:43:27.853Z, excerpt_hash=sha256:3d0702eb3f1603903ee3a55584030772bf0ce80cc7678484062b17ba871886e1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191428-C5AXQ6-context-recall-boundaries/.agentplane/tasks/202605191428-C5AXQ6/blueprint/resolved-snapshot.json
- old_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
- current_digest: cb9ae9fec21885fb858fa3145f79006624675d400b36c2be32ea44d616e9cbd9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191428-C5AXQ6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
