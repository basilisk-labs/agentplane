Task: `202605231100-W8XDSA`
Title: Fix workflow_dispatch aggregate CI for evidence branches
Canonical task record: `.agentplane/tasks/202605231100-W8XDSA/README.md`

## Summary

Fix workflow_dispatch aggregate CI for evidence branches

Allow manually dispatched Core CI runs without an exact release SHA to satisfy PR verification from normal full-fast jobs without requiring a skipped release-ready manifest.

## Scope

- In scope: Allow manually dispatched Core CI runs without an exact release SHA to satisfy PR verification from normal full-fast jobs without requiring a skipped release-ready manifest.
- Out of scope: unrelated refactors not required for "Fix workflow_dispatch aggregate CI for evidence branches".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T11:00:44.146Z
- Branch: task/202605231100-W8XDSA/ci-dispatch-aggregate
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml | 5 ++++-
 1 file changed, 4 insertions(+), 1 deletion(-)
```

</details>
