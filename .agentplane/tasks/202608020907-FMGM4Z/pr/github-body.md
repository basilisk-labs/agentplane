Task: `202608020907-FMGM4Z`
Title: Assimilate v0.6.26 maintenance fixes into v0.7
Canonical task record: `.agentplane/tasks/202608020907-FMGM4Z/README.md`

## Summary

Assimilate v0.6.26 maintenance fixes into v0.7

Audit every non-main branch, port only missing v0.6.25/v0.6.26 and stale-PR correctness fixes into the current v0.7 architecture, preserve stronger v0.7 contracts, and prove no maintenance regression remains.

## Scope

Audit origin/codex/fix-v0.6.24-closeout-route at v0.6.26 and every remaining non-main remote task branch except agentplane-loops. Port only correctness or efficiency behavior that current main lacks. Preserve the v0.7 typed supervisor, authority, evidence, retrieval, and TypeScript boundaries. Include focused regression coverage, branch disposition evidence, and any required release follow-up. Do not merge stale branches wholesale and do not modify agentplane-loops.

## Verification

- State: ok
- Note:

```text
Verified final implementation revision e5e4a65c: corrected affected suites, compatibility alias,
full CI contract, lifecycle, typecheck, doctor, and branch disposition all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T09:09:23.345Z
- Branch: task/202608020907-FMGM4Z/assimilate-v0-6-26-maintenance-fixes-into-v0-7
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 package.json                                       |   1 +
 .../src/cli/run-cli.core.tasks.active.test.ts      |  49 ++
 .../src/commands/branch/cleanup-merged-proof.ts    | 368 +-------
 .../cleanup-merged-provider-compatibility.ts       | 119 +++
 .../branch/cleanup-merged-provider-rebase.test.ts  | 967 +++++++++++++++++++++
 .../branch/cleanup-merged-provider-receipt.test.ts | 558 ++++++++++++
 .../cleanup-merged-provider-reconciliation.ts      | 439 ++++++++++
 .../branch/cleanup-merged-targeted-proof.ts        | 446 ++++++++++
 .../branch/cleanup-merged.targeted.test.ts         |   6 +-
 .../src/commands/branch/cleanup-merged.ts          |  24 +-
 .../commands/branch/work-start.hook-shim.test.ts   |  36 +-
 .../src/commands/branch/work-start.materialize.ts  |  36 +-
 .../agentplane/src/commands/flow/repair.command.ts |  23 +
 packages/agentplane/src/commands/shared/git-ops.ts |  22 +-
 .../commands/shared/merged-branch-cleanup.test.ts  |  28 +
 .../src/commands/shared/merged-branch-cleanup.ts   |  19 +-
 .../src/commands/shared/route-decision-blockers.ts |  35 +-
 .../shared/route-decision-worktree-cleanliness.ts  |  49 ++
 .../src/commands/shared/route-decision.ts          |  25 +-
 .../src/commands/shared/side-effect-authority.ts   |   1 +
 .../shared/task-backend-branch-snapshot.ts         |  17 +-
 .../task-backend-branch-snapshot.unit.test.ts      |  70 ++
 .../agentplane/src/commands/shared/task-backend.ts |   4 +
 ...task-worktree-foreign-artifact-history-proof.ts | 235 +++++
 ...sk-worktree-foreign-artifact-lifecycle-proof.ts | 286 ++++++
 ...sk-worktree-foreign-artifact-provenance.test.ts | 152 ++++
 .../task-worktree-foreign-artifact-repair.test.ts  | 965 ++++++++++++++++++++
 .../task-worktree-foreign-artifact-repair.ts       | 477 ++++++++++
 .../shared/task-worktree-foreign-artifact-route.ts |  53 ++
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   1 +
 .../shared/workflow-operation-projection.ts        |   3 +
 .../src/commands/shared/workflow-step-branch.ts    |  15 +-
 .../src/commands/shared/workflow-step-factory.ts   |  21 +
 .../commands/shared/workflow-step-fingerprint.ts   |   1 +
 .../workflow-step-foreign-task-readme-repair.ts    |  23 +
 .../src/commands/shared/workflow-step.ts           |   9 +-
 .../agentplane/src/commands/task/active.command.ts | 104 +--
 .../src/commands/task/active.command.unit.test.ts  |  76 ++
 .../task/branch-task-supervisor-operations.ts      |  15 +
 .../src/commands/task/close-tail-state.test.ts     |  24 +-
 .../src/commands/task/close-tail-state.ts          |  18 +-
 .../usecases/task-run-active-claim-inspection.ts   |  30 +
 .../task-run-active-claim-readonly.test.ts         |  33 +
 .../src/runner/usecases/task-run-active-claim.ts   |   4 +-
 ...ask-worktree-foreign-artifact-repair-fixture.ts | 361 ++++++++
 packages/core/src/git/git-client.ts                |  28 +-
 packages/core/src/git/git-diff.ts                  |  32 +-
 packages/core/src/git/index.ts                     |   3 +
 scripts/README.md                                  |   1 +
 scripts/baselines/knip-baseline.json               |  66 +-
 51 files changed, 5851 insertions(+), 528 deletions(-)
```

</details>
