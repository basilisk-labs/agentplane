Task: `202605171737-5NHXTN`
Title: Fix issue #3843 branch_pr base start-ready recovery
Canonical task record: `.agentplane/tasks/202605171737-5NHXTN/README.md`

## Summary

Fix issue #3843 branch_pr base start-ready recovery

Fix GitHub issue #3843: in branch_pr, task start-ready from the base checkout after work start must not fail with missing task README; it should route to the task worktree or provide deterministic recovery.

## Scope

- In scope: Fix GitHub issue #3843: in branch_pr, task start-ready from the base checkout after work start must not fail with missing task README; it should route to the task worktree or provide deterministic recovery.
- Out of scope: unrelated refactors not required for "Fix issue #3843 branch_pr base start-ready recovery".

## Verification

- State: ok
- Note:

```bash
bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --runInBand; Result: pass; \
  Evidence: 17 tests passed including branch_pr base start-ready recovery regression. Scope: work \
  start/task start-ready route behavior. Command: bunx vitest --config vitest.workspace.ts run \
  --project agentplane packages/agentplane/src/commands/task/start.unit.test.ts \
  packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 2 files, \
  9 tests passed. Scope: existing task start/finish lifecycle unit coverage. Command: bun run \
  typecheck; Result: pass; Evidence: tsc -b exited 0. Scope: repo TypeScript project references. \
  Command: bun run format:changed; Result: pass; Evidence: all matched files use Prettier style. \
  Scope: touched files. Command: bun run lint:core -- \
  packages/agentplane/src/commands/task/start-ready.ts \
  packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; Result: pass; Evidence: eslint exited 0. \
  Scope: repo core lint. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: \
  policy routing OK. Scope: policy routing.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:48:36.638Z
- Branch: task/202605171737-5NHXTN/fix-3843-base-start-ready
- Head: a273f138da1f

```text
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .../src/cli/run-cli.core.pr-flow.test.ts           |  97 ++++
 .../agentplane/src/commands/task/start-ready.ts    |  79 ++-
 3 files changed, 703 insertions(+), 1 deletion(-)
```

</details>
