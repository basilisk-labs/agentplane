Task: `202611031011-SR3KTR`
Title: Preserve GitLab source branches and qualify legacy fast-forward merge guards
Canonical task record: `.agentplane/tasks/202611031011-SR3KTR/README.md`

## Summary

Preserve GitLab source branches and qualify legacy fast-forward merge guards

Implement only the four explicitly user-approved GitLab provider files to preserve source branches and qualify real GitLab16.11 plus documented modern automatic-rebase capability. Preserve strict server fast-forward/current-head/current-base/CI/authority guards. The user approved this exact extension in the reply to the 1590 question on 2026-11-03. No GitLab/GitHub project settings may be changed inside semantic episodes. Preserve all source evidence, credentials, branches, worktrees, immutable baselines and existing guards.

## Scope

- In scope: Implement only the four explicitly user-approved GitLab provider files to preserve source branches and qualify real GitLab16.11 plus documented modern automatic-rebase capability. Preserve strict server fast-forward/current-head/current-base/CI/authority guards. The user approved this exact extension in the reply to the 1590 question on 2026-11-03. No GitLab/GitHub project settings may be changed inside semantic episodes. Preserve all source evidence, credentials, branches, worktrees, immutable baselines and existing guards.
- Out of scope: unrelated refactors not required for "Preserve GitLab source branches and qualify legacy fast-forward merge guards".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-11-03T13:13:09.563Z
- Branch: task/202611031011-SR3KTR/preserve-gitlab-source-branches-and-qualify-lega
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../pr/integrate/internal/gitlab-mr-merge.test.ts  | 194 ++++++++++++++++++++-
 .../pr/integrate/internal/gitlab-mr-merge.ts       |  54 ++++--
 .../src/commands/pr/internal/sync-gitlab.test.ts   |  91 +++++-----
 .../src/commands/pr/internal/sync-gitlab.ts        |   6 +-
 4 files changed, 276 insertions(+), 69 deletions(-)
```

</details>
