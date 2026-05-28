Task: `202605280932-HJC244`
Title: Fix pre-push historical commit policy upgrade mismatch
Canonical task record: `.agentplane/tasks/202605280932-HJC244/README.md`

## Summary

Fix pre-push historical commit policy upgrade mismatch

Address GitHub issue #4183: pre-push applies current mutating-commit task-id policy to historical commits introduced by an AgentPlane upgrade merge, blocking push from main after valid lifecycle completion. Scope: pre-push/commit-policy behavior, focused tests, and issue-linked evidence.

## Scope

- In scope: Address GitHub issue #4183: pre-push applies current mutating-commit task-id policy to historical commits introduced by an AgentPlane upgrade merge, blocking push from main after valid lifecycle completion. Scope: pre-push/commit-policy behavior, focused tests, and issue-linked evidence.
- Out of scope: unrelated refactors not required for "Fix pre-push historical commit policy upgrade mismatch".

## Verification

- State: ok
- Note:

```text
Verification passed for issue #4183 fix. Commands: bun test
packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts
packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (23 pass); bun run format:check
(pass); node .agentplane/policy/check-routing.mjs (pass); AGENTPLANE_FAST_CHANGED_FILES=<touched
paths> bun run ci:local:fast (pass, full-fast selector).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T10:01:37.913Z
- Branch: task/202605280932-HJC244/fix-pre-push-historical-commit-policy-upgrade-mi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...un-cli.core.hooks.pre-push-task-binding.test.ts |  62 +++++-
 .../src/cli/run-cli.core.insights-report.test.ts   |   6 +-
 .../src/commands/hooks/pre-push-task-binding.ts    | 219 +++++++++++++++++++++
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 169 +---------------
 .../commands/insights/insights-issue-context.ts    |   9 +-
 scripts/checks/run-pre-push-hook.mjs               |  36 +++-
 6 files changed, 324 insertions(+), 177 deletions(-)
```

</details>
