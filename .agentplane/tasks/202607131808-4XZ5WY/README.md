---
id: "202607131808-4XZ5WY"
title: "Prepare and publish patch release v0.6.23"
result_summary: "Prepared verified v0.6.23 release candidate with deterministic release test isolation and refreshed generated artifacts."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 17
origin:
  system: "manual"
depends_on: []
tags:
  - "ops"
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
  - "ap doctor"
  - "bun run ci:local:fast"
  - "bun run docs:readme-header:check"
  - "bun run release:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-13T18:11:07.050Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-13T21:54:48.274Z"
  updated_by: "DEUS"
  note: "Hosted publish confirmed for v0.6.23."
quality_review:
  state: "pass"
  updated_at: "2026-07-13T21:35:06.815Z"
  updated_by: "EVALUATOR"
  note: "v0.6.23 lockfile metadata follow-up is correct and fully verified"
  evaluated_sha: "f8fe117336311c3c005047a845bde2e35d11ce3d"
  blueprint_digest: "f7592d55cf319ef94b40ae927911789360127f9fbf866f976bba23189535824c"
  evidence_refs:
    - ".agentplane/tasks/202607131808-4XZ5WY/README.md"
    - ".agentplane/tasks/202607131808-4XZ5WY/quality/20260713-213506815-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607131808-4XZ5WY/quality/20260713-213506815-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607131808-4XZ5WY/quality/20260713-213506815-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607131808-4XZ5WY/blueprint/resolved-snapshot.json"
    - "bun.lock"
    - "bun run release:check"
    - "bun run ci:local:fast"
  findings:
    - "bun.lock now matches the 0.6.23 workspace manifests and dependency pins; frozen install plus release and full-fast local gates pass"
commit:
  hash: "4dfd01a05f1f8b36324d8bcc5566591c3b7cc354"
  message: "📝 4XZ5WY release: format v0.6.23 ACR example"
comments:
  -
    author: "CODER"
    body: "Start: prepare v0.6.23 release notes and AgentPlane release candidate, verify locally and on GitHub, merge to main, publish npm packages, and record registry evidence without touching agentplane-loops."
  -
    author: "CODER"
    body: "Verified: v0.6.23 candidate passes release:check, full prepublish heavy, ci:local:fast, routing, doctor, and EVALUATOR review; ready for protected-main merge and post-merge npm publication."
events:
  -
    type: "status"
    at: "2026-07-13T18:11:52.085Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.23 release notes and AgentPlane release candidate, verify locally and on GitHub, merge to main, publish npm packages, and record registry evidence without touching agentplane-loops."
  -
    type: "verify"
    at: "2026-07-13T21:09:48.793Z"
    author: "CODER"
    state: "ok"
    note: "Passed on candidate HEAD fc1a82c67633: release:check; docs:readme-header:check via release gate; ci:local:fast (365 files, 2163 tests, 5/5 critical CLI chunks); policy routing; doctor; full release prepublish heavy (81/81 release-ci-base chunks, workflow/significant coverage, 16 release-critical tests). Doctor reported only historical DONE-task commit warnings unrelated to this change."
  -
    type: "status"
    at: "2026-07-13T21:14:48.636Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.6.23 candidate passes release:check, full prepublish heavy, ci:local:fast, routing, doctor, and EVALUATOR review; ready for protected-main merge and post-merge npm publication."
  -
    type: "verify"
    at: "2026-07-13T21:34:57.792Z"
    author: "CODER"
    state: "ok"
    note: "Release follow-up verified: Bun workspace metadata is aligned to 0.6.23; frozen install, release:check, policy routing, and ci:local:fast pass."
