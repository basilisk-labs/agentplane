Task: `202606080612-F8PTW7`
Title: Reduce route ambiguity in AgentPlane guidance
Canonical task record: `.agentplane/tasks/202606080612-F8PTW7/README.md`

## Summary

Reduce route ambiguity in AgentPlane guidance

Make ap route outputs surface clearer diagnostics and must-not guidance for ambiguous branch_pr states so agents do less manual reconstruction.

## Scope

- In scope: Make ap route outputs surface clearer diagnostics and must-not guidance for ambiguous branch_pr states so agents do less manual reconstruction.
- Out of scope: unrelated refactors not required for "Reduce route ambiguity in AgentPlane guidance".

## Verification

- State: ok
- Note: CI verify-static failure fixed locally; lint, focused tests, typecheck, and changed-format passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T06:13:11.577Z
- Branch: task/202606080612-F8PTW7/reduce-route-ambiguity-in-agentplane-guidance
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    |   9 +-
 .../commands/shared/route-decision-next-action.ts  |   8 +-
 .../src/commands/shared/route-guidance.test.ts     | 184 +++++++++++++++++++++
 .../src/commands/shared/route-guidance.ts          |  67 +++++++-
 4 files changed, 253 insertions(+), 15 deletions(-)
```

</details>
