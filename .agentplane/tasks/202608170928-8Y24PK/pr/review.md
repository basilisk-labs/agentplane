# PR Review

Created: 2026-08-17T09:29:36.876Z

## Task

- Task: `202608170928-8Y24PK`
- Title: Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories
- Status: DOING
- Branch: `task/202608170928-8Y24PK/upgrade-the-hermes-agentplane-bridge-protocol-ac`
- Canonical task record: `.agentplane/tasks/202608170928-8Y24PK/README.md`

## Verification

- State: needs_rework
- Note: Rework required after AgentPlane autonomous-authority merge: update the Hermes bridge and plugin to consume signed approval receipts and execute policy-authorized post-plan side effects without user terminal commands; retain explicit primary-plan approval and operator-owned merge boundaries.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T10:38:22.317Z
- Branch: task/202608170928-8Y24PK/upgrade-the-hermes-agentplane-bridge-protocol-ac
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 |  34 +++++-
 docs/workflow-guides/hermes-kanban.mdx             |  88 ++++++++--------
 integrations/hermes-agentplane-plugin/README.md    | 102 +++++++++++++-----
 .../lane-registry.example.json                     |  19 ++++
 .../protocol-v2.schema.json                        |  39 +++++++
 .../src/commands/hermes/hermes-environment.ts      |  42 +++++++-
 .../src/commands/hermes/hermes-runtime.ts          |  35 ++++---
 .../src/commands/hermes/hermes.command.test.ts     | 115 ++++++++++++++++++++-
 .../src/commands/hermes/hermes.command.ts          |  49 ++++++++-
 9 files changed, 426 insertions(+), 97 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
