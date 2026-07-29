Task: `202607291148-1F9GZD`
Title: Formalize SHA-bound qualification packets for evaluator review
Canonical task record: `.agentplane/tasks/202607291148-1F9GZD/README.md`

## Summary

Formalize SHA-bound qualification packets for evaluator review

Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.

## Scope

- In scope: Generate and freeze a deterministic qualification packet for metadata-only milestone gates: bind every recorded check to one reviewed SHA, prove per-dependency verification/evaluator/hosted-close closure, and expose baseline-versus-current RF-04 success, rework, safety, token, and latency values to the EVALUATOR work order. This follow-up is required by the beta.1 evaluator rework artifacts of 202607221908-MR9EA9.
- Out of scope: unrelated refactors not required for "Formalize SHA-bound qualification packets for evaluator review".

## Verification

- State: ok
- Note: Verified 8a94a0a: qualification evidence traverses terminal dependency leaves.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T11:50:58.033Z
- Branch: task/202607291148-1F9GZD/formalize-sha-bound-qualification-packets-for-ev
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-qualification-packet.test.ts         | 545 +++++++++++++++++++
 .../evaluator/evaluator-qualification-review.ts    |  52 ++
 .../evaluator/evaluator-review-artifacts.ts        |   3 +-
 .../commands/evaluator/evaluator-review-usecase.ts |  47 +-
 .../evaluator/evaluator-run.command.test.ts        |  72 +--
 .../commands/evaluator/evaluator-test-helpers.ts   |  72 +++
 .../evaluator/evaluator-verification-records.ts    |  17 +-
 .../src/commands/shared/verification-details.ts    |  36 ++
 .../task/qualification-packet-artifacts.ts         |  70 +++
 .../task/qualification-packet-dependencies.ts      |  51 ++
 .../src/commands/task/qualification-packet-json.ts |  43 ++
 .../src/commands/task/qualification-packet-rf04.ts | 256 +++++++++
 .../src/commands/task/qualification-packet.ts      | 592 +++++++++++++++++++++
 .../src/commands/task/verify-record-execute.ts     |  33 +-
 14 files changed, 1784 insertions(+), 105 deletions(-)
```

</details>
