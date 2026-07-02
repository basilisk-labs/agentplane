# PR Review

Created: 2026-07-02T20:30:03.849Z

## Task

- Task: `202607021730-7KG1WF`
- Title: Document and migrate maximum-assimilation v2
- Status: DOING
- Branch: `task/202607021730-7KG1WF/document-and-migrate-maximum-assimilation-v2`
- Canonical task record: `.agentplane/tasks/202607021730-7KG1WF/README.md`

## Verification

- State: ok
- Note: Verified after primary tag metadata fix; source_refs review fix remains covered by tests and hosted checks.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-02T20:54:00.170Z
- Branch: task/202607021730-7KG1WF/document-and-migrate-maximum-assimilation-v2
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/context/modes.mdx                             |  15 +
 docs/context/quickstart.mdx                        |  10 +
 docs/context/review.mdx                            |   2 +
 docs/releases/v0.6.21.md                           |   2 +
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +
 .../src/commands/context/context-runner.ts         |  13 +
 .../src/commands/context/context.spec.ts           |  34 ++
 .../agentplane/src/commands/context/migrate.ts     | 359 +++++++++++++++++++++
 .../src/commands/context/migrate.unit.test.ts      | 208 ++++++++++++
 9 files changed, 645 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
