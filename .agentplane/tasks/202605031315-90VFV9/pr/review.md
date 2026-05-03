# PR Review

Created: 2026-05-03T13:21:58.401Z
Branch: task/202605031315-90VFV9/cmo-public-surface-revision

## Summary

Revise repo public surfaces from CMO audit

Coordinate the repository-owned portion of the CMO audit: align README/package docs, website surfaces, discovery metadata, visual proof assets, and the quickstart first-win path while excluding off-repo launch operations.

## Scope

- In scope: Coordinate the repository-owned portion of the CMO audit: align README/package docs, website surfaces, discovery metadata, visual proof assets, and the quickstart first-win path while excluding off-repo launch operations.
- Out of scope: unrelated refactors not required for "Revise repo public surfaces from CMO audit".

## Verification

### Plan

1. Review the requested outcome for "Revise repo public surfaces from CMO audit". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Primary public-surface revision task verified after all dependent leaves completed and final coherence review passed. Evidence includes scoped commits for README/package docs, quickstart, website, comparison/manifesto/LLM discovery, package metadata, visual assets, blog, and final review.

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

- Updated: 2026-05-03T13:55:29.212Z
- Branch: task/202605031315-90VFV9/cmo-public-surface-revision
- Head: b5da4f16604c

```text
 .agentplane/tasks/202605031255-92K2Q0/README.md    |  10 +-
 .agentplane/tasks/202605031255-E1YFBV/README.md    |  10 +-
 .agentplane/tasks/202605031255-GV0N4K/README.md    |  18 +--
 .agentplane/tasks/202605031255-H9WWA0/README.md    |  10 +-
 .agentplane/tasks/202605031255-TWKAW3/README.md    |  10 +-
 .agentplane/tasks/202605031255-XM1W31/README.md    |  10 +-
 .agentplane/tasks/202605031256-2HEMDS/README.md    |  10 +-
 .agentplane/tasks/202605031256-758Q7Z/README.md    |  10 +-
 .agentplane/tasks/202605031315-6DPX1F/README.md    | 129 +++++++++++++++
 .agentplane/tasks/202605031315-8R3SRX/README.md    | 133 +++++++++++++++
 .agentplane/tasks/202605031315-E9WZ3G/README.md    | 128 +++++++++++++++
 .agentplane/tasks/202605031315-GPW9P5/README.md    | 130 +++++++++++++++
 .agentplane/tasks/202605031315-HZQGRZ/README.md    | 128 +++++++++++++++
 .agentplane/tasks/202605031315-VZ15JW/README.md    | 130 +++++++++++++++
 .agentplane/tasks/202605031315-Z0PECQ/README.md    | 130 +++++++++++++++
 .agentplane/tasks/202605031315-ZN8594/README.md    | 127 +++++++++++++++
 README.md                                          | 179 ++++++++++-----------
 docs/assets/header.png                             | Bin 25895 -> 170586 bytes
 docs/compare.mdx                                   |  53 ++++++
 docs/index.mdx                                     |  22 +--
 docs/manifesto.mdx                                 |  74 +++++++++
 docs/recipes-inventory.json                        |  29 ++++
 packages/agentplane/README.md                      | 149 +++++------------
 .../assets/codex-plugin/assets/header.png          | Bin 25895 -> 170586 bytes
 packages/agentplane/package.json                   |   6 +-
 packages/agentplane/src/cli/command-guide.test.ts  |   3 +
 packages/agentplane/src/cli/command-guide.ts       |  21 +++
 packages/core/README.md                            |  64 ++++----
 packages/core/package.json                         |   7 +-
 packages/recipes/README.md                         |  29 +++-
 packages/recipes/package.json                      |   7 +-
 packages/spec/README.md                            |   8 +
 packages/spec/package.json                         |   5 +-
 packages/testkit/README.md                         |  22 +++
 packages/testkit/package.json                      |   5 +-
 ...-05-03-coding-agent-audit-layer-and-recipes.mdx | 100 ++++++++++++
 website/docusaurus.config.ts                       |  26 ++-
 website/sidebars.ts                                |   2 +
 website/src/data/homepage-content.ts               |  93 ++++++++---
 website/src/pages/_home.module.css                 | 123 +++++++++++++-
 website/src/pages/index.tsx                        |  38 ++++-
 website/static/img/header.png                      | Bin 25895 -> 170586 bytes
 website/static/img/og-image.png                    | Bin 25895 -> 170586 bytes
 website/static/img/twitter-card.png                | Bin 25895 -> 170586 bytes
 website/static/llms-full.txt                       |  95 ++++++++---
 website/static/llms.txt                            |  14 +-
 website/static/site.webmanifest                    |   4 +-
 47 files changed, 1937 insertions(+), 364 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
