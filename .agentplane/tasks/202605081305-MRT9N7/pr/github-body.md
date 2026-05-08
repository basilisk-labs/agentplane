Task: `202605081305-MRT9N7`
Title: Fix cloud push freshness timestamp semantics
Canonical task record: `.agentplane/tasks/202605081305-MRT9N7/README.md`

## Summary

Fix cloud push freshness timestamp semantics

Update cloud backend push sync so local freshness state changes only when the cloud service explicitly returns last_checked_at, avoiding a false-fresh state after push responses without server freshness evidence.

## Scope

- In scope: Update cloud backend push sync so local freshness state changes only when the cloud service explicitly returns last_checked_at, avoiding a false-fresh state after push responses without server freshness evidence.
- Out of scope: unrelated refactors not required for "Fix cloud push freshness timestamp semantics".

## Verification

- State: ok
- Note: Verified: cloud push freshness now preserves prior state when push response omits last_checked_at. Commands: bun x vitest run packages/agentplane/src/backends/task-backend.cloud.test.ts (17 passed); bun run --filter=agentplane build; bun run release:check; bun run lint:core; bun run hotspots:check; ap doctor; node .agentplane/policy/check-routing.mjs; git diff --check.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-08T13:45:58.452Z
- Branch: task/202605081305-MRT9N7/release-cleanup
- Head: 0dc0172521f0

```text
 .agentplane/tasks/202605081305-9GE36C/README.md    |  88 +++
 .../blueprint/resolved-snapshot.json               | 498 ++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 499 ++++++++++++++++
 .agentplane/tasks/202605081306-MACWWY/README.md    |  88 +++
 .../blueprint/resolved-snapshot.json               | 498 ++++++++++++++++
 knip.json                                          |   3 +-
 .../src/backends/task-backend.cloud.test.ts        |  40 ++
 .../backends/task-backend/cloud-backend-utils.ts   |  18 +-
 .../src/backends/task-backend/cloud-backend.ts     |  21 +-
 scripts/baselines/knip-baseline.json               | 629 +++++++++++++++++++--
 10 files changed, 2305 insertions(+), 77 deletions(-)
```

</details>
