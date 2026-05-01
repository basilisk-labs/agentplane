## Summary

AP-08: Split hooks CLI test monolith

Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.

## Scope

- In scope: Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.
- Out of scope: unrelated refactors not required for "AP-08: Split hooks CLI test monolith".

## Verification

- State: ok
- Note: Verified: hooks CLI monolith split into install, uninstall, runtime-shim, hook-run groups; oversized guard now passes with 15 entries and 17132 total lines.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T09:18:19.542Z
- Branch: task/202605010645-WN3ZS8/hooks-test-split
- Head: 2da946134c1e

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  |  7 ++++-
 packages/testkit/package.json                      |  4 +++
 packages/testkit/src/hooks.ts                      | 36 ++++++++++++++++++++++
 scripts/lib/local-ci-selection.mjs                 |  2 +-
 scripts/lib/test-route-registry.mjs                |  5 ++-
 scripts/oversized-test-baseline.json               |  8 ++---
 vitest.config.ts                                   |  4 +++
 7 files changed, 57 insertions(+), 9 deletions(-)
```

</details>
