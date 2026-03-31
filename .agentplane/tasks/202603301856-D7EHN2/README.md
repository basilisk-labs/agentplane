---
id: "202603301856-D7EHN2"
title: "Make the normal command dispatcher consume the canonical graph"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603301856-HVS36K"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T08:28:01.821Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after R1.1: remove duplicate runtime longest-prefix match via canonical graph lookup."
verification:
  state: "ok"
  updated_at: "2026-03-31T08:31:23.773Z"
  updated_by: "CODER"
  note: "Focused CLI routing suite passed after replacing runtime longest-prefix rematch with exact registry lookup from the canonical command match."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove the second runtime longest-prefix match by reusing the canonical command match for dispatch metadata and exact handler lookup."
events:
  -
    type: "status"
    at: "2026-03-31T08:28:40.474Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the second runtime longest-prefix match by reusing the canonical command match for dispatch metadata and exact handler lookup."
  -
    type: "verify"
    at: "2026-03-31T08:31:23.773Z"
    author: "CODER"
    state: "ok"
    note: "Focused CLI routing suite passed after replacing runtime longest-prefix rematch with exact registry lookup from the canonical command match."
doc_version: 3
doc_updated_at: "2026-03-31T08:31:23.778Z"
doc_updated_by: "CODER"
description: "Implement Epic 1 / R1.2 from REFACTOR.md. runtime dispatch no longer performs two independent longest-prefix match implementations."
sections:
  Summary: |-
    Make the normal command dispatcher consume the canonical graph
    
    Implement Epic 1 / R1.2 from REFACTOR.md. runtime dispatch no longer performs two independent longest-prefix match implementations.
  Scope: |-
    - In scope: Implement Epic 1 / R1.2 from REFACTOR.md. runtime dispatch no longer performs two independent longest-prefix match implementations.
    - Out of scope: unrelated refactors not required for "Make the normal command dispatcher consume the canonical graph".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts`, `packages/agentplane/src/cli/spec/registry.ts` to isolate the exact behavior gap for R1.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: runtime dispatch no longer performs two independent longest-prefix match implementations.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`, `packages/agentplane/src/cli/spec/registry.ts`. Expected: the behavior described by R1.2 is observable and stable.
    2. Inspect the final diff for 202603301856-D7EHN2. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts`, `packages/agentplane/src/cli/spec/registry.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: runtime dispatch no longer performs two independent longest-prefix match implementations.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T08:31:23.773Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused CLI routing suite passed after replacing runtime longest-prefix rematch with exact registry lookup from the canonical command match.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T08:28:40.476Z, excerpt_hash=sha256:349330bd41fdfadd20cab31c19791f4f664cfed39453aeab3e2052dc8979e89d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make the normal command dispatcher consume the canonical graph

Implement Epic 1 / R1.2 from REFACTOR.md. runtime dispatch no longer performs two independent longest-prefix match implementations.

## Scope

- In scope: Implement Epic 1 / R1.2 from REFACTOR.md. runtime dispatch no longer performs two independent longest-prefix match implementations.
- Out of scope: unrelated refactors not required for "Make the normal command dispatcher consume the canonical graph".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts`, `packages/agentplane/src/cli/spec/registry.ts` to isolate the exact behavior gap for R1.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: runtime dispatch no longer performs two independent longest-prefix match implementations.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`, `packages/agentplane/src/cli/spec/registry.ts`. Expected: the behavior described by R1.2 is observable and stable.
2. Inspect the final diff for 202603301856-D7EHN2. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts`, `packages/agentplane/src/cli/spec/registry.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: runtime dispatch no longer performs two independent longest-prefix match implementations.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T08:31:23.773Z — VERIFY — ok

By: CODER

Note: Focused CLI routing suite passed after replacing runtime longest-prefix rematch with exact registry lookup from the canonical command match.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T08:28:40.476Z, excerpt_hash=sha256:349330bd41fdfadd20cab31c19791f4f664cfed39453aeab3e2052dc8979e89d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
