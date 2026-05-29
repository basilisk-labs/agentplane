Task: `202605290610-R6288F`
Title: Context reindex projection decomposition
Canonical task record: `.agentplane/tasks/202605290610-R6288F/README.md`

## Summary

Context reindex projection decomposition

Refactor packages/agentplane/src/context/reindex.ts below the 400-line hotspot warning by extracting projection row helpers into focused module(s). Preserve cmdContextReindex behavior, projection metadata, path selection, markdown/jsonl/text row generation, SQLite projection writes, and readContextProjection fallback semantics. Acceptance: context release-readiness tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.

## Scope

- In scope: Refactor packages/agentplane/src/context/reindex.ts below the 400-line hotspot warning by extracting projection row helpers into focused module(s). Preserve cmdContextReindex behavior, projection metadata, path selection, markdown/jsonl/text row generation, SQLite projection writes, and readContextProjection fallback semantics. Acceptance: context release-readiness tests pass, typecheck/arch/knip/lint/format pass, and bun run hotspots:check shows one fewer runtime hotspot.
- Out of scope: unrelated refactors not required for "Context reindex projection decomposition".

## Verification

- State: ok
- Note:

```text
Context reindex projection row helpers extracted into
packages/agentplane/src/context/reindex-projection.ts; cmdContextReindex and readContextProjection
semantics are preserved. Checks passed: bun test
packages/agentplane/src/commands/context/release-readiness.test.ts (21 pass); bun run typecheck; bun
run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run
hotspots:check (runtime hotspots 4 -> 3).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T06:10:23.294Z
- Branch: task/202605290610-R6288F/context-reindex-projection-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/context/reindex-projection.ts   | 242 ++++++++++++++++++++
 packages/agentplane/src/context/reindex.ts         | 251 +--------------------
 2 files changed, 248 insertions(+), 245 deletions(-)
```

</details>
