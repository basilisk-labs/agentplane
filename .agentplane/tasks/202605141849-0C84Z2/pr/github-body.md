Task: `202605141849-0C84Z2`
Title: Fix doc section readback for issue #3747
Canonical task record: `.agentplane/tasks/202605141849-0C84Z2/README.md`

## Summary

Fix GitHub issue #3747 where task doc set can report success for a section that later disappears from canonical task doc readback, making task doc show and task plan approve disagree.

## Scope

In scope: local task README/doc section handling for doc_version=3, command behavior for task doc set/show, plan approval validation, and regression coverage for issue #3747. Out of scope: release publication, unrelated task backend sync, and unrelated existing task artifact drift.

## Verification

- State: ok
- Note:

```text
Re-verified after lint fix: focused Vitest suites passed, core task-readme suite passed, exact
ESLint check passed, and policy routing passed.
```
- Canonical workflow state lives in the task README.

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
