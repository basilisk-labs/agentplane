## Summary

Migrate config schema validation to Zod SSOT

Replace the AJV-backed config runtime contract with a Zod-first schema, keep generated JSON schema artifacts, and preserve existing config behavior and defaults.

## Scope

- In scope: Replace the AJV-backed config runtime contract with a Zod-first schema, keep generated JSON schema artifacts, and preserve existing config behavior and defaults.
- Out of scope: unrelated refactors not required for "Migrate config schema validation to Zod SSOT".

## Verification

- State: ok
- Note: Validated Zod-first config contract migration: config runtime now parses through Zod, generated config schemas are synced, defaults and user-facing validation behavior remain covered by config/execution-profile/upgrade tests; AJV task artifact validation remains intentionally out of scope.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T21:23:05.129Z
- Branch: task/202604172108-3ZC8NA/zod-config-ssot
- Head: de8e1625834f

```text
 bun.lock                                           |   6 +
 .../agentplane/src/commands/task/shared/tags.ts    |   2 +-
 packages/core/package.json                         |   4 +-
 packages/core/schemas/config.schema.json           | 681 ++++++++++++---------
 packages/core/src/config/config-schema.ts          | 596 +-----------------
 packages/core/src/config/config-zod.ts             | 402 ++++++++++++
 packages/core/src/config/config.ts                 | 200 ++----
 packages/spec/schemas/config.schema.json           | 681 ++++++++++++---------
 8 files changed, 1287 insertions(+), 1285 deletions(-)
```

</details>
