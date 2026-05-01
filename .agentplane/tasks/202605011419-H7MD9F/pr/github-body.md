## Summary

Prepare v0.4.1 patch release

Prepare the v0.4.1 release candidate from current main, including release plan, release notes, version parity, candidate branch, PR, hosted checks, and publication readiness evidence.

## Scope

- In scope: Prepare the v0.4.1 release candidate from current main, including release plan, release notes, version parity, candidate branch, PR, hosted checks, and publication readiness evidence.
- Out of scope: unrelated refactors not required for "Prepare v0.4.1 patch release".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T17:56:41.668Z
- Branch: task/202605011419-H7MD9F/v0-4-1-release-candidate
- Head: 4f050552ec34

```text
 .agentplane/config.json                            |   2 +-
 .agentplane/policy/incidents.md                    |   1 +
 .agentplane/policy/workflow.release.md             |   2 +-
 .github/workflows/publish.yml                      |   2 +-
 README.md                                          |  21 +-
 .../documentation-information-architecture.mdx     |  14 +-
 docs/developer/release-and-publishing.mdx          |   4 +-
 docs/help/troubleshooting.mdx                      |   2 +-
 docs/index.mdx                                     |  23 +-
 docs/recipes/code-map.mdx                          |  89 ++++++++
 docs/recipes/index.mdx                             | 101 ++++++---
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.4.1.md                            | 245 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   2 +-
 docs/user/commands.mdx                             |   9 +-
 docs/user/overview.mdx                             |   5 +-
 docs/user/setup.mdx                                |   7 +-
 docs/user/website-ia.mdx                           |  39 ++--
 docs/{recipes => workflow-guides}/aider.mdx        |   0
 docs/{recipes => workflow-guides}/branch-pr.mdx    |   0
 docs/{recipes => workflow-guides}/claude-code.mdx  |   0
 docs/{recipes => workflow-guides}/codex.mdx        |   0
 docs/{recipes => workflow-guides}/cursor.mdx       |   0
 .../github-actions.mdx                             |   0
 docs/workflow-guides/index.mdx                     |  29 +++
 packages/agentplane/README.md                      |  19 +-
 packages/agentplane/assets/policy/incidents.md     |   1 +
 .../agentplane/assets/policy/workflow.release.md   |   2 +-
 packages/agentplane/package.json                   |   6 +-
 .../src/commands/release/apply.command.ts          |   2 +-
 .../commands/release/apply.pipeline/preflight.ts   |   2 +-
 .../agentplane/src/commands/release/apply.spec.ts  |   2 +-
 .../release/publish-workflow-contract.test.ts      |   3 +
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/testkit/package.json                      |   2 +-
 scripts/baselines/knip-baseline.json               | 150 ++++++++-----
 scripts/check-docs-ia.mjs                          |  14 +-
 scripts/generate-release-distribution.mjs          |   4 +-
 website/sidebars.ts                                |  21 +-
 website/src/data/homepage-content.ts               |   9 +-
 42 files changed, 663 insertions(+), 183 deletions(-)
```

</details>
