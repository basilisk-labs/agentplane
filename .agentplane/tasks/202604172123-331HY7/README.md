---
id: "202604172123-331HY7"
title: "Migrate task artifact schema validation to Zod"
result_summary: "Merged via PR #427."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "zod"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T04:45:06.954Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T04:45:28.663Z"
  updated_by: "CODER"
  note: "Validated Zod-based task artifact contracts end to end: task README frontmatter, tasks export, PR meta, and task handoff schemas now validate through Zod, generated JSON schema artifacts are synced, and focused core/CLI tests plus full typecheck remained green; AJV remains only outside this migrated contract surface."
commit:
  hash: "68cbe19669ae2178d11a16a904464fc5a24b0ac1"
  message: "zod: Migrate task artifact schema validation to Zod (331HY7) (#427)"
comments:
  -
    author: "CODER"
    body: "Start: migrate the task artifact contract to a Zod source of truth, regenerate canonical schema artifacts, keep exported types/runtime behavior stable, and limit scope to the task artifact validation surface plus strictly necessary downstream type compatibility fixes."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #427 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-18T04:35:57.800Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the task artifact contract to a Zod source of truth, regenerate canonical schema artifacts, keep exported types/runtime behavior stable, and limit scope to the task artifact validation surface plus strictly necessary downstream type compatibility fixes."
  -
    type: "verify"
    at: "2026-04-18T04:45:28.663Z"
    author: "CODER"
    state: "ok"
    note: "Validated Zod-based task artifact contracts end to end: task README frontmatter, tasks export, PR meta, and task handoff schemas now validate through Zod, generated JSON schema artifacts are synced, and focused core/CLI tests plus full typecheck remained green; AJV remains only outside this migrated contract surface."
  -
    type: "status"
    at: "2026-04-18T04:53:27.959Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #427 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-18T04:53:27.964Z"
doc_updated_by: "INTEGRATOR"
description: "Replace AJV-based task artifact validation in @agentplaneorg/core with a Zod SSOT, generate JSON schema artifacts from the Zod contract, and preserve task artifact runtime behavior and exported types."
sections:
  Summary: |-
    Migrate task artifact schema validation to Zod
    
    Replace AJV-based task artifact validation in @agentplaneorg/core with a Zod SSOT, generate JSON schema artifacts from the Zod contract, and preserve task artifact runtime behavior and exported types.
  Scope: |-
    - In scope: Replace AJV-based task artifact validation in @agentplaneorg/core with a Zod SSOT, generate JSON schema artifacts from the Zod contract, and preserve task artifact runtime behavior and exported types.
    - Out of scope: unrelated refactors not required for "Migrate task artifact schema validation to Zod".
  Plan: "Migrate packages/core task artifact contract from AJV-backed runtime validation to a Zod SSOT, generate canonical JSON schema artifacts from the Zod contract, preserve exported types and runtime/defaulting behavior, and keep AJV only where still explicitly required outside this contract."
  Verify Steps: |-
    1. Review the requested outcome for "Migrate task artifact schema validation to Zod". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T04:45:28.663Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated Zod-based task artifact contracts end to end: task README frontmatter, tasks export, PR meta, and task handoff schemas now validate through Zod, generated JSON schema artifacts are synced, and focused core/CLI tests plus full typecheck remained green; AJV remains only outside this migrated contract surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T04:35:57.823Z, excerpt_hash=sha256:3ef2d167ee17c1c7e191915764e5424ef549fe3a2dd8b5469935150760d9f022
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate task artifact schema validation to Zod

Replace AJV-based task artifact validation in @agentplaneorg/core with a Zod SSOT, generate JSON schema artifacts from the Zod contract, and preserve task artifact runtime behavior and exported types.

## Scope

- In scope: Replace AJV-based task artifact validation in @agentplaneorg/core with a Zod SSOT, generate JSON schema artifacts from the Zod contract, and preserve task artifact runtime behavior and exported types.
- Out of scope: unrelated refactors not required for "Migrate task artifact schema validation to Zod".

## Plan

Migrate packages/core task artifact contract from AJV-backed runtime validation to a Zod SSOT, generate canonical JSON schema artifacts from the Zod contract, preserve exported types and runtime/defaulting behavior, and keep AJV only where still explicitly required outside this contract.

## Verify Steps

1. Review the requested outcome for "Migrate task artifact schema validation to Zod". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T04:45:28.663Z — VERIFY — ok

By: CODER

Note: Validated Zod-based task artifact contracts end to end: task README frontmatter, tasks export, PR meta, and task handoff schemas now validate through Zod, generated JSON schema artifacts are synced, and focused core/CLI tests plus full typecheck remained green; AJV remains only outside this migrated contract surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T04:35:57.823Z, excerpt_hash=sha256:3ef2d167ee17c1c7e191915764e5424ef549fe3a2dd8b5469935150760d9f022

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
