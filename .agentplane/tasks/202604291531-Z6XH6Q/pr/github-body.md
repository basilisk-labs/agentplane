## Summary

Extend recipe manifests with prompt module mutations

Extend recipe/project overlay schema support so vendored recipes can declare prompt modules and structured prompt module mutations with validated asset references, without applying them to compiled init surfaces yet.

## Scope

- In scope: recipe manifest/project overlay parsing for prompt module declarations and mutation sets.
- In scope: validation for referenced module assets, recipe provenance, schema compatibility, and safe failure messages.
- Out of scope: applying recipe mutations to generated prompt artifacts or changing public scenario behavior.

## Verification

- State: ok
- Note: Recipe manifests now accept prompt_modules and prompt_mutation_sets JSON assets, validate recipe-owned module/mutation-set shape and provenance, and publish them into recipe-assets without applying them to overlay prompt surfaces.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T19:01:31.392Z
- Branch: task/202604291531-Z6XH6Q/recipe-prompt-mutations
- Head: 4fd2fc73e174

```text
 .../agentplane/src/commands/recipes/impl/apply.ts  | 153 +++++++
 .../src/commands/recipes/impl/overlay-compile.ts   |  32 ++
 .../recipes/impl/project-installed-recipes.test.ts | 265 ++++++++++++
 .../agentplane/src/commands/recipes/impl/types.ts  |   4 +
 .../agentplane/src/runtime/prompt-modules/index.ts |   5 +
 .../src/runtime/prompt-modules/mutations.test.ts   |  17 +
 .../src/runtime/prompt-modules/validation.ts       | 455 +++++++++++++++++++++
 packages/recipes/src/compiled-contracts.ts         |  27 +-
 packages/recipes/src/index.test.ts                 |  28 ++
 packages/recipes/src/manifest-contracts.ts         |  14 +
 packages/recipes/src/manifest.ts                   |  83 +++-
 packages/recipes/src/normalize.ts                  |   8 +
 packages/recipes/src/overlay.ts                    |  13 +-
 packages/testkit/src/recipes.ts                    |   3 +-
 14 files changed, 1100 insertions(+), 7 deletions(-)
```

</details>
