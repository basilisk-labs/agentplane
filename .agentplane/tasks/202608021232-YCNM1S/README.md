---
id: "202608021232-YCNM1S"
title: "Qualify and publish AgentPlane v0.7.1"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202608021232-6BTB6D"
  - "202608021232-MT4FK2"
tags:
  - "release"
  - "v0.7.1"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "network"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "bun run ci:contract"
  - "bun run e2e:v0.7.1:gate"
  - "npm view agentplane@0.7.1 version"
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T08:35:47.310Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-04T09:35:12.227Z"
  updated_by: "TESTER"
  note: "Release-ci chunk 19 exposed a stale semantic-plan fixture before the intended finish closeout boundary."
  attempts: 1
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: aligned the stale direct-supervision approval fixture with the semantic-planning contract and recorded the external audit assessment; targeted test and v0.7.1 product contract pass."
events:
  -
    type: "status"
    at: "2026-08-04T08:36:16.852Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-04T09:18:29.964Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: aligned the stale direct-supervision approval fixture with the semantic-planning contract and recorded the external audit assessment; targeted test and v0.7.1 product contract pass."
  -
    type: "verify"
    at: "2026-08-04T09:35:12.227Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Release-ci chunk 19 exposed a stale semantic-plan fixture before the intended finish closeout boundary."
doc_version: 3
doc_updated_at: "2026-08-04T09:35:13.263Z"
doc_updated_by: "CODER"
description: "Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth."
sections:
  Summary: |-
    Qualify and publish AgentPlane v0.7.1

    Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.
  Scope: |-
    - In scope: Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.
    - Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane v0.7.1".
  Plan: "Release plan: version=0.7.1, tag=v0.7.1, scope=publish the already provider-qualified AgentPlane 0.7 candidate with concise user-facing notes and release-only metadata changes. 1. Reconfirm clean main/origin parity, empty active incident registry, frozen provider evidence (50 runs / 55 episodes, 0 blockers, 29.921280763879005% token reduction), and that post-qualification changes are test/task evidence only. 2. Create the branch_pr release worktree and replace fallback Verify Steps with exact checks for release manifests, TypeScript 7, the v0.7.1 product contract, package smoke, notes, and static/critical gates. 3. Generate the patch release plan, write concise docs/releases/v0.7.1.md separated from the full qualification ledger, and prepare version/manifests through the canonical release candidate flow without changing runtime code. 4. Run deterministic prepublish, pack, installed-package, and postpublish checks on the final candidate SHA; do not rerun provider episodes unless runtime/product code changes. 5. Publish the candidate PR, obtain an independent evaluator pass and hosted checks, then merge through the integration queue. 6. Dispatch Publish to npm for the exact merged release SHA and verify the v0.7.1 tag, GitHub Release, npm versions/dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes, installed CLI smoke, postpublish audit, and local/remote main parity. Stop if the version/tag changes, active incidents appear, any required gate fails, or the candidate includes product code drift."
  Verify Steps: |-
    1. Inspect `git diff 82a0ffea3af6a1ca811a824e24289d9a68c4d684...HEAD` and the worktree status. Expected: the candidate contains release metadata, notes, generated release assets, and task evidence only; no runtime or product-source drift is present.
    2. Run `node scripts/release/check-release-notes.mjs --tag v0.7.1 --min-bullets 287` and `bun run format:check`. Expected: the concise release summary and complete collapsed commit ledger pass the repository contract.
    3. Run `node scripts/qualification/check-v0.7.1-product-contract.mjs`. Expected: the v0.7.1 product contract passes, including the shared supervisor default, compact agent packet, TypeScript 7 toolchain, and zero unused CLI exports.
    4. Run `bun run release:prepublish`. Expected: release parity, builds, static contracts, critical suites, package tarball checks, and installed-package smoke all pass for version 0.7.1.
    5. Reconfirm dependency task `202608021232-6BTB6D`. Expected: the frozen product candidate retains the single completed gate of 50 runs / 55 provider episodes with 0 blockers and 29.921280763879005% token reduction; do not rerun unless product code changes.
    6. Complete independent task verification, evaluator pass, hosted PR checks, and merge through the integration queue. Expected: every required check is green and the merged SHA is the exact publish input.
    7. Dispatch `Publish to npm` for the exact merged SHA, then run `bun run release:smoke:published` and `bun run release:postpublish:audit`. Expected: tag and GitHub Release `v0.7.1`, npm versions/dist-tags for all three public packages, installed CLI smoke, and local/remote `main` parity are confirmed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-04T09:35:12.227Z — VERIFY — needs_rework

    By: TESTER

    Note: Release-ci chunk 19 exposed a stale semantic-plan fixture before the intended finish closeout boundary.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:18:29.964Z, excerpt_hash=sha256:48af4cd80adb0012d6612a511df32d0950f6fee1cfbba7d1a6f713897c8eb042

    Details:

    Command: ap release candidate --plan .agentplane/.release/plan/2026-08-04T08-36-29-987Z --push --yes
    Result: fail
    Evidence: release-ci-base chunk 19/101; finish-close-commit expected the stale-quality-review stop but the task never replaced the generated semantic planning placeholder, so finish exited at an earlier usage boundary.
    Scope: test fixture only; no runtime or product-source behavior changed.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021232-YCNM1S-qualify-and-publish-agentplane-v0-7-1/.agentplane/tasks/202608021232-YCNM1S/blueprint/resolved-snapshot.json
    - old_digest: 1c6891f873a4739c542029b7b715e76b008e2b21d912005d7d681bbaba7c0653
    - current_digest: 1c6891f873a4739c542029b7b715e76b008e2b21d912005d7d681bbaba7c0653
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021232-YCNM1S

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021232-YCNM1S
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - The release-notes validator requires one bullet per commit since v0.7.0 (287 entries). Keep the normal rendered view concise by placing the complete qualification ledger inside a collapsed details section; this avoids changing release tooling or provider-qualified product code.
    - Provider-qualified product code remains frozen at `de94bf9d91de1a8a854ad358968e8193e9803342`. Later merged work is limited to regression tests, task evidence, cleanup, and release metadata, so the successful 50-run / 55-episode gate remains authoritative unless product code drifts.
    - The heavy prepublish gate found 55 tracked volatile `.log` files from completed qualification tasks. Their canonical metrics and verdicts already exist in task READMEs, verification records, compact JSON reports, and per-scenario `output_tail` fields, so remove only the duplicate logs and make the task-local recorded-gate validator use the compact output instead of requiring forbidden files.
    - The release-ci suite exposed one stale agent-mode test that expected the pre-0.7 advanced `ap help` catalog. Update the test contract to the intentional compact canonical help surface; runtime behavior remains unchanged.
    - The release-ci suite exposed a second stale fixture that created a task without a semantic plan but expected `approval_required`. Preserve the intended approval-boundary coverage by recording a task-specific unapproved plan first; the correct no-plan boundary remains `semantic_input_required`, and runtime behavior is unchanged.
    - The user-supplied v0.7 audit was checked against the current candidate in `evidence/external-audit-assessment.md`. Its P0 product findings are already resolved by the v0.7.1 contract and provider-qualified code; package-splitting, composite complexity metrics, and broader evidence-retention backends remain non-blocking architecture follow-up.
    - Release-ci chunk 19 exposed another pre-semantic-planning fixture: the commit-from-comment closeout test attempted approval without replacing the generated plan placeholder, so it stopped before reaching the intended stale-quality-review boundary. Add a task-specific PLANNER plan to the fixture; runtime behavior remains unchanged.

    - Observation: The commit-from-comment test attempted plan approval without first recording a task-specific semantic plan.
      Impact: The full prepublish gate stopped before evaluating the intended stale-quality-review boundary.
      Resolution: Record an explicit PLANNER plan in the fixture before approval, then rerun the targeted test and canonical prepublish gate.