doc_version: 3
doc_updated_at: "2026-07-13T21:54:48.274Z"
doc_updated_by: "DEUS"
description: "Prepare release notes and the v0.6.23 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops."
sections:
  Summary: |-
    Prepare and publish patch release v0.6.23

    Prepare release notes and the v0.6.23 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.
  Scope: "Release v0.6.23 from main at base SHA eb05aa537e11518c9b3542a43f46e0cbdcc35260. In scope: docs/releases/v0.6.23.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and feature work."
  Plan: "1. Freeze v0.6.23 from v0.6.22 at base eb05aa537e11518c9b3542a43f46e0cbdcc35260 and preserve every planned change. 2. Write detailed English release notes with at least ten concrete bullets. 3. Generate the branch_pr release candidate with AgentPlane so package versions and generated artifacts move together. 4. Run release, documentation, routing, doctor, and full-fast checks. 5. Run EVALUATOR, pre-merge closure, hosted checks, and protected-main integration. 6. Dispatch Publish to npm with the merged SHA. 7. Verify tag, GitHub Release, publish workflow, and npm parity for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; confirm clean main and untouched agentplane-loops."
  Verify Steps: |-
    1. Run `bun run release:check`. Expected: version parity, release notes, package manifests, and release invariants pass for 0.6.23.
    2. Run `bun run docs:readme-header:check`. Expected: release-facing README headers are current.
    3. Run `bun run ci:local:fast`. Expected: the full-fast local lane passes; if a runner-only infrastructure timeout recurs, preserve the failing log and require the equivalent hosted lane to pass before merge.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: gateway budgets, imports, markers, and routes pass.
    5. Run `ap doctor`. Expected: no task-introduced repository/runtime errors.
    6. Inspect `docs/releases/v0.6.23.md` against the frozen plan. Expected: all ten listed commits are represented by at least ten human-readable English bullets.
    7. After merge, verify GitHub PR checks and dispatch `Publish to npm` with the merged release SHA. Expected: workflow succeeds and creates tag/release v0.6.23.
    8. Run `npm view` for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.6.23. Expected: all three resolve to 0.6.23.
    9. Run final GitHub Release/tag and git status readbacks. Expected: v0.6.23 is non-draft/non-prerelease, main matches origin/main, and agentplane-loops is unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-13T21:09:48.793Z — VERIFY — ok

    By: CODER

    Note: Passed on candidate HEAD fc1a82c67633: release:check; docs:readme-header:check via release gate; ci:local:fast (365 files, 2163 tests, 5/5 critical CLI chunks); policy routing; doctor; full release prepublish heavy (81/81 release-ci-base chunks, workflow/significant coverage, 16 release-critical tests). Doctor reported only historical DONE-task commit warnings unrelated to this change.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T18:11:52.085Z, excerpt_hash=sha256:3c2346d226a2445b14fc75725319bd71d5376195780008eba6dca84eec75fa85

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131808-4XZ5WY-prepare-and-publish-patch-release-v0-6-23/.agentplane/tasks/202607131808-4XZ5WY/blueprint/resolved-snapshot.json
    - old_digest: f7592d55cf319ef94b40ae927911789360127f9fbf866f976bba23189535824c
    - current_digest: f7592d55cf319ef94b40ae927911789360127f9fbf866f976bba23189535824c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607131808-4XZ5WY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607131808-4XZ5WY
    - diagnostic_command: agentplane pr check 202607131808-4XZ5WY
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-13T21:34:57.792Z — VERIFY — ok

    By: CODER

    Note: Release follow-up verified: Bun workspace metadata is aligned to 0.6.23; frozen install, release:check, policy routing, and ci:local:fast pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T21:14:48.637Z, excerpt_hash=sha256:3c2346d226a2445b14fc75725319bd71d5376195780008eba6dca84eec75fa85

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131808-4XZ5WY-prepare-and-publish-patch-release-v0-6-23/.agentplane/tasks/202607131808-4XZ5WY/blueprint/resolved-snapshot.json
    - old_digest: f7592d55cf319ef94b40ae927911789360127f9fbf866f976bba23189535824c
    - current_digest: f7592d55cf319ef94b40ae927911789360127f9fbf866f976bba23189535824c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607131808-4XZ5WY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607131808-4XZ5WY --branch task/202607131808-4XZ5WY/prepare-and-publish-patch-release-v0-6-23
    - diagnostic_command: agentplane pr check 202607131808-4XZ5WY
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- BEGIN HOSTED PUBLISH EVIDENCE -->
    ### Hosted publish

    - State: ok
    - Note: Hosted publish confirmed for v0.6.23.
    - Details:
      - release_sha: 4e77400c02a6e427512649cec97c960c04cac6e3
      - version: 0.6.23
      - tag: v0.6.23
      - @agentplaneorg/core: published_in_run
      - @agentplaneorg/recipes: published_in_run
      - agentplane: published_in_run
      - npm_smoke: pass
      - github_release: created
      - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.23
      - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/29287787166
    <!-- END HOSTED PUBLISH EVIDENCE -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Before publication, revert the release-candidate commits or close the PR. After npm publication, do not rewrite or delete the published version; prepare a corrective patch release from main, document the defect, and leave v0.6.23 immutable."
  Findings: |-
    Initial release truth: main and origin/main are eb05aa537e11518c9b3542a43f46e0cbdcc35260; active incident registry is empty; GitHub Latest, git tag, agentplane, @agentplaneorg/core, and @agentplaneorg/recipes all report 0.6.22; frozen next target is v0.6.23; agentplane-loops is excluded.

    - Observation: The release candidate initially exposed worker contention and post-bump generated artifact drift; intake and rebase-race tests are now process-isolated, v0.6.23 headers regenerated, and the ACR example formatted.
      Impact: Release certification is deterministic on the final tree; no tag or npm publication has occurred before main merge.
      Resolution: All declared local checks pass and the task branch is ready for quality review and protected-main integration.
