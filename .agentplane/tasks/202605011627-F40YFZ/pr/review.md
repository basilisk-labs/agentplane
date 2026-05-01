# PR Review

Created: 2026-05-01T17:27:30.544Z
Branch: task/202605011627-F40YFZ/ghcr-release-image

## Summary

Add GHCR release image module

Add a release module that builds and publishes a versioned GHCR image for AgentPlane and verifies the container can run the CLI.

## Scope

- In scope: Add a release module that builds and publishes a versioned GHCR image for AgentPlane and verifies the container can run the CLI.
- Out of scope: unrelated refactors not required for "Add GHCR release image module".

## Verification

### Plan

1. Run `bun run release:distribution:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `docker build -t agentplane:release-smoke -f packages/agentplane/Dockerfile .`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: GHCR release image module builds the AgentPlane container from the local release tarball artifact, pushes version/tag/latest tags in publish.yml, and uploads ghcr-module evidence.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
