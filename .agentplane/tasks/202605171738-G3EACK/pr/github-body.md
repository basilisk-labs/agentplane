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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:46:58.450Z
- Branch: task/202605171738-G3EACK/framework-dev-gates
- Head: 96554c3859b0

```text
 .agentplane/policy/framework.dev.md                | 20 ++++++++++++++
 packages/agentplane/assets/policy/framework.dev.md | 20 ++++++++++++++
 .../src/cli/run-cli.core.help-contract.test.ts     | 26 ++++++++++++++++++
 packages/agentplane/src/cli/run-cli.ts             | 23 +++++++++++++---
 packages/agentplane/src/cli/spec/help.ts           | 10 +++++--
 .../src/runtime/prompt-modules/registry.test.ts    | 31 ++++++++++++++++++++++
 .../src/runtime/prompt-modules/registry.ts         |  1 +
 7 files changed, 125 insertions(+), 6 deletions(-)
```

</details>
