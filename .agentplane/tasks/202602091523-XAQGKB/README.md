---
id: "202602091523-XAQGKB"
title: "upgrade: reduce I/O passes + tune network timeouts"
result_summary: "Streamed downloads + tuned upgrade timeouts"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602091523-BNCKWA"
tags:
  - "upgrade"
  - "perf"
  - "network"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:10:07.888Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass. downloadToFile streams response bodies; upgrade release metadata fetch uses longer timeout; upgrade apply loop avoids duplicate reads."
commit:
  hash: "5405ab27572ea19be46490fc9ebe699711d2c1e6"
  message: "✅ XAQGKB upgrade: stream downloads + tune timeouts"
comments:
  -
    author: "CODER"
    body: "Start: improve upgrade performance and reliability: stream downloads to disk, tune network timeouts for release metadata/download, and reduce redundant filesystem reads during apply. Add tests for streaming downloader and upgrade timeout behavior."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. Network: upgrade now fetches GitHub release metadata with a longer timeout (15s) and downloads stream to disk (no full buffering). FS: upgrade apply reads existing files once and only decodes text when needed for merges."
events:
  -
    type: "status"
    at: "2026-02-09T16:07:47.644Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: improve upgrade performance and reliability: stream downloads to disk, tune network timeouts for release metadata/download, and reduce redundant filesystem reads during apply. Add tests for streaming downloader and upgrade timeout behavior."
  -
    type: "verify"
    at: "2026-02-09T16:10:07.888Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. downloadToFile streams response bodies; upgrade release metadata fetch uses longer timeout; upgrade apply loop avoids duplicate reads."
  -
    type: "status"
    at: "2026-02-09T16:10:08.039Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Network: upgrade now fetches GitHub release metadata with a longer timeout (15s) and downloads stream to disk (no full buffering). FS: upgrade apply reads existing files once and only decodes text when needed for merges."
doc_version: 2
doc_updated_at: "2026-02-09T16:10:08.039Z"
doc_updated_by: "CODER"
description: "Avoid repeated readFile passes during upgrade; cap concurrency; and use appropriate timeouts (short for update-check, longer for bundle downloads)."
id_source: "generated"
---
## Summary

Improve upgrade performance: read existing files once per path, limit I/O parallelism, and tune network timeouts (longer for downloads than update-check).

## Scope

packages/agentplane/src/commands/upgrade.ts, packages/agentplane/src/cli/http.ts, and any call sites that use overly aggressive timeouts.

## Plan

1) Inspect current upgrade I/O patterns and network timeouts.\n2) Implement streaming downloadToFile to avoid buffering entire archives in memory.\n3) Use longer timeout for upgrade release metadata fetch (separate from update-check).\n4) Reduce redundant readFile calls in upgrade apply path (read-once buffers, only decode to utf8 when needed).\n5) Add/adjust tests for http download streaming and upgrade release fetch timeout wiring.\n6) Run bun run lint and bun run test:full.

## Risks

Risk: timeouts changes can affect perceived responsiveness. Mitigation: keep update-check fast; only extend download paths.

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:10:07.888Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. downloadToFile streams response bodies; upgrade release metadata fetch uses longer timeout; upgrade apply loop avoids duplicate reads.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:07:47.930Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit.
