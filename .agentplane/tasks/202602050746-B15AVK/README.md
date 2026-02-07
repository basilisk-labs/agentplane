---
id: "202602050746-B15AVK"
title: "Raise coverage and fix run-cli test warnings"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "testing"
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
commit:
  hash: "8b5eef4bdb8c0ce08f7d85f9e52ba31f3d15ff63"
  message: "✅ B15AVK test coverage and quiet output"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: raising coverage for packages/agentplane and removing run-cli test warnings; will add tests for recent CLI modules, run coverage and pre-commit hooks, then document and close the task."
  -
    author: "CODER"
    body: "Verified: bun run test:agentplane; bun run coverage; node packages/agentplane/bin/agentplane.js hooks run pre-commit"
doc_version: 2
doc_updated_at: "2026-02-05T08:33:14.221Z"
doc_updated_by: "CODER"
description: "Increase test coverage for packages/agentplane (lines>=80, branches>=70), add tests for recent CLI modules, and fix warnings in run-cli tests."
id_source: "generated"
---
## Summary

Raised test coverage past the global branch threshold and silenced noisy test output by adding targeted tests and stdout/stderr capture helpers.

## Scope

Added fs-utils and update-check tests, expanded silent CLI helpers in run-cli tests, and muted task-backend/recipes test output while keeping command behavior unchanged.

## Risks

Low risk. Test-only output capture could hide useful debug logs, so failures may show less context if the capture is too broad.

## Verify Steps

1. bun run test:agentplane
2. bun run coverage
3. node packages/agentplane/bin/agentplane.js hooks run pre-commit

## Rollback Plan

Revert the commit for this task or restore the prior versions of the modified test files and rerun the test suite.

## Plan


## Verification
