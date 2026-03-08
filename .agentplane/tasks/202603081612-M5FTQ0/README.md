---
id: "202603081612-M5FTQ0"
title: "Align task scaffold quiet contract with task-doc feedback"
result_summary: "Release-prepublish task scaffold quiet-contract blocker removed."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts"
  - "bun run lint:core -- packages/agentplane/src/commands/task/doc.ts packages/agentplane/src/commands/task/scaffold.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T16:17:43.802Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T16:18:48.184Z"
  updated_by: "CODER"
  note: "Focused regression checks: run-cli.core.tasks.test.ts passes with the quiet scaffold contract aligned to the current direct-write implementation, lint passes on the touched task/scaffold surfaces, and the runtime was rebuilt before lifecycle mutation."
commit:
  hash: "91fefe19eac7569e21594b1830be6484638e3ad0"
  message: "🧪 M5FTQ0 tests: align task scaffold quiet contract"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the scaffold quiet-contract regression, keep the implementation aligned with its current direct-write behavior, and update the focused task CLI contract so release-prepublish stops failing on stale expectations."
  -
    author: "CODER"
    body: "Verified: aligned the scaffold quiet-mode contract with the current direct-write implementation, reran the focused task CLI regression, and rebuilt the runtime before closing the task."
events:
  -
    type: "status"
    at: "2026-03-08T16:17:51.390Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the scaffold quiet-contract regression, keep the implementation aligned with its current direct-write behavior, and update the focused task CLI contract so release-prepublish stops failing on stale expectations."
  -
    type: "verify"
    at: "2026-03-08T16:18:48.184Z"
    author: "CODER"
    state: "ok"
    note: "Focused regression checks: run-cli.core.tasks.test.ts passes with the quiet scaffold contract aligned to the current direct-write implementation, lint passes on the touched task/scaffold surfaces, and the runtime was rebuilt before lifecycle mutation."
  -
    type: "status"
    at: "2026-03-08T16:19:08.802Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: aligned the scaffold quiet-mode contract with the current direct-write implementation, reran the focused task CLI regression, and rebuilt the runtime before closing the task."
doc_version: 3
doc_updated_at: "2026-03-08T16:19:08.802Z"
doc_updated_by: "CODER"
description: "Resolve the release-prepublish regression where task scaffold --quiet no longer matches the expected stderr contract in run-cli.core.tasks.test, either by restoring the intended quiet feedback or updating the contract and tests coherently."
id_source: "generated"
---
## Summary

Align task scaffold quiet contract with task-doc feedback

Resolve the release-prepublish regression where task scaffold --quiet no longer matches the expected stderr contract in run-cli.core.tasks.test, either by restoring the intended quiet feedback or updating the contract and tests coherently.

## Scope

- In scope: Resolve the release-prepublish regression where task scaffold --quiet no longer matches the expected stderr contract in run-cli.core.tasks.test, either by restoring the intended quiet feedback or updating the contract and tests coherently.
- Out of scope: unrelated refactors not required for "Align task scaffold quiet contract with task-doc feedback".

## Plan

1. Reproduce the task scaffold quiet-contract regression from the failing run-cli test. 2. Decide the intended quiet behavior at the scaffold boundary and make the implementation/tests consistent with it. 3. Re-run the focused task CLI regression and lint the touched task-doc/task-scaffold files. 4. Hand the clean result back to the blocked release task.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run lint:core -- packages/agentplane/src/commands/task/doc.ts packages/agentplane/src/commands/task/scaffold.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T16:18:48.184Z — VERIFY — ok

By: CODER

Note: Focused regression checks: run-cli.core.tasks.test.ts passes with the quiet scaffold contract aligned to the current direct-write implementation, lint passes on the touched task/scaffold surfaces, and the runtime was rebuilt before lifecycle mutation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T16:17:51.390Z, excerpt_hash=sha256:d1dfd794714ae9abfbde194c11dde6304670a736aaf53b22480ee7ec69fc62aa

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
