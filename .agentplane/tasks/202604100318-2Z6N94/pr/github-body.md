## Summary

Harden task lifecycle status handoff and reduce PR artifact duplication

Audit branch_pr task lifecycle, fix status handoff failures in remote-check wait and hosted-close-pr recovery, and reduce avoidable PR artifact duplication/churn so task development has fewer manual recovery paths.

## Scope

- In scope: Audit branch_pr task lifecycle, fix status handoff failures in remote-check wait and hosted-close-pr recovery, and reduce avoidable PR artifact duplication/churn so task development has fewer manual recovery paths.
- Out of scope: unrelated refactors not required for "Harden task lifecycle status handoff and reduce PR artifact duplication".

## Verification

- State: ok
- Note: Verified branch_pr lifecycle handoff, auto-seeded Verify Steps generation, and PR artifact regressions against the updated contract.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-10T03:29:50.795Z
- Branch: task/202604100318-2Z6N94/harden-task-lifecycle-status
- Head: 3fe2b1a83753

```text
No changes detected.
```

</details>
