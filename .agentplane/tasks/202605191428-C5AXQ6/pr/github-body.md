Task: `202605191428-C5AXQ6`
Title: Improve context recall boundaries
Canonical task record: `.agentplane/tasks/202605191428-C5AXQ6/README.md`

## Summary

Improve context recall boundaries

Make local context search prefer curated context by default, align context policy module references with actual derived paths and blueprint loading, and verify the context command behavior.

## Scope

- In scope: Make local context search prefer curated context by default, align context policy module references with actual derived paths and blueprint loading, and verify the context command behavior.
- Out of scope: unrelated refactors not required for "Improve context recall boundaries".

## Verification

- State: ok
- Note:

```text
Post-rebase verification refreshed on top of origin/main c4b8430f3. Checks rerun after rebase: bun
test packages/agentplane/src/commands/context/release-readiness.test.ts
packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests; bun
run agents:check => pass; node .agentplane/policy/check-routing.mjs => pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T15:38:55.225Z
- Branch: task/202605191428-C5AXQ6/context-recall-boundaries
- Head: 46ae9f7bffbf

```text
 .agentplane/policy/context.must.md                 |   6 +-
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   4 +-
 docs/user/local-context.mdx                        |   4 +
 packages/agentplane/assets/policy/context.must.md  |   6 +-
 packages/agentplane/src/blueprints/builtins.ts     |  24 +-
 .../run-cli.core.help-snap.test.ts.snap            |  14 +-
 .../src/commands/context/context.spec.ts           |  10 +-
 .../src/commands/context/release-readiness.test.ts |  51 ++
 packages/agentplane/src/commands/context/search.ts |   2 +
 packages/agentplane/src/context/context-utils.ts   |  55 +-
 11 files changed, 715 insertions(+), 32 deletions(-)
```

</details>
