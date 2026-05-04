Task: `202605041610-FY0HHQ`
Title: Prune legacy v0.3 archive navigation

## Summary

Prune legacy v0.3 archive navigation

Remove v0.3 archive planning ledgers from active docs navigation while preserving release notes and ADR history.

## Scope

- In scope: Remove v0.3 archive planning ledgers from active docs navigation while preserving release notes and ADR history.
- Out of scope: unrelated refactors not required for "Prune legacy v0.3 archive navigation".

## Verification

- State: ok
- Note: Command: rg -n archive/v0-3|framework-refactor-program|cli-bug-ledger-v0-3 docs/index.mdx website/sidebars.ts docs/developer/architecture.mdx. Result: pass. Evidence: no active navigation references remain. Command: node scripts/check-docs-ia.mjs. Result: pass. Evidence: docs IA, sidebar coverage, and current path references are aligned. Command: bun run docs:site:typecheck. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Command: node packages/agentplane/bin/agentplane.js doctor. Result: pass. Note: extra docs:site:build compiled client/server but failed during SSG on existing duplicate / route default-export issue; not introduced by archive navigation cleanup.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T16:26:29.807Z
- Branch: task/202605041610-FY0HHQ/docs-legacy-prune
- Head: e4c327c7fc88

```text
 .agentplane/tasks/202605041610-RPW8E0/README.md | 116 ++++++++++++++++++++++++
 .agentplane/tasks/202605041611-7TM53Y/README.md | 116 ++++++++++++++++++++++++
 DESIGN.md                                       |   3 +-
 docs/adr/0013-zod-contract-ssot.md              |   5 +-
 docs/developer/architecture.mdx                 |  14 ++-
 docs/developer/close-taxonomy.mdx               |   7 +-
 docs/developer/module-topology.mdx              |   4 +-
 docs/developer/recipes-spec.mdx                 |   2 +-
 docs/index.mdx                                  |  32 +++----
 docs/user/task-lifecycle.mdx                    |   4 +-
 packages/spec/README.md                         |   6 +-
 scripts/check-docs-ia.mjs                       |   3 +
 website/sidebars.ts                             |  10 +-
 website/src/data/homepage-content.ts            |   5 +-
 14 files changed, 272 insertions(+), 55 deletions(-)
```

</details>
