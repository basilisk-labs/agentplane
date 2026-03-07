---
id: "202603071710-PQVS2V"
title: "Harden release preflight against burned versions"
result_summary: "Immutable release preflight now blocks burned npm versions, remote tag conflicts, remote misconfiguration, and stale plan baselines before any local release mutation."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603071710-13WJ52"
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T19:10:40.881Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T19:20:27.231Z"
  updated_by: "CODER"
  note: "Passed: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts; bun run lint:core -- packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.test.ts; bun run --filter=agentplane build."
commit:
  hash: "7adf3e58255dee29f4c0c00c040288c864697d3e"
  message: "🚦 release: harden immutable preflight"
comments:
  -
    author: "CODER"
    body: "Start: move release burned-version and publish-precondition failures into an earlier immutable preflight stage so release apply never bumps versions, refreshes generated files, commits, or tags before those checks pass."
  -
    author: "CODER"
    body: "Verified: release apply now fails in an immutable preflight stage when the version is burned in npm, the remote tag already exists, the remote is missing, or package versions drift away from the planned baseline."
events:
  -
    type: "status"
    at: "2026-03-07T19:10:48.522Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: move release burned-version and publish-precondition failures into an earlier immutable preflight stage so release apply never bumps versions, refreshes generated files, commits, or tags before those checks pass."
  -
    type: "verify"
    at: "2026-03-07T19:20:27.231Z"
    author: "CODER"
    state: "ok"
    note: "Passed: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts; bun run lint:core -- packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.test.ts; bun run --filter=agentplane build."
  -
    type: "status"
    at: "2026-03-07T19:20:28.768Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release apply now fails in an immutable preflight stage when the version is burned in npm, the remote tag already exists, the remote is missing, or package versions drift away from the planned baseline."
doc_version: 2
doc_updated_at: "2026-03-07T19:20:28.768Z"
doc_updated_by: "CODER"
description: "Fail release preflight early on burned npm versions, tag/version drift, and missing publish preconditions before release apply mutates local state."
id_source: "generated"
---
## Summary

Harden release preflight against burned versions

Fail release preflight early on burned npm versions, tag/version drift, and missing publish preconditions before release apply mutates local state.

## Scope

- In scope: Fail release preflight early on burned npm versions, tag/version drift, and missing publish preconditions before release apply mutates local state..
- Out of scope: unrelated refactors not required for "Harden release preflight against burned versions".

## Plan

1. Audit the current release preflight order around dirty tree, local tags, npm version availability, and publish gate failures to isolate which cases can still slip past before local mutations begin. 2. Refactor release apply so burned npm versions, tag/version drift, and other publish preconditions fail in an immutable preflight stage before any version bump, generated-file refresh, commit, or tag creation. 3. Add regression tests for burned-version and partial-release edge cases, then rerun targeted release, lint, and build checks.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T19:20:27.231Z — VERIFY — ok

By: CODER

Note: Passed: bunx vitest run packages/agentplane/src/commands/release/apply.test.ts; bun run lint:core -- packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.test.ts; bun run --filter=agentplane build.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T19:10:48.522Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
