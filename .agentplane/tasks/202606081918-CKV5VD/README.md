---
id: "202606081918-CKV5VD"
title: "Verify and version AgentPlane loops release candidate"
status: "TODO"
priority: "high"
owner: "TESTER"
revision: 4
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
  state: "approved"
  updated_at: "2026-06-12T10:24:33.936Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-06-12T10:24:17.659Z"
doc_updated_by: "PLANNER"
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
    1. Run `bun run --filter=agentplane test`. Expected: package tests pass with loop support included.
    2. Run `bun run --filter=agentplane build`. Expected: package build succeeds for the branch-local loop version.
    3. Run `bun run docs:cli:check`. Expected: generated CLI reference is current.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    5. Run focused smoke commands: `agentplane loop list`, `agentplane loop plan --kind code --tag bug --tag test --verify-steps-present`, and a dry-run loop command against a disposable/fixture task. Expected: loop discovery, planning, and dry-run artifacts work without non-dry-run agent execution.
    6. Confirm the final git state is on `agentplane-loops` and no merge/publish to `main` occurred.
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

1. Run `bun run --filter=agentplane test`. Expected: package tests pass with loop support included.
2. Run `bun run --filter=agentplane build`. Expected: package build succeeds for the branch-local loop version.
3. Run `bun run docs:cli:check`. Expected: generated CLI reference is current.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
5. Run focused smoke commands: `agentplane loop list`, `agentplane loop plan --kind code --tag bug --tag test --verify-steps-present`, and a dry-run loop command against a disposable/fixture task. Expected: loop discovery, planning, and dry-run artifacts work without non-dry-run agent execution.
6. Confirm the final git state is on `agentplane-loops` and no merge/publish to `main` occurred.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
