# PR Review

Created: 2026-05-10T17:03:20.977Z

## Task

- Task: `202605100837-PGH61Q`
- Title: Pre-v0.5: split hook capabilities and declare write intent
- Status: DOING
- Branch: `task-202605100837-PGH61Q-hook-capabilities`
- Canonical task record: `.agentplane/tasks/202605100837-PGH61Q/README.md`

## Verification

- State: ok
- Note: Added explicit hook capability declarations: commit-msg/pre-commit/pre-push run as read-only hook_check paths with GIT_OPTIONAL_LOCKS=0 and forbidden Git index write intent; post-merge is declared write-capable but outside the Git index with hook_check lock context. Checks passed: hook capabilities + hook-run Vitest 26 tests, scoped ESLint, Prettier, and agentplane package build.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T17:03:20.977Z
- Branch: task-202605100837-PGH61Q-hook-capabilities
- Head: 81090060d212

```text
 .../src/commands/hooks/capabilities.test.ts        | 48 +++++++++++
 .../agentplane/src/commands/hooks/capabilities.ts  | 93 ++++++++++++++++++++++
 packages/agentplane/src/commands/hooks/run.ts      | 19 ++++-
 3 files changed, 158 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
