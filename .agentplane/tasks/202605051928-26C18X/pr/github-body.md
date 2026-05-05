Task: `202605051928-26C18X`
Title: Add blueprint resolver and explain output

## Summary

Add blueprint resolver and explain output

Implement the next blueprint layer: pure resolver inputs/results, deterministic blueprint selection, recipe hint acceptance/rejection, stop reasons, explanation formatting, and focused tests without adding a CLI command or runner execution.

## Scope

- In scope: Implement the next blueprint layer: pure resolver inputs/results, deterministic blueprint selection, recipe hint acceptance/rejection, stop reasons, explanation formatting, and focused tests without adding a CLI command or runner execution.
- Out of scope: unrelated refactors not required for "Add blueprint resolver and explain output".

## Verification

- State: ok
- Note: Review fix verified: resolver risk routing is deterministic, supplied registries no longer fall back to built-ins, focused blueprint tests, formatting, typecheck, lint, and policy routing all pass.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T19:51:48.372Z
- Branch: task/202605051928-26C18X/blueprint-resolver-explain
- Head: 0ed67819cc83

```text
 packages/agentplane/src/blueprints/explain.ts      |  63 +++++
 packages/agentplane/src/blueprints/index.ts        |  14 ++
 packages/agentplane/src/blueprints/model.ts        |  98 ++++++++
 packages/agentplane/src/blueprints/resolve.test.ts | 155 ++++++++++++
 packages/agentplane/src/blueprints/resolve.ts      | 263 +++++++++++++++++++++
 5 files changed, 593 insertions(+)
```

</details>
