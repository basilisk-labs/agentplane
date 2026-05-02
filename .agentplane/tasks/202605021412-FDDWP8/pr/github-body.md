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
- Note: Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: AGENTS/policy routing remains valid after release documentation update.
Links: docs/developer/release-and-publishing.mdx

Command: agentplane doctor
Result: pass
Evidence: doctor OK; errors=0 warnings=0.
Scope: repository health for docs-only task branch.
Links: docs/developer/release-and-publishing.mdx

Command: rg -n "Standalone CLI artifact contract|standalone_cli|bundled_node|depends_on \"node\"|setup-agentplane|agentplane-vX\.Y\.Z" docs/developer/release-and-publishing.mdx
Result: pass
Evidence: matched standalone contract heading, deterministic archive names, standalone_cli manifest kind, bundled_node install strategy, Homebrew no depends_on node rule, and setup-agentplane consumption rule.
Scope: standalone CLI artifact contract and package-manager handoff rules.
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
