Task: `202605311941-K4FCKS`
Title: Design and scaffold Hermes adapter
Canonical task record: `.agentplane/tasks/202605311941-K4FCKS/README.md`

## Summary

Design and scaffold Hermes adapter

Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.

## Scope

- In scope: Document the target Hermes Agentplane adapter architecture and add an initial repo-local scaffold for Agentplane-owned Hermes supervision commands without creating an external repository.
- Out of scope: unrelated refactors not required for "Design and scaffold Hermes adapter".

## Verification

- State: ok
- Note:

```text
Final verification passed after CLI reference generation. Commands: node
.agentplane/policy/check-routing.mjs (pass); ap doctor (pass, with two unrelated historical
DONE-task commit warnings); bunx vitest run packages/agentplane/src/commands/hermes (1 file, 3 tests
pass); bun run --filter=agentplane build (pass); bun run docs:cli:check (pass); bun run
format:changed (pass).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-31T19:42:09.859Z
- Branch: task/202605311941-K4FCKS/design-and-scaffold-hermes-adapter
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md                                          |   1 +
 docs/user/cli-reference.generated.mdx              | 100 ++++++
 docs/workflow-guides/hermes-kanban.mdx             | 194 ++++++++++
 docs/workflow-guides/index.mdx                     |   5 +
 .../src/cli/run-cli/command-catalog/project.ts     |  17 +
 .../src/cli/run-cli/command-loaders/project.ts     |  19 +
 .../src/commands/hermes/hermes.command.test.ts     | 120 +++++++
 .../src/commands/hermes/hermes.command.ts          | 395 +++++++++++++++++++++
 8 files changed, 851 insertions(+)
```

</details>
