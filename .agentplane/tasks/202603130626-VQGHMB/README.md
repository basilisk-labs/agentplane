---
id: "202603130626-VQGHMB"
title: "Harden release-ready run-id verification"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T06:27:18.382Z"
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
doc_updated_at: "2026-03-13T06:27:17.213Z"
doc_updated_by: "ORCHESTRATOR"
description: "Verify that a manually supplied workflow run-id belongs to the expected SHA and completed successfully before using its artifact for publish recovery."
id_source: "generated"
---
## Summary

Harden release-ready run-id verification

Verify that a manually supplied workflow run-id belongs to the expected SHA and completed successfully before using its artifact for publish recovery.

## Scope

- In scope: Verify that a manually supplied workflow run-id belongs to the expected SHA and completed successfully before using its artifact for publish recovery.
- Out of scope: unrelated refactors not required for "Harden release-ready run-id verification".

## Plan

1. Harden `release-ready` source resolution so a supplied `run-id` is checked against GitHub workflow metadata instead of being trusted blindly.
2. Fail manual recovery when the run belongs to a different SHA or did not conclude successfully, and cover those paths with regression tests.
3. Re-run the release-critical script tests and record evidence.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: mismatched or failed `run-id` inputs are rejected and recovery states remain correct.
2. Run `bun run workflows:lint`. Expected: release workflow glue still matches the hardened resolver contract.
3. Inspect `scripts/lib/release-ready-source.mjs`. Expected: `run-id` path fetches actual run metadata and validates `head_sha` and successful conclusion.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
