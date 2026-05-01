## Summary

Add homepage hero motion and refresh Pages Actions

Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.

## Scope

- In scope: Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.
- Out of scope: unrelated refactors not required for "Add homepage hero motion and refresh Pages Actions".

## Verification

- State: ok
- Note: Follow-up CI deprecation verification passed: dorny/paths-filter was updated from v3 to v4 across ci.yml, docs-ci.yml, and prepublish.yml after PR checks surfaced the remaining Node.js 20 annotation. Confirmed dorny/paths-filter@v4 action.yml uses node24; reran bun run workflows:lint successfully. This keeps the deprecation fix complete beyond the Pages actions.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T09:53:57.181Z
- Branch: task/202605010926-A9JHHM/hero-motion-actions
- Head: c88b10957858

```text
 .github/workflows/ci.yml           |   2 +-
 .github/workflows/docs-ci.yml      |   2 +-
 .github/workflows/pages-deploy.yml |   6 +-
 .github/workflows/prepublish.yml   |   2 +-
 website/src/css/custom.css         |  34 +++-
 website/src/pages/_home.module.css | 362 ++++++++++++++++++++++++++++++++++++-
 website/src/pages/index.tsx        |  63 ++++++-
 7 files changed, 450 insertions(+), 21 deletions(-)
```

</details>
