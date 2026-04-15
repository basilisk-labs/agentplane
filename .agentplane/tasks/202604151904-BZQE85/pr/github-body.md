## Summary

Fix workflow:wait-remote-checks wrapper argument forwarding

Make bun run workflow:wait-remote-checks -- --pr <id> call the underlying wait script correctly instead of passing an invalid --pr flag into gh pr view. Keep the fix limited to wrapper/CLI argument forwarding and add targeted regression coverage.

## Scope

- In scope: Make bun run workflow:wait-remote-checks -- --pr <id> call the underlying wait script correctly instead of passing an invalid --pr flag into gh pr view. Keep the fix limited to wrapper/CLI argument forwarding and add targeted regression coverage.
- Out of scope: unrelated refactors not required for "Fix workflow:wait-remote-checks wrapper argument forwarding".

## Verification

- State: ok
- Note: Wrapper and parser now treat --pr as a PR target alias; targeted script tests pass and live bun run workflow:wait-remote-checks -- --pr 331 succeeds.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T19:05:12.225Z
- Branch: task/202604151904-BZQE85/fix-wait-remote-checks-wrapper
- Head: 6ddbb9afff91

```text
No changes detected.
```

</details>
