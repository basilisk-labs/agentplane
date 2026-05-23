Task: `202605231953-7EJ5GX`
Title: Sync agent prompt guidance with compact context commands
Canonical task record: `.agentplane/tasks/202605231953-7EJ5GX/README.md`

## Summary

Sync agent prompt guidance with compact context commands

Update AgentPlane prompt/bootstrap surfaces so agents use task active, task brief, route next-action, and source-confidence guidance before manual branch_pr command assembly.

## Scope

- In scope: Update AgentPlane prompt/bootstrap surfaces so agents use task active, task brief, route next-action, and source-confidence guidance before manual branch_pr command assembly.
- Out of scope: unrelated refactors not required for "Sync agent prompt guidance with compact context commands".

## Verification

- State: ok
- Note:

```text
Verified prompt/bootstrap cognitive-load sync. Commands: bunx vitest run
packages/agentplane/src/cli/bootstrap-doc-build-freshness.test.ts
packages/agentplane/src/cli/prompts.test.ts
packages/agentplane/src/runner/context/base-prompts.test.ts => pass (3 files, 23 tests); node
.agentplane/policy/check-routing.mjs => pass; ap doctor => pass with pre-existing branch_pr
normalization warnings unrelated to this task.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T19:55:26.804Z
- Branch: task/202605231953-7EJ5GX/prompt-context-commands
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/workflow.branch_pr.md                      |  2 ++
 docs/user/agent-bootstrap.generated.mdx                       |  7 ++++---
 packages/agentplane/assets/AGENTS.md                          |  4 ++--
 .../agentplane/assets/codex-plugin/skills/agentplane/SKILL.md | 11 +++++++----
 packages/agentplane/assets/policy/workflow.branch_pr.md       |  2 ++
 packages/agentplane/src/cli/bootstrap-guide.ts                |  7 ++++---
 6 files changed, 21 insertions(+), 12 deletions(-)
```

</details>
