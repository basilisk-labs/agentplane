# PR Review

Created: 2026-04-15T18:05:33.531Z
Branch: task/202604151802-BPEEBF/prefer-exact-release-ready-alias

## Summary

Prefer exact release-ready alias over generic artifact

Publish now carries artifact identity through the workflow, but resolver still prefers the generic release-ready artifact over release-ready-<sha> when both exist on the selected run. Prefer the exact alias for exact-sha publish and recovery so publish consumes the canonical payload.

## Scope

- In scope: Publish now carries artifact identity through the workflow, but resolver still prefers the generic release-ready artifact over release-ready-<sha> when both exist on the selected run. Prefer the exact alias for exact-sha publish and recovery so publish consumes the canonical payload.
- Out of scope: unrelated refactors not required for "Prefer exact release-ready alias over generic artifact".

## Verification

### Plan

1. Review the requested outcome for "Prefer exact release-ready alias over generic artifact". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Targeted resolver regression passed: bun vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The resolver now prefers release-ready-<sha> over the generic release-ready artifact when both exist on the selected exact-SHA run.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T18:05:52.862Z
- Branch: task/202604151802-BPEEBF/prefer-exact-release-ready-alias
- Head: 01a241504695

```text
 .agentplane/tasks/202604151802-BPEEBF/README.md    | 121 +++++++++++++++++++++
 .../resolve-release-ready-source-script.test.ts    |  43 ++++++++
 scripts/lib/release-ready-source.mjs               |   6 +-
 3 files changed, 169 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
