---
id: "202607111438-5DXKKR"
title: "Fix release evidence task attribution"
result_summary: "Merged via PR #4583."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-07-11T14:38:38.675Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-11T14:48:41.280Z"
  updated_by: "CODER"
  note: "Version-matched release-task resolver, ambiguity guard, evidence preservation/idempotence, and corrected v0.6.22 attribution verified: 17/17 focused tests, agentplane typecheck, format:check, and full ci:contract pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-11T14:48:43.150Z"
  updated_by: "EVALUATOR"
  note: "Hosted publish evidence now resolves to the unique DONE release task matching the published version, preserves prior verification history, and corrects v0.6.22 attribution."
  evaluated_sha: "0e557961a2fa30c79ef75642ebdbfdd4c32f93e2"
  blueprint_digest: "f0622fc8e731607c3ab0c8967e2e4fce27927ad547feba62bea4439e4fb952f6"
  evidence_refs:
    - ".agentplane/tasks/202607111438-5DXKKR/README.md"
    - ".agentplane/tasks/202607111438-5DXKKR/quality/20260711-144843150-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607111438-5DXKKR/quality/20260711-144843150-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607111438-5DXKKR/quality/20260711-144843150-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607111438-5DXKKR/blueprint/resolved-snapshot.json"
    - "bunx vitest run packages/agentplane/src/commands/release/release-task-evidence-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run --filter=agentplane typecheck; bun run format:check; bun run ci:contract"
  findings:
    - "Regression covers unrelated task commits and ambiguous release matches; repeated apply is idempotent; 6T937A evidence restored and F33MNN holds v0.6.22 publish proof."
commit:
  hash: "544382702f1e8a83db89e8947323286a374aefb3"
  message: "✅ 5DXKKR task: verify release evidence attribution"
comments:
  -
    author: "CODER"
    body: "Start: fix deterministic release-task evidence attribution, add regression coverage, and correct v0.6.22 task evidence."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4583 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-07-11T14:38:57.305Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix deterministic release-task evidence attribution, add regression coverage, and correct v0.6.22 task evidence."
  -
    type: "verify"
    at: "2026-07-11T14:48:41.280Z"
    author: "CODER"
    state: "ok"
    note: "Version-matched release-task resolver, ambiguity guard, evidence preservation/idempotence, and corrected v0.6.22 attribution verified: 17/17 focused tests, agentplane typecheck, format:check, and full ci:contract pass."
  -
    type: "status"
    at: "2026-07-11T14:55:17.619Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4583 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-07-11T14:55:17.625Z"
doc_updated_by: "INTEGRATOR"
description: "Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution."
sections:
  Summary: |-
    Fix release evidence task attribution

    Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.
  Scope: |-
    - In scope: Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.
    - Out of scope: unrelated refactors not required for "Fix release evidence task attribution".
  Plan: "1. Reproduce evidence misattribution when the publish SHA changes an unrelated task after the release task merge. 2. Resolve a unique DONE release task matching publish-result version/tag from the task registry before falling back to commit-diff inference. 3. Add regression coverage for unrelated post-release task commits and ambiguity. 4. Correct v0.6.22 hosted publish evidence so it belongs to F33MNN and no longer claims 6T937A as the release task. 5. Run focused release evidence tests, publish workflow contract tests, typecheck, and CI contract; merge through protected main."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-11T14:48:41.280Z — VERIFY — ok

    By: CODER

    Note: Version-matched release-task resolver, ambiguity guard, evidence preservation/idempotence, and corrected v0.6.22 attribution verified: 17/17 focused tests, agentplane typecheck, format:check, and full ci:contract pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T14:38:57.305Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607111438-5DXKKR-post-release-fix-evidence-attribution/.agentplane/tasks/202607111438-5DXKKR/blueprint/resolved-snapshot.json
    - old_digest: f0622fc8e731607c3ab0c8967e2e4fce27927ad547feba62bea4439e4fb952f6
    - current_digest: f0622fc8e731607c3ab0c8967e2e4fce27927ad547feba62bea4439e4fb952f6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607111438-5DXKKR

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607111438-5DXKKR
    - diagnostic_command: agentplane pr check 202607111438-5DXKKR
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix release evidence task attribution

Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.

## Scope

- In scope: Resolve hosted publish evidence to the matching release task instead of whichever task README happens to be changed by the exact publish SHA; add regression coverage and correct v0.6.22 evidence attribution.
- Out of scope: unrelated refactors not required for "Fix release evidence task attribution".

## Plan

1. Reproduce evidence misattribution when the publish SHA changes an unrelated task after the release task merge. 2. Resolve a unique DONE release task matching publish-result version/tag from the task registry before falling back to commit-diff inference. 3. Add regression coverage for unrelated post-release task commits and ambiguity. 4. Correct v0.6.22 hosted publish evidence so it belongs to F33MNN and no longer claims 6T937A as the release task. 5. Run focused release evidence tests, publish workflow contract tests, typecheck, and CI contract; merge through protected main.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-11T14:48:41.280Z — VERIFY — ok

By: CODER

Note: Version-matched release-task resolver, ambiguity guard, evidence preservation/idempotence, and corrected v0.6.22 attribution verified: 17/17 focused tests, agentplane typecheck, format:check, and full ci:contract pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T14:38:57.305Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607111438-5DXKKR-post-release-fix-evidence-attribution/.agentplane/tasks/202607111438-5DXKKR/blueprint/resolved-snapshot.json
- old_digest: f0622fc8e731607c3ab0c8967e2e4fce27927ad547feba62bea4439e4fb952f6
- current_digest: f0622fc8e731607c3ab0c8967e2e4fce27927ad547feba62bea4439e4fb952f6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607111438-5DXKKR

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607111438-5DXKKR
- diagnostic_command: agentplane pr check 202607111438-5DXKKR
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
