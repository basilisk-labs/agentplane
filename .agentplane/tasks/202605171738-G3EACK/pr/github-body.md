Task: `202605171738-G3EACK`
Title: Gate framework-only policy and dev CLI commands
Canonical task record: `.agentplane/tasks/202605171738-G3EACK/README.md`

## Summary

Gate framework-only policy and dev CLI commands

Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.

## Scope

- In scope: Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.
- Out of scope: unrelated refactors not required for "Gate framework-only policy and dev CLI commands".

## Verification

- State: ok
- Note:

```text
Follow-up after hosted CI: fixed knip baseline and init branch_pr tests for intentionally excluded
framework.dev policy. Command: bunx vitest --config vitest.workspace.ts run --project cli-core
packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts. Result: pass. Evidence: 1 file, 9
tests passed. Scope: init does not install framework.dev.md in normal projects. Command: bun run
knip:check. Result: pass. Evidence: Knip baseline OK, total=564. Scope: unused-code baseline after
isCommandVisibleInHelp became used. Command: bunx vitest run
packages/agentplane/src/runtime/prompt-modules/registry.test.ts
packages/agentplane/src/cli/run-cli.core.help-contract.test.ts
packages/agentplane/src/agents/agents-template.test.ts
packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts. Result: pass. Evidence: 4 files, 41
tests passed. Scope: policy filtering, CLI gating, init asset contract. Command: bun run
--filter=agentplane typecheck; eslint touched files; bun run format:check; node
.agentplane/policy/check-routing.mjs; bun run docs:cli:check; bun run agents:check; bun run
framework:dev:bootstrap; ap doctor. Result: pass. Evidence: typecheck exited 0; eslint exited 0;
formatting OK; policy routing OK; CLI docs up to date; agents templates OK; framework runtime ready;
doctor OK with errors=0 warnings=0.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:59:17.283Z
- Branch: task/202605171738-G3EACK/framework-dev-gates
- Head: 433df5b323e4

```text
 .agentplane/policy/framework.dev.md                | 20 ++++++++++++++
 packages/agentplane/assets/policy/framework.dev.md | 20 ++++++++++++++
 .../src/cli/run-cli.core.help-contract.test.ts     | 26 ++++++++++++++++++
 .../src/cli/run-cli.core.init.branch-pr.test.ts    | 14 ++++++++--
 packages/agentplane/src/cli/run-cli.ts             | 23 +++++++++++++---
 packages/agentplane/src/cli/spec/help.ts           | 10 +++++--
 .../src/runtime/prompt-modules/registry.test.ts    | 31 ++++++++++++++++++++++
 .../src/runtime/prompt-modules/registry.ts         |  1 +
 scripts/baselines/knip-baseline.json               | 15 ++++-------
 9 files changed, 142 insertions(+), 18 deletions(-)
```

</details>
