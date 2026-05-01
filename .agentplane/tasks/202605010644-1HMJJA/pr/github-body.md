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

- Updated: 2026-05-01T07:28:36.468Z
- Branch: task/202605010644-1HMJJA/prompt-schema-migration
- Head: dbdb30d49bff

```text
 .../src/runtime/prompt-modules/compiler.ts         |   2 +-
 .../agentplane/src/runtime/prompt-modules/index.ts |   6 +-
 .../src/runtime/prompt-modules/model.test.ts       | 117 +++++++++++++++------
 .../agentplane/src/runtime/prompt-modules/model.ts |   7 +-
 .../src/runtime/prompt-modules/mutations.ts        |   3 +-
 .../src/runtime/prompt-modules/registry.ts         |   2 +-
 .../src/runtime/prompt-modules/schema.ts           |  27 +++++
 .../src/runtime/prompt-modules/validation.ts       |  17 +--
 8 files changed, 129 insertions(+), 52 deletions(-)
```

</details>
