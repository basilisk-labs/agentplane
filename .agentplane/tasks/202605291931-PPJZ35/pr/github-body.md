Task: `202605291931-PPJZ35`
Title: Fix fresh feedback issues 4312-4315
Canonical task record: `.agentplane/tasks/202605291931-PPJZ35/README.md`

## Summary

Fix fresh feedback issues 4312-4315

Fix recent feedback bugs from GitHub issues #4312, #4313, #4314, and #4315: stale dead runner blocking route, policy hook staging side effect, unexpected unrelated task creation during closeout, and task plan reject hang.

## Scope

- In scope: Fix recent feedback bugs from GitHub issues #4312, #4313, #4314, and #4315: stale dead runner blocking route, policy hook staging side effect, unexpected unrelated task creation during closeout, and task plan reject hang.
- Out of scope: unrelated refactors not required for "Fix fresh feedback issues 4312-4315".

## Verification

- State: ok
- Note:

```text
Hosted PR verification is green for PR #4316 head 73b4fd790c3cd88feb223f84a03b29467d368f2c; GitHub
checks pass: PR verification, verify-static, verify-unit, verify-cli-critical, verify-workflow,
verify-contract, verify-coverage, test-windows, docs, plan, CodeQL. Local checks passed: targeted
tests, typecheck, lint:core, format:check, policy routing, ap doctor.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T19:32:19.856Z
- Branch: task/202605291931-PPJZ35/fix-fresh-feedback-issues-4312-4315
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend.cloud-regression.test.ts |  70 +++++++++++++
 .../backends/task-backend/cloud-backend-sync.ts    |  16 +++
 .../src/backends/task-backend/cloud-backend.ts     |   2 +-
 .../src/cli/run-cli.core.route-decision.test.ts    |  82 +++++++++++++++
 .../src/cli/run-cli.core.task-handoff.test.ts      | 113 +++++++++++++++++++++
 .../agentplane/src/commands/shared/task-handoff.ts |  14 +++
 .../agentplane/src/commands/task/handoff.shared.ts |   5 +
 .../src/commands/task/reclaim.command.ts           |  35 +++++++
 .../src/runner/process-supervision/signals.ts      |   2 +
 9 files changed, 338 insertions(+), 1 deletion(-)
```

</details>
