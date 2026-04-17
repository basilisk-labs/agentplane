## Summary

Fix overlay when matching semantics

Make overlay when matching conjunctive, propagate command context into runtime matching, and either fully support or remove dead command matching fields.

## Scope

- In scope: Make overlay when matching conjunctive, propagate command context into runtime matching, and either fully support or remove dead command matching fields.
- Out of scope: unrelated refactors not required for "Fix overlay when matching semantics".

## Verification

- State: ok
- Note: Verified conjunctive overlay when matching and command-aware runner prompt filtering.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T12:37:15.433Z
- Branch: task/202604171154-4M51J8/overlay-when-matching
- Head: 7f81293f116f

```text
 .../src/runner/context/base-prompts.test.ts        | 98 ++++++++++++++++++++++
 .../agentplane/src/runner/context/base-prompts.ts  |  4 +
 .../agentplane/src/runner/usecases/task-run.ts     |  2 +
 packages/recipes/src/overlay.test.ts               | 58 +++++++++++++
 packages/recipes/src/overlay.ts                    | 35 +++++---
 5 files changed, 186 insertions(+), 11 deletions(-)
```

</details>
