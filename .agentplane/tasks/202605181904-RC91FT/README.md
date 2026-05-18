---
id: "202605181904-RC91FT"
title: "Fix v0.6 follow-up GitHub issues"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "ci"
  - "code"
  - "context"
  - "deps"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T19:06:04.842Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T19:36:09.768Z"
  updated_by: "EVALUATOR"
  note: "Evaluator review: local checks and scoped diff are consistent with the approved batch plan; no unrelated dirty artifact was staged. Awaiting hosted GitHub checks before integration."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-18T19:36:09.768Z"
  updated_by: "EVALUATOR"
  note: "Evaluator review: local checks and scoped diff are consistent with the approved batch plan; no unrelated dirty artifact was staged. Awaiting hosted GitHub checks before integration."
  evaluated_sha: "bb822a0ae6795abf790565eb4f32c952cb7e1bff"
  blueprint_digest: "4cc237b15e102200f9b6b788907a364edb90f3c9ff38d4876450aca3eabc3bd7"
  evidence_refs:
    - ".agentplane/tasks/202605181904-RC91FT/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181904-RC91FT-v06-issue-batch/.agentplane/tasks/202605181904-RC91FT/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved batch fixes for GitHub issues #3907-#3912 in the dedicated branch_pr worktree, preserving unrelated base task artifact drift."
events:
  -
    type: "status"
    at: "2026-05-18T19:07:51.582Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved batch fixes for GitHub issues #3907-#3912 in the dedicated branch_pr worktree, preserving unrelated base task artifact drift."
  -
    type: "verify"
    at: "2026-05-18T19:36:00.617Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed: focused Vitest (4 files/56 tests), schemas:check, build, lint:core, and policy routing check. PR #3915 opened for hosted checks."
  -
    type: "verify"
    at: "2026-05-18T19:36:09.768Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator review: local checks and scoped diff are consistent with the approved batch plan; no unrelated dirty artifact was staged. Awaiting hosted GitHub checks before integration."
doc_version: 3
doc_updated_at: "2026-05-18T19:36:09.783Z"
doc_updated_by: "CODER"
description: "Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge."
sections:
  Summary: |-
    Fix v0.6 follow-up GitHub issues

    Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.
  Scope: |-
    - In scope: Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.
    - Out of scope: unrelated refactors not required for "Fix v0.6 follow-up GitHub issues".
  Plan: "Primary batch task for issues #3907-#3912. Plan: 1. Start a dedicated branch_pr worktree and keep base checkout changes limited to task lifecycle artifacts. 2. Fix context wiki scaffold lint so fresh init plus whole-tree lint passes without weakening real content validation. 3. Harden task README scanning so invalid legacy frontmatter yields actionable diagnostics without hiding unrelated tasks. 4. Add a bounded stale-upstream diagnostic for read-heavy task/startup surfaces. 5. Make TypeScript 6, ESLint 10/eslint-plugin-n 18, and Zod 4 dependency upgrade paths pass their focused checks by updating code/config/schema generation deliberately. 6. Verify targeted tests plus lint/build/schema/policy checks, open/update PR, merge through GitHub, then close #3907-#3912 with PR evidence."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T19:36:00.617Z — VERIFY — ok

    By: CODER

    Note: Local verification passed: focused Vitest (4 files/56 tests), schemas:check, build, lint:core, and policy routing check. PR #3915 opened for hosted checks.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T19:07:51.582Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181904-RC91FT-v06-issue-batch/.agentplane/tasks/202605181904-RC91FT/blueprint/resolved-snapshot.json
    - old_digest: 4cc237b15e102200f9b6b788907a364edb90f3c9ff38d4876450aca3eabc3bd7
    - current_digest: 4cc237b15e102200f9b6b788907a364edb90f3c9ff38d4876450aca3eabc3bd7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181904-RC91FT

    ### 2026-05-18T19:36:09.768Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator review: local checks and scoped diff are consistent with the approved batch plan; no unrelated dirty artifact was staged. Awaiting hosted GitHub checks before integration.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T19:36:00.631Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181904-RC91FT-v06-issue-batch/.agentplane/tasks/202605181904-RC91FT/blueprint/resolved-snapshot.json
    - old_digest: 4cc237b15e102200f9b6b788907a364edb90f3c9ff38d4876450aca3eabc3bd7
    - current_digest: 4cc237b15e102200f9b6b788907a364edb90f3c9ff38d4876450aca3eabc3bd7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181904-RC91FT

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Implemented stale-upstream task-list warning, TypeScript 6 config/order fixes, ESLint 10/eslint-plugin-n 18 config compatibility, and Zod 4 native JSON schema rendering with regenerated schema artifacts.
      Impact: Issues #3907-#3912 have code/test/config coverage in the batch branch; unresolved external gate is GitHub hosted checks.
      Resolution: Proceed to hosted checks and branch_pr integration after PR #3915 is green.
