## Summary

AP-10: Split release apply tests

Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.

## Scope

- In scope: Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.
- Out of scope: unrelated refactors not required for "AP-10: Split release apply tests".

## Verification

- State: ok
- Note: Verified: release apply tests split into preflight, version mutation, apply flow, and push recovery suites; shared release helpers moved to @agentplane/testkit/release; oversized baseline ratcheted.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T10:00:45.097Z
- Branch: task/202605010645-JGXD12/release-apply-test-split
- Head: e0ac888d7002

```text
No changes detected.
```

</details>
