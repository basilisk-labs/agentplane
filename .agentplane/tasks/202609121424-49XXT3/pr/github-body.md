Task: `202609121424-49XXT3`
Title: Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA
Canonical task record: `.agentplane/tasks/202609121424-49XXT3/README.md`

## Summary

Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA

Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.

## Scope

- In scope: Release operator task after all 0.7.9 stabilization dependencies are integrated. Prepare exact 0.7.9 version parity and release notes, run the complete release prepublish and incident gates, produce and integrate the release-ready candidate through repository policy, publish v0.7.9 from the exact qualified main SHA, and independently verify the canonical .agentplane/.release/publish/publish-result.json has success=true with an empty failures array for that SHA. Verify GitHub release assets and checksums, package registries, setup-agentplane tag and install, Homebrew and Scoop distribution, both agentplane and ap entrypoints, and default-branch state. Record any unavailable anonymous GHCR check separately. Complete the required post-publish evidence follow-up and next patch beta only through AgentPlane-managed lifecycle. Never commit agentplane-roadmap-r2. Stop only at a genuine provider or evidence boundary; the user explicitly authorized publish, merge, network, credentials, and external-system actions for v0.7.9.
- Out of scope: unrelated refactors not required for "Publish and independently verify AgentPlane 0.7.9 from the exact qualified main SHA".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-13T22:57:11.966Z
- Branch: task/202609121424-49XXT3/publish-and-independently-verify-agentplane-0-7
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
