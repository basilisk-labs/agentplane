---
id: "202602061732-RA99FE"
title: "P1.2: commit-msg hook must share CLI subject validator"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602061732-F17C02"
tags:
  - "git"
  - "hooks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T18:38:15.451Z"
  updated_by: "CODER"
  note: "Approved: commit-msg hook uses validateCommitSubject."
verification:
  state: "ok"
  updated_at: "2026-02-06T18:45:06.404Z"
  updated_by: "TESTER"
  note: "commit-msg hook now uses core validateCommitSubject (including anti-generic); added hook tests for generic rejection; bun run build and bun run test:cli:core passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Update commit-msg hook to share core validateCommitSubject logic (including anti-generic)."
doc_version: 2
doc_updated_at: "2026-02-06T18:45:06.410Z"
doc_updated_by: "CODER"
description: "Update hooks commit-msg to load config and call the same commit subject validator used by CLI (incl. anti-generic)."
id_source: "generated"
---
## Summary

Align commit-msg hook with CLI commit subject validator (incl. anti-generic) by using core validateCommitSubject.

## Scope

packages/agentplane/src/commands/hooks/index.ts + hook CLI tests.

## Plan

1) In hooks run commit-msg, load config and call validateCommitSubject.\n2) When AGENTPLANE_TASK_ID is unset, select a matching task based on suffix occurrence before validating.\n3) Update hook tests to cover anti-generic rejection (e.g., '✨ ABCDEF update').\n4) Run bun run test:cli:core.

## Risks

Risk: Hook becomes stricter and may reject previously accepted messages; tests will codify the intended gate.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T18:45:06.404Z — VERIFY — ok

By: TESTER

Note: commit-msg hook now uses core validateCommitSubject (including anti-generic); added hook tests for generic rejection; bun run build and bun run test:cli:core passed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit(s) for this task.

## Verify Steps

- bun run test:cli:core
