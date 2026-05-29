Task: `202605290732-0XREE3`
Title: Release v0.6.12
Canonical task record: `.agentplane/tasks/202605290732-0XREE3/README.md`

## Summary

Release v0.6.12

Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.

## Scope

- In scope: Prepare, validate, merge, publish, and record evidence for the next patch release v0.6.12.
- Out of scope: unrelated refactors not required for "Release v0.6.12".

## Verification

- State: ok
- Note:

```text
Release checks refreshed after bun.lock sync: bun install --frozen-lockfile --ignore-scripts passed;
bun run release:check passed with 0.6.12 package metadata; prior release:prepublish:heavy and hosted
checks remain covered, pending fresh hosted rerun for the latest branch head.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T07:32:51.615Z
- Branch: task/202605290732-0XREE3/release-v0-6-12
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 bun.lock                                           |  12 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.12.md                           | 200 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 scripts/checks/check-lifecycle-invariants.mjs      |  14 +-
 .../static/img/social/docs/releases/v0.6.12.png    | Bin 0 -> 41784 bytes
 website/static/img/social/manifest.json            |   8 +
 13 files changed, 236 insertions(+), 25 deletions(-)
```

</details>
