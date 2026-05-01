---
id: "202605011627-ZZBSAE"
title: "Update release distribution docs and DoD"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605011626-KJFS07"
  - "202605011626-TG4GZ4"
  - "202605011627-6B8QDR"
  - "202605011627-F40YFZ"
tags:
  - "docs"
  - "release"
verify:
  - "agentplane doctor"
  - "bun run docs:cli:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T16:36:54.525Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T18:15:24.568Z"
  updated_by: "DOCS"
  note: "Release distribution docs now match the merged modular publish workflow and v0.4.1 notes include GHCR/setup-action release surface."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: align release distribution documentation and DoD with the shipped modular publish workflow."
events:
  -
    type: "status"
    at: "2026-05-01T18:11:34.701Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: align release distribution documentation and DoD with the shipped modular publish workflow."
  -
    type: "verify"
    at: "2026-05-01T18:15:24.568Z"
    author: "DOCS"
    state: "ok"
    note: "Release distribution docs now match the merged modular publish workflow and v0.4.1 notes include GHCR/setup-action release surface."
doc_version: 3
doc_updated_at: "2026-05-01T18:15:24.575Z"
doc_updated_by: "DOCS"
description: "Update public and developer docs so the next release checklist explains npm, GitHub assets, Homebrew tap, Scoop bucket, GHCR image, setup-agentplane, recovery, and evidence expectations."
sections:
  Summary: |-
    Update release distribution docs and DoD
    
    Update public and developer docs so the next release checklist explains npm, GitHub assets, Homebrew tap, Scoop bucket, GHCR image, setup-agentplane, recovery, and evidence expectations.
  Scope: |-
    - In scope: Update public and developer docs so the next release checklist explains npm, GitHub assets, Homebrew tap, Scoop bucket, GHCR image, setup-agentplane, recovery, and evidence expectations.
    - Out of scope: unrelated refactors not required for "Update release distribution docs and DoD".
  Plan: "Plan: update developer and user-facing release documentation so the next release checklist explains npm, GitHub Release assets, Homebrew tap, Scoop bucket, GHCR image, setup-agentplane, recovery, and evidence expectations. Verification: policy routing, doctor, docs CLI freshness."
  Verify Steps: |-
    1. Review the requested outcome for "Update release distribution docs and DoD". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T18:15:24.568Z — VERIFY — ok
    
    By: DOCS
    
    Note: Release distribution docs now match the merged modular publish workflow and v0.4.1 notes include GHCR/setup-action release surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T18:11:34.701Z, excerpt_hash=sha256:2dbb888af27194ca2a1ed00065f69e84145c31fe19fac6532d73f9bd99361267
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks: bun run docs:ia:check; bun run release:distribution:check; bun run release:setup-action:check; bun run release:ghcr:check; bun run docs:scripts:check; bunx prettier --check docs/developer/release-and-publishing.mdx docs/releases/v0.4.1.md; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun install --frozen-lockfile --ignore-scripts; bun run docs:site:build (success with pre-existing webpack warning about vscode-languageserver-types dynamic require).
      Impact: Release docs now separate automatic npm/GitHub/GHCR publication from Homebrew/Scoop/setup-action handoff artifacts, so post-release status cannot be mistaken for an external tap/bucket/action repo update.
      Resolution: No docs follow-up remains for this release contour; external repo publication automation remains represented as credential-gated module evidence rather than claimed as completed publication.
id_source: "generated"
---
## Summary

Update release distribution docs and DoD

Update public and developer docs so the next release checklist explains npm, GitHub assets, Homebrew tap, Scoop bucket, GHCR image, setup-agentplane, recovery, and evidence expectations.

## Scope

- In scope: Update public and developer docs so the next release checklist explains npm, GitHub assets, Homebrew tap, Scoop bucket, GHCR image, setup-agentplane, recovery, and evidence expectations.
- Out of scope: unrelated refactors not required for "Update release distribution docs and DoD".

## Plan

Plan: update developer and user-facing release documentation so the next release checklist explains npm, GitHub Release assets, Homebrew tap, Scoop bucket, GHCR image, setup-agentplane, recovery, and evidence expectations. Verification: policy routing, doctor, docs CLI freshness.

## Verify Steps

1. Review the requested outcome for "Update release distribution docs and DoD". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T18:15:24.568Z — VERIFY — ok

By: DOCS

Note: Release distribution docs now match the merged modular publish workflow and v0.4.1 notes include GHCR/setup-action release surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T18:11:34.701Z, excerpt_hash=sha256:2dbb888af27194ca2a1ed00065f69e84145c31fe19fac6532d73f9bd99361267

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Checks: bun run docs:ia:check; bun run release:distribution:check; bun run release:setup-action:check; bun run release:ghcr:check; bun run docs:scripts:check; bunx prettier --check docs/developer/release-and-publishing.mdx docs/releases/v0.4.1.md; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor; bun install --frozen-lockfile --ignore-scripts; bun run docs:site:build (success with pre-existing webpack warning about vscode-languageserver-types dynamic require).
  Impact: Release docs now separate automatic npm/GitHub/GHCR publication from Homebrew/Scoop/setup-action handoff artifacts, so post-release status cannot be mistaken for an external tap/bucket/action repo update.
  Resolution: No docs follow-up remains for this release contour; external repo publication automation remains represented as credential-gated module evidence rather than claimed as completed publication.
