Task: `202610102331-Z9KEV4`
Title: Confirm unprotected GitHub branches without blocking hosted PR integration
Canonical task record: `.agentplane/tasks/202610102331-Z9KEV4/README.md`

## Summary

Confirm unprotected GitHub branches without blocking hosted PR integration

Repair the generic GitHub branch protection observation used by hosted PR integration. Confirm exact URL-encoded branch identity and explicit protected=false from the branch endpoint instead of interpreting the expected protection endpoint 404 as provider unavailability. Preserve protected-branch detail semantics, unavailable/auth/malformed/missing-branch fail-closed behavior, hosted PR merge checks for both confirmed states and the stricter conflict-rework protected-base gate. No branch protection changes, live provider writes, local merge bypass, schema or authority changes. Add bounded mock-transport regressions for slash branch encoding, confirmed unprotected hosted path, protected details and genuine errors.

## Scope

- In scope: Repair the generic GitHub branch protection observation used by hosted PR integration. Confirm exact URL-encoded branch identity and explicit protected=false from the branch endpoint instead of interpreting the expected protection endpoint 404 as provider unavailability. Preserve protected-branch detail semantics, unavailable/auth/malformed/missing-branch fail-closed behavior, hosted PR merge checks for both confirmed states and the stricter conflict-rework protected-base gate. No branch protection changes, live provider writes, local merge bypass, schema or authority changes. Add bounded mock-transport regressions for slash branch encoding, confirmed unprotected hosted path, protected details and genuine errors.
- Out of scope: unrelated refactors not required for "Confirm unprotected GitHub branches without blocking hosted PR integration".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-10T23:42:53.480Z
- Branch: task/202610102331-Z9KEV4/github-unprotected
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../integrate/internal/github-protection.test.ts   | 82 +++++++++++++++++++++-
 .../pr/integrate/internal/github-protection.ts     | 13 +++-
 2 files changed, 91 insertions(+), 4 deletions(-)
```

</details>
