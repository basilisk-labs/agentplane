---
id: "202602070855-96MNE3"
title: "Tests: GitContext -z parsing + TaskStore mtime guard + writeIfChanged"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202602070855-G8K609"
tags:
  - "code"
  - "testing"
verify:
  - "bun run typecheck"
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T12:33:14.114Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T12:33:14.114Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T12:37:16.533Z"
  updated_by: "CODEX"
  note: "Verified: bun run typecheck; bun run lint; bun run test:agentplane"
commit:
  hash: "59afd1b41654440af77eefa4193c1e841638128d"
  message: "✅ 96MNE3 tests: GitContext -z parsing + TaskStore mtime guard"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add coverage for GitContext -z parsing, TaskStore conflict guard, and write-if-changed."
  -
    author: "CODEX"
    body: "Verified: bun run typecheck; bun run lint; bun run test:agentplane. Summary: add GitContext porcelain -z parsing tests and TaskStore.update mtime guard retry/fail tests. Implementation: 59afd1b41654."
doc_version: 2
doc_updated_at: "2026-02-07T12:37:22.937Z"
doc_updated_by: "CODEX"
description: "Add focused tests for GitContext.statusChangedPaths handling spaces/renames/deletes (-z), TaskStore.update conflict guard, and stable JSON write-if-changed no-diff behavior."
id_source: "explicit"
---
## Summary

Add focused unit tests for GitContext porcelain -z parsing, TaskStore.update mtime conflict guard, and write-if-changed behavior.

## Scope

In scope: new tests under packages/agentplane/src for GitContext.statusChangedPaths edge cases, TaskStore.update retry/guard, and writeTextIfChanged/writeJsonStableIfChanged unchanged-content behavior.

## Plan

1) Add GitContext.statusChangedPaths tests for porcelain -z parsing (spaces, renames, deletes, untracked).\n2) Add TaskStore.update test that simulates concurrent modification (mtime change) and asserts retry/guard behavior.\n3) Add write-if-changed tests: identical content yields changed=false and does not modify file.\n4) Run typecheck, lint, test:agentplane.

## Risks

Risk: brittle tests depending on git porcelain formatting; Risk: tests that touch real filesystem without isolation.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T12:37:16.533Z — VERIFY — ok

By: CODEX

Note: Verified: bun run typecheck; bun run lint; bun run test:agentplane

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the added tests; no production behavior changes.
