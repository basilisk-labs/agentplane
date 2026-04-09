## Summary

Add near-duplicate guardrails to task new

Warn or block task new when an open task with a highly similar title already exists so branch_pr work does not fork into duplicate task shells and root-checkout drift.

## Scope

- In scope: Warn or block task new when an open task with a highly similar title already exists so branch_pr work does not fork into duplicate task shells and root-checkout drift.
- Out of scope: unrelated refactors not required for "Add near-duplicate guardrails to task new".

## Verification

### Plan

1. Reproduce task new with an existing open task whose title is highly similar. Expected: the command warns or blocks deterministically instead of silently creating another task shell.
2. Run targeted task-new tests. Expected: non-duplicate task creation still works unchanged while similar-title duplicates trigger the new guardrail.
3. Verify operators can intentionally bypass the guard when necessary. Expected: the override path remains explicit and traceable.

### Current Status

- State: ok
- Note: Verified: target vitest and eslint passed; task new now blocks near-duplicate open titles unless --allow-duplicate is explicit.

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

- Updated: 2026-04-09T16:23:56.389Z
- Branch: task/202604091600-T2HX0E/task-new-duplicate-guard
- Head: f6f2660e13d4

```text
No changes detected.
```

</details>
