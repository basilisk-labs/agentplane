## Summary

AP-11: Split guard commit wrapper tests

Split guard commit-wrapper CLI scenarios by env, policy, close, and refresh behavior with shared testkit fixtures.

## Scope

- In scope: Split guard commit-wrapper CLI scenarios by env, policy, close, and refresh behavior with shared testkit fixtures.
- Out of scope: unrelated refactors not required for "AP-11: Split guard commit wrapper tests".

## Verification

- State: ok
- Note: Verified: guard commit-wrapper tests split into env, policy, refresh, and close suites; routing, inventory, and significant coverage use the split files; oversized baseline ratcheted.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T10:47:25.967Z
- Branch: task/202605010645-FD8ZPX/guard-commit-wrapper-test-split
- Head: b4519cea01e4

```text
 .../agentplane/src/cli/local-ci-selection.test.ts  |    7 +-
 ...run-cli.core.guard.commit-wrapper.close.test.ts |  401 +++++++
 .../run-cli.core.guard.commit-wrapper.env.test.ts  |  284 +++++
 ...un-cli.core.guard.commit-wrapper.policy.test.ts |  229 ++++
 ...n-cli.core.guard.commit-wrapper.refresh.test.ts |  332 ++++++
 .../cli/run-cli.core.guard.commit-wrapper.test.ts  | 1217 --------------------
 scripts/lib/test-inventory.mjs                     |    8 +-
 scripts/lib/test-route-registry.mjs                |    5 +-
 scripts/oversized-test-baseline.json               |    8 +-
 9 files changed, 1263 insertions(+), 1228 deletions(-)
```

</details>
