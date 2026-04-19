# PR Review

Created: 2026-04-18T18:41:08.809Z
Branch: task/202604181840-K8PDGY/release-ci-regression

## Summary

Stabilize release CI regression tests after branch_pr close-tail changes

Refresh help snapshots, align finish close-tail expectations, and bypass hooks in isolated git fixture tests so release:ci-check passes deterministically.

## Scope

- In scope: Refresh help snapshots, align finish close-tail expectations, and bypass hooks in isolated git fixture tests so release:ci-check passes deterministically.
- Out of scope: unrelated refactors not required for "Stabilize release CI regression tests after branch_pr close-tail changes".

## Verification

### Plan

1. Review the requested outcome for "Stabilize release CI regression tests after branch_pr close-tail changes". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Verified: release CI regressions are resolved; release:ci-check and the targeted branch_pr/release suites are green.

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

- Updated: 2026-04-19T11:21:23.627Z
- Branch: task/202604181840-K8PDGY/release-ci-regression
- Head: 07fadc5d64a2

```text
 .../run-cli.core.help-snap.test.ts.snap            |    3 +-
 packages/agentplane/src/cli/release-smoke.test.ts  |    2 +-
 ...n-cli.core.branch-meta.sync-maintenance.test.ts |    5 +-
 .../cli/run-cli.core.guard.commit-wrapper.test.ts  |  294 +--
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  |  191 +-
 .../src/cli/run-cli.core.incidents.test.ts         |    3 +-
 .../run-cli.core.lifecycle.block-finish.test.ts    |   72 +-
 .../src/cli/run-cli.core.lifecycle.test.ts         |  338 ++--
 .../cli/run-cli.core.pr-close-superseded.test.ts   |  375 ++--
 .../src/cli/run-cli.core.pr-close.test.ts          |    3 +-
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts |    3 +-
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  300 +--
 .../src/cli/run-cli.core.pr-flow.test.ts           |    4 +-
 .../src/cli/run-cli.core.task-hosted-close.test.ts |  561 +++---
 .../run-cli.core.tasks.normalize-migrate.test.ts   | 2018 ++++++++++----------
 .../src/cli/run-cli.core.tasks.query.test.ts       |    5 +-
 .../agentplane/src/cli/run-cli.core.tasks.test.ts  |    5 +-
 .../src/cli/run-cli.critical.exit-codes.test.ts    |   27 +-
 .../agentplane/src/cli/stale-dist-readonly.test.ts |   66 +-
 .../src/cli/wait-remote-pr-checks-script.test.ts   |  324 ++--
 .../agentplane/src/commands/doctor.command.test.ts |   13 +-
 .../src/commands/guard/impl/close-message.test.ts  |   46 +-
 .../agentplane/src/commands/release/apply.test.ts  |  227 +--
 .../resolve-canonical-release-sha-script.test.ts   |  157 +-
 .../src/commands/shared/task-backend.test.ts       |  641 ++++---
 .../src/commands/task/hosted-close.command.ts      |   26 +-
 26 files changed, 3006 insertions(+), 2703 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
