Task: `202606022123-WDMMPJ`
Title: Tighten Hermes AgentPlane integration
Canonical task record: `.agentplane/tasks/202606022123-WDMMPJ/README.md`

## Summary

Tighten Hermes AgentPlane integration

Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.

## Scope

- In scope: Add native Hermes lifecycle/reconcile/runner integration and replace stale embedded Hermes plugin guidance with external plugin ownership.
- Out of scope: unrelated refactors not required for "Tighten Hermes AgentPlane integration".

## Verification

- State: ok
- Note: Full contract check passed after CI fix.
- Canonical workflow state lives in the task README.

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
 .../src/commands/hermes/hermes-runtime.ts          | 132 ++++++++++++
 .../src/commands/hermes/hermes.command.test.ts     |  59 ++++++
 .../src/commands/hermes/hermes.command.ts          |  46 ++++-
 .../agentplane/src/runner/adapters/custom.test.ts  |  15 ++
 packages/agentplane/src/runner/adapters/hermes.ts  |   9 +
 packages/agentplane/src/runner/adapters/index.ts   |   3 +-
 13 files changed, 298 insertions(+), 453 deletions(-)
```

</details>
