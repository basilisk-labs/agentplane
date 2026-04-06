## Summary

Emit post-integrate bootstrap guidance for stale framework runtime

When branch_pr integrate mutates watched runtime sources inside a framework checkout, print an explicit bootstrap follow-up so operators do not discover the stale repo-local build only on the next command.

## Scope

- In scope: When branch_pr integrate mutates watched runtime sources inside a framework checkout, print an explicit bootstrap follow-up so operators do not discover the stale repo-local build only on the next command.
- Out of scope: unrelated refactors not required for "Emit post-integrate bootstrap guidance for stale framework runtime".

## Verification

### Plan

1. Run `bun x vitest run packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts`. Expected: integrate warns only when watched runtime paths changed and stays silent for unrelated diffs.
2. Run `bun x eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts`. Expected: lint exits 0.

### Current Status

- State: ok
- Note: Integrate now emits explicit bootstrap guidance when watched runtime paths change; targeted vitest and eslint passed.

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

- Updated: 2026-04-06T20:37:27.757Z
- Branch: task/202604062024-33MZPB/integrate-bootstrap-guidance
- Head: 5c7ce0071e2a

```text
 .agentplane/tasks/202604062024-33MZPB/README.md    | 151 +++++++++++++++++++
 .../src/commands/pr/integrate/cmd.test.ts          | 165 +++++++++++++++++++++
 .../agentplane/src/commands/pr/integrate/cmd.ts    |   8 +
 .../integrate/internal/bootstrap-guidance.test.ts  |  35 +++++
 .../pr/integrate/internal/bootstrap-guidance.ts    |  51 +++++++
 5 files changed, 410 insertions(+)
```

</details>
