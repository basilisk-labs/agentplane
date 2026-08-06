# PR Review

Created: 2026-08-06T22:11:26.099Z

## Task

- Task: `202608062023-V3WHE9`
- Title: Add safe local evidence retention, statistics, and garbage collection
- Status: DOING
- Branch: `task/202608062023-V3WHE9/add-safe-local-evidence-retention-statistics-and`
- Canonical task record: `.agentplane/tasks/202608062023-V3WHE9/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T22:11:40.567Z
- Branch: task/202608062023-V3WHE9/add-safe-local-evidence-retention-statistics-and
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  98 ++++++
 docs/user/commands.mdx                             |  39 +++
 .../src/cli/run-cli.core.evidence.test.ts          |  55 ++++
 .../src/cli/run-cli/command-catalog/project.ts     |  20 ++
 .../src/cli/run-cli/command-loaders/project.ts     |  23 ++
 .../src/commands/evidence/evidence-inventory.ts    | 354 ++++++++++++++++++++
 .../evidence/evidence-maintenance.command.ts       | 185 +++++++++++
 .../commands/evidence/evidence-maintenance.test.ts | 360 +++++++++++++++++++++
 .../src/commands/evidence/evidence-maintenance.ts  | 216 +++++++++++++
 .../src/commands/evidence/evidence.command.ts      |   4 +-
 10 files changed, 1352 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
