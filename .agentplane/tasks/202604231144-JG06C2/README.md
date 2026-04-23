---
id: "202604231144-JG06C2"
title: "Integrate v0.4 prompt branch"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "integration"
  - "prompt-assembly"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T11:44:50.977Z"
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
    body: "Start: integrate codex/v0.4 into a protected-main PR branch, resolve the incident registry conflict, and verify prompt-module scope plus policy health."
events:
  -
    type: "status"
    at: "2026-04-23T11:45:01.887Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: integrate codex/v0.4 into a protected-main PR branch, resolve the incident registry conflict, and verify prompt-module scope plus policy health."
doc_version: 3
doc_updated_at: "2026-04-23T11:45:01.912Z"
doc_updated_by: "CODER"
description: "Merge the existing local codex/v0.4 prompt assembly branch into main, resolve integration conflicts, run focused verification, and publish through PR."
sections:
  Summary: |-
    Integrate v0.4 prompt branch
    
    Merge the existing local codex/v0.4 prompt assembly branch into main, resolve integration conflicts, run focused verification, and publish through PR.
  Scope: |-
    - In scope: Merge the existing local codex/v0.4 prompt assembly branch into main, resolve integration conflicts, run focused verification, and publish through PR.
    - Out of scope: unrelated refactors not required for "Integrate v0.4 prompt branch".
  Plan: "Goal: integrate the existing local codex/v0.4 prompt assembly branch into main through a protected-main PR. Scope: merge codex/v0.4 into codex/integrate-v0.4, preserve main's current incident registry entries and v0.4 incident/task/code additions, resolve conflicts minimally, run prompt-module focused tests plus repo policy/doctor checks and pre-push gate, open PR, wait for hosted checks, then merge. Out of scope: implementing the remaining planned v0.4 TODO tasks beyond the already committed branch content."
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

Integrate v0.4 prompt branch

Merge the existing local codex/v0.4 prompt assembly branch into main, resolve integration conflicts, run focused verification, and publish through PR.

## Scope

- In scope: Merge the existing local codex/v0.4 prompt assembly branch into main, resolve integration conflicts, run focused verification, and publish through PR.
- Out of scope: unrelated refactors not required for "Integrate v0.4 prompt branch".

## Plan

Goal: integrate the existing local codex/v0.4 prompt assembly branch into main through a protected-main PR. Scope: merge codex/v0.4 into codex/integrate-v0.4, preserve main's current incident registry entries and v0.4 incident/task/code additions, resolve conflicts minimally, run prompt-module focused tests plus repo policy/doctor checks and pre-push gate, open PR, wait for hosted checks, then merge. Out of scope: implementing the remaining planned v0.4 TODO tasks beyond the already committed branch content.

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
