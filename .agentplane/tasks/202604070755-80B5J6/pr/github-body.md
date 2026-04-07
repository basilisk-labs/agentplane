## Summary

Fix gh auth propagation in agentplane pr close

Ensure the CLI can invoke gh with the same working authentication and environment that succeeds in the user shell, so pr close works from inside agentplane.

## Scope

- In scope: Ensure the CLI can invoke gh with the same working authentication and environment that succeeds in the user shell, so pr close works from inside agentplane.
- Out of scope: unrelated refactors not required for "Fix gh auth propagation in agentplane pr close".

## Verification

### Plan

- Add or update focused tests around gh invocation/env propagation in pr close.
- Reproduce that agentplane pr close no longer drops working gh auth under the same shell session assumptions.
- Run the focused test and lint commands for the touched files and record the results.

### Current Status

- State: ok
- Note: Verified: pr close now invokes gh with auth-bearing parent env while stripping git worktree overrides, targeted runCli and input-validation tests pass, and eslint passes for the touched pr close files.

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

- Updated: 2026-04-07T08:17:55.869Z
- Branch: task/202604070755-80B5J6/pr-close-gh-auth
- Head: 56fbaeddfb48

```text
No changes detected.
```

</details>
