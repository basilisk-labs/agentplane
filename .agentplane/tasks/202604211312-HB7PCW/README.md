---
id: "202604211312-HB7PCW"
title: "Define root core export deprecation strategy"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "ok"
  updated_at: "2026-04-21T19:44:00.971Z"
  updated_by: "CODER"
  note: "Implemented ADR 0010 and README guidance for @agentplaneorg/core root export compatibility: patch/minor releases keep the root aggregate, internal runtime code prefers subpaths, and any future removal requires a breaking-release migration plan. Verification passed: bun run docs:bootstrap:check; bun run docs:onboarding:check; bun run typecheck; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: document the root @agentplaneorg/core export stance and external deprecation strategy without removing compatibility exports."
events:
  -
    type: "status"
    at: "2026-04-21T19:42:44.356Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: document the root @agentplaneorg/core export stance and external deprecation strategy without removing compatibility exports."
  -
    type: "verify"
    at: "2026-04-21T19:44:00.971Z"
    author: "CODER"
    state: "ok"
    note: "Implemented ADR 0010 and README guidance for @agentplaneorg/core root export compatibility: patch/minor releases keep the root aggregate, internal runtime code prefers subpaths, and any future removal requires a breaking-release migration plan. Verification passed: bun run docs:bootstrap:check; bun run docs:onboarding:check; bun run typecheck; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-21T19:44:00.979Z"
doc_updated_by: "CODER"
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
    ### 2026-04-21T19:44:00.971Z — VERIFY — ok

    By: CODER

    Note: Implemented ADR 0010 and README guidance for @agentplaneorg/core root export compatibility: patch/minor releases keep the root aggregate, internal runtime code prefers subpaths, and any future removal requires a breaking-release migration plan. Verification passed: bun run docs:bootstrap:check; bun run docs:onboarding:check; bun run typecheck; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T19:42:44.366Z, excerpt_hash=sha256:9a475b4c5cac92f086c03548dd54f83df4b378d7296fff9c1f51ca07ca5f7e51

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
### 2026-04-21T19:44:00.971Z — VERIFY — ok

By: CODER

Note: Implemented ADR 0010 and README guidance for @agentplaneorg/core root export compatibility: patch/minor releases keep the root aggregate, internal runtime code prefers subpaths, and any future removal requires a breaking-release migration plan. Verification passed: bun run docs:bootstrap:check; bun run docs:onboarding:check; bun run typecheck; bun run format:check; node .agentplane/policy/check-routing.mjs; agentplane doctor; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T19:42:44.366Z, excerpt_hash=sha256:9a475b4c5cac92f086c03548dd54f83df4b378d7296fff9c1f51ca07ca5f7e51

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
