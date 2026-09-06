# PR Review

Created: 2026-09-06T11:45:32.878Z

## Task

- Task: `202609060720-NZXQ0E`
- Title: Recover an interrupted integration queue supervisor intent before semantic rework
- Status: DONE
- Branch: `task/202609060720-NZXQ0E/recover-an-interrupted-integration-queue-supervi`
- Canonical task record: `.agentplane/tasks/202609060720-NZXQ0E/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-06T14:11:03.968Z
- Branch: task/202609060720-NZXQ0E/recover-an-interrupted-integration-queue-supervi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   1 +
 docs/user/task-lifecycle.mdx                       |  56 ++
 ...n-cli.core.task-advance-effect-recovery.test.ts |  59 ++-
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../cli/task-advance-effect-recovery.testkit.ts    | 126 ++++-
 .../src/cli/workflow-effect-recovery.testkit.ts    | 570 +++++++++++++++++++++
 .../shared/supervisor-execution-episode.test.ts    |  74 +++
 .../shared/supervisor-execution-episode.ts         |  13 +
 .../src/commands/task/advance.command.ts           |  26 +
 .../agentplane/src/commands/task/advance.spec.ts   |  12 +
 .../task/external-agent-supervisor-recovery.ts     |   2 +
 .../task/external-agent-workflow-recovery.ts       | 408 +++++++++++++++
 .../runner/supervisor-execution-episode.test.ts    |  56 ++
 .../src/runner/supervisor-execution-episode.ts     |  44 ++
 .../baselines/v0.7-compatibility-candidate.json    |  31 +-
 .../check-compatibility-contract-baseline.mjs      |  15 +
 website/static/llms-full.txt                       |  56 ++
 17 files changed, 1534 insertions(+), 22 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
