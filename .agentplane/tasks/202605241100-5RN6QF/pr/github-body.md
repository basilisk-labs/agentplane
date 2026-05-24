Task: `202605241100-5RN6QF`
Title: Fix context doctor line refs and all-scope search
Canonical task record: `.agentplane/tasks/202605241100-5RN6QF/README.md`

## Summary

Fix context doctor line refs and all-scope search

Fix defects found by the maximum-assimilation playground: context doctor should accept line-addressed raw source refs when the raw source path is present in the manifest lock, and context search --scope all should use the SQLite projection instead of falling back to an empty local stub when the projection exists.

## Scope

- In scope: Fix defects found by the maximum-assimilation playground: context doctor should accept line-addressed raw source refs when the raw source path is present in the manifest lock, and context search --scope all should use the SQLite projection instead of falling back to an empty local stub when the projection exists.
- Out of scope: unrelated refactors not required for "Fix context doctor line refs and all-scope search".

## Verification

- State: ok
- Note:

```text
Fixed context doctor line-addressed raw source refs and context search --scope all SQLite/token
matching. Checks passed: Prettier targeted files; Vitest issue-gates unit suite; targeted ESLint;
policy routing; ap doctor.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-24T11:01:15.952Z
- Branch: task/202605241100-5RN6QF/fix-context-doctor-search
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/issue-gates.unit.test.ts  | 125 +++++++++++++++++++++
 packages/agentplane/src/commands/context/search.ts |  39 +++++--
 packages/agentplane/src/context/doctor.ts          |  18 ++-
 3 files changed, 171 insertions(+), 11 deletions(-)
```

</details>
