Task: `202605180515-4CAK13`
Title: Fix open branch_pr feedback issues
Canonical task record: `.agentplane/tasks/202605180515-4CAK13/README.md`

## Summary

Fix open branch_pr feedback issues

Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.

## Scope

- In scope: Fix GitHub issues #3853, #3854, and #3845: branch_pr pr check must work across base/worktree artifact boundaries, metadata-only PR identity commits must not stale verification, and task unit verify guidance must use the correct Vitest runner for Vitest-only tests.
- Out of scope: unrelated refactors not required for "Fix open branch_pr feedback issues".

## Verification

- State: ok
- Note:

```bash
bun test packages/agentplane/src/commands/task/start.unit.test.ts \
  packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand; Result: pass; \
  Evidence: 9 tests skipped under Bun and command exits 0, preventing Vitest-only API crashes from \
  issue #3845. Scope: raw Bun runner contract for the reported files. Command: bunx vitest --config \
  vitest.workspace.ts run --project agentplane \
  packages/agentplane/src/commands/task/start.unit.test.ts \
  packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, \
  9 tests passed under Vitest. Scope: full unit coverage remains active on the supported Vitest \
  runner. Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-feedback.test.ts \
  packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --runInBand; Result: pass; \
  Evidence: 24 tests passed including metadata-only PR artifact freshness and branch artifact \
  fallback coverage. Scope: issues #3853 and #3854. Command: bun run typecheck; Result: pass; \
  Evidence: tsc -b exited 0. Scope: TypeScript project references. Command: bun run format:changed; \
  Result: pass; Evidence: changed files use Prettier style. Scope: touched files. Command: bun run \
  hotspots:check; Result: pass; Evidence: hotspot and oversized test baseline checks passed after \
  moving regression to focused file. Scope: CI hotspot gate. Command: bun run lint:core -- touched \
  files; Result: pass; Evidence: eslint exited 0. Scope: repo lint. Command: node \
  .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy \
  routing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T05:25:30.709Z
- Branch: task/202605180515-4CAK13/fix-open-branch-pr-feedback
- Head: 8e9289e25c31

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 .../cli/run-cli.core.pr-flow.pr-feedback.test.ts   | 128 +++++
 .../src/commands/task/finish.state.unit.test.ts    |  56 ++-
 .../src/commands/task/start.unit.test.ts           |  11 +-
 4 files changed, 720 insertions(+), 27 deletions(-)
```

</details>
