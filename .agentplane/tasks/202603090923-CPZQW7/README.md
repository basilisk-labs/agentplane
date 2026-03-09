---
id: "202603090923-CPZQW7"
title: "Harden docs shell against theme and checker drift"
result_summary: "Docs shell hardening now uses stable repo-owned hooks instead of Docusaurus hash selectors, and design enforcement validates approved radius tokens rather than literal one-off values."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T09:43:10.373Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-09T09:49:37.745Z"
  updated_by: "CODER"
  note: "Passed bun run docs:site:check, node scripts/check-design-language.mjs, and node .agentplane/policy/check-routing.mjs after replacing brittle docs-shell selectors with repo-owned theme hooks and token-based radius checks."
commit:
  hash: "3fcd9567957017541fc90ce289eba694a935f625"
  message: "✨ CPZQW7 code: harden docs shell hooks"
comments:
  -
    author: "CODER"
    body: "Start: replace brittle docs-shell selectors with repo-owned hooks and make the design checker validate radius tokens instead of literal implementation details."
  -
    author: "CODER"
    body: "Verified: replaced brittle docs-shell selectors with repo-owned theme hooks, switched the design checker to token-based chrome radius validation, and confirmed docs build and policy/design checks pass."
events:
  -
    type: "status"
    at: "2026-03-09T09:43:11.172Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace brittle docs-shell selectors with repo-owned hooks and make the design checker validate radius tokens instead of literal implementation details."
  -
    type: "verify"
    at: "2026-03-09T09:49:37.745Z"
    author: "CODER"
    state: "ok"
    note: "Passed bun run docs:site:check, node scripts/check-design-language.mjs, and node .agentplane/policy/check-routing.mjs after replacing brittle docs-shell selectors with repo-owned theme hooks and token-based radius checks."
  -
    type: "status"
    at: "2026-03-09T09:49:52.191Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: replaced brittle docs-shell selectors with repo-owned theme hooks, switched the design checker to token-based chrome radius validation, and confirmed docs build and policy/design checks pass."
doc_version: 3
doc_updated_at: "2026-03-09T09:49:52.191Z"
doc_updated_by: "CODER"
description: "Replace brittle docs-shell selectors and narrow literal checker exceptions with a more stable contract so navbar/docs layout changes survive Docusaurus updates without false failures."
id_source: "generated"
---
## Summary

Harden docs shell against theme and checker drift

Replace brittle docs-shell selectors and narrow literal checker exceptions with a more stable contract so navbar/docs layout changes survive Docusaurus updates without false failures.

## Scope

- In scope: Replace brittle docs-shell selectors and narrow literal checker exceptions with a more stable contract so navbar/docs layout changes survive Docusaurus updates without false failures.
- Out of scope: unrelated refactors not required for "Harden docs shell against theme and checker drift".

## Plan

1. Replace docs-shell selectors that depend on Docusaurus CSS-module hashes with repo-owned stable hooks in the theme layer, then retarget custom.css to those hooks.
2. Tokenize the minimal allowed chrome radii and update the design checker so it validates approved radius tokens instead of literal one-off values.
3. Verify the docs site still builds and passes design enforcement, then confirm the hardened shell still hides the right-side TOC and keeps the sidebar offset behavior.

## Verify Steps

1. Build the docs site and inspect the docs shell hooks. Expected: the sidebar offset and navbar shell still render correctly while custom.css no longer depends on Docusaurus CSS-module hash fragments.
2. Run node scripts/check-design-language.mjs. Expected: it passes using approved chrome-radius tokens instead of literal one-off values.
3. Run bun run docs:site:check and node .agentplane/policy/check-routing.mjs. Expected: both pass with no design or policy drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T09:49:37.745Z — VERIFY — ok

By: CODER

Note: Passed bun run docs:site:check, node scripts/check-design-language.mjs, and node .agentplane/policy/check-routing.mjs after replacing brittle docs-shell selectors with repo-owned theme hooks and token-based radius checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T09:43:11.172Z, excerpt_hash=sha256:8d870e96aa24c35901ef0cae66afcf882fae0bb989d0d2ae4b515c917dee19df

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
