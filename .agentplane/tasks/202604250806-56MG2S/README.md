---
id: "202604250806-56MG2S"
title: "Publish v0.3.27 patch release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: publishing v0.3.27 from direct main after the release hygiene gates and docs cleanup landed cleanly."
events:
  -
    type: "status"
    at: "2026-04-25T08:07:15.941Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: publishing v0.3.27 from direct main after the release hygiene gates and docs cleanup landed cleanly."
doc_version: 3
doc_updated_at: "2026-04-25T08:07:16.014Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
