---
id: "202604220256-VE4YY5"
title: "Seal testkit public surface and ban deep imports"
result_summary: "Sealed testkit consumption through @agentplane/testkit public subpaths, added deep-import guardrails, and updated TypeScript/Vitest package resolution for those subpaths."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604220255-07NK08"
tags:
  - "architecture"
  - "lint"
  - "testkit"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:07.900Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T08:03:44.973Z"
  updated_by: "CODER"
  note: "Passed: bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check. Deep testkit imports removed; public @agentplane/testkit subpaths resolved in Vitest and TypeScript."
commit:
  hash: "f29534d216efd3f681cad653603e3daf2c90cd46"
  message: "✨ VE4YY5 task: seal testkit public imports"
comments:
  -
    author: "CODER"
    body: "Start: seal @agentplane/testkit public exports and replace direct packages/testkit/src imports with package-level imports."
  -
    author: "CODER"
    body: "Verified: arch baseline/deps, ci:local:fast, knip:check, and git diff --check passed."
events:
  -
    type: "status"
    at: "2026-04-22T07:49:09.113Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: seal @agentplane/testkit public exports and replace direct packages/testkit/src imports with package-level imports."
  -
    type: "verify"
    at: "2026-04-22T08:03:44.973Z"
    author: "CODER"
    state: "ok"
    note: "Passed: bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check. Deep testkit imports removed; public @agentplane/testkit subpaths resolved in Vitest and TypeScript."
  -
    type: "status"
    at: "2026-04-22T08:04:07.966Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: arch baseline/deps, ci:local:fast, knip:check, and git diff --check passed."
doc_version: 3
doc_updated_at: "2026-04-22T08:04:07.966Z"
doc_updated_by: "CODER"
description: "Export required helpers through @agentplane/testkit and add guardrails that prevent direct imports from packages/testkit/src in tests."
sections:
  Summary: "Make testkit consumption package-level and prevent new deep import coupling."
  Scope: "Testkit exports, test imports, lint/dep-cruiser rules. No production runtime changes."
  Plan: |-
    1. Inventory deep imports from packages/testkit/src.
    2. Add public exports for supported helpers.
    3. Rewrite consumers to @agentplane/testkit imports.
    4. Add lint or dep-cruiser guard for future deep imports.
  Verify Steps: "Run testkit tests, affected suites, arch checks, fast CI."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T08:03:44.973Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed: bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check. Deep testkit imports removed; public @agentplane/testkit subpaths resolved in Vitest and TypeScript.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T07:49:09.120Z, excerpt_hash=sha256:250396234b6d12990d7126598b9075b7d2a881b0ce5efb31041de2f1649745ca
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore deep imports and remove added guardrail."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Make testkit consumption package-level and prevent new deep import coupling.

## Scope

Testkit exports, test imports, lint/dep-cruiser rules. No production runtime changes.

## Plan

1. Inventory deep imports from packages/testkit/src.
2. Add public exports for supported helpers.
3. Rewrite consumers to @agentplane/testkit imports.
4. Add lint or dep-cruiser guard for future deep imports.

## Verify Steps

Run testkit tests, affected suites, arch checks, fast CI.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T08:03:44.973Z — VERIFY — ok

By: CODER

Note: Passed: bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check. Deep testkit imports removed; public @agentplane/testkit subpaths resolved in Vitest and TypeScript.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T07:49:09.120Z, excerpt_hash=sha256:250396234b6d12990d7126598b9075b7d2a881b0ce5efb31041de2f1649745ca

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore deep imports and remove added guardrail.

## Findings

None yet.
