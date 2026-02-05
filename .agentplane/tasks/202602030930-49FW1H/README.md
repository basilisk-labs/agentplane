---
id: "202602030930-49FW1H"
title: "Fix npm publish trusted publishing auth"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["release"]
verify: []
commit: { hash: "8954f5a6c0717366338cd31f34efbd9da40f82fa", message: "🛠️ 49FW1H bump npm for trusted publishing" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: Investigate GitHub Actions publish auth/token sources, fix workflow/npmrc so trusted publishing uses OIDC only, and rerun publish." }
  - { author: "ORCHESTRATOR", body: "Blocked: GitHub Actions publish now runs without auth and fails with ENEEDAUTH. This indicates npm trusted publishing is not configured for @agentplaneorg; enable trusted publishing in npm or provide an NPM_TOKEN secret." }
  - { author: "ORCHESTRATOR", body: "Verified: Updated publish workflow to install npm@11.5.1 so GitHub Actions trusted publishing works. Reran Publish to npm (run 21625449544); publish succeeded for @agentplaneorg/core@0.1.2 and agentplane@0.1.2 with provenance." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:51.294Z"
doc_updated_by: "agentplane"
description: "Investigate why GitHub Actions publish still uses auth token (ENEEDAUTH/E404). Remove any token/npmrc leakage and ensure OIDC trusted publishing works for @agentplaneorg packages; rerun publish."
id_source: "generated"
---
## Summary

Ensure npm publish in GitHub Actions uses a clean npm config with no auth token so trusted publishing via OIDC can work.

Normalized task doc sections (dedupe).

## Scope

Update GitHub Actions publish workflow to clear auth env, use a clean npmrc, and rely on OIDC for publish.

## Risks

If trusted publishing is not configured on npm for @agentplaneorg, publishes may still fail; workflow change alone will not fix registry-side configuration.

## Verify Steps

Not run locally (workflow-only change). Trigger GitHub Actions Publish workflow and confirm npm publish succeeds for @agentplaneorg/core and agentplane.

## Rollback Plan

Revert .github/workflows/publish.yml to the previous version and rerun publish if needed.

## Notes

Triggered Publish to npm workflow on main (runs 21624946114, 21625026006). After removing auth tokens, npm publish fails with ENEEDAUTH, indicating npm trusted publishing is not configured for @agentplaneorg.

Added npm@11.5.1 install to publish workflow. Workflow run 21625449544 completed successfully; publish succeeded for @agentplaneorg/core@0.1.2 and agentplane@0.1.2 with OIDC provenance.
