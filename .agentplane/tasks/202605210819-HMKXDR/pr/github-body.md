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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T08:26:46.260Z
- Branch: task/202605210819-HMKXDR/context-init-maximum-default
- Head: dbd1b316f824

```text
 docs/user/cli-reference.generated.mdx              |  2 +-
 .../src/cli/run-cli.core.context-init.test.ts      | 86 +++++++++++++++-------
 .../src/commands/context/context.command.ts        |  3 +
 .../src/commands/context/context.spec.ts           |  4 +-
 packages/agentplane/src/commands/context/init.ts   | 78 ++++++++++++++------
 5 files changed, 122 insertions(+), 51 deletions(-)
```

</details>
