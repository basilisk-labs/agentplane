## Summary

Add docs IA and path drift guard

Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.

## Scope

- In scope: Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.
- Out of scope: unrelated refactors not required for "Add docs IA and path drift guard".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T20:44:24.408Z
- Branch: task/202604301955-HKY8NW/docs-ia-path-guard
- Head: 7a95d2cacb34

```text
 .github/workflows/docs-ci.yml                   |   3 +
 docs/developer/modular-prompt-assembly.mdx      |   2 +-
 docs/developer/module-topology.mdx              |  13 +-
 docs/developer/workflow-harness-test-matrix.mdx |   4 +-
 package.json                                    |   5 +-
 scripts/README.md                               |  47 ++--
 scripts/check-docs-ia.mjs                       | 354 ++++++++++++++++++++++++
 7 files changed, 392 insertions(+), 36 deletions(-)
```

</details>
