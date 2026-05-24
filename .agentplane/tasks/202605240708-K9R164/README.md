---
id: "202605240708-K9R164"
title: "Fix recent branch_pr issue candidates"
result_summary: "Merged via PR #4127."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-24T07:09:21.251Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-24T07:28:52.294Z"
  updated_by: "EVALUATOR"
  note: "Verified: Quality gate rerun after moving regression tests out of oversized files. Command: bun run hotspots:check; Result: pass; Evidence: oversized test baseline OK with 11 entries and 12568 total lines. Command: git diff --stat HEAD; Result: pass; Evidence: runtime changes unchanged; regression tests now live in non-oversized target files. Scope: CI failure recovery for PR #4127."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-24T09:08:47.790Z"
  updated_by: "EVALUATOR"
  note: "Revalidated final scoped branch after restoring unrelated mainline evaluator changes and updating testkit quality-review fixtures."
  evaluated_sha: "2361d4f81891cafe7c2c9e18fd3d12065e05ef7f"
  blueprint_digest: "f2d8e77ef5a72f2fe7f3424073cdd91fc5d9bdce8b69c85a26f2c462a323999b"
  evidence_refs:
    - ".agentplane/tasks/202605240708-K9R164/README.md"
    - ".agentplane/tasks/202605240708-K9R164/quality/20260524-090847790-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605240708-K9R164/quality/20260524-090847790-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605240708-K9R164/quality/20260524-090847790-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605240708-K9R164/blueprint/resolved-snapshot.json"
    - "bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts --project cli-core packages/agentplane/src/backends/task-backend.local-handoff.test.ts --project agentplane packages/agentplane/src/commands/pr/integrate/cmd.test.ts --project agentplane: 3 files, 17 tests passed"
    - "bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-strategies.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts --project cli-core: 4 files, 23 tests passed"
    - "bunx prettier --check touched files: passed"
    - "bunx eslint touched files: passed"
    - "node .agentplane/policy/check-routing.mjs: passed"
  findings:
    - "Pass: final diff is scoped to K9R164 artifacts, branch_pr issue fixes, and the testkit helper required by the structured quality-review gate."
commit:
  hash: "24efc3e3513f2dfc1f33f6e2d9a68f74d4097865"
  message: "✨ K9R164 workflow: fix branch_pr issue candidates"
comments:
  -
    author: "CODER"
    body: "Start: Implementing issue-backed fixes for unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API fallback empty pullRequestId behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4127 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-24T07:11:45.935Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing issue-backed fixes for unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API fallback empty pullRequestId behavior."
  -
    type: "verify"
    at: "2026-05-24T07:19:48.060Z"
    author: "CODER"
    state: "ok"
    note: "Verified: Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts --project cli-core; Result: pass; Evidence: 1 file, 11 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/backends/task-backend.local.test.ts --project agentplane; Result: pass; Evidence: 1 file, 32 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/integrate/cmd.test.ts --project agentplane; Result: pass; Evidence: 1 file, 13 tests passed. Command: bunx prettier --check touched files; Result: pass. Command: bunx eslint touched files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass."
  -
    type: "verify"
    at: "2026-05-24T07:20:42.867Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: Quality gate reviewed the implementation diff and focused check results. Command: git show --stat 15865576914860a14ed5cb1e3bb59731e2b6cac1; Result: pass; Evidence: scoped diff covers pr artifact auto-commit, local backend scanning, GitHub API merge fallback, and regression tests only. Scope: issue-backed branch_pr fixes."
  -
    type: "verify"
    at: "2026-05-24T07:28:36.863Z"
    author: "CODER"
    state: "ok"
    note: "Verified: Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts --project cli-core; Result: pass; Evidence: 1 file, 3 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts --project cli-core; Result: pass; Evidence: 1 file, 10 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --project agentplane; Result: pass; Evidence: 2 files, 32 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/integrate/cmd.test.ts --project agentplane; Result: pass; Evidence: 1 file, 13 tests passed. Command: bunx prettier --check touched files; Result: pass. Command: bunx eslint touched files; Result: pass. Command: bun run hotspots:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass."
  -
    type: "verify"
    at: "2026-05-24T07:28:52.294Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: Quality gate rerun after moving regression tests out of oversized files. Command: bun run hotspots:check; Result: pass; Evidence: oversized test baseline OK with 11 entries and 12568 total lines. Command: git diff --stat HEAD; Result: pass; Evidence: runtime changes unchanged; regression tests now live in non-oversized target files. Scope: CI failure recovery for PR #4127."
  -
    type: "status"
    at: "2026-05-24T09:28:30.321Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4127 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-24T09:28:30.331Z"
