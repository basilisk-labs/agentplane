Task: `202605200826-947S9Q`
Title: Unblock hosted close-tail PR verification
Canonical task record: `.agentplane/tasks/202605200826-947S9Q/README.md`

## Summary

Unblock hosted close-tail PR verification

Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.

## Scope

- In scope: Make hosted close-tail automation satisfy the required PR verification check for deterministic task-close PRs created by GitHub Actions, because those PRs do not trigger normal pull_request CI.
- Out of scope: unrelated refactors not required for "Unblock hosted close-tail PR verification".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T08:32:31.549Z
- Branch: task/202605200826-947S9Q/hosted-close-pr-verification
- Head: 7856f3e7aeae

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 .github/workflows/publish.yml                      |  46 +-
 .github/workflows/task-hosted-close.yml            |  33 ++
 .../release/publish-workflow-contract.test.ts      |   7 +-
 .../commands/release/release-ci-contract.test.ts   |   9 +
 .../task/hosted-close-workflow-contract.test.ts    |   5 +
 scripts/checks/run-local-ci.mjs                    |  15 +-
 7 files changed, 659 insertions(+), 28 deletions(-)
```

</details>
