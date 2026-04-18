## Summary

Write ADR for schema runtime contract strategy

Record a concrete architectural decision for the future schema contract stack, comparing AJV-first cleanup versus staged Zod migration, and define the next implementation path for config and task artifact schemas.

## Scope

- In scope: Record a concrete architectural decision for the future schema contract stack, comparing AJV-first cleanup versus staged Zod migration, and define the next implementation path for config and task artifact schemas.
- Out of scope: unrelated refactors not required for "Write ADR for schema runtime contract strategy".

## Verification

- State: ok
- Note: Validated schema-contract ADR refresh: added a Zod-SSOT ADR, rewrote the practical schema strategy page around durable vs transient boundaries, updated adjacent architecture/project-layout references, and confirmed lint:core plus Prettier checks stayed green.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T05:29:17.104Z
- Branch: task/202604172036-55Y9Y0/schema-zod-adr
- Head: cbbb309534ff

```text
 docs/developer/architecture.mdx                |   4 +-
 docs/developer/project-layout.mdx              |   2 +-
 docs/developer/schema-runtime-contract-adr.mdx | 136 +++++++++++++++++++++++++
 docs/developer/schema-validation-strategy.mdx  | 133 ++++++------------------
 docs/docs.json                                 |   1 +
 5 files changed, 173 insertions(+), 103 deletions(-)
```

</details>
