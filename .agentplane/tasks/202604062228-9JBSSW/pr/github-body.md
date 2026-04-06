## Summary

Fix hosted-close when merge commit object is absent in checkout

Make task hosted-close close merged branch_pr tasks even when the GitHub Actions checkout does not contain the squash merge commit object yet, instead of failing with git bad object on the merge SHA.

## Scope

- In scope: Make task hosted-close close merged branch_pr tasks even when the GitHub Actions checkout does not contain the squash merge commit object yet, instead of failing with git bad object on the merge SHA.
- Out of scope: unrelated refactors not required for "Fix hosted-close when merge commit object is absent in checkout".

## Verification

### Plan

- Reproduce the hosted-close path where merge_commit_sha is missing from the local git object graph.
- Run focused vitest coverage for task hosted-close and any helper touched by the fallback.
- Run eslint on the touched hosted-close source/tests.

### Current Status

- State: ok
- Note: Rebased the published 9JBSSW branch onto current main, bootstrapped the fresh worktree, reran focused hosted-close vitest, reran hosted-close eslint, and confirmed the previously blocking git-edge critical case passes in the clean worktree.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-06T23:13:33.702Z
- Branch: task/202604062228-9JBSSW/hosted-close-missing-merge-object
- Head: 16d77e298b08

```text
No changes detected.
```

</details>
