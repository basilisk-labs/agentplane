---
id: "202603051024-JCP6DK"
title: "P1: Replace recursive stale-dist scan with manifest-based quick check"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing manifest+git quick stale-check in bootstrap to remove recursive src/dist walks on every CLI run."
events:
  -
    type: "status"
    at: "2026-03-05T10:32:54.576Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing manifest+git quick stale-check in bootstrap to remove recursive src/dist walks on every CLI run."
doc_version: 2
doc_updated_at: "2026-03-05T10:32:54.790Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan
