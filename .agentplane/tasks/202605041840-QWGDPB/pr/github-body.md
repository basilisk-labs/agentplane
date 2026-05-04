Task: `202605041840-QWGDPB`
Title: Extract marketing docs repository

## Summary

Extract marketing docs repository

Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.

## Scope

- In scope: Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.
- Out of scope: unrelated refactors not required for "Extract marketing docs repository".

## Verification

- State: ok
- Note: Command: non-ASCII scan of agentplane-marketing current tree and git rev-list history. Result: pass; no Cyrillic text remained after the English-only orphan history rewrite and force-push. Command: bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; agentplane doctor in marketing repo; bun run docs:site:generate && bun run docs:site:build; bun run docs:site:check:design; git diff --check. Result: pass. Note: bun run docs:site:check is not final evidence because website typecheck emits JS files that create duplicate Docusaurus routes before build.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T19:10:00.240Z
- Branch: task/202605041840-QWGDPB/marketing-repo-submodule
- Head: e4893ab85acb

```text
 .gitmodules                         |   3 +
 .prettierignore                     |   1 +
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
 17 files changed, 42 insertions(+), 1348 deletions(-)
```

</details>
