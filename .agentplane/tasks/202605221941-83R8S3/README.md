---
id: "202605221941-83R8S3"
title: "Classify amended task-branch pre-push scope from base"
result_summary: "Merged via PR #4032."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "hooks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T19:41:15.690Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T20:00:44.465Z"
  updated_by: "EVALUATOR"
  note: "Reworked regression tests to avoid process.chdir in worker threads; focused selection test, eslint, and typecheck pass locally."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T20:00:44.465Z"
  updated_by: "EVALUATOR"
  note: "Reworked regression tests to avoid process.chdir in worker threads; focused selection test, eslint, and typecheck pass locally."
  evaluated_sha: "1b11ad6597568e8d814d473de7c28e22783a6fe3"
  blueprint_digest: "bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f"
  evidence_refs:
    - ".agentplane/tasks/202605221941-83R8S3/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "535485c364c9e71ac79c0bfd0039234e14fd141c"
  message: "Merge pull request #4032 from basilisk-labs/task/202605221941-83R8S3/task-branch-prepush-base-scope"
comments:
  -
    author: "CODER"
    body: "Start: fixing pre-push changed-file scope for amended task branch force-pushes so local CI does not miss code changes shared by the old and new branch heads."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4032 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-22T19:41:28.266Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing pre-push changed-file scope for amended task branch force-pushes so local CI does not miss code changes shared by the old and new branch heads."
  -
    type: "verify"
    at: "2026-05-22T19:43:41.059Z"
    author: "CODER"
    state: "ok"
    note: "Fixed pre-push scope selection for amended task branches and verified focused selection, lint, explain, and typecheck paths."
  -
    type: "verify"
    at: "2026-05-22T19:44:23.867Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Reviewed refreshed PR artifacts; diffstat now covers pre-push scope code and local-ci selection test updates."
  -
    type: "verify"
    at: "2026-05-22T19:49:59.196Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Fixed CI-only test assumption about origin/main availability; focused selection test, eslint, and typecheck pass locally."
  -
    type: "verify"
    at: "2026-05-22T19:57:01.371Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Addressed review by limiting base-scope fallback to force-push or missing remote old SHA; focused tests now cover fast-forward and amended task-branch cases."
  -
    type: "verify"
    at: "2026-05-22T20:00:44.465Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Reworked regression tests to avoid process.chdir in worker threads; focused selection test, eslint, and typecheck pass locally."
  -
    type: "status"
    at: "2026-05-22T20:21:12.288Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4032 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-22T20:21:12.295Z"
doc_updated_by: "INTEGRATOR"
description: "Prevent pre-push local CI from misclassifying amended or force-pushed task branches as docs-only when the branch still contains code changes by selecting changed files against the task branch base/merge-base instead of only remoteSha..localSha."
sections:
  Summary: |-
    Classify amended task-branch pre-push scope from base

    Prevent pre-push local CI from misclassifying amended or force-pushed task branches as docs-only when the branch still contains code changes by selecting changed files against the task branch base/merge-base instead of only remoteSha..localSha.
  Scope: |-
    - In scope: Prevent pre-push local CI from misclassifying amended or force-pushed task branches as docs-only when the branch still contains code changes by selecting changed files against the task branch base/merge-base instead of only remoteSha..localSha.
    - Out of scope: unrelated refactors not required for "Classify amended task-branch pre-push scope from base".
  Plan: "Fix pre-push changed-file selection for amended/force-pushed task branches. Select local CI changed files against the task branch base/merge-base when the pushed branch is an AgentPlane task branch, while preserving delete-only, release tag, and ordinary branch update behavior. Add focused tests that reproduce an amended task branch where remoteSha..localSha contains only task artifacts but base..localSha contains code, and verify local CI selection routes to a code bucket instead of docs-only."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T19:43:41.059Z — VERIFY — ok

    By: CODER

    Note: Fixed pre-push scope selection for amended task branches and verified focused selection, lint, explain, and typecheck paths.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:41:28.266Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
    - old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221941-83R8S3

    ### 2026-05-22T19:44:23.867Z — VERIFY — ok

    By: EVALUATOR

    Note: Reviewed refreshed PR artifacts; diffstat now covers pre-push scope code and local-ci selection test updates.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:43:41.086Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
    - old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221941-83R8S3

    ### 2026-05-22T19:49:59.196Z — VERIFY — ok

    By: EVALUATOR

    Note: Fixed CI-only test assumption about origin/main availability; focused selection test, eslint, and typecheck pass locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:44:23.901Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
    - old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221941-83R8S3

    ### 2026-05-22T19:57:01.371Z — VERIFY — ok

    By: EVALUATOR

    Note: Addressed review by limiting base-scope fallback to force-push or missing remote old SHA; focused tests now cover fast-forward and amended task-branch cases.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:49:59.229Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
    - old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221941-83R8S3

    ### 2026-05-22T20:00:44.465Z — VERIFY — ok

    By: EVALUATOR

    Note: Reworked regression tests to avoid process.chdir in worker threads; focused selection test, eslint, and typecheck pass locally.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:57:01.403Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
    - old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221941-83R8S3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: pre-push used remoteSha..localSha for existing task branch pushes; after amend/force-push this can show only task artifact deltas while the PR branch still contains code changes relative to main.
      Impact: Local pre-push can run docs-only fast CI for a code PR, delaying failures until hosted CI and weakening local safety.
      Resolution: Task/task-close branch pushes now select changed files from merge-base(default base, localSha) when a default base is available; ordinary no-fallback branch updates keep the previous remoteSha..localSha behavior.

    - Observation: PR #4032 diff is task-scoped and includes task branch base-scope selection plus regression coverage.
      Impact: The task branch has current verification evidence after PR artifact generation.
      Resolution: Squash artifact refresh into the implementation commit and run hosted checks.

    - Observation: GitHub verify-routed failed because the regression test directly called git merge-base origin/main HEAD in a shallow detached checkout where origin/main was not present.
      Impact: The implementation still needs a CI-portable assertion so hosted routed checks can pass.
      Resolution: Changed the test helper to mirror production behavior: use merge-base when available and fallback to the provided base ref otherwise.

    - Observation: The review identified that unconditional task branch base-scope would re-audit historical commits on ordinary fast-forward pushes.
      Impact: Unconditional base-scope could block valid incremental pushes with unrelated historical commits.
      Resolution: Added ancestor detection: fast-forward task pushes keep remoteSha..localSha, amended task force-pushes use merge-base(base, localSha), and missing old SHA keeps fallback base behavior.

    - Observation: Targeted hook suite runs in worker threads, so temp-repo tests must not mutate process cwd.
      Impact: Using process.chdir made the regression tests fail in the same targeted route that protects this change.
      Resolution: Added explicit gitCwd plumbing for selection tests and kept production default behavior unchanged when gitCwd is absent.
