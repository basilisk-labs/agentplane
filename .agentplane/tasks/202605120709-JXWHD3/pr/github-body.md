Task: `202605120709-JXWHD3`
Title: Implement RFQ init P0 planning boundary
Canonical task record: `.agentplane/tasks/202605120709-JXWHD3/README.md`

## Summary

Implement RFQ init P0 planning boundary

Implement the P0 AgentPlane init RFQ slice: pure planning before apply, dry-run plan output, delayed git/conflict side effects, base-branch interactive fix, docs, and tests.

## Scope

- In scope: Implement the P0 AgentPlane init RFQ slice: pure planning before apply, dry-run plan output, delayed git/conflict side effects, base-branch interactive fix, docs, and tests.
- Out of scope: unrelated refactors not required for "Implement RFQ init P0 planning boundary".

## Verification

- State: ok
- Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts; Result: pass; Evidence: 21 tests passed. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/commands/init/steps/prompt-steps.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui.test.ts packages/agentplane/src/cli/run-cli/commands/init/prompts.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/conflict-resolver.test.ts; Result: pass; Evidence: 25 tests passed. Command: exact-file eslint, bun run format:check, bun run typecheck, bun run docs:cli:check, node .agentplane/policy/check-routing.mjs, ap doctor; Result: pass; Evidence: lint clean, Prettier clean, tsc -b OK, CLI reference up to date, policy routing OK, doctor OK.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-12T08:24:27.590Z
- Branch: task/202605120709-JXWHD3/init-p0-planning-boundary
- Head: a95645d52dbc

```text
 .../blueprint/resolved-snapshot.json               | 512 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   9 +
 docs/user/commands.mdx                             |   3 +
 docs/user/setup.mdx                                |  11 +
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  97 ++++
 packages/agentplane/src/cli/run-cli.ts             |   3 +-
 .../src/cli/run-cli/commands/init/answers.ts       |   3 +
 .../src/cli/run-cli/commands/init/base-branch.ts   |   3 +
 .../src/cli/run-cli/commands/init/execution.ts     | 282 ++++++++++--
 .../src/cli/run-cli/commands/init/model.ts         |  53 +++
 .../src/cli/run-cli/commands/init/orchestrate.ts   |  52 ++-
 .../src/cli/run-cli/commands/init/spec.ts          |  37 +-
 packages/agentplane/src/cli/spec/spec.ts           |   1 +
 13 files changed, 1011 insertions(+), 55 deletions(-)
```

</details>
