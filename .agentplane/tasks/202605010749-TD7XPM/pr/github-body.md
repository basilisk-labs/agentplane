## Summary

Shorten launch homepage gateway

Turn the homepage into a short launch gateway: hero, demo/proof, core workflow, repo-local artifacts, docs paths, and final CTA.

## Scope

- In scope: Turn the homepage into a short launch gateway: hero, demo/proof, core workflow, repo-local artifacts, docs paths, and final CTA.
- Out of scope: unrelated refactors not required for "Shorten launch homepage gateway".

## Verification

- State: ok
- Note: Minimal homepage layout iteration verified locally before deploy: CSS diff only, whitespace/formatting/targeted ESLint/typecheck/build/design guard and desktop/mobile Playwright checks passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T09:04:35.860Z
- Branch: task/202605010749-TD7XPM/short-homepage-gateway
- Head: 3a63fd0207fb

```text
 website/docusaurus.config.ts         |  21 +-
 website/src/css/custom.css           |  54 ++++
 website/src/data/homepage-content.ts | 294 +++++--------------
 website/src/pages/_home.module.css   | 535 ++++++++++++++++-------------------
 website/src/pages/index.tsx          | 416 +++++++++++----------------
 website/src/theme/Root.tsx           |  68 +++++
 6 files changed, 620 insertions(+), 768 deletions(-)
```

</details>
