Task: `202605170813-46BSFQ`
Title: Add GitHub repository health workflows
Canonical task record: `.agentplane/tasks/202605170813-46BSFQ/README.md`

## Summary

Add GitHub repository health workflows

Add GitHub-native maintenance workflows for code scanning, dependency review, and dependency update tracking.

## Scope

- In scope: Add GitHub-native maintenance workflows for code scanning, dependency review, and dependency update tracking.
- Out of scope: unrelated refactors not required for "Add GitHub repository health workflows".

## Verification

- State: ok
- Note:

```text
Added GitHub-native repository health workflows and verified workflow lint, formatting, and doctor
in the task worktree.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T08:54:47.884Z
- Branch: task/202605170813-46BSFQ/github-health-workflows
- Head: ed7243f32bf7

```text
 .../blueprint/resolved-snapshot.json               | 324 +++++++++++++++++++++
 .github/dependabot.yml                             |  59 ++++
 .github/workflows/codeql.yml                       |  44 +++
 .github/workflows/dependency-review.yml            |  30 ++
 4 files changed, 457 insertions(+)
```

</details>
