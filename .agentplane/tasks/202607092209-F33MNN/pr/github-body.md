Task: `202607092209-F33MNN`
Title: Prepare and publish patch release v0.6.22
Canonical task record: `.agentplane/tasks/202607092209-F33MNN/README.md`

## Summary

Prepare and publish patch release v0.6.22

Integrate the approved refactor leaves, resolve only release-blocking drift, generate the patch release plan and notes, publish v0.6.22 through the protected main workflow, and verify package/tag parity.

## Scope

- In scope: Integrate the approved refactor leaves, resolve only release-blocking drift, generate the patch release plan and notes, publish v0.6.22 through the protected main workflow, and verify package/tag parity.
- Out of scope: unrelated refactors not required for "Prepare and publish patch release v0.6.22".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-11T13:55:40.698Z
- Branch: task/202607092209-F33MNN/prepare-and-publish-patch-release-v0-6-22
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.22.md                           | 210 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +-
 ...un-cli.core.hooks.pre-push-task-binding.test.ts | 185 +++++++++---------
 .../src/commands/task/finish-blueprint-evidence.ts |  49 ++++-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |  22 ++-
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.22.png    | Bin 0 -> 54603 bytes
 website/static/img/social/manifest.json            |   8 +
 14 files changed, 393 insertions(+), 107 deletions(-)
```

</details>
