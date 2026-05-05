Task: `202605050638-Y1MR6T`
Title: Create PR sidecar files only when they have content

## Summary

Create PR sidecar files only when they have content

Stop pre-creating empty branch_pr sidecar files such as pr/verify.log and pr/notes.jsonl; create them lazily on first verification log or handoff note write, while keeping existing readers tolerant of missing files.

## Scope

- In scope: Stop pre-creating empty branch_pr sidecar files such as pr/verify.log and pr/notes.jsonl; create them lazily on first verification log or handoff note write, while keeping existing readers tolerant of missing files.
- Out of scope: unrelated refactors not required for "Create PR sidecar files only when they have content".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts -> pass (24 tests). Command: bunx eslint touched PR artifact files -> pass. Command: bunx prettier --check touched PR artifact files -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Scope: optional notes.jsonl/verify.log sidecar creation and validation behavior.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T06:59:40.216Z
- Branch: task/202605050638-Y1MR6T/lazy-pr-sidecars
- Head: fe92528c94c8

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
 docs/user/branching-and-pr-artifacts.mdx           |  17 ++-
 .../src/commands/pr/integrate/artifacts.ts         |  15 ---
 .../src/commands/pr/integrate/internal/prepare.ts  |   4 +-
 .../pr/internal/pr-artifact-snapshot.test.ts       |  24 +++-
 .../commands/pr/internal/pr-artifact-snapshot.ts   |   1 -
 .../src/commands/pr/internal/sync-open-step.ts     |   7 -
 15 files changed, 440 insertions(+), 28 deletions(-)
```

</details>
