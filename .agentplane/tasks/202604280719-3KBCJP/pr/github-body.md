## Summary

Release v0.3.29

Prepare and publish patch release v0.3.29 from the current branch_pr main state, including release plan, notes, candidate branch, verification, merge to main, and publication evidence.

## Scope

- In scope: Prepare and publish patch release v0.3.29 from the current branch_pr main state, including release plan, notes, candidate branch, verification, merge to main, and publication evidence.
- Out of scope: unrelated refactors not required for "Release v0.3.29".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T07:39:09.936Z
- Branch: task/202604280719-3KBCJP/release-v0-3-29
- Head: eeca80a9a695

```text
 .../run-cli.core.pr-flow.integrate-strategies.test.ts   | 12 ++++++++----
 .../agentplane/src/commands/branch/work-start.git.ts    |  2 --
 .../agentplane/src/commands/shared/branch-pr-context.ts |  2 +-
 packages/agentplane/src/commands/shared/pr-meta.ts      |  4 ++--
 scripts/generate-scripts-readme.mjs                     | 17 ++++++++++-------
 scripts/oversized-test-baseline.json                    |  4 ++--
 tsconfig.base.json                                      |  2 +-
 7 files changed, 24 insertions(+), 19 deletions(-)
```

</details>
