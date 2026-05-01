## Summary

AP-03: Normalize prompt compiler context

Add a pure prompt compiler context normalizer with diagnostics for discarded or invalid values before graph compilation.

## Scope

- In scope: Add a pure prompt compiler context normalizer with diagnostics for discarded or invalid values before graph compilation.
- Out of scope: unrelated refactors not required for "AP-03: Normalize prompt compiler context".

## Verification

- State: ok
- Note: Verified prompt compiler context normalization with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T07:15:10.152Z
- Branch: task/202605010644-48TFEB/prompt-context-normalizer
- Head: 678f85759314

```text
No changes detected.
```

</details>
