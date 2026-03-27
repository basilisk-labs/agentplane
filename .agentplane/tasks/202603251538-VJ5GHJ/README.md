---
id: "202603251538-VJ5GHJ"
title: "Unify CLI registry, routing, and bootstrap metadata"
result_summary: "Merged on GitHub main via PR #21 after CLI registry and routing unification landed."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603251538-Y8DE9D"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T10:41:24.249Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T10:51:45.655Z"
  updated_by: "CODER"
  note: "Verified CLI registry unification: command-catalog now owns the runtime matcher, canonical invocation strings are shared between registry entries and bootstrap/quickstart guidance, help/quickstart CLI regressions passed, and core/agentplane builds are clean after removing the extra catalog seam."
commit:
  hash: "8c9bb5a56ac94438b573dbcc3625c247d89fe433"
  message: "cli: unify registry, routing, and bootstrap metadata (#21)"
comments:
  -
    author: "CODER"
    body: "Start: unify the cli registry so routing, help/spec generation, and bootstrap metadata all read from one canonical command contract."
  -
    author: "INTEGRATOR"
    body: "Verified: Merged on GitHub main via PR #21 after CLI registry and routing unification landed."
events:
  -
    type: "status"
    at: "2026-03-27T10:41:25.161Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unify the cli registry so routing, help/spec generation, and bootstrap metadata all read from one canonical command contract."
  -
    type: "verify"
    at: "2026-03-27T10:51:45.655Z"
    author: "CODER"
    state: "ok"
    note: "Verified CLI registry unification: command-catalog now owns the runtime matcher, canonical invocation strings are shared between registry entries and bootstrap/quickstart guidance, help/quickstart CLI regressions passed, and core/agentplane builds are clean after removing the extra catalog seam."
  -
    type: "status"
    at: "2026-03-27T19:07:12.644Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Merged on GitHub main via PR #21 after CLI registry and routing unification landed."
doc_version: 3
doc_updated_at: "2026-03-27T19:07:12.645Z"
doc_updated_by: "INTEGRATOR"
description: "Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer."
sections:
  Summary: |-
    Unify CLI registry, routing, and bootstrap metadata
    
    Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer.
  Scope: |-
    - In scope: Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer.
    - Out of scope: unrelated refactors not required for "Unify CLI registry, routing, and bootstrap metadata".
  Plan: |-
    1. Identify the duplicated command metadata seams across run-cli command catalogs, registry construction, help/spec generation, and bootstrap/quickstart guidance, then define one canonical CLI registry record shape that can drive all of them.
    2. Rewire runtime command matching, help/spec generation, and bootstrap/command-guide rendering to consume that single registry contract instead of maintaining parallel catalogs and route metadata.
    3. Add focused CLI registry/help/bootstrap regressions plus the smallest relevant builds so command listings, routing, docs generation, and quickstart output stay stable after the unification.
  Verify Steps: |-
    1. Inspect the CLI registry and metadata seams after the refactor. Expected: command matching, command listings, bootstrap guidance, and CLI docs/spec generation all derive from one canonical registry contract instead of parallel catalogs or duplicated metadata tables.
    2. Run targeted CLI registry/help/bootstrap regressions. Expected: command routing, help output, quickstart/bootstrap output, and generated CLI docs continue to match the intended command surface with no missing or duplicated commands.
    3. Run the smallest relevant builds. Expected: agentplane compiles cleanly and the unified registry metadata does not introduce import/type drift across CLI runtime and docs-generation modules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T10:51:45.655Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified CLI registry unification: command-catalog now owns the runtime matcher, canonical invocation strings are shared between registry entries and bootstrap/quickstart guidance, help/quickstart CLI regressions passed, and core/agentplane builds are clean after removing the extra catalog seam.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T10:41:25.163Z, excerpt_hash=sha256:6a16fc786cb52e84b6d9ef416df6edb6b62b680d84ea8d466674f7c488a1f569
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Unify CLI registry, routing, and bootstrap metadata

Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer.

## Scope

- In scope: Replace duplicated command catalog and registry matching with one canonical CLI registry that owns command matching, bootstrap requirements, metadata, and help/spec generation, while keeping business logic outside the CLI glue layer.
- Out of scope: unrelated refactors not required for "Unify CLI registry, routing, and bootstrap metadata".

## Plan

1. Identify the duplicated command metadata seams across run-cli command catalogs, registry construction, help/spec generation, and bootstrap/quickstart guidance, then define one canonical CLI registry record shape that can drive all of them.
2. Rewire runtime command matching, help/spec generation, and bootstrap/command-guide rendering to consume that single registry contract instead of maintaining parallel catalogs and route metadata.
3. Add focused CLI registry/help/bootstrap regressions plus the smallest relevant builds so command listings, routing, docs generation, and quickstart output stay stable after the unification.

## Verify Steps

1. Inspect the CLI registry and metadata seams after the refactor. Expected: command matching, command listings, bootstrap guidance, and CLI docs/spec generation all derive from one canonical registry contract instead of parallel catalogs or duplicated metadata tables.
2. Run targeted CLI registry/help/bootstrap regressions. Expected: command routing, help output, quickstart/bootstrap output, and generated CLI docs continue to match the intended command surface with no missing or duplicated commands.
3. Run the smallest relevant builds. Expected: agentplane compiles cleanly and the unified registry metadata does not introduce import/type drift across CLI runtime and docs-generation modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T10:51:45.655Z — VERIFY — ok

By: CODER

Note: Verified CLI registry unification: command-catalog now owns the runtime matcher, canonical invocation strings are shared between registry entries and bootstrap/quickstart guidance, help/quickstart CLI regressions passed, and core/agentplane builds are clean after removing the extra catalog seam.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T10:41:25.163Z, excerpt_hash=sha256:6a16fc786cb52e84b6d9ef416df6edb6b62b680d84ea8d466674f7c488a1f569

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
