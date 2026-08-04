Task: `202608040748-7Z0401`
Title: Harden stale runner reclaim regression after semantic plan enforcement
Canonical task record: `.agentplane/tasks/202608040748-7Z0401/README.md`

## Summary

Harden stale runner reclaim regression after semantic plan enforcement

Reproduce GitHub issue #4773 on current main with a valid task and stale runner PID, repair the stale reclaim regression fixture or implementation as required, and prove deterministic typed recovery without E_INTERNAL.

## Scope

- In scope: Reproduce GitHub issue #4773 on current main with a valid task and stale runner PID, repair the stale reclaim regression fixture or implementation as required, and prove deterministic typed recovery without E_INTERNAL.
- Out of scope: unrelated refactors not required for "Harden stale runner reclaim regression after semantic plan enforcement".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts; bun run
typecheck; node .agentplane/policy/check-routing.mjs
```
Result: pass
Evidence: 4/4 focused tests, TypeScript 7 typecheck, and routing passed; the intervening commit contains only task-scoped verification/PR artifacts.
Scope: current branch head including stale reclaim regression evidence.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-04T07:50:26.255Z
- Branch: task/202608040748-7Z0401/harden-stale-runner-reclaim-regression-after-sem
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-handoff.test.ts      | 124 +++++++++++++--------
 1 file changed, 78 insertions(+), 46 deletions(-)
```

</details>
