## Summary

Split recipes cache from project vendor store

Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.

## Scope

- In scope: Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.
- Out of scope: unrelated refactors not required for "Split recipes cache from project vendor store".

## Verification

- State: ok
- Note: Global cache commands now operate without a project checkout and no longer mutate project-local recipe state. Verified with @agentplaneorg/recipes build, typecheck, and focused recipes CLI/list/help tests.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T07:24:49.523Z
- Branch: task/202604170647-AXJYWC/split-recipe-stores
- Head: cee35533dd45

```text
 .../run-cli.core.help-snap.test.ts.snap            | 14 ++--
 .../agentplane/src/cli/run-cli.recipes.test.ts     | 95 ++++++----------------
 .../agentplane/src/cli/run-cli.test-helpers.ts     |  2 +-
 .../src/cli/run-cli/command-catalog/project.ts     | 30 +++++--
 .../src/commands/recipes/impl/commands/info.ts     | 19 ++---
 .../src/commands/recipes/impl/commands/install.ts  | 91 +++++++++++----------
 .../src/commands/recipes/impl/commands/list.ts     | 26 ++----
 .../src/commands/recipes/info.command.ts           |  4 +-
 .../src/commands/recipes/install.spec.ts           |  8 +-
 .../src/commands/recipes/list.command.ts           |  8 +-
 packages/recipes/src/constants.ts                  |  2 +-
 11 files changed, 127 insertions(+), 172 deletions(-)
```

</details>
