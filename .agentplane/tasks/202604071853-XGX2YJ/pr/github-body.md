## Summary

Scope task normalize reconcile to selected task ids

Allow task normalize reconcile modes to target explicit task ids so operators can close known branch_pr drift without scanning unrelated historical PR artifacts or rewriting the whole task set.

## Scope

- In scope: Allow task normalize reconcile modes to target explicit task ids so operators can close known branch_pr drift without scanning unrelated historical PR artifacts or rewriting the whole task set.
- Out of scope: unrelated refactors not required for "Scope task normalize reconcile to selected task ids".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

### Current Status

- State: ok
- Note: Command: bun run workflow:wait-remote-checks -- 130 --repo basilisk-labs/agentplane; Result: pass; Evidence: PR #130 required checks all green on the published head.

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

- Updated: 2026-04-07T19:33:24.862Z
- Branch: task/202604071853-XGX2YJ/targeted-normalize-reconcile
- Head: 982fec5de303

```text
 .agentplane/policy/incidents.md                    |  24 +-
 .agentplane/tasks/202604071853-XGX2YJ/README.md    | 142 +++++++++++
 docs/user/cli-reference.generated.mdx              |   7 +
 packages/agentplane/assets/policy/incidents.md     |  24 +-
 .../run-cli.core.tasks.normalize-migrate.test.ts   | 259 +++++++++++++++++++++
 .../src/commands/task/normalize.command.ts         |  37 +++
 packages/agentplane/src/commands/task/normalize.ts |  58 ++++-
 7 files changed, 524 insertions(+), 27 deletions(-)
```

</details>
