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
- Note: Verification now locks the whole PR artifact sync boundary, not only verify. Commands: bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts -t incidents.md; bun x eslint packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts. Result: pass. Evidence: both verify and pr open keep incidents.md unchanged, and PR sync restores the registry even if hidden side effects try to mutate it. Scope: PR artifact sync isolation for verify/open flows plus the narrowed update-only sync path when artifacts already exist.

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

- Updated: 2026-04-06T21:17:10.735Z
- Branch: task/202604062101-CQWJDM/verify-incidents-boundary
- Head: 943d4bba4254

```text
 .agentplane/tasks/202604062101-CQWJDM/README.md    | 107 +++++++++++++++++++++
 .../tasks/202604062101-CQWJDM/pr/diffstat.txt      |   0
 .../tasks/202604062101-CQWJDM/pr/github-body.md    |  50 ++++++++++
 .../tasks/202604062101-CQWJDM/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604062101-CQWJDM/pr/meta.json |  14 +++
 .../tasks/202604062101-CQWJDM/pr/notes.jsonl       |   0
 .agentplane/tasks/202604062101-CQWJDM/pr/review.md |  57 +++++++++++
 .../tasks/202604062101-CQWJDM/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  97 +++++++++++++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    |  20 ++--
 10 files changed, 338 insertions(+), 8 deletions(-)
```

</details>
