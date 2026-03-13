---
id: "202603131032-299AMX"
title: "Fix Verify Steps plan-approve race"
result_summary: "Local plan approval now validates against the current README state instead of a stale pre-patch snapshot; Verify Steps doc writes are covered by CLI regression and live sequential check."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "task-doc"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T10:33:00.341Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T10:41:36.978Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 37/37 tests passed. Scope: TaskStore retry, plan approve stale-read path, Verify Steps doc write CLI contract. Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/shared/task-store.ts packages/agentplane/src/commands/task/plan.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts; Result: pass; Evidence: no lint errors. Scope: touched runtime and test files. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both builds exited 0. Scope: repo-local CLI runtime build surfaces."
commit:
  hash: "1d739aa178415fa11c6fb175db5acc144130c2b2"
  message: "🩹 299AMX task: fix Verify Steps approval race"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the Verify Steps approval race, add regression coverage, and fix the minimal stale-read path if it is real."
  -
    author: "CODER"
    body: "Verified: fixed stale Verify Steps approval gate, added TaskStore retry coverage, and confirmed Verify Steps doc writes sequentially."
events:
  -
    type: "status"
    at: "2026-03-13T10:33:14.277Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the Verify Steps approval race, add regression coverage, and fix the minimal stale-read path if it is real."
  -
    type: "verify"
    at: "2026-03-13T10:41:36.978Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 37/37 tests passed. Scope: TaskStore retry, plan approve stale-read path, Verify Steps doc write CLI contract. Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/shared/task-store.ts packages/agentplane/src/commands/task/plan.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts; Result: pass; Evidence: no lint errors. Scope: touched runtime and test files. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both builds exited 0. Scope: repo-local CLI runtime build surfaces."
  -
    type: "status"
    at: "2026-03-13T10:42:43.334Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: fixed stale Verify Steps approval gate, added TaskStore retry coverage, and confirmed Verify Steps doc writes sequentially."
doc_version: 3
doc_updated_at: "2026-03-13T10:42:43.336Z"
doc_updated_by: "CODER"
description: "Find and fix intermittent false failure where task plan approve reports missing Verify Steps after task doc set, and verify task doc set behavior for Verify Steps."
id_source: "generated"
---
## Summary

Fix Verify Steps plan-approve race

Find and fix intermittent false failure where task plan approve reports missing Verify Steps after task doc set, and verify task doc set behavior for Verify Steps.

## Scope

- In scope: Find and fix intermittent false failure where task plan approve reports missing Verify Steps after task doc set, and verify task doc set behavior for Verify Steps.
- Out of scope: unrelated refactors not required for "Fix Verify Steps plan-approve race".

## Plan

1. Reproduce intermittent false failure around Verify Steps and plan approval.
2. Add regression tests for task doc set on Verify Steps and approval flow.
3. Fix the minimal race/stale-read path in task approval or doc update logic.
4. Verify with targeted unit and CLI tests plus a live task lifecycle check.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000` and expect all tests to pass.
2. Run `./node_modules/.bin/eslint packages/agentplane/src/commands/shared/task-store.ts packages/agentplane/src/commands/task/plan.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts` and expect no lint errors.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build` and expect both builds to exit 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T10:41:36.978Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 37/37 tests passed. Scope: TaskStore retry, plan approve stale-read path, Verify Steps doc write CLI contract. Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/shared/task-store.ts packages/agentplane/src/commands/task/plan.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts; Result: pass; Evidence: no lint errors. Scope: touched runtime and test files. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both builds exited 0. Scope: repo-local CLI runtime build surfaces.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T10:41:19.010Z, excerpt_hash=sha256:821d9f4bb037c69d9e93a7ba7097f63a8525056e98711419773d52fa9be9e15b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Source: `cmdTaskPlanApprove` validated `Verify Steps` against the first local README snapshot before entering `TaskStore.patch`, so a concurrent `task doc set` could make the live README valid while approval still failed on stale data.
- Fix: local approve/reject now validate only inside the store-backed mutation path, and `TaskStore` retries once when a validation error coincides with an on-disk README mtime change after the cached read.
- Check on `task doc set`: sequential `task doc set --section "Verify Steps"` followed by `task doc show --section "Verify Steps"` works correctly; the earlier mismatch came from launching `set` and `show` in parallel.
