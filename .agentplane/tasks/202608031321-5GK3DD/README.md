---
id: "202608031321-5GK3DD"
title: "Make built-in task run context-verifiable"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "issue-4641"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T13:22:19.434Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T13:22:52.115Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T13:22:52.115Z"
doc_updated_by: "CODER"
description: "Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication."
sections:
  Summary: |-
    Make built-in task run context-verifiable

    Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.
  Scope: |-
    - In scope: Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.
    - Out of scope: unrelated refactors not required for "Make built-in task run context-verifiable".
  Plan: "Trace the built-in task run receipt and context verification paths; preserve the fail-closed rule for persisted receipts; make the default built-in execution path use the same live authenticated observation boundary as context supervise-task, or return the exact supervisor action before unsafe execution; update the integration contract so normal task run can complete verifiably while copied, stale, tampered, or standalone persisted receipts remain rejected; keep changes bounded to runner/context orchestration and focused security tests; close issue #4641 only after hosted merge evidence."
  Verify Steps: |-
    1. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts. Expected: default built-in execution reaches a live authenticated verification result, while standalone persisted and tampered receipts still fail closed.
    2. Run the focused context supervise-task, verify-task, execution-receipt, and task-run suites selected from touched modules. Expected: live observation is required and no path/hash/self-claim becomes trusted authentication.
    3. Run bun run guards:check and the trust-boundary ratchet. Expected: zero new reviewed trust-boundary violations.
    4. Run targeted ESLint, TypeScript checking, and git diff --check for touched files. Expected: all pass.
    5. Execute one isolated end-to-end built-in runner fixture. Expected: the CLI emits one deterministic next action and the completed run can be verified without manual receipt rewriting or hidden operator knowledge.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "a86f55dae7b4f2b9903dba4fe6bc4b5405731962"
    version: 1
id_source: "generated"
---
## Summary

Make built-in task run context-verifiable

Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.

## Scope

- In scope: Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.
- Out of scope: unrelated refactors not required for "Make built-in task run context-verifiable".

## Plan

Trace the built-in task run receipt and context verification paths; preserve the fail-closed rule for persisted receipts; make the default built-in execution path use the same live authenticated observation boundary as context supervise-task, or return the exact supervisor action before unsafe execution; update the integration contract so normal task run can complete verifiably while copied, stale, tampered, or standalone persisted receipts remain rejected; keep changes bounded to runner/context orchestration and focused security tests; close issue #4641 only after hosted merge evidence.

## Verify Steps

1. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts. Expected: default built-in execution reaches a live authenticated verification result, while standalone persisted and tampered receipts still fail closed.
2. Run the focused context supervise-task, verify-task, execution-receipt, and task-run suites selected from touched modules. Expected: live observation is required and no path/hash/self-claim becomes trusted authentication.
3. Run bun run guards:check and the trust-boundary ratchet. Expected: zero new reviewed trust-boundary violations.
4. Run targeted ESLint, TypeScript checking, and git diff --check for touched files. Expected: all pass.
5. Execute one isolated end-to-end built-in runner fixture. Expected: the CLI emits one deterministic next action and the completed run can be verified without manual receipt rewriting or hidden operator knowledge.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
