## Summary

Fix publish exact artifact selection for release-ready recovery

Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.

## Scope

- In scope: Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.
- Out of scope: unrelated refactors not required for "Fix publish exact artifact selection for release-ready recovery".

## Verification

- State: ok
- Note: Targeted release workflow checks passed: bun vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The publish workflow now carries release_ready_artifact_name from source.json and downloads the exact detected artifact instead of hard-coding the generic release-ready name.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T17:53:09.431Z
- Branch: task/202604151748-763QPM/publish-exact-artifact-selection
- Head: 121d136d037e

```text
 .agentplane/tasks/202604151748-763QPM/README.md    | 121 +++++++++++++++++++++
 .github/workflows/publish.yml                      |   5 +-
 .../release/publish-workflow-contract.test.ts      |   9 +-
 3 files changed, 132 insertions(+), 3 deletions(-)
```

</details>
