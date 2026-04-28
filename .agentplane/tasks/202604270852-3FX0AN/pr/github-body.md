## Summary

Type branch_pr PR artifact state

Define and validate a typed PR artifact state model for branch_pr meta artifacts, covering open, merged, handoff, staged remote, and remote failure states without Record<string, unknown> drift on lifecycle-critical paths.

## Scope

- In scope: Define and validate a typed PR artifact state model for branch_pr meta artifacts, covering open, merged, handoff, staged remote, and remote failure states without Record<string, unknown> drift on lifecycle-critical paths.
- Out of scope: unrelated refactors not required for "Type branch_pr PR artifact state".

## Verification

- State: ok
- Note: Typed branch_pr PR artifact state model implemented and validated with focused PR flow tests, schema check, typecheck, and diff check.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T05:09:23.356Z
- Branch: task/202604270852-3FX0AN/type-pr-artifact-state
- Head: aaaccf52bae1

```text
 .../src/commands/pr/internal/sync-github.ts        |  26 ++++-
 .../src/commands/pr/internal/sync-model.ts         |   1 +
 .../src/commands/pr/internal/sync-open-step.ts     |  20 +++-
 .../agentplane/src/commands/shared/pr-meta.test.ts |  46 +++++++++
 packages/agentplane/src/commands/shared/pr-meta.ts | 107 ++++++++++++++++++++-
 packages/core/schemas/pr-meta.schema.json          |  12 +++
 .../src/tasks/task-artifact-schema.pr-metadata.ts  |  10 ++
 packages/spec/schemas/pr-meta.schema.json          |  12 +++
 8 files changed, 227 insertions(+), 7 deletions(-)
```

</details>
