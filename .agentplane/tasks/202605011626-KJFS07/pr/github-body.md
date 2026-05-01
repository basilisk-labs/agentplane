## Summary

Add Scoop bucket publication module

Add a release module that can update an AgentPlane Scoop manifest from the published npm tarball, checksum, and release manifest while keeping Windows publication recoverable.

## Scope

- In scope: Add a release module that can update an AgentPlane Scoop manifest from the published npm tarball, checksum, and release manifest while keeping Windows publication recoverable.
- Out of scope: unrelated refactors not required for "Add Scoop bucket publication module".

## Verification

- State: ok
- Note: Scoop bucket module renders agentplane.json and scoop-result.json from release-distribution.json; publish workflow uploads scoop-module artifact and contract test covers the route.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T17:17:22.181Z
- Branch: task/202605011626-KJFS07/scoop-bucket-publication
- Head: 347891e858d0

```text
No changes detected.
```

</details>
