## Summary

AP-10: Split release apply tests

Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.

## Scope

- In scope: Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.
- Out of scope: unrelated refactors not required for "AP-10: Split release apply tests".

## Verification

- State: ok
- Note: Verified: release apply tests split into preflight, version mutation, apply flow, and push recovery suites; shared release helpers moved to @agentplane/testkit/release; oversized baseline ratcheted.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T10:19:23.835Z
- Branch: task/202605010645-JGXD12/release-apply-test-split
- Head: a4537344bf8c

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  |    7 +-
 .../src/commands/release/apply.apply-flow.test.ts  |  156 +++
 .../src/commands/release/apply.preflight.test.ts   |  405 +++++++
 .../commands/release/apply.push-recovery.test.ts   |  400 ++++++
 .../agentplane/src/commands/release/apply.test.ts  | 1268 --------------------
 .../release/apply.version-mutation.test.ts         |  352 ++++++
 packages/testkit/src/release.ts                    |   71 +-
 scripts/lib/test-route-registry.mjs                |    5 +-
 scripts/oversized-test-baseline.json               |    8 +-
 9 files changed, 1395 insertions(+), 1277 deletions(-)
```

</details>
