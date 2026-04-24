---
id: "202604241914-FRBSYS"
title: "Harden release hygiene docs workflow scope and artifact gates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved release hygiene, docs cleanup, workflow scope, package artifact, manifest, and init recipe commit hardening in the current direct checkout."
events:
  -
    type: "status"
    at: "2026-04-24T19:15:15.521Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release hygiene, docs cleanup, workflow scope, package artifact, manifest, and init recipe commit hardening in the current direct checkout."
doc_version: 3
doc_updated_at: "2026-04-24T19:15:15.534Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
