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
- Note: Review follow-up verification passed: Windows installer now selects bin\agentplane.cmd for standalone and bin\agentplane.exe for AGENTPLANE_INSTALL_CHANNEL=bun; focused generator test and release distribution check passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T12:30:03.965Z
- Branch: task/202605031118-RPMEKK/bun-installer-opt-in
- Head: b90cf84b75d2

```text
 .../generate-release-distribution-script.test.ts       |  4 ++++
 scripts/generate-release-distribution.mjs              | 18 ++++++++++++++++--
 2 files changed, 20 insertions(+), 2 deletions(-)
```

</details>
