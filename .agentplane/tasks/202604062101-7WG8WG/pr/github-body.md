## Summary

Report explicit incident promotion outcome in lifecycle commands

Make finish, integrate, and hosted-close report whether incidents were promoted or why the registry stayed unchanged so operators can distinguish no-op from breakage.

## Scope

- In scope: Make finish, integrate, and hosted-close report whether incidents were promoted or why the registry stayed unchanged so operators can distinguish no-op from breakage.
- Out of scope: unrelated refactors not required for "Report explicit incident promotion outcome in lifecycle commands".

## Verification

### Plan

- Run focused vitest coverage for finish, integrate, and hosted-close output paths.
- Run eslint on the touched lifecycle command source/tests.
- Smoke-check at least one non-quiet lifecycle path to confirm incident outcome messaging is explicit.

### Current Status

- State: ok
- Note: Verification made incident promotion outcomes explicit in finish, integrate, and hosted-close. Commands: bun x vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts; bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/hosted-close.command.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts. Result: pass. Evidence: lifecycle commands now report either promoted incident count or explicit no-op, and focused contract suites passed. Scope: incidents collection messaging across finish, integrate, and hosted-close.

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

- Updated: 2026-04-06T21:11:54.261Z
- Branch: task/202604062101-7WG8WG/incident-outcome-messaging
- Head: e14d47287c99

```text
 .agentplane/tasks/202604062101-7WG8WG/README.md    | 122 +++++++++++++++++++++
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts |   1 +
 .../src/cli/run-cli.core.task-hosted-close.test.ts |   1 +
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  |   2 +-
 .../agentplane/src/commands/incidents/shared.ts    |   6 +
 .../pr/integrate/internal/finalize.test.ts         |  24 +++-
 .../src/commands/pr/integrate/internal/finalize.ts |   8 +-
 packages/agentplane/src/commands/task/finish.ts    |   8 +-
 .../src/commands/task/finish.unit.test.ts          |  52 +++++++++
 .../src/commands/task/hosted-close.command.ts      |   7 +-
 10 files changed, 219 insertions(+), 12 deletions(-)
```

</details>
