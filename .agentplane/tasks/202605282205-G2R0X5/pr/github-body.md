Task: `202605282205-G2R0X5`
Title: Evidence command decomposition
Canonical task record: `.agentplane/tasks/202605282205-G2R0X5/README.md`

## Summary

Evidence command decomposition

Decompose packages/agentplane/src/commands/evidence/evidence.command.ts into focused manifest/build/verify helpers while preserving evidence bundle and verify behavior. Reduce hotspot warnings and keep helper imports acyclic. Verify with evidence command tests, typecheck, lint, arch deps, format, and hotspot report.

## Scope

- In scope: Decompose packages/agentplane/src/commands/evidence/evidence.command.ts into focused manifest/build/verify helpers while preserving evidence bundle and verify behavior. Reduce hotspot warnings and keep helper imports acyclic. Verify with evidence command tests, typecheck, lint, arch deps, format, and hotspot report.
- Out of scope: unrelated refactors not required for "Evidence command decomposition".

## Verification

- State: ok
- Note:

```text
Verification passed. Commands: bunx vitest run
packages/agentplane/src/commands/evidence/evidence.command.test.ts --config vitest.workspace.ts (1
file, 3 tests passed); bun run typecheck (passed); bun run arch:deps (no dependency violations); bun
run lint:core (passed); bun run format:changed (passed); node scripts/checks/hotspot-report.mjs
--check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines
1300 (passed, runtime warnings 41 -> 40).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T22:06:13.021Z
- Branch: task/202605282205-G2R0X5/evidence-command-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/evidence/evidence-manifest.ts     | 297 ++++++++++++++++++++
 .../src/commands/evidence/evidence.command.ts      | 309 ++-------------------
 2 files changed, 313 insertions(+), 293 deletions(-)
```

</details>
