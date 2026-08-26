Task: `202608262034-QVVB66`
Title: Initialize blueprint test projects as real Git repositories for release CI
Canonical task record: `.agentplane/tasks/202608262034-QVVB66/README.md`

## Summary

Initialize blueprint test projects as real Git repositories for release CI

Release blocker for 0.7.8. Symptom: required release:prepublish fails in run-cli.core.blueprint.test.ts because task new returns E_IO exit 4. Violated invariant: release fixtures exercising task creation must be valid Git repositories. Root cause: mkProject() creates an empty .git directory while the canonical task-create path now runs git worktree list --porcelain. Recovery: keep the 0.7.8 release Task blocked and clean. Permanent fix: initialize the fixture with git init using the existing test Git helper or an equivalent isolated command. Regression: both blueprint snapshot and drift tests pass in a clean exact-main checkout and the focused suite remains green.

## Scope

- In scope: Release blocker for 0.7.8. Symptom: required release:prepublish fails in run-cli.core.blueprint.test.ts because task new returns E_IO exit 4. Violated invariant: release fixtures exercising task creation must be valid Git repositories. Root cause: mkProject() creates an empty .git directory while the canonical task-create path now runs git worktree list --porcelain. Recovery: keep the 0.7.8 release Task blocked and clean. Permanent fix: initialize the fixture with git init using the existing test Git helper or an equivalent isolated command. Regression: both blueprint snapshot and drift tests pass in a clean exact-main checkout and the focused suite remains green.
- Out of scope: unrelated refactors not required for "Initialize blueprint test projects as real Git repositories for release CI".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-26T20:48:34.328Z
- Branch: task/202608262034-QVVB66/initialize-blueprint-test-projects-as-real-git-r
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/run-cli.core.blueprint.test.ts | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)
```

</details>
