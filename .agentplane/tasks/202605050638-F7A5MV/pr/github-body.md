Task: `202605050638-F7A5MV`
Title: Reduce branch_pr review.md to a compact review index

## Summary

Reduce branch_pr review.md to a compact review index

Replace the full duplicated branch_pr pr/review.md projection with a compact review index that references the canonical task README and preserves only review-specific facts: branch, related tasks, handoff notes, and raw evidence links or summary.

## Scope

- In scope: Replace the full duplicated branch_pr pr/review.md projection with a compact review index that references the canonical task README and preserves only review-specific facts: branch, related tasks, handoff notes, and raw evidence links or summary.
- Out of scope: unrelated refactors not required for "Reduce branch_pr review.md to a compact review index".

## Verification

- State: ok
- Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T07:05:01.870Z
- Branch: task/202605050638-F7A5MV/compact-review-index
- Head: e3d86d0725b5

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
 .../src/commands/pr/internal/sync-open-step.ts     |   7 -
 22 files changed, 882 insertions(+), 28 deletions(-)
```

</details>
