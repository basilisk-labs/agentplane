# PR Review

Created: 2026-08-08T03:44:44.414Z

## Task

- Task: `202608061646-BYY8A1`
- Title: Qualify and publish AgentPlane 0.7.5 supervisor-first UX patch
- Status: BLOCKED
- Branch: `task/202608061646-BYY8A1/qualify-and-publish-agentplane-0-7-5-supervisor`
- Canonical task record: `.agentplane/tasks/202608061646-BYY8A1/README.md`

## Verification

- State: blocked_external
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-08T03:52:32.565Z
- Branch: task/202608061646-BYY8A1/qualify-and-publish-agentplane-0-7-5-supervisor
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/releases/v0.7.5.md                            |  63 +++++++++++++++++++++
 package.json                                       |   2 +-
 .../run-cli.core.help-snap.test.ts.snap            |   3 +-
 .../cli/run-cli.core.branch-meta.readiness.test.ts |  12 ++--
 ...n-cli.core.branch-meta.workflow-profile.test.ts |  10 +++-
 .../src/cli/run-cli.core.docs-cli.test.ts          |   2 +-
 .../src/cli/run-cli.core.help-contract.test.ts     |   2 +-
 .../src/cli/run-cli.core.pr-flow.test.ts           |  28 ++++++++-
 ...li.core.route-decision.pr-open-metadata.test.ts |  17 ++++++
 .../cli/run-cli.core.task-next-action-json.test.ts |  22 +++++++
 .../commands/task/direct-task-verification.test.ts |  32 ++++++++++-
 .../src/commands/task/direct-task-verification.ts  |  15 ++++-
 .../runner/context/semantic-prompt-projection.ts   |   2 +-
 .../task-run-bootstrap.result-examples.test.ts     |  38 +++++++++++++
 .../src/runner/usecases/task-run-bootstrap.ts      |  14 ++++-
 scripts/README.md                                  |   2 +-
 .../qualification/release-qualification.test.mjs   |   9 +++
 .../run-v0.7.1-release-qualification.mjs           |   2 +
 website/static/img/social/docs/releases/v0.7.5.png | Bin 0 -> 53016 bytes
 website/static/img/social/manifest.json            |   8 +++
 website/static/llms-full.txt                       |  52 +++++++++++++++--
 21 files changed, 309 insertions(+), 26 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
