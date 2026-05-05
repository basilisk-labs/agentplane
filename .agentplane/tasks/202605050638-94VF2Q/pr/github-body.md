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
