Task: `202606081311-TXT5A5`
Title: Clarify no-close-commit finish cleanup route
Canonical task record: `.agentplane/tasks/202606081311-TXT5A5/README.md`

## Summary

Clarify no-close-commit finish cleanup route

Fix GitHub issue #4474: finish --no-close-commit can mark a direct-workflow task DONE while route guidance says no cleanup is needed even though tracked task artifacts still require an explicit cleanup commit. Improve code and verification so the route oracle surfaces required artifact cleanup instead of a misleading terminal state.

## Scope

In scope: inspect issue #4474, route/finish/direct workflow code, targeted tests, and local verification. Out of scope: merging dependency PRs, publishing releases, changing authentication or provider merge behavior.

## Verification

- State: ok
- Note:

```bash
bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts; Result: \
  pass; Evidence: 2 tests passed against commit e1e3e16a1544, including no-close-commit dirty \
  tracked artifact cleanup route. Command: node .agentplane/policy/check-routing.mjs; Result: pass; \
  Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK with 2 \
  unrelated pre-existing DONE-task commit-hash warnings. Command: bun run lint:core and bun run \
  test:critical; Result: pass; Evidence: ESLint passed and critical-cli suite passed 5/5 chunks. \
  Scope: direct DONE route oracle cleanup behavior and regression coverage.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T13:12:33.563Z
- Branch: task/202606081311-TXT5A5/clarify-no-close-commit-finish-cleanup-route
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...cli.core.route-decision.direct-closeout.test.ts | 152 +++++++++++++++++++++
 .../src/commands/shared/route-decision-blockers.ts |  35 ++++-
 .../commands/shared/route-decision-next-action.ts  |   9 ++
 .../src/commands/shared/route-decision.ts          |   8 ++
 .../agentplane/src/commands/shared/route-oracle.ts |  13 +-
 5 files changed, 211 insertions(+), 6 deletions(-)
```

</details>
