---
id: "202603130626-VQGHMB"
title: "Harden release-ready run-id verification"
status: "DOING"
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
  state: "ok"
  updated_at: "2026-03-13T06:34:20.105Z"
  updated_by: "CODER"
  note: "Release-ready run-id inputs are now verified against real workflow metadata."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: validate explicit release-ready run-id inputs against actual GitHub workflow metadata before accepting them for publish recovery."
events:
  -
    type: "status"
    at: "2026-03-13T06:31:59.650Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: validate explicit release-ready run-id inputs against actual GitHub workflow metadata before accepting them for publish recovery."
  -
    type: "verify"
    at: "2026-03-13T06:34:20.105Z"
    author: "CODER"
    state: "ok"
    note: "Release-ready run-id inputs are now verified against real workflow metadata."
doc_version: 3
doc_updated_at: "2026-03-13T06:34:20.106Z"
doc_updated_by: "CODER"
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
#### 2026-03-13T06:34:20.105Z — VERIFY — ok

By: CODER

Note: Release-ready run-id inputs are now verified against real workflow metadata.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T06:31:59.651Z, excerpt_hash=sha256:0afb4c38e9ef93c7a4110c07eda5cb8759bfb426ced15d5e0a5ee0e1624dcaf7

Details:

Command: bun x vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 2 files, 15 tests passed; explicit run-id success, mismatch, and failure paths are covered, and release recovery states remain green.
Scope: release-ready source resolution and release recovery diagnostics.

Command: bun run workflows:lint
Result: pass
Evidence: workflow lint and workflow command contract both returned OK.
Scope: release workflow glue after resolver hardening.

Command: ./node_modules/.bin/eslint scripts/lib/github-actions-workflow-status.mjs scripts/lib/release-ready-source.mjs packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts
Result: pass
Evidence: touched runtime and regression files pass ESLint.
Scope: release-ready resolver helpers and tests.

Command: ./node_modules/.bin/prettier --check scripts/lib/github-actions-workflow-status.mjs scripts/lib/release-ready-source.mjs packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts
Result: pass
Evidence: touched runtime and regression files match Prettier.
Scope: formatting of release-ready resolver helpers and tests.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
