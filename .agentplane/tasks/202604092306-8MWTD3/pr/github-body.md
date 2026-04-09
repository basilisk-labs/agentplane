## Summary

Print exact findings-add next step when incidents stay local

When verify or finish leaves incidents.md unchanged because the operator only passed plain note/body text, print an exact task findings add command template for the active task instead of generic prose.

## Scope

- In scope: When verify or finish leaves incidents.md unchanged because the operator only passed plain note/body text, print an exact task findings add command template for the active task instead of generic prose.
- Out of scope: unrelated refactors not required for "Print exact findings-add next step when incidents stay local".

## Verification

### Plan

1. Run verify with a plain --note and no structured finding flags. Expected: the no-op message names incidents.md and prints an exact task findings add command for the active task.
2. Run finish with plain body/result text and no structured finding flags. Expected: the no-op message prints the same exact next-step pattern for finish.
3. Run a structured finding path that already includes observation/impact/resolution. Expected: the success/no-op messaging stays correct and does not duplicate the plain-text guidance.

### Current Status

- State: ok
- Note: Verified: incident no-op guidance now prints exact task findings add next step; vitest and eslint passed in worktree.

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

- Updated: 2026-04-09T23:11:28.410Z
- Branch: task/202604092306-8MWTD3/incident-next-step
- Head: 9e0a2ff77553

```text
No changes detected.
```

</details>
