## Summary

Prepare patch release v0.3.12

Prepare and land the next patch release after branch_pr release-flow hardening.

## Scope

- In scope: Prepare and land the next patch release after branch_pr release-flow hardening.
- Out of scope: unrelated refactors not required for "Prepare patch release v0.3.12".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-14T13:42:41.079Z
- Branch: task/202604141003-TTYK1C/patch-release-v0-3-12
- Head: 03dfafa5654d

```text
 .agentplane/config.json                            |   2 +-
 bun.lock                                           |   6 +-
 docs/reference/generated-reference.mdx             |   4 +-
 docs/releases/v0.3.12.md                           | 319 +++++++++++++++++++++
 docs/user/agent-bootstrap.generated.mdx            |   4 +-
 packages/agentplane/assets/AGENTS.md               |   4 +-
 packages/agentplane/package.json                   |   4 +-
 .../run-cli.core.help-snap.test.ts.snap            |   2 +-
 .../src/cli/release-recovery-script.test.ts        |  80 +++---
 .../run-cli.core.lifecycle.block-finish.test.ts    |   8 +-
 .../src/cli/run-cli.core.pr-flow.test.ts           |   3 -
 .../src/cli/run-cli.core.tasks.query.test.ts       |  31 +-
 .../src/cli/wait-remote-pr-checks-script.test.ts   |  25 +-
 .../src/commands/release/apply.command.ts          |  22 +-
 .../src/commands/release/apply.mutation.ts         |   1 +
 .../agentplane/src/commands/release/apply.test.ts  |  14 +-
 .../release/local-release-e2e-script.test.ts       |  82 ++----
 .../npm-version-availability-script.test.ts        |  85 ++++++
 .../resolve-release-ready-source-script.test.ts    | 103 ++++---
 .../src/runner/usecases/task-run-lifecycle.test.ts |  19 +-
 packages/core/package.json                         |   2 +-
 scripts/check-npm-version-availability.mjs         |  10 +
 scripts/lib/github-actions-workflow-status.mjs     |  20 ++
 23 files changed, 682 insertions(+), 168 deletions(-)
```

</details>
