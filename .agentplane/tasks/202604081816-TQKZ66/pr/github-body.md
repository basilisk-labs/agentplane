## Summary

Add repair command to close superseded task PRs after protected-main closure

Protected-main closure can leave the original task PR open even after the task is DONE and the code is already in main. Add a first-class repair path that closes the stale task PR (optionally deleting its remote branch) from task artifacts instead of relying on manual gh commands.

## Scope

- In scope: Protected-main closure can leave the original task PR open even after the task is DONE and the code is already in main. Add a first-class repair path that closes the stale task PR (optionally deleting its remote branch) from task artifacts instead of relying on manual gh commands.
- Out of scope: unrelated refactors not required for "Add repair command to close superseded task PRs after protected-main closure".

## Verification

### Plan

1. Run the focused PR repair/close test suite. Expected: a DONE task with open task PR artifacts can be reconciled and closed deterministically from task metadata. 2. Exercise the command against the live stale PR. Expected: PR #141 closes with a superseded note and task state remains DONE. 3. Confirm GitHub and local cleanup state. Expected: no stale open task PR remains for the repaired task, and any optional remote branch deletion is explicit.

### Current Status

- State: ok
- Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun x eslint packages/agentplane/src/commands/pr/close-superseded.ts packages/agentplane/src/commands/pr/pr.command.ts packages/agentplane/src/commands/pr/index.ts packages/agentplane/src/cli/run-cli/command-catalog/project.ts packages/agentplane/src/cli/run-cli.core.pr-close-superseded.test.ts; bun run framework:dev:bootstrap; agentplane pr close-superseded 202604072308-A1XE27 --delete-remote-branch; gh pr view 141 --json number,state,closed,headRefName. Result: pass. Evidence: focused tests are green, the new repair path closes stale task PR #141 and deletes its remote task branch, and GitHub now reports PR #141 CLOSED. Scope: pr close-superseded repair path.

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

- Updated: 2026-04-08T18:43:55.059Z
- Branch: task/202604081816-TQKZ66/close-superseded-task-pr
- Head: 3ad1b5bff095

```text
No changes detected.
```

</details>
