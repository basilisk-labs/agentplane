## Summary

AP-05: Extract prompt mutation engine

Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.

## Scope

- In scope: Move mutation application logic out of compiler.ts into a dedicated mutations-engine module while keeping compiled graph behavior stable.
- Out of scope: unrelated refactors not required for "AP-05: Extract prompt mutation engine".

## Verification

- State: ok
- Note: Verified: mutation engine extraction passes focused prompt-module tests, typecheck, full lint:core, formatting, diff check, and framework bootstrap.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T07:59:00.641Z
- Branch: task/202605010644-6YE9F6/prompt-mutation-engine
- Head: 65045d23e037

```text
No changes detected.
```

</details>
