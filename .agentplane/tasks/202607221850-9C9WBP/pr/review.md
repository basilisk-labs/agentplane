# PR Review

Created: 2026-07-27T21:31:31.669Z

## Task

- Task: `202607221850-9C9WBP`
- Title: Normalize runner task inputs into TaskEpisodeView
- Status: DOING
- Branch: `task/202607221850-9C9WBP/normalize-runner-task-inputs-into-taskepisodevie`
- Canonical task record: `.agentplane/tasks/202607221850-9C9WBP/README.md`

## Verification

- State: needs_rework
- Note: Hosted verify-unit failed on 80955ecf: legacy partial RunnerTaskContext fixtures trigger TypeError through task?.metadata access in effect-operation and overlay prompt paths.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T21:32:51.170Z
- Branch: task/202607221850-9C9WBP/normalize-runner-task-inputs-into-taskepisodevie
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |   1 +
 packages/agentplane/assets/policy/incidents.md     |   1 +
 .../src/commands/hermes/hermes-runtime.ts          |   2 +-
 .../agentplane/src/commands/task/brief-model.ts    |   4 +-
 .../src/runner/adapters/codex-preparation.ts       |   4 +-
 .../src/runner/adapters/custom-preparation.ts      |   4 +-
 .../src/runner/adapters/custom-security.test.ts    |   6 +-
 .../agentplane/src/runner/adapters/custom.test.ts  |   4 +-
 .../adapters/execution-receipt-runtime.test.ts     |   4 +-
 .../runner/adapters/execution-receipt-runtime.ts   |   4 +-
 packages/agentplane/src/runner/artifacts.test.ts   |  55 +++--
 .../src/runner/context/base-prompts.test.ts        |  36 ++--
 .../src/runner/context/overlay-prompt-blocks.ts    |  13 +-
 .../src/runner/context/task-context.test.ts        | 139 +++++++++++--
 .../agentplane/src/runner/context/task-context.ts  | 222 ++++++++++++++-------
 .../src/runner/effect-operation-contract.ts        |   2 +-
 packages/agentplane/src/runner/playbooks.ts        |   8 +-
 .../src/runner/run-repository-contract.ts          |   3 +-
 packages/agentplane/src/runner/run-repository.ts   |   2 +-
 packages/agentplane/src/runner/sandbox-policy.ts   |  20 +-
 .../src/runner/state-fingerprint-observation.ts    |  11 +-
 ...te-fingerprint-residual-git.integration.test.ts |   2 +-
 .../src/runner/state-fingerprint.testkit.ts        |  54 ++++-
 .../agentplane/src/runner/state-fingerprint.ts     |   2 +-
 packages/agentplane/src/runner/task-state.ts       |   2 +-
 packages/agentplane/src/runner/types.ts            |   3 +
 packages/agentplane/src/runner/types/context.ts    |  71 ++++++-
 .../src/runner/usecases/agent-work-order-build.ts  |  46 +++--
 .../usecases/agent-work-order.integration.test.ts  |   2 +-
 .../src/runner/usecases/agent-work-order.ts        |   2 +-
 .../usecases/task-run-active-claim-runtime.ts      |   2 +-
 .../src/runner/usecases/task-run-authority.ts      |   8 +-
 .../task-run-blueprint-plan.security.test.ts       |   4 +-
 .../src/runner/usecases/task-run-blueprint-plan.ts |   2 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |   2 +-
 .../usecases/task-run-context.integration.test.ts  |   4 +-
 .../runner/usecases/task-run-lifecycle-cancel.ts   |   4 +-
 .../task-run-lifecycle-replay-security.test.ts     |   2 +-
 .../src/runner/usecases/task-run-replay-anchor.ts  |   2 +-
 .../task-run-state-fingerprint.integration.test.ts |   2 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   6 +-
 packages/agentplane/src/runner/write-scope.test.ts |   6 +-
 packages/testkit/src/runner.ts                     |  65 ++++--
 scripts/baselines/trust-boundary-violations.json   |  90 ---------
 44 files changed, 607 insertions(+), 321 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
