---
id: "202604091052-NBKX5V"
title: "Explain branch_pr incident collection locality and promotion requirements"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "incidents"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:53:44.571Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T11:04:18.179Z"
  updated_by: "CODER"
  note: "Incident messaging now distinguishes task-local findings from shared incidents.md promotion."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: clarify branch_pr incident locality and promotion semantics so operators know when incidents.md changes stay local and when promotion happens on base."
events:
  -
    type: "status"
    at: "2026-04-09T11:00:58.744Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: clarify branch_pr incident locality and promotion semantics so operators know when incidents.md changes stay local and when promotion happens on base."
  -
    type: "verify"
    at: "2026-04-09T11:04:18.179Z"
    author: "CODER"
    state: "ok"
    note: "Incident messaging now distinguishes task-local findings from shared incidents.md promotion."
doc_version: 3
doc_updated_at: "2026-04-09T11:04:18.185Z"
doc_updated_by: "CODER"
description: "Clarify branch_pr incident collection locality, promotion timing, and why plain findings or verify notes do not update .agentplane/policy/incidents.md."
sections:
  Summary: |-
    Explain branch_pr incident collection locality and promotion requirements
    
    Clarify branch_pr incident collection locality, promotion timing, and why plain findings or verify notes do not update `.agentplane/policy/incidents.md`.
  Scope: |-
    - In scope: improve CLI/operator guidance for `branch_pr` incident collection locality and promotion semantics.
    - Out of scope: unrelated workflow refactors or changes to the incident registry data model.
  Plan: "1. Reproduce the branch_pr incident collection and verify flows that currently imply incidents.md should update immediately on the task branch. 2. Update incident/verify messaging so branch-local effects and promotion requirements are explicit. 3. Lock the guidance with focused CLI regression tests."
  Verify Steps: |-
    1. Reproduce `branch_pr` incident collection from a task branch. Expected: output explicitly states when incident effects are local to the current worktree and when base `main` changes only after integrate or hosted-close.
    2. Reproduce the non-promotable findings path. Expected: output explicitly says that plain findings or verify notes do not update `incidents.md` and points at the structured Findings path.
    3. Run the focused incidents/CLI test slice plus lint on touched files. Expected: updated messaging is covered and no regressions appear in the touched UX path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T11:04:18.179Z — VERIFY — ok
    
    By: CODER
    
    Note: Incident messaging now distinguishes task-local findings from shared incidents.md promotion.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T11:00:58.761Z, excerpt_hash=sha256:67d69cd475543b518e8ea2a6708a3181cfcc8ff52a0fab38122ce0024945f49c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Explain branch_pr incident collection locality and promotion requirements

Clarify branch_pr incident collection locality, promotion timing, and why plain findings or verify notes do not update `.agentplane/policy/incidents.md`.

## Scope

- In scope: improve CLI/operator guidance for `branch_pr` incident collection locality and promotion semantics.
- Out of scope: unrelated workflow refactors or changes to the incident registry data model.

## Plan

1. Reproduce the branch_pr incident collection and verify flows that currently imply incidents.md should update immediately on the task branch. 2. Update incident/verify messaging so branch-local effects and promotion requirements are explicit. 3. Lock the guidance with focused CLI regression tests.

## Verify Steps

1. Reproduce `branch_pr` incident collection from a task branch. Expected: output explicitly states when incident effects are local to the current worktree and when base `main` changes only after integrate or hosted-close.
2. Reproduce the non-promotable findings path. Expected: output explicitly says that plain findings or verify notes do not update `incidents.md` and points at the structured Findings path.
3. Run the focused incidents/CLI test slice plus lint on touched files. Expected: updated messaging is covered and no regressions appear in the touched UX path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T11:04:18.179Z — VERIFY — ok

By: CODER

Note: Incident messaging now distinguishes task-local findings from shared incidents.md promotion.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T11:00:58.761Z, excerpt_hash=sha256:67d69cd475543b518e8ea2a6708a3181cfcc8ff52a0fab38122ce0024945f49c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
