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
- Note: Verified: blueprint snapshot refreshed after merge-base update; HEAD 8d0f78d76 contains only task artifact snapshot refresh after d81de768a validation. Snapshot state is current; no implementation files changed after focused checks.
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
