Task: `202606120937-VC2ZMZ`
Title: Bound pre-push fast CI in git hooks
Canonical task record: `.agentplane/tasks/202606120937-VC2ZMZ/README.md`

## Summary

Bound pre-push fast CI in git hooks

Prevent git pre-push hooks from running the full-fast local CI lane when the fast selector classifies a push as broad. The hook should fail quickly with an actionable diagnostic or route to a bounded hook-safe lane, instead of hanging until signal 9/timeout. Preserve full-fast for explicit local CI invocations.

## Scope

- In scope: Prevent git pre-push hooks from running the full-fast local CI lane when the fast selector classifies a push as broad. The hook should fail quickly with an actionable diagnostic or route to a bounded hook-safe lane, instead of hanging until signal 9/timeout. Preserve full-fast for explicit local CI invocations.
- Out of scope: unrelated refactors not required for "Bound pre-push fast CI in git hooks".

## Verification

- State: ok
- Note:

```text
Verified review-thread repair for unknown pre-push scopes. Checks passed: bunx vitest run
packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts
packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts
packages/agentplane/src/cli/local-ci-selection.test.ts (85 tests), bunx eslint
scripts/checks/run-pre-push-hook.mjs
packages/agentplane/src/cli/run-cli.core.hooks.pre-push-full-fast.test.ts
packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts, bun run hotspots:check, bun run
format:check, node .agentplane/policy/check-routing.mjs.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-12T09:40:00.939Z
- Branch: task/202606120937-VC2ZMZ/bound-pre-push-fast-ci-in-git-hooks
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.hooks.hook-run.test.ts    |   1 -
 .../run-cli.core.hooks.pre-push-full-fast.test.ts  | 156 +++++++++++++++++++++
 scripts/checks/run-pre-push-hook.mjs               |  30 ++++
 3 files changed, 186 insertions(+), 1 deletion(-)
```

</details>
