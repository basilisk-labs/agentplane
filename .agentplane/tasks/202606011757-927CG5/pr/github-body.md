Task: `202606011757-927CG5`
Title: Restore maximum assimilation task ACR artifact
Canonical task record: `.agentplane/tasks/202606011757-927CG5/README.md`

## Summary

Restore maximum assimilation task ACR artifact

Commit the missing task-local acr.json for completed maximum-assimilation task 202606011717-C22C3X and verify context verify-task passes on main state. Scope is limited to deterministic ACR repair and task traceability for the post-merge validation gap.

## Scope

- In scope: Commit the missing task-local acr.json for completed maximum-assimilation task 202606011717-C22C3X and verify context verify-task passes on main state. Scope is limited to deterministic ACR repair and task traceability for the post-merge validation gap.
- Out of scope: unrelated refactors not required for "Restore maximum assimilation task ACR artifact".

## Verification

- State: ok
- Note:

```bash
ap acr generate 202606011717-C22C3X --work-commit de5393f63a390a1c42f41766922a1b43c19758fd --write \
  --refresh --json. Result: pass. Evidence: wrote .agentplane/tasks/202606011717-C22C3X/acr.json \
  with extensions.agentplane.context.schema_version=1. Command: ap acr validate 202606011717-C22C3X. \
  Result: pass. Evidence: acr validate acr.json. Command: ap context verify-task \
  202606011717-C22C3X. Result: pass. Evidence: context verify-task ok for completed \
  maximum-assimilation task. Command: bunx vitest run focused ACR, finish, and maximum-assimilation \
  tests. Result: pass. Evidence: 3 files, 37 tests passed. Command: bun run typecheck; bun run \
  format:check; git diff --check; ap context reindex --include-raw --include-tasks --reset; ap \
  context check; ap context doctor; ap context graph validate; node \
  .agentplane/policy/check-routing.mjs. Result: pass. Evidence: typecheck passed, formatting clean, \
  reindex rows=45665 files=9390, context check/doctor ok, graph valid, policy routing OK.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T17:57:54.576Z
- Branch: task/202606011757-927CG5/restore-maximum-assimilation-task-acr-artifact
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202606011717-C22C3X/acr.json     | 344 +++++++++++++++++++++
 .../src/commands/acr/acr.command.test.ts           |  25 ++
 .../src/commands/acr/generate-extensions.ts        |   1 +
 .../agentplane/src/commands/task/finish-shared.ts  |   6 +-
 .../commands/task/finish.validation.unit.test.ts   |  54 ++++
 5 files changed, 429 insertions(+), 1 deletion(-)
```

</details>
