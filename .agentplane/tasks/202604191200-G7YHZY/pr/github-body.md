## Summary

Avoid redundant manual close tails after hosted closure

Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.

## Scope

- In scope: Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.
- Out of scope: unrelated refactors not required for "Avoid redundant manual close tails after hosted closure".

## Verification

- State: ok
- Note: Validated redundant close-tail suppression on base-side canonical closures: finish no longer materializes a task-close branch when the base already has canonical close artifacts, and hosted-close-pr now short-circuits before any GitHub recovery lookup once the task is already closed for that merge.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-19T12:24:30.431Z
- Branch: task/202604191200-G7YHZY/avoid-redundant-close-tail
- Head: 206794d6e94f

```text
No changes detected.
```

</details>
