---
id: "202604191642-4MR2SJ"
title: "Add dependency cruiser checks for architecture rules"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T15:20:17.083Z"
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
    body: "Start: Adding dependency-cruiser boundary enforcement with a pragmatic initial ruleset and canonical script integration."
events:
  -
    type: "status"
    at: "2026-04-20T15:20:19.160Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding dependency-cruiser boundary enforcement with a pragmatic initial ruleset and canonical script integration."
doc_version: 3
doc_updated_at: "2026-04-20T15:20:19.185Z"
doc_updated_by: "CODER"
description: "Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles."
sections:
  Summary: |-
    Add dependency cruiser checks for architecture rules
    
    Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles.
  Scope: |-
    - In scope: Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles.
    - Out of scope: unrelated refactors not required for "Add dependency cruiser checks for architecture rules".
  Plan: "Add dependency-cruiser as a dev-only architecture guard. Create a root depcruise config covering packages/**/src with initial rules for circular dependencies, forbidden package direction imports, and agentplane/internal boundary imports. Add package scripts for local check and CI guard, wire the guard into release:ci-check, document the command, and verify with depcruise plus existing format/lint/build checks. Keep the first rule set pragmatic: fail on clear boundary violations and avoid broad noisy rules that require unrelated refactors."
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

Add dependency cruiser checks for architecture rules

Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles.

## Scope

- In scope: Epic K and J′. Add dependency-cruiser enforcement for package boundaries and cycles.
- Out of scope: unrelated refactors not required for "Add dependency cruiser checks for architecture rules".

## Plan

Add dependency-cruiser as a dev-only architecture guard. Create a root depcruise config covering packages/**/src with initial rules for circular dependencies, forbidden package direction imports, and agentplane/internal boundary imports. Add package scripts for local check and CI guard, wire the guard into release:ci-check, document the command, and verify with depcruise plus existing format/lint/build checks. Keep the first rule set pragmatic: fail on clear boundary violations and avoid broad noisy rules that require unrelated refactors.

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
