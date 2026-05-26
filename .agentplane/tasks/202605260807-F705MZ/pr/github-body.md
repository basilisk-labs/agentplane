Task: `202605260807-F705MZ`
Title: Route hook runtime changes to targeted local CI
Canonical task record: `.agentplane/tasks/202605260807-F705MZ/README.md`

## Summary

Route hook runtime changes to targeted local CI

Make local CI classify packages/agentplane/src/commands/hooks changes as hooks bucket so pre-push does not fall back to full-fast release suites for hook-only work.

## Scope

- In scope: Make local CI classify packages/agentplane/src/commands/hooks changes as hooks bucket so pre-push does not fall back to full-fast release suites for hook-only work.
- Out of scope: unrelated refactors not required for "Route hook runtime changes to targeted local CI".

## Verification

- State: ok
- Note:

```text
Hook runtime local CI routing now resolves to targeted hooks route; targeted selector, lint, format,
and hooks suites pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-26T08:08:08.069Z
- Branch: task/202605260807-F705MZ/hook-runtime-ci-routing
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/local-ci-selection.test.ts | 13 +++++++++++++
 scripts/lib/local-ci-selection.mjs                     |  1 +
 scripts/lib/test-route-registry.mjs                    |  1 +
 3 files changed, 15 insertions(+)
```

</details>
