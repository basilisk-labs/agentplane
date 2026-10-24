Task: `202610240307-FBQ713`
Title: Repair shared fake GitHub branch metadata for protected-base integration
Canonical task record: `.agentplane/tasks/202610240307-FBQ713/README.md`

## Summary

Repair shared fake GitHub branch metadata for protected-base integration

The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.

## Scope

- In scope: The protected-base integration fixture installs installFakeGhPrLookup from packages/testkit/src/github-pr.ts. Production correctly reads repos/example/repo/branches/main before its protection detail; the fake currently returns [] for the first request, causing run-cli.core.pr-flow.integrate-validation.test.ts to fail in 0.7.13 release CI. Add the exact protected-branch metadata response ahead of the protection response, preserve unknown-command rejection and existing unprotected behavior, and assert the two-call protection observation in the focused integration test. Audit other protection fakes for actual call sites; leave unused or separate-contract helpers unchanged. Do not change production protection policy. Validate targeted Vitest, formatting, lint, and full local CI.
- Out of scope: unrelated refactors not required for "Repair shared fake GitHub branch metadata for protected-base integration".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-24T03:18:54.602Z
- Branch: task/202610240307-FBQ713/repair-shared-fake-github-branch-metadata-for-pr
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.pr-flow.integrate-validation.test.ts | 15 +++++++++++++++
 packages/testkit/src/github-pr.ts                         |  4 ++++
 2 files changed, 19 insertions(+)
```

</details>
