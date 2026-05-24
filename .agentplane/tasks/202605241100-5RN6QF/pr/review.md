# PR Review

Created: 2026-05-24T11:01:15.952Z

## Task

- Task: `202605241100-5RN6QF`
- Title: Fix context doctor line refs and all-scope search
- Status: DOING
- Branch: `task/202605241100-5RN6QF/fix-context-doctor-search`
- Canonical task record: `.agentplane/tasks/202605241100-5RN6QF/README.md`

## Verification

- State: ok
- Note: Fixed context doctor line-addressed raw source refs and context search --scope all SQLite/token matching. Checks passed: Prettier targeted files; Vitest issue-gates unit suite; targeted ESLint; policy routing; ap doctor.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-24T11:01:15.952Z
- Branch: task/202605241100-5RN6QF/fix-context-doctor-search
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/issue-gates.unit.test.ts  | 125 +++++++++++++++++++++
 packages/agentplane/src/commands/context/search.ts |  39 +++++--
 packages/agentplane/src/context/doctor.ts          |  18 ++-
 3 files changed, 171 insertions(+), 11 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
