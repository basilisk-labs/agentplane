---
id: "202603072032-V9VGT2"
title: "Switch stale-dist freshness to snapshot comparison"
result_summary: "Switched dist-guard to compare current watched-runtime snapshots against the build manifest with legacy fallback for old manifests, plus clearer runtime docs and regressions."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603072032-1BC7VQ"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T20:55:20.239Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T20:58:43.161Z"
  updated_by: "CODER"
  note: "Stale-dist freshness now compares watched-runtime snapshots from the build manifest and falls back to legacy git/mtime checks only for older manifests. Verified with dist-guard, stale-readonly, runtime.command, doctor.command, eslint on touched files, package builds, routing check, and a manual strict task-list run after rebuild on the current dirty runtime tree."
commit:
  hash: "4771172dd177ddb30dc421748f9466f3d08474e5"
  message: "🔧 V9VGT2 cli: compare stale dist against snapshots"
comments:
  -
    author: "CODER"
    body: "Start: switch stale-dist freshness to compare current watched-runtime snapshots against the built manifest so rebuilt dirty runtime trees stop blocking strict commands."
  -
    author: "CODER"
    body: "Verified: stale-dist freshness now follows watched-runtime snapshot equality, so rebuilt dirty runtime trees no longer block strict commands while real runtime drift still does."
events:
  -
    type: "status"
    at: "2026-03-07T20:55:25.066Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch stale-dist freshness to compare current watched-runtime snapshots against the built manifest so rebuilt dirty runtime trees stop blocking strict commands."
  -
    type: "verify"
    at: "2026-03-07T20:58:43.161Z"
    author: "CODER"
    state: "ok"
    note: "Stale-dist freshness now compares watched-runtime snapshots from the build manifest and falls back to legacy git/mtime checks only for older manifests. Verified with dist-guard, stale-readonly, runtime.command, doctor.command, eslint on touched files, package builds, routing check, and a manual strict task-list run after rebuild on the current dirty runtime tree."
  -
    type: "status"
    at: "2026-03-07T20:59:09.934Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: stale-dist freshness now follows watched-runtime snapshot equality, so rebuilt dirty runtime trees no longer block strict commands while real runtime drift still does."
doc_version: 3
doc_updated_at: "2026-03-07T20:59:09.934Z"
doc_updated_by: "CODER"
description: "Use build-manifest snapshots to treat rebuilt dirty runtime trees as fresh and keep strict blocking only when dist is actually behind the current source state."
id_source: "generated"
---
## Summary

Switch stale-dist freshness to snapshot comparison

Use build-manifest snapshots to treat rebuilt dirty runtime trees as fresh and keep strict blocking only when dist is actually behind the current source state.

## Scope

- In scope: Use build-manifest snapshots to treat rebuilt dirty runtime trees as fresh and keep strict blocking only when dist is actually behind the current source state..
- Out of scope: unrelated refactors not required for "Switch stale-dist freshness to snapshot comparison".

## Plan

1. Teach dist-guard to prefer watched-runtime snapshot comparison from the build manifest and to fall back to the legacy git/mtime heuristic only when snapshot fields are absent. 2. Report changed watched files from snapshot diffing so strict commands block only when dist is truly behind the current runtime source state, including rebuilt-but-dirty trees becoming fresh. 3. Add regressions for rebuilt dirty trees, legacy manifest fallback, and changed-path reporting, then sync the minimal framework-dev docs needed for the new contract.

## Verify Steps

### Scope
- Primary tag: `code`
- Surfaces: stale-dist freshness predicate, build-manifest snapshot consumption, changed-path reporting, framework-dev docs.

### Checks
- `bunx vitest run packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts packages/agentplane/src/commands/runtime.command.test.ts packages/agentplane/src/commands/doctor.command.test.ts`
- `bunx eslint packages/agentplane/bin/dist-guard.js packages/agentplane/bin/runtime-watch.js packages/agentplane/bin/agentplane.js packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/stale-dist-readonly.test.ts`
- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`
- `agentplane runtime explain --json`
- `node .agentplane/policy/check-routing.mjs`

### Evidence / Commands
- Record that rebuilt dirty runtime trees are accepted as fresh, while genuinely out-of-date runtime files still produce changed-path diagnostics.

### Pass criteria
- The stale-dist guard blocks only when dist is behind the current watched runtime source state, not merely because the watched tree is dirty relative to git.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T20:58:43.161Z — VERIFY — ok

By: CODER

Note: Stale-dist freshness now compares watched-runtime snapshots from the build manifest and falls back to legacy git/mtime checks only for older manifests. Verified with dist-guard, stale-readonly, runtime.command, doctor.command, eslint on touched files, package builds, routing check, and a manual strict task-list run after rebuild on the current dirty runtime tree.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T20:55:25.066Z, excerpt_hash=sha256:9b7a37fe51930854e188328ab0eb5ee04770b2dc32bb089064ac03d015555806

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- This is the consumer-side half of the snapshot redesign introduced in 202603072032-1BC7VQ.\n- Prefer additive reasons and changedPaths so existing stale-dist warning/output surfaces stay readable while becoming more accurate.

## Risks

- Risk: snapshot diffing can silently drift from the build writer if producer and consumer do not reuse the same watch contract.\n- Mitigation: import the shared runtime-watch helper from dist-guard and avoid hardcoded duplicate watch lists.\n\n- Risk: dropping legacy logic too early would break older global installs whose manifests do not yet contain snapshot fields.\n- Mitigation: keep a compatibility fallback to the existing git/mtime heuristic when snapshot data is missing or malformed.
