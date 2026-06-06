# PR Review

Created: 2026-06-06T16:44:02.627Z

## Task

- Task: `202606061641-4TQ3Q7`
- Title: Fix release lifecycle reliability issues
- Status: DOING
- Branch: `task/202606061641-4TQ3Q7/fix-release-lifecycle-reliability-issues`
- Canonical task record: `.agentplane/tasks/202606061641-4TQ3Q7/README.md`

## Verification

- State: ok
- Note: Verified review-thread fixes. Added stdin preservation test for background hook shim and configured workflow_dir release snapshot test. Checks passed: focused vitest suite 15 tests; bun run lint:core; bun run knip:check; bun run --filter=agentplane typecheck; bun run --filter=agentplane build; bun run format:changed; node .agentplane/policy/check-routing.mjs; git diff --check.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
