## Summary

Enable recipe patching for prompt fragments

Extend recipe prompt mutation fixtures, diagnostics, and developer docs so recipes can patch, replace, disable, or validate individual named prompt fragments across gateway, policy, runner, and agent profile surfaces.

## Scope

- In scope: Extend recipe prompt mutation fixtures, diagnostics, and developer docs so recipes can patch, replace, disable, or validate individual named prompt fragments across gateway, policy, runner, and agent profile surfaces.
- Out of scope: unrelated refactors not required for "Enable recipe patching for prompt fragments".

## Verification

- State: ok
- Note: Verified: fragment_id selector implementation and recipe documentation passed transaction, doctor runtime, compiler, docs freshness, typecheck, diff check, framework bootstrap, and doctor checks.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T21:45:43.215Z
- Branch: task/202604292024-BGZ798/recipe-fragment-patches
- Head: f7169164ee23

```text
 docs/developer/modular-prompt-assembly.mdx         |  42 ++++--
 docs/developer/recipes-spec.mdx                    |  51 ++++++-
 .../src/commands/recipes.transaction.test.ts       |   4 +-
 .../recipes/impl/project-installed-recipes.test.ts |   3 +-
 .../src/commands/runtime.command.test.ts           |   3 +-
 .../commands/shared/prompt-graph-diagnostics.ts    |  24 +--
 .../src/runtime/prompt-modules/compiler.test.ts    | 168 +++++++++++++++++++--
 .../src/runtime/prompt-modules/compiler.ts         |  26 +++-
 .../src/runtime/prompt-modules/mutations.test.ts   |   9 ++
 .../src/runtime/prompt-modules/mutations.ts        |   1 +
 .../src/runtime/prompt-modules/validation.ts       |   2 +
 11 files changed, 293 insertions(+), 40 deletions(-)
```

</details>
