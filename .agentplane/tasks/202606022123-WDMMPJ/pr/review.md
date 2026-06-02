# PR Review

Created: 2026-06-02T21:24:06.975Z

## Task

- Task: `202606022123-WDMMPJ`
- Title: Tighten Hermes AgentPlane integration
- Status: DOING
- Branch: `task/202606022123-WDMMPJ/hermes-agentplane-integration`
- Canonical task record: `.agentplane/tasks/202606022123-WDMMPJ/README.md`

## Verification

- State: ok
- Note: CI contract lint fix verified.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-02T21:24:06.975Z
- Branch: task/202606022123-WDMMPJ/hermes-agentplane-integration
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/workflow-guides/hermes-kanban.mdx             |  31 +--
 integrations/hermes-agentplane-plugin/README.md    | 116 +++--------
 integrations/hermes-agentplane-plugin/__init__.py  | 228 ---------------------
 .../bin/hermes-agentplane-spawn.mjs                |  46 -----
 integrations/hermes-agentplane-plugin/package.json |  13 --
 integrations/hermes-agentplane-plugin/plugin.yaml  |   6 -
 .../hermes-agentplane-plugin/src/index.mjs         |  47 -----
 .../src/commands/hermes/hermes-runtime.ts          | 135 ++++++++++++
 .../src/commands/hermes/hermes.command.test.ts     |  59 ++++++
 .../src/commands/hermes/hermes.command.ts          |  46 ++++-
 .../agentplane/src/runner/adapters/custom.test.ts  |  15 ++
 packages/agentplane/src/runner/adapters/hermes.ts  |   9 +
 packages/agentplane/src/runner/adapters/index.ts   |   3 +-
 13 files changed, 301 insertions(+), 453 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
