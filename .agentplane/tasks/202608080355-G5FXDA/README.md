---
id: "202608080355-G5FXDA"
title: "Correct stale plan comparison in next-action diagnostics"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
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
  updated_at: "2026-08-08T05:32:51.397Z"
  updated_by: "TESTER"
  note: "PR review feedback is resolved: release plans require canonical X.Y.Z and vX.Y.Z metadata, active incidents are cleared on current main, and 17 focused scenarios plus the full contract gate pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-08T05:33:46.664Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "d0020e56ce863b4466e9e415c7e01e23de8fdb9f"
  blueprint_digest: "1b180e9a165d9cb3562acf6522bc3586c6efcc4f7e890b83961f1821c1184d65"
  evidence_refs:
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-053302594-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-053302594-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/objects/sha256/f299e6ded6bebf73d504748d9c2c3420a0ffc7a8fb63aed64bee2719c1b69f1b.md"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-053302594-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-053302594-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/20260808-053302594-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608080355-G5FXDA/README.md"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/objects/sha256/2675b2b1c2e447a38402ad74a241b16852b9da2ed700fe88f3e9bd4a1c6da72d.patch"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/objects/sha256/d200608a63d3ff4e7a2da24c748ddea0e194abd23ea2d6833ce71068a7c1c357.json"
    - ".agentplane/tasks/202608080355-G5FXDA/verification/20260808053251397-679c58c75e9c2b44.json"
    - ".agentplane/tasks/202608080355-G5FXDA/quality/objects/sha256/dd75b81e3c04dd45f2956403db2fccba72da81a54555d0758705a2e618b2755b.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The implementation satisfies the plan-target relation contract: missing, stale, current, malformed, incomplete, or inconsistent metadata requests a fresh patch plan, while only a canonical, internally consistent future target permits candidate preparation."
token_usage:
  agent_runs: 3
  input_tokens: 199429
  journal_digest: "sha256:c1544bce9ec658841d5a21c41be239bfe676243a8c6f3898985397a12646e1d1"
  observed_agent_runs: 2
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "supervisor_journal"
  state: "partial"
  total_tokens: 203359
  unavailable_reason: "some_agent_runs_lack_provider_token_telemetry"
  updated_at: "2026-08-08T05:23:18.888Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "5d06f55f940c0f7da5b163d59011f0d59d48e8ec"
  message: "✅ G5FXDA task: record final evaluator pass"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 21a5bad500af. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
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
  -
    type: "verify"
    at: "2026-08-08T05:19:52.549Z"
    author: "TESTER"
    state: "ok"
    note: "Evaluator findings are resolved: future plans must provide mutually consistent nextVersion and nextTag, and version ordering now uses precision-safe BigInt components; 15 focused scenarios and the full contract gate pass."
  -
    type: "verify"
    at: "2026-08-08T05:21:45.338Z"
    author: "TESTER"
    state: "ok"
    note: "Final committed implementation requires complete consistent plan metadata, compares arbitrarily large stable-version components without precision loss, and passes 15 focused scenarios plus the full contract gate."
  -
    type: "status"
    at: "2026-08-08T05:23:18.888Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-08T05:32:51.397Z"
    author: "TESTER"
    state: "ok"
    note: "PR review feedback is resolved: release plans require canonical X.Y.Z and vX.Y.Z metadata, active incidents are cleared on current main, and 17 focused scenarios plus the full contract gate pass."
