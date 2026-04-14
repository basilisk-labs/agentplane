## Summary

Reduce branch_pr release friction

Prevent local integrate from mutating protected main, reduce tracked PR artifact churn, and then prepare the next patch release.

## Scope

- In scope: Prevent local integrate from mutating protected main, reduce tracked PR artifact churn, and then prepare the next patch release.
- Out of scope: unrelated refactors not required for "Reduce branch_pr release friction".

## Verification

- State: ok
- Note: Verified: targeted branch_pr suites pass (75/75); pr check passes; protected-main integrate now fails fast and pr open/update auto-commit task PR artifacts.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-14T09:49:48.765Z
- Branch: task/202604131826-PRNBPW/branch-pr-friction
- Head: 00bdf2008b60

```text
 .agentplane/tasks/202604131826-PRNBPW/README.md    | 123 ++++++++++++
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts | 215 +++++++++++++++++----
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        | 192 +++++++++++++++++-
 .../agentplane/src/cli/run-cli.test-helpers.ts     |  22 +++
 .../agentplane/src/commands/pr/integrate/cmd.ts    |  18 +-
 .../pr/integrate/internal/github-protection.ts     |  20 ++
 .../src/commands/pr/integrate/internal/prepare.ts  |   7 +
 .../src/commands/pr/internal/auto-commit.ts        |  88 +++++++++
 packages/agentplane/src/commands/pr/open.ts        |  13 +-
 packages/agentplane/src/commands/pr/update.ts      |  15 +-
 10 files changed, 659 insertions(+), 54 deletions(-)
```

</details>
