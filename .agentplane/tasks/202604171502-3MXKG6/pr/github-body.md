## Summary

Decompose runner prompt and adapter hotspots

Split runner/context/base-prompts.ts and the custom plus codex adapters into smaller modules with shared adapter primitives while preserving runner behavior.

## Scope

- In scope: Split runner/context/base-prompts.ts and the custom plus codex adapters into smaller modules with shared adapter primitives while preserving runner behavior.
- Out of scope: unrelated refactors not required for "Decompose runner prompt and adapter hotspots".

## Verification

- State: ok
- Note: Verified: split runner prompt assembly into shared base-source, overlay, and recipe collectors; extracted shared adapter runtime helpers for custom and codex; bun run typecheck passed; runner prompt/custom/codex adapter tests passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T18:44:01.945Z
- Branch: task/202604171502-3MXKG6/runner-adapter-hotspots
- Head: 76cd053338e8

```text
 packages/agentplane/src/runner/adapters/codex.ts   |  39 +-
 packages/agentplane/src/runner/adapters/custom.ts  |  35 +-
 .../src/runner/adapters/runtime-shared.ts          |  54 ++
 .../src/runner/context/base-prompt-sources.ts      | 215 ++++++++
 .../src/runner/context/base-prompts.test.ts        |   8 +-
 .../agentplane/src/runner/context/base-prompts.ts  | 598 +--------------------
 .../src/runner/context/overlay-prompt-blocks.ts    |  79 +++
 .../src/runner/context/prompt-block-shared.ts      | 153 ++++++
 .../src/runner/context/recipe-prompt-blocks.ts     | 187 +++++++
 9 files changed, 714 insertions(+), 654 deletions(-)
```

</details>
