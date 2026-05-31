---
id: "202605311805-PWSTQ5"
title: "Release v0.6.13 patch"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "patch"
  - "publish"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T18:05:38.762Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: release v0.6.13 from clean main using the approved branch_pr candidate route, then verify hosted publish evidence before finishing."
events:
  -
    type: "status"
    at: "2026-05-31T18:05:43.540Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: release v0.6.13 from clean main using the approved branch_pr candidate route, then verify hosted publish evidence before finishing."
doc_version: 3
doc_updated_at: "2026-05-31T18:05:43.540Z"
doc_updated_by: "INTEGRATOR"
description: "Publish AgentPlane patch release v0.6.13 from current main through the branch_pr release candidate workflow, hosted publish workflow, and final npm/tag/GitHub release verification."
sections:
  Summary: |-
    Release v0.6.13 patch

    Publish AgentPlane patch release v0.6.13 from current main through the branch_pr release candidate workflow, hosted publish workflow, and final npm/tag/GitHub release verification.
  Scope: |-
    - In scope: Publish AgentPlane patch release v0.6.13 from current main through the branch_pr release candidate workflow, hosted publish workflow, and final npm/tag/GitHub release verification.
    - Out of scope: unrelated refactors not required for "Release v0.6.13 patch".
  Plan: "Release plan: version=0.6.13, tag=v0.6.13, scope=current AgentPlane main at da729c61b with completed release-recovery fixes. Route: branch_pr release candidate, hosted PR merge, then Publish to npm workflow dispatch on the merged release commit. Verification: release gates, hosted checks, npm package readback, remote tag readback, and GitHub Release readback."
  Verify Steps: |-
    PLANNER fallback scaffold for "Release v0.6.13 patch". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Release v0.6.13 patch". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Release v0.6.13 patch

Publish AgentPlane patch release v0.6.13 from current main through the branch_pr release candidate workflow, hosted publish workflow, and final npm/tag/GitHub release verification.

## Scope

- In scope: Publish AgentPlane patch release v0.6.13 from current main through the branch_pr release candidate workflow, hosted publish workflow, and final npm/tag/GitHub release verification.
- Out of scope: unrelated refactors not required for "Release v0.6.13 patch".

## Plan

Release plan: version=0.6.13, tag=v0.6.13, scope=current AgentPlane main at da729c61b with completed release-recovery fixes. Route: branch_pr release candidate, hosted PR merge, then Publish to npm workflow dispatch on the merged release commit. Verification: release gates, hosted checks, npm package readback, remote tag readback, and GitHub Release readback.

## Verify Steps

PLANNER fallback scaffold for "Release v0.6.13 patch". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Release v0.6.13 patch". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
