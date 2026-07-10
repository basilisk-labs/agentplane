Task: `202607100945-T0215Q`
Title: Resolve release incident INC-20260710-01 website lint
Canonical task record: `.agentplane/tasks/202607100945-T0215Q/README.md`

## Summary

Resolve release incident INC-20260710-01 website lint

For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.

## Scope

- In scope: For v0.6.22, remove the current website lint failures with Docusaurus-aware rule boundaries and targeted code fixes, verify the website build/lint surfaces, archive the resolved incident with evidence, and unblock the release-ready manifest.
- Out of scope: unrelated refactors not required for "Resolve release incident INC-20260710-01 website lint".

## Verification

- State: ok
- Note:

```text
Website lint restored with zero findings; Docusaurus-aware filename and generated-asset boundaries
are narrow; docs typecheck, generation freshness, production build, ci:contract, test:fast, release
incident gate, policy routing, and doctor passed. Doctor reports only pre-existing historical task
metadata warnings.
```
- Canonical workflow state lives in the task README.

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
