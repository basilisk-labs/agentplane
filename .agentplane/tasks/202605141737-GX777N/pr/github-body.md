Task: `202605141737-GX777N`
Title: Enrich feedback issue diagnostics
Canonical task record: `.agentplane/tasks/202605141737-GX777N/README.md`

## Summary

Enrich feedback issue diagnostics

Add privacy-bounded failure context and required agent context support to AgentPlane insights issue reports, then create a test feedback issue.

## Scope

- In scope: Add privacy-bounded failure context and required agent context support to AgentPlane insights issue reports, then create a test feedback issue.
- Out of scope: unrelated refactors not required for "Enrich feedback issue diagnostics".

## Verification

- State: ok
- Note:

```bash
bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass, 6 tests. \
  Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun \
  run format:check; Result: pass. Command: bun run docs:cli:check; Result: pass. Command: node \
  .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with two \
  unrelated existing branch_pr reconciliation warnings. External: created test feedback issue #3744 \
  with Agent context and failure metadata, raw branch name absent.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T18:03:11.950Z
- Branch: task/202605141737-GX777N/feedback-issue-diagnostics
- Head: c8586bf5511d

```text
 docs/user/cli-reference.generated.mdx              |   8 ++
 packages/agentplane/src/cli/reason-codes.ts        |   6 +
 .../src/cli/run-cli.core.insights-report.test.ts   |  54 +++++++++
 .../src/commands/insights/insights.command.ts      | 135 ++++++++++++++++++++-
 .../src/commands/insights/insights.spec.ts         |  71 +++++++++++
 5 files changed, 272 insertions(+), 2 deletions(-)
```

</details>
