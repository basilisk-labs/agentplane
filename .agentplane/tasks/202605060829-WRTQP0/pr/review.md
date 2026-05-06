# PR Review

Created: 2026-05-06T08:29:58.763Z
Branch: task/202605060829-WRTQP0/task-bound-hooks

## Summary

Enforce task-bound mutating commits

Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.

## Scope

- In scope: Harden commit hooks so mutating changes require an active task or valid task id, docs-only changes align with docs/content tasks, and emergency hotfixes require backfill evidence.
- Out of scope: unrelated refactors not required for "Enforce task-bound mutating commits".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Review follow-up checks: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/run-cli.core.hooks.runtime-shim.test.ts packages/agentplane/src/policy/evaluate.test.ts packages/core/src/commit/commit-policy.test.ts passed with 5 files and 77 tests. bun run typecheck passed. Prettier check on touched hook files passed. ESLint on touched hook files passed. git diff --check passed. Review fixes cover detached HEAD with AGENTPLANE_TASK_ID and merge commits in pre-push mutation audits.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
