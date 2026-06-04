# PR Review

Created: 2026-06-04T21:58:10.023Z

## Batch Tasks

- Primary: `202606042157-020DWK`
- Closure policy: `all_or_fail`
- Included: `202606042204-NX58GD`
- Included: `202606042214-GEJ627`
- Included: `202606042225-FE57GC`
- Included: `202606042230-T1RYR8`
- Included: `202606042236-HJCTGD`
- Included: `202606042239-5Z9J95`

## Task

- Task: `202606042157-020DWK`
- Title: Reduce agent cognitive load and publish next patch
- Status: DOING
- Branch: `task/202606042157-020DWK/reduce-agent-cognitive-load-and-publish-next-pat`
- Canonical task record: `.agentplane/tasks/202606042157-020DWK/README.md`

## Verification

- State: ok
- Note: Verified: route packet refactor keeps hybrid PR update on CODER rail, surfaces evidence_missing in text output, and preserves PR check diagnostics.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-04T21:58:10.023Z
- Branch: task/202606042157-020DWK/reduce-agent-cognitive-load-and-publish-next-pat
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202606042204-NX58GD/README.md    | 204 ++++++++
 .../blueprint/resolved-snapshot.json               | 573 +++++++++++++++++++++
 .agentplane/tasks/202606042214-GEJ627/README.md    | 204 ++++++++
 .../blueprint/resolved-snapshot.json               | 573 +++++++++++++++++++++
 .agentplane/tasks/202606042225-FE57GC/README.md    | 185 +++++++
 .../blueprint/resolved-snapshot.json               | 362 +++++++++++++
 .agentplane/tasks/202606042230-T1RYR8/README.md    | 185 +++++++
 .../blueprint/resolved-snapshot.json               | 362 +++++++++++++
 .agentplane/tasks/202606042236-HJCTGD/README.md    | 185 +++++++
 .../blueprint/resolved-snapshot.json               | 362 +++++++++++++
 .agentplane/tasks/202606042239-5Z9J95/README.md    | 185 +++++++
 .../blueprint/resolved-snapshot.json               | 362 +++++++++++++
 .../src/adapters/git/git-context-adapter.ts        |   8 +-
 packages/agentplane/src/cli/reason-codes.ts        |  18 +
 .../cli/run-cli.core.hooks.runtime-shim.test.ts    |  26 +
 .../guard/impl/commands.commit-close.unit.test.ts  |   1 +
 .../impl/commands.commit-non-close.unit.test.ts    |  51 ++
 .../src/commands/guard/impl/commit-diagnostics.ts  |  61 ++-
 .../guard/impl/commit-diagnostics.unit.test.ts     |  54 ++
 .../src/commands/guard/impl/commit-refresh.ts      |   3 +-
 .../src/commands/guard/impl/commit-runner.ts       |  48 ++
 .../agentplane/src/commands/hooks/run.pre-push.ts  |  22 +
 .../src/commands/pr/internal/auto-commit.test.ts   | 100 ++++
 .../src/commands/pr/internal/auto-commit.ts        |  34 +-
 .../src/commands/pr/internal/freshness.test.ts     |  25 +
 .../src/commands/pr/internal/freshness.ts          |   1 +
 packages/agentplane/src/commands/pr/open.ts        |   1 +
 packages/agentplane/src/commands/pr/update.ts      |   1 +
 .../agentplane/src/commands/shared/git-timeouts.ts |   8 +
 .../src/commands/shared/route-guidance.test.ts     |  51 ++
 .../src/commands/shared/route-oracle.test.ts       |  48 ++
 .../agentplane/src/commands/shared/route-oracle.ts |   8 +
 .../agentplane/src/commands/task/brief-render.ts   |   4 +
 .../src/commands/task/next-action.command.ts       |   4 +
 packages/agentplane/src/ports/git-port.ts          |   8 +-
 packages/core/src/git/git-client.ts                |  21 +-
 36 files changed, 4335 insertions(+), 13 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
