# PR Review

Created: 2026-05-08T16:49:04.361Z

## Task

- Task: `202605081639-QC8PWY`
- Title: Add specialized built-in blueprint definitions
- Status: DOING
- Branch: `task/202605081639-QC8PWY/specialized-blueprints`
- Canonical task record: `.agentplane/tasks/202605081639-QC8PWY/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T16:54:31.098Z
- Branch: task/202605081639-QC8PWY/specialized-blueprints
- Head: 77782aef768c

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |  46 ++
 packages/agentplane/src/blueprints/builtins.ts     | 269 +++++++++++
 packages/agentplane/src/blueprints/model.ts        |   3 +
 packages/agentplane/src/blueprints/resolve.test.ts |  71 +++
 packages/agentplane/src/blueprints/resolve.ts      |  73 ++-
 .../agentplane/src/blueprints/validate.test.ts     |   5 +-
 .../src/commands/blueprint/task-input.test.ts      |  45 ++
 .../src/commands/blueprint/task-input.ts           |   3 +
 packages/agentplane/src/commands/task/new.ts       |   3 +
 10 files changed, 1021 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
