# PR Review

Created: 2026-05-22T11:18:27.014Z

## Task

- Task: `202605221110-36993E`
- Title: Harden legacy upgrade dirty state handling
- Status: DOING
- Branch: `task/202605221110-36993E/harden-legacy-upgrade`
- Canonical task record: `.agentplane/tasks/202605221110-36993E/README.md`

## Verification

- State: ok
- Note: Focused upgrade hardening verified: prettier check, targeted ESLint, typecheck, git diff --check, upgrade regression suite 15/15, release-smoke legacy upgrade suite 3/3, doctor OK, policy routing OK.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T11:28:58.981Z
- Branch: task/202605221110-36993E/harden-legacy-upgrade
- Head: 87c0699ba34e

```text
 .../src/cli/run-cli.core.upgrade.test.ts           |  91 +++++++++++++++++-
 packages/agentplane/src/commands/upgrade.ts        |  25 ++++-
 packages/agentplane/src/commands/upgrade/apply.ts  | 105 ++++++++++++++++-----
 3 files changed, 191 insertions(+), 30 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
