# PR Review

Created: 2026-07-24T09:04:17.490Z

## Task

- Task: `202607221848-0ZAB1F`
- Title: Introduce StateFingerprint and stale-state rejection
- Status: DOING
- Branch: `task/202607221848-0ZAB1F/introduce-statefingerprint-and-stale-state-rejec`
- Canonical task record: `.agentplane/tasks/202607221848-0ZAB1F/README.md`

## Verification

- State: needs_rework
- Note: Implementation is not present yet; the branch contains only generated task, PR, and blueprint artifacts.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-24T09:06:01.731Z
- Branch: task/202607221848-0ZAB1F/introduce-statefingerprint-and-stale-state-rejec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/cloud-backend-integration-plan.mdx  |  12 +
 docs/user/cli-reference.generated.mdx              |   4 +
 ...sk-backend.cloud-projection-observation.test.ts | 211 +++++
 .../task-backend.cloud-pull-safety.test.ts         | 491 ++++++++++
 .../backends/task-backend.cloud-regression.test.ts |  64 +-
 ...task-backend.cloud-remote-create-policy.test.ts |   4 +
 .../task-backend.cloud-snapshot-safety.test.ts     | 987 +++++++++++++++++++++
 .../task-backend.cloud-start-refresh.test.ts       |  50 ++
 .../task-backend.cloud-sync-identity.test.ts       | 585 ++++++++++++
 .../src/backends/task-backend.cloud.test.ts        | 535 +++++------
 .../src/backends/task-backend.load.test.ts         |  67 +-
 .../task-backend.local-containment.test.ts         |  46 +
 .../src/backends/task-backend.revision-cas.test.ts | 112 ++-
 packages/agentplane/src/backends/task-backend.ts   |   3 +
 .../task-backend/cloud-backend-coordination.ts     | 129 +++
 .../backends/task-backend/cloud-backend-inspect.ts |  51 +-
 .../backends/task-backend/cloud-backend-push.ts    | 158 +++-
 .../task-backend/cloud-backend-state.test.ts       | 291 +++++-
 .../backends/task-backend/cloud-backend-state.ts   | 321 ++++++-
 .../backends/task-backend/cloud-backend-sync.ts    | 390 ++++++--
 .../backends/task-backend/cloud-backend-utils.ts   | 193 +++-
 .../src/backends/task-backend/cloud-backend.ts     | 364 ++++++--
 .../backends/task-backend/cloud-cache-effects.ts   | 184 ++++
 .../backends/task-backend/cloud-cache-snapshot.ts  | 231 +++++
 .../task-backend/cloud-mutation-readiness.ts       |  65 +-
 .../backends/task-backend/cloud-pending-push.ts    |  17 +
 .../task-backend/cloud-projection-identity.ts      |  14 +
 .../task-backend/cloud-projection-lock.test.ts     | 234 +++++
 .../backends/task-backend/cloud-projection-lock.ts | 445 ++++++++++
 .../task-backend/cloud-projection-transition.ts    |  53 ++
 .../src/backends/task-backend/cloud-pull.test.ts   | 277 ++++++
 .../src/backends/task-backend/cloud-pull.ts        | 347 +++++++-
 .../backends/task-backend/cloud-start-refresh.ts   |  34 +-
 .../backends/task-backend/cloud-sync-identity.ts   | 171 ++++
 .../agentplane/src/backends/task-backend/load.ts   |  20 +-
 .../backends/task-backend/local-backend-read.ts    |  46 +-
 .../backends/task-backend/local-backend-state.ts   |   2 +-
 .../backends/task-backend/local-backend-write.ts   |  65 +-
 .../src/backends/task-backend/local-backend.ts     | 125 ++-
 .../agentplane/src/backends/task-backend/shared.ts |   3 +
 .../src/backends/task-backend/shared/errors.ts     |   4 +-
 .../src/backends/task-backend/shared/types.ts      |  40 +
 packages/agentplane/src/cli/error-map.test.ts      |  40 +
 packages/agentplane/src/cli/error-map.ts           |   7 +-
 packages/agentplane/src/cli/reason-codes.ts        | 132 +++
 .../src/cli/run-cli.core.backend-sync.test.ts      | 169 +++-
 ...n-cli.core.branch-meta.sync-maintenance.test.ts |   4 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 packages/agentplane/src/commands/backend.test.ts   |  78 ++
 packages/agentplane/src/commands/backend.ts        | 112 ++-
 .../src/commands/backend/sync.command.ts           |   4 +
 .../src/commands/shared/backend-sync-options.ts    |  18 +
 packages/agentplane/src/commands/sync.command.ts   |   4 +
 packages/agentplane/src/runner/artifacts.ts        |  18 +
 .../agentplane/src/runner/context/task-context.ts  |   8 +-
 packages/agentplane/src/runner/stable-file.ts      | 210 +----
 .../src/runner/state-fingerprint-authority.ts      | 101 +++
 .../runner/state-fingerprint-backend-projection.ts | 273 ++++++
 .../state-fingerprint-cloud-projection.test.ts     | 693 +++++++++++++++
 .../src/runner/state-fingerprint-observation.ts    | 580 ++++++++++++
 .../runner/state-fingerprint-projections.test.ts   | 978 ++++++++++++++++++++
 ...te-fingerprint-residual-git.integration.test.ts | 579 ++++++++++++
 .../src/runner/state-fingerprint.test.ts           | 464 ++++++++++
 .../src/runner/state-fingerprint.testkit.ts        | 287 ++++++
 .../agentplane/src/runner/state-fingerprint.ts     | 347 ++++++++
 .../agentplane/src/runner/task-observation.test.ts |  93 ++
 packages/agentplane/src/runner/task-observation.ts |  45 +
 packages/agentplane/src/runner/task-state.test.ts  |  30 +-
 packages/agentplane/src/runner/task-state.ts       | 312 +++++--
 packages/agentplane/src/runner/types.ts            |   1 +
 packages/agentplane/src/runner/types/context.ts    |   3 +
 packages/agentplane/src/runner/types/state.ts      |  25 +
 .../usecases/task-run-active-claim-authority.ts    |  12 +-
 .../usecases/task-run-active-claim-record.ts       |   5 +-
 .../usecases/task-run-active-claim-runtime.ts      |  68 +-
 .../usecases/task-run-context.integration.test.ts  |   2 +
 .../usecases/task-run-effect-in-doubt-claim.ts     |  76 ++
 ...sk-run-lifecycle-cancel-effect-in-doubt.test.ts | 380 ++++++++
 .../usecases/task-run-lifecycle-cancel.test.ts     |  12 +-
 .../runner/usecases/task-run-lifecycle-cancel.ts   |  58 +-
 .../task-run-lifecycle-replay-provenance.test.ts   |   6 +-
 .../task-run-lifecycle-replay-security.test.ts     |  50 +-
 .../runner/usecases/task-run-lifecycle-replay.ts   |   5 -
 .../src/runner/usecases/task-run-lifecycle.test.ts |   2 +
 .../runner/usecases/task-run-lifecycle.testkit.ts  |  18 +
 .../usecases/task-run-orphaned-effect-guard.ts     | 210 +++++
 ...task-run-recipe-write-scope.integration.test.ts |   2 +
 .../src/runner/usecases/task-run-refusal.ts        |  64 ++
 .../src/runner/usecases/task-run-replay-anchor.ts  | 114 +++
 .../task-run-state-fingerprint-persistence.ts      | 236 +++++
 .../task-run-state-fingerprint.integration.test.ts | 933 +++++++++++++++++++
 .../runner/usecases/task-run-state-fingerprint.ts  | 487 ++++++++++
 .../agentplane/src/runner/usecases/task-run.ts     | 285 +++---
 .../src/shared/contained-stable-file.test.ts       | 143 +++
 .../agentplane/src/shared/contained-stable-file.ts | 238 +++++
 packages/agentplane/src/shared/stable-file.ts      | 237 +++++
 .../agentplane/src/shared/write-if-changed.test.ts |  43 +-
 packages/agentplane/src/shared/write-if-changed.ts | 119 ++-
 packages/core/src/fs/atomic-write.test.ts          |  19 +
 packages/core/src/fs/atomic-write.ts               |   6 +
 packages/core/src/index.ts                         |  26 +
 packages/core/src/runner/state-fingerprint.test.ts | 407 +++++++++
 packages/core/src/runner/state-fingerprint.ts      | 451 ++++++++++
 packages/core/src/schemas/index.ts                 |  29 +
 scripts/baselines/knip-baseline.json               |  24 +-
 .../baselines/v0.7-compatibility-candidate.json    |  68 +-
 .../check-compatibility-contract-baseline.mjs      |  62 +-
 107 files changed, 16848 insertions(+), 1116 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