id_source: "generated"
---
## Summary

Fix v0.6 follow-up GitHub issues

Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.

## Scope

- In scope: Implement and merge the code fixes for GitHub issues #3907, #3908, #3909, #3910, #3911, and #3912 in one branch_pr batch worktree, then close the issues after merge.
- Out of scope: unrelated refactors not required for "Fix v0.6 follow-up GitHub issues".

## Plan

Primary batch task for issues #3907-#3912. Plan: 1. Start a dedicated branch_pr worktree and keep base checkout changes limited to task lifecycle artifacts. 2. Fix context wiki scaffold lint so fresh init plus whole-tree lint passes without weakening real content validation. 3. Harden task README scanning so invalid legacy frontmatter yields actionable diagnostics without hiding unrelated tasks. 4. Add a bounded stale-upstream diagnostic for read-heavy task/startup surfaces. 5. Make TypeScript 6, ESLint 10/eslint-plugin-n 18, and Zod 4 dependency upgrade paths pass their focused checks by updating code/config/schema generation deliberately. 6. Verify targeted tests plus lint/build/schema/policy checks, open/update PR, merge through GitHub, then close #3907-#3912 with PR evidence.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T19:36:00.617Z — VERIFY — ok

By: CODER

Note: Local verification passed: focused Vitest (4 files/56 tests), schemas:check, build, lint:core, and policy routing check. PR #3915 opened for hosted checks.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T19:07:51.582Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181904-RC91FT-v06-issue-batch/.agentplane/tasks/202605181904-RC91FT/blueprint/resolved-snapshot.json
- old_digest: 4cc237b15e102200f9b6b788907a364edb90f3c9ff38d4876450aca3eabc3bd7
- current_digest: 4cc237b15e102200f9b6b788907a364edb90f3c9ff38d4876450aca3eabc3bd7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181904-RC91FT

### 2026-05-18T19:36:09.768Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator review: local checks and scoped diff are consistent with the approved batch plan; no unrelated dirty artifact was staged. Awaiting hosted GitHub checks before integration.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T19:36:00.631Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181904-RC91FT-v06-issue-batch/.agentplane/tasks/202605181904-RC91FT/blueprint/resolved-snapshot.json
- old_digest: 4cc237b15e102200f9b6b788907a364edb90f3c9ff38d4876450aca3eabc3bd7
- current_digest: 4cc237b15e102200f9b6b788907a364edb90f3c9ff38d4876450aca3eabc3bd7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181904-RC91FT

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Implemented stale-upstream task-list warning, TypeScript 6 config/order fixes, ESLint 10/eslint-plugin-n 18 config compatibility, and Zod 4 native JSON schema rendering with regenerated schema artifacts.
  Impact: Issues #3907-#3912 have code/test/config coverage in the batch branch; unresolved external gate is GitHub hosted checks.
  Resolution: Proceed to hosted checks and branch_pr integration after PR #3915 is green.
