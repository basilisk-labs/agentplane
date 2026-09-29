Task: `202609071541-47TFVD`
Title: Propagate approved CI scope to external implementation commit guards
Canonical task record: `.agentplane/tasks/202609071541-47TFVD/README.md`

## Summary

Propagate approved CI scope to external implementation commit guards

User approved this bounded recovery on 2026-09-07: repair the allowCI false defect blocking task 202609071444-7MNJXE and continue that task. Change external-agent-implementation-authority.ts and extend external-agent-implementation-recovery.test.ts. Permit CI commit guard access only after current WorkOrder scope validation and when the approved task execution contract allows the ci effect. Preserve rejection of unapproved protected paths. No external writes. This separate recovery task is needed because the original task is trapped in worktree resolution after commit rejection.

## Scope

- In scope: User approved this bounded recovery on 2026-09-07: repair the allowCI false defect blocking task 202609071444-7MNJXE and continue that task. Change external-agent-implementation-authority.ts and extend external-agent-implementation-recovery.test.ts. Permit CI commit guard access only after current WorkOrder scope validation and when the approved task execution contract allows the ci effect. Preserve rejection of unapproved protected paths. No external writes. This separate recovery task is needed because the original task is trapped in worktree resolution after commit rejection.
- Out of scope: unrelated refactors not required for "Propagate approved CI scope to external implementation commit guards".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T15:48:53.177Z
- Branch: task/202609071541-47TFVD/propagate-approved-ci-scope-to-external-implemen
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../external-agent-implementation-authority.ts     | 25 +++++--
 .../external-agent-implementation-recovery.test.ts | 84 ++++++++++++++++++++++
 2 files changed, 105 insertions(+), 4 deletions(-)
```

</details>
