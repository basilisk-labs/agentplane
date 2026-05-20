Task: `202605200641-P7R67H`
Title: Implement observation harvest and follow-up gates
Canonical task record: `.agentplane/tasks/202605200641-P7R67H/README.md`

## Summary

Implement observation harvest and follow-up gates

Implement the recent follow-ups from task execution logs: harvest task observations into actionable queues, align runtime log surface, harden cold-start retry/reporting, fix docs social image drift, gate release readiness on blocking observations, and prepare branch protection for the new PR verification aggregate.

## Scope

- In scope: Implement the recent follow-ups from task execution logs: harvest task observations into actionable queues, align runtime log surface, harden cold-start retry/reporting, fix docs social image drift, gate release readiness on blocking observations, and prepare branch protection for the new PR verification aggregate.
- Out of scope: unrelated refactors not required for "Implement observation harvest and follow-up gates".

## Verification

- State: ok
- Note:

```text
Quality gate passed for implementation commit 93161f991. Reviewed observation harvest CLI, release
observation gating semantics, cold-start retry diagnostics, per-task runs_dir contract alignment,
docs/social-image freshness, and promoted prior handled observations. Local focused tests,
typechecks, website build:check, social-image check, cold-start guard, eslint, policy routing,
doctor, and diff checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T07:27:27.577Z
- Branch: task/202605200641-P7R67H/observations-followup-gates
- Head: 76fec02e24d3

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .../tasks/202605191736-EQBZ4M/observations.jsonl   |   4 +-
 .../blueprint/resolved-snapshot.json               | 456 +++++++++++++++++++++
 docs/reference/task-observations.mdx               |  13 +-
 .../src/cli/check-cli-cold-baseline-script.test.ts |   2 +
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../release/task-registry-ready-script.test.ts     | 101 ++++-
 .../src/commands/task/observations.command.ts      |  57 ++-
 .../agentplane/src/commands/task/observations.ts   |  55 ++-
 .../src/commands/task/observations.unit.test.ts    | 114 +++++-
 packages/agentplane/src/workflow-runtime/build.ts  |   2 +-
 .../src/workflow-runtime/validate.test.ts          |   2 +-
 packages/core/src/config/workflow-file.ts          |   2 +-
 scripts/checks/check-cli-cold-baseline.mjs         |  10 +
 scripts/checks/check-task-state.mjs                |  55 +++
 .../static/img/social/docs/reference/evidence.png  | Bin 0 -> 46086 bytes
 .../social/docs/reference/task-observations.png    | Bin 0 -> 49596 bytes
 18 files changed, 872 insertions(+), 14 deletions(-)
```

</details>
