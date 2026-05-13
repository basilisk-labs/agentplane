# PR Review

Created: 2026-05-13T16:03:49.901Z

## Task

- Task: `202605131603-PFXN5E`
- Title: Automate branch_pr merge queue finalization
- Status: DOING
- Branch: `task/202605131603-PFXN5E/automate-merge-queue`
- Canonical task record: `.agentplane/tasks/202605131603-PFXN5E/README.md`

## Verification

- State: ok
- Note: Updated verification after diagnostic refinement: eslint on changed TS passed; focused Vitest for hosted-close workflow and integrate command passed (2 files, 9 tests); bun run typecheck passed; git diff --check passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T16:13:38.174Z
- Branch: task/202605131603-PFXN5E/automate-merge-queue
- Head: 07e9c09bfab0

```text
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   4 +-
 .../src/commands/pr/integrate/cmd.test.ts          |  85 ++++++++++++++---
 .../agentplane/src/commands/pr/integrate/cmd.ts    | 102 +++++++++++++++++++++
 .../task/hosted-close-workflow-contract.test.ts    |   5 +-
 5 files changed, 183 insertions(+), 17 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