extensions:
  implementation_commit:
    hash: "4dfd01a05f1f8b36324d8bcc5566591c3b7cc354"
    message: "📝 4XZ5WY release: format v0.6.23 ACR example"
id_source: "generated"
---
## Summary

Prepare and publish patch release v0.6.23

Prepare release notes and the v0.6.23 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.

## Scope

Release v0.6.23 from main at base SHA eb05aa537e11518c9b3542a43f46e0cbdcc35260. In scope: docs/releases/v0.6.23.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and feature work.

## Plan

1. Freeze v0.6.23 from v0.6.22 at base eb05aa537e11518c9b3542a43f46e0cbdcc35260 and preserve every planned change. 2. Write detailed English release notes with at least ten concrete bullets. 3. Generate the branch_pr release candidate with AgentPlane so package versions and generated artifacts move together. 4. Run release, documentation, routing, doctor, and full-fast checks. 5. Run EVALUATOR, pre-merge closure, hosted checks, and protected-main integration. 6. Dispatch Publish to npm with the merged SHA. 7. Verify tag, GitHub Release, publish workflow, and npm parity for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; confirm clean main and untouched agentplane-loops.

## Verify Steps

1. Run `bun run release:check`. Expected: version parity, release notes, package manifests, and release invariants pass for 0.6.23.
2. Run `bun run docs:readme-header:check`. Expected: release-facing README headers are current.
3. Run `bun run ci:local:fast`. Expected: the full-fast local lane passes; if a runner-only infrastructure timeout recurs, preserve the failing log and require the equivalent hosted lane to pass before merge.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: gateway budgets, imports, markers, and routes pass.
5. Run `ap doctor`. Expected: no task-introduced repository/runtime errors.
6. Inspect `docs/releases/v0.6.23.md` against the frozen plan. Expected: all ten listed commits are represented by at least ten human-readable English bullets.
7. After merge, verify GitHub PR checks and dispatch `Publish to npm` with the merged release SHA. Expected: workflow succeeds and creates tag/release v0.6.23.
8. Run `npm view` for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.6.23. Expected: all three resolve to 0.6.23.
9. Run final GitHub Release/tag and git status readbacks. Expected: v0.6.23 is non-draft/non-prerelease, main matches origin/main, and agentplane-loops is unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-13T21:09:48.793Z — VERIFY — ok

