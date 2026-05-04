# PR Review

Created: 2026-05-04T18:41:17.290Z
Branch: task/202605041840-QWGDPB/marketing-repo-submodule

## Summary

Extract marketing docs repository

Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.

## Scope

- In scope: Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.
- Out of scope: unrelated refactors not required for "Extract marketing docs repository".

## Verification

### Plan

1. Review the requested outcome for "Extract marketing docs repository". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Command: non-ASCII scan of agentplane-marketing current tree and git rev-list history. Result: pass; no Cyrillic text remained after the English-only orphan history rewrite and force-push. Command: bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane doctor in marketing repo; bun run docs:site:generate && bun run docs:site:build; bun run docs:site:check:design; git diff --check. Result: pass. Note: bun run docs:site:check is not final evidence because website typecheck emits JS files that create duplicate Docusaurus routes before build.

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

- Updated: 2026-05-04T18:55:36.688Z
- Branch: task/202605041840-QWGDPB/marketing-repo-submodule
- Head: 6e7f7c640db9

```text
 .gitmodules                         |   3 +
 DESIGN.md                           | 565 ------------------------------------
 EDITORIAL.md                        | 102 -------
 docs/README.md                      |   5 +-
 docs/assets/header.svg              |  40 ---
 docs/assets/social/hn-card.svg      |  31 --
 docs/assets/social/og-image.svg     |  38 ---
 docs/assets/social/twitter-card.svg |  37 ---
 docs/compare.mdx                    |  67 +----
 docs/launch/retro-template.md       |  44 ---
 docs/listing.md                     | 125 +-------
 docs/manifesto.mdx                  |  88 +-----
 docs/showcase.mdx                   |   8 +-
 docs/user/website-ia.mdx            |  76 +----
 marketing                           |   1 +
 website/static/llms-full.txt        | 159 +---------
 16 files changed, 41 insertions(+), 1348 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
