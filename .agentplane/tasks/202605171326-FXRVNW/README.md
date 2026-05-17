---
id: "202605171326-FXRVNW"
title: "Freeze release candidate base and scope after late merges"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T13:28:09.705Z"
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
doc_updated_at: "2026-05-17T13:27:32.880Z"
doc_updated_by: "PLANNER"
description: "Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation."
sections:
  Summary: |-
    Freeze release candidate base and scope after late merges

    Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.
  Scope: |-
    - In scope: Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.
    - Out of scope: unrelated refactors not required for "Freeze release candidate base and scope after late merges".
  Plan: "Plan: 1. Inspect the release candidate planning path and identify where candidate base SHA and excluded work are represented. 2. Add a release-scope guard that records the base SHA and detects when an excluded PR/task is already reachable from the candidate base. 3. Make the failure mode explicit: require re-scope, revert, or release-branch cut before candidate generation proceeds. 4. Add regression coverage using a fixture equivalent to the v0.6.2 route-decision CLI late-merge case. 5. Verify focused release-planning tests, release notes/candidate checks if affected, routing policy, and doctor output."
  Verify Steps: |-
    1. Add focused release-planning tests for an excluded PR/task that is already reachable from the selected candidate base SHA. Expected: release candidate generation fails closed with explicit re-scope/revert/branch-cut guidance.
    2. Add a positive test where excluded work is not reachable from the base SHA. Expected: release planning proceeds and records the pinned base.
    3. Run the focused release candidate/planning tests. Expected: all tests pass.
    4. If release manifest or notes generation is touched, run the relevant release check such as bun run release:check or a narrower documented substitute. Expected: pass, or skipped with concrete blocker and risk.
    5. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: routing passes; doctor has no new warnings beyond documented pre-existing drift.
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

Freeze release candidate base and scope after late merges

Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.

## Scope

- In scope: Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.
- Out of scope: unrelated refactors not required for "Freeze release candidate base and scope after late merges".

## Plan

Plan: 1. Inspect the release candidate planning path and identify where candidate base SHA and excluded work are represented. 2. Add a release-scope guard that records the base SHA and detects when an excluded PR/task is already reachable from the candidate base. 3. Make the failure mode explicit: require re-scope, revert, or release-branch cut before candidate generation proceeds. 4. Add regression coverage using a fixture equivalent to the v0.6.2 route-decision CLI late-merge case. 5. Verify focused release-planning tests, release notes/candidate checks if affected, routing policy, and doctor output.

## Verify Steps

1. Add focused release-planning tests for an excluded PR/task that is already reachable from the selected candidate base SHA. Expected: release candidate generation fails closed with explicit re-scope/revert/branch-cut guidance.
2. Add a positive test where excluded work is not reachable from the base SHA. Expected: release planning proceeds and records the pinned base.
3. Run the focused release candidate/planning tests. Expected: all tests pass.
4. If release manifest or notes generation is touched, run the relevant release check such as bun run release:check or a narrower documented substitute. Expected: pass, or skipped with concrete blocker and risk.
5. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: routing passes; doctor has no new warnings beyond documented pre-existing drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
