## Summary

Allow deterministic finish close commits under stale-dist task-artifact policy

When finish --close-commit is already allowed under stale-dist for task-artifact closeout, the internal deterministic git commit must not re-fail on the stale-dist hook for the same task-only payload.

## Scope

- In scope: When finish --close-commit is already allowed under stale-dist for task-artifact closeout, the internal deterministic git commit must not re-fail on the stale-dist hook for the same task-only payload.
- Out of scope: unrelated refactors not required for "Allow deterministic finish close commits under stale-dist task-artifact policy".

## Verification

### Plan

1. In a framework checkout with stale dist caused by watched runtime source edits, run finish --close-commit for a task-artifact-only base closeout. Expected: the deterministic close commit completes instead of failing inside the hook.
2. Run a normal code commit under the same stale checkout. Expected: strict stale-dist enforcement still blocks the unrelated code commit path.
3. Run the targeted automated regression tests. Expected: the closeout path stays green and the strict path still fails where required.

### Current Status

- State: ok
- Note: Verified: targeted guard unit tests and eslint passed for deterministic stale-dist close commit behavior.

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

- Updated: 2026-04-09T23:52:31.350Z
- Branch: task/202604092339-NFXA6G/stale-dist-close-commit
- Head: fa2e799ba028

```text
No changes detected.
```

</details>
