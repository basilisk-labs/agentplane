---
id: "202603081006-BVYTKB"
title: "Define task README v3 contract and Findings semantics"
status: "DOING"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T10:09:33.761Z"
  updated_by: "ORCHESTRATOR"
  note: "Contract-first batch approved before broader README v3 migration work."
verification:
  state: "ok"
  updated_at: "2026-03-08T10:12:00.701Z"
  updated_by: "PLANNER"
  note: "Recorded the canonical README v3 contract in docs/user/tasks-and-backends.mdx; website build and policy routing checks passed."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: define the canonical README v3 contract and Findings boundary before touching templates, prompts, and migration logic."
events:
  -
    type: "status"
    at: "2026-03-08T10:09:37.365Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: define the canonical README v3 contract and Findings boundary before touching templates, prompts, and migration logic."
  -
    type: "verify"
    at: "2026-03-08T10:12:00.701Z"
    author: "PLANNER"
    state: "ok"
    note: "Recorded the canonical README v3 contract in docs/user/tasks-and-backends.mdx; website build and policy routing checks passed."
doc_version: 2
doc_updated_at: "2026-03-08T10:12:00.703Z"
doc_updated_by: "PLANNER"
description: "Document the new v3 task README structure, including Findings as the task-local observation layer and the boundary to policy incidents."
id_source: "generated"
---
## Summary

Define task README v3 contract and Findings semantics

Document the new v3 task README structure, including Findings as the task-local observation layer and the boundary to policy incidents.

## Scope

- In scope: Document the new v3 task README structure, including Findings as the task-local observation layer and the boundary to policy incidents..
- Out of scope: unrelated refactors not required for "Define task README v3 contract and Findings semantics".

## Plan

1. Define the canonical README v3 section model, doc_version boundary, and Findings vs incidents promotion semantics.
2. Record the contract in one canonical task/docs surface before broader wording sync.
3. Verify the contract is internally consistent with current lifecycle commands and existing frontmatter behavior.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T10:12:00.701Z — VERIFY — ok

By: PLANNER

Note: Recorded the canonical README v3 contract in docs/user/tasks-and-backends.mdx; website build and policy routing checks passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T10:09:37.365Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
