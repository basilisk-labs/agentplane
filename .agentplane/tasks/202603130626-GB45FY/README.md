---
id: "202603130626-GB45FY"
title: "Prepare GitHub Actions for Node 24"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:27:18.612Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-13T06:27:17.681Z"
doc_updated_by: "ORCHESTRATOR"
description: "Reduce future CI breakage by validating and updating GitHub Actions Node runtime assumptions before the Node 20 hosted transition deadline."
id_source: "generated"
---
## Summary

Prepare GitHub Actions for Node 24

Reduce future CI breakage by validating and updating GitHub Actions Node runtime assumptions before the Node 20 hosted transition deadline.

## Scope

- In scope: Reduce future CI breakage by validating and updating GitHub Actions Node runtime assumptions before the Node 20 hosted transition deadline.
- Out of scope: unrelated refactors not required for "Prepare GitHub Actions for Node 24".

## Plan

1. Audit GitHub Actions workflows for hosted Node runtime assumptions and update them to a Node 24-safe configuration where appropriate.
2. Keep repo tooling/tests green under the new workflow runtime settings and document any intentional exceptions.
3. Run workflow lint plus release-critical checks and record evidence.

## Verify Steps

1. Run `bun run workflows:lint`. Expected: all workflow files remain valid after Node runtime updates.
2. Run `bun run test:release:critical`. Expected: release scripts/contracts still pass under the updated workflow configuration.
3. Inspect `.github/workflows/*.yml`. Expected: Node runtime declarations are aligned on the new supported version or an explicit justified exception remains.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
