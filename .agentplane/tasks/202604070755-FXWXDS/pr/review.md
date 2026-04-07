# PR Review

Created: 2026-04-07T16:47:58.726Z
Branch: task/202604070755-FXWXDS/stale-dist-policy

## Summary

Reduce stale-build false positives after protected-main sync

Stop repo-local stale-build guards from forcing repeated framework bootstrap after merge and pull paths when the effective source/runtime state is already current.

## Scope

- In scope: Stop repo-local stale-build guards from forcing repeated framework bootstrap after merge and pull paths when the effective source/runtime state is already current.
- Out of scope: unrelated refactors not required for "Reduce stale-build false positives after protected-main sync".

## Verification

### Plan

1. Simulate a stale repo-local build and run task-artifact lifecycle commands like `agentplane task plan set` and `agentplane verify`. Expected: they warn about stale build, then continue without forcing bootstrap.
2. Simulate a stale repo-local build and run a still-risky command like `agentplane finish` or another non-allowlisted mutator. Expected: the command remains blocked until `bun run framework:dev:bootstrap` is executed.
3. Run the targeted stale-dist policy and CLI guard tests. Expected: the updated allowlist behavior passes without widening the unsafe surface beyond the approved commands.

### Current Status

- State: ok
- Note: Targeted stale-dist tests passed; allowlisted task-artifact commands now warn-and-run while finish/work-start remain strict.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T16:47:58.726Z
- Branch: task/202604070755-FXWXDS/stale-dist-policy
- Head: 498565593001

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
