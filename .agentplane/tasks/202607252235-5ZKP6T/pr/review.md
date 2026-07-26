# PR Review

Created: 2026-07-25T22:39:31.309Z

## Task

- Task: `202607252235-5ZKP6T`
- Title: Prevent foreign task artifacts in branch_pr worktrees
- Status: DOING
- Branch: `task/202607252235-5ZKP6T/prevent-foreign-task-artifacts-in-branch-pr-work`
- Canonical task record: `.agentplane/tasks/202607252235-5ZKP6T/README.md`

## Verification

- State: ok
- Note: PASS at 35656c7f992fc4e0cda0771bcbaba91109b17f88: strict divergent proof now requires the exact direct first-parent TODO predecessor, a valid TODO-to-DOING Start transition, and verified DONE source; 68 focused tests, 6 CLI-core tests, typecheck, lint, lifecycle, routing, doctor, and diff check passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T22:40:26.297Z
- Branch: task/202607252235-5ZKP6T/prevent-foreign-task-artifacts-in-branch-pr-work
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221908-9M2FBQ/README.md    |   5 +-
 docs/internal/v0.7-refactor-plan.md                |  18 +-
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |  11 +-
 .../commands/branch/work-start.hook-shim.test.ts   |  36 +-
 .../src/commands/branch/work-start.materialize.ts  |  36 +-
 .../agentplane/src/commands/flow/repair.command.ts |  23 +
 .../src/commands/shared/route-decision-blockers.ts |  41 +-
 .../route-decision-blockers.worktree.test.ts       |  15 +
 .../src/commands/shared/route-decision.ts          |  31 +-
 ...task-worktree-foreign-artifact-history-proof.ts | 235 +++++
 ...sk-worktree-foreign-artifact-lifecycle-proof.ts | 286 ++++++
 ...sk-worktree-foreign-artifact-provenance.test.ts | 152 ++++
 .../task-worktree-foreign-artifact-repair.test.ts  | 965 +++++++++++++++++++++
 .../task-worktree-foreign-artifact-repair.ts       | 474 ++++++++++
 .../shared/task-worktree-foreign-artifact-route.ts |  26 +
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   1 +
 .../shared/workflow-operation-projection.test.ts   | 267 ++++++
 .../shared/workflow-operation-projection.ts        |   3 +
 .../src/commands/shared/workflow-step-branch.ts    |  15 +-
 .../src/commands/shared/workflow-step-factory.ts   |  21 +
 .../commands/shared/workflow-step-fingerprint.ts   |   1 +
 .../workflow-step-foreign-task-readme-repair.ts    |  22 +
 .../src/commands/shared/workflow-step.test.ts      | 198 -----
 .../src/commands/shared/workflow-step.ts           |  11 +-
 ...ask-worktree-foreign-artifact-repair-fixture.ts | 459 ++++++++++
 26 files changed, 3096 insertions(+), 257 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
