## Summary

Fix hosted-close when merge commit object is absent in checkout

Make task hosted-close close merged branch_pr tasks even when the GitHub Actions checkout does not contain the squash merge commit object yet, instead of failing with git bad object on the merge SHA.

## Scope

- In scope: Make task hosted-close close merged branch_pr tasks even when the GitHub Actions checkout does not contain the squash merge commit object yet, instead of failing with git bad object on the merge SHA.
- Out of scope: unrelated refactors not required for "Fix hosted-close when merge commit object is absent in checkout".

## Verification

### Plan

- Reproduce the hosted-close path where merge_commit_sha is missing from the local git object graph.
- Run focused vitest coverage for task hosted-close and any helper touched by the fallback.
- Run eslint on the touched hosted-close source/tests.

### Current Status

- State: ok
- Note: Rebased 9JBSSW onto main@734042f6c6538441d624a68e737e5910aaecc9be, reran focused hosted-close vitest plus workflow contract coverage, and reran eslint on touched sources; all checks passed.

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

- Updated: 2026-04-06T22:51:30.706Z
- Branch: task/202604062228-9JBSSW/hosted-close-missing-merge-object
- Head: 7b1bf73deeef

```text
 .agentplane/tasks/202604062228-9JBSSW/README.md    | 139 ++++++++++++++++
 .../tasks/202604062228-9JBSSW/pr/diffstat.txt      |  14 ++
 .../tasks/202604062228-9JBSSW/pr/github-body.md    |  63 ++++++++
 .../tasks/202604062228-9JBSSW/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604062228-9JBSSW/pr/meta.json |  14 ++
 .../tasks/202604062228-9JBSSW/pr/notes.jsonl       |   0
 .agentplane/tasks/202604062228-9JBSSW/pr/review.md |  70 ++++++++
 .../tasks/202604062228-9JBSSW/pr/verify.log        |   0
 .github/workflows/task-hosted-close.yml            |   1 +
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 176 +++++++++++++++++++++
 .../src/commands/guard/impl/close-message.ts       |  31 +++-
 .../task/hosted-close-workflow-contract.test.ts    |   1 +
 .../src/commands/task/hosted-close.command.ts      |  41 ++++-
 13 files changed, 544 insertions(+), 7 deletions(-)
```

</details>
