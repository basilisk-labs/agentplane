---
id: "202602070855-96MNE3"
title: "Tests: GitContext -z parsing + TaskStore mtime guard + writeIfChanged"
status: "DOING"
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
  note: "Approved in chat on 2026-02-07."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add coverage for GitContext -z parsing, TaskStore conflict guard, and write-if-changed."
doc_version: 2
doc_updated_at: "2026-02-07T12:33:18.931Z"
doc_updated_by: "ORCHESTRATOR"
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


## Rollback Plan

Revert the added tests; no production behavior changes.
