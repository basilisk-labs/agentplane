# PR Review

Created: 2026-07-24T09:04:17.490Z

## Task

- Task: `202607221848-0ZAB1F`
- Title: Introduce StateFingerprint and stale-state rejection
- Status: DONE
- Branch: `task/202607221848-0ZAB1F/introduce-statefingerprint-and-stale-state-rejec`
- Canonical task record: `.agentplane/tasks/202607221848-0ZAB1F/README.md`

## Verification

- State: ok
- Note: Exact SHA f0a65ee70d7e10818921498c6f5400ff8fe9b536: RF06 271/271, critical CLI 71/71, full fast 3035/3035, typecheck, ESLint, lifecycle invariants, ci:contract, compatibility and offline provider replay passed; independent audit found no P0/P1.
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
 packages/agentplane/src/commands/backend.test.ts   | 103 +++
 packages/agentplane/src/commands/backend.ts        | 114 ++-
 .../src/commands/backend/sync.command.ts           |   4 +
 .../src/commands/shared/backend-sync-options.ts    |  18 +
 packages/agentplane/src/commands/sync.command.ts   |   4 +
 .../agentplane/src/runner/adapters/shared.test.ts  |  32 +
 packages/agentplane/src/runner/adapters/shared.ts  |  14 +-
 packages/agentplane/src/runner/artifacts.ts        |  26 +-
 .../src/runner/context/base-prompt-sources.ts      |  49 +-
 .../src/runner/context/base-prompts.test.ts        |  32 +-
 .../agentplane/src/runner/context/task-context.ts  |   8 +-
 .../agentplane/src/runner/preparation-record.ts    |  63 ++
 .../src/runner/result-manifest-artifacts.ts        |   2 +-
 .../agentplane/src/runner/result-manifest.test.ts  |  34 +
 .../agentplane/src/runner/run-record-profile.ts    |   4 +
 .../src/runner/run-repository-compat.test.ts       | 230 ++++-
 .../src/runner/run-repository-contract.test.ts     | 258 ++++++
 .../src/runner/run-repository-contract.ts          | 178 +++-
 .../agentplane/src/runner/run-repository.test.ts   |  46 +
 packages/agentplane/src/runner/run-repository.ts   |  47 +-
 .../src/runner/run-state-validation.test.ts        | 672 ++++++++++++++
 .../agentplane/src/runner/run-state-validation.ts  | 390 ++++++++
 .../src/runner/runner-result-validation.test.ts    | 139 +++
 .../src/runner/runner-result-validation.ts         | 294 ++++++
 packages/agentplane/src/runner/stable-file.ts      | 210 +----
 .../src/runner/state-fingerprint-authority.ts      | 265 ++++++
 .../runner/state-fingerprint-backend-projection.ts | 273 ++++++
 .../state-fingerprint-cloud-projection.test.ts     | 759 ++++++++++++++++
 .../src/runner/state-fingerprint-observation.ts    | 542 +++++++++++
 .../src/runner/state-fingerprint-policy.ts         | 144 +++
 .../runner/state-fingerprint-projections.test.ts   | 981 ++++++++++++++++++++
 .../runner/state-fingerprint-recipe-assets.test.ts | 136 +++
 .../src/runner/state-fingerprint-recipe-assets.ts  | 186 ++++
 ...te-fingerprint-residual-git.integration.test.ts | 727 +++++++++++++++
 .../src/runner/state-fingerprint.test.ts           | 464 ++++++++++
 .../src/runner/state-fingerprint.testkit.ts        | 311 +++++++
 .../agentplane/src/runner/state-fingerprint.ts     | 335 +++++++
 .../agentplane/src/runner/task-observation.test.ts |  93 ++
 packages/agentplane/src/runner/task-observation.ts |  45 +
 packages/agentplane/src/runner/task-state.test.ts  |  30 +-
 packages/agentplane/src/runner/task-state.ts       | 312 +++++--
 packages/agentplane/src/runner/types.ts            |   1 +
 packages/agentplane/src/runner/types/context.ts    |   4 +
 packages/agentplane/src/runner/types/state.ts      |  25 +
 .../usecases/task-run-active-claim-authority.ts    |  88 +-
 .../task-run-active-claim-history-safe.test.ts     | 908 +++++++++++++++++++
 .../runner/usecases/task-run-active-claim-owner.ts |  12 +
 .../task-run-active-claim-reconciliation.test.ts   | 107 +++
 .../usecases/task-run-active-claim-record.ts       |  16 +-
 .../usecases/task-run-active-claim-runtime.ts      | 140 ++-
 .../runner/usecases/task-run-active-claim.test.ts  |  31 +-
 .../usecases/task-run-active-claim.testkit.ts      |  60 ++
 .../src/runner/usecases/task-run-active-claim.ts   |  43 +-
 .../usecases/task-run-context.integration.test.ts  |   2 +
 .../usecases/task-run-effect-in-doubt-claim.ts     |  76 ++
 ...sk-run-lifecycle-cancel-effect-in-doubt.test.ts | 570 ++++++++++++
 .../usecases/task-run-lifecycle-cancel.test.ts     |  12 +-
 .../runner/usecases/task-run-lifecycle-cancel.ts   |  58 +-
 .../task-run-lifecycle-replay-provenance.test.ts   |   6 +-
 .../task-run-lifecycle-replay-security.test.ts     |  50 +-
 .../runner/usecases/task-run-lifecycle-replay.ts   |  31 +-
 .../runner/usecases/task-run-lifecycle-shared.ts   |  22 +
 .../src/runner/usecases/task-run-lifecycle.test.ts |   2 +
 .../runner/usecases/task-run-lifecycle.testkit.ts  |  18 +
 .../usecases/task-run-missing-state-authority.ts   |  35 +
 .../usecases/task-run-orphaned-effect-guard.ts     | 259 ++++++
 ...task-run-recipe-write-scope.integration.test.ts | 130 ++-
 .../src/runner/usecases/task-run-refusal.ts        |  64 ++
 .../src/runner/usecases/task-run-replay-anchor.ts  | 114 +++
 .../task-run-state-fingerprint-persistence.ts      | 240 +++++
 ...tate-fingerprint-post-state.integration.test.ts | 162 ++++
 ...e-fingerprint-runner-config.integration.test.ts | 238 +++++
 .../task-run-state-fingerprint.integration.test.ts | 933 +++++++++++++++++++
 .../runner/usecases/task-run-state-fingerprint.ts  | 489 ++++++++++
 .../usecases/task-run-supervisor-history-anchor.ts | 369 ++++++++
 .../agentplane/src/runner/usecases/task-run.ts     | 303 ++++---
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
 138 files changed, 22597 insertions(+), 1271 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
