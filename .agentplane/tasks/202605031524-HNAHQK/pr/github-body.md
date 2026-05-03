Task: `202605031524-HNAHQK`
Title: Make branch_pr batch metadata first-class

## Summary

Make branch_pr batch metadata first-class

Extend branch_pr PR metadata and artifact rendering so a primary PR records included task ids as a structured batch membership contract, with tests proving stable preservation across pr open/update.

## Scope

- In scope: Extend branch_pr PR metadata and artifact rendering so a primary PR records included task ids as a structured batch membership contract, with tests proving stable preservation across pr open/update.
- Out of scope: unrelated refactors not required for "Make branch_pr batch metadata first-class".

## Verification

- State: ok
- Note: Structured branch_pr batch metadata implemented and focused checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T15:31:42.929Z
- Branch: task/202605031524-HNAHQK/batch-metadata-contract
- Head: bab00d92157e

```text
 .../commands/pr/internal/review-template.test.ts   | 87 ++++++++++------------
 .../src/commands/pr/internal/review-template.ts    |  3 +-
 .../src/commands/pr/internal/sync-open-step.ts     |  7 +-
 .../src/commands/pr/internal/sync-update-step.ts   |  5 +-
 .../agentplane/src/commands/shared/pr-meta.test.ts | 58 +++++++++++++++
 packages/agentplane/src/commands/shared/pr-meta.ts | 83 +++++++++++++++++++--
 packages/core/schemas/pr-meta.schema.json          | 27 +++++++
 .../src/tasks/task-artifact-schema.pr-metadata.ts  | 10 +++
 packages/spec/schemas/pr-meta.schema.json          | 27 +++++++
 9 files changed, 244 insertions(+), 63 deletions(-)
```

</details>
