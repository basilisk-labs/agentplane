# PR Review

Created: 2026-04-13T14:06:53.021Z
Branch: task/202604131403-GZ659S/hosted-close-ci-skip

## Summary

Skip Core CI for task-artifact-only hosted closure PRs

Closure PRs produced by hosted branch_pr closeout currently touch only tracked task artifacts, but Core CI still classifies .agentplane task changes as core and reruns the full test/test-windows gate. Exclude task-artifact-only close PRs from heavy Core CI while keeping protection contracts intact, then reconcile the local release-hardening worktrees/branches that are now obsolete after the hosted-close fix landed.

## Scope

- In scope: Closure PRs produced by hosted branch_pr closeout currently touch only tracked task artifacts, but Core CI still classifies .agentplane task changes as core and reruns the full test/test-windows gate. Exclude task-artifact-only close PRs from heavy Core CI while keeping protection contracts intact, then reconcile the local release-hardening worktrees/branches that are now obsolete after the hosted-close fix landed.
- Out of scope: unrelated refactors not required for "Skip Core CI for task-artifact-only hosted closure PRs".

## Verification

### Plan

1. Simulate or inspect a change set limited to `.agentplane/tasks/**` and the hosted close PR body contract. Expected: Core CI no longer treats that diff as a core change, so the heavy `test` and `test-windows` jobs are not required for artifact-only closure PRs.
2. Run the focused workflow/path-filter regression checks for the touched CI contract files. Expected: they pass and still assert the required protection contract.
3. Inspect local and remote release-hardening leftovers after the fix lands. Expected: obsolete KHYHBT task branches/worktrees are removed, and no open hosted-close PR tail remains.

### Current Status

- State: ok
- Note: Command: sed -n '1,120p' .github/path-filters.yml && git diff -- .github/path-filters.yml packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: core filter still includes .agentplane/** but now excludes .agentplane/tasks/** only; diff stays limited to the path filter and its contract test. | Scope: verifies artifact-only hosted close PRs fall out of heavy Core CI without broadening the exclusion.
Command: bunx vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/cli/check-github-protection-contract-script.test.ts | Result: pass | Evidence: 2 test files passed, 6 tests passed. | Scope: verifies CI/release contract coverage and GitHub protection expectations still hold.
Command: bunx eslint packages/agentplane/src/commands/release/ci-workflow-contract.test.ts | Result: pass | Evidence: exited clean with no findings. | Scope: verifies the touched TypeScript contract test stays lint-clean.
Command: git worktree list --porcelain && git branch -r --list 'origin/task/202604131329-KHYHBT*' 'origin/task-close/202604131329-KHYHBT*' | Result: pass | Evidence: obsolete KHYHBT task worktree removed locally and no matching remote hosted-close branches remain. | Scope: verifies the stale release-hardening cleanup tail for the already-merged hosted-close task.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T14:14:48.390Z
- Branch: task/202604131403-GZ659S/hosted-close-ci-skip
- Head: 03ddee98df06

```text
 .agentplane/tasks/202604131403-GZ659S/README.md    | 129 +++++++++++++++++++++
 .github/path-filters.yml                           |   1 +
 .../commands/release/ci-workflow-contract.test.ts  |  10 ++
 3 files changed, 140 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
