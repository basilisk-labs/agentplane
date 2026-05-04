# PR Review

Created: 2026-05-04T07:57:07.226Z
Branch: task/202605040755-KF1EWC/launch-punch-list

## Batch Tasks

- Primary: `202605040755-KF1EWC`
- Closure policy: `all_or_fail`
- Included: `202605040755-SM1KH2`
- Included: `202605040756-SV9YYN`
- Included: `202605040756-TVF732`

## Summary

Fix launch README example role leakage

Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.

## Scope

- In scope: Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.
- Out of scope: unrelated refactors not required for "Fix launch README example role leakage".

## Verification

### Plan

1. rg -n -e 'CODER|DOCS|ORCHESTRATOR' README.md packages/agentplane/README.md website/src/data/homepage-content.ts returns no matches.
2. bun run docs:site:typecheck passes.
3. node .agentplane/policy/check-routing.mjs passes.
4. agentplane doctor passes.

### Current Status

- State: ok
- Note: Verified: launch punch-list branch checks passed at current PR-artifact head.

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

- Updated: 2026-05-04T08:08:46.737Z
- Branch: task/202605040755-KF1EWC/launch-punch-list
- Head: da0a0606181b

```text
 .agentplane/tasks/202605040755-SM1KH2/README.md | 129 +++++++++++++++++++++++
 .agentplane/tasks/202605040756-SV9YYN/README.md | 129 +++++++++++++++++++++++
 .agentplane/tasks/202605040756-TVF732/README.md | 131 ++++++++++++++++++++++++
 README.md                                       |  14 +--
 docs/assets/header.png                          | Bin 170586 -> 98544 bytes
 docs/launch/checklist.md                        |  52 ++++++++++
 docs/launch/hn.md                               |  44 ++++++++
 docs/launch/reddit.md                           |  60 +++++++++++
 docs/launch/twitter.md                          |  62 +++++++++++
 package.json                                    |   5 +-
 packages/agentplane/README.md                   |  14 +--
 packages/spec/examples/acr.json                 |   4 +-
 scripts/README.md                               |  53 +++++-----
 scripts/check-acr-example-version.mjs           |  31 ++++++
 website/src/data/homepage-content.ts            |   6 +-
 website/static/img/header.png                   | Bin 170586 -> 98544 bytes
 16 files changed, 687 insertions(+), 47 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
