# PR Review

Created: 2026-04-13T14:34:48.718Z
Branch: task/202604131433-5NX3AW/ci-filter-every

## Summary

Make Core CI task-artifact exclusions effective

Artifact-only hosted-close PR #278 still triggered Core CI test/test-windows even though .agentplane/tasks/** was excluded from .github/path-filters.yml. Root cause: dorny/paths-filter evaluates list entries with default some semantics, so the positive .agentplane/** rule still wins. Update CI/prepublish filter steps so exclusions are effective, add regression coverage, and verify on the next hosted closure tail.

## Scope

- In scope: Artifact-only hosted-close PR #278 still triggered Core CI test/test-windows even though .agentplane/tasks/** was excluded from .github/path-filters.yml. Root cause: dorny/paths-filter evaluates list entries with default some semantics, so the positive .agentplane/** rule still wins. Update CI/prepublish filter steps so exclusions are effective, add regression coverage, and verify on the next hosted closure tail.
- Out of scope: unrelated refactors not required for "Make Core CI task-artifact exclusions effective".

## Verification

### Plan

1. Inspect the artifact-only hosted-close diff pattern under .agentplane/tasks/** and confirm why Core CI still evaluates core=true without predicate-quantifier: every. Expected: the current workflow semantics reproduce the false-positive heavy-gate behavior seen on PR #278.
2. Run focused workflow contract tests for .github/workflows/ci.yml, .github/workflows/prepublish.yml, and related release CI assertions. Expected: they pass and explicitly lock predicate-quantifier: every wherever .github/path-filters.yml is consumed.
3. After this task's task PR merges, inspect its hosted closure PR and confirm the artifact-only tail does not require Core CI test/test-windows. Expected: only the lightweight required checks remain.

### Current Status

- State: pending
- Note: Not recorded yet.

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

- Updated: 2026-04-13T14:41:11.081Z
- Branch: task/202604131433-5NX3AW/ci-filter-every
- Head: 6b8b256a4354

```text
 .agentplane/tasks/202604131433-5NX3AW/README.md    | 99 ++++++++++++++++++++++
 .github/workflows/ci.yml                           |  1 +
 .github/workflows/prepublish.yml                   |  1 +
 .../commands/release/ci-workflow-contract.test.ts  |  7 ++
 4 files changed, 108 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
