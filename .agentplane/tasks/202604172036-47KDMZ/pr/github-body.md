## Summary

Extract task-store services from shared monolith

Refactor commands/shared/task-store.ts into smaller read/write/projection services with explicit task backend capability boundaries so command flows stop depending on one large shared module.

## Scope

- In scope: Refactor commands/shared/task-store.ts into smaller read/write/projection services with explicit task backend capability boundaries so command flows stop depending on one large shared module.
- Out of scope: unrelated refactors not required for "Extract task-store services from shared monolith".

## Verification

- State: ok
- Note: Validated task-store service extraction: public task-store import surface stayed stable while implementation split into intent, README IO, store, and types modules; bun run lint:core and bun run test:fast both passed in the task worktree.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T05:14:16.052Z
- Branch: task/202604172036-47KDMZ/task-store-services
- Head: 6e8fe55878b7

```text
 .../agentplane/src/commands/shared/task-store.ts   | 779 +--------------------
 .../src/commands/shared/task-store/intents.ts      | 360 ++++++++++
 .../src/commands/shared/task-store/readme.ts       | 171 +++++
 .../src/commands/shared/task-store/store.ts        | 168 +++++
 .../src/commands/shared/task-store/types.ts        | 124 ++++
 5 files changed, 848 insertions(+), 754 deletions(-)
```

</details>
