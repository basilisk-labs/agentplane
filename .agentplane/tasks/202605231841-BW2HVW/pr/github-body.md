Task: `202605231841-BW2HVW`
Title: Fix homepage review flow class
Canonical task record: `.agentplane/tasks/202605231841-BW2HVW/README.md`

## Summary

Fix homepage review flow class

Remove the undefined CSS module class from the homepage review-flow section introduced by the launch messaging update.

## Scope

- In scope: Remove the undefined CSS module class from the homepage review-flow section introduced by the launch messaging update.
- Out of scope: unrelated refactors not required for "Fix homepage review flow class".

## Verification

- State: ok
- Note:

```text
Evaluation passed: diff is limited to replacing the undefined CSS module reference with the existing
section class; build output no longer contains class=undefined for the homepage.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T18:44:25.252Z
- Branch: task/202605231841-BW2HVW/homepage-review-flow-class
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 website/src/pages/index.tsx | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

</details>
