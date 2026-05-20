# PR Review

Created: 2026-05-20T11:53:03.337Z

## Task

- Task: `202605201152-ATVFPQ`
- Title: Define context wiki contract surface
- Status: DOING
- Branch: `task/202605201152-ATVFPQ/context-wiki-contract`
- Canonical task record: `.agentplane/tasks/202605201152-ATVFPQ/README.md`

## Verification

- State: ok
- Note: Command: bunx prettier --check .agentplane/context/agentplane.context.yaml .agentplane/context/policies/wiki.rules.md context/wiki/AGENTS.md packages/agentplane/src/commands/context/init.ts -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: ap context wiki lint context/wiki/AGENTS.md -> pass. Command: ap context check -> pass. Command: bunx eslint packages/agentplane/src/commands/context/init.ts -> pass. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.context-init.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts -> pass, 33 tests. Command: ap doctor -> OK with pre-existing warning about DONE task archive README 202605200640-7AXZRX missing from git index. Skipped: ap context verify-task 202605201152-ATVFPQ, because this is a docs/policy task and the command rejected it as not a context task.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T12:28:22.962Z
- Branch: task/202605201152-ATVFPQ/context-wiki-contract
- Head: 0b158ea3a160

```text
 .agentplane/context/agentplane.context.yaml        |  23 ++
 .agentplane/context/policies/wiki.rules.md         |  47 ++-
 .../blueprint/resolved-snapshot.json               | 397 +++++++++++++++++++++
 context/wiki/AGENTS.md                             |   2 +
 .../src/commands/context/init-manifest.ts          |  97 +++++
 .../src/commands/context/init-wiki-policy.ts       |  49 +++
 packages/agentplane/src/commands/context/init.ts   |  88 +----
 7 files changed, 617 insertions(+), 86 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
