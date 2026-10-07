# PR Review

Created: 2026-10-07T15:54:41.605Z

## Task

- Task: `202610071534-BV344Y`
- Title: Preserve unchanged PR review artifacts during provider hydration
- Status: DOING
- Branch: `task/202610071534-BV344Y/preserve-unchanged-pr-review-artifacts-during-pr`
- Canonical task record: `.agentplane/tasks/202610071534-BV344Y/README.md`

## Verification

- State: ok
- Note: Canonical validation sha256:b2b1501e61357d5b7c693037f2eaacbe6d303576019eb85894cda81f78d398e7
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-07T15:54:41.605Z
- Branch: task/202610071534-BV344Y/preserve-unchanged-pr-review-artifacts-during-pr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...re.pr-flow.pr-validation.open-hydration.test.ts | 66 +++++++++++++++++++++-
 .../commands/pr/internal/review-template.test.ts   | 55 ++++++++++++++++++
 .../src/commands/pr/internal/review-template.ts    | 29 +++++++++-
 .../src/commands/pr/internal/sync-open-step.ts     |  7 +++
 4 files changed, 153 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
