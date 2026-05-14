Task: `202605141102-BD322N`
Title: Release AgentPlane v0.6.0
Canonical task record: `.agentplane/tasks/202605141102-BD322N/README.md`

## Summary

Release AgentPlane v0.6.0

Prepare, verify, publish, and record AgentPlane v0.6.0 from the current green main state. Scope includes release plan, candidate branch, release notes/version parity, full local readiness checks, GitHub candidate merge, hosted publish dispatch, and publication verification.

## Scope

- In scope: Prepare, verify, publish, and record AgentPlane v0.6.0 from the current green main state. Scope includes release plan, candidate branch, release notes/version parity, full local readiness checks, GitHub candidate merge, hosted publish dispatch, and publication verification.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.0".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T12:30:17.777Z
- Branch: task/202605141102-BD322N/release-v0-6-0
- Head: ddb995fc4ef1

```text
 .../blueprint/resolved-snapshot.json               | 417 +++++++++++++++++++++
 docs/help/troubleshooting.mdx                      |  39 ++
 docs/user/agent-bootstrap.generated.mdx            |   4 +-
 docs/user/commands.mdx                             |   2 +
 packages/agentplane/assets/AGENTS.md               |   9 +-
 .../run-cli.core.help-snap.test.ts.snap            |   4 +
 .../src/cli/run-cli.core.codex-plugin.test.ts      |  19 +-
 .../cli/run-cli.core.pr-close-superseded.test.ts   |  13 +-
 .../src/cli/run-cli.core.pr-close.test.ts          |  17 +-
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |   2 +-
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |   3 +-
 ...re.pr-flow.pr-validation.open-hydration.test.ts |  28 +-
 .../cli/run-cli.core.pr-flow.pr-validation.test.ts |   6 +-
 .../src/cli/run-cli.core.pr-flow.status.test.ts    |  14 +-
 .../src/cli/run-cli.core.task-handoff.test.ts      |  36 +-
 ...li.core.tasks.query-run-execute.control.test.ts |   2 +-
 ...run-cli.core.tasks.query-run-inspection.test.ts |  16 +-
 .../src/commands/branch/work-start.direct.ts       |   1 +
 .../src/commands/guard/impl/close-message.test.ts  |  27 ++
 .../src/commands/guard/impl/close-message.ts       |  12 +-
 packages/agentplane/src/commands/shared/pr-meta.ts |   2 +-
 .../src/commands/shared/pr-meta/builders.ts        |   2 +-
 .../src/commands/shared/pr-meta/helpers.ts         |   2 +-
 .../src/commands/shared/pr-meta/lifecycle.ts       |   2 +-
 .../commands/shared/pr-meta/{types.ts => model.ts} |   0
 .../src/commands/shared/pr-meta/parser.ts          |   2 +-
 .../src/cli-core-tasks-query.expected-run.ts       | 125 +++---
 27 files changed, 686 insertions(+), 120 deletions(-)
```

</details>
