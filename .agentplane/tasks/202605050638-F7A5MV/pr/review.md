# PR Review

Created: 2026-05-05T06:47:56.085Z

## Task

- Task: `202605050638-F7A5MV`
- Title: Reduce branch_pr review.md to a compact review index
- Status: DOING
- Branch: `task/202605050638-F7A5MV/compact-review-index`
- Canonical task record: `.agentplane/tasks/202605050638-F7A5MV/README.md`

## Verification

- State: ok
- Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T07:06:53.162Z
- Branch: task/202605050638-F7A5MV/compact-review-index
- Head: a3881c70d0ce

```text
 .agentplane/tasks/202605050638-BA00XR/README.md    | 139 +++++++++++++++++++
 .agentplane/tasks/202605050638-BA00XR/acr.json     | 149 +++++++++++++++++++++
 .../tasks/202605050638-BA00XR/pr/diffstat.txt      |   2 +
 .../tasks/202605050638-BA00XR/pr/github-body.md    |  37 +++++
 .../tasks/202605050638-BA00XR/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605050638-BA00XR/pr/meta.json |  14 ++
 .../tasks/202605050638-BA00XR/pr/notes.jsonl       |   0
 .agentplane/tasks/202605050638-BA00XR/pr/review.md |  58 ++++++++
 .../tasks/202605050638-BA00XR/pr/verify.log        |   0
 .agentplane/tasks/202605050638-Y1MR6T/README.md    | 139 +++++++++++++++++++
 .agentplane/tasks/202605050638-Y1MR6T/acr.json     | 149 +++++++++++++++++++++
 .../tasks/202605050638-Y1MR6T/pr/diffstat.txt      |  16 +++
 .../tasks/202605050638-Y1MR6T/pr/github-body.md    |  51 +++++++
 .../tasks/202605050638-Y1MR6T/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605050638-Y1MR6T/pr/meta.json |  14 ++
 .agentplane/tasks/202605050638-Y1MR6T/pr/review.md |  72 ++++++++++
 docs/user/branching-and-pr-artifacts.mdx           |  17 ++-
 .../src/commands/pr/integrate/artifacts.ts         |  15 ---
 .../src/commands/pr/integrate/internal/prepare.ts  |   4 +-
 .../pr/internal/pr-artifact-snapshot.test.ts       |  24 +++-
 .../commands/pr/internal/pr-artifact-snapshot.ts   |   1 -
 .../commands/pr/internal/review-template.test.ts   |  53 +++++++-
 .../src/commands/pr/internal/review-template.ts    |  91 ++++---------
 .../src/commands/pr/internal/sync-open-step.ts     |   7 -
 24 files changed, 958 insertions(+), 96 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
