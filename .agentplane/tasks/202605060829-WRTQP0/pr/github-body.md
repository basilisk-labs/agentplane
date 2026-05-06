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
- Note: Review follow-up checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/core/src/commit/commit-policy.test.ts passed with 5 files and 77 tests. bun run typecheck passed. Prettier check on touched hook files passed. ESLint on touched hook files passed. git diff --check passed. Review fixes cover detached HEAD with AGENTPLANE_TASK_ID and merge commits in pre-push mutation audits.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T08:52:47.960Z
- Branch: task/202605060829-WRTQP0/task-bound-hooks
- Head: f6c27040fc3a

```text
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    | 247 +++++++++++++++++++++
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  |  76 ++++++-
 .../src/commands/hooks/run.commit-msg.ts           |  37 ++-
 .../src/commands/hooks/run.pre-commit.ts           |  83 ++++++-
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 121 +++++++++-
 packages/agentplane/src/policy/evaluate.ts         |   9 +-
 .../src/policy/rules/task-bound-mutation.ts        |  96 ++++++++
 scripts/run-pre-push-hook.mjs                      | 124 +++++++++++
 8 files changed, 777 insertions(+), 16 deletions(-)
```

</details>
