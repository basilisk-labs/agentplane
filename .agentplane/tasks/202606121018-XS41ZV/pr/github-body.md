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
Verified review-thread repair for timeout vs runner-signal diagnostics. Checks passed: bunx prettier
--write touched shim files, bunx vitest run
packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts (5 tests), bunx eslint
packages/agentplane/src/commands/shared/hook-shim-template.ts
packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts, node
.agentplane/policy/check-routing.mjs. Timeout path now preserves only reason_code=hook_shim_timeout;
independent killed runner path emits reason_code=hook_runner_signal.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-12T10:19:56.321Z
- Branch: task/202606121018-XS41ZV/precommit-signal9-shim
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/branch/work-start.hook-shim.test.ts   | 42 ++++++++++++++++++++++
 .../src/commands/shared/hook-shim-template.ts      | 15 ++++++++
 scripts/workflow/bootstrap-framework-dev.mjs       | 15 ++++++++
 3 files changed, 72 insertions(+)
```

</details>
