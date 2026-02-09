---
id: "202602091522-Y4ZNSA"
title: "upgrade: ignore baseline/state artifacts in git"
status: "TODO"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "upgrade"
  - "docs"
  - "quality"
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
doc_updated_at: "2026-02-09T15:23:04.089Z"
doc_updated_by: "DOCS"
description: "Ensure upgrade state (baseline, lock, reports) is not accidentally tracked or committed by adding .agentplane/.upgrade/** to .gitignore and aligning any docs/tests."
id_source: "generated"
---
## Summary

Prevent upgrade baseline/state artifacts from showing up in PRs by ignoring .agentplane/.upgrade/** in git.

## Scope

.gitignore and any related docs/tests that mention upgrade state locations.

## Plan

1. Add .agentplane/.upgrade/ to .gitignore.\n2. Confirm upgrade tests still pass.\n3. bun run lint + bun run test:full.

## Risks

Low risk; only affects git ignore behavior.

## Verify Steps

- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert .gitignore changes.
