---
id: "202605221726-WY8F98"
title: "Batch close-tail evidence for related tasks"
status: "DOING"
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
verify:
  - "Confirm duplicate close-tail PRs are not opened for sibling tasks in the batch."
  - "Confirm each included task receives independent finish evidence."
  - "Run hosted-close and hosted-close-pr tests for multi-task batch closure."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:50.678Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T00:35:43.441Z"
  updated_by: "EVALUATOR"
  note: "Evaluator pass: implementation is limited to close-tail PR evidence for batch metadata and tests cover hosted-close plus hosted-close-pr behavior."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T00:35:43.441Z"
  updated_by: "EVALUATOR"
  note: "Evaluator pass: implementation is limited to close-tail PR evidence for batch metadata and tests cover hosted-close plus hosted-close-pr behavior."
  evaluated_sha: "f412addd5abb1fa651072a10c6de90c907dd698c"
  blueprint_digest: "711f9dbb79cb7cd0fe2727feebedc42294282518f3187772e2e4512a368b54e2"
  evidence_refs:
    - ".agentplane/tasks/202605221726-WY8F98/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-WY8F98-batch-close-tail-evidence/.agentplane/tasks/202605221726-WY8F98/blueprint/resolved-snapshot.json"
  findings:
    - "Diff review: hosted-close-pr plan now carries includedTaskIds from pr/meta batch metadata and renders them in the GitHub PR body. Existing hosted-close batch closure test still passes, and hosted-close-pr fallback test asserts the included task appears in the PR body."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing batch hosted close-tail evidence so one close PR can close related included tasks without duplicate sibling close PRs."
events:
  -
    type: "status"
    at: "2026-05-23T00:31:44.826Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing batch hosted close-tail evidence so one close PR can close related included tasks without duplicate sibling close PRs."
  -
    type: "verify"
    at: "2026-05-23T00:35:29.598Z"
    author: "CODER"
    state: "ok"
    note: "Batch hosted-close-pr evidence now preserves included task ids in the close-tail PR body; hosted-close batch closure tests remain green."
  -
    type: "verify"
    at: "2026-05-23T00:35:43.441Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator pass: implementation is limited to close-tail PR evidence for batch metadata and tests cover hosted-close plus hosted-close-pr behavior."
doc_version: 3
doc_updated_at: "2026-05-23T00:35:43.469Z"
doc_updated_by: "CODER"
description: "Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence."
sections:
  Summary: |-
    Batch close-tail evidence for related tasks

    Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.
  Scope: |-
    - In scope: Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.
    - Out of scope: unrelated refactors not required for "Batch close-tail evidence for related tasks".
  Plan: "Optimize branch_pr close-tail for approved related batches. The implementation PR should be able to produce one evidence-only close-tail PR that records every included task, avoids duplicate close PRs, and keeps per-task verification/final result records intact."
  Verify Steps: |-
    1. Run hosted-close and hosted-close-pr tests for multi-task batch closure.
    2. Confirm each included task receives independent finish evidence.
    3. Confirm duplicate close-tail PRs are not opened for sibling tasks in the batch.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T00:35:29.598Z — VERIFY — ok

    By: CODER

    Note: Batch hosted-close-pr evidence now preserves included task ids in the close-tail PR body; hosted-close batch closure tests remain green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:31:44.826Z, excerpt_hash=sha256:3416dfbfd553ab1db86618e6a53fac16417f4163de0948509d12dc3cb8a64946

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-WY8F98-batch-close-tail-evidence/.agentplane/tasks/202605221726-WY8F98/blueprint/resolved-snapshot.json
    - old_digest: 711f9dbb79cb7cd0fe2727feebedc42294282518f3187772e2e4512a368b54e2
    - current_digest: 711f9dbb79cb7cd0fe2727feebedc42294282518f3187772e2e4512a368b54e2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-WY8F98

    ### 2026-05-23T00:35:43.441Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator pass: implementation is limited to close-tail PR evidence for batch metadata and tests cover hosted-close plus hosted-close-pr behavior.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:35:29.625Z, excerpt_hash=sha256:3416dfbfd553ab1db86618e6a53fac16417f4163de0948509d12dc3cb8a64946

    Details:

    Diff review: hosted-close-pr plan now carries includedTaskIds from pr/meta batch metadata and renders them in the GitHub PR body. Existing hosted-close batch closure test still passes, and hosted-close-pr fallback test asserts the included task appears in the PR body.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-WY8F98-batch-close-tail-evidence/.agentplane/tasks/202605221726-WY8F98/blueprint/resolved-snapshot.json
    - old_digest: 711f9dbb79cb7cd0fe2727feebedc42294282518f3187772e2e4512a368b54e2
    - current_digest: 711f9dbb79cb7cd0fe2727feebedc42294282518f3187772e2e4512a368b54e2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-WY8F98

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts packages/agentplane/src/commands/task/hosted-close-pr.command.test.ts => pass (3 files, 11 tests); bun run typecheck => pass; bun run lint:core -- hosted-close-pr touched paths => pass; bun run format:check -- hosted-close-pr touched paths => pass.
      Impact: Manual hosted close-tail PRs for branch_pr batches now expose the included task set, so one close PR can serve as auditable closure evidence for related tasks instead of looking primary-only.
      Resolution: Carried pr/meta batch.included_task_ids through hosted-close-pr precheck/plan and rendered them in the GitHub PR body.
