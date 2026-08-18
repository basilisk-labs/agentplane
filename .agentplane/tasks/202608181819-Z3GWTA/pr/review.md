# PR Review

Created: 2026-08-18T18:57:10.614Z

## Task

- Task: `202608181819-Z3GWTA`
- Title: Reposition AgentPlane as the Git-native control plane for coding agents and remove internal launch materials from the...
- Status: DOING
- Branch: `task/202608181819-Z3GWTA/reposition-agentplane-as-the-git-native-control`
- Canonical task record: `.agentplane/tasks/202608181819-Z3GWTA/README.md`

## Verification

- State: ok
- Note: All declared checks pass after reducing the reproducible VHS demo canvas; public positioning, private-content boundary, production website build, policy routing, and release demo are verified.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-18T19:20:11.872Z
- Branch: task/202608181819-Z3GWTA/reposition-agentplane-as-the-git-native-control
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md                                          |  29 +++--
 context/wiki/release-docs/concepts/acr.md          |   6 +-
 .../wiki/release-docs/concepts/configuration.md    |   3 +-
 context/wiki/release-docs/concepts/recipes.md      |   3 +-
 context/wiki/release-docs/docs-domains.md          |   2 -
 context/wiki/release-docs/domains/launch.md        |  45 --------
 docs/assets/agentplane-demo.gif                    | Bin 3834539 -> 2682529 bytes
 docs/assets/agentplane-demo.tape                   |   6 +-
 docs/compare.mdx                                   |  64 ++++++-----
 docs/index.mdx                                     |  14 ++-
 docs/launch/checklist.md                           |  52 ---------
 docs/launch/hn.md                                  |  44 --------
 docs/launch/reddit.md                              |  60 ----------
 docs/launch/twitter.md                             |  62 ----------
 docs/listing.md                                    |  26 ++---
 docs/manifesto.mdx                                 |  45 ++++----
 docs/user/overview.mdx                             |  22 ++--
 marketing                                          |   2 +-
 packages/agentplane/README.md                      |  31 +++--
 website/docusaurus.config.ts                       |  10 +-
 website/scripts/check-site-content.mjs             |   8 +-
 website/src/data/homepage-content.ts               | 107 +++++++++---------
 website/src/pages/_home.module.css                 |   2 +-
 website/src/pages/index.tsx                        |  49 ++++----
 .../static/img/social/docs/launch/checklist.png    | Bin 53663 -> 0 bytes
 website/static/img/social/docs/launch/hn.png       | Bin 47742 -> 0 bytes
 website/static/img/social/docs/launch/reddit.png   | Bin 51743 -> 0 bytes
 website/static/img/social/docs/launch/twitter.png  | Bin 51565 -> 0 bytes
 website/static/img/social/manifest.json            |  32 ------
 website/static/llms-full.txt                       | 125 ++++++++++++---------
 website/static/llms.txt                            |   5 +-
 31 files changed, 299 insertions(+), 555 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
