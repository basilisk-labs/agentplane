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

- Updated: 2026-05-01T09:19:26.263Z
- Branch: task/202605010645-WN3ZS8/hooks-test-split
- Head: 157fd6ac0ba2

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  |   7 +-
 ...test.ts => run-cli.core.hooks.hook-run.test.ts} | 301 +--------------------
 .../src/cli/run-cli.core.hooks.install.test.ts     | 169 ++++++++++++
 .../cli/run-cli.core.hooks.runtime-shim.test.ts    | 178 ++++++++++++
 .../src/cli/run-cli.core.hooks.uninstall.test.ts   | 109 ++++++++
 packages/testkit/package.json                      |   4 +
 packages/testkit/src/hooks.ts                      |  36 +++
 scripts/lib/local-ci-selection.mjs                 |   2 +-
 scripts/lib/test-route-registry.mjs                |   5 +-
 scripts/oversized-test-baseline.json               |   8 +-
 vitest.config.ts                                   |   4 +
 11 files changed, 520 insertions(+), 303 deletions(-)
```

</details>
