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
- Note: Implemented task-bound mutation gates for pre-commit, commit-msg, and pre-push. Verification passed: focused vitest suite (release-smoke, pre-push task binding, pre-commit, runtime shim, policy evaluate, commit-policy), bun run typecheck, targeted eslint, bun run format:check, bun run hotspots:check, git diff --check, node .agentplane/policy/check-routing.mjs, and bun run framework:dev:bootstrap. Release-smoke failure was stale runtime before bootstrap; it passed after rebuilding.

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
<!-- END AUTO SUMMARY -->
