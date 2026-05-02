Task: `202605021412-SVX2DX`
Title: Publish standalone artifacts in release workflow

## Summary

Publish standalone artifacts in release workflow

Wire the publish workflow to build/upload bundled-runtime CLI artifacts for macOS arm64/x64, Linux x64/arm64, and Windows x64, then record them in release-distribution evidence before external package-manager modules run.

## Scope

- In scope: Wire the publish workflow to build/upload bundled-runtime CLI artifacts for macOS arm64/x64, Linux x64/arm64, and Windows x64, then record them in release-distribution evidence before external package-manager modules run.
- Out of scope: unrelated refactors not required for "Publish standalone artifacts in release workflow".

## Verification

- State: ok
- Note: Passed: agentplane task verify-show 202605021412-SVX2DX; bun run workflows:command-check; bun test packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T17:21:17.198Z
- Branch: task/202605021412-SVX2DX/publish-standalone-assets
- Head: ca7aa766e26d

```text
No changes detected.
```

</details>
