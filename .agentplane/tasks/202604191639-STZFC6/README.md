---
id: "202604191639-STZFC6"
title: "Route config loading through Zod validation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T18:27:29.374Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: tracing the live loadConfig path so the runtime moves to a Zod-first validation route without widening the config API surface."
events:
  -
    type: "status"
    at: "2026-04-19T18:27:30.631Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tracing the live loadConfig path so the runtime moves to a Zod-first validation route without widening the config API surface."
doc_version: 3
doc_updated_at: "2026-04-19T18:27:30.643Z"
doc_updated_by: "CODER"
description: "Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed."
sections:
  Summary: |-
    Route config loading through Zod validation
    
    Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed.
  Scope: |-
    - In scope: Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed.
    - Out of scope: unrelated refactors not required for "Route config loading through Zod validation".
  Plan: "1. Trace the current loadConfig runtime path and identify where config.ts still acts as a fallback wrapper instead of a Zod-first source of truth. 2. Switch the runtime load path to the Zod validator with the smallest public API churn and update the focused tests. 3. Verify the config runtime path and record the result before moving to the next schema task."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Route config loading through Zod validation

Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed.

## Scope

- In scope: Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed.
- Out of scope: unrelated refactors not required for "Route config loading through Zod validation".

## Plan

1. Trace the current loadConfig runtime path and identify where config.ts still acts as a fallback wrapper instead of a Zod-first source of truth. 2. Switch the runtime load path to the Zod validator with the smallest public API churn and update the focused tests. 3. Verify the config runtime path and record the result before moving to the next schema task.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
