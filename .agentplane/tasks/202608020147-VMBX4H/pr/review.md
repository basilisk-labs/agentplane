# PR Review

Created: 2026-08-02T01:48:08.791Z

## Task

- Task: `202608020147-VMBX4H`
- Title: Scope pre-commit mutation policy to task-side base-sync diff
- Status: DOING
- Branch: `task/202608020147-VMBX4H/base-sync-policy`
- Canonical task record: `.agentplane/tasks/202608020147-VMBX4H/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T01:48:08.791Z
- Branch: task/202608020147-VMBX4H/base-sync-policy
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  | 117 +++++++++++++++++++++
 .../src/commands/hooks/base-sync-policy-paths.ts   |  53 ++++++++++
 .../src/commands/hooks/run.commit-msg.ts           |  22 +++-
 .../src/commands/hooks/run.pre-commit.ts           |   9 +-
 4 files changed, 198 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
