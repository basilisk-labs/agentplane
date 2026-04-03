## Summary

Align GitHub PR UX with branch_pr render model

Use the same semantic render model for local review artifacts and GitHub-facing PR title/body so repository visitors see concise, informative, low-noise change summaries with no duplicate maintenance paths; update help/docs/tests accordingly.

## Scope

- In scope: Use the same semantic render model for local review artifacts and GitHub-facing PR title/body so repository visitors see concise, informative, low-noise change summaries with no duplicate maintenance paths; update help/docs/tests accordingly.
- Out of scope: unrelated refactors not required for "Align GitHub PR UX with branch_pr render model".

## Verification

### Plan

1. Generate local review output and GitHub-facing PR title or body from the same semantic model. Expected: summary, scope, verification, and risk information align without duplicate authoring paths.
2. Inspect generated GitHub-facing strings. Expected: they are concise, informative, and scanable for repository visitors without branch-name-first fallbacks.
3. Run targeted docs/help and PR-flow regressions. Expected: touched tests pass.

### Current Status

- State: ok
- Note: GitHub PR projections, docs, and PR-flow regressions passed.

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

- Updated: 2026-04-02T20:22:29.325Z
- Branch: task/202604021851-FVM23C/github-pr-ux
- Head: 37828c280a7e

```text
 .agentplane/tasks/202604021851-FVM23C/README.md    | 104 +++++++++++
 .../tasks/202604021851-FVM23C/pr/diffstat.txt      |   0
 .agentplane/tasks/202604021851-FVM23C/pr/meta.json |  14 ++
 .../tasks/202604021851-FVM23C/pr/notes.jsonl       |   0
 .agentplane/tasks/202604021851-FVM23C/pr/review.md |  29 +++
 .../tasks/202604021851-FVM23C/pr/verify.log        |   0
 .github/PULL_REQUEST_TEMPLATE.md                   |  41 +++--
 docs/user/branching-and-pr-artifacts.mdx           |   6 +-
 docs/user/commands.mdx                             |   6 +-
 docs/user/task-lifecycle.mdx                       |   2 +-
 docs/user/workflow.mdx                             |   2 +-
 .../src/cli/run-cli.core.pr-flow.integrate.test.ts |   2 +
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  35 +++-
 packages/agentplane/src/commands/pr/check.ts       |  46 ++++-
 .../agentplane/src/commands/pr/integrate/cmd.ts    |   4 +
 .../commands/pr/integrate/internal/merge.test.ts   |  14 +-
 .../src/commands/pr/integrate/internal/merge.ts    |  34 +++-
 .../src/commands/pr/internal/pr-paths.test.ts      |   9 +
 .../src/commands/pr/internal/pr-paths.ts           |   4 +
 .../src/commands/pr/internal/review-template.ts    | 196 +++++++++++++++++----
 .../agentplane/src/commands/pr/internal/sync.ts    |  50 ++++--
 packages/agentplane/src/commands/pr/note.ts        |  44 ++++-
 packages/agentplane/src/commands/pr/pr.command.ts  |  10 +-
 23 files changed, 569 insertions(+), 83 deletions(-)
```

</details>
