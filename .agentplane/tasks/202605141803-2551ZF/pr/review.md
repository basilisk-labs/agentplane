# PR Review

Created: 2026-05-14T18:33:31.663Z

## Task

- Task: `202605141803-2551ZF`
- Title: Refresh blog editorial surface
- Status: DOING
- Branch: `task/202605141803-2551ZF/blog-editorial-refresh`
- Canonical task record: `.agentplane/tasks/202605141803-2551ZF/README.md`

## Verification

- State: ok
- Note: Verified blog editorial refresh. Checks passed: node .agentplane/policy/check-routing.mjs, bun run docs:site:typecheck, bun run docs:site:build, git diff --check, Humanizer anti-AI scan on new/rewritten essays, and title-order audit confirming newest-first archive.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T18:33:31.663Z
- Branch: task/202605141803-2551ZF/blog-editorial-refresh
- Head: fb848e5eaff1

```text
 .../blueprint/resolved-snapshot.json               | 357 +++++++++++++++++++++
 ...-02-24-roadmap-0-5-blueprints-cloud-backend.mdx |   2 +-
 ...e-0-2-25-safer-commits-cleaner-release-flow.mdx |   2 +-
 ...0-3-0-policy-gateway-and-release-discipline.mdx |   2 +-
 ...-0-3-1-publish-recovery-and-quieter-surface.mdx |   2 +-
 ...e-0-3-2-smoother-upgrades-and-framework-dev.mdx |   2 +-
 ...lease-0-3-3-runtime-hardening-and-readme-v3.mdx |   2 +-
 ...-4-install-first-startup-and-upgrade-repair.mdx |   2 +-
 ...readme-v3-docs-shell-and-backend-projection.mdx |   2 +-
 ...7-legacy-recovery-redmine-and-safer-publish.mdx |   2 +-
 ...d-0-3-9-preparing-0-4-fixing-installability.mdx |   2 +-
 .../blog/2026-04-30-agentplane-0-3-road-to-0-4.mdx |   2 +-
 ...0-release-0-4-0-modular-prompts-and-recipes.mdx |   2 +-
 ...-05-03-coding-agent-audit-layer-and-recipes.mdx |   2 +-
 website/blog/2026-05-04-introducing-acr-v0-1.mdx   |   2 +-
 website/blog/2026-05-12-why-blueprints-matter.mdx  | 108 ++++---
 .../2026-05-14-recipes-reusable-agent-behavior.mdx |  90 ++++++
 ...-agentplane-0-6-context-management-llm-wiki.mdx | 158 +++++----
 website/blog/tags.yml                              |  10 +
 website/src/pages/blog/index.tsx                   |  10 +-
 20 files changed, 610 insertions(+), 151 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
