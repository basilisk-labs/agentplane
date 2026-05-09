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

- Updated: 2026-05-09T19:13:38.898Z
- Branch: task/202605091754-S1KM8E/verify-spec-factory
- Head: 8d79e1d5dff2

```text
No changes detected.
```

</details>
