---
id: "202604191643-F6DSFE"
title: "Add concise README CI badges"
status: "DOING"
priority: "low"
owner: "PLANNER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "readme"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T14:04:37.875Z"
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
    author: "PLANNER"
    body: "Start: Adding README badges for current CI-backed test, coverage, and parity checks plus an explicit knip roadmap status without changing runtime code."
events:
  -
    type: "status"
    at: "2026-04-20T14:04:43.976Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding README badges for current CI-backed test, coverage, and parity checks plus an explicit knip roadmap status without changing runtime code."
doc_version: 3
doc_updated_at: "2026-04-20T14:04:43.987Z"
doc_updated_by: "PLANNER"
description: "Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md."
sections:
  Summary: |-
    Add concise README CI badges
    
    Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md.
  Scope: |-
    - In scope: Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md.
    - Out of scope: unrelated refactors not required for "Add concise README CI badges".
  Plan: "Add concise README badges that expose the current CI surface for test:fast, coverage, release:parity, and the current knip roadmap status without implying knip is already enforced. Verification: README diff review, policy routing, doctor, and format check."
  Verify Steps: |-
    1. Review the requested outcome for "Add concise README CI badges". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Add concise README CI badges

Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md.

## Scope

- In scope: Epic G′. Add badges for fast tests, coverage, parity, and knip status to README.md.
- Out of scope: unrelated refactors not required for "Add concise README CI badges".

## Plan

Add concise README badges that expose the current CI surface for test:fast, coverage, release:parity, and the current knip roadmap status without implying knip is already enforced. Verification: README diff review, policy routing, doctor, and format check.

## Verify Steps

1. Review the requested outcome for "Add concise README CI badges". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
