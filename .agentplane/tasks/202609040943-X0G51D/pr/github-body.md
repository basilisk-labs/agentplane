Task: `202609040943-X0G51D`
Title: Preserve completed WorkItems across command-only material plan refinements
Canonical task record: `.agentplane/tasks/202609040943-X0G51D/README.md`

## Summary

Preserve completed WorkItems across command-only material plan refinements

Fix the Clean Core recovery defect reproduced by task 202609032308-F31YXS: after a material plan refinement that changes only a verification command, AgentPlane rematerializes the approved plan with previously COMPLETED WorkItems reset and reissues the first completed implementation episode. Preserve completed WorkItem state, attempts, canonical output manifests, and dependency satisfaction when the revised structured plan keeps the same WorkItem identities and semantics; reopen only the WorkItem whose verification declaration materially changed. Fail closed on incompatible identity, dependency, output, scope, or acceptance changes. Add a focused regression using the F31YXS sequence: completed implementation at unchanged HEAD, command-only refinement from task-specific task lint to repository-wide task lint, reapproval, and continuation at the qualification or verification boundary without requiring a fake source diff. Do not modify F31YXS or PX8PZT task state directly, weaken verification, add compatibility CLI behavior, or include release or provider-neutral scope.

## Scope

- In scope: Fix the Clean Core recovery defect reproduced by task 202609032308-F31YXS: after a material plan refinement that changes only a verification command, AgentPlane rematerializes the approved plan with previously COMPLETED WorkItems reset and reissues the first completed implementation episode. Preserve completed WorkItem state, attempts, canonical output manifests, and dependency satisfaction when the revised structured plan keeps the same WorkItem identities and semantics; reopen only the WorkItem whose verification declaration materially changed. Fail closed on incompatible identity, dependency, output, scope, or acceptance changes. Add a focused regression using the F31YXS sequence: completed implementation at unchanged HEAD, command-only refinement from task-specific task lint to repository-wide task lint, reapproval, and continuation at the qualification or verification boundary without requiring a fake source diff. Do not modify F31YXS or PX8PZT task state directly, weaken verification, add compatibility CLI behavior, or include release or provider-neutral scope.
- Out of scope: unrelated refactors not required for "Preserve completed WorkItems across command-only material plan refinements".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-04T10:42:56.596Z
- Branch: task/202609040943-X0G51D/preserve-completed-workitems-across-command-only
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance.evidence-rework.test.ts |  68 ++++++++
 .../task/external-agent-planning-authority.test.ts | 162 ++++++++++++++++++-
 packages/core/src/tasks/task-centric/graph.ts      |   7 +-
 .../src/tasks/task-centric/task-centric.test.ts    | 179 +++++++++++++++++++--
 4 files changed, 400 insertions(+), 16 deletions(-)
```

</details>
