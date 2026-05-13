# PR Review

Created: 2026-05-13T16:03:03.174Z

## Task

- Task: `202605131602-NEE2TR`
- Title: Split human context command surface
- Status: DOING
- Branch: `task/202605131602-NEE2TR/human-context-surface`
- Canonical task record: `.agentplane/tasks/202605131602-NEE2TR/README.md`

## Verification

- State: ok
- Note: Verified human/ap context surface split at 1589d71f8: focused context/help tests pass, typecheck passes, docs CLI reference is fresh, policy routing and doctor pass, and smoke commands confirm agentplane shows learn/check while ap shows advanced harvest/ingest/capability.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T16:13:58.773Z
- Branch: task/202605131602-NEE2TR/human-context-surface
- Head: 1589d71f8597

```text
 .../blueprint/resolved-snapshot.json               | 513 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              | 124 +++++
 docs/user/commands.mdx                             |   8 +
 docs/user/local-context.mdx                        |  71 +--
 .../src/cli/run-cli.core.agent-mode.test.ts        |  14 +
 packages/agentplane/src/cli/run-cli.ts             |   8 +-
 .../src/cli/run-cli/command-catalog.test.ts        |   6 +
 .../src/cli/run-cli/command-catalog/project.ts     |  62 ++-
 .../src/commands/context/context.command.ts        | 103 +++++
 .../src/commands/context/context.spec.ts           | 240 ++++++++++
 10 files changed, 1097 insertions(+), 52 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
