# PR Review

Created: 2026-05-14T18:50:37.324Z

## Task

- Task: `202605141849-0C84Z2`
- Title: Fix doc section readback for issue #3747
- Status: DOING
- Branch: `task/202605141849-0C84Z2/fix-doc-section-readback-3747`
- Canonical task record: `.agentplane/tasks/202605141849-0C84Z2/README.md`

## Verification

- State: ok
- Note: Re-verified after lint fix: focused Vitest suites passed, core task-readme suite passed, exact ESLint check passed, and policy routing passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T19:03:38.449Z
- Branch: task/202605141849-0C84Z2/fix-doc-section-readback-3747
- Head: e450a2654939

```text
 .../agentplane/src/backends/task-backend.test.ts   | 37 ++++++++++++++++++++++
 .../src/backends/task-backend/shared/record.ts     | 19 ++++++++++-
 2 files changed, 55 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
