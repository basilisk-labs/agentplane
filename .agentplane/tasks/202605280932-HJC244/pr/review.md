# PR Review

Created: 2026-05-28T10:01:37.913Z

## Task

- Task: `202605280932-HJC244`
- Title: Fix pre-push historical commit policy upgrade mismatch
- Status: DOING
- Branch: `task/202605280932-HJC244/fix-pre-push-historical-commit-policy-upgrade-mi`
- Canonical task record: `.agentplane/tasks/202605280932-HJC244/README.md`

## Verification

- State: ok
- Note: Verification passed after review fix for issue #4183. Commands: bun test packages/agentplane/src/cli/run-cli.core.hooks.pre-push-task-binding.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (24 pass); bun run format:check (pass); bun run lint:core (pass); node .agentplane/policy/check-routing.mjs (pass); AGENTPLANE_FAST_CHANGED_FILES=<touched paths> bun run ci:local:fast (pass, full-fast selector: format/schema/templates/routing/release parity/build/typecheck/bundles/docs freshness/hotspot/vitest projects/lint/unit/critical CLI).
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T10:01:37.913Z
- Branch: task/202605280932-HJC244/fix-pre-push-historical-commit-policy-upgrade-mi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...un-cli.core.hooks.pre-push-task-binding.test.ts | 100 ++++++++-
 .../src/cli/run-cli.core.insights-report.test.ts   |   6 +-
 .../src/commands/hooks/pre-push-task-binding.ts    | 244 +++++++++++++++++++++
 .../agentplane/src/commands/hooks/run.pre-push.ts  | 169 +-------------
 .../commands/insights/insights-issue-context.ts    |   9 +-
 scripts/checks/run-pre-push-hook.mjs               |  55 ++++-
 6 files changed, 406 insertions(+), 177 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
