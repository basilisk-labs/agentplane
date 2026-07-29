# PR Review

Created: 2026-07-29T11:49:50.615Z

## Task

- Task: `202607291148-1F9GZD`
- Title: Formalize SHA-bound qualification packets for evaluator review
- Status: DOING
- Branch: `task/202607291148-1F9GZD/formalize-sha-bound-qualification-packets-for-ev`
- Canonical task record: `.agentplane/tasks/202607291148-1F9GZD/README.md`

## Verification

- State: needs_rework
- Note: Focused evaluator suite passed at implementation SHA 17e0f8f246d207483014ac16ec43af657296b9fb; ci:contract is blocked by a clone baseline mismatch already present at parent SHA ffbac377111bfa09810b5ca5f8fb3b8fd5458315.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T11:50:58.033Z
- Branch: task/202607291148-1F9GZD/formalize-sha-bound-qualification-packets-for-ev
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-qualification-packet.test.ts         | 581 +++++++++++++++++++++
 .../evaluator/evaluator-qualification-review.ts    |  52 ++
 .../evaluator/evaluator-review-artifacts.ts        |   3 +-
 .../commands/evaluator/evaluator-review-shared.ts  |  20 +
 .../commands/evaluator/evaluator-review-usecase.ts |  76 +--
 .../evaluator/evaluator-run.command.test.ts        |  72 +--
 .../commands/evaluator/evaluator-test-helpers.ts   |  72 +++
 .../evaluator/evaluator-verification-records.ts    |  17 +-
 .../src/commands/shared/verification-details.ts    |  36 ++
 .../task/qualification-packet-artifacts.ts         |  70 +++
 .../task/qualification-packet-dependencies.ts      |  57 ++
 .../src/commands/task/qualification-packet-json.ts |  43 ++
 .../task/qualification-packet-pinned-task.ts       |  91 ++++
 .../src/commands/task/qualification-packet-rf04.ts | 256 +++++++++
 .../src/commands/task/qualification-packet.ts      | 556 ++++++++++++++++++++
 .../src/commands/task/verify-record-execute.ts     |  33 +-
 scripts/baselines/clone-baseline.json              |  61 ++-
 17 files changed, 1941 insertions(+), 155 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
