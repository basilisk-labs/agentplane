---
id: "202605031909-MTGHR1"
title: "T24: Build distinct social cards"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031908-6V1G82"
tags:
  - "assets"
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:09:25.787Z"
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
    at: "2026-05-03T21:03:54.921Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T21:03:54.921Z"
doc_updated_by: "INTEGRATOR"
description: "Create distinct OG, Twitter, and HN social cards plus source assets."
sections:
  Summary: |-
    T24: Build distinct social cards

    Create distinct OG, Twitter, and HN social cards plus source assets.
  Scope: |-
    - In scope: Create distinct OG, Twitter, and HN social cards plus source assets.
    - Out of scope: unrelated refactors not required for "T24: Build distinct social cards".
  Plan: "Generate or author three different 1280x640 social cards using DESIGN.md colors and verify hashes differ."
  Verify Steps: |-
    1. Review the requested outcome for "T24: Build distinct social cards". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T24: Build distinct social cards

Create distinct OG, Twitter, and HN social cards plus source assets.

## Scope

- In scope: Create distinct OG, Twitter, and HN social cards plus source assets.
- Out of scope: unrelated refactors not required for "T24: Build distinct social cards".

## Plan

Generate or author three different 1280x640 social cards using DESIGN.md colors and verify hashes differ.

## Verify Steps

1. Review the requested outcome for "T24: Build distinct social cards". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
