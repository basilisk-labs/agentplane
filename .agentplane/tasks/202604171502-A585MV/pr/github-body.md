## Summary

Decompose PR sync hotspot into explicit step modules

Split commands/pr/internal/sync.ts into step-focused modules so the orchestration path stays small and PR sync behavior remains stable.

## Scope

- In scope: Split commands/pr/internal/sync.ts into step-focused modules so the orchestration path stays small and PR sync behavior remains stable.
- Out of scope: unrelated refactors not required for "Decompose PR sync hotspot into explicit step modules".

## Verification

- State: ok
- Note: Verified: split PR sync into explicit support, branch, open, and update step modules; bun run typecheck passed; targeted PR-flow tests passed (82 tests); task verify contract still points at removed packages/agentplane/src/commands/pr/check.test.ts, so equivalent current coverage came from run-cli.core.pr-flow.pr.test.ts and commands/pr/input-validation.test.ts.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T18:37:19.555Z
- Branch: task/202604171502-A585MV/pr-sync-steps
- Head: dd94c59ffe02

```text
 .../src/commands/pr/internal/sync-branch.ts        | 149 ++++
 .../src/commands/pr/internal/sync-github.ts        | 237 +++++++
 .../src/commands/pr/internal/sync-model.ts         |  37 +
 .../src/commands/pr/internal/sync-open-step.ts     | 152 +++++
 .../src/commands/pr/internal/sync-support.ts       |  33 +
 .../src/commands/pr/internal/sync-update-step.ts   |  80 +++
 .../agentplane/src/commands/pr/internal/sync.ts    | 760 +++------------------
 7 files changed, 795 insertions(+), 653 deletions(-)
```

</details>
