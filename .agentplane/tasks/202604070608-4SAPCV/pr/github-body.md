## Summary

Add REST-backed PR close command with optional remote branch deletion

Provide a deterministic CLI command to close stale or superseded GitHub PRs via REST and optionally delete the remote head branch, avoiding flaky gh GraphQL high-level paths.

## Scope

- In scope: Provide a deterministic CLI command to close stale or superseded GitHub PRs via REST and optionally delete the remote head branch, avoiding flaky gh GraphQL high-level paths.
- Out of scope: unrelated refactors not required for "Add REST-backed PR close command with optional remote branch deletion".

## Verification

### Plan

1. Run a focused CLI test that closes a GitHub PR through the new command. Expected: the command issues the REST close mutation and reports the closed PR deterministically.
2. Run a focused CLI test with remote branch deletion enabled. Expected: the command attempts remote head-branch deletion only after a successful close and reports deletion outcome clearly.
3. Run eslint and the touched PR command tests. Expected: touched checks pass without widening unrelated GitHub workflow behavior.

### Current Status

- State: ok
- Note: Focused CLI pr-close tests and lint passed; pr close now uses REST-backed gh api calls, defaults repo from the resolved project root, and only deletes remote head branches after a successful close.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-07T06:37:11.558Z
- Branch: task/202604070608-4SAPCV/pr-close-rest
- Head: 5f952138b0ae

```text
No changes detected.
```

</details>
