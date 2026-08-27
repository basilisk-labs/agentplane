Task: `202608271358-G0N9P4`
Title: Repair verification fixtures on integrated main 5fce04a8
Canonical task record: `.agentplane/tasks/202608271358-G0N9P4/README.md`

## Summary

Repair verification fixtures on integrated main 5fce04a8

Replace unexecuted task 202608271350-HVGQPQ, which froze its creation base before GHHA0Q integration. Implement only the verification-fixture slice on integrated main 5fce04a8be14816be4cae236d2941dff7045e214. Inspect exact failures in lifecycle.verify, tasks.verify-matrix and incidents CLI tests. Use mkGitRepoRootWithCommit only for scenarios requiring implementation evidence. Preserve all assertions and argument-validation cases. Add an explicit unborn-repository rejection regression in runtime/task-execution-context/resolve.test.ts. Do not change shared helpers, production code, CI gates, release candidate or roadmap dependencies. Canonical verification migration remains AP-CORE-013. Require scoped tests, full CI and hosted integration. User authorizes autonomous execution and normal in-scope approvals.

## Scope

- In scope: Replace unexecuted task 202608271350-HVGQPQ, which froze its creation base before GHHA0Q integration. Implement only the verification-fixture slice on integrated main 5fce04a8be14816be4cae236d2941dff7045e214. Inspect exact failures in lifecycle.verify, tasks.verify-matrix and incidents CLI tests. Use mkGitRepoRootWithCommit only for scenarios requiring implementation evidence. Preserve all assertions and argument-validation cases. Add an explicit unborn-repository rejection regression in runtime/task-execution-context/resolve.test.ts. Do not change shared helpers, production code, CI gates, release candidate or roadmap dependencies. Canonical verification migration remains AP-CORE-013. Require scoped tests, full CI and hosted integration. User authorizes autonomous execution and normal in-scope approvals.
- Out of scope: unrelated refactors not required for "Repair verification fixtures on integrated main 5fce04a8".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T14:43:02.687Z
- Branch: task/202608271358-G0N9P4/repair-verification-fixtures-on-integrated-main
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.incidents.test.ts         | 13 ++++-------
 .../src/cli/run-cli.core.lifecycle.verify.test.ts  | 15 ++++++------
 .../cli/run-cli.core.tasks.verify-matrix.test.ts   |  5 ++--
 .../runtime/task-execution-context/resolve.test.ts | 27 ++++++++++++++++++++++
 4 files changed, 43 insertions(+), 17 deletions(-)
```

</details>
