## Summary

Unblock refactor pushes by formatting global pre-push offenders

Format the repository files currently failing the shared pre-push formatter so the remaining refactor task branches can be pushed and merged without unrelated hook failures.

## Scope

- In scope: Format the repository files currently failing the shared pre-push formatter so the remaining refactor task branches can be pushed and merged without unrelated hook failures.
- Out of scope: unrelated refactors not required for "Unblock refactor pushes by formatting global pre-push offenders".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T19:13:37.193Z
- Branch: task/202604171910-FN9AQ6/format-unblock
- Head: 897b27e8d46d

```text
 packages/agentplane/assets/policy/incidents.md        |  1 +
 .../agentplane/src/commands/doctor.command.test.ts    |  3 ++-
 .../src/commands/pr/internal/sync-branch.ts           |  9 +++++++--
 .../src/commands/pr/internal/sync-open-step.ts        |  6 +-----
 .../src/commands/pr/internal/sync-update-step.ts      |  5 ++++-
 packages/agentplane/src/commands/pr/internal/sync.ts  | 13 +++++++------
 .../write-release-ready-manifest-script.test.ts       | 19 ++++++++++++++++---
 packages/agentplane/src/runner/adapters/codex.ts      |  6 +++++-
 packages/agentplane/src/runner/adapters/custom.ts     |  6 +++++-
 .../src/runner/context/base-prompt-sources.ts         |  5 +----
 .../src/runner/context/prompt-block-shared.ts         |  5 +----
 .../src/runner/context/recipe-prompt-blocks.ts        |  5 +----
 packages/agentplane/src/runtime/execution-context.ts  | 10 ++--------
 scripts/lib/script-runtime.mjs                        |  4 +++-
 14 files changed, 56 insertions(+), 41 deletions(-)
```

</details>
