Task: `202609122147-5F5WP0`
Title: Make AgentPlane-managed GitLab MRs remove source branches
Canonical task record: `.agentplane/tasks/202609122147-5F5WP0/README.md`

## Summary

Make AgentPlane-managed GitLab MRs remove source branches

Make AgentPlane-managed GitLab MRs remove source branches

## Scope

- In scope: Make AgentPlane-managed GitLab MRs remove source branches.
- Out of scope: unrelated refactors not required for "Make AgentPlane-managed GitLab MRs remove source branches".

## Verification

- State: ok
- Note:

```text
Focused tests, typecheck, full local CI, and hosted checks passed for PR #5940 at
c9897380582ddd645c3e8144151d88c910406036.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T21:57:43.531Z
- Branch: task/202609122147-5F5WP0/make-agentplane-managed-gitlab-mrs-remove-source
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/internal/sync-gitlab.test.ts   | 91 +++++++++++++++++++++-
 .../src/commands/pr/internal/sync-gitlab.ts        |  8 +-
 2 files changed, 96 insertions(+), 3 deletions(-)
```

</details>
