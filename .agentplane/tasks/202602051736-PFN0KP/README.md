---
id: "202602051736-PFN0KP"
title: "Fix release test expectations"
status: "DOING"
priority: "high"
owner: "TESTER"
depends_on: []
tags: ["testing", "release"]
verify: []
commit: null
comments:
  - { author: "TESTER", body: "Start: adjust test expectations for 0.1.5 and verify/zip exit codes." }
doc_version: 2
doc_updated_at: "2026-02-05T17:41:22.053Z"
doc_updated_by: "TESTER"
description: "Update tests to reflect 0.1.5 version and verify/zip exit codes so pre-push passes."
id_source: "generated"
---
## Summary

Update tests for new version and current verify/zip error behavior.

## Scope

Adjust failing run-cli tests for verify approvals, zip traversal exit codes, and version expectations.

## Risks

Incorrect expectations could mask regressions in verify or archive safety.

## Verify Steps

Run vitest run (full) or relevant run-cli tests; confirm pre-push passes.

## Verification

Ran: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts; bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts.

## Rollback Plan

Revert test expectation changes if they hide real regressions.
