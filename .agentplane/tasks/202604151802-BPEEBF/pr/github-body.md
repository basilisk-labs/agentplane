## Summary

Prefer exact release-ready alias over generic artifact

Publish now carries artifact identity through the workflow, but resolver still prefers the generic release-ready artifact over release-ready-<sha> when both exist on the selected run. Prefer the exact alias for exact-sha publish and recovery so publish consumes the canonical payload.

## Scope

- In scope: Publish now carries artifact identity through the workflow, but resolver still prefers the generic release-ready artifact over release-ready-<sha> when both exist on the selected run. Prefer the exact alias for exact-sha publish and recovery so publish consumes the canonical payload.
- Out of scope: unrelated refactors not required for "Prefer exact release-ready alias over generic artifact".

## Verification

- State: ok
- Note: Targeted resolver regression passed: bun vitest run packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The resolver now prefers release-ready-<sha> over the generic release-ready artifact when both exist on the selected exact-SHA run.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
