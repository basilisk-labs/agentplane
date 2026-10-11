# PR Review

Created: 2026-10-11T00:14:44.042Z

## Task

- Task: `202610102335-4WQ91M`
- Title: Use the actual merged target for hosted task closure
- Status: DOING
- Branch: `task/202610102335-4WQ91M/hosted-close-target`
- Canonical task record: `.agentplane/tasks/202610102335-4WQ91M/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T00:14:44.042Z
- Branch: task/202610102335-4WQ91M/hosted-close-target
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/task-hosted-close.yml            |  35 ++++++-
 .../cli/prepare-hosted-task-closure-script.test.ts |  55 ++++++++++
 .../task/hosted-close-workflow-contract.test.ts    | 113 ++++++++++++++++++++-
 scripts/workflow/prepare-hosted-task-closure.mjs   |  19 +++-
 4 files changed, 217 insertions(+), 5 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
