# PR Review

Created: 2026-07-10T09:47:07.811Z

## Task

- Task: `202607100945-T0215Q`
- Title: Resolve release incident INC-20260710-01 website lint
- Status: DOING
- Branch: `task/202607100945-T0215Q/resolve-website-lint-incident`
- Canonical task record: `.agentplane/tasks/202607100945-T0215Q/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T09:47:07.811Z
- Branch: task/202607100945-T0215Q/resolve-website-lint-incident
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |   1 -
 .agentplane/tasks/202607092209-F33MNN/README.md    |   3 +
 .agentplane/tasks/202607100404-WPRBVK/README.md    |  34 ++++++----
 .agentplane/tasks/202607100404-WPRBVK/pr/meta.json |   5 +-
 .../evaluator-opinion.md                           |  20 ++++++
 .../evaluator-prompt.md                            |  74 +++++++++++++++++++++
 .../quality-report.json                            |  22 ++++++
 .../evaluator-opinion.md                           |  20 ++++++
 .../evaluator-prompt.md                            |  74 +++++++++++++++++++++
 .../quality-report.json                            |  22 ++++++
 docs/developer/incident-archive.mdx                |   4 ++
 docs/internal/v0.6.22-refactor-plan.md             |  10 ++-
 eslint.config.cjs                                  |   7 +-
 packages/agentplane/assets/policy/incidents.md     |   1 -
 website/docusaurus.config.ts                       |  16 ++++-
 website/scripts/check-links.mjs                    |   2 +-
 website/scripts/check-navigation.mjs               |   2 +-
 website/src/components/GitHubStarsButton.tsx       |   7 +-
 website/src/components/RedirectTo.tsx              |   2 +-
 website/src/pages/examples.tsx                     |   2 +-
 website/src/pages/index.tsx                        |   2 +-
 website/src/theme/DocItem/Layout/index.tsx         |   1 -
 website/src/theme/DocSidebar/Desktop/index.tsx     |   9 +--
 website/src/theme/Root.tsx                         |  47 ++++++-------
 .../social/docs/internal/v0.6.22-refactor-plan.png | Bin 0 -> 60132 bytes
 website/static/img/social/manifest.json            |   8 +++
 website/static/llms-full.txt                       |  11 +--
 27 files changed, 341 insertions(+), 65 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
