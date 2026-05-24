---
id: "202605232007-BSW9VX"
title: "Use linear PR merges and clean hosted-close messages"
result_summary: "Merged via PR #4118."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
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
  updated_at: "2026-05-23T20:07:50.314Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T21:12:05.910Z"
  updated_by: "CODER"
  note: "Command: TMPDIR=\"/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tmp/test-tmp\" bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/command-guide.test.ts; Result: pass; Evidence: 5 test files passed, 42 tests passed after Codex review fixes. Scope: rebase-preferred merge with merge fallback, multi-command verification parsing, hosted-close title/workflow contracts. Command: bunx eslint packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts; Result: pass; Evidence: eslint exited 0 with no output. Scope: touched TypeScript files. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: full diff. Command: gh pr checks 4118 --watch --interval 15; Result: pass before review-fix re-push; Evidence: hosted CI on rebased head 405fb8260 was green before addressing review comments. Scope: GitHub hosted gate."
  attempts: 0
commit:
  hash: "157561b05c90acd38c0a58c4c03f1cb75f0c6060"
  message: "🧩 BSW9VX workflow: prefer linear branch_pr merges"
comments:
  -
    author: "CODER"
    body: "Start: implement linear branch_pr GitHub merge defaults and clean hosted-close title and verification message rendering."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4118 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T20:09:29.420Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement linear branch_pr GitHub merge defaults and clean hosted-close title and verification message rendering."
  -
    type: "verify"
    at: "2026-05-23T20:31:50.252Z"
    author: "CODER"
    state: "ok"
    note: "Command: TMPDIR=\"/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tmp/test-tmp\" bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.test.ts; Result: pass; Evidence: 5 test files passed, 41 tests passed. Scope: protected branch_pr GitHub merge method, hosted-close workflow contract, hosted-close PR title rendering, close-message verification rendering, command-guide text. Command: bunx eslint packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts; Result: pass; Evidence: eslint exited 0 with no output. Scope: touched TypeScript files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing after docs/runtime guidance change. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: full diff. Command: ap doctor; Result: pass; Evidence: doctor OK after bootstrap; unrelated warnings remain for task 202605230451-N5F0HY. Scope: repo health and branch_pr drift."
  -
    type: "verify"
    at: "2026-05-23T21:12:05.910Z"
    author: "CODER"
    state: "ok"
    note: "Command: TMPDIR=\"/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tmp/test-tmp\" bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/command-guide.test.ts; Result: pass; Evidence: 5 test files passed, 42 tests passed after Codex review fixes. Scope: rebase-preferred merge with merge fallback, multi-command verification parsing, hosted-close title/workflow contracts. Command: bunx eslint packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts; Result: pass; Evidence: eslint exited 0 with no output. Scope: touched TypeScript files. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: full diff. Command: gh pr checks 4118 --watch --interval 15; Result: pass before review-fix re-push; Evidence: hosted CI on rebased head 405fb8260 was green before addressing review comments. Scope: GitHub hosted gate."
  -
    type: "status"
    at: "2026-05-23T21:23:01.355Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4118 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T21:23:01.361Z"
doc_updated_by: "INTEGRATOR"
description: "Reduce branch_pr history noise while preserving source PR history by using linear/rebase merges where supported and improving hosted close PR/commit message clarity."
sections:
  Summary: |-
    Use linear PR merges and clean hosted-close messages

    Reduce branch_pr history noise while preserving source PR history by using linear/rebase merges where supported and improving hosted close PR/commit message clarity.
  Scope: |-
    - In scope: Reduce branch_pr history noise while preserving source PR history by using linear/rebase merges where supported and improving hosted close PR/commit message clarity.
    - Out of scope: unrelated refactors not required for "Use linear PR merges and clean hosted-close messages".
  Plan: |-
    Plan:
    1. Change protected branch_pr GitHub merge transport to prefer linear rebase merge for source task PRs while preserving fallback/error handling.
    2. Change hosted-close workflow merge step to use rebase merge for closure PRs.
    3. Fix hosted-close PR title extraction so source titles do not duplicate the task id marker.
    4. Improve close commit verification message normalization to avoid repeated 'passed' phrasing and noisy Result/Evidence tokens.
    5. Add/update regression tests for merge method contract, hosted close title generation, and close-message verification output.
    6. Verify with focused tests, lint on touched files, routing check, and doctor.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T20:31:50.252Z — VERIFY — ok

    By: CODER

    Note: Command: TMPDIR="/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tmp/test-tmp" bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.test.ts; Result: pass; Evidence: 5 test files passed, 41 tests passed. Scope: protected branch_pr GitHub merge method, hosted-close workflow contract, hosted-close PR title rendering, close-message verification rendering, command-guide text. Command: bunx eslint packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts; Result: pass; Evidence: eslint exited 0 with no output. Scope: touched TypeScript files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing after docs/runtime guidance change. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: full diff. Command: ap doctor; Result: pass; Evidence: doctor OK after bootstrap; unrelated warnings remain for task 202605230451-N5F0HY. Scope: repo health and branch_pr drift.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T20:09:29.420Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tasks/202605232007-BSW9VX/blueprint/resolved-snapshot.json
    - old_digest: e4f659c39ac6475aaaae5710589719a3851ab9d45f3f20aac7841db8b96ec7fe
    - current_digest: e4f659c39ac6475aaaae5710589719a3851ab9d45f3f20aac7841db8b96ec7fe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605232007-BSW9VX

    ### 2026-05-23T21:12:05.910Z — VERIFY — ok

    By: CODER

    Note: Command: TMPDIR="/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tmp/test-tmp" bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/command-guide.test.ts; Result: pass; Evidence: 5 test files passed, 42 tests passed after Codex review fixes. Scope: rebase-preferred merge with merge fallback, multi-command verification parsing, hosted-close title/workflow contracts. Command: bunx eslint packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts; Result: pass; Evidence: eslint exited 0 with no output. Scope: touched TypeScript files. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: full diff. Command: gh pr checks 4118 --watch --interval 15; Result: pass before review-fix re-push; Evidence: hosted CI on rebased head 405fb8260 was green before addressing review comments. Scope: GitHub hosted gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T20:31:50.442Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tasks/202605232007-BSW9VX/blueprint/resolved-snapshot.json
    - old_digest: e4f659c39ac6475aaaae5710589719a3851ab9d45f3f20aac7841db8b96ec7fe
    - current_digest: e4f659c39ac6475aaaae5710589719a3851ab9d45f3f20aac7841db8b96ec7fe
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605232007-BSW9VX

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Use linear PR merges and clean hosted-close messages