By: CODER

Note: Passed on candidate HEAD fc1a82c67633: release:check; docs:readme-header:check via release gate; ci:local:fast (365 files, 2163 tests, 5/5 critical CLI chunks); policy routing; doctor; full release prepublish heavy (81/81 release-ci-base chunks, workflow/significant coverage, 16 release-critical tests). Doctor reported only historical DONE-task commit warnings unrelated to this change.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T18:11:52.085Z, excerpt_hash=sha256:3c2346d226a2445b14fc75725319bd71d5376195780008eba6dca84eec75fa85

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131808-4XZ5WY-prepare-and-publish-patch-release-v0-6-23/.agentplane/tasks/202607131808-4XZ5WY/blueprint/resolved-snapshot.json
- old_digest: f7592d55cf319ef94b40ae927911789360127f9fbf866f976bba23189535824c
- current_digest: f7592d55cf319ef94b40ae927911789360127f9fbf866f976bba23189535824c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607131808-4XZ5WY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607131808-4XZ5WY
- diagnostic_command: agentplane pr check 202607131808-4XZ5WY
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-13T21:34:57.792Z — VERIFY — ok

By: CODER

Note: Release follow-up verified: Bun workspace metadata is aligned to 0.6.23; frozen install, release:check, policy routing, and ci:local:fast pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-13T21:14:48.637Z, excerpt_hash=sha256:3c2346d226a2445b14fc75725319bd71d5376195780008eba6dca84eec75fa85

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607131808-4XZ5WY-prepare-and-publish-patch-release-v0-6-23/.agentplane/tasks/202607131808-4XZ5WY/blueprint/resolved-snapshot.json
- old_digest: f7592d55cf319ef94b40ae927911789360127f9fbf866f976bba23189535824c
- current_digest: f7592d55cf319ef94b40ae927911789360127f9fbf866f976bba23189535824c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607131808-4XZ5WY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607131808-4XZ5WY --branch task/202607131808-4XZ5WY/prepare-and-publish-patch-release-v0-6-23
- diagnostic_command: agentplane pr check 202607131808-4XZ5WY
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- BEGIN HOSTED PUBLISH EVIDENCE -->
### Hosted publish

- State: ok
- Note: Hosted publish confirmed for v0.6.23.
- Details:
  - release_sha: 4e77400c02a6e427512649cec97c960c04cac6e3
  - version: 0.6.23
  - tag: v0.6.23
  - @agentplaneorg/core: published_in_run
  - @agentplaneorg/recipes: published_in_run
  - agentplane: published_in_run
  - npm_smoke: pass
  - github_release: created
  - release_url: https://github.com/basilisk-labs/agentplane/releases/tag/v0.6.23
  - publish_run: https://github.com/basilisk-labs/agentplane/actions/runs/29287787166
<!-- END HOSTED PUBLISH EVIDENCE -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Before publication, revert the release-candidate commits or close the PR. After npm publication, do not rewrite or delete the published version; prepare a corrective patch release from main, document the defect, and leave v0.6.23 immutable.

## Findings

Initial release truth: main and origin/main are eb05aa537e11518c9b3542a43f46e0cbdcc35260; active incident registry is empty; GitHub Latest, git tag, agentplane, @agentplaneorg/core, and @agentplaneorg/recipes all report 0.6.22; frozen next target is v0.6.23; agentplane-loops is excluded.

- Observation: The release candidate initially exposed worker contention and post-bump generated artifact drift; intake and rebase-race tests are now process-isolated, v0.6.23 headers regenerated, and the ACR example formatted.
  Impact: Release certification is deterministic on the final tree; no tag or npm publication has occurred before main merge.
  Resolution: All declared local checks pass and the task branch is ready for quality review and protected-main integration.