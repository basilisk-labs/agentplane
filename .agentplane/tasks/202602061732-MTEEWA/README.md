---
id: "202602061732-MTEEWA"
title: "P0.3: Unify allow prefix normalization"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "git"
  - "workflow"
  - "cli"
  - "guard"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T17:57:58.678Z"
  updated_by: "CODER"
  note: "Approved: unify allow prefix normalization and add ./ regression tests."
verification:
  state: "ok"
  updated_at: "2026-02-06T18:01:45.799Z"
  updated_by: "TESTER"
  note: "bun run test:cli:core passed; added regressions for ./ allow prefixes in commit wrapper and comment-driven start."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Unify allow prefix normalization (./, trailing slashes, backslashes) and add regression tests."
doc_version: 2
doc_updated_at: "2026-02-06T18:01:45.806Z"
doc_updated_by: "CODER"
description: "Make allow prefix normalization consistent across staging and guard checks (trim ./, trailing slashes, backslashes, double slashes)."
id_source: "generated"
---
## Summary

Unify allow prefix normalization across staging and guard checks so ./src and similar inputs behave consistently.

## Scope

packages/agentplane/src/commands/guard/index.ts; add CLI regression tests for ./ prefixes.

## Plan

1) Replace ad-hoc allow prefix trimming with a single normalizeAllowPrefix implementation.\n2) Use it in guardCommitCheck and stageAllowlist.\n3) Add CLI regression test for comment-driven commit with --commit-allow ./<path>.\n4) Run bun run test:cli:core.

## Risks

Risk: Changing normalization may alter edge-case behavior; ensure '.' stays special-cased and empty prefixes are rejected.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T18:01:45.799Z — VERIFY — ok

By: TESTER

Note: bun run test:cli:core passed; added regressions for ./ allow prefixes in commit wrapper and comment-driven start.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit(s) for this task.

## Verify Steps

- bun run test:cli:core\n- bun run test:agentplane
