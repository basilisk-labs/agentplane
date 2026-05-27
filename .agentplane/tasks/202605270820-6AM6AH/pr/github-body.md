Task: `202605270820-6AM6AH`
Title: Clarify untracked git status preflight
Canonical task record: `.agentplane/tasks/202605270820-6AM6AH/README.md`

## Summary

Clarify untracked git status preflight

Clarify bootstrap and policy preflight so agents distinguish tracked-only cleanliness from full working-tree changes including untracked files.

## Scope

- In scope: Clarify bootstrap and policy preflight so agents distinguish tracked-only cleanliness from full working-tree changes including untracked files.
- Out of scope: unrelated refactors not required for "Clarify untracked git status preflight".

## Verification

- State: ok
- Note:

```bash
bun run format:check. Result: pass. Evidence: All matched files use Prettier code style after hosted \
  verify-contract failure. Scope: full repository formatting contract. Command: node \
  .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK with AGENTS.md \
  line budget at 248 wc lines. Scope: policy gateway budget. Command: git diff --check. Result: \
  pass. Evidence: no whitespace errors. Scope: follow-up formatting fix.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-27T08:21:50.373Z
- Branch: task/202605270820-6AM6AH/clarify-untracked-preflight
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/agent-bootstrap.generated.mdx                            | 5 ++++-
 docs/user/task-lifecycle.mdx                                       | 2 ++
 docs/user/workflow.mdx                                             | 1 +
 packages/agentplane/assets/AGENTS.md                               | 2 +-
 packages/agentplane/assets/codex-plugin/skills/agentplane/SKILL.md | 2 +-
 packages/agentplane/src/cli/bootstrap-guide.ts                     | 4 +++-
 packages/agentplane/src/cli/command-guide.test.ts                  | 5 +++++
 7 files changed, 17 insertions(+), 4 deletions(-)
```

</details>
