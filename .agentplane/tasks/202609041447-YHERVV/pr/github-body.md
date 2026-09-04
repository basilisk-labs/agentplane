Task: `202609041447-YHERVV`
Title: Unblock verification recovery before provider conflict handling
Canonical task record: `.agentplane/tasks/202609041447-YHERVV/README.md`

## Summary

Unblock verification recovery before provider conflict handling

Repair the branch_pr recovery deadlock exposed by task 202609032308-F31YXS. When local verification is missing or needs rework while hosted mergeability context is invalid, route safe local verification or implementation rework before provider conflict handling. Make recordObservedTaskExecutionContract persist legacy and canonical task-centric revisions atomically so successful verification does not fail with Task-centric mutation revision mismatch. Add focused regressions for both exact scenarios, preserve fail-closed provider mutation gates, and integrate this minimal recovery before resuming 202609032308-F31YXS. Exclude MPXQBK, broad projection cleanup, GitLab/provider-neutral expansion, release, version, and publication work.

## Scope

- In scope: Repair the branch_pr recovery deadlock exposed by task 202609032308-F31YXS. When local verification is missing or needs rework while hosted mergeability context is invalid, route safe local verification or implementation rework before provider conflict handling. Make recordObservedTaskExecutionContract persist legacy and canonical task-centric revisions atomically so successful verification does not fail with Task-centric mutation revision mismatch. Add focused regressions for both exact scenarios, preserve fail-closed provider mutation gates, and integrate this minimal recovery before resuming 202609032308-F31YXS. Exclude MPXQBK, broad projection cleanup, GitLab/provider-neutral expansion, release, version, and publication work.
- Out of scope: unrelated refactors not required for "Unblock verification recovery before provider conflict handling".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-04T15:51:50.693Z
- Branch: task/202609041447-YHERVV/unblock-verification-recovery-before-provider-co
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-conflict-rework.test.ts    | 159 +++----------------
 .../shared/workflow-step-conflict-rework.ts        |  12 ++
 ...rkflow-step-projections.conflict-rework.test.ts |  42 +++++
 .../commands/task/direct-task-supervisor.test.ts   |  13 +-
 .../task-execution-contract-observation.test.ts    |  90 ++++++++++-
 .../task/task-execution-contract-observation.ts    | 174 +++++++++++----------
 6 files changed, 268 insertions(+), 222 deletions(-)
```

</details>
