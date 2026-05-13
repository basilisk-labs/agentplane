Task: `202605131627-ANTN2E`
Title: Classify task artifact drift for parallel agents
Canonical task record: `.agentplane/tasks/202605131627-ANTN2E/README.md`

## Summary

Classify task artifact drift for parallel agents

Add typed preflight classification for task artifact drift so active task artifacts from parallel agents are distinguished from stale or unknown recovery drift.

## Scope

- In scope: Add typed preflight classification for task artifact drift so active task artifacts from parallel agents are distinguished from stale or unknown recovery drift.
- Out of scope: unrelated refactors not required for "Classify task artifact drift for parallel agents".

## Verification

- State: ok
- Note: Verified: typed task artifact drift classification distinguishes active parallel task artifacts from actionable drift. Checks passed: bun test packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts; bun run --filter=agentplane typecheck; bunx prettier --check touched files; bunx eslint touched files; node .agentplane/policy/check-routing.mjs; ap doctor. ap preflight --json --mode full shows active task artifacts as actionable=false; remaining warning is expected tracked implementation changes before commit.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T16:36:19.222Z
- Branch: task/202605131627-ANTN2E/typed-drift-classification
- Head: f2e97e507c41

```text
 .../blueprint/resolved-snapshot.json               | 513 +++++++++++++++++++++
 .../cli/run-cli.core.branch-meta.readiness.test.ts | 163 ++++++-
 .../cli/run-cli/commands/core/preflight-render.ts  |  15 +-
 .../cli/run-cli/commands/core/preflight-report.ts  | 136 +++++-
 4 files changed, 818 insertions(+), 9 deletions(-)
```

</details>
