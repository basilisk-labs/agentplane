---
id: "202601290714-76XDR6"
title: "AP-034: agentplane-recipes repo + release pipeline"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601270756-779J2V"]
tags: ["roadmap", "recipes", "infra"]
commit: { hash: "36c163f37f4e467675d22b70e33bef6f67b9428f", message: "chore: 76XDR6 recipes repo scaffold" }
comments:
  - { author: "CODER", body: "Start: scaffold agentplane-recipes repo structure, schemas, index, and release script." }
  - { author: "ORCHESTRATOR", body: "verified: manual review (2026-01-29). | details: Scope: scaffolded agentplane-recipes repo and release pipeline." }
  - { author: "ORCHESTRATOR", body: "verified: manual review (2026-01-29). | details: Scope: scaffolded agentplane-recipes repo and release pipeline." }
doc_version: 2
doc_updated_at: "2026-01-29T12:59:19+00:00"
doc_updated_by: "agentctl"
description: "Create agentplane-recipes repo skeleton with build script and GitHub Actions release publishing index.json and recipe archives."
---
## Summary

Scaffold agentplane-recipes repo with schemas, manifests, index, and a release build script/workflow.

## Scope

- Populate @agentplane-recipes/schemas with recipe manifest and index schemas.\n- Add starter manifests for viewer/redmine recipes.\n- Create build-release script and GitHub release workflow.\n- Initialize index.json and README.

## Risks

- Release workflow assumes tag-based releases and GitHub assets; may need tweaks for actual release process.\n- Index entries are placeholders until real recipe bundles are published.

## Verify Steps

- Manual review of @agentplane-recipes scripts/workflows and JSON schemas.

## Rollback Plan

- Revert the recipe repo scaffold commit in agentplane-recipes.

## Notes

Work committed in external repo: agentplane-recipes (commit fd82dc9).

