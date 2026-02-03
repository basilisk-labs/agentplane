---
id: "202602021612-T4YZTM"
title: "Fix duplicate task README sections"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["tasks"]
verify: []
commit: { hash: "2d9aed3084ab8b9144cc8bd5859b0b5639543fce", message: "🧾 T4YZTM record verify run" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: bun test packages/agentplane/src/run-cli.core.test.ts" }
doc_version: 2
doc_updated_at: "2026-02-03T06:05:31.310Z"
doc_updated_by: "agentplane"
description: "Investigate task README generation and remove duplicate required section headings."
id_source: "generated"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Detect multi-section input in task doc set; treat it as full doc to avoid duplicate headings.

## Scope

Update task doc set handling in run-cli and add coverage in run-cli.core.test.

## Risks

Low risk; logic only changes when section text includes doc headings.

## Verify Steps

Not run (not requested).

## Rollback Plan

Revert the changes in run-cli.ts and run-cli.core.test.ts.

## Verify Steps

Attempted: bun test packages/agentplane/src/run-cli.core.test.ts (timed out after 10s; output showed tests running and passing up to runCli > integrate supports merge strategy).

## Verify Steps

Ran: bun test packages/agentplane/src/run-cli.core.test.ts (pass).

## Verify Steps

Ran: bun test packages/agentplane/src/run-cli.core.test.ts (pass).
