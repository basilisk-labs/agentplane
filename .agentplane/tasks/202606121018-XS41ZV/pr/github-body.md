Task: `202606121018-XS41ZV`
Title: Diagnose pre-commit hook signal 9 runtime
Canonical task record: `.agentplane/tasks/202606121018-XS41ZV/README.md`

## Summary

Diagnose pre-commit hook signal 9 runtime

Diagnose and fix local pre-commit hook signal 9 failures in the AgentPlane hook shim/runtime path without weakening verification.

## Scope

- In scope: Diagnose and fix local pre-commit hook signal 9 failures in the AgentPlane hook shim/runtime path without weakening verification.
- Out of scope: unrelated refactors not required for "Diagnose pre-commit hook signal 9 runtime".

## Verification

- State: ok
- Note:

```text
Verified hook shim signal normalization. Checks passed: bunx vitest run
packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts (5 tests), bunx eslint
packages/agentplane/src/commands/shared/hook-shim-template.ts
packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts, bunx prettier --check
packages/agentplane/src/commands/shared/hook-shim-template.ts
packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts
scripts/workflow/bootstrap-framework-dev.mjs, node .agentplane/policy/check-routing.mjs. Initial
focused vitest failed before dependency install because this temporary worktree had no node_modules;
bun install --frozen-lockfile fixed dependency resolution without lockfile changes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-12T10:19:56.321Z
- Branch: task/202606121018-XS41ZV/precommit-signal9-shim
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/branch/work-start.hook-shim.test.ts   | 41 ++++++++++++++++++++++
 .../src/commands/shared/hook-shim-template.ts      |  7 ++++
 scripts/workflow/bootstrap-framework-dev.mjs       |  7 ++++
 3 files changed, 55 insertions(+)
```

</details>
