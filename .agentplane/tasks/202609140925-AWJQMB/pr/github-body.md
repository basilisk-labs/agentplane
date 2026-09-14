Task: `202609140925-AWJQMB`
Title: Make supervisor-owned task branch base synchronization generate a commit subject accepted by AgentPlane commit-msg po...
Canonical task record: `.agentplane/tasks/202609140925-AWJQMB/README.md`

## Summary

Make supervisor-owned task branch base synchronization generate a commit subject accepted by AgentPlane commit-msg policy

The release task 202609121424-49XXT3 requested exact branch-base synchronization onto main 1a93a9a43da2b714854174491f9672c52bf33e9f. synchronizeTaskBranchBase generated subject 'Merge branch main into task/...' and git hook run commit-msg rejected it because the repository requires '<emoji> <task-suffix> <scope>: <summary>'. Update the supervisor-owned synchronization implementation to create a policy-compliant task-attributed merge subject without weakening or bypassing hooks. Preserve the exact two-parent no-ff merge and ancestry postconditions. Add focused regression coverage for the real hook-compatible subject. Do not touch release candidate content or agentplane-roadmap-r2.

## Scope

- In scope: The release task 202609121424-49XXT3 requested exact branch-base synchronization onto main 1a93a9a43da2b714854174491f9672c52bf33e9f. synchronizeTaskBranchBase generated subject 'Merge branch main into task/...' and git hook run commit-msg rejected it because the repository requires '<emoji> <task-suffix> <scope>: <summary>'. Update the supervisor-owned synchronization implementation to create a policy-compliant task-attributed merge subject without weakening or bypassing hooks. Preserve the exact two-parent no-ff merge and ancestry postconditions. Add focused regression coverage for the real hook-compatible subject. Do not touch release candidate content or agentplane-roadmap-r2.
- Out of scope: unrelated refactors not required for "Make supervisor-owned task branch base synchronization generate a commit subject accepted by AgentPlane commit-msg policy".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-14T10:14:14.692Z
- Branch: task/202609140925-AWJQMB/make-supervisor-owned-task-branch-base-synchroni
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/sync-task-base.test.ts     | 32 +++++++++++++++++++++-
 .../src/commands/branch/sync-task-base.ts          |  6 +++-
 2 files changed, 36 insertions(+), 2 deletions(-)
```

</details>
