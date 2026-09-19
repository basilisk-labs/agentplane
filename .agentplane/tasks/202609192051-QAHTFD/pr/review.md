# PR Review

Created: 2026-09-19T20:59:01.339Z

## Task

- Task: `202609192051-QAHTFD`
- Title: Productize release-blocking AgentPlane controller fixes for 0.7.10
- Status: DOING
- Branch: `task/202609192051-QAHTFD/canonical-qahtfd`
- Canonical task record: `.agentplane/tasks/202609192051-QAHTFD/README.md`

## Verification

- State: ok
- Note: Canonical validation sha256:c48c85d1bbd14eebd2bdf1e6a8ee59f74f68e9bf3173a2408961ea6c1950be71
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T20:59:01.339Z
- Branch: task/202609192051-QAHTFD/canonical-qahtfd
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/integrate/internal/prepare.ts  |   1 +
 .../shared/canonical-pre-merge-evidence.ts         |   3 +-
 .../commands/shared/quality-review-target.test.ts  |  46 +++++++
 .../src/commands/shared/quality-review-target.ts   |  24 +++-
 .../shared/route-decision-blockers.kernel.test.ts  |  36 +++++
 .../src/commands/shared/route-decision-blockers.ts |   1 +
 .../src/commands/shared/workflow-step-branch.ts    |  49 +++----
 .../src/commands/shared/workflow-step.test.ts      |  24 ++++
 .../commands/task/direct-task-verification.test.ts |  79 +++++++++++
 .../src/commands/task/direct-task-verification.ts  |  80 +++++++++++-
 .../commands/task/hosted-close-premerge.test.ts    |  78 ++++++++++-
 .../src/commands/task/hosted-close-premerge.ts     |  50 ++++++-
 .../agentplane/src/commands/task/kernel-advance.ts | 145 +++++++++++++++++++++
 .../commands/task/kernel-advance.worktree.test.ts  |  91 +++++++++++++
 .../task/kernel-repository-coordinator.test.ts     |   7 +-
 .../commands/task/kernel-repository-coordinator.ts |   3 +
 16 files changed, 671 insertions(+), 46 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
