---
id: "202604191640-4EGFKR"
title: "Generate CLI reference from declared command specs"
result_summary: "Added a canonical docs:cli:generate script and updated CLI reference freshness guidance to use it."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "docs"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T07:01:15.736Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T07:01:49.192Z"
  updated_by: "CODER"
  note: "Verified CLI reference generation standardization: bun run docs:cli:check passed; bun run docs:cli:generate ran without doc drift; docs-cli/help contract tests passed; prettier check passed."
commit:
  hash: "bbade948642e979650a6a60276835b2a4500e14e"
  message: "📝 4EGFKR task: standardize CLI reference generation"
comments:
  -
    author: "CODER"
    body: "Start: standardize CLI reference generation/check scripts around declared command specs."
  -
    author: "CODER"
    body: "Verified: docs:cli:check passed, docs:cli:generate ran without drift, docs-cli/help contract tests passed, and prettier check passed."
events:
  -
    type: "status"
    at: "2026-04-20T07:01:16.182Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: standardize CLI reference generation/check scripts around declared command specs."
  -
    type: "verify"
    at: "2026-04-20T07:01:49.192Z"
    author: "CODER"
    state: "ok"
    note: "Verified CLI reference generation standardization: bun run docs:cli:check passed; bun run docs:cli:generate ran without doc drift; docs-cli/help contract tests passed; prettier check passed."
  -
    type: "status"
    at: "2026-04-20T07:01:59.758Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs:cli:check passed, docs:cli:generate ran without drift, docs-cli/help contract tests passed, and prettier check passed."
doc_version: 3
doc_updated_at: "2026-04-20T07:01:59.758Z"
doc_updated_by: "CODER"
description: "Epic D′ and G′. Make docs/cli-reference.md generated from command specs and enforce freshness via check mode."
sections:
  Summary: |-
    Generate CLI reference from declared command specs
    
    Epic D′ and G′. Make docs/cli-reference.md generated from command specs and enforce freshness via check mode.
  Scope: |-
    - In scope: Epic D′ and G′. Make docs/cli-reference.md generated from command specs and enforce freshness via check mode.
    - Out of scope: unrelated refactors not required for "Generate CLI reference from declared command specs".
  Plan: "1. Confirm existing CLI docs generation/check path and whether it already uses declared command specs. 2. Add the missing developer-facing generation script so the check path and regeneration path are both canonical. 3. Update stale/missing guidance to point at the script instead of ad-hoc manual commands. 4. Run docs:cli:check plus focused docs-cli/help tests, typecheck if code changed, commit, verify, and finish."
  Verify Steps: |-
    1. Review the requested outcome for "Generate CLI reference from declared command specs". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T07:01:49.192Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified CLI reference generation standardization: bun run docs:cli:check passed; bun run docs:cli:generate ran without doc drift; docs-cli/help contract tests passed; prettier check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T07:01:16.188Z, excerpt_hash=sha256:2e5e3f4b5f4fc2e5c86bb0f4cb5ccc9d9c30c6b32dfe70e8d07028978173a749
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Generate CLI reference from declared command specs

Epic D′ and G′. Make docs/cli-reference.md generated from command specs and enforce freshness via check mode.

## Scope

- In scope: Epic D′ and G′. Make docs/cli-reference.md generated from command specs and enforce freshness via check mode.
- Out of scope: unrelated refactors not required for "Generate CLI reference from declared command specs".

## Plan

1. Confirm existing CLI docs generation/check path and whether it already uses declared command specs. 2. Add the missing developer-facing generation script so the check path and regeneration path are both canonical. 3. Update stale/missing guidance to point at the script instead of ad-hoc manual commands. 4. Run docs:cli:check plus focused docs-cli/help tests, typecheck if code changed, commit, verify, and finish.

## Verify Steps

1. Review the requested outcome for "Generate CLI reference from declared command specs". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T07:01:49.192Z — VERIFY — ok

By: CODER

Note: Verified CLI reference generation standardization: bun run docs:cli:check passed; bun run docs:cli:generate ran without doc drift; docs-cli/help contract tests passed; prettier check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T07:01:16.188Z, excerpt_hash=sha256:2e5e3f4b5f4fc2e5c86bb0f4cb5ccc9d9c30c6b32dfe70e8d07028978173a749

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
