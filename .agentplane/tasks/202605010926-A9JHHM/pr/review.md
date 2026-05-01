# PR Review

Created: 2026-05-01T09:30:14.340Z
Branch: task/202605010926-A9JHHM/hero-motion-actions

## Summary

Add homepage hero motion and refresh Pages Actions

Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.

## Scope

- In scope: Enhance the launch homepage with a restrained looping hero background animation, rounded navigation affordances, and microinteractions; update GitHub Pages workflow actions so deploys no longer warn about Node.js 20 action runtime deprecation.
- Out of scope: unrelated refactors not required for "Add homepage hero motion and refresh Pages Actions".

## Verification

### Plan

1. Run formatting checks for touched website and workflow files. Expected: no formatting drift.
2. Run focused lint for the touched homepage TSX plus website typecheck/build/design checks. Expected: all pass; the only acceptable build warning is the pre-existing bundler static-analysis warning from vscode-languageserver-types if still present.
3. Run workflow lint and confirm the updated Pages actions resolve to Node 24-compatible action runtimes. Expected: workflow contracts pass and Pages action versions exist.
4. Run Playwright desktop and mobile visual checks against the local dev server. Expected: hero background animation renders behind readable copy, rounded menu affordances are restored, and CTA/copy interactions are usable.
5. Open and merge PR through branch_pr flow, then verify GitHub Actions on main and https://agentplane.org live with a cache-busted request/browser check. Expected: Docs CI, Core CI, and Pages Deploy pass without Node.js 20 action-runtime deprecation annotations from Pages actions; live page has the new hero motion and old placeholder is absent.

### Current Status

- State: ok
- Note: Follow-up CI deprecation verification passed: dorny/paths-filter was updated from v3 to v4 across ci.yml, docs-ci.yml, and prepublish.yml after PR checks surfaced the remaining Node.js 20 annotation. Confirmed dorny/paths-filter@v4 action.yml uses node24; reran bun run workflows:lint successfully. This keeps the deprecation fix complete beyond the Pages actions.

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
<!-- END AUTO SUMMARY -->
