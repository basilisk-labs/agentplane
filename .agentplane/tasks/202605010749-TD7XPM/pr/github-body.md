## Summary

Shorten launch homepage gateway

Turn the homepage into a short launch gateway: hero, demo/proof, core workflow, repo-local artifacts, docs paths, and final CTA.

## Scope

- In scope: Turn the homepage into a short launch gateway: hero, demo/proof, core workflow, repo-local artifacts, docs paths, and final CTA.
- Out of scope: unrelated refactors not required for "Shorten launch homepage gateway".

## Verification

- State: ok
- Note: Homepage gateway implementation verified locally: diff whitespace, Prettier check, site typecheck, Docusaurus build, DESIGN.md guard, targeted homepage/config ESLint, and desktop/mobile Playwright render passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T08:15:03.631Z
- Branch: task/202605010749-TD7XPM/short-homepage-gateway
- Head: 5f3b3000fd79

```text
 website/docusaurus.config.ts         |  21 +-
 website/src/css/custom.css           |  54 ++++
 website/src/data/homepage-content.ts | 294 ++++++----------------
 website/src/pages/_home.module.css   | 474 +++++++++++++++--------------------
 website/src/pages/index.tsx          | 416 ++++++++++++------------------
 website/src/theme/Root.tsx           |  68 +++++
 6 files changed, 575 insertions(+), 752 deletions(-)
```

</details>
