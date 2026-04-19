---
id: "202604191130-JWBEB7"
title: "Prepare and ship patch release v0.3.15"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T11:30:54.394Z"
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
    body: "Start: prepare v0.3.15 release notes, execute the canonical patch-release route, verify npm/global-install smoke, and close any stale release branches after publication."
events:
  -
    type: "status"
    at: "2026-04-19T11:31:02.026Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.3.15 release notes, execute the canonical patch-release route, verify npm/global-install smoke, and close any stale release branches after publication."
doc_version: 3
doc_updated_at: "2026-04-19T11:31:02.036Z"
doc_updated_by: "CODER"
description: "Cut the next patch release after the release CI regression fixes, verify npm installation end-to-end, and publish the working release metadata."
sections:
  Summary: |-
    Prepare and ship patch release v0.3.15
    
    Cut the next patch release after the release CI regression fixes, verify npm installation end-to-end, and publish the working release metadata.
  Scope: |-
    - In scope: Cut the next patch release after the release CI regression fixes, verify npm installation end-to-end, and publish the working release metadata.
    - Out of scope: unrelated refactors not required for "Prepare and ship patch release v0.3.15".
  Plan: |-
    1. Implement the change for "Prepare and ship patch release v0.3.15".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Prepare and ship patch release v0.3.15". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Prepare and ship patch release v0.3.15

Cut the next patch release after the release CI regression fixes, verify npm installation end-to-end, and publish the working release metadata.

## Scope

- In scope: Cut the next patch release after the release CI regression fixes, verify npm installation end-to-end, and publish the working release metadata.
- Out of scope: unrelated refactors not required for "Prepare and ship patch release v0.3.15".

## Plan

1. Implement the change for "Prepare and ship patch release v0.3.15".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Prepare and ship patch release v0.3.15". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
