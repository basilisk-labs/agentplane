Task: `202605120952-JT6FWR`
Title: Implement init mode and tool RFQ controls
Canonical task record: `.agentplane/tasks/202605120952-JT6FWR/README.md`

## Summary

Implement init mode and tool RFQ controls

Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.

## Scope

- In scope: Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.
- Out of scope: unrelated refactors not required for "Implement init mode and tool RFQ controls".

## Verification

- State: ok
- Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx eslint packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bunx prettier --check packages/agentplane/src/cli/run-cli/commands/init packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts docs/user/cli-reference.generated.mdx; bun run docs:cli:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: init tests 32 passed; CLI reference fresh; typecheck/routing/doctor OK. Scope: --init-mode/--quick/--advanced, --tool mapping, InitPlan mode/profile fields, generated CLI docs.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-12T10:02:54.412Z
- Branch: task/202605120952-JT6FWR/init-rfq-controls
- Head: b52b4f106e97

```text
 .agentplane/tasks/202605120952-D2F8VR/README.md    |  95 ++++
 .../blueprint/resolved-snapshot.json               | 512 +++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 512 +++++++++++++++++++++
 .agentplane/tasks/202605120952-MG1QB4/README.md    |  95 ++++
 .../blueprint/resolved-snapshot.json               | 512 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |  10 +
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  58 +++
 .../src/cli/run-cli/commands/init/answers.ts       |  27 +-
 .../src/cli/run-cli/commands/init/blueprints.ts    |  15 +-
 .../src/cli/run-cli/commands/init/execution.ts     |  20 +-
 .../src/cli/run-cli/commands/init/git.ts           |  15 +
 .../src/cli/run-cli/commands/init/model.ts         |  12 +-
 .../src/cli/run-cli/commands/init/modes.ts         |  48 ++
 .../src/cli/run-cli/commands/init/orchestrate.ts   |  23 +-
 .../src/cli/run-cli/commands/init/recipes.ts       |   9 +-
 .../src/cli/run-cli/commands/init/spec.ts          |  50 ++
 16 files changed, 1992 insertions(+), 21 deletions(-)
```

</details>
