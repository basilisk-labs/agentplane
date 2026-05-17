---
id: "202605171738-Z88S1G"
title: "Harden paths-filter checkout depth"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "github"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:39:27.199Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T17:40:44.273Z"
  updated_by: "CODER"
  note: "Added fetch-depth: 0 to dorny/paths-filter changes jobs in Core CI, Docs CI, and Pre-publish workflows. Local verification passed: targeted rg inspection, workflow command contract, policy routing, and git diff --check. Remote PR checks will validate GitHub Actions behavior."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Harden GitHub Actions path-filter changes jobs by making checkout history complete before dorny/paths-filter runs, addressing the observed shallow fetch race on main push CI."
events:
  -
    type: "status"
    at: "2026-05-17T17:39:53.907Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Harden GitHub Actions path-filter changes jobs by making checkout history complete before dorny/paths-filter runs, addressing the observed shallow fetch race on main push CI."
  -
    type: "verify"
    at: "2026-05-17T17:40:44.273Z"
    author: "CODER"
    state: "ok"
    note: "Added fetch-depth: 0 to dorny/paths-filter changes jobs in Core CI, Docs CI, and Pre-publish workflows. Local verification passed: targeted rg inspection, workflow command contract, policy routing, and git diff --check. Remote PR checks will validate GitHub Actions behavior."
doc_version: 3
doc_updated_at: "2026-05-17T17:40:44.284Z"
doc_updated_by: "CODER"
description: "Fix GitHub Actions dorny/paths-filter shallow fetch race on main push runs by ensuring changes jobs checkout full history before path filtering."
sections:
  Summary: |-
    Harden paths-filter checkout depth

    Fix GitHub Actions dorny/paths-filter shallow fetch race on main push runs by ensuring changes jobs checkout full history before path filtering.
  Scope: |-
    - In scope: Fix GitHub Actions dorny/paths-filter shallow fetch race on main push runs by ensuring changes jobs checkout full history before path filtering.
    - Out of scope: unrelated refactors not required for "Harden paths-filter checkout depth".
  Plan: "Update GitHub Actions changes jobs that use dorny/paths-filter to checkout with full history before path filtering, preventing shallow fetch races on push runs. Scope is limited to CI workflow YAML files. Verify with YAML inspection, targeted text search, and policy routing; remote validation is the follow-up PR Core CI run."
  Verify Steps: |-
    - Inspect `.github/workflows/ci.yml`, `.github/workflows/docs-ci.yml`, and `.github/workflows/prepublish.yml` to confirm each `dorny/paths-filter@v4` changes job has an immediately preceding `actions/checkout@v6` with `fetch-depth: 0`.
    - Run `rg -n "dorny/paths-filter|fetch-depth" .github/workflows` and review output for the changed jobs.
    - Run `node .agentplane/policy/check-routing.mjs`.
    - Open the task PR and confirm GitHub Core CI no longer fails in the `changes` job with `fatal: shallow file has changed since we read it`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:40:44.273Z — VERIFY — ok

    By: CODER

    Note: Added fetch-depth: 0 to dorny/paths-filter changes jobs in Core CI, Docs CI, and Pre-publish workflows. Local verification passed: targeted rg inspection, workflow command contract, policy routing, and git diff --check. Remote PR checks will validate GitHub Actions behavior.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:39:53.907Z, excerpt_hash=sha256:b9277e464899fbc340c0d8d4931a3964fd25a4a47340ca602878c234a24013b1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171738-Z88S1G-paths-filter-fetch-depth/.agentplane/tasks/202605171738-Z88S1G/blueprint/resolved-snapshot.json
    - old_digest: 915c31faa2d554a690eb379f33d1ecab743135fe6d3abcd6316de012fbe6f689
    - current_digest: 915c31faa2d554a690eb379f33d1ecab743135fe6d3abcd6316de012fbe6f689
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171738-Z88S1G

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden paths-filter checkout depth

Fix GitHub Actions dorny/paths-filter shallow fetch race on main push runs by ensuring changes jobs checkout full history before path filtering.

## Scope

- In scope: Fix GitHub Actions dorny/paths-filter shallow fetch race on main push runs by ensuring changes jobs checkout full history before path filtering.
- Out of scope: unrelated refactors not required for "Harden paths-filter checkout depth".

## Plan

Update GitHub Actions changes jobs that use dorny/paths-filter to checkout with full history before path filtering, preventing shallow fetch races on push runs. Scope is limited to CI workflow YAML files. Verify with YAML inspection, targeted text search, and policy routing; remote validation is the follow-up PR Core CI run.

## Verify Steps

- Inspect `.github/workflows/ci.yml`, `.github/workflows/docs-ci.yml`, and `.github/workflows/prepublish.yml` to confirm each `dorny/paths-filter@v4` changes job has an immediately preceding `actions/checkout@v6` with `fetch-depth: 0`.
- Run `rg -n "dorny/paths-filter|fetch-depth" .github/workflows` and review output for the changed jobs.
- Run `node .agentplane/policy/check-routing.mjs`.
- Open the task PR and confirm GitHub Core CI no longer fails in the `changes` job with `fatal: shallow file has changed since we read it`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:40:44.273Z — VERIFY — ok

By: CODER

Note: Added fetch-depth: 0 to dorny/paths-filter changes jobs in Core CI, Docs CI, and Pre-publish workflows. Local verification passed: targeted rg inspection, workflow command contract, policy routing, and git diff --check. Remote PR checks will validate GitHub Actions behavior.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:39:53.907Z, excerpt_hash=sha256:b9277e464899fbc340c0d8d4931a3964fd25a4a47340ca602878c234a24013b1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171738-Z88S1G-paths-filter-fetch-depth/.agentplane/tasks/202605171738-Z88S1G/blueprint/resolved-snapshot.json
- old_digest: 915c31faa2d554a690eb379f33d1ecab743135fe6d3abcd6316de012fbe6f689
- current_digest: 915c31faa2d554a690eb379f33d1ecab743135fe6d3abcd6316de012fbe6f689
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171738-Z88S1G

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