doc_version: 3
doc_updated_at: "2026-08-08T05:33:46.687Z"
doc_updated_by: "CODER"
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

    ### 2026-08-08T05:19:52.549Z — VERIFY — ok

    By: TESTER

    Note: Evaluator findings are resolved: future plans must provide mutually consistent nextVersion and nextTag, and version ordering now uses precision-safe BigInt components; 15 focused scenarios and the full contract gate pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T05:15:11.672Z, excerpt_hash=sha256:c61ab1404b86c65d2743628996382837dfb456532ac47c1279b9d9536e4c679c

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; 15/15 tests passed after evaluator rework.
    Evidence: the suite now covers incomplete nextVersion-only and nextTag-only future plans plus ordering beyond Number.MAX_SAFE_INTEGER.
    Scope: RECOVERY-001 and RECOVERY-002 from evaluator run 20260808-051521745-recovery-context.

    Command: bun run typecheck
    Result: pass; precision-safe BigInt tuple comparison and updated fixtures compile cleanly.
    Evidence: run-typescript-build.mjs exited 0.
    Scope: Release next-action implementation and tests after evaluator rework.

    Command: bunx prettier --check scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; both changed files match repository formatting.
    Evidence: Prettier reported all matched files use its code style.
    Scope: Evaluator-directed implementation rework.

    Command: bunx eslint scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; no lint findings.
    Evidence: ESLint exited 0.
    Scope: Evaluator-directed implementation rework.

    Command: bun run ci:contract
    Result: pass on implementation commit a595da1b415f; all repository contract gates completed successfully after the evaluator-directed fix.
    Evidence: command exited 0 after the coverage threshold guard.
    Scope: Complete repository contract validation for the final issue #4783 implementation.

    Command: git diff --check
    Result: pass; no whitespace errors are present.
    Evidence: command exited 0.
    Scope: Final implementation and task evidence integrity before reevaluation.

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
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-08T05:21:45.338Z — VERIFY — ok

    By: TESTER

    Note: Final committed implementation requires complete consistent plan metadata, compares arbitrarily large stable-version components without precision loss, and passes 15 focused scenarios plus the full contract gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T05:19:53.989Z, excerpt_hash=sha256:c61ab1404b86c65d2743628996382837dfb456532ac47c1279b9d9536e4c679c

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; 15/15 tests passed for missing, stale, current, invalid, inconsistent, incomplete, future, and precision-boundary plan targets.
    Evidence: focused suite exited 0; final implementation is committed at 514ddf590f40272e1828df7fdd049f36133823ec.
    Scope: GitHub issue #4783 and both evaluator findings.

    Command: bun run typecheck
    Result: pass; precision-safe version comparison and fixtures compile cleanly.
    Evidence: run-typescript-build.mjs exited 0 with the final working-tree content before its exact commit.
    Scope: Final release next-action source and tests.

    Command: bun run release:incidents:check
    Result: pass; release incident gate has no active entries.
    Evidence: check-release-incidents.mjs exited 0 after N0VXJ0 merged.
    Scope: Release readiness dependency.

    Command: bunx prettier --check scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts && bunx eslint scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; formatting and lint checks report no findings.
    Evidence: both commands exited 0 on the final file content.
    Scope: Final changed implementation files.

    Command: bun run ci:contract
    Result: pass; every repository contract gate completed successfully on the exact final file content subsequently committed at 514ddf590f40272e1828df7fdd049f36133823ec.
    Evidence: command exited 0 after the coverage threshold guard.
    Scope: Complete contract validation for issue #4783.

    Command: git diff --check && test -z "$(git status --porcelain=v1 --untracked-files=all)"
    Result: pass; the implementation checkout is clean and has no whitespace errors before verification persistence.
    Evidence: current task worktree is clean at 514ddf590f40272e1828df7fdd049f36133823ec.
    Scope: Final committed implementation integrity.

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

    ### 2026-08-08T05:32:51.397Z — VERIFY — ok

    By: TESTER

    Note: PR review feedback is resolved: release plans require canonical X.Y.Z and vX.Y.Z metadata, active incidents are cleared on current main, and 17 focused scenarios plus the full contract gate pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T05:23:18.900Z, excerpt_hash=sha256:c61ab1404b86c65d2743628996382837dfb456532ac47c1279b9d9536e4c679c

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; 17/17 tests passed after PR review feedback.
    Evidence: the suite now rejects nextTag without the canonical v prefix and rejects nextVersion with a v prefix, in addition to incomplete and precision-boundary plans.
    Scope: PR #4799 review threads PRRT_kwDORCLmJM6XcHzZ and the final issue #4783 behavior.

    Command: bun run typecheck
    Result: pass; canonical version/tag parsing compiles without errors.
    Evidence: run-typescript-build.mjs exited 0.
    Scope: Final release next-action source and fixtures.

    Command: bun run release:incidents:check
    Result: pass; INC-20260807-01 is absent from both active registries after merged PR #4800.
    Evidence: check-release-incidents.mjs exited 0 on the current main ancestry.
    Scope: PR #4799 review thread PRRT_kwDORCLmJM6XcHzW.

    Command: bunx prettier --check scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts && bunx eslint scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
    Result: pass; no formatting or lint findings.
    Evidence: both commands exited 0.
    Scope: Final reviewed implementation files.

    Command: bun run ci:contract
    Result: pass; every repository contract gate completed successfully on committed implementation d0020e56ce863b4466e9e415c7e01e23de8fdb9f.
    Evidence: command exited 0 after the coverage threshold guard.
    Scope: Complete contract validation after review feedback.

    Command: git diff --check && test -z "$(git status --porcelain=v1 --untracked-files=all)"
    Result: pass; the implementation checkout is clean before verification persistence.
    Evidence: current task worktree is clean at d0020e56ce863b4466e9e415c7e01e23de8fdb9f.
    Scope: Final committed implementation integrity.

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
    - diagnostic_command: none
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
  implementation_commit:
    hash: "514ddf590f40272e1828df7fdd049f36133823ec"
    message: "🐛 G5FXDA code: enforce complete precision-safe plan targets"
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

