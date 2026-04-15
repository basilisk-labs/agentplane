## Summary

Decouple publish recovery resolver from historical checkout

Run publish workflow_dispatch recovery using the current resolver/runtime while keeping the requested historical SHA only as the publish target, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.

## Scope

- In scope: Run publish workflow_dispatch recovery using the current resolver/runtime while keeping the requested historical SHA only as the publish target, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
- Out of scope: unrelated refactors not required for "Decouple publish recovery resolver from historical checkout".

## Verification

- State: ok
- Note: Verified: publish workflow_dispatch now resolves release-ready source via the current workflow runtime while preserving the requested historical publish target; publish-workflow-contract.test.ts passes locally.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T15:11:40.195Z
- Branch: task/202604151503-PWKS2Q/publish-recovery-current-runtime
- Head: e7ec2de706e9

```text
No changes detected.
```

</details>
