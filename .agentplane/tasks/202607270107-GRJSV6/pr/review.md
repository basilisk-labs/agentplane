# PR Review

Created: 2026-07-27T01:22:25.252Z

## Task

- Task: `202607270107-GRJSV6`
- Title: Preserve authority-only tails during merged cleanup
- Status: DOING
- Branch: `task/202607270107-GRJSV6/preserve-authority-only-tails-during-merged-clea`
- Canonical task record: `.agentplane/tasks/202607270107-GRJSV6/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-27T01:22:25.252Z
- Branch: task/202607270107-GRJSV6/preserve-authority-only-tails-during-merged-clea
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/cleanup-merged-proof.ts    | 91 +++++++++++++++++++---
 .../branch/cleanup-merged.targeted.test.ts         | 61 +++++++++++++++
 .../src/commands/shared/quality-review-target.ts   |  2 +-
 .../commands/shared/side-effect-authority.test.ts  |  4 +-
 .../src/commands/shared/side-effect-authority.ts   |  5 +-
 5 files changed, 150 insertions(+), 13 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
