Task: `202605031118-RF08MQ`
Title: Define Bun binary runtime contract

## Summary

Define Bun binary runtime contract

Make the CLI able to start as a Bun compiled executable by introducing an explicit binary runtime contract for package metadata, package-root-independent execution, and asset/runtime path behavior.

## Scope

- In scope: Make the CLI able to start as a Bun compiled executable by introducing an explicit binary runtime contract for package metadata, package-root-independent execution, and asset/runtime path behavior.
- Out of scope: unrelated refactors not required for "Define Bun binary runtime contract".

## Verification

- State: ok
- Note: Focused verification passed: bun test packages/agentplane/src/shared/package-paths.test.ts (2 tests); bun run build; bun build packages/agentplane/dist/cli.js --compile with __AGENTPLANE_PACKAGE_VERSION__; compiled binary returned 0.4.2 for --version and rendered quickstart without package-root failure.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T11:19:33.286Z
- Branch: task/202605031118-RF08MQ/bun-binary-runtime-contract
- Head: 53bc3f4468f7

```text
No changes detected.
```

</details>
