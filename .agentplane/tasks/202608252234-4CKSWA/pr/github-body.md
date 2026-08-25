Task: `202608252234-4CKSWA`
Title: Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360
Canonical task record: `.agentplane/tasks/202608252234-4CKSWA/README.md`

## Summary

Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360

Supersede malformed task 202608252233-JR4T47 and every stale 0.7.8 release attempt based on another SHA. Freeze exact candidate base 8ea1cefbbc96a8da5595fce36325ec0c1194a360. Limit repository changes to the 0.7.8 version transition, release notes, required generated artifacts, and only reproducible release-blocking fixes. A release blocker must affect the installed user-facing runtime, corrupt protected state or effects, prevent clean exact-candidate build, test, package, or publish, or fail a required hosted release check on the exact candidate SHA. Dogfooding, recovery ergonomics, task-worktree preparation, local dependency layout, aggregate scheduling, and optional self-hosting qualification are deferred unless they satisfy that rule. Run release-specific local gates, exact-head hosted qualification, package tarball and clean installed-CLI smoke. After protected publication, prove npm versions and dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; Git tag; GitHub Release; clean installation; and exact published SHA. Reconcile effect-in-doubt by readback before retry. Do not reuse stale release worktrees or PRs.

## Scope

- In scope: Supersede malformed task 202608252233-JR4T47 and every stale 0.7.8 release attempt based on another SHA. Freeze exact candidate base 8ea1cefbbc96a8da5595fce36325ec0c1194a360. Limit repository changes to the 0.7.8 version transition, release notes, required generated artifacts, and only reproducible release-blocking fixes. A release blocker must affect the installed user-facing runtime, corrupt protected state or effects, prevent clean exact-candidate build, test, package, or publish, or fail a required hosted release check on the exact candidate SHA. Dogfooding, recovery ergonomics, task-worktree preparation, local dependency layout, aggregate scheduling, and optional self-hosting qualification are deferred unless they satisfy that rule. Run release-specific local gates, exact-head hosted qualification, package tarball and clean installed-CLI smoke. After protected publication, prove npm versions and dist-tags for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; Git tag; GitHub Release; clean installation; and exact published SHA. Reconcile effect-in-doubt by readback before retry. Do not reuse stale release worktrees or PRs.
- Out of scope: unrelated refactors not required for "Publish AgentPlane 0.7.8 from exact main 8ea1cefbbc96a8da5595fce36325ec0c1194a360".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-25T23:06:58.624Z
- Branch: task/202608252234-4CKSWA/publish-agentplane-0-7-8-exact-main
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 docs/releases/v0.7.8.md                            |  45 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 +--
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |  22 +++++++---
 packages/testkit/package.json                      |   2 +-
 website/static/img/social/docs/releases/v0.7.8.png | Bin 0 -> 53352 bytes
 website/static/img/social/manifest.json            |   8 ++++
 10 files changed, 77 insertions(+), 14 deletions(-)
```

</details>
