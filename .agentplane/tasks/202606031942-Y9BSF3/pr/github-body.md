Task: `202606031942-Y9BSF3`
Title: Add structured feedback issue triage
Canonical task record: `.agentplane/tasks/202606031942-Y9BSF3/README.md`

## Summary

Add structured feedback issue triage

Add an AgentPlane insights triage command and integrate it with feedback issue creation so agents can include privacy-bounded diagnostic findings while still providing their own required agent analysis.

## Scope

- In scope: Add an AgentPlane insights triage command and integrate it with feedback issue creation so agents can include privacy-bounded diagnostic findings while still providing their own required agent analysis.
- Out of scope: unrelated refactors not required for "Add structured feedback issue triage".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest --config vitest.workspace.ts run --project cli-core
packages/agentplane/src/cli/run-cli.core.insights-report.test.ts. Result: pass, 11 tests. Scope:
insights triage and issue dry-run behavior. Command: bunx vitest --config vitest.workspace.ts run
--project cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts
packages/agentplane/src/cli/run-cli.core.help-snap.test.ts. Result: pass, 26 tests. Scope: command
catalog/help snapshot. Command: bun run docs:cli:check. Result: pass. Scope: CLI docs freshness.
Command: bun run typecheck. Result: pass. Scope: TypeScript project build. Command: node
.agentplane/policy/check-routing.mjs. Result: pass. Scope: policy routing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T19:43:22.904Z
- Branch: task/202606031942-Y9BSF3/add-structured-feedback-issue-triage
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.help-snap.test.ts.snap            |   1 +
 .../src/cli/run-cli.core.insights-report.test.ts   |  92 +++++++-
 .../src/cli/run-cli/command-catalog/core.ts        |   6 +
 .../src/cli/run-cli/command-loaders/core.ts        |   4 +
 .../src/commands/insights/insights-issue-render.ts |   4 +
 .../src/commands/insights/insights-triage.ts       | 235 +++++++++++++++++++++
 .../src/commands/insights/insights.command.ts      |  42 +++-
 .../src/commands/insights/insights.spec.ts         | 123 ++++++++++-
 8 files changed, 504 insertions(+), 3 deletions(-)
```

</details>