doc_updated_by: "INTEGRATOR"
description: "Fix three issue-backed regressions found from recent commit history: unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API merge fallback with empty pullRequestId."
sections:
  Summary: |-
    Fix recent branch_pr issue candidates

    Fix three issue-backed regressions found from recent commit history: unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API merge fallback with empty pullRequestId.
  Scope: |-
    - In scope: Fix three issue-backed regressions found from recent commit history: unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API merge fallback with empty pullRequestId.
    - Out of scope: unrelated refactors not required for "Fix recent branch_pr issue candidates".
  Plan: "1. Harden pr-open artifact auto-commit strategy so auto-amend only targets eligible implementation commits and falls back to a separate task artifact commit for task-only/status/artifact commits. 2. Adjust local task scanning or handoff handling so handoff-only task directories do not produce task list/task active warnings while preserving real invalid README warnings. 3. Harden GitHub API protected-base merge fallback so auto-merge fallback is only attempted with a resolved pullRequestId and diagnostics keep the primary failure clear. 4. Add focused regression coverage for each issue and run the task verification contract."
  Verify Steps: "1. Run focused PR artifact lifecycle tests covering pr-open/pr-update auto-commit behavior. Expected: pr-open does not amend task-only/status/artifact commits and still amends eligible implementation commits. 2. Run focused local task backend/listing tests covering handoff-only directories. Expected: task scans ignore handoff-only directories without suppressing real invalid README warnings. 3. Run focused integrate GitHub API fallback tests. Expected: API fallback does not call enablePullRequestAutoMerge without a resolved pullRequestId and preserves clear diagnostics. 4. Run policy routing validation. Expected: node .agentplane/policy/check-routing.mjs passes."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-24T07:19:48.060Z — VERIFY — ok

    By: CODER

    Note: Verified: Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts --project cli-core; Result: pass; Evidence: 1 file, 11 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/backends/task-backend.local.test.ts --project agentplane; Result: pass; Evidence: 1 file, 32 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/integrate/cmd.test.ts --project agentplane; Result: pass; Evidence: 1 file, 13 tests passed. Command: bunx prettier --check touched files; Result: pass. Command: bunx eslint touched files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:11:45.935Z, excerpt_hash=sha256:b6556d3e56d716403eb7ab7fc1cd2a4796b621a998f011ba363636bd9b408c0e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240708-K9R164-fix-recent-branch-pr-issue-candidates/.agentplane/tasks/202605240708-K9R164/blueprint/resolved-snapshot.json
    - old_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
    - current_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240708-K9R164

    ### 2026-05-24T07:20:42.867Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: Quality gate reviewed the implementation diff and focused check results. Command: git show --stat 15865576914860a14ed5cb1e3bb59731e2b6cac1; Result: pass; Evidence: scoped diff covers pr artifact auto-commit, local backend scanning, GitHub API merge fallback, and regression tests only. Scope: issue-backed branch_pr fixes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:19:48.083Z, excerpt_hash=sha256:b6556d3e56d716403eb7ab7fc1cd2a4796b621a998f011ba363636bd9b408c0e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240708-K9R164-fix-recent-branch-pr-issue-candidates/.agentplane/tasks/202605240708-K9R164/blueprint/resolved-snapshot.json
    - old_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
    - current_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240708-K9R164

    ### 2026-05-24T07:28:36.863Z — VERIFY — ok

    By: CODER

    Note: Verified: Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts --project cli-core; Result: pass; Evidence: 1 file, 3 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts --project cli-core; Result: pass; Evidence: 1 file, 10 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --project agentplane; Result: pass; Evidence: 2 files, 32 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/integrate/cmd.test.ts --project agentplane; Result: pass; Evidence: 1 file, 13 tests passed. Command: bunx prettier --check touched files; Result: pass. Command: bunx eslint touched files; Result: pass. Command: bun run hotspots:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:20:42.886Z, excerpt_hash=sha256:b6556d3e56d716403eb7ab7fc1cd2a4796b621a998f011ba363636bd9b408c0e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240708-K9R164-fix-recent-branch-pr-issue-candidates/.agentplane/tasks/202605240708-K9R164/blueprint/resolved-snapshot.json
    - old_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
    - current_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240708-K9R164

    ### 2026-05-24T07:28:52.294Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: Quality gate rerun after moving regression tests out of oversized files. Command: bun run hotspots:check; Result: pass; Evidence: oversized test baseline OK with 11 entries and 12568 total lines. Command: git diff --stat HEAD; Result: pass; Evidence: runtime changes unchanged; regression tests now live in non-oversized target files. Scope: CI failure recovery for PR #4127.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:28:36.878Z, excerpt_hash=sha256:b6556d3e56d716403eb7ab7fc1cd2a4796b621a998f011ba363636bd9b408c0e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240708-K9R164-fix-recent-branch-pr-issue-candidates/.agentplane/tasks/202605240708-K9R164/blueprint/resolved-snapshot.json
    - old_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
    - current_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605240708-K9R164

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix recent branch_pr issue candidates

Fix three issue-backed regressions found from recent commit history: unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API merge fallback with empty pullRequestId.

## Scope

