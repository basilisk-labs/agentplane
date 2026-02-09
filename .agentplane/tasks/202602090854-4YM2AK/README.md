---
id: "202602090854-4YM2AK"
title: "upgrade: fix GitHub repo source + canonicalize agentplane naming"
result_summary: "Upgrade source normalized"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "bug"
  - "upgrade"
  - "release"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T09:00:37.383Z"
  updated_by: "CODER"
  note: "Fixed upgrade GitHub source normalization: config.framework.source basilisk-labs/agent-plane now normalizes to basilisk-labs/agentplane to avoid 404; warns and migrates source on successful apply. Updated default config schema + spec examples to use agentplane repo URL; updated package keywords to remove agent-plane. Added unit test for normalization. bun run lint/test:full PASS."
commit:
  hash: "1aa722d159ff0ea8413d33262271979e79e08a5c"
  message: "✅ 4YM2AK upgrade: fix deprecated agent-plane source"
comments:
  -
    author: "CODER"
    body: "Start: Fix upgrade GitHub source parsing/normalization (agent-plane -> agentplane), migrate config.framework.source, and update defaults/tests."
  -
    author: "CODER"
    body: "Verified: Fixed agentplane upgrade to normalize deprecated basilisk-labs/agent-plane framework source to basilisk-labs/agentplane (avoids GitHub API 404), warn about migration, and persist corrected source when applying an upgrade. Updated default config schema + spec examples and removed agent-plane keyword mentions; added unit test; lint/test:full pass."
events:
  -
    type: "status"
    at: "2026-02-09T08:54:40.758Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix upgrade GitHub source parsing/normalization (agent-plane -> agentplane), migrate config.framework.source, and update defaults/tests."
  -
    type: "verify"
    at: "2026-02-09T09:00:37.383Z"
    author: "CODER"
    state: "ok"
    note: "Fixed upgrade GitHub source normalization: config.framework.source basilisk-labs/agent-plane now normalizes to basilisk-labs/agentplane to avoid 404; warns and migrates source on successful apply. Updated default config schema + spec examples to use agentplane repo URL; updated package keywords to remove agent-plane. Added unit test for normalization. bun run lint/test:full PASS."
  -
    type: "status"
    at: "2026-02-09T09:01:36.172Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Fixed agentplane upgrade to normalize deprecated basilisk-labs/agent-plane framework source to basilisk-labs/agentplane (avoids GitHub API 404), warn about migration, and persist corrected source when applying an upgrade. Updated default config schema + spec examples and removed agent-plane keyword mentions; added unit test; lint/test:full pass."
doc_version: 2
doc_updated_at: "2026-02-09T09:01:36.172Z"
doc_updated_by: "CODER"
description: "Fix agentplane upgrade failing with 404 when config.framework.source uses the outdated basilisk-labs/agent-plane repo. Canonicalize to basilisk-labs/agentplane, migrate config on upgrade, and update default config + tests."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T09:00:37.383Z — VERIFY — ok

By: CODER

Note: Fixed upgrade GitHub source normalization: config.framework.source basilisk-labs/agent-plane now normalizes to basilisk-labs/agentplane to avoid 404; warns and migrates source on successful apply. Updated default config schema + spec examples to use agentplane repo URL; updated package keywords to remove agent-plane. Added unit test for normalization. bun run lint/test:full PASS.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T08:54:40.758Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
