# PR Review

Created: 2026-07-10T03:40:27.439Z

## Task

- Task: `202607100340-KW3B8P`
- Title: Keep pre-merge DONE tasks in the integration queue
- Status: DOING
- Branch: `task/202607100340-KW3B8P/keep-premerge-done-in-integration-queue`
- Canonical task record: `.agentplane/tasks/202607100340-KW3B8P/README.md`

## Verification

- State: ok
- Note: Pass: focused integration-queue tests 10/10; typecheck; lint:core; ci:contract; full fast suite; policy routing; doctor; diff validation. Pre-merge DONE entries now remain queued until provider merge and Hosted Close evidence.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T03:40:27.439Z
- Branch: task/202607100340-KW3B8P/keep-premerge-done-in-integration-queue
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |   1 +
 docs/internal/v0.6.22-refactor-plan.md             |   2 +-
 .../src/commands/integrate-queue-doctor-command.ts |  17 +--
 .../src/commands/integrate-queue-lane.test.ts      | 164 +++++++++++++++++++++
 .../src/commands/integrate-queue-lane.ts           |  11 +-
 .../src/commands/integrate-queue-recovery.test.ts  |  29 +++-
 .../src/commands/integrate-queue-recovery.ts       |  12 +-
 scripts/checks/check-lifecycle-invariants.mjs      |  14 +-
 8 files changed, 209 insertions(+), 41 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
