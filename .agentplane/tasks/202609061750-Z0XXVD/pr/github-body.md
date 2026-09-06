Task: `202609061750-Z0XXVD`
Title: Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication
Canonical task record: `.agentplane/tasks/202609061750-Z0XXVD/README.md`

## Summary

Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication

Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.

## Scope

- In scope: Finalize the explicitly approved stable version 0.7.8 from verified main 262da3130bc5628a7641c400c74368ae355000bf. Prepare release notes from the complete v0.7.7 range, synchronize existing semantic version surfaces and generated references, and qualify packed installed lifecycle plus published 0.7.7 upgrades in direct and branch_pr fixtures. AgentPlane owns commits, verification, review and integration. The operator then dispatches GitHub-only publication from exact release-ready main, verifies canonical publish-result and distribution readback, and confirms the hosted 0.7.9-beta.1 evidence follow-up. Keep unrelated legacy beta tasks and T4RR70 outside scope.
- Out of scope: unrelated refactors not required for "Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-06T18:16:20.873Z
- Branch: task/202609061750-Z0XXVD/prepare-and-qualify-agentplane-0-7-8-for-exact-s
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |    2 +-
 docs/assets/header.svg                             |    4 +-
 docs/assets/readme-headers/adr.svg                 |    4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |    4 +-
 docs/assets/readme-headers/agentplane.svg          |    4 +-
 docs/assets/readme-headers/core.svg                |    4 +-
 docs/assets/readme-headers/docs.svg                |    4 +-
 docs/assets/readme-headers/humanizer.svg           |    4 +-
 docs/assets/readme-headers/recipes.svg             |    4 +-
 docs/assets/readme-headers/releases.svg            |    4 +-
 docs/assets/readme-headers/schemas.svg             |    4 +-
 docs/assets/readme-headers/scripts.svg             |    4 +-
 docs/assets/readme-headers/skills.svg              |    4 +-
 docs/assets/readme-headers/spec.svg                |    4 +-
 docs/assets/readme-headers/testkit.svg             |    4 +-
 docs/reference/generated-reference.mdx             |   14 +-
 docs/releases/v0.7.8-evidence/preparation.md       |   33 +
 .../v0.7.8-evidence/qualify-upgrade-0.7.7.mjs      |  283 +
 .../v0.7.8-evidence/release-plan-changes.json      | 7087 ++++++++++++++++++++
 .../v0.7.8-evidence/release-plan-version.json      |    8 +
 docs/releases/v0.7.8.md                            | 1689 +++++
 packages/agentplane/package.json                   |    6 +-
 .../agentplane/src/cli/route-decision.testkit.ts   |  223 +-
 .../cli/run-cli.core.route-decision.batch.test.ts  |   64 +-
 ...cli.core.route-decision.direct-closeout.test.ts |   43 +-
 .../run-cli.core.route-decision.pre-merge.test.ts  |   79 +-
 .../src/cli/run-cli.core.route-decision.test.ts    |   46 +-
 ...li.core.task-advance.evaluator-recovery.test.ts |   13 +
 ...n-cli.core.task-advance.evidence-rework.test.ts |   50 +-
 .../cli/run-cli.core.task-next-action-json.test.ts |   17 +-
 .../cli/task-advance-effect-recovery.testkit.ts    |   41 +-
 .../agentplane/src/cli/task-continuity.testkit.ts  |   88 +-
 packages/core/package.json                         |    2 +-
 packages/recipes/package.json                      |    2 +-
 packages/recipes/src/index.ts                      |    2 +-
 packages/spec/examples/acr.json                    |    4 +-
 packages/testkit/package.json                      |    2 +-
 .../src/cli-core-tasks-query.expected-run.ts       |   28 +-
 packages/testkit/src/release.ts                    |   55 +-
 .../baselines/v0.7-compatibility-candidate.json    |    6 +-
 .../docs/releases/v0.7.8-evidence/preparation.png  |  Bin 0 -> 55103 bytes
 website/static/img/social/docs/releases/v0.7.8.png |  Bin 0 -> 52552 bytes
 website/static/img/social/manifest.json            |   16 +
 43 files changed, 9470 insertions(+), 489 deletions(-)
```

</details>
