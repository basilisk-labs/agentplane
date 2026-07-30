---
id: "202607301059-SWF2VC"
title: "Release AgentPlane v0.6.25 from maintenance branch"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "maintenance"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "bun run release:prepublish"
  - "node scripts/check-release-incidents.mjs"
  - "node scripts/release/check-task-registry-ready.mjs --allow-active-release-task"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T10:59:23.710Z"
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
    author: "CODER"
    body: "Start: prepare and publish v0.6.25 exclusively from the v0.6.24 maintenance branch, with exact-SHA hosted verification and no main integration."
events:
  -
    type: "status"
    at: "2026-07-30T10:59:38.013Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare and publish v0.6.25 exclusively from the v0.6.24 maintenance branch, with exact-SHA hosted verification and no main integration."
doc_version: 3
doc_updated_at: "2026-07-30T10:59:38.013Z"
doc_updated_by: "CODER"
description: "Prepare and publish v0.6.25 from codex/fix-v0.6.24-closeout-route only, including release notes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub release verification, and proof that main does not contain the maintenance commits."
sections:
  Summary: |-
    Release AgentPlane v0.6.25 from maintenance branch

    Prepare and publish v0.6.25 from codex/fix-v0.6.24-closeout-route only, including release notes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub release verification, and proof that main does not contain the maintenance commits.
  Scope: |-
    - In scope: Prepare and publish v0.6.25 from codex/fix-v0.6.24-closeout-route only, including release notes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub release verification, and proof that main does not contain the maintenance commits.
    - Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.25 from maintenance branch".
  Plan: "1. Freeze the v0.6.25 patch plan from maintenance branch codex/fix-v0.6.24-closeout-route and write complete release notes for only the routing fixes since v0.6.24. 2. Create an isolated task worktree and apply the version bump without rebasing or merging main. 3. Pass incident, task-registry, version-parity, package, generated-artifact, and full release:prepublish gates; record evaluator evidence. 4. Open and merge a release candidate PR into the maintenance branch only. 5. Run Core CI for the exact maintenance release SHA, publish that exact SHA, and verify npm packages, tag, GitHub Release, maintenance branch, and exclusion from main."
  Verify Steps: |-
    PLANNER fallback scaffold for "Release AgentPlane v0.6.25 from maintenance branch". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Release AgentPlane v0.6.25 from maintenance branch". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Release AgentPlane v0.6.25 from maintenance branch

Prepare and publish v0.6.25 from codex/fix-v0.6.24-closeout-route only, including release notes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub release verification, and proof that main does not contain the maintenance commits.

## Scope

- In scope: Prepare and publish v0.6.25 from codex/fix-v0.6.24-closeout-route only, including release notes, version parity, full release gates, exact-SHA hosted CI, npm publication, GitHub release verification, and proof that main does not contain the maintenance commits.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.25 from maintenance branch".

## Plan

1. Freeze the v0.6.25 patch plan from maintenance branch codex/fix-v0.6.24-closeout-route and write complete release notes for only the routing fixes since v0.6.24. 2. Create an isolated task worktree and apply the version bump without rebasing or merging main. 3. Pass incident, task-registry, version-parity, package, generated-artifact, and full release:prepublish gates; record evaluator evidence. 4. Open and merge a release candidate PR into the maintenance branch only. 5. Run Core CI for the exact maintenance release SHA, publish that exact SHA, and verify npm packages, tag, GitHub Release, maintenance branch, and exclusion from main.

## Verify Steps

PLANNER fallback scaffold for "Release AgentPlane v0.6.25 from maintenance branch". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Release AgentPlane v0.6.25 from maintenance branch". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
