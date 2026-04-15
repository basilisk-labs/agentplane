## Summary

Select canonical release commit for workflow_dispatch publish

Make publish workflow_dispatch without explicit --sha resolve the exact release-preparation commit for the target unpublished version instead of later closure or recovery commits on first-parent history.

## Scope

- In scope: Make publish workflow_dispatch without explicit --sha resolve the exact release-preparation commit for the target unpublished version instead of later closure or recovery commits on first-parent history.
- Out of scope: unrelated refactors not required for "Select canonical release commit for workflow_dispatch publish".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T18:28:51.650Z
- Branch: task/202604151818-5M1MXG/canonical-publish-release-sha
- Head: 761b0d9627d3

```text
 .agentplane/tasks/202604151818-5M1MXG/README.md    |  99 +++++++++
 .github/workflows/publish.yml                      |  21 +-
 .../release/publish-workflow-contract.test.ts      |  14 +-
 .../resolve-canonical-release-sha-script.test.ts   | 149 +++++++++++++
 scripts/resolve-canonical-release-sha.mjs          | 244 +++++++++++++++++++++
 5 files changed, 507 insertions(+), 20 deletions(-)
```

</details>
