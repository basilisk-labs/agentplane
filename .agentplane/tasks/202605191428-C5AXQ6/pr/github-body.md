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
Post-commit verification refreshed for implementation commit c74d8af24. Previously recorded checks
remain valid for this diff: focused context/search tests, help snapshots, lint, formatting, package
build, docs CLI freshness, policy routing, context reindex/check/doctor, ap doctor, git diff
--check, and manual search smoke passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T14:43:02.501Z
- Branch: task/202605191428-C5AXQ6/context-recall-boundaries
- Head: c74d8af24a06

```text
 .agentplane/policy/context.must.md                 |   6 +-
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   4 +-
 docs/user/local-context.mdx                        |   4 +
 packages/agentplane/src/blueprints/builtins.ts     |  24 +-
 .../run-cli.core.help-snap.test.ts.snap            |  14 +-
 .../src/commands/context/context.spec.ts           |  10 +-
 .../src/commands/context/release-readiness.test.ts |  51 ++
 packages/agentplane/src/commands/context/search.ts |   2 +
 packages/agentplane/src/context/context-utils.ts   |  55 +-
 10 files changed, 711 insertions(+), 30 deletions(-)
```

</details>
