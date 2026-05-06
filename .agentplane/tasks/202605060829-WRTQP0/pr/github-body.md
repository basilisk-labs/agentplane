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
- Note: Implemented task-bound mutation gates for pre-commit, commit-msg, and pre-push. Verification passed: focused vitest suite (release-smoke, pre-push task binding, pre-commit, runtime shim, policy evaluate, commit-policy), bun run typecheck, targeted eslint, bun run format:check, bun run hotspots:check, git diff --check, node .agentplane/policy/check-routing.mjs, and bun run framework:dev:bootstrap. Release-smoke failure was stale runtime before bootstrap; it passed after rebuilding.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T09:09:43.291Z
- Branch: task/202605060829-WRTQP0/task-bound-hooks
- Head: b7983010c454

```text
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    | 145 ++++++-------
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  |  76 ++++++-
 ...un-cli.core.hooks.pre-push-task-binding.test.ts | 229 +++++++++++++++++++++
 .../src/commands/hooks/run.commit-msg.ts           |  42 +++-
 .../src/commands/hooks/run.pre-commit.ts           |  84 +++++++-
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 131 +++++++++++-
 packages/agentplane/src/commands/upgrade/apply.ts  |   1 +
 packages/agentplane/src/policy/evaluate.ts         |   9 +-
 packages/agentplane/src/policy/model.ts            |   1 +
 .../src/policy/rules/task-bound-mutation.ts        |  97 +++++++++
 scripts/run-pre-push-hook.mjs                      | 134 ++++++++++++
 11 files changed, 861 insertions(+), 88 deletions(-)
```

</details>