id_source: "generated"
---
## Summary

Classify amended task-branch pre-push scope from base

Prevent pre-push local CI from misclassifying amended or force-pushed task branches as docs-only when the branch still contains code changes by selecting changed files against the task branch base/merge-base instead of only remoteSha..localSha.

## Scope

- In scope: Prevent pre-push local CI from misclassifying amended or force-pushed task branches as docs-only when the branch still contains code changes by selecting changed files against the task branch base/merge-base instead of only remoteSha..localSha.
- Out of scope: unrelated refactors not required for "Classify amended task-branch pre-push scope from base".

## Plan

Fix pre-push changed-file selection for amended/force-pushed task branches. Select local CI changed files against the task branch base/merge-base when the pushed branch is an AgentPlane task branch, while preserving delete-only, release tag, and ordinary branch update behavior. Add focused tests that reproduce an amended task branch where remoteSha..localSha contains only task artifacts but base..localSha contains code, and verify local CI selection routes to a code bucket instead of docs-only.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T19:43:41.059Z — VERIFY — ok

By: CODER

Note: Fixed pre-push scope selection for amended task branches and verified focused selection, lint, explain, and typecheck paths.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:41:28.266Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
- old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221941-83R8S3

### 2026-05-22T19:44:23.867Z — VERIFY — ok

By: EVALUATOR

Note: Reviewed refreshed PR artifacts; diffstat now covers pre-push scope code and local-ci selection test updates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:43:41.086Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
- old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221941-83R8S3

### 2026-05-22T19:49:59.196Z — VERIFY — ok

By: EVALUATOR

Note: Fixed CI-only test assumption about origin/main availability; focused selection test, eslint, and typecheck pass locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:44:23.901Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
- old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221941-83R8S3

### 2026-05-22T19:57:01.371Z — VERIFY — ok

By: EVALUATOR

Note: Addressed review by limiting base-scope fallback to force-push or missing remote old SHA; focused tests now cover fast-forward and amended task-branch cases.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:49:59.229Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
- old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221941-83R8S3

### 2026-05-22T20:00:44.465Z — VERIFY — ok

By: EVALUATOR

Note: Reworked regression tests to avoid process.chdir in worker threads; focused selection test, eslint, and typecheck pass locally.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T19:57:01.403Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221941-83R8S3-task-branch-prepush-base-scope/.agentplane/tasks/202605221941-83R8S3/blueprint/resolved-snapshot.json
- old_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- current_digest: bae81a38dfa36298149c949e6a28832a1827427b46faf52fa466ecac85f9b55f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221941-83R8S3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: pre-push used remoteSha..localSha for existing task branch pushes; after amend/force-push this can show only task artifact deltas while the PR branch still contains code changes relative to main.
  Impact: Local pre-push can run docs-only fast CI for a code PR, delaying failures until hosted CI and weakening local safety.
  Resolution: Task/task-close branch pushes now select changed files from merge-base(default base, localSha) when a default base is available; ordinary no-fallback branch updates keep the previous remoteSha..localSha behavior.

- Observation: PR #4032 diff is task-scoped and includes task branch base-scope selection plus regression coverage.
  Impact: The task branch has current verification evidence after PR artifact generation.
  Resolution: Squash artifact refresh into the implementation commit and run hosted checks.

- Observation: GitHub verify-routed failed because the regression test directly called git merge-base origin/main HEAD in a shallow detached checkout where origin/main was not present.
  Impact: The implementation still needs a CI-portable assertion so hosted routed checks can pass.
  Resolution: Changed the test helper to mirror production behavior: use merge-base when available and fallback to the provided base ref otherwise.

- Observation: The review identified that unconditional task branch base-scope would re-audit historical commits on ordinary fast-forward pushes.
  Impact: Unconditional base-scope could block valid incremental pushes with unrelated historical commits.
  Resolution: Added ancestor detection: fast-forward task pushes keep remoteSha..localSha, amended task force-pushes use merge-base(base, localSha), and missing old SHA keeps fallback base behavior.

- Observation: Targeted hook suite runs in worker threads, so temp-repo tests must not mutate process cwd.
  Impact: Using process.chdir made the regression tests fail in the same targeted route that protects this change.
  Resolution: Added explicit gitCwd plumbing for selection tests and kept production default behavior unchanged when gitCwd is absent.
