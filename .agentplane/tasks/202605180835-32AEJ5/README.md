---
id: "202605180835-32AEJ5"
title: "Fix v0.6.2 ACR example version drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T08:35:45.458Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix release-blocking ACR example version drift for v0.6.2 publish validation."
events:
  -
    type: "status"
    at: "2026-05-18T08:35:57.892Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix release-blocking ACR example version drift for v0.6.2 publish validation."
doc_version: 3
doc_updated_at: "2026-05-18T08:35:57.892Z"
doc_updated_by: "CODER"
description: "Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2."
sections:
  Summary: |-
    Fix v0.6.2 ACR example version drift

    Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.
  Scope: |-
    - In scope: Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.
    - Out of scope: unrelated refactors not required for "Fix v0.6.2 ACR example version drift".
  Plan: "Plan: update packages/spec/examples/acr.json so producer.version and agent.toolchain[agentplane].version match the v0.6.2 package version; run the ACR example release check and full release:check locally; publish a branch_pr PR and wait for hosted checks before merge."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix v0.6.2 ACR example version drift". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix v0.6.2 ACR example version drift". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Fix v0.6.2 ACR example version drift

Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.

## Scope

- In scope: Fix the release-blocking ACR example version drift so v0.6.2 publish validation can pass. Scope is limited to packages/spec/examples/acr.json producer/toolchain version alignment with package version 0.6.2.
- Out of scope: unrelated refactors not required for "Fix v0.6.2 ACR example version drift".

## Plan

Plan: update packages/spec/examples/acr.json so producer.version and agent.toolchain[agentplane].version match the v0.6.2 package version; run the ACR example release check and full release:check locally; publish a branch_pr PR and wait for hosted checks before merge.

## Verify Steps

PLANNER fallback scaffold for "Fix v0.6.2 ACR example version drift". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix v0.6.2 ACR example version drift". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
