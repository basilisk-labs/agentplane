## Summary

Stop mirroring active task README into base checkout

Remove branch_pr base-side README mirroring for active tasks so worktree execution does not leave untracked task snapshots on main that later block git pull after merge.

## Scope

- In scope: Remove branch_pr base-side README mirroring for active tasks so worktree execution does not leave untracked task snapshots on main that later block git pull after merge.
- Out of scope: unrelated refactors not required for "Stop mirroring active task README into base checkout".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts --hookTimeout 60000 --testTimeout 180000
Result: pass
Evidence: 44 tests passed across task-backend, branch_pr work-start, start-ready, and integrate flows after framework:dev:bootstrap.
Scope: branch_pr active README handoff, live worktree fallback, and base-without-readme integrate resolution.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T17:22:17.848Z
- Branch: task/202604131642-8511VR/no-base-readme-mirror
- Head: de132ca65e71

```text
 .agentplane/tasks/202604131642-8511VR/README.md    | 135 +++++++++++++++++++++
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts |   2 +
 .../src/cli/run-cli.core.pr-flow.test.ts           |  45 +++----
 .../agentplane/src/commands/branch/work-start.ts   |  14 +++
 .../src/commands/shared/task-backend.test.ts       |  62 ++++++++++
 .../agentplane/src/commands/shared/task-backend.ts |  36 +++++-
 .../agentplane/src/commands/task/start-ready.ts    | 105 ----------------
 7 files changed, 266 insertions(+), 133 deletions(-)
```

</details>
