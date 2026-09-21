# PR Review

Created: 2026-09-21T12:18:29.179Z

## Task

- Task: `202609211051-X92CWM`
- Title: Repair the demonstrated 0.7.11 release blockers without weakening gates: project canonical plan approval for branch-P...
- Status: DOING
- Branch: `task/202609211051-X92CWM/repair-the-demonstrated-0-7-11-release-blockers`
- Canonical task record: `.agentplane/tasks/202609211051-X92CWM/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-21T12:18:29.179Z
- Branch: task/202609211051-X92CWM/repair-the-demonstrated-0-7-11-release-blockers
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 artifacts/m03-0.7.10-vs-0.7.11-local-replay.json   |  20 +-
 docs/reference/clean-task-core-rebuild-spec.mdx    |   2 +-
 docs/user/cli-reference.generated.mdx              |  10 +-
 .../src/cli/run-cli.critical.task-centric.test.ts  | 105 +++-
 .../commands/shared/semantic-result-admission.ts   |   2 +-
 .../shared/workflow-step-factory-branch.ts         |  94 ++++
 .../src/commands/shared/workflow-step-factory.ts   |  97 +---
 .../task/direct-task-verification-checks.ts        | 117 ++++
 .../src/commands/task/direct-task-verification.ts  | 129 +----
 .../commands/task/kernel-inspection-validation.ts  | 360 +++++++++++++
 .../src/commands/task/kernel-inspection.ts         | 374 +------------
 .../src/commands/task/kernel-worktree-routing.ts   |  47 +-
 .../commands/task/migration-apply-conversion.ts    | 548 +++++++++++++++++++
 .../src/commands/task/migration-apply.ts           | 586 ++-------------------
 .../src/commands/task/plan-approve.command.ts      |  21 +
 .../src/tasks/task-centric/task-centric.test.ts    |   5 +-
 scripts/bench/paired-m03-local-replay.mjs          |  18 +-
 .../check-post-convergence-test-topology.mjs       |  14 +-
 scripts/checks/post-convergence-test-topology.json | 165 +++++-
 website/static/llms-full.txt                       | 106 +++-
 20 files changed, 1629 insertions(+), 1191 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
