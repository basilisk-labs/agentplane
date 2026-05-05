Task: `202605051844-WCPBCX`
Title: Update roadmap for blueprint and cloud backend layer

## Summary

Update roadmap for blueprint and cloud backend layer

Revise ROADMAP.md so v0.5 is the blueprint layer plus cloud backend selection for external platform sync, and move runner and evals to later releases.

## Scope

- In scope: Revise ROADMAP.md so v0.5 is the blueprint layer plus cloud backend selection for external platform sync, and move runner and evals to later releases.
- Out of scope: unrelated refactors not required for "Update roadmap for blueprint and cloud backend layer".

## Verification

- State: ok
- Note: Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: ROADMAP.md and roadmap blog update. Links: ROADMAP.md, website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx. Command: ap doctor; Result: pass; Evidence: doctor OK with errors=0 and warnings=4 for pre-existing global-in-framework/hook shim runtime state. Scope: repository policy/runtime health after docs-only change. Links: task README. Command: bunx prettier --check ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: All matched files use Prettier code style. Scope: changed roadmap docs. Links: changed docs. Command: git diff --check -- ROADMAP.md website/blog/2026-02-24-roadmap-0-5-blueprints-cloud-backend.mdx; Result: pass; Evidence: no whitespace errors. Scope: changed roadmap docs. Links: changed docs.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T18:49:02.590Z
- Branch: task/202605051844-WCPBCX/roadmap-blueprints-cloud
- Head: 21af248fa0ab

```text
 ROADMAP.md                                         | 35 ++++++++++----
 ...02-24-roadmap-0-5-blueprints-cloud-backend.mdx} | 54 +++++++++++++++++-----
 2 files changed, 69 insertions(+), 20 deletions(-)
```

</details>
