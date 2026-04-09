## Summary

Fix normalize GitHub auth propagation without manual GH_TOKEN export

Make branch_pr hosted-merge reconcile and task normalize resolve GitHub auth from the user's existing gh login, without requiring a manual GH_TOKEN export in the shell.

## Scope

- In scope: Make branch_pr hosted-merge reconcile and task normalize resolve GitHub auth from the user's existing gh login, without requiring a manual GH_TOKEN export in the shell.
- Out of scope: unrelated refactors not required for "Fix normalize GitHub auth propagation without manual GH_TOKEN export".

## Verification

### Plan

1. In a logged-in shell with no explicit GH_TOKEN export, run the targeted normalize/hosted-merge path or its regression harness. Expected: GitHub lookups succeed without HTTP 401 Bad credentials.
2. Run the targeted tests covering gh child-process auth propagation and failure classification. Expected: authenticated flows pass; truly unauthenticated flows still fail with an explicit auth error.
3. Run eslint and the touched task-normalize/hosted-merge-sync regressions. Expected: all touched checks exit 0.

### Current Status

- State: ok
- Note: Verified that normalize and hosted merge sync no longer let repo dotenv GitHub tokens shadow a valid gh login, with targeted normalize and hosted-merge-sync regressions plus eslint.

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

- Updated: 2026-04-09T19:05:05.960Z
- Branch: task/202604091841-2ZX1MQ/normalize-gh-auth
- Head: 30c33a87d76b

```text
 .agentplane/tasks/202604091841-2ZX1MQ/README.md    | 129 +++++++++++++++++++++
 .../tasks/202604091841-2ZX1MQ/pr/diffstat.txt      |  13 +++
 .../tasks/202604091841-2ZX1MQ/pr/github-body.md    |  62 ++++++++++
 .../tasks/202604091841-2ZX1MQ/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604091841-2ZX1MQ/pr/meta.json |  17 +++
 .../tasks/202604091841-2ZX1MQ/pr/notes.jsonl       |   0
 .agentplane/tasks/202604091841-2ZX1MQ/pr/review.md |  69 +++++++++++
 .../tasks/202604091841-2ZX1MQ/pr/verify.log        |   0
 .../run-cli.core.tasks.normalize-migrate.test.ts   | 102 ++++++++++++++++
 .../agentplane/src/commands/pr/internal/gh-api.ts  |  14 ++-
 .../src/commands/task/hosted-merge-sync.test.ts    |  42 +++++++
 packages/agentplane/src/shared/env.ts              |  27 ++++-
 12 files changed, 472 insertions(+), 4 deletions(-)
```

</details>
