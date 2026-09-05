Task: `202609051208-1AM5Z9`
Title: Repair Factory 9F9RDQ task revision projection after plan approval
Canonical task record: `.agentplane/tasks/202609051208-1AM5Z9/README.md`

## Summary

Repair Factory 9F9RDQ task revision projection after plan approval

User-authorized bounded AgentPlane recovery for Arkady Factory 202609051108-9F9RDQ. Reproduce plan refinement and approval followed by start-ready failing with outer task revision 15 and aggregate revision 14 (expected 16 observed 14). Fix only the canonical projection/mutation owner and nearest regression tests; preserve compare-and-swap rejection of concurrent or tampered writes, plan/WorkItem authority, completed implementation fee2132323a2c081c715a14f932d761d3906a7ab, pending full verification, and all Factory evidence. Recover existing 9F9RDQ using the tested CLI, not manual storage edits or replacement tasks. No messages to the AgentPlane agent, broad Clean Core refactor, migration, global installation, release, provider publication or live deployment.

## Scope

- In scope: User-authorized bounded AgentPlane recovery for Arkady Factory 202609051108-9F9RDQ. Reproduce plan refinement and approval followed by start-ready failing with outer task revision 15 and aggregate revision 14 (expected 16 observed 14). Fix only the canonical projection/mutation owner and nearest regression tests; preserve compare-and-swap rejection of concurrent or tampered writes, plan/WorkItem authority, completed implementation fee2132323a2c081c715a14f932d761d3906a7ab, pending full verification, and all Factory evidence. Recover existing 9F9RDQ using the tested CLI, not manual storage edits or replacement tasks. No messages to the AgentPlane agent, broad Clean Core refactor, migration, global installation, release, provider publication or live deployment.
- Out of scope: unrelated refactors not required for "Repair Factory 9F9RDQ task revision projection after plan approval".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-05T12:13:32.009Z
- Branch: task/202609051208-1AM5Z9/repair-factory-9f9rdq-task-revision-projection-a
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-centric-backend-adapter.test.ts           | 131 ++++++++++++++++-
 packages/agentplane/src/commands/task/plan.ts      | 160 +++++----------------
 .../agentplane/src/commands/task/plan.unit.test.ts |  64 +++------
 3 files changed, 191 insertions(+), 164 deletions(-)
```

</details>
