Task: `202605130823-5SM92P`
Title: Improve Agentplane PR merge messages with structured human-readable summaries
Canonical task record: `.agentplane/tasks/202605130823-5SM92P/README.md`

## Summary

Improve Agentplane PR merge messages with structured human-readable summaries

Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.

## Scope

- In scope: Replace close/merge commit message rendering with deterministic human-readable summaries, structured verification/key-file sections, and metadata refs trailers.
- Out of scope: unrelated refactors not required for "Improve Agentplane PR merge messages with structured human-readable summaries".

## Verification

- State: ok
- Note: Post-CI fix verified: knip:check, format:check, typecheck, lint:core, and targeted merge-message/commit-policy tests passed after making MergeMessageInput internal.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T09:09:05.779Z
- Branch: task/202605130823-5SM92P/human-readable-merge-messages
- Head: f45a3bd1d6a5

```text
 .../blueprint/resolved-snapshot.json               | 514 +++++++++++++++++++++
 ...run-cli.core.guard.commit-wrapper.close.test.ts |  14 +-
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts |   9 +-
 ...-cli.core.lifecycle.finish-close-commit.test.ts |   6 +-
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |   3 +-
 .../src/commands/guard/impl/close-message.test.ts  | 212 ++++++++-
 .../src/commands/guard/impl/close-message.ts       | 396 +++++++++++++---
 .../agentplane/src/commands/guard/impl/commit.ts   |   8 +-
 packages/agentplane/src/commands/guard/impl/env.ts |   2 +
 .../agentplane/src/commands/guard/impl/policy.ts   |   3 +-
 .../src/commands/hooks/run.commit-msg.ts           |   6 +-
 packages/agentplane/src/policy/model.ts            |   1 +
 .../agentplane/src/policy/rules/commit-subject.ts  |   1 +
 packages/core/src/commit/commit-policy.test.ts     |  20 +
 packages/core/src/commit/commit-policy.ts          |  62 ++-
 15 files changed, 1145 insertions(+), 112 deletions(-)
```

</details>
