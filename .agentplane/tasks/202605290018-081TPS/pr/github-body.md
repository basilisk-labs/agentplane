Task: `202605290018-081TPS`
Title: Context ingest pipeline decomposition
Canonical task record: `.agentplane/tasks/202605290018-081TPS/README.md`

## Summary

Context ingest pipeline decomposition

Decompose packages/agentplane/src/context/ingest.ts into focused ingestion pipeline modules while preserving context ingest behavior and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/context/ingest.ts into focused ingestion pipeline modules while preserving context ingest behavior and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Context ingest pipeline decomposition".

## Verification

- State: ok
- Note:

```text
Verified context ingest pipeline decomposition. Commands passed: focused context ingest tests
(issue-gates.unit.test.ts and release-readiness.test.ts), bun run typecheck, bun run arch:check, bun
run knip:check, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot
warnings decreased from 31 to 30; ingest.ts is 167 lines.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T00:19:20.924Z
- Branch: task/202605290018-081TPS/context-ingest-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/context/ingest-manifest.ts | 231 +++++++++++
 packages/agentplane/src/context/ingest-sources.ts  | 198 ++++++++++
 packages/agentplane/src/context/ingest.ts          | 434 ++-------------------
 3 files changed, 451 insertions(+), 412 deletions(-)
```

</details>
