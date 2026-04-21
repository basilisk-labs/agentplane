---
id: "202604211312-HB7PCW"
title: "Define root core export deprecation strategy"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211312-4PXEBW"
tags:
  - "architecture"
  - "build"
  - "docs"
verify:
  - "bun run docs:bootstrap:check"
  - "bun run docs:onboarding:check"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:19.145Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T13:12:18.001Z"
doc_updated_by: "PLANNER"
description: "Decide and document whether root @agentplaneorg/core re-exports stay, become deprecated, or are removed in a later breaking release."
sections:
  Summary: |-
    Define root core export deprecation strategy
    
    Decide and document whether root @agentplaneorg/core re-exports stay, become deprecated, or are removed in a later breaking release.
  Scope: |-
    - In scope: Decide and document whether root @agentplaneorg/core re-exports stay, become deprecated, or are removed in a later breaking release.
    - Out of scope: unrelated refactors not required for "Define root core export deprecation strategy".
  Plan: "Scope: avoid accidental external breaking changes from internal subpath adoption. Steps: 1. Inspect package public API expectations and release policy. 2. Document the root export stance in ADR or developer docs. 3. If deprecating, add JSDoc @deprecated only where safe and useful. 4. Do not remove external root exports unless separately approved as breaking scope. Acceptance: consumers have a documented migration path; internal lint still prevents new root imports."
  Verify Steps: |-
    1. Review the requested outcome for "Define root core export deprecation strategy". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Define root core export deprecation strategy

Decide and document whether root @agentplaneorg/core re-exports stay, become deprecated, or are removed in a later breaking release.

## Scope

- In scope: Decide and document whether root @agentplaneorg/core re-exports stay, become deprecated, or are removed in a later breaking release.
- Out of scope: unrelated refactors not required for "Define root core export deprecation strategy".

## Plan

Scope: avoid accidental external breaking changes from internal subpath adoption. Steps: 1. Inspect package public API expectations and release policy. 2. Document the root export stance in ADR or developer docs. 3. If deprecating, add JSDoc @deprecated only where safe and useful. 4. Do not remove external root exports unless separately approved as breaking scope. Acceptance: consumers have a documented migration path; internal lint still prevents new root imports.

## Verify Steps

1. Review the requested outcome for "Define root core export deprecation strategy". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
