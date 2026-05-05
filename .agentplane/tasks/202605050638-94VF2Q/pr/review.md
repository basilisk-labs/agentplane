# PR Review

Created: 2026-05-05T06:48:17.539Z

## Task

- Task: `202605050638-94VF2Q`
- Title: Make github-body.md a minimal hosted PR projection
- Status: DOING
- Branch: `task/202605050638-94VF2Q/minimal-github-body`
- Canonical task record: `.agentplane/tasks/202605050638-94VF2Q/README.md`

## Verification

- State: ok
- Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T07:18:58.138Z
- Branch: task/202605050638-94VF2Q/minimal-github-body
- Head: 9a76a25386fa

```text
 .../commands/pr/internal/review-template.test.ts   | 40 ++++++++++++++++++++++
 .../src/commands/pr/internal/review-template.ts    | 37 ++++++++------------
 .../src/commands/pr/internal/sync-branch.ts        | 21 +++++++++++-
 3 files changed, 75 insertions(+), 23 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
