# PR Review

Created: 2026-05-13T20:55:22.001Z

## Task

- Task: `202605132054-5FV925`
- Title: Improve generated PR body formatting
- Status: DOING
- Branch: `task/202605132054-5FV925/pr-body-format`
- Canonical task record: `.agentplane/tasks/202605132054-5FV925/README.md`

## Verification

- State: ok
- Note: Implemented hosted PR body formatter for long verification bullets. Checks passed after final adjustment: bun test packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx eslint packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx prettier --check packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T21:10:13.815Z
- Branch: task/202605132054-5FV925/pr-body-format
- Head: 127993a496d6

```text
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 .../commands/pr/internal/review-template.test.ts   |  42 ++
 .../src/commands/pr/internal/review-template.ts    | 127 ++++-
 3 files changed, 684 insertions(+), 12 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
