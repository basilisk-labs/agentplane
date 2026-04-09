## Summary

Allow deterministic finish close commits under stale-dist task-artifact policy

When finish --close-commit is already allowed under stale-dist for task-artifact closeout, the internal deterministic git commit must not re-fail on the stale-dist hook for the same task-only payload.

## Scope

- In scope: When finish --close-commit is already allowed under stale-dist for task-artifact closeout, the internal deterministic git commit must not re-fail on the stale-dist hook for the same task-only payload.
- Out of scope: unrelated refactors not required for "Allow deterministic finish close commits under stale-dist task-artifact policy".

## Verification

### Plan

1. In a framework checkout with stale dist caused by watched runtime source edits, run finish --close-commit for a task-artifact-only base closeout. Expected: the deterministic close commit completes instead of failing inside the hook.
2. Run a normal code commit under the same stale checkout. Expected: strict stale-dist enforcement still blocks the unrelated code commit path.
3. Run the targeted automated regression tests. Expected: the closeout path stays green and the strict path still fails where required.

### Current Status

- State: ok
- Note: Verified: targeted guard unit tests and eslint passed for deterministic stale-dist close commit behavior.

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

- Updated: 2026-04-09T23:59:17.199Z
- Branch: task/202604092339-NFXA6G/stale-dist-close-commit
- Head: 3569347b554a

```text
 .agentplane/tasks/202604092339-NFXA6G/README.md    | 117 +++++++++++++++++++++
 .../tasks/202604092339-NFXA6G/pr/diffstat.txt      |   0
 .../tasks/202604092339-NFXA6G/pr/github-body.md    |  50 +++++++++
 .../tasks/202604092339-NFXA6G/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092339-NFXA6G/pr/meta.json |  14 +++
 .../tasks/202604092339-NFXA6G/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092339-NFXA6G/pr/review.md |  57 ++++++++++
 .../tasks/202604092339-NFXA6G/pr/verify.log        |   0
 .agentplane/tasks/202604092339-VSV0CZ/README.md    |  93 ++++++++++++++++
 .agentplane/tasks/202604092339-Z755FH/README.md    |  93 ++++++++++++++++
 .../agentplane/src/commands/guard/impl/commands.ts |   1 +
 .../src/commands/guard/impl/commands.unit.test.ts  |  44 ++++++++
 packages/agentplane/src/commands/guard/impl/env.ts |   2 +
 13 files changed, 472 insertions(+)
```

</details>
