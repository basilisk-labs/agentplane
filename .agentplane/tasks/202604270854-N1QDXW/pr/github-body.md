## Summary

Extract branch_pr testkit fixture builders

Extract reusable branch_pr fixture builders for git repos, task READMEs, PR meta artifacts, verify logs, worktrees, and hosted-close state to reduce duplication across large CLI and command test suites.

## Scope

- In scope: Extract reusable branch_pr fixture builders for git repos, task READMEs, PR meta artifacts, verify logs, worktrees, and hosted-close state to reduce duplication across large CLI and command test suites.
- Out of scope: unrelated refactors not required for "Extract branch_pr testkit fixture builders".

## Verification

- State: ok
- Note: Command: bun run test:project -- testkit packages/testkit; Result: pass, 3 files and 4 tests. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts; Result: pass, 1 file and 8 tests. Command: bun run typecheck; Result: pass. Command: git diff --check; Result: pass. Scope: extracted branchPrArtifactFixture into testkit cli-core PR-flow helpers and migrated a representative PR lifecycle artifact assertion slice.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T06:52:43.384Z
- Branch: task/202604270854-N1QDXW/branch-pr-testkit-fixtures
- Head: 7e8413158398

```text
No changes detected.
```

</details>
