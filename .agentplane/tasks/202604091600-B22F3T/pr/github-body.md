## Summary

Expose explicit --base on finish for branch_pr closure

Add a real --base override to finish and honor it during branch_pr base validation so manual closure from isolated base checkouts does not depend on pinned git config alone.

## Scope

- In scope: Add a real --base override to finish and honor it during branch_pr base validation so manual closure from isolated base checkouts does not depend on pinned git config alone.
- Out of scope: unrelated refactors not required for "Expose explicit --base on finish for branch_pr closure".

## Verification

### Plan

1. Run targeted finish parsing and branch_pr lifecycle tests with an explicit --base override. Expected: finish accepts the flag and treats it as the validation target.
2. Reproduce branch_pr closeout on the base checkout without a pinned base branch. Expected: finish succeeds when current branch matches --base and still rejects non-base branches.
3. Run relevant lint/tests. Expected: existing finish flows remain unchanged when --base is omitted.

### Current Status

- State: ok
- Note: Verified: target vitest and eslint passed; finish --close-commit accepts explicit --base and rejects blank overrides.

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

- Updated: 2026-04-09T16:23:56.370Z
- Branch: task/202604091600-B22F3T/finish-base-override
- Head: f6f2660e13d4

```text
No changes detected.
```

</details>
