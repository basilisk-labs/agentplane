Task: `202605050638-94VF2Q`
Title: Make github-body.md a minimal hosted PR projection
Canonical task record: `.agentplane/tasks/202605050638-94VF2Q/README.md`

## Summary

Make github-body.md a minimal hosted PR projection

Trim branch_pr pr/github-body.md to the hosted-review payload only: task id, title, summary/scope, verification status, and raw evidence. Avoid copying the full local review document or rollback/risk content that already lives in the task README.

## Scope

- In scope: Trim branch_pr pr/github-body.md to the hosted-review payload only: task id, title, summary/scope, verification status, and raw evidence. Avoid copying the full local review document or rollback/risk content that already lives in the task README.
- Out of scope: unrelated refactors not required for "Make github-body.md a minimal hosted PR projection".

## Verification

- State: ok
- Note: Focused review-template tests, artifact snapshot tests, ESLint, Prettier, and routing check passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T07:09:27.471Z
- Branch: task/202605050638-94VF2Q/minimal-github-body
- Head: b1a8b355b8ad

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
 .agentplane/tasks/202605050638-F7A5MV/README.md    | 139 +++++++++++++++++++
 .agentplane/tasks/202605050638-F7A5MV/acr.json     | 149 +++++++++++++++++++++
 .../tasks/202605050638-F7A5MV/pr/diffstat.txt      |  25 ++++
 .../tasks/202605050638-F7A5MV/pr/github-body.md    |  60 +++++++++
 .../tasks/202605050638-F7A5MV/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605050638-F7A5MV/pr/meta.json |  14 ++
 .agentplane/tasks/202605050638-F7A5MV/pr/review.md |  81 +++++++++++
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
 31 files changed, 1427 insertions(+), 96 deletions(-)
```

</details>
