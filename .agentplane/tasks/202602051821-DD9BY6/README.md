---
id: "202602051821-DD9BY6"
title: "Update init version expectations in tests"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["testing"]
verify: []
commit: { hash: "2130610b4a0f53fc3433b024b7a71dfed1ff0b78", message: "🧪 DD9BY6 update init version expectations" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: update run-cli tests to match the bumped package version." }
  - { author: "ORCHESTRATOR", body: "Verified: run-cli core tests pass with updated 0.1.6 install subject expectations." }
doc_version: 2
doc_updated_at: "2026-02-05T18:23:53.111Z"
doc_updated_by: "ORCHESTRATOR"
description: "Adjust run-cli core tests to expect the current package version (0.1.6) after the version bump."
id_source: "generated"
---
## Summary

Update init tests to expect agentplane 0.1.6 after version bump.

## Scope

Update run-cli core test assertions for init install commit subject.

## Risks

Low: mismatched expectations could still break CI/push hooks.

## Verify Steps

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts

## Verification

Ran: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts

## Rollback Plan

Restore previous version strings in test expectations.
