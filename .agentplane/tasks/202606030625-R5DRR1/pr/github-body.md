Task: `202606030625-R5DRR1`
Title: Make route context explicit for agent handoffs
Canonical task record: `.agentplane/tasks/202606030625-R5DRR1/README.md`

## Summary

Make route context explicit for agent handoffs

Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.

## Scope

- In scope: Replace ambiguous post-merge, PR artifact, included batch, incident, and release recovery guidance with explicit structured context and next actions so agents do not infer lifecycle state from stale artifacts or prose.
- Out of scope: unrelated refactors not required for "Make route context explicit for agent handoffs".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T06:26:10.916Z
- Branch: task/202606030625-R5DRR1/make-route-context-explicit-for-agent-handoffs
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/release-recovery-script.test.ts        | 10 ++-
 .../cli/run-cli.core.pr-flow.pr-validation.test.ts |  2 +
 .../cli/run-cli.core.route-decision.batch.test.ts  | 58 +++++++++++++
 .../src/cli/run-cli.core.route-decision.test.ts    | 96 ++++++++++++++++++++++
 .../agentplane/src/commands/incidents/shared.ts    |  2 +-
 packages/agentplane/src/commands/pr/check.ts       | 10 +++
 .../commands/pr/internal/pr-artifact-snapshot.ts   |  2 +
 .../src/commands/shared/route-decision-blockers.ts | 39 +++++++++
 .../commands/shared/route-decision-next-action.ts  | 32 ++++++++
 .../src/commands/shared/route-decision.ts          | 74 ++++++++++++++++-
 .../agentplane/src/commands/shared/route-oracle.ts | 16 ++++
 scripts/lib/release-recovery-report.mjs            | 65 ++++++++-------
 12 files changed, 371 insertions(+), 35 deletions(-)
```

</details>
