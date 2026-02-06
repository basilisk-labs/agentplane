---
id: "202602061732-QQVMHA"
title: "P1.3: branch_pr base branch must be pinned"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "git"
  - "workflow"
  - "branching"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T18:48:27.725Z"
  updated_by: "CODER"
  note: "Approved: require pinned base in branch_pr (with main/master fallback)."
verification:
  state: "ok"
  updated_at: "2026-02-06T18:54:13.138Z"
  updated_by: "CODER"
  note: "P1.3: branch_pr base resolution no longer falls back to current branch when unpinned; prefers main/master if present. Ran bun run test:core, bun run build, bun run test:cli:core."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Remove silent fallback of branch_pr base branch to current; prefer main/master or require pin."
doc_version: 2
doc_updated_at: "2026-02-06T18:54:13.139Z"
doc_updated_by: "CODER"
description: "In branch_pr mode, require pinned base branch (or explicit default) and avoid silent fallback to current branch."
id_source: "generated"
---
## Summary

In branch_pr mode, resolveBaseBranch should not silently fall back to current branch when base is unpinned; prefer main/master or return null to force pinning.

## Scope

packages/core/src/git/base-branch.ts + tests; adjust agentplane hook behavior if needed.

## Plan

1) Update resolveBaseBranch: when mode=branch_pr and unpinned, prefer main/master if present, else return null.\n2) Update core base-branch tests.\n3) Run bun run test:core and bun run test:cli:core.

## Risks

Risk: Some flows relied on implicit current-branch base; this change will surface E_USAGE and require explicit pinning.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T18:54:13.138Z — VERIFY — ok

By: CODER

Note: P1.3: branch_pr base resolution no longer falls back to current branch when unpinned; prefers main/master if present. Ran bun run test:core, bun run build, bun run test:cli:core.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit(s) for this task.

## Verify Steps

- bun run test:core\n- bun run test:cli:core
