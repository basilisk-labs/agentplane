## Summary

Explain deferred incidents promotion at findings append time

task findings add still appends promotable findings silently, so operators expect incidents.md to update immediately. Add explicit CLI diagnostics and contract coverage for deferred promotion through finish or incidents collect.

## Scope

- In scope: task findings add still appends promotable findings silently, so operators expect incidents.md to update immediately. Add explicit CLI diagnostics and contract coverage for deferred promotion through finish or incidents collect.
- Out of scope: unrelated refactors not required for "Explain deferred incidents promotion at findings append time".

## Verification

### Plan

1. Make task findings add explain that incidents.md updates are deferred until finish or incidents collect.
2. Add CLI contract coverage for promotable and local-only findings output.
3. Run the targeted findings/incidents test suite.

### Current Status

- State: ok
- Note: Command: bun run framework:dev:bootstrap
Result: pass
Evidence: repo-local runtime bootstrapped successfully in the fresh worktree before targeted CLI tests.
Scope: framework checkout readiness only.

Command: bun test packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
Result: pass
Evidence: 4 tests passed, including new stderr expectations for deferred promotion and local-only task-local output.
Scope: task findings add CLI contract and finding block helpers.

Command: bun x eslint packages/agentplane/src/commands/task/findings.ts packages/agentplane/src/cli/run-cli.core.tasks.findings.test.ts packages/agentplane/src/commands/task/findings.unit.test.ts
Result: pass
Evidence: no lint errors on touched files.
Scope: touched implementation and tests only.

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

- Updated: 2026-04-08T17:33:47.309Z
- Branch: task/202604080135-YP0R5D/findings-deferred-promotion
- Head: 0707ffa5dace

```text
 .agentplane/tasks/202604080135-YP0R5D/README.md    | 167 +++++++++++++++++++++
 .../tasks/202604080135-YP0R5D/pr/diffstat.txt      |   0
 .../tasks/202604080135-YP0R5D/pr/github-body.md    |  63 ++++++++
 .../tasks/202604080135-YP0R5D/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604080135-YP0R5D/pr/meta.json |  14 ++
 .../tasks/202604080135-YP0R5D/pr/notes.jsonl       |   0
 .agentplane/tasks/202604080135-YP0R5D/pr/review.md |  70 +++++++++
 .../tasks/202604080135-YP0R5D/pr/verify.log        |   0
 .../src/cli/run-cli.core.tasks.findings.test.ts    |   6 +
 packages/agentplane/src/commands/task/findings.ts  |  23 +++
 10 files changed, 344 insertions(+)
```

</details>
