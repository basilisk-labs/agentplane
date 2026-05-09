Task: `202605091754-S1KM8E`
Title: Create verify command spec factory
Canonical task record: `.agentplane/tasks/202605091754-S1KM8E/README.md`

## Summary

Create verify command spec factory

Replace the duplicated task verify ok/rework command spec boilerplate with a small factory that keeps verdict-specific summary and runner behavior explicit.

## Scope

- In scope: Replace the duplicated task verify ok/rework command spec boilerplate with a small factory that keeps verdict-specific summary and runner behavior explicit.
- Out of scope: unrelated refactors not required for "Create verify command spec factory".

## Verification

- State: ok
- Note: Verified: created shared verify command spec/handler factory; verify CLI tests passed (2 files, 17 tests), typecheck passed, Prettier passed, clone:report improved metrics to 81 clones / 1335 duplicated lines / 14279 duplicated tokens, and clone:check passed without baseline update.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T19:18:57.670Z
- Branch: task/202605091754-S1KM8E/verify-spec-factory
- Head: e76ae07f9f10

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 .../src/commands/task/verify-command-shared.ts     |  95 +++-
 .../src/commands/task/verify-ok.command.ts         |  74 +--
 .../src/commands/task/verify-rework.command.ts     |  74 +--
 4 files changed, 627 insertions(+), 121 deletions(-)
```

</details>
