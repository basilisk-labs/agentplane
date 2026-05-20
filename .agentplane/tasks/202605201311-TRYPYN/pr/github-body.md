Task: `202605201311-TRYPYN`
Title: Fix local CI routing for context task artifacts
Canonical task record: `.agentplane/tasks/202605201311-TRYPYN/README.md`

## Summary

Fix local CI routing for context task artifacts

Investigate and fix the pre-push ci:local:fast full-fast fallback that occurred when context code changes were combined with .agentplane task/PR artifacts; route this scope to focused context tests instead of broad flaky/timing suites.

## Scope

- In scope: Investigate and fix the pre-push ci:local:fast full-fast fallback that occurred when context code changes were combined with .agentplane task/PR artifacts; route this scope to focused context tests instead of broad flaky/timing suites.
- Out of scope: unrelated refactors not required for "Fix local CI routing for context task artifacts".

## Verification

- State: ok
- Note:

```text
Root cause confirmed: context code/docs plus neutral task PR artifact fell through to full-fast as
unclassified_changed_paths. Added context bucket and regression coverage. Evidence: run-local-ci
--mode fast --explain now selects targeted(context)/context_paths_only; run-local-ci --mode fast for
reproduced changed files passed; local-ci-selection.test.ts passed; context targeted tests passed;
prettier/eslint/check-routing/diff-check passed; ap doctor OK with unrelated archived README warning
only.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T13:20:34.793Z
- Branch: task/202605201311-TRYPYN/context-ci-routing
- Head: 4483996a8cdd

```text
No changes detected.
```

</details>
