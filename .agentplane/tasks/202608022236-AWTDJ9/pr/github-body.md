Task: `202608022236-AWTDJ9`
Title: Preserve verification freshness after rebase merge
Canonical task record: `.agentplane/tasks/202608022236-AWTDJ9/README.md`

## Summary

Preserve verification freshness after rebase merge

Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.

## Scope

- In scope: Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.
- Out of scope: unrelated refactors not required for "Preserve verification freshness after rebase merge".

## Verification

- State: ok
- Note:

```text
Verified at bfb6abc89: hosted rebase-merge evidence remains current and active-branch freshness
remains fail-closed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T22:46:38.048Z
- Branch: task/202608022236-AWTDJ9/preserve-verification-freshness-after-rebase-mer
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../shared/route-decision-verification.test.ts     | 161 +++++++++++++++++++++
 .../commands/shared/route-decision-verification.ts |  51 +++++--
 2 files changed, 198 insertions(+), 14 deletions(-)
```

</details>
