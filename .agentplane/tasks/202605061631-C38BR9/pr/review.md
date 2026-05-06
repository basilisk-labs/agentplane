# PR Review

Created: 2026-05-06T16:32:44.802Z

## Task

- Task: `202605061631-C38BR9`
- Title: Fix incident promotion and clear active registry
- Status: DOING
- Branch: `task/202605061631-C38BR9/incident-registry-cleanup`
- Canonical task record: `.agentplane/tasks/202605061631-C38BR9/README.md`

## Verification

- State: ok
- Note: Implemented explicit incident promotion: task findings are local by default, --promote/--external/--repo-fixable opt into registry candidates, success verification summaries are excluded from auto-promotion, and the active incident registry is archived/cleared for release.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T17:00:33.282Z
- Branch: task/202605061631-C38BR9/incident-registry-cleanup
- Head: 46bbde9323af

```text
 .agentplane/policy/incidents.md                    |  19 -
 .../blueprint/resolved-snapshot.json               | 401 +++++++++++++++++++++
 docs/developer/incident-archive.mdx                |  24 ++
 docs/user/agent-bootstrap.generated.mdx            |   2 +-
 docs/user/cli-reference.generated.mdx              |  46 ++-
 packages/agentplane/assets/policy/incidents.md     |  19 -
 .../run-cli.core.help-snap.test.ts.snap            | 235 +++++-------
 packages/agentplane/src/cli/bootstrap-guide.ts     |   2 +-
 packages/agentplane/src/cli/command-guide.test.ts  |  11 +-
 packages/agentplane/src/cli/command-guide.ts       |   2 +-
 .../src/cli/run-cli.core.incidents.test.ts         |  80 +++-
 .../run-cli.core.pr-flow.pr-notes-verify.test.ts   |   2 +
 .../src/cli/run-cli.core.tasks.findings.test.ts    |  13 +-
 .../cli/run-cli.core.tasks.verify-matrix.test.ts   |   4 +-
 .../agentplane/src/commands/finish.spec.shared.ts  |   9 +-
 packages/agentplane/src/commands/finish.spec.ts    |   4 +-
 .../agentplane/src/commands/incidents/shared.ts    |  10 +-
 .../src/commands/task/findings-add.command.ts      |  31 +-
 .../src/commands/task/findings.command.ts          |   5 +-
 .../src/commands/task/finish-findings.ts           |   6 +-
 .../agentplane/src/commands/task/finish-plan.ts    |   2 +
 .../agentplane/src/commands/task/finish-types.ts   |   4 +
 .../commands/task/finish.close-tail.unit.test.ts   |   5 +-
 .../src/commands/task/verify-command-shared.ts     |  41 ++-
 .../src/commands/task/verify-ok.command.ts         |   2 +
 .../src/commands/task/verify-record-execute.ts     |  10 +-
 .../agentplane/src/commands/task/verify-record.ts  |  12 +
 .../src/commands/task/verify-record.types.ts       |   2 +
 .../src/commands/task/verify-record.unit.test.ts   |   5 +-
 .../src/commands/task/verify-rework.command.ts     |   2 +
 packages/agentplane/src/commands/verify.run.ts     |   2 +
 packages/agentplane/src/commands/verify.spec.ts    |   2 +-
 .../src/runtime/incidents/plan-strategy.ts         |  23 +-
 33 files changed, 763 insertions(+), 274 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
