Task: `202606011006-MTT6E8`
Title: Prepare v0.6.14 release candidate
Canonical task record: `.agentplane/tasks/202606011006-MTT6E8/README.md`

## Summary

Prepare v0.6.14 release candidate

Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.

## Scope

- In scope: Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.
- Out of scope: unrelated refactors not required for "Prepare v0.6.14 release candidate".

## Verification

- State: ok
- Note:

```text
Release candidate payload prepared for v0.6.14. ap release candidate completed
release:prepublish:fast and release:ci-check gates through release-critical tests, then failed only
on staging generated task artifacts before commit; payload was committed manually with the release
candidate message. release:parity and release state now read 0.6.14.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T10:06:49.376Z
- Branch: task/202606011006-MTT6E8/prepare-v0-6-14-release-candidate
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   6 +-
 docs/reference/generated-reference.mdx             |   6 +-
 packages/agentplane/package.json                   |   6 +-
 .../run-cli.core.help-snap.test.ts.snap            | 402 +++++++++++++++++++--
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |  22 +-
 packages/testkit/package.json                      |   2 +-
 10 files changed, 412 insertions(+), 41 deletions(-)
```

</details>
