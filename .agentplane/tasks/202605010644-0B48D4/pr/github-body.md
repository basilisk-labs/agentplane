## Summary

AP-02: Guard recipes runtime version parity

Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.

## Scope

- In scope: Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.
- Out of scope: unrelated refactors not required for "AP-02: Guard recipes runtime version parity".

## Verification

- State: ok
- Note: Verified recipes runtime version parity with: bun run release:parity; bun run test:project -- recipes; bunx vitest run packages/agentplane/src/commands/release/check-release-parity-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --testNamePattern 'bumps versions, commits, and tags using the latest plan' --testTimeout 180000 --hookTimeout 180000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T07:05:04.801Z
- Branch: task/202605010644-0B48D4/recipes-version-parity
- Head: cc1c5c42fc69

```text
No changes detected.
```

</details>
