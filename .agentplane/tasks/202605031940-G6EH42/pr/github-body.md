Task: `202605031940-G6EH42`
Title: Fix WORKFLOW-only test config assumptions

## Summary

Fix WORKFLOW-only test config assumptions

Update test fixtures/setup so broad project tests do not require committed .agentplane/config.json; tests that need legacy config must generate it explicitly.

## Scope

- In scope: Update test fixtures/setup so broad project tests do not require committed .agentplane/config.json; tests that need legacy config must generate it explicitly.
- Out of scope: unrelated refactors not required for "Fix WORKFLOW-only test config assumptions".

## Verification

- State: ok
- Note: Command: bun run test:project agentplane. Result: pass. Evidence: 243 test files passed, 1346 tests passed, 2 skipped after build generated dist/cli.js. Scope: broad agentplane project tests covering WORKFLOW-only config migration, release/upgrade staging, doctor/runtime checks, and CLI regressions.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T19:56:09.179Z
- Branch: task/202605031940-G6EH42/workflow-only-test-config
- Head: 301a8b54af9e

```text
 .../agentplane/src/agents/agents-template.test.ts  |  2 +-
 packages/agentplane/src/cli/core-imports.ts        |  2 +-
 .../src/cli/release-critical-lifecycle.test.ts     |  4 +-
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    |  2 +-
 .../agentplane/src/cli/run-cli.core.init.test.ts   | 35 +++++++--------
 .../run-cli.core.pr-flow.integrate-merge.test.ts   |  4 +-
 ...n-cli.core.pr-flow.integrate-validation.test.ts |  4 +-
 .../run-cli.core.tasks.normalize-migrate.test.ts   |  6 +--
 packages/agentplane/src/cli/run-cli.core.test.ts   |  6 +--
 .../src/cli/run-cli.critical.exit-codes.test.ts    |  4 +-
 .../src/cli/run-cli.critical.scope-leak.test.ts    |  4 +-
 .../src/cli/run-cli.critical.symlink-root.test.ts  |  2 +-
 .../src/commands/doctor.command.open-pr.test.ts    | 50 +++++++++-------------
 .../src/commands/doctor.command.runtime.test.ts    | 47 ++++++--------------
 .../agentplane/src/commands/doctor.fast.test.ts    | 12 +++---
 .../commands/release/apply.pipeline/mutation.ts    |  2 +-
 .../release/apply.version-mutation.test.ts         |  6 +--
 .../src/commands/runtime.command.test.ts           | 10 +++--
 .../src/commands/shared/task-backend.test.ts       |  4 +-
 .../commands/upgrade.json-merge.stability.test.ts  |  2 +-
 .../agentplane/src/commands/upgrade.merge.test.ts  | 21 +++++----
 packages/agentplane/src/commands/upgrade.ts        |  3 +-
 packages/core/src/git/git-utils.test.ts            |  2 +-
 23 files changed, 103 insertions(+), 131 deletions(-)
```

</details>
