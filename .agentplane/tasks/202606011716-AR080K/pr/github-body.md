Task: `202606011716-AR080K`
Title: Add fast context knowledge dashboard
Canonical task record: `.agentplane/tasks/202606011716-AR080K/README.md`

## Summary

Add fast context knowledge dashboard

Implement a read-only context dashboard command that serves a whole knowledge graph across wiki pages, links, entities, claims, sources, capabilities, and task evidence, optimized for large task-history-to-LLM-wiki datasets using the existing context projection where possible.

## Scope

- In scope: Implement a read-only context dashboard command that serves a whole knowledge graph across wiki pages, links, entities, claims, sources, capabilities, and task evidence, optimized for large task-history-to-LLM-wiki datasets using the existing context projection where possible.
- Out of scope: unrelated refactors not required for "Add fast context knowledge dashboard".

## Verification

- State: ok
- Note:

```text
Verified: implemented read-only context dashboard command and typed whole-knowledge graph snapshot.
Commands passed: bunx vitest --config vitest.workspace.ts run --project agentplane
packages/agentplane/src/commands/context/dashboard.unit.test.ts; bun run --filter=agentplane
typecheck; targeted eslint for changed files; bunx vitest --config vitest.workspace.ts run --project
cli-core packages/agentplane/src/cli/run-cli.core.help-snap.test.ts; bun run --filter=agentplane
build; ap context dashboard --dump-json; ap context graph validate; node
.agentplane/policy/check-routing.mjs; git diff --check.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T17:17:02.350Z
- Branch: task/202606011716-AR080K/add-fast-context-knowledge-dashboard
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  20 +
 .../run-cli.core.help-snap.test.ts.snap            |  98 ++--
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +
 .../src/commands/context/context-runner.ts         |  13 +
 .../src/commands/context/context.spec.ts           |  47 ++
 .../agentplane/src/commands/context/dashboard.ts   | 635 +++++++++++++++++++++
 .../src/commands/context/dashboard.unit.test.ts    | 203 +++++++
 7 files changed, 973 insertions(+), 45 deletions(-)
```

</details>
