Task: `202605290043-M9K6C0`
Title: Preflight report command decomposition
Canonical task record: `.agentplane/tasks/202605290043-M9K6C0/README.md`

## Summary

Preflight report command decomposition

Decompose packages/agentplane/src/cli/run-cli/commands/core/preflight-report.ts into focused preflight report modules while preserving CLI behavior and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/cli/run-cli/commands/core/preflight-report.ts into focused preflight report modules while preserving CLI behavior and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Preflight report command decomposition".

## Verification

- State: ok
- Note:

```text
Verified preflight report decomposition. Commands passed: focused preflight readiness test, bun run
typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed,
hotspot report check. Runtime hotspot warnings decreased from 29 to 28; preflight-report.ts is 332
lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T00:43:29.282Z
- Branch: task/202605290043-M9K6C0/preflight-report-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/core/preflight-report-drift.ts        | 187 ++++++++++++++++
 .../core/preflight-report-message-guard.ts         |  52 +++++
 .../cli/run-cli/commands/core/preflight-report.ts  | 241 +--------------------
 3 files changed, 251 insertions(+), 229 deletions(-)
```

</details>
