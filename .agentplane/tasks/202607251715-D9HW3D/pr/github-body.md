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

- State: ok
- Note:

```text
Verified final implementation b0b3c384: focused incident suites 21/21, format, templates,
TypeScript, targeted lint, policy routing, doctor, and hotspot baseline pass. The closure commit
only records lifecycle evidence; compact rendering and mirror behavior are unchanged.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T17:18:50.186Z
- Branch: task/202607251715-D9HW3D/preserve-compact-incident-registry-formatting
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/commands/incidents/shared.test.ts | 10 ++++++++--
 packages/agentplane/src/runtime/incidents/resolve.test.ts | 14 +++++++++++---
 packages/agentplane/src/runtime/incidents/shared.ts       |  1 +
 3 files changed, 20 insertions(+), 5 deletions(-)
```

</details>
