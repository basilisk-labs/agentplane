Task: `202605121718-Q4N03A`
Title: Finalize and publish AgentPlane v0.5
Canonical task record: `.agentplane/tasks/202605121718-Q4N03A/README.md`

## Summary

Finalize and publish AgentPlane v0.5

Finalize branch_pr release publication for v0.5.0 with full test evidence

## Scope

- In scope: Finalize branch_pr release publication for v0.5.0 with full test evidence.
- Out of scope: unrelated refactors not required for "Finalize and publish AgentPlane v0.5".

## Verification

- State: needs_rework
- Note: Release drift recovered: local repo at v0.5.0 commit graph is consistent and tag v0.5.0 exists locally and remotely, pre-push CI checks ran, but npm publish proof is blocked by missing npm auth token and GITHUB_TOKEN for publish-state validation.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-12T19:03:00.445Z
- Branch: task/202605121718-Q4N03A/v0-5-publish
- Head: 1f6bae3c5112

```text
 .github/workflows/publish.yml                      | 25 +++++++++++++++++++++-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  6 ++++--
 .../release/publish-workflow-contract.test.ts      |  5 +++--
 packages/spec/examples/acr.json                    |  4 ++--
 4 files changed, 33 insertions(+), 7 deletions(-)
```

</details>
