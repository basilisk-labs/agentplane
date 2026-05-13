Task: `202605132033-ZH7JEP`
Title: Make hosted-close idempotent for closed follow-up PRs
Canonical task record: `.agentplane/tasks/202605132033-ZH7JEP/README.md`

## Summary

Make hosted-close idempotent for closed follow-up PRs

Allow hosted-close to no-op when a follow-up PR uses an already DONE task id and the recorded DONE commit is an ancestor of the new merge commit.

## Scope

- In scope: Allow hosted-close to no-op when a follow-up PR uses an already DONE task id and the recorded DONE commit is an ancestor of the new merge commit.
- Out of scope: unrelated refactors not required for "Make hosted-close idempotent for closed follow-up PRs".

## Verification

- State: ok
- Note: Verified hosted-close follow-up idempotence and post-merge lint recovery.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T20:41:27.238Z
- Branch: task/202605132033-ZH7JEP/hosted-close-idempotent
- Head: ffd9c1fa6412

```text
 .../blueprint/resolved-snapshot.json               | 322 +++++++++++++++++++++
 .../src/cli/run-cli.core.task-hosted-close.test.ts |  64 ++++
 .../src/commands/blueprints/catalog-cache.ts       |   4 +-
 .../src/commands/guard/impl/close-dirt.ts          |  18 +-
 .../src/commands/task/hosted-close.command.ts      |  33 +++
 packages/agentplane/src/shared/env.ts              |   3 +-
 6 files changed, 437 insertions(+), 7 deletions(-)
```

</details>
