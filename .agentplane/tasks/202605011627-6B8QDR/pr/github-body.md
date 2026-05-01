## Summary

Add setup-agentplane release path

Add the release path and contract for a setup-agentplane GitHub Action so CI users can install exact AgentPlane versions from the release distribution manifest.

## Scope

- In scope: Add the release path and contract for a setup-agentplane GitHub Action so CI users can install exact AgentPlane versions from the release distribution manifest.
- Out of scope: unrelated refactors not required for "Add setup-agentplane release path".

## Verification

- State: ok
- Note: setup-agentplane module renders a composite GitHub Action bundle and setup-agentplane-result.json from release-distribution.json; publish workflow uploads setup-agentplane-module evidence.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T18:06:30.529Z
- Branch: task/202605011627-6B8QDR/setup-agentplane-action
- Head: b887ebcd7d3d

```text
 .github/workflows/publish.yml                      |  14 ++
 package.json                                       |   1 +
 .../release/publish-workflow-contract.test.ts      |   4 +
 scripts/README.md                                  |   1 +
 scripts/render-setup-agentplane-action.mjs         | 188 +++++++++++++++++++++
 5 files changed, 208 insertions(+)
```

</details>
