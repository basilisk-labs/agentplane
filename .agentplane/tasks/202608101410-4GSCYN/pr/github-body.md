Task: `202608101410-4GSCYN`
Title: Stop external-agent replay after a typed blocked result
Canonical task record: `.agentplane/tasks/202608101410-4GSCYN/README.md`

## Summary

Stop external-agent replay after a typed blocked result

When an external EXECUTOR returns a valid state-bound blocked semantic result, consume that envelope exactly once, persist the blocker as task state and evidence, and return a non-episode boundary. Do not issue another implementation envelope until an operator deliberately resolves the blocker and resumes the task. Preserve completed-result behavior and exact replay idempotency.

## Scope

- In scope: When an external EXECUTOR returns a valid state-bound blocked semantic result, consume that envelope exactly once, persist the blocker as task state and evidence, and return a non-episode boundary. Do not issue another implementation envelope until an operator deliberately resolves the blocker and resumes the task. Preserve completed-result behavior and exact replay idempotency.
- Out of scope: unrelated refactors not required for "Stop external-agent replay after a typed blocked result".

## Verification

- State: ok
- Note:

```text
Verified: blocked-result lifecycle, replay idempotency, explicit resume, routing, types, lint,
formatting, and critical CLI coverage all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-10T14:32:23.093Z
- Branch: task/202608101410-4GSCYN/stop-external-agent-replay-after-a-typed-blocked
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-advance.test.ts      | 153 ++++++++++++++++++++-
 .../src/commands/shared/workflow-step-branch.ts    |  15 ++
 .../external-agent-implementation-authority.ts     |  64 +++++++++
 3 files changed, 231 insertions(+), 1 deletion(-)
```

</details>
