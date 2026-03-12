---
id: "202603121125-SNMAT3"
title: "Patch stabilization: harden close and recovery diagnostics"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T11:36:43.252Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after identifying a concrete remaining gap: close/task commit diagnostics do not yet classify formatter or lint blockers into state-oriented guidance."
verification:
  state: "ok"
  updated_at: "2026-03-12T11:37:45.017Z"
  updated_by: "CODER"
  note: "Verified hook blocker classification in close and task commit diagnostics."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: classify formatter and lint hook blockers so close and task commit failures surface actionable likely-cause and next-action guidance instead of relying only on raw hook output."
events:
  -
    type: "status"
    at: "2026-03-12T11:36:44.665Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify formatter and lint hook blockers so close and task commit failures surface actionable likely-cause and next-action guidance instead of relying only on raw hook output."
  -
    type: "verify"
    at: "2026-03-12T11:37:45.017Z"
    author: "CODER"
    state: "ok"
    note: "Verified hook blocker classification in close and task commit diagnostics."
doc_version: 3
doc_updated_at: "2026-03-12T11:37:45.018Z"
doc_updated_by: "CODER"
description: "Tighten remaining state-oriented diagnostics around finish close-commit and recovery paths where failures still rely too much on raw git or hook output."
id_source: "generated"
---
## Summary

Patch stabilization: harden close and recovery diagnostics

Tighten remaining state-oriented diagnostics around finish close-commit and recovery paths where failures still rely too much on raw git or hook output.

## Scope

- In scope: Tighten remaining state-oriented diagnostics around finish close-commit and recovery paths where failures still rely too much on raw git or hook output.
- Out of scope: unrelated refactors not required for "Patch stabilization: harden close and recovery diagnostics".

## Plan

1. Identify remaining finish close-commit or recovery paths whose failure diagnostics still depend too much on raw hook or git output.
2. Refine the state, likelyCause, and nextAction mapping without changing successful-path behavior.
3. Cover the gap with focused regression tests.

## Verify Steps

- Targeted close or recovery failure now reports a state-oriented summary with actionable recovery text.
- Existing successful finish paths remain unchanged.
- Focused lifecycle or command diagnostics tests pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T11:37:45.017Z — VERIFY — ok

By: CODER

Note: Verified hook blocker classification in close and task commit diagnostics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T11:36:44.665Z, excerpt_hash=sha256:ff817e7e21f0062d4f1091d5a130fabb812c315e803f8fe3e1fa66bb83cef330

Details:

Checks:
- bun x vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts --hookTimeout 60000 --testTimeout 60000
- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
