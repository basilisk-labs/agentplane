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

```bash
bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts \
  packages/agentplane/src/backends/task-backend.cloud-regression.test.ts; Result: pass, 15 tests. \
  Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun \
  run format:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. \
  Command: ap doctor; Result: OK with info-only repo-local handoff findings. Hosted check follow-up: \
  CI verify-static initially failed on lint in this diff; local lint now passes after correction.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T19:32:19.856Z
- Branch: task/202605291931-PPJZ35/fix-fresh-feedback-issues-4312-4315
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend.cloud-regression.test.ts | 70 ++++++++++++++++++
 .../backends/task-backend/cloud-backend-sync.ts    | 16 +++++
 .../src/backends/task-backend/cloud-backend.ts     |  2 +-
 .../src/cli/run-cli.core.route-decision.test.ts    | 82 ++++++++++++++++++++++
 .../agentplane/src/commands/shared/task-handoff.ts | 14 ++++
 .../agentplane/src/commands/task/handoff.shared.ts |  5 ++
 6 files changed, 188 insertions(+), 1 deletion(-)
```

</details>
