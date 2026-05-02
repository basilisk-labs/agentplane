Task: `202605021412-FDDWP8`
Title: Define standalone CLI artifact contract

## Summary

Define standalone CLI artifact contract

Specify the bundled-runtime AgentPlane CLI artifact contract: supported platform/arch targets, archive layout, embedded Node version source, checksum/signature expectations, runtime path invariants, and security update policy.

## Scope

- In scope: Specify the bundled-runtime AgentPlane CLI artifact contract: supported platform/arch targets, archive layout, embedded Node version source, checksum/signature expectations, runtime path invariants, and security update policy.
- Out of scope: unrelated refactors not required for "Define standalone CLI artifact contract".

## Verification

- State: ok
- Note: Review follow-up: addressed PR review comments.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK after review updates.
Scope: release docs contract.
Links: docs/developer/release-and-publishing.mdx

Command: agentplane doctor
Result: pass
Evidence: doctor OK; errors=0 warnings=0 after review updates.
Scope: docs-only PR branch.
Links: docs/developer/release-and-publishing.mdx

Command: rg -n "agentplane\.cmd|setup action module|standalone CLI asset|depends_on \"node\"" docs/developer/release-and-publishing.mdx
Result: pass
Evidence: Windows smoke tests now use bin/agentplane.cmd and setup-action module now consumes standalone CLI assets from the manifest.
Scope: addressed PR review comments.
Links: docs/developer/release-and-publishing.mdx
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T16:04:11.833Z
- Branch: task/202605021412-FDDWP8/standalone-artifact-contract
- Head: e0a7c1d109bf

```text
 docs/developer/release-and-publishing.mdx | 121 +++++++++++++++++++++++++++++-
 1 file changed, 119 insertions(+), 2 deletions(-)
```

</details>
