---
id: "202605231744-WJT2KR"
title: "Avoid extra branch_pr artifact commit on PR open"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-23T17:46:14.309Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T18:04:27.218Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts -t 'pr open'; Result: pass; Evidence: 1 test file passed, 2 tests passed including pr-open amend regression. Scope: branch_pr pr open artifact refresh. Command: bun run lint:core -- packages/agentplane/src/commands/pr/internal/auto-commit.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts; Result: pass; Evidence: eslint exited 0. Scope: touched TypeScript files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy gateway routing. Command: agentplane doctor; Result: pass with unrelated warnings for task 202605230451-N5F0HY. Scope: repo health after implementation."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the branch_pr PR-open artifact refresh regression so existing implementation commits receive refreshed task artifacts by amend instead of a second artifact-only commit."
events:
  -
    type: "status"
    at: "2026-05-23T17:50:28.275Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the branch_pr PR-open artifact refresh regression so existing implementation commits receive refreshed task artifacts by amend instead of a second artifact-only commit."
  -
    type: "verify"
    at: "2026-05-23T18:04:27.218Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts -t 'pr open'; Result: pass; Evidence: 1 test file passed, 2 tests passed including pr-open amend regression. Scope: branch_pr pr open artifact refresh. Command: bun run lint:core -- packages/agentplane/src/commands/pr/internal/auto-commit.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts; Result: pass; Evidence: eslint exited 0. Scope: touched TypeScript files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy gateway routing. Command: agentplane doctor; Result: pass with unrelated warnings for task 202605230451-N5F0HY. Scope: repo health after implementation."
doc_version: 3
doc_updated_at: "2026-05-23T18:04:27.674Z"
doc_updated_by: "CODER"
description: "Fix branch_pr pr open so task artifacts are amended into an existing implementation commit instead of creating a second artifact-only commit when the task branch already has code changes."
sections:
  Summary: |-
    Avoid extra branch_pr artifact commit on PR open

    Fix branch_pr pr open so task artifacts are amended into an existing implementation commit instead of creating a second artifact-only commit when the task branch already has code changes.
  Scope: |-
    - In scope: Fix branch_pr pr open so task artifacts are amended into an existing implementation commit instead of creating a second artifact-only commit when the task branch already has code changes.
    - Out of scope: unrelated refactors not required for "Avoid extra branch_pr artifact commit on PR open".
  Plan: "1. Reproduce the branch_pr PR-open artifact refresh contract in tests. 2. Change PR-open artifact auto-commit selection so an existing non-task implementation commit is amended rather than followed by a second artifact-only commit. 3. Verify focused PR lifecycle tests plus policy routing and doctor."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts -t "pr open"`. Expected: PR-open lifecycle tests pass, including the regression where refreshed task artifacts are amended into an existing implementation commit.
    2. Run `bun run lint:core -- packages/agentplane/src/commands/pr/internal/auto-commit.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts`. Expected: touched TypeScript files lint clean.
    3. Run `node .agentplane/policy/check-routing.mjs` and `agentplane doctor`. Expected: policy routing and repo health stay clean after the workflow change.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T18:04:27.218Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts -t 'pr open'; Result: pass; Evidence: 1 test file passed, 2 tests passed including pr-open amend regression. Scope: branch_pr pr open artifact refresh. Command: bun run lint:core -- packages/agentplane/src/commands/pr/internal/auto-commit.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts; Result: pass; Evidence: eslint exited 0. Scope: touched TypeScript files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy gateway routing. Command: agentplane doctor; Result: pass with unrelated warnings for task 202605230451-N5F0HY. Scope: repo health after implementation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T17:50:28.275Z, excerpt_hash=sha256:6374e4eee059e261226a82db924fca89f971fdd64a36f6d48c36a6d2f55e9d89

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231744-WJT2KR-pr-open-amend-artifacts/.agentplane/tasks/202605231744-WJT2KR/blueprint/resolved-snapshot.json
    - old_digest: 640071baf9eb9dd88ae1d1c112c612ee1bd826c5a7c739c2b7ea9326f0a6430c
    - current_digest: 640071baf9eb9dd88ae1d1c112c612ee1bd826c5a7c739c2b7ea9326f0a6430c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605231744-WJT2KR

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Avoid extra branch_pr artifact commit on PR open

Fix branch_pr pr open so task artifacts are amended into an existing implementation commit instead of creating a second artifact-only commit when the task branch already has code changes.

## Scope

- In scope: Fix branch_pr pr open so task artifacts are amended into an existing implementation commit instead of creating a second artifact-only commit when the task branch already has code changes.
- Out of scope: unrelated refactors not required for "Avoid extra branch_pr artifact commit on PR open".

## Plan

1. Reproduce the branch_pr PR-open artifact refresh contract in tests. 2. Change PR-open artifact auto-commit selection so an existing non-task implementation commit is amended rather than followed by a second artifact-only commit. 3. Verify focused PR lifecycle tests plus policy routing and doctor.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts -t "pr open"`. Expected: PR-open lifecycle tests pass, including the regression where refreshed task artifacts are amended into an existing implementation commit.
2. Run `bun run lint:core -- packages/agentplane/src/commands/pr/internal/auto-commit.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts`. Expected: touched TypeScript files lint clean.
3. Run `node .agentplane/policy/check-routing.mjs` and `agentplane doctor`. Expected: policy routing and repo health stay clean after the workflow change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T18:04:27.218Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts -t 'pr open'; Result: pass; Evidence: 1 test file passed, 2 tests passed including pr-open amend regression. Scope: branch_pr pr open artifact refresh. Command: bun run lint:core -- packages/agentplane/src/commands/pr/internal/auto-commit.ts packages/agentplane/src/commands/pr/open.ts packages/agentplane/src/commands/pr/update.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts; Result: pass; Evidence: eslint exited 0. Scope: touched TypeScript files. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy gateway routing. Command: agentplane doctor; Result: pass with unrelated warnings for task 202605230451-N5F0HY. Scope: repo health after implementation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T17:50:28.275Z, excerpt_hash=sha256:6374e4eee059e261226a82db924fca89f971fdd64a36f6d48c36a6d2f55e9d89

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605231744-WJT2KR-pr-open-amend-artifacts/.agentplane/tasks/202605231744-WJT2KR/blueprint/resolved-snapshot.json
- old_digest: 640071baf9eb9dd88ae1d1c112c612ee1bd826c5a7c739c2b7ea9326f0a6430c
- current_digest: 640071baf9eb9dd88ae1d1c112c612ee1bd826c5a7c739c2b7ea9326f0a6430c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605231744-WJT2KR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
