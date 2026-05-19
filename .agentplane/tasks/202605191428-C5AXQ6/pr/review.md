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
- Note: Verified context recall boundary fix. Commands: bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --timeout 120000 => pass, 30 tests and 8 snapshots; bunx eslint touched context/search/blueprint files => pass; bunx prettier --check touched docs/source files => pass; bun run --filter=agentplane build => pass; bun run docs:cli:check => pass; node .agentplane/policy/check-routing.mjs => pass; ap context reindex --include-raw => pass rows=16 files=21; ap context check => pass; ap context doctor => pass after serialized re-run; ap doctor => OK; git diff --check => pass. Manual smoke: default context search excludes task history, --scope tasks returns task records.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T14:42:48.918Z
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
<!-- END AUTO SUMMARY -->
