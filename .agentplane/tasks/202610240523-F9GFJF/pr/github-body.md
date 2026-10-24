Task: `202610240523-F9GFJF`
Title: Align PR lifecycle tests with ancestry-safe artifact refresh commits
Canonical task record: `.agentplane/tasks/202610240523-F9GFJF/README.md`

## Summary

Align PR lifecycle tests with ancestry-safe artifact refresh commits

In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.

## Scope

- In scope: In 0.7.13 release CI retry8, run-cli.core.pr-flow.pr-lifecycle.test.ts has two stale HEAD assertions after pr open and pr update. Production pr/internal/auto-commit.ts intentionally preserves the existing implementation HEAD and creates a separate task artifact refresh commit because publication cannot be disproved from local refs or commit subject. Update only the affected test assertions, titles and commit/file expectations to prove ancestry-safe behavior: PR open keeps source change in parent and task artifacts in HEAD; PR update keeps change parent and task refresh HEAD. Audit adjacent PR lifecycle tests for the same stale assumption. Do not alter production commit behavior or weaken checks. Validate focused Vitest, formatting, lint, full local CI, independent review, hosted exact-head and guarded integration.
- Out of scope: unrelated refactors not required for "Align PR lifecycle tests with ancestry-safe artifact refresh commits".

## Verification

- State: ok
- Note: Canonical validation sha256:641c6212acf86d32cc8e49fb9d809694ff1b2e4d4d815dd5ad606ceb08fc1f9f
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-24T05:30:41.631Z
- Branch: task/202610240523-F9GFJF/align-pr-lifecycle-tests-with-ancestry-safe-arti
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-flow.pr-lifecycle.test.ts  | 60 ++++++++++++----------
 1 file changed, 34 insertions(+), 26 deletions(-)
```

</details>