Reduce branch_pr history noise while preserving source PR history by using linear/rebase merges where supported and improving hosted close PR/commit message clarity.

## Scope

- In scope: Reduce branch_pr history noise while preserving source PR history by using linear/rebase merges where supported and improving hosted close PR/commit message clarity.
- Out of scope: unrelated refactors not required for "Use linear PR merges and clean hosted-close messages".

## Plan

Plan:
1. Change protected branch_pr GitHub merge transport to prefer linear rebase merge for source task PRs while preserving fallback/error handling.
2. Change hosted-close workflow merge step to use rebase merge for closure PRs.
3. Fix hosted-close PR title extraction so source titles do not duplicate the task id marker.
4. Improve close commit verification message normalization to avoid repeated 'passed' phrasing and noisy Result/Evidence tokens.
5. Add/update regression tests for merge method contract, hosted close title generation, and close-message verification output.
6. Verify with focused tests, lint on touched files, routing check, and doctor.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T20:31:50.252Z — VERIFY — ok

By: CODER

Note: Command: TMPDIR="/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tmp/test-tmp" bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.test.ts; Result: pass; Evidence: 5 test files passed, 41 tests passed. Scope: protected branch_pr GitHub merge method, hosted-close workflow contract, hosted-close PR title rendering, close-message verification rendering, command-guide text. Command: bunx eslint packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts; Result: pass; Evidence: eslint exited 0 with no output. Scope: touched TypeScript files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing after docs/runtime guidance change. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: full diff. Command: ap doctor; Result: pass; Evidence: doctor OK after bootstrap; unrelated warnings remain for task 202605230451-N5F0HY. Scope: repo health and branch_pr drift.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T20:09:29.420Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tasks/202605232007-BSW9VX/blueprint/resolved-snapshot.json
- old_digest: e4f659c39ac6475aaaae5710589719a3851ab9d45f3f20aac7841db8b96ec7fe
- current_digest: e4f659c39ac6475aaaae5710589719a3851ab9d45f3f20aac7841db8b96ec7fe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605232007-BSW9VX

### 2026-05-23T21:12:05.910Z — VERIFY — ok

By: CODER

Note: Command: TMPDIR="/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tmp/test-tmp" bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts packages/agentplane/src/cli/command-guide.test.ts; Result: pass; Evidence: 5 test files passed, 42 tests passed after Codex review fixes. Scope: rebase-preferred merge with merge fallback, multi-command verification parsing, hosted-close title/workflow contracts. Command: bunx eslint packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/guard/impl/close-message.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/cli/command-guide.ts packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts; Result: pass; Evidence: eslint exited 0 with no output. Scope: touched TypeScript files. Command: git diff --check; Result: pass; Evidence: no whitespace errors. Scope: full diff. Command: gh pr checks 4118 --watch --interval 15; Result: pass before review-fix re-push; Evidence: hosted CI on rebased head 405fb8260 was green before addressing review comments. Scope: GitHub hosted gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T20:31:50.442Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605232007-BSW9VX-linear-merge-messages/.agentplane/tasks/202605232007-BSW9VX/blueprint/resolved-snapshot.json
- old_digest: e4f659c39ac6475aaaae5710589719a3851ab9d45f3f20aac7841db8b96ec7fe
- current_digest: e4f659c39ac6475aaaae5710589719a3851ab9d45f3f20aac7841db8b96ec7fe
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605232007-BSW9VX

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
