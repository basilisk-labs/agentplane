# PR Review

Created: 2026-09-30T02:39:13.388Z

## Task

- Task: `202609300006-CGH9FT`
- Title: Integrate all four open issue fixes with canonical routing and hermetic CI evidence
- Status: DOING
- Branch: `task/202609300006-CGH9FT/integrate-all-four-open-issue-fixes-with-canonic`
- Canonical task record: `.agentplane/tasks/202609300006-CGH9FT/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-30T03:29:52.684Z
- Branch: task/202609300006-CGH9FT/integrate-all-four-open-issue-fixes-with-canonic
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 knip.json                                          |  39 +--
 .../cli/run-cli.core.kernel-projection.testkit.ts  | 116 +++++++++
 .../src/cli/run-cli.core.kernel-transport.test.ts  | 188 +++++++++++++-
 ...ender-scoop-and-setup-standalone-script.test.ts |  72 ++++--
 .../src/commands/shared/declared-check.test.ts     |  15 ++
 .../src/commands/shared/declared-check.ts          |   6 +-
 .../shared/route-decision-workspace.test.ts        |  40 ++-
 .../commands/shared/route-decision-workspace.ts    |  11 +-
 .../agentplane/src/commands/shared/task-backend.ts |  51 +++-
 .../src/commands/task/advance-task-step.ts         |  24 ++
 .../agentplane/src/commands/task/create.command.ts | 128 +---------
 .../agentplane/src/commands/task/create.test.ts    |  33 +++
 .../task/direct-task-verification.python.test.ts   | 218 ++++++++++++++++
 .../src/commands/task/direct-task-verification.ts  |  24 +-
 .../src/commands/task/execution-contract-intake.ts |  93 +++++++
 .../commands/task/execution-contract-options.ts    |  59 +++++
 .../src/commands/task/kernel-advance.test.ts       |   6 +
 .../commands/task/kernel-final-validation.test.ts  |  18 ++
 .../src/commands/task/kernel-final-validation.ts   |   9 +-
 .../src/commands/task/kernel-inspection.ts         |   7 +-
 .../task/kernel-operational-projection-recovery.ts | 276 +++++++++++++++++++++
 .../commands/task/kernel-planning-checkout.test.ts |  95 +++++++
 .../src/commands/task/kernel-planning-checkout.ts  |  45 ++++
 .../commands/task/new-execution-contract.test.ts   | 159 ++++++++++++
 packages/agentplane/src/commands/task/new.spec.ts  |   7 +
 packages/agentplane/src/commands/task/new.ts       |  49 ++--
 .../task/roadmap-common-review-application.test.ts |   2 +
 .../commands/task/roadmap-terminal-noop.test.ts    |  35 +++
 .../src/commands/task/scope-extend.command.test.ts |  82 +++++-
 .../agentplane/src/commands/task/scope-extend.ts   |   8 +-
 .../temp-root-cleanup.integration.test.ts          | 211 ++++++++++++++++
 .../src/cli-harness/temp-root-cleanup.measure.mjs  | 106 ++++++++
 .../baselines/v0.7-compatibility-candidate.json    |  97 +++++++-
 .../check-compatibility-contract-baseline.mjs      |  72 ++++++
 34 files changed, 2182 insertions(+), 219 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
