Task: `202609081927-P1MJV7`
Title: Reduce redundant recovery episodes and exchange data
Canonical task record: `.agentplane/tasks/202609081927-P1MJV7/README.md`

## Summary

Reduce redundant recovery episodes and exchange data

Implement the three USER-approved follow-up optimizations: classify confirmed verification infrastructure failures and resume CLI-owned checks without a new implementation episode or artificial file change; deliver only required or changed context blocks when retention is explicitly confirmed in the same live session, with full context after restart or loss; reuse the existing verified content-addressed evidence store for external result schemas while preserving historical exchanges. Preserve authority, state freshness, independent review, and negative failure behavior. Add focused regression and measurement coverage and run required local verification. Preserve unrelated tasks and do not push, publish, or merge without separate approval.

## Scope

- In scope: Implement the three USER-approved follow-up optimizations: classify confirmed verification infrastructure failures and resume CLI-owned checks without a new implementation episode or artificial file change; deliver only required or changed context blocks when retention is explicitly confirmed in the same live session, with full context after restart or loss; reuse the existing verified content-addressed evidence store for external result schemas while preserving historical exchanges. Preserve authority, state freshness, independent review, and negative failure behavior. Add focused regression and measurement coverage and run required local verification. Preserve unrelated tasks and do not push, publish, or merge without separate approval.
- Out of scope: unrelated refactors not required for "Reduce redundant recovery episodes and exchange data".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-08T20:43:34.610Z
- Branch: task/202609081927-P1MJV7/reduce-redundant-recovery-episodes-and-exchange
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...li.core.task-advance.clean-verification.test.ts |  53 +++++-
 .../src/cli/run-cli.core.task-advance.test.ts      |   5 +-
 .../src/commands/shared/workflow-step-branch.ts    |  22 +++
 .../shared/workflow-step-hosted-close.test.ts      |  23 +++
 .../src/commands/task/advance.command.ts           |   6 +-
 .../task/branch-task-supervisor-episodes.ts        |  25 ++-
 .../commands/task/branch-task-supervisor.test.ts   | 151 +---------------
 .../commands/task/branch-task-verification.test.ts | 193 +++++++++++++++++++++
 .../task/direct-task-verification-record.ts        | 114 ++++++++++++
 .../commands/task/direct-task-verification.test.ts |  67 +++----
 .../src/commands/task/direct-task-verification.ts  | 112 ++----------
 .../task/external-agent-exchange-authority.ts      |   3 +-
 .../commands/task/external-agent-exchange.test.ts  |  94 +++++++++-
 .../src/commands/task/external-agent-exchange.ts   | 114 +++++++++---
 .../src/commands/task/external-agent-supervisor.ts |   4 +-
 .../task/verification-infrastructure.test.ts       | 144 +++++++++++++++
 .../commands/task/verification-infrastructure.ts   | 144 +++++++++++++++
 .../src/runner/adapters/prepared-input.ts          |   7 +-
 .../src/runner/context/task-context.test.ts        |  59 ++++++-
 .../src/runner/context/work-order-context.ts       |  35 +++-
 .../src/runner/usecases/task-run-bootstrap.ts      |  35 +++-
 scripts/baselines/protocol-followup-P1MJV7.json    |  61 +++++++
 22 files changed, 1134 insertions(+), 337 deletions(-)
```

</details>
