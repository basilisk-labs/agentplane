Task: `202609301727-VET3VW`
Title: Document workflow modes and shared feature deliveries as roadmap release 0.7.15
Canonical task record: `.agentplane/tasks/202609301727-VET3VW/README.md`

## Summary

Document workflow modes and shared feature deliveries as roadmap release 0.7.15

User explicitly requests a new roadmap stage as the next patch release after 0.7.14. Add release 0.7.15 for three workflow modes and shared feature deliveries. direct pins the current selected branch without implicit merge; branch isolates work from an explicit base; branch_pr adds PR creation only after aggregate delivery readiness. Multiple tasks may share a selected feature branch and delivery. Require all members, explicit closure intent, clean workspace and aggregate checks before PR creation. Preserve separate approval and merge authority. Keep 0.7.13 Scenario V2 and 0.7.14 qualified EVALUATOR omission unchanged. Do not add a recipe engine, automatic recipe publication or generalized memory. Update roadmap release table and bundle README and add a bounded release-stage document with scope, sequencing, compatibility and acceptance. Keep existing 132 atomic contracts intact; label new stage as requiring decomposition before implementation. Documentation only; no runtime changes, publishing or external writes.

## Scope

- In scope: User explicitly requests a new roadmap stage as the next patch release after 0.7.14. Add release 0.7.15 for three workflow modes and shared feature deliveries. direct pins the current selected branch without implicit merge; branch isolates work from an explicit base; branch_pr adds PR creation only after aggregate delivery readiness. Multiple tasks may share a selected feature branch and delivery. Require all members, explicit closure intent, clean workspace and aggregate checks before PR creation. Preserve separate approval and merge authority. Keep 0.7.13 Scenario V2 and 0.7.14 qualified EVALUATOR omission unchanged. Do not add a recipe engine, automatic recipe publication or generalized memory. Update roadmap release table and bundle README and add a bounded release-stage document with scope, sequencing, compatibility and acceptance. Keep existing 132 atomic contracts intact; label new stage as requiring decomposition before implementation. Documentation only; no runtime changes, publishing or external writes.
- Out of scope: unrelated refactors not required for "Document workflow modes and shared feature deliveries as roadmap release 0.7.15".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-30T17:36:23.768Z
- Branch: task/202609301727-VET3VW/document-workflow-modes-and-shared-feature-deliv
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 agentplane-roadmap-r2/EXECUTION-CHARTER.md         |  3 +
 agentplane-roadmap-r2/README.md                    |  5 +-
 .../agentplane-0.7.9-0.7.14-roadmap-r2.md          |  3 +
 agentplane-roadmap-r2/releases/0.7.15.md           | 67 ++++++++++++++++++++++
 4 files changed, 77 insertions(+), 1 deletion(-)
```

</details>
