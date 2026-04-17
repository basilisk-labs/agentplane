## Summary

Re-baseline schema validation strategy after generated AJV migration

Audit the remaining AJV plus manual type drift, decide the target validation architecture, and capture the approved migration path in repository docs before any large schema rewrite.

## Scope

- In scope: Audit the remaining AJV plus manual type drift, decide the target validation architecture, and capture the approved migration path in repository docs before any large schema rewrite.
- Out of scope: unrelated refactors not required for "Re-baseline schema validation strategy after generated AJV migration".

## Verification

- State: ok
- Note: Audited the remaining schema boundary drift, documented the chosen core-first validation architecture, and corrected developer docs that still described packages/spec as the canonical schema authority; verified schemas:check and typecheck.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T18:54:51.044Z
- Branch: task/202604171502-KYS9TX/schema-validation-baseline
- Head: b0c53c8aae1a

```text
No changes detected.
```

</details>
