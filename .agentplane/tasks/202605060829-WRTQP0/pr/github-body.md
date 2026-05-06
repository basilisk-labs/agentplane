Task: `202605060829-WRTQP0`
Title: Enforce task-bound mutating commits

## Summary

Enforce task-bound mutating commits

Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.

## Scope

- In scope: Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.
- Out of scope: unrelated refactors not required for "Enforce task-bound mutating commits".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T08:38:02.531Z
- Branch: task/202605060829-WRTQP0/task-bound-hooks
- Head: 8ac27c7315c9

```text
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    | 183 +++++++++++++++++++++
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  |  47 ++++++
 .../src/commands/hooks/run.commit-msg.ts           |  37 ++++-
 .../src/commands/hooks/run.pre-commit.ts           |  75 ++++++++-
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 121 +++++++++++++-
 packages/agentplane/src/policy/evaluate.ts         |   9 +-
 .../src/policy/rules/task-bound-mutation.ts        |  96 +++++++++++
 scripts/run-pre-push-hook.mjs                      | 124 ++++++++++++++
 8 files changed, 677 insertions(+), 15 deletions(-)
```

</details>
