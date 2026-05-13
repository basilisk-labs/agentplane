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
- Note: Verified: addressed PR review by restricting ignore_parallel_agent to active task README artifacts only. Active non-README artifacts now remain actionable/inspect. Checks passed on 02926e918: bun test packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts (14 pass); bun run --filter=agentplane typecheck; bunx prettier --check touched files; bunx eslint touched files; node .agentplane/policy/check-routing.mjs; ap doctor.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:11:22.755Z
- Branch: task/202605131627-ANTN2E/typed-drift-classification
- Head: 02926e918a72

```text
 .../blueprint/resolved-snapshot.json               | 513 +++++++++++++++++++++
 .../cli/run-cli.core.branch-meta.readiness.test.ts | 239 +++++++++-
 .../cli/run-cli/commands/core/preflight-render.ts  |  15 +-
 .../cli/run-cli/commands/core/preflight-report.ts  | 136 +++++-
 4 files changed, 894 insertions(+), 9 deletions(-)
```

</details>
