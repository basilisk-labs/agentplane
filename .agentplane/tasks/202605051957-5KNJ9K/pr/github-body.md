Task: `202605051957-5KNJ9K`
Title: Normalize recipe blueprint hints

## Summary

Normalize recipe blueprint hints

Add recipe blueprint-extension normalization with active recipe filtering, when matching, deterministic ordering, provenance, and compatibility reporting for resolver input.

## Scope

- In scope: Add recipe blueprint-extension normalization with active recipe filtering, when matching, deterministic ordering, provenance, and compatibility reporting for resolver input.
- Out of scope: unrelated refactors not required for "Normalize recipe blueprint hints".

## Verification

- State: ok
- Note: Implemented recipe blueprint extension normalization and manifest validation. Focused recipe tests, full typecheck, recipes build, targeted lint/format, policy routing, diff check, and agentplane doctor all pass; doctor retains one pre-existing WCPBCX projection warning.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T20:10:20.855Z
- Branch: task/202605051957-5KNJ9K/normalize-recipe-blueprint-hints
- Head: 3d562c209be2

```text
 packages/recipes/package.json                     |   2 +-
 packages/recipes/src/blueprint-extensions.test.ts | 125 ++++++++++++++++++++
 packages/recipes/src/blueprint-extensions.ts      | 136 ++++++++++++++++++++++
 packages/recipes/src/index.test.ts                |  79 +++++++++++++
 packages/recipes/src/index.ts                     |   1 +
 packages/recipes/src/manifest-contracts.ts        |  23 ++++
 packages/recipes/src/manifest.ts                  | 103 +++++++++++++++-
 7 files changed, 466 insertions(+), 3 deletions(-)
```

</details>
