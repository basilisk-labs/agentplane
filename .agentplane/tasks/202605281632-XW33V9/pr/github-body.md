Task: `202605281632-XW33V9`
Title: Remove runtime tasks.json dependencies
Canonical task record: `.agentplane/tasks/202605281632-XW33V9/README.md`

## Summary

Remove runtime tasks.json dependencies

Audit and fix remaining runtime code paths that read or depend on legacy .agentplane/tasks.json during agent workflows; keep only explicit optional export/import compatibility surfaces.

## Scope

- In scope: Audit and fix remaining runtime code paths that read or depend on legacy .agentplane/tasks.json during agent workflows; keep only explicit optional export/import compatibility surfaces.
- Out of scope: unrelated refactors not required for "Remove runtime tasks.json dependencies".

## Verification

- State: ok
- Note:

```text
Verified after merging origin/main into PR #4195: focused vitest suite passed (3 files, 13 tests),
bun run typecheck passed, bun run lint:core passed, node .agentplane/policy/check-routing.mjs
passed, ap doctor exited 0 with only historical DONE-task warnings unrelated to this PR.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T16:32:53.504Z
- Branch: task/202605281632-XW33V9/remove-runtime-tasks-json-dependencies
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/release-smoke.test.ts  |   6 +-
 .../src/cli/run-cli.core.upgrade.test.ts           |  14 +-
 .../src/commands/branch/work-start.direct.test.ts  |  42 +++++
 .../src/commands/branch/work-start.direct.ts       |   1 -
 .../src/commands/doctor.command.open-pr.test.ts    |  44 -----
 .../src/commands/doctor.command.runtime.test.ts    | 201 ++++++++++----------
 .../src/commands/doctor.command.task-docs.test.ts  | 202 +++++++++++----------
 .../agentplane/src/commands/doctor.fast.test.ts    |  69 +++++--
 packages/agentplane/src/commands/doctor.run.ts     |   7 +-
 .../agentplane/src/commands/doctor/archive.test.ts |  28 ++-
 packages/agentplane/src/commands/doctor/archive.ts |  50 +++--
 .../agentplane/src/commands/doctor/branch-pr.ts    |  49 +++--
 .../src/commands/doctor/workspace-task-state.ts    |  54 +++---
 13 files changed, 421 insertions(+), 346 deletions(-)
```

</details>
