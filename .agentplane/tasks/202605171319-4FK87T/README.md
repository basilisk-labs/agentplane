---
id: "202605171319-4FK87T"
title: "Prepare AgentPlane v0.6.2"
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
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T13:20:02.830Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Prepare the v0.6.2 patch release candidate from the current protected main, keeping the scope limited to already merged patch fixes and release hardening while excluding blocked major dependency upgrades and new public CLI surfaces."
events:
  -
    type: "status"
    at: "2026-05-17T13:20:07.303Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Prepare the v0.6.2 patch release candidate from the current protected main, keeping the scope limited to already merged patch fixes and release hardening while excluding blocked major dependency upgrades and new public CLI surfaces."
doc_version: 3
doc_updated_at: "2026-05-17T13:20:07.303Z"
doc_updated_by: "CODER"
description: "Prepare a patch release candidate for AgentPlane v0.6.2, limited to already merged patch-scope fixes and low-risk release/maintenance updates. Exclude new public CLI surfaces and red semver-major dependency upgrades from this patch scope."
sections:
  Summary: |-
    Prepare AgentPlane v0.6.2
    
    Prepare a patch release candidate for AgentPlane v0.6.2, limited to already merged patch-scope fixes and low-risk release/maintenance updates. Exclude new public CLI surfaces and red semver-major dependency upgrades from this patch scope.
  Scope: |-
    - In scope: Prepare a patch release candidate for AgentPlane v0.6.2, limited to already merged patch-scope fixes and low-risk release/maintenance updates. Exclude new public CLI surfaces and red semver-major dependency upgrades from this patch scope.
    - Out of scope: unrelated refactors not required for "Prepare AgentPlane v0.6.2".
  Plan: "Release plan: version=0.6.2, tag=v0.6.2, scope=patch release candidate from current protected main after PR #3830 hosted-close evidence completes. Include already merged patch-scope fixes and release publication hardening. Exclude route-decision public CLI work (#3823), zod 4, eslint 10, typescript 6, execa 9, eslint-plugin-n 18, and website major dependency groups unless separately approved. Required gates: active incidents empty, release candidate generation, release notes validation, release prepublish/parity checks, hosted PR checks, and post-merge publication evidence."
  Verify Steps: |-
    1. Confirm active incident registry has no active entries: `sed -n '1,220p' .agentplane/policy/incidents.md`.
    2. Confirm release scope excludes blocked major dependency PRs and new route-decision CLI surface: `gh pr list --state open --limit 100 --json number,title,mergeStateStatus,statusCheckRollup`.
    3. Generate or inspect the v0.6.2 release candidate using the branch_pr release route: `ap release candidate --push --yes` or the repo-local equivalent if the installed runtime lacks the current checkout changes.
    4. Run release validation checks required by the generated candidate, including release notes validation, parity/prepublish checks, and policy routing.
    5. Verify hosted PR checks for the release candidate are green and stable before merge/publication.
    6. Record publication evidence after merge: npm package version, remote tag, GitHub Release, and publish workflow result.
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

Prepare AgentPlane v0.6.2

Prepare a patch release candidate for AgentPlane v0.6.2, limited to already merged patch-scope fixes and low-risk release/maintenance updates. Exclude new public CLI surfaces and red semver-major dependency upgrades from this patch scope.

## Scope

- In scope: Prepare a patch release candidate for AgentPlane v0.6.2, limited to already merged patch-scope fixes and low-risk release/maintenance updates. Exclude new public CLI surfaces and red semver-major dependency upgrades from this patch scope.
- Out of scope: unrelated refactors not required for "Prepare AgentPlane v0.6.2".

## Plan

Release plan: version=0.6.2, tag=v0.6.2, scope=patch release candidate from current protected main after PR #3830 hosted-close evidence completes. Include already merged patch-scope fixes and release publication hardening. Exclude route-decision public CLI work (#3823), zod 4, eslint 10, typescript 6, execa 9, eslint-plugin-n 18, and website major dependency groups unless separately approved. Required gates: active incidents empty, release candidate generation, release notes validation, release prepublish/parity checks, hosted PR checks, and post-merge publication evidence.

## Verify Steps

1. Confirm active incident registry has no active entries: `sed -n '1,220p' .agentplane/policy/incidents.md`.
2. Confirm release scope excludes blocked major dependency PRs and new route-decision CLI surface: `gh pr list --state open --limit 100 --json number,title,mergeStateStatus,statusCheckRollup`.
3. Generate or inspect the v0.6.2 release candidate using the branch_pr release route: `ap release candidate --push --yes` or the repo-local equivalent if the installed runtime lacks the current checkout changes.
4. Run release validation checks required by the generated candidate, including release notes validation, parity/prepublish checks, and policy routing.
5. Verify hosted PR checks for the release candidate are green and stable before merge/publication.
6. Record publication evidence after merge: npm package version, remote tag, GitHub Release, and publish workflow result.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
