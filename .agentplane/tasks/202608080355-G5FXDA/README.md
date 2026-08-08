---
id: "202608080355-G5FXDA"
title: "Correct stale plan comparison in next-action diagnostics"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "cli"
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run release:incidents:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T03:55:19.801Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-08T05:15:10.536Z"
  updated_by: "TESTER"
  note: "Release next-action now requests a fresh patch plan for missing, invalid, current, or stale targets and permits candidate preparation only for a valid future target; focused and full contract gates pass."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-08T05:16:06.210Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "331673c803537e76349decbf0d9cc163019a4db7"
  blueprint_digest: "1b180e9a165d9cb3562acf6522bc3586c6efcc4f7e890b83961f1821c1184d65"
  evidence_refs:
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-051521745-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-051521745-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/objects/sha256/b0ca49e75d3a13924e23c376d0f2be3300de40c2dfe7eb81677572300957c0c3.md"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-051521745-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-051521745-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-051521745-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-051521745-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608080355-G5FXDA/README.md"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/objects/sha256/f80832943bfb517107b04fb8c0176bea60ce9b79cc5508f6c21331d9c1413f93.patch"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/objects/sha256/13082d3afe2010285f50789c0a87ea7d3fe7c27e2cf32145a083562b6120eaab.json"
    - ".agentplane/tasks/202608080355-G5FXDA/verification/20260808051510536-c2ec50514313f301.json"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/objects/sha256/dd75b81e3c04dd45f2956403db2fccba72da81a54555d0758705a2e618b2755b.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "A future plan with only nextVersion or only nextTag is classified as valid and permits candidate preparation."
    - "Version ordering converts arbitrary semver numeric components to Number, so values beyond the safe-integer range can compare incorrectly."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "21a5bad500af96450ff8c101d50f78c27a89affa"
  message: "🚧 G5FXDA task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 21a5bad500af. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-08T03:55:51.861Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-08T04:02:14.139Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 21a5bad500af. CLI accepted one state-bound external-agent semantic result."
  -
    type: "verify"
    at: "2026-08-08T05:15:10.536Z"
    author: "TESTER"
    state: "ok"
    note: "Release next-action now requests a fresh patch plan for missing, invalid, current, or stale targets and permits candidate preparation only for a valid future target; focused and full contract gates pass."
doc_version: 3
doc_updated_at: "2026-08-08T05:15:11.672Z"
doc_updated_by: "SUPERVISOR"
description: "Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges."
sections:
  Summary: |-
    Correct stale plan comparison in next-action diagnostics

    Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.
  Scope: |-
    - In scope: Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.
    - Out of scope: unrelated refactors not required for "Correct stale plan comparison in next-action diagnostics".
  Plan: "1. Reproduce issue #4783 with fixture states where the published current version has valid evidence and the latest plan is missing, stale, current, or future. 2. Add semver-safe plan-target ordering in scripts/release/next-action.mjs: missing, invalid, current, and older targets request ap release plan --patch; only a valid future target may proceed to candidate preparation; preserve recovery applicability and partial-publication precedence. 3. Expand release-next-action-script tests for all four target relations and invalid metadata. 4. Mark INC-20260807-01 resolved in both canonical and bundled policy registries, with the merged MCY8ZC evidence retained. 5. Run the focused suite, incident release gate, typecheck, policy routing, contract checks, evaluator review, hosted CI, and integrate through the serialized queue. 6. Close GitHub issue #4783 only after merge proof."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run release:incidents:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-08T05:15:10.536Z — VERIFY — ok

    By: TESTER

    Note: Release next-action now requests a fresh patch plan for missing, invalid, current, or stale targets and permits candidate preparation only for a valid future target; focused and full contract gates pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T04:02:14.139Z, excerpt_hash=sha256:c61ab1404b86c65d2743628996382837dfb456532ac47c1279b9d9536e4c679c

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; 12/12 tests passed, including missing, stale, current, invalid, inconsistent, and future plan targets.
    Evidence: focused Vitest run exited 0 on rebased implementation head a74e37a9d.
    Scope: GitHub issue #4783 release next-action regression and precedence preservation.

    Command: bun run typecheck
    Result: pass; repository TypeScript build completed without errors.
    Evidence: run-typescript-build.mjs exited 0.
    Scope: Semver relation helper and updated fixtures.

    Command: bun run release:incidents:check
    Result: pass; the release incident gate reports no active entries after N0VXJ0 merged.
    Evidence: check-release-incidents.mjs exited 0.
    Scope: Release readiness dependency for the diagnostic fix.

    Command: bunx prettier --check scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; both changed implementation files match repository formatting.
    Evidence: Prettier reported all matched files use its code style.
    Scope: Changed release diagnostic source and test.

    Command: bunx eslint scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; no lint findings.
    Evidence: ESLint exited 0.
    Scope: Changed release diagnostic source and test.

    Command: bun run ci:contract
    Result: pass; formatting, schemas, policy, version parity, compatibility and efficiency baselines, hotspots, lifecycle invariants, TypeScript toolchain, guards, lint, architecture, clone, Knip, and coverage contracts all passed.
    Evidence: command exited 0 after the coverage threshold guard.
    Scope: Complete repository contract gate on the rebased issue fix.

    Command: git diff --check
    Result: pass; no whitespace errors are present in the task diff.
    Evidence: command exited 0 on the current branch.
    Scope: Final branch integrity before verification persistence.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080355-G5FXDA-correct-stale-plan-comparison-in-next-action-dia/.agentplane/tasks/202608080355-G5FXDA/blueprint/resolved-snapshot.json
    - old_digest: 1b180e9a165d9cb3562acf6522bc3586c6efcc4f7e890b83961f1821c1184d65
    - current_digest: 1b180e9a165d9cb3562acf6522bc3586c6efcc4f7e890b83961f1821c1184d65
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608080355-G5FXDA

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608080355-G5FXDA
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "4a2895659e677071caaa9b56cadf35df8e261e82"
    version: 1
