# PR Review

Created: 2026-05-22T15:52:49.579Z

## Task

- Task: `202605221340-G8VYEJ`
- Title: Release AgentPlane v0.6.6
- Status: BLOCKED
- Branch: `task/202605221340-G8VYEJ/release-v0-6-6`
- Canonical task record: `.agentplane/tasks/202605221340-G8VYEJ/README.md`

## Verification

- State: ok
- Note: EVALUATOR quality gate passed: local release:prepublish completed before candidate preparation; post-bump format, release:parity, registry availability, release:check, docs:site:check, ap doctor, policy routing, pre-push fast route, and hosted PR checks for #4019 passed. PR branch is one commit over origin/main and PR meta has no tracked head_sha.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T15:53:11.691Z
- Branch: task/202605221340-G8VYEJ/release-v0-6-6
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/reference/generated-reference.mdx             |   6 +--
 docs/releases/v0.6.6.md                            |  51 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +--
 ...run-cli.core.pr-flow.integrate-failures.test.ts |   3 ++
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |   4 ++
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |  12 +++++
 ...n-cli.core.pr-flow.integrate-validation.test.ts |   4 ++
 .../run-cli.core.pr-flow.pr-open.network.test.ts   |   6 +--
 ...re.pr-flow.pr-validation.open-hydration.test.ts |   8 ++--
 ...n-cli.core.pr-flow.pr-validation.update.test.ts |   2 +-
 packages/agentplane/src/commands/pr/check.ts       |   1 +
 .../src/commands/pr/integrate/internal/prepare.ts  |  41 ++++++++++-------
 .../src/commands/pr/internal/sync-branch.ts        |  19 ++++++--
 .../src/commands/pr/internal/sync-open-step.ts     |   1 +
 .../src/commands/pr/internal/sync-update-step.ts   |   1 +
 packages/agentplane/src/commands/pr/update.ts      |   1 +
 .../src/commands/shared/pr-meta/parser.ts          |  14 +++++-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../img/social/docs/reference/runner-handoff.png   | Bin 0 -> 49027 bytes
 website/static/img/social/docs/releases/v0.6.5.png | Bin 0 -> 41594 bytes
 website/static/img/social/docs/releases/v0.6.6.png | Bin 0 -> 41898 bytes
 25 files changed, 150 insertions(+), 42 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
