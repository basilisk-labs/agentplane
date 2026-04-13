## Summary

Make release apply branch_pr-aware for protected-main publish

When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.

## Scope

- In scope: When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
- Out of scope: unrelated refactors not required for "Make release apply branch_pr-aware for protected-main publish".

## Verification

- State: ok
- Note: - Fixed repo-local hook shim precedence so fresh worktrees prefer local packages/agentplane/bin/agentplane.js before AGENTPLANE_HOOK_RUNNER. - Ensured framework bootstrap always materializes the managed .agentplane/bin/agentplane shim and work start seeds the same shim into fresh worktrees. - Verified with: bunx vitest run packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T12:07:52.198Z
- Branch: task/202604130750-E2J835/release-apply-branch-pr-safe
- Head: 7484ab42b6fc

```text
 .agentplane/tasks/202604130750-E2J835/README.md    | 186 ++++++++++++++++++++
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  84 +++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    |  27 ++-
 .../src/commands/release/apply.command.ts          | 151 +++++++++++++++--
 .../src/commands/release/apply.reporting.ts        |  26 ++-
 .../agentplane/src/commands/release/apply.test.ts  | 187 +++++++++++++++++++++
 .../agentplane/src/commands/release/apply.types.ts |  12 +-
 7 files changed, 648 insertions(+), 25 deletions(-)
```

</details>
