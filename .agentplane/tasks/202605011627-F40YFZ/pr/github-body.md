## Summary

Add GHCR release image module

Add a release module that builds and publishes a versioned GHCR image for AgentPlane and verifies the container can run the CLI.

## Scope

- In scope: Add a release module that builds and publishes a versioned GHCR image for AgentPlane and verifies the container can run the CLI.
- Out of scope: unrelated refactors not required for "Add GHCR release image module".

## Verification

- State: ok
- Note: GHCR release image module builds the AgentPlane container from the local release tarball artifact, pushes version/tag/latest tags in publish.yml, and uploads ghcr-module evidence.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T17:27:30.544Z
- Branch: task/202605011627-F40YFZ/ghcr-release-image
- Head: 3f889613cf8b

```text
No changes detected.
```

</details>
