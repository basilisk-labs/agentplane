# PR Review

Created: 2026-07-25T00:37:21.141Z

## Task

- Task: `202607250036-DFWJM6`
- Title: Publish rebased PR branches with an explicit force-with-lease
- Status: DOING
- Branch: `task/202607250036-DFWJM6/force-with-lease-pr-publish`
- Canonical task record: `.agentplane/tasks/202607250036-DFWJM6/README.md`

## Verification

- State: needs_rework
- Note: Hosted verify-routed exposed stale PR-flow fixtures: mandatory evaluator provenance, queue lease identity, and SKIPPED check state must be aligned before integration.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T01:04:43.697Z
- Branch: task/202607250036-DFWJM6/force-with-lease-pr-publish
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/branch-publication.test.ts     | 522 +++++++++++++++++++++
 .../src/commands/pr/branch-publication.ts          | 284 +++++++++++
 .../src/commands/pr/internal/sync-github.ts        |   2 +-
 packages/agentplane/src/commands/pr/open.ts        | 138 +-----
 4 files changed, 810 insertions(+), 136 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
