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
- Note: Verified release lifecycle fixes after CI-static follow-up. Checks: focused vitest suite for hook shim/release candidate/publish workflow passed 14 tests; bun run lint:core passed; bun run knip:check passed; bun run --filter=agentplane typecheck passed; bun run --filter=agentplane build passed; bun run format:changed passed; node .agentplane/policy/check-routing.mjs passed; git diff --check passed. Local arch:check was not rerun here because dependency-cruiser requires Node 24 and local runtime reports Node v26; CI uses Node 24.
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
 .../commands/branch/work-start.hook-shim.test.ts   |  38 ++++
 .../src/commands/release/apply.apply-flow.test.ts  |  25 +++
 .../commands/release/apply.pipeline/mutation.ts    |  22 ++-
 .../release/publish-workflow-contract.test.ts      |  10 +-
 .../src/commands/shared/hook-shim-template.ts      |  41 +++-
 scripts/workflow/bootstrap-framework-dev.mjs       |  41 +++-
 8 files changed, 210 insertions(+), 209 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
