---
id: "202602060612-BQ8HRK"
title: "Release v0.1.7"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["release", "versioning", "docs", "git"]
verify: []
commit: { hash: "8d8fc83cc866475eb469c1a3f8709e0600f4584d", message: "🚀 BQ8HRK release" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: Prepare and publish release v0.1.7 (release notes, version bumps, verification), create git tag v0.1.7 on the release commit, and push main+tag to origin for GitHub Actions publish." }
  - { author: "ORCHESTRATOR", body: "Verified: agentplane verify passed (2026-02-06); release commit 8d8fc83cc866. Bumped core+cli to 0.1.7, added docs/releases/v0.1.7.md, updated versioned tests." }
doc_version: 2
doc_updated_at: "2026-02-06T06:19:39.341Z"
doc_updated_by: "ORCHESTRATOR"
description: "Goal: cut a new release tag v0.1.7 and push to GitHub for automated publish.\\n\\nDeliverables:\\n- docs/releases/v0.1.7.md (non-empty, user-facing English notes)\\n- Bump packages/core and packages/agentplane versions to 0.1.7 (and update agentplane dependency on @agentplaneorg/core)\\n- Update any versioned tests/fixtures expecting 0.1.6 -> 0.1.7\\n- Create git tag v0.1.7 on the release commit\\n- Push main and the tag to origin\\n\\nConstraints:\\n- direct mode; commits via agentplane; run agentplane verify before finish."
---
## Summary

- Prepare release v0.1.7 (release notes + version bumps across packages).\n- Tag the release commit as v0.1.7 and push main+tag to GitHub to trigger the publish workflow.

## Scope

- Add docs/releases/v0.1.7.md (English notes).\n- Bump packages/core/package.json + packages/agentplane/package.json versions to 0.1.7 and update @agentplaneorg/core dependency in agentplane.\n- Update version expectations in tests/fixtures (0.1.6 -> 0.1.7).\n- Create and push git tag v0.1.7 and push main to origin.

## Risks

- Tag collision risk if v0.1.7 already exists on origin (must check before tagging/pushing).\n- Release workflow gate: missing/empty docs/releases/v0.1.7.md or version mismatch causes publish.yml to fail.\n- Push risk: origin/main may be ahead; push could be rejected (needs explicit resolution).

## Verify Steps

cmd: bun run ci
cmd: bun run release:check

## Verification

Verified: 2026-02-06 13:18:08 +0700

- agentplane verify 202602060612-BQ8HRK --require --yes
- Verify Steps executed:
  - bun run ci
  - bun run release:check

## Rollback Plan

- Delete local tag v0.1.7 if created: git tag -d v0.1.7.\n- If tag pushed, delete remote tag (requires explicit decision): git push origin :refs/tags/v0.1.7.\n- Revert the release commit(s) via git revert and re-run verification.\n- Re-cut the release with corrected notes/versions.
