# PR Review

Created: 2026-05-19T08:30:09.855Z

## Task

- Task: `202605190828-MDXT5W`
- Title: Repair website star gateway and docs IA
- Status: DOING
- Branch: `task/202605190828-MDXT5W/site-star-docs-ia`
- Canonical task record: `.agentplane/tasks/202605190828-MDXT5W/README.md`

## Verification

- State: ok
- Note: Verified website star gateway and docs IA repair in local branch_pr worktree: typecheck, content check, Docusaurus build, local site smoke, link check, policy routing, doctor, and browser QA passed with the only external caveat that GitHub Buttons iframe did not load in the local browser environment so the navbar falls back to a single visible Star link while still loading buttons.github.io.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T08:46:47.129Z
- Branch: task/202605190828-MDXT5W/site-star-docs-ia
- Head: b3b38ebeee6b

```text
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 docs/index.mdx                                     | 101 +---
 docs/reference/acr.mdx                             |  27 +-
 docs/reference/cli.mdx                             |  22 +
 docs/reference/workflow-file.mdx                   |  21 +
 docs/start/quickstart.mdx                          |  20 +-
 docs/start/what-agentplane-writes.mdx              |   1 +
 website/docusaurus.config.ts                       |  49 +-
 website/package.json                               |   2 +
 website/scripts/check-links.mjs                    |   6 +-
 website/scripts/check-site-content.mjs             |   8 +-
 website/scripts/site-smoke.mjs                     |  90 ++++
 website/sidebars.ts                                |  76 +--
 website/src/components/RedirectTo.tsx              |  25 +
 website/src/css/custom.css                         |  81 ++-
 website/src/data/homepage-content.ts               | 143 +++--
 website/src/pages/_home.module.css                 | 136 ++++-
 .../docs/contributing/citation-guidelines.tsx      |   6 +
 .../docs/developer/website-success-metrics.tsx     |   6 +
 website/src/pages/docs/listing.tsx                 |   6 +
 website/src/pages/docs/showcase.tsx                |   6 +
 .../src/pages/docs/user/agent-change-record.tsx    |   6 +
 website/src/pages/docs/user/website-ia.tsx         |   6 +
 website/src/pages/docs/website-success-metrics.tsx |   6 +
 website/src/pages/examples.module.css              |   5 +
 website/src/pages/examples.tsx                     |   6 +
 website/src/pages/index.tsx                        | 161 ++++--
 website/src/theme/Root.tsx                         | 120 ++---
 .../social/docs/help/legacy-upgrade-recovery.png   | Bin 0 -> 48997 bytes
 website/static/img/social/docs/reference/cli.png   | Bin 0 -> 42652 bytes
 .../img/social/docs/reference/workflow-file.png    | Bin 0 -> 50513 bytes
 website/static/img/social/docs/releases/v0.6.3.png | Bin 0 -> 41712 bytes
 .../social/docs/user/agent-bootstrap.generated.png | Bin 0 -> 48217 bytes
 33 files changed, 1349 insertions(+), 391 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
