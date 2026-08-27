Task: `202608271544-1TDVPJ`
Title: Modernize exact-result recovery fixtures
Canonical task record: `.agentplane/tasks/202608271544-1TDVPJ/README.md`

## Summary

Repair exact-result recovery using real Git bases and structured planner results. The approved material replan also addresses the demonstrated production defect in external-agent-planning-authority.ts: persisted JSON object property order must not change semantic equality. Reuse canonical JSON comparison and add focused unit regressions. Preserve array order, changed-value rejection, exact operation keys, replacement authority, original received-result identity, single consumption, replay rejection, retirement and approval guards. Scope is the existing recovery CLI test and local helper plus the planning-authority implementation and its unit tests. No lifecycle, provider, CI, policy, timeout or roadmap changes.

## Scope

In scope: packages/agentplane/src/cli/run-cli.core.task-advance-effect-recovery.test.ts, packages/agentplane/src/cli/task-advance-effect-recovery.testkit.ts, packages/agentplane/src/commands/task/external-agent-planning-authority.ts, packages/agentplane/src/commands/task/external-agent-planning-authority.test.ts. The material replan replaces the earlier fixture-only restriction with the proven property-order-independent planning JSON comparison repair. Preserve all exact-result recovery, changed-value, ordered-array, approval and single-consumption invariants. Out of scope: provider operations, lifecycle routing, CI selection, timeouts, policy, dependencies and roadmap changes.

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T16:23:53.379Z
- Branch: task/202608271544-1TDVPJ/modernize-exact-result-recovery-fixtures
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 131 +++++++++++++-----
 .../cli/task-advance-effect-recovery.testkit.ts    |  64 +++++++++
 .../task/external-agent-planning-authority.test.ts | 151 +++++++++++++++++++++
 .../task/external-agent-planning-authority.ts      |   4 +-
 4 files changed, 315 insertions(+), 35 deletions(-)
```

</details>
