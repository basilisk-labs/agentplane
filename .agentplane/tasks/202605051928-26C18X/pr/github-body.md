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
- Note: Implemented pure blueprint resolver and explain formatter without CLI command or runner wiring. Commands passed: agentplane task verify-show 202605051928-26C18X; bun test packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/validate.test.ts (25 pass); bun run typecheck; bunx eslint packages/agentplane/src/blueprints; bunx prettier --check touched blueprint files; bun run agents:check; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor (OK with pre-existing WCPBCX branch_pr drift warning in task worktree); AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast (passed: cold baseline OK after retry, build, fast unit suite 274 files/1585 passed/2 skipped, critical suite 5 files/14 passed).
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T19:42:19.922Z
- Branch: task/202605051928-26C18X/blueprint-resolver-explain
- Head: 1fb46b5e8c0e

```text
 packages/agentplane/src/blueprints/explain.ts      |  63 ++++++
 packages/agentplane/src/blueprints/index.ts        |  14 ++
 packages/agentplane/src/blueprints/model.ts        |  98 +++++++++
 packages/agentplane/src/blueprints/resolve.test.ts | 130 +++++++++++
 packages/agentplane/src/blueprints/resolve.ts      | 244 +++++++++++++++++++++
 5 files changed, 549 insertions(+)
```

</details>
