Task: `202605031315-90VFV9`
Title: Revise repo public surfaces from CMO audit

## Summary

Revise repo public surfaces from CMO audit

Coordinate the repository-owned portion of the CMO audit: align README/package docs, website surfaces, discovery metadata, visual proof assets, and the quickstart first-win path while excluding off-repo launch operations.

## Scope

- In scope: Coordinate the repository-owned portion of the CMO audit: align README/package docs, website surfaces, discovery metadata, visual proof assets, and the quickstart first-win path while excluding off-repo launch operations.
- Out of scope: unrelated refactors not required for "Revise repo public surfaces from CMO audit".

## Verification

- State: ok
- Note: Primary public-surface revision task verified after all dependent leaves completed and final coherence review passed. Evidence includes scoped commits for README/package docs, quickstart, website, comparison/manifesto/LLM discovery, package metadata, visual assets, blog, and final review.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T13:48:58.741Z
- Branch: task/202605031315-90VFV9/cmo-public-surface-revision
- Head: 46a0ec7482d7

```text
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
 packages/agentplane/README.md                      | 161 ++++++------------
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
 website/src/data/homepage-content.ts               |  90 ++++++++---
 website/src/pages/_home.module.css                 | 123 +++++++++++++-
 website/src/pages/index.tsx                        |  38 ++++-
 website/static/img/header.png                      | Bin 25895 -> 170586 bytes
 website/static/img/og-image.png                    | Bin 25895 -> 170586 bytes
 website/static/img/twitter-card.png                | Bin 25895 -> 170586 bytes
 website/static/llms-full.txt                       |  95 ++++++++---
 website/static/llms.txt                            |  14 +-
 website/static/site.webmanifest                    |   4 +-
 38 files changed, 1867 insertions(+), 326 deletions(-)
```

</details>
