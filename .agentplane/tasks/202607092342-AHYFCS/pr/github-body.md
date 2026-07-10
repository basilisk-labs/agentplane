Task: `202607092342-AHYFCS`
Title: Enforce cross-surface context integrity for v0.6.22
Canonical task record: `.agentplane/tasks/202607092342-AHYFCS/README.md`

## Summary

Enforce cross-surface context integrity for v0.6.22

Make global context checks validate wiki graph references, entity page policy, manifest/source coverage, and freshness of derived wiki reports so structurally valid but semantically disconnected context cannot pass.

## Scope

- In scope: global read-only integrity validation across wiki, graph, manifest/raw source inventory, and derived link/orphan reports.
- In scope: actionable diagnostics and regression tests.
- Out of scope: rewriting existing repository wiki content, changing public context schemas, or implementing semantic search ranking.

## Verification

- State: ok
- Note:

```text
Verified: review fix ignores hidden .obsidian and raw archive directories; 10 focused tests,
typecheck, lint, diff check, prior full ci:contract, 2,132-test fast suite, and critical CLI remain
green.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-09T23:57:04.928Z
- Branch: task/202607092342-AHYFCS/enforce-cross-surface-context-integrity-for-v0-6
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/check.unit.test.ts        | 129 ++++++++++++++
 .../src/commands/context/wiki-reports.ts           |  21 ++-
 .../src/commands/context/wiki-reports.unit.test.ts |   9 +
 packages/agentplane/src/context/doctor.ts          |   2 +
 packages/agentplane/src/context/integrity.ts       | 188 +++++++++++++++++++++
 5 files changed, 347 insertions(+), 2 deletions(-)
```

</details>
