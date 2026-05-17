Task: `202605171232-QB3YP7`
Title: Fix blueprint explain context kind help
Canonical task record: `.agentplane/tasks/202605171232-QB3YP7/README.md`

## Summary

Fix blueprint explain context kind help

Implement the follow-up from 202605171139-53TJ1A: blueprint explain --kind context already resolves context.assimilation, but command help omits context from the --kind value hint. Update the CLI spec/help snapshots and focused tests.

## Scope

- In scope: Implement the follow-up from 202605171139-53TJ1A: blueprint explain --kind context already resolves context.assimilation, but command help omits context from the --kind value hint. Update the CLI spec/help snapshots and focused tests.
- Out of scope: unrelated refactors not required for "Fix blueprint explain context kind help".

## Verification

- State: ok
- Note:

```text
Focused checks passed after moving regression coverage out of the oversized blueprint test file:
Vitest cli-core help/blueprint/help-contract tests, hotspots:check, docs:cli:check, ESLint on
touched TS files, Prettier check, policy routing, and git diff --check.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T12:43:56.776Z
- Branch: task/202605171232-QB3YP7/blueprint-help-context-kind
- Head: 0fdb2c6b0af9

```text
 .../blueprint/resolved-snapshot.json               | 529 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +-
 .../run-cli.core.help-snap.test.ts.snap            | 340 +------------
 .../src/cli/run-cli.core.help-contract.test.ts     |  37 ++
 .../src/commands/blueprint/blueprint.specs.ts      |   2 +-
 5 files changed, 574 insertions(+), 336 deletions(-)
```

</details>
