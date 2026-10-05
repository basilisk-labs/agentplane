Task: `202609300615-DE9AE6`
Title: Document semantic workflow selection and feature delivery ownership; create atomic implementation roadmap
Canonical task record: `.agentplane/tasks/202609300615-DE9AE6/README.md`

## Summary

Document semantic workflow selection and feature delivery ownership; create atomic implementation roadmap

User approved the design: the planning agent proposes direct, isolated delivery, or an existing feature delivery; CLI validates policy and freezes the route before execution. Document delivery ownership, sequential independent tasks in one branch/worktree/PR, explicit escalation, provider-only integration, separate task validation and delivery integration, deterministic recovery, migration, and acceptance scenarios. Create executable atomic implementation tasks with dependencies and acceptance criteria. This task implements documentation and roadmap only. Prepare a reviewed change targeting main. Preserve unrelated repository changes.

## Scope

- In scope: User approved the design: the planning agent proposes direct, isolated delivery, or an existing feature delivery; CLI validates policy and freezes the route before execution. Document delivery ownership, sequential independent tasks in one branch/worktree/PR, explicit escalation, provider-only integration, separate task validation and delivery integration, deterministic recovery, migration, and acceptance scenarios. Create executable atomic implementation tasks with dependencies and acceptance criteria. This task implements documentation and roadmap only. Prepare a reviewed change targeting main. Preserve unrelated repository changes.
- Out of scope: unrelated refactors not required for "Document semantic workflow selection and feature delivery ownership; create atomic implementation roadmap".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-30T06:21:25.402Z
- Branch: task/202609300615-DE9AE6/document-semantic-workflow-selection-and-feature
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...0018-feature-deliveries-and-semantic-routing.md |  70 ++
 docs/adr/README.md                                 |  39 +-
 docs/developer/feature-deliveries.mdx              | 200 +++++
 docs/developer/feature-delivery-plan.json          | 815 +++++++++++++++++++++
 docs/developer/feature-delivery-roadmap.mdx        | 387 ++++++++++
 docs/workflow-guides/branch-pr.mdx                 |   8 +
 6 files changed, 1500 insertions(+), 19 deletions(-)
```

</details>
