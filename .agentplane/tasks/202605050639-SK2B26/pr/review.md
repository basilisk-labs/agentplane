# PR Review

Created: 2026-05-05T06:47:03.275Z
Branch: task/202605050639-SK2B26/readme-context-layer

## Summary

Make task README sections the canonical doc store

Optimize task README storage by making frontmatter sections the single canonical task document store and treating the markdown body as a rendered compatibility projection. Keep a migration path for existing README files and preserve readable Git diffs.

## Scope

- In scope: Define a two-layer README contract for task artifacts: frontmatter/structured sections remain canonical for workflow gates, while Markdown body becomes a non-duplicating contextual layer for rationale, tradeoffs, references, examples, and migration notes.
- In scope: Define compatibility and drift behavior for existing README files that currently duplicate sections in both YAML and Markdown body.
- Out of scope: Bulk-rewriting the historical task archive unless a separate migration task explicitly approves it.
- Out of scope: Removing human-readable task context from GitHub entirely.

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Focused task README, task store, local backend, doc command, migrate-doc, mutation parity, ESLint, Prettier, and routing checks passed.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T07:34:18.597Z
- Branch: task/202605050639-SK2B26/readme-context-layer
- Head: 7108af0ca8e6

```text
 .agentplane/tasks/202605050638-94VF2Q/README.md    | 161 +++++++++++++++++++++
 .agentplane/tasks/202605050638-94VF2Q/acr.json     | 149 +++++++++++++++++++
 .../tasks/202605050638-94VF2Q/pr/diffstat.txt      |  33 +++++
 .../tasks/202605050638-94VF2Q/pr/github-body.md    |  68 +++++++++
 .../tasks/202605050638-94VF2Q/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605050638-94VF2Q/pr/meta.json |  14 ++
 .agentplane/tasks/202605050638-94VF2Q/pr/review.md |  89 ++++++++++++
 .agentplane/tasks/202605050638-BA00XR/README.md    | 139 ++++++++++++++++++
 .agentplane/tasks/202605050638-BA00XR/acr.json     | 149 +++++++++++++++++++
 .../tasks/202605050638-BA00XR/pr/diffstat.txt      |   2 +
 .../tasks/202605050638-BA00XR/pr/github-body.md    |  37 +++++
 .../tasks/202605050638-BA00XR/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605050638-BA00XR/pr/meta.json |  14 ++
 .../tasks/202605050638-BA00XR/pr/notes.jsonl       |   0
 .agentplane/tasks/202605050638-BA00XR/pr/review.md |  58 ++++++++
 .../tasks/202605050638-BA00XR/pr/verify.log        |   0
 .agentplane/tasks/202605050638-F7A5MV/README.md    | 139 ++++++++++++++++++
 .agentplane/tasks/202605050638-F7A5MV/acr.json     | 149 +++++++++++++++++++
 .../tasks/202605050638-F7A5MV/pr/diffstat.txt      |  25 ++++
 .../tasks/202605050638-F7A5MV/pr/github-body.md    |  60 ++++++++
 .../tasks/202605050638-F7A5MV/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605050638-F7A5MV/pr/meta.json |  14 ++
 .agentplane/tasks/202605050638-F7A5MV/pr/review.md |  81 +++++++++++
 .agentplane/tasks/202605050638-Y1MR6T/README.md    | 139 ++++++++++++++++++
 .agentplane/tasks/202605050638-Y1MR6T/acr.json     | 149 +++++++++++++++++++
 .../tasks/202605050638-Y1MR6T/pr/diffstat.txt      |  16 ++
 .../tasks/202605050638-Y1MR6T/pr/github-body.md    |  51 +++++++
 .../tasks/202605050638-Y1MR6T/pr/github-title.txt  |   1 +
 .agentplane/tasks/202605050638-Y1MR6T/pr/meta.json |  14 ++
 .agentplane/tasks/202605050638-Y1MR6T/pr/review.md |  72 +++++++++
 docs/user/branching-and-pr-artifacts.mdx           |  17 ++-
 .../src/backends/task-backend.local.test.ts        |   6 +-
 .../src/commands/pr/integrate/artifacts.ts         |  15 --
 .../src/commands/pr/integrate/internal/prepare.ts  |   4 +-
 .../pr/internal/pr-artifact-snapshot.test.ts       |  24 ++-
 .../commands/pr/internal/pr-artifact-snapshot.ts   |   1 -
 .../commands/pr/internal/review-template.test.ts   |  93 +++++++++++-
 .../src/commands/pr/internal/review-template.ts    | 128 +++++-----------
 .../src/commands/pr/internal/sync-branch.ts        |  21 ++-
 .../src/commands/pr/internal/sync-open-step.ts     |   7 -
 .../src/commands/task/migrate-doc.test.ts          |  20 ++-
 packages/core/src/tasks/task-readme.test.ts        |  86 ++++++++++-
 packages/core/src/tasks/task-readme.ts             |  80 +++++++++-
 packages/core/src/tasks/task-store.test.ts         |  38 +++--
 packages/core/src/tasks/task-store.ts              |   9 +-
 45 files changed, 2223 insertions(+), 152 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
