# PR Review

Created: 2026-04-08T19:59:13.153Z
Branch: task/202604081931-J2NC32/verify-collect-incidents

## Summary

Add explicit verify incident collection path

Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.

## Scope

- In scope: Add an explicit verify flag that records structured findings and immediately runs incidents collection so operators can update incidents.md in one command when desired.
- Out of scope: unrelated refactors not required for "Add explicit verify incident collection path".

## Verification

### Plan

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Focused verify/incidents tests passed; eslint passed on touched verify command files; cli-reference was regenerated and freshness check now passes.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-08T20:02:55.268Z
- Branch: task/202604081931-J2NC32/verify-collect-incidents
- Head: 82cae319625f

```text
 .agentplane/tasks/202604081931-J2NC32/README.md    | 112 +++++++++++++++++
 .../tasks/202604081931-J2NC32/pr/diffstat.txt      |   0
 .../tasks/202604081931-J2NC32/pr/github-body.md    |  52 ++++++++
 .../tasks/202604081931-J2NC32/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604081931-J2NC32/pr/meta.json |  14 +++
 .../tasks/202604081931-J2NC32/pr/notes.jsonl       |   0
 .agentplane/tasks/202604081931-J2NC32/pr/review.md |  59 +++++++++
 .../tasks/202604081931-J2NC32/pr/verify.log        |   0
 docs/user/cli-reference.generated.mdx              |   9 ++
 .../src/cli/run-cli.core.incidents.test.ts         | 139 +++++++++++++++++++++
 .../src/commands/task/verify-command-shared.ts     |   9 ++
 .../src/commands/task/verify-ok.command.ts         |   1 +
 .../agentplane/src/commands/task/verify-record.ts  |  22 +++-
 .../src/commands/task/verify-record.unit.test.ts   |  87 +++++++++++++
 .../src/commands/task/verify-rework.command.ts     |   1 +
 packages/agentplane/src/commands/verify.run.ts     |   1 +
 packages/agentplane/src/commands/verify.spec.ts    |  11 ++
 17 files changed, 517 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
