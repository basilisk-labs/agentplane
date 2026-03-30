---
id: "202603301856-H78XDH"
title: "Make fast help consume the same graph without special routing drift"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
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
doc_updated_at: "2026-03-30T18:56:58.253Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition."
sections:
  Summary: |-
    Make fast help consume the same graph without special routing drift
    
    Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
  Scope: |-
    - In scope: Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
    - Out of scope: unrelated refactors not required for "Make fast help consume the same graph without special routing drift".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing to isolate the exact behavior gap for R1.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing. Expected: the behavior described by R1.3 is observable and stable.
    2. Inspect the final diff for 202603301856-H78XDH. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
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

Make fast help consume the same graph without special routing drift

Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.

## Scope

- In scope: Implement Epic 1 / R1.3 from REFACTOR.md. `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
- Out of scope: unrelated refactors not required for "Make fast help consume the same graph without special routing drift".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing to isolate the exact behavior gap for R1.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing. Expected: the behavior described by R1.3 is observable and stable.
2. Inspect the final diff for 202603301856-H78XDH. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts`, help handler plumbing plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: `help` and `--help` still avoid unnecessary project resolution but no longer depend on a parallel routing definition.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
