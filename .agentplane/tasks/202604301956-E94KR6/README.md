---
id: "202604301956-E94KR6"
title: "Resolve docs site homepage preview split"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604301955-D7JQB7"
tags:
  - "cleanup"
  - "code"
  - "website"
verify:
  - "bun run docs:site:build"
  - "bun run docs:site:typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T19:56:54.155Z"
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
    body: "Start: forced start after live docs CI evidence showed homepage split blocks docs:site:build before the dependent docs IA task can merge; scope remains limited to resolving the root/home-preview split."
events:
  -
    type: "status"
    at: "2026-04-30T20:11:34.460Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: forced start after live docs CI evidence showed homepage split blocks docs:site:build before the dependent docs IA task can merge; scope remains limited to resolving the root/home-preview split."
doc_version: 3
doc_updated_at: "2026-04-30T20:11:34.460Z"
doc_updated_by: "CODER"
description: "Eliminate the parallel homepage implementation by either promoting the rich home-preview surface to the public root page or removing the dormant preview route and its data/CSS if it is no longer intended."
sections:
  Summary: |-
    Resolve docs site homepage preview split
    
    Eliminate the parallel homepage implementation by either promoting the rich home-preview surface to the public root page or removing the dormant preview route and its data/CSS if it is no longer intended.
  Scope: |-
    - In scope: Eliminate the parallel homepage implementation by either promoting the rich home-preview surface to the public root page or removing the dormant preview route and its data/CSS if it is no longer intended.
    - Out of scope: unrelated refactors not required for "Resolve docs site homepage preview split".
  Plan: "1. Inspect the current root homepage, home-preview route, CSS, and homepage content data. 2. Choose one public homepage surface based on current product/docs intent: promote the rich preview to / or remove it if obsolete. 3. Remove the unused parallel implementation or update route ownership. 4. Run docs site typecheck and build."
  Verify Steps: |-
    1. Run `bun run docs:site:typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:site:build`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Resolve docs site homepage preview split

Eliminate the parallel homepage implementation by either promoting the rich home-preview surface to the public root page or removing the dormant preview route and its data/CSS if it is no longer intended.

## Scope

- In scope: Eliminate the parallel homepage implementation by either promoting the rich home-preview surface to the public root page or removing the dormant preview route and its data/CSS if it is no longer intended.
- Out of scope: unrelated refactors not required for "Resolve docs site homepage preview split".

## Plan

1. Inspect the current root homepage, home-preview route, CSS, and homepage content data. 2. Choose one public homepage surface based on current product/docs intent: promote the rich preview to / or remove it if obsolete. 3. Remove the unused parallel implementation or update route ownership. 4. Run docs site typecheck and build.

## Verify Steps

1. Run `bun run docs:site:typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:site:build`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
