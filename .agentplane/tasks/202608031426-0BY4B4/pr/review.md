# PR Review

Created: 2026-08-03T14:26:49.868Z

## Task

- Task: `202608031426-0BY4B4`
- Title: Make integration handoff and hosted-close finalization converge
- Status: DOING
- Branch: `task/202608031426-0BY4B4/make-integration-handoff-and-hosted-close-finali`
- Canonical task record: `.agentplane/tasks/202608031426-0BY4B4/README.md`

## Verification

- State: ok
- Note: Verified with structured command evidence: focused route and queue suite, full local CI, and live PR 4756 terminal convergence all passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T14:26:49.868Z
- Branch: task/202608031426-0BY4B4/make-integration-handoff-and-hosted-close-finali
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/cleanup-merged.ts          |  36 +++++++
 .../src/commands/integrate-queue-reservation.ts    |  11 +-
 .../src/commands/integrate-queue.command.test.ts   |  43 ++++++++
 .../src/commands/integrate-queue.command.ts        |  20 +++-
 .../pr/internal/github-review-threads.test.ts      |  33 +++++-
 .../commands/pr/internal/github-review-threads.ts  |   5 +
 .../src/commands/shared/route-cleanup-probe.ts     |  64 ++++++++++++
 .../src/commands/shared/route-decision-types.ts    |   2 +-
 .../src/commands/shared/route-decision.ts          |  57 +----------
 .../src/commands/shared/workflow-step-branch.ts    |   7 ++
 .../shared/workflow-step-hosted-close.test.ts      | 113 +++++++++++++++++++++
 11 files changed, 332 insertions(+), 59 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
