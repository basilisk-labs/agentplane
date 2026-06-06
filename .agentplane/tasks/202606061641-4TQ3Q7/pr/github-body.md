Task: `202606061641-4TQ3Q7`
Title: Fix release lifecycle reliability issues
Canonical task record: `.agentplane/tasks/202606061641-4TQ3Q7/README.md`

## Summary

Fix release lifecycle reliability issues

Batch fix for GitHub issues #4461, #4462, and #4463: hook shim timeout diagnostics, release candidate generated blueprint snapshot staging, and release evidence PR verification materialization.

## Scope

- In scope: code and focused test changes for #4461, #4462, and #4463.
- In scope: release/lifecycle workflow code and GitHub workflow diagnostics needed for evidence PR verification behavior.
- Out of scope: actual npm publish, release dispatch, unrelated lifecycle refactors, or modifying issues outside #4461-#4463.

## Verification

- State: ok
- Note:

```text
Verified review-thread fixes. Added stdin preservation test for background hook shim and configured
workflow_dir release snapshot test. Checks passed: focused vitest suite 15 tests; bun run lint:core;
bun run knip:check; bun run --filter=agentplane typecheck; bun run --filter=agentplane build; bun
run format:changed; node .agentplane/policy/check-routing.mjs; git diff --check.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-06T16:44:02.627Z
- Branch: task/202606061641-4TQ3Q7/fix-release-lifecycle-reliability-issues
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202606050832-6M43J3/README.md    | 219 +++------------------
 .github/workflows/publish.yml                      |  23 ++-
 .../commands/branch/work-start.hook-shim.test.ts   |  66 +++++++
 .../src/commands/release/apply.apply-flow.test.ts  |  32 +++
 .../commands/release/apply.pipeline/mutation.ts    |  23 ++-
 .../release/publish-workflow-contract.test.ts      |  10 +-
 .../src/commands/shared/hook-shim-template.ts      |  48 ++++-
 scripts/workflow/bootstrap-framework-dev.mjs       |  48 ++++-
 8 files changed, 259 insertions(+), 210 deletions(-)
```

</details>
