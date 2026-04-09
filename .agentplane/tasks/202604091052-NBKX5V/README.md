---
id: "202604091052-NBKX5V"
title: "Explain branch_pr incident collection locality and promotion requirements"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 2
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:53:44.872Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-09T10:52:43.470Z"
doc_updated_by: "CODER"
description: "Clarify user-facing incident collection output so branch_pr workflows explicitly state when registry changes are worktree-local and why plain findings or verify notes do not update incidents.md."
sections:
  Summary: |-
    Explain branch_pr incident collection locality and promotion requirements
    
    Clarify user-facing incident collection output so branch_pr workflows explicitly state when registry changes are worktree-local and why plain findings or verify notes do not update incidents.md.
  Scope: |-
    - In scope: Clarify user-facing incident collection output so branch_pr workflows explicitly state when registry changes are worktree-local and why plain findings or verify notes do not update incidents.md.
    - Out of scope: unrelated refactors not required for "Explain branch_pr incident collection locality and promotion requirements".
  Plan: |-
    1. Reproduce branch_pr incident collection output for worktree-local verify/collect paths and the no-op path for non-promotable findings.
    2. Update user-facing messaging so commands explain worktree-local vs base-main effects and explicitly call out that verify notes alone do not update incidents.md.
    3. Add focused regression coverage for branch_pr incident UX and verify the updated guidance remains consistent.
  Verify Steps: |-
    1. Reproduce `branch_pr` incident collection from a task branch. Expected: output explicitly states when incident effects are local to the current worktree and when base `main` changes only after integrate or hosted-close.
    2. Reproduce the non-promotable findings path. Expected: output explicitly says that plain findings or verify notes do not update `incidents.md` and points at the structured Findings path.
    3. Run the focused incidents/CLI test slice plus lint on touched files. Expected: updated messaging is covered and no regressions appear in the touched UX path.
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

Explain branch_pr incident collection locality and promotion requirements

Clarify user-facing incident collection output so branch_pr workflows explicitly state when registry changes are worktree-local and why plain findings or verify notes do not update incidents.md.

## Scope

- In scope: Clarify user-facing incident collection output so branch_pr workflows explicitly state when registry changes are worktree-local and why plain findings or verify notes do not update incidents.md.
- Out of scope: unrelated refactors not required for "Explain branch_pr incident collection locality and promotion requirements".

## Plan

1. Reproduce branch_pr incident collection output for worktree-local verify/collect paths and the no-op path for non-promotable findings.
2. Update user-facing messaging so commands explain worktree-local vs base-main effects and explicitly call out that verify notes alone do not update incidents.md.
3. Add focused regression coverage for branch_pr incident UX and verify the updated guidance remains consistent.

## Verify Steps

1. Reproduce `branch_pr` incident collection from a task branch. Expected: output explicitly states when incident effects are local to the current worktree and when base `main` changes only after integrate or hosted-close.
2. Reproduce the non-promotable findings path. Expected: output explicitly says that plain findings or verify notes do not update `incidents.md` and points at the structured Findings path.
3. Run the focused incidents/CLI test slice plus lint on touched files. Expected: updated messaging is covered and no regressions appear in the touched UX path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
