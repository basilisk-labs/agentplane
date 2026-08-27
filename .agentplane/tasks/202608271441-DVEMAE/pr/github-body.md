Task: `202608271441-DVEMAE`
Title: Repair lifecycle fixture execution bases
Canonical task record: `.agentplane/tasks/202608271441-DVEMAE/README.md`

## Summary

Repair lifecycle fixture execution bases

Repair ten freshly reproduced failures in four lifecycle CLI test files. Use the existing committed-repository helper only for scenarios that need a real execution base. Preserve argument-validation fixtures, dependency readiness, force approval, comment validation, status-commit confirmation, incident advice and task-status assertions. Bind the start-ready baseline assertion to the actual fixture seed SHA instead of an unborn null. Do not change production behavior, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Scope is disjoint from concurrent G0N9P4 and 9EWJA1; the already merged GHHA0Q base is sufficient. Require focused tests and full CI.

## Scope

- In scope: Repair ten freshly reproduced failures in four lifecycle CLI test files. Use the existing committed-repository helper only for scenarios that need a real execution base. Preserve argument-validation fixtures, dependency readiness, force approval, comment validation, status-commit confirmation, incident advice and task-status assertions. Bind the start-ready baseline assertion to the actual fixture seed SHA instead of an unborn null. Do not change production behavior, shared helpers, policy, timeouts, CI gates, release state or roadmap dependencies. Scope is disjoint from concurrent G0N9P4 and 9EWJA1; the already merged GHHA0Q base is sufficient. Require focused tests and full CI.
- Out of scope: unrelated refactors not required for "Repair lifecycle fixture execution bases".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T14:46:15.480Z
- Branch: task/202608271441-DVEMAE/repair-lifecycle-fixture-execution-bases
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.lifecycle.start-commit.policy.test.ts   |  3 ++-
 .../src/cli/run-cli.core.lifecycle.start-readiness.test.ts   |  5 +++--
 packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts   |  9 +++++----
 .../agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts  | 12 ++++++++----
 4 files changed, 18 insertions(+), 11 deletions(-)
```

</details>
