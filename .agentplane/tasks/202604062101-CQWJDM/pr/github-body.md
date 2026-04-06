## Summary

Prevent verify from mutating incidents registry

Lock the workflow boundary so verification and PR artifact sync never mutate .agentplane/policy/incidents.md; add regression coverage for branch_pr verify paths.

## Scope

- In scope: Lock the workflow boundary so verification and PR artifact sync never mutate .agentplane/policy/incidents.md; add regression coverage for branch_pr verify paths.
- Out of scope: unrelated refactors not required for "Prevent verify from mutating incidents registry".

## Verification

### Plan

- Run focused vitest coverage for branch_pr verify behavior and assert incidents.md remains unchanged.
- Run eslint on the touched verification and PR-sync source/tests.
- Smoke-check the task branch workflow until verify updates task/PR artifacts without policy drift.

### Current Status

- State: ok
- Note: Focused incidents.md regression tests and eslint passed on the committed PR sync isolation fix; scope: CQWJDM verify/pr-open incidents boundary.

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

- Updated: 2026-04-06T21:41:40.085Z
- Branch: task/202604062101-CQWJDM/verify-incidents-boundary
- Head: 4a4f3e596413

```text
 .agentplane/tasks/202604062101-CQWJDM/README.md    | 129 ++++++++++
 .../tasks/202604062101-CQWJDM/pr/diffstat.txt      |  11 +
 .../tasks/202604062101-CQWJDM/pr/github-body.md    |  60 +++++
 .../tasks/202604062101-CQWJDM/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604062101-CQWJDM/pr/meta.json |  14 +
 .../tasks/202604062101-CQWJDM/pr/notes.jsonl       |   0
 .agentplane/tasks/202604062101-CQWJDM/pr/review.md |  67 +++++
 .../tasks/202604062101-CQWJDM/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 175 +++++++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    | 285 ++++++++++++---------
 10 files changed, 619 insertions(+), 123 deletions(-)
```

</details>