extensions:
  workflow_route_baseline:
    start_head_sha: "82a0ffea3af6a1ca811a824e24289d9a68c4d684"
    version: 1
id_source: "generated"
---
## Summary

Qualify and publish AgentPlane v0.7.1

Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.

## Scope

- In scope: Integrate all approved v0.7.1 fixes, run the complete deterministic and provider release gate on the exact candidate, resolve every blocking defect, verify GitHub Actions and package metadata, publish npm and GitHub Release, and prove the installed release from remote truth.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane v0.7.1".

## Plan

Release plan: version=0.7.1, tag=v0.7.1, scope=publish the already provider-qualified AgentPlane 0.7 candidate with concise user-facing notes and release-only metadata changes. 1. Reconfirm clean main/origin parity, empty active incident registry, frozen provider evidence (50 runs / 55 episodes, 0 blockers, 29.921280763879005% token reduction), and that post-qualification changes are test/task evidence only. 2. Create the branch_pr release worktree and replace fallback Verify Steps with exact checks for release manifests, TypeScript 7, the v0.7.1 product contract, package smoke, notes, and static/critical gates. 3. Generate the patch release plan, write concise docs/releases/v0.7.1.md separated from the full qualification ledger, and prepare version/manifests through the canonical release candidate flow without changing runtime code. 4. Run deterministic prepublish, pack, installed-package, and postpublish checks on the final candidate SHA; do not rerun provider episodes unless runtime/product code changes. 5. Publish the candidate PR, obtain an independent evaluator pass and hosted checks, then merge through the integration queue. 6. Dispatch Publish to npm for the exact merged release SHA and verify the v0.7.1 tag, GitHub Release, npm versions/dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes, installed CLI smoke, postpublish audit, and local/remote main parity. Stop if the version/tag changes, active incidents appear, any required gate fails, or the candidate includes product code drift.

## Verify Steps

