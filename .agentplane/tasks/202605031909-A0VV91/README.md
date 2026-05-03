---
id: "202605031909-A0VV91"
title: "T22: Build 12-second hero demo"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031908-6V1G82"
  - "202605031908-TFYQJ0"
  - "202605031908-Z2FSSG"
tags:
  - "assets"
  - "demo"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:09:19.614Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "02579b80b963154c24d2a3fbd1e36b697bde978e"
  message: "🚧 E70TF7 task: Launch public-surface ACR task graph [202605031908-E70TF7]"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
events:
  -
    type: "status"
    at: "2026-05-03T21:03:54.916Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T21:03:54.916Z"
doc_updated_by: "INTEGRATOR"
description: "Record deterministic vhs/asciinema demo assets showing init through ACR generation."
sections:
  Summary: |-
    T22: Build 12-second hero demo

    Record deterministic vhs/asciinema demo assets showing init through ACR generation.
  Scope: |-
    - In scope: Record deterministic vhs/asciinema demo assets showing init through ACR generation.
    - Out of scope: unrelated refactors not required for "T22: Build 12-second hero demo".
  Plan: "Create docs/assets demo tape/cast/GIF within size and sequence constraints, then verify files and README reference readiness."
  Verify Steps: |-
    1. Review the requested outcome for "T22: Build 12-second hero demo". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T22: Build 12-second hero demo

Record deterministic vhs/asciinema demo assets showing init through ACR generation.

## Scope

- In scope: Record deterministic vhs/asciinema demo assets showing init through ACR generation.
- Out of scope: unrelated refactors not required for "T22: Build 12-second hero demo".

## Plan

Create docs/assets demo tape/cast/GIF within size and sequence constraints, then verify files and README reference readiness.

## Verify Steps

1. Review the requested outcome for "T22: Build 12-second hero demo". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
