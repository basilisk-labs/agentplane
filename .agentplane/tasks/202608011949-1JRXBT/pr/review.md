# PR Review

Created: 2026-08-01T22:10:12.728Z

## Task

- Task: `202608011949-1JRXBT`
- Title: Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7
- Status: DOING
- Branch: `task/202608011949-1JRXBT/assimilate-v0-6-25-v0-6-26-maintenance-fixes-int`
- Canonical task record: `.agentplane/tasks/202608011949-1JRXBT/README.md`

## Verification

- State: ok
- Note: Verified c288fab658399b7ecadb2bd5a50bbd0e021ab29d: focused unit suite 49/49; direct-closeout CLI 5/5; TypeScript typecheck passed; critical CLI 12/12 chunks passed; full ci:contract passed including RF-04 50-run baseline, architecture, lint, clone, knip, and coverage; ci:local:fast passed; task-state closure passed with 72 required tasks. Diff audit against v0.6.25-v0.6.26 ports terminal direct verification, immutable-head diffstat, streamed bounded verification output, and runtime provenance isolation; obsolete cleanup-race patch was not ported because 0.7 cleanup is stronger. Residual risk: hosted CI remains pending and is handled by the branch_pr hosted-check gate.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T22:10:49.357Z
- Branch: task/202608011949-1JRXBT/assimilate-v0-6-25-v0-6-26-maintenance-fixes-int
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221908-83Y4AF/README.md    |   4 +-
 docs/internal/v0.7-refactor-plan.md                |   5 +-
 docs/internal/v0.7-release-task-closure.json       |   5 +-
 ...cli.core.route-decision.direct-closeout.test.ts | 131 +++++++++++++++++-
 .../pr/integrate/internal/finalize.test.ts         |   1 +
 .../src/commands/pr/integrate/internal/finalize.ts |   2 +-
 .../src/commands/pr/integrate/verify.test.ts       |  49 +++++++
 .../agentplane/src/commands/pr/integrate/verify.ts |   9 ++
 .../agentplane/src/commands/shared/pr-meta.test.ts | 122 ++++++++++++++--
 .../src/commands/shared/pr-meta/verify-log.ts      | 154 +++++++++++++++++++--
 .../src/commands/shared/task-handoff.test.ts       |  36 +++++
 .../agentplane/src/commands/shared/task-handoff.ts |   2 +-
 .../shared/workflow-operation-projection.ts        |   3 -
 .../src/commands/shared/workflow-step-factory.ts   |  27 +++-
 .../src/commands/shared/workflow-step.ts           |   1 -
 .../task/direct-task-supervisor-closeout.ts        |   9 +-
 16 files changed, 521 insertions(+), 39 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
