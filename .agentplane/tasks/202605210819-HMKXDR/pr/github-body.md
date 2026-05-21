Task: `202605210819-HMKXDR`
Title: Default context init to maximum assimilation
Canonical task record: `.agentplane/tasks/202605210819-HMKXDR/README.md`

## Summary

Default context init to maximum assimilation

Temporarily hide interactive context init mode choices so default init uses maximum-assimilation without asking, while preserving the option code, and add a context-layer commit after initialization.

## Scope

- In scope: Temporarily hide interactive context init mode choices so default init uses maximum-assimilation without asking, while preserving the option code, and add a context-layer commit after initialization.
- Out of scope: unrelated refactors not required for "Default context init to maximum assimilation".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed for PR head e0ce3333. Evidence: focused context-init suite passed 6/6
including staged-index prewrite regression, targeted eslint passed, diff-check and policy routing
passed, framework bootstrap passed, hosted PR checks passed, and GitHub review thread
PRRT_kwDORCLmJM6Du_F8 was resolved after the fix.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T13:49:59.560Z
- Branch: task/202605210819-HMKXDR/context-init-maximum-default
- Head: e0ce3333c3f8

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +-
 .../src/cli/run-cli.core.context-init.test.ts      | 113 +++-
 .../src/commands/context/context.command.ts        |   3 +
 .../src/commands/context/context.spec.ts           |   4 +-
 packages/agentplane/src/commands/context/init.ts   |  94 +++-
 6 files changed, 737 insertions(+), 51 deletions(-)
```

</details>
