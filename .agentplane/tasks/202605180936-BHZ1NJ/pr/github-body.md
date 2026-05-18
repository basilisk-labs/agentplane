Task: `202605180936-BHZ1NJ`
Title: Add context assimilation blueprint gates
Canonical task record: `.agentplane/tasks/202605180936-BHZ1NJ/README.md`

## Summary

Add context assimilation blueprint gates

Implement a stricter context assimilation blueprint/lifecycle contract and change context init so the starter wiki contains only AGENTS.md and index.md until first ingest creates project-specific folders.

## Scope

- In scope: Implement a stricter context assimilation blueprint/lifecycle contract and change context init so the starter wiki contains only AGENTS.md and index.md until first ingest creates project-specific folders.
- Out of scope: unrelated refactors not required for "Add context assimilation blueprint gates".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T09:46:33.590Z
- Branch: task/202605180936-BHZ1NJ/context-assimilation-blueprint
- Head: 94d49b82a767

```text
 docs/developer/local-context.mdx                   | 15 +++++
 docs/user/local-context.mdx                        | 16 +++---
 packages/agentplane/src/blueprints/builtins.ts     | 64 +++++++++++++++++++++-
 .../agentplane/src/blueprints/validate.test.ts     | 28 ++++++++++
 packages/agentplane/src/commands/context/init.ts   | 17 +++---
 .../src/commands/context/release-readiness.test.ts | 64 +++++++++++++++++++++-
 packages/agentplane/src/context/ingest-task.ts     | 35 ++++++++++++
 packages/agentplane/src/context/ingest.ts          | 30 +++++++++-
 8 files changed, 247 insertions(+), 22 deletions(-)
```

</details>
