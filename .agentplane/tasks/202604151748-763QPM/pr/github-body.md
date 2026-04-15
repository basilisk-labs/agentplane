## Summary

Fix publish exact artifact selection for release-ready recovery

Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.

## Scope

- In scope: Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.
- Out of scope: unrelated refactors not required for "Fix publish exact artifact selection for release-ready recovery".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T17:50:32.117Z
- Branch: task/202604151748-763QPM/publish-exact-artifact-selection
- Head: 3eacf6566b14

```text
 .agentplane/tasks/202604151748-763QPM/README.md    | 99 ++++++++++++++++++++++
 .github/workflows/publish.yml                      |  5 +-
 .../release/publish-workflow-contract.test.ts      |  9 +-
 3 files changed, 110 insertions(+), 3 deletions(-)
```

</details>
