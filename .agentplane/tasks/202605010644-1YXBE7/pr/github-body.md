## Summary

AP-01: Restore oversized test guard budget model

Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.

## Scope

- In scope: Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.
- Out of scope: unrelated refactors not required for "AP-01: Restore oversized test guard budget model".

## Verification

- State: ok
- Note: Verified oversized baseline schema v2 guard with: node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx prettier --check touched files; git diff --check.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T06:59:59.506Z
- Branch: task/202605010644-1YXBE7/oversized-test-guard
- Head: 1ccbf50eeb28

```text
 .../src/cli/hotspot-report-script.test.ts          | 56 +++++++++++---
 scripts/check-oversized-test-baseline.mjs          | 89 +++++++++++++++-------
 scripts/oversized-test-baseline.json               | 16 ++--
 3 files changed, 117 insertions(+), 44 deletions(-)
```

</details>
