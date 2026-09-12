Task: `202609121443-YAQJB7`
Title: Fix task-centric scope extension targeting when multiple WorkItems are schedulable
Canonical task record: `.agentplane/tasks/202609121443-YAQJB7/README.md`

## Summary

Fix task-centric scope extension targeting when multiple WorkItems are schedulable

When a blocked external semantic result requests a repository scope extension, persist and use the blocked WorkItem identity so the exact USER-approved extension updates that WorkItem even when other independent WorkItems are schedulable. Preserve fail-closed state binding and add regression coverage. This is required to unblock task 202609121423-9WPTCW.

## Scope

- In scope: When a blocked external semantic result requests a repository scope extension, persist and use the blocked WorkItem identity so the exact USER-approved extension updates that WorkItem even when other independent WorkItems are schedulable. Preserve fail-closed state binding and add regression coverage. This is required to unblock task 202609121423-9WPTCW.
- Out of scope: unrelated refactors not required for "Fix task-centric scope extension targeting when multiple WorkItems are schedulable".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T14:53:13.365Z
- Branch: task/202609121443-YAQJB7/fix-task-centric-scope-extension-targeting-when
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...un-cli.core.task-advance.blocked-result.test.ts |  7 ++++
 .../shared/task-scope-extension-request.ts         | 40 ++++++++++++++-----
 .../commands/task/external-agent-blocked-result.ts |  9 ++++-
 .../src/commands/task/scope-extend.test.ts         | 45 ++++++++++++++++++++++
 4 files changed, 91 insertions(+), 10 deletions(-)
```

</details>
