Task: `202605201152-ATVFPQ`
Title: Define context wiki contract surface
Canonical task record: `.agentplane/tasks/202605201152-ATVFPQ/README.md`

## Summary

Define context wiki contract surface

Clarify the repository-local context/wiki contract by making the context manifest and wiki rules the explicit source for wiki format, language, topology, and provenance expectations without changing runtime enforcement.

## Scope

- In scope: Clarify the repository-local context/wiki contract by making the context manifest and wiki rules the explicit source for wiki format, language, topology, and provenance expectations without changing runtime enforcement.
- Out of scope: unrelated refactors not required for "Define context wiki contract surface".

## Verification

- State: ok
- Note:

```text
Command: bunx prettier --check .agentplane/context/agentplane.context.yaml
.agentplane/context/policies/wiki.rules.md context/wiki/AGENTS.md
packages/agentplane/src/commands/context/init.ts -> pass. Command: node
.agentplane/policy/check-routing.mjs -> pass. Command: ap context wiki lint context/wiki/AGENTS.md
-> pass. Command: ap context check -> pass. Command: bunx eslint
packages/agentplane/src/commands/context/init.ts -> pass. Command: bunx vitest run
packages/agentplane/src/cli/run-cli.core.context-init.test.ts
packages/agentplane/src/cli/run-cli.core.init.test.ts -> pass, 33 tests. Command: ap doctor -> OK
with pre-existing warning about DONE task archive README 202605200640-7AXZRX missing from git index.
Skipped: ap context verify-task 202605201152-ATVFPQ, because this is a docs/policy task and the
command rejected it as not a context task.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T11:57:31.221Z
- Branch: task/202605201152-ATVFPQ/context-wiki-contract
- Head: 7c1b52ebf76e

```text
 .agentplane/context/agentplane.context.yaml        |  23 ++
 .agentplane/context/policies/wiki.rules.md         |  47 ++-
 .../blueprint/resolved-snapshot.json               | 397 +++++++++++++++++++++
 context/wiki/AGENTS.md                             |   2 +
 packages/agentplane/src/commands/context/init.ts   |  68 +++-
 5 files changed, 533 insertions(+), 4 deletions(-)
```

</details>
