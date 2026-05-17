Task: `202605170721-ESJ0SW`
Title: Add portable context assimilation prompts
Canonical task record: `.agentplane/tasks/202605170721-ESJ0SW/README.md`

## Summary

Add portable context assimilation prompts

Make context learn files/changes create self-contained CURATOR tasks with an embedded context_assimilation prompt module and task-readable wiki/claim/cross-link contract for non-runner agents.

## Scope

- In scope: Make context learn files/changes create self-contained CURATOR tasks with an embedded context_assimilation prompt module and task-readable wiki/claim/cross-link contract for non-runner agents.
- Out of scope: unrelated refactors not required for "Add portable context assimilation prompts".

## Verification

- State: ok
- Note:

```text
Implemented portable context assimilation prompt module and adaptive wiki task contract; verified
with focused context tests, typecheck, CLI docs check, policy routing, diff check, and temp-dir wiki
CLI smoke.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T07:38:27.778Z
- Branch: task/202605170721-ESJ0SW/adaptive-context-curation
- Head: 52891c9f5915

```text
 .agentplane/tasks/202605170721-BTF484/README.md    | 146 ++++++
 .../blueprint/resolved-snapshot.json               | 535 +++++++++++++++++++++
 .agentplane/tasks/202605170721-BY03BX/README.md    | 146 ++++++
 .../blueprint/resolved-snapshot.json               | 535 +++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 535 +++++++++++++++++++++
 .agentplane/tasks/202605170722-YP81RG/README.md    | 145 ++++++
 .../blueprint/resolved-snapshot.json               | 534 ++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |  55 ++-
 docs/user/commands.mdx                             |  10 +
 docs/user/local-context.mdx                        |  29 ++
 .../src/cli/run-cli/command-catalog/project.ts     |  10 +
 .../src/commands/context/context.command.ts        |  61 +++
 .../src/commands/context/context.spec.ts           | 117 ++++-
 packages/agentplane/src/commands/context/init.ts   |  57 ++-
 .../src/commands/context/release-readiness.test.ts |  56 +++
 packages/agentplane/src/commands/context/wiki.ts   | 342 +++++++++++++
 packages/agentplane/src/context/ingest-task.ts     | 103 ++++
 17 files changed, 3406 insertions(+), 10 deletions(-)
```

</details>
