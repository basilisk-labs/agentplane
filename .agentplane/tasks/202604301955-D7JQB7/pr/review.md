# PR Review

Created: 2026-04-30T20:04:57.305Z
Branch: task/202604301955-D7JQB7/docs-agent-first-ia

## Summary

Align docs hierarchy with current agent-first IA

Restructure the public docs navigation around the existing agent-first model, separate current developer pages from historical/archive material, fix stale current-code references, and reconcile docs/index.mdx with website/sidebars.ts.

## Scope

- In scope: Restructure the public docs navigation around the existing agent-first model, separate current developer pages from historical/archive material, fix stale current-code references, and reconcile docs/index.mdx with website/sidebars.ts.
- Out of scope: unrelated refactors not required for "Align docs hierarchy with current agent-first IA".

## Verification

### Plan

1. Review the requested outcome for "Align docs hierarchy with current agent-first IA". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: pending
- Note: Not recorded yet.

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

- Updated: 2026-04-30T20:20:46.197Z
- Branch: task/202604301955-D7JQB7/docs-agent-first-ia
- Head: 36ef5f2465f1

```text
 README.md                                          |  6 +--
 .../0013-zod-contract-ssot.md}                     |  2 +-
 docs/adr/README.md                                 |  1 +
 .../v0-3}/cli-bug-ledger-v0-3-x.mdx                |  4 +-
 .../v0-3}/framework-refactor-program.mdx           |  6 +--
 docs/developer/architecture.mdx                    | 16 ++++----
 docs/developer/design-principles.mdx               |  2 +-
 .../documentation-information-architecture.mdx     | 16 +++++++-
 ...ess-engeneering.mdx => harness-engineering.mdx} |  8 ++--
 docs/developer/incident-archive.mdx                |  6 +--
 docs/developer/schema-validation-strategy.mdx      |  2 +-
 docs/developer/workflow-contract.mdx               |  2 +-
 docs/developer/workflow-harness-test-matrix.mdx    |  2 +-
 docs/index.mdx                                     | 47 ++++++++++++++--------
 docs/user/overview.mdx                             |  2 +-
 docs/user/workflow.mdx                             |  2 +-
 website/sidebars.ts                                | 20 +++++++--
 17 files changed, 93 insertions(+), 51 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
