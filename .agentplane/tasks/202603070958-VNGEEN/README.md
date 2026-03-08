---
id: "202603070958-VNGEEN"
title: "Expand diagnostics for missing policy modules after upgrade"
result_summary: "Doctor now diagnoses missing managed policy files after partial or stale upgrades."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T10:00:00.767Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved doctor/upgrade diagnostics expansion for missing policy modules after partial or stale upgrades."
verification:
  state: "ok"
  updated_at: "2026-03-07T10:17:43.226Z"
  updated_by: "REVIEWER"
  note: "Verified: doctor command tests cover the incomplete managed policy tree and recovery guidance."
commit:
  hash: "ebb2bd84e76ab6687723d6579f2b6d72c72e0e0e"
  message: "🩺 VNGEEN task: diagnose missing managed policy tree"
comments:
  -
    author: "CODER"
    body: "Start: expand doctor and upgrade diagnostics so a workspace with a new gateway but missing managed policy modules gets a concrete explanation and recovery command instead of a vague missing-path failure."
  -
    author: "CODER"
    body: "Verified: doctor now explains hybrid gateway/policy states and points stale-upgrade users to a concrete recovery command."
events:
  -
    type: "status"
    at: "2026-03-07T10:00:04.599Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: expand doctor and upgrade diagnostics so a workspace with a new gateway but missing managed policy modules gets a concrete explanation and recovery command instead of a vague missing-path failure."
  -
    type: "verify"
    at: "2026-03-07T10:17:43.226Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: doctor command tests cover the incomplete managed policy tree and recovery guidance."
  -
    type: "status"
    at: "2026-03-07T10:17:43.740Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: doctor now explains hybrid gateway/policy states and points stale-upgrade users to a concrete recovery command."
doc_version: 3
doc_updated_at: "2026-03-07T10:17:43.740Z"
doc_updated_by: "CODER"
description: "Improve doctor and upgrade diagnostics so workspaces with a new AGENTS gateway but missing managed policy modules get an explicit, actionable explanation and next steps instead of a vague missing-path failure."
id_source: "generated"
---
## Summary

Expand diagnostics for missing policy modules after upgrade

Improve doctor and upgrade diagnostics so workspaces with a new AGENTS gateway but missing managed policy modules get an explicit, actionable explanation and next steps instead of a vague missing-path failure.

## Scope

- In scope: Improve doctor and upgrade diagnostics so workspaces with a new AGENTS gateway but missing managed policy modules get an explicit, actionable explanation and next steps instead of a vague missing-path failure..
- Out of scope: unrelated refactors not required for "Expand diagnostics for missing policy modules after upgrade".

## Plan

1. Inspect doctor/workspace checks and upgrade messaging to find where a new policy gateway can coexist with missing managed policy modules after a partial/manual update.
2. Add explicit diagnostics that identify missing managed policy files, explain the likely stale-CLI/partial-upgrade cause, and point to the correct recovery command.
3. Add test coverage for the new diagnostics and update docs/help where the new recovery guidance should appear.
4. Run targeted doctor/upgrade tests and confirm the resulting messages are specific enough to explain the failure mode described by users.

## Verify Steps

1. Run doctor/upgrade diagnostics coverage: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/upgrade.agent-mode.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts --hookTimeout 60000 --testTimeout 60000\n2. Confirm doctor explains the missing policy-tree scenario with concrete recovery steps instead of a generic missing-path error.\n3. Confirm upgrade output shows source/version details before applying managed files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T10:17:43.226Z — VERIFY — ok

By: REVIEWER

Note: Verified: doctor command tests cover the incomplete managed policy tree and recovery guidance.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T10:00:04.599Z, excerpt_hash=sha256:fbfce11ef6dc8fbe45f2340660a958e0fa8883d99ae39bca882295450cfa0b46

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
