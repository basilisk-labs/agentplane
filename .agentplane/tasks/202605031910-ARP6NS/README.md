---
id: "202605031910-ARP6NS"
title: "T40: Add release demo freshness check"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031909-A0VV91"
tags:
  - "demo"
  - "ops"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:10:03.597Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-05-03T19:10:03.197Z"
doc_updated_by: "PLANNER"
description: "Add release:demo:check so the vhs tape is re-recorded and diffed after minor releases."
sections:
  Summary: |-
    T40: Add release demo freshness check

    Add release:demo:check so the vhs tape is re-recorded and diffed after minor releases.
  Scope: |-
    - In scope: Add release:demo:check so the vhs tape is re-recorded and diffed after minor releases.
    - Out of scope: unrelated refactors not required for "T40: Add release demo freshness check".
  Plan: "Wire the demo freshness command into release workflow checks and verify it catches stale output without making release flaky."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
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

T40: Add release demo freshness check

Add release:demo:check so the vhs tape is re-recorded and diffed after minor releases.

## Scope

- In scope: Add release:demo:check so the vhs tape is re-recorded and diffed after minor releases.
- Out of scope: unrelated refactors not required for "T40: Add release demo freshness check".

## Plan

Wire the demo freshness command into release workflow checks and verify it catches stale output without making release flaky.

## Verify Steps

1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
