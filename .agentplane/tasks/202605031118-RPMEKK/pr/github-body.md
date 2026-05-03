Task: `202605031118-RPMEKK`
Title: Add installer opt-in for Bun channel

## Summary

Add installer opt-in for Bun channel

Add install.sh/install.ps1 opt-in support for Bun executable assets while keeping standalone Node archives as the default channel until release evidence proves parity.

## Scope

- In scope: Add install.sh/install.ps1 opt-in support for Bun executable assets while keeping standalone Node archives as the default channel until release evidence proves parity.
- Out of scope: unrelated refactors not required for "Add installer opt-in for Bun channel".

## Verification

- State: ok
- Note: Focused verification passed: bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts and node scripts/generate-release-distribution.mjs --check. Install scripts keep standalone as default and expose AGENTPLANE_INSTALL_CHANNEL=bun as an explicit opt-in channel.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T12:20:19.427Z
- Branch: task/202605031118-RPMEKK/bun-installer-opt-in
- Head: 33b4f5cb746c

```text
No changes detected.
```

</details>
