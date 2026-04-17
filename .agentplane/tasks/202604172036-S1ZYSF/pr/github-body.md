## Summary

Introduce OutputWriter and migrate direct CLI stdio hotspots

Create a shared output writer abstraction for command handlers and migrate the highest-volume direct stdout/stderr writers in recipes and task commands to the new reporter path without changing user-visible output.

## Scope

- In scope: Create a shared output writer abstraction for command handlers and migrate the highest-volume direct stdout/stderr writers in recipes and task commands to the new reporter path without changing user-visible output.
- Out of scope: unrelated refactors not required for "Introduce OutputWriter and migrate direct CLI stdio hotspots".

## Verification

- State: ok
- Note: Command: bun run lint:core
Result: pass
Evidence: eslint completed with exit code 0 after migrating recipes list/info/explain/active off direct stdio writes.
Scope: packages/agentplane/src/commands/recipes/impl/commands/{list,active,info,explain}.ts

Command: bun run test:fast
Result: pass
Evidence: 211 test files passed, 1269 tests passed, 2 skipped.
Scope: repository-wide fast suite.

Command: bunx vitest run packages/agentplane/src/commands/recipes.list.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts
Result: pass
Evidence: focused recipes command and CLI tests remained green across 41 assertions.
Scope: recipes list/info/explain/active text output regressions.

Command: rg -n "process\.(stdout|stderr)\.write" packages/agentplane/src/commands/recipes/impl/commands/{list,active,info,explain}.ts || true
Result: pass
Evidence: no direct stdio writes remain in the migrated command files.
Scope: targeted hotspot removal.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T20:38:05.332Z
- Branch: task/202604172036-S1ZYSF/output-writer-hotspots
- Head: 94366eade38f

```text
No changes detected.
```

</details>
