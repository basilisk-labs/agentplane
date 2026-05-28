# PR Review

Created: 2026-05-28T07:44:38.631Z

## Task

- Task: `202605280743-P4J3DQ`
- Title: Gate context policy during upgrade
- Status: DOING
- Branch: `task/202605280743-P4J3DQ/gate-context-policy-upgrade`
- Canonical task record: `.agentplane/tasks/202605280743-P4J3DQ/README.md`

## Verification

- State: ok
- Note: Verified after replacing fallback Verify Steps with task-specific checks: context-policy upgrade regression passed 2/2; baseline upgrade suite passed 14/14; core run-process buffered execution passed 11/11; critical CLI suite passed all 5 chunks; agents/docs/typecheck/routing checks passed; framework bootstrap, ap config show, ap quickstart, task brief, next-action, and doctor passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T07:44:38.631Z
- Branch: task/202605280743-P4J3DQ/gate-context-policy-upgrade
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes-inventory.json                        |  63 +++++++++++++
 packages/agentplane/assets/AGENTS.md               |   4 +-
 .../agentplane/src/agents/agents-template.test.ts  |   6 +-
 .../run-cli.core.upgrade.context-policy.test.ts    | 105 +++++++++++++++++++++
 .../src/cli/run-cli.core.upgrade.test.ts           |  96 ++++++++++---------
 .../src/commands/context/init-policy-gateway.ts    |  38 ++++++++
 packages/agentplane/src/commands/context/init.ts   |  11 +++
 packages/agentplane/src/commands/upgrade/plan.ts   |  36 ++++++-
 .../src/runtime/prompt-modules/registry.test.ts    |  18 ++++
 .../src/runtime/prompt-modules/registry.ts         |   1 +
 .../src/shared/builtin-assets.generated.ts         |  24 ++---
 packages/agentplane/src/shared/policy-gateway.ts   |  24 +++++
 packages/core/src/process/run-process.ts           |  83 ++++++++++++----
 13 files changed, 426 insertions(+), 83 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
