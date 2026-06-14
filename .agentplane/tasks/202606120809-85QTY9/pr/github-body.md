Task: `202606120809-85QTY9`
Title: Reduce branch_pr commit count for single-task fixes
Canonical task record: `.agentplane/tasks/202606120809-85QTY9/README.md`

## Summary

Reduce branch_pr commit count for single-task fixes

Optimize branch_pr lifecycle guidance so evaluator quality evidence and pre-merge closure are recorded before the final task-branch publication, reducing common single-task fixes from four commit events toward two to three without weakening verification gates.

## Scope

- In scope: Optimize branch_pr lifecycle guidance so evaluator quality evidence and pre-merge closure are recorded before the final task-branch publication, reducing common single-task fixes from four commit events toward two to three without weakening verification gates.
- Out of scope: unrelated refactors not required for "Reduce branch_pr commit count for single-task fixes".

## Verification

- State: ok
- Note:

```text
Verified route decision quality/pre-merge lifecycle change. Checks: bunx vitest route-decision tests
passed; route-oracle/route-guidance tests passed; bun run typecheck passed; node
.agentplane/policy/check-routing.mjs passed; git diff --check passed; hotspot-report threshold
passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-12T08:11:34.867Z
- Branch: task/202606120809-85QTY9/reduce-branch-pr-commit-count-for-single-task-fi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.route-decision.quality.test.ts    | 228 +++++++++++++++++++++
 .../src/commands/shared/route-decision-blockers.ts |  74 +++++++
 .../commands/shared/route-decision-next-action.ts  |  29 +++
 .../src/commands/shared/route-decision.ts          |  21 ++
 .../agentplane/src/commands/shared/route-oracle.ts |  24 +++
 scripts/lib/test-route-registry.mjs                |   1 +
 6 files changed, 377 insertions(+)
```

</details>
