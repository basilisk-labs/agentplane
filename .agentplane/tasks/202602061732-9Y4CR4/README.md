---
id: "202602061732-9Y4CR4"
title: "P0.4: Robust git changed paths parsing (-z)"
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
  updated_at: "2026-02-06T18:16:39.708Z"
  updated_by: "CODER"
  note: "Approved: move to -z based git path parsing and add regression test."
verification:
  state: "ok"
  updated_at: "2026-02-06T18:19:21.507Z"
  updated_by: "TESTER"
  note: "Updated core/agentplane git path listing to -z based parsing; added CLI regression for spaced file paths; bun run test:core and bun run test:cli:core passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Replace porcelain parsing with -z based path enumeration and add regression for spaced paths."
doc_version: 2
doc_updated_at: "2026-02-06T18:19:21.516Z"
doc_updated_by: "CODER"
description: "Replace porcelain v1 parsing with -z based path enumeration (diff --name-only -z / --cached) to handle spaces/quotes/renames safely."
id_source: "generated"
---
## Summary

Replace fragile git porcelain parsing with -z/NUL-based path listing for changed/staged/unstaged/untracked files.

## Scope

packages/core/src/git/git-utils.ts; packages/agentplane/src/commands/guard/index.ts; add CLI regression test for paths with spaces.

## Plan

1) Update core getStagedFiles/getUnstagedFiles to use -z outputs.\n2) Replace guard gitStatusChangedPaths with -z based enumeration (diff + ls-files).\n3) Add CLI regression test ensuring commit-from-comment stages a path with spaces.\n4) Run bun run test:cli:core and bun run test:core.

## Risks

Risk: -z parsing changes edge cases (renames, submodules); keep semantics close to previous behavior (report new path for renames).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T18:19:21.507Z — VERIFY — ok

By: TESTER

Note: Updated core/agentplane git path listing to -z based parsing; added CLI regression for spaced file paths; bun run test:core and bun run test:cli:core passed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit(s) for this task.

## Verify Steps

- bun run test:core\n- bun run test:cli:core
