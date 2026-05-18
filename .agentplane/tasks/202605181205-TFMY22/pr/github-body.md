Task: `202605181205-TFMY22`
Title: Fix feedback opt-in and direct finish recovery issues
Canonical task record: `.agentplane/tasks/202605181205-TFMY22/README.md`

## Summary

Fix feedback opt-in and direct finish recovery issues

Fix GitHub issues #3872 and #3873 without runner scope: make feedback issue publication safe without mutating workflow config in-session, and harden direct-mode finish/git staging diagnostics/recovery around dirty index and staged state.

## Scope

- In scope: Fix GitHub issues #3872 and #3873 without runner scope: make feedback issue publication safe without mutating workflow config in-session, and harden direct-mode finish/git staging diagnostics/recovery around dirty index and staged state.
- Out of scope: unrelated refactors not required for "Fix feedback opt-in and direct finish recovery issues".

## Verification

- State: ok
- Note:

```text
Implemented one-shot feedback issue opt-in and direct close-commit preflight hardening. Checks
passed: focused insights/error tests, finish validation Vitest, typecheck, docs:cli:check,
format:changed, lint:core, task scope, policy routing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T12:43:59.196Z
- Branch: task/202605181205-TFMY22/fix-feedback-finish-recovery
- Head: 4e7581a1312b

```text
 .../blueprint/resolved-snapshot.json               | 529 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   7 +
 docs/user/configuration.mdx                        |   6 +
 packages/agentplane/src/cli/error-map.test.ts      |   1 +
 packages/agentplane/src/cli/error-map.ts           |  13 +-
 packages/agentplane/src/cli/reason-codes.ts        |   2 +-
 .../src/cli/run-cli.core.insights-report.test.ts   |  46 ++
 .../src/commands/insights/insights.command.ts      |   8 +-
 .../src/commands/insights/insights.spec.ts         |  13 +
 .../agentplane/src/commands/task/finish-execute.ts |  44 +-
 .../commands/task/finish.close-tail.unit.test.ts   |   1 +
 .../src/commands/task/finish.state.unit.test.ts    |  81 +++-
 .../commands/task/finish.validation.unit.test.ts   |   2 +-
 13 files changed, 744 insertions(+), 9 deletions(-)
```

</details>
