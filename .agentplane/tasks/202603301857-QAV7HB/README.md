---
id: "202603301857-QAV7HB"
title: "Merge global-flag prescan and parse into one result model"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301856-H78XDH"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
doc_updated_at: "2026-03-30T18:57:13.493Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior."
sections:
  Summary: |-
    Merge global-flag prescan and parse into one result model
    
    Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
  Scope: |-
    - In scope: Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
    - Out of scope: unrelated refactors not required for "Merge global-flag prescan and parse into one result model".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/globals.ts` to isolate the exact behavior gap for R6.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/globals.ts`. Expected: the behavior described by R6.1 is observable and stable.
    2. Inspect the final diff for 202603301857-QAV7HB. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/globals.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Merge global-flag prescan and parse into one result model

Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.

## Scope

- In scope: Implement Epic 6 / R6.1 from REFACTOR.md. the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
- Out of scope: unrelated refactors not required for "Merge global-flag prescan and parse into one result model".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/globals.ts` to isolate the exact behavior gap for R6.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/globals.ts`. Expected: the behavior described by R6.1 is observable and stable.
2. Inspect the final diff for 202603301857-QAV7HB. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/globals.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the CLI does not walk the same argv slice twice just to preserve `--json-errors` behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