- In scope: Fix three issue-backed regressions found from recent commit history: unsafe pr-open artifact amend, handoff-only task scan warnings, and GitHub API merge fallback with empty pullRequestId.
- Out of scope: unrelated refactors not required for "Fix recent branch_pr issue candidates".

## Plan

1. Harden pr-open artifact auto-commit strategy so auto-amend only targets eligible implementation commits and falls back to a separate task artifact commit for task-only/status/artifact commits. 2. Adjust local task scanning or handoff handling so handoff-only task directories do not produce task list/task active warnings while preserving real invalid README warnings. 3. Harden GitHub API protected-base merge fallback so auto-merge fallback is only attempted with a resolved pullRequestId and diagnostics keep the primary failure clear. 4. Add focused regression coverage for each issue and run the task verification contract.

## Verify Steps

1. Run focused PR artifact lifecycle tests covering pr-open/pr-update auto-commit behavior. Expected: pr-open does not amend task-only/status/artifact commits and still amends eligible implementation commits. 2. Run focused local task backend/listing tests covering handoff-only directories. Expected: task scans ignore handoff-only directories without suppressing real invalid README warnings. 3. Run focused integrate GitHub API fallback tests. Expected: API fallback does not call enablePullRequestAutoMerge without a resolved pullRequestId and preserves clear diagnostics. 4. Run policy routing validation. Expected: node .agentplane/policy/check-routing.mjs passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-24T07:19:48.060Z — VERIFY — ok

By: CODER

Note: Verified: Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts --project cli-core; Result: pass; Evidence: 1 file, 11 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/backends/task-backend.local.test.ts --project agentplane; Result: pass; Evidence: 1 file, 32 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/integrate/cmd.test.ts --project agentplane; Result: pass; Evidence: 1 file, 13 tests passed. Command: bunx prettier --check touched files; Result: pass. Command: bunx eslint touched files; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:11:45.935Z, excerpt_hash=sha256:b6556d3e56d716403eb7ab7fc1cd2a4796b621a998f011ba363636bd9b408c0e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240708-K9R164-fix-recent-branch-pr-issue-candidates/.agentplane/tasks/202605240708-K9R164/blueprint/resolved-snapshot.json
- old_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
- current_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240708-K9R164

### 2026-05-24T07:20:42.867Z — VERIFY — ok

By: EVALUATOR

Note: Verified: Quality gate reviewed the implementation diff and focused check results. Command: git show --stat 15865576914860a14ed5cb1e3bb59731e2b6cac1; Result: pass; Evidence: scoped diff covers pr artifact auto-commit, local backend scanning, GitHub API merge fallback, and regression tests only. Scope: issue-backed branch_pr fixes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:19:48.083Z, excerpt_hash=sha256:b6556d3e56d716403eb7ab7fc1cd2a4796b621a998f011ba363636bd9b408c0e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240708-K9R164-fix-recent-branch-pr-issue-candidates/.agentplane/tasks/202605240708-K9R164/blueprint/resolved-snapshot.json
- old_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
- current_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240708-K9R164

### 2026-05-24T07:28:36.863Z — VERIFY — ok

By: CODER

Note: Verified: Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts --project cli-core; Result: pass; Evidence: 1 file, 3 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts --project cli-core; Result: pass; Evidence: 1 file, 10 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.local-handoff.test.ts --project agentplane; Result: pass; Evidence: 2 files, 32 tests passed. Command: bun vitest --config vitest.workspace.ts run packages/agentplane/src/commands/pr/integrate/cmd.test.ts --project agentplane; Result: pass; Evidence: 1 file, 13 tests passed. Command: bunx prettier --check touched files; Result: pass. Command: bunx eslint touched files; Result: pass. Command: bun run hotspots:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:20:42.886Z, excerpt_hash=sha256:b6556d3e56d716403eb7ab7fc1cd2a4796b621a998f011ba363636bd9b408c0e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240708-K9R164-fix-recent-branch-pr-issue-candidates/.agentplane/tasks/202605240708-K9R164/blueprint/resolved-snapshot.json
- old_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
- current_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240708-K9R164

### 2026-05-24T07:28:52.294Z — VERIFY — ok

By: EVALUATOR

Note: Verified: Quality gate rerun after moving regression tests out of oversized files. Command: bun run hotspots:check; Result: pass; Evidence: oversized test baseline OK with 11 entries and 12568 total lines. Command: git diff --stat HEAD; Result: pass; Evidence: runtime changes unchanged; regression tests now live in non-oversized target files. Scope: CI failure recovery for PR #4127.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-24T07:28:36.878Z, excerpt_hash=sha256:b6556d3e56d716403eb7ab7fc1cd2a4796b621a998f011ba363636bd9b408c0e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605240708-K9R164-fix-recent-branch-pr-issue-candidates/.agentplane/tasks/202605240708-K9R164/blueprint/resolved-snapshot.json
- old_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
- current_digest: 744602cef69e72cbc8ee1d76a7158ad2082a1c4cb1bb0f671451179be5182ba4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605240708-K9R164

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
