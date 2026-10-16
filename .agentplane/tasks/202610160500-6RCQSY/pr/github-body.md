Task: `202610160500-6RCQSY`
Title: Expose auditable USER cancellation for withdrawn mandatory scope on started canonical tasks
Canonical task record: `.agentplane/tasks/202610160500-6RCQSY/README.md`

## Summary

Expose auditable USER cancellation for withdrawn mandatory scope on started canonical tasks

Resolve GitHub issue #6146 with a generic explicit public cancellation disposition. Keep close-noop and duplicate guards unchanged. Preserve original plans, claims, accepted and blocked results, validation history, and effect ledger; cancellation is not completion. Bind manual USER reason and approval to exact current task/plan/revision/fingerprint with native CAS and idempotent replay. Refuse active writers/claims/execution and unresolved prepared/pending/in-doubt effects; require reconciliation first. Reject forged or stale approval, missing reason, legacy/foreign state, and late results after cancellation. No consumer cancellation, external provider action, project-specific exception or verification waiver. Include real public CLI and native persistence regressions, independent evaluation, and queued mandatory full. Mutable compatibility candidate/checker may change for new command; immutable baseline must not change.

## Scope

- In scope: Resolve GitHub issue #6146 with a generic explicit public cancellation disposition. Keep close-noop and duplicate guards unchanged. Preserve original plans, claims, accepted and blocked results, validation history, and effect ledger; cancellation is not completion. Bind manual USER reason and approval to exact current task/plan/revision/fingerprint with native CAS and idempotent replay. Refuse active writers/claims/execution and unresolved prepared/pending/in-doubt effects; require reconciliation first. Reject forged or stale approval, missing reason, legacy/foreign state, and late results after cancellation. No consumer cancellation, external provider action, project-specific exception or verification waiver. Include real public CLI and native persistence regressions, independent evaluation, and queued mandatory full. Mutable compatibility candidate/checker may change for new command; immutable baseline must not change.
- Out of scope: unrelated refactors not required for "Expose auditable USER cancellation for withdrawn mandatory scope on started canonical tasks".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-16T05:41:13.733Z
- Branch: task/202610160500-6RCQSY/withdrawn-scope-cancellation
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/adapters/task-backend/kernel-record.ts     |  12 +
 .../src/cli/run-cli/command-catalog/task.ts        | 101 +++-----
 .../src/cli/run-cli/command-loaders/task.ts        |   5 +
 .../agentplane/src/commands/task/cancel.command.ts |  88 +++++++
 .../src/commands/task/kernel-cancellation.test.ts  | 272 +++++++++++++++++++++
 .../src/commands/task/kernel-cancellation.ts       | 239 ++++++++++++++++++
 .../usecases/task-run-active-claim-record.ts       |   5 +-
 .../src/runner/usecases/task-run-active-claim.ts   |   4 +-
 .../src/tasks/task-kernel/cancellation.test.ts     | 156 ++++++++++++
 .../core/src/tasks/task-kernel/cancellation.ts     |  77 ++++++
 packages/core/src/tasks/task-kernel/kernel.ts      |  32 +++
 packages/core/src/tasks/task-kernel/model.ts       |  24 ++
 .../baselines/v0.7-compatibility-candidate.json    | 137 ++++++++++-
 .../check-compatibility-contract-baseline.mjs      |  90 ++++++-
 14 files changed, 1166 insertions(+), 76 deletions(-)
```

</details>
