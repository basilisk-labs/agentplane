---
id: "202603301856-CKA7KC"
title: "Lock JSON output behavior with contract tests"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301721-9ZMFDY"
tags:
  - "code"
  - "refactor"
  - "tests"
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
doc_updated_at: "2026-03-30T18:56:55.385Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`."
sections:
  Summary: |-
    Lock JSON output behavior with contract tests
    
    Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
  Scope: |-
    - In scope: Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
    - Out of scope: unrelated refactors not required for "Lock JSON output behavior with contract tests".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli*.test.ts` to isolate the exact behavior gap for R0.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli*.test.ts`. Expected: the behavior described by R0.3 is observable and stable.
    2. Inspect the final diff for 202603301856-CKA7KC. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli*.test.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
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

Lock JSON output behavior with contract tests

Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.

## Scope

- In scope: Implement Epic 0 / R0.3 from REFACTOR.md. `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
- Out of scope: unrelated refactors not required for "Lock JSON output behavior with contract tests".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli*.test.ts` to isolate the exact behavior gap for R0.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli*.test.ts`. Expected: the behavior described by R0.3 is observable and stable.
2. Inspect the final diff for 202603301856-CKA7KC. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli*.test.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: `--output json` and `--json-errors` behavior are asserted, including wrapped stdout/stderr and `agent_json_v1`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