id_source: "generated"
---
## Summary

Batch close-tail evidence for related tasks

Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.

## Scope

- In scope: Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.
- Out of scope: unrelated refactors not required for "Batch close-tail evidence for related tasks".

## Plan

Optimize branch_pr close-tail for approved related batches. The implementation PR should be able to produce one evidence-only close-tail PR that records every included task, avoids duplicate close PRs, and keeps per-task verification/final result records intact.

## Verify Steps

1. Run hosted-close and hosted-close-pr tests for multi-task batch closure.
2. Confirm each included task receives independent finish evidence.
3. Confirm duplicate close-tail PRs are not opened for sibling tasks in the batch.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T00:35:29.598Z — VERIFY — ok

By: CODER

Note: Batch hosted-close-pr evidence now preserves included task ids in the close-tail PR body; hosted-close batch closure tests remain green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:31:44.826Z, excerpt_hash=sha256:3416dfbfd553ab1db86618e6a53fac16417f4163de0948509d12dc3cb8a64946

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-WY8F98-batch-close-tail-evidence/.agentplane/tasks/202605221726-WY8F98/blueprint/resolved-snapshot.json
- old_digest: 711f9dbb79cb7cd0fe2727feebedc42294282518f3187772e2e4512a368b54e2
- current_digest: 711f9dbb79cb7cd0fe2727feebedc42294282518f3187772e2e4512a368b54e2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-WY8F98

### 2026-05-23T00:35:43.441Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator pass: implementation is limited to close-tail PR evidence for batch metadata and tests cover hosted-close plus hosted-close-pr behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T00:35:29.625Z, excerpt_hash=sha256:3416dfbfd553ab1db86618e6a53fac16417f4163de0948509d12dc3cb8a64946

Details:

Diff review: hosted-close-pr plan now carries includedTaskIds from pr/meta batch metadata and renders them in the GitHub PR body. Existing hosted-close batch closure test still passes, and hosted-close-pr fallback test asserts the included task appears in the PR body.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-WY8F98-batch-close-tail-evidence/.agentplane/tasks/202605221726-WY8F98/blueprint/resolved-snapshot.json
- old_digest: 711f9dbb79cb7cd0fe2727feebedc42294282518f3187772e2e4512a368b54e2
- current_digest: 711f9dbb79cb7cd0fe2727feebedc42294282518f3187772e2e4512a368b54e2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-WY8F98

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts packages/agentplane/src/commands/task/hosted-close-pr.command.test.ts => pass (3 files, 11 tests); bun run typecheck => pass; bun run lint:core -- hosted-close-pr touched paths => pass; bun run format:check -- hosted-close-pr touched paths => pass.
  Impact: Manual hosted close-tail PRs for branch_pr batches now expose the included task set, so one close PR can serve as auditable closure evidence for related tasks instead of looking primary-only.
  Resolution: Carried pr/meta batch.included_task_ids through hosted-close-pr precheck/plan and rendered them in the GitHub PR body.
