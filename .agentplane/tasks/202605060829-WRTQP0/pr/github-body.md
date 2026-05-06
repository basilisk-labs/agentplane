Task: `202605060829-WRTQP0`
Title: Enforce task-bound mutating commits

## Summary

Enforce task-bound mutating commits

Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.

## Scope

- In scope: Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.
- Out of scope: unrelated refactors not required for "Enforce task-bound mutating commits".

## Verification

- State: ok
- Note: Review follow-up final checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts passed with 3 files and 38 tests. bun run hotspots:check passed after moving new pre-push binding tests out of the oversized hook-run file. Prior focused 77-test hook/policy suite and typecheck passed before the split; behavior unchanged except test placement.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T08:56:48.010Z
- Branch: task/202605060829-WRTQP0/task-bound-hooks
- Head: a85f0f043964

```text
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    | 145 ++++++-------
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  |  76 ++++++-
 ...un-cli.core.hooks.pre-push-task-binding.test.ts | 229 +++++++++++++++++++++
 .../src/commands/hooks/run.commit-msg.ts           |  37 +++-
 .../src/commands/hooks/run.pre-commit.ts           |  83 +++++++-
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 121 ++++++++++-
 packages/agentplane/src/policy/evaluate.ts         |   9 +-
 .../src/policy/rules/task-bound-mutation.ts        |  96 +++++++++
 scripts/run-pre-push-hook.mjs                      | 124 +++++++++++
 9 files changed, 832 insertions(+), 88 deletions(-)
```

</details>
