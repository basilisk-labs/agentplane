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

- Updated: 2026-04-17T21:09:21.876Z
- Branch: task/202604172108-3ZC8NA/zod-config-ssot
- Head: 94366eade38f

```text
No changes detected.
```

</details>
