---
id: "202602091523-XAQGKB"
title: "upgrade: reduce I/O passes + tune network timeouts"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-09T15:24:03.380Z"
doc_updated_by: "CODER"
description: "Avoid repeated readFile passes during upgrade; cap concurrency; and use appropriate timeouts (short for update-check, longer for bundle downloads)."
id_source: "generated"
---
## Summary

Improve upgrade performance: read existing files once per path, limit I/O parallelism, and tune network timeouts (longer for downloads than update-check).

## Scope

packages/agentplane/src/commands/upgrade.ts, packages/agentplane/src/cli/http.ts, and any call sites that use overly aggressive timeouts.

## Plan

1. Refactor upgrade apply loop to avoid repeated reads; reuse buffers/strings as needed.\n2. Add a concurrency limiter for file operations.\n3. Split HTTP timeout defaults: keep short for update-check; use 10-30s for bundle downloads and stream to file.\n4. bun run lint + bun run test:full.

## Risks

Risk: timeouts changes can affect perceived responsiveness. Mitigation: keep update-check fast; only extend download paths.

## Verify Steps

- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit.
