# PR Review

Created: 2026-05-13T14:50:25.406Z

## Task

- Task: `202605131449-GS3HB0`
- Title: Create agentic context extraction tasks
- Status: DOING
- Branch: `task/202605131449-GS3HB0/agentic-context-extraction`
- Canonical task record: `.agentplane/tasks/202605131449-GS3HB0/README.md`

## Verification

- State: ok
- Note: Verified agentic context extraction task generation: focused harvest/task-new tests pass; eslint, typecheck, docs CLI freshness, format, knip, hotspot, policy routing, docs IA, doctor, diff whitespace, and live dry-run smoke pass. Release-readiness was rerun with Vitest because Bun lacks node:sqlite in this environment.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T15:03:01.411Z
- Branch: task/202605131449-GS3HB0/agentic-context-extraction
- Head: e237c64f2d50

```text
 .../blueprint/resolved-snapshot.json               | 513 +++++++++++++++++++++
 docs/developer/local-context.mdx                   |  34 +-
 docs/user/cli-reference.generated.mdx              |  10 +-
 docs/user/commands.mdx                             |  14 +-
 docs/user/local-context.mdx                        |  13 +
 .../src/commands/context/context.spec.ts           |  24 +-
 .../commands/context/harvest-tasks-extraction.ts   |   1 +
 .../src/commands/context/harvest-tasks.test.ts     | 182 +++++++-
 .../src/commands/context/harvest-tasks.ts          | 110 ++++-
 packages/agentplane/src/commands/task/new.ts       |   3 +-
 .../src/context/harvest-tasks-artifacts.ts         |  18 +-
 .../src/context/harvest-tasks-extraction.ts        | 317 +++++++++++++
 12 files changed, 1217 insertions(+), 22 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
