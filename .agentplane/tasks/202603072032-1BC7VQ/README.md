---
id: "202603072032-1BC7VQ"
title: "Snapshot watched runtime files in build manifest"
result_summary: "Added a shared runtime-watch helper, persisted watched file hashes in manifests for agentplane/core, and updated test fixtures to use the shared watch contract."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603072032-2M0V8V"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T20:48:02.112Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T20:53:22.147Z"
  updated_by: "CODER"
  note: "Build manifests now persist deterministic watched-runtime snapshots with content hashes for agentplane and core. Verified with runtime-watch, dist-guard, stale-readonly, repo-local-handoff, and global-install manifest tests; builds and routing pass; eslint is clean on touched files."
commit:
  hash: "30e9ba26bf7291c890ad4065b66e1aa4f5206e8d"
  message: "🧱 1BC7VQ build: snapshot watched runtime files"
comments:
  -
    author: "CODER"
    body: "Start: add deterministic watched-runtime snapshots to build manifests so stale-dist freshness can compare built source state instead of raw git dirtiness in the next task."
  -
    author: "CODER"
    body: "Verified: build manifests now record deterministic watched-runtime snapshots while existing stale-dist consumers remain compatible."
events:
  -
    type: "status"
    at: "2026-03-07T20:48:05.978Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add deterministic watched-runtime snapshots to build manifests so stale-dist freshness can compare built source state instead of raw git dirtiness in the next task."
  -
    type: "verify"
    at: "2026-03-07T20:53:22.147Z"
    author: "CODER"
    state: "ok"
    note: "Build manifests now persist deterministic watched-runtime snapshots with content hashes for agentplane and core. Verified with runtime-watch, dist-guard, stale-readonly, repo-local-handoff, and global-install manifest tests; builds and routing pass; eslint is clean on touched files."
  -
    type: "status"
    at: "2026-03-07T20:54:00.998Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: build manifests now record deterministic watched-runtime snapshots while existing stale-dist consumers remain compatible."
doc_version: 3
doc_updated_at: "2026-03-07T20:54:00.998Z"
doc_updated_by: "CODER"
description: "Record watched runtime file state during build so stale-dist freshness can be compared against built source instead of git dirtiness alone."
id_source: "generated"
---
## Summary

Snapshot watched runtime files in build manifest

Record watched runtime file state during build so stale-dist freshness can be compared against built source instead of git dirtiness alone.

## Scope

- In scope: Record watched runtime file state during build so stale-dist freshness can be compared against built source instead of git dirtiness alone..
- Out of scope: unrelated refactors not required for "Snapshot watched runtime files in build manifest".

## Plan

1. Add a reusable watched-runtime snapshot helper that expands configured watched paths into a deterministic file list and records content hashes in the build manifest. 2. Extend write-build-manifest to persist the snapshot for agentplane and core without breaking existing consumers of schema_version 1 manifests. 3. Add regressions around manifest snapshot contents and keep existing build/verify tooling compatible, then record evidence and close the task.

## Verify Steps

### Scope
- Primary tag: `code`
- Surfaces: build manifest writer, watched runtime snapshot helper, stale-dist manifest compatibility, dev-install manifest verifier.

### Checks
- `bunx vitest run packages/agentplane/src/cli/dist-guard.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts`
- `bun run lint:core -- scripts/write-build-manifest.mjs packages/agentplane/bin/dist-guard.js`
- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`
- `node .agentplane/policy/check-routing.mjs`

### Evidence / Commands
- Record that new manifests include deterministic watched runtime file snapshots for both packages and that existing consumers still accept the built artifacts.

### Pass criteria
- Build manifests persist watched runtime file snapshots without breaking current builds or manifest-based verification.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T20:53:22.147Z — VERIFY — ok

By: CODER

Note: Build manifests now persist deterministic watched-runtime snapshots with content hashes for agentplane and core. Verified with runtime-watch, dist-guard, stale-readonly, repo-local-handoff, and global-install manifest tests; builds and routing pass; eslint is clean on touched files.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T20:48:05.978Z, excerpt_hash=sha256:4f929c7f02a68ef0aaf9ff71bf0c190bd7c8adc6b664ac8eb9794f30a28e6540

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Keep this task producer-only: write the richer snapshot into manifests now, then switch stale-dist freshness consumption in 202603072032-V9VGT2.\n- Reuse one helper for manifest generation so the next task can import the exact same snapshot logic instead of reimplementing directory walking and hashing.

## Risks

- Risk: a snapshot format that is not deterministic will create false stale/build drift across machines.\n- Mitigation: sort all recorded paths, hash file contents instead of relying on mtimes, and snapshot only explicit watched runtime paths.\n\n- Risk: changing the manifest contract too aggressively will break current stale-dist consumers before the next task switches them to snapshot comparison.\n- Mitigation: keep schema_version 1 readable and additive in this task; delay any consumer-side freshness logic change to 202603072032-V9VGT2.
