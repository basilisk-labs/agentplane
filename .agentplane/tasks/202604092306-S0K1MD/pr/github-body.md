## Summary

Allow finish to warn-and-run under stale-dist for task artifact closeout

Treat finish as a task-artifact mutation in the stale-dist policy so base-side closeout can proceed after merged code changes without a mandatory manual framework bootstrap.

## Scope

- In scope: Treat finish as a task-artifact mutation in the stale-dist policy so base-side closeout can proceed after merged code changes without a mandatory manual framework bootstrap.
- Out of scope: unrelated refactors not required for "Allow finish to warn-and-run under stale-dist for task artifact closeout".

## Verification

### Plan

1. In a framework checkout with stale dist caused by source changes, run agentplane finish for a task-artifact closeout path. Expected: the command warns and runs instead of hard-failing on stale dist.
2. Run a command that still belongs to strict stale-dist mode under the same stale checkout. Expected: the command still refuses to run.
3. Re-run finish after the policy change in tests. Expected: finish behavior is covered by a regression test and does not require a manual bootstrap.

### Current Status

- State: ok
- Note: Verified current HEAD after task commit: stale-dist policy now allows finish as task-artifact closeout; stale-dist policy and readonly tests plus eslint passed.

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

- Updated: 2026-04-09T23:17:02.398Z
- Branch: task/202604092306-S0K1MD/finish-stale-dist
- Head: 40916644a90f

```text
 .agentplane/tasks/202604092306-S0K1MD/README.md    | 122 +++++++++++++++++++++
 .../tasks/202604092306-S0K1MD/pr/diffstat.txt      |   0
 .../tasks/202604092306-S0K1MD/pr/github-body.md    |  50 +++++++++
 .../tasks/202604092306-S0K1MD/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092306-S0K1MD/pr/meta.json |  14 +++
 .../tasks/202604092306-S0K1MD/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092306-S0K1MD/pr/review.md |  57 ++++++++++
 .../tasks/202604092306-S0K1MD/pr/verify.log        |   0
 packages/agentplane/bin/stale-dist-policy.js       |   1 +
 .../agentplane/src/cli/stale-dist-policy.test.ts   |   8 +-
 .../agentplane/src/cli/stale-dist-readonly.test.ts |  19 ++--
 11 files changed, 257 insertions(+), 15 deletions(-)
```

</details>
