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
- Note: Formatting follow-up after pre-push.

Command: bunx prettier docs/developer/release-and-publishing.mdx --write
Result: pass
Evidence: formatted release docs.
Scope: docs/developer/release-and-publishing.mdx
Links: docs/developer/release-and-publishing.mdx

Command: bun run format:check -- docs/developer/release-and-publishing.mdx
Result: pass
Evidence: All matched files use Prettier code style.
Scope: docs/developer/release-and-publishing.mdx
Links: docs/developer/release-and-publishing.mdx

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing after formatting follow-up.
Links: docs/developer/release-and-publishing.mdx

Command: agentplane doctor
Result: pass
Evidence: doctor OK; errors=0 warnings=0.
Scope: docs-only PR branch after formatting follow-up.
Links: docs/developer/release-and-publishing.mdx
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T16:09:10.228Z
- Branch: task/202605021412-FDDWP8/standalone-artifact-contract
- Head: d9244145e45e

```text
 docs/developer/release-and-publishing.mdx | 127 +++++++++++++++++++++++++++++-
 1 file changed, 123 insertions(+), 4 deletions(-)
```

</details>
