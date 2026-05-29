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
Release checks passed: release candidate prepared for v0.6.12; release:prepublish:fast passed;
release:prepublish:heavy passed including release-ci-base 67/67 chunks, workflow/significant
coverage, and release-critical suite; pre-push standard mode passed before branch update.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T07:32:51.615Z
- Branch: task/202605290732-0XREE3/release-v0-6-12
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
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
 12 files changed, 230 insertions(+), 19 deletions(-)
```

</details>
