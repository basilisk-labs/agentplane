---
id: "202603081453-HQ24GQ"
title: "Plan workflow test orchestration cleanup"
status: "DOING"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:54:14.896Z"
  updated_by: "ORCHESTRATOR"
  note: "Sequence is extract shared scripts first, then enforce workflow contract, then sync docs."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: lock the sequence for removing remaining inline workflow test logic by extracting shared scripts before adding enforcement."
events:
  -
    type: "status"
    at: "2026-03-08T14:54:24.206Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: lock the sequence for removing remaining inline workflow test logic by extracting shared scripts before adding enforcement."
doc_version: 3
doc_updated_at: "2026-03-08T14:54:24.206Z"
doc_updated_by: "PLANNER"
description: "Inventory remaining inline test and coverage commands in GitHub workflows, define canonical shared scripts, and sequence the cleanup so CI behavior stays unchanged while removing YAML-level test logic drift."
id_source: "generated"
---
## Summary

Plan workflow test orchestration cleanup

Inventory remaining inline test and coverage commands in GitHub workflows, define canonical shared scripts, and sequence the cleanup so CI behavior stays unchanged while removing YAML-level test logic drift.

## Scope

- In scope: Inventory remaining inline test and coverage commands in GitHub workflows, define canonical shared scripts, and sequence the cleanup so CI behavior stays unchanged while removing YAML-level test logic drift.
- Out of scope: unrelated refactors not required for "Plan workflow test orchestration cleanup".

## Plan

1. Inventory the remaining inline workflow test and coverage commands and group them by reusable shared-script owner.
2. Extract the remaining coverage suites into canonical package scripts and switch GitHub workflows to those scripts.
3. Add a workflow command-contract check so new inline workflow test runners are rejected once shared scripts exist.
4. Update developer CI documentation after the code-level contract is enforced.

## Verify Steps

1. Review `.github/workflows/ci.yml` and `.github/workflows/prepublish.yml`. Expected: the remaining inline workflow test logic is fully inventoried before implementation starts.
2. Review the resulting task graph. Expected: extraction, drift-guard, and docs updates are separated into executable follow-up tasks with clear ownership.
3. Review dependency ordering. Expected: the workflow drift guard depends on the shared-script extraction so the contract exists before enforcement.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
