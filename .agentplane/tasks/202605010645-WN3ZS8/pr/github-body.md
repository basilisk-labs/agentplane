## Summary

AP-08: Split hooks CLI test monolith

Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.

## Scope

- In scope: Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.
- Out of scope: unrelated refactors not required for "AP-08: Split hooks CLI test monolith".

## Verification

- State: ok
- Note: Verified: hooks CLI monolith split into install, uninstall, runtime-shim, hook-run groups; oversized guard now passes with 15 entries and 17132 total lines.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T09:09:54.255Z
- Branch: task/202605010645-WN3ZS8/hooks-test-split
- Head: 95902ae6fce4

```text
No changes detected.
```

</details>
