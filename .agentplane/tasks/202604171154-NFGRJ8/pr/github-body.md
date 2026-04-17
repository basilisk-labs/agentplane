## Summary

Replace localeCompare recipe version resolution

Introduce a single semver-aware version resolver for recipes install/list-remote/add so latest version selection is numerically correct.

## Scope

- In scope: Introduce a single semver-aware version resolver for recipes install/list-remote/add so latest version selection is numerically correct.
- Out of scope: unrelated refactors not required for "Replace localeCompare recipe version resolution".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/commands/recipes.list.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: semver-sensitive flows now select 1.10.0 over 1.2.10 and 1.2.0 in list-remote, install-by-name, and add-without-version; 56 focused recipe tests passed across CLI and command layers.
Scope: recipe latest-version resolution for cached and indexed recipes via list-remote, install, and add.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T12:22:59.661Z
- Branch: task/202604171154-NFGRJ8/semver-recipe-resolution
- Head: 47a60df5874e

```text
 .../agentplane/src/cli/run-cli.recipes.test.ts     | 87 +++++++++++++++++-----
 .../src/commands/recipes/impl/commands/add.ts      |  7 +-
 .../src/commands/recipes/impl/commands/install.ts  |  5 +-
 .../commands/recipes/impl/commands/list-remote.ts  |  5 +-
 .../src/commands/recipes/impl/version.ts           | 13 ++++
 5 files changed, 88 insertions(+), 29 deletions(-)
```

</details>
