# PR Review

Created: 2026-05-13T20:59:57.460Z

## Task

- Task: `202605132058-36REEV`
- Title: Split PR metadata helpers
- Status: DOING
- Branch: `task/202605132058-36REEV/split-pr-meta`
- Canonical task record: `.agentplane/tasks/202605132058-36REEV/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T21:09:19.102Z
- Branch: task/202605132058-36REEV/split-pr-meta
- Head: ad50be06756b

```text
 .../blueprint/resolved-snapshot.json               | 528 ++++++++++++++++++
 packages/agentplane/src/commands/shared/pr-meta.ts | 614 +--------------------
 .../src/commands/shared/pr-meta/builders.ts        | 229 ++++++++
 .../src/commands/shared/pr-meta/helpers.ts         |  86 +++
 .../src/commands/shared/pr-meta/lifecycle.ts       |  60 ++
 .../src/commands/shared/pr-meta/parser.ts          | 132 +++++
 .../src/commands/shared/pr-meta/types.ts           |  34 ++
 .../src/commands/shared/pr-meta/verify-log.ts      |  71 +++
 8 files changed, 1169 insertions(+), 585 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
