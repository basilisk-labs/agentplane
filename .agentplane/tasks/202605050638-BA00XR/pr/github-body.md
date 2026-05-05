Task: `202605050638-BA00XR`
Title: Define branch_pr artifact roles and drift rules

## Summary

Define branch_pr artifact roles and drift rules

Document and enforce the distinction between canonical records, evidence snapshots, and rendered projections for branch_pr artifacts, so generated files have explicit freshness, regeneration, and drift semantics.

## Scope

- In scope: Document and enforce the distinction between canonical records, evidence snapshots, and rendered projections for branch_pr artifacts, so generated files have explicit freshness, regeneration, and drift semantics.
- Out of scope: unrelated refactors not required for "Define branch_pr artifact roles and drift rules".

## Verification

- State: ok
- Note: Command: ap task verify-show 202605050638-BA00XR -> pass, reviewed generated Verify Steps. Command: node .agentplane/policy/check-routing.mjs -> pass (policy routing OK). Command: ap doctor -> pass with warnings only about existing hook/runtime shim state, no errors. Scope: docs/user/branching-and-pr-artifacts.mdx artifact role and drift-rule documentation.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T06:54:14.486Z
- Branch: task/202605050638-BA00XR/artifact-role-contract
- Head: f642dad1d50c

```text
 docs/user/branching-and-pr-artifacts.mdx | 17 ++++++++++++++++-
 1 file changed, 16 insertions(+), 1 deletion(-)
```

</details>
