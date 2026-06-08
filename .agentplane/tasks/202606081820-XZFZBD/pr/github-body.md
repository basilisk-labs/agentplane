Task: `202606081820-XZFZBD`
Title: Publish next patch release
Canonical task record: `.agentplane/tasks/202606081820-XZFZBD/README.md`

## Summary

Publish next patch release

Prepare, verify, merge, and publish AgentPlane v0.6.20 with external GitHub and npm evidence.

## Scope

- In scope: Prepare, verify, merge, and publish AgentPlane v0.6.20 with external GitHub and npm evidence.
- Out of scope: unrelated refactors not required for "Publish next patch release".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T20:19:16.515Z
- Branch: task/202606081820-XZFZBD/publish-next-patch-release
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 docs/reference/generated-reference.mdx             |   6 +--
 docs/releases/v0.6.20.md                           |  51 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +--
 .../run-cli.core.help-snap.test.ts.snap            |   1 +
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts |   6 +--
 ...-cli.core.lifecycle.finish-close-commit.test.ts |   2 +-
 ...un-cli.core.lifecycle.finish-validation.test.ts |   2 +-
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |   2 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |  22 ++++++---
 packages/testkit/package.json                      |   2 +-
 scripts/lib/test-route-registry.mjs                |   5 +-
 .../static/img/social/docs/releases/v0.6.20.png    | Bin 0 -> 55025 bytes
 website/static/img/social/manifest.json            |   8 ++++
 17 files changed, 98 insertions(+), 24 deletions(-)
```

</details>