### 2026-08-08T05:19:52.549Z — VERIFY — ok

By: TESTER

Note: Evaluator findings are resolved: future plans must provide mutually consistent nextVersion and nextTag, and version ordering now uses precision-safe BigInt components; 15 focused scenarios and the full contract gate pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T05:15:11.672Z, excerpt_hash=sha256:c61ab1404b86c65d2743628996382837dfb456532ac47c1279b9d9536e4c679c

Details:

Command: bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; 15/15 tests passed after evaluator rework.
Evidence: the suite now covers incomplete nextVersion-only and nextTag-only future plans plus ordering beyond Number.MAX_SAFE_INTEGER.
Scope: RECOVERY-001 and RECOVERY-002 from evaluator run 20260808-051521745-recovery-context.

Command: bun run typecheck
Result: pass; precision-safe BigInt tuple comparison and updated fixtures compile cleanly.
Evidence: run-typescript-build.mjs exited 0.
Scope: Release next-action implementation and tests after evaluator rework.

Command: bunx prettier --check scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; both changed files match repository formatting.
Evidence: Prettier reported all matched files use its code style.
Scope: Evaluator-directed implementation rework.

Command: bunx eslint scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; no lint findings.
Evidence: ESLint exited 0.
Scope: Evaluator-directed implementation rework.

Command: bun run ci:contract
Result: pass on implementation commit a595da1b415f; all repository contract gates completed successfully after the evaluator-directed fix.
Evidence: command exited 0 after the coverage threshold guard.
Scope: Complete repository contract validation for the final issue #4783 implementation.

Command: git diff --check
Result: pass; no whitespace errors are present.
Evidence: command exited 0.
Scope: Final implementation and task evidence integrity before reevaluation.

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
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-08T05:21:45.338Z — VERIFY — ok

By: TESTER

Note: Final committed implementation requires complete consistent plan metadata, compares arbitrarily large stable-version components without precision loss, and passes 15 focused scenarios plus the full contract gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T05:19:53.989Z, excerpt_hash=sha256:c61ab1404b86c65d2743628996382837dfb456532ac47c1279b9d9536e4c679c

Details:

Command: bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; 15/15 tests passed for missing, stale, current, invalid, inconsistent, incomplete, future, and precision-boundary plan targets.
Evidence: focused suite exited 0; final implementation is committed at 514ddf590f40272e1828df7fdd049f36133823ec.
Scope: GitHub issue #4783 and both evaluator findings.

