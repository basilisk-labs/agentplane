## Summary

Preserve current runtime checkout in publish recovery

Keep the current-workflow runtime checkout alive for workflow_dispatch publish recovery by ordering checkouts safely, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.

## Scope

- In scope: Keep the current-workflow runtime checkout alive for workflow_dispatch publish recovery by ordering checkouts safely, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
- Out of scope: unrelated refactors not required for "Preserve current runtime checkout in publish recovery".

## Verification

- State: ok
- Note: Verified: publish workflow exact-SHA recovery now preserves the current-runtime resolver checkout by ordering checkouts safely; publish-workflow-contract.test.ts passes locally.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T15:18:47.313Z
- Branch: task/202604151513-9H8FF8/publish-runtime-checkout-order
- Head: 5c711c117712

```text
No changes detected.
```

</details>
