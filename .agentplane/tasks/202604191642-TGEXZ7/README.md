---
id: "202604191642-TGEXZ7"
title: "Baseline knip and remove easy dead exports"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T15:31:07.343Z"
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
    body: "Start: Adding knip warn-only dead-code detection with scoped configuration and CI visibility."
events:
  -
    type: "status"
    at: "2026-04-20T15:31:09.493Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding knip warn-only dead-code detection with scoped configuration and CI visibility."
doc_version: 3
doc_updated_at: "2026-04-20T15:31:09.514Z"
doc_updated_by: "CODER"
description: "Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports."
sections:
  Summary: |-
    Baseline knip and remove easy dead exports
    
    Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports.
  Scope: |-
    - In scope: Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports.
    - Out of scope: unrelated refactors not required for "Baseline knip and remove easy dead exports".
  Plan: "Add knip as a dev-only dead-code detector in warn-only mode. Create a root knip config scoped to current workspace packages and scripts, add package scripts that generate a report without failing CI yet, wire the warn-only check into CI/release guard after architecture checks, document the command/status, and remove only obviously unused exports if knip identifies low-risk deletions. Verification: knip warn-only command completes, format/lint/build pass, and any intentionally retained findings are documented as baseline debt."
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

Baseline knip and remove easy dead exports

Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports.

## Scope

- In scope: Epic K, I′, and J′. Add knip in warn-only mode, baseline its report, and remove low-risk dead exports.
- Out of scope: unrelated refactors not required for "Baseline knip and remove easy dead exports".

## Plan

Add knip as a dev-only dead-code detector in warn-only mode. Create a root knip config scoped to current workspace packages and scripts, add package scripts that generate a report without failing CI yet, wire the warn-only check into CI/release guard after architecture checks, document the command/status, and remove only obviously unused exports if knip identifies low-risk deletions. Verification: knip warn-only command completes, format/lint/build pass, and any intentionally retained findings are documented as baseline debt.

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
