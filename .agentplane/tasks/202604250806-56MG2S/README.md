---
id: "202604250806-56MG2S"
title: "Publish v0.3.27 patch release"
result_summary: "Published v0.3.27 for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes; release tag and GitHub Release are live."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "v0.3"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T08:07:02.613Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T08:51:47.220Z"
  updated_by: "CODER"
  note: "Published v0.3.27 after PR #522 merged into protected main. Evidence: release plan targeted v0.3.27; release apply prepublish gates passed locally before protected-branch rejection; PR checks passed and PR #522 merged at 0dc40cf0; publish workflow 24927099253 succeeded; npm shows agentplane/core/recipes 0.3.27; origin tag v0.3.27 points to 0dc40cf0; GitHub Release v0.3.27 is published; agentplane doctor OK."
commit:
  hash: "0dc40cf03ff7c267d1a34eae37c4b39bc69d1ac9"
  message: "Merge pull request #522 from basilisk-labs/codex/release-v0.3.27"
comments:
  -
    author: "CODER"
    body: "Start: publishing v0.3.27 from direct main after the release hygiene gates and docs cleanup landed cleanly."
  -
    author: "CODER"
    body: "Verified: v0.3.27 is published on npm and GitHub after PR #522 merged into main. Publish workflow 24927099253 succeeded, origin/v0.3.27 points at 0dc40cf0, npm reports 0.3.27 for all three public packages, and doctor is OK."
events:
  -
    type: "status"
    at: "2026-04-25T08:07:15.941Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: publishing v0.3.27 from direct main after the release hygiene gates and docs cleanup landed cleanly."
  -
    type: "verify"
    at: "2026-04-25T08:51:47.220Z"
    author: "CODER"
    state: "ok"
    note: "Published v0.3.27 after PR #522 merged into protected main. Evidence: release plan targeted v0.3.27; release apply prepublish gates passed locally before protected-branch rejection; PR checks passed and PR #522 merged at 0dc40cf0; publish workflow 24927099253 succeeded; npm shows agentplane/core/recipes 0.3.27; origin tag v0.3.27 points to 0dc40cf0; GitHub Release v0.3.27 is published; agentplane doctor OK."
  -
    type: "status"
    at: "2026-04-25T08:51:53.392Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.3.27 is published on npm and GitHub after PR #522 merged into main. Publish workflow 24927099253 succeeded, origin/v0.3.27 points at 0dc40cf0, npm reports 0.3.27 for all three public packages, and doctor is OK."
doc_version: 3
doc_updated_at: "2026-04-25T08:51:53.393Z"
doc_updated_by: "CODER"
description: "Publish the next patch release containing release hygiene gates, repo-neutral workflow scope, sanitized package manifests, init recipe install commit capture, roadmap 0.6, and docs cleanup."
sections:
  Summary: |-
    Publish v0.3.27 patch release
    
    Publish the next patch release containing release hygiene gates, repo-neutral workflow scope, sanitized package manifests, init recipe install commit capture, roadmap 0.6, and docs cleanup.
  Scope: |-
    - In scope: Publish the next patch release containing release hygiene gates, repo-neutral workflow scope, sanitized package manifests, init recipe install commit capture, roadmap 0.6, and docs cleanup.
    - Out of scope: unrelated refactors not required for "Publish v0.3.27 patch release".
  Plan: "Release plan: version=v0.3.27, tag=v0.3.27, scope=publish the release hygiene/workflow-scope/package-gate/docs cleanup commits already on main. Steps: verify clean tree and parity, run agentplane release plan --patch, generate/update release notes if release plan requires it, run release prepublish gates through release apply, publish via direct-mode agentplane release apply --push --yes, verify npm/tag evidence, record release evidence and finish task."
  Verify Steps: |-
    1. Run git status --short --untracked-files=no. Expected: clean before release apply.
    2. Run agentplane release plan --patch. Expected: next version/tag resolves to v0.3.27.
    3. Ensure docs/releases/v0.3.27.md exists and covers the hygiene, workflow scope, package gate, manifest, init recipe commit, roadmap, and docs cleanup changes.
    4. Run agentplane release apply --push --yes. Expected: versions bump, release checks pass, commit/tag are created and pushed.
    5. Verify git ls-remote --tags origin v0.3.27 and npm view agentplane version. Expected: tag exists remotely and npm shows 0.3.27.
    6. Run agentplane doctor. Expected: OK after release.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T08:51:47.220Z — VERIFY — ok
    
    By: CODER
    
    Note: Published v0.3.27 after PR #522 merged into protected main. Evidence: release plan targeted v0.3.27; release apply prepublish gates passed locally before protected-branch rejection; PR checks passed and PR #522 merged at 0dc40cf0; publish workflow 24927099253 succeeded; npm shows agentplane/core/recipes 0.3.27; origin tag v0.3.27 points to 0dc40cf0; GitHub Release v0.3.27 is published; agentplane doctor OK.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T08:07:16.014Z, excerpt_hash=sha256:fecfa06bc46d5ac715c3fb625ee8e3f25b022858e1a578051be51f204878f511
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Publish v0.3.27 patch release

Publish the next patch release containing release hygiene gates, repo-neutral workflow scope, sanitized package manifests, init recipe install commit capture, roadmap 0.6, and docs cleanup.

## Scope

- In scope: Publish the next patch release containing release hygiene gates, repo-neutral workflow scope, sanitized package manifests, init recipe install commit capture, roadmap 0.6, and docs cleanup.
- Out of scope: unrelated refactors not required for "Publish v0.3.27 patch release".

## Plan

Release plan: version=v0.3.27, tag=v0.3.27, scope=publish the release hygiene/workflow-scope/package-gate/docs cleanup commits already on main. Steps: verify clean tree and parity, run agentplane release plan --patch, generate/update release notes if release plan requires it, run release prepublish gates through release apply, publish via direct-mode agentplane release apply --push --yes, verify npm/tag evidence, record release evidence and finish task.

## Verify Steps

1. Run git status --short --untracked-files=no. Expected: clean before release apply.
2. Run agentplane release plan --patch. Expected: next version/tag resolves to v0.3.27.
3. Ensure docs/releases/v0.3.27.md exists and covers the hygiene, workflow scope, package gate, manifest, init recipe commit, roadmap, and docs cleanup changes.
4. Run agentplane release apply --push --yes. Expected: versions bump, release checks pass, commit/tag are created and pushed.
5. Verify git ls-remote --tags origin v0.3.27 and npm view agentplane version. Expected: tag exists remotely and npm shows 0.3.27.
6. Run agentplane doctor. Expected: OK after release.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T08:51:47.220Z — VERIFY — ok

By: CODER

Note: Published v0.3.27 after PR #522 merged into protected main. Evidence: release plan targeted v0.3.27; release apply prepublish gates passed locally before protected-branch rejection; PR checks passed and PR #522 merged at 0dc40cf0; publish workflow 24927099253 succeeded; npm shows agentplane/core/recipes 0.3.27; origin tag v0.3.27 points to 0dc40cf0; GitHub Release v0.3.27 is published; agentplane doctor OK.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T08:07:16.014Z, excerpt_hash=sha256:fecfa06bc46d5ac715c3fb625ee8e3f25b022858e1a578051be51f204878f511

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
