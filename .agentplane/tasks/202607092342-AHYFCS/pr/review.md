# PR Review

Created: 2026-07-09T23:43:35.604Z

## Task

- Task: `202607092342-AHYFCS`
- Title: Enforce cross-surface context integrity for v0.6.22
- Status: DOING
- Branch: `task/202607092342-AHYFCS/enforce-cross-surface-context-integrity-for-v0-6`
- Canonical task record: `.agentplane/tasks/202607092342-AHYFCS/README.md`

## Verification

- State: ok
- Note: Verified: current main-targeting PR head preserves the passing integrity tests, 2,132-test full fast suite, critical CLI suite, typecheck, lint, and ci:contract evidence.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-09T23:57:04.928Z
- Branch: task/202607092342-AHYFCS/enforce-cross-surface-context-integrity-for-v0-6
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/check.unit.test.ts        | 118 +++++++++++++
 .../src/commands/context/wiki-reports.ts           |  21 ++-
 .../src/commands/context/wiki-reports.unit.test.ts |   9 +
 packages/agentplane/src/context/doctor.ts          |   2 +
 packages/agentplane/src/context/integrity.ts       | 186 +++++++++++++++++++++
 5 files changed, 334 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
