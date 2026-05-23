# PR Review

Created: 2026-05-23T19:55:26.804Z

## Task

- Task: `202605231953-7EJ5GX`
- Title: Sync agent prompt guidance with compact context commands
- Status: DOING
- Branch: `task/202605231953-7EJ5GX/prompt-context-commands`
- Canonical task record: `.agentplane/tasks/202605231953-7EJ5GX/README.md`

## Verification

- State: ok
- Note: Hosted checks for PR #4116 are green: Analyze actions/javascript-typescript, CodeQL, docs, plan, test-windows, verify-cli-critical, verify-contract, verify-coverage, verify-static, verify-unit, verify-workflow, and PR verification passed. Local targeted checks already recorded by UPDATER.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
