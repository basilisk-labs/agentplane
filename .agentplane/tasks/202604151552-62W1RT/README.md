---
id: "202604151552-62W1RT"
title: "Design target release process and improvement plan"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
  - "workflow"
verify: []
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
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: drafting a standalone target release-process architecture for local and branch_pr modes, then mapping concrete gaps and an atomic improvement plan against current release workflows and commands."
events:
  -
    type: "status"
    at: "2026-04-15T15:52:49.143Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: drafting a standalone target release-process architecture for local and branch_pr modes, then mapping concrete gaps and an atomic improvement plan against current release workflows and commands."
doc_version: 3
doc_updated_at: "2026-04-15T15:56:39.909Z"
doc_updated_by: "DOCS"
description: "Write a standalone docs spec for the ideal release process in local and branch_pr modes, compare it with the current implementation, and prepare an atomic improvement plan."
sections:
  Summary: |-
    Design target release process and improvement plan
    
    Write a standalone docs spec for the ideal release process in local and branch_pr modes, compare it with the current implementation, and prepare an atomic improvement plan.
  Scope: |-
    - In scope: Write a standalone docs spec for the ideal release process in local and branch_pr modes, compare it with the current implementation, and prepare an atomic improvement plan.
    - Out of scope: unrelated refactors not required for "Design target release process and improvement plan".
  Plan: |-
    1. Define target release architecture for local and branch_pr modes -> verify: standalone design doc covers roles, states, artifacts, guards, recovery, and release sequencing.
    2. Compare target architecture against current implementation -> verify: gap analysis lists concrete mismatches with referenced workflows/commands/docs.
    3. Derive atomic improvement plan -> verify: ordered changes are independently shippable, each with scope, expected effect, and key risk/check.
  Verify Steps: |-
    1. Review the requested outcome for "Design target release process and improvement plan". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    Validated:
    - node .agentplane/policy/check-routing.mjs -> policy routing OK
    - bun run format:check -> passed
    - Reviewed current release docs, branch_pr policy, Core CI, Publish to npm, Task Hosted Close, and release CLI command surfaces before writing the target architecture and gap analysis.
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Current implementation already has exact-SHA release-ready and publish-result artifacts, but the route semantics still mix direct-release and protected-main branch_pr promotion.
    - The strongest near-term architectural gain is to make release candidate PRs first-class in branch_pr mode instead of treating them as deferred release-apply side effects.
    - Release docs should keep a strict split between target architecture and current implementation details to avoid optimizing around accidental constraints.
id_source: "generated"
---
## Summary

Design target release process and improvement plan

Write a standalone docs spec for the ideal release process in local and branch_pr modes, compare it with the current implementation, and prepare an atomic improvement plan.

## Scope

- In scope: Write a standalone docs spec for the ideal release process in local and branch_pr modes, compare it with the current implementation, and prepare an atomic improvement plan.
- Out of scope: unrelated refactors not required for "Design target release process and improvement plan".

## Plan

1. Define target release architecture for local and branch_pr modes -> verify: standalone design doc covers roles, states, artifacts, guards, recovery, and release sequencing.
2. Compare target architecture against current implementation -> verify: gap analysis lists concrete mismatches with referenced workflows/commands/docs.
3. Derive atomic improvement plan -> verify: ordered changes are independently shippable, each with scope, expected effect, and key risk/check.

## Verify Steps

1. Review the requested outcome for "Design target release process and improvement plan". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

Validated:
- node .agentplane/policy/check-routing.mjs -> policy routing OK
- bun run format:check -> passed
- Reviewed current release docs, branch_pr policy, Core CI, Publish to npm, Task Hosted Close, and release CLI command surfaces before writing the target architecture and gap analysis.

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Current implementation already has exact-SHA release-ready and publish-result artifacts, but the route semantics still mix direct-release and protected-main branch_pr promotion.
- The strongest near-term architectural gain is to make release candidate PRs first-class in branch_pr mode instead of treating them as deferred release-apply side effects.
- Release docs should keep a strict split between target architecture and current implementation details to avoid optimizing around accidental constraints.
