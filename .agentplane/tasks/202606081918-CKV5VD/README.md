---
id: "202606081918-CKV5VD"
title: "Verify and version AgentPlane loops release candidate"
status: "TODO"
priority: "high"
owner: "TESTER"
revision: 2
origin:
  system: "manual"
depends_on:
  - "202606081918-CBGEQ3"
tags:
  - "code"
  - "loops"
  - "release"
task_kind: "release"
mutation_scope: "release"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test"
  - "bun run docs:cli:check"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-06-08T19:19:16.393Z"
doc_updated_by: "ORCHESTRATOR"
description: "Refresh generated CLI/docs artifacts if needed, run focused and package-level checks, record verification, and bump/package a new branch-local version that includes loop support."
sections:
  Summary: |-
    Verify and version AgentPlane loops release candidate

    Refresh generated CLI/docs artifacts if needed, run focused and package-level checks, record verification, and bump/package a new branch-local version that includes loop support.
  Scope: |-
    - In scope: Refresh generated CLI/docs artifacts if needed, run focused and package-level checks, record verification, and bump/package a new branch-local version that includes loop support.
    - Out of scope: unrelated refactors not required for "Verify and version AgentPlane loops release candidate".
  Plan: |-
    1. Run focused loop/unit tests and package build.
    2. Refresh generated CLI docs/schema artifacts only if checks require it.
    3. Bump branch-local package/docs release marker for loop support without publishing or merging to main.
    4. Record verification for included tasks and final git status evidence.
    5. Leave agentplane-loops as the source branch containing the new loop-supported version.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run --filter=agentplane test`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run --filter=agentplane build`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Verify and version AgentPlane loops release candidate

Refresh generated CLI/docs artifacts if needed, run focused and package-level checks, record verification, and bump/package a new branch-local version that includes loop support.

## Scope

- In scope: Refresh generated CLI/docs artifacts if needed, run focused and package-level checks, record verification, and bump/package a new branch-local version that includes loop support.
- Out of scope: unrelated refactors not required for "Verify and version AgentPlane loops release candidate".

## Plan

1. Run focused loop/unit tests and package build.
2. Refresh generated CLI docs/schema artifacts only if checks require it.
3. Bump branch-local package/docs release marker for loop support without publishing or merging to main.
4. Record verification for included tasks and final git status evidence.
5. Leave agentplane-loops as the source branch containing the new loop-supported version.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run --filter=agentplane test`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run --filter=agentplane build`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
