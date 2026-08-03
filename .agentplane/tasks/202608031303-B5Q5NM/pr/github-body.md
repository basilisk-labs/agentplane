Task: `202608031303-B5Q5NM`
Title: Ignore AgentPlane runtime tmp artifacts by default
Canonical task record: `.agentplane/tasks/202608031303-B5Q5NM/README.md`

## Summary

Ignore AgentPlane runtime tmp artifacts by default

Fix GitHub issue #4663 by adding .agentplane/tmp to the canonical runtime gitignore contract without overwriting user rules, and add init plus migration regression coverage proving the entry is idempotent.

## Scope

- In scope: Fix GitHub issue #4663 by adding .agentplane/tmp to the canonical runtime gitignore contract without overwriting user rules, and add init plus migration regression coverage proving the entry is idempotent.
- Out of scope: unrelated refactors not required for "Ignore AgentPlane runtime tmp artifacts by default".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T13:05:24.489Z
- Branch: task/202608031303-B5Q5NM/ignore-agentplane-runtime-tmp-artifacts
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/run-cli.core.init.test.ts       | 2 ++
 packages/agentplane/src/cli/run-cli.core.upgrade.test.ts    | 8 ++++++--
 packages/agentplane/src/commands/upgrade.ts                 | 4 ++--
 packages/agentplane/src/runtime/shared/runtime-artifacts.ts | 1 +
 4 files changed, 11 insertions(+), 4 deletions(-)
```

</details>
