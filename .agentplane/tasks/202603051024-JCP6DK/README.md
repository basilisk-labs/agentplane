---
id: "202603051024-JCP6DK"
title: "P1: Replace recursive stale-dist scan with manifest-based quick check"
result_summary: "Bootstrap stale-check now uses build manifests and git state instead of full recursive scans."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-05T10:37:30.613Z"
  updated_by: "CODER"
  note: "Build manifests generated for core/agentplane; quickstart startup check now uses manifest+git path; stale check reproduced with touched src entrypoint."
commit:
  hash: "8f76ba4f160531c8e64e6c729168bd51a93c3e2b"
  message: "🚧 JCP6DK cli: switch stale-check to manifest+git quick path"
comments:
  -
    author: "CODER"
    body: "Start: Implementing manifest+git quick stale-check in bootstrap to remove recursive src/dist walks on every CLI run."
  -
    author: "CODER"
    body: "Verified: Replaced recursive stale-dist tree scans with build-manifest plus git-based quick checks and fallback diagnostics."
events:
  -
    type: "status"
    at: "2026-03-05T10:32:54.576Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing manifest+git quick stale-check in bootstrap to remove recursive src/dist walks on every CLI run."
  -
    type: "verify"
    at: "2026-03-05T10:37:30.613Z"
    author: "CODER"
    state: "ok"
    note: "Build manifests generated for core/agentplane; quickstart startup check now uses manifest+git path; stale check reproduced with touched src entrypoint."
  -
    type: "status"
    at: "2026-03-05T10:37:36.371Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Replaced recursive stale-dist tree scans with build-manifest plus git-based quick checks and fallback diagnostics."
doc_version: 2
doc_updated_at: "2026-03-05T10:37:36.371Z"
doc_updated_by: "CODER"
description: "Remove per-run full source/dist tree walks from CLI bootstrap; use a lightweight build manifest/sentinel for stale-dist detection with equivalent safety."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Add build-manifest generator script for package builds (agentplane/core). 2) Wire package build scripts to emit dist/.build-manifest.json with git HEAD and build timestamp. 3) Replace recursive stale-dist scan in bin bootstrap with manifest+git-based quick check. 4) Keep safe fallback path when manifest missing. 5) Verify by running build and timing startup before/after.

## Risks


## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-05T10:37:30.613Z — VERIFY — ok

By: CODER

Note: Build manifests generated for core/agentplane; quickstart startup check now uses manifest+git path; stale check reproduced with touched src entrypoint.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-05T10:32:54.790Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
