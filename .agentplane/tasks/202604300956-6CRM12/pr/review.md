# PR Review

Created: 2026-04-30T10:07:30.508Z
Branch: task/202604300956-6CRM12/v0-4-0-release

## Summary

Publish v0.4.0 release

Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.

## Scope

- In scope: Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.
- Out of scope: unrelated refactors not required for "Publish v0.4.0 release".

## Verification

### Plan

1. Run `agentplane release plan --minor --yes`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane release candidate --push --yes`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run release:parity`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run release:check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `GitHub PR checks pass`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `Publish to npm workflow succeeds`. Expected: it succeeds and confirms the requested outcome for this task.
7. Run `npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version`. Expected: it succeeds and confirms the requested outcome for this task.
8. Run `git ls-remote --tags origin v0.4.0`. Expected: it succeeds and confirms the requested outcome for this task.
9. Run `gh release view v0.4.0`. Expected: it succeeds and confirms the requested outcome for this task.
10. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
11. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: pending
- Note: Not recorded yet.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T15:25:12.354Z
- Branch: task/202604300956-6CRM12/v0-4-0-release
- Head: 6b52826db0fc

```text
 docs/releases/v0.4.0.md                            | 156 +++++++
 .../agentplane/src/agents/agents-template.test.ts  |  15 +-
 packages/agentplane/src/agents/agents-template.ts  |   3 +-
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  | 158 +++++++
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  | 142 ------
 .../src/cli/run-cli.core.incidents.test.ts         |  12 +-
 .../run-cli.core.pr-flow.pr-notes-verify.test.ts   |   2 +-
 .../run-cli.core.tasks.normalize-migrate.test.ts   |   2 +-
 .../src/cli/run-cli/commands/init/write-agents.ts  |   4 +-
 .../commands/release/release-ci-contract.test.ts   |  15 +
 .../src/runtime/incidents/plan-strategy.ts         |   2 +-
 .../src/runtime/prompt-modules/compiler.merge.ts   | 183 ++++++++
 .../src/runtime/prompt-modules/compiler.shared.ts  |  41 ++
 .../src/runtime/prompt-modules/compiler.ts         | 220 +---------
 .../src/runtime/prompt-modules/registry.test.ts    |   3 +-
 scripts/baselines/knip-baseline.json               | 487 ++++++++++++++++-----
 scripts/run-vitest-suite.mjs                       | 128 +++++-
 vitest.workspace.ts                                |   5 +-
 18 files changed, 1069 insertions(+), 509 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
