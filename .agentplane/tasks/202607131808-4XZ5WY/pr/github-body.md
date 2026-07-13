Task: `202607131808-4XZ5WY`
Title: Prepare and publish patch release v0.6.23
Canonical task record: `.agentplane/tasks/202607131808-4XZ5WY/README.md`

## Summary

Prepare and publish patch release v0.6.23

Prepare release notes and the v0.6.23 release candidate from current main, pass release and hosted verification, merge through protected main, dispatch Publish to npm for the merged release SHA, and verify GitHub Release, tag, and npm package parity. Do not touch agentplane-loops.

## Scope

Release v0.6.23 from main at base SHA eb05aa537e11518c9b3542a43f46e0cbdcc35260. In scope: docs/releases/v0.6.23.md; package/version and generated release artifacts produced by AgentPlane release candidate; task/PR/quality evidence; protected-main merge; Publish to npm dispatch for the merged release SHA; GitHub tag/release and npm parity readback. Out of scope: agentplane-loops, unrelated implementation changes, dependency upgrades, and feature work.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-13T18:11:52.210Z
- Branch: task/202607131808-4XZ5WY/prepare-and-publish-patch-release-v0-6-23
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/releases/v0.6.23.md                           |  39 +++++++++++++++++++++
 .../commands/release/release-ci-contract.test.ts   |   5 +++
 scripts/lib/test-route-registry.mjs                |   1 +
 .../static/img/social/docs/releases/v0.6.23.png    | Bin 0 -> 54823 bytes
 website/static/img/social/manifest.json            |   8 +++++
 5 files changed, 53 insertions(+)
```

</details>
