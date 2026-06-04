Task: `202606041738-A531FX`
Title: Address feedback issues for route and diagnostic clarity
Canonical task record: `.agentplane/tasks/202606041738-A531FX/README.md`

## Summary

Address feedback issues for route and diagnostic clarity

Fix GitHub issues #4404, #4405, #4406, and #4415 by improving route diagnostics, backend fallback guidance, worktree dependency context, and blocked runner manifest handling.

## Scope

- In scope: Fix GitHub issues #4404, #4405, #4406, and #4415 by improving route diagnostics, backend fallback guidance, worktree dependency context, and blocked runner manifest handling.
- Out of scope: unrelated refactors not required for "Address feedback issues for route and diagnostic clarity".

## Verification

- State: ok
- Note:

```text
Verified issue fixes locally: focused runner/cloud/quickstart/insights tests passed (70 tests);
typecheck, knip, policy routing, routing script, and changed-file format checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-04T17:39:25.455Z
- Branch: task/202606041738-A531FX/address-feedback-issues-for-route-and-diagnostic
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.cloud.test.ts         | 21 +++++++++++++++++++++
 .../backends/task-backend/cloud-backend-utils.ts    | 14 +++++++++++++-
 .../src/cli/run-cli.core.insights-report.test.ts    |  8 ++++----
 .../src/cli/run-cli/commands/core.unit.test.ts      |  6 +++---
 .../cli/run-cli/commands/core/preflight-report.ts   | 16 +++++++++-------
 .../src/commands/insights/insights-triage.ts        |  9 +++++++--
 .../src/runner/adapters/execute-supervised.ts       |  1 +
 packages/agentplane/src/runner/task-state-render.ts | 18 +++++++++---------
 .../src/runner/usecases/task-run-lifecycle.test.ts  |  2 +-
 9 files changed, 68 insertions(+), 27 deletions(-)
```

</details>
