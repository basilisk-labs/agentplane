---
id: "202604151530-ANKJ6S"
title: "Let exact-sha publish recovery bypass bootstrap-doc stale-dist guard"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T15:31:16.245Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T15:34:48.084Z"
  updated_by: "CODER"
  note: "Verified: historical publish recovery now validates only the exact publish payload in publish.yml, keeps the release-ready artifact as the CI readiness source, and publish-workflow-contract.test.ts plus format:check pass locally."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: isolate the exact historical release-prepublish guard, patch the smallest safe recovery path, and verify it by replaying publish for d95b2762f78815b60407a62f2227136c85cae5ee."
events:
  -
    type: "status"
    at: "2026-04-15T15:31:17.408Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate the exact historical release-prepublish guard, patch the smallest safe recovery path, and verify it by replaying publish for d95b2762f78815b60407a62f2227136c85cae5ee."
  -
    type: "verify"
    at: "2026-04-15T15:34:48.084Z"
    author: "CODER"
    state: "ok"
    note: "Verified: historical publish recovery now validates only the exact publish payload in publish.yml, keeps the release-ready artifact as the CI readiness source, and publish-workflow-contract.test.ts plus format:check pass locally."
doc_version: 3
doc_updated_at: "2026-04-15T15:34:48.088Z"
doc_updated_by: "CODER"
description: "Historical publish recovery should not fail release:prepublish on bootstrap-doc freshness checks that require current local dist manifests unavailable in exact historical checkout paths."
sections:
  Summary: |-
    Let exact-sha publish recovery bypass bootstrap-doc stale-dist guard
    
    Historical publish recovery should not fail release:prepublish on bootstrap-doc freshness checks that require current local dist manifests unavailable in exact historical checkout paths.
  Scope: |-
    - In scope: Historical publish recovery should not fail release:prepublish on bootstrap-doc freshness checks that require current local dist manifests unavailable in exact historical checkout paths.
    - Out of scope: unrelated refactors not required for "Let exact-sha publish recovery bypass bootstrap-doc stale-dist guard".
  Plan: |-
    1. Identify the minimal exact-sha recovery-safe prepublish contract and patch the guard without weakening normal release gates.
    2. Verify locally with targeted contract/tests that historical publish recovery no longer depends on bootstrap-doc stale dist manifests.
    3. Land through protected main, rerun exact-sha publish for d95b2762f78815b60407a62f2227136c85cae5ee, and verify v0.3.11 tag/npm state.
  Verify Steps: |-
    1. Review the requested outcome for "Let exact-sha publish recovery bypass bootstrap-doc stale-dist guard". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T15:34:48.084Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: historical publish recovery now validates only the exact publish payload in publish.yml, keeps the release-ready artifact as the CI readiness source, and publish-workflow-contract.test.ts plus format:check pass locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T15:31:17.420Z, excerpt_hash=sha256:dbc5bcb3a688fe672b0d033a53bd6e0aecbc5bd3e6adc4e2833faaabef2cecbe
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Let exact-sha publish recovery bypass bootstrap-doc stale-dist guard

Historical publish recovery should not fail release:prepublish on bootstrap-doc freshness checks that require current local dist manifests unavailable in exact historical checkout paths.

## Scope

- In scope: Historical publish recovery should not fail release:prepublish on bootstrap-doc freshness checks that require current local dist manifests unavailable in exact historical checkout paths.
- Out of scope: unrelated refactors not required for "Let exact-sha publish recovery bypass bootstrap-doc stale-dist guard".

## Plan

1. Identify the minimal exact-sha recovery-safe prepublish contract and patch the guard without weakening normal release gates.
2. Verify locally with targeted contract/tests that historical publish recovery no longer depends on bootstrap-doc stale dist manifests.
3. Land through protected main, rerun exact-sha publish for d95b2762f78815b60407a62f2227136c85cae5ee, and verify v0.3.11 tag/npm state.

## Verify Steps

1. Review the requested outcome for "Let exact-sha publish recovery bypass bootstrap-doc stale-dist guard". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T15:34:48.084Z — VERIFY — ok

By: CODER

Note: Verified: historical publish recovery now validates only the exact publish payload in publish.yml, keeps the release-ready artifact as the CI readiness source, and publish-workflow-contract.test.ts plus format:check pass locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T15:31:17.420Z, excerpt_hash=sha256:dbc5bcb3a688fe672b0d033a53bd6e0aecbc5bd3e6adc4e2833faaabef2cecbe

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
