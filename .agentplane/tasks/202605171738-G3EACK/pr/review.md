# PR Review

Created: 2026-05-17T17:38:49.835Z

## Task

- Task: `202605171738-G3EACK`
- Title: Gate framework-only policy and dev CLI commands
- Status: DOING
- Branch: `task/202605171738-G3EACK/framework-dev-gates`
- Canonical task record: `.agentplane/tasks/202605171738-G3EACK/README.md`

## Verification

- State: ok
- Note: Local verification remains green after fixing the all-command help contract: focused Vitest help/registry/init tests, ESLint, format:check, typecheck, and policy routing passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T18:13:27.294Z
- Branch: task/202605171738-G3EACK/framework-dev-gates
- Head: 8aa013aebb44

```text
 .agentplane/policy/framework.dev.md                | 20 ++++++++++++++
 packages/agentplane/assets/policy/framework.dev.md | 20 ++++++++++++++
 .../src/cli/help.all-commands.contract.test.ts     |  2 +-
 .../src/cli/run-cli.core.help-contract.test.ts     | 26 ++++++++++++++++++
 .../src/cli/run-cli.core.init.branch-pr.test.ts    | 14 ++++++++--
 packages/agentplane/src/cli/run-cli.ts             | 23 +++++++++++++---
 packages/agentplane/src/cli/spec/help.ts           | 10 +++++--
 .../src/runtime/prompt-modules/registry.test.ts    | 31 ++++++++++++++++++++++
 .../src/runtime/prompt-modules/registry.ts         |  1 +
 scripts/baselines/knip-baseline.json               | 15 ++++-------
 10 files changed, 143 insertions(+), 19 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
