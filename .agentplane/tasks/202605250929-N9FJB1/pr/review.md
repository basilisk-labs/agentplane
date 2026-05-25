# PR Review

Created: 2026-05-25T09:30:16.719Z

## Task

- Task: `202605250929-N9FJB1`
- Title: Fix upgrade markdown fragment leak
- Status: DOING
- Branch: `task/202605250929-N9FJB1/upgrade-fragment-render`
- Canonical task record: `.agentplane/tasks/202605250929-N9FJB1/README.md`

## Verification

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts -t 'upgrade renders managed markdown assets before writing installed policy files'. Result: pass. Evidence: 1 pass, 0 fail; regression confirms installed dod.code.md has no ap:fragment markers. Scope: targeted upgrade markdown rendering regression. Command: bun test packages/agentplane/src/cli/run-cli.core.upgrade.test.ts. Result: pass. Evidence: 14 pass, 0 fail, 113 expect calls. Scope: existing upgrade CLI behavior. Command: bun test packages/agentplane/src/commands/upgrade.merge.test.ts. Result: pass. Evidence: 9 pass, 0 fail, 42 expect calls. Scope: upgrade planner merge semantics. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Scope: policy routing constraints. Command: ap agents. Result: pass after framework bootstrap. Evidence: listed installed agent profiles. Scope: upgrade policy minimum verification.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T09:30:16.719Z
- Branch: task/202605250929-N9FJB1/upgrade-fragment-render
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.upgrade.test.ts           | 42 ++++++++++++++++++++++
 packages/agentplane/src/commands/upgrade/plan.ts   | 24 +++++++++++++
 2 files changed, 66 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
