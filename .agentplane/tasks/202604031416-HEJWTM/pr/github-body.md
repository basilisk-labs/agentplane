## Summary

Automate incidents registry and advice lookup

Make incidents.md accumulate resolved incident candidates from finished tasks and surface relevant incident advice for new tasks by tags or scope before release.

## Scope

- In scope: Make incidents.md accumulate resolved incident candidates from finished tasks and surface relevant incident advice for new tasks by tags or scope before release.
- Out of scope: unrelated refactors not required for "Automate incidents registry and advice lookup".

## Verification

### Plan

1. Run focused incident-registry and task-workflow tests that cover candidate extraction, incidents.md append, deduplication, and advice lookup. Expected: the new incident collection and advice surfaces behave deterministically and existing workflows stay green.
2. Exercise the relevant CLI/task path on a fixture task with incident-candidate findings. Expected: the resolved incident is promotable into `.agentplane/policy/incidents.md` with traceable evidence and no manual file surgery.
3. Start or inspect a new analogous task with matching tags/scope. Expected: the task workflow surfaces the relevant incident advice before execution so the same external/process failure is not rediscovered blindly.

### Current Status

- State: ok
- Note: Verified: added incidents runtime/CLI, finish auto-promotion, start-ready advice lookup, synced live + asset policy templates, and passed bunx vitest run packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.incidents.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u --hookTimeout 60000 --testTimeout 60000; bun run typecheck; bun run --filter=agentplane build; node .agentplane/policy/check-routing.mjs; pre-commit fast contour passed during source commit.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-03T14:49:58.299Z
- Branch: task/202604031416-HEJWTM/incidents-registry
- Head: 580d998ac807

```text
 .agentplane/agents/CODER.json                      |   2 +-
 .agentplane/policy/dod.core.md                     |   2 +-
 .agentplane/policy/governance.md                   |   3 +
 .agentplane/policy/incidents.md                    |  24 +-
 .agentplane/policy/workflow.branch_pr.md           |   2 +
 .agentplane/policy/workflow.direct.md              |   4 +-
 .agentplane/tasks/202604031416-HEJWTM/README.md    | 118 +++++
 .../tasks/202604031416-HEJWTM/pr/diffstat.txt      |  28 ++
 .../tasks/202604031416-HEJWTM/pr/github-body.md    |  77 +++
 .../tasks/202604031416-HEJWTM/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604031416-HEJWTM/pr/meta.json |  14 +
 .../tasks/202604031416-HEJWTM/pr/notes.jsonl       |   0
 .agentplane/tasks/202604031416-HEJWTM/pr/review.md |  84 ++++
 .../tasks/202604031416-HEJWTM/pr/verify.log        |   0
 packages/agentplane/assets/AGENTS.md               |   4 +-
 packages/agentplane/assets/agents/CODER.json       |   2 +-
 packages/agentplane/assets/policy/dod.core.md      |   2 +-
 packages/agentplane/assets/policy/governance.md    |   3 +
 packages/agentplane/assets/policy/incidents.md     |  22 +
 .../agentplane/assets/policy/workflow.branch_pr.md |   2 +
 .../agentplane/assets/policy/workflow.direct.md    |   4 +-
 .../run-cli.core.help-snap.test.ts.snap            |   8 +-
 .../src/cli/run-cli.core.incidents.test.ts         | 175 +++++++
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  | 241 ++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  22 +
 .../src/commands/incidents/advise.command.ts       | 165 +++++++
 .../src/commands/incidents/collect.command.ts      |  84 ++++
 .../src/commands/incidents/incidents.command.ts    |  29 ++
 .../agentplane/src/commands/incidents/shared.ts    | 171 +++++++
 packages/agentplane/src/commands/task/finish.ts    |  24 +
 .../agentplane/src/commands/task/start-ready.ts    |  13 +-
 packages/agentplane/src/runtime/incidents/index.ts |  23 +
 .../src/runtime/incidents/resolve.test.ts          | 154 ++++++
 .../agentplane/src/runtime/incidents/resolve.ts    | 518 +++++++++++++++++++++
 packages/agentplane/src/runtime/incidents/types.ts |  80 ++++
 35 files changed, 2093 insertions(+), 12 deletions(-)
```

</details>
