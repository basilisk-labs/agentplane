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
- Note: Verified: rebased/merged task branch onto current origin/main and reran focused validation. Checks passed on d81de768a: bun test packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts (13 pass); bun run --filter=agentplane typecheck; node .agentplane/policy/check-routing.mjs; ap doctor; ap preflight --json --mode full reported harness_health ok and no task_artifact_drift.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T18:50:56.346Z
- Branch: task/202605131627-ANTN2E/typed-drift-classification
- Head: d81de768aed2

```text
 .../blueprint/resolved-snapshot.json               | 513 +++++++++++++++++++++
 .../cli/run-cli.core.branch-meta.readiness.test.ts | 163 ++++++-
 .../cli/run-cli/commands/core/preflight-render.ts  |  15 +-
 .../cli/run-cli/commands/core/preflight-report.ts  | 136 +++++-
 4 files changed, 818 insertions(+), 9 deletions(-)
```

</details>
