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
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T22:54:07.040Z
- Branch: task/202609192051-QAHTFD/canonical-qahtfd
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/integrate/internal/prepare.ts  |   1 +
 .../shared/canonical-pre-merge-evidence.test.ts    | 118 ++++++++++++++++++++
 .../shared/canonical-pre-merge-evidence.ts         |   3 +-
 .../commands/shared/quality-review-target.test.ts  |  25 +++++
 .../src/commands/shared/quality-review-target.ts   |  24 +++-
 .../src/commands/shared/route-decision-blockers.ts |   2 +-
 .../commands/task/direct-task-finalization.test.ts |  47 +++++++-
 .../src/commands/task/direct-task-finalization.ts  |   8 +-
 .../direct-task-verification.qualification.test.ts | 104 ++++++++++++++++++
 .../commands/task/direct-task-verification.test.ts |  16 ---
 .../src/commands/task/direct-task-verification.ts  |  80 +++++++++++++-
 .../commands/task/hosted-close-premerge.test.ts    |  78 ++++++++++++-
 .../src/commands/task/hosted-close-premerge.ts     |  47 +++++++-
 .../src/commands/task/kernel-advance.test.ts       |  97 ++++++++++++++++-
 .../agentplane/src/commands/task/kernel-advance.ts |  14 +++
 .../task/kernel-repository-coordinator.test.ts     |  28 ++++-
 .../commands/task/kernel-repository-coordinator.ts |   6 +-
 .../src/commands/task/kernel-worktree-routing.ts   | 121 +++++++++++++++++++++
 18 files changed, 780 insertions(+), 39 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
