## Summary

AP-09: Split guard implementation tests

Split guard commands.unit.test.ts by command family and promote mock context builders to testkit guard helpers.

## Scope

- In scope: Split guard commands.unit.test.ts by command family and promote mock context builders to testkit guard helpers.
- Out of scope: unrelated refactors not required for "AP-09: Split guard implementation tests".

## Verification

- State: ok
- Note: Verified: guard commands.unit.test.ts split into guard, commit close, and commit non-close suites; @agentplane/testkit/guard added for shared command context fixtures; guard project and oversized baseline pass.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T09:47:23.737Z
- Branch: task/202605010645-B5ERD0/guard-test-split
- Head: 04cfd8f52fd6

```text
 packages/agentplane/src/cli/test-inventory.test.ts |    2 +-
 .../guard/impl/commands.commit-close.unit.test.ts  |  612 ++++++++++
 .../impl/commands.commit-non-close.unit.test.ts    |  611 ++++++++++
 .../guard/impl/commands.guard.unit.test.ts         |  191 +++
 .../src/commands/guard/impl/commands.unit.test.ts  | 1253 --------------------
 packages/testkit/package.json                      |    4 +
 packages/testkit/src/guard.ts                      |   41 +
 scripts/lib/test-inventory.mjs                     |    5 +-
 scripts/lib/test-route-registry.mjs                |    8 +-
 scripts/oversized-test-baseline.json               |    8 +-
 scripts/run-local-ci.mjs                           |    4 +-
 vitest.config.ts                                   |    4 +
 12 files changed, 1478 insertions(+), 1265 deletions(-)
```

</details>
