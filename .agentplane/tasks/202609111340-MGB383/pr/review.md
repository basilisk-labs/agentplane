# PR Review

Created: 2026-09-11T18:45:55.843Z

## Task

- Task: `202609111340-MGB383`
- Title: Harden the post-release evidence close-tail under branch protection for GitHub issue #4848
- Status: DOING
- Branch: `task/202609111340-MGB383/harden-the-post-release-evidence-close-tail-unde`
- Canonical task record: `.agentplane/tasks/202609111340-MGB383/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-11T18:45:55.843Z
- Branch: task/202609111340-MGB383/harden-the-post-release-evidence-close-tail-unde
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish.yml                      |  15 ++-
 .../open-next-development-version-script.test.ts   |  22 +++-
 .../release/publish-workflow-contract.test.ts      |  17 +++-
 .../verify-release-evidence-pr-script.test.ts      |  68 +++++++------
 scripts/lib/next-development-version.mjs           |  31 +++++-
 scripts/workflow/verify-release-evidence-pr.mjs    | 111 +++++++++++----------
 6 files changed, 180 insertions(+), 84 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
