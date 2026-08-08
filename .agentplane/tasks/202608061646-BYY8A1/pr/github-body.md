Task: `202608061646-BYY8A1`
Title: Qualify and publish AgentPlane 0.7.5 supervisor-first UX patch
Canonical task record: `.agentplane/tasks/202608061646-BYY8A1/README.md`

## Summary

Qualify and publish AgentPlane 0.7.5 UX routing patch

Document the explainable auto-routing and simplified task UX, run focused and full release qualification including compatibility and efficiency checks, publish v0.7.5 through the protected branch_pr release route, and verify npm plus GitHub release truth.

## Scope

- In scope: Document the explainable auto-routing and simplified task UX, run focused and full release qualification including compatibility and efficiency checks, publish v0.7.5 through the protected branch_pr release route, and verify npm plus GitHub release truth.
- Out of scope: unrelated refactors not required for "Qualify and publish AgentPlane 0.7.5 UX routing patch".

## Verification

- State: blocked_external
- Note:

```text
ci:local:full failed on implementation 1bf5c98ec: supervisor-execution-episode.ts is 632 lines,
above the 600-line hotspot limit
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T03:52:32.565Z
- Branch: task/202608061646-BYY8A1/qualify-and-publish-agentplane-0-7-5-supervisor
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/releases/v0.7.5.md                            |  68 +++++++
 package.json                                       |   2 +-
 .../run-cli.core.help-snap.test.ts.snap            |   3 +-
 .../src/cli/measure-cli-cold-path-script.test.ts   |  15 +-
 .../cli/run-cli.core.branch-meta.readiness.test.ts |  12 +-
 ...n-cli.core.branch-meta.workflow-profile.test.ts |  10 +-
 .../src/cli/run-cli.core.docs-cli.test.ts          |   2 +-
 .../src/cli/run-cli.core.help-contract.test.ts     |   2 +-
 .../src/cli/run-cli.core.pr-flow.test.ts           |  28 ++-
 ...li.core.route-decision.pr-open-metadata.test.ts |  17 ++
 .../src/cli/run-cli.core.task-advance.test.ts      |  57 ++++++
 .../cli/run-cli.core.task-next-action-json.test.ts |  22 +++
 ...critical.agent-efficiency-replay-driver.test.ts |  52 +++++-
 .../shared/supervisor-execution-episode.test.ts    |  43 +++++
 .../shared/supervisor-execution-episode.ts         |  62 ++++++-
 ...direct-task-supervisor-formal-operation.test.ts |  34 +++-
 .../direct-task-supervisor-formal-operation.ts     | 196 +++++++++++----------
 .../commands/task/direct-task-verification.test.ts |  32 +++-
 .../src/commands/task/direct-task-verification.ts  |  15 +-
 .../src/commands/task/external-agent-exchange.ts   |   2 +-
 .../src/commands/task/external-agent-supervisor.ts |  27 ++-
 .../runner/context/semantic-prompt-projection.ts   |   2 +-
 .../src/runner/phase-tools/broker.test.ts          |  81 ++++++---
 .../agentplane/src/runner/phase-tools/broker.ts    |  11 +-
 .../task-run-bootstrap.result-examples.test.ts     |  38 ++++
 .../src/runner/usecases/task-run-bootstrap.ts      |  14 +-
 packages/agentplane/src/shared/stable-file.test.ts |  23 +++
 scripts/README.md                                  |   2 +-
 .../bench/capture-agent-efficiency-candidate.mjs   |   9 +-
 .../internal/agent-efficiency-codex-runtime.mjs    |  38 +++-
 .../bench/run-agent-efficiency-codex-replay.mjs    |   2 +
 .../qualification/release-qualification.test.mjs   |   9 +
 .../run-v0.7.1-release-qualification.mjs           |   2 +
 website/static/img/social/docs/releases/v0.7.5.png | Bin 0 -> 53016 bytes
 website/static/img/social/manifest.json            |   8 +
 website/static/llms-full.txt                       |  52 +++++-
 36 files changed, 820 insertions(+), 172 deletions(-)
```

</details>
