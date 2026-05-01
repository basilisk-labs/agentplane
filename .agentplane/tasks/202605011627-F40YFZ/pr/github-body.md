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

- Updated: 2026-05-01T17:52:20.837Z
- Branch: task/202605011627-F40YFZ/ghcr-release-image
- Head: 0132bad0de07

```text
 .github/workflows/publish.yml                      |  37 ++++
 package.json                                       |   1 +
 packages/agentplane/Dockerfile                     |  17 ++
 packages/agentplane/Dockerfile.dockerignore        |  10 +
 .../release/publish-workflow-contract.test.ts      |   9 +
 scripts/README.md                                  |   1 +
 scripts/render-ghcr-image-metadata.mjs             | 203 +++++++++++++++++++++
 7 files changed, 278 insertions(+)
```

</details>
