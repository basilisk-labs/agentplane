## Summary

Add docs IA and path drift guard

Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.

## Scope

- In scope: Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.
- Out of scope: unrelated refactors not required for "Add docs IA and path drift guard".

## Verification

- State: ok
- Note: Post-PR fix: docs:ia:check now ignores generated package dist/ references that are not present in fresh CI checkout. Rechecked: bun run docs:ia:check; bun run docs:scripts:check; bun run lint:core.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T20:47:43.087Z
- Branch: task/202604301955-HKY8NW/docs-ia-path-guard
- Head: 4ab6c548336f

```text
 .github/workflows/docs-ci.yml                   |   3 +
 docs/developer/modular-prompt-assembly.mdx      |   2 +-
 docs/developer/module-topology.mdx              |  13 +-
 docs/developer/workflow-harness-test-matrix.mdx |   4 +-
 package.json                                    |   5 +-
 scripts/README.md                               |  47 ++--
 scripts/check-docs-ia.mjs                       | 359 ++++++++++++++++++++++++
 7 files changed, 397 insertions(+), 36 deletions(-)
```

</details>
