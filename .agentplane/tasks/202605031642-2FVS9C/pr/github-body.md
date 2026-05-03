Task: `202605031642-2FVS9C`
Title: Add DCO sign-off identity support

## Summary

Add DCO sign-off identity support

Implement repository-managed DCO sign-off behavior using Denis Smirnov <densmirnov@me.com> as the configured sign-off identity, update commit/hook behavior and docs, and keep tasks.json removal out of scope as a separate migration risk.

## Scope

- In scope: Implement repository-managed DCO sign-off behavior using Denis Smirnov <densmirnov@me.com> as the configured sign-off identity, update commit/hook behavior and docs, and keep tasks.json removal out of scope as a separate migration risk.
- Out of scope: unrelated refactors not required for "Add DCO sign-off identity support".

## Verification

- State: ok
- Note: Command: bun run framework:dev:bootstrap. Result: pass. Evidence: core, agentplane, and testkit built; repo-local runtime resolved 0.4.2. Scope: rebuilt CLI after DCO/config changes. Command: bun x vitest run focused DCO/commit tests. Result: pass, 27 passed. Scope: DCO helper, commit paths, close commits, commit-msg enforcement. Command: bunx eslint touched TS files. Result: pass. Scope: changed implementation/tests. Command: bun run schemas:check; bun run spec:examples:check; bun run docs:cli:check; bun run format:check; bun run typecheck; node .agentplane/policy/check-routing.mjs; git diff --check. Result: pass. Scope: generated schemas/docs, formatting, type safety, policy routing.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T16:43:32.193Z
- Branch: task/202605031642-2FVS9C/dco-signoff
- Head: 6858dd704c9f

```text
No changes detected.
```

</details>
