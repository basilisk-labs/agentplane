## Summary

Add helper to open pending hosted-close PRs from task-close branches

Add a first-class command that opens the protected-main closure PR from an existing remote task-close branch when GitHub Actions can only leave a manual handoff comment.

## Scope

- In scope: Add a first-class command that opens the protected-main closure PR from an existing remote task-close branch when GitHub Actions can only leave a manual handoff comment.
- Out of scope: unrelated refactors not required for "Add helper to open pending hosted-close PRs from task-close branches".

## Verification

### Plan

1. Simulate a merged task PR with an existing remote task-close branch and no open closure PR. Expected: the new helper opens the correct protected-main closure PR.
2. Run focused command tests for title/body resolution and already-open/no-branch cases. Expected: the helper is deterministic and rejects inconsistent state clearly.
3. Run relevant lint/tests. Expected: command help and GitHub interaction paths remain valid.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --timeout 120000 && bun test packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 && bun x eslint packages/agentplane/src/commands/task/hosted-close-pr.command.ts packages/agentplane/src/commands/task/task.command.ts packages/agentplane/src/cli/run-cli/command-catalog/task.ts packages/agentplane/src/commands/task/index.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; Result: pass. Evidence: hosted-close helper tests passed, help snapshots remained valid, eslint clean. Scope: manual hosted-close PR helper command and task help surface.

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

- Updated: 2026-04-09T13:23:48.834Z
- Branch: task/202604091257-AD043V/hosted-close-open-pr
- Head: 6c22a97d72e9

```text
No changes detected.
```

</details>
