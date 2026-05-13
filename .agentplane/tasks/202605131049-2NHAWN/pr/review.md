# PR Review

Created: 2026-05-13T10:49:55.784Z

## Task

- Task: `202605131049-2NHAWN`
- Title: Harvest completed tasks into context knowledge
- Status: DOING
- Branch: `task/202605131049-2NHAWN/context-task-harvest`
- Canonical task record: `.agentplane/tasks/202605131049-2NHAWN/README.md`

## Verification

- State: ok
- Note: Implemented context harvest tasks with provenance-backed raw evidence, fact/graph proposal rows, wiki synthesis, promotion gate, context-init write gate, docs, and focused tests.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T11:05:59.681Z
- Branch: task/202605131049-2NHAWN/context-task-harvest
- Head: b1acddb07b2b

```text
 .../blueprint/resolved-snapshot.json               | 520 ++++++++++++++++
 docs/user/cli-reference.generated.mdx              |  52 ++
 docs/user/commands.mdx                             |   9 +-
 docs/user/local-context.mdx                        |  23 +
 .../src/cli/run-cli/command-catalog/project.ts     |   4 +
 .../src/commands/context/context.command.ts        |  29 +
 .../src/commands/context/context.spec.ts           | 125 ++++
 packages/agentplane/src/commands/context/doctor.ts |  32 +-
 .../src/commands/context/harvest-tasks.test.ts     | 219 +++++++
 .../src/commands/context/harvest-tasks.ts          | 677 +++++++++++++++++++++
 10 files changed, 1687 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
