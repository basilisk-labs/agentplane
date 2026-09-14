Task: `202609140050-8QDRVN`
Title: Recover an external-agent result rejected during supervisor application
Canonical task record: `.agentplane/tasks/202609140050-8QDRVN/README.md`

## Summary

Recover an external-agent result rejected during supervisor application

When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.

## Scope

- In scope: When a durable result_received external-agent result is rejected by deterministic supervisor application validation, fail the owning semantic operation without applying the result, retire the exchange, and require the existing exact-key --replacement route. Preserve single-use result integrity and effect-in-doubt behavior. Add focused regression coverage for an implementation result that changes Git history outside the permitted workspace effect.
- Out of scope: unrelated refactors not required for "Recover an external-agent result rejected during supervisor application".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-14T01:11:18.204Z
- Branch: task/202609140050-8QDRVN/recover-an-external-agent-result-rejected-during
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 127 +++++++++++++++++++++
 .../external-agent-result-rejection-recovery.ts    |  88 ++++++++++++++
 .../task/external-agent-supervisor-recovery.ts     |  55 +++++++++
 .../src/commands/task/external-agent-supervisor.ts |  25 ++--
 4 files changed, 282 insertions(+), 13 deletions(-)
```

</details>
