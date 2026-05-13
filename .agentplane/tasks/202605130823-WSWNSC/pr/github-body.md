Task: `202605130823-WSWNSC`
Title: Persist GitHub PR identity for open branch_pr artifacts
Canonical task record: `.agentplane/tasks/202605130823-WSWNSC/README.md`

## Summary

Persist GitHub PR identity for open branch_pr artifacts

Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.

## Scope

- In scope: Fix branch_pr PR sync so observed OPEN and CLOSED GitHub pull request identity is persisted in task PR metadata, while merged lifecycle state remains limited to MERGED pull requests.
- Out of scope: unrelated refactors not required for "Persist GitHub PR identity for open branch_pr artifacts".

## Verification

- State: ok
- Note: Verified: GitHub PR identity persistence now records OPEN pull request metadata in branch_pr PR artifacts, while focused tests confirm pr open creation and pr update hydration behavior.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T08:32:19.011Z
- Branch: task/202605130823-WSWNSC/persist-pr-identity
- Head: 376d16b79af1

```text
 .../blueprint/resolved-snapshot.json               | 514 +++++++++++++++++++++
 .../run-cli.core.pr-flow.pr-open.network.test.ts   |  16 +-
 ...n-cli.core.pr-flow.pr-validation.update.test.ts |  91 ++++
 .../src/commands/pr/internal/sync-github.ts        |   5 +-
 .../src/commands/pr/internal/sync-open-step.ts     |   6 +-
 .../src/commands/pr/internal/sync-update-step.ts   |   4 +-
 6 files changed, 620 insertions(+), 16 deletions(-)
```

</details>
