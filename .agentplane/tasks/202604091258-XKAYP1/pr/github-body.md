## Summary

Reduce pr open artifact churn after remote PR linkage

When pr open creates or links a GitHub PR, avoid rewriting review/body artifacts unnecessarily so the task branch does not require a broad metadata-only follow-up commit.

## Scope

- In scope: When pr open creates or links a GitHub PR, avoid rewriting review/body artifacts unnecessarily so the task branch does not require a broad metadata-only follow-up commit.
- Out of scope: unrelated refactors not required for "Reduce pr open artifact churn after remote PR linkage".

## Verification

### Plan

1. Reproduce pr open against create/link-existing GitHub PR paths. Expected: review/body artifacts stay unchanged when only linkage metadata changes.
2. Run focused pr-flow tests around pr open idempotence and existing-PR hydration. Expected: only the required metadata delta remains.
3. Run relevant lint/tests. Expected: PR artifact generation still passes existing contract checks.

### Current Status

- State: ok
- Note: Rebased onto main after 75VJ4R removed the shared wait-remote-checks blocker and reran targeted wait-remote/pr-flow coverage for the pr open artifact-churn path.

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

- Updated: 2026-04-09T14:20:35.861Z
- Branch: task/202604091258-XKAYP1/pr-open-churn
- Head: affb7387cdd6

```text
 .agentplane/tasks/202604091258-XKAYP1/README.md    | 118 +++++++++++++
 .../tasks/202604091258-XKAYP1/pr/diffstat.txt      |   0
 .../tasks/202604091258-XKAYP1/pr/github-body.md    |  50 ++++++
 .../tasks/202604091258-XKAYP1/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091258-XKAYP1/pr/meta.json |  17 ++
 .../tasks/202604091258-XKAYP1/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091258-XKAYP1/pr/review.md |  57 +++++++
 .../tasks/202604091258-XKAYP1/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 187 +++++++++++++++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    |  12 +-
 10 files changed, 440 insertions(+), 2 deletions(-)
```

</details>
