---
id: "202607301059-SWF2VC"
title: "Release AgentPlane v0.6.25"
result_summary: "Prepared and verified v0.6.25 maintenance release candidate without integrating main."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
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
  state: "ok"
  updated_at: "2026-07-30T11:53:24.284Z"
  updated_by: "CODER"
  note: "Verified: final v0.6.25 maintenance candidate state, current blueprint snapshot, full local release prepublish evidence, final-state fast prepublish, frozen lockfile install, and hosted PR checks all pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-30T11:53:55.146Z"
  updated_by: "EVALUATOR"
  note: "Final pre-merge closure for v0.6.25 is consistent with the verified maintenance release candidate."
  evaluated_sha: "f905f72296101e08eacee1c0acd47b732c126a84"
  blueprint_digest: "505193e6d3d016445e932ecee3032868e05c236396dcf3053bf418bb543767f8"
  evidence_refs:
    - ".agentplane/tasks/202607301059-SWF2VC/README.md"
    - ".agentplane/tasks/202607301059-SWF2VC/quality/20260730-115355146-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607301059-SWF2VC/quality/20260730-115355146-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607301059-SWF2VC/quality/20260730-115355146-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607301059-SWF2VC/blueprint/resolved-snapshot.json"
    - "docs/releases/v0.6.25.md"
    - "bun.lock"
    - ".agentplane/workflows/last-known-good.md"
    - "packages/spec/examples/acr.json"
  findings:
    - "Closure metadata, current blueprint snapshot, release evidence, generated assets, version parity, lockfile, and hosted checks are complete; main remains outside the integration target."
commit:
  hash: "f905f72296101e08eacee1c0acd47b732c126a84"
  message: "🎨 SWF2VC release: format versioned ACR example"
comments:
  -
    author: "CODER"
    body: "Start: prepare and publish v0.6.25 exclusively from the v0.6.24 maintenance branch, with exact-SHA hosted verification and no main integration."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-30T10:59:38.013Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare and publish v0.6.25 exclusively from the v0.6.24 maintenance branch, with exact-SHA hosted verification and no main integration."
  -
    type: "verify"
    at: "2026-07-30T11:52:51.762Z"
    author: "CODER"
    state: "ok"
    note: "v0.6.25 maintenance candidate verified: full local release prepublish passed 82/82 isolated groups, workflow 34/34, significant 204/204, release-critical 16/16; final-state frozen install and fast prepublish passed; hosted PR checks and Release-ready manifest passed for f905f7229."
  -
    type: "verify"
    at: "2026-07-30T11:53:24.284Z"
    author: "CODER"
    state: "ok"
    note: "Verified: final v0.6.25 maintenance candidate state, current blueprint snapshot, full local release prepublish evidence, final-state fast prepublish, frozen lockfile install, and hosted PR checks all pass."
  -
    type: "status"
    at: "2026-07-30T11:53:42.150Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-30T11:53:42.150Z"
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
    ### 2026-07-30T11:52:51.762Z — VERIFY — ok

    By: CODER

    Note: v0.6.25 maintenance candidate verified: full local release prepublish passed 82/82 isolated groups, workflow 34/34, significant 204/204, release-critical 16/16; final-state frozen install and fast prepublish passed; hosted PR checks and Release-ready manifest passed for f905f7229.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T10:59:38.013Z, excerpt_hash=sha256:88df50bc76184647e26fdaac50e820fd3647ddac19217c34bc5b2e40859ef60d

    Details:

    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607301059-SWF2VC-release-v0-6-25/.agentplane/tasks/202607301059-SWF2VC/blueprint/resolved-snapshot.json
    - old_digest: 63c4a2408ec049f7d8f6711cfba77426598b775fe5ae068f371cf34647e4dd4c
    - current_digest: 505193e6d3d016445e932ecee3032868e05c236396dcf3053bf418bb543767f8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607301059-SWF2VC

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607301059-SWF2VC --branch task/202607301059-SWF2VC/release-v0-6-25
    - diagnostic_command: agentplane pr check 202607301059-SWF2VC
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-30T11:53:24.284Z — VERIFY — ok

    By: CODER

    Note: Verified: final v0.6.25 maintenance candidate state, current blueprint snapshot, full local release prepublish evidence, final-state fast prepublish, frozen lockfile install, and hosted PR checks all pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T11:52:51.879Z, excerpt_hash=sha256:88df50bc76184647e26fdaac50e820fd3647ddac19217c34bc5b2e40859ef60d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607301059-SWF2VC-release-v0-6-25/.agentplane/tasks/202607301059-SWF2VC/blueprint/resolved-snapshot.json
    - old_digest: 505193e6d3d016445e932ecee3032868e05c236396dcf3053bf418bb543767f8
    - current_digest: 505193e6d3d016445e932ecee3032868e05c236396dcf3053bf418bb543767f8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607301059-SWF2VC

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202607301059-SWF2VC --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit f905f72296101e08eacee1c0acd47b732c126a84 --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Release version mutation initially left recovery, Bun lock, README headers, and ACR formatting stale.
      Impact: Publishing without synchronization would leave inconsistent installed or recovery version surfaces.
      Resolution: Synchronized all generated/versioned surfaces to 0.6.25, validated frozen install and fast prepublish, then passed hosted checks.
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
### 2026-07-30T11:52:51.762Z — VERIFY — ok

By: CODER

Note: v0.6.25 maintenance candidate verified: full local release prepublish passed 82/82 isolated groups, workflow 34/34, significant 204/204, release-critical 16/16; final-state frozen install and fast prepublish passed; hosted PR checks and Release-ready manifest passed for f905f7229.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T10:59:38.013Z, excerpt_hash=sha256:88df50bc76184647e26fdaac50e820fd3647ddac19217c34bc5b2e40859ef60d

Details:

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607301059-SWF2VC-release-v0-6-25/.agentplane/tasks/202607301059-SWF2VC/blueprint/resolved-snapshot.json
- old_digest: 63c4a2408ec049f7d8f6711cfba77426598b775fe5ae068f371cf34647e4dd4c
- current_digest: 505193e6d3d016445e932ecee3032868e05c236396dcf3053bf418bb543767f8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607301059-SWF2VC

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607301059-SWF2VC --branch task/202607301059-SWF2VC/release-v0-6-25
- diagnostic_command: agentplane pr check 202607301059-SWF2VC
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-30T11:53:24.284Z — VERIFY — ok

By: CODER

Note: Verified: final v0.6.25 maintenance candidate state, current blueprint snapshot, full local release prepublish evidence, final-state fast prepublish, frozen lockfile install, and hosted PR checks all pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T11:52:51.879Z, excerpt_hash=sha256:88df50bc76184647e26fdaac50e820fd3647ddac19217c34bc5b2e40859ef60d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607301059-SWF2VC-release-v0-6-25/.agentplane/tasks/202607301059-SWF2VC/blueprint/resolved-snapshot.json
- old_digest: 505193e6d3d016445e932ecee3032868e05c236396dcf3053bf418bb543767f8
- current_digest: 505193e6d3d016445e932ecee3032868e05c236396dcf3053bf418bb543767f8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607301059-SWF2VC

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202607301059-SWF2VC --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit f905f72296101e08eacee1c0acd47b732c126a84 --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Release version mutation initially left recovery, Bun lock, README headers, and ACR formatting stale.
  Impact: Publishing without synchronization would leave inconsistent installed or recovery version surfaces.
  Resolution: Synchronized all generated/versioned surfaces to 0.6.25, validated frozen install and fast prepublish, then passed hosted checks.
