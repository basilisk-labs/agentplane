## Summary

Sync framework docs with new control-plane contracts

Update user-facing and repo policy documentation so it matches the implemented framework layer.

## Scope

- In scope: Update user-facing and repo policy documentation so it matches the implemented framework layer.
- Out of scope: unrelated refactors not required for "Sync framework docs with new control-plane contracts".

## Verification

### Plan

1. Run `bun run docs:site:check`. Expected: docs generation, website typecheck, production build, and design-language checks all pass.
2. Review `README.md`, `docs/developer/architecture.mdx`, `docs/developer/harness-engeneering.mdx`, and `docs/developer/framework-refactor-program.mdx`. Expected: they describe the shipped framework control-plane contracts instead of presenting them as implicit behavior.
3. Compare the updated docs against the implemented runtime modules under `packages/agentplane/src/runtime/*` and `packages/agentplane/src/usecases/context/resolve-context.ts`. Expected: harness, context, precedence, approvals, execution profile runtime, task intake, explain, and protocol surfaces are all represented with no contradictory guidance.

### Current Status

- State: ok
- Note: Synced README and developer docs with the shipped framework control-plane layer, replaced implicit-control-plane wording with explicit harness/context/runtime contracts, and verified with bun run docs:site:check.

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

- Updated: 2026-04-03T14:13:27.337Z
- Branch: task/202604030442-T1WX56/framework-docs-sync
- Head: e3635bcb94bc

```text
 README.md                                     | 12 ++++++
 docs/developer/architecture.mdx               | 55 +++++++++++++++++++++------
 docs/developer/framework-refactor-program.mdx | 23 +++++++++--
 docs/developer/harness-engeneering.mdx        | 24 ++++++++++--
 4 files changed, 95 insertions(+), 19 deletions(-)
```

</details>
