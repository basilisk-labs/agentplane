Task: `202605041840-QWGDPB`
Title: Extract marketing docs repository

## Summary

Extract marketing docs repository

Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.

## Scope

- In scope: Create basilisk-labs/agentplane-marketing, initialize AgentPlane in it, move marketing and positioning documents there, and add it back to AgentPlane as a submodule.
- Out of scope: unrelated refactors not required for "Extract marketing docs repository".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

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
