# PR Review

Created: 2026-05-17T08:26:36.463Z

## Task

- Task: `202605170811-8DPCYD`
- Title: Fix CodeQL hosted close checkout alert
- Status: DOING
- Branch: `task/202605170811-8DPCYD/codeql-security-fixes`
- Canonical task record: `.agentplane/tasks/202605170811-8DPCYD/README.md`

## Verification

- State: ok
- Note: Local verification passed for hosted-close workflow remediation: removed the pull_request_target PR-head fetch, updated the workflow contract test, ran targeted tests (93 pass), exact-file ESLint, core and agentplane typecheck, workflow lint, and policy routing. GitHub Code scanning alert #1 remains open until this branch is published and CodeQL reruns.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T08:51:27.708Z
- Branch: task/202605170811-8DPCYD/codeql-security-fixes
- Head: afede7721e4b

```text
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .agentplane/tasks/202605170812-9FFE6Y/README.md    | 150 ++++++
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .agentplane/tasks/202605170812-J4R55A/README.md    | 150 ++++++
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .agentplane/tasks/202605170812-Q06434/README.md    | 150 ++++++
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .agentplane/tasks/202605170812-X4C8DJ/README.md    | 150 ++++++
 .../blueprint/resolved-snapshot.json               | 392 +++++++++++++++
 .github/workflows/task-hosted-close.yml            |   9 -
 .../task/hosted-close-workflow-contract.test.ts    |   5 +-
 .../agentplane/src/commands/upgrade.unit.test.ts   |  13 +
 packages/agentplane/src/commands/upgrade/source.ts |   6 +-
 packages/core/src/commit/commit-policy.test.ts     |  11 +
 packages/core/src/commit/commit-policy.ts          |  72 +--
 packages/core/src/config/config.test.ts            |  10 +
 packages/core/src/config/defaults.ts               |   7 +
 packages/core/src/process/run-process.test.ts      |   9 +
 packages/core/src/process/run-process.ts           |  11 +-
 packages/core/src/tasks/task-doc.test.ts           |   5 +
 packages/core/src/tasks/task-doc.ts                |  16 +-
 packages/core/src/tasks/task-readme.test.ts        |  28 ++
 packages/core/src/tasks/task-readme.ts             |  12 +-
 23 files changed, 3265 insertions(+), 53 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
