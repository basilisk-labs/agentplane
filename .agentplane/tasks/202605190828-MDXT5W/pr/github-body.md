Task: `202605190828-MDXT5W`
Title: Repair website star gateway and docs IA
Canonical task record: `.agentplane/tasks/202605190828-MDXT5W/README.md`

## Summary

Repair website star gateway and docs IA

Update agentplane.org website and docs surfaces after live audit: star-focused homepage, canonical docs navigation/routes, public docs cleanup, ACR canonicalization, and site smoke coverage.

## Scope

- In scope: Update agentplane.org website and docs surfaces after live audit: star-focused homepage, canonical docs navigation/routes, public docs cleanup, ACR canonicalization, and site smoke coverage.
- Out of scope: unrelated refactors not required for "Repair website star gateway and docs IA".

## Verification

- State: ok
- Note:

```text
EVALUATOR quality gate passed for PR #3925 head 9b0c19b: review thread resolved by updating GitHub
proof fallback to live v0.6.3 release data; Docs CI, Core CI test/test-windows, CodeQL, Dependency
Review, format, and site-content checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T11:49:54.936Z
- Branch: task/202605190828-MDXT5W/site-star-docs-ia
- Head: 9b0c19b3bfb4

```text
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 docs/index.mdx                                     | 101 +---
 docs/reference/acr.mdx                             |  27 +-
 docs/reference/cli.mdx                             |  22 +
 docs/reference/workflow-file.mdx                   |  21 +
 docs/start/quickstart.mdx                          |  20 +-
 docs/start/what-agentplane-writes.mdx              |   1 +
 scripts/checks/check-agent-onboarding-scenario.mjs |   7 +-
 scripts/checks/check-docs-ia.mjs                   |  33 +-
 website/docusaurus.config.ts                       |  49 +-
 website/package.json                               |   2 +
 website/scripts/check-links.mjs                    |   6 +-
 website/scripts/check-site-content.mjs             |   8 +-
 website/scripts/site-smoke.mjs                     | 116 ++++
 website/sidebars.ts                                |  76 +--
 website/src/components/RedirectTo.tsx              |  25 +
 website/src/css/custom.css                         |  81 ++-
 website/src/data/homepage-content.ts               | 149 +++--
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
 website/src/pages/index.tsx                        | 153 ++++--
 website/src/theme/Root.tsx                         | 120 ++---
 .../social/docs/help/legacy-upgrade-recovery.png   | Bin 0 -> 48997 bytes
 website/static/img/social/docs/reference/cli.png   | Bin 0 -> 42652 bytes
 .../img/social/docs/reference/workflow-file.png    | Bin 0 -> 50513 bytes
 website/static/img/social/docs/releases/v0.6.3.png | Bin 0 -> 41712 bytes
 .../social/docs/user/agent-bootstrap.generated.png | Bin 0 -> 48217 bytes
 35 files changed, 1375 insertions(+), 429 deletions(-)
```

</details>
