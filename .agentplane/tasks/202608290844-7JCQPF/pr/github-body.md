Task: `202608290844-7JCQPF`
Title: Allow state-bound WorkItem implementation results to reopen DONE tasks
Canonical task record: `.agentplane/tasks/202608290844-7JCQPF/README.md`

## Summary

Allow state-bound WorkItem implementation results to reopen DONE tasks

Fix the confirmed PR #5870 review blocker without weakening ordinary DONE-task protections. When an approved required WorkItem is scheduled on a DONE task and purpose=implementation produces a new commit, authorize DONE to DOING only when the work order is bound to a concrete work_item_id. Preserve implementation_rework behavior and keep ordinary task-level implementation unable to reopen DONE. Add unit coverage and a real task-advance regression proving the new WorkItem result completes and proceeds to verification. This task is a prerequisite for resuming J595R5 integration; do not change schedulers, task stores, checks, or release ordering.

## Scope

- In scope: Fix the confirmed PR #5870 review blocker without weakening ordinary DONE-task protections. When an approved required WorkItem is scheduled on a DONE task and purpose=implementation produces a new commit, authorize DONE to DOING only when the work order is bound to a concrete work_item_id. Preserve implementation_rework behavior and keep ordinary task-level implementation unable to reopen DONE. Add unit coverage and a real task-advance regression proving the new WorkItem result completes and proceeds to verification. This task is a prerequisite for resuming J595R5 integration; do not change schedulers, task stores, checks, or release ordering.
- Out of scope: unrelated refactors not required for "Allow state-bound WorkItem implementation results to reopen DONE tasks".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-29T09:15:22.865Z
- Branch: task/202608290844-7JCQPF/allow-state-bound-workitem-implementation-result
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |   1 +
 packages/agentplane/assets/policy/incidents.md     |   1 +
 ...n-cli.core.task-advance-effect-recovery.test.ts |  23 +--
 ...n-cli.core.task-advance.branch-worktree.test.ts |  35 +++++
 .../shared/task-scope-extension-request.ts         |  19 ++-
 .../external-agent-implementation-authority.ts     |  32 +++--
 .../src/commands/task/scope-extend.test.ts         | 156 ++++++++++++++++++++-
 7 files changed, 225 insertions(+), 42 deletions(-)
```

</details>
