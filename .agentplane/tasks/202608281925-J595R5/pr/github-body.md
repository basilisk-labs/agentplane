Task: `202608281925-J595R5`
Title: Resume required WorkItems before branch pre-merge closure
Canonical task record: `.agentplane/tasks/202608281925-J595R5/README.md`

## Summary

Resume required WorkItems before branch pre-merge closure

Fix the reproduced release-integration blocker in DVS5NN/PR #5862 on main 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its approved required remove-obsolete-handoff-reader WorkItem is READY with no outputs, while the concrete b577984d implementation and successful verification exist. After supported reopening and fresh evaluator acceptance the route offers task.pre_merge_close; finish rejects required_work_item_incomplete. flow repair has no deterministic repair. Route unfinished required WorkItems through the existing implementation/recovery episode before quality/publication/closure, with no fabricated source delta and no direct task-state edits. Cover the complete scenario: persisted implementation effect, interruption before WorkItem completion, normal restart, exact recovery of the original typed output, repeat restart, required verification/evaluation, and the following closure transition. Preserve completed WorkItem outputs, plan/checkout/authority freshness, dirty-worktree and active-runner guards, and already merged hosted-close/cleanup behavior. Use the existing canonical WorkItem scheduler and recorded implementation recovery; do not introduce another scheduler or state store. Do not weaken checks, completion guards or approvals; do not change release/Core order. Scope the smallest route/supervisor adapters and regression tests through a structured plan; request a supported scope extension only if reproduction proves more is required. USER authorized all necessary in-scope operations through release 0.7.8; this is an integration-path blocker, not a new architecture program.

## Scope

- In scope: Fix the reproduced release-integration blocker in DVS5NN/PR #5862 on main 3bcce289091f5e6cbcb1dea87c2964c4f559259d. Its approved required remove-obsolete-handoff-reader WorkItem is READY with no outputs, while the concrete b577984d implementation and successful verification exist. After supported reopening and fresh evaluator acceptance the route offers task.pre_merge_close; finish rejects required_work_item_incomplete. flow repair has no deterministic repair. Route unfinished required WorkItems through the existing implementation/recovery episode before quality/publication/closure, with no fabricated source delta and no direct task-state edits. Cover the complete scenario: persisted implementation effect, interruption before WorkItem completion, normal restart, exact recovery of the original typed output, repeat restart, required verification/evaluation, and the following closure transition. Preserve completed WorkItem outputs, plan/checkout/authority freshness, dirty-worktree and active-runner guards, and already merged hosted-close/cleanup behavior. Use the existing canonical WorkItem scheduler and recorded implementation recovery; do not introduce another scheduler or state store. Do not weaken checks, completion guards or approvals; do not change release/Core order. Scope the smallest route/supervisor adapters and regression tests through a structured plan; request a supported scope extension only if reproduction proves more is required. USER authorized all necessary in-scope operations through release 0.7.8; this is an integration-path blocker, not a new architecture program.
- Out of scope: unrelated refactors not required for "Resume required WorkItems before branch pre-merge closure".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-28T20:50:35.231Z
- Branch: task/202608281925-J595R5/resume-required-workitems-before-branch-pre-merg
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.task-advance.required-work.test.ts | 276 +++++++++++++++++++++
 .../evaluator-episode.calibration.test.ts          |  85 ++++++-
 .../src/commands/shared/workflow-step-branch.ts    |  28 +--
 .../shared/workflow-step-required-work.test.ts     | 221 +++++++++++++++++
 .../commands/shared/workflow-step-required-work.ts |  99 ++++++++
 5 files changed, 688 insertions(+), 21 deletions(-)
```

</details>