1. Inspect `git diff 82a0ffea3af6a1ca811a824e24289d9a68c4d684...HEAD` and the worktree status. Expected: the candidate contains release metadata, notes, generated release assets, and task evidence only; no runtime or product-source drift is present.
2. Run `node scripts/release/check-release-notes.mjs --tag v0.7.1 --min-bullets 287` and `bun run format:check`. Expected: the concise release summary and complete collapsed commit ledger pass the repository contract.
3. Run `node scripts/qualification/check-v0.7.1-product-contract.mjs`. Expected: the v0.7.1 product contract passes, including the shared supervisor default, compact agent packet, TypeScript 7 toolchain, and zero unused CLI exports.
4. Run `bun run release:prepublish`. Expected: release parity, builds, static contracts, critical suites, package tarball checks, and installed-package smoke all pass for version 0.7.1.
5. Reconfirm dependency task `202608021232-6BTB6D`. Expected: the frozen product candidate retains the single completed gate of 50 runs / 55 provider episodes with 0 blockers and 29.921280763879005% token reduction; do not rerun unless product code changes.
6. Complete independent task verification, evaluator pass, hosted PR checks, and merge through the integration queue. Expected: every required check is green and the merged SHA is the exact publish input.
7. Dispatch `Publish to npm` for the exact merged SHA, then run `bun run release:smoke:published` and `bun run release:postpublish:audit`. Expected: tag and GitHub Release `v0.7.1`, npm versions/dist-tags for all three public packages, installed CLI smoke, and local/remote `main` parity are confirmed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-04T09:35:12.227Z — VERIFY — needs_rework

By: TESTER

Note: Release-ci chunk 19 exposed a stale semantic-plan fixture before the intended finish closeout boundary.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-04T09:18:29.964Z, excerpt_hash=sha256:48af4cd80adb0012d6612a511df32d0950f6fee1cfbba7d1a6f713897c8eb042

Details:

Command: ap release candidate --plan .agentplane/.release/plan/2026-08-04T08-36-29-987Z --push --yes
Result: fail
Evidence: release-ci-base chunk 19/101; finish-close-commit expected the stale-quality-review stop but the task never replaced the generated semantic planning placeholder, so finish exited at an earlier usage boundary.
Scope: test fixture only; no runtime or product-source behavior changed.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021232-YCNM1S-qualify-and-publish-agentplane-v0-7-1/.agentplane/tasks/202608021232-YCNM1S/blueprint/resolved-snapshot.json
- old_digest: 1c6891f873a4739c542029b7b715e76b008e2b21d912005d7d681bbaba7c0653
- current_digest: 1c6891f873a4739c542029b7b715e76b008e2b21d912005d7d681bbaba7c0653
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021232-YCNM1S

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021232-YCNM1S
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The release-notes validator requires one bullet per commit since v0.7.0 (287 entries). Keep the normal rendered view concise by placing the complete qualification ledger inside a collapsed details section; this avoids changing release tooling or provider-qualified product code.
- Provider-qualified product code remains frozen at `de94bf9d91de1a8a854ad358968e8193e9803342`. Later merged work is limited to regression tests, task evidence, cleanup, and release metadata, so the successful 50-run / 55-episode gate remains authoritative unless product code drifts.
- The heavy prepublish gate found 55 tracked volatile `.log` files from completed qualification tasks. Their canonical metrics and verdicts already exist in task READMEs, verification records, compact JSON reports, and per-scenario `output_tail` fields, so remove only the duplicate logs and make the task-local recorded-gate validator use the compact output instead of requiring forbidden files.
- The release-ci suite exposed one stale agent-mode test that expected the pre-0.7 advanced `ap help` catalog. Update the test contract to the intentional compact canonical help surface; runtime behavior remains unchanged.
- The release-ci suite exposed a second stale fixture that created a task without a semantic plan but expected `approval_required`. Preserve the intended approval-boundary coverage by recording a task-specific unapproved plan first; the correct no-plan boundary remains `semantic_input_required`, and runtime behavior is unchanged.
- The user-supplied v0.7 audit was checked against the current candidate in `evidence/external-audit-assessment.md`. Its P0 product findings are already resolved by the v0.7.1 contract and provider-qualified code; package-splitting, composite complexity metrics, and broader evidence-retention backends remain non-blocking architecture follow-up.
- Release-ci chunk 19 exposed another pre-semantic-planning fixture: the commit-from-comment closeout test attempted approval without replacing the generated plan placeholder, so it stopped before reaching the intended stale-quality-review boundary. Add a task-specific PLANNER plan to the fixture; runtime behavior remains unchanged.

- Observation: The commit-from-comment test attempted plan approval without first recording a task-specific semantic plan.
  Impact: The full prepublish gate stopped before evaluating the intended stale-quality-review boundary.
  Resolution: Record an explicit PLANNER plan in the fixture before approval, then rerun the targeted test and canonical prepublish gate.
