## Summary

Fix publish workflow exact-sha identity for release recovery

Keep workflow_dispatch publish recovery bound to the requested exact SHA instead of mutable main HEAD, then verify by publishing v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.

## Scope

- In scope: Keep workflow_dispatch publish recovery bound to the requested exact SHA instead of mutable main HEAD, then verify by publishing v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
- Out of scope: unrelated refactors not required for "Fix publish workflow exact-sha identity for release recovery".

## Verification

- State: ok
- Note: Verified: publish workflow_dispatch now keeps an explicit input sha when resolving release-ready source; publish-workflow-contract.test.ts passes locally.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T14:59:45.139Z
- Branch: task/202604151451-X154XQ/publish-exact-sha-identity
- Head: 2f254fc33460

```text
No changes detected.
```

</details>
