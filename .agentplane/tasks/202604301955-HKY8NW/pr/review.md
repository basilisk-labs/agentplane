# PR Review

Created: 2026-04-30T20:35:18.883Z
Branch: task/202604301955-HKY8NW/docs-ia-path-guard

## Summary

Add docs IA and path drift guard

Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.

## Scope

- In scope: Add an automated docs information-architecture guard that checks docs/index.mdx and website/sidebars.ts alignment, catches orphan current docs, and fails on markdown references to repository paths that no longer exist.
- Out of scope: unrelated refactors not required for "Add docs IA and path drift guard".

## Verification

### Plan

1. Run `bun run docs:ia:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Post-PR fix: docs:ia:check now ignores generated package dist/ references that are not present in fresh CI checkout. Rechecked: bun run docs:ia:check; bun run docs:scripts:check; bun run lint:core.

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

- Updated: 2026-04-30T20:50:20.859Z
- Branch: task/202604301955-HKY8NW/docs-ia-path-guard
- Head: 4d4a421e925a

```text
 .github/workflows/docs-ci.yml                   |   3 +
 docs/developer/modular-prompt-assembly.mdx      |   2 +-
 docs/developer/module-topology.mdx              |  13 +-
 docs/developer/workflow-harness-test-matrix.mdx |  22 +-
 package.json                                    |   5 +-
 scripts/README.md                               |  47 ++--
 scripts/check-docs-ia.mjs                       | 358 ++++++++++++++++++++++++
 7 files changed, 405 insertions(+), 45 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
