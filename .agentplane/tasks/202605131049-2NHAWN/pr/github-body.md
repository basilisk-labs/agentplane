Task: `202605131049-2NHAWN`
Title: Harvest completed tasks into context knowledge
Canonical task record: `.agentplane/tasks/202605131049-2NHAWN/README.md`

## Summary

Harvest completed tasks into context knowledge

Add a context pipeline operation that harvests completed tasks into source-backed wiki, fact, graph, and promotion-gate artifacts with provenance, conflict handling, and stale markers.

## Scope

- In scope: Add a context pipeline operation that harvests completed tasks into source-backed wiki, fact, graph, and promotion-gate artifacts with provenance, conflict handling, and stale markers.
- Out of scope: unrelated refactors not required for "Harvest completed tasks into context knowledge".

## Verification

- State: ok
- Note: Verified task-harvest pipeline after unused export correction: knip baseline, focused context tests, eslint, and full pre-push fast CI passed on 91ed87d0f.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T11:27:55.592Z
- Branch: task/202605131049-2NHAWN/context-task-harvest
- Head: 91ed87d0f8e3

```text
 .../blueprint/resolved-snapshot.json               | 520 +++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |  52 ++
 docs/user/commands.mdx                             |   9 +-
 docs/user/local-context.mdx                        |  23 +
 .../src/cli/run-cli/command-catalog/project.ts     |   4 +
 .../src/commands/context/context.command.ts        |  29 ++
 .../src/commands/context/context.spec.ts           | 125 +++++
 packages/agentplane/src/commands/context/doctor.ts |  32 +-
 .../commands/context/harvest-tasks-artifacts.ts    | 566 +++++++++++++++++++++
 .../src/commands/context/harvest-tasks.test.ts     | 219 ++++++++
 .../src/commands/context/harvest-tasks.ts          |  83 +++
 11 files changed, 1659 insertions(+), 3 deletions(-)
```

</details>
