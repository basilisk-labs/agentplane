## Summary

Run full Core CI on workflow_dispatch release recovery

Force Core CI workflow_dispatch runs to treat release-recovery dispatches as core-bearing so test and release-ready jobs execute for exact historical SHAs.

## Scope

- In scope: Force Core CI workflow_dispatch runs to treat release-recovery dispatches as core-bearing so test and release-ready jobs execute for exact historical SHAs.
- Out of scope: unrelated refactors not required for "Run full Core CI on workflow_dispatch release recovery".

## Verification

- State: ok
- Note: Verified: workflow_dispatch now forces core=true in Core CI changes gating; ci-workflow-contract.test.ts passes locally.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T14:09:10.108Z
- Branch: task/202604151406-EX4FE7/workflow-dispatch-core-gate
- Head: 2091603e18f5

```text
No changes detected.
```

</details>
