# PR Review

Created: 2026-05-13T08:23:55.197Z

## Task

- Task: `202605130823-5SM92P`
- Title: Improve Agentplane PR merge messages with structured human-readable summaries
- Status: DOING
- Branch: `task/202605130823-5SM92P/human-readable-merge-messages`
- Canonical task record: `.agentplane/tasks/202605130823-5SM92P/README.md`

## Verification

- State: ok
- Note: Post-CI fix verified: knip:check, format:check, typecheck, lint:core, and targeted merge-message/commit-policy tests passed after making MergeMessageInput internal.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T09:40:20.072Z
- Branch: task/202605130823-5SM92P/human-readable-merge-messages
- Head: b3f8a9ffba80

```text
 .../blueprint/resolved-snapshot.json               | 514 +++++++++++++++++++++
 ...run-cli.core.guard.commit-wrapper.close.test.ts |  14 +-
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts |   9 +-
 ...-cli.core.lifecycle.finish-close-commit.test.ts |   6 +-
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |   3 +-
 .../agentplane/src/commands/doctor/archive.test.ts |  63 +++
 packages/agentplane/src/commands/doctor/archive.ts |  47 +-
 .../src/commands/guard/impl/close-message.test.ts  | 212 ++++++++-
 .../src/commands/guard/impl/close-message.ts       | 396 +++++++++++++---
 .../agentplane/src/commands/guard/impl/commit.ts   |   8 +-
 packages/agentplane/src/commands/guard/impl/env.ts |   2 +
 .../agentplane/src/commands/guard/impl/policy.ts   |   3 +-
 .../src/commands/hooks/run.commit-msg.ts           |   6 +-
 .../agentplane/src/commands/hooks/task-context.ts  |   5 +-
 packages/agentplane/src/policy/model.ts            |   1 +
 .../agentplane/src/policy/rules/commit-subject.ts  |   1 +
 packages/core/src/commit/commit-policy.test.ts     |  41 ++
 packages/core/src/commit/commit-policy.ts          |  82 +++-
 18 files changed, 1287 insertions(+), 126 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
