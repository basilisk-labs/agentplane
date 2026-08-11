Task: `202608111036-QHR892`
Title: Make verification evidence atomic, immediately fresh, and reusable
Canonical task record: `.agentplane/tasks/202608111036-QHR892/README.md`

## Summary

Make verification evidence atomic, immediately fresh, and reusable

Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.

## Scope

- In scope: Eliminate verification self-staleness and repeated checks caused only by AgentPlane lifecycle metadata. Reject incomplete verification evidence before mutation, classify stale reasons precisely, keep semantic evidence reusable across lifecycle-only commits, and route immediately to the next gate after a valid verify command.
- Out of scope: unrelated refactors not required for "Make verification evidence atomic, immediately fresh, and reusable".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T11:23:13.777Z
- Branch: task/202608111036-QHR892/make-verification-evidence-atomic-immediately-fr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  12 +--
 ...un-cli.core.route-decision.verification.test.ts | 111 ++++++++++++++++++++-
 .../commands/shared/task-verification-records.ts   |  15 ++-
 .../shared/task-verification-records.v2.test.ts    |  18 ++++
 .../commands/shared/verification-details.test.ts   |  24 ++++-
 .../src/commands/shared/verification-details.ts    |  59 +++++++----
 .../src/commands/shared/workflow-step-branch.ts    |  11 ++
 .../src/commands/task/verify-command-shared.ts     |   3 +-
 .../src/commands/task/verify-record-execute.ts     |  26 +++++
 .../src/commands/task/verify-record.unit.test.ts   |  49 +++++++++
 packages/agentplane/src/commands/verify.spec.ts    |   9 +-
 11 files changed, 298 insertions(+), 39 deletions(-)
```

</details>
