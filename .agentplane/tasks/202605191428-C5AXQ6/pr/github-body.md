Task: `202605191428-C5AXQ6`
Title: Improve context recall boundaries
Canonical task record: `.agentplane/tasks/202605191428-C5AXQ6/README.md`

## Summary

Improve context recall boundaries

Make local context search prefer curated context by default, align context policy module references with actual derived paths and blueprint loading, and verify the context command behavior.

## Scope

- In scope: Make local context search prefer curated context by default, align context policy module references with actual derived paths and blueprint loading, and verify the context command behavior.
- Out of scope: unrelated refactors not required for "Improve context recall boundaries".

## Verification

- State: ok
- Note:

```text
Verified context recall boundary fix. Commands: bun test
packages/agentplane/src/commands/context/release-readiness.test.ts
packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests and 8
snapshots; bunx eslint touched context/search/blueprint files => pass; bunx prettier --check touched
docs/source files => pass; bun run --filter=agentplane build => pass; bun run docs:cli:check =>
pass; node .agentplane/policy/check-routing.mjs => pass; ap context reindex --include-raw => pass
rows=16 files=21; ap context check => pass; ap context doctor => pass after serialized re-run; ap
doctor => OK; git diff --check => pass. Manual smoke: default context search excludes task history,
--scope tasks returns task records.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T14:30:15.673Z
- Branch: task/202605191428-C5AXQ6/context-recall-boundaries
- Head: 81a3ed59446b

```text
No changes detected.
```

</details>
