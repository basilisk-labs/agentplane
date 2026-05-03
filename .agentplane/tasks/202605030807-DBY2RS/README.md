---
id: "202605030807-DBY2RS"
title: "Fix standalone release doctor smoke marker"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T08:07:59.368Z"
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
    body: "Start: fixing the standalone release smoke doctor marker that blocked v0.4.2 publication before npm or tag publication."
events:
  -
    type: "status"
    at: "2026-05-03T08:08:07.009Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing the standalone release smoke doctor marker that blocked v0.4.2 publication before npm or tag publication."
doc_version: 3
doc_updated_at: "2026-05-03T08:08:07.009Z"
doc_updated_by: "CODER"
description: "Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete."
sections:
  Summary: |-
    Fix standalone release doctor smoke marker
    
    Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.
  Scope: |-
    - In scope: Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.
    - Out of scope: unrelated refactors not required for "Fix standalone release doctor smoke marker".
  Plan: "Plan: update scripts/smoke-standalone-cli-artifact.mjs to accept current doctor OK output while preserving legacy marker compatibility; add/adjust targeted release smoke tests; verify with standalone smoke/release tests; merge via branch_pr; rerun v0.4.2 publish."
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

Fix standalone release doctor smoke marker

Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.

## Scope

- In scope: Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.
- Out of scope: unrelated refactors not required for "Fix standalone release doctor smoke marker".

## Plan

Plan: update scripts/smoke-standalone-cli-artifact.mjs to accept current doctor OK output while preserving legacy marker compatibility; add/adjust targeted release smoke tests; verify with standalone smoke/release tests; merge via branch_pr; rerun v0.4.2 publish.

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
