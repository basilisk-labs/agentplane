## Summary

Drop redundant platform-critical init-upgrade alias

Remove the duplicate test:platform-critical:init-upgrade-backend script entry and keep test:platform-critical:init-upgrade as the single canonical platform-critical entrypoint.

## Scope

- In scope: Remove the duplicate test:platform-critical:init-upgrade-backend script entry and keep test:platform-critical:init-upgrade as the single canonical platform-critical entrypoint.
- Out of scope: unrelated refactors not required for "Drop redundant platform-critical init-upgrade alias".

## Verification

- State: ok
- Note: Verified: rg -n 'test:platform-critical:init-upgrade-backend' -S . returned no matches, the package.json presence check passed, and bun run test:platform-critical:init-upgrade passed with 49 tests after removing the redundant alias from package scripts.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T15:19:51.955Z
- Branch: task/202604171519-MQ7NQ5/remove-init-upgrade-alias
- Head: b0c53c8aae1a

```text
No changes detected.
```

</details>
