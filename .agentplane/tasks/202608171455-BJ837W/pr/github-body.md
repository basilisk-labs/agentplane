Task: `202608171455-BJ837W`
Title: Automate next patch beta version after release
Canonical task record: `.agentplane/tasks/202608171455-BJ837W/README.md`

## Summary

Automate next patch beta version after release

After a successful stable AgentPlane publish and hosted-evidence follow-up, atomically advance all semantic version surfaces to the next patch prerelease (for example 0.7.6 to 0.7.7-beta.1), keep the operation idempotent, teach release planning to finalize that prerelease as 0.7.7 instead of proposing 0.7.8, update generated and lockfile surfaces, add focused and packaged-install regression coverage, document the lifecycle, and perform the one-time current-main transition to 0.7.7-beta.1 without rewriting historical version references.

## Scope

- In scope: After a successful stable AgentPlane publish and hosted-evidence follow-up, atomically advance all semantic version surfaces to the next patch prerelease (for example 0.7.6 to 0.7.7-beta.1), keep the operation idempotent, teach release planning to finalize that prerelease as 0.7.7 instead of proposing 0.7.8, update generated and lockfile surfaces, add focused and packaged-install regression coverage, document the lifecycle, and perform the one-time current-main transition to 0.7.7-beta.1 without rewriting historical version references.
- Out of scope: unrelated refactors not required for "Automate next patch beta version after release".

## Verification

- State: needs_rework
- Note: PR #4838 review and hosted checks require rework before merge.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T16:04:57.080Z
- Branch: task/202608171455-BJ837W/automate-next-patch-beta-version-after-release
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .github/workflows/publish.yml                      |  57 +++++++-
 docs/developer/release-and-publishing.mdx          |  34 ++++-
 docs/reference/generated-reference.mdx             |  14 +-
 packages/agentplane/package.json                   |   6 +-
 .../release/check-release-version-script.test.ts   |  34 ++++-
 .../open-next-development-version-script.test.ts   | 148 +++++++++++++++++++++
 .../src/commands/release/plan.command.ts           |  17 ++-
 .../src/commands/release/plan.helpers.ts           |  91 ++++++++++++-
 .../agentplane/src/commands/release/plan.test.ts   |  85 ++++++++++++
 .../release/publish-workflow-contract.test.ts      |  18 +++
 .../release/release-task-evidence-script.test.ts   |   8 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../baselines/v0.7-compatibility-candidate.json    |   6 +-
 scripts/lib/next-development-version.mjs           | 119 +++++++++++++++++
 scripts/lib/release-semver.mjs                     |  66 +++++++++
 scripts/lib/release-version-surfaces.mjs           |  63 ++++++++-
 scripts/release/check-release-version.mjs          |  25 +++-
 scripts/release/open-next-development-version.mjs  |  55 ++++++++
 scripts/release/release-task-evidence.mjs          |  19 ++-
 scripts/release/version-bump.mjs                   |  13 +-
 25 files changed, 832 insertions(+), 60 deletions(-)
```

</details>
