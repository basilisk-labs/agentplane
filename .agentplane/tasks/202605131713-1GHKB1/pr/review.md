# PR Review

Created: 2026-05-13T17:46:20.298Z

## Task

- Task: `202605131713-1GHKB1`
- Title: Add public evaluator catalog commands
- Status: DOING
- Branch: `task/202605131713-1GHKB1/public-evaluator-catalog`
- Canonical task record: `.agentplane/tasks/202605131713-1GHKB1/README.md`

## Verification

- State: ok
- Note: CI format failure fixed and verified: format:check passes after formatting docs-render.ts; previous review-fix checks still covered evaluator root lookup and --builtin false behavior.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:36:24.353Z
- Branch: task/202605131713-1GHKB1/public-evaluator-catalog
- Head: ec5b035ca1d1

```text
 .agentplane/evaluators/recovery-context.md         |  47 ++
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 ROADMAP.md                                         |   2 +
 docs/user/cli-reference.generated.mdx              |  63 +++
 docs/user/commands.mdx                             |  15 +
 .../assets/evaluators/recovery-context.md          |  47 ++
 packages/agentplane/assets/framework.manifest.json |   7 +
 ...n-cli.core.branch-meta.workflow-profile.test.ts |  81 ++++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   3 +
 .../src/cli/run-cli/command-catalog/project.ts     |   9 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/cli/run-cli/commands/init/execution.ts     |  18 +
 .../cli/run-cli/commands/init/steps/apply.test.ts  |   8 +
 .../src/cli/run-cli/commands/init/steps/apply.ts   |  10 +
 .../cli/run-cli/commands/init/write-evaluators.ts  |  41 ++
 packages/agentplane/src/cli/spec/docs-render.ts    |   5 +-
 .../src/commands/evaluator/evaluator.command.ts    | 108 +++++
 .../src/commands/evaluator/evaluator.spec.ts       | 102 ++++
 packages/agentplane/src/commands/upgrade/policy.ts |   1 +
 packages/agentplane/src/evaluators/catalog.ts      | 127 +++++
 .../src/runtime/shared/runtime-artifacts.ts        |   1 +
 .../src/shared/builtin-assets.generated.ts         |   9 +-
 .../agentplane/src/shared/protected-paths.test.ts  |  21 +
 packages/agentplane/src/shared/protected-paths.ts  |   6 +-
 24 files changed, 1256 insertions(+), 7 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
