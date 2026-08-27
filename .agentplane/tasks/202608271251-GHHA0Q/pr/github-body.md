Task: `202608271251-GHHA0Q`
Title: Replace obsolete CLI test expectations with architecture-aligned contracts
Canonical task record: `.agentplane/tasks/202608271251-GHHA0Q/README.md`

## Summary

Replace obsolete CLI test expectations with architecture-aligned contracts

Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority.

## Scope

- In scope: Implement the approved test-audit first slice independently of the preserved 0.7.8 candidate. Correct the obsolete task-new route help snapshot and replace internal transition identity coupling only where the current issuance contract proves the old expectation obsolete. Preserve approval, replay, workspace isolation, provider, verification and release gates. Keep unborn-repository and canonical-plan fixture investigation explicit; do not blanket seed commits, skip tests, weaken required checks, change production lifecycle or alter roadmap dependencies. Initial scope is the help snapshot/test and the two task-advance identity tests, subject to exact PLANNER authority.
- Out of scope: unrelated refactors not required for "Replace obsolete CLI test expectations with architecture-aligned contracts".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T13:25:46.511Z
- Branch: task/202608271251-GHHA0Q/replace-obsolete-cli-test-expectations-with-arch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.help-snap.test.ts.snap            |   2 +-
 packages/agentplane/src/cli/prompts.test.ts        |   7 +-
 .../src/cli/run-cli.core.help-snap.test.ts         |   3 +
 ...n-cli.core.task-advance.branch-worktree.test.ts | 186 ++++++++++++++++++---
 ...i.core.task-advance.worktree-resolution.test.ts | 165 ++++++++++++++++--
 .../src/cli/run-cli/commands/init/prompts.test.ts  |   7 +-
 6 files changed, 318 insertions(+), 52 deletions(-)
```

</details>
