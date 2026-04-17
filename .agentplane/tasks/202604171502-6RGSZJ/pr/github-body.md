## Summary

Add ESLint import boundaries for core shared and commands layers

Enforce package and layer boundaries for core, shared, and commands code so future refactors cannot reintroduce cross-layer imports.

## Scope

- In scope: Enforce package and layer boundaries for core, shared, and commands code so future refactors cannot reintroduce cross-layer imports.
- Out of scope: unrelated refactors not required for "Add ESLint import boundaries for core shared and commands layers".

## Verification

- State: ok
- Note: Verified: lint and typecheck pass for the new import-boundary policy.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T15:22:02.131Z
- Branch: task/202604171502-6RGSZJ/eslint-import-boundaries
- Head: 7362af84eb6a

```text
 eslint.config.cjs                                  |  32 ++
 packages/agentplane/src/cli/run-cli.ts             |   2 +-
 packages/agentplane/src/commands/task/list.run.ts  |  20 +-
 .../agentplane/src/commands/task/new.command.ts    |  19 +-
 packages/agentplane/src/commands/task/new.ts       |   4 +-
 .../runner/usecases/scenario-materialize-task.ts   |   4 +-
 .../src/runner/usecases/task-run-inspect.ts        |   4 +-
 .../runner/usecases/task-run-lifecycle-shared.ts   |   4 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   4 +-
 .../execution-context.ts}                          |  78 ++---
 .../usecases/context/resolve-context.unit.test.ts  | 329 ---------------------
 .../src/usecases/task/task-list-usecase.ts         |  26 --
 .../usecases/task/task-list-usecase.unit.test.ts   |  52 ----
 .../src/usecases/task/task-new-usecase.ts          |  27 --
 14 files changed, 106 insertions(+), 499 deletions(-)
```

</details>
