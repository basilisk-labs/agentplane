# PR Review

Created: 2026-05-19T14:30:15.673Z

## Task

- Task: `202605191428-C5AXQ6`
- Title: Improve context recall boundaries
- Status: DOING
- Branch: `task/202605191428-C5AXQ6/context-recall-boundaries`
- Canonical task record: `.agentplane/tasks/202605191428-C5AXQ6/README.md`

## Verification

- State: ok
- Note: Resolved PR review blocker: fallback context search now filters discovered files through scope path rules, excluding context/raw/private for raw/all scopes. Verification: bun test packages/agentplane/src/commands/context/release-readiness.test.ts --timeout 120000; bunx eslint packages/agentplane/src/context/context-utils.ts packages/agentplane/src/commands/context/release-readiness.test.ts; bunx prettier --check packages/agentplane/src/context/context-utils.ts packages/agentplane/src/commands/context/release-readiness.test.ts; node .agentplane/policy/check-routing.mjs.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T15:51:12.702Z
- Branch: task/202605191428-C5AXQ6/context-recall-boundaries
- Head: 5f0088c288e3

```text
 .agentplane/policy/context.must.md                 |   6 +-
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              |   4 +-
 docs/user/local-context.mdx                        |   4 +
 packages/agentplane/assets/policy/context.must.md  |   6 +-
 packages/agentplane/src/blueprints/builtins.ts     |  24 +-
 .../run-cli.core.help-snap.test.ts.snap            |  14 +-
 .../src/commands/context/context.spec.ts           |  10 +-
 .../src/commands/context/release-readiness.test.ts |  83 +++
 packages/agentplane/src/commands/context/search.ts |   2 +
 packages/agentplane/src/context/context-utils.ts   |  57 +-
 11 files changed, 749 insertions(+), 32 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
