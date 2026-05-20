# PR Review

Created: 2026-05-20T06:27:11.740Z

## Task

- Task: `202605200626-Q0VM6Y`
- Title: Add source-shaped topology gate
- Status: DOING
- Branch: `task/202605200626-Q0VM6Y/source-shaped-topology-gate`
- Canonical task record: `.agentplane/tasks/202605200626-Q0VM6Y/README.md`

## Verification

- State: ok
- Note: Quality gate remains passed after hotspot factoring.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T06:36:23.424Z
- Branch: task/202605200626-Q0VM6Y/source-shaped-topology-gate
- Head: bb068857a6c4

```text
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 docs/user/local-context.mdx                        |   8 +
 packages/agentplane/src/blueprints/builtins.ts     | 107 +---
 .../src/blueprints/context-maximum-assimilation.ts | 118 +++++
 .../agentplane/src/blueprints/validate.test.ts     |   3 +
 packages/agentplane/src/commands/context/init.ts   |   1 +
 .../src/commands/context/release-readiness.test.ts |   2 +
 packages/agentplane/src/context/ingest-task.ts     |   4 +
 8 files changed, 713 insertions(+), 101 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
