## Summary

Auto-publish unpublished task branches during pr open

Remove the redundant manual push plus second pr open pass in branch_pr mode by teaching pr open to publish the task branch to origin when remote PR creation is requested and the branch has no upstream yet.

## Scope

- In scope: Remove the redundant manual push plus second pr open pass in branch_pr mode by teaching pr open to publish the task branch to origin when remote PR creation is requested and the branch has no upstream yet.
- Out of scope: unrelated refactors not required for "Auto-publish unpublished task branches during pr open".

## Verification

- State: ok
- Note: pr open now auto-publishes unpublished task branches to origin before remote PR creation; PR-flow acceptance suite, typecheck, and lint passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T07:06:55.314Z
- Branch: task/202604180703-66ZTF1/pr-open-auto-publish
- Head: 6cfd5f685792

```text
No changes detected.
```

</details>
