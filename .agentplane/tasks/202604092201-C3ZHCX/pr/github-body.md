## Summary

Allow cleanup merged to fetch origin before candidate resolution

Add an explicit fetch/prune option to cleanup merged so operators can refresh origin state before local and remote cleanup decisions.

## Scope

- In scope: Add an explicit fetch/prune option to cleanup merged so operators can refresh origin state before local and remote cleanup decisions.
- Out of scope: unrelated refactors not required for "Allow cleanup merged to fetch origin before candidate resolution".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

### Current Status

- State: ok
- Note: Refreshed CLI reference after adding cleanup merged fetch mode; targeted cleanup merged tests remain green.

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

- Updated: 2026-04-09T22:24:51.747Z
- Branch: task/202604092201-C3ZHCX/cleanup-fetch-origin
- Head: 684a2bdcec50

```text
No changes detected.
```

</details>