Command: bun run typecheck
Result: pass; precision-safe version comparison and fixtures compile cleanly.
Evidence: run-typescript-build.mjs exited 0 with the final working-tree content before its exact commit.
Scope: Final release next-action source and tests.

Command: bun run release:incidents:check
Result: pass; release incident gate has no active entries.
Evidence: check-release-incidents.mjs exited 0 after N0VXJ0 merged.
Scope: Release readiness dependency.

Command: bunx prettier --check scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts && bunx eslint scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; formatting and lint checks report no findings.
Evidence: both commands exited 0 on the final file content.
Scope: Final changed implementation files.

Command: bun run ci:contract
Result: pass; every repository contract gate completed successfully on the exact final file content subsequently committed at 514ddf590f40272e1828df7fdd049f36133823ec.
Evidence: command exited 0 after the coverage threshold guard.
Scope: Complete contract validation for issue #4783.

Command: git diff --check && test -z "$(git status --porcelain=v1 --untracked-files=all)"
Result: pass; the implementation checkout is clean and has no whitespace errors before verification persistence.
Evidence: current task worktree is clean at 514ddf590f40272e1828df7fdd049f36133823ec.
Scope: Final committed implementation integrity.

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

### 2026-08-08T05:32:51.397Z — VERIFY — ok

By: TESTER

Note: PR review feedback is resolved: release plans require canonical X.Y.Z and vX.Y.Z metadata, active incidents are cleared on current main, and 17 focused scenarios plus the full contract gate pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-08T05:23:18.900Z, excerpt_hash=sha256:c61ab1404b86c65d2743628996382837dfb456532ac47c1279b9d9536e4c679c

Details:

Command: bunx vitest run packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; 17/17 tests passed after PR review feedback.
Evidence: the suite now rejects nextTag without the canonical v prefix and rejects nextVersion with a v prefix, in addition to incomplete and precision-boundary plans.
Scope: PR #4799 review threads PRRT_kwDORCLmJM6XcHzZ and the final issue #4783 behavior.

Command: bun run typecheck
Result: pass; canonical version/tag parsing compiles without errors.
Evidence: run-typescript-build.mjs exited 0.
Scope: Final release next-action source and fixtures.

Command: bun run release:incidents:check
Result: pass; INC-20260807-01 is absent from both active registries after merged PR #4800.
Evidence: check-release-incidents.mjs exited 0 on the current main ancestry.
Scope: PR #4799 review thread PRRT_kwDORCLmJM6XcHzW.

Command: bunx prettier --check scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts && bunx eslint scripts/release/next-action.mjs packages/agentplane/src/commands/release/release-next-action-script.test.ts
Result: pass; no formatting or lint findings.
Evidence: both commands exited 0.
Scope: Final reviewed implementation files.

Command: bun run ci:contract
Result: pass; every repository contract gate completed successfully on committed implementation d0020e56ce863b4466e9e415c7e01e23de8fdb9f.
Evidence: command exited 0 after the coverage threshold guard.
Scope: Complete contract validation after review feedback.

Command: git diff --check && test -z "$(git status --porcelain=v1 --untracked-files=all)"
Result: pass; the implementation checkout is clean before verification persistence.
Evidence: current task worktree is clean at d0020e56ce863b4466e9e415c7e01e23de8fdb9f.
Scope: Final committed implementation integrity.

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
- diagnostic_command: none
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

## Token Usage

- State: `partial`
- Completeness: `2/3` agent runs
- Input tokens: `199429`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `203359`
- Provenance: `supervisor_journal/agentplane`
- Journal digest: `sha256:c1544bce9ec658841d5a21c41be239bfe676243a8c6f3898985397a12646e1d1`
- Unavailable reason: `some_agent_runs_lack_provider_token_telemetry`
- Updated at: `2026-08-08T05:23:18.888Z`
