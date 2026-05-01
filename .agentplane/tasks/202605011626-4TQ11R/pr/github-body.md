## Summary

Generate release install assets and manifest

Add deterministic release distribution asset generation for install.sh, install.ps1, SHA256SUMS, and a machine-readable release distribution manifest.

## Scope

- In scope: Add deterministic release distribution asset generation for install.sh, install.ps1, SHA256SUMS, and a machine-readable release distribution manifest.
- Out of scope: unrelated refactors not required for "Generate release install assets and manifest".

## Verification

- State: ok
- Note: Release distribution assets verified: release:distribution:check passed; release:check passed; workflows:command-check passed; docs:scripts:check passed after regenerating scripts/README.md; publish workflow contract test passed; lint:core passed sequentially.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T16:48:36.674Z
- Branch: task/202605011626-4TQ11R/release-distribution-assets
- Head: 6ddf24956581

```text
No changes detected.
```

</details>
