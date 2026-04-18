## Summary

Prepare and ship patch release v0.3.14

Generate a fresh release plan from the current 0.3.13 workspace state, apply the next patch bump and release notes, validate the exact release payload including the recipes publish fix, merge it to main, and verify the resulting published install path works end-to-end.

## Scope

- In scope: Generate a fresh release plan from the current 0.3.13 workspace state, apply the next patch bump and release notes, validate the exact release payload including the recipes publish fix, merge it to main, and verify the resulting published install path works end-to-end.
- Out of scope: unrelated refactors not required for "Prepare and ship patch release v0.3.14".

## Verification

- State: ok
- Note: Release checks: local v0.3.14 candidate and release smoke passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T16:01:52.932Z
- Branch: task/202604181543-N2ZWW2/patch-release-v0-3-14
- Head: 1cf43f1c55ab

```text
 .agentplane/config.json                            |   2 +-
 bun.lock                                           |  10 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.3.14.md                           | 125 +++++++++++
 packages/agentplane/package.json                   |   6 +-
 .../src/commands/release/apply.mutation.ts         |  35 +++-
 .../src/commands/release/apply.pipeline.ts         |  60 +++++-
 .../src/commands/release/apply.preflight.ts        |  20 +-
 .../agentplane/src/commands/release/apply.test.ts  | 230 ++++++++++-----------
 .../agentplane/src/commands/release/apply.types.ts |   2 +
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/testkit/package.json                      |   2 +-
 13 files changed, 362 insertions(+), 140 deletions(-)
```

</details>
