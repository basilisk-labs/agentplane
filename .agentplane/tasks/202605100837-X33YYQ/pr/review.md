# PR Review

Created: 2026-05-10T15:28:03.684Z

## Task

- Task: `202605100837-X33YYQ`
- Title: Pre-v0.5: guard against AgentPlane-owned writes to .git index.lock
- Status: DOING
- Branch: `task-202605100837-X33YYQ-index-lock-guard`
- Canonical task record: `.agentplane/tasks/202605100837-X33YYQ/README.md`

## Verification

- State: ok
- Note: Added a tracked guard test that scans packages/scripts/.github plus the Git mutation model for index.lock occurrences, allows only documented/read-only/fake-lock regression locations, and rejects write-intent outside the E_GIT_LOCKED fixture. Checks passed: targeted Vitest guard+allow tests, prettier check, direct eslint for new test, policy routing.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T15:28:20.922Z
- Branch: task-202605100837-X33YYQ-index-lock-guard
- Head: 3a8da0b38b80

```text
 .../src/shared/git-index-lock-guard.test.ts        | 86 ++++++++++++++++++++++
 1 file changed, 86 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
