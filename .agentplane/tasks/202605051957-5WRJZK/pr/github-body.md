Task: `202605051957-5WRJZK`
Title: Bridge recipe hints into blueprint resolver

## Summary

Bridge recipe hints into blueprint resolver

Connect normalized recipe blueprint hints to the blueprint resolver and explain output, including accepted/rejected extension details and safety rejection tests.

## Scope

- In scope: Connect normalized recipe blueprint hints to the blueprint resolver and explain output, including accepted/rejected extension details and safety rejection tests.
- Out of scope: unrelated refactors not required for "Bridge recipe hints into blueprint resolver".

## Verification

- State: ok
- Note: Blueprint resolver bridge verified: recipe hints preserve provenance, evidence requirements bind to verify_record, preferred_blueprint is accepted only when compatible, and risk routes outrank recipe preference. Checks: bun test packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/recipes/src/blueprint-extensions.test.ts; bun run typecheck; bun run lint:core; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T20:25:47.984Z
- Branch: task/202605051957-5WRJZK/v05-rc1-blueprint-bridge
- Head: 2597a6e9cf5f

```text
No changes detected.
```

</details>
