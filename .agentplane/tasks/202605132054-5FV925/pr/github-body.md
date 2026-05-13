Task: `202605132054-5FV925`
Title: Improve generated PR body formatting
Canonical task record: `.agentplane/tasks/202605132054-5FV925/README.md`

## Summary

Improve generated PR body formatting

Format generated GitHub PR bodies so long verification commands render as readable fenced bash blocks instead of wide bullet lines.

## Scope

- In scope: Format generated GitHub PR bodies so long verification commands render as readable fenced bash blocks instead of wide bullet lines.
- Out of scope: unrelated refactors not required for "Improve generated PR body formatting".

## Verification

- State: ok
- Note: Implemented hosted PR body formatter for long verification bullets. Checks passed after final adjustment: bun test packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx eslint packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bunx prettier --check packages/agentplane/src/commands/pr/internal/review-template.ts packages/agentplane/src/commands/pr/internal/review-template.test.ts; bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T20:55:22.001Z
- Branch: task/202605132054-5FV925/pr-body-format
- Head: 403e10e9a434

```text
No changes detected.
```

</details>
