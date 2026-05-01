## Summary

AP-04: Add prompt schema migration seam

Centralize prompt module schema version handling and add a no-op v1 migration entrypoint with unknown-version tests.

## Scope

- In scope: Centralize prompt module schema version handling and add a no-op v1 migration entrypoint with unknown-version tests.
- Out of scope: unrelated refactors not required for "AP-04: Add prompt schema migration seam".

## Verification

- State: ok
- Note: Verified prompt schema migration seam with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T07:25:14.066Z
- Branch: task/202605010644-1HMJJA/prompt-schema-migration
- Head: ecbc58dab84c

```text
No changes detected.
```

</details>
