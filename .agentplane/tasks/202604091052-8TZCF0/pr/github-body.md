## Summary

Fix task lifecycle README seeding and base artifact preservation

Make task creation/work-start preserve canonical base README artifacts and refuse to leave empty .agentplane/tasks/<id> directories without README.md in branch_pr flows.

## Scope

- In scope: Make task creation/work-start preserve canonical base README artifacts and refuse to leave empty .agentplane/tasks/<id> directories without README.md in branch_pr flows.
- Out of scope: unrelated refactors not required for "Fix task lifecycle README seeding and base artifact preservation".

## Verification

### Plan

1. Reproduce task creation plus `work start --worktree` on a fresh task in the focused regression harness. Expected: the base checkout keeps a readable `.agentplane/tasks/<id>/README.md` and no empty task directory is left behind.
2. Run the focused lifecycle test slice that covers task creation/work-start artifact handling. Expected: the new atomic README-seeding path passes and strict task scans remain clean.
3. Run lint on touched lifecycle files. Expected: no lint regressions in the modified task/worktree command path.

### Current Status

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts; bun x eslint packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts. Result: pass. Evidence: the focused work-start regression suite passed 10/10 and eslint exited 0 after preserving base task READMEs during worktree seeding. Scope: branch_pr work start lifecycle, base task artifact preservation, strict task-readability after worktree creation.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T11:00:58.802Z
- Branch: task/202604091052-8TZCF0/task-readme-seeding
- Head: 1453eeb17631

```text
No changes detected.
```

</details>
