Task: `202610052152-HA1XW3`
Title: Repair native execution of approved read-only CLI and bounded Node heap checks
Canonical task record: `.agentplane/tasks/202610052152-HA1XW3/README.md`

## Summary

Repair native execution of approved read-only CLI and bounded Node heap checks

Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.

## Scope

- In scope: Release recovery is blocked because native verification rejects ap config show although the executor passes it, and rejects an approved NODE_OPTIONS=--max-old-space-size=4096 bunx --no-install eslint command. Plan obligations correctly cannot be dropped. Preserve those checks and repair native argv execution: resolve exact ap/agentplane config show through the known repository CLI, and admit only a bounded numeric Node heap option without shell evaluation or arbitrary environment/Node options. Keep environment scoped per check, reject injected code, wrappers, unrelated variables and mutation commands. Add parser and real verification regressions, then independent review. No allowlist broadening or skipped checks.
- Out of scope: unrelated refactors not required for "Repair native execution of approved read-only CLI and bounded Node heap checks".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-06T00:36:09.193Z
- Branch: task/202610052152-HA1XW3/repair-native-execution-of-approved-read-only-cl
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/declared-check.test.ts     |  56 ++++++++++-
 .../src/commands/shared/declared-check.ts          |  31 +++++-
 .../direct-task-verification.sequence.cases.ts     | 104 ++++++++++++++++++++-
 .../src/commands/task/direct-task-verification.ts  |  27 +++++-
 4 files changed, 209 insertions(+), 9 deletions(-)
```

</details>
