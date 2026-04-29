## Summary

Add prompt fragment parser contracts

Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.

## Scope

- In scope: Introduce source-level prompt fragment contracts and parser/renderer utilities for markdown markers and structured agent-profile list items without migrating bundled prompt assets yet.
- Out of scope: unrelated refactors not required for "Add prompt fragment parser contracts".

## Verification

- State: ok
- Note: Prompt fragment parser/renderer contracts are implemented; final declared checks passed with one expected pre-closure doctor warning for the active branch_pr task.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T20:43:34.460Z
- Branch: task/202604292023-GHNS95/prompt-fragment-parser
- Head: 44355d254a1c

```text
 .../src/runtime/prompt-fragments/index.ts          |  29 ++++
 .../src/runtime/prompt-fragments/json.test.ts      |  89 ++++++++++
 .../src/runtime/prompt-fragments/json.ts           |  87 ++++++++++
 .../src/runtime/prompt-fragments/markdown.test.ts  |  92 ++++++++++
 .../src/runtime/prompt-fragments/markdown.ts       | 188 +++++++++++++++++++++
 .../src/runtime/prompt-fragments/model.ts          |  63 +++++++
 .../src/runtime/prompt-fragments/validation.ts     |  89 ++++++++++
 7 files changed, 637 insertions(+)
```

</details>
