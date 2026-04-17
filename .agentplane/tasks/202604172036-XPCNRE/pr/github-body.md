## Summary

Decompose CLI test harness into focused fixture modules

Split the monolithic CLI harness into focused fixture modules for git repo setup, stdio capture, recipe fixtures, and command execution while preserving the @agentplane/testkit facade and existing test behavior.

## Scope

- In scope: Split the monolithic CLI harness into focused fixture modules for git repo setup, stdio capture, recipe fixtures, and command execution while preserving the @agentplane/testkit facade and existing test behavior.
- Out of scope: unrelated refactors not required for "Decompose CLI test harness into focused fixture modules".

## Verification

- State: ok
- Note: Command: bun run framework:dev:bootstrap
Result: pass; repo-local runtime rebuilt for the worktree after moving testing modules.

Command: bun run lint:core
Result: pass.

Command: bun run typecheck
Result: pass.

Command: bunx vitest run packages/testkit/src/index.test.ts packages/testkit/src/cli.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts
Result: pass (5 files, 15 tests).

Command: bun run test:fast
Result: pass (211 files, 1269 tests, 2 skipped).

Observation: the first full test:fast run exposed a regression in createUpgradeBundle after the module move; the manifest path was corrected in the same task and the failing upgrade tests plus the full suite were re-run successfully.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T21:05:32.645Z
- Branch: task/202604172036-XPCNRE/cli-harness-modules
- Head: 032e3a0c91e1

```text
 packages/agentplane/src/testing/cli-harness.ts     | 571 +--------------------
 .../src/testing/cli-harness/recipe-archives.ts     | 450 ++++++++++++++++
 .../agentplane/src/testing/cli-harness/stdio.ts    | 115 +++++
 3 files changed, 571 insertions(+), 565 deletions(-)
```

</details>
