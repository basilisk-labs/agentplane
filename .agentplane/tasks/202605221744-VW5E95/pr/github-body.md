Task: `202605221744-VW5E95`
Title: Define machine-readable agent work context contract
Canonical task record: `.agentplane/tasks/202605221744-VW5E95/README.md`

## Summary

Define machine-readable agent work context contract

Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.

## Scope

- In scope: Define and test a stable JSON contract that combines task route, next action, verification contract, blueprint evidence, policy modules, source confidence, and stop rules for agent consumers.
- Out of scope: unrelated refactors not required for "Define machine-readable agent work context contract".

## Verification

- State: ok
- Note: Addressed PR review confidence edge cases.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T01:41:58.785Z
- Branch: task/202605221744-VW5E95/agent-work-context-contract
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   5 +
 .../src/cli/run-cli.core.route-decision.test.ts    |  34 ++++++
 .../commands/task/agent-work-context-contract.ts   |  40 +++++++
 .../src/commands/task/blueprint-summary.ts         |   2 +
 .../agentplane/src/commands/task/brief.command.ts  | 131 ++++++++++++++++++++-
 5 files changed, 211 insertions(+), 1 deletion(-)
```

</details>
