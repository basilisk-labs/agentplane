Task: `202607251715-D9HW3D`
Title: Preserve compact incident registry formatting
Canonical task record: `.agentplane/tasks/202607251715-D9HW3D/README.md`

## Summary

Preserve compact incident registry formatting

Repair the incident-registry renderer so compact rewrites retain the required blank line after the heading, keep the canonical and asset mirrors byte-identical, and add regression coverage. This unblocks the hosted format check for task 202607251433-75Q4J6 without manually editing a policy log in that task.

## Scope

- In scope: Repair the incident-registry renderer so compact rewrites retain the required blank line after the heading, keep the canonical and asset mirrors byte-identical, and add regression coverage. This unblocks the hosted format check for task 202607251433-75Q4J6 without manually editing a policy log in that task.
- Out of scope: unrelated refactors not required for "Preserve compact incident registry formatting".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T17:18:50.186Z
- Branch: task/202607251715-D9HW3D/preserve-compact-incident-registry-formatting
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/run-cli.core.incidents.test.ts |  1 +
 packages/agentplane/src/commands/incidents/shared.test.ts  | 10 ++++++++--
 packages/agentplane/src/runtime/incidents/resolve.test.ts  | 14 +++++++++++---
 packages/agentplane/src/runtime/incidents/shared.ts        |  1 +
 4 files changed, 21 insertions(+), 5 deletions(-)
```

</details>
