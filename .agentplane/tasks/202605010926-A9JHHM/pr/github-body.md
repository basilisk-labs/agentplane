## Summary

Add homepage hero motion and refresh Pages Actions

Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.

## Scope

- In scope: Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.
- Out of scope: unrelated refactors not required for "Add homepage hero motion and refresh Pages Actions".

## Verification

- State: ok
- Note: Local verification passed for homepage hero motion, rounded navigation/menu affordances, copy feedback, workflow lint, and Pages action version refresh. Commands run: git diff --check; bunx prettier --check .github/workflows/pages-deploy.yml website/src/pages/index.tsx website/src/pages/_home.module.css website/src/css/custom.css; bunx eslint website/src/pages/index.tsx; bun run docs:site:generate; bun run docs:site:typecheck; bun run docs:ia:check; bun run docs:site:build; bun run docs:site:check:design; bun run workflows:lint; Playwright desktop/mobile local visual checks. Pages action tags confirmed: configure-pages@v6 and deploy-pages@v5 use node24; upload-pages-artifact@v5 delegates to upload-artifact v7. Hosted CI and live deploy verification remain for PR/main.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T09:49:53.755Z
- Branch: task/202605010926-A9JHHM/hero-motion-actions
- Head: 60cc9fbba14a

```text
 .github/workflows/pages-deploy.yml |   6 +-
 website/src/css/custom.css         |  34 +++-
 website/src/pages/_home.module.css | 362 ++++++++++++++++++++++++++++++++++++-
 website/src/pages/index.tsx        |  63 ++++++-
 4 files changed, 447 insertions(+), 18 deletions(-)
```

</details>
