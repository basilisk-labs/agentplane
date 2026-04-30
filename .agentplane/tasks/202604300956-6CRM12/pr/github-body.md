## Summary

Publish v0.4.0 release

Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.

## Scope

- In scope: Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.
- Out of scope: unrelated refactors not required for "Publish v0.4.0 release".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T17:26:21.048Z
- Branch: task/202604300956-6CRM12/v0-4-0-release
- Head: 216a972abc31

```text
 .agentplane/config.json                            |   2 +-
 FREEZE.v0.3.md                                     | 154 -------
 docs/adr/0012-v0.4-surface-transition.md           |  52 +++
 docs/adr/README.md                                 |   1 +
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.4.0.md                            | 156 +++++++
 packages/agentplane/package.json                   |   6 +-
 .../agentplane/src/agents/agents-template.test.ts  |  15 +-
 packages/agentplane/src/agents/agents-template.ts  |   3 +-
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  | 158 +++++++
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  | 142 ------
 .../src/cli/run-cli.core.incidents.test.ts         |  12 +-
 .../run-cli.core.pr-flow.pr-notes-verify.test.ts   |   2 +-
 .../run-cli.core.tasks.normalize-migrate.test.ts   |   2 +-
 .../src/cli/run-cli/commands/init/write-agents.ts  |   4 +-
 .../commands/release/release-ci-contract.test.ts   |  15 +
 .../src/runtime/incidents/plan-strategy.ts         |   2 +-
 .../src/runtime/prompt-modules/compiler.merge.ts   | 183 ++++++++
 .../src/runtime/prompt-modules/compiler.shared.ts  |  41 ++
 .../src/runtime/prompt-modules/compiler.ts         | 220 +---------
 .../src/runtime/prompt-modules/registry.test.ts    |   3 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/testkit/package.json                      |   2 +-
 scripts/baselines/knip-baseline.json               | 487 ++++++++++++++++-----
 scripts/run-vitest-suite.mjs                       | 128 +++++-
 vitest.workspace.ts                                |   9 +-
 27 files changed, 1134 insertions(+), 675 deletions(-)
```

</details>
