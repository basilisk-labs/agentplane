Task: `202605290600-GS13TP`
Title: Context ingest task prompt decomposition
Canonical task record: `.agentplane/tasks/202605290600-GS13TP/README.md`

## Summary

Context ingest task prompt decomposition

Refactor packages/agentplane/src/context/ingest-task.ts below the 400-line hotspot warning by extracting context assimilation prompt/metadata helpers into focused module(s). Preserve createTaskNewParsed public API, maximum-assimilation task contract, prompt module payload, source-set behavior, and allowed/forbidden output semantics. Acceptance: context release-readiness tests covering ingest pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.

## Scope

- In scope: Refactor packages/agentplane/src/context/ingest-task.ts below the 400-line hotspot warning by extracting context assimilation prompt/metadata helpers into focused module(s). Preserve createTaskNewParsed public API, maximum-assimilation task contract, prompt module payload, source-set behavior, and allowed/forbidden output semantics. Acceptance: context release-readiness tests covering ingest pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
- Out of scope: unrelated refactors not required for "Context ingest task prompt decomposition".

## Verification

- State: ok
- Note:

```text
Context ingest prompt construction extracted into
packages/agentplane/src/context/ingest-task-prompt.ts; createTaskNewParsed behavior and prompt
payload are preserved. Checks passed: bun test
packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun
run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run
hotspots:check (runtime hotspots 5 -> 4).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T06:00:47.010Z
- Branch: task/202605290600-GS13TP/context-ingest-task-prompt-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/context/ingest-task-prompt.ts   | 142 +++++++++++++++++++++
 packages/agentplane/src/context/ingest-task.ts     | 139 +-------------------
 2 files changed, 146 insertions(+), 135 deletions(-)
```

</details>
