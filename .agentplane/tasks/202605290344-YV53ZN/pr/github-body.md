Task: `202605290344-YV53ZN`
Title: PR review template hosted formatting decomposition
Canonical task record: `.agentplane/tasks/202605290344-YV53ZN/README.md`

## Summary

PR review template hosted formatting decomposition

Decompose packages/agentplane/src/commands/pr/internal/review-template.ts by extracting hosted GitHub verification markdown command-wrapping helpers into a focused module, preserving PR artifact rendering and validation behavior while reducing hotspot count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/pr/internal/review-template.ts by extracting hosted GitHub verification markdown command-wrapping helpers into a focused module, preserving PR artifact rendering and validation behavior while reducing hotspot count.
- Out of scope: unrelated refactors not required for "PR review template hosted formatting decomposition".

## Verification

- State: ok
- Note:

```text
Verified PR review template hosted formatting decomposition. Commands passed: bunx vitest run
packages/agentplane/src/commands/pr/internal/review-template.test.ts
packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts --config
vitest.workspace.ts (12 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run
lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from
17 to 16; review-template.ts is 368 lines, below the 400-line warning threshold.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T03:44:48.756Z
- Branch: task/202605290344-YV53ZN/pr-review-template-hosted-formatting
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/pr/internal/review-hosted-format.ts   | 102 +++++++++++++++++++++
 .../src/commands/pr/internal/review-template.ts    | 102 +--------------------
 2 files changed, 103 insertions(+), 101 deletions(-)
```

</details>
