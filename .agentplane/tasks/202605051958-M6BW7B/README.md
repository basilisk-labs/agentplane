---
id: "202605051958-M6BW7B"
title: "Prepare v0.5 rc1 documentation"
result_summary: "Merged via PR #942. v0.5 rc1 blueprint and recipe docs plus release candidate notes are on main."
status: "DONE"
priority: "high"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "docs"
  - "rc1"
  - "recipes"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T19:58:51.233Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T20:44:56.160Z"
  updated_by: "DOCS"
  note: "v0.5 rc1 docs verified: blueprint docs now describe shipped resolver, CLI, verify-show and ACR summary behavior; recipe spec documents blueprint_extensions; release candidate notes added. Checks: docs:cli:check; docs:ia:check; docs:recipes:check; format:check; ci:local:fast."
commit:
  hash: "c8c9cbe086a86a9c396eeef9e26ff35027260159"
  message: "🔀 5WRJZK integrate: Bridge recipe hints into blueprint resolver"
comments:
  -
    author: "DOCS"
    body: "Start: Updating v0.5 rc1 blueprint and recipe documentation to match implemented resolver, CLI, verification, and ACR behavior without claiming execution support."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #942 merged into main with v0.5 rc1 blueprint and recipe documentation verified locally and by hosted checks."
events:
  -
    type: "status"
    at: "2026-05-05T20:26:10.534Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Updating v0.5 rc1 blueprint and recipe documentation to match implemented resolver, CLI, verification, and ACR behavior without claiming execution support."
  -
    type: "verify"
    at: "2026-05-05T20:44:56.160Z"
    author: "DOCS"
    state: "ok"
    note: "v0.5 rc1 docs verified: blueprint docs now describe shipped resolver, CLI, verify-show and ACR summary behavior; recipe spec documents blueprint_extensions; release candidate notes added. Checks: docs:cli:check; docs:ia:check; docs:recipes:check; format:check; ci:local:fast."
  -
    type: "status"
    at: "2026-05-05T20:52:28.934Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #942 merged into main with v0.5 rc1 blueprint and recipe documentation verified locally and by hosted checks."
doc_version: 3
doc_updated_at: "2026-05-05T20:52:28.935Z"
doc_updated_by: "INTEGRATOR"
description: "Update blueprint and recipe docs plus release-candidate notes so v0.5 rc1 describes resolver, recipe hint, verify evidence, and ACR behavior without claiming runner execution."
sections:
  Summary: |-
    Prepare v0.5 rc1 documentation
    
    Update blueprint and recipe docs plus release-candidate notes so v0.5 rc1 describes resolver, recipe hint, verify evidence, and ACR behavior without claiming runner execution.
  Scope: |-
    - In scope: Update blueprint and recipe docs plus release-candidate notes so v0.5 rc1 describes resolver, recipe hint, verify evidence, and ACR behavior without claiming runner execution.
    - Out of scope: unrelated refactors not required for "Prepare v0.5 rc1 documentation".
  Plan: "Prepare v0.5 rc1 documentation. Scope: update blueprint and recipe developer docs plus release-candidate notes to describe implemented resolver, recipe hint, verify evidence, and ACR behavior. Must state runner execution remains out of scope. Depends on all rc1 code tasks."
  Verify Steps: |-
    1. Review the requested outcome for "Prepare v0.5 rc1 documentation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T20:44:56.160Z — VERIFY — ok
    
    By: DOCS
    
    Note: v0.5 rc1 docs verified: blueprint docs now describe shipped resolver, CLI, verify-show and ACR summary behavior; recipe spec documents blueprint_extensions; release candidate notes added. Checks: docs:cli:check; docs:ia:check; docs:recipes:check; format:check; ci:local:fast.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:26:10.534Z, excerpt_hash=sha256:b9cc994afb5307fd0e8d1017d9390f614239ced2c0662b76e9338429d1d7863a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prepare v0.5 rc1 documentation

Update blueprint and recipe docs plus release-candidate notes so v0.5 rc1 describes resolver, recipe hint, verify evidence, and ACR behavior without claiming runner execution.

## Scope

- In scope: Update blueprint and recipe docs plus release-candidate notes so v0.5 rc1 describes resolver, recipe hint, verify evidence, and ACR behavior without claiming runner execution.
- Out of scope: unrelated refactors not required for "Prepare v0.5 rc1 documentation".

## Plan

Prepare v0.5 rc1 documentation. Scope: update blueprint and recipe developer docs plus release-candidate notes to describe implemented resolver, recipe hint, verify evidence, and ACR behavior. Must state runner execution remains out of scope. Depends on all rc1 code tasks.

## Verify Steps

1. Review the requested outcome for "Prepare v0.5 rc1 documentation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T20:44:56.160Z — VERIFY — ok

By: DOCS

Note: v0.5 rc1 docs verified: blueprint docs now describe shipped resolver, CLI, verify-show and ACR summary behavior; recipe spec documents blueprint_extensions; release candidate notes added. Checks: docs:cli:check; docs:ia:check; docs:recipes:check; format:check; ci:local:fast.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:26:10.534Z, excerpt_hash=sha256:b9cc994afb5307fd0e8d1017d9390f614239ced2c0662b76e9338429d1d7863a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
