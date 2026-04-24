---
id: "202604241914-FRBSYS"
title: "Harden release hygiene docs workflow scope and artifact gates"
result_summary: "Implemented repo-neutral workflow scope, release artifact/package gates, sanitized build manifest packaging, init recipe install-commit paths, roadmap 0.6 eval-system planning, and current-docs legacy cleanup."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T19:15:05.861Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T21:02:26.724Z"
  updated_by: "CODER"
  note: "Verified release hygiene, workflow scope, docs cleanup, sanitized manifest, recipe install commit paths, package gates, and full release:ci-check on the current tree."
commit:
  hash: "2315c795be6a51b8aafcec8005b9e25f39e68c31"
  message: "🧹 FRBSYS task: harden release hygiene gates"
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved release hygiene, docs cleanup, workflow scope, package artifact, manifest, and init recipe commit hardening in the current direct checkout."
  -
    author: "CODER"
    body: "Verified: full release hygiene implementation completed; release:ci-check passed on the current tree after policy asset sync."
events:
  -
    type: "status"
    at: "2026-04-24T19:15:15.521Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release hygiene, docs cleanup, workflow scope, package artifact, manifest, and init recipe commit hardening in the current direct checkout."
  -
    type: "verify"
    at: "2026-04-24T21:02:26.724Z"
    author: "CODER"
    state: "ok"
    note: "Verified release hygiene, workflow scope, docs cleanup, sanitized manifest, recipe install commit paths, package gates, and full release:ci-check on the current tree."
  -
    type: "status"
    at: "2026-04-24T21:02:36.231Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: full release hygiene implementation completed; release:ci-check passed on the current tree after policy asset sync."
doc_version: 3
doc_updated_at: "2026-04-24T21:02:36.232Z"
doc_updated_by: "CODER"
description: "Implement repo-neutral workflow scope, artifact and package gates, sanitized build manifest, init recipe install paths, roadmap 0.6, and current-code documentation cleanup."
sections:
  Summary: |-
    Harden release hygiene docs workflow scope and artifact gates
    
    Implement repo-neutral workflow scope, artifact and package gates, sanitized build manifest, init recipe install paths, roadmap 0.6, and current-code documentation cleanup.
  Scope: |-
    - In scope: Implement repo-neutral workflow scope, artifact and package gates, sanitized build manifest, init recipe install paths, roadmap 0.6, and current-code documentation cleanup.
    - Out of scope: unrelated refactors not required for "Harden release hygiene docs workflow scope and artifact gates".
  Plan: "1. Update workflow runtime defaults so clean init writes repo-neutral in_scope_paths without packages/**. 2. Add artifact/source archive and package tarball gates, including sanitized build manifest behavior. 3. Include init recipe materialized paths in install commit and cover it with regression tests. 4. Refresh ROADMAP and current docs/assets to remove stale legacy guidance while preserving historical release notes. 5. Wire the new checks into release:ci-check and verify with targeted tests plus release gate."
  Verify Steps: |-
    1. Run node .agentplane/policy/check-routing.mjs. Expected: routing policy passes.
    2. Run node scripts/check-agentplane-artifacts.mjs. Expected: no new tracked volatile artifacts and source archive excludes volatile paths.
    3. Run node scripts/check-task-state.mjs. Expected: no invalid or stale task state.
    4. Run node scripts/check-package-tarball.mjs. Expected: package tarballs satisfy allowlist/denylist and sanitized manifest policy.
    5. Run focused workflow/init/release tests covering repo-neutral WORKFLOW scope, recipe install commit paths, sanitized manifest behavior, and package checks. Expected: all pass.
    6. Run bun run docs:cli:check && bun run docs:recipes:check && bun run docs:onboarding:check. Expected: docs generated surfaces are fresh.
    7. Run agentplane doctor. Expected: OK.
    8. Run bun run release:ci-check. Expected: full release gate passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T21:02:26.724Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified release hygiene, workflow scope, docs cleanup, sanitized manifest, recipe install commit paths, package gates, and full release:ci-check on the current tree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T19:15:15.534Z, excerpt_hash=sha256:6475c698e4617af11221f60d45e6e0cf7cc35b2f46fe34da03fd905288ba58f1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: node .agentplane/policy/check-routing.mjs, artifact/task/package gates, local tarball install smoke, docs freshness checks, focused init/runtime tests, typecheck, lint, doctor, and bun run release:ci-check all passed.
      Impact: Release hygiene gates now block volatile artifacts and dirty package contents; clean init uses repo-neutral workflow scope; current docs no longer expose legacy init flags or agentctl examples.
      Resolution: Implemented gates, docs/runtime updates, sanitized npm manifest flow, init recipe install path capture, and roadmap 0.6 eval-system entry.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Harden release hygiene docs workflow scope and artifact gates

Implement repo-neutral workflow scope, artifact and package gates, sanitized build manifest, init recipe install paths, roadmap 0.6, and current-code documentation cleanup.

## Scope

- In scope: Implement repo-neutral workflow scope, artifact and package gates, sanitized build manifest, init recipe install paths, roadmap 0.6, and current-code documentation cleanup.
- Out of scope: unrelated refactors not required for "Harden release hygiene docs workflow scope and artifact gates".

## Plan

1. Update workflow runtime defaults so clean init writes repo-neutral in_scope_paths without packages/**. 2. Add artifact/source archive and package tarball gates, including sanitized build manifest behavior. 3. Include init recipe materialized paths in install commit and cover it with regression tests. 4. Refresh ROADMAP and current docs/assets to remove stale legacy guidance while preserving historical release notes. 5. Wire the new checks into release:ci-check and verify with targeted tests plus release gate.

## Verify Steps

1. Run node .agentplane/policy/check-routing.mjs. Expected: routing policy passes.
2. Run node scripts/check-agentplane-artifacts.mjs. Expected: no new tracked volatile artifacts and source archive excludes volatile paths.
3. Run node scripts/check-task-state.mjs. Expected: no invalid or stale task state.
4. Run node scripts/check-package-tarball.mjs. Expected: package tarballs satisfy allowlist/denylist and sanitized manifest policy.
5. Run focused workflow/init/release tests covering repo-neutral WORKFLOW scope, recipe install commit paths, sanitized manifest behavior, and package checks. Expected: all pass.
6. Run bun run docs:cli:check && bun run docs:recipes:check && bun run docs:onboarding:check. Expected: docs generated surfaces are fresh.
7. Run agentplane doctor. Expected: OK.
8. Run bun run release:ci-check. Expected: full release gate passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T21:02:26.724Z — VERIFY — ok

By: CODER

Note: Verified release hygiene, workflow scope, docs cleanup, sanitized manifest, recipe install commit paths, package gates, and full release:ci-check on the current tree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T19:15:15.534Z, excerpt_hash=sha256:6475c698e4617af11221f60d45e6e0cf7cc35b2f46fe34da03fd905288ba58f1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: node .agentplane/policy/check-routing.mjs, artifact/task/package gates, local tarball install smoke, docs freshness checks, focused init/runtime tests, typecheck, lint, doctor, and bun run release:ci-check all passed.
  Impact: Release hygiene gates now block volatile artifacts and dirty package contents; clean init uses repo-neutral workflow scope; current docs no longer expose legacy init flags or agentctl examples.
  Resolution: Implemented gates, docs/runtime updates, sanitized npm manifest flow, init recipe install path capture, and roadmap 0.6 eval-system entry.
  Promotion: incident-candidate
  Fixability: external
