## Summary

Finish reconciling release apply with protected-main publish authority

INC-20260410-05 remains open until the release CLI has a fully coherent protected-main route. Complete the branch_pr release/apply/finalize model so release apply no longer encodes a direct-push assumption where this repository publishes through main-driven automation.

## Scope

- In scope: INC-20260410-05 remains open until the release CLI has a fully coherent protected-main route. Complete the branch_pr release/apply/finalize model so release apply no longer encodes a direct-push assumption where this repository publishes through main-driven automation.
- Out of scope: unrelated refactors not required for "Finish reconciling release apply with protected-main publish authority".

## Verification

- State: ok
- Note: Verified: release policy and troubleshooting now match the enforced branch_pr route; branch_pr release candidate tests still pass and INC-20260410-05 is no longer active.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-16T14:15:01.971Z
- Branch: task/202604161300-AFF20S/reconcile-release-apply-publish-authority
- Head: 9a3ca2e90da8

```text
 .agentplane/policy/incidents.md                       | 1 -
 .agentplane/policy/workflow.release.md                | 7 +++++--
 docs/developer/incident-archive.mdx                   | 1 +
 docs/help/troubleshooting-by-symptom.mdx              | 4 +++-
 docs/help/troubleshooting.mdx                         | 4 +++-
 packages/agentplane/assets/policy/incidents.md        | 1 -
 packages/agentplane/assets/policy/workflow.release.md | 7 +++++--
 7 files changed, 17 insertions(+), 8 deletions(-)
```

</details>
