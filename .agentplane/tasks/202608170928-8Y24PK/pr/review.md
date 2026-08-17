# PR Review

Created: 2026-08-17T09:29:36.876Z

## Task

- Task: `202608170928-8Y24PK`
- Title: Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories
- Status: DOING
- Branch: `task/202608170928-8Y24PK/upgrade-the-hermes-agentplane-bridge-protocol-ac`
- Canonical task record: `.agentplane/tasks/202608170928-8Y24PK/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T09:29:36.876Z
- Branch: task/202608170928-8Y24PK/upgrade-the-hermes-agentplane-bridge-protocol-ac
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 |  18 +++-
 docs/workflow-guides/hermes-kanban.mdx             |  74 +++++++-------
 integrations/hermes-agentplane-plugin/README.md    |  77 ++++++++++-----
 .../lane-registry.example.json                     |  19 ++++
 .../protocol-v2.schema.json                        |  24 +++++
 .../src/commands/hermes/hermes-environment.ts      |  41 +++++++-
 .../src/commands/hermes/hermes-runtime.ts          |  35 ++++---
 .../src/commands/hermes/hermes.command.test.ts     | 108 ++++++++++++++++++++-
 .../src/commands/hermes/hermes.command.ts          |  48 ++++++++-
 9 files changed, 351 insertions(+), 93 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
