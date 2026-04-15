## Summary

Split exact-sha release recovery from broad Core CI test surface

Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.

## Scope

- In scope: Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.
- Out of scope: unrelated refactors not required for "Split exact-sha release recovery from broad Core CI test surface".

## Verification

- State: ok
- Note: Verified: exact-sha workflow_dispatch recovery now uses a publishability-only validation path; ci-workflow-contract.test.ts passes locally.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T14:25:42.036Z
- Branch: task/202604151423-EPXV54/release-recovery-dispatch-path
- Head: 6efbcd221ec9

```text
No changes detected.
```

</details>