id_source: "generated"
---
## Summary

Correct stale plan comparison in next-action diagnostics

Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.

## Scope

- In scope: Fix GitHub issue #4783: compare the latest plan target with the currently published version so a missing, current, or older plan requests a fresh patch plan and only a future plan permits candidate preparation. Add fixtures for missing, stale, current, and future targets. Mark INC-20260807-01 resolved in the repository and bundled incident registries because its dependency-readiness and supervisor protocol repairs are merged and verified. Close issue #4783 only after hosted checks pass and the fix merges.
- Out of scope: unrelated refactors not required for "Correct stale plan comparison in next-action diagnostics".

## Plan

1. Reproduce issue #4783 with fixture states where the published current version has valid evidence and the latest plan is missing, stale, current, or future. 2. Add semver-safe plan-target ordering in scripts/release/next-action.mjs: missing, invalid, current, and older targets request ap release plan --patch; only a valid future target may proceed to candidate preparation; preserve recovery applicability and partial-publication precedence. 3. Expand release-next-action-script tests for all four target relations and invalid metadata. 4. Mark INC-20260807-01 resolved in both canonical and bundled policy registries, with the merged MCY8ZC evidence retained. 5. Run the focused suite, incident release gate, typecheck, policy routing, contract checks, evaluator review, hosted CI, and integrate through the serialized queue. 6. Close GitHub issue #4783 only after merge proof.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run release:incidents:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-08T05:15:10.536Z — VERIFY — ok

By: TESTER

Note: Release next-action now requests a fresh patch plan for missing, invalid, current, or stale targets and permits candidate preparation only for a valid future target; focused and full contract gates pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T04:02:14.139Z, excerpt_hash=sha256:c61ab1404b86c65d2743628996382837dfb456532ac47c1279b9d9536e4c679c

Details:

Command: bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; 12/12 tests passed, including missing, stale, current, invalid, inconsistent, and future plan targets.
Evidence: focused Vitest run exited 0 on rebased implementation head a74e37a9d.
Scope: GitHub issue #4783 release next-action regression and precedence preservation.

Command: bun run typecheck
Result: pass; repository TypeScript build completed without errors.
Evidence: run-typescript-build.mjs exited 0.
Scope: Semver relation helper and updated fixtures.

Command: bun run release:incidents:check
Result: pass; the release incident gate reports no active entries after N0VXJ0 merged.
Evidence: check-release-incidents.mjs exited 0.
Scope: Release readiness dependency for the diagnostic fix.

Command: bunx prettier --check scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; both changed implementation files match repository formatting.
Evidence: Prettier reported all matched files use its code style.
Scope: Changed release diagnostic source and test.

Command: bunx eslint scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; no lint findings.
Evidence: ESLint exited 0.
Scope: Changed release diagnostic source and test.

Command: bun run ci:contract
Result: pass; formatting, schemas, policy, version parity, compatibility and efficiency baselines, hotspots, lifecycle invariants, TypeScript toolchain, guards, lint, architecture, clone, Knip, and coverage contracts all passed.
Evidence: command exited 0 after the coverage threshold guard.
Scope: Complete repository contract gate on the rebased issue fix.

Command: git diff --check
Result: pass; no whitespace errors are present in the task diff.
Evidence: command exited 0 on the current branch.
Scope: Final branch integrity before verification persistence.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608080355-G5FXDA-correct-stale-plan-comparison-in-next-action-dia/.agentplane/tasks/202608080355-G5FXDA/blueprint/resolved-snapshot.json
- old_digest: 1b180e9a165d9cb3562acf6522bc3586c6efcc4f7e890b83961f1821c1184d65
- current_digest: 1b180e9a165d9cb3562acf6522bc3586c6efcc4f7e890b83961f1821c1184d65
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608080355-G5FXDA

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608080355-G5FXDA
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
