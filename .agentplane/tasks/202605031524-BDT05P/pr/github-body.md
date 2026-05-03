Task: `202605031524-BDT05P`
Title: Validate branch_pr batch included tasks before PR publication

## Summary

Validate branch_pr batch included tasks before PR publication

Add validation for included batch tasks so pr open/update rejects missing, already done, unverified, duplicate, or conflicting included task ids before a primary PR can advertise a batch.

## Scope

- In scope: Add validation for included batch tasks so pr open/update rejects missing, already done, unverified, duplicate, or conflicting included task ids before a primary PR can advertise a batch.
- Out of scope: unrelated refactors not required for "Validate branch_pr batch included tasks before PR publication".

## Verification

- State: ok
- Note: branch_pr batch include-task validation implemented and focused checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T15:47:41.293Z
- Branch: task/202605031524-BDT05P/batch-pr-validation
- Head: fa58ade804ae

```text
No changes detected.
```

</details>
